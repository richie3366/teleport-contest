// C ref: sp_lev.c lspo_map load loop — the unconditional
// `SpLev_Map[x][y] = 1` (:6292) for every valid map cell. The themeroom
// helper (lspo_map_themeroom) inlines C's shared "Load the map" loop
// (:6286–6305), which runs on the themeroom path too (the
// in_mk_themerooms gate guards only the no-overwrite pre-check
// :6244–6283) — but its write loop carried no game mark (D-3532 Next:
// the last unmarked map loop). It now carries the :6292 mark in C
// order (before the terr write, tower idiom). Des evidence: all 19
// THEMEROOM_MAPS are byte-identical to the themerms.lua des.map
// blocks, and every one of those blocks has filler_region-only
// contents (no stair/door/drawbridge/mazewalk writers — the wall-form
// des.door sites at themerms.lua:299–436 belong to the rectangular
// rooms, excluded per C like every wall-form site). Neutrality: no
// SpLev_Map reader runs on the ordinary-makelevel path (solidify_map
// is des-epilogue + soko + astral only; remove_boundary_syms is 8
// special loaders + wiz-only finalize; maze1xy runs via
// splev_mazewalk in 9 special loaders only; lit epilogues are
// special-loader-local), and the next special level resets the set
// via create_des_coder (:6366) before reading.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const SRC = new URL('../js/mklev.js', import.meta.url);
const LUA = new URL('../nethack-c/upstream/dat/themerms.lua', import.meta.url);

function helperBody(src) {
    const m = src.match(/^function lspo_map_themeroom\(/m);
    assert.ok(m && m.index !== undefined, 'lspo_map_themeroom def missing in js/mklev.js');
    const rest = src.slice(m.index + m[0].length);
    const next = rest.search(/^(?:export\s+)?(?:async\s+)?function [A-Za-z_0-9]+\(/m);
    assert.ok(next > 0, 'next def must follow lspo_map_themeroom in js/mklev.js');
    return rest.slice(0, next);
}

const MAP_MARK = 'g.SpLev_Map.add(`${xx},${yy}`); // C :6292';
const MAP_WRITE = 'sel_set_ter(xx, yy, mptyp, false);';
const SET_NEW = 'if (!g.SpLev_Map) g.SpLev_Map = new Set();';

describe('themeroom map cells carry the lspo_map :6292 game mark', () => {
    it('helper: game set created + map mark in C order before terr write', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = helperBody(src);
        assert.ok(body.includes(SET_NEW),
            'helper must create the SpLev_Map set');
        assert.ok(body.includes(MAP_MARK),
            'helper must add the :6292 mark for map cells');
        assert.ok(body.includes(MAP_WRITE),
            'helper must keep the terr write');
        assert.ok(body.indexOf(MAP_MARK) < body.indexOf(MAP_WRITE),
            'C order :6292/:6296 — mark must precede sel_set_ter');
    });

    it('helper: INVALID_TYPE/MAX_TYPE skips still precede the mark', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = helperBody(src);
        const skip1 = body.indexOf('if (mptyp === INVALID_TYPE) continue;');
        const skip2 = body.indexOf('if (mptyp >= MAX_TYPE) continue;');
        assert.ok(skip1 > 0 && skip2 > 0, 'both C skips must be present');
        assert.ok(skip2 < body.indexOf(MAP_MARK),
            'skips must precede the mark (C :6286–6291 order)');
    });

    it('all 19 THEMEROOM_MAPS route through the helper (mapdef branch)', () => {
        const src = readFileSync(SRC, 'utf8');
        const block = src.match(/const THEMEROOM_MAPS = \{([\s\S]*?)\n\};/);
        assert.ok(block, 'THEMEROOM_MAPS missing');
        const names = [...block[1].matchAll(/^    '([^']+)': \{$/gm)].map((m) => m[1]);
        assert.equal(names.length, 19, 'themeroom mapdef census');
        assert.ok(src.includes('const mapdef = THEMEROOM_MAPS[pick.name];'),
            'themerooms_generate must resolve the mapdef');
        assert.ok(src.includes('return lspo_map_themeroom(mapdef);'),
            'mapdef rooms must run through lspo_map_themeroom');
    });

    it('embedded maps byte-identical to themerms.lua des.map blocks', () => {
        const src = readFileSync(SRC, 'utf8');
        const lua = readFileSync(LUA, 'utf8');
        const des = {};
        const re = /name = '([^']+)',\n      contents = function\(\)\n         des\.map\(\{ map = \[\[\n([\s\S]*?)\]\]/g;
        let m;
        while ((m = re.exec(lua))) des[m[1]] = m[2];
        assert.equal(Object.keys(des).length, 19, 'themerms.lua des.map census');
        const block = src.match(/const THEMEROOM_MAPS = \{([\s\S]*?)\n\};/)[1];
        const emb = {};
        const re2 = /'([^']+)': \{\n        map: '((?:[^'\\]|\\n|\\')*)',/g;
        while ((m = re2.exec(block))) emb[m[1]] = m[2].replace(/\\n/g, '\n');
        for (const n of Object.keys(des)) {
            assert.ok(n in emb, `${n} missing from THEMEROOM_MAPS`);
            assert.equal(emb[n], des[n], `${n} bytes must match des.map`);
        }
    });

    it('lspo_map doc names the themeroom close-out', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(src.includes('lspo_map_themeroom) inlines the same shared loop'),
            'lspo_map doc must list the D-3534 themeroom close-out');
    });
});
