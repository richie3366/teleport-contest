// C ref: sp_lev.c lspo_map load loop — the unconditional
// `SpLev_Map[x][y] = 1` (:6292) for every valid map cell. The tutorial
// loaders (load_tut1/2) inline lspo_map's loop instead of calling it;
// their map cells carried no game mark (D-3530 Next). Both loops now
// carry the :6292 mark in C order (before the terr write, like live
// lspo_map and the D-3528 tower loops). Des evidence verified at port
// time: TUT1_MAP is byte-identical to tut-1.lua des.map (75x18);
// TUT2_MAP is byte-identical to tut-2.lua des.map (14x8). tut-1.lua
// has 12 des.door (carried D-3530) + 1 des.stair down at 58,10 (live
// l_create_stairway :4189); tut-2.lua has 1 des.stair up at 2,2
// (live :4189); neither file has drawbridge/mazewalk/ladder — so both
// tutorial bitmaps are C-complete. Neutrality: neither tut epilogue
// calls solidify_map/remove_boundary_syms/maze1xy (wallification +
// fixup_special only); neither map holds STWALL/CROSSWALL; noflip.
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

const TUTS = ['load_tut1', 'load_tut2'];
const MAP_MARK = 'game.SpLev_Map.add(`${xx},${yy}`); // C :6292';
const MAP_WRITE = 'sel_set_ter(xx, yy, mptyp, false);';
const SET_NEW = 'if (!game.SpLev_Map) game.SpLev_Map = new Set();';

describe('tutorial map cells carry the lspo_map :6292 game mark', () => {
    for (const loader of TUTS) {
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

    it('tut-1 bitmap C-complete: map + 12 doors + live stair mark', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_tut1');
        assert.ok(body.includes('game.SpLev_Map.add(`${xstart + mx},${ystart + my}`); // C :4661'),
            'tut-1 door marks (D-3530) must still be carried');
        assert.ok(body.includes('l_create_stairway(0, 58, 10'),
            'tut-1 stair marked via live l_create_stairway :4189');
        assert.equal((body.match(/\btut1_door\(/g) || []).length, 12);
    });

    it('tut-2 bitmap C-complete: map + live stair mark, no doors', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_tut2');
        assert.ok(body.includes('l_create_stairway(1, 2, 2'),
            'tut-2 stair marked via live l_create_stairway :4189');
        assert.ok(!body.includes('set_door_orientation'),
            'tut-2 has no des.door sites (tut-2.lua has none)');
    });

    it('embedded maps match des dims (75x18 / 14x8)', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const [v, w, h] of [['TUT1_MAP', 75, 18], ['TUT2_MAP', 14, 8]]) {
            const m = src.match(new RegExp('const ' + v + ' = `\\n(.*?)\\n`\\.replace', 's'));
            assert.ok(m, `${v} embedded map missing`);
            const rows = m[1].split('\n');
            assert.equal(rows.length, h, `${v} row count`);
            for (const r of rows) assert.equal(r.length, w, `${v} row width`);
        }
    });

    it('lspo_map doc names the tutorial close-out', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('load_tut1/2); their map cells carry the :6292 game'),
            'lspo_map doc must list the D-3532 tut close-out');
    });
});
