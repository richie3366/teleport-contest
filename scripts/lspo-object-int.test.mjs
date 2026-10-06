// C ref: sp_lev.c lspo_object table form `:3641`/`:3645` reads its
// "eroded" and "recharged" fields via nhlua.c get_table_int_opt (this
// D-entry).
// lspo_object_normalize_table defaulted eroded with `if (tmp.eroded ==
// null) tmp.eroded = 0` and never read recharged (the consumer used raw
// `| 0`): fractions flowed through silently (C argerrors), direct
// non-numeric non-nil values became 0/1 garbage (C argerrors), and
// integral floats converted without the int64-range gate. Both sites now
// read through the shared js/dungeon.js helper on the EXISTING
// mklev→dungeon edge (no import change), in C read order (eroded :3641
// after lit :3640, recharged :3645 after eroded); in-tree eroded values
// are integers (-1/0, conversion identity) and no in-tree table passes
// recharged (census in the D-entry), so no in-tree behavior changes.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

const FIELDS = ['eroded', 'recharged'];

describe('lspo_object_normalize_table inherits get_table_int_opt conversion', () => {
    it('absent fields yield defval 0 (C :3641/:3645)', () => {
        for (const f of FIELDS) {
            assert.equal(get_table_int_opt({}, f, 0), 0);
        }
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ eroded: -1 }, 'eroded', 0), -1);
        assert.equal(get_table_int_opt({ eroded: 5 }, 'eroded', 0), 5);
        assert.equal(get_table_int_opt({ recharged: 3 }, 'recharged', 0), 3);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ eroded: 4.0 }, 'eroded', 0), 4);
        assert.equal(get_table_int_opt({ recharged: '6' }, 'recharged', 0), 6);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ eroded: 2 ** 32 + 9 }, 'eroded', 0), 9);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ eroded: 2.5 }, 'eroded', 0),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ recharged: true }, 'recharged', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ eroded: 'soon' }, 'eroded', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ recharged: {} }, 'recharged', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ eroded: () => 1 }, 'eroded', 0),
            /number expected/);
    });

    it('object arm reads both fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('function lspo_object_normalize_table(tmp)');
        assert.ok(at >= 0, 'lspo_object_normalize_table missing in js/mklev.js');
        const body = src.slice(at, at + 5200); // bool-opt rewire grew the arm; id read now at +3803
        const eroded = "tmp.eroded = get_table_int_opt(tmp, 'eroded', 0)";
        const recharged = "tmp.recharged = get_table_int_opt(tmp, 'recharged', 0)";
        for (const call of [eroded, recharged]) {
            assert.ok(body.includes(call), `object arm must read via the shared helper (C :3641/:3645): ${call}`);
        }
        assert.ok(!body.includes('if (tmp.eroded == null) tmp.eroded = 0;'), 'raw eroded adapter must be gone');
        assert.ok(body.indexOf("get_table_int_or_random(tmp, 'quantity', -1)") < body.indexOf(eroded), 'eroded :3641 after quantity :3638 (C read order)');
        assert.ok(body.indexOf("get_table_boolean_opt(tmp, 'lit', 0)") < body.indexOf(eroded), 'eroded :3641 after lit :3640 (C read order)');
        assert.ok(body.indexOf(eroded) < body.indexOf(recharged), 'eroded :3641 before recharged :3645 (C read order)');
        assert.ok(body.indexOf(recharged) < body.indexOf("get_table_str_opt(tmp, 'id', null)"), 'recharged :3645 before id :3652 (C read order)');
    });
});
