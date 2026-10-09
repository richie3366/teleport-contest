import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mon_yells } from '../js/monmove.js';
import { mons, monsterNames } from '../js/monsters.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: monmove.c mon_yells `:106–129` — the !canspotmon arm (`:124`) calls
// You_hear("someone yell:"), whose inner gates (pline.c:441 acoustics +
// Underwater/Unaware prefixes :444–447) the local You_hear_yell clone
// dropped (D-2941-named; D-3702 Next lead). The outer `if (Deaf)` gate stays:
// a Deaf hero never reaches the else branch, exactly as C's gate order.
// Live callee: js/hack.js You_hear (D-2941, whole vs C).
// Naming note: the similarly-named mon_yells pline_mon arms are untouched;
// this file pins only the !canspotmon arm plus Deaf/spotted controls.

const PM_GNOME = monsterNames.indexOf('PM_GNOME');
assert.ok(PM_GNOME >= 0);

const SHOUT = "Halt, thief!  You're under arrest!";
const QUOTED = `"${SHOUT}"`;

function setup({ hero = {}, flags = {}, multi = 0 } = {}) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(3703);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent);
    // vision_inited stays unset so vision_recalc is a no-op and cansee is
    // false (unspotted arm) without staging viz_array.
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    pushKeys([' ', ' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        uinwater: 0, usleep: 0, uhs: 0,
        ...hero,
    };
    game.youmonst = { data: mons(monsterNames.indexOf('PM_HUMAN')) };
    game.flags = { verbose: true, ...flags };
    game.multi = multi;
    game.nomovemsg = null;
    game.fmon = [];
    game.moves = 0;
}

function gnomeAt(x, y) {
    return {
        mx: x, my: y, mux: 5, muy: 5,
        data: mons(PM_GNOME),
        mhp: 100, mstun: 0, mcanmove: true, msleeping: 0,
        mtame: 0, mpeaceful: 0, isshk: 0, isgd: 0, ispriest: 0,
        minvis: 0, mundetected: 0,
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('mon_yells unspotted arm emits via live You_hear (monmove.c:124)', () => {
    // Consecutive plines with no --More-- between combine into one ring
    // entry (C putmesg continuation: two-space join on one topline).
    it('unspotted: normal hero hears + shout quoted (C :124–127)', async () => {
        setup();
        await mon_yells(gnomeAt(6, 6), SHOUT);
        assert.deepEqual(messages(), [`You hear someone yell:  ${QUOTED}`]);
    });

    it('unspotted underwater: barely hears (pline.c:444)', async () => {
        setup({ hero: { uinwater: 1 } });
        await mon_yells(gnomeAt(6, 6), SHOUT);
        assert.deepEqual(messages(), [`You barely hear someone yell:  ${QUOTED}`]);
    });

    it('unspotted unaware: dreams the sound (pline.c:446)', async () => {
        setup({ hero: { usleep: 1 }, multi: -1 });
        await mon_yells(gnomeAt(6, 6), SHOUT);
        // The dream prefix overflows the topline width, so the ring holds
        // two entries (C putmesg wrap) rather than one combined line.
        assert.deepEqual(messages(), ['You dream that you hear someone yell:', QUOTED]);
    });

    it('unspotted acoustics off: yell silent, shout still quoted (pline.c:441)', async () => {
        setup({ flags: { acoustics: false } });
        await mon_yells(gnomeAt(6, 6), SHOUT);
        assert.deepEqual(messages(), [QUOTED]);
    });

    it('deaf control: outer if (Deaf) gate blocks the else branch (C :109)', async () => {
        setup({ hero: { HDeaf: 1 } });
        await mon_yells(gnomeAt(6, 6), SHOUT);
        assert.deepEqual(messages(), []);
    });

    it('spotted control: "X yells:" + shout (C :120–121, untouched arm)', async () => {
        setup({ hero: { HDetect_monsters: 1 } });
        await mon_yells(gnomeAt(6, 6), SHOUT);
        const ms = messages();
        assert.equal(ms.length, 1);
        assert.match(ms[0], / yells:  /);
        assert.ok(ms[0].endsWith(QUOTED));
    });
});
