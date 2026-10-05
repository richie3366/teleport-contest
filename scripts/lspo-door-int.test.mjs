// C ref: sp_lev.c lspo_door `:4717` reads its "pos" field via nhlua.c
// get_table_int_opt (this D-entry).
// lspo_door passed the raw table field through a `splev_opt_int`
// adapter: fractions truncated silently (C argerrors), direct non-numeric
// non-nil values flowed through as 0/1 garbage (C argerrors), and integral
// floats converted without the int64-range gate. The site now reads through
// the shared js/dungeon.js helper on the EXISTING mklev→dungeon edge (no
// import change), in C read order (pos :4717 after secret :4715 and mask
// :4716, before wall :4718); lspo_door is exported for the unported des
// dispatch and no in-tree caller passes a table, so no in-tree behavior
// changes. The 3-arg form's null table reads the default via lua_field.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('lspo_door inherits get_table_int_opt conversion', () => {
    it('absent field yields defval -1 (C :4717)', () => {
        assert.equal(get_table_int_opt({}, 'pos', -1), -1);
    });

    it('null table (3-arg form) yields defval -1', () => {
        assert.equal(get_table_int_opt(null, 'pos', -1), -1);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ pos: 3 }, 'pos', -1), 3);
        assert.equal(get_table_int_opt({ pos: 0 }, 'pos', -1), 0);
        assert.equal(get_table_int_opt({ pos: -2 }, 'pos', -1), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ pos: 4.0 }, 'pos', -1), 4);
        assert.equal(get_table_int_opt({ pos: '6' }, 'pos', -1), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ pos: 2 ** 32 + 9 }, 'pos', -1), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ pos: 2.5 }, 'pos', -1),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ pos: true }, 'pos', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ pos: 'soon' }, 'pos', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ pos: {} }, 'pos', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ pos: () => 1 }, 'pos', -1),
            /number expected/);
    });

    it('door wall arm reads pos via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_door(a, b, c)');
        assert.ok(at >= 0, 'lspo_door missing in js/mklev.js');
        const end = src.indexOf('export function lspo_wallify', at);
        assert.ok(end > at, 'lspo_wallify must follow lspo_door in js/mklev.js');
        const body = src.slice(at, end);
        const call = "get_table_int_opt(o, 'pos', -1)";
        assert.ok(body.includes(call), `door arm must read via the shared helper (C :4717): ${call}`);
        assert.ok(!body.includes('splev_opt_int(o?.pos'), 'raw pos adapter must be gone');
        assert.ok(body.indexOf('secret:') < body.indexOf(call), 'pos :4717 after secret :4715 (C order)');
        assert.ok(body.indexOf('mask: msk') < body.indexOf(call), 'pos :4717 after mask :4716 (C order)');
        assert.ok(body.indexOf(call) < body.indexOf('create_door(tmpd'), 'pos :4717 before create_door :4720 (C order)');
    });
});
