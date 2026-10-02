import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { set_levltyp } from '../js/trap.js';
import { dipsink_set_levltyp } from '../js/fountain.js';
import { money_cnt } from '../js/shk.js';
import { a_monnam } from '../js/do_name.js';
import { fingers_or_gloves } from '../js/do_wear.js';
import { reset_display_messages } from '../js/display.js';
import { resetInputState } from '../js/input.js';
import { initRng } from '../js/rng.js';
import { ROOM, FOUNTAIN, SINK, POOL, THRONE, LADDER } from '../js/const.js';
import { COIN_CLASS } from '../js/objects.js';

// C ref: mkmaze.c set_levltyp `:76–121` — D-3319 rewires the four
// fountain.c inline typ+counts sites (dipfountain :442, dryup :231,
// breaksink :586, gush :152) plus the dipsink_set_levltyp helper to
// this live export. Transitions keep C's typ write + counts and gain
// C's isok/range/CAN_OVERWRITE guards.
describe('live set_levltyp fountain transitions (mkmaze.c:76-121)', () => {
    let cells;
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(3319);
        game.u = { ux: 5, uy: 5 };
        game.iflags = { window_inited: true };
        cells = new Map();
        game.level = {
            at: (x, y) => cells.get(`${x},${y}`),
            flags: { nfountains: 2, nsinks: 1 },
        };
    });
    const setCell = (x, y, typ) => {
        const c = { typ, looted: 0, flags: 0 };
        cells.set(`${x},${y}`, c);
        return c;
    };

    it('FOUNTAIN->ROOM writes typ and decrements nfountains', { timeout: 5000 }, () => {
        const c = setCell(5, 5, FOUNTAIN);
        assert.equal(set_levltyp(5, 5, ROOM), true);
        assert.equal(c.typ, ROOM);
        assert.equal(game.level.flags.nfountains, 1);
    });

    it('SINK->FOUNTAIN moves nsinks--/nfountains++', { timeout: 5000 }, () => {
        const c = setCell(5, 5, SINK);
        assert.equal(set_levltyp(5, 5, FOUNTAIN), true);
        assert.equal(c.typ, FOUNTAIN);
        assert.equal(game.level.flags.nsinks, 0);
        assert.equal(game.level.flags.nfountains, 3);
    });

    it('ROOM->POOL touches no fountain/sink counts', { timeout: 5000 }, () => {
        const c = setCell(5, 5, ROOM);
        assert.equal(set_levltyp(5, 5, POOL), true);
        assert.equal(c.typ, POOL);
        assert.equal(game.level.flags.nfountains, 2);
        assert.equal(game.level.flags.nsinks, 1);
    });

    it('LADDER->ROOM is refused by CAN_OVERWRITE (guard now live)', { timeout: 5000 }, () => {
        const c = setCell(5, 5, LADDER);
        assert.equal(set_levltyp(5, 5, ROOM), false);
        assert.equal(c.typ, LADDER);
    });

    it('dipsink_set_levltyp delegates (SINK->THRONE, nsinks--)', { timeout: 5000 }, () => {
        const c = setCell(5, 5, SINK);
        assert.equal(dipsink_set_levltyp(5, 5, THRONE), true);
        assert.equal(c.typ, THRONE);
        assert.equal(game.level.flags.nsinks, 0);
    });
});

// C ref: hack.c money_cnt `:4513–4522` — returns the FIRST coin
// stack's quan, not a sum. D-3319 deletes the summing fountain.js
// clone (:243) for this live export.
describe('live money_cnt first-stack (hack.c:4513-4522)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3319);
    });

    it('multi-stack invent returns the first stack only', { timeout: 5000 }, () => {
        const invent = [
            { oclass: COIN_CLASS, quan: 100 },
            { oclass: COIN_CLASS, quan: 50 },
        ];
        assert.equal(money_cnt(invent), 100);
    });

    it('no coins returns 0', { timeout: 5000 }, () => {
        assert.equal(money_cnt([{ oclass: 1, quan: 3 }]), 0);
        assert.equal(money_cnt([]), 0);
    });
});

// Live-name smoke: the D-3319 clone deletions (a_monnam, fingers_or_gloves)
// resolve to these exports through fountain.js's import graph.
describe('live name exports resolve (do_name/do_wear)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(3319);
        game.u = { ux: 5, uy: 5 };
        game.iflags = { window_inited: true };
    });

    it('a_monnam resolves for the drinksink call shape', { timeout: 5000 }, () => {
        // Unspotted fixture → x_monnam falls back to "it" (naming detail
        // lives in x_monnam; drinksink only calls this arm when spotted).
        // Guards the import edge + no-throw on the (mtmp) shape.
        const s = a_monnam({ data: { name: 'sewer rat' }, mx: 5, my: 5, mhp: 4 });
        assert.equal(typeof s, 'string');
        assert.ok(s.length > 0);
    });

    it('fingers_or_gloves(true) names worn gloves', { timeout: 5000 }, () => {
        game.u.uarmg = { otyp: 0 };
        assert.match(fingers_or_gloves(true), /gloves|gauntlets/);
    });
});
