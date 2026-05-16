// trap.js — Hero stepping on floor traps (dotrap + trapeffect subset).
// C ref: trap.c dotrap(), floor_trigger(), check_in_air(), trapeffect_selector()
//        hero cases; trap.h fixed_tele_trap(); mondata.h is_clinger (M1_CLING).
// domagictrap() shares makemon.js stub; seffects (fate 20); burnarmor on fire trap TODO.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { vision_recalc } from './vision.js';
import { rn2, rnd, rn1, d } from './rng.js';
import { nomul, fallAsleep } from './timeout.js';
import { seetrap, trapTypName, delTrap, feeltrap, tAt } from './search.js';
import { adjattrib, exercise, acurr } from './attrib.js';
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
import { bimanual } from './weapon_kind.js';
import { waterDamageOne, splashLitOne, ER_NOTHING } from './water_damage.js';
import { updateInventory } from './invent.js';
import { placeFloorObject } from './floorobj.js';
import { goodposHero } from './walkable.js';
import { destroyItemsYoumonstFire } from './destroy_items.js';
import { igniteHeroInventory } from './ignite_items.js';
import {
    raceptr,
    breathless,
    passesRocks,
    amorphous,
    isWhirly,
    unsolid,
    MZ_SMALL,
    locomotion,
    webmaker,
} from './mondata.js';
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
    TT_BEARTRAP,
    TT_PIT,
    TT_WEB,
    RECURSIVETRAP,
    NOWEBMSG,
    LEVEL_TELEP,
    WEB,
    STATUE_TRAP,
    POLY_TRAP,
    is_pit,
    is_hole,
    In_sokoban,
    In_endgame,
    isok,
    NO_MM_FLAGS,
    A_CHA,
    A_CON,
    A_STR,
    A_DEX,
    KILLED_BY,
    PM_GREMLIN,
    PM_IRON_GOLEM,
} from './const.js';

const M1_CLING = 0x00000010;

/** C: trap.c trapeffect_landmine — static recursive_mine guard. */
let landmineRecursion = false;

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
 * C: trap.c dofiretrap(box null) — floor / magic fire; **`burn_away_slime`** TODO before destroy.
 * **`if (burnarmor(&youmonst) || rn2(3))`** — **`burnarmor`** not ported (treated false).
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
    /* C: burn_away_slime(); — timeout.c not wired here */
    const burnarmorStub = false;
    if (burnarmorStub || rn2(3)) {
        await destroyItemsYoumonstFire(game, origDmg);
        await igniteHeroInventory(game);
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

/** C: trap.c trapeffect_rust_trap — hero (water_damage, splash_lit subset; gremlin split_mon TODO). */
async function trapeffectRustHero() {
    const u = game.u;
    if (!u) return;
    const gush = 'A gush of water hits';
    const b = rn2(5);
    switch (b) {
    case 0:
        await pline(`${gush} you on the head!`);
        await waterDamageOne(u.uarmh ?? null, true, game);
        break;
    case 1: {
        await pline(`${gush} your left arm!`);
        const er = u.uarms ? await waterDamageOne(u.uarms, true, game) : ER_NOTHING;
        if (er !== ER_NOTHING) break;
        if (u.twoweap || (u.uwep && bimanual(u.uwep))) {
            const w = u.twoweap ? u.uswapwep : u.uwep;
            await waterDamageOne(w ?? null, true, game);
        }
        await waterDamageOne(u.uarmg ?? null, true, game);
        break;
    }
    case 2:
        await pline(`${gush} your right arm!`);
        await waterDamageOne(u.uwep ?? null, true, game);
        await waterDamageOne(u.uarmg ?? null, true, game);
        break;
    default:
        await pline(`${gush} you!`);
        for (let o = game.invent; o; o = o.nobj) {
            if ((o.lamplit | 0) && o !== u.uwep && (o !== u.uswapwep || !u.twoweap))
                await splashLitOne(o, game);
        }
        if (u.uarmc) await waterDamageOne(u.uarmc, true, game);
        else if (u.uarm) await waterDamageOne(u.uarm, true, game);
        else if (u.uarmu) await waterDamageOne(u.uarmu, true, game);
        break;
    }

    if ((u.umonnum | 0) === PM_IRON_GOLEM) {
        const dam = (u.mhmax ?? u.uhpmax ?? 0) | 0;
        await pline('You are covered with rust!');
        losehp(maybeHalfPhys(dam), 'rusting away', KILLED_BY);
    } else if ((u.umonnum | 0) === PM_GREMLIN && rn2(3)) {
        /* C: split_mon(&youmonst, 0) — PRNG inside split not replayed until mon.c port */
    }
    updateInventory();
}

/** C: monster.c next_to_u — stub true until ball&chain / engulfer checks exist. */
function nextToU() {
    return true;
}

/** C: teleport.c goodpos — hero may stand on (x,y) (tele trap launch, etc.). */
function cellBlocksHero(x, y) {
    return !goodposHero(x, y, game);
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

/** C: do_wear.c wearing_iron_shoes — objects[otyp].oc_material == IRON */
const OC_IRON = 11;

function wearingIronShoes(u) {
    const f = u?.uarmf;
    return !!(f && f.oc_material === OC_IRON);
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

/** C: trap.c trapeffect_fire_trap — hero. */
async function trapeffectFireHero(trap) {
    void trap;
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    await dofiretrapHeroNoBox();
}

/** C: trap.c trapeffect_bear_trap — hero. */
async function trapeffectBearHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    const forcetrap = (trflags & FORCETRAP) !== 0
        || (trflags & FAILEDUNTRAP) !== 0
        || ((trflags & VIASITTING) !== 0);
    if ((u.Levitation || u.Flying) && !forcetrap) return;

    const ptr = raceptr(game.youmonst);
    const a = trap.madeby_u ? 'Your' : 'The';
    feeltrap(trap);
    if (amorphous(ptr) || isWhirly(ptr) || unsolid(ptr)) {
        await pline(`${a} bear trap closes harmlessly through you.`);
        return;
    }
    if (!u.usteed && ptr.msize <= MZ_SMALL) {
        await pline(`${a} bear trap closes harmlessly over you.`);
        return;
    }
    u.utrap = rn1(4, 4);
    u.utraptype = TT_BEARTRAP;
    const dmg = d(2, 4);
    if (u.usteed) {
        await pline(`${a} bear trap closes on your steed's limbs!`);
        /* C: thitm(0, u.usteed, …); reset_utrap if steed dies — not ported */
    } else {
        await pline(`${a} bear trap closes on your foot!`);
        if (wearingIronShoes(u)) {
            await pline('Your iron shoes protect your leg.');
        } else {
            u.wounded_legs = rn1(10, 10);
            u.wounded_leg_side = rn2(2);
            losehp(maybeHalfPhys(dmg), 'bear trap', 0);
        }
    }
    exercise(A_DEX, false);
}

/** C: trap.c blow_up_landmine — scatter / terrain / drawbridge deferred. */
function blowUpLandmine(/** @type {{ tx: number, ty: number }} */ trap) {
    wakeNearto(trap.tx, trap.ty, 400);
    vision_recalc(1);
}

/** C: trap.c fill_pit — boulder fill / engraving cleanup deferred. */
function fillPit(_x, _y) {
    void _x;
    void _y;
}

/** C: trap.c steedintrap — returns non-zero if steed absorbed trap; not ported. */
function steedintrapStub() {
    return 0;
}

/** C: trap.c trapeffect_pit — hero (subset: no ball&chain, Punished, selftouch). */
async function trapeffectPitHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    const ttype = trap.ttyp;
    const plunged = (trflags & TOOKPLUNGE) !== 0;
    const viasitting = (trflags & VIASITTING) !== 0;
    const conjPit = conjNonconjoinedPit(trap);
    const adjPit = adjNonconjoinedPit(trap);
    const already_known = !!trap.tseen;
    let deliberate = false;

    if (!In_sokoban(u.uz) && (u.Levitation || (u.Flying && !plunged && !viasitting))) return;

    const ptr = raceptr(game.youmonst);
    feeltrap(trap);
    if (!In_sokoban(u.uz) && isClinger(ptr) && !plunged) {
        const sp = ttype === SPIKED_PIT ? 'spiked ' : '';
        const art = trap.madeby_u ? 'your' : 'a';
        if (already_known) {
            await pline(`You see ${art} ${sp}pit below you.`);
        } else {
            await pline(`${trap.madeby_u ? 'Your' : 'A'} ${ttype === SPIKED_PIT ? 'pit full of spikes ' : 'pit '}opens up under you!`);
            await pline("You don't fall in!");
        }
        return;
    }
    if (!In_sokoban(u.uz)) {
        const art = trap.madeby_u ? 'your' : 'a';
        if (u.usteed && (trflags & RECURSIVETRAP) !== 0) {
            await pline(`You and your steed fall into ${art} pit!`);
        } else if (conjPit) {
            await pline('You move into an adjacent pit.');
        } else if (adjPit) {
            await pline(`You stumble over debris${!rn2(5) ? ' between the pits' : ''}.`);
        } else if (game.iflags?.menu_requested && already_known) {
            await pline('You carefully lower yourself into the pit.');
            deliberate = true;
        } else {
            const v = !plunged ? 'fall' : (u.Flying ? 'dive' : 'plunge');
            await pline(`You ${v} into ${art} pit!`);
        }
    }
    let relevant_spikes = ttype === SPIKED_PIT;
    if (relevant_spikes && wearingIronShoes(u)) {
        await pline('Your iron shoes protect you from the sharp iron spikes.');
        relevant_spikes = false;
    } else if (relevant_spikes) {
        const pred = 'on a set of sharp iron spikes';
        if (u.usteed) {
            await pline(`Your steed ${conjPit ? 'steps' : 'lands'} ${pred}!`);
        } else {
            await pline(`You ${conjPit ? 'step' : 'land'} ${pred}!`);
        }
    }
    u.utrap = rn1(6, 2);
    u.utraptype = TT_PIT;
    if (!steedintrapStub()) {
        if (relevant_spikes) {
            const oldumort = u.umortality ?? 0;
            const spikeDam = rnd(conjPit ? 4 : adjPit ? 6 : 10);
            const killer = plunged
                ? 'deliberately plunged into a pit of iron spikes'
                : (conjPit || deliberate)
                    ? 'stepped into a pit of iron spikes'
                    : adjPit
                        ? 'stumbled into a pit of iron spikes'
                        : 'fell into a pit of iron spikes';
            losehp(maybeHalfPhys(spikeDam), killer, 0);
            if (!rn2(6)) {
                await poisoned(
                    'spikes',
                    A_STR,
                    (conjPit || adjPit || deliberate) ? 'stepping on poison spikes' : 'fall onto poison spikes',
                    (u.umortality ?? 0) > oldumort ? 0 : 8,
                    false,
                );
            }
        } else if (!conjPit && !deliberate && !(plunged && (u.Flying || isClinger(ptr)))) {
            const pitDam = rnd(adjPit ? 3 : 6);
            const killer = plunged ? 'deliberately plunged into a pit' : 'fell into a pit';
            losehp(maybeHalfPhys(pitDam), killer, 0);
        }
        vision_recalc(1);
        exercise(A_STR, false);
        exercise(A_DEX, false);
    }
    newsym(u.ux, u.uy);
}

/** C: trap.c trapeffect_landmine — hero. */
async function trapeffectLandmineHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    if (landmineRecursion) return;

    let damage = rnd(16);
    if (wearingIronShoes(u)) damage = Math.trunc((damage + 3) / 4);

    const already_seen = !!trap.tseen;
    const forcetrap = (trflags & FORCETRAP) !== 0 || (trflags & FAILEDUNTRAP) !== 0;
    const forcebungle = (trflags & FORCEBUNGLE) !== 0;

    if ((u.Levitation || u.Flying) && !forcetrap) {
        if (!already_seen && rn2(3)) return;
        feeltrap(trap);
        const there = already_seen ? 'There is' : 'You discover';
        const trig = trap.madeby_u ? 'the trigger of your mine' : 'a trigger';
        await pline(`${there} ${trig} in a pile of soil below you.`);
        if (already_seen && rn2(3)) return;
        const setter = forcebungle ? 'Your inept attempt sets' : 'The air currents set';
        const obj = already_seen ? (trap.madeby_u ? 'your land mine' : 'a land mine') : 'it';
        await pline(`KAABLAMM!!! ${setter} ${obj} off!`);
    } else {
        feeltrap(trap);
        await pline(`KAABLAMM!!! You triggered ${trap.madeby_u ? 'your' : 'a'} land mine!`);
        landmineRecursion = true;
        steedintrapStub();
        landmineRecursion = false;
        const wl = rn1(35, 41);
        const wr = rn1(35, 41);
        u.wounded_legs = Math.max(wl, wr);
        exercise(A_DEX, false);
    }
    trap.ttyp = PIT;
    trap.madeby_u = false;
    losehp(maybeHalfPhys(damage), 'land mine', 0);
    blowUpLandmine(trap);
    newsym(u.ux, u.uy);
    const t2 = tAt(u.ux, u.uy);
    if (t2) await dotrap(t2, RECURSIVETRAP);
    fillPit(u.ux, u.uy);
}

/** C: trap.c trapeffect_rolling_boulder_trap — hero (launch_obj not ported). */
async function trapeffectRollingBoulderHero(trap) {
    const u = game.u;
    if (!u) return;
    if (In_sokoban(u.uz)) return;
    feeltrap(trap);
    const click = heroDeaf(u) ? '' : 'Click! ';
    await pline(`${click}You trigger a rolling boulder trap!`);
    if (trap.tseen) await pline('No boulder was released.');
    else await pline('Fortunately for you, no boulder was released.');
    newsym(u.ux, u.uy);
}

/** C: trap.c trapeffect_hole — hero (fall_through / Can_fall_thru not ported). */
async function trapeffectHoleHero(trap, trflags) {
    void trflags;
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    /* C: fall_through(); level transition, branches, … */
    await pline(trap.ttyp === TRAPDOOR ? 'The trap door opens, and you fall through…' : 'The hole opens beneath you, and you fall through…');
    vision_recalc(1);
    newsym(u.ux, u.uy);
}

/** C: trap.c trapeffect_level_telep — hero (level_tele_trap not ported). */
async function trapeffectLevelTeleHero(trap, trflags) {
    void trflags;
    const u = game.u;
    if (!u) return;
    seetrap(trap);
    await pline('You are caught in a blast of kaleidoscopic light!');
    vision_recalc(1);
    newsym(u.ux, u.uy);
}

/** C: trap.c mu_maybe_destroy_web — hero amorphous / whirly / unsolid (burn branch deferred). */
async function muMaybeDestroyWebHero(trap, webmsgok) {
    const ptr = raceptr(game.youmonst);
    if (!(amorphous(ptr) || isWhirly(ptr) || unsolid(ptr))) return false;
    if (webmsgok) {
        const a = trap.madeby_u ? 'your' : 'the';
        await pline(`You flow through ${a} spider web.`);
    }
    return true;
}

/** C: trap.c trapeffect_web — hero (steed / mintrap / tear-web deferred). */
async function trapeffectWebHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    const webmsgok = (trflags & NOWEBMSG) === 0;
    const forcetrap = (trflags & FORCETRAP) !== 0 || (trflags & FAILEDUNTRAP) !== 0;
    const viasitting = (trflags & VIASITTING) !== 0;

    feeltrap(trap);
    if (await muMaybeDestroyWebHero(trap, webmsgok)) return;

    const ptr = raceptr(game.youmonst);
    if (webmaker(ptr)) {
        if (webmsgok) {
            await pline(trap.madeby_u ? 'You take a walk on your web.' : 'There is a spider web here.');
        }
        return;
    }
    if (webmsgok) {
        let verb;
        if (forcetrap || viasitting) verb = 'are caught by';
        else if (u.usteed) verb = 'lead your steed into';
        else verb = `${locomotion(ptr, 'stumble')} into`;
        const a = trap.madeby_u ? 'your' : 'a';
        await pline(`You ${verb} ${a} spider web!`);
    }

    const str = acurr(A_STR);
    let tim;
    if (str <= 3) tim = rn1(6, 6);
    else if (str < 6) tim = rn1(6, 4);
    else if (str < 9) tim = rn1(4, 4);
    else if (str < 12) tim = rn1(4, 2);
    else if (str < 15) tim = rn1(2, 2);
    else if (str < 18) tim = rnd(2);
    else if (str < 69) tim = 1;
    else {
        if (webmsgok) {
            const a = trap.madeby_u ? 'your' : 'the';
            await pline(`You tear through ${a} spider web!`);
        }
        delTrap(trap);
        newsym(u.ux, u.uy);
        return;
    }
    u.utrap = tim;
    u.utraptype = TT_WEB;
    newsym(u.ux, u.uy);
}

/** C: trap.c activate_statue_trap — animate_statue not ported. */
async function trapeffectStatueTrapHero(trap) {
    const u = game.u;
    if (!u) return;
    delTrap(trap);
    newsym(u.ux, u.uy);
    await pline('You trigger a statue trap, but nothing stirs.');
    vision_recalc(1);
}

/** C: trap.c trapeffect_anti_magic — hero subset (no costly_alteration / invent artifacts). */
async function trapeffectAntiMagicHero(trap) {
    const u = game.u;
    if (!u) return;

    const boots = u.uarmf;
    if (wearingIronShoes(u) && boots && (boots.spe ?? 0) > 0) {
        seetrap(trap);
        await pline(`A lethargic aura surrounds your ${boots.otypname ?? 'footwear'}.`);
        boots.spe = (boots.spe ?? 0) - 1;
        game.disp = game.disp || {};
        game.disp.botl = true;
        return;
    }

    seetrap(trap);
    if (u.Antimagic) {
        let dmg = rnd(4);
        if (u.Half_physical_damage || u.Half_spell_damage) dmg += rnd(4);
        if (u.Passes_walls) dmg = Math.trunc((dmg + 3) / 4);
        const hp = u.Upolyd ? (u.mh ?? 0) : (u.uhp ?? 0);
        if (dmg >= hp) await pline('You feel unbearably torpid!');
        else if (dmg >= Math.trunc(hp / 4)) await pline('You feel very lethargic.');
        else await pline('You feel sluggish.');
        losehp(dmg, 'anti-magic implosion', 0);
    }

    let drain = d(2, 6);
    const halfCap = Math.max(1, Math.trunc(drain / 2));
    const halfd = rnd(halfCap);
    if ((u.uenmax ?? 0) > drain) {
        u.uenmax = Math.max(0, (u.uenmax ?? 0) - halfd);
        drain -= halfd;
    }
    u.uen = Math.max(0, (u.uen ?? 0) - drain);
    game.disp = game.disp || {};
    game.disp.botl = true;
    newsym(u.ux, u.uy);
}

/** C: trap.c trapeffect_poly_trap — hero (polyself / poly_obj not ported). */
async function trapeffectPolyTrapHero(trap, trflags) {
    const u = game.u;
    if (!u) return;
    const viasitting = (trflags & VIASITTING) !== 0;
    const ptr = raceptr(game.youmonst);

    seetrap(trap);
    const verb = viasitting ? 'trigger' : u.usteed ? 'lead your steed onto' : `${locomotion(ptr, 'step')} onto`;
    await pline(`You ${verb} a polymorph trap!`);

    if (wearingIronShoes(u)) {
        delTrap(trap);
        await pline('Your iron shoes warp strangely.');
        newsym(u.ux, u.uy);
        vision_recalc(1);
        return;
    }
    if (u.Antimagic || u.Unchanging) {
        await pline('You feel momentarily different.');
        return;
    }
    steedintrapStub();
    delTrap(trap);
    newsym(u.ux, u.uy);
    await pline('You feel a change coming over you.');
    vision_recalc(1);
}

/** C: trap.c trapeffect_magic_portal — hero (domagicportal not ported). */
async function trapeffectMagicPortalHero(trap) {
    const u = game.u;
    if (!u) return;
    feeltrap(trap);
    await pline('You are engulfed in a swirling vortex of colors…');
    vision_recalc(1);
    newsym(u.ux, u.uy);
}

/** C: trap.c trapeffect_vibrating_square — hero (messages handled elsewhere in C). */
async function trapeffectVibratingSquareHero(trap) {
    const u = game.u;
    if (!u) return;
    feeltrap(trap);
    newsym(u.ux, u.uy);
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
    case FIRE_TRAP:
        await trapeffectFireHero(trap);
        break;
    case BEAR_TRAP:
        await trapeffectBearHero(trap, trflags);
        break;
    case PIT:
    case SPIKED_PIT:
        await trapeffectPitHero(trap, trflags);
        break;
    case HOLE:
    case TRAPDOOR:
        await trapeffectHoleHero(trap, trflags);
        break;
    case LANDMINE:
        await trapeffectLandmineHero(trap, trflags);
        break;
    case ROLLING_BOULDER_TRAP:
        await trapeffectRollingBoulderHero(trap);
        break;
    case LEVEL_TELEP:
        await trapeffectLevelTeleHero(trap, trflags);
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
    case ANTI_MAGIC:
        await trapeffectAntiMagicHero(trap);
        break;
    case POLY_TRAP:
        await trapeffectPolyTrapHero(trap, trflags);
        break;
    case WEB:
        await trapeffectWebHero(trap, trflags);
        break;
    case STATUE_TRAP:
        await trapeffectStatueTrapHero(trap);
        break;
    case MAGIC_PORTAL:
        await trapeffectMagicPortalHero(trap);
        break;
    case VIBRATING_SQUARE:
        await trapeffectVibratingSquareHero(trap);
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
