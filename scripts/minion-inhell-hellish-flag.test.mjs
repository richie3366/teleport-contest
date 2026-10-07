import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { game } from "../js/gstate.js";
import { Inhell } from "../js/minion.js";

// C ref: dungeon.c In_hell `:1941–1945` —
// `svd.dungeons[lev->dnum].flags.hellish`, via dungeon.h:140 `Inhell`.
// The live JS table is C-ordered (dnum 1 = Gehennom, hellish; dnum 5 =
// Fort Ludios, not hellish), while js/const.js GEHENNOM is 5 — so the old
// `(uz.dnum|0) === GEHENNOM` read false inside Gehennom (scen-tour-
// Wizard-91112 step 118: C `rn2(10)` vs JS `rn2(16)` in summonmu) and
// true on Ludios. This test pins the hellish-flag read plus the safe
// empty-state default.
describe("minion.js Inhell() reads the dungeon hellish flag (dungeon.c:1941-1945)", () => {
    const saveU = game.u;
    const saveDungeons = game.dungeons;
    const hellishTable = (hell) => hell.map((h) => ({ flags: { hellish: h } }));

    it("Gehennom dnum with hellish flag reads true (old code: false)", () => {
        game.dungeons = hellishTable([false, true, false, false, false, false, false, false, false]);
        game.u = { uz: { dnum: 1, dlevel: 3 } };
        try {
            assert.equal(Inhell(), true);
        } finally {
            game.u = saveU;
            game.dungeons = saveDungeons;
        }
    });

    it("Ludios dnum without hellish flag reads false (old code: true)", () => {
        game.dungeons = hellishTable([false, true, false, false, false, false, false, false, false]);
        game.u = { uz: { dnum: 5, dlevel: 1 } };
        try {
            assert.equal(Inhell(), false);
        } finally {
            game.u = saveU;
            game.dungeons = saveDungeons;
        }
    });

    it("main dungeon reads false; missing state reads false without throwing", () => {
        game.dungeons = hellishTable([false, true, false, false, false, false, false, false, false]);
        game.u = { uz: { dnum: 0, dlevel: 8 } };
        try {
            assert.equal(Inhell(), false);
        } finally {
            game.u = saveU;
            game.dungeons = saveDungeons;
        }
        game.dungeons = undefined;
        game.u = undefined;
        try {
            assert.equal(Inhell(), false);
        } finally {
            game.u = saveU;
            game.dungeons = saveDungeons;
        }
    });
});
