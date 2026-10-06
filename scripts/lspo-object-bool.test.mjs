// C ref: sp_lev.c lspo_object table arm `:3639–3648` (buried/lit/locked/
// trapped/trap_known/greased/broken/achievement) and the STATUE/CORPSE/EGG
// arm `:3709–3717` (historic/male/female/laid_by_you) read their fields
// via nhlua.c get_table_boolean_opt (this D-entry). The table arm passed
// three fields through nil-defaults (lit→0, locked/trapped→-1) and five
// through raw (buried/greased/broken/achievement/tknown copied the
// caller's value, so "true" stayed truthy where C's raw checkoption index
// is 0, and 2/-1/objects flowed where C throws); the montype arm read
// four fields with raw JS truthiness. All twelve now read through the
// shared same-file helper (no import change), in place and in C order
// against the neighboring throwing reads; the :3644 key is "trap_known"
// while the tmpobj field is tknown. In-tree l_create_object tables only
// carry absent/0/1/true for these keys, so no in-tree behavior changes.
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

describe('lspo object fields inherit get_table_boolean_opt conversion', () => {
    it('absent and null fields yield the C defaults', () => {
        for (const name of ['buried', 'lit', 'greased', 'broken',
            'achievement', 'historic', 'male', 'female', 'laid_by_you']) {
            assert.equal(get_table_boolean_opt({}, name, 0), 0);
        }
        for (const name of ['locked', 'trapped', 'trap_known']) {
            assert.equal(get_table_boolean_opt({}, name, -1), -1);
        }
        assert.equal(get_table_boolean_opt({ lit: null }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ locked: undefined }, 'locked', -1), -1);
    });

    it('booleans and 0/1 read as 1/0 (C lua_toboolean / (int) gate)', () => {
        assert.equal(get_table_boolean_opt({ lit: true }, 'lit', 0), 1);
        assert.equal(get_table_boolean_opt({ lit: false }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ broken: 1 }, 'broken', 0), 1);
        assert.equal(get_table_boolean_opt({ trapped: 0 }, 'trapped', -1), 0);
        assert.equal(get_table_boolean_opt({ buried: 1.0 }, 'buried', 0), 1);
    });

    it('strings keep the pinned raw checkoption indices, not meanings', () => {
        for (const [value, index] of [['true', 0], ['false', 1], ['yes', 2], ['no', 3]]) {
            assert.equal(get_table_boolean_opt({ greased: value }, 'greased', 0), index);
        }
    });

    it('beyond-int32 integrals truncate like the C (int) cast', () => {
        assert.equal(get_table_boolean_opt({ lit: 2 ** 32 }, 'lit', 0), 0);
        assert.equal(get_table_boolean_opt({ lit: 2 ** 32 + 1 }, 'lit', 0), 1);
    });

    it('out-of-range and non-boolean values throw (C nhl_error / checkoption)', () => {
        for (const value of [2, -1, {}, [], () => 1]) {
            assert.throws(() => get_table_boolean_opt({ buried: value }, 'buried', 0),
                /Expected a boolean/);
        }
        // C :1096 luaL_checkinteger throws before the 0/1 gate is reached.
        assert.throws(() => get_table_boolean_opt({ buried: 1.5 }, 'buried', 0),
            /no integer representation/);
        for (const value of ['soon', 'True', '']) {
            assert.throws(() => get_table_boolean_opt({ buried: value }, 'buried', 0),
                /invalid option/);
        }
    });

    it('object table arm reads all eight fields via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const body = localFnBody(src, 'function lspo_object_normalize_table(tmp)');
        const buried = "tmp.buried = get_table_boolean_opt(tmp, 'buried', 0); // C :3639";
        const lit = "tmp.lit = get_table_boolean_opt(tmp, 'lit', 0); // C :3640";
        const locked = "tmp.locked = get_table_boolean_opt(tmp, 'locked', -1); // C :3642";
        const trapped = "tmp.trapped = get_table_boolean_opt(tmp, 'trapped', -1); // C :3643";
        const tknown = "tmp.tknown = get_table_boolean_opt(tmp, 'trap_known', -1); // C :3644";
        const greased = "tmp.greased = get_table_boolean_opt(tmp, 'greased', 0); // C :3646";
        const broken = "tmp.broken = get_table_boolean_opt(tmp, 'broken', 0); // C :3647";
        const achieve = "tmp.achievement = get_table_boolean_opt(tmp, 'achievement', 0); // C :3648";
        for (const line of [buried, lit, locked, trapped, tknown, greased, broken, achieve]) {
            assert.ok(body.includes(line), `table arm must hold: ${line}`);
        }
        const order = ["get_table_int_or_random(tmp, 'quantity', -1)", buried, lit,
            "get_table_int_opt(tmp, 'eroded', 0)", locked, trapped, tknown,
            "get_table_int_opt(tmp, 'recharged', 0)", greased, broken, achieve,
            'tmp.corpsenm'];
        for (let i = 1; i < order.length; i++) {
            assert.ok(body.indexOf(order[i - 1]) >= 0, `table arm must hold: ${order[i - 1]}`);
            assert.ok(body.indexOf(order[i - 1]) < body.indexOf(order[i]),
                `C order violated: ${order[i - 1]} must precede ${order[i]}`);
        }
        for (const raw of ['tmp.trapped == null', 'tmp.locked == null', 'tmp.lit == null']) {
            assert.ok(!body.includes(raw), `raw nil-default must be gone: ${raw}`);
        }
    });

    it('montype arm reads all four fields via the shared helper in C order', () => {
        const src = readFileSync(SRC_URL, 'utf8');
        const body = localFnBody(src, 'function lspo_object_apply_montype(tmp)');
        const historic = "if (get_table_boolean_opt(tmp, 'historic', 0)) lflags |= CORPSTAT_HISTORIC; // C :3709";
        const male = "if (get_table_boolean_opt(tmp, 'male', 0)) lflags |= CORPSTAT_MALE; // C :3711";
        const female = "if (get_table_boolean_opt(tmp, 'female', 0)) lflags |= CORPSTAT_FEMALE; // C :3713";
        const laid = "tmp.spe = get_table_boolean_opt(tmp, 'laid_by_you', 0) ? 1 : 0; // C :3717";
        for (const line of [historic, male, female, laid]) {
            assert.ok(body.includes(line), `montype arm must hold: ${line}`);
        }
        assert.ok(body.indexOf(historic) < body.indexOf(male));
        assert.ok(body.indexOf(male) < body.indexOf(female));
        assert.ok(body.indexOf('} else if (id === EGG) {') < body.indexOf(laid));
        for (const raw of ['if (tmp.historic)', 'if (tmp.male)', 'if (tmp.female)',
            'tmp.laid_by_you ? 1 : 0']) {
            assert.ok(!body.includes(raw), `raw truthiness read must be gone: ${raw}`);
        }
    });
});
