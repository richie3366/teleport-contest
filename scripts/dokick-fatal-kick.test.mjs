import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c losehp (u.uhp < 1 → urgent_pline("You die...") +
// done(DIED), noreturn unless life-saved) + dokick.c kick_ouch `:900-905`
// (rnd(ACURR(A_CON) > 15 ? 3 : 5) + losehp + air/Lev hurtle).
// JS losehp is sync: fatal sets gameover + _losehp_needs_done and defers
// done() to finish_losehp_done (D-3608 oil pattern). kick_ouch never
// drained it — it bailed on the flag instead — so a fatal kick ended the
// run with no death sequence: scen-container-Healer-94086 stopped at
// 229/245 screens (kick RNG drawn through rnd(5)=4, kick messages and
// "You die..." never printed).
// This test pins the 230 kick topline + 231 death topline and completion.
const ID = "scen-container-Healer-94086";
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

describe("fatal kick drains done() (kick_ouch losehp)", () => {
    it(`${ID}: 230 kick + 231 You die + session completes`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        const row0 = (i) => JSON.stringify((screens[i] || "").slice(0, 120));
        assert.ok(screens.length >= 245,
            `session truncated: ${screens.length} screens < 245 steps`);
        assert.ok(screens[229].includes("You kick an empty bag."),
            `step 230 is not the bag kick: ${row0(229)}`);
        assert.ok(screens[229].includes("Thump!"),
            `step 230 lacks Thump!: ${row0(229)}`);
        assert.ok(screens[229].includes("Ouch!"),
            `step 230 lacks Ouch!: ${row0(229)}`);
        assert.ok(screens[230].includes("You die..."),
            `step 231 is not the death line: ${row0(230)}`);
    });
});
