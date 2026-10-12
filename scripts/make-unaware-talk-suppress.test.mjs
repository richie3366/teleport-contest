import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { make_stunned, make_confused, make_vomiting } from '../js/potion.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: potion.c make_stunned `:111-112`, make_confused `:93-94`,
// make_vomiting `:247-248` — `if (Unaware) talk = FALSE` (youprop.h:399:
// multi<0 && (unconscious() || is_fainted())). JS read a `u.Unaware`
// field with zero writers, so the cure lines printed while asleep and
// the extra backlog line buried "You wake up." behind --More--
// (scen-sweep-Healer-578216 step 1431). make_sick/make_slimed/
// make_stoned deliberately talk while unaware (C `:145` #if 0).

function setup({ multi = 0, usleep = 0 } = {}) {
    resetGame();
    reset_display_messages();
    initRng(9044);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HStun: 5, HConfusion: 5, Vomiting: 5,
        usleep, uhs: 3,
    };
    game.multi = multi;
    game.nomovemsg = multi < 0 ? 'You wake up.' : null;
    game.flags = { ...(game.flags ?? {}), verbose: true };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('potion.c make_* cure lines stay silent while Unaware', () => {
    it('make_stunned(0, TRUE) asleep: silent (C :111-112)', async () => {
        setup({ multi: -1, usleep: 1 });
        await make_stunned(0, true);
        assert.deepEqual(messages(), []);
    });

    it('make_stunned(0, TRUE) awake: steadier line', async () => {
        setup({ multi: 0 });
        await make_stunned(0, true);
        assert.deepEqual(messages(), ['You feel a bit steadier now.']);
    });

    it('make_confused(0, TRUE) asleep: silent (C :93-94)', async () => {
        setup({ multi: -1, usleep: 1 });
        await make_confused(0, true);
        assert.deepEqual(messages(), []);
    });

    it('make_vomiting(0, TRUE) asleep: silent (C :247-248)', async () => {
        setup({ multi: -1, usleep: 1 });
        await make_vomiting(0, true);
        assert.deepEqual(messages(), []);
    });
});
