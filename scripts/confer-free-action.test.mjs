import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { confer_oc_oprop } from '../js/do_wear.js';
import { FREE_ACTION, W_RINGL, W_RINGR } from '../js/const.js';

// C ref: worn.c setworn `:117-125` confers objects[].oc_oprop into
// u.uprops[].extrinsic; youprop.h:383 `Free_action` reads
// u.uprops[FREE_ACTION].extrinsic. JS readers (potion.js, mcastu.js,
// mhitu.js, trap.js, polyself.js, apply.js) consume the EFree_action
// flat, which confer_oc_oprop never mirrored for FREE_ACTION (only
// BLINDED/FAST/TELEPAT/STEALTH/LEVITATION) — so a worn ring of free
// action left JS unresisted where C resisted: scen-sweep-Wizard-50055094
// step 59 quaffed sleep (C "You yawn." vs JS "You suddenly fall asleep!"),
// scen-worldtour-Wizard-50056012 step 357 sleeping vapor (C yawn vs JS
// rnd(5) nomul), scen-zapfest-Healer-49959506 step 379 stun spell (C
// "momentarily disoriented." vs JS "You reel..."). All three wore a
// wished/put-on ring of free action; all three diverge at distfleeck.
const RING_OTYP = 192; // RIN_FREE_ACTION index in objects_data

describe('confer_oc_oprop mirrors FREE_ACTION to EFree_action (worn.c:117-125)', () => {
    let savedU, savedObjects;
    beforeEach(() => {
        savedU = game.u;
        savedObjects = game.objects;
        game.u = { uprops: {} };
        game.objects = { [RING_OTYP]: { oc_oprop: FREE_ACTION } };
    });
    afterEach(() => {
        game.u = savedU;
        game.objects = savedObjects;
    });

    it('put on: uprops extrinsic and EFree_action gain the ring bit', () => {
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGR, true);
        assert.equal(game.u.uprops[FREE_ACTION].extrinsic & W_RINGR, W_RINGR);
        assert.equal((game.u.EFree_action | 0) & W_RINGR, W_RINGR);
    });

    it('take off: both clear the ring bit', () => {
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGR, true);
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGR, false);
        assert.equal(game.u.uprops[FREE_ACTION].extrinsic & W_RINGR, 0);
        assert.equal((game.u.EFree_action | 0) & W_RINGR, 0);
    });

    it('two rings: removing one keeps the other bit in both', () => {
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGL, true);
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGR, true);
        confer_oc_oprop({ otyp: RING_OTYP }, W_RINGL, false);
        assert.equal(game.u.uprops[FREE_ACTION].extrinsic & W_RINGR, W_RINGR);
        assert.equal(game.u.uprops[FREE_ACTION].extrinsic & W_RINGL, 0);
        assert.equal((game.u.EFree_action | 0) & W_RINGR, W_RINGR);
        assert.equal((game.u.EFree_action | 0) & W_RINGL, 0);
    });
});
