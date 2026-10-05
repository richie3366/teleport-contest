// C ref: dungeon.c init_dungeon_dungeons `:1010–1015` reads its "range",
// "entry" and "chance" fields via nhlua.c get_table_int_opt (this D-entry).
// init_dungeon_dungeons passed the raw spread fields through `??` defaults:
// integral floats and numeric strings flowed through unconverted (C
// luaL_checkinteger converts them) and direct non-numeric non-nil values
// passed through as garbage where C argerrors. The site now reads through
// the shared js/dungeon.js helper (same module, no import change), in C
// field order (range :1011, entry :1013, chance :1014); all in-tree dungeon
// entries pass integers or nothing (generated dungeon_data.js census in
// the D-entry).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_int_opt } from '../js/dungeon.js';

describe('init_dungeon_dungeons inherits get_table_int_opt conversion', () => {
    it('absent field yields defval (C :1011/:1013 0, :1014 100)', () => {
        assert.equal(get_table_int_opt({}, 'range', 0), 0);
        assert.equal(get_table_int_opt({}, 'entry', 0), 0);
        assert.equal(get_table_int_opt({}, 'chance', 100), 100);
    });

    it('integers kept verbatim, negatives included (C checkinteger identity)', () => {
        assert.equal(get_table_int_opt({ range: 5 }, 'range', 0), 5);
        assert.equal(get_table_int_opt({ entry: -1 }, 'entry', 0), -1);
        assert.equal(get_table_int_opt({ entry: -2 }, 'entry', 0), -2);
    });

    it('integral floats and numeric strings convert (C luaL_checkinteger)', () => {
        assert.equal(get_table_int_opt({ range: 5.0 }, 'range', 0), 5);
        assert.equal(get_table_int_opt({ chance: '40' }, 'chance', 100), 40);
    });

    it('beyond-int32 values truncate like the C (int) cast', () => {
        assert.equal(get_table_int_opt({ range: 2 ** 32 + 5 }, 'range', 0), 5);
    });

    it('non-integral and non-numeric values throw (C argerror)', () => {
        assert.throws(() => get_table_int_opt({ range: 2.5 }, 'range', 0),
            /no integer representation/);
        assert.throws(() => get_table_int_opt({ chance: true }, 'chance', 100),
            /number expected/);
        assert.throws(() => get_table_int_opt({ entry: {} }, 'entry', 0),
            /number expected/);
        assert.throws(() => get_table_int_opt({ range: () => 1 }, 'range', 0),
            /number expected/);
    });

    it('dungeons arm reads all three fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/dungeon.js', import.meta.url), 'utf8');
        const at = src.indexOf('function init_dungeon_dungeons(entry, pd, dngidx)');
        assert.ok(at >= 0, 'init_dungeon_dungeons missing in js/dungeon.js');
        const body = src.slice(at, at + 2400);
        const range = "get_table_int_opt(entry, 'range', 0)";
        const entry = "get_table_int_opt(entry, 'entry', 0)";
        const chance = "get_table_int_opt(entry, 'chance', 100)";
        for (const call of [range, entry, chance]) {
            assert.ok(body.includes(call), `dungeons arm must read via the shared helper (C :1011/:1013/:1014): ${call}`);
        }
        assert.ok(!body.includes('entry.range ?? 0'), 'raw range adapter must be gone');
        assert.ok(!body.includes('entry.entry ?? 0'), 'raw entry adapter must be gone');
        assert.ok(!body.includes('entry.chance ?? 100'), 'raw chance adapter must be gone');
        assert.ok(body.indexOf(range) < body.indexOf('get_dgn_align(entry)'), 'range :1011 before align :1012 (C read order)');
        assert.ok(body.indexOf('get_dgn_align(entry)') < body.indexOf(entry), 'entry :1013 after align :1012 (C read order)');
        assert.ok(body.indexOf(entry) < body.indexOf(chance), 'entry :1013 before chance :1014 (C read order)');
        assert.ok(body.indexOf(chance) < body.indexOf('get_dgn_flags(entry)'), 'chance :1014 before flags :1015 (C read order)');
    });
});
