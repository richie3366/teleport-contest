import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: monmove.c mb_trapped `:59`, postmov `:1571/:1588/:1613` — the
// unseen-door-message arms gate on the `Deaf` macro
// (HDeaf || EDeaf || u.uroleplay.deaf). JS read the raw `u.Deaf` flag, so a
// hero deafened by drum noise (HDeaf timeout, u.Deaf unset) still heard
// "You hear a door open." during dochug — an extra message that paged the
// topline (--More--) and swallowed the next key. scen-special-Samurai-94217
// step 27 (Deaf "pound on the drum." turn) diverged exactly there; the fix
// routes all four arms through the module's live hero_Deaf().
const ID = "scen-special-Samurai-94217";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];
const firstLine = (s) => String(s).split("\n")[0];

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

describe("postmov/mb_trapped door messages use the Deaf macro (monmove.c:59,1571,1588,1613)", () => {
    it(`${ID}: step-27 topline unpaged, step-28 input stream in sync`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.equal(
            firstLine(screens[27]),
            "You start playing your drum.  You pound on the drum.",
            "step-27 drum turn must not page (no HDeaf door message)",
        );
        assert.equal(
            firstLine(screens[28]),
            firstLine(seg.steps[28].screen),
            "step-28 'y' must reach the game, not a --More-- wait",
        );
        // RNG must stay matched through the whole step-27 turn (the fix is
        // message-only: no draw added or removed).
        const gotDraws = (g.getRngLog?.() || []).map(strip);
        const wantDraws = [];
        for (const st of seg.steps) for (const d of (st.rng || [])) wantDraws.push(strip(d));
        let prefix = 0;
        while (prefix < gotDraws.length && prefix < wantDraws.length
            && gotDraws[prefix] === wantDraws[prefix]) prefix++;
        let through27 = 0;
        for (let i = 0; i <= 27; i++) through27 += (seg.steps[i].rng || []).length;
        assert.ok(prefix >= through27,
            `matched RNG prefix ${prefix} must cover step 27 (${through27} draws)`);
    });
});
