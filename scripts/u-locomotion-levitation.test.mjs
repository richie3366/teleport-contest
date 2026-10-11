import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { u_locomotion } from '../js/hack.js';
import { LEVITATION, FLYING, W_AMUL } from '../js/const.js';

// C ref: hack.c u_locomotion `:1817–1829` — Levitation ? Float/float
// (youprop.h:240 (H||E) && !B) : Flying ? Fly/fly : locomotion(data, def).
// JS read the combined u.Levitation/u.Flying flats, which zero code
// port-wide ever writes (no `X =` / `X:` / bracket write) — both arms
// were dead, every call fell to the polyform fallback. Caught live by
// the swim_move_danger cliff: 95347 screen 1137 C «floating» vs JS
// «flying» (flyer form, E/sE 131072 set), 95213 screen 813 C «floating»
// vs JS «stepping» (walker form, E/sE 32 set); 95213's 8 earlier
// warnings (all-zero state) match C and must keep «stepping».
describe('u_locomotion Levitation/Flying reads (hack.c:1826-1828)', () => {
    beforeEach(() => {
        resetGame();
        game.u = {
            Levitation: 0, HLevitation: 0, ELevitation: 0, BLevitation: 0,
            Flying: 0, HFlying: 0, EFlying: 0, BFlying: 0,
            usteed: null,
            uprops: {
                [LEVITATION]: { intrinsic: 0, extrinsic: 0, blocked: 0 },
                [FLYING]: { intrinsic: 0, extrinsic: 0, blocked: 0 },
            },
        };
        game.youmonst = { data: { mmove: 12 } }; // walker: fallback is def
    });

    it('worn levitation (E flat + slot, 95347 shape) floats', () => {
        game.u.ELevitation = 131072; // measured 95347 screen 1137
        game.u.uprops[LEVITATION].extrinsic = 131072;
        assert.equal(u_locomotion('step'), 'float');
    });

    it('slot-only levitation floats with flats unset (95213 shape)', () => {
        game.u.ELevitation = 32; // measured 95213 screen 813
        game.u.uprops[LEVITATION].extrinsic = 32;
        assert.equal(u_locomotion('step'), 'float');
        game.u.ELevitation = 0; // confer without the flat mirror still floats
        assert.equal(u_locomotion('step'), 'float');
    });

    it('blocked levitation falls through (either blocked source)', () => {
        game.u.uprops[LEVITATION].extrinsic = 32;
        game.u.uprops[LEVITATION].blocked = 1;
        assert.equal(u_locomotion('step'), 'step');
        game.u.uprops[LEVITATION].blocked = 0;
        game.u.BLevitation = 1;
        assert.equal(u_locomotion('step'), 'step');
    });

    it('amulet flying (slot extrinsic, flats unset) flies', () => {
        game.u.uprops[FLYING].extrinsic = W_AMUL;
        assert.equal(u_locomotion('step'), 'fly');
    });

    it('empty state passes def through (95213 matching warnings)', () => {
        assert.equal(u_locomotion('step'), 'step');
    });

    it('capitalized def capitalizes (C :1819)', () => {
        game.u.uprops[LEVITATION].extrinsic = 32;
        assert.equal(u_locomotion('Step'), 'Float');
    });
});
