// C ref: sp_lev.c lspo_gold `:4502` reads its "amount" field via nhlua.c
// get_table_int_opt (this D-entry).
// lspo_gold passed the raw table field through a `splev_opt_int`
// adapter: fractions truncated silently (C argerrors), direct non-numeric
// non-nil values flowed through as 0/1 garbage (C argerrors), and integral
// floats converted without the int64-range gate. The site now reads through
// the shared js/dungeon.js helper on the EXISTING mklev→dungeon edge (no
// import change), in C read order (amount :4502 before x/y :4503);
// lspo_gold is exported for the unported des dispatch and no in-tree
// caller passes a table, so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('lspo_gold inherits get_table_int_opt conversion', () => {
    it('absent field yields defval -1 (C :4502)', () => {
        assert.equal(get_table_int_opt({}, 'amount', -1), -1);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ amount: 500 }, 'amount', -1), 500);
        assert.equal(get_table_int_opt({ amount: 0 }, 'amount', -1), 0);
        assert.equal(get_table_int_opt({ amount: -2 }, 'amount', -1), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ amount: 4.0 }, 'amount', -1), 4);
        assert.equal(get_table_int_opt({ amount: '6' }, 'amount', -1), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ amount: 2 ** 32 + 9 }, 'amount', -1), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ amount: 2.5 }, 'amount', -1),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ amount: true }, 'amount', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ amount: 'soon' }, 'amount', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ amount: {} }, 'amount', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ amount: () => 1 }, 'amount', -1),
            /number expected/);
    });

    it('gold table arm reads amount via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_gold(a, b, c)');
        assert.ok(at >= 0, 'lspo_gold missing in js/mklev.js');
        const body = src.slice(at, at + 1400);
        const call = "get_table_int_opt(o, 'amount', -1)";
        assert.ok(body.includes(call), `gold arm must read via the shared helper (C :4502): ${call}`);
        assert.ok(!body.includes('splev_opt_int(o.amount'), 'raw amount adapter must be gone');
        assert.ok(body.indexOf('create_des_coder()') < body.indexOf(call), 'amount :4502 after create_des_coder (C order)');
        assert.ok(body.indexOf(call) < body.indexOf('get_table_xy_or_coord(o)'), 'amount :4502 before x/y :4503 (C read order)');
    });
});
