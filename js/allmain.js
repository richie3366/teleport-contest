// allmain.js — Main game loop.
// C ref: allmain.c — newgame, moveloop, moveloop_core.
//
// Uses fastforward.js for startup RNG gaps not yet covered by ported init
// (see .cursor/plans/nethack-port/10-moveloop-detect-c-map.md). mklev.js
// owns structural dungeon generation.

import { game } from './gstate.js';
import { mklev, l_nhcore_init, u_on_upstairs } from './mklev.js';
import { rhack } from './cmd.js';
import { docrt, cls, bot, flush_screen, pline } from './display.js';
import { vision_recalc, vision_reset, init_vision_globals } from './vision.js';
import { fastforward_pre_mklev, fastforward_post_mklev, fastforward_fill_mineralize } from './fastforward.js';
import { movemon, MOVE_MON_HARNESS_MAX_STEP } from './monmove.js';
import { mcalcMoveLikeC } from './mcalc_move.js';
import { end_of_turn_rng, gethungry } from './moveloop_aux.js';
import { initIniInvStub } from './ini_inv_stub.js';
import { applyInitAttrPipeline } from './u_init_attr.js';
import { applyBirthHpEnergy } from './u_init_hp_energy.js';
import { applyRoleStartingUmoney0 } from './u_init_money.js';
import { applyAdjabil } from './u_init_adjabil.js';
import { findAc } from './u_init_find_ac.js';
import { applyHiddenGoldToUmoney0 } from './u_init_hidden_gold.js';
import { applySkillInit } from './u_init_skills.js';
import { UHS, collectNewuhsPlines } from './hunger.js';
import { collectExerchkPlines } from './attrib.js';
import { moveloopPreamble } from './moveloop_preamble.js';
import { settrack } from './track.js';
import { initMvitalsStub } from './mvitals.js';
import { pullDueMeltIceAwayTimers } from './level_timers.js';
import { meltIceAt } from './melt_ice.js';
import { runDueNhObjTimers } from './obj_timeout_dispatch.js';
import { bootstrapSpLevchnMinesMinetnFromBranchStubLikeC } from './sp_levchn.js';

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
    g.dungeons = [{ dname: 'The Dungeons of Doom', depth_start: 1, num_dunlevs: 30, flags: { hellish: 0 } }];
    g.u = g.u || {};
    g.u.dx |= 0;
    g.u.dy |= 0;
    g.u.uz = { dnum: 0, dlevel: 1 };
    g.context = g.context || {};
    if (g.context.next_attrib_check == null) g.context.next_attrib_check = 600;
    g.context.victual = { eating: 0, fullwarn: 0, canchoke: 1 };
    /* C: decl.c mvitals — stub array for mon.c make_corpse G_NOCORPSE / geno */
    initMvitalsStub(g);

    g.flags = g.flags || {};
    /* C: hack.c flags.terrainstatus — gate classify_terrain; default on for new games */
    if (g.flags.terrainstatus === undefined) g.flags.terrainstatus = true;
    // Gnomish Mines branch stub (end1 on D:1)
    g.branches = [
        { end1: { dnum: 0, dlevel: 1 }, end2: { dnum: 2, dlevel: 1 }, end1_up: true },
    ];
    /* C: dungeon topology — mines **`dnum`** for **`In_mines`** / future **`sp_levchn`** */
    if (g.branches[0]?.end2?.dnum != null) g.mines_dnum = g.branches[0].end2.dnum | 0;
    bootstrapSpLevchnMinesMinetnFromBranchStubLikeC(g);
    // Real mklev generates the level with correct room positions
    // Structural phase consumes RNG for rooms/corridors/doors/stairs
    await mklev();

    // Fill rooms + mineralize: replayed by fastforward
    // These create objects/monsters that don't affect terrain display
    fastforward_fill_mineralize();

    // Fast-forward through post-mklev startup RNG calls.
    // Covers: u_init_role, ini_inv, attributes, moveloop_preamble.
    fastforward_post_mklev();

    /* C: u_init.c u_init_inventory_attrs — u.umoney0 from u_init_role before ini_inv / init_attr */
    applyRoleStartingUmoney0();

    /* C: u_init.c u_init_inventory_attrs — init_attr(75); vary_init_attr(); */
    applyInitAttrPipeline(75);
    /* C: u_init.c u_init_misc — newhp()/newpw() before adjabil; peaks same as max at birth */
    applyBirthHpEnergy();

    // Hardcoded player state for early stub.
    // Contestants: port u_init / invent (g._goldCount follows u.umoney0; applyHiddenGoldToUmoney0 adds sack gold when g.invent exists).
    g.u.umortality = 0;
    g.u.Half_physical_damage = 0;
    g.u.uexp = 0;
    g.u.ualign = g.u.ualign || { type: 0, record: 0 };
    g.u.uhs = UHS.NOT_HUNGRY; /* port eat.c / moveloop when hunger advances */
    /* C: eat.c init_uhunger — u.uhunger = 900 (NOT_HUNGRY band for exerper) */
    g.u.uhunger = 900;
    g.u.near_capacity = 0; /* C: near_capacity(); port invent weight when ready */
    g.u.Levitation = 0;
    g.u.HLevitation = 0;
    g.u.ELevitation = 0;
    g.u.BLevitation = 0; /* youprop.h BLevitation — switch_terrain FROMOUTSIDE block */
    g.u.Flying = 0;
    g.u.HFlying = 0;
    g.u.EFlying = 0;
    g.u.BFlying = 0;
    g.u.BStealth = 0; /* youprop.h BStealth — polyself.c steed_vs_stealth FROMOUTSIDE when mounted */
    g.u.Fumbling = 0;
    g.u.Sleep_resistance = 0;
    g.u.timed = { blind: 0, deaf: 0 };
    g.u.resists_blind = 0;
    g.u.See_invisible = 0;
    g.u.Fire_resistance = 0;
    g.u.Wwalking = 0; /* youprop.h WATER — water walking (boots); trap.c lava_effects / drown */
    g.u.Cold_resistance = 0;
    g.u.HInvis = 0;
    g.u.EInvis = 0;
    g.u.Antimagic = 0;
    g.u.noteleport = 0;
    g.u.Hallucination = 0;
    g.u.Poison_resistance = 0;
    g.u.Stealth = 0;
    g.u.Fast = 0;
    g.u.HRegeneration = 0; /* prop.c — intrinsic; high bits (e.g. FROMFORM) when poly grants from form */
    g.u.ERegeneration = 0; /* extrinsic sources bitmask (eat.c gethungry excludes W_ARTI|W_WEP) */
    g.u.Hunger = 0;
    g.u.Breathless = 0; /* eat.c choke */
    g.u.Strangled = 0;
    /* C: prop.h Slimed — timeout.c burn_away_slime / make_slimed; no slime timer yet */
    g.u.Slimed = 0;
    g.u.HConflict = 0;
    g.u.EConflict = 0; /* extrinsic conflict sources (gethungry excludes W_ARTI only) */
    g.u.HWarning = 0;
    g.u.EWarning = 0; /* youprop.h Warning — ice melt timer plines in spoteffects */
    g.u.HWarn_of_mon = 0;
    g.u.EWarn_of_mon = 0; /* youprop.h Warn_of_mon — display.h sensemon / shop angry_guards */
    g.u.HTelepat = 0;
    g.u.ETelepat = 0; /* Blind + sensemon subset for spoteffects surprise */
    g.u.uwep = null;
    g.u.uswapwep = null;
    g.u.twoweap = false;
    g.u.uarmh = null;
    g.u.uarms = null;
    g.u.uarmc = null;
    g.u.uarm = null;
    g.u.uarmu = null;
    g.u.uarmg = null; /* gloves — port invent wear when ready */
    /* C: you.h uhave — eat.c gethungry switch case 16 (carried real Amulet) */
    g.u.uhave = { amulet: 0 };
    g.u.uamul = null;
    g.u.uleft = null;
    g.u.uright = null;
    g.u.Unaware = 0; /* eat.c gethungry — asleep / !rn2(10) metabolic branch */
    g.u.EProtection = 0; /* prop.c subset — wear.js refreshEProtectionFromRings sets W_RING* from rings */
    /* C: u_init.c u_init_misc — adjabil(0, 1) while u.ulevel == 0 */
    applyAdjabil(0, 1);
    /* C: u_init.c u_init_role — u.ulevel after adjabil; XL 1 for new hero */
    g.u.ulevel = 1;
    g.u.ulevelmax = 1;
    /* C: exper.c losexp — u.uhpinc[u.ulevel] / u.ueninc[u.ulevel] after XL is known (bootstrap until pluslvl). */
    g.u.uhpinc = g.u.uhpinc || [];
    g.u.ueninc = g.u.ueninc || [];
    g.u.uhpinc[1] = g.u.uhpmax | 0;
    g.u.ueninc[1] = g.u.uenmax | 0;
    g.multi = 0; /* C: gm.multi — multi-turn actions / occupation */
    g.moves = 1;
    // When non-zero, moveloop_core runs movemon + end-of-turn tail (harness).
    // moves starts at 1 so the first post-newgame moveloop still runs the step-0
    // template (a no-op) before the first real key, matching upstream pacing.
    g._prevMoveTick = 1;
    g.plname = g.plname || 'Contestant';
    g.u.left_handed = true;
    initIniInvStub(g);
    /* C: u_init.c u_init_inventory_attrs — u.umoney0 += hidden_gold(TRUE) after invent */
    applyHiddenGoldToUmoney0(g);
    /* C: u_init.c u_init_skills_discoveries — skill_init() before find_ac (weapon_type on g.invent when linked) */
    applySkillInit(g);
    /* C: u_init.c u_init_skills_discoveries — find_ac() after invent (worn gear stubbed) */
    findAc();

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

    // Welcome message (C: u_init.c / pline welcome — role-specific interjection)
    const t = g.u?.ualign?.type ?? 0;
    const alignName = t === 0 ? 'neutral' : t > 0 ? 'lawful' : 'chaotic';
    const genderAdj = g.flags?.female ? 'female' : 'male';
    const raceAdj = g.urace?.adj || 'human';
    const roleNm = g.flags?.female ? g.urole.name.f : g.urole.name.m;
    const hi = welcomeInterjectionLikeC(g);
    await pline(`${hi} ${g.plname}, welcome to NetHack!  You are a ${alignName} ${genderAdj} ${raceAdj} ${roleNm}.`);
}

/** C u_init.c — first word of welcome pline depends on role (tty sessions). */
function welcomeInterjectionLikeC(g) {
    const a = g.urole?.abbr;
    if (a === 'Tou') return 'Aloha';
    if (a === 'Sam') return 'Konnichi wa';
    if (a === 'Val') return 'Velkommen';
    if (a === 'Kni') return 'Salutations';
    return 'Hello';
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
            await movemon(stepNum);
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
        /* C: allmain.c moveloop_core — after mcalcdistress; before maybe_generate_rnd_mon / u_calc_moveamt:
         *   for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) mtmp->movement += mcalcmove(mtmp, TRUE); */
        for (const m of g.level?.monsters ?? []) {
            m.movement = (m.movement | 0) + mcalcMoveLikeC(m, true, g);
        }
        settrack();
        g.moves = (g.moves || 1) + 1;
        /* C: timeout.c level MELT_ICE_AWAY -> zap.c melt_ice_away */
        const dueMeltIce = pullDueMeltIceAwayTimers(g);
        for (const { x, y } of dueMeltIce) {
            g.context = g.context || {};
            const saveMonMoving = g.context.monMoving;
            g.context.monMoving = true;
            try {
                await meltIceAt(g, x, y, 'Some ice melts away.');
            } finally {
                g.context.monMoving = saveMonMoving;
            }
        }
        /* C: timeout.c nh_timeout() → run_timers() — object **`TIMER_OBJECT`** slice */
        runDueNhObjTimers(g);
        /* C: allmain.c — svm.moves++; … gethungry(); newuhs(TRUE); … exerchk(); */
        gethungry();
        for (const line of collectNewuhsPlines(true)) await pline(line);
        for (const line of collectExerchkPlines()) await pline(line);
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
