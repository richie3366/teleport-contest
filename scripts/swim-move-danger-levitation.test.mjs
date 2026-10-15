import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { swim_move_danger } from '../js/hack.js';
import { pooleffects } from '../js/pickup.js';
import { mons, monsterNames } from '../js/monsters.js';
import { MOAT, ROOM, LEVITATION, FLYING, PARANOID_SWIM } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: hack.c u_simple_floortyp `:1833–1848` — `:1835`
// `u_in_air = (Levitation || Flying || !grounded(youmonst.data))` reads the
// youprop.h macros (uprops H/E, blocked-aware). JS read only the dead
// u.Levitation/u.Flying summary flats (zero writers port-wide — the D-3810
// shape one function down), so a levitating/flying hero in a grounded
// form computed newtyp=POOL instead of ROOM, and swim_move_danger `:1893`
// fired the ParanoidSwim avoid + blocked the move where C proceeds
// silently (ROOM==ROOM). Forked scen-sweep-Archeologist-50255246 step
// 1886: C `rn2(5) @ distfleeck(monmove.c:538)` vs JS `rnd(20) @
// mattackm`, JS-only «You avoid floating into the moat.» (the scorer
// attributes the post-fork RNG to the distfleeck symptom owner; the
// D-3975 park stands — distfleeck itself is not re-ported here).
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

function setup(propIdx) {
    resetGame();
    reset_display_messages();
    resetInputState();
    pushKeys(Array(10).fill('\n')); // avoid + tip plines on the TRUE arm
    initRng(1);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    // C options.c:7173 default paranoia set includes swim.
    game.flags = { verbose: false, paranoia_bits: PARANOID_SWIM };
    game.context = {};
    // NOTE: levitation/flying via the uprops slot alone — the combined
    // u.Levitation/u.Flying flats are dead port-wide (D-3810); the union
    // must come from the slots.
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 }, uinwater: 0,
        Stunned: 0, Confusion: 0,
        uprops: propIdx == null ? {} : { [propIdx]: { extrinsic: 1 } },
    };
    game.youmonst = { data: mons(PM_HUMAN) }; // grounded form
    const cells = new Map();
    cells.set('5,5', { typ: ROOM, seenv: 1 });
    cells.set('6,5', { typ: MOAT, seenv: 1 });
    game.level = { at: (x, y) => cells.get(`${x},${y}`) ?? { typ: ROOM }, traps: [] };
}

describe('swim_move_danger u_in_air union (u_simple_floortyp :1835)', () => {
    it('levitating hero (uprops-only) floats over a seen moat: no avoid, move proceeds', async () => {
        setup(LEVITATION);
        assert.equal(await swim_move_danger(6, 5), false);
    });

    it('flying hero (uprops-only) flies over a seen moat: no avoid, move proceeds', async () => {
        setup(FLYING);
        assert.equal(await swim_move_danger(6, 5), false);
    });

    it('grounded hero with ParanoidSwim avoids the moat (control)', async () => {
        setup(null);
        assert.equal(await swim_move_danger(6, 5), true);
    });
});

// C ref: hack.c pooleffects `:3233–3309` — the `:3272` entering gate reads
// the same youprop.h Levitation/Flying macros (`!u.ustuck && !Levitation &&
// !Flying && is_pool_or_lava`). JS read the dead flats, so a levitating
// hero stepping onto the moat fell into drown() («You fall into the moat!
// You sink like a rock.») where C floats over silently. Post-fix the
// gate reads the D-3810 unions (imported from hack.js — same edge).
// NOTE: these its are green-only guards — pre-fix they route into drown()
// (unsafe as a maintained red); the authentic red is the corpus session
// itself (verify distfleeck pre-fix: JS-only fall+sink at step 1886).
describe('pooleffects entering gate u_in_air union (hack.c :3272)', () => {
    function setupOnMoat(propIdx) {
        setup(propIdx);
        game.u.ux = 6; // hero already on the moat square, spoteffects shape
        game.u.uy = 5;
    }

    it('levitating hero (uprops-only) on the moat: no drown, stays dry', async () => {
        setupOnMoat(LEVITATION);
        assert.equal(await pooleffects(true), false);
        assert.equal(game.u.uinwater | 0, 0);
    });

    it('flying hero (uprops-only) on the moat: no drown, stays dry', async () => {
        setupOnMoat(FLYING);
        assert.equal(await pooleffects(true), false);
        assert.equal(game.u.uinwater | 0, 0);
    });
});
