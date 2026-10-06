// C ref: sp_lev.c sel_set_door — the unconditional `SpLev_Map[x][y] = 1`
// (:4661) for every coord-form des.door, in C order after the doormask
// write (:4660). The four medusa loaders inline sel_set_door (medDoor
// closures in load_medusa_1/3/4, an inline door block in load_medusa_2;
// D-2695/D-2697 split); all four now carry the :4661 game mark (D-3538,
// D-3536 Next). Des evidence verified at port time: medusa-1.lua:51-54 =
// 4 des.door (closed 46,07; locked 38,08; locked 38,11; closed 30,12),
// medusa-2.lua:48 = 1 des.door (locked 71,07), medusa-3.lua:72-75 = 4
// des.door (locked 08,08; locked 64,05; random 50,13; locked 48,15),
// medusa-4.lua:69-75 = 7 des.door (all locked: 04,06; 04,10; 08,04;
// 08,12; 10,06; 10,10; 12,08) — each matches the JS call sites in order.
// All four bitmaps are C-complete (map :6292 via
// splev_apply_centered_map + stairs :4189 — fixed mkstairs in 1/3,
// l_create_stairway in 2/4 — + doors; no drawbridge/ladder/mazewalk in
// any of the four files). Neutrality: no SpLev_Map reader runs after
// the door sites on these paths (no solidify_map call — named omission;
// remove_boundary_syms in 2/3/4 fires on CROSSWALL cells only, never on
// DOOR/SDOOR; link_doors_rooms/map_cleanup/fixup_special/wallification/
// flip are bitmap-clean; monsters/objects/traps don't read).
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
    // Arrow-closure defs (`const medDoor = (rx, ...)`) carry no `name(`
    // token, so every match is a call site.
    return (body.match(new RegExp(`\\b${name}\\(`, 'g')) || []).length;
}

describe('medusa door sites carry the sel_set_door :4661 mark', () => {
    it('medusa_1 medDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_medusa_1');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'medusa_1 medDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('medusa_3 medDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_medusa_3');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'medusa_3 medDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = mask;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('medusa_2 inline door: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_medusa_2');
        const mark = 'g.SpLev_Map.add(`${mx + 71},${my + 7}`); // C :4661';
        assert.ok(body.includes(mark), 'medusa_2 door block must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = D_LOCKED;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('medusa_4 medDoor: :4661 mark in C order after doormask', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_medusa_4');
        const mark = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        assert.ok(body.includes(mark), 'medusa_4 medDoor must add the :4661 mark');
        assert.ok(body.indexOf(mark) > body.indexOf('loc.doormask = D_LOCKED;'),
            'C order :4660/:4661 — mark must follow doormask');
    });

    it('des census: 4 + 4 + 1 + 7 door sites in des order', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.equal(countCalls(loaderBody(src, 'load_medusa_1'), 'medDoor'), 4);
        assert.equal(countCalls(loaderBody(src, 'load_medusa_3'), 'medDoor'), 4);
        assert.equal(countCalls(loaderBody(src, 'load_medusa_4'), 'medDoor'), 7);
        const med2 = loaderBody(src, 'load_medusa_2');
        assert.equal(
            (med2.match(/set_door_orientation\(mx \+ 71, my \+ 7\)/g) || []).length, 1);
        // Spot coords match the des files in order.
        const med1 = loaderBody(src, 'load_medusa_1');
        for (const call of ['medDoor(46, 7, D_CLOSED)', 'medDoor(38, 8, D_LOCKED)',
            'medDoor(38, 11, D_LOCKED)', 'medDoor(30, 12, D_CLOSED)']) {
            assert.ok(med1.includes(call), `medusa_1 must call ${call}`);
        }
        const med4 = loaderBody(src, 'load_medusa_4');
        for (const call of ['medDoor(4, 6)', 'medDoor(4, 10)', 'medDoor(8, 4)',
            'medDoor(8, 12)', 'medDoor(10, 6)', 'medDoor(10, 10)', 'medDoor(12, 8)']) {
            assert.ok(med4.includes(call), `medusa_4 must call ${call}`);
        }
    });

    it('medusa C order: stairs before doors (des :48/:51, :45/:48, :70/:72, :67/:69)', () => {
        const src = readFileSync(SRC, 'utf8');
        const med1 = loaderBody(src, 'load_medusa_1');
        assert.ok(med1.indexOf('mkstairs(mx + 36, my + 10, 0, null, true);')
            < med1.indexOf('medDoor(46, 7, D_CLOSED);'),
            'medusa-1.lua :48-49 stairs precede :51-54 doors');
        const med2 = loaderBody(src, 'load_medusa_2');
        assert.ok(med2.indexOf('l_create_stairway(0, 68, 10, null, false);')
            < med2.indexOf('set_door_orientation(mx + 71, my + 7);'),
            'medusa-2.lua :45-46 stairs precede :48 door');
        const med3 = loaderBody(src, 'load_medusa_3');
        assert.ok(med3.indexOf('mkstairs(medloc.x, medloc.y, 0, null, true);')
            < med3.indexOf('medDoor(8, 8, D_LOCKED);'),
            'medusa-3.lua :70 stair precedes :72-75 doors');
        const med4 = loaderBody(src, 'load_medusa_4');
        assert.ok(med4.indexOf('l_create_stairway(0, medloc.x - mx, medloc.y - my, null, false);')
            < med4.indexOf('medDoor(4, 6);'),
            'medusa-4.lua :67 stair precedes :69-75 doors');
    });

    it('medusa map + stair marks already carried', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const name of ['load_medusa_1', 'load_medusa_2', 'load_medusa_3', 'load_medusa_4']) {
            const body = loaderBody(src, name);
            assert.ok(body.includes('splev_apply_centered_map(MEDUSA'),
                `${name} map cells marked via the shared :6292 path`);
        }
        assert.ok(loaderBody(src, 'load_medusa_1').includes('`${mx + 5},${my + 14}`); // C :4189'),
            'medusa_1 up stair marked :4189');
        assert.ok(loaderBody(src, 'load_medusa_3').includes('`${medloc.x},${medloc.y}`); // C :4189'),
            'medusa_3 down stair marked :4189');
    });

    it('sel_set_door doc + loader docs name the newly-carrying closures', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('medusa medDoor\n * ×3 + medusa-2 inline (16 sites, D-3538)'),
            'sel_set_door doc must list the D-3538 closures');
        assert.ok(src.includes('baalz inline (1 site) + valleyDoor (3 sites, D-3536)'),
            'D-3536 census substring preserved');
        assert.equal(
            (src.match(/C :6292\/:4189\/:4661; D-3538\)/g) || []).length, 4);
    });
});
