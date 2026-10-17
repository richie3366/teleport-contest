import { describe, it } from "node:test";
import assert from "node:assert/strict";

// C ref: uhitm.c do_attack `:474` — foo's first disjunct is Punished, and
// youprop.h:77 defines Punished as (uball != 0): while the hero drags the
// ball & chain, bumping a tame/peaceful monster stops ("in the way!") via
// monflee's rnd(6) WITHOUT drawing the !rn2(7) roll (C short-circuit).
// JS read the never-written game.u.Punished field instead of the live ball,
// so it drew rn2(7) where C drew rnd(6) (scen-sweep-Monk-50055011 s1923,
// scen-sweep-Ranger-50250049 s953: C rnd(6)@uhitm.c:497 vs JS rn2(7)).

const gstate = await import("../js/gstate.js");
const { initRng, getRngLog, enableRngLog } = await import("../js/rng.js");
const { do_attack, is_safemon } = await import("../js/uhitm.js");
const { monsterNames } = await import("../js/generated/monsters_data.js");

const PM_ALEAX = monsterNames.indexOf("PM_ALEAX");
assert.ok(PM_ALEAX > 0, "PM_ALEAX in monsterNames");

function petWorld({ punished }) {
    gstate.resetGame();
    initRng(50055011);
    enableRngLog(); // jsmain enables this for scored runs
    const g = gstate.game;
    g.u = {
        ux: 5, uy: 5, dx: 1, dy: 0,
        Detect_monsters: 1, // canspotmon true (x-monnam pattern)
    };
    if (punished) {
        g.u.uball = { otyp: 1 };
        g.u.uchain = { otyp: 2 };
    }
    g.context = {};
    const mon = {
        mtame: 1, mpeaceful: 1,
        mnum: PM_ALEAX, m_id: 7,
        data: { mndx: PM_ALEAX, mflags2: 0, maligntyp: 0, mmove: 12 },
        mx: 6, my: 5, mhp: 10, minvis: 0,
    };
    return { g, mon };
}

describe("do_attack punished short-circuit (uhitm.c:474, youprop.h:77)", () => {
    it("punished (uball set): stops, monflee rnd(6) first, no rn2(7)", async () => {
        const { mon } = petWorld({ punished: true });
        assert.ok(is_safemon(mon), "pet is safemon");
        const n0 = getRngLog().length;
        const r = await do_attack(mon);
        assert.equal(r, true, "attack stopped (in the way!)");
        assert.equal(mon.mflee, 1, "tame pet made to flee");
        const draws = getRngLog().slice(n0);
        assert.ok(draws.length > 0, "monflee drew rnd(6)");
        assert.match(draws[0], /^rnd\(6\)=\d+$/, `first draw is rnd(6), got ${draws[0]}`);
        assert.ok(!draws.some((d) => d.startsWith("rn2(7)=")),
            `no rn2(7) drawn, got ${JSON.stringify(draws)}`);
    });

    it("unpunished control: the !rn2(7) roll is drawn", async () => {
        const { mon } = petWorld({ punished: false });
        assert.ok(is_safemon(mon), "pet is safemon");
        const n0 = getRngLog().length;
        await do_attack(mon);
        const draws = getRngLog().slice(n0);
        assert.ok(draws.some((d) => d.startsWith("rn2(7)=")),
            `rn2(7) drawn, got ${JSON.stringify(draws)}`);
    });
});
