// `potion.c` make_glib `:461–468`: C `disp.botl |= (!Glib ^ !!xtime)` sets
// botl on XNOR (state UNCHANGED), not on change. JS tested `was !== now`
// (XOR), so polymon's nohands `make_glib(0)` with clear Glib set nothing:
// the dust-vortex poly's drop_weapon pre-flush kept the stale HP:0(0) and
// C's 8(8) repaint never fired (scen-sweep-Barbarian-582613 s1083;
// Priest-582714 same owner).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { make_glib } from '../js/potion.js';
import { GLIB } from '../js/const.js';

function botlSet() {
    return !!(game.flags?.botl || game.disp?.botl);
}

function runCase(intrinsic, xtime) {
    resetGame();
    const u = game.u || (game.u = {});
    if (!u.uprops) u.uprops = {};
    u.uprops[GLIB] = { intrinsic, extrinsic: 0, blocked: 0 };
    u.HGlib = 0;
    u.Glib = 0;
    if (!game.flags) game.flags = {};
    game.flags.botl = false;
    game.flags.botlx = false;
    if (!game.disp) game.disp = {};
    game.disp.botl = false;
    game.disp.botlx = false;
    make_glib(xtime);
    return botlSet();
}

describe('make_glib botl is C XNOR (!Glib ^ !!xtime)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('clear Glib + xtime 0 sets botl (polymon nohands arm)', () => {
        assert.equal(runCase(0, 0), true);
    });

    it('set Glib + xtime 0 does not set botl', () => {
        assert.equal(runCase(5, 0), false);
    });

    it('clear Glib + nonzero xtime does not set botl', () => {
        assert.equal(runCase(0, 7), false);
    });

    it('set Glib + nonzero xtime sets botl', () => {
        assert.equal(runCase(5, 7), true);
    });
});
