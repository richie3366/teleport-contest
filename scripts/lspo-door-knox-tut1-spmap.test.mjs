// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The knox/tut-1 loaders inline sel_set_door in the
// knoxDoor/tut1_door closures (D-2695/D-2697 split); both now carry the
// :4661 game mark (D-3530, D-3528 Next). Des evidence verified at port
// time: knox.lua:114-124 = 11 des.door (coords + states match the 11
// knoxDoor calls in order); tut-1.lua:91-283 = 12 des.door incl. the
// percent(50) and random states (match the 12 tut1_door calls in
// order). Knox bitmap is C-complete (map via splev_apply_centered_map
// :6292 + doors; no stair/ladder/drawbridge/mazewalk in knox.lua);
// tut-1 carries doors + the live l_create_stairway :4189 mark (map
// marks carried D-3532). Neutrality: solidify is omitted on both
// loaders and touches STWALL only; remove_boundary_syms (:1035) fires
// on CROSSWALL only, never on DOOR/SDOOR cells.
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
    // Arrow-closure defs (`const knoxDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('knox/tut-1 door closures carry the sel_set_door :4661 mark', () => {
    it('knoxDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_knox');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'knoxDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('tut1_door: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_tut1');
        const mark = 'game.SpLev_Map.add(`${xstart + mx},${ystart + my}`); // C :4661';
        assert.ok(body.includes(mark), 'tut1_door must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('des census: 11 knoxDoor + 12 tut1_door call sites', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.equal(countCalls(loaderBody(src, 'load_knox'), 'knoxDoor'), 11);
        assert.equal(countCalls(loaderBody(src, 'load_tut1'), 'tut1_door'), 12);
    });

    it('knox map + tut-1 stair marks already carried', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(loaderBody(src, 'load_knox').includes('splev_apply_centered_map(KNOX_MAP)'),
            'knox map cells marked via the shared :6292 path');
        assert.ok(loaderBody(src, 'load_tut1').includes('l_create_stairway(0, 58, 10'),
            'tut-1 stair marked via live l_create_stairway :4189');
    });

    it('sel_set_door doc names the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('knoxDoor (11 sites) + tut1_door (12 sites, D-3530)'),
            'sel_set_door doc must list the D-3530 closures');
    });
});
