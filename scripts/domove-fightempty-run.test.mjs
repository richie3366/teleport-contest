import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// do_statusline2 cliff writer: domove fight_empty/attackmon run-clear.
// C hack.c domove returns bare on the fight_empty dig-start arm (no
// nomul/end_running there — nomul lives only in the futile arm) and on
// the attackmon-done arm, so context.run survives into the next turn's
// rounds and disp.time_botl stays unset (stale T paint). JS ended the
// run on both arms, freshing T where C stays stale.
// scen-symset-Healer-50059079 step 478 (Fb fight into diggable wall,
// dig-start arm): C row 23 shows stale T:182 (true moves 187); pre-fix
// JS painted fresh T:187.
async function replayTo(id, nkeys) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const mem = new Map();
    const storage = {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves.slice(0, nkeys),
        storage,
    });
    return g.getScreens?.() || [];
}

function statusRow2(screens, step) {
    const grid = decodeScreen(screens[step]);
    return grid[23].map((c) => c.ch).join("");
}

describe("domove fight_empty/attackmon bare return (run survives)", () => {
    it("Healer-50059079: step-478 statusline stays stale T:182 (C paint)", { timeout: 180000 }, async () => {
        const screens = await replayTo("scen-symset-Healer-50059079", 479);
        assert.ok(screens.length > 478, `only ${screens.length} screens`);
        assert.match(statusRow2(screens, 478), /T:182/,
            "step-478 statusline shows stale T:182 like C (not fresh T:187)");
    });
});
