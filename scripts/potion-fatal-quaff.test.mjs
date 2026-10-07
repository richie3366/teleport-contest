import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c losehp `:4284-4292` (u.uhp < 1 → urgent_pline("You die...")
// + done(DIED), noreturn unless life-saved) + potion.c peffect_water
// `:728-741` (chaotic hero quaffs blessed holy water → burns + d(2,6)).
// JS losehp is sync: fatal sets gameover + _losehp_needs_done and defers
// done() to finish_losehp_done (oil :407-414 precedent). The quaff path
// (peffects/dopotion) never drained it, so a fatal quaff ended the run
// with no death sequence: scen-town-Priest-94282 stopped at 247/265
// screens (prompt shown, burns RNG drawn, "You die..." never printed).
// This test pins the 247 burns + 248 death toplines and completion.
const ID = "scen-town-Priest-94282";
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

describe("fatal quaff drains done() (peffect_water burns, D-3608)", () => {
    it(`${ID}: 247 burns + 248 You die + session completes`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        const row0 = (i) => JSON.stringify((screens[i] || "").slice(0, 90));
        assert.ok(screens.length >= 265,
            `session truncated: ${screens.length} screens < 265 steps`);
        assert.ok(screens[247].includes("This burns like acid!"),
            `step 247 is not the holy-water burns: ${row0(247)}`);
        assert.ok(screens[248].includes("You die..."),
            `step 248 is not the death line: ${row0(248)}`);
    });
});
