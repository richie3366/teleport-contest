import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { setpaid } from '../js/shk.js';
import { OBJ_BURIED, OBJ_FLOOR } from '../js/const.js';

// C ref: shk.c clear_no_charge_obj `:329–373` — the `:354–357` arms read
// OBJ_BURIED (obj.h:81 `#define OBJ_BURIED 6`): the where-gate `:354–356`
// and the get_obj_location locflags `OBJ_CONTAINED|OBJ_BURIED` `:357`.
// js/shk.js:1867–1872 is C-exact but never imported the name: the first
// setpaid over a no_charge item threw `ReferenceError: OBJ_BURIED is not
// defined`, voiding scen-shop-Priest-49959525 +
// scen-shop-Ranger-49959616 + scen-sweep-Wizard-620021 at step 0 (the
// scorer misattributes throw-voids to the first C draw,
// randomize_gem_colors o_init.c:89).
describe('clear_no_charge_obj OBJ_BURIED (shk.c:329-373, via setpaid)', () => {
    beforeEach(() => {
        resetGame();
        game.invent = null;
        game.fmon = [];
        game.migrating_mons = [];
        game.billobjs = null;
        game.thrownobj = null;
        game.kickedobj = null;
        game.level = { at: () => ({ roomno: 0 }), buriedobjlist: null };
        game.fobj = { no_charge: 1, where: OBJ_FLOOR, ox: 5, oy: 5, nobj: null, cobj: null };
    });

    it('OBJ_BURIED value matches C (obj.h:81)', () => {
        assert.equal(OBJ_BURIED, 6);
    });

    it('setpaid clears no_charge without throw (floor item, non-shop room)', () => {
        setpaid({ isshk: true }); // pre-fix: ReferenceError: OBJ_BURIED is not defined
        assert.equal(game.fobj.no_charge, 0);
    });
});
