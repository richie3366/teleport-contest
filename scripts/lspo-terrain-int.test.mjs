// C ref: sp_lev.c lspo_terrain `:5001` reads its lit field via nhlua.c
// get_table_int_opt (this D-entry). lspo_terrain passed the raw table
// field through a `splev_opt_int` adapter: fractions truncated silently
// (C argerrors), direct non-numeric non-nil values flowed through as 0/1
// garbage (C argerrors), and integral floats converted without the
// int64-range gate. The site now reads through the shared js/dungeon.js
// helper on the EXISTING mklev→dungeon edge (no import change), in place
// (C :5001, after the typ read :5000); lspo_terrain is exported for the
// unported des dispatch and no in-tree caller passes a table (in-tree
// users call the unpacked lspo_terrain_sel helper), so no in-tree
// behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('lspo_terrain inherits get_table_int_opt conversion', () => {
    it('absent lit yields the C default (SET_LIT_NOCHANGE -2)', () => {
        assert.equal(get_table_int_opt({}, 'lit', -2), -2);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ lit: 1 }, 'lit', -2), 1);
        assert.equal(get_table_int_opt({ lit: 0 }, 'lit', -2), 0);
        assert.equal(get_table_int_opt({ lit: -1 }, 'lit', -2), -1);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ lit: 1.0 }, 'lit', -2), 1);
        assert.equal(get_table_int_opt({ lit: '0' }, 'lit', -2), 0);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ lit: 2 ** 32 + 1 }, 'lit', -2), 1);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ lit: 1.5 }, 'lit', -2),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ lit: true }, 'lit', -2),
            /number expected/);
        assert.throws(() => get_table_int_opt({ lit: 'soon' }, 'lit', -2),
            /number expected/);
        assert.throws(() => get_table_int_opt({ lit: {} }, 'lit', -2),
            /number expected/);
        assert.throws(() => get_table_int_opt({ lit: () => 1 }, 'lit', -2),
            /number expected/);
    });

    it('terrain table arm reads lit via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_terrain(a, b, c)');
        assert.ok(at >= 0, 'lspo_terrain missing in js/mklev.js');
        const end = src.indexOf('export function lspo_replace_terrain(opts)', at);
        assert.ok(end > at, 'lspo_replace_terrain must follow lspo_terrain in js/mklev.js');
        const body = src.slice(at, end);
        const call = "get_table_int_opt(o, 'lit', SET_LIT_NOCHANGE)";
        assert.ok(body.includes(call), `terrain arm must read via the shared helper: ${call}`);
        assert.ok(!body.includes('splev_opt_int(o.lit'), 'raw lit adapter must be gone');
        assert.ok(body.indexOf(call) > body.indexOf('check_mapchr(o.typ)'),
            'lit :5001 after the typ read :5000 (C order)');
        assert.ok(body.indexOf(call) < body.indexOf('} else if (argc === 2'),
            'lit :5001 inside the argc==1 table arm :4989 (C order)');
    });
});
