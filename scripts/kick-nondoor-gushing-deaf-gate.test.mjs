import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { dokick } from '../js/dokick.js';
import { mons, monsterNames } from '../js/monsters.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { ROOM, SINK } from '../js/const.js';

// C ref: dokick.c kick_nondoor `:1212–1214` — the black-pudding sink arm
// prints `if (!Deaf) You_hear("a gushing sound.")` when Blind, where Deaf
// is the youprop.h:125 macro (HDeaf || EDeaf || uroleplay.deaf). The raw
// `!(u.Deaf || u.HDeaf)` read dropped EDeaf/uroleplay.deaf, so an
// extrinsic/roleplay-deaf + Unaware blind hero dreamed the gushing
// (You_hear's Unaware arm bypasses its inner Deaf silence) where C's
// outer `!Deaf` stays silent. Live reader: hero_Deaf (js/monmove.js,
// D-3572 pattern; kick_door precedent D-3704).
// kick_nondoor is module-local (C staticfn), so this drives the exported
// dokick: blind hero at (5,5) kicking east at a sink, seed 11 puts the
// klunk gate at rn2(5)=0 and the pudding gate at rn2(3)=0.

const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);
const PM_BLACK_PUDDING = monsterNames.indexOf('PM_BLACK_PUDDING');
assert.ok(PM_BLACK_PUDDING >= 0);

const SEED = 11;

function setup(hero = {}, multi = 0) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(SEED);
    enableRngLog();
    globalThis.__NH_RNG_TRACE = true;
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    // 'l' answers getdir east; trailing blanks cover any --More--.
    pushKeys(['l', ' ', ' ', ' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        Blind: 1,
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        acurr: { a: [8, 8, 8, 8, 8, 8] },
        abon: { a: [0, 0, 0, 0, 0, 0] },
        atemp: { a: [0, 0, 0, 0, 0, 0] },
        ...hero,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.flags = { verbose: true };
    game.multi = multi;
    game.moves = 0;
    game.fmon = [];
    game.invent = [];
    // Fresh sink cell per run (the arm sets S_LPUDDING on looted).
    const sinkLoc = { typ: SINK, doormask: 0, looted: 0 };
    const floorLoc = { typ: ROOM, doormask: 0 };
    game.level = {
        flags: {},
        at: (x, y) => ((x === 6 && y === 5) ? sinkLoc : floorLoc),
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('kick_nondoor pudding arm reads the Deaf macro (dokick.c:1213)', () => {
    it('blind non-deaf control: gates draw 0,0 → hears the gushing', async () => {
        setup();
        await dokick();
        assert.deepEqual(messages(), ['You hear a gushing sound.']);
        assert.deepEqual(getRngLog().slice(0, 2), [
            'rn2(5)=0 @ kick_nondoor(dokick.js:748)',
            'rn2(3)=0 @ kick_nondoor(dokick.js:755)',
        ]);
    });

    it('EDeaf + Unaware blind: silent (C outer !Deaf)', async () => {
        setup({ EDeaf: 1, usleep: 1 }, -1);
        await dokick();
        assert.deepEqual(messages(), []);
    });

    it('uroleplay.deaf + Unaware blind: silent (C outer !Deaf)', async () => {
        setup({ uroleplay: { deaf: 1 }, usleep: 1 }, -1);
        await dokick();
        assert.deepEqual(messages(), []);
    });

    it('HDeaf + Unaware blind control: silent (old gate already covered)', async () => {
        setup({ HDeaf: 1, usleep: 1 }, -1);
        await dokick();
        assert.deepEqual(messages(), []);
    });

    it('EDeaf aware blind control: silent via You_hear inner gate (no delta)', async () => {
        setup({ EDeaf: 1 });
        await dokick();
        assert.deepEqual(messages(), []);
    });
});
