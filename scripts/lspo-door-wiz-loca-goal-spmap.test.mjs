// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The Wiz-loca/Wiz-goal loaders inline sel_set_door
// (wizDoor closures; D-2695/D-2697 split); both now carry the :4661 game
// mark (D-3546, D-3544 Next). Des evidence verified at port time:
// Wiz-loca.lua:76-79 = 4 des.door locked (55,08; 55,12; 47,08; 47,12),
// Wiz-goal.lua:50-65 = 16 des.door locked (19,06; 14,09; 31,09; 33,08;
// 36,08; 39,08; 42,08; 45,08; 48,08; 33,10; 36,10; 39,10; 42,10; 45,10;
// 48,10; 49,09) — each matches the JS call sites in order. Both bitmaps
// are C-complete (map :6292 via splev_apply_centered_map + stairs :4189
// — loca up 03,17 + down 48,10, goal up 55,05; des order doors before
// stairs kept in JS; no des.mazewalk/des.drawbridge/des.ladder in either
// file). Wiz-loca's 5 wall-form secret des.door (:41/:46/:54/:62/:71)
// stay mark-free per C (lspo_door wall branch :4703-4713 routes through
// create_door, never sel_set_door — like D-3542 sanctum :36).
// Neutrality: remove_boundary_syms consults the set for CROSSWALL cells
// only (never DOOR/SDOOR); solidify_map and the maze readers never run
// on these paths (no solidify/mazewalk call in either loader body, no
// whole-set iteration); light_region and the region loops iterate
// coordinates not the set; flip leaves the set unflipped per C (named
// omit); link_doors_rooms/map_cleanup/wallification/fixup_special and
// monsters/objects/traps are bitmap-clean (reader census this iter:
// :4183 solidify, :14260/:14472/:14660 tower solidifies, :19433
// boundary, :21595/:21638 maze — all gated or off-path).
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
    // Arrow-closure defs (`const wizDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('wiz-loca/goal door sites carry the sel_set_door :4661 mark', () => {
    it('wiz-loca wizDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_wiz_loca');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'wiz-loca wizDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('wiz-goal wizDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_wiz_goal');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'wiz-goal wizDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask; // C :4660'),
            'C order :4660/:4661 — mark must follow doormask');
        assert.ok(body.indexOf(mark) < body.indexOf('loc.flags = mask;'),
            'astralDoor idiom — mark sits between doormask and the flags mirror');
    });

    it('des census: 4 loca + 16 goal closure sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_wiz_loca');
        assert.equal(countCalls(loca, 'wizDoor'), 4);
        for (const call of ['wizDoor(55, 8, D_LOCKED)', 'wizDoor(55, 12, D_LOCKED)',
            'wizDoor(47, 8, D_LOCKED)', 'wizDoor(47, 12, D_LOCKED)']) {
            assert.ok(loca.includes(call), `wiz-loca must call ${call}`);
        }
        const goal = loaderBody(src, 'load_wiz_goal');
        const coords = [[19, 6], [14, 9], [31, 9],
            [33, 8], [36, 8], [39, 8], [42, 8], [45, 8], [48, 8],
            [33, 10], [36, 10], [39, 10], [42, 10], [45, 10], [48, 10],
            [49, 9]];
        // Goal sites run through one loop call, so the census reads the
        // coord list, not call tokens.
        assert.equal(countCalls(goal, 'wizDoor'), 1);
        let last = -1;
        for (const [rx, ry] of coords) {
            const tok = `[${rx}, ${ry}]`;
            const at = goal.indexOf(tok, last + 1);
            assert.ok(at > last, `wiz-goal list must carry ${tok} in des order`);
            last = at;
        }
    });

    it('C order: doors before stairs in both loaders (des :76-79/:82-83, :50-65/:67)', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_wiz_loca');
        const upLoca = 'mkstairs(mx + 3, my + 17, 1, null, true);';
        const downLoca = 'mkstairs(mx + 48, my + 10, 0, null, true);';
        assert.ok(loca.indexOf('wizDoor(47, 12, D_LOCKED);') < loca.indexOf(upLoca),
            'Wiz-loca.lua :76-79 doors precede the :82-83 stairs');
        assert.ok(loca.indexOf('wizDoor(47, 12, D_LOCKED);') < loca.indexOf(downLoca),
            'Wiz-loca.lua :76-79 doors precede the down stair');
        const goal = loaderBody(src, 'load_wiz_goal');
        const upGoal = 'mkstairs(mx + 55, my + 5, 1, null, true);';
        assert.ok(goal.indexOf('[49, 9],') < goal.indexOf(upGoal),
            'Wiz-goal.lua :50-65 doors precede the :67 stair');
    });

    it('map + stair marks already carried; no mazewalk/drawbridge', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_wiz_loca');
        assert.ok(loca.includes('splev_apply_centered_map(WIZ_LOCA_MAP)'),
            'wiz-loca map cells marked via the shared :6292 path');
        assert.ok(loca.includes('`${mx + 3},${my + 17}`); // C :4189'),
            'wiz-loca up stair marked :4189');
        assert.ok(loca.includes('`${mx + 48},${my + 10}`); // C :4189'),
            'wiz-loca down stair marked :4189');
        assert.ok(!loca.includes('mazewalk(') && !loca.includes('fill_empty_maze(')
            && !loca.includes('drawbridge(') && !loca.includes('solidify_map('),
            'wiz-loca carries no mazewalk/drawbridge/solidify path');
        const goal = loaderBody(src, 'load_wiz_goal');
        assert.ok(goal.includes('splev_apply_centered_map(WIZ_GOAL_MAP)'),
            'wiz-goal map cells marked via the shared :6292 path');
        assert.ok(goal.includes('`${mx + 55},${my + 5}`); // C :4189'),
            'wiz-goal up stair marked :4189');
        assert.ok(!goal.includes('mazewalk(') && !goal.includes('fill_empty_maze(')
            && !goal.includes('drawbridge(') && !goal.includes('solidify_map('),
            'wiz-goal carries no mazewalk/drawbridge/solidify path');
    });

    it('wall-form secret doors stay mark-free per C (create_door path)', () => {
        const src = readFileSync(SRC, 'utf8');
        const loca = loaderBody(src, 'load_wiz_loca');
        assert.equal(countCalls(loca, 'wizLocaAddIrregular'), 5,
            '5 wall-form secret des.door stay on the room-door path');
        const roomDoor = loaderBody(src, 'splev_room_door');
        assert.ok(!roomDoor.includes('SpLev_Map'),
            'splev_room_door/create_door must not mark SpLev_Map');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('wizDoor (Wiz-loca 4 + Wiz-goal 16, D-3546)'),
            'sel_set_door doc must list the D-3546 closures');
        assert.ok(src.includes('minend-2 gated inline (52,5)'),
            'D-3544 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3546\)/g) || []).length >= 2,
            'both wiz loader docs must carry the D-3546 close-out');
    });
});
