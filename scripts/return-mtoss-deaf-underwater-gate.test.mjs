import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { return_from_mtoss } from '../js/mthrowu.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames, WEAPON_CLASS } from '../js/objects.js';
import { POOL, ROOM, IN_SIGHT, COULD_SEE } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';

// C ref: mthrowu.c return_from_mtoss `:850–965` — the land/thud arms
// (`:909` `:918`) gate their You_hear on plain `!Deaf`, and the
// notcaught Splash!/Plop! arm (`:952–957`) gates the pline on
// `!Deaf && !Underwater` (Deaf ≡ youprop.h:125
// HDeaf||EDeaf||uroleplay.deaf, Underwater ≡ youprop.h:279 u.uinwater),
// with NO acoustics arm. JS read raw `game.u?.Deaf` (zero writers,
// stuck false) at all three gates plus the sticky `game.u?.Underwater`
// flat (zero writers, dead false) at the Splash gate, so a macro-deaf
// hero heard the land/thud/Splash where C stays silent, and a
// submerged hero heard the Splash C suppresses. Live readers:
// hero_Deaf (js/monmove.js:1197, already imported by mthrowu.js :84;
// its extra `|| u.Deaf` is dead code — zero writers — so the gate is
// exactly the C macro) and the live `u.uinwater` bit (D-3400 idiom).
// The land/thud emits are live You_hear (js/hack.js:193), whose inner
// gate already silences Deaf-aware heroes — so the observable delta
// there is the macro-deaf + Unaware hero (usleep + multi<0), who
// dreams the landing audibly where C stays silent (dbridge D-3714
// precedent). The Splash emit is a plain pline, so Deaf-aware heroes
// show that delta directly. Soundeffect :953 stays named (no-op
// macro port, per the row). An iron dagger (owt 10 > 9) Splashes.
// Seeds pin the rn2 draws: 3733 → made_it_back 0 (snap path);
// 3701 → back + rn2(2) 0 (land arm); 3700 → back + rn2(2) 1 (thud).

const DAGGER = objectNames.indexOf('DAGGER');
assert.ok(DAGGER >= 0);
const PM_GNOME = monsterNames.indexOf('PM_GNOME');
assert.ok(PM_GNOME >= 0);

function setup({ hero = {}, multi = 0, seed = 3733, poolSquare = true } = {}) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(seed);
    if (!game.objects) { init_objects(); initRng(seed); }
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        ...hero,
    };
    game.youmonst = { mx: 30, my: 10, data: mons(monsterNames.indexOf('PM_HUMAN')) };
    const cells = new Map();
    const mkcell = (typ) => ({ typ, lit: 0, flags: 0, glyph: 0, roomno: 0, wall_info: 0 });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, mkcell(poolSquare && x === 28 && y === 10 ? POOL : ROOM));
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    const viz = [];
    viz[10] = [];
    viz[10][28] = IN_SIGHT | COULD_SEE;
    viz[10][30] = IN_SIGHT | COULD_SEE;
    game.viz_array = viz;
    game.fmon = [];
    game.moves = 100;
    game.multi = multi;
    game.flags = { verbose: true, acoustics: true };
    game._objects_at = new Map();
    game.bhitpos = { x: 28, y: 10 };
    // mconf: impaired, skips the second rn2(100) by short-circuit;
    // minvis: canseemon false (mon_visible, no hero See_invisible).
    const magr = {
        mx: 28, my: 10, mconf: 1, mstun: 0, mblinded: 0,
        minvis: 1, mundetected: 0, mhp: 50, mcanmove: 1,
        data: mons(PM_GNOME),
    };
    const otmp = {
        otyp: DAGGER, oclass: WEAPON_CLASS, spe: 0, owt: 10, quan: 1,
        oartifact: 0, lamplit: 0, ox: 0, oy: 0, where: 0,
        nexthere: null, nobj: null,
    };
    return { magr, otmp };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('return_from_mtoss land/thud/Splash read the Deaf macro + live uinwater (mthrowu.c:909/:918/:952)', () => {
    it('snap-path control: non-deaf surface hero hears snap + Splash! (C :940/:952–957)', async () => {
        const { magr, otmp } = setup();
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), ['You hear a loud snap!  Splash!']);
    });

    it('snap-path EDeaf aware: silent — snap inside You_hear, no Splash (C :952)', async () => {
        const { magr, otmp } = setup({ hero: { EDeaf: 1 } });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), []);
    });

    it('snap-path HDeaf aware: silent (C :952)', async () => {
        const { magr, otmp } = setup({ hero: { HDeaf: 1 } });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), []);
    });

    it('snap-path roleplay-deaf aware: silent (C :952)', async () => {
        const { magr, otmp } = setup({ hero: { uroleplay: { deaf: 1 } } });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), []);
    });

    it('snap-path submerged: snap barely heard, no Splash (C :952 Underwater)', async () => {
        const { magr, otmp } = setup({ hero: { uinwater: 1 } });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), ['You barely hear a loud snap!']);
    });

    it('snap-path dead-flat pin: u.Underwater alone still Splashes (live bit rules)', async () => {
        const { magr, otmp } = setup({ hero: { Underwater: 1 } });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), ['You hear a loud snap!  Splash!']);
    });

    it('land-arm control: non-deaf hero hears the landing (C :909–911)', async () => {
        const { magr, otmp } = setup({ seed: 3701, poolSquare: false });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), ['You hear Something land near it.']);
    });

    it('land-arm EDeaf + Unaware: silent, no landing dream (C :909)', async () => {
        const { magr, otmp } = setup({ seed: 3701, poolSquare: false, hero: { EDeaf: 1, usleep: 1 }, multi: -1 });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), []);
    });

    it('thud-arm control: non-deaf hero hears the thud (C :918–921)', async () => {
        const { magr, otmp } = setup({ seed: 3700, poolSquare: false });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), ['You hear something hit it with a thud!']);
    });

    it('thud-arm EDeaf + Unaware: silent, no thud dream (C :918)', async () => {
        const { magr, otmp } = setup({ seed: 3700, poolSquare: false, hero: { EDeaf: 1, usleep: 1 }, multi: -1 });
        await return_from_mtoss(magr, otmp, false);
        assert.deepEqual(messages(), []);
    });
});
