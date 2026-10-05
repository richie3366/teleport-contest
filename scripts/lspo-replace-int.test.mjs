// C ref: sp_lev.c lspo_replace_terrain `:5086–5091` reads its chance, lit,
// x1, y1, x2, y2 fields via nhlua.c get_table_int_opt (this D-entry).
// lspo_replace_terrain passed the raw table fields through `splev_opt_int`
// adapters: fractions truncated silently (C argerrors), direct non-numeric
// non-nil values flowed through as 0/1 garbage (C argerrors), and integral
// floats converted without the int64-range gate. The six sites now read
// through the shared js/dungeon.js helper on the EXISTING mklev→dungeon
// edge (no import change), in C read order (chance :5086, lit :5087,
// x1..y2 :5088–5091); lspo_replace_terrain is exported for the unported
// des dispatch and no in-tree caller passes a table (in-tree users call
// the unpacked _sel/_region helpers), so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('lspo_replace_terrain inherits get_table_int_opt conversion', () => {
    it('absent fields yield C defaults (chance 100, lit -2, coords -1)', () => {
        assert.equal(get_table_int_opt({}, 'chance', 100), 100);
        assert.equal(get_table_int_opt({}, 'lit', -2), -2);
        assert.equal(get_table_int_opt({}, 'x1', -1), -1);
        assert.equal(get_table_int_opt({}, 'y1', -1), -1);
        assert.equal(get_table_int_opt({}, 'x2', -1), -1);
        assert.equal(get_table_int_opt({}, 'y2', -1), -1);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ chance: 50 }, 'chance', 100), 50);
        assert.equal(get_table_int_opt({ lit: 0 }, 'lit', -2), 0);
        assert.equal(get_table_int_opt({ x1: -2 }, 'x1', -1), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ chance: 75.0 }, 'chance', 100), 75);
        assert.equal(get_table_int_opt({ y2: '6' }, 'y2', -1), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ x1: 2 ** 32 + 9 }, 'x1', -1), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ chance: 2.5 }, 'chance', 100),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ lit: true }, 'lit', -2),
            /number expected/);
        assert.throws(() => get_table_int_opt({ x1: 'soon' }, 'x1', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ y1: {} }, 'y1', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ x2: () => 1 }, 'x2', -1),
            /number expected/);
    });

    it('replace arm reads all six fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_replace_terrain(opts)');
        assert.ok(at >= 0, 'lspo_replace_terrain missing in js/mklev.js');
        const end = src.indexOf('export async function lspo_region', at);
        assert.ok(end > at, 'lspo_region must follow lspo_replace_terrain in js/mklev.js');
        const body = src.slice(at, end);
        const calls = [
            "get_table_int_opt(o, 'chance', 100)",
            "get_table_int_opt(o, 'lit', SET_LIT_NOCHANGE)",
            "get_table_int_opt(o, 'x1', -1)",
            "get_table_int_opt(o, 'y1', -1)",
            "get_table_int_opt(o, 'x2', -1)",
            "get_table_int_opt(o, 'y2', -1)",
        ];
        for (const call of calls) {
            assert.ok(body.includes(call), `replace arm must read via the shared helper: ${call}`);
        }
        assert.ok(!body.includes('splev_opt_int(o.chance'), 'raw chance adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(o.lit'), 'raw lit adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(o.x1'), 'raw x1 adapter must be gone');
        for (let i = 1; i < calls.length; i++) {
            assert.ok(body.indexOf(calls[i - 1]) < body.indexOf(calls[i]),
                `C order :5086–5091: ${calls[i - 1]} before ${calls[i]}`);
        }
        assert.ok(body.indexOf(calls[0]) > body.indexOf('mapfrag_error(mf)'),
            'chance :5086 after the mapfragment arm :5073–5082 (C order)');
        assert.ok(body.indexOf(calls[5]) < body.indexOf("get_table_region_unpacked(o, 'region'"),
            'y2 :5091 before the region arm :5092 (C order)');
    });
});
