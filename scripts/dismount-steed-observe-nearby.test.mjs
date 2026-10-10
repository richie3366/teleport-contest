import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { dismount_steed } from '../js/steed.js';
import { mons, monsterNames } from '../js/monsters.js';
import { ROOM, DISMOUNT_GENERIC, IN_SIGHT, COULD_SEE, OBJ_FLOOR } from '../js/const.js';
import { POTION_CLASS, POT_WATER } from '../js/generated/objects_data.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: teleport.c teleds `:525` — `u_on_newpos(nux, nuy)` — dungeon.c
// `:1596–1599` same-level `see_nearby_objects()` (display.c
// `:1576–1601`): a dismount that lands the hero near an undiscovered
// floor potion observes it (dknown=1, specific color).
// JS ran the dismount move through teleds_simple (js/steed.js:465), a
// placement subset that open-coded ux/uy and never called u_on_newpos,
// so the potion stayed generic-gray (dknown 0) where C paints its
// shuffled color (scen-sweep-Valkyrie-95323 step 482: `!` color 8 vs
// C color 13). Fix: teleds_simple awaits the live u_on_newpos export.
// Staging: mounted hero at (30,10), all-ROOM, one dknown=0 water potion
// orthogonally adjacent at (31,10) — any landing square is within
// neardist (max dist² 5 ≤ 6), so the post-dismount observe is
// unconditional. DISMOUNT_GENERIC (no switch messages).

const PM_PONY = monsterNames.indexOf('PM_PONY');
assert.ok(PM_PONY >= 0);
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

const HX = 30;
const HY = 10;
const PX = HX + 1;
const PY = HY;

function setup({ seed = 95323 } = {}) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(seed);
    if (!game.objects) { init_objects(); initRng(seed); }
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, ux0: HX, uy0: HY,
        uz: { dnum: 0, dlevel: 14 }, uz0: { dnum: 0, dlevel: 14 },
        dx: 0, dy: 0, uswallow: 0, ustuck: 0, uinwater: 0,
        utrap: 0, utraptype: 0, uwep: null, uball: null,
        Swimming: 1,
        ualign: { type: 1, record: 0, abuse: 0 }, uconduct: {},
        Stunned: 0, Confusion: 0, Fumbling: 0,
        HWounded_legs: 0, EWounded_legs: 0, Wounded_legs: 0,
        HLevitation: 0, ELevitation: 0, BLevitation: 0, BFlying: 0,
        umonnum: PM_HUMAN,
        ulevel: 30, uexp: 0, urexp: 0,
    };
    game.youmonst = { mx: HX, my: HY, data: mons(PM_HUMAN) };
    const cells = new Map();
    const mkcell = () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 1, wall_info: 0, doormask: 0 });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, mkcell());
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    const viz = [];
    for (let y = HY - 2; y <= HY + 2; y++) {
        viz[y] = [];
        for (let x = HX - 2; x <= HX + 2; x++) viz[y][x] = IN_SIGHT | COULD_SEE;
    }
    game.viz_array = viz;
    game.moves = 100;
    game.flags = { verbose: true };
    game._objects_at = new Map();
    game._level_monsters = new Map();
    resetInputState();
    pushKeys('   ');
    const steed = {
        mx: HX, my: HY, data: mons(PM_PONY), mnum: PM_PONY,
        mhp: 20, mhpmax: 20, mtame: 0, mpeaceful: 0, isminion: 0,
        malign: 0,
        mtrapped: 0, minvent: null, misc_worn_check: 0, mstate: 0,
        mundetected: 0, minvis: 0, mcanmove: 1, mconf: 0, mstun: 0, mblinded: 0,
    };
    game.u.usteed = steed;
    game.fmon = [steed];
    const potion = {
        otyp: POT_WATER, oclass: POTION_CLASS, where: OBJ_FLOOR,
        ox: PX, oy: PY, quan: 1, spe: 0, dknown: 0, known: 0,
        blessed: 0, cursed: 0, bknown: 0, oartifact: 0,
        nobj: null, nexthere: null,
    };
    game._objects_at.set(`${PX},${PY}`, potion);
    return { steed, potion };
}

describe('dismount_steed observes nearby floor items via teleds u_on_newpos (teleport.c:525)', () => {
    it('undiscovered adjacent potion is dknown after the dismount move', async () => {
        const { potion } = setup();
        assert.equal(potion.dknown | 0, 0);
        await dismount_steed(DISMOUNT_GENERIC);
        assert.equal(game.u.usteed, null);
        assert.equal(potion.dknown | 0, 1);
    });
});
