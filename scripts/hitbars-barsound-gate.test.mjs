import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { hit_bars } from '../js/mthrowu.js';
import { objectNames, WEAPON_CLASS } from '../js/objects.js';
import { ROOM } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: mthrowu.c hit_bars `:1417–1495` — the barsound arm (`:1447–1470`)
// gates the Whang/Whap/Flapp/Clink/Clonk pline on plain `!Deaf`
// (`:1447`), Deaf ≡ youprop.h:125 (HDeaf || EDeaf || uroleplay.deaf),
// with NO acoustics arm. JS read raw `game.u?.Deaf` (zero writers,
// stuck false) plus an invented `|| acoustics === false`, so a
// macro-deaf hero heard the barsound where C stays silent, and an
// acoustics-off hero never saw the pline C prints. Live reader:
// hero_Deaf (js/monmove.js, D-3572 pattern; its extra `|| u.Deaf` is
// dead code — zero writers — so the gate is exactly the C macro).
// An iron dagger (WEAPON_CLASS, IRON) never breaks (breaktest false),
// is neither harmless nor flimsy, so C prints "Clonk!" (`:1467`).

const DAGGER = objectNames.indexOf('DAGGER');
assert.ok(DAGGER >= 0);

function setup({ hero = {}, flags = {} } = {}) {
    reset_display_messages();
    clear_nhwindow_message();
    initRng(3713);
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        ...hero,
    };
    game.youmonst = { mx: 30, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 0, flags: 0, glyph: 0, roomno: 0, wall_info: 0 }),
        flags: {}, traps: [], rooms: [],
    };
    game.viz_array = undefined;
    game.fmon = [];
    game.moves = 100;
    game.flags = { verbose: true, acoustics: true, ...flags };
    return {
        obj: { otyp: DAGGER, oclass: WEAPON_CLASS, spe: 0, owt: 10, oartifact: 0 },
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('hit_bars barsound reads the Deaf macro, no acoustics arm (mthrowu.c:1447)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves,
            flags: game.flags, iflags: game.iflags,
            viz_array: game.viz_array,
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
        game.viz_array = saved.viz_array;
    });

    it('non-deaf control: dagger rings "Clonk!" and stays intact (C :1466–1467)', async () => {
        const objp = setup();
        await hit_bars(objp, 30, 10, 31, 10, 0);
        assert.deepEqual(messages(), ['Clonk!']);
        assert.ok(objp.obj, 'missile intact');
    });

    it('EDeaf: silent (youprop.h:125)', async () => {
        const objp = setup({ hero: { EDeaf: 1 } });
        await hit_bars(objp, 30, 10, 31, 10, 0);
        assert.deepEqual(messages(), []);
        assert.ok(objp.obj, 'missile intact');
    });

    it('HDeaf: silent (youprop.h:125)', async () => {
        const objp = setup({ hero: { HDeaf: 1 } });
        await hit_bars(objp, 30, 10, 31, 10, 0);
        assert.deepEqual(messages(), []);
        assert.ok(objp.obj, 'missile intact');
    });

    it('roleplay-deaf: silent (youprop.h:125)', async () => {
        const objp = setup({ hero: { uroleplay: { deaf: 1 } } });
        await hit_bars(objp, 30, 10, 31, 10, 0);
        assert.deepEqual(messages(), []);
        assert.ok(objp.obj, 'missile intact');
    });

    it('acoustics-off: pline still prints (C has no acoustics arm)', async () => {
        const objp = setup({ flags: { acoustics: false } });
        await hit_bars(objp, 30, 10, 31, 10, 0);
        assert.deepEqual(messages(), ['Clonk!']);
        assert.ok(objp.obj, 'missile intact');
    });
});
