// C ref: sp_lev.c lspo_monster table form `:3295` reads its "name" field
// via nhlua.c get_table_str_opt (NULL default; this D-entry).
// lspo_monster_normalize_table used a nil-or-passthrough adapter: function
// values flowed uncalled into christen_monst and direct numbers/booleans
// passed through silently, where C pcalls functions (luaL_optstring
// conversion) and nhl_errors anything else. The site now reads through the
// shared js/dungeon.js helper (import edge since js/mklev.js:150).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_monster name inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ name: () => 'Fido' }, 'name', null), 'Fido');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ name: () => 42 }, 'name', null), '42');
    });

    it('absent name stays NULL (C :3295 NULL default)', () => {
        assert.equal(get_table_str_opt({}, 'name', null), null);
    });

    it('string name kept verbatim (christen arm downstream)', () => {
        assert.equal(get_table_str_opt({ name: 'Fido' }, 'name', null), 'Fido');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ name: 42 }, 'name', null),
            /get_table_str_opt: no string/);
    });

    it('monster site reads through the shared helper; no passthrough remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_monster_normalize_table(tmp, inventFn)');
        assert.ok(at >= 0, 'lspo_monster_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 1200);
        assert.ok(body.includes("tmp.name = get_table_str_opt(tmp, 'name', null)"),
            'monster table arm must read name via the shared helper (C :3295)');
        assert.ok(!body.includes('if (tmp.name == null) tmp.name = null'),
            'nil-or-passthrough adapter still present in lspo_monster_normalize_table');
    });
});
