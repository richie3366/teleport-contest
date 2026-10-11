import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c losehp `:4283–4288` (fatal → urgent_pline("You die...");
// done(DIED) with program_state.gameover still FALSE — only really_done
// `:1144` sets it) + end.c savelife `:749–753` (`pline("%s releases you.",
// Monnam(u.ustuck))`) + do_name.c x_monnam `:863–865` (do_it requires
// !program_state.gameover). JS losehp is sync and sets a JS-only gameover
// bail marker for the deferred finish_losehp_done; that marker leaked into
// done(), so savelife named a holder the blind hero cannot see.
// scen-worldtour-Ranger-95231 step 810: a barbed devil holds the blind
// Ranger, its fire attack burns inventory (maybe_destroy_item losehp kills),
// wizard "Die?" is declined — C «It releases you.» vs JS «The barbed devil
// releases you.» (queue owner slimed_to_death was the "OK, so you don't
// die." literal match, not the writer).
const ID = "scen-worldtour-Ranger-95231";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

const topline = (s) => String(s || "").split("\n")[0];

describe("losehp death runs done() without the JS gameover marker", () => {
    it(`${ID}: step-810 savelife says "It releases you."`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // C-side pin: the recording still shows the unseen holder at 810.
        const cTop = topline(steps[810]?.screen);
        assert.ok(cTop.startsWith("OK, so you don't die.  It releases you."),
            `C step-810 topline moved: ${JSON.stringify(cTop)}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length > 810,
            `session truncated: ${screens.length} screens <= 810`);
        assert.equal(topline(screens[810]), cTop,
            "step-810 topline differs from C");
    });
});
