// C ref: dungeon.c init_dungeon_dungeons `:1007–1017` reads its "bonetag",
// "protofile", "lvlfill" and "themerooms" fields via nhlua.c
// get_table_str_opt (emptystr default; this D-entry).
// init_dungeon_dungeons passed the raw spread fields through `|| ''`:
// function values flowed into boneschar/protoname/fill_lvl/themerms slots
// (C pcalls them with luaL_optstring conversion) and direct non-string
// non-nil values degraded to '' (falsy) or passed through as garbage
// (truthy) where C nhl_errors. The site now reads through the shared
// js/dungeon.js helper (same module, no import change), in C field order
// (bonetag :1008, protofile :1009 after name :1007; lvlfill :1016,
// themerooms :1017 after flags :1015); all in-tree dungeon entries pass
// strings or nothing (generated dungeon_data.js census in the D-entry).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('init_dungeon_dungeons inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ bonetag: () => 'D' }, 'bonetag', ''), 'D');
    });

    it('function-produced number converts via lua_number2str (C :1064–1066)', () => {
        assert.equal(get_table_str_opt({ protofile: () => 42 }, 'protofile', ''), '42');
    });

    it('absent field yields emptystr (C :1008 emptystr default → "")', () => {
        assert.equal(get_table_str_opt({}, 'lvlfill', ''), '');
        assert.equal(get_table_str_opt({}, 'themerooms', ''), '');
    });

    it('string kept verbatim (boneschar/protoname downstream)', () => {
        assert.equal(get_table_str_opt({ themerooms: 'themerms.lua' }, 'themerooms', ''), 'themerms.lua');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ bonetag: true }, 'bonetag', ''),
            /get_table_str_opt: no string/);
        assert.throws(() => get_table_str_opt({ lvlfill: 0 }, 'lvlfill', ''),
            /get_table_str_opt: no string/);
    });

    it('dungeons arm reads all four fields via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/dungeon.js', import.meta.url), 'utf8');
        const at = src.indexOf('function init_dungeon_dungeons(entry, pd, dngidx)');
        assert.ok(at >= 0, 'init_dungeon_dungeons missing in js/dungeon.js');
        const body = src.slice(at, at + 2400);
        const bone = "get_table_str_opt(entry, 'bonetag', emptystr)";
        const proto = "get_table_str_opt(entry, 'protofile', emptystr)";
        const fill = "get_table_str_opt(entry, 'lvlfill', emptystr)";
        const rooms = "get_table_str_opt(entry, 'themerooms', emptystr)";
        for (const call of [bone, proto, fill, rooms]) {
            assert.ok(body.includes(call), `dungeons arm must read via the shared helper (C :1008/:1009/:1016/:1017): ${call}`);
        }
        assert.ok(!body.includes("entry.lvlfill || ''"), 'raw lvlfill adapter must be gone');
        assert.ok(!body.includes("entry.bonetag || ''"), 'raw bonetag adapter must be gone');
        const ib = body.indexOf(bone);
        const ip = body.indexOf(proto);
        const ifl = body.indexOf(fill);
        const ir = body.indexOf(rooms);
        assert.ok(ib < ip, 'bonetag :1008 before protofile :1009 (C pcall order)');
        assert.ok(ip < body.indexOf('entry.base'), 'protofile :1009 before base :1010 (C pcall order)');
        assert.ok(body.indexOf('get_dgn_flags(entry)') < ifl, 'lvlfill :1016 after flags :1015 (C pcall order)');
        assert.ok(ifl < ir, 'lvlfill :1016 before themerooms :1017 (C pcall order)');
    });
});
