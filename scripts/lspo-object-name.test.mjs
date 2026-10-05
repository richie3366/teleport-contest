// C ref: sp_lev.c lspo_object `:3631–3655` reads its "name" field via
// nhlua.c get_table_str_opt (NULL default; this D-entry).
// lspo_object_normalize_table passed the raw spread field through:
// function values flowed into create_object (whose `typeof` coercion
// named the object '' — C pcalls them with luaL_optstring conversion)
// and direct non-string non-nil values (numbers, booleans, tables)
// likewise degraded to '' or `.str` where C nhl_errors. The site now
// reads through the shared js/dungeon.js helper (import edge since
// js/mklev.js:150), in C field order (after buc :3635, before
// quantity :3638); all in-tree callers pass strings or nothing.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_object name inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ name: () => 'Perseus' }, 'name', null), 'Perseus');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ name: () => 42 }, 'name', null), '42');
    });

    it('absent name stays NULL (C :3637 NULL default → unnamed, no throw)', () => {
        assert.equal(get_table_str_opt({}, 'name', null), null);
    });

    it('string name kept verbatim (oname downstream)', () => {
        assert.equal(get_table_str_opt({ name: 'The Orb of Fate' }, 'name', null), 'The Orb of Fate');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ name: true }, 'name', null),
            /get_table_str_opt: no string/);
    });

    it('object table arm reads name via the shared helper in C field order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_object_normalize_table(tmp)');
        assert.ok(at >= 0, 'lspo_object_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 3600);
        assert.ok(body.includes("tmp.name = get_table_str_opt(tmp, 'name', null);"),
            'object table arm must read name via the shared helper (C :3637)');
        assert.ok(body.indexOf("tmp.name = get_table_str_opt(tmp, 'name', null);")
            < body.indexOf("get_table_int_or_random(tmp, 'quantity'"),
            'name must be read before quantity (C :3637 before :3638 pcall order)');
    });
});
