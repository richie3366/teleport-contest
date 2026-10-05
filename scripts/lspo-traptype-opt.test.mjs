// C ref: sp_lev.c get_table_traptype_opt `:4350–4364` reads its field via
// nhlua.c get_table_str_opt `:4352` (this D-entry). lspo_traptype_opt used
// an inline `o.type` read: function values were String()'d (never
// pcalled) and direct numbers/booleans silently fell to defval, where C
// pcalls functions (luaL_optstring conversion) and nhl_errors anything
// else. The adapter now takes C's (o, name, defval) shape and reads the
// field through the shared js/dungeon.js helper (import edge since :150).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_traptype_opt inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ type: () => 'pit' }, 'type', ''), 'pit');
    });

    it('absent type stays emptystr (C :4355 keeps defval)', () => {
        assert.equal(get_table_str_opt({}, 'type', ''), '');
    });

    it('string type kept verbatim (strcmpi loop lowercases)', () => {
        assert.equal(get_table_str_opt({ type: 'Fire' }, 'type', ''), 'Fire');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ type: 42 }, 'type', ''),
            /get_table_str_opt: no string/);
    });

    it('trap site reads through the shared helper; no raw field read remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_traptype_opt(o, name, defval)');
        assert.ok(at >= 0, 'lspo_traptype_opt(o, name, defval) missing in js/mklev.js');
        const body = src.slice(at, at + 1200);
        assert.ok(body.includes("get_table_str_opt(o ?? {}, name, '')"),
            'lspo_traptype_opt must read the field via the shared helper (C :4352)');
        assert.ok(!body.includes('const s = o.type'),
            'inline raw-field read still present in lspo_traptype_opt');
        assert.ok(src.includes("lspo_traptype_opt(o, 'type', -1)"),
            'lspo_trap table arm must pass the C field name (C sp_lev.c:4430)');
    });
});
