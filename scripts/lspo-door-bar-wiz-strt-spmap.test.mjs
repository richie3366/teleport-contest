// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Bar-strt/Wiz-strt loaders inline sel_set_door
// (barDoor/wizDoor closures; D-2695/D-2697 split); both now carry the
// :4661 game mark (D-3540, D-3538 Next). Des evidence verified at port
// time: Bar-strt.lua:63-70 = 8 des.door (locked 12,05; locked 12,09;
// closed 21,07; open 07,13; open 18,13; open 23,13; open 25,10; open
// 28,05), Wiz-strt.lua:55-62 = 8 des.door (closed 31,09; closed 16,08;
// closed 28,07; locked 34,10; locked 35,10; closed 15,10; locked 19,10;
// locked 20,10) — each matches the JS call sites in order. Both
// bitmaps are C-complete (map :6292 via splev_apply_centered_map +
// stairs :4189 — down 09,09 / 30,10 — + doors; no drawbridge/ladder/
// mazewalk in either file). Neutrality: no SpLev_Map reader runs after
// the door sites on these paths (no solidify_map call — named omission;
// remove_boundary_syms in the Wiz-strt epilogue fires on CROSSWALL cells
// only, never on DOOR/SDOOR; link_doors_rooms/map_cleanup/fixup_special/
// wallification/flip are bitmap-clean; monsters/objects/traps don't read).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const SRC = new URL('../js/mklev.js', import.meta.url);

function loaderBody(src, name) {
    const m = src.match(new RegExp(`^(?:export\\s+)?(?:async\\s+)?function ${name}\\(`,
        'm'));
    assert.ok(m && m.index !== undefined, `${name} def missing in js/mklev.js`);
    const rest = src.slice(m.index + m[0].length);
    const next = rest.search(/^(?:export\s+)?(?:async\s+)?function [A-Za-z_0-9]+\(/m);
    assert.ok(next > 0, `next def must follow ${name} in js/mklev.js`);
    return rest.slice(0, next);
}

function countCalls(body, name) {
    // Arrow-closure defs (`const barDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('bar/wiz strt door sites carry the sel_set_door :4661 mark', () => {
    it('bar_strt barDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_bar_strt');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'bar_strt barDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('wiz_strt wizDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_wiz_strt');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'wiz_strt wizDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('des census: 8 + 8 door sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const bar = loaderBody(src, 'load_bar_strt');
        assert.equal(countCalls(bar, 'barDoor'), 8);
        for (const call of ['barDoor(12, 5, D_LOCKED)', 'barDoor(12, 9, D_LOCKED)',
            'barDoor(21, 7, D_CLOSED)', 'barDoor(7, 13, D_ISOPEN)',
            'barDoor(18, 13, D_ISOPEN)', 'barDoor(23, 13, D_ISOPEN)',
            'barDoor(25, 10, D_ISOPEN)', 'barDoor(28, 5, D_ISOPEN)']) {
            assert.ok(bar.includes(call), `bar_strt must call ${call}`);
        }
        const wiz = loaderBody(src, 'load_wiz_strt');
        assert.equal(countCalls(wiz, 'wizDoor'), 8);
        for (const call of ['wizDoor(31, 9, D_CLOSED)', 'wizDoor(16, 8, D_CLOSED)',
            'wizDoor(28, 7, D_CLOSED)', 'wizDoor(34, 10, D_LOCKED)',
            'wizDoor(35, 10, D_LOCKED)', 'wizDoor(15, 10, D_CLOSED)',
            'wizDoor(19, 10, D_LOCKED)', 'wizDoor(20, 10, D_LOCKED)']) {
            assert.ok(wiz.includes(call), `wiz_strt must call ${call}`);
        }
    });

    it('bar/wiz C order: stairs before doors (des :59/:63, :50/:55)', () => {
        const src = readFileSync(SRC, 'utf8');
        const bar = loaderBody(src, 'load_bar_strt');
        assert.ok(bar.indexOf('mkstairs(mx + 9, my + 9, 0, null, true);')
            < bar.indexOf('barDoor(12, 5, D_LOCKED);'),
            'Bar-strt.lua :59 stair precedes :63-70 doors');
        const wiz = loaderBody(src, 'load_wiz_strt');
        assert.ok(wiz.indexOf('mkstairs(mx + 30, my + 10, 0, null, true);')
            < wiz.indexOf('wizDoor(31, 9, D_CLOSED);'),
            'Wiz-strt.lua :50 stair precedes :55-62 doors');
    });

    it('bar/wiz map + stair marks already carried', () => {
        const src = readFileSync(SRC, 'utf8');
        const bar = loaderBody(src, 'load_bar_strt');
        assert.ok(bar.includes('splev_apply_centered_map(BAR_STRT_MAP)'),
            'bar_strt map cells marked via the shared :6292 path');
        assert.ok(bar.includes('`${mx + 9},${my + 9}`); // C :4189'),
            'bar_strt down stair marked :4189');
        const wiz = loaderBody(src, 'load_wiz_strt');
        assert.ok(wiz.includes('splev_apply_centered_map(WIZ_STRT_MAP)'),
            'wiz_strt map cells marked via the shared :6292 path');
        assert.ok(wiz.includes('`${mx + 30},${my + 10}`); // C :4189'),
            'wiz_strt down stair marked :4189');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('wizDoor (Wiz-strt 8, D-3540)'),
            'sel_set_door doc must list the D-3540 closures');
        assert.ok(src.includes('medusa-2 inline (16 sites, D-3538)'),
            'D-3538 census substring preserved');
        assert.equal(
            (src.match(/C :6292\/:4189\/:4661; D-3540\)/g) || []).length, 2);
    });
});
