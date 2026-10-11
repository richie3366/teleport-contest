import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { getobj_dip } from '../js/potion.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { reset_display_messages } from '../js/display.js';
import { initRng } from '../js/rng.js';
import { init_objects } from '../js/o_init.js';
import { objectNames, TOOL_CLASS } from '../js/objects.js';

// C ref: invent.c getobj `:1838–1900` collects SUGGEST lets in
// sortloot(SORTLOOT_INVLET) order — sortloot_cmp `:471–477` ranks by
// invletter_value (`:390–399`: '$' first, then a-z, A-Z, '#'), NOT
// ASCII. The wield/dip/stash/stone/charge/ready getobj clones sorted
// ASCII (or invent order), so C «[- bG or ?*]» rendered «[- Gb or ?*]»
// (scen-sweep-Caveman-95327 step 1230; 5 corpus blocks on getobj).
// The prompt is observed frozen: with an empty key queue nhgetch
// throws after the prompt paints, leaving game._pending_message.
const MIRROR = objectNames.indexOf('MIRROR');

const mktool = (invlet) => ({
    otyp: MIRROR,
    oclass: TOOL_CLASS,
    quan: 1,
    spe: 0,
    corpsenm: -1,
    invlet,
});

describe('getobj clone lets order (invent.c sortloot INVLET)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(1230);
        if (!game.objects) init_objects();
        game.u = { ux: 5, uy: 5 };
        game.iflags = { window_inited: true };
        if (!game.flags) game.flags = {};
        game.flags.invlet_constant = true;
        game.invent = [];
        game._cmdq_canned = [];
        game._pending_message = '';
    });

    it('dip prompt lists lowercase before uppercase (C bG, not ASCII Gb)', async () => {
        // Chain order is G-first so only the sort can produce bG.
        game.invent = [mktool('G'), mktool('b')];
        await assert.rejects(getobj_dip(false), /Input queue empty/);
        assert.equal(
            game._pending_message,
            'What do you want to dip? [bG or ?*] ',
        );
    });

    it("invletter_value ranks '$' < a-z < A-Z < '#' < other (C :390-399)", async () => {
        const { invletter_value } = await import('../js/invent.js');
        assert.equal(invletter_value('$'), 1);
        assert.equal(invletter_value('a'), 2);
        assert.equal(invletter_value('b'), 3);
        assert.equal(invletter_value('z'), 27);
        assert.equal(invletter_value('A'), 28);
        assert.equal(invletter_value('G'), 34);
        assert.equal(invletter_value('Z'), 53);
        assert.equal(invletter_value('#'), 54);
        assert.equal(invletter_value(''), 55);
        assert.ok(invletter_value('b') < invletter_value('G'));
    });
});
