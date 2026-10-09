import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { doengrave } from '../js/engrave.js';
import { mons } from '../js/monsters.js';
import { monsterNames } from '../js/generated/monsters_data.js';
import { objectNames, WAND_CLASS } from '../js/objects.js';
import { ROOM, CMDQ_KEY } from '../js/const.js';
import { init_objects } from '../js/o_init.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: engrave.c doengrave_sfx_item_WAN `:684–704` (WAN_DIGGING) and
// `:718–733` (WAN_LIGHTNING). `:693` `(Blind && !Deaf)` picks "You hear
// drilling!" vs "You feel tremors."; `:730` `!Deaf` picks "You hear
// crackling!" vs "Your hair stands up!" — where Deaf is the youprop.h:125
// macro (HDeaf || EDeaf || uroleplay.deaf). JS read raw `game.u?.Deaf`
// (zero writers, stuck false), so a macro-deaf blind hero heard the
// drilling/crackling where C feels the tremors/hair-stand. Live reader:
// hero_Deaf (js/monmove.js:1197; dokick omit-2 precedent D-3704/D-3705).
// doengrave_sfx_item_WAN is module-local (C staticfn), so this drives the
// exported doengrave: blind hero on ROOM floor with a wand in invent.
// Answers ride _cmdq_canned (getobj_from_cmdq takes 'a', the D-3700
// getlin preamble takes 'x'+newline and echoes `query x`); pushed
// blanks feed the synchronous --More-- reads. post_engr_text prints
// after the occupation is set (`:1779`), combined with the echo in
// the ring for the blind pairs (sighted entries stay separate).

const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);
const WAN_DIGGING = objectNames.indexOf('WAN_DIGGING');
assert.ok(WAN_DIGGING >= 0);
const WAN_LIGHTNING = objectNames.indexOf('WAN_LIGHTNING');
assert.ok(WAN_LIGHTNING >= 0);

const SEED = 23;

function setup(otyp, hero = {}) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(SEED);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    if (!game.objects) init_objects();
    game.objects[otyp].oc_name_known = true;
    // Canned answers (D-3700 getlin preamble + getobj_from_cmdq): 'a'
    // picks the wand, 'x'+newline answers the text prompt. Pushed blanks
    // feed the synchronous --More-- reads the echo/post plines take.
    game._cmdq_canned = [
        { typ: CMDQ_KEY, key: 'a' },
        { typ: CMDQ_KEY, key: 'x' },
        { typ: CMDQ_KEY, key: '\n' },
    ];
    pushKeys([' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        HBlinded: 1, EBlinded: 0, BBlinded: 0,
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        acurr: { a: [10, 10, 10, 10, 10, 10] },
        abon: { a: [0, 0, 0, 0, 0, 0] },
        atemp: { a: [0, 0, 0, 0, 0, 0] },
        ...hero,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.flags = { verbose: true };
    game.moves = 0;
    game.invent = [{
        otyp, oclass: WAND_CLASS, quan: 1, spe: 3,
        blessed: 0, cursed: 0, unpaid: 0, invlet: 'a',
    }];
    const floorLoc = { typ: ROOM, doormask: 0 };
    game.level = { flags: {}, at: () => floorLoc };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('doengrave_sfx_item_WAN reads the Deaf macro (engrave.c:693,730)', () => {
    it('digging, blind non-deaf control: hears drilling', async () => {
        setup(WAN_DIGGING);
        await doengrave();
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand.',
            'What do you want to engrave in the floor here? x  You hear drilling!',
        ]);
    });

    it('digging, blind EDeaf: feels tremors (C :693)', async () => {
        setup(WAN_DIGGING, { EDeaf: 1 });
        await doengrave();
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand.',
            'What do you want to engrave in the floor here? x  You feel tremors.',
        ]);
    });

    it('digging, blind roleplay-deaf: feels tremors (C :693)', async () => {
        setup(WAN_DIGGING, { uroleplay: { deaf: 1 } });
        await doengrave();
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand.',
            'What do you want to engrave in the floor here? x  You feel tremors.',
        ]);
    });

    it('digging, blind HDeaf: feels tremors (C :693)', async () => {
        setup(WAN_DIGGING, { HDeaf: 1 });
        await doengrave();
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand.',
            'What do you want to engrave in the floor here? x  You feel tremors.',
        ]);
    });

    it('digging, blind u.Deaf flag: feels tremors (dead-code disjunct)', async () => {
        setup(WAN_DIGGING, { Deaf: 1 });
        await doengrave();
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand.',
            'What do you want to engrave in the floor here? x  You feel tremors.',
        ]);
    });

    it('lightning, blind non-deaf control: hears crackling', async () => {
        setup(WAN_LIGHTNING);
        await doengrave();
        assert.deepEqual(messages(), [
            'You burn into the floor with a wand.',
            'What do you want to burn into the floor here? x  You hear crackling!',
        ]);
    });

    it('lightning, blind EDeaf: hair stands up (C :730)', async () => {
        setup(WAN_LIGHTNING, { EDeaf: 1 });
        await doengrave();
        assert.deepEqual(messages(), [
            'You burn into the floor with a wand.',
            'What do you want to burn into the floor here? x  Your hair stands up!',
        ]);
    });

    it('digging, sighted control: gravel, no Deaf involvement', async () => {
        setup(WAN_DIGGING, { HBlinded: 0 });
        await doengrave();
        // Sighted doname shows the wand kind; the echo and post stay
        // separate ring entries here (blind pairs combine above).
        assert.deepEqual(messages(), [
            'You engrave in the floor with a wand of digging.',
            'What do you want to engrave in the floor here? x',
            'Gravel flies up from the floor.',
        ]);
    });
});
