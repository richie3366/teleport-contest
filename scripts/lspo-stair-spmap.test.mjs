// C ref: sp_lev.c l_create_stairway `:4187–4189` — deltrap(badtrap), then
// the unconditional `SpLev_Map[x][y] = 1`, then the ladder/mkstairs
// placement. The two random-arm helpers (plain des stairs and des.stair
// inside des.room) implemented the :4180/:4186 good_stair_loc window and
// the :4187–4188 deltrap but dropped the :4189 mark; their ~90 call
// sites are all des-level loaders (load_bigrm/load_*_fila/load_hellfill
// /load_minefill/request-room paths), where C marks unconditionally.
// Both helpers now carry the mark in C order (after deltrap, before
// mkstairs), mirroring the l_create_stairway `:23457–23458` idiom
// (l_create_stairway itself marks both arms — pinned here as the
// reference). Fixed des.stair sites in special levels now carry the
// mark + fixed force (lspo-stair-fixed-spmap.test.mjs); quest + soko
// fixed sites stay raw (in-code named omit at l_create_stairway).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const MARK_NEW = 'if (!game.SpLev_Map) game.SpLev_Map = new Set();';
const MARK_ADD = 'game.SpLev_Map.add(`${pos.x},${pos.y}`); // C :4189';

function helperBody(src, defLine, nextDefLine) {
    const at = src.indexOf(defLine);
    assert.ok(at >= 0, `${defLine} missing in js/mklev.js`);
    const end = src.indexOf(nextDefLine, at + 1);
    assert.ok(end > at, `${nextDefLine} must follow ${defLine} in js/mklev.js`);
    return src.slice(at, end);
}

describe('random des.stair helpers carry the l_create_stairway :4189 SpLev_Map mark', () => {
    it('splev_create_stair marks in C order (deltrap, mark, mkstairs)', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const body = helperBody(src, 'function splev_create_stair(up) {', 'function splev_create_trap(type) {');
        assert.ok(body.includes(MARK_NEW), 'splev_create_stair must create the SpLev_Map set');
        assert.ok(body.includes(MARK_ADD), 'splev_create_stair must add the :4189 mark');
        assert.ok(body.indexOf('deltrap(trap)') < body.indexOf(MARK_ADD),
            'C order :4187–4189: deltrap before the mark');
        assert.ok(body.indexOf(MARK_ADD) < body.indexOf('mkstairs(pos.x, pos.y, up ? 1 : 0, null)'),
            'C order :4189/:4211: mark before mkstairs');
    });

    it('splev_room_stair marks in C order (deltrap, mark, mkstairs)', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const body = helperBody(src, 'function splev_room_stair(croom, up) {', 'function splev_room_trap(croom) {');
        assert.ok(body.includes(MARK_NEW), 'splev_room_stair must create the SpLev_Map set');
        assert.ok(body.includes(MARK_ADD), 'splev_room_stair must add the :4189 mark');
        assert.ok(body.indexOf('deltrap(trap)') < body.indexOf(MARK_ADD),
            'C order :4187–4189: deltrap before the mark');
        assert.ok(body.indexOf(MARK_ADD) < body.indexOf('mkstairs(pos.x, pos.y, up ? 1 : 0, croom)'),
            'C order :4189/:4211: mark before mkstairs');
    });

    it('l_create_stairway keeps the reference mark both helpers mirror', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const body = helperBody(src, 'export function l_create_stairway(', 'export function lspo_stair(');
        assert.ok(body.includes(MARK_NEW), 'l_create_stairway must keep creating the SpLev_Map set');
        assert.ok(body.includes('game.SpLev_Map.add(`${x},${y}`);'),
            'l_create_stairway must keep the reference mark');
    });
});
