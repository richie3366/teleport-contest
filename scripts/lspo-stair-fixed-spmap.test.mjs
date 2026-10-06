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
// the LADDER write. Quest + soko fixed sites stay raw (named omit).
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

    it('quest + soko fixed sites stay raw (named remainder)', () => {
        const src = readFileSync(SRC, 'utf8');
        assert.ok(loaderBody(src, 'load_bar_strt')
            .includes('mkstairs(mx + 9, my + 9, 0, null);'),
            'quest remainder stays raw');
        assert.ok(loaderBody(src, 'load_soko1_1')
            .includes('mkstairs(xstart + 1, ystart + 1, 0, null); // des.stair("down", 01, 01)'),
            'soko remainder stays raw');
    });
});
