// C ref: sp_lev.c lspo_monster table form `:3293–3323` (peaceful/asleep/
// female/invisible/cancelled/revived/avenge/stunned/confused/waiting/
// keep_default_invent/tail/group/adjacentok/ignorewater/countbirth) reads
// its fields via nhlua.c get_table_boolean_opt (this D-entry). The arm
// passed all sixteen through the `lspo_bool_opt` adapter: absent yielded
// the default, booleans folded to 1/0, but every other value fell to
// `v | 0` — strings collapsed to 0 where C returns raw checkoption
// indices ("false"→1, "yes"→2, "no"→3), out-of-range numbers (2, -1)
// flowed where C throws "Expected a boolean", and fractions truncated
// silently where C's checkinteger argerrors. All sixteen now read through
// the shared same-file helper (no import change), in place and in C order
// against the neighboring throwing reads; the :3300 key is "invisible"
// while the tmp field is invis. l_create_monster has no callers in js/
// and no test passes these keys, so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_boolean_opt } from '../js/mklev.js';

const SRC_URL = new URL('../js/mklev.js', import.meta.url);

function localFnBody(src, def) {
    const at = src.indexOf(def);
    assert.ok(at >= 0, `${def} missing in js/mklev.js`);
    const rest = src.slice(at + def.length);
    const m = rest.search(/\n(export (async )?function |function )/);
    return m < 0 ? rest : rest.slice(0, m);
}

describe('lspo monster fields inherit get_table_boolean_opt conversion', () => {
    it('absent and null fields yield the C defaults', () => {
        // C BOOL_RANDOM (-1) defaults: :3293/:3294/:3299.
        for (const name of ['peaceful', 'asleep', 'female']) {
            assert.equal(get_table_boolean_opt({}, name, -1), -1);
        }
        // C FALSE (0) defaults: :3300–3303/:3307–3309/:3319/:3321.
        for (const name of ['invisible', 'cancelled', 'revived', 'avenge',
            'stunned', 'confused', 'waiting', 'adjacentok', 'ignorewater']) {
            assert.equal(get_table_boolean_opt({}, name, 0), 0);
        }
        assert.equal(get_table_boolean_opt({}, 'keep_default_invent', -1), -1);
        // C TRUE (1) defaults: :3315/:3317/:3323.
        for (const name of ['tail', 'group', 'countbirth']) {
            assert.equal(get_table_boolean_opt({}, name, 1), 1);
        }
        assert.equal(get_table_boolean_opt({ peaceful: null }, 'peaceful', -1), -1);
        assert.equal(get_table_boolean_opt({ tail: undefined }, 'tail', 1), 1);
    });

    it('booleans and 0/1 read as 1/0 (C lua_toboolean / (int) gate)', () => {
        assert.equal(get_table_boolean_opt({ peaceful: true }, 'peaceful', -1), 1);
        assert.equal(get_table_boolean_opt({ peaceful: false }, 'peaceful', -1), 0);
        assert.equal(get_table_boolean_opt({ cancelled: 1 }, 'cancelled', 0), 1);
        assert.equal(get_table_boolean_opt({ tail: 0 }, 'tail', 1), 0);
        assert.equal(get_table_boolean_opt({ asleep: 1.0 }, 'asleep', -1), 1);
    });

    it('strings keep the pinned raw checkoption indices, not meanings', () => {
        for (const [value, index] of [['true', 0], ['false', 1], ['yes', 2], ['no', 3]]) {
            assert.equal(get_table_boolean_opt({ avenge: value }, 'avenge', 0), index);
        }
    });

    it('beyond-int32 integrals truncate like the C (int) cast', () => {
        assert.equal(get_table_boolean_opt({ stunned: 2 ** 32 }, 'stunned', 0), 0);
        assert.equal(get_table_boolean_opt({ stunned: 2 ** 32 + 1 }, 'stunned', 0), 1);
    });

    it('out-of-range and non-boolean values throw (C nhl_error / checkoption)', () => {
        for (const value of [2, -1, {}, [], () => 1]) {
            assert.throws(() => get_table_boolean_opt({ confused: value }, 'confused', 0),
                /Expected a boolean/);
        }
        // C :1096 luaL_checkinteger throws before the 0/1 gate is reached.
        assert.throws(() => get_table_boolean_opt({ confused: 1.5 }, 'confused', 0),
            /no integer representation/);
        for (const value of ['soon', 'True', '']) {
            assert.throws(() => get_table_boolean_opt({ confused: value }, 'confused', 0),
                /invalid option/);
        }
    });

    it('monster table arm reads all sixteen fields via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const body = localFnBody(src, 'function lspo_monster_normalize_table(tmp, inventFn)');
        const peaceful = "tmp.peaceful = get_table_boolean_opt(tmp, 'peaceful', BOOL_RANDOM); // C :3293";
        const asleep = "tmp.asleep = get_table_boolean_opt(tmp, 'asleep', BOOL_RANDOM); // C :3294";
        const female = "tmp.female = get_table_boolean_opt(tmp, 'female', BOOL_RANDOM); // C :3299";
        const invis = "tmp.invis = get_table_boolean_opt(tmp, 'invisible', 0); // C :3300";
        const cancelled = "tmp.cancelled = get_table_boolean_opt(tmp, 'cancelled', 0); // C :3301";
        const revived = "tmp.revived = get_table_boolean_opt(tmp, 'revived', 0); // C :3302";
        const avenge = "tmp.avenge = get_table_boolean_opt(tmp, 'avenge', 0); // C :3303";
        const stunned = "tmp.stunned = get_table_boolean_opt(tmp, 'stunned', 0); // C :3307";
        const confused = "tmp.confused = get_table_boolean_opt(tmp, 'confused', 0); // C :3308";
        const waiting = "tmp.waiting = get_table_boolean_opt(tmp, 'waiting', 0); // C :3309";
        const keep = "tmp.keep_default_invent = get_table_boolean_opt(tmp, 'keep_default_invent', -1); // C :3313";
        const tail = "if (!get_table_boolean_opt(tmp, 'tail', 1)) mm_flags |= MM_NOTAIL; // C :3315";
        const group = "if (!get_table_boolean_opt(tmp, 'group', 1)) mm_flags |= MM_NOGRP; // C :3317";
        const adj = "if (get_table_boolean_opt(tmp, 'adjacentok', 0)) mm_flags |= MM_ADJACENTOK; // C :3319";
        const ign = "if (get_table_boolean_opt(tmp, 'ignorewater', 0)) mm_flags |= MM_IGNOREWATER; // C :3321";
        const birth = "if (!get_table_boolean_opt(tmp, 'countbirth', 1)) mm_flags |= MM_NOCOUNTBIRTH; // C :3323";
        const sites = [peaceful, asleep, female, invis, cancelled, revived,
            avenge, stunned, confused, waiting, keep, tail, group, adj, ign, birth];
        for (const line of sites) {
            assert.ok(body.includes(line), `monster arm must hold: ${line}`);
        }
        const order = [peaceful, asleep,
            "get_table_str_opt(tmp, 'name', null)",
            female, invis, cancelled, revived, avenge,
            "get_table_int_opt(tmp, 'fleeing', 0)",
            "get_table_int_opt(tmp, 'blinded', 0)",
            "get_table_int_opt(tmp, 'paralyzed', 0)",
            stunned, confused, waiting,
            "get_table_int_opt(tmp, 'm_lev_adj', 0)",
            keep, tail, group, adj, ign, birth,
            "get_table_str_opt(tmp, 'appear_as', null)"];
        for (let i = 1; i < order.length; i++) {
            assert.ok(body.indexOf(order[i - 1]) >= 0, `monster arm must hold: ${order[i - 1]}`);
            assert.ok(body.indexOf(order[i - 1]) < body.indexOf(order[i]),
                `C order violated: ${order[i - 1]} must precede ${order[i]}`);
        }
        assert.ok(!body.includes('lspo_bool_opt('), 'lspo_bool_opt adapter must be gone');
        assert.ok(!src.includes('lspo_bool_opt'), 'lspo_bool_opt def must be gone from js/mklev.js');
    });
});
