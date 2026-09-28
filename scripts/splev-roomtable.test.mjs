import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    get_mkroom_name,
    get_table_roomtype_opt,
    l_push_mkroom_table,
    l_push_wid_hei_table,
} from '../js/mklev.js';
import {
    OROOM, THEMEROOM, COURT, SWAMP, VAULT, BEEHIVE, MORGUE, BARRACKS, ZOO,
    DELPHI, TEMPLE, ANTHOLE, COCKNEST, LEPREHALL, SHOPBASE, ARMORSHOP,
    SCROLLSHOP, POTIONSHOP, WEAPONSHOP, FOODSHOP, RINGSHOP, WANDSHOP,
    TOOLSHOP, BOOKSHOP, FODDERSHOP, CANDLESHOP,
} from '../js/const.js';

// C ref: nethack-c/upstream/src/sp_lev.c room_types[] `:3956–3988`,
// get_mkroom_name `:3990–4001`, get_table_roomtype_opt `:4003–4020`,
// l_push_mkroom_table `:3057–3070`, l_push_wid_hei_table `:3049–3055`.

test('get_mkroom_name maps every room_types entry in C order', () => {
    const pairs = [
        [OROOM, 'ordinary'], [THEMEROOM, 'themed'], [COURT, 'throne'],
        [SWAMP, 'swamp'], [VAULT, 'vault'], [BEEHIVE, 'beehive'],
        [MORGUE, 'morgue'], [BARRACKS, 'barracks'], [ZOO, 'zoo'],
        [DELPHI, 'delphi'], [TEMPLE, 'temple'], [ANTHOLE, 'anthole'],
        [COCKNEST, 'cocknest'], [LEPREHALL, 'leprehall'],
        [SHOPBASE, 'shop'], [ARMORSHOP, 'armor shop'],
        [SCROLLSHOP, 'scroll shop'], [POTIONSHOP, 'potion shop'],
        [WEAPONSHOP, 'weapon shop'], [FOODSHOP, 'food shop'],
        [RINGSHOP, 'ring shop'], [WANDSHOP, 'wand shop'],
        [TOOLSHOP, 'tool shop'], [BOOKSHOP, 'book shop'],
        [FODDERSHOP, 'health food shop'], [CANDLESHOP, 'candle shop'],
    ];
    assert.equal(pairs.length, 26);
    for (const [rtype, name] of pairs) assert.equal(get_mkroom_name(rtype), name);
    assert.equal(get_mkroom_name(424242), 'unknown');
});

test('get_table_roomtype_opt matches case-insensitively, keeps defval', () => {
    assert.equal(get_table_roomtype_opt({ type: 'zoo' }, 'type', OROOM), ZOO);
    assert.equal(get_table_roomtype_opt({ type: 'Zoo' }, 'type', OROOM), ZOO);
    assert.equal(get_table_roomtype_opt({ type: 'SCROLL SHOP' }, 'type', OROOM), SCROLLSHOP);
    assert.equal(get_table_roomtype_opt({}, 'type', OROOM), OROOM);
    assert.equal(get_table_roomtype_opt({ type: '' }, 'type', OROOM), OROOM);
    assert.equal(get_table_roomtype_opt({ type: 'no such room' }, 'type', OROOM), OROOM);
});

test('l_push_mkroom_table builds the C-exact contents table', () => {
    assert.deepEqual(
        l_push_mkroom_table({
            lx: 1, ly: 2, hx: 5, hy: 6, rlit: 1,
            irregular: 0, needjoining: 1, rtype: VAULT,
        }),
        {
            width: 5, height: 5,
            region: { x1: 1, y1: 2, x2: 5, y2: 6 },
            lit: true, irregular: false, needjoining: true, type: 'vault',
        },
    );
    // C (boolean) cast: any nonzero rlit (incl. -1) reads lit.
    assert.equal(l_push_mkroom_table({
        lx: 0, ly: 0, hx: 0, hy: 0, rlit: -1,
        irregular: false, needjoining: false, rtype: OROOM,
    }).lit, true);
});

test('l_push_wid_hei_table builds the map contents table', () => {
    assert.deepEqual(l_push_wid_hei_table(7, 3), { width: 7, height: 3 });
});
