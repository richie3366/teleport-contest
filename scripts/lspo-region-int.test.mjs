// C ref: sp_lev.c lspo_region `:5600` (filled) / `:5605` (lit) and
// get_table_coords_or_region `:5565–5568` (x1, y1, x2, y2) read their fields
// via nhlua.c get_table_int_opt (this D-entry). lspo_region passed the raw
// table fields through `splev_opt_int` adapters: fractions truncated silently
// (C argerrors), direct non-numeric non-nil values flowed through as 0/1
// garbage (C argerrors), and integral floats converted without the
// int64-range gate. The six sites now read through the shared js/dungeon.js
// helper on the EXISTING mklev→dungeon edge (no import change), in C read
// order (filled :5600, lit :5605, x1..y2 :5565–5568 via the :5607 call);
// region held the adapter's last uses, so the dead `splev_opt_int` is gone.
// lspo_region is exported for the unported des dispatch and has no in-tree
// callers (in-tree level code is inline expansions, annotated in comments
// only), so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('lspo_region inherits get_table_int_opt conversion', () => {
    it('absent fields yield C defaults (filled 0, lit -1, coords -1)', () => {
        assert.equal(get_table_int_opt({}, 'filled', 0), 0);
        assert.equal(get_table_int_opt({}, 'lit', -1), -1);
        assert.equal(get_table_int_opt({}, 'x1', -1), -1);
        assert.equal(get_table_int_opt({}, 'y1', -1), -1);
        assert.equal(get_table_int_opt({}, 'x2', -1), -1);
        assert.equal(get_table_int_opt({}, 'y2', -1), -1);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ filled: 2 }, 'filled', 0), 2);
        assert.equal(get_table_int_opt({ lit: 0 }, 'lit', -1), 0);
        assert.equal(get_table_int_opt({ x1: -2 }, 'x1', -1), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ filled: 1.0 }, 'filled', 0), 1);
        assert.equal(get_table_int_opt({ y2: '6' }, 'y2', -1), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ x1: 2 ** 32 + 9 }, 'x1', -1), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ filled: 2.5 }, 'filled', 0),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ lit: true }, 'lit', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ x1: 'soon' }, 'x1', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ y1: {} }, 'y1', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ x2: () => 1 }, 'x2', -1),
            /number expected/);
    });

    it('region arm reads all six fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export async function lspo_region(a, b)');
        assert.ok(at >= 0, 'lspo_region missing in js/mklev.js');
        const end = src.indexOf('lspo_map', at);
        assert.ok(end > at, 'lspo_map must follow lspo_region in js/mklev.js');
        const body = src.slice(at, end);
        const calls = [
            "get_table_int_opt(o, 'filled', 0)",
            "get_table_int_opt(o, 'lit', -1)",
            "get_table_int_opt(o, 'x1', -1)",
            "get_table_int_opt(o, 'y1', -1)",
            "get_table_int_opt(o, 'x2', -1)",
            "get_table_int_opt(o, 'y2', -1)",
        ];
        for (const call of calls) {
            assert.ok(body.includes(call), `region arm must read via the shared helper: ${call}`);
        }
        assert.ok(!body.includes('splev_opt_int(o.filled'), 'raw filled adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(o.lit'), 'raw lit adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(o.x1'), 'raw x1 adapter must be gone');
        for (let i = 1; i < calls.length; i++) {
            assert.ok(body.indexOf(calls[i - 1]) < body.indexOf(calls[i]),
                `C order :5600/:5605/:5565–5568: ${calls[i - 1]} before ${calls[i]}`);
        }
        assert.ok(body.indexOf(calls[0]) > body.indexOf('lcheck_param_table'),
            'filled :5600 after the lcheck_param_table read :5596 (C order)');
        assert.ok(body.indexOf(calls[5]) < body.indexOf("get_table_region_unpacked(o, 'region'"),
            'y2 :5568 before the region fallback :5573 (C order)');
    });

    it('dead splev_opt_int adapter is gone file-wide (region held its last uses)', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        assert.ok(!src.includes('splev_opt_int'), 'no splev_opt_int mention may remain in js/mklev.js');
    });
});
