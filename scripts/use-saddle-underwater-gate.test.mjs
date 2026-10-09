import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { use_saddle } from '../js/steed.js';
import { mons, monsterNames } from '../js/monsters.js';
import { ECMD_OK, ECMD_TIME, ECMD_CANCEL } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: steed.c use_saddle `:42–49` —
//   `if (u.uswallow || Underwater || !getdir((char *) 0)) {
//        pline1(Never_mind); return ECMD_CANCEL; }`,
// with Underwater ≡ u.uinwater (youprop.h:279).
// The JS gate read the sticky `u.Underwater` flat (zero writers anywhere
// in js/ — dead false), so a submerged hero was prompted for a saddle
// direction where C says Never_mind/ECMD_CANCEL. Fix (D-3400 idiom): read
// the live `(u.uinwater | 0)` bit, same expression as the can_ride
// disjunct (js/steed.js:211, D-3722) and the mount_steed gate (:724).
// Canned CMDQ_KEYs (getdir-confdir.test.mjs precedent) drive getdir
// headless; a gate that fires leaves the canned key unconsumed, proving
// getdir never ran. Message ring via window_inited
// (breamm-mcan-cough-gate.test.mjs precedent).

const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

function setup({ hero = {}, key = 'h' } = {}) {
    resetGame();
    reset_display_messages();
    initRng(3723);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uswallow: 0, uinwater: 0, uwep: null,
        ...hero,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.fmon = [];
    game.moves = 0;
    game._cmdq_canned = [{ typ: 'key', key }];
    game._cmdq_repeat = [];
    game.in_doagain = 0;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

const DUMMY_SADDLE = { cursed: 0, owornmask: 0 };

describe('use_saddle gate reads live uinwater (steed.c:46, youprop.h:279)', () => {
    it('submerged (uinwater=1): Never_mind + ECMD_CANCEL, getdir never runs', async () => {
        setup({ hero: { uinwater: 1 } });
        const ret = await use_saddle(DUMMY_SADDLE);
        assert.equal(ret, ECMD_CANCEL);
        assert.deepEqual(messages(), ['Never mind.']);
        assert.equal(game._cmdq_canned.length, 1);
        assert.equal(game.u.dx, undefined);
    });

    it('surface control (uinwater=0) + self dir: prompted, Saddle-yourself + ECMD_OK', async () => {
        setup({ hero: { uinwater: 0 }, key: '.' });
        const ret = await use_saddle(DUMMY_SADDLE);
        assert.equal(ret, ECMD_OK);
        assert.deepEqual(messages(), ['Saddle yourself?  Very funny...']);
        assert.equal(game._cmdq_canned.length, 0);
    });

    it('surface control (uinwater=0) + neighbor dir: nobody there + ECMD_TIME', async () => {
        setup({ hero: { uinwater: 0 }, key: 'h' });
        const ret = await use_saddle(DUMMY_SADDLE);
        assert.equal(ret, ECMD_TIME);
        assert.deepEqual(messages(), ['I see nobody there.']);
        assert.equal(game.u.dx, -1);
        assert.equal(game.u.dy, 0);
    });

    it('swallow control (uswallow=1): Never_mind + ECMD_CANCEL, getdir never runs', async () => {
        setup({ hero: { uswallow: 1, uinwater: 0 } });
        const ret = await use_saddle(DUMMY_SADDLE);
        assert.equal(ret, ECMD_CANCEL);
        assert.deepEqual(messages(), ['Never mind.']);
        assert.equal(game._cmdq_canned.length, 1);
    });

    it('dead u.Underwater flat alone does not gate (live bit rules)', async () => {
        setup({ hero: { uinwater: 0, Underwater: 1 }, key: '.' });
        const ret = await use_saddle(DUMMY_SADDLE);
        assert.equal(ret, ECMD_OK);
        assert.deepEqual(messages(), ['Saddle yourself?  Very funny...']);
    });
});
