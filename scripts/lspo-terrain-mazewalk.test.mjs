import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import {
    COLNO, ROWNO, STONE, ROOM, CORR, NO_ROOM,
} from '../js/const.js';
import {
    lspo_mazewalk,
    lspo_terrain,
    selection_new,
    selection_setpoint,
    selection_free,
} from '../js/mklev.js';
import { initRng } from '../js/rng.js';

// C ref: sp_lev.c lspo_mazewalk `:5769–5869` + lspo_terrain
// `:4978–5038`. Pins the unpacked dispatch (every argc arm), the
// mazewalk one-step move + odd-parity writes, the terrain selection
// vs single-cell split, and the nhl_error throws. walkfrom's own
// carve is covered by corpus REACH (`--fn lspo_mazewalk`), not here:
// with stocked:false only the two deterministic pre-writes are
// asserted (walkfrom writes the same ftyp everywhere it touches).
function makeLevel() {
    const cells = new Map();
    return {
        flags: {},
        at(x, y) {
            if (x < 0 || y < 0 || x >= COLNO || y >= ROWNO) return null;
            const k = `${x},${y}`;
            let c = cells.get(k);
            if (!c) {
                c = {
                    typ: STONE, flags: 1, lit: 0, roomno: NO_ROOM,
                    horizontal: false, edge: false, doormask: 0,
                };
                cells.set(k, c);
            }
            return c;
        },
    };
}

describe('lspo_terrain (sp_lev.c:4978-5038)', () => {
    // Packed coords land on the full-level origin: create_des_coder ->
    // sp_level_coder_init runs reset_xystart_size (C :6373), so with a
    // null croom every packed (x,y) below resolves to (x+1,y).
    let savedLevel, savedGc;
    beforeEach(() => {
        savedLevel = game.level;
        savedGc = game.gc;
        game.level = makeLevel();
        game.gc = null;
        initRng(42);
    });
    afterEach(() => {
        game.level = savedLevel;
        game.gc = savedGc;
    });

    it('triple form sets one cell in C order (C :5013-5016, :5034)', () => {
        assert.equal(lspo_terrain(5, 5, '.'), 0);
        const c = game.level.at(6, 5);
        assert.equal(c.typ, ROOM);
        assert.equal(c.flags, 0);
        assert.equal(c.roomno, NO_ROOM);
    });

    it('table form reads typ/lit via get_table_mapchr + int_opt (C :4989-5001)', () => {
        assert.equal(lspo_terrain({ x: 6, y: 6, typ: '#', lit: 1 }), 0);
        const c = game.level.at(7, 6);
        assert.equal(c.typ, CORR);
        assert.equal(c.lit, 1);
    });

    it('(coord, typ) pair takes the LUA_TTABLE arm (C :5002-5009)', () => {
        assert.equal(lspo_terrain({ x: 7, y: 7 }, '.'), 0);
        assert.equal(game.level.at(8, 7).typ, ROOM);
    });

    it('(selection, typ) pair iterates every point (C :5010-5012, :5024-5025)', () => {
        const sel = selection_new();
        selection_setpoint(10, 10, sel, 1);
        selection_setpoint(11, 10, sel, 1);
        assert.equal(lspo_terrain(sel, '.'), 0);
        assert.equal(game.level.at(10, 10).typ, ROOM);
        assert.equal(game.level.at(11, 10).typ, ROOM);
        assert.equal(game.level.at(12, 10).typ, STONE);
        selection_free(sel, true);
    });

    it('table -1,-1 reads the selection field (C :4995-4997)', () => {
        const sel = selection_new();
        selection_setpoint(14, 8, sel, 1);
        assert.equal(lspo_terrain({ selection: sel, typ: '#' }), 0);
        assert.equal(game.level.at(14, 8).typ, CORR);
        selection_free(sel, true);
    });

    it('table -1,-1 without a selection throws (C :4997 l_selection_check)', () => {
        assert.throws(() => lspo_terrain({ typ: '.' }), /selection expected/);
        assert.throws(() => lspo_terrain({ x: -1, y: -1, typ: '.' }), /selection expected/);
    });

    it('missing/bad typ throws Erroneous map char (C :5000, :5021-5022)', () => {
        assert.throws(() => lspo_terrain({ x: 5, y: 5 }), /Erroneous map char/);
        assert.throws(() => lspo_terrain({ x: 5, y: 5, typ: 'toolong' }), /Erroneous map char/);
        assert.throws(() => lspo_terrain({ x: 5, y: 5, typ: '?' }), /Erroneous map char/);
        assert.throws(() => lspo_terrain(5, 5, '??'), /Erroneous map char/);
    });

    it('non-string type arg and bad arity throw like C checkstring/:5018', () => {
        assert.throws(() => lspo_terrain(5, 5, 42), /Wrong parameters/);
        assert.throws(() => lspo_terrain({ x: 1, y: 1 }, 42), /selection expected/);
        assert.throws(() => lspo_terrain(), /Wrong parameters/);
        assert.throws(() => lspo_terrain(1, 2, '.', 'extra'), /Wrong parameters/);
        assert.throws(() => lspo_terrain(42), /Wrong parameters/);
    });
});

describe('lspo_mazewalk (sp_lev.c:5769-5869)', () => {
    // Same (x+1,y) packed origin as above (C :6373 reset_xystart_size).
    let savedLevel, savedGc;
    beforeEach(() => {
        savedLevel = game.level;
        savedGc = game.gc;
        game.level = makeLevel();
        game.gc = null;
        initRng(42);
    });
    afterEach(() => {
        game.level = savedLevel;
        game.gc = savedGc;
    });

    it('east table step writes the step cell + the even-x fixup (C :5826-5828, :5846-5854)', () => {
        assert.equal(lspo_mazewalk({ x: 2, y: 3, dir: 'east', stocked: false }), 0);
        // (2,3)->(3,3) origin, east to (4,3) written; x=4 even + EAST -> (5,3) written.
        assert.equal(game.level.at(4, 3).typ, ROOM);
        assert.equal(game.level.at(4, 3).flags, 0);
        assert.equal(game.level.at(5, 3).typ, ROOM);
        assert.equal(game.level.at(5, 3).flags, 0);
    });

    it('south triple step writes the step cell (C :5786-5789, :5823-5824)', () => {
        // Triple form keeps fstocked=1 (C :5780), so saturate SpLev_Map
        // to take fill_empty_maze's mapcount early return (C sp_lev.c
        // fill_empty_maze); walkfrom's carve itself runs on the grid.
        // A pre-installed coder (the normal multi-entry des state) keeps
        // create_des_coder from resetting the map (C :6366).
        const XMM = (COLNO - 1) & ~1, YMM = (ROWNO - 1) & ~1;
        const savedMap = game.SpLev_Map;
        const savedXs = game.splev_xstart, savedYs = game.splev_ystart;
        game.gc = { coder: { croom: null } };
        game.splev_xstart = 1; // C :6373 reset_xystart_size values
        game.splev_ystart = 0;
        game.SpLev_Map = new Set();
        for (let x = 2; x < XMM; x++)
            for (let y = 0; y < YMM; y++) game.SpLev_Map.add(`${x},${y}`);
        try {
            assert.equal(lspo_mazewalk(3, 3, 'south'), 0);
        } finally {
            game.SpLev_Map = savedMap;
            game.splev_xstart = savedXs;
            game.splev_ystart = savedYs;
        }
        // (3,3)->(4,3) origin, south to (4,4) written ROOM (default ftyp);
        // x=4 even + non-EAST also writes the (3,4) fixup (C :5849-5854).
        assert.equal(game.level.at(4, 4).typ, ROOM);
        assert.equal(game.level.at(4, 4).flags, 0);
        assert.equal(game.level.at(3, 4).typ, ROOM);
    });

    it('south table step from odd x writes the step cell only (C :5811-5813 ftyp kept)', () => {
        // stocked:false skips fill_empty_maze (C :5865-5866); typ '#' picks CORR.
        assert.equal(lspo_mazewalk({ x: 4, y: 5, dir: 'south', typ: '#', stocked: false }), 0);
        // (4,5)->(5,5) origin, south to (5,6) written CORR; x=5 odd so
        // no x-fixup write (C :5846 skipped). walkfrom's later carve
        // from (5,7) writes the same ftyp, so only the pre-write is pinned.
        assert.equal(game.level.at(5, 6).typ, CORR);
        assert.equal(game.level.at(5, 6).flags, 0);
    });

    it('bad dir / bad typ / non-table throw like C nhl_error', () => {
        assert.throws(() => lspo_mazewalk({ x: 3, y: 3, dir: 'up' }), /bad option/);
        assert.throws(() => lspo_mazewalk({ x: 3, y: 3, typ: '?' }), /Erroneous map char/);
        assert.throws(() => lspo_mazewalk(42), /Wrong parameters/);
        assert.throws(() => lspo_mazewalk(3, 3, 'sideways'), /bad option/);
    });
});
