import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { return_from_mtoss } from '../js/mthrowu.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames, WEAPON_CLASS, TOOL_CLASS } from '../js/objects.js';
import { ART_SUNSWORD } from '../js/generated/artifacts_data.js';
import { ROOM, IN_SIGHT, COULD_SEE } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';

// C ref: mthrowu.c return_from_mtoss `:850–965` — the notcaught tail
// (`:960`) gates the recalc on the full `obj_sheds_light(otmp)`
// predicate (light.c:763–775: obj_is_burning ≡ lamplit && (ignitable
// || artifact_light)), AFTER the `:942` snuff_candle +
// ship/flooreffects/place+stack sequence. JS read bare
// `otmp.lamplit` (js/mthrowu.js:1148), so a lamplit-but-not-burning
// object (e.g. a dagger left lit) forced a vision recalc C skips.
// Fix: call the live obj_sheds_light export (js/light.js:239), the
// dothrow.js:2667–2668 idiom. Snap path (seed 3733 → made_it_back 0)
// drives the notcaught tail on plain ROOM floor; game.vision_full_recalc
// is zeroed before each call so the flag is the predicate's verdict.

const DAGGER = objectNames.indexOf('DAGGER');
assert.ok(DAGGER >= 0);
const MAGIC_LAMP = objectNames.indexOf('MAGIC_LAMP');
assert.ok(MAGIC_LAMP >= 0);
const LONG_SWORD = objectNames.indexOf('LONG_SWORD');
assert.ok(LONG_SWORD >= 0);
const PM_GNOME = monsterNames.indexOf('PM_GNOME');
assert.ok(PM_GNOME >= 0);

function setup(otmp) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(3733);
    if (!game.objects) { init_objects(); initRng(3733); }
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
    };
    game.youmonst = { mx: 30, my: 10, data: mons(monsterNames.indexOf('PM_HUMAN')) };
    const cells = new Map();
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, { typ: ROOM, lit: 0, flags: 0, glyph: 0, roomno: 0, wall_info: 0 });
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
    game.flags = { verbose: true, acoustics: true };
    game._objects_at = new Map();
    game.bhitpos = { x: 28, y: 10 };
    game.vision_full_recalc = 0;
    const magr = {
        mx: 28, my: 10, mconf: 1, mstun: 0, mblinded: 0,
        minvis: 1, mundetected: 0, mhp: 50, mcanmove: 1,
        data: mons(PM_GNOME),
    };
    return { magr, otmp };
}

function mkobj(otyp, oclass, extra = {}) {
    return {
        otyp, oclass, spe: 0, owt: 10, quan: 1,
        oartifact: 0, lamplit: 0, ox: 0, oy: 0, where: 0,
        nexthere: null, nobj: null,
        ...extra,
    };
}

describe('return_from_mtoss notcaught recalc reads obj_sheds_light (mthrowu.c:960)', () => {
    it('unlit dagger: no recalc (control)', async () => {
        const { magr, otmp } = setup(mkobj(DAGGER, WEAPON_CLASS));
        await return_from_mtoss(magr, otmp, false);
        assert.equal(game.vision_full_recalc, 0);
    });

    it('lamplit-but-not-burning dagger: no recalc (C light.c:770–775)', async () => {
        const { magr, otmp } = setup(mkobj(DAGGER, WEAPON_CLASS, { lamplit: 1 }));
        await return_from_mtoss(magr, otmp, false);
        assert.equal(game.vision_full_recalc, 0);
    });

    it('lit magic lamp: recalc (ignitable disjunct control)', async () => {
        const { magr, otmp } = setup(mkobj(MAGIC_LAMP, TOOL_CLASS, { lamplit: 1, spe: 1 }));
        await return_from_mtoss(magr, otmp, false);
        assert.equal(game.vision_full_recalc, 1);
    });

    it('lit Sunsword: recalc (artifact_light disjunct control)', async () => {
        const { magr, otmp } = setup(mkobj(LONG_SWORD, WEAPON_CLASS, { lamplit: 1, oartifact: ART_SUNSWORD }));
        await return_from_mtoss(magr, otmp, false);
        assert.equal(game.vision_full_recalc, 1);
    });
});
