// C ref: sp_lev.c lspo_trap `:4431–4433` (spider_on_web/seen/victim),
// lspo_region `:5601–5603` (irregular/joined/arrival_room), lspo_mazewalk
// `:5795` (stocked) and lspo_map `:6121` (lit) read their fields via nhlua.c
// get_table_boolean_opt (this D-entry). The eight sites passed raw table
// values through the `splev_opt_boolean` adapter, which mapped strings to
// meanings ("true"→1, "false"→0, ...) where C get_table_boolean returns
// the raw luaL_checkoption index ("true"→0, "false"→1, "yes"→2, "no"→3 —
// nhlua.c:1081–1092), and which rejected beyond-int32 integrals where C's
// (int) cast truncates them into the 0/1 gate. The sites now read through
// the shared same-file helper (no import change), in place; the adapter
// held no other uses, so the dead `splev_opt_boolean` is gone. The four
// entries are exported for the unported des dispatch and have no in-tree
// callers (mazewalk's only test caller passes boolean stocked), so no
// in-tree behavior changes.
// Close-out (this D-entry): l_table_getset_feature_flag `:4745`
// (dynamic name, defval -2) and lspo_engraving `:3909–3910`
// (degrade TRUE / guardobjects FALSE) read through the
// `splev_feature_boolopt` adapter, which matched C except that
// beyond-int32 integrals threw where C's (int) cast truncates them into
// the 0/1 gate. All three now read through the shared helper; the
// adapter is gone. lspo_feature / lspo_engraving have no callers in js/
// and no test passes these keys, so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_boolean_opt } from '../js/mklev.js';

const SRC_URL = new URL('../js/mklev.js', import.meta.url);

function fnBody(src, def) {
    const at = src.indexOf(def);
    assert.ok(at >= 0, `${def} missing in js/mklev.js`);
    const rest = src.slice(at + def.length);
    const m = rest.search(/\nexport (async )?function /);
    return m < 0 ? rest : rest.slice(0, m);
}

describe('lspo boolean fields inherit get_table_boolean_opt conversion', () => {
    it('absent and null fields yield the C defaults', () => {
        assert.equal(get_table_boolean_opt({}, 'spider_on_web', 1), 1);
        assert.equal(get_table_boolean_opt({}, 'seen', 0), 0);
        assert.equal(get_table_boolean_opt({}, 'victim', 1), 1);
        assert.equal(get_table_boolean_opt({}, 'irregular', 0), 0);
        assert.equal(get_table_boolean_opt({}, 'joined', 1), 1);
        assert.equal(get_table_boolean_opt({}, 'arrival_room', 0), 0);
        assert.equal(get_table_boolean_opt({}, 'stocked', 1), 1);
        assert.equal(get_table_boolean_opt({}, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ stocked: null }, 'stocked', 1), 1);
        assert.equal(get_table_boolean_opt({ lit: undefined }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({}, 'degrade', 1), 1);
        assert.equal(get_table_boolean_opt({}, 'guardobjects', 0), 0);
        assert.equal(get_table_boolean_opt({}, 'looted', -2), -2);
    });

    it('booleans and 0/1 read as 1/0 (C lua_toboolean / (int) gate)', () => {
        assert.equal(get_table_boolean_opt({ stocked: true }, 'stocked', 1), 1);
        assert.equal(get_table_boolean_opt({ stocked: false }, 'stocked', 1), 0);
        assert.equal(get_table_boolean_opt({ lit: 1 }, 'lit', 0), 1);
        assert.equal(get_table_boolean_opt({ lit: 0 }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ lit: 1.0 }, 'lit', 0), 1);
    });

    it('strings keep the pinned raw checkoption indices, not meanings', () => {
        for (const [value, index] of [['true', 0], ['false', 1], ['yes', 2], ['no', 3]]) {
            assert.equal(get_table_boolean_opt({ stocked: value }, 'stocked', 1), index);
        }
    });

    it('beyond-int32 integrals truncate like the C (int) cast', () => {
        assert.equal(get_table_boolean_opt({ lit: 2 ** 32 }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ lit: 2 ** 32 + 1 }, 'lit', 0), 1);
    });

    it('out-of-range and non-boolean values throw (C nhl_error / checkoption)', () => {
        for (const value of [2, -1, {}, [], () => 1]) {
            assert.throws(() => get_table_boolean_opt({ stocked: value }, 'stocked', 1),
                /Expected a boolean/);
        }
        // C :1096 luaL_checkinteger throws before the 0/1 gate is reached.
        assert.throws(() => get_table_boolean_opt({ stocked: 1.5 }, 'stocked', 1),
            /no integer representation/);
        for (const value of ['soon', 'True', '']) {
            assert.throws(() => get_table_boolean_opt({ stocked: value }, 'stocked', 1),
                /invalid option/);
        }
    });

    it('trap arm reads all three fields via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const body = fnBody(src, 'export function lspo_trap(a, b, c)');
        const xy = 'const xy = get_table_xy_or_coord(o); // C :4429';
        const spider = "tmp.spider_on_web = !!get_table_boolean_opt(o, 'spider_on_web', 1); // C :4431";
        const seen = "tmp.seen = !!get_table_boolean_opt(o, 'seen', 0); // C :4432";
        const victim = "tmp.novictim = !get_table_boolean_opt(o, 'victim', 1); // C :4433";
        for (const line of [xy, spider, seen, victim]) {
            assert.ok(body.includes(line), `trap arm must hold: ${line}`);
        }
        assert.ok(body.indexOf(xy) < body.indexOf(spider));
        assert.ok(body.indexOf(spider) < body.indexOf(seen));
        assert.ok(body.indexOf(seen) < body.indexOf(victim));
        assert.ok(!body.includes('splev_opt_boolean'), 'raw trap adapters must be gone');
    });

    it('region/mazewalk/map arms read via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const region = fnBody(src, 'export async function lspo_region(a, b)');
        const irregular = "get_table_boolean_opt(o, 'irregular', 0); // C :5601";
        const joined = "get_table_boolean_opt(o, 'joined', 1); // C :5602";
        const arrival = "get_table_boolean_opt(o, 'arrival_room', 0); // C :5603";
        for (const call of [irregular, joined, arrival]) {
            assert.ok(region.includes(call), `region arm must read via the shared helper: ${call}`);
        }
        assert.ok(region.indexOf("get_table_int_opt(o, 'filled', 0)") < region.indexOf(irregular));
        assert.ok(region.indexOf(irregular) < region.indexOf(joined));
        assert.ok(region.indexOf(joined) < region.indexOf(arrival));
        assert.ok(region.indexOf(arrival) < region.indexOf("get_table_roomtype_opt(o, 'type', OROOM)"));
        const maze = fnBody(src, 'export function lspo_mazewalk(a, b, c)');
        const stocked = "fstocked = get_table_boolean_opt(o, 'stocked', 1); // C :5795";
        assert.ok(maze.includes(stocked), `mazewalk arm must read via the shared helper: ${stocked}`);
        assert.ok(maze.indexOf("get_table_mapchr_opt(o, 'typ', ROOM)") < maze.indexOf(stocked));
        assert.ok(maze.indexOf(stocked) < maze.indexOf('splev_opt_index(o.dir'));
        const map = fnBody(src, 'export function lspo_map(a, contentsFn)');
        const lit = "lit = get_table_boolean_opt(o, 'lit', 0); // C :6121";
        assert.ok(map.includes(lit), `map arm must read via the shared helper: ${lit}`);
        assert.ok(map.indexOf("typeof o.map !== 'string'") < map.indexOf(lit));
        for (const [name, body] of [['region', region], ['mazewalk', maze], ['map', map]]) {
            assert.ok(!body.includes('splev_opt_boolean'), `raw ${name} adapters must be gone`);
        }
    });

    it('feature-flag and engraving arms read via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const flagAt = src.indexOf('function l_table_getset_feature_flag(o, x, y, name, flag)');
        assert.ok(flagAt >= 0, 'l_table_getset_feature_flag missing in js/mklev.js');
        const flagBody = src.slice(flagAt, flagAt + 900);
        const read = 'const raw = get_table_boolean_opt(o, name, -2); // C :4745';
        const gate = 'if (raw === -2) return; // C :4747';
        assert.ok(flagBody.includes(read), `feature-flag arm must hold: ${read}`);
        assert.ok(flagBody.includes(gate), `feature-flag arm must hold: ${gate}`);
        assert.ok(flagBody.indexOf(read) < flagBody.indexOf(gate));
        assert.ok(flagBody.indexOf(gate) < flagBody.indexOf('rn2(2)'));
        assert.ok(!flagBody.includes('splev_feature_boolopt'), 'raw feature-flag adapter must be gone');
        const engr = fnBody(src, 'export function lspo_engraving(a, b, c)');
        const wipeout = "wipeout = get_table_boolean_opt(o, 'degrade', 1) !== 0; // C :3909";
        const guard = "guardobjs = get_table_boolean_opt(o, 'guardobjects', 0) !== 0; // C :3910";
        assert.ok(engr.includes(wipeout), `engraving arm must hold: ${wipeout}`);
        assert.ok(engr.includes(guard), `engraving arm must hold: ${guard}`);
        assert.ok(engr.indexOf(wipeout) < engr.indexOf(guard));
        assert.ok(!engr.includes('splev_feature_boolopt'), 'raw engraving adapters must be gone');
    });

    it('dead splev_opt_boolean adapter is gone file-wide', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        assert.ok(!src.includes('splev_opt_boolean'), 'no splev_opt_boolean mention may remain in js/mklev.js');
    });

    it('dead splev_feature_boolopt adapter is gone file-wide', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        assert.ok(!src.includes('splev_feature_boolopt'), 'no splev_feature_boolopt mention may remain in js/mklev.js');
    });
});
