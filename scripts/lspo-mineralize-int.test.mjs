// C ref: sp_lev.c lspo_mineralize `:3947–3950` reads its "gem_prob",
// "gold_prob", "kelp_moat" and "kelp_pool" fields via nhlua.c
// get_table_int_opt (this D-entry).
// lspo_mineralize passed the raw table fields through `splev_opt_int`
// adapters: fractions truncated silently (C argerrors), direct non-numeric
// non-nil values flowed through as 0/1 garbage (C argerrors), and integral
// floats converted without the int64-range gate. The sites now read through
// the shared js/dungeon.js helper on the EXISTING mklev→dungeon edge (no
// import change), in C field order (gem_prob :3947, gold_prob :3948,
// kelp_moat :3949, kelp_pool :3950); lspo_mineralize is exported for the
// unported des dispatch and no in-tree table passes these fields, so no
// in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

const FIELDS = ['gem_prob', 'gold_prob', 'kelp_moat', 'kelp_pool'];

describe('lspo_mineralize inherits get_table_int_opt conversion', () => {
    it('absent fields yield defval -1 (C :3947–3950)', () => {
        for (const f of FIELDS) {
            assert.equal(get_table_int_opt({}, f, -1), -1);
        }
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ gem_prob: 30 }, 'gem_prob', -1), 30);
        assert.equal(get_table_int_opt({ gold_prob: 0 }, 'gold_prob', -1), 0);
        assert.equal(get_table_int_opt({ kelp_moat: 25 }, 'kelp_moat', -1), 25);
        assert.equal(get_table_int_opt({ kelp_pool: -2 }, 'kelp_pool', -1), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ gem_prob: 4.0 }, 'gem_prob', -1), 4);
        assert.equal(get_table_int_opt({ gold_prob: '6' }, 'gold_prob', -1), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ kelp_moat: 2 ** 32 + 9 }, 'kelp_moat', -1), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ gem_prob: 2.5 }, 'gem_prob', -1),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ gold_prob: true }, 'gold_prob', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ kelp_moat: 'soon' }, 'kelp_moat', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ kelp_pool: {} }, 'kelp_pool', -1),
            /number expected/);
        assert.throws(() => get_table_int_opt({ gem_prob: () => 1 }, 'gem_prob', -1),
            /number expected/);
    });

    it('mineralize arm reads all four fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_mineralize(o)');
        assert.ok(at >= 0, 'lspo_mineralize missing in js/mklev.js');
        const body = src.slice(at, at + 1200);
        const gem = "get_table_int_opt(t, 'gem_prob', -1)";
        const gold = "get_table_int_opt(t, 'gold_prob', -1)";
        const moat = "get_table_int_opt(t, 'kelp_moat', -1)";
        const pool = "get_table_int_opt(t, 'kelp_pool', -1)";
        for (const call of [gem, gold, moat, pool]) {
            assert.ok(body.includes(call), `mineralize arm must read via the shared helper (C :3947–3950): ${call}`);
        }
        assert.ok(!body.includes('splev_opt_int(t.gem_prob'), 'raw gem_prob adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(t.gold_prob'), 'raw gold_prob adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(t.kelp_moat'), 'raw kelp_moat adapter must be gone');
        assert.ok(!body.includes('splev_opt_int(t.kelp_pool'), 'raw kelp_pool adapter must be gone');
        assert.ok(body.indexOf(gem) < body.indexOf(gold), 'gem_prob :3947 before gold_prob :3948 (C read order)');
        assert.ok(body.indexOf(gold) < body.indexOf(moat), 'gold_prob :3948 before kelp_moat :3949 (C read order)');
        assert.ok(body.indexOf(moat) < body.indexOf(pool), 'kelp_moat :3949 before kelp_pool :3950 (C read order)');
        assert.ok(body.indexOf('create_des_coder()') < body.indexOf(gem), 'gem_prob :3947 after create_des_coder :3943 (C order)');
        assert.ok(body.indexOf(pool) < body.indexOf('mineralize(kelp_pool'), 'kelp_pool :3950 before mineralize :3952 (C order)');
    });
});
