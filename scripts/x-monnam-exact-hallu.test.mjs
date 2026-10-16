import { describe, it } from "node:test";
import assert from "node:assert/strict";

// C ref: do_name.c x_monnam `:886–904` — priests and minions go through
// priestname, not the generic arms. When the true name is wanted
// (!do_hallu — m_monnam's EXACT_NAME, gameover), C `:889–894` saves
// EHalluc_resistance and forces it so the Hallucination macro
// (youprop.h:120, HHallucination && !Halluc_resistance) reads false
// inside priestname: no rndmonnam/randrole/case display draws, true
// "of <deity>" tail (end.c:271-274, done_in_by's killer).
// JS additionally saves/clears the u.Hallucination sticky, which shadows
// the same macro (do_name Hallucination reads it first): without this the
// EHalluc_resistance assignment is ineffective while hallucinating and
// priestname burns display draws (slimed_to_death cliff:
// scen-sweep-Barbarian-50255228 s911 "lhurgoyf of Thoth" vs
// "vampire lord of Ptah" — JS drew 5 in done_in_by, C drew 0).

const gstate = await import("../js/gstate.js");
const { initRng } = await import("../js/rng.js");
const { m_monnam, x_monnam } = await import("../js/do_name.js");
const { TIMEOUT, ARTICLE_THE } = await import("../js/const.js");
const { monsterNames } = await import("../js/generated/monsters_data.js");

const PM_ALEAX = monsterNames.indexOf("PM_ALEAX");
assert.ok(PM_ALEAX > 0, "PM_ALEAX in monsterNames");

function snapDisp(g) {
    return JSON.stringify(g.dispCtx, (k, v) =>
        typeof v === "bigint" ? `B${v.toString()}` : v);
}

function halluWorld() {
    gstate.resetGame();
    initRng(50255228);
    const g = gstate.game;
    // Hallucinating, sticky set (timeout.js:1267 shape), unresisted.
    g.u = {
        ux: 0, uy: 0,
        HHallucination: TIMEOUT, Hallucination: 1,
        EHalluc_resistance: 0, HHalluc_resistance: 0,
        Halluc_resistance: 0,
        Detect_monsters: 1, // canspotmon true → contrast arm reaches priestname
    };
    g.urole = { lgod: "Ptah", ngod: "Thoth", cgod: "Anhur" };
    const mon = {
        isminion: true, ispriest: false,
        mnum: PM_ALEAX,
        data: { mndx: PM_ALEAX, mflags2: 0, maligntyp: 0 },
        minvis: 0, mtame: 0, female: false,
        mx: 5, my: 5, m_id: 42, m_ap_type: 0,
        mextra: { emin: { min_align: 1, renegade: 0 } },
    };
    return { g, mon };
}

describe("x_monnam EXACT_NAME suppresses hallucination (do_name.c:889-899)", () => {
    it("m_monnam of a minion while hallucinating: true name, zero display draws", () => {
        const { g, mon } = halluWorld();
        const before = snapDisp(g);
        const name = m_monnam(mon);
        assert.equal(name, "Aleax of Ptah");
        assert.equal(snapDisp(g), before);
        assert.equal(g.u.Hallucination, 1);
        assert.equal(g.u.EHalluc_resistance | 0, 0);
    });

    it("plain x_monnam while hallucinating still draws (contrast arm)", () => {
        const { g, mon } = halluWorld();
        const before = snapDisp(g);
        const name = x_monnam(mon, ARTICLE_THE, null, 0, false);
        assert.notEqual(snapDisp(g), before);
        assert.notEqual(name, "the Aleax of Ptah");
    });
});
