// C ref: sp_lev.c lspo_grave `:4261` table-form text read through
// nhlua.c get_table_str_opt `:1055–1076` (D-3467). The grave site used
// an inline adapter that threw on function-produced numbers; C's
// luaL_optstring converts them via lua_number2str. The site now calls
// the shared js/dungeon.js helper (import edge since :150).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('lspo_grave text inherits get_table_str_opt conversion', () => {
    it('function-produced integer converts (C luaL_optstring)', () => {
        assert.equal(get_table_str_opt({ text: () => 42 }, 'text', null), '42');
    });

    it('absent text stays NULL (grave random-epitaph path)', () => {
        assert.equal(get_table_str_opt({}, 'text', null), null);
    });

    it('string text kept verbatim', () => {
        assert.equal(get_table_str_opt({ text: 'hi' }, 'text', null), 'hi');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ text: 42 }, 'text', null),
            /get_table_str_opt: no string/);
    });

    it('grave site calls the shared helper; no inline adapter remains', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        assert.match(src, /get_table_str_opt[\s\S]{0,400}?from '\.\/dungeon\.js'/,
            'mklev.js must import get_table_str_opt from dungeon.js');
        const at = src.indexOf('export function lspo_grave');
        assert.ok(at >= 0, 'lspo_grave missing in js/mklev.js');
        const body = src.slice(at, at + 2500);
        assert.ok(body.includes("get_table_str_opt(a, 'text', null)"),
            'lspo_grave table arm must call the shared helper (C :4261)');
        assert.equal(
            src.split('get_table_str_opt: no string').length - 1, 0,
            'inline grave adapter throw still present in js/mklev.js');
    });
});
