import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { from_what } from '../js/attrib.js';
import { ysimple_name } from '../js/objnam.js';
import { init_objects } from '../js/o_init.js';
import { objectNames, TOOL_CLASS } from '../js/objects.js';
import { BLINDED, DEAF } from '../js/const.js';
import { initRng } from '../js/rng.js';

// C ref: attrib.c from_what `:904–1001` — the BLINDED/DEAF source arms:
// birth `:936–938` (FIRST, before innateness), Blindfolded_only
// `:962–963`, cream-pie goop `:964–968` (no leading space — enl_msg glues
// suffix+value: " You were temporarily blind (5)due to goop covering your
// face." scen-worldtour-Valkyrie-95206 step 629; this writer moves the two
// goop sessions blocked on one_characteristic).
const MIRROR = objectNames.indexOf('MIRROR');

describe('from_what BLINDED/DEAF source arms (attrib.c)', () => {
    beforeEach(() => {
        resetGame();
        initRng(1230);
        if (!game.objects) init_objects();
        if (!game.flags) game.flags = {};
        game.flags.wizard = true; // from_what is wizard-only (C :914)
        game.u = {
            ulevel: 1,
            HBlinded: 0,
            EBlinded: 0,
            BBlinded: 0,
            ucreamed: 0,
            ublindf: null,
            uroleplay: {},
            uprops: [],
        };
    });

    it('cream-pie blindness reports the goop (C :964–968, no leading space)', () => {
        game.u.HBlinded = 5;
        game.u.ucreamed = 5;
        assert.equal(from_what(BLINDED), 'due to goop covering your face');
    });

    it('goop needs exact timeout match, no extrinsic, timeout-only H', () => {
        game.u.HBlinded = 5;
        game.u.ucreamed = 0; // washed off
        assert.equal(from_what(BLINDED), '');
        game.u.ucreamed = 7; // timeout 5 !== creamed 7
        assert.equal(from_what(BLINDED), '');
        game.u.ucreamed = 5;
        game.u.EBlinded = 1; // blindfold too: goop refuses (!E fails),
        // Blindfolded_only false (H set) — silent, no ublindf read
        assert.equal(from_what(BLINDED), '');
    });

    it('blindfold alone reports the cover (C :962–963)', () => {
        game.u.EBlinded = 1;
        // otyp is irrelevant to the arm (C passes ublindf straight to
        // ysimple_name); MIRROR is a proven-valid tool otyp.
        game.u.ublindf = {
            otyp: MIRROR, oclass: TOOL_CLASS, quan: 1, spe: 0, corpsenm: -1,
        };
        const got = from_what(BLINDED);
        assert.ok(got.startsWith(' because of '));
        assert.equal(got, ` because of ${ysimple_name(game.u.ublindf)}`);
    });

    it('birth blind/deaf report " from birth" first (C :936–938)', () => {
        game.u.uroleplay.blind = true;
        assert.equal(from_what(BLINDED), ' from birth');
        game.u.uroleplay.blind = false;
        game.u.uroleplay.deaf = true;
        assert.equal(from_what(DEAF), ' from birth');
    });
});
