// C ref: sp_lev.c option reads — lspo_drawbridge `:5744/:5746`
// (dir/state), lspo_mazewalk `:5789/:5796` (unpacked/table dir),
// lspo_corridor `:4545/:4548` (srcwall/destwall), lspo_feature
// `:4860/:4865/:4870/:4879` (type), lspo_engraving `:3907/:3916` (type),
// lspo_region `:5619` (lit), lspo_map `:6117/:6118` (halign/valign),
// lspo_wall_property `:5891` (property), lspo_door `:4688/:4698/:4718`
// (state/wall) and lspo_altar `:4304` (type) read their fields via
// nhlua.c get_table_option / lauxlib luaL_checkoption (this D-entry).
// The twenty sites passed raw values through the `splev_opt_index`
// adapter (or an inline indexOf for region lit), which threw on every
// finite number where C luaL_checkoption stringifies it first
// (luaL_checkstring) and then matches. The sites now read through the
// live dungeon.js helpers (same import line, no new module edge), in
// place and in C order; the adapter held no other uses, so the dead
// `splev_opt_index` is gone. The eleven entries have no callers in js/
// or dat/ and no test passes these keys, so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_option, luaL_checkoption } from '../js/dungeon.js';

const SRC_URL = new URL('../js/mklev.js', import.meta.url);

function fnBody(src, def) {
    const at = src.indexOf(def);
    assert.ok(at >= 0, `${def} missing in js/mklev.js`);
    const rest = src.slice(at + def.length);
    const m = rest.search(/\nexport (async )?function /);
    return m < 0 ? rest : rest.slice(0, m);
}

describe('lspo option fields inherit get_table_option conversion', () => {
    it('absent and null fields yield the C default index', () => {
        const MW = ['north', 'south', 'east', 'west', 'random'];
        assert.equal(get_table_option({}, 'dir', 'random', MW), 4);
        assert.equal(get_table_option({ dir: null }, 'dir', 'random', MW), 4);
        assert.equal(get_table_option({ dir: undefined }, 'dir', 'random', MW), 4);
        assert.equal(get_table_option({}, 'halign', 'none', ['left', 'center', 'right', 'none']), 3);
        assert.equal(get_table_option(null, 'wall', 'all', ['all', 'random']), 0);
        assert.equal(get_table_option({}, 'type', 'altar', ['altar', 'shrine', 'sanctum']), 0);
        assert.equal(get_table_option({}, 'property', 'nondiggable', ['diggable', 'nondiggable']), 1);
        assert.equal(get_table_option({}, 'state', 'random', ['random', 'open']), 0);
    });

    it('strings match exactly (case-sensitive); unknown throws like C argerror', () => {
        const MW = ['north', 'south', 'east', 'west', 'random'];
        assert.equal(get_table_option({ dir: 'north' }, 'dir', 'random', MW), 0);
        assert.equal(get_table_option({ dir: 'random' }, 'dir', 'north', MW), 4);
        assert.throws(() => get_table_option({ dir: 'North' }, 'dir', 'random', MW), /invalid option/);
        assert.throws(() => get_table_option({ dir: 'up' }, 'dir', 'random', MW), /invalid option/);
        assert.throws(() => get_table_option({ dir: '' }, 'dir', 'random', MW), /invalid option/);
    });

    it('finite numbers stringify before matching (C luaL_checkstring)', () => {
        // The adapter threw `lspo: bad option` on every number; C matches
        // String(value) against the table (nhlua.c luaL_checkoption).
        assert.equal(luaL_checkoption(1, 'random', ['1', '2']), 0);
        assert.equal(luaL_checkoption(2.0, 'random', ['1', '2']), 1);
        assert.equal(get_table_option({ dir: 1 }, 'dir', 'random', ['1', '2']), 0);
        assert.throws(() => luaL_checkoption(3, 'random', ['1', '2']), /invalid option/);
        assert.throws(() => get_table_option({ dir: 0 }, 'dir', 'random', ['north']), /invalid option/);
    });

    it('nil with null defval and non-strings throw like C bad-argument', () => {
        assert.throws(() => luaL_checkoption(undefined, null, ['a']), /bad argument/);
        assert.throws(() => luaL_checkoption(null, null, ['a']), /bad argument/);
        assert.throws(() => luaL_checkoption(true, 'random', ['a']), /bad argument/);
        assert.throws(() => luaL_checkoption({}, 'random', ['a']), /bad argument/);
        assert.throws(() => luaL_checkoption(NaN, 'random', ['a']), /bad argument/);
        assert.throws(() => get_table_option({}, 'type', null, ['a']), /bad argument/);
        assert.equal(luaL_checkoption('b', null, ['a', 'b']), 1);
    });

    it('drawbridge/mazewalk/corridor arms read via the shared helpers in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const bridge = fnBody(src, 'export function lspo_drawbridge(opts)');
        const bdir = "get_table_option(o, 'dir', 'random', LSPO_MWDIRS)";
        const bstate = "get_table_option(o, 'state', 'random', LSPO_DBOPENS)";
        assert.ok(bridge.includes(bdir), `drawbridge dir must read via the shared helper: ${bdir}`);
        assert.ok(bridge.includes(bstate), `drawbridge state must read via the shared helper: ${bstate}`);
        assert.ok(bridge.indexOf('get_table_xy_or_coord(o)') < bridge.indexOf(bdir));
        assert.ok(bridge.indexOf(bdir) < bridge.indexOf(bstate));
        const maze = fnBody(src, 'export function lspo_mazewalk(a, b, c)');
        const mdir3 = "luaL_checkoption(c, 'random', LSPO_MAZEWALK_DIRS)";
        const mdirT = "get_table_option(o, 'dir', 'random', LSPO_MAZEWALK_DIRS)";
        assert.ok(maze.includes(mdir3), `mazewalk triple must read via luaL_checkoption: ${mdir3}`);
        assert.ok(maze.includes(mdirT), `mazewalk table must read via the shared helper: ${mdirT}`);
        assert.ok(maze.indexOf("luaL_checkinteger_unpacked(b)") < maze.indexOf(mdir3));
        assert.ok(maze.indexOf("get_table_boolean_opt(o, 'stocked', 1)") < maze.indexOf(mdirT));
        const corr = fnBody(src, 'export async function lspo_corridor(opts)');
        const sw = "get_table_option(o, 'srcwall', 'all', LSPO_WALLDIRS)";
        const dw = "get_table_option(o, 'destwall', 'all', LSPO_WALLDIRS)";
        assert.ok(corr.includes(sw), `corridor srcwall must read via the shared helper: ${sw}`);
        assert.ok(corr.includes(dw), `corridor destwall must read via the shared helper: ${dw}`);
        assert.ok(corr.indexOf(sw) < corr.indexOf(dw));
    });

    it('feature/engraving/region arms read via the shared helpers in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const feat = fnBody(src, 'export function lspo_feature(a, b, c)');
        const funpack = 'luaL_checkoption(a, null, LSPO_FEATURES)';
        const ftable = "get_table_option(o, 'type', null, LSPO_FEATURES)";
        assert.equal(feat.split(funpack).length - 1, 3, 'three unpacked arms must read via luaL_checkoption');
        let at = -1;
        for (const cite of ['// C :4860', '// C :4865', '// C :4870']) {
            at = feat.indexOf(cite, at + 1);
            assert.ok(at >= 0, `feature unpacked arm must carry ${cite}`);
        }
        assert.ok(feat.includes(ftable), `feature table must read via the shared helper: ${ftable}`);
        assert.ok(feat.indexOf('get_table_xy_or_coord(o)') < feat.indexOf(ftable));
        const engr = fnBody(src, 'export function lspo_engraving(');
        const etable = "get_table_option(o, 'type', 'engrave', LSPO_ENGRTYPES)";
        const eunpack = "luaL_checkoption(b, 'engrave', LSPO_ENGRTYPES)";
        assert.ok(engr.includes(etable), `engraving table must read via the shared helper: ${etable}`);
        assert.ok(engr.includes(eunpack), `engraving triple must read via luaL_checkoption: ${eunpack}`);
        const region = fnBody(src, 'export async function lspo_region(a, b)');
        const lit = "luaL_checkoption(b, 'lit', ['unlit', 'lit'])";
        assert.ok(region.includes(lit), `region lit must read via luaL_checkoption: ${lit}`);
        assert.ok(!region.includes('.indexOf(b ??'), 'region inline indexOf must be gone');
    });

    it('map/wallprop/door/altar arms read via the shared helpers in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const map = fnBody(src, 'export function lspo_map(a, contentsFn)');
        const halign = "get_table_option(o, 'halign', 'none', left_or_right)";
        const valign = "get_table_option(o, 'valign', 'none', top_or_bot)";
        assert.ok(map.includes(halign), `map halign must read via the shared helper: ${halign}`);
        assert.ok(map.includes(valign), `map valign must read via the shared helper: ${valign}`);
        assert.ok(map.indexOf(halign) < map.indexOf(valign));
        const wall = fnBody(src, 'export function lspo_wall_property(o)');
        const wprop = "get_table_option(o, 'property', 'nondiggable', LSPO_WPROPS)";
        assert.ok(wall.includes(wprop), `wall_property must read via the shared helper: ${wprop}`);
        const door = fnBody(src, 'export function lspo_door(');
        const dunpack = "luaL_checkoption(a, 'random', doorstates)";
        const dstate = "get_table_option(o, 'state', 'random', doorstates)";
        const dwall = "get_table_option(o, 'wall', 'all', walldirs)";
        assert.ok(door.includes(dunpack), `door triple must read via luaL_checkoption: ${dunpack}`);
        assert.ok(door.includes(dstate), `door state must read via the shared helper: ${dstate}`);
        assert.ok(door.includes(dwall), `door wall must read via the shared helper: ${dwall}`);
        const altar = fnBody(src, 'export function lspo_altar(o, croom = null)');
        const shrine = "get_table_option(o, 'type', 'altar', shrines)";
        assert.ok(altar.includes(shrine), `altar type must read via the shared helper: ${shrine}`);
        assert.ok(altar.indexOf('get_table_align_unpacked(o.align)') < altar.indexOf(shrine));
    });

    it('the splev_opt_index adapter is gone from js/', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        assert.ok(!src.includes('splev_opt_index'), 'dead adapter must be gone');
    });
});
