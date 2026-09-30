import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { nhl_abs_coord, cvt_to_abscoord } from '../js/mklev.js';

// C ref: sp_lev.c cvt_to_abscoord `:4771–4788` + nhl_abs_coord
// `:4810–4836` (the `nh.abscoord` entry, nhlua.c `:1863`). Pins the
// coder-room vs xstart/ystart origin split, the pair arm's
// lua_tointeger mistype-is-0 rule (never an error), the table
// arm's get_table_int checkinteger throws, the [x, y] vs {x, y}
// return shapes (C pushes 2 values vs 1 table), and every
// nhl_error arm. No RNG on any arm.
describe('cvt_to_abscoord (sp_lev.c:4771-4788)', () => {
    let savedGc, savedXstart, savedYstart;
    beforeEach(() => {
        savedGc = game.gc;
        savedXstart = game.splev_xstart;
        savedYstart = game.splev_ystart;
    });
    afterEach(() => {
        game.gc = savedGc;
        game.splev_xstart = savedXstart;
        game.splev_ystart = savedYstart;
    });

    it('adds the coder-room origin when a room is active (C :4781-4783)', () => {
        game.gc = { coder: { croom: { lx: 5, ly: 7 } } };
        game.splev_xstart = 1;
        game.splev_ystart = 0;
        const xy = { x: 10, y: 10 };
        cvt_to_abscoord(xy);
        assert.deepEqual([xy.x, xy.y], [15, 17]);
    });

    it('adds xstart/ystart when no coder exists (C :4784-4786)', () => {
        game.gc = null;
        game.splev_xstart = 3;
        game.splev_ystart = 4;
        const xy = { x: 10, y: 10 };
        cvt_to_abscoord(xy);
        assert.deepEqual([xy.x, xy.y], [13, 14]);
    });

    it('adds xstart/ystart when the coder has no room (C :4781 else)', () => {
        game.gc = { coder: { croom: null } };
        game.splev_xstart = 1;
        game.splev_ystart = 0;
        const xy = { x: 10, y: 10 };
        cvt_to_abscoord(xy);
        assert.deepEqual([xy.x, xy.y], [11, 10]);
    });

    it('mutates in place and returns undefined (C void out-params)', () => {
        game.gc = null;
        game.splev_xstart = 0;
        game.splev_ystart = 0;
        const xy = { x: 1, y: 2 };
        assert.equal(cvt_to_abscoord(xy), undefined);
        assert.deepEqual([xy.x, xy.y], [1, 2]);
    });
});

describe('nhl_abs_coord (sp_lev.c:4810-4836)', () => {
    let savedGc, savedXstart, savedYstart;
    beforeEach(() => {
        savedGc = game.gc;
        savedXstart = game.splev_xstart;
        savedYstart = game.splev_ystart;
        game.gc = null;
        game.splev_xstart = 1;
        game.splev_ystart = 0;
    });
    afterEach(() => {
        game.gc = savedGc;
        game.splev_xstart = savedXstart;
        game.splev_ystart = savedYstart;
    });

    it('pair arm converts and returns [x, y] (C :4817-4822)', () => {
        assert.deepEqual(nhl_abs_coord(10, 20), [11, 20]);
    });

    it('pair arm uses the coder-room origin when active', () => {
        game.gc = { coder: { croom: { lx: 5, ly: 7 } } };
        assert.deepEqual(nhl_abs_coord(10, 20), [15, 27]);
    });

    it('pair arm truncates floats like lua_tointeger (C :4818-4819)', () => {
        assert.deepEqual(nhl_abs_coord(10.9, 20.9), [11, 20]);
    });

    it('pair arm converts numeric strings, mistypes are 0 not errors', () => {
        assert.deepEqual(nhl_abs_coord('10', '20'), [11, 20]);
        assert.deepEqual(nhl_abs_coord(null, undefined), [1, 0]);
        assert.deepEqual(nhl_abs_coord(true, {}), [1, 0]);
        assert.deepEqual(nhl_abs_coord('ten', NaN), [1, 0]);
    });

    it('table arm converts and returns a fresh {x, y} (C :4823-4830)', () => {
        const src = { x: 10, y: 20 };
        const out = nhl_abs_coord(src);
        assert.deepEqual(out, { x: 11, y: 20 });
        assert.notEqual(out, src);
        assert.deepEqual(src, { x: 10, y: 20 });
    });

    it('table arm throws on a missing/non-integer field (get_table_int)', () => {
        assert.throws(() => nhl_abs_coord({ y: 20 }), /number expected, got nil/);
        assert.throws(() => nhl_abs_coord({ x: 10 }), /number expected, got nil/);
        assert.throws(() => nhl_abs_coord([10, 20]), /number expected, got nil/);
    });

    it('wrong argc and non-table singles are nhl_error (C :4831-4833)', () => {
        assert.throws(() => nhl_abs_coord(), /nhl_abs_coord: Wrong args/);
        assert.throws(() => nhl_abs_coord(10), /nhl_abs_coord: Wrong args/);
        assert.throws(() => nhl_abs_coord(null), /nhl_abs_coord: Wrong args/);
        assert.throws(() => nhl_abs_coord(1, 2, 3), /nhl_abs_coord: Wrong args/);
    });
});
