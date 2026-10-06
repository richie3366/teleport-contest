// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The baalz/valley loaders inline sel_set_door (a door
// block in load_baalz, the valleyDoor closure in load_valley;
// D-2695/D-2697 split); both now carry the :4661 game mark (D-3536,
// D-3534 Next). Des evidence verified at port time: baalz.lua:35 =
// 1 des.door ("locked",00,06, matches the inline block); valley.lua:66-68
// = 3 des.door ("locked" (4,1),(8,4),(6,6), match the 3 valleyDoor calls
// in order). Both bitmaps are C-complete (map :6292 — baalz own loop,
// valley via splev_apply_centered_map — + stair :4189 + doors; no
// drawbridge/ladder in either file; valley has no mazewalk). Neutrality:
// baalz mazewalk runs before the door in both C (:33 before :35) and JS,
// and no SpLev_Map reader runs after either door site (monsters/objects/
// traps don't read; baalz_fixup is bitmap-clean; remove_boundary_syms
// fires on CROSSWALL only, never on DOOR/SDOOR cells; wallification and
// flip never consult the set).
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
    // Arrow-closure defs (`const valleyDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('baalz/valley door sites carry the sel_set_door :4661 mark', () => {
    it('baalz inline door: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_baalz');
        const mark = 'g.SpLev_Map.add(`${mx + 0},${my + 6}`); // C :4661';
        assert.ok(body.includes(mark), 'baalz door block must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = D_LOCKED;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('valleyDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_valley');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'valleyDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('des census: 1 baalz door block + 3 valleyDoor call sites', () => {
        const src = readFileSync(SRC, 'utf8');
        const baalz = loaderBody(src, 'load_baalz');
        assert.equal(
            (baalz.match(/loc\.doormask = D_LOCKED;/g) || []).length, 1);
        assert.equal(countCalls(loaderBody(src, 'load_valley'), 'valleyDoor'), 3);
    });

    it('baalz C order: mazewalk before stair before door', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_baalz');
        const maze = body.indexOf('splev_mazewalk(0, 6, W_WEST, true);');
        const stair = body.indexOf('mkstairs(mx + 44, my + 6, 0, null, true);');
        const door = body.indexOf('loc.doormask = D_LOCKED;');
        assert.ok(maze > 0 && stair > 0 && door > 0, 'all three des writers present');
        assert.ok(maze < stair && stair < door,
            'C baalz.lua :33/:34/:35 order — mazewalk, stair, door');
    });

    it('valley map + stair marks already carried', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_valley');
        assert.ok(body.includes('splev_apply_centered_map(VALLEY_MAP)'),
            'valley map cells marked via the shared :6292 path');
        assert.ok(body.includes('`${mx + 1},${my + 1}`); // C :4189'),
            'valley stair marked :4189');
    });

    it('sel_set_door doc names the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('baalz inline (1 site) + valleyDoor (3 sites, D-3536)'),
            'sel_set_door doc must list the D-3536 closures');
    });
});
