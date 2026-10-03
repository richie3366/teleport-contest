// `mhitm.c` slept_monst canonical export (C mhitm.c:1249–1257) + dobuzz
// :4946 wiring. The export replaces the same-file slept_slee_mm clone
// (sticks was a named omission, ustuck cleared by hand); music.js and
// potion.js clones remain, queued next.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { slept_monst } from '../js/mhitm.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { dobuzz } from '../js/zap.js';
import { ROOM } from '../js/const.js';
import { mons, monsterNames } from '../js/monsters.js';
import { reset_display_messages } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';

const AT_HUGS = 7; // C monattk.h (mondata.js:1160 local)

function grabber(extra = {}) {
    return {
        mx: 6, my: 5, mhp: 4, mhpmax: 4,
        msleeping: 1, mcanmove: 0,
        data: { name: 'trapper' },
        ...extra,
    };
}

function setup(ustuck, youmonstData = { name: 'human' }, uswallow = 0) {
    game.u = { ux: 5, uy: 5, ustuck, uswallow };
    game.youmonst = { data: youmonstData };
}

describe('slept_monst (mhitm.c:1249-1257)', () => {
    beforeEach(() => {
        resetGame();
        initRng(4946);
    });

    it('helpless grabber releases the hero', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, null);
    });

    it('non-stuck monster is a no-op', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(null);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, null);
    });

    it('swallowed hero keeps hold (no release)', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon, { name: 'human' }, 1);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });

    it('sticky youmonst keeps hold', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon, {
            name: 'hugger',
            mattk: [{ aatyp: AT_HUGS, adtyp: 0, damn: 0, damd: 0 }],
        });
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });

    it('unhelpless grabber keeps hold', { timeout: 5000 }, async () => {
        const mon = grabber({ msleeping: 0, mcanmove: 1 });
        setup(mon);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });
});

// `zap.c` dobuzz steed redirect (C zap.c:4956–4959): `goto buzzmonst`
// exits the u_at branch, skipping the flashburn(d(nd,50)) /
// stop_occupation / nomul tail (:4988–4991). Review 2317 C-wrong 1: the
// redirect used to fall through to the tail.
const PM_PONY = monsterNames.indexOf('PM_PONY');

function setupSteed(seed, withSteed) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(seed);
    enableRngLog();
    for (let i = 0; i < 20; ++i) pushKey(' ');
    game.u = {
        ux: 5, uy: 5,
        // BBlinded: make_blinded skips the vision-recalc toggle (the stub
        // level has no vision grid) but still records the HBlinded timeout,
        // so a flashburn stays observable via timeout + RNG log.
        BBlinded: 1,
        usteed: withSteed
            ? {
                mx: 5, my: 5, mhp: 20, mhpmax: 20, mcanmove: 1,
                mnum: PM_PONY,
                data: { ...(mons(PM_PONY) || {}), mndx: PM_PONY },
                minvent: null,
            }
            : null,
        uhp: 30, uhpmax: 30,
    };
    game.level = {
        at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, lit: 1 }),
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game.moves = 1000;
    game.flags = {};
    game.iflags = { window_inited: true };
    game.notonhead = true; // sentinel: buzzmonst rewrites it
    game.occupation = () => {};
    game.occtxt = 'eating';
}

// type 5 = ZT_WAND(ZT_LIGHTNING); bolt starts at (4,5) heading east so
// step 1 lands on the hero square (5,5). forcemiss keeps buzzmonst and
// the hero arm on the miss path (no zhitm/zhitu depth); the C steed
// check itself has no forcemiss gate. saymiss exercises the miss arm.
describe('dobuzz steed redirect skips the u_at tail (zap.c:4956-4991)', () => {
    it('redirected bolt skips flashburn/stop_occupation', { timeout: 15000 }, async () => {
        setupSteed(2, true);
        await dobuzz(5, 6, 4, 5, 1, 0, false, true, true);
        // Redirect proof: buzzmonst ran with the steed at bhitpos.
        assert.equal(game.notonhead, false);
        // Tail skipped: no flashburn timeout, no d(nd,50), occupation kept.
        assert.equal(game.u.HBlinded | 0, 0);
        assert.equal(typeof game.occupation, 'function');
        assert.ok(!getRngLog().some((e) => e.includes('d(6,50)')));
    });

    it('unmounted pass still runs the tail (control)', { timeout: 15000 }, async () => {
        setupSteed(7, false);
        await dobuzz(5, 6, 4, 5, 1, 0, false, true, true);
        assert.equal(game.notonhead, true);
        assert.ok((game.u.HBlinded | 0) > 0);
        assert.equal(game.occupation, null);
        assert.ok(getRngLog().some((e) => e.includes('d(6,50)')));
    });
});
