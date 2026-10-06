// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Arc-strt/Arc-loca loaders inline sel_set_door
// (arcDoor closures; D-2695/D-2697 split); both now carry the :4661
// game mark (D-3552, D-3550 Next). Des evidence verified at port time:
// Arc-strt.lua:60-71 = 12 des.door (closed 22,07; closed 38,07; locked
// 47,08; locked 23,10; locked 39,10; locked 57,10; locked 47,12; closed
// 22,13; closed 38,13; locked 24,14; closed 31,14; locked 49,14),
// Arc-loca.lua:48-63 = 16 des.door (closed 31,04; closed 28,08; locked
// 29,10; closed 28,12; closed 31,16; locked 34,05; locked 35,10; locked
// 38,10; closed 43,10; closed 45,08; locked 46,14; locked 46,15; locked
// 49,10; locked 52,11; closed 52,13; closed 54,15) — each matches the JS
// call sites in order. Both bitmaps are C-complete (map :6292 via
// splev_apply_centered_map + stairs :4189 — strt down 55,07, loca up
// 03,17 + down 39,10; des order stair-before-doors (strt :56/:60-71)
// and doors-before-stairs (loca :48-63/:65-66) kept in JS; no
// des.mazewalk/des.drawbridge/des.ladder in either file; all doors
// coord-form, no wall-form; Arc-goal/fila/filb carry no des.door).
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
    // Arrow-closure defs (`const arcDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('arc-strt/loca door sites carry the sel_set_door :4661 mark', () => {
    it('arc-strt arcDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_arc_strt');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'arc-strt arcDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('arc-loca arcDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_arc_loca');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'arc-loca arcDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('des census: 12 strt + 16 loca closure sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_arc_strt');
        assert.equal(countCalls(strt, 'arcDoor'), 12);
        let last = -1;
        for (const call of ['arcDoor(22, 7, D_CLOSED)', 'arcDoor(38, 7, D_CLOSED)',
            'arcDoor(47, 8, D_LOCKED)', 'arcDoor(23, 10, D_LOCKED)',
            'arcDoor(39, 10, D_LOCKED)', 'arcDoor(57, 10, D_LOCKED)',
            'arcDoor(47, 12, D_LOCKED)', 'arcDoor(22, 13, D_CLOSED)',
            'arcDoor(38, 13, D_CLOSED)', 'arcDoor(24, 14, D_LOCKED)',
            'arcDoor(31, 14, D_CLOSED)', 'arcDoor(49, 14, D_LOCKED)']) {
            const at = strt.indexOf(call, last + 1);
            assert.ok(at > last, `arc-strt must call ${call} in des order`);
            last = at;
        }
        const loca = loaderBody(src, 'load_arc_loca');
        assert.equal(countCalls(loca, 'arcDoor'), 16);
        last = -1;
        for (const call of ['arcDoor(31, 4, D_CLOSED)', 'arcDoor(28, 8, D_CLOSED)',
            'arcDoor(29, 10, D_LOCKED)', 'arcDoor(28, 12, D_CLOSED)',
            'arcDoor(31, 16, D_CLOSED)', 'arcDoor(34, 5, D_LOCKED)',
            'arcDoor(35, 10, D_LOCKED)', 'arcDoor(38, 10, D_LOCKED)',
            'arcDoor(43, 10, D_CLOSED)', 'arcDoor(45, 8, D_CLOSED)',
            'arcDoor(46, 14, D_LOCKED)', 'arcDoor(46, 15, D_LOCKED)',
            'arcDoor(49, 10, D_LOCKED)', 'arcDoor(52, 11, D_LOCKED)',
            'arcDoor(52, 13, D_CLOSED)', 'arcDoor(54, 15, D_CLOSED)']) {
            const at = loca.indexOf(call, last + 1);
            assert.ok(at > last, `arc-loca must call ${call} in des order`);
            last = at;
        }
    });

    it('des order: stair-before-doors (strt :56/:60-71), doors-before-stairs (loca :48-63/:65-66)', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_arc_strt');
        assert.ok(strt.indexOf('mkstairs(mx + 55, my + 7, 0, null, true);')
            < strt.indexOf('arcDoor(22, 7, D_CLOSED);'),
            'Arc-strt.lua :56 stair precedes the :60-71 doors');
        const loca = loaderBody(src, 'load_arc_loca');
        const lastDoor = 'arcDoor(54, 15, D_CLOSED);';
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 3, my + 17, 1, null, true);'),
            'Arc-loca.lua :48-63 doors precede the :65 up stair');
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 39, my + 10, 0, null, true);'),
            'Arc-loca.lua :48-63 doors precede the :66 down stair');
    });

    it('map + stair marks already carried; no mazewalk/drawbridge/solidify; no whole-set read', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_arc_strt');
        assert.ok(strt.includes('splev_apply_centered_map(ARC_STRT_MAP)'),
            'arc-strt map cells marked via the shared :6292 path');
        assert.ok(strt.includes('`${mx + 55},${my + 7}`); // C :4189'),
            'arc-strt down stair marked :4189');
        assert.ok(!strt.includes('mazewalk(') && !strt.includes('fill_empty_maze(')
            && !strt.includes('drawbridge(') && !strt.includes('solidify_map('),
            'arc-strt carries no mazewalk/drawbridge/solidify path');
        assert.ok(!strt.includes('for (const key of sp)'),
            'arc-strt carries no whole-set SpLev_Map read');
        const loca = loaderBody(src, 'load_arc_loca');
        assert.ok(loca.includes('splev_apply_centered_map(ARC_LOCA_MAP)'),
            'arc-loca map cells marked via the shared :6292 path');
        assert.ok(loca.includes('`${mx + 3},${my + 17}`); // C :4189'),
            'arc-loca up stair marked :4189');
        assert.ok(loca.includes('`${mx + 39},${my + 10}`); // C :4189'),
            'arc-loca down stair marked :4189');
        assert.ok(!loca.includes('mazewalk(') && !loca.includes('fill_empty_maze(')
            && !loca.includes('drawbridge(') && !loca.includes('solidify_map('),
            'arc-loca carries no mazewalk/drawbridge/solidify path');
        assert.ok(!loca.includes('for (const key of sp)'),
            'arc-loca carries no whole-set SpLev_Map read');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('arcDoor (Arc-strt 12 + Arc-loca 16, D-3552)'),
            'sel_set_door doc must list the D-3552 closures');
        assert.ok(src.includes('priDoor (Pri-strt 18 + Pri-loca 6, D-3550)'),
            'D-3550 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3552\)/g) || []).length >= 2,
            'both arc loader docs must carry the D-3552 close-out');
    });
});
