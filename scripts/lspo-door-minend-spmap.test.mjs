// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The minend-1/minend-2 loaders inline sel_set_door
// (meDoor closures + one percent-gated inline site; D-2695/D-2697 split);
// all now carry the :4661 game mark (D-3544, D-3542 Next). Des evidence
// verified at port time: minend-1.lua:43-49 = 7 des.door locked (07,16;
// 22,08; 26,08; 40,14; 50,03; 51,16; 66,02), minend-2.lua:39 = gated
// des.door locked 52,05 (inside the percent(50) block :34-40, after the
// des.terrain S :38) + :73-74 = 2 des.door locked (12,02; 11,06) — each
// matches the JS call sites in order. Both bitmaps are C-complete (map
// :6292 via splev_apply_centered_map + stair :4189 — up 36,04, des order
// doors before stair kept in JS; no des.mazewalk/des.drawbridge/
// des.ladder in either file). Neutrality: no SpLev_Map reader runs on
// these paths — solidify_map fires on STWALL cells only, remove_boundary
// on CROSSWALL cells only (neither is called by these loaders),
// fill_empty_maze/maze1xy run on mazewalk paths only, light_region and
// the loader-local setUnlit/markNondig iterate coordinates not the set,
// flip leaves the set unflipped per C (named omit), wallification/
// fixup_special/monsters/objects/traps/engravings are bitmap-clean (the
// only `.has` in js/ is maze1xy's). Juiblex surveyed and excluded:
// juiblex.lua carries no des.door (maps + swamp region only) and
// load_juiblex has no door closure — not a campaign member.
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
    // Arrow-closure defs (`const meDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('minend-1/2 door sites carry the sel_set_door :4661 mark', () => {
    it('minend-1 meDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_minend_1');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'minend-1 meDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = D_LOCKED;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('minend-2 meDoor: :4661 mark inside the closure', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_minend_2');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'minend-2 meDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('const meDoor'),
            'mark must sit inside the meDoor closure');
    });

    it('minend-2 gated inline (52,5): :4661 mark after the terrain write', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_minend_2');
        const mark = 'g.SpLev_Map.add(`${mx + 52},${my + 5}`); // C :4661';
        assert.ok(body.includes(mark), 'gated inline door must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('setTer(52, 5, SDOOR)'),
            'des order :38/:39 — door mark must follow the terrain write');
    });

    it('des census: 7 + 2 closure sites plus the gated inline', () => {
        const src = readFileSync(SRC, 'utf8');
        const me1 = loaderBody(src, 'load_minend_1');
        assert.equal(countCalls(me1, 'meDoor'), 7);
        for (const call of ['meDoor(7, 16)', 'meDoor(22, 8)', 'meDoor(26, 8)',
            'meDoor(40, 14)', 'meDoor(50, 3)', 'meDoor(51, 16)',
            'meDoor(66, 2)']) {
            assert.ok(me1.includes(call), `minend-1 must call ${call}`);
        }
        const me2 = loaderBody(src, 'load_minend_2');
        assert.equal(countCalls(me2, 'meDoor'), 2);
        for (const call of ['meDoor(12, 2)', 'meDoor(11, 6)']) {
            assert.ok(me2.includes(call), `minend-2 must call ${call}`);
        }
        assert.ok(me2.includes('des.door("locked", 52,5)'),
            'gated inline must cite its des.door line');
    });

    it('C order: doors before stair in both loaders (des :43-49/:51, :39/:73-74/:76)', () => {
        const src = readFileSync(SRC, 'utf8');
        const stair = 'mkstairs(mx + 36, my + 4, 1, null, true);';
        const me1 = loaderBody(src, 'load_minend_1');
        assert.ok(me1.indexOf('meDoor(66, 2);') < me1.indexOf(stair),
            'minend-1.lua :43-49 doors precede the :51 stair');
        const me2 = loaderBody(src, 'load_minend_2');
        assert.ok(me2.indexOf('meDoor(11, 6);') < me2.indexOf(stair),
            'minend-2.lua :73-74 doors precede the :76 stair');
        assert.ok(me2.indexOf('`${mx + 52},${my + 5}`); // C :4661') < me2.indexOf(stair),
            'minend-2.lua :39 gated door precedes the :76 stair');
    });

    it('minend map + stair marks already carried; no mazewalk/drawbridge', () => {
        const src = readFileSync(SRC, 'utf8');
        const me1 = loaderBody(src, 'load_minend_1');
        assert.ok(me1.includes('splev_apply_centered_map(MINEND1_MAP)'),
            'minend-1 map cells marked via the shared :6292 path');
        assert.ok(me1.includes('`${mx + 36},${my + 4}`); // C :4189'),
            'minend-1 up stair marked :4189');
        // Call-shaped: the slice runs to the next def, so it includes the
        // following loader's doc comment (minend-3's names mazewalk).
        assert.ok(!me1.includes('mazewalk(') && !me1.includes('fill_empty_maze(')
            && !me1.includes('drawbridge('),
            'minend-1 carries no mazewalk/drawbridge path');
        const me2 = loaderBody(src, 'load_minend_2');
        assert.ok(me2.includes('splev_apply_centered_map(MINEND2_MAP)'),
            'minend-2 map cells marked via the shared :6292 path');
        assert.ok(me2.includes('`${mx + 36},${my + 4}`); // C :4189'),
            'minend-2 up stair marked :4189');
        assert.ok(!me2.includes('mazewalk(') && !me2.includes('fill_empty_maze(')
            && !me2.includes('drawbridge('),
            'minend-2 carries no mazewalk/drawbridge path');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('meDoor \u00d72 (minend-1 7 + minend-2 2'),
            'sel_set_door doc must list the D-3544 closures');
        assert.ok(src.includes('sanctDoor (4, D-3542)'),
            'D-3542 census substring preserved');
        assert.ok((src.match(/\(C :6292\/:4189\/:4661; D-3544\)/g) || []).length >= 2,
            'both minend loader docs must carry the D-3544 close-out');
    });
});
