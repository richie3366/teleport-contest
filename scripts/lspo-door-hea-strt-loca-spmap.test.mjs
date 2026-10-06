// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Hea-strt/Hea-loca loaders inline sel_set_door
// (heaDoor/heaLocaDoor closures; D-2695/D-2697 split); both now carry
// the :4661 game mark (D-3554, D-3552 Next). Des evidence verified at
// port time: Hea-strt.lua:50-61 = 12 des.door (locked 24,10; closed
// 26,08; closed 27,12; locked 28,13; closed 35,07; locked 35,10;
// locked 39,10; closed 39,13; locked 46,07; closed 47,08; closed
// 48,12; locked 50,10), Hea-loca.lua:28-31 = 4 des.door (closed 09,04;
// closed 09,05; locked 11,03; locked 11,06) — each matches the JS call
// sites in order. Both bitmaps are C-complete (map :6292 via
// splev_apply_centered_map + stairs :4189 — strt down 37,09, loca up
// 04,04 + down 20,06; des order stair-before-doors (strt :44/:50-61)
// and doors-before-stairs (loca :28-31/:33-34) kept in JS; no
// des.mazewalk/des.drawbridge/des.ladder in either file; all doors
// coord-form, no wall-form; Hea-goal/fila/filb carry no des.door).
// Neutrality: no whole-set SpLev_Map iteration exists in either body
// (the lit/non_diggable region loops iterate coordinates, never the
// set); no SpLev_Map reader runs on these paths (solidify_map fires on
// STWALL only and is not called; remove_boundary_syms consults
// CROSSWALL cells only and is not called; the maze readers run on
// mazewalk paths only — absent here; link_doors_rooms/map_cleanup/
// wallification/fixup_special and monsters/objects/traps are
// bitmap-clean; reader census this iter); flip leaves the set
// unflipped per C (named omit).
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
    // Arrow-closure defs (`const heaDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('hea-strt/loca door sites carry the sel_set_door :4661 mark', () => {
    it('hea-strt heaDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_hea_strt');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'hea-strt heaDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('hea-loca heaLocaDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_hea_loca');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'hea-loca heaLocaDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('des census: 12 strt + 4 loca closure sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_hea_strt');
        assert.equal(countCalls(strt, 'heaDoor'), 12);
        let last = -1;
        for (const call of ['heaDoor(24, 10, D_LOCKED)', 'heaDoor(26, 8, D_CLOSED)',
            'heaDoor(27, 12, D_CLOSED)', 'heaDoor(28, 13, D_LOCKED)',
            'heaDoor(35, 7, D_CLOSED)', 'heaDoor(35, 10, D_LOCKED)',
            'heaDoor(39, 10, D_LOCKED)', 'heaDoor(39, 13, D_CLOSED)',
            'heaDoor(46, 7, D_LOCKED)', 'heaDoor(47, 8, D_CLOSED)',
            'heaDoor(48, 12, D_CLOSED)', 'heaDoor(50, 10, D_LOCKED)']) {
            const at = strt.indexOf(call, last + 1);
            assert.ok(at > last, `hea-strt must call ${call} in des order`);
            last = at;
        }
        const loca = loaderBody(src, 'load_hea_loca');
        assert.equal(countCalls(loca, 'heaLocaDoor'), 4);
        last = -1;
        for (const call of ['heaLocaDoor(9, 4, D_CLOSED)', 'heaLocaDoor(9, 5, D_CLOSED)',
            'heaLocaDoor(11, 3, D_LOCKED)', 'heaLocaDoor(11, 6, D_LOCKED)']) {
            const at = loca.indexOf(call, last + 1);
            assert.ok(at > last, `hea-loca must call ${call} in des order`);
            last = at;
        }
    });

    it('des order: stair-before-doors (strt :44/:50-61), doors-before-stairs (loca :28-31/:33-34)', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_hea_strt');
        assert.ok(strt.indexOf('mkstairs(mx + 37, my + 9, 0, null, true);')
            < strt.indexOf('heaDoor(24, 10, D_LOCKED);'),
            'Hea-strt.lua :44 stair precedes the :50-61 doors');
        const loca = loaderBody(src, 'load_hea_loca');
        const lastDoor = 'heaLocaDoor(11, 6, D_LOCKED);';
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 4, my + 4, 1, null, true);'),
            'Hea-loca.lua :28-31 doors precede the :33 up stair');
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 20, my + 6, 0, null, true);'),
            'Hea-loca.lua :28-31 doors precede the :34 down stair');
    });

    it('map + stair marks already carried; no mazewalk/drawbridge/solidify; no whole-set read', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_hea_strt');
        assert.ok(strt.includes('splev_apply_centered_map(HEA_STRT_MAP)'),
            'hea-strt map cells marked via the shared :6292 path');
        assert.ok(strt.includes('`${mx + 37},${my + 9}`); // C :4189'),
            'hea-strt down stair marked :4189');
        assert.ok(!strt.includes('mazewalk(') && !strt.includes('fill_empty_maze(')
            && !strt.includes('drawbridge(') && !strt.includes('solidify_map('),
            'hea-strt carries no mazewalk/drawbridge/solidify path');
        assert.ok(!strt.includes('for (const key of sp)'),
            'hea-strt carries no whole-set SpLev_Map read');
        const loca = loaderBody(src, 'load_hea_loca');
        assert.ok(loca.includes('splev_apply_centered_map(HEA_LOCA_MAP)'),
            'hea-loca map cells marked via the shared :6292 path');
        assert.ok(loca.includes('`${mx + 4},${my + 4}`); // C :4189'),
            'hea-loca up stair marked :4189');
        assert.ok(loca.includes('`${mx + 20},${my + 6}`); // C :4189'),
            'hea-loca down stair marked :4189');
        assert.ok(!loca.includes('mazewalk(') && !loca.includes('fill_empty_maze(')
            && !loca.includes('drawbridge(') && !loca.includes('solidify_map('),
            'hea-loca carries no mazewalk/drawbridge/solidify path');
        assert.ok(!loca.includes('for (const key of sp)'),
            'hea-loca carries no whole-set SpLev_Map read');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('heaDoor (Hea-strt 12) + heaLocaDoor (Hea-loca 4, D-3554)'),
            'sel_set_door doc must list the D-3554 closures');
        assert.ok(src.includes('arcDoor (Arc-strt 12 + Arc-loca 16, D-3552)'),
            'D-3552 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3554\)/g) || []).length >= 2,
            'both hea loader docs must carry the D-3554 close-out');
    });
});
