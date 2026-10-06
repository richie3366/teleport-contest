// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The astral/sanctum loaders inline sel_set_door
// (astralDoor/sanctDoor closures; D-2695/D-2697 split); both now carry the
// :4661 game mark (D-3542, D-3540 Next). Des evidence verified at port
// time: astral.lua:93-101 = 9 des.door (closed 11,09; closed 17,09;
// locked 23,12; locked 37,08; closed 37,11; closed 37,17; locked 51,12;
// locked 57,09; closed 63,09), sanctum.lua:45-48 = 4 des.door (closed
// 40,06; locked 62,06; closed 46,12; closed 53,10) — each matches the JS
// call sites in order (sanctum.lua:36 is wall-form, via splev_room_door,
// excluded per C). Both bitmaps are C-complete (map :6292 via
// splev_apply_centered_map + sanctum stair :4189 — up 63,15; astral
// carries no des.stair/des.ladder; no drawbridge/mazewalk in either
// file). Neutrality: no SpLev_Map reader distinguishes the marked door
// cells on these paths (solidify_map in the astral epilogue fires on
// STWALL cells only; remove_boundary_syms fires on CROSSWALL cells only;
// fill_empty_maze runs on mazewalk paths only; the lit-clear whole-set
// iterations run before the door sites; link_doors_rooms/map_cleanup/
// fixup_special/wallification/flip are bitmap-clean — C leaves the set
// unflipped; monsters/objects/traps don't read).
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
    // Arrow-closure defs (`const astralDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('astral/sanctum door sites carry the sel_set_door :4661 mark', () => {
    it('astral astralDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_astral');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'astral astralDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('sanctum sanctDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_sanctum');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'sanctum sanctDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('des census: 9 + 4 door sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        const astral = loaderBody(src, 'load_astral');
        assert.equal(countCalls(astral, 'astralDoor'), 9);
        for (const call of ['astralDoor(11, 9, D_CLOSED)', 'astralDoor(17, 9, D_CLOSED)',
            'astralDoor(23, 12, D_LOCKED)', 'astralDoor(37, 8, D_LOCKED)',
            'astralDoor(37, 11, D_CLOSED)', 'astralDoor(37, 17, D_CLOSED)',
            'astralDoor(51, 12, D_LOCKED)', 'astralDoor(57, 9, D_LOCKED)',
            'astralDoor(63, 9, D_CLOSED)']) {
            assert.ok(astral.includes(call), `astral must call ${call}`);
        }
        const sanctum = loaderBody(src, 'load_sanctum');
        assert.equal(countCalls(sanctum, 'sanctDoor'), 4);
        for (const call of ['sanctDoor(40, 6, D_CLOSED)', 'sanctDoor(62, 6, D_LOCKED)',
            'sanctDoor(46, 12, D_CLOSED)', 'sanctDoor(53, 10, D_CLOSED)']) {
            assert.ok(sanctum.includes(call), `sanctum must call ${call}`);
        }
    });

    it('sanctum C order: doors before stair (des :45-48, :130)', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_sanctum');
        assert.ok(body.indexOf('sanctDoor(53, 10, D_CLOSED);')
            < body.indexOf('mkstairs(mx + 63, my + 15, 1, null, true);'),
            'sanctum.lua :45-48 doors precede the :130 stair');
    });

    it('astral/sanctum map + stair marks already carried', () => {
        const src = readFileSync(SRC, 'utf8');
        const astral = loaderBody(src, 'load_astral');
        assert.ok(astral.includes('splev_apply_centered_map(ASTRAL_MAP)'),
            'astral map cells marked via the shared :6292 path');
        assert.ok(!astral.includes('mkstairs('),
            'astral carries no stair (no des.stair/des.ladder in astral.lua)');
        const sanctum = loaderBody(src, 'load_sanctum');
        assert.ok(sanctum.includes('splev_apply_centered_map(SANCTUM_MAP)'),
            'sanctum map cells marked via the shared :6292 path');
        assert.ok(sanctum.includes('`${mx + 63},${my + 15}`); // C :4189'),
            'sanctum up stair marked :4189');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('sanctDoor (4, D-3542)'),
            'sel_set_door doc must list the D-3542 closures');
        assert.ok(src.includes('wizDoor (Wiz-strt 8, D-3540)'),
            'D-3540 census substring preserved');
        assert.ok(src.includes('(C :6292/:4189/:4661; D-3542)'),
            'sanctum loader doc must carry the D-3542 close-out');
        assert.ok(src.includes('(no des.stair on the level; C :6292/:4661; D-3542)'),
            'astral loader doc must carry the D-3542 close-out');
    });
});
