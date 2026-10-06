import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c rhack `:3812–3816` — after every non-movement command,
// ECMD_CANCEL|ECMD_FAIL → reset_cmd_vars(TRUE), ECMD_OK (no TIME bit) →
// reset_cmd_vars(multi < 0). The reset clears context.run (travel's
// vestigial run=8 included), so the next turn's moves++ re-arms
// disp.time_botl (allmain.c:262) and the status clock repaints.
// JS rhack's if/else arms set context.move but skipped the reset, so a
// no-time command after travel (`;` farlook here) left run=8 and every
// later T: painted one turn stale (scen-descend-Healer-94307 step 22:
// C T:38 vs JS T:37, RNG 10430/10430).
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-descend-Healer-94307.recipe.json", import.meta.url),
));

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

async function boot(nchars) {
    const seg = RECIPE.segments[0];
    const g = await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        timezone: seg.timezone,
        nethackrc: seg.nethackrc,
        moves: seg.moves.slice(0, nchars),
        storage: freshStorage(),
    });
    return g;
}

describe("rhack post-command reset_cmd_vars (cmd.c:3812-3816)", () => {
    it("';' farlook (ECMD_OK) clears travel's run=8", { timeout: 60000 }, async () => {
        // Through key 20 (1 char/step): travel arrived (run=8), farlook
        // opened at ';' (18) and closed at '.' (20) → do_look ECMD_OK.
        await boot(21);
        assert.equal(game.moves, 37);
        assert.equal(game.context.run, 0);
    });

    it("arrival screen paints C's T:38, not stale T:37", { timeout: 60000 }, async () => {
        const g = await boot(76);
        const last = String(g.getScreens()[22]).split("\n").pop();
        assert.match(last, /T:38\b/);
    });
});
