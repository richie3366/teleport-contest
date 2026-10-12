import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { getobj_dip } from '../js/potion.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { reset_display_messages } from '../js/display.js';
import { initRng } from '../js/rng.js';
import { init_objects } from '../js/o_init.js';
import { objectNames, TOOL_CLASS, ARMOR_CLASS, RING_CLASS } from '../js/objects.js';
import { W_ARMG, W_RINGL } from '../js/const.js';

// C ref: potion.c dip_ok `:2214–2227` — an item covered by worn outer
// gear (do_wear.c inaccessible_equipment `:3342–3400`: suit under cloak,
// shirt under suit/cloak, ring under gloves) returns GETOBJ_EXCLUDE_INACCESS,
// so C invent.c getobj `:1886–1890` drops its letter from the prompt
// («What do you want to dip? [a-jl-q or ?*]», scen-worldtour-Monk-578305
// step 447 — the `k` ring sits under the `a` gloves; same shape on
// Wizard-95214 `r` @342 and Wizard-95215 `w` @904). The #dip prompt clone
// listed every non-coin invent item, printing `[a-q or ?*]`.
// Frozen-prompt observation (D-3804 pattern): with an empty key queue
// nhgetch throws after the prompt paints, leaving game._pending_message.
const MIRROR = objectNames.indexOf('MIRROR');

const mkobj = (invlet, oclass, owornmask) => ({
    otyp: MIRROR,
    oclass,
    quan: 1,
    spe: 0,
    corpsenm: -1,
    invlet,
    owornmask,
});

function dealRingUnderGloves() {
    const gloves = mkobj('a', ARMOR_CLASS, W_ARMG);
    const ring = mkobj('c', RING_CLASS, W_RINGL);
    game.invent = [
        gloves,
        mkobj('b', TOOL_CLASS, 0),
        ring,
        mkobj('d', TOOL_CLASS, 0),
        mkobj('e', TOOL_CLASS, 0),
        mkobj('f', TOOL_CLASS, 0),
        mkobj('g', TOOL_CLASS, 0),
    ];
    game.u.uarmg = gloves;
    game.u.uleft = ring;
    return { gloves, ring };
}

describe('getobj dip prompt drops inaccessible equipment (potion.c dip_ok)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(447);
        if (!game.objects) init_objects();
        game.u = { ux: 5, uy: 5 };
        game.iflags = { window_inited: true };
        if (!game.flags) game.flags = {};
        game.flags.invlet_constant = true;
        game.invent = [];
        game._cmdq_canned = [];
        game._pending_message = '';
        void pushKeys;
    });

    it('dip prompt drops the glove-covered ring from a compacted run', async () => {
        dealRingUnderGloves();
        await assert.rejects(getobj_dip(false), /Input queue empty/);
        assert.equal(
            game._pending_message,
            'What do you want to dip? [abd-g or ?*] ',
        );
    });

    it('dip prompt lists the ring once the gloves come off', async () => {
        const { gloves } = dealRingUnderGloves();
        gloves.owornmask = 0;
        game.u.uarmg = undefined;
        await assert.rejects(getobj_dip(false), /Input queue empty/);
        assert.equal(
            game._pending_message,
            'What do you want to dip? [a-g or ?*] ',
        );
    });

    it('at_here dip prompt drops the covered ring too (dip_hands_ok)', async () => {
        dealRingUnderGloves();
        await assert.rejects(getobj_dip(true), /Input queue empty/);
        assert.equal(
            game._pending_message,
            'What do you want to dip? [abd-g or ?*] ',
        );
    });
});
