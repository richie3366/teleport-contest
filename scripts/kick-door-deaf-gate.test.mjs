import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { dokick } from '../js/dokick.js';
import { mons, monsterNames } from '../js/monsters.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { DOOR, ROOM, D_CLOSED } from '../js/const.js';

// C ref: dokick.c kick_door `:966` — the fail arm prints
// `pline("%s!!", (Deaf || !rn2(3)) ? "Thwack" : "Whammm")` where Deaf is
// the youprop.h:125 macro (HDeaf || EDeaf || uroleplay.deaf): a deaf hero
// short-circuits to Thwack WITHOUT drawing rn2(3). The raw `u.Deaf` read
// (zero writers — stuck false) burned the draw and could print Whammm.
// Live reader: hero_Deaf (js/monmove.js, D-3572 pattern).
// kick_door is module-local (C staticfn), so this drives the exported
// dokick: hero at (5,5) kicking east at a CLOSED door, seed 1 puts the
// bust roll at rnl(35)=14 (fail vs avrg 8) and the gate at rn2(3)=1.

const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

const SEED = 1;

function setup(hero = {}) {
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
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        acurr: { a: [8, 8, 8, 8, 8, 8] },
        abon: { a: [0, 0, 0, 0, 0, 0] },
        atemp: { a: [0, 0, 0, 0, 0, 0] },
        ...hero,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.flags = { verbose: true };
    game.multi = 0;
    game.moves = 0;
    game.fmon = [];
    game.invent = [];
    // Fresh door cell per run (kick_door mutates doormask on bust).
    const doorLoc = { typ: DOOR, doormask: D_CLOSED };
    const floorLoc = { typ: ROOM, doormask: 0 };
    game.level = {
        flags: {},
        at: (x, y) => ((x === 6 && y === 5) ? doorLoc : floorLoc),
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

function gateDraws() {
    return getRngLog().filter((e) => e.includes('rn2(3)'));
}

describe('kick_door fail arm reads the Deaf macro (dokick.c:966)', () => {
    it('non-deaf control: bust fails, gate draws rn2(3)=1 → Whammm', async () => {
        setup();
        await dokick();
        assert.deepEqual(messages(), ['Whammm!!']);
        assert.deepEqual(gateDraws(), ['rn2(3)=1 @ kick_door(dokick.js:505)']);
    });

    it('HDeaf hero: short-circuits to Thwack, no rn2(3)', async () => {
        setup({ HDeaf: 1 });
        await dokick();
        assert.deepEqual(messages(), ['Thwack!!']);
        assert.deepEqual(gateDraws(), []);
    });

    it('EDeaf hero: short-circuits to Thwack, no rn2(3)', async () => {
        setup({ EDeaf: 1 });
        await dokick();
        assert.deepEqual(messages(), ['Thwack!!']);
        assert.deepEqual(gateDraws(), []);
    });

    it('uroleplay.deaf hero: short-circuits to Thwack, no rn2(3)', async () => {
        setup({ uroleplay: { deaf: 1 } });
        await dokick();
        assert.deepEqual(messages(), ['Thwack!!']);
        assert.deepEqual(gateDraws(), []);
    });

    it('u.Deaf flag hero: Thwack (dead-code disjunct, D-3572)', async () => {
        setup({ Deaf: 1 });
        await dokick();
        assert.deepEqual(messages(), ['Thwack!!']);
        assert.deepEqual(gateDraws(), []);
    });
});
