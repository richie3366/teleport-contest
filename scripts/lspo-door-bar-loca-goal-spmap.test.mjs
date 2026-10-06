// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Bar-loca/Bar-goal loaders inline sel_set_door
// (barDoor/barGoalDoor closures; D-2695/D-2697 split); both now carry
// the :4661 game mark (D-3548, D-3546 Next). Des evidence verified at
// port time: Bar-loca.lua:41-50 = 10 des.door (open 23,03; open 30,08;
// open 34,14; locked 38,05; locked 38,06; closed 43,03; closed 43,05;
// closed 43,06; closed 43,08; locked 55,06), Bar-goal.lua:35-36 = 2
// des.door locked (22,09; 26,09) — each matches the JS call sites in
// order. Both bitmaps are C-complete (map :6292 via
// splev_apply_centered_map + stairs :4189 — loca up 05,02 + down
// 70,13, goal up 36,05; des order doors before stairs kept in JS; no
// des.mazewalk/des.drawbridge/des.ladder in either file; all doors
// coord-form, no wall-form). Neutrality: bar-goal's
// remove_boundary_syms consults the set for CROSSWALL cells only
// (never DOOR/SDOOR); solidify_map and the maze readers never run on
// these paths (no solidify/mazewalk call in either loader body, no
// whole-set iteration); light_region and the barLit loops iterate
// coordinates not the set; flip leaves the set unflipped per C (named
// omit); link_doors_rooms/map_cleanup/wallification/fixup_special and
// monsters/objects/traps are bitmap-clean (reader census this iter:
// :4183 solidify, :14270/:14482/:14670 tower solidifies,
// :19445 boundary, :21607/:21650 maze — all gated or off-path).
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

describe('bar-loca/goal door sites carry the sel_set_door :4661 mark', () => {
    it('bar-loca barDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_bar_loca');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'bar-loca barDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('bar-goal barGoalDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_bar_goal');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'bar-goal barGoalDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('des census: 10 loca + 2 goal closure sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_bar_loca');
        assert.equal(countCalls(loca, 'barDoor'), 10);
        let last = -1;
        for (const call of ['barDoor(23, 3, D_ISOPEN)', 'barDoor(30, 8, D_ISOPEN)',
            'barDoor(34, 14, D_ISOPEN)', 'barDoor(38, 5, D_LOCKED)',
            'barDoor(38, 6, D_LOCKED)', 'barDoor(43, 3, D_CLOSED)',
            'barDoor(43, 5, D_CLOSED)', 'barDoor(43, 6, D_CLOSED)',
            'barDoor(43, 8, D_CLOSED)', 'barDoor(55, 6, D_LOCKED)']) {
            const at = loca.indexOf(call, last + 1);
            assert.ok(at > last, `bar-loca must call ${call} in des order`);
            last = at;
        }
        const goal = loaderBody(src, 'load_bar_goal');
        assert.equal(countCalls(goal, 'barGoalDoor'), 2);
        assert.ok(goal.indexOf('barGoalDoor(22, 9, D_LOCKED)')
            < goal.indexOf('barGoalDoor(26, 9, D_LOCKED)'),
            'bar-goal calls must follow Bar-goal.lua :35-36 order');
    });

    it('C order: doors before stairs in both loaders (des :41-50/:52-53, :35-36/:38)', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_bar_loca');
        const lastDoor = 'barDoor(55, 6, D_LOCKED);';
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 5, my + 2, 1, null, true);'),
            'Bar-loca.lua :41-50 doors precede the :52 up stair');
        assert.ok(loca.indexOf(lastDoor) < loca.indexOf('mkstairs(mx + 70, my + 13, 0, null, true);'),
            'Bar-loca.lua :41-50 doors precede the :53 down stair');
        const goal = loaderBody(src, 'load_bar_goal');
        assert.ok(goal.indexOf('barGoalDoor(26, 9, D_LOCKED);')
            < goal.indexOf('mkstairs(mx + 36, my + 5, 1, null, true);'),
            'Bar-goal.lua :35-36 doors precede the :38 stair');
    });

    it('map + stair marks already carried; no mazewalk/drawbridge', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_bar_loca');
        assert.ok(loca.includes('splev_apply_centered_map(BAR_LOCA_MAP)'),
            'bar-loca map cells marked via the shared :6292 path');
        assert.ok(loca.includes('`${mx + 5},${my + 2}`); // C :4189'),
            'bar-loca up stair marked :4189');
        assert.ok(loca.includes('`${mx + 70},${my + 13}`); // C :4189'),
            'bar-loca down stair marked :4189');
        assert.ok(!loca.includes('mazewalk(') && !loca.includes('fill_empty_maze(')
            && !loca.includes('drawbridge(') && !loca.includes('solidify_map('),
            'bar-loca carries no mazewalk/drawbridge/solidify path');
        const goal = loaderBody(src, 'load_bar_goal');
        assert.ok(goal.includes('splev_apply_centered_map(BAR_GOAL_MAP)'),
            'bar-goal map cells marked via the shared :6292 path');
        assert.ok(goal.includes('`${mx + 36},${my + 5}`); // C :4189'),
            'bar-goal up stair marked :4189');
        assert.ok(!goal.includes('mazewalk(') && !goal.includes('fill_empty_maze(')
            && !goal.includes('drawbridge(') && !goal.includes('solidify_map('),
            'bar-goal carries no mazewalk/drawbridge/solidify path');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('barDoor (Bar-loca 10) + barGoalDoor (Bar-goal 2, D-3548)'),
            'sel_set_door doc must list the D-3548 closures');
        assert.ok(src.includes('wizDoor (Wiz-loca 4 + Wiz-goal 16, D-3546)'),
            'D-3546 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3548\)/g) || []).length >= 2,
            'both bar loader docs must carry the D-3548 close-out');
    });
});
