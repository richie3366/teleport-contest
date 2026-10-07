// D-3605: make_stunned must write C's single storage (HStun ≡
// uprops[STUNNED].intrinsic, youprop.h:80). The nh_timeout generic loop
// masters the SLOT; a flat-only write while the slot is non-empty
// (wizintrinsic stacking re-grant, lizard cut-to-2, unicorn-horn/prayer
// cure) was clobbered next tick — scen-impaired-Monk-94230 step 172
// expired only confusion where C expired stun first, then confusion.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { STUNNED, TIMEOUT, FROMOUTSIDE } from '../js/const.js';
import { make_stunned } from '../js/potion.js';

function stage(flat, slot) {
    const u = game.u || (game.u = {});
    u.HStun = flat;
    u.Stunned = flat;
    if (!u.uprops) u.uprops = {};
    u.uprops[STUNNED] = { intrinsic: slot, extrinsic: 0, blocked: 0 };
    return u;
}

test('lizard cut-to-2 sticks in flat and slot', async () => {
    const u = stage(27, 27);
    await make_stunned(2, false);
    assert.equal(u.HStun & TIMEOUT, 2);
    assert.equal(u.uprops[STUNNED].intrinsic & TIMEOUT, 2);
});

test('stacking re-grant sticks in flat and slot', async () => {
    const u = stage(24, 24);
    await make_stunned(54, false);
    assert.equal(u.HStun & TIMEOUT, 54);
    assert.equal(u.uprops[STUNNED].intrinsic & TIMEOUT, 54);
});

test('cure to 0 clears flat and slot', async () => {
    const u = stage(10, 10);
    await make_stunned(0, false);
    assert.equal(u.HStun & TIMEOUT, 0);
    assert.equal(u.uprops[STUNNED].intrinsic & TIMEOUT, 0);
});

test('fresh grant fills empty slot', async () => {
    const u = stage(0, 0);
    await make_stunned(30, false);
    assert.equal(u.HStun & TIMEOUT, 30);
    assert.equal(u.uprops[STUNNED].intrinsic & TIMEOUT, 30);
});

test('flag bits preserved per side', async () => {
    const u = stage(FROMOUTSIDE | 9, FROMOUTSIDE | 9);
    await make_stunned(5, false);
    assert.equal(u.HStun, FROMOUTSIDE | 5);
    assert.equal(u.uprops[STUNNED].intrinsic, FROMOUTSIDE | 5);
});
