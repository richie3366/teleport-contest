// C ref: sp_lev.c lspo_object `:3667–3705` reads its "montype" field via
// nhlua.c get_table_str_opt (NULL default; this D-entry) and errors
// "Unknown montype" (`:3701–3704`) when no permonst matches.
// lspo_object_apply_montype raw-read tmp.montype: strings (and
// String()-coerced numbers/booleans/tables) flowed into the pmnames
// scan where C pcalls functions with luaL_optstring conversion and
// nhl_errors direct non-strings; "" skipped the branch where C enters
// it (non-NULL) and errors; unknown names silently kept corpsenm
// where C errors. The site now reads through the shared
// js/dungeon.js helper (import edge since js/mklev.js:150); all
// in-tree callers pass resolvable strings (aligned cleric via the
// NEUTRAL pmnames slot).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_object montype inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ montype: () => 'spinach' }, 'montype', null), 'spinach');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ montype: () => 42 }, 'montype', null), '42');
    });

    it('absent montype stays NULL (C :3673 NULL default skips the branch)', () => {
        assert.equal(get_table_str_opt({}, 'montype', null), null);
    });

    it('string montype kept verbatim (pmnames scan downstream)', () => {
        assert.equal(get_table_str_opt({ montype: 'yellow dragon' }, 'montype', null), 'yellow dragon');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ montype: true }, 'montype', null),
            /get_table_str_opt: no string/);
    });

    it('montype site reads through the shared helper; no raw adapter remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_object_apply_montype(tmp)');
        assert.ok(at >= 0, 'lspo_object_apply_montype missing in js/mklev.js');
        const body = src.slice(at, at + 3600);
        assert.ok(body.includes("get_table_str_opt(tmp, 'montype', null)"),
            'montype arm must read via the shared helper (C :3673)');
        assert.ok(!body.includes('const montype = tmp.montype;'),
            'raw tmp.montype adapter still present in lspo_object_apply_montype');
        assert.ok(body.includes("nhl_error('Unknown montype')"),
            'C :3701–3704 unknown-montype error arm missing');
    });
});
