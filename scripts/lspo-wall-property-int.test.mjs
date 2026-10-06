// C ref: sp_lev.c get_table_coords_or_region `:5565–5568` (x1, y1, x2, y2)
// reads its fields via nhlua.c get_table_int_opt. lspo_wall_property's
// :5889 expansion passed the raw table fields through inline `|0`:
// fractions truncated silently (C argerrors), direct non-numeric non-nil
// values flowed through as 0/1 garbage (C argerrors), booleans/objects
// converted without the checkinteger gate. The four sites now read through
// the shared js/dungeon.js helper on the EXISTING mklev→dungeon edge (no
// import change), in C read order (x1..y2 :5565–5568 via the :5889 call),
// mirroring the :5607 region expansion (D-3508). lspo_wall_property is
// exported for the unported des dispatch and has no in-tree callers, so
// no in-tree behavior changes. Helper conversion itself is covered by
// scripts/lspo-region-int.test.mjs; this file pins the wall_property wiring.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('lspo_wall_property inherits get_table_int_opt conversion', () => {
    it('wall_property arm reads all four coord fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const at = src.indexOf('export function lspo_wall_property(o)');
        assert.ok(at >= 0, 'lspo_wall_property missing in js/mklev.js');
        const end = src.indexOf('export function lspo_', at + 1);
        assert.ok(end > at, 'another lspo_ entry must follow lspo_wall_property in js/mklev.js');
        const body = src.slice(at, end);
        const calls = [
            "get_table_int_opt(o, 'x1', -1)",
            "get_table_int_opt(o, 'y1', -1)",
            "get_table_int_opt(o, 'x2', -1)",
            "get_table_int_opt(o, 'y2', -1)",
        ];
        for (const call of calls) {
            assert.ok(body.includes(call), `wall_property arm must read via the shared helper: ${call}`);
        }
        assert.ok(!body.includes('o.x1 | 0'), 'raw x1 |0 adapter must be gone');
        assert.ok(!body.includes('o.y1 | 0'), 'raw y1 |0 adapter must be gone');
        assert.ok(!body.includes('o.x2 | 0'), 'raw x2 |0 adapter must be gone');
        assert.ok(!body.includes('o.y2 | 0'), 'raw y2 |0 adapter must be gone');
        for (let i = 1; i < calls.length; i++) {
            assert.ok(body.indexOf(calls[i - 1]) < body.indexOf(calls[i]),
                `C order :5565–5568: ${calls[i - 1]} before ${calls[i]}`);
        }
        assert.ok(body.indexOf(calls[0]) > body.indexOf('lcheck_param_table'),
            'x1 :5565 after the lcheck_param_table read :5887 (C order)');
        assert.ok(body.indexOf(calls[3]) < body.indexOf("get_table_region_unpacked(o, 'region'"),
            'y2 :5568 before the region fallback :5573 (C order)');
    });
});
