import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { dismount_steed } from '../js/steed.js';
import { mons, monsterNames } from '../js/monsters.js';
import { POOL, ROOM, DISMOUNT_GENERIC, IN_SIGHT, COULD_SEE } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { level_mon_at } from '../js/worm.js';

// C ref: steed.c dismount_steed `:724–731` — a grounded steed over a pool
//   `if (!Underwater) pline("%s falls into the %s!", Monnam(mtmp),
//        surface(u.ux, u.uy));`
//   `if (!cant_drown(mdat)) { killed(mtmp); adjalign(-1); }`
// with Underwater ≡ u.uinwater (youprop.h:279).
// The JS gate read the sticky `u.Underwater` flat (zero writers anywhere
// in js/ — dead false), so a submerged hero dismounting over a pool got
// «falls into the water!» where C stays silent (already underwater). Fix
// (D-3400 idiom): read the live `(u.uinwater | 0)` bit, same expression
// as the use_saddle gate (js/steed.js:281, D-3723) and the can_ride
// disjunct (:211, D-3722).
// Staging: hero mounted on a tame pony over POOL at (30,10), ROOM around,
// DISMOUNT_GENERIC (no switch messages). Swimming:1 keeps the surface
// control out of float_down's drown() — the steed pline under test is
// upstream of it. Message ring via window_inited
// (breamm-mcan-cough-gate.test.mjs precedent).

const PM_PONY = monsterNames.indexOf('PM_PONY');
assert.ok(PM_PONY >= 0);
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

const HX = 30;
const HY = 10;

function setup({ hero = {}, seed = 3724 } = {}) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(seed);
    if (!game.objects) { init_objects(); initRng(seed); }
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, ux0: HX, uy0: HY, uz: { dnum: 0, dlevel: 1 },
        dx: 0, dy: 0, uswallow: 0, ustuck: 0, uinwater: 0,
        utrap: 0, utraptype: 0, uwep: null, uball: null,
        Swimming: 1,
        ualign: { type: 1, record: 0, abuse: 0 }, uconduct: {},
        Stunned: 0, Confusion: 0, Fumbling: 0,
        HWounded_legs: 0, EWounded_legs: 0, Wounded_legs: 0,
        HLevitation: 0, ELevitation: 0, BLevitation: 0, BFlying: 0,
        umonnum: PM_HUMAN,
        // MAXULEV keeps xkilled's experience() below newexplevel's
        // pluslvl (which plines → bot() → 'bot before init' headless).
        ulevel: 30, uexp: 0, urexp: 0,
        ...hero,
    };
    game.youmonst = { mx: HX, my: HY, data: mons(PM_HUMAN) };
    const cells = new Map();
    const mkcell = (typ) => ({ typ, lit: 0, flags: 0, glyph: 0, roomno: 0, wall_info: 0, doormask: 0 });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, mkcell(x === HX && y === HY ? POOL : ROOM));
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
    pushKeys('   '); // spare --More-- continuations, if any
    // Untame + non-peaceful: xkilled's mtame arm (adjalign(-15) +
    // thunder pline) and mpeaceful arm (adjalign(-5)) stay out, so the
    // only align delta is dismount's adjalign(-1). Tameness is
    // irrelevant to the C gate under test.
    const steed = {
        mx: HX, my: HY, data: mons(PM_PONY), mnum: PM_PONY,
        mhp: 20, mhpmax: 20, mtame: 0, mpeaceful: 0, isminion: 0,
        malign: 0,
        mtrapped: 0, minvent: null, misc_worn_check: 0, mstate: 0,
        mundetected: 0, minvis: 0, mcanmove: 1, mconf: 0, mstun: 0, mblinded: 0,
    };
    game.u.usteed = steed;
    game.fmon = [steed];
    return { steed };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('dismount_steed pool-drop gate reads live uinwater (steed.c:726, youprop.h:279)', () => {
    it('submerged (uinwater=1): silent drop, steed drowns, align -1', async () => {
        const { steed } = setup({ hero: { uinwater: 1 } });
        await dismount_steed(DISMOUNT_GENERIC);
        const msgs = messages();
        assert.ok(!msgs.some((m) => m.includes('falls into')), `submerged must stay silent, got: ${JSON.stringify(msgs)}`);
        assert.deepEqual(msgs, ['You kill the pony!']);
        assert.equal(steed.mhp | 0, 0);
        // Dead mons stay on fmon until dmonsfree (C-faithful, m_at
        // D-1231); death is mhp 0 + off the map grid.
        assert.equal(level_mon_at(HX, HY), null);
        assert.equal(game.u.ualign.record | 0, -1);
        assert.equal(game.u.usteed, null);
    });

    it('surface control (uinwater=0): falls-into pline, steed drowns, align -1', async () => {
        const { steed } = setup({ hero: { uinwater: 0 } });
        await dismount_steed(DISMOUNT_GENERIC);
        const msgs = messages();
        assert.ok(msgs.some((m) => m.includes('falls into')), `surface must pline, got: ${JSON.stringify(msgs)}`);
        assert.equal(steed.mhp | 0, 0);
        assert.equal(game.u.ualign.record | 0, -1);
        assert.deepEqual(msgs, ['The pony falls into the water!  You kill the pony!']);
    });

    it('dead u.Underwater flat alone still plines (live bit rules)', async () => {
        setup({ hero: { uinwater: 0, Underwater: 1 } });
        await dismount_steed(DISMOUNT_GENERIC);
        const msgs = messages();
        assert.ok(msgs.some((m) => m.includes('falls into')), `dead flat must not gate, got: ${JSON.stringify(msgs)}`);
        assert.deepEqual(msgs, ['The pony falls into the water!  You kill the pony!']);
    });
});
