// C ref: sp_lev.c lspo_map load loop — the unconditional
// `SpLev_Map[x][y] = 1` (:6292) for every valid map cell, plus
// sel_set_door's mark (:4661) for every coord-form des.door.
// The tower loaders (load_tower1/2/3) inline lspo_map's loop instead of
// calling it; they marked only a loader-local set, so the game bitmap
// missed every tower map cell (D-3526 Next). Each map loop now carries
// the :6292 mark in C order (before the terr write, like live
// lspo_map), the lit epilogue + solidify read the game set (C :321
// reads the unflipped bitmap — flip_level never remaps it), and the
// tower door sites carry the :4661 mark (10 des.door coords verified
// against dat/tower*.lua at port time).
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

const TOWERS = ['load_tower1', 'load_tower2', 'load_tower3'];
const MAP_MARK = 'g.SpLev_Map.add(`${xx},${yy}`); // C :6292';
const MAP_WRITE = 'sel_set_ter(xx, yy, mptyp, false);';
const SET_NEW = 'if (!g.SpLev_Map) g.SpLev_Map = new Set();';

describe('tower map cells carry the lspo_map :6292 game mark', () => {
    for (const loader of TOWERS) {
        it(`${loader}: game set created + map mark in C order before terr write`, () => {
            const src = readFileSync(SRC, 'utf8');
            const body = loaderBody(src, loader);
            assert.ok(body.includes(SET_NEW),
                `${loader} must create the SpLev_Map set`);
            assert.ok(body.includes(MAP_MARK),
                `${loader} must add the :6292 mark for map cells`);
            assert.ok(body.includes(MAP_WRITE),
                `${loader} must keep the terr write`);
            assert.ok(body.indexOf(MAP_MARK) < body.indexOf(MAP_WRITE),
                `${loader}: C order :6292/:6296 — mark must precede sel_set_ter`);
        });
    }

    it('no loader-local spLevMap remains in any tower loader', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const loader of TOWERS) {
            const body = loaderBody(src, loader);
            assert.ok(!body.includes('spLevMap'),
                `${loader} must not keep the loader-local set`);
        }
    });

    it('tower lit epilogue + solidify read the game set', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const loader of TOWERS) {
            const body = loaderBody(src, loader);
            assert.ok(body.includes('const sp = g.SpLev_Map;'),
                `${loader} lit epilogue must read the game set`);
            assert.ok(body.includes('g.SpLev_Map?.has(`${x},${y}`)'),
                `${loader} solidify must read the game set`);
        }
    });

    it('tower door sites carry the sel_set_door :4661 mark', () => {
        const src = readFileSync(SRC, 'utf8');
        const twDoor = 'g.SpLev_Map.add(`${mx + rx},${my + ry}`); // C :4661';
        for (const loader of ['load_tower1', 'load_tower2']) {
            const body = loaderBody(src, loader);
            assert.ok(body.includes(twDoor),
                `${loader} twDoor must add the :4661 mark`);
            assert.ok(body.indexOf(twDoor) > body.indexOf('loc.doormask = mask;'),
                `${loader}: C order :4660/:4661 — mark must follow doormask`);
        }
        const t3body = loaderBody(src, 'load_tower3');
        const t3door = 'g.SpLev_Map.add(`${mx + 14},${my + 5}`); // C :4661';
        assert.ok(t3body.includes(t3door),
            'load_tower3 inline door must add the :4661 mark');
    });

    it('tower loader docs retire the SpLev_Map fidelity clause', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(!src.includes('SpLev_Map fidelity beyond solidify set'),
            'no tower doc may keep the SpLev_Map clause');
    });
});
