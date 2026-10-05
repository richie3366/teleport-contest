// C ref: sp_lev.c get_table_montype `:3166–3180` reads its "id" field
// via nhlua.c get_table_str_opt (NULL default; this D-entry).
// lspo_monster_normalize_table used a raw-field adapter:
// `(tmp.id == null) ? null : String(tmp.id)` froze function values as
// source text and silently coerced direct numbers/booleans into the
// name_to_monplus lookup (surfacing as the wrong "Unknown monster id"
// error), where C pcalls functions (luaL_optstring conversion) and
// nhl_errors anything else. The site now reads through the shared
// js/dungeon.js helper (import edge since js/mklev.js:150).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_monster id inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ id: () => 'ogre' }, 'id', null), 'ogre');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ id: () => 42 }, 'id', null), '42');
    });

    it('absent id stays NULL (C :3169 NULL default → NON_PM, no throw)', () => {
        assert.equal(get_table_str_opt({}, 'id', null), null);
    });

    it('string id kept verbatim (find_montype lookup downstream)', () => {
        assert.equal(get_table_str_opt({ id: 'Arch Priest' }, 'id', null), 'Arch Priest');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ id: 42 }, 'id', null),
            /get_table_str_opt: no string/);
    });

    it('monster site reads through the shared helper; no String() coercion remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_monster_normalize_table(tmp, inventFn)');
        assert.ok(at >= 0, 'lspo_monster_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 4600);
        assert.ok(body.includes("tmp.idName = get_table_str_opt(tmp, 'id', null)"),
            'monster table arm must read id via the shared helper (C :3169)');
        assert.ok(!body.includes('String(tmp.id)'),
            'String(tmp.id) coercion still present in lspo_monster_normalize_table');
    });
});
