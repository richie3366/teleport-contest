import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { dosounds } from '../js/sounds.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';

// C ref: sounds.c dosounds `:202–339` — EOT ambient rolls gated at `:208`
// on `if (Deaf || !flags.acoustics || u.uswallow || Underwater)`, with
// Underwater ≡ u.uinwater (youprop.h:279). JS read the sticky
// `u.Underwater` flat (zero writers anywhere in js/ — dead false) instead
// of the live bit, so a submerged hero kept rolling ambient sounds.
// D-3400 idiom: read `(u.uinwater | 0)`, ignore the flat.
// Caller: allmain.c:352 (moveloop EOT) → js/allmain.js await dosounds().

function setup({ hero = {}, flags = {} } = {}) {
    reset_display_messages();
    clear_nhwindow_message();
    resetInputState();
    pushKey(' ');
    initRng(208);
    enableRngLog();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        uswallow: 0, uinwater: 0, Hallucination: 0,
        ...hero,
    };
    game.youmonst = { mx: 10, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = { flags: { nfountains: 1, nsinks: 1 } };
    game.fmon = [];
    game.moves = 100;
    game.flags = { verbose: true, acoustics: true, ...flags };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('dosounds EOT gate reads live uinwater (sounds.c:208, youprop.h:279)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves, flags: game.flags,
            iflags: game.iflags,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.fmon = saved.fmon;
        game.moves = saved.moves;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
    });

    it('submerged hero (uinwater=1): silent, no ambient draws', async () => {
        setup({ hero: { uinwater: 1 } });
        await dosounds();
        assert.deepEqual(getRngLog(), []);
        assert.deepEqual(messages(), []);
    });

    it('surface control (uinwater=0): fountain + sink arms draw', async () => {
        setup({ hero: { uinwater: 0 } });
        await dosounds();
        const log = getRngLog();
        assert.ok(log.length >= 2, `expected fountain+sink draws, got ${JSON.stringify(log)}`);
        assert.ok(log[0].startsWith('rn2(400)='), `first draw: ${log[0]}`);
        assert.ok(log.some((e) => e.startsWith('rn2(300)=')), `no sink draw in ${JSON.stringify(log)}`);
    });

    it('dead u.Underwater flat alone does not silence (live bit rules)', async () => {
        setup({ hero: { uinwater: 0, Underwater: 1 } });
        await dosounds();
        assert.ok(getRngLog().length >= 2, 'sticky flat must not gate C sounds');
    });
});
