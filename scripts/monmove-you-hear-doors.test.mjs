import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mb_trapped, postmov } from '../js/monmove.js';
import { mons, monsterNames } from '../js/monsters.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { DOOR, ROOM, D_LOCKED, D_CLOSED, MMOVE_MOVED } from '../js/const.js';

// C ref: monmove.c mb_trapped `:59–61` + postmov `:1571–1572` / `:1588–1589` /
// `:1613–1614` — the four unseen-door-message arms call You_hear, whose inner
// gates (pline.c:441 acoustics + Underwater/Unaware prefixes) the plain
// pline('You hear …') shape dropped (m_move ledger omit 1; D-2941 named these
// inlined callers). The outer `!Deaf` macro gates (D-3572) stay: a Deaf hero
// — even Unaware — hears nothing from these arms, exactly as C's gate order.
// Live callee: js/hack.js You_hear (D-2941, whole vs C).

const PM_GNOME = monsterNames.indexOf('PM_GNOME');
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_GNOME >= 0 && PM_HUMAN >= 0);

function setup({ hero = {}, flags = {}, multi = 0 } = {}) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(3702);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent);
    // vision_inited stays unset so vision_recalc is a no-op and cansee is
    // false (unseen arms) without staging viz_array.
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    pushKeys([' ', ' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        uinwater: 0, usleep: 0, uhs: 0,
        ...hero,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
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

// Fresh door loc per test (unblock_door mutates doormask); the monster
// stands on it, everything else is plain room.
function doorLevel(doormask) {
    const doorLoc = { typ: DOOR, doormask, flags: 0, seenv: 0, lit: 0, roomno: 0 };
    const roomLoc = { typ: ROOM, doormask: 0, flags: 0, seenv: 0, lit: 0, roomno: 0 };
    game.level = {
        at: (x, y) => ((x === 10 && y === 10) ? doorLoc : roomLoc),
        flags: {}, traps: [], rooms: [],
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('mb_trapped / postmov door arms emit via live You_hear (monmove.c:60,1572,1589,1614)', () => {
    it('mb_trapped nearby: normal hero hears (C :60)', async () => {
        setup();
        await mb_trapped(gnomeAt(6, 6), false);
        assert.deepEqual(messages(), ['You hear a nearby explosion.']);
    });

    it('mb_trapped distant: far hero hears distant (C :60 mdistu > 49)', async () => {
        setup();
        await mb_trapped(gnomeAt(30, 20), false);
        assert.deepEqual(messages(), ['You hear a distant explosion.']);
    });

    it('mb_trapped underwater: barely hears (pline.c:444)', async () => {
        setup({ hero: { uinwater: 1 } });
        await mb_trapped(gnomeAt(6, 6), false);
        assert.deepEqual(messages(), ['You barely hear a nearby explosion.']);
    });

    it('mb_trapped unaware: dreams the sound (pline.c:446)', async () => {
        setup({ hero: { usleep: 1 }, multi: -1 });
        await mb_trapped(gnomeAt(6, 6), false);
        assert.deepEqual(messages(), ['You dream that you hear a nearby explosion.']);
    });

    it('mb_trapped acoustics off: silent (pline.c:441)', async () => {
        setup({ flags: { acoustics: false } });
        await mb_trapped(gnomeAt(6, 6), false);
        assert.deepEqual(messages(), []);
    });

    it('mb_trapped deaf control: outer !Deaf gate still blocks (C :59, D-3572)', async () => {
        setup({ hero: { HDeaf: 1 } });
        await mb_trapped(gnomeAt(6, 6), false);
        assert.deepEqual(messages(), []);
    });

    it('postmov unlock arm: normal hero hears (C :1571–1572)', async () => {
        setup();
        doorLevel(D_LOCKED);
        const ret = await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, true, true);
        assert.equal(ret, MMOVE_MOVED);
        assert.deepEqual(messages(), ['You hear a door unlock and open.']);
    });

    it('postmov open arm: normal hero hears (C :1588–1589)', async () => {
        setup();
        doorLevel(D_CLOSED);
        const ret = await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, false, true);
        assert.equal(ret, MMOVE_MOVED);
        assert.deepEqual(messages(), ['You hear a door open.']);
    });

    it('postmov smash arm: normal hero hears (C :1613–1614)', async () => {
        setup();
        doorLevel(D_LOCKED);
        const ret = await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, false, false);
        assert.equal(ret, MMOVE_MOVED);
        assert.deepEqual(messages(), ['You hear a door crash open.']);
    });

    it('postmov open arm underwater: barely hears', async () => {
        setup({ hero: { uinwater: 1 } });
        doorLevel(D_CLOSED);
        await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, false, true);
        assert.deepEqual(messages(), ['You barely hear a door open.']);
    });

    it('postmov smash arm unaware: dreams the sound', async () => {
        setup({ hero: { usleep: 1 }, multi: -1 });
        doorLevel(D_LOCKED);
        await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, false, false);
        assert.deepEqual(messages(), ['You dream that you hear a door crash open.']);
    });

    it('postmov unlock arm acoustics off: silent', async () => {
        setup({ flags: { acoustics: false } });
        doorLevel(D_LOCKED);
        await postmov(gnomeAt(10, 10), 9, 10, MMOVE_MOVED, false, true, true);
        assert.deepEqual(messages(), []);
    });
});
