// C ref: sp_lev.c get_table_objclass `:3457` and get_table_monclass `:3133`
// read their "class" field via nhlua.c get_table_str_opt (NULL default;
// this D-entry). The shared js/mklev.js adapter get_table_objclass_field
// used a raw-field read: function values and direct numbers/booleans fell
// to -1, where C pcalls functions (luaL_optstring conversion) and
// nhl_errors anything else. The adapter now reads through the shared
// js/dungeon.js helper (import edge since js/mklev.js:150), then keeps
// C's strlen==1 gate (:3460/:3136).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('objclass/monclass class field inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ class: () => '%' }, 'class', null), '%');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ class: () => 42 }, 'class', null), '42');
    });

    it('absent class stays NULL (C :3457/:3133 NULL default)', () => {
        assert.equal(get_table_str_opt({}, 'class', null), null);
    });

    it('string class kept verbatim (strlen==1 gate downstream)', () => {
        assert.equal(get_table_str_opt({ class: '%' }, 'class', null), '%');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ class: 37 }, 'class', null),
            /get_table_str_opt: no string/);
    });

    it('shared adapter reads through the helper; raw-field read gone', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function get_table_objclass_field(o)');
        assert.ok(at >= 0, 'get_table_objclass_field missing in js/mklev.js');
        const body = src.slice(at, at + 1200);
        assert.ok(body.includes("const s = get_table_str_opt(o, 'class', null)"),
            'adapter must read class via the shared helper (C :3457/:3133)');
        assert.ok(body.includes('s.length === 1'),
            'adapter must keep the C strlen==1 gate (:3460/:3136)');
        assert.ok(!body.includes('const s = o.class;'),
            'raw-field read still present in get_table_objclass_field');
    });
});
