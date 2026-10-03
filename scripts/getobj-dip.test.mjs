import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { getobj_dip } from '../js/potion.js';
import { hands_obj } from '../js/weapon.js';
import { nhgetch, pushKeys, resetInputState } from '../js/input.js';
import { reset_display_messages } from '../js/display.js';
import { initRng } from '../js/rng.js';
import { init_objects } from '../js/o_init.js';
import { objectNames, TOOL_CLASS } from '../js/objects.js';

// C ref: invent.c getobj `:1790–1794` (cmdq HANDS_SYM verdict) and
// `:1963–1992` (`?`/`*` pickinv) as served by the js/potion.js getobj_dip
// clone (C potion.c:2279 dodip path). Sibling getobj_dip_ok already
// consults cmdq_pop_getobj_key + getobj_display_pickinv; getobj_dip
// skipped both (no cmdq path; `?`/`*` plined 'Never mind.' + null).
// nhgetch throws on an empty queue, so key-consumption asserts prove
// the menu was entered rather than the prompt short-circuiting.
const MIRROR = objectNames.indexOf('MIRROR');
const ESC = 27;

const mktool = (invlet) => ({
    otyp: MIRROR,
    oclass: TOOL_CLASS,
    quan: 1,
    spe: 0,
    corpsenm: -1,
    invlet,
});

describe('getobj_dip cmdq + pickinv arms (invent.c:1790-1794,1963-1992)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(1790);
        if (!game.objects) init_objects();
        game.u = { ux: 5, uy: 5 };
        game.iflags = { window_inited: true };
        if (!game.flags) game.flags = {};
        game.flags.invlet_constant = true;
        game.invent = [];
        game._cmdq_canned = [];
    });

    it('canned HANDS_SYM returns hands_obj without prompting', async () => {
        game._cmdq_canned = [{ typ: 'key', key: '-' }];
        const ret = await getobj_dip(false);
        assert.equal(ret, hands_obj);
        assert.equal(game._cmdq_canned.length, 0);
    });

    it('canned miss returns null and clears the queue (C :1813-1815)', async () => {
        game._cmdq_canned = [{ typ: 'key', key: 'z' }];
        const ret = await getobj_dip(false);
        assert.equal(ret, null);
        assert.deepEqual(game._cmdq_canned, []);
    });

    it("'*' consults pickinv then loops (no instant null)", { timeout: 10000 }, async () => {
        pushKeys(['*', ESC]);
        const ret = await getobj_dip(false);
        assert.equal(ret, null);
        // Both keys consumed: '*' entered the menu (null → continue),
        // ESC cancelled at the re-prompt. Old code spent no 2nd key.
        // (No message assert: headless flush_screen consumes
        // _pending_message mid-flow; the ESC text arm is byte-identical
        // to the sibling's and the pre-existing prompt-ESC arm's.)
        await assert.rejects(nhgetch(), /Input queue empty/);
    });

    it("'?' menu selects the middle letter (raw, uncompacted lets)", { timeout: 15000 }, async () => {
        const [a, b, c] = [mktool('a'), mktool('b'), mktool('c')];
        game.invent = [a, b, c];
        pushKeys(['?', 'b']);
        const ret = await getobj_dip(false);
        assert.equal(ret, b);
        await assert.rejects(nhgetch(), /Input queue empty/);
    });
});
