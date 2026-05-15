// trap.js — Hero stepping on floor traps (dotrap + trapeffect subset).
// C ref: trap.c dotrap(), floor_trigger(), check_in_air(), trapeffect_selector()
//        hero cases; trap.h fixed_tele_trap(); mondata.h is_clinger (M1_CLING).
// domagictrap() shares makemon.js stub; seffects (fate 20) / full destroy_items TODO.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { vision_recalc } from './vision.js';
import { rn2, rnd, rn1, d } from './rng.js';
import { nomul, fallAsleep } from './timeout.js';
import { seetrap, trapTypName, delTrap, feeltrap } from './search.js';
import { adjattrib, exercise } from './attrib.js';
import { makemon } from './makemon.js';
import {
    tMissile,
    dmgval,
    maybeHalfPhys,
    thitu,
    obfree,
    poisoned,
    losehp,
    OBJ_ARROW,
    OBJ_DART,
    OBJ_ROCK,
} from './mthrowu.js';
import { placeFloorObject } from './floorobj.js';
import { raceptr, breathless, passesRocks } from './mondata.js';
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
    In_endgame,
    isok,
    NO_MM_FLAGS,
    A_CHA,
    A_CON,
    A_STR,
    STONE,
    DOOR,
    D_CLOSED,
    D_LOCKED,
    IS_WALL,
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

/** C: mon.c wake_nearto — wake sleeping monsters in range; stub until fmon. */
function wakeNearto(_x, _y, _dist) {
    void _x;
    void _y;
    void _dist;
}

function heroDeaf(u) {
    return (u.timed?.deaf ?? 0) > 0;
}

/** C: youprop.h resists_blnd(&youmonst) — stub false until props port. */
function resistsBlnd() {
    return !!(game.u?.resists_blind);
}

function heroBlind() {
    const u = game.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

function mAt(x, y) {
    return game.level?.monsters?.find((m) => m.mx === x && m.my === y) ?? null;
}

/** C: mondata.h pm_invisible — stub false until polymorph data is wired. */
function pmInvisible(_ptr) {
    void _ptr;
    return false;
}

function trapArticle(trap, ttyp) {
    if (ttyp === ARROW_TRAP && !trap.madeby_u) return 'an';
    return trap.madeby_u ? 'your' : 'a';
}

/** C: dog.c tamedog — stub until pet code exists. */
function tamedogStub() {
    return false;
}

/**
 * C: trap.c dofiretrap(struct obj *box) with box null — floor magic fire; destroy_items deferred.
 */
async function dofiretrapHeroNoBox() {
    const u = game.u;
    if (!u) return;
    const origDmg = d(2, 4);
    let num = origDmg;
    await pline('A tower of flame erupts from the floor!');
    if (u.Fire_resistance) {
        num = rn2(2);
    } else {
        num = d(2, 4);
        if ((u.uhpmax ?? 1) > 1) {
            const cap = Math.min(u.uhpmax ?? 1, num + 1);
            u.uhpmax -= rn2(cap);
        }
        if ((u.uhp ?? 0) > (u.uhpmax ?? 1)) u.uhp = u.uhpmax;
    }
    if (!num) await pline('You are uninjured.');
    else u.uhp = Math.max(0, (u.uhp ?? 0) - num);
    if (rn2(3)) {
        void origDmg;
        /* C: destroy_items(&gy.youmonst, AD_FIRE, orig_dmg); ignite_items — not ported */
    }
    game.disp = game.disp || {};
    game.disp.botl = true;
}

/**
 * C: trap.c domagictrap(void) — magic trap secondary effects (makemon uses makemon.js stub).
 */
async function domagictrap() {
    const u = game.u;
    if (!u) return;

    const fate = rnd(20);

    if (fate < 10) {
        const cnt = rnd(4);
        u.timed = u.timed || { blind: 0, deaf: 0 };

        if (!resistsBlnd()) {
            await pline('You are momentarily blinded by a flash of light!');
            u.timed.blind = (u.timed.blind ?? 0) + rn1(5, 10);
        } else if (!heroBlind()) {
            await pline('You see a flash of light!');
        }

        if (!heroDeaf(u)) {
            await pline('You hear a deafening roar!');
            u.timed.deaf = (u.timed.deaf ?? 0) + rn1(20, 30);
        } else {
            await pline('You feel rankled.');
            u.timed.deaf = (u.timed.deaf ?? 0) + rn1(5, 15);
        }
        game.disp = game.disp || {};
        game.disp.botl = true;

        for (let i = cnt; i > 0; i--) {
            makemon(null, u.ux, u.uy, NO_MM_FLAGS);
        }
        wakeNearto(u.ux, u.uy, 7 * 7);
    } else {
        switch (fate) {
        case 10:
            break;
        case 11: {
            await pline('You hear a low hum.');
            const ptr = raceptr(game.youmonst);
            if (!u.HInvis) {
                if (!heroBlind()) {
                    const seeInv = !!u.See_invisible;
                    await pline(
                        seeInv
                            ? 'Gee!  All of a sudden, you can see right through yourself.'
                            : "Gee!  All of a sudden, you can't see yourself.",
                    );
                }
            } else if (!u.EInvis && !pmInvisible(ptr)) {
                if (!heroBlind()) {
                    if (!u.See_invisible) await pline('You can see yourself again!');
                    else await pline("You can't see through yourself anymore.");
                }
            } else {
                await pline(`You feel a little more ${u.HInvis ? 'obvious' : 'hidden'} now.`);
            }
            u.HInvis = u.HInvis ? 0 : 1;
            newsym(u.ux, u.uy);
            break;
        }
        case 12:
            await dofiretrapHeroNoBox();
            break;
        case 13:
            await pline('A shiver runs up and down your spine!');
            break;
        case 14:
            await pline(u.Hallucination ? 'You hear the moon howling at you.' : 'You hear distant howling.');
            break;
        case 15:
            await pline(
                u.Hallucination ? 'You suddenly yearn for Cleveland.' : 'You suddenly yearn for your distant homeland.',
            );
            break;
        case 16:
            await pline('Your pack shakes violently!');
            break;
        case 17:
            await pline(u.Hallucination ? 'You smell hamburgers.' : 'You smell charred flesh.');
            break;
        case 18:
            await pline('You feel tired.');
            break;
        case 19: {
            adjattrib(A_CHA, 1, false);
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (!isok(u.ux + i, u.uy + j)) continue;
                    const mtmp = mAt(u.ux + i, u.uy + j);
                    if (mtmp) tamedogStub();
                }
            }
            break;
        }
        case 20:
            /* C: seffects(SPE_REMOVE_CURSE) — not ported */
            break;
        default:
            break;
        }
    }
}

/**
 * C: trap.c trapeffect_magic_trap — hero.
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
    } else {
        await domagictrap();
    }
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
        if (heroDeaf(u)) await pline('A board beneath you vibrates.');
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

/** C: monster.c next_to_u — stub true until ball&chain / engulfer checks exist. */
function nextToU() {
    return true;
}

/** C: hack.c blocks_move-style check for hero standing on (x,y). */
function cellBlocksHero(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc) return true;
    if (loc.typ === STONE) return true;
    if (IS_WALL(loc.typ)) return true;
    if (loc.typ === DOOR && (loc.doormask & (D_CLOSED | D_LOCKED))) return true;
    return false;
}

/**
 * C: teleport.c tele_trap(struct trap *trap) — subset (fixed dest move; tele() TODO).
 */
async function trapeffectTelepHero(trap) {
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    if (In_endgame(u.uz) || u.Antimagic || u.noteleport) {
        await pline('You feel a wrenching sensation.');
        return;
    }
    if (!nextToU()) {
        await pline('You shudder for a moment.');
        return;
    }
    if (trap.once) {
        delTrap(trap);
        newsym(u.ux, u.uy);
        return;
    }
    const dx = trap.launch?.x;
    const dy = trap.launch?.y;
    if (fixedTeleTrap(trap) && isok(dx, dy) && !cellBlocksHero(dx, dy) && !mAt(dx, dy)) {
        const ox = u.ux, oy = u.uy;
        u.ux0 = ox;
        u.uy0 = oy;
        u.ux = dx;
        u.uy = dy;
        newsym(ox, oy);
        vision_recalc(1);
        newsym(dx, dy);
        return;
    }
    /* C: tele() — random level teleport; not ported */
    await pline('You feel disoriented for a moment.');
}

/** C: trap.c trapeffect_arrow_trap — hero. */
async function trapeffectArrowHero(trap) {
    const u = game.u;
    if (!u) return;
    if (trap.once && trap.tseen && !rn2(15)) {
        await pline('You hear a loud click!');
        delTrap(trap);
        newsym(u.ux, u.uy);
        vision_recalc(1);
        return;
    }
    trap.once = 1;
    seetrap(trap);
    await pline('An arrow shoots out at you!');
    const otmp = tMissile(OBJ_ARROW, trap);
    const ref = { o: otmp };
    const dam = maybeHalfPhys(dmgval(otmp, game.youmonst));
    if (u.usteed && !rn2(2) && false) {
        /* C: steedintrap — not ported */
    } else if (await thitu(8, dam, ref, 'arrow')) {
        obfree(ref.o);
        ref.o = null;
    } else if (ref.o) {
        placeFloorObject(ref.o, u.ux, u.uy);
        newsym(u.ux, u.uy);
    }
}

/** C: trap.c trapeffect_dart_trap — hero. */
async function trapeffectDartHero(trap) {
    const u = game.u;
    if (!u) return;
    const oldumort = u.umortality ?? 0;
    if (trap.once && trap.tseen && !rn2(15)) {
        await pline('You hear a soft click.');
        delTrap(trap);
        newsym(u.ux, u.uy);
        vision_recalc(1);
        return;
    }
    trap.once = 1;
    seetrap(trap);
    await pline('A little dart shoots out at you!');
    const otmp = tMissile(OBJ_DART, trap);
    if (!rn2(6)) otmp.opoisoned = 1;
    const ref = { o: otmp };
    const dam = maybeHalfPhys(dmgval(otmp, game.youmonst));
    if (u.usteed && !rn2(2) && false) {
        /* C: steedintrap — not ported */
    } else if (await thitu(7, dam, ref, 'little dart')) {
        if (ref.o) {
            if (ref.o.opoisoned) {
                await poisoned('dart', A_CON, 'little dart', (u.umortality ?? 0) > oldumort ? 0 : 10, true);
            }
            obfree(ref.o);
            ref.o = null;
        }
    } else if (ref.o) {
        placeFloorObject(ref.o, u.ux, u.uy);
        newsym(u.ux, u.uy);
    }
}

/** C: do_wear.c hard_helmet — is_helmet && (is_metallic || is_crackable); materials from objclass.h */
function hardHelmet(obj) {
    if (!obj) return false;
    const m = obj.oc_material;
    if (m === 11 || m === 12 || m === 13) return true; /* IRON, METAL, COPPER */
    if (m === 19) return true; /* GLASS — crackable helms */
    return !!(obj.oc_crackable);
}

/** C: trap.c trapeffect_rocktrap — hero. */
async function trapeffectRockHero(trap) {
    const u = game.u;
    if (!u) return;
    const ptr = raceptr(game.youmonst);
    if (trap.once && trap.tseen && !rn2(15)) {
        await pline('A trap door in the ceiling opens, but nothing falls out!');
        delTrap(trap);
        newsym(u.ux, u.uy);
        vision_recalc(1);
        return;
    }
    const dmg0 = d(2, 6);
    trap.once = 1;
    feeltrap(trap);
    const otmp = tMissile(OBJ_ROCK, trap);
    placeFloorObject(otmp, u.ux, u.uy);
    let dmg = dmg0;
    let harmless = false;
    await pline('A trap door in the ceiling opens and a rock falls on your head!');
    const helm = u.uarmh;
    if (helm) {
        if (passesRocks(ptr)) {
            await pline('Unfortunately, you are wearing a helmet.');
            dmg = 2;
        } else if (hardHelmet(helm)) {
            await pline('Fortunately, you are wearing a hard helmet.');
            dmg = 2;
        } else if (game.flags?.verbose) {
            await pline('Your headgear does not protect you.');
        }
    } else if (passesRocks(ptr)) {
        await pline('It passes harmlessly through you.');
        harmless = true;
    }
    newsym(u.ux, u.uy);
    if (!harmless) {
        losehp(maybeHalfPhys(dmg), 'falling rock', 0);
        exercise(A_STR, false);
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
    case ARROW_TRAP:
        await trapeffectArrowHero(trap);
        break;
    case DART_TRAP:
        await trapeffectDartHero(trap);
        break;
    case ROCKTRAP:
        await trapeffectRockHero(trap);
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
    case TELEP_TRAP:
        await trapeffectTelepHero(trap);
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
