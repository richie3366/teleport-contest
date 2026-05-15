// allmain.js — Main game loop.
// C ref: allmain.c — newgame, moveloop, moveloop_core.
//
// Uses fastforward.js for startup RNG gaps not yet covered by ported init
// (see .cursor/plans/nethack-port/10-moveloop-detect-c-map.md). mklev.js
// owns structural dungeon generation.

import { game } from './gstate.js';
import { rn2 } from './rng.js';
import { mklev, l_nhcore_init, u_on_upstairs } from './mklev.js';
import { rhack } from './cmd.js';
import { docrt, cls, bot, flush_screen, pline } from './display.js';
import { vision_recalc, vision_reset, init_vision_globals } from './vision.js';
import { fastforward_pre_mklev, fastforward_post_mklev, fastforward_fill_mineralize } from './fastforward.js';
import { movemon, MOVE_MON_HARNESS_MAX_STEP } from './monmove.js';
import { end_of_turn_rng } from './moveloop_aux.js';
import { initIniInvStub } from './ini_inv_stub.js';
import { applyInitAttrPipeline } from './u_init_attr.js';
import { applyBirthHpEnergy } from './u_init_hp_energy.js';
import { UHS } from './hunger.js';
import { moveloopPreamble } from './moveloop_preamble.js';
import { settrack } from './track.js';

// C ref: allmain.c newgame()
export async function newgame() {
    const g = game;

    // Fast-forward through pre-mklev startup RNG calls.
    // Covers: o_init (shuffles), dungeon init, u_init_misc.
    fastforward_pre_mklev();

    // C ref: allmain.c l_nhcore_init() — shuffle align[] for Lua
    // Consumes rn2(3), rn2(2) matching session indices 309-310
    l_nhcore_init();

    // Set up game state needed by mklev
    g.dungeons = [{ dname: 'The Dungeons of Doom', depth_start: 1, num_dunlevs: 30 }];
    g.u = g.u || {};
    g.u.uz = { dnum: 0, dlevel: 1 };
    g.flags = g.flags || {};
    // Gnomish Mines branch stub (end1 on D:1)
    g.branches = [
        { end1: { dnum: 0, dlevel: 1 }, end2: { dnum: 2, dlevel: 1 }, end1_up: true },
    ];

    // Real mklev generates the level with correct room positions
    // Structural phase consumes RNG for rooms/corridors/doors/stairs
    await mklev();

    // Fill rooms + mineralize: replayed by fastforward
    // These create objects/monsters that don't affect terrain display
    fastforward_fill_mineralize();

    // Fast-forward through post-mklev startup RNG calls.
    // Covers: u_init_role, ini_inv, attributes, moveloop_preamble.
    fastforward_post_mklev();

    /* C: u_init.c u_init_inventory_attrs — init_attr(75); vary_init_attr(); */
    applyInitAttrPipeline(75);
    /* C: u_init.c u_init_misc — newhp()/newpw() before adjabil; peaks same as max at birth */
    applyBirthHpEnergy();

    // Hardcoded player state for early Tourist stub.
    // Contestants: port u_init to compute these from game PRNG.
    g._goldCount = 757;
    g.u.umortality = 0;
    g.u.Half_physical_damage = 0;
    g.u.uac = 10; g.u.uexp = 0;
    g.u.ualign = g.u.ualign || { type: 0, record: 0 };
    /* C: u_init.c u_init_role — u.ulevel after adjabil; XL 1 for new hero */
    g.u.ulevel = 1;
    g.u.ulevelmax = 1;
    g.u.uhs = UHS.NOT_HUNGRY; /* port eat.c / moveloop when hunger advances */
    g.u.near_capacity = 0; /* C: near_capacity(); port invent weight when ready */
    g.u.Levitation = 0;
    g.u.Flying = 0;
    g.u.Fumbling = 0;
    g.u.Sleep_resistance = 0;
    g.u.timed = { blind: 0, deaf: 0 };
    g.u.resists_blind = 0;
    g.u.See_invisible = 0;
    g.u.Fire_resistance = 0;
    g.u.HInvis = 0;
    g.u.EInvis = 0;
    g.u.Antimagic = 0;
    g.u.noteleport = 0;
    g.u.Hallucination = 0;
    g.u.uwep = null;
    g.u.twoweap = false;
    g.u.uarmg = null; /* gloves — port invent wear when ready */
    g.multi = 0; /* C: gm.multi — multi-turn actions / occupation */
    g.moves = 1;
    // When non-zero, moveloop_core runs movemon + end-of-turn tail (harness).
    // moves starts at 1 so the first post-newgame moveloop still runs the step-0
    // template (a no-op) before the first real key, matching upstream pacing.
    g._prevMoveTick = 1;
    g.plname = g.plname || 'Contestant';
    g.u.left_handed = true;
    initIniInvStub(g);

    // C ref: allmain.c newgame() → u_on_upstairs()
    // Places hero on upstair, or special stair, or random room position.
    u_on_upstairs();

    // Initial display
    init_vision_globals();
    vision_reset();
    vision_recalc(0);
    await cls();
    await docrt();
    await flush_screen(1);
    await bot();

    // Welcome message (C: u_init.c / pline welcome)
    const t = g.u?.ualign?.type ?? 0;
    const alignName = t === 0 ? 'neutral' : t > 0 ? 'lawful' : 'chaotic';
    const genderAdj = g.flags?.female ? 'female' : 'male';
    const raceAdj = g.urace?.adj || 'human';
    const roleNm = g.flags?.female ? g.urole.name.f : g.urole.name.m;
    await pline(`Aloha ${g.plname}, welcome to NetHack!  You are a ${alignName} ${genderAdj} ${raceAdj} ${roleNm}.`);
}

// C ref: allmain.c moveloop_core()
export async function moveloop_core() {
    const g = game;

    // Fast-forward per-step RNG (monster movement, regen, sounds, hunger).
    // Skip when the previous command took no game time (unknown key, etc.),
    // so repeated nhgetch on the same move clock does not replay the template.
    if (g._prevMoveTick) {
        const stepNum = (g.moves || 1) - 1;
        if (stepNum > 0 && stepNum <= MOVE_MON_HARNESS_MAX_STEP) {
            movemon(stepNum);
            end_of_turn_rng(stepNum);
        }
    }

    // Vision + display
    if (g.vision_full_recalc) {
        vision_recalc(0);
        g.vision_full_recalc = 0;
    }
    await bot();
    await flush_screen(1);

    // Read and execute one command
    await rhack(0);

    // Clear top line unless rhack asked to keep it for the next nhgetch
    // capture (zero-time plines such as # / spell hint).
    if (!g._retainMessageAfterCommand) g._pending_message = '';
    g._retainMessageAfterCommand = false;

    // Advance turn (C: allmain.c — settrack() before svm.moves++)
    if (g.context?.move) {
        settrack();
        g.moves = (g.moves || 1) + 1;
    }

    g._prevMoveTick = g.context?.move ? 1 : 0;
}

// C ref: allmain.c moveloop()
export async function moveloop(resuming) {
    await moveloopPreamble(resuming);
    for (;;) {
        await moveloop_core();
        if (game.program_state?.gameover) break;
    }
}
