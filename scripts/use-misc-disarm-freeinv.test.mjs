import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { use_misc } from '../js/muse.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames, WEAPON_CLASS, TOOL_CLASS } from '../js/objects.js';
import {
    OBJ_INVENT, OBJ_FLOOR, W_WEP, IN_SIGHT, COULD_SEE,
} from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: muse.c use_misc MUSE_BULLWHIP `:2549–2615` — `:2596–2597`
// remove_worn_item + freeinv, then `:2598–2613` where_to 1/2/3
// (floor-at-mon / floor-at-hero / mon-invent). C freeinv
// (invent.c:1403–1409) extracts via extract_nobj, which sets
// where=OBJ_FREE (mkobj.c:2612); C place_object `:2325–2327` panics
// on a non-free obj. JS called a local freeinv_hero (muse.js:289)
// that unlinked invent but never cleared where, so the case-1
// place_object threw `obj not free [3]`, voiding
// scen-sweep-Archeologist-50055101 + scen-sweep-Samurai-50055051 +
// scen-worldtour-Wizard-49955018 + scen-worldtour-Wizard-49955024
// (the scorer misattributes throw-voids to the first C draw,
// randomize_gem_colors o_init.c:89). The arm now calls the live
// whole freeinv (js/invent.js:9791).
const DAGGER = objectNames.indexOf('DAGGER');
const BULLWHIP = objectNames.indexOf('BULLWHIP');
const PM_GNOME = monsterNames.indexOf('PM_GNOME');
const MUSE_BULLWHIP = 8; // js/muse.js:242 (local const, mirrors C)
assert.ok(DAGGER >= 0 && BULLWHIP >= 0 && PM_GNOME >= 0);

function setup() {
    resetGame();
    reset_display_messages();
    resetInputState();
    pushKeys(['\n', '\n', '\n', '\n', '\n']); // --More-- prompts on the 3-pline arm
    // First draw must be where_to=rn2(4)=1 (case 1: floor at mon):
    // precheck draws nothing for an uncursed tool, twoweap is off so
    // the uswapwep rn2(2) is skipped.
    initRng(0);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    const uwep = {
        otyp: DAGGER, oclass: WEAPON_CLASS, quan: 1, invlet: 'a',
        cursed: 0, bknown: 0, dknown: 0, known: 0, owornmask: W_WEP,
        where: OBJ_INVENT, no_charge: 0, timed: 0, spe: 0, nobj: null,
    };
    game.invent = [uwep];
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uwep, uswapwep: null, uquiver: null, twoweap: 0,
    };
    game.youmonst = { data: mons(monsterNames.indexOf('PM_HUMAN')) };
    game.flags = { verbose: true };
    game.fmon = [];
    game.fobj = null;
    game.moves = 0;
    const viz = [];
    viz[10] = [];
    viz[10][28] = IN_SIGHT | COULD_SEE;
    game.viz_array = viz;
    game._muse = {
        offensive: null, has_offense: 0,
        defensive: null, has_defense: 0,
        misc: { otyp: BULLWHIP, oclass: TOOL_CLASS, cursed: 0 },
        has_misc: MUSE_BULLWHIP,
        trapx: 0, trapy: 0,
    };
    return {
        mx: 28, my: 10, mux: 30, muy: 10,
        mcan: 0, mcanmove: 1, mcansee: 1, msleeping: 0,
        mblinded: 0, minvis: 0, mundetected: 0,
        mtame: 0, mpeaceful: 0,
        data: mons(PM_GNOME),
        uwep,
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('use_misc MUSE_BULLWHIP frees uwep before place (muse.c:2596-2613)', () => {
    it('case 1 lands the yanked uwep on the floor at the mon', async () => {
        const mtmp = setup();
        const uwep = mtmp.uwep;
        // Pre-fix: throws `place_object: obj "dagger" [3] not free`.
        const ret = await use_misc(mtmp);
        assert.equal(ret, 1);
        assert.equal(game.u.uwep, null);
        assert.ok(!game.invent.includes(uwep));
        assert.equal(uwep.where, OBJ_FLOOR);
        assert.equal(uwep.ox, 28);
        assert.equal(uwep.oy, 10);
        assert.equal(game.fobj, uwep);
    });

    it('case 1 prints the yanks-from-hand message', async () => {
        const mtmp = setup();
        await use_misc(mtmp);
        const text = messages().join('\n');
        assert.match(text, /yanks .* from your hand!/);
    });
});
