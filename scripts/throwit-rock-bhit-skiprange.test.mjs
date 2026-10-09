import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { throwit } from '../js/dothrow.js';
import { objects_globals_init, objectNames, WEAPON_CLASS, GEM_CLASS } from '../js/objects.js';
import { ROOM, OBJ_FREE } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';

// C ref: dothrow.c throwit `:1674–1679` — every non-boomerang flight goes
// through bhit(THROWN_WEAPON), which draws the thrown-rock skiprange
// window (staticfn `:3579–3588`, JS file-local bhit_skiprange) plus
// `!rn2(3)` allow_skip (`:3855–3858`). JS throwit used to inline its own
// flight loop for the non-tethered path, so a thrown rock drew no
// skiprange RNG at all (corpus: C rnd(2)@skiprange vs JS rn2(100) from a
// later dogfood — D-3756). Fix: the non-tethered path calls the live
// bhit. Staging: hero at (10,10) throwing east down open ROOM; the rock
// flies its full range and lands with no monster/trap/bar in the way,
// so the only bhit-attributed draws are the rock setup. The verdict is
// the RNG log with caller trace: entries from bhit_skiprange + the
// rn2(3) from bhit for a rock, none of either for a long sword (C gate
// is THROWN_WEAPON + ROCK). Seed-independent: presence, not values.

const HX = 10;
const HY = 10;
const ROCK = objectNames.indexOf('ROCK');
const LONG_SWORD = objectNames.indexOf('LONG_SWORD');
assert.ok(ROCK >= 0 && LONG_SWORD >= 0);

function setup() {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(3756);
    objects_globals_init();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, uz: { dnum: 0, dlevel: 1 },
        dx: 1, dy: 0, dz: 0,
        uinwater: 0, uswallow: 0,
        uhp: 20, uhpmax: 20, mh: 0, mhmax: 0,
        HConfusion: 0, HStun: 0, HHallucination: 0,
        HBlinded: 0, EBlinded: 0, BBlinded: 0,
        HLevitation: 0, ELevitation: 0, BLevitation: 0,
        HFlying: 0, EFlying: 0, BFlying: 0,
        HFumbling: 0, EFumbling: 0,
        HDeaf: 0, EDeaf: 0, Deaf: 0, uroleplay: {},
        ustr: 16, ustrmax: 16,
        uwep: null, uquiver: null, uball: null, uchain: null,
        usteed: null, utrap: 0, utraptype: 0, ushops: '',
    };
    game.youmonst = { mx: HX, my: HY, data: { mlet: 'S_HUMAN' } };
    const cells = new Map();
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, { typ: ROOM });
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game.moves = 100;
    game.flags = { verbose: true };
    game._objects_at = new Map();
}

function makeObj(otyp, oclass, owt) {
    return {
        otyp, oclass, quan: 1, where: OBJ_FREE, owt,
        nobj: null, nexthere: null, cobj: null,
        ox: HX, oy: HY, spe: 0,
        blessed: 0, cursed: 0, bknown: 0, dknown: 0,
        unpaid: 0, no_charge: 0, oerodeproof: 0,
        oeroded: 0, oeroded2: 0, greased: 0, lamplit: 0,
        globby: 0, oartifact: 0, owornmask: 0, invlet: 0,
    };
}

async function tracedThrow(obj) {
    enableRngLog();
    globalThis.__NH_RNG_TRACE = true;
    try {
        await throwit(obj, 0, false, null);
        return [...getRngLog()];
    } finally {
        globalThis.__NH_RNG_TRACE = false;
    }
}

describe('throwit THROWN_WEAPON flight goes through bhit (dothrow.c:1674, zap.c:3855)', () => {
    it('thrown rock draws the bhit skiprange window + allow_skip', async () => {
        setup();
        const log = await tracedThrow(makeObj(ROCK, GEM_CLASS, 10));
        assert.ok(
            log.some((e) => String(e).includes('bhit_skiprange')),
            `rock flight must draw skiprange in bhit, drew: ${JSON.stringify(log)}`,
        );
        assert.ok(
            log.some((e) => String(e).includes('rn2(3)') && String(e).includes('@ bhit(')),
            `rock flight must draw rn2(3) allow_skip in bhit, drew: ${JSON.stringify(log)}`,
        );
    });

    it('non-rock throw draws no skiprange window (C gate is ROCK-only)', async () => {
        setup();
        const log = await tracedThrow(makeObj(LONG_SWORD, WEAPON_CLASS, 40));
        assert.ok(
            !log.some((e) => String(e).includes('bhit_skiprange')),
            `sword flight must not draw skiprange, drew: ${JSON.stringify(log)}`,
        );
    });
});
