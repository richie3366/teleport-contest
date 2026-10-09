import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { throwit } from '../js/dothrow.js';
import { objects_globals_init, objectNames, WEAPON_CLASS, COIN_CLASS } from '../js/objects.js';
import { POOL, ROOM, VWALL, OBJ_FREE } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: dothrow.c throwit `:1793–1801` — the landing Splash/Plop arm
// gates `Soundeffect(se_splash, 50)` + «Splash!»/«Plop!» on
// `!Deaf && !Underwater` (`:1793`) with Underwater ≡ u.uinwater
// (youprop.h:279); is_pool/is_lava/is_flammable/weight threshold
// `:1795–1800`, flooreffects 'fall' runs on both sides. JS
// (js/dothrow.js:2583) read the sticky `game.u?.Underwater` flat (zero
// writers anywhere in js/ — dead false), so a submerged throw landing
// in pool/lava got the Splash where C stays silent. Fix (D-3400
// idiom): read the live `(u.uinwater | 0)` bit. Pure gate, no RNG.
// Staging: hero at (10,10) throwing east (dx=1); POOL at the (11,10)
// landing cell, WALL at (12,10) so the inline fly stops at the pool
// whatever the range; Deaf clear; viz unset so cansee is false (the
// flooreffects pool arm then stays quiet — it only speaks at the hero
// square for a blind/levitating hero — so any Splash!/Plop! is the
// throwit `:1793` gate). The verdict is the message ring
// (getmsghistory walk): Splash!/Plop! present vs absent.

const HX = 10;
const HY = 10;
const LX = 11;
const LY = 10;
const LONG_SWORD = objectNames.indexOf('LONG_SWORD');
const GOLD_PIECE = objectNames.indexOf('GOLD_PIECE');
assert.ok(LONG_SWORD >= 0 && GOLD_PIECE >= 0);

function setup(hero) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(1793);
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
        ...hero,
    };
    game.youmonst = { mx: HX, my: HY, data: { mlet: 'S_HUMAN' } };
    const cells = new Map();
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) {
                cells.set(k, (x === LX && y === LY) ? { typ: POOL }
                    : (x === LX + 1 && y === LY) ? { typ: VWALL }
                    : { typ: ROOM });
            }
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

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('throwit landing Splash/Plop gate reads live uinwater (dothrow.c:1793, youprop.h:279)', () => {
    it('surface throw of bulky obj into pool: Splash!', async () => {
        setup({ uinwater: 0 });
        await throwit(makeObj(LONG_SWORD, WEAPON_CLASS, 40), 0, false, null);
        assert.ok(messages().some((m) => m.includes('Splash!')), 'C :1795-1800 Splash on surface');
    });

    it('submerged throw of bulky obj into pool: silent', async () => {
        setup({ uinwater: 1 });
        await throwit(makeObj(LONG_SWORD, WEAPON_CLASS, 40), 0, false, null);
        const ms = messages();
        assert.ok(!ms.some((m) => m.includes('Splash!')), 'C :1793 silent underwater');
        assert.ok(!ms.some((m) => m.includes('Plop!')), 'C :1793 silent underwater');
    });

    it('dead u.Underwater flat alone still Splashes (live bit rules)', async () => {
        setup({ uinwater: 0, Underwater: 1 });
        await throwit(makeObj(LONG_SWORD, WEAPON_CLASS, 40), 0, false, null);
        assert.ok(messages().some((m) => m.includes('Splash!')), 'sticky flat must not gate C silence');
    });

    it('surface throw of light obj into pool: Plop!', async () => {
        setup({ uinwater: 0 });
        await throwit(makeObj(GOLD_PIECE, COIN_CLASS, 1), 0, false, null);
        assert.ok(messages().some((m) => m.includes('Plop!')), 'C :1795-1800 Plop on surface');
    });

    it('submerged throw of light obj into pool: silent', async () => {
        setup({ uinwater: 1 });
        await throwit(makeObj(GOLD_PIECE, COIN_CLASS, 1), 0, false, null);
        const ms = messages();
        assert.ok(!ms.some((m) => m.includes('Splash!')), 'C :1793 silent underwater');
        assert.ok(!ms.some((m) => m.includes('Plop!')), 'C :1793 silent underwater');
    });
});
