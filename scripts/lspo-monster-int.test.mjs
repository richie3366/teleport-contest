// C ref: sp_lev.c lspo_monster table form `:3304–3306`/`:3310` reads its
// "fleeing", "blinded", "paralyzed" and "m_lev_adj" fields via nhlua.c
// get_table_int_opt (this D-entry).
// lspo_monster_normalize_table passed the raw spread fields through `| 0`
// adapters: fractions truncated silently (C argerrors), direct non-numeric
// non-nil values flowed through as 0/1 garbage (C argerrors), and integral
// floats converted without the int64-range gate. The sites now read through
// the shared js/dungeon.js helper on the EXISTING mklev→dungeon edge (no
// import change), in C field order (fleeing :3304, blinded :3305,
// paralyzed :3306, m_lev_adj :3310); l_create_monster has no callers in
// js/ and no in-tree table passes these fields (census in the D-entry),
// so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

const FIELDS = ['fleeing', 'blinded', 'paralyzed', 'm_lev_adj'];

describe('lspo_monster_normalize_table inherits get_table_int_opt conversion', () => {
    it('absent fields yield defval 0 (C :3304–3306/:3310)', () => {
        for (const f of FIELDS) {
            assert.equal(get_table_int_opt({}, f, 0), 0);
        }
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ fleeing: 3 }, 'fleeing', 0), 3);
        assert.equal(get_table_int_opt({ blinded: 7 }, 'blinded', 0), 7);
        assert.equal(get_table_int_opt({ paralyzed: 127 }, 'paralyzed', 0), 127);
        assert.equal(get_table_int_opt({ m_lev_adj: -2 }, 'm_lev_adj', 0), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ fleeing: 4.0 }, 'fleeing', 0), 4);
        assert.equal(get_table_int_opt({ blinded: '6' }, 'blinded', 0), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ paralyzed: 2 ** 32 + 9 }, 'paralyzed', 0), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ fleeing: 2.5 }, 'fleeing', 0),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ blinded: true }, 'blinded', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ paralyzed: 'soon' }, 'paralyzed', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ m_lev_adj: {} }, 'm_lev_adj', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ fleeing: () => 1 }, 'fleeing', 0),
            /number expected/);
    });

    it('monster arm reads all four fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_monster_normalize_table(tmp, inventFn)');
        assert.ok(at >= 0, 'lspo_monster_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 4200);
        const fleeing = "get_table_int_opt(tmp, 'fleeing', 0)";
        const blinded = "get_table_int_opt(tmp, 'blinded', 0)";
        const paralyzed = "get_table_int_opt(tmp, 'paralyzed', 0)";
        const mlev = "get_table_int_opt(tmp, 'm_lev_adj', 0)";
        for (const call of [fleeing, blinded, paralyzed, mlev]) {
            assert.ok(body.includes(call), `monster arm must read via the shared helper (C :3304–3306/:3310): ${call}`);
        }
        assert.ok(!body.includes('tmp.fleeing | 0'), 'raw fleeing adapter must be gone');
        assert.ok(!body.includes('tmp.blinded | 0'), 'raw blinded adapter must be gone');
        assert.ok(!body.includes('tmp.paralyzed | 0'), 'raw paralyzed adapter must be gone');
        assert.ok(!body.includes('tmp.m_lev_adj | 0'), 'raw m_lev_adj adapter must be gone');
        assert.ok(body.indexOf("get_table_boolean_opt(tmp, 'avenge', 0)") < body.indexOf(fleeing), 'fleeing :3304 after avenge :3303 (C read order)');
        assert.ok(body.indexOf(fleeing) < body.indexOf(blinded), 'fleeing :3304 before blinded :3305 (C read order)');
        assert.ok(body.indexOf(blinded) < body.indexOf(paralyzed), 'blinded :3305 before paralyzed :3306 (C read order)');
        assert.ok(body.indexOf(paralyzed) < body.indexOf("get_table_boolean_opt(tmp, 'stunned', 0)"), 'paralyzed :3306 before stunned :3307 (C read order)');
        assert.ok(body.indexOf("get_table_boolean_opt(tmp, 'waiting', 0)") < body.indexOf(mlev), 'm_lev_adj :3310 after waiting :3309 (C read order)');
    });
});
