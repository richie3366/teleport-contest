import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { flooreffects } from '../js/do.js';
import { objects_globals_init, objectNames, WEAPON_CLASS, COIN_CLASS } from '../js/objects.js';
import { POOL, ROOM, OBJ_FREE } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: do.c flooreffects `:271–287` — the is_pool arm gates the
// `:275–284` Splash/Plop messages on `!Underwater` (`:277`) with
// Underwater ≡ u.uinwater (youprop.h:279); map_background/newsym +
// water_damage run on both sides. JS (js/do.js:885) read the sticky
// `game.u?.Underwater` flat (zero writers anywhere in js/ — dead
// false), so a submerged blind/levitating/flying hero dropping a
// bulky object into a pool got «Splash!»/«Plop!» where C stays silent
// (already underwater). Fix (D-3400 idiom): read the live
// `(game.u?.uinwater | 0)` bit. Pure gate, no RNG.
// Staging: POOL at the hero square (10,10) so u_at is true;
// Blind via HBlinded (or Levitation via HLevitation for the Plop
// arm); Deaf clear; viz unset so cansee is false. The verdict is the
// message ring (getmsghistory walk): Splash!/Plop! present vs absent.

const HX = 10;
const HY = 10;
const LONG_SWORD = objectNames.indexOf('LONG_SWORD');
const GOLD_PIECE = objectNames.indexOf('GOLD_PIECE');
assert.ok(LONG_SWORD >= 0 && GOLD_PIECE >= 0);

function setup(hero) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(277);
    objects_globals_init();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, uswallow: 0,
        HBlinded: 0, EBlinded: 0, BBlinded: 0,
        HLevitation: 0, ELevitation: 0, BLevitation: 0,
        HFlying: 0, EFlying: 0, BFlying: 0,
        HDeaf: 0, EDeaf: 0, uroleplay: {},
        ...hero,
    };
    game.youmonst = { mx: HX, my: HY, data: { mlet: 'S_HUMAN' } };
    const cells = new Map();
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) {
                cells.set(k, (x === HX && y === HY) ? { typ: POOL } : { typ: ROOM });
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

function makeObj(otyp, oclass) {
    return {
        otyp, oclass, quan: 1, where: OBJ_FREE,
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

describe('flooreffects pool Splash/Plop gate reads live uinwater (do.c:277, youprop.h:279)', () => {
    it('surface blind hero dropping bulky obj: Splash!', async () => {
        setup({ HBlinded: 1, uinwater: 0 });
        await flooreffects(makeObj(LONG_SWORD, WEAPON_CLASS), HX, HY, 'drop');
        assert.ok(messages().some((m) => m.includes('Splash!')), 'C :278 Splash on surface');
    });

    it('submerged blind hero dropping bulky obj: silent', async () => {
        setup({ HBlinded: 1, uinwater: 1 });
        await flooreffects(makeObj(LONG_SWORD, WEAPON_CLASS), HX, HY, 'drop');
        const ms = messages();
        assert.ok(!ms.some((m) => m.includes('Splash!')), 'C :277 silent underwater');
        assert.ok(!ms.some((m) => m.includes('Plop!')), 'C :277 silent underwater');
    });

    it('dead u.Underwater flat alone still Splashes (live bit rules)', async () => {
        setup({ HBlinded: 1, uinwater: 0, Underwater: 1 });
        await flooreffects(makeObj(LONG_SWORD, WEAPON_CLASS), HX, HY, 'drop');
        assert.ok(messages().some((m) => m.includes('Splash!')), 'sticky flat must not gate C silence');
    });

    it('surface levitating hero dropping light obj: Plop!', async () => {
        setup({ HLevitation: 1, uinwater: 0 });
        await flooreffects(makeObj(GOLD_PIECE, COIN_CLASS), HX, HY, 'drop');
        assert.ok(messages().some((m) => m.includes('Plop!')), 'C :280 Plop on surface');
    });

    it('submerged levitating hero dropping light obj: silent', async () => {
        setup({ HLevitation: 1, uinwater: 1 });
        await flooreffects(makeObj(GOLD_PIECE, COIN_CLASS), HX, HY, 'drop');
        const ms = messages();
        assert.ok(!ms.some((m) => m.includes('Splash!')), 'C :277 silent underwater');
        assert.ok(!ms.some((m) => m.includes('Plop!')), 'C :277 silent underwater');
    });
});
