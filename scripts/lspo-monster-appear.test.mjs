// C ref: sp_lev.c lspo_monster table form `:3326` reads its "appear_as"
// field via nhlua.c get_table_str_opt (NULL default; this D-entry).
// lspo_monster_appear used a raw-field adapter: `String(appear_as)` froze
// function values as source text and silently coerced direct
// numbers/booleans, where C pcalls functions (luaL_optstring conversion)
// and nhl_errors anything else. The site now reads through the shared
// js/dungeon.js helper (import edge since js/mklev.js:150).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_monster appear_as inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ appear_as: () => 'mon:foo' }, 'appear_as', null), 'mon:foo');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ appear_as: () => 42 }, 'appear_as', null), '42');
    });

    it('absent appear_as stays NULL (C :3326 NULL default)', () => {
        assert.equal(get_table_str_opt({}, 'appear_as', null), null);
    });

    it('string appear_as kept verbatim (prefix dispatch downstream)', () => {
        assert.equal(get_table_str_opt({ appear_as: 'ter:door' }, 'appear_as', null), 'ter:door');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ appear_as: 42 }, 'appear_as', null),
            /get_table_str_opt: no string/);
    });

    it('monster site reads through the shared helper; no String() coercion remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_monster_normalize_table(tmp, inventFn)');
        assert.ok(at >= 0, 'lspo_monster_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 2600);
        assert.ok(body.includes("const mappear = get_table_str_opt(tmp, 'appear_as', null)"),
            'monster table arm must read appear_as via the shared helper (C :3326)');
        const apAt = src.indexOf('function lspo_monster_appear(mappear)');
        assert.ok(apAt >= 0, 'lspo_monster_appear missing in js/mklev.js');
        const apBody = src.slice(apAt, apAt + 1200);
        assert.ok(!apBody.includes('String(appear_as)'),
            'String() coercion still present in lspo_monster_appear');
    });
});
