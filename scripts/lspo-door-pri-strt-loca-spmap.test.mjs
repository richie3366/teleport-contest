// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Pri-strt/Pri-loca loaders inline sel_set_door
// (priDoor closures; D-2695/D-2697 split); both now carry the :4661
// game mark (D-3550, D-3548 Next). Des evidence verified at port time:
// Pri-strt.lua:53-70 = 18 des.door (locked 18,09; locked 18,10; closed
// 34,09; closed 34,10; closed 40,05; closed 46,05; closed 52,05; locked
// 38,07; closed 42,07; closed 46,07; closed 52,07; locked 38,12; closed
// 44,12; closed 48,12; closed 52,12; closed 40,14; closed 46,14; closed
// 52,14), Pri-loca.lua:38-43 = 6 des.door locked (10,06; 10,07; 20,02;
// 20,11; 30,06; 30,07) — each matches the JS call sites in order. Both
// bitmaps are C-complete (map :6292 via splev_apply_centered_map +
// stairs :4189 — strt down 52,09, loca up 43,05 + down 20,06; des
// order stair-before-doors (strt :51/:53-70) and doors-before-stairs
// (loca :38-43/:46-47) kept in JS; no des.mazewalk/des.drawbridge/
// des.ladder in either file; all doors coord-form, no wall-form).
// Neutrality: the loca lspo_map lit=FALSE whole-set read runs before
// the first priDoor call, so later adds cannot affect it; no SpLev_Map
// reader runs on these paths (remove_boundary_syms consults CROSSWALL
// cells only and is not called by these loaders; solidify_map fires on
// STWALL only and is not called; the maze readers run on mazewalk
// paths only; link_doors_rooms/map_cleanup/wallification/fixup_special
// and monsters/objects/traps are bitmap-clean — reader census this
// iter: :4183 solidify, :14274/:14486/:14674 tower solidifies, :19449
// boundary, :21612/:21655 maze — all gated or off-path); flip leaves
// the set unflipped per C (named omit).
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
    // Arrow-closure defs (`const priDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('pri-strt/loca door sites carry the sel_set_door :4661 mark', () => {
    it('pri-strt priDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_pri_strt');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'pri-strt priDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('pri-loca priDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_pri_loca');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'pri-loca priDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('des census: 18 strt + 6 loca closure sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_pri_strt');
        assert.equal(countCalls(strt, 'priDoor'), 18);
        let last = -1;
        for (const call of ['priDoor(18, 9, D_LOCKED)', 'priDoor(18, 10, D_LOCKED)',
            'priDoor(34, 9, D_CLOSED)', 'priDoor(34, 10, D_CLOSED)',
            'priDoor(40, 5, D_CLOSED)', 'priDoor(46, 5, D_CLOSED)',
            'priDoor(52, 5, D_CLOSED)', 'priDoor(38, 7, D_LOCKED)',
            'priDoor(42, 7, D_CLOSED)', 'priDoor(46, 7, D_CLOSED)',
            'priDoor(52, 7, D_CLOSED)', 'priDoor(38, 12, D_LOCKED)',
            'priDoor(44, 12, D_CLOSED)', 'priDoor(48, 12, D_CLOSED)',
            'priDoor(52, 12, D_CLOSED)', 'priDoor(40, 14, D_CLOSED)',
            'priDoor(46, 14, D_CLOSED)', 'priDoor(52, 14, D_CLOSED)']) {
            const at = strt.indexOf(call, last + 1);
            assert.ok(at > last, `pri-strt must call ${call} in des order`);
            last = at;
        }
        const loca = loaderBody(src, 'load_pri_loca');
        assert.equal(countCalls(loca, 'priDoor'), 6);
        last = -1;
        for (const call of ['priDoor(10, 6, D_LOCKED)', 'priDoor(10, 7, D_LOCKED)',
            'priDoor(20, 2, D_LOCKED)', 'priDoor(20, 11, D_LOCKED)',
            'priDoor(30, 6, D_LOCKED)', 'priDoor(30, 7, D_LOCKED)']) {
            const at = loca.indexOf(call, last + 1);
            assert.ok(at > last, `pri-loca must call ${call} in des order`);
            last = at;
        }
    });

    it('des order: stair-before-doors (strt :51/:53-70), doors-before-stairs (loca :38-43/:46-47)', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_pri_strt');
        assert.ok(strt.indexOf('mkstairs(mx + 52, my + 9, 0, null, true);')
            < strt.indexOf('priDoor(18, 9, D_LOCKED);'),
            'Pri-strt.lua :51 stair precedes the :53-70 doors');
        const loca = loaderBody(src, 'load_pri_loca');
        const lastDoor = 'priDoor(30, 7, D_LOCKED);';
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 43, my + 5, 1, null, true);'),
            'Pri-loca.lua :38-43 doors precede the :46 up stair');
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 20, my + 6, 0, null, true);'),
            'Pri-loca.lua :38-43 doors precede the :47 down stair');
        assert.ok(loca.indexOf('for (const key of sp)') < loca.indexOf('priDoor(10, 6, D_LOCKED);'),
            'loca lit=FALSE whole-set read must predate the first door mark');
    });

    it('map + stair marks already carried; no mazewalk/drawbridge', () => {
        const src = readFileSync(SRC, 'utf8');
        const strt = loaderBody(src, 'load_pri_strt');
        assert.ok(strt.includes('splev_apply_centered_map(PRI_STRT_MAP)'),
            'pri-strt map cells marked via the shared :6292 path');
        assert.ok(strt.includes('`${mx + 52},${my + 9}`); // C :4189'),
            'pri-strt down stair marked :4189');
        assert.ok(!strt.includes('mazewalk(') && !strt.includes('fill_empty_maze(')
            && !strt.includes('drawbridge(') && !strt.includes('solidify_map('),
            'pri-strt carries no mazewalk/drawbridge/solidify path');
        const loca = loaderBody(src, 'load_pri_loca');
        assert.ok(loca.includes('splev_apply_centered_map(PRI_LOCA_MAP)'),
            'pri-loca map cells marked via the shared :6292 path');
        assert.ok(loca.includes('`${mx + 43},${my + 5}`); // C :4189'),
            'pri-loca up stair marked :4189');
        assert.ok(loca.includes('`${mx + 20},${my + 6}`); // C :4189'),
            'pri-loca down stair marked :4189');
        assert.ok(!loca.includes('mazewalk(') && !loca.includes('fill_empty_maze(')
            && !loca.includes('drawbridge(') && !loca.includes('solidify_map('),
            'pri-loca carries no mazewalk/drawbridge/solidify path');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('priDoor (Pri-strt 18 + Pri-loca 6, D-3550)'),
            'sel_set_door doc must list the D-3550 closures');
        assert.ok(src.includes('barDoor (Bar-loca 10) + barGoalDoor (Bar-goal 2, D-3548)'),
            'D-3548 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3550\)/g) || []).length >= 2,
            'both pri loader docs must carry the D-3550 close-out');
    });
});
