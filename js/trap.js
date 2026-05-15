// trap.js — Hero stepping on floor traps (dotrap + trapeffect subset).
// C ref: trap.c dotrap(), floor_trigger(), check_in_air(), trapeffect_selector()
//        hero cases; trap.h fixed_tele_trap(); mondata.h is_clinger (M1_CLING).
//
// domagictrap() after magic_trap (non-explosion) is not ported yet; RNG will
// diverge there until makemon / timed props match upstream.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { vision_recalc } from './vision.js';
import { rn2, rnd } from './rng.js';
import { nomul, fallAsleep } from './timeout.js';
import { seetrap, trapTypName, delTrap } from './search.js';
import { raceptr, breathless } from './mondata.js';
import {
    NO_TRAP_FLAGS,
    FORCETRAP,
    FORCEBUNGLE,
    TOOKPLUNGE,
    FAILEDUNTRAP,
    VIASITTING,
    HURTLING,
    ARROW_TRAP,
    ANTI_MAGIC,
    MAGIC_PORTAL,
    VIBRATING_SQUARE,
    TELEP_TRAP,
    RUST_TRAP,
    SLP_GAS_TRAP,
    SQKY_BOARD,
    MAGIC_TRAP,
    DART_TRAP,
    ROCKTRAP,
    BEAR_TRAP,
    LANDMINE,
    ROLLING_BOULDER_TRAP,
    FIRE_TRAP,
    PIT,
    SPIKED_PIT,
    HOLE,
    TRAPDOOR,
    is_pit,
    is_hole,
    In_sokoban,
    isok,
} from './const.js';

const M1_CLING = 0x00000010;

const TRAP_NOTES = [
    'C', 'D flat', 'D', 'E flat', 'E', 'F', 'F sharp', 'G', 'G sharp', 'A', 'B flat', 'B',
];

/** C: trap.c trapnote() — squeaky board pitch (subset). */
function trapNote(trap) {
    const i = trap.tnote | 0;
    return i >= 0 && i < TRAP_NOTES.length ? TRAP_NOTES[i] : 'C';
}

function floorTrigger(ttype) {
    switch (ttype) {
    case ARROW_TRAP:
    case DART_TRAP:
    case ROCKTRAP:
    case SQKY_BOARD:
    case BEAR_TRAP:
    case LANDMINE:
    case ROLLING_BOULDER_TRAP:
    case SLP_GAS_TRAP:
    case RUST_TRAP:
    case FIRE_TRAP:
    case PIT:
    case SPIKED_PIT:
    case HOLE:
    case TRAPDOOR:
        return true;
    default:
        return false;
    }
}

function undestroyableTrap(ttype) {
    return ttype === MAGIC_PORTAL || ttype === VIBRATING_SQUARE;
}

/** C: trap.h fixed_tele_trap */
function fixedTeleTrap(trap) {
    const x = trap?.launch?.x;
    const y = trap?.launch?.y;
    return trap?.ttyp === TELEP_TRAP && isok(x, y) && x > 0;
}

function heroCheckInAir(trflags) {
    const u = game.u;
    if (!u) return false;
    const plunged = (trflags & (TOOKPLUNGE | VIASITTING)) !== 0;
    if ((trflags & HURTLING) !== 0) return true;
    if (u.Levitation) return true;
    if (u.Flying && !plunged) return true;
    return false;
}

/** C: mondata.h is_clinger + has_ceiling — ceiling stub true on normal levels. */
function isClinger(ptr) {
    return (ptr.mflags1 & M1_CLING) !== 0;
}

function hasCeiling() {
    return true;
}

function conjNonconjoinedPit(_trap) {
    void _trap;
    return false;
}

function adjNonconjoinedPit(_trap) {
    void _trap;
    return false;
}

/** C: trap.c mons_see_trap — monsters learn trap location; stub until fmon port. */
function monsSeeTrap() {
    void 0;
}

function trapArticle(trap, ttyp) {
    if (ttyp === ARROW_TRAP && !trap.madeby_u) return 'an';
    return trap.madeby_u ? 'your' : 'a';
}

/**
 * C: trap.c trapeffect_magic_trap — hero; explosion branch only for now.
 * @param {{ ttyp: number, tseen?: boolean, madeby_u?: boolean, tnote?: number, tx: number, ty: number, launch?: { x: number, y: number } }} trap
 */
async function trapeffectMagicHero(trap) {
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    if (!rn2(30)) {
        delTrap(trap);
        newsym(u.ux, u.uy);
        vision_recalc(1);
        await pline('You are caught in a magical explosion!');
        const dam = rnd(10);
        u.uhp = Math.max(0, (u.uhp ?? 0) - dam);
        await pline('Your body absorbs some of the magical energy!');
        u.uenmax = (u.uenmax ?? 0) + 2;
        u.uen = u.uenmax;
        game.disp = game.disp || {};
        game.disp.botl = true;
    }
    /* else: C calls domagictrap() — not ported (makemon / timed intrinsics). */
}

/**
 * C: trap.c trapeffect_sqky_board — hero branch (sound / Deaf simplified).
 * @param {{ ttyp: number, tseen?: boolean, madeby_u?: boolean, tnote?: number, tx: number, ty: number, launch?: { x: number, y: number } }} trap
 * @param {number} trflags
 */
async function trapeffectSqkyBoardHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    const forcetrap = (trflags & FORCETRAP) !== 0
        || (trflags & FAILEDUNTRAP) !== 0
        || (!!u.Flying && (trflags & VIASITTING) !== 0);

    if ((u.Levitation || u.Flying) && !forcetrap) {
        if (!u.ublind) {
            seetrap(trap);
            if (u.Hallucination) await pline('You notice a crease in the linoleum.');
            else await pline('You notice a loose board below you.');
        }
    } else {
        seetrap(trap);
        if (u.Deaf) await pline('A board beneath you vibrates.');
        else await pline(`A board beneath you squeaks ${trapNote(trap)} loudly.`);
    }
}

/** C: trap.c trapeffect_slp_gas_trap — hero. */
async function trapeffectSlpGasHero(trap) {
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    const ptr = raceptr(game.youmonst);
    if (u.Sleep_resistance || breathless(ptr)) {
        await pline('You are enveloped in a cloud of gas!');
    } else {
        await pline('A cloud of gas puts you to sleep!');
        fallAsleep(-rnd(25), true);
    }
}

/** C: trap.c trapeffect_rust_trap — hero; water_damage / inventory deferred. */
async function trapeffectRustHero() {
    const gush = 'A gush of water hits';
    switch (rn2(5)) {
    case 0:
        await pline(`${gush} you on the head!`);
        break;
    case 1:
        await pline(`${gush} your left arm!`);
        break;
    case 2:
        await pline(`${gush} your right arm!`);
        break;
    default:
        await pline(`${gush} you!`);
        break;
    }
}

/**
 * C: trap.c trapeffect_selector — hero-only subset.
 * @param {{ ttyp: number, tseen?: boolean, madeby_u?: boolean, tnote?: number, tx: number, ty: number, launch?: { x: number, y: number } }} trap
 * @param {number} trflags
 */
async function trapeffectHero(trap, trflags) {
    switch (trap.ttyp) {
    case SQKY_BOARD:
        await trapeffectSqkyBoardHero(trap, trflags);
        break;
    case SLP_GAS_TRAP:
        await trapeffectSlpGasHero(trap);
        break;
    case RUST_TRAP:
        seetrap(trap);
        await trapeffectRustHero();
        break;
    case MAGIC_TRAP:
        await trapeffectMagicHero(trap);
        break;
    default:
        seetrap(trap);
        break;
    }
}

/**
 * C: trap.c dotrap(struct trap *trap, unsigned trflags)
 * @param {{ ttyp: number, tseen?: boolean, madeby_u?: boolean, tnote?: number, tx: number, ty: number, launch?: { x: number, y: number } }|null|undefined} trap
 * @param {number} [trflags]
 */
export async function dotrap(trap, trflags = NO_TRAP_FLAGS) {
    if (!trap) return;
    const u = game.u;
    if (!u) return;

    const ttype = trap.ttyp;
    const alreadySeen = !!trap.tseen;
    let forcetrap = (trflags & FORCETRAP) !== 0 || (trflags & FAILEDUNTRAP) !== 0;
    const forcebungle = (trflags & FORCEBUNGLE) !== 0;
    const plunged = (trflags & TOOKPLUNGE) !== 0;
    const conjPit = conjNonconjoinedPit(trap);
    const adjPit = adjNonconjoinedPit(trap);

    nomul(0);

    if (fixedTeleTrap(trap)) {
        trflags |= FORCETRAP;
        forcetrap = true;
    }

    if (In_sokoban(u.uz) && (is_pit(ttype) || is_hole(ttype))) {
        const art = trapArticle(trap, ttype);
        const nm = trapTypName(ttype);
        await pline(`Air currents pull you down into ${art} ${nm}!`);
    } else if (!forcetrap) {
        if (floorTrigger(ttype) && heroCheckInAir(trflags)) {
            if (alreadySeen) {
                const art = trapArticle(trap, ttype);
                const nm = trapTypName(ttype);
                const verb = u.Levitation || u.Flying ? 'float' : 'step';
                await pline(`You ${verb} over ${art} ${nm}.`);
            }
            return;
        }
        const ptr = raceptr(game.youmonst);
        const fumbling = !!u.Fumbling;
        if (alreadySeen && !fumbling && !undestroyableTrap(ttype) && ttype !== ANTI_MAGIC
            && !forcebungle && !plunged && !conjPit && !adjPit
            && (!rn2(5) || (is_pit(ttype) && isClinger(ptr) && hasCeiling()))) {
            const art = trapArticle(trap, ttype);
            await pline(`You escape ${art} ${trapTypName(ttype)}.`);
            return;
        }
    }

    monsSeeTrap(trap);
    await trapeffectHero(trap, trflags);
}
