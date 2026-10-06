// C ref: sp_lev.c get_table_objtype `:3538–3547` reads its "id" field
// via nhlua.c get_table_str_opt (NULL default; this D-entry).
// lspo_object_normalize_table used a raw-field adapter:
// `typeof tmp.id === 'string'` looked strings up and nil became
// STRANGE_OBJECT, but function values passed through untouched into the
// otyp slot (C pcalls them with luaL_optstring conversion) and direct
// non-string non-nil values (booleans, tables, floats) likewise flowed
// into create_object as garbage where C nhl_errors. The site now reads
// through the shared js/dungeon.js helper (import edge since
// js/mklev.js:150); integer ids stay a JS-only pre-resolved-otyp fast
// path (all in-tree callers pass otyp constants or strings).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_object id inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ id: () => 'tin' }, 'id', null), 'tin');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ id: () => 42 }, 'id', null), '42');
    });

    it('absent id stays NULL (C :3541 NULL default → STRANGE_OBJECT, no throw)', () => {
        assert.equal(get_table_str_opt({}, 'id', null), null);
    });

    it('string id kept verbatim (find_objtype lookup downstream)', () => {
        assert.equal(get_table_str_opt({ id: 'tin' }, 'id', null), 'tin');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ id: true }, 'id', null),
            /get_table_str_opt: no string/);
    });

    it('object site reads through the shared helper; no raw adapter remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_object_normalize_table(tmp)');
        assert.ok(at >= 0, 'lspo_object_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 5600); // bool-opt rewire grew the arm; id read now at +3803
        assert.ok(body.includes("get_table_str_opt(tmp, 'id', null)"),
            'object table arm must read id via the shared helper (C :3541)');
        assert.ok(!body.includes("typeof tmp.id === 'string'"),
            'raw typeof tmp.id adapter still present in lspo_object_normalize_table');
    });
});
