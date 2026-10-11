import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: fountain.c drinkfountain case 21 (Poisonous) `:301-304` — the
// Poison_resistance arm prints the fruitname(FALSE) farm pline, then
// losehp(rnd(4), "unrefrigerated sip of juice", KILLED_BY_AN), which is
// noreturn when fatal (hack.c `:4287-4288` urgent_pline("You die...") +
// done(DIED)); on wizard lifesave C breaks to the dryup tail. JS called
// losehp and fell through to dryup without draining finish_losehp_done,
// so scen-sweep-Rogue-578205 step 536 showed «Dry up fountain? [yn] (n)»
// where C shows «You die...--More--» (rnd(4)=2 fatal at step 535).
const ID = "scen-sweep-Rogue-578205";
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

describe("fatal juice sip drains done() (drinkfountain case 21)", () => {
    it(`${ID}: 536 You die + session continues past it`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // C-side pin: the recording still shows the juice death at 536.
        const cTop = topline(steps[536]?.screen);
        assert.ok(cTop.startsWith("You die..."),
            `C step-536 topline moved: ${JSON.stringify(cTop)}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length > 536,
            `session truncated: ${screens.length} screens <= 536`);
        assert.equal(topline(screens[536]), cTop,
            "step-536 topline differs from C");
    });
});
