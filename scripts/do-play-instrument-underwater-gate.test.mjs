import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { do_play_instrument } from '../js/music.js';
import { objects_globals_init, objectNames } from '../js/objects.js';
import { ECMD_OK } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: music.c do_play_instrument `:759–773` — the head gates on
// `if (Underwater)` (`:765`) with Underwater ≡ u.uinwater
// (youprop.h:279): «You can't play music underwater!» + ECMD_OK, ahead
// of the wind-instrument can_blow arm (`:766–773`). JS (js/music.js:902)
// read the sticky `u?.Underwater` flat (zero writers anywhere in js/ —
// dead false), so a submerged hero applying an instrument got the play
// prompt / can_blow arm where C refuses. Fix (D-3400 idiom): read the
// live `(u?.uinwater | 0)` bit. Pure gate, no RNG.
// Staging: `game.youmonst = null` makes can_blow false without any
// prompt, so the surface/dead-flat controls land in the "incapable"
// arm — proving the underwater gate did NOT fire — while the submerged
// cases must print the underwater refusal (which also pins C's branch
// order: Underwater is checked before can_blow). The verdict is the
// return code plus the message ring (getmsghistory walk).

const WOODEN_FLUTE = objectNames.indexOf('WOODEN_FLUTE');
const LEATHER_DRUM = objectNames.indexOf('LEATHER_DRUM');
assert.ok(WOODEN_FLUTE >= 0 && LEATHER_DRUM >= 0);

function setup(hero) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(765);
    objects_globals_init();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, uswallow: 0,
        HStun: 0, HConfusion: 0, HHallucination: 0,
        HDeaf: 0, EDeaf: 0, uroleplay: {},
        ...hero,
    };
    game.youmonst = null;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

const UNDERWATER = "You can't play music underwater!";
const INCAPABLE = 'incapable of playing';

describe('do_play_instrument Underwater gate reads live uinwater (music.c:765, youprop.h:279)', () => {
    it('submerged wind instrument: refusal + ECMD_OK (ahead of can_blow)', async () => {
        setup({ uinwater: 1 });
        const rc = await do_play_instrument({ otyp: WOODEN_FLUTE });
        assert.equal(rc, ECMD_OK);
        const ms = messages();
        assert.ok(ms.some((m) => m.includes(UNDERWATER)), 'C :765 refusal underwater');
        assert.ok(!ms.some((m) => m.includes(INCAPABLE)), 'Underwater is checked before can_blow');
    });

    it('submerged drum: refusal + ECMD_OK (gate first, no prompt)', async () => {
        setup({ uinwater: 1 });
        const rc = await do_play_instrument({ otyp: LEATHER_DRUM });
        assert.equal(rc, ECMD_OK);
        assert.ok(messages().some((m) => m.includes(UNDERWATER)), 'C :765 refusal underwater');
    });

    it('surface wind instrument, mouthless hero: incapable arm, no refusal', async () => {
        setup({ uinwater: 0 });
        const rc = await do_play_instrument({ otyp: WOODEN_FLUTE });
        assert.equal(rc, ECMD_OK);
        const ms = messages();
        assert.ok(ms.some((m) => m.includes(INCAPABLE)), 'C :766-773 can_blow arm on surface');
        assert.ok(!ms.some((m) => m.includes(UNDERWATER)), 'no underwater refusal on surface');
    });

    it('dead u.Underwater flat alone still reaches the can_blow arm (live bit rules)', async () => {
        setup({ uinwater: 0, Underwater: 1 });
        const rc = await do_play_instrument({ otyp: WOODEN_FLUTE });
        assert.equal(rc, ECMD_OK);
        const ms = messages();
        assert.ok(ms.some((m) => m.includes(INCAPABLE)), 'sticky flat must not gate C refusal');
        assert.ok(!ms.some((m) => m.includes(UNDERWATER)), 'sticky flat must not gate C refusal');
    });
});
