// C ref: sp_lev.c l_create_stairway fixed-coord path — the unconditional
// `SpLev_Map[x][y] = 1` (:4189) plus `mkstairs(..., !(scoord &
// SP_COORD_IS_RANDOM))` (:4209–4210), i.e. force=TRUE for every fixed
// des.stair. Special-level loaders translated fixed des.stair lines to
// raw `mkstairs(..., null)` (force default FALSE, no mark); each site
// below now carries the mark in C order (after the deltrap position,
// before mkstairs) with fixed force. deltrap is live only at the
// sanctum stair (des order: 6 random traps :85–90 precede des.stair
// :130); every other site's traps postdate its stair (or the dat file
// has none), verified per dat file at port time. Tower/wizard ladder
// blocks (l_create_stairway using_ladder arm) carry the mark before
// the LADDER write. Quest (42 fixed sites) + soko (12) carry the mark +
// fixed force (D-3526); no deltrap there — every dat + loader file orders
// all traps after the stairs, so C :4187–4188 is a no-op at those sites.
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

// [loader, mark coord exprs, forced mkstairs calls]
const STAIR_SITES = [
    ['load_medusa_1',
        ['${mx + 5},${my + 14}', '${mx + 36},${my + 10}'],
        ['mkstairs(mx + 5, my + 14, 1, null, true)',
            'mkstairs(mx + 36, my + 10, 0, null, true)']],
    ['load_medusa_3',
        ['${medloc.x},${medloc.y}'],
        ['mkstairs(medloc.x, medloc.y, 0, null, true)']],
    ['load_val_strt',
        ['${mx + 18},${my + 1}'],
        ['mkstairs(mx + 18, my + 1, 0, null, true)']],
    ['load_val_loca',
        ['${mx + 48},${my + 14}', '${mx + 20},${my + 6}'],
        ['mkstairs(mx + 48, my + 14, 1, null, true)',
            'mkstairs(mx + 20, my + 6, 0, null, true)']],
    ['load_val_goal',
        ['${mx + 45},${my + 10}'],
        ['mkstairs(mx + 45, my + 10, 1, null, true)']],
    ['load_minend_1',
        ['${mx + 36},${my + 4}'],
        ['mkstairs(mx + 36, my + 4, 1, null, true)']],
    ['load_minend_2',
        ['${mx + 36},${my + 4}'],
        ['mkstairs(mx + 36, my + 4, 1, null, true)']],
    ['load_minetn_5',
        ['${mx + 1},${my + 1}', '${mx + 46},${my + 3}'],
        ['mkstairs(mx + 1, my + 1, 1, null, true)',
            'mkstairs(mx + 46, my + 3, 0, null, true)']],
    ['load_valley',
        ['${mx + 1},${my + 1}'],
        ['mkstairs(mx + 1, my + 1, 0, null, true)']],
    ['load_asmodeus',
        ['${mx1 + 13},${my1 + 7}'],
        ['mkstairs(mx1 + 13, my1 + 7, 0, null, true)']],
    ['load_baalz',
        ['${mx + 44},${my + 6}'],
        ['mkstairs(mx + 44, my + 6, 0, null, true)']],
    ['load_orcus',
        ['${mx + 33},${my + 15}'],
        ['mkstairs(mx + 33, my + 15, 0, null, true)']],
    ['load_sanctum',
        ['${mx + 63},${my + 15}'],
        ['mkstairs(mx + 63, my + 15, 1, null, true)']],
    ['load_bar_strt',
        ['${mx + 9},${my + 9}'],
        ['mkstairs(mx + 9, my + 9, 0, null, true)']],
    ['load_wiz_strt',
        ['${mx + 30},${my + 10}'],
        ['mkstairs(mx + 30, my + 10, 0, null, true)']],
    ['load_wiz_loca',
        ['${mx + 3},${my + 17}', '${mx + 48},${my + 10}'],
        ['mkstairs(mx + 3, my + 17, 1, null, true)',
            'mkstairs(mx + 48, my + 10, 0, null, true)']],
    ['load_wiz_goal',
        ['${mx + 55},${my + 5}'],
        ['mkstairs(mx + 55, my + 5, 1, null, true)']],
    ['load_pri_strt',
        ['${mx + 52},${my + 9}'],
        ['mkstairs(mx + 52, my + 9, 0, null, true)']],
    ['load_pri_loca',
        ['${mx + 43},${my + 5}', '${mx + 20},${my + 6}'],
        ['mkstairs(mx + 43, my + 5, 1, null, true)',
            'mkstairs(mx + 20, my + 6, 0, null, true)']],
    ['load_pri_goal',
        ['${mx + 20},${my + 5}'],
        ['mkstairs(mx + 20, my + 5, 1, null, true)']],
    ['load_arc_strt',
        ['${mx + 55},${my + 7}'],
        ['mkstairs(mx + 55, my + 7, 0, null, true)']],
    ['load_arc_loca',
        ['${mx + 3},${my + 17}', '${mx + 39},${my + 10}'],
        ['mkstairs(mx + 3, my + 17, 1, null, true)',
            'mkstairs(mx + 39, my + 10, 0, null, true)']],
    ['load_arc_goal',
        ['${mx + 38},${my + 10}'],
        ['mkstairs(mx + 38, my + 10, 1, null, true)']],
    ['load_kni_strt',
        ['${mx + 40},${my + 7}'],
        ['mkstairs(mx + 40, my + 7, 0, null, true)']],
    ['load_kni_loca',
        ['${mx + 38},${my + 0}', '${mx + 18},${my + 5}'],
        ['mkstairs(mx + 38, my + 0, 1, null, true)',
            'mkstairs(mx + 18, my + 5, 0, null, true)']],
    ['load_kni_goal',
        ['${mx + 3},${my + 8}'],
        ['mkstairs(mx + 3, my + 8, 1, null, true)']],
    ['load_rog_strt',
        ['${mx + place[0][0]},${my + place[0][1]}'],
        ['mkstairs(mx + place[0][0], my + place[0][1], 0, null, true)']],
    ['load_sam_strt',
        ['${mx + 29},${my + 4}'],
        ['mkstairs(mx + 29, my + 4, 0, null, true)']],
    ['load_sam_loca',
        ['${mx + 10},${my + 10}', '${mx + 25},${my + 14}'],
        ['mkstairs(mx + 10, my + 10, 1, null, true)',
            'mkstairs(mx + 25, my + 14, 0, null, true)']],
    ['load_sam_goal',
        ['${mx + px},${my + py}'],
        ['mkstairs(mx + px, my + py, 1, null, true)']],
    ['load_hea_strt',
        ['${mx + 37},${my + 9}'],
        ['mkstairs(mx + 37, my + 9, 0, null, true)']],
    ['load_hea_loca',
        ['${mx + 4},${my + 4}', '${mx + 20},${my + 6}'],
        ['mkstairs(mx + 4, my + 4, 1, null, true)',
            'mkstairs(mx + 20, my + 6, 0, null, true)']],
    ['load_hea_goal',
        ['${mx + 39},${my + 10}'],
        ['mkstairs(mx + 39, my + 10, 1, null, true)']],
    ['load_tou_strt',
        ['${mx + 66},${my + 3}'],
        ['mkstairs(mx + 66, my + 3, 0, null, true)']],
    ['load_tou_loca',
        ['${mx + 10},${my + 4}', '${mx + 73},${my + 5}'],
        ['mkstairs(mx + 10, my + 4, 1, null, true)',
            'mkstairs(mx + 73, my + 5, 0, null, true)']],
    ['load_tou_goal',
        ['${mx + 70},${my + 8}'],
        ['mkstairs(mx + 70, my + 8, 1, null, true)']],
    ['load_ran_strt',
        ['${mx + 10},${my + 10}'],
        ['mkstairs(mx + 10, my + 10, 0, null, true)']],
    ['load_ran_loca',
        ['${mx + 25},${my + 5}', '${mx + 27},${my + 18}'],
        ['mkstairs(mx + 25, my + 5, 1, null, true)',
            'mkstairs(mx + 27, my + 18, 0, null, true)']],
    ['load_ran_goal',
        ['${mx + 19},${my + 10}'],
        ['mkstairs(mx + 19, my + 10, 1, null, true)']],
    ['load_mon_strt',
        ['${mx + 52},${my + 9}'],
        ['mkstairs(mx + 52, my + 9, 0, null, true)']],
    ['load_mon_goal',
        ['${mx + 20},${my + 5}'],
        ['mkstairs(mx + 20, my + 5, 1, null, true)']],
    ['load_cav_strt',
        ['${mx + 2},${my + 3}'],
        ['mkstairs(mx + 2, my + 3, 0, null, true)']],
    ['load_cav_loca',
        ['${mx + 4},${my + 3}', '${mx + 73},${my + 10}'],
        ['mkstairs(mx + 4, my + 3, 1, null, true)',
            'mkstairs(mx + 73, my + 10, 0, null, true)']],
    ['load_bar_loca',
        ['${mx + 5},${my + 2}', '${mx + 70},${my + 13}'],
        ['mkstairs(mx + 5, my + 2, 1, null, true)',
            'mkstairs(mx + 70, my + 13, 0, null, true)']],
    ['load_bar_goal',
        ['${mx + 36},${my + 5}'],
        ['mkstairs(mx + 36, my + 5, 1, null, true)']],
    ['load_soko1_1',
        ['${xstart + 1},${ystart + 1}'],
        ['mkstairs(xstart + 1, ystart + 1, 0, null, true)']],
    ['load_soko1_2',
        ['${xstart + 6},${ystart + 15}'],
        ['mkstairs(xstart + 6, ystart + 15, 0, null, true)']],
    ['load_soko3_1',
        ['${xstart + 11},${ystart + 2}', '${xstart + 23},${ystart + 4}'],
        ['mkstairs(xstart + 11, ystart + 2, 0, null, true)',
            'mkstairs(xstart + 23, ystart + 4, 1, null, true)']],
    ['load_soko3_2',
        ['${xstart + 3},${ystart + 1}', '${xstart + 20},${ystart + 4}'],
        ['mkstairs(xstart + 3, ystart + 1, 0, null, true)',
            'mkstairs(xstart + 20, ystart + 4, 1, null, true)']],
    ['load_soko4_1',
        ['${xstart + 6},${ystart + 6}'],
        ['mkstairs(xstart + 6, ystart + 6, 1, null, true)']],
    ['load_soko4_2',
        ['${xstart + 1},${ystart + 1}'],
        ['mkstairs(xstart + 1, ystart + 1, 1, null, true)']],
    ['load_soko2_1',
        ['${xstart + 6},${ystart + 10}', '${xstart + 16},${ystart + 4}'],
        ['mkstairs(xstart + 6, ystart + 10, 0, null, true)',
            'mkstairs(xstart + 16, ystart + 4, 1, null, true)']],
    ['load_soko2_2',
        ['${xstart + 6},${ystart + 11}', '${xstart + 15},${ystart + 6}'],
        ['mkstairs(xstart + 6, ystart + 11, 0, null, true)',
            'mkstairs(xstart + 15, ystart + 6, 1, null, true)']],
];

// [loader, ladder-block count]
const LADDER_SITES = [
    ['load_tower1', 1],
    ['load_tower2', 2],
    ['load_tower3', 1],
    ['load_wizard1', 1],
    ['load_wizard2', 2],
    ['load_wizard3', 1],
];

const MARK_NEW = 'if (!game.SpLev_Map) game.SpLev_Map = new Set();';

describe('fixed des.stair sites carry the l_create_stairway :4189 mark + fixed force', () => {
    for (const [loader, marks, stairs] of STAIR_SITES) {
        it(`${loader}: mark in C order before forced mkstairs`, () => {
            const src = readFileSync(SRC, 'utf8');
            const body = loaderBody(src, loader);
            assert.ok(body.includes(MARK_NEW),
                `${loader} must create the SpLev_Map set`);
            for (const coord of marks) {
                const add = `game.SpLev_Map.add(\`${coord}\`); // C :4189`;
                assert.ok(body.includes(add),
                    `${loader} must add the :4189 mark for ${coord}`);
            }
            for (const call of stairs) {
                assert.ok(body.includes(call),
                    `${loader} must call ${call} (fixed force)`);
            }
            // C order :4189/:4210: every mark precedes its mkstairs.
            for (let i = 0; i < marks.length; i++) {
                const add = `game.SpLev_Map.add(\`${marks[i]}\`); // C :4189`;
                assert.ok(body.indexOf(add) < body.indexOf(stairs[i]),
                    `${loader}: mark for ${marks[i]} must precede ${stairs[i]}`);
            }
        });
    }

    it('load_sanctum: live deltrap runs before the mark (C :4187–4189)', () => {
        const src = readFileSync(SRC, 'utf8');
        const body = loaderBody(src, 'load_sanctum');
        assert.ok(body.includes('const stairTrap = t_at(mx + 63, my + 15);'),
            'sanctum must probe the stair cell for a trap');
        assert.ok(body.includes('if (stairTrap) deltrap(stairTrap);'),
            'sanctum must deltrap before the mark');
        const mark = 'game.SpLev_Map.add(`${mx + 63},${my + 15}`); // C :4189';
        assert.ok(body.indexOf('if (stairTrap) deltrap(stairTrap);') < body.indexOf(mark),
            'C order :4187–4189: deltrap before the mark');
    });

    it('tower/wizard ladders mark before the LADDER write (C :4189)', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const [loader, count] of LADDER_SITES) {
            const body = loaderBody(src, loader);
            const mark = 'game.SpLev_Map.add(`${lx},${ly}`); // C :4189';
            const hits = body.split(mark).length - 1;
            assert.equal(hits, count,
                `${loader} must carry ${count} ladder mark(s), found ${hits}`);
            assert.ok(body.indexOf(mark) < body.indexOf('loc.typ = LADDER;'),
                `${loader}: mark must precede the ladder arm`);
        }
    });

    it('C-FALSE mkstairs callers stay unforced', () => {
        const src = readFileSync(SRC, 'utf8');
        for (const [loader, snippet] of [
            ['generate_stairs', 'mkstairs(pos.x, pos.y, 0, croom)'],
            ['makemaz_maze_fallback', 'mkstairs(mm.x, mm.y, 1, 0)'],
            ['mkinvokearea', 'mkstairs(u.ux, u.uy, 0, null, false)'],
            ['put_lregion_here', 'mkstairs(x, y, rtype, null, false)'],
            ['splev_create_stair', 'mkstairs(pos.x, pos.y, up ? 1 : 0, null)'],
            ['splev_room_stair', 'mkstairs(pos.x, pos.y, up ? 1 : 0, croom)'],
        ]) {
            const body = loaderBody(src, loader);
            assert.ok(body.includes(snippet),
                `${loader} must keep C-FALSE ${snippet}`);
        }
    });

    it('no raw 4-arg mkstairs remains in any converted loader (D-3526 close-out)', () => {
        const src = readFileSync(SRC, 'utf8');
        const raw = /mkstairs\([^;]*?,\s*null\);/;
        for (const [loader] of STAIR_SITES) {
            const body = loaderBody(src, loader);
            assert.ok(!raw.test(body),
                `${loader} must carry no raw 4-arg mkstairs`);
        }
    });
});
