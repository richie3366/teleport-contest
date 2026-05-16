// trap.js — Hero stepping on floor traps (dotrap + trapeffect subset).
// C ref: trap.c dotrap(), floor_trigger(), check_in_air(), trapeffect_selector()
//        hero cases; trap.h fixed_tele_trap(); mondata.h is_clinger (M1_CLING).
// domagictrap() shares makemon.js stub; seffects (fate 20).

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { rn2, rnd, rn1, d, rnl } from './rng.js';
import { nomul, fallAsleep, burnAwaySlime } from './timeout.js';
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
import { placeFloorObject, floorObjKey } from './floorobj.js';
import { goodposHero } from './walkable.js';
import { destroyItemsYoumonstFire, destroyItemsMonFire } from './destroy_items.js';
import { igniteHeroInventory, igniteMinvent } from './ignite_items.js';
import { burnarmorYoumonst, burnarmorMtmp } from './erode_obj.js';
import { burnFloorObjects } from './burn_floor_objects.js';
import { meltIceAt } from './melt_ice.js';
import { dist2 } from './hacklib.js';
import {
    raceptr,
    fireResistant,
    isFlyer,
    isFloater,
    breathless,
    passesRocks,
    passesWalls,
    amorphous,
    isWhirly,
    unsolid,
    MZ_SMALL,
    MZ_LARGE,
    locomotion,
    webmaker,
    metallivorous,
    resistsSleep,
    monHasAmulet,
    isHomeElemental,
    S_ELEMENTAL,
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
    In_quest,
    Is_botlevel,
    Is_knox_level,
    Is_stronghold,
    Is_waterlevel,
    Is_airlevel,
    isok,
    NO_MM_FLAGS,
    A_CHA,
    A_CON,
    A_STR,
    A_DEX,
    KILLED_BY,
    PM_GREMLIN,
    PM_IRON_GOLEM,
    OTYP_BOULDER,
    TRAP_EFFECT_FINISHED,
    TRAP_CAUGHT_MON,
    TRAP_KILLED_MON,
    TRAP_MOVED_MON,
    MIGR_RANDOM,
    MIGR_PORTAL,
    is_xport,
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

/** C: trap.c check_in_air(mtmp, mintrapflags) — non-hero (`is_you` false). */
function checkInAirMonster(mtmp, mintrapflags) {
    const plunged = (mintrapflags & (TOOKPLUNGE | VIASITTING)) !== 0;
    const ptr = raceptr(mtmp);
    return (
        (mintrapflags & HURTLING) !== 0
        || isFloater(ptr)
        || (isFlyer(ptr) && !plunged)
    );
}

/** C: mondata.h mindless — **`M1_MINDLESS`** not on stub **`Permonst`** yet. */
function mindlessMon(/** @type {import('./mondata.js').Permonst} */ ptr) {
    void ptr;
    return false;
}

/** C: trap.c mon_knows_traps — stub false until mon learns traps port. */
function monKnowsTraps(/** @type {unknown} */ _mtmp, /** @type {number} */ _tt) {
    void _mtmp;
    void _tt;
    return false;
}

/** C: trap.c mon_learns_traps — no-op until trap memory port. */
function monLearnsTraps(/** @type {unknown} */ _mtmp, /** @type {number} */ _tt) {
    void _mtmp;
    void _tt;
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
 * C: trap.c dofiretrap(box null) — floor / magic fire; **`burn_away_slime`** (**`timeout.js`**)
 * before destroy; **`burnarmor`** (**`erode_obj.js`**); floor **`burn_floor_objects`** + blind smell;
 * then **`melt_ice`** (**`melt_ice.js`**).
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
    await burnAwaySlime(game);
    if ((await burnarmorYoumonst(game)) || rn2(3)) {
        await destroyItemsYoumonstFire(game, origDmg);
        await igniteHeroInventory(game);
    }
    const seeIt = !heroBlind();
    const floorBurned = await burnFloorObjects(game, u.ux, u.uy, seeIt, true);
    if (floorBurned > 0 && !seeIt) await pline('You smell paper burning.');
    await meltIceAt(game, u.ux, u.uy, null);
    game.disp = game.disp || {};
    game.disp.botl = true;
}

/** C: mondata.h canseemon(mtmp) subset — vision + invisibility vs See_invisible + steed. */
function canseemonRip(g, mtmp) {
    const u = g.u;
    if (!mtmp || !u) return false;
    if (u.usteed === mtmp) return true;
    if ((mtmp.minvis | 0) && !(u.See_invisible | 0)) return false;
    return cansee(mtmp.mx, mtmp.my);
}

function monsterStillOnLevel(g, mtmp) {
    return !!(mtmp && g.level?.monsters?.includes(mtmp));
}

/** C: mon.c mon_nam / Monnam — stub until **`x_monnam`** port. */
function monNam(mtmp) {
    const n = mtmp?.data?.mname || mtmp?.monnam;
    if (n) return `the ${n}`;
    return 'the monster';
}

function monNamSentence(mtmp) {
    const s = monNam(mtmp);
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * C: trap.c paper/straw/wood/leather golem fire alt — uses **`data.mname`** until **`monsndx`** wired.
 * @returns {{ alt: number, immolate: boolean }}
 */
function golemFireAltFromMname(mhpmax, mtmp) {
    const n = String(mtmp?.data?.mname || '').toLowerCase();
    if (n.includes('paper golem')) return { alt: mhpmax | 0, immolate: true };
    if (n.includes('straw golem')) return { alt: Math.trunc((mhpmax | 0) / 2), immolate: false };
    if (n.includes('wood golem')) return { alt: Math.trunc((mhpmax | 0) / 4), immolate: false };
    if (n.includes('leather golem')) return { alt: Math.trunc((mhpmax | 0) / 8), immolate: false };
    return { alt: 0, immolate: false };
}

/** C: monflag.h **`MZ_HUGE`** — **`m_easy_escape_pit`**. */
const MZ_HUGE = 4;

/** C: **`mklev.c`** / **`hack.c`** **`sobj_at(BOULDER, x, y)`** — floor pile head. */
function sobjAtBoulderAt(g, x, y) {
    const heads = g.level?.floorObjHeads;
    if (!heads) return false;
    for (let o = heads.get(floorObjKey(x, y)) ?? null; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

/** C: trap.c **`m_easy_escape_pit`** — **`PM_PIT_FIEND`** stubbed via size only until **`mnum`** wired. */
function mEasyEscapePit(mtmp) {
    const ptr = raceptr(mtmp);
    return ((ptr.msize ?? 0) | 0) >= MZ_HUGE;
}

/** C: trap.c **`fill_pit`** — no terrain fill in JS yet; **`newsym`** only when called from boulder branch. */
function fillPitAt(g, x, y) {
    void g;
    void x;
    void y;
}

/**
 * C: trap.c **`mintrap`** — **`mtmp->mtrapped`** branch (escape / boulder / metallivorous).
 * @returns {Promise<number>}
 */
async function mintrapMtrappedBranch(g, mtmp, trap) {
    const mx = mtmp.mx | 0;
    const my = mtmp.my | 0;
    const tt = trap.ttyp | 0;

    if (
        !trap.tseen
        && cansee(mx, my)
        && canseemonRip(g, mtmp)
        && (is_pit(tt) || tt === BEAR_TRAP || tt === HOLE || tt === WEB)
    ) {
        seetrap(trap);
    }

    if (!rn2(40) || (is_pit(tt) && mEasyEscapePit(mtmp))) {
        if (sobjAtBoulderAt(g, mx, my) && is_pit(tt)) {
            if (!rn2(2)) {
                mtmp.mtrapped = 0;
                if (canseemonRip(g, mtmp)) await pline(`${monNamSentence(mtmp)} pulls free...`);
                fillPitAt(g, mx, my);
                newsym(mx, my);
            }
        } else {
            if (canseemonRip(g, mtmp)) {
                if (is_pit(tt)) {
                    await pline(
                        `${monNamSentence(mtmp)} climbs ${mEasyEscapePit(mtmp) ? 'easily ' : ''}out of the pit.`,
                    );
                } else if (tt === BEAR_TRAP || tt === WEB) {
                    const nm = trapTypName(tt);
                    await pline(`${monNamSentence(mtmp)} pulls free of the ${nm}.`);
                }
            }
            mtmp.mtrapped = 0;
        }
    } else if (metallivorous(raceptr(mtmp))) {
        if (tt === BEAR_TRAP) {
            if (canseemonRip(g, mtmp)) await pline(`${monNamSentence(mtmp)} eats a bear trap!`);
            delTrap(trap);
            mtmp.meating = 5;
            mtmp.mtrapped = 0;
            newsym(mx, my);
        } else if (tt === SPIKED_PIT) {
            if (canseemonRip(g, mtmp)) await pline(`${monNamSentence(mtmp)} munches on some spikes!`);
            trap.ttyp = PIT;
            mtmp.meating = 5;
        }
    }

    return (mtmp.mtrapped | 0) ? TRAP_CAUGHT_MON : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`find_mac(mtmp)`** — stub uses **`mtmp.mac`** or **`permonst.ac`**. */
function findMacMon(mtmp) {
    return (mtmp.mac ?? raceptr(mtmp)?.ac ?? 10) | 0;
}

/** C: trap.c **`stone_missile(obj)`** — rock-class projectile vs **`passes_rocks`**. */
function stoneMissileObj(obj) {
    return (obj?.otyp | 0) === OBJ_ROCK;
}

/**
 * C: trap.c **`thitm(tlev, mon, obj, d_override, nocorpse)`** (monster only).
 * @returns {Promise<boolean>} trapkilled
 */
async function thitmMonster(g, mtmp, tlev, obj, dOverride, _nocorpse) {
    void _nocorpse;
    const dOv = dOverride | 0;
    let strike;
    if (dOv) strike = 1;
    else if (obj)
        strike = (findMacMon(mtmp) + tlev + (obj.spe | 0) <= rnd(20)) ? 1 : 0;
    else
        strike = (findMacMon(mtmp) + tlev <= rnd(20)) ? 1 : 0;

    let trapkilled = false;
    const mx = mtmp.mx | 0;
    const my = mtmp.my | 0;
    const ptr = raceptr(mtmp);

    if (!strike) {
        if (obj && cansee(mx, my))
            await pline(`${monNamSentence(mtmp)} is almost hit by something!`);
    } else {
        let dam = 1;
        const harmless = !!(obj && stoneMissileObj(obj) && passesRocks(ptr));
        if (obj && cansee(mx, my)) {
            await pline(
                `${monNamSentence(mtmp)} is hit${harmless ? ' but is not harmed.' : '!'}`,
            );
        }
        if (dOv) dam = dOv;
        else if (obj) {
            dam = dmgval(obj, mtmp);
            if (dam < 1) dam = 1;
        }
        if (!harmless) {
            mtmp.mhp = (mtmp.mhp | 0) - dam;
            if ((mtmp.mhp | 0) <= 0) {
                const mons = g.level?.monsters;
                const i = mons ? mons.indexOf(mtmp) : -1;
                if (i >= 0) mons.splice(i, 1);
                newsym(mx, my);
                trapkilled = true;
            }
        } else {
            strike = 0;
        }
    }

    if (obj && (!strike || dOv)) {
        placeFloorObject(obj, mx, my);
        newsym(mx, my);
    }

    return trapkilled;
}

/** C: trap.c **`trapeffect_arrow_trap`** — non-hero. */
async function trapeffectArrowTrapMonster(g, mtmp, trap) {
    const inSight = canseemonRip(g, mtmp);
    const seeIt = cansee(mtmp.mx, mtmp.my);

    if (trap.once && trap.tseen && !rn2(15)) {
        if (inSight && seeIt) {
            await pline(`${monNamSentence(mtmp)} triggers a trap but nothing happens.`);
        }
        delTrap(trap);
        newsym(mtmp.mx, mtmp.my);
        return TRAP_EFFECT_FINISHED;
    }
    trap.once = 1;
    const otmp = tMissile(OBJ_ARROW, trap);
    if (inSight) seetrap(trap);
    const trapkilled = await thitmMonster(g, mtmp, 8, otmp, 0, false);
    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_dart_trap`** — non-hero. */
async function trapeffectDartTrapMonster(g, mtmp, trap) {
    const inSight = canseemonRip(g, mtmp);
    const seeIt = cansee(mtmp.mx, mtmp.my);

    if (trap.once && trap.tseen && !rn2(15)) {
        if (inSight && seeIt) {
            await pline(`${monNamSentence(mtmp)} triggers a trap but nothing happens.`);
        }
        delTrap(trap);
        newsym(mtmp.mx, mtmp.my);
        return TRAP_EFFECT_FINISHED;
    }
    trap.once = 1;
    const otmp = tMissile(OBJ_DART, trap);
    if (!rn2(6)) otmp.opoisoned = 1;
    if (inSight) seetrap(trap);
    const trapkilled = await thitmMonster(g, mtmp, 7, otmp, 0, false);
    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_rocktrap`** — non-hero. */
async function trapeffectRocktrapMonster(g, mtmp, trap) {
    const inSight = canseemonRip(g, mtmp);
    const seeIt = cansee(mtmp.mx, mtmp.my);

    if (trap.once && trap.tseen && !rn2(15)) {
        if (inSight && seeIt) {
            await pline(`A trap door above ${monNam(mtmp)} opens, but nothing falls out!`);
        }
        delTrap(trap);
        newsym(mtmp.mx, mtmp.my);
        return TRAP_EFFECT_FINISHED;
    }
    trap.once = 1;
    const otmp = tMissile(OBJ_ROCK, trap);
    if (inSight) seetrap(trap);
    const trapkilled = await thitmMonster(g, mtmp, 0, otmp, d(2, 6), false);
    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: mon.c **`helpless(mtmp)`** — **`mcanmove`/`mfrozen`** subset (hero **`multi`** not ported). */
function helplessMon(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/** C: mondata.h **`grounded`** — flyer/floater avoids ordinary pit fall. */
function groundedMon(ptr) {
    return !(isFlyer(ptr) || isFloater(ptr));
}

/** C: trap.c **`which_armor`** keys on **`mtmp.mworn`**. */
function monMworn(mtmp, k) {
    return mtmp?.mworn?.[k] ?? null;
}

/** C: apply.c **`splash_lit`/`snuff_lit`** on monster inventory (**`Yname2`**-style when visible). */
async function extinguishLitMinventNotWielded(mtmp, inSight, g) {
    const w = mtmp?.mworn;
    for (let o = mtmp?.minvent; o; o = o.nobj) {
        if (!(o.lamplit | 0)) continue;
        if (o === w?.wep) continue;
        await splashLitOne(o, g, { creature: 'minvent', visMon: !!inSight });
    }
}

/** C: mhitm.c **`sleep_monst(mon, amt, -1)`** — timed sleep via **`mfrozen`** / **`mcanmove`**. */
function sleepMonstFromGas(mtmp, amt) {
    if (resistsSleep(raceptr(mtmp)) || breathless(raceptr(mtmp)) || helplessMon(mtmp)) return false;
    if (!(mtmp.mcanmove ?? 1)) return false;
    let a = (amt | 0) + (mtmp.mfrozen | 0);
    if (a > 0) {
        mtmp.mcanmove = 0;
        mtmp.mfrozen = Math.min(a, 127);
        mtmp.msleeping = 0;
    } else {
        mtmp.msleeping = 1;
    }
    return true;
}

/** C: rust trap **`completelyrusts`** — iron golem. */
function completelyRustsMonster(ptr, mtmp) {
    return (mtmp.mnum | 0) === PM_IRON_GOLEM
        || String(ptr?.mname || '').toLowerCase().includes('iron golem');
}

/** C: trap.c **`mu_maybe_destroy_web`** — not ported; always false. */
function muMaybeDestroyWebMonster(_mtmp, _trap) {
    void _mtmp;
    void _trap;
    return false;
}

/** C: trap.c names that tear webs ( **`monsndx`** list; **`mname`** until **`mnum`** wired). */
const WEB_TEAR_MNAME = /titanothere|baluchitherium|purple worm|jabberwock|iron golem|balrog|kraken|mastodon|^orion$|^norn$|cyclops|lord surtur/i;

/** C: trap.c **`trapeffect_bear_trap`** — non-hero. */
async function trapeffectBearTrapMonster(g, mtmp, trap, mintrapflags) {
    const ptr = raceptr(mtmp);
    const inSight = canseemonRip(g, mtmp);
    const forcetrap = ((mintrapflags | 0) & (FORCETRAP | FAILEDUNTRAP)) !== 0;
    let trapkilled = false;

    if (
        ((ptr.msize ?? MZ_SMALL) | 0) > MZ_SMALL
        && !amorphous(ptr)
        && !checkInAirMonster(mtmp, mintrapflags)
        && !isWhirly(ptr)
        && !unsolid(ptr)
    ) {
        mtmp.mtrapped = 1;
        if (inSight) {
            await pline(
                `${monNamSentence(mtmp)} is caught in ${trap.madeby_u ? 'your' : 'a'} bear trap!`,
            );
            seetrap(trap);
        } else {
            const n = String(ptr?.mname || '').toLowerCase();
            if (n.includes('owlbear') || n.includes('bugbear')) await pline('You hear the roaring of an angry bear!');
        }
    } else if (forcetrap && inSight) {
        await pline(
            `${monNamSentence(mtmp)} evades ${trap.madeby_u ? 'your' : 'a'} bear trap!`,
        );
        seetrap(trap);
    }

    if ((mtmp.mtrapped | 0) && !wearingIronShoesMonster(mtmp)) {
        trapkilled = await thitmMonster(g, mtmp, 0, null, d(2, 4), false);
    }
    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_slp_gas_trap`** — non-hero. */
async function trapeffectSlpGasTrapMonster(g, mtmp, trap) {
    void trap;
    const inSight = canseemonRip(g, mtmp);
    const ptr = raceptr(mtmp);
    if (!resistsSleep(ptr) && !breathless(ptr) && !helplessMon(mtmp)) {
        const amt = rnd(25);
        if (sleepMonstFromGas(mtmp, amt) && inSight) {
            await pline(`${monNamSentence(mtmp)} suddenly falls asleep!`);
            seetrap(trap);
        }
    }
    return TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_rust_trap`** — non-hero (**`water_damage`** / **`splash_lit`** subset on **`mworn`** + lit invent). */
async function trapeffectRustTrapMonster(g, mtmp, trap) {
    void trap;
    const inSight = canseemonRip(g, mtmp);
    let trapkilled = false;
    const ptr = raceptr(mtmp);
    const gush = 'A gush of water hits';
    const monCtx = { mtmp, visMon: inSight };

    if (inSight) seetrap(trap);
    const b = rn2(5);
    switch (b) {
    case 0:
        if (inSight) await pline(`${gush} ${monNam(mtmp)} on the head!`);
        await waterDamageOne(monMworn(mtmp, 'armh'), true, g, monCtx);
        break;
    case 1: {
        if (inSight) await pline(`${gush} ${monNam(mtmp)}'s left arm!`);
        const er = monMworn(mtmp, 'arms')
            ? await waterDamageOne(monMworn(mtmp, 'arms'), true, g, monCtx)
            : ER_NOTHING;
        if (er === ER_NOTHING) {
            const wep = monMworn(mtmp, 'wep');
            if (wep && bimanual(wep)) await waterDamageOne(wep, true, g, monCtx);
        }
        await waterDamageOne(monMworn(mtmp, 'armg'), true, g, monCtx);
        break;
    }
    case 2:
        if (inSight) await pline(`${gush} ${monNam(mtmp)}'s right arm!`);
        await waterDamageOne(monMworn(mtmp, 'wep'), true, g, monCtx);
        await waterDamageOne(monMworn(mtmp, 'armg'), true, g, monCtx);
        break;
    default:
        if (inSight) await pline(`${gush} ${monNam(mtmp)}!`);
        await extinguishLitMinventNotWielded(mtmp, inSight, g);
        if (monMworn(mtmp, 'armc')) await waterDamageOne(monMworn(mtmp, 'armc'), true, g, monCtx);
        else if (monMworn(mtmp, 'arm')) await waterDamageOne(monMworn(mtmp, 'arm'), true, g, monCtx);
        else if (monMworn(mtmp, 'armu')) await waterDamageOne(monMworn(mtmp, 'armu'), true, g, monCtx);
        break;
    }

    if (completelyRustsMonster(ptr, mtmp)) {
        if (inSight) await pline(`${monNamSentence(mtmp)} falls to pieces!`);
        const mx = mtmp.mx | 0;
        const my = mtmp.my | 0;
        const mons = g.level?.monsters;
        const i = mons ? mons.indexOf(mtmp) : -1;
        if (i >= 0) mons.splice(i, 1);
        newsym(mx, my);
        trapkilled = true;
    } else if ((mtmp.mnum | 0) === PM_GREMLIN && rn2(3)) {
        /* C: split_mon — not ported */
    }

    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_pit`** — non-hero (**`mselftouch`** not ported). */
async function trapeffectPitMonster(g, mtmp, trap, mintrapflags) {
    const u = g.u;
    if (!u) return TRAP_EFFECT_FINISHED;

    const ttype = trap.ttyp | 0;
    let relevantSpikes = ttype === SPIKED_PIT;
    const inSight = canseemonRip(g, mtmp);
    const forcetrap = ((mintrapflags | 0) & (FORCETRAP | FAILEDUNTRAP)) !== 0;
    const inescapable = forcetrap || (In_sokoban(u.uz) && !trap.madeby_u);
    const ptr = raceptr(mtmp);
    let trapkilled = false;
    let fallverb = 'falls';

    const wormy = (mtmp.wormno | 0) > 5;

    if (!groundedMon(ptr) || wormy) {
        if (forcetrap && !In_sokoban(u.uz)) {
            if (inSight) {
                seetrap(trap);
                await pline(`${monNamSentence(mtmp)} doesn't fall into the pit.`);
            }
            return TRAP_EFFECT_FINISHED;
        }
        if (!inescapable) return TRAP_EFFECT_FINISHED;
        fallverb = 'is dragged';
    }

    if (!passesWalls(ptr)) mtmp.mtrapped = 1;

    if (inSight) {
        await pline(
            `${monNamSentence(mtmp)} ${fallverb} into ${trap.madeby_u ? 'your' : 'a'} pit!`,
        );
        const n = String(ptr?.mname || '').toLowerCase();
        if (n.includes('pit viper') || n.includes('pit fiend')) await pline(`How pitiful.  Isn't that the pits?`);
        seetrap(trap);
    }

    if (wearingIronShoesMonster(mtmp)) relevantSpikes = false;

    if (
        monsterStillOnLevel(g, mtmp)
        && (await thitmMonster(g, mtmp, 0, null, rnd(relevantSpikes ? 10 : 6), false))
    ) {
        trapkilled = true;
    }
    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`trapeffect_web`** — non-hero. */
async function trapeffectWebMonster(g, mtmp, trap, mintrapflags) {
    void g;
    const ptr = raceptr(mtmp);
    if (webmaker(ptr)) return TRAP_EFFECT_FINISHED;
    if (muMaybeDestroyWebMonster(mtmp, trap)) return TRAP_EFFECT_FINISHED;

    const inSight = canseemonRip(g, mtmp);
    const forcetrap = ((mintrapflags | 0) & (FORCETRAP | FAILEDUNTRAP)) !== 0;
    const ay = trap.madeby_u ? 'your' : 'a';
    let tearWeb = false;
    const n = String(ptr?.mname || mtmp?.monnam || '').toLowerCase();

    if ((n.includes('owlbear') || n.includes('bugbear')) && !inSight) {
        await pline('You hear the roaring of a confused bear!');
        mtmp.mtrapped = 1;
    } else {
        if (
            WEB_TEAR_MNAME.test(n)
            || ((ptr.msize | 0) >= MZ_LARGE)
            || (n.includes('dragon') && !n.includes('baby'))
        ) {
            tearWeb = true;
        } else if (inSight) {
            await pline(`${monNamSentence(mtmp)} is caught in ${ay} spider web.`);
            seetrap(trap);
        }
        mtmp.mtrapped = tearWeb ? 0 : 1;
    }

    if (tearWeb) {
        if (inSight) await pline(`${monNamSentence(mtmp)} tears through ${ay} spider web!`);
        delTrap(trap);
        newsym(mtmp.mx, mtmp.my);
    } else if (forcetrap && !(mtmp.mtrapped | 0)) {
        if (inSight) {
            await pline(`${monNamSentence(mtmp)} avoids ${ay} spider web!`);
            seetrap(trap);
        }
    }
    return (mtmp.mtrapped | 0) ? TRAP_CAUGHT_MON : TRAP_EFFECT_FINISHED;
}

/** C: teleport.c **`random_teleport_level`** — absolute **`dlevel`** (subset; **`game.dungeons`** when present). */
function randomTeleportLevelAbs(g) {
    const uz = g.u?.uz;
    if (!uz) return 1;
    const curDepth = uz.dlevel | 0;
    if (!rn2(5) || Is_knox_level(uz) || In_endgame(uz)) return curDepth;

    let min_depth = 1;
    let max_depth = 99;
    const dun = g.dungeons?.[uz.dnum];
    const numlev = dun?.num_dunlevs ?? 30;
    const depth_start = dun?.depth_start ?? 1;

    if (In_quest(uz)) {
        const bottom = numlev;
        min_depth = depth_start;
        max_depth = bottom + (depth_start - 1);
    } else {
        min_depth = 1;
        max_depth = numlev + (depth_start - 1);
    }

    let nlev = rn2(curDepth + 3 - min_depth) + min_depth;
    if (nlev >= curDepth) nlev++;
    if (nlev > max_depth) {
        nlev = max_depth;
        if (Is_botlevel(uz)) nlev -= rnd(3);
    }
    if (nlev < min_depth) {
        nlev = min_depth;
        if (nlev === curDepth) {
            nlev += rnd(3);
            if (nlev > max_depth) nlev = max_depth;
        }
    }
    return nlev;
}

/** @see include/objects.h — **`LEASH`** */
const OTYP_LEASH = 237;

/** C: monflag.h **`enum monst_soundtypes`** — subset for sounds.c **`yelp`** */
const MS_BARK = 1;
const MS_MEW = 2;
const MS_ROAR = 3;
const MS_GROWL = 5;
const MS_SQEEK = 6;
const MS_SQAWK = 7;
const MS_WAIL = 14;

/** C: apply.c **`get_mleash`** — hero invent **`LEASH`** with **`leashmon === mtmp`**. */
function getMleashFromInvent(g, mtmp) {
    for (let o = g.invent; o; o = o.nobj) {
        if ((o.otyp | 0) === OTYP_LEASH && o.leashmon === mtmp) return o;
    }
    return null;
}

/** C: apply.c **`m_unleash(mtmp, feedback)`** — hero invent leash + plines. */
async function mUnleashMon(g, mtmp, feedback = false) {
    if (feedback) {
        if (canseemonRip(g, mtmp)) {
            await pline(`${monNamSentence(mtmp)} pulls free of its leash!`);
        } else {
            await pline('Your leash falls slack.');
        }
    }
    const otmp = getMleashFromInvent(g, mtmp);
    if (otmp) otmp.leashmon = null;
    mtmp.mleashed = 0;
    if (g.iflags?.perm_invent) updateInventory();
}

/** C: sounds.c **`yelp(mtmp)`** — **`helpless`/`msound`** gates; verb list matches C switch. */
async function yelpMon(g, mtmp) {
    void g;
    if (helplessMon(mtmp)) return;
    const ptr = raceptr(mtmp);
    const ms = ptr.msound;
    if (ms == null || ms === 0) return;
    let verb = '';
    switch (ms) {
    case MS_MEW:
        verb = 'yowls';
        break;
    case MS_BARK:
    case MS_GROWL:
        verb = 'yelps';
        break;
    case MS_ROAR:
        verb = 'snarls';
        break;
    case MS_SQEEK:
        verb = 'squeals';
        break;
    case MS_SQAWK:
        verb = 'screaks';
        break;
    case MS_WAIL:
        verb = 'wails';
        break;
    default:
        return;
    }
    await pline(`${monNam(mtmp)} ${verb}!`);
}

/** C: teleport.c **`teleport_pet`** — steed blocked; cursed leash + !**`force_it`** → **`yelp`**. */
async function teleportPetAllowsMon(g, mtmp, forceIt) {
    const u = g.u;
    if (!u || mtmp === u.usteed) return false;
    if (!(mtmp.mleashed | 0)) return true;
    const otmp = getMleashFromInvent(g, mtmp);
    if (!otmp) {
        mtmp.mleashed = 0;
        return true;
    }
    if ((otmp.cursed | 0) && !forceIt) {
        await yelpMon(g, mtmp);
        return false;
    }
    await pline('Your leash goes slack.');
    await mUnleashMon(g, mtmp, false);
    return true;
}

/** C: dungeon.c **`Can_fall_thru`** subset — no hole effects on water / air planes. */
function canFallThruLevelForHole(g) {
    const uz = g.u?.uz;
    if (!uz) return false;
    if (Is_waterlevel(uz) || Is_airlevel(uz)) return false;
    return true;
}

/** C: polyself.c / eat.c **`control_teleport(mdat)`** — **`PROP_TELEPORT_CONTROL`** stub. */
function controlTeleportMon(_ptr) {
    void _ptr;
    return false;
}

/**
 * C: dog.c **`migrate_to_level`** — remove from **`fmon`**, push **`migrating_mons`** (**`relmon`** subset).
 * @param {{ dnum?: number, dlevel?: number }} toLev
 * @param {number} migrateTyp — **`MIGR_*`**
 */
async function migrateToLevelMon(g, mtmp, toLev, migrateTyp) {
    if ((mtmp.mleashed | 0)) {
        mtmp.mtame = Math.max(0, (mtmp.mtame | 0) - 1);
        await mUnleashMon(g, mtmp, true);
    }
    const mx = mtmp.mx | 0;
    const my = mtmp.my | 0;
    const mons = g.level?.monsters;
    const i = mons ? mons.indexOf(mtmp) : -1;
    if (i >= 0) mons.splice(i, 1);
    if (!g.migratingMons) g.migratingMons = [];
    const u = g.u;
    g.migratingMons.push({
        mtmp,
        mux: toLev.dnum | 0,
        muy: toLev.dlevel | 0,
        migrateTyp,
        fromDnum: u?.uz?.dnum,
        fromDlevel: u?.uz?.dlevel,
        xWas: mx,
        yWas: my,
    });
    mtmp.mx = 0;
    mtmp.my = 0;
    newsym(mx, my);
}

/**
 * C: teleport.c **`mlevel_tele_trap`** — **`migrate_to_level`** + gates (**`mon_has_amulet`**, **`is_home_elemental`**).
 * @returns {Promise<number>} **`TRAP_MOVED_MON`** or **`TRAP_EFFECT_FINISHED`**
 */
async function mlevelTeleTrapMonster(g, mtmp, trap, forceIt, inSight) {
    const u = g.u;
    if (!u || !mtmp || !trap) return TRAP_EFFECT_FINISHED;
    const tt = trap.ttyp | 0;
    if (mtmp === u.ustuck) return TRAP_EFFECT_FINISHED;
    if (!(await teleportPetAllowsMon(g, mtmp, !!forceIt))) return TRAP_EFFECT_FINISHED;

    /** @type {{ dnum: number, dlevel: number } | null} */
    let tolevel = null;
    let migrateTyp = MIGR_RANDOM;

    if (is_hole(tt)) {
        if (Is_stronghold(u.uz)) {
            const vl = g.valley_level;
            tolevel = vl ? { dnum: vl.dnum | 0, dlevel: vl.dlevel | 0 } : { dnum: u.uz.dnum | 0, dlevel: u.uz.dlevel | 0 };
        } else if (Is_botlevel(u.uz)) {
            if (inSight && trap.tseen) {
                const holeWord = tt === HOLE ? 'hole' : 'trap';
                await pline(`${monNamSentence(mtmp)} avoids the ${holeWord}.`);
            }
            return TRAP_EFFECT_FINISHED;
        } else {
            const d = trap.dst;
            tolevel = d
                ? { dnum: d.dnum | 0, dlevel: d.dlevel | 0 }
                : { dnum: u.uz.dnum | 0, dlevel: u.uz.dlevel | 0 };
        }
    } else if (tt === MAGIC_PORTAL) {
        if (In_endgame(u.uz) && (monHasAmulet(mtmp) || isHomeElemental(mtmp, u.uz) || rn2(7))) {
            if (inSight && (raceptr(mtmp).mlet | 0) !== S_ELEMENTAL) {
                await pline(`${monNamSentence(mtmp)} seems to shimmer for a moment.`);
                seetrap(trap);
            }
            return TRAP_EFFECT_FINISHED;
        }
        if (!trap.dst) return TRAP_EFFECT_FINISHED;
        tolevel = { dnum: trap.dst.dnum | 0, dlevel: trap.dst.dlevel | 0 };
        migrateTyp = MIGR_PORTAL;
    } else if (tt === LEVEL_TELEP) {
        if (monHasAmulet(mtmp) || In_endgame(u.uz)) {
            if (inSight) {
                await pline(`${monNamSentence(mtmp)} seems very disoriented for a moment.`);
            }
            return TRAP_EFFECT_FINISHED;
        }
        const cur = u.uz.dlevel | 0;
        const nlev = randomTeleportLevelAbs(g);
        if (nlev === cur) {
            if (inSight) await pline(`${monNamSentence(mtmp)} shudders for a moment.`);
            return TRAP_EFFECT_FINISHED;
        }
        tolevel = { dnum: u.uz.dnum | 0, dlevel: nlev };
        migrateTyp = MIGR_RANDOM;
    } else {
        return TRAP_EFFECT_FINISHED;
    }

    if (!tolevel) return TRAP_EFFECT_FINISHED;

    if (inSight) {
        const nm = monNam(mtmp);
        const tail =
            tt === HOLE
                ? 'falls into a hole.'
                : tt === TRAPDOOR
                    ? 'falls through a trap door.'
                    : 'disappears out of sight.';
        await pline(`Suddenly, ${nm} ${tail}`);
        seetrap(trap);
    }
    if (is_xport(tt) && !controlTeleportMon(raceptr(mtmp))) mtmp.mconf = 1;

    await migrateToLevelMon(g, mtmp, tolevel, migrateTyp);
    return TRAP_MOVED_MON;
}

/** C: trap.c **`mintrap`** **`LANDMINE`** — non-hero (**`rn2(3)`**, flyer **`rn2(3)`**, **`blow_up_landmine`**, **`thitm`**, **`mintrap`** pit). */
async function trapeffectLandmineMonster(g, mtmp, trap, mintrapflags) {
    void mintrapflags;
    if (rn2(3)) return TRAP_EFFECT_FINISHED;

    const ptr = raceptr(mtmp);
    const inSight = canseemonRip(g, mtmp);
    const u = g.u;
    const alreadySeen = !!trap.tseen;
    let trapkilled = false;

    if (isFlyer(ptr)) {
        if (inSight && !alreadySeen) {
            await pline(`A trigger appears in a pile of soil below ${monNam(mtmp)}.`);
            seetrap(trap);
        }
        if (rn2(3)) return TRAP_EFFECT_FINISHED;
        if (inSight) {
            newsym(mtmp.mx, mtmp.my);
            await pline(
                `The air currents set ${alreadySeen ? (trap.madeby_u ? 'your land mine' : 'a land mine') : 'it'} off!`,
            );
        }
    } else if (inSight) {
        newsym(mtmp.mx, mtmp.my);
        await pline(
            `${!heroDeaf(u) ? 'KAABLAMM!!!  ' : ''}${monNamSentence(mtmp)} triggers ${trap.madeby_u ? 'your' : 'a'} land mine!`,
        );
    }
    if (!inSight && u && !heroDeaf(u)) await pline('Kaablamm!  You hear an explosion in the distance!');

    blowUpLandmine(trap);

    if (monsterStillOnLevel(g, mtmp) && (await thitmMonster(g, mtmp, 0, null, rnd(16), false))) {
        trapkilled = true;
    } else if (monsterStillOnLevel(g, mtmp)) {
        const mr = await mintrap(mtmp, RECURSIVETRAP);
        if (mr === TRAP_KILLED_MON) trapkilled = true;
    }
    fillPit(trap.tx | 0, trap.ty | 0);
    if (monsterStillOnLevel(g, mtmp) && (mtmp.mhp | 0) <= 0) trapkilled = true;

    return trapkilled
        ? TRAP_KILLED_MON
        : (mtmp.mtrapped | 0)
            ? TRAP_CAUGHT_MON
            : TRAP_EFFECT_FINISHED;
}

/** C: trap.c **`mintrap`** — **`HOLE`/`TRAPDOOR`** + **`LEVEL_TELEP`/`MAGIC_PORTAL`** (**`mlevel_tele_trap`**). */
async function trapeffectHoleTrapdoorLevelPortalMonster(g, mtmp, trap, mintrapflags) {
    const u = g.u;
    if (!u) return TRAP_EFFECT_FINISHED;
    const tt = trap.ttyp | 0;
    const ptr = raceptr(mtmp);
    let inSight = canseemonRip(g, mtmp);
    const forcetrap = ((mintrapflags | 0) & (FORCETRAP | FAILEDUNTRAP)) !== 0;
    const inescapable = forcetrap
        || (((tt === HOLE || tt === TRAPDOOR || is_pit(tt)) && In_sokoban(u.uz) && !trap.madeby_u));

    if (tt === HOLE || tt === TRAPDOOR) {
        if (!canFallThruLevelForHole(g)) return TRAP_EFFECT_FINISHED;
        const wormy = (mtmp.wormno | 0) > 5;
        const wumpus = String(ptr?.mname || '').toLowerCase().includes('wumpus');
        const huge = (ptr.msize | 0) >= MZ_HUGE;
        const bigAir = isFlyer(ptr) || isFloater(ptr) || wumpus || wormy || huge;
        if (bigAir) {
            if (forcetrap && !In_sokoban(u.uz)) {
                if (inSight) {
                    seetrap(trap);
                    if (tt === TRAPDOOR) {
                        await pline(`A trap door opens, but ${monNam(mtmp)} doesn't fall through.`);
                    } else {
                        await pline(`${monNamSentence(mtmp)} doesn't fall through the hole.`);
                    }
                }
                return TRAP_EFFECT_FINISHED;
            }
            if (!inescapable) return TRAP_EFFECT_FINISHED;
            if (inSight) {
                await pline(`${monNamSentence(mtmp)} seems to be yanked down!`);
                inSight = false;
                seetrap(trap);
            }
        }
    }

    const mres = await mlevelTeleTrapMonster(g, mtmp, trap, inescapable, inSight);
    return mres === TRAP_MOVED_MON ? TRAP_MOVED_MON : TRAP_EFFECT_FINISHED;
}

/**
 * C: mon.c **`maybe_unhide_at`** / trap.c **`mintrap`** tail — reveal **`mundetected`** when hero can see mon.
 * @param {typeof game} g
 */
function maybeMonsterUnhideAfterTrap(g, mtmp) {
    if (!mtmp) return;
    if ((mtmp.mundetected | 0) && canseemonRip(g, mtmp)) {
        mtmp.mundetected = 0;
        newsym(mtmp.mx | 0, mtmp.my | 0);
    }
}

/**
 * C: trap.c thitm — **`obj` null, `d_override` non-zero** (forced hit, no **`rnd(20)`** vs AC).
 * @returns {boolean} trapkilled (**`DEADMONSTER`**)
 */
function thitmMonsterFireOverride(g, mtmp, damage, _immolateNocorpse) {
    void _immolateNocorpse;
    const d = damage | 0;
    if (d <= 0) return false;
    mtmp.mhp = (mtmp.mhp | 0) - d;
    if (mtmp.mhp > 0) return false;
    const xx = mtmp.mx;
    const yy = mtmp.my;
    const mons = g.level?.monsters;
    const i = mons ? mons.indexOf(mtmp) : -1;
    if (i >= 0) mons.splice(i, 1);
    newsym(xx, yy);
    return true;
}

/**
 * C: trap.c **`trapeffect_fire_trap`** — **`mtmp != &youmonst`** branch.
 * @param {typeof game} g
 * @param {{ mx: number, my: number, mhp?: number, mhpmax?: number, minvis?: number, data?: { mname?: string }, monnam?: string, minvent?: unknown, mworn?: object }} mtmp
 * @param {{ tx: number, ty: number, ttyp?: number, tseen?: boolean }} trap
 * @returns {Promise<number>} C **`Trap_Killed_Mon`** (**2**) or **`Trap_Effect_Finished`** (**0**)
 */
export async function trapeffectFireTrapForMonster(g, mtmp, trap) {
    const u = g.u;
    if (!u || !mtmp || !trap) return TRAP_EFFECT_FINISHED;

    const tx = trap.tx | 0;
    const ty = trap.ty | 0;
    const inSight = canseemonRip(g, mtmp);
    const seeIt = cansee(tx, ty);
    const origDmg = d(2, 4);

    const under = monNam(mtmp);
    if (inSight) {
        await pline(`A tower of flame erupts from the floor under ${under}!`);
    } else if (seeIt) {
        await pline('You see a tower of flame erupt from the floor!');
    }

    let trapkilled = false;

    if (fireResistant(raceptr(mtmp))) {
        if (inSight) await pline(`${monNamSentence(mtmp)} is uninjured.`);
    } else {
        let num = origDmg;
        const mh = (mtmp.mhpmax ?? mtmp.mhp ?? 1) | 0;
        const { alt, immolate } = golemFireAltFromMname(mh, mtmp);
        if (alt > num) num = alt;

        if (thitmMonsterFireOverride(g, mtmp, num, immolate)) trapkilled = true;
        else {
            const cap = num | 0;
            const rdx = rn2(cap + 1);
            const nmax = Math.max(1, (mtmp.mhpmax ?? 1) - rdx);
            mtmp.mhpmax = nmax;
            if ((mtmp.mhp | 0) > nmax) mtmp.mhp = nmax;
        }
    }

    /* C: trap.c — after **`resists_fire`** branch: **`burnarmor(mtmp) \|\| rn2(3)`** for all monsters */
    if (
        monsterStillOnLevel(g, mtmp)
        && ((await burnarmorMtmp(g, mtmp, inSight)) || rn2(3))
    ) {
        const xtradmg = await destroyItemsMonFire(g, mtmp, origDmg, inSight);
        await igniteMinvent(g, mtmp, inSight);
        if (monsterStillOnLevel(g, mtmp) && (mtmp.mhp | 0) > 0 && xtradmg) {
            mtmp.mhp = (mtmp.mhp | 0) - xtradmg;
            if ((mtmp.mhp | 0) <= 0) {
                const xx = mtmp.mx;
                const yy = mtmp.my;
                const mons = g.level?.monsters;
                const i = mons ? mons.indexOf(mtmp) : -1;
                if (i >= 0) mons.splice(i, 1);
                newsym(xx, yy);
                trapkilled = true;
            }
        }
    }

    const floorBurned = await burnFloorObjects(g, tx, ty, seeIt, false);
    if (floorBurned > 0 && !seeIt && dist2(tx, ty, u.ux, u.uy) <= 9) await pline('You smell smoke.');

    await meltIceAt(g, tx, ty, null);

    if (monsterStillOnLevel(g, mtmp) && (mtmp.mhp | 0) <= 0) trapkilled = true;

    const trapHere = tAt(tx, ty);
    if (seeIt && trapHere) seetrap(trapHere);

    return trapkilled ? TRAP_KILLED_MON : TRAP_EFFECT_FINISHED;
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

/** C: do_wear.c wearing_iron_shoes(mtmp) — monster **`mworn.armf`**. */
function wearingIronShoesMonster(mtmp) {
    const f = mtmp?.mworn?.armf;
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

/**
 * C: trap.c **`blow_up_landmine`** — **`wake_nearto`**, **`scatter`** / doors / drawbridge deferred;
 * converts **`LANDMINE` → `PIT`** on normal levels (**`Is_waterlevel`/`Is_airlevel`** → **`deltrap`**).
 * @param {{ tx: number, ty: number, ttyp?: number, madeby_u?: boolean, tseen?: boolean }|null|undefined} trap
 */
function blowUpLandmine(trap) {
    if (!trap) return;
    const x = trap.tx | 0;
    const y = trap.ty | 0;
    wakeNearto(x, y, 400);
    vision_recalc(1);
    const u = game.u;
    if (Is_waterlevel(u?.uz) || Is_airlevel(u?.uz)) {
        delTrap(trap);
        return;
    }
    if ((trap.ttyp | 0) === LANDMINE) {
        trap.ttyp = PIT;
        trap.madeby_u = false;
        seetrap(trap);
    }
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
    blowUpLandmine(trap);
    losehp(maybeHalfPhys(damage), 'land mine', 0);
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
 * C: trap.c trapeffect_selector — monster (**`mtmp != &youmonst`**).
 * @param {number} mintrapflags
 * @returns {Promise<number>}
 */
async function trapeffectMonsterSelector(mtmp, trap, mintrapflags) {
    const tt = trap.ttyp | 0;
    switch (tt) {
    case ARROW_TRAP:
        return trapeffectArrowTrapMonster(game, mtmp, trap);
    case DART_TRAP:
        return trapeffectDartTrapMonster(game, mtmp, trap);
    case ROCKTRAP:
        return trapeffectRocktrapMonster(game, mtmp, trap);
    case FIRE_TRAP:
        return trapeffectFireTrapForMonster(game, mtmp, trap);
    case BEAR_TRAP:
        return trapeffectBearTrapMonster(game, mtmp, trap, mintrapflags);
    case SLP_GAS_TRAP:
        return trapeffectSlpGasTrapMonster(game, mtmp, trap);
    case RUST_TRAP:
        return trapeffectRustTrapMonster(game, mtmp, trap);
    case PIT:
    case SPIKED_PIT:
        return trapeffectPitMonster(game, mtmp, trap, mintrapflags);
    case WEB:
        return trapeffectWebMonster(game, mtmp, trap, mintrapflags);
    case HOLE:
    case TRAPDOOR:
    case LEVEL_TELEP:
    case MAGIC_PORTAL:
        return trapeffectHoleTrapdoorLevelPortalMonster(game, mtmp, trap, mintrapflags);
    case LANDMINE:
        return trapeffectLandmineMonster(game, mtmp, trap, mintrapflags);
    default:
        return TRAP_EFFECT_FINISHED;
    }
}

/**
 * C: trap.c mintrap(mtmp, mintrapflags)
 * @param {{ mx: number, my: number, mtrapped?: number, mpeaceful?: number, mAngry?: number }} mtmp
 * @param {number} [mintrapflags]
 * @returns {Promise<number>} **`TRAP_*`**
 */
export async function mintrap(mtmp, mintrapflags = NO_TRAP_FLAGS) {
    const g = game;
    const u = g.u;
    if (!mtmp || !u) return TRAP_EFFECT_FINISHED;

    const trap = tAt(mtmp.mx, mtmp.my);

    if (!trap) {
        mtmp.mtrapped = 0;
        return TRAP_EFFECT_FINISHED;
    }

    if (mtmp.mtrapped | 0) return await mintrapMtrappedBranch(g, mtmp, trap);

    const tt = trap.ttyp | 0;
    let forcetrap = (mintrapflags & FORCETRAP) !== 0 || (mintrapflags & FAILEDUNTRAP) !== 0;
    const forcebungle = (mintrapflags & FORCEBUNGLE) !== 0;
    const mptr = raceptr(mtmp);
    const alreadySeen = monKnowsTraps(mtmp, tt) || (tt === HOLE && !mindlessMon(mptr));

    if (fixedTeleTrap(trap)) forcetrap = true;

    if (mtmp === u.usteed) {
        /* C: empty */
    } else if (In_sokoban(u.uz) && (is_pit(tt) || is_hole(tt)) && !trap.madeby_u) {
        /* C: empty — trap effects handle Sokoban messaging */
    } else if (!forcetrap) {
        if (floorTrigger(tt) && checkInAirMonster(mtmp, mintrapflags)) return TRAP_EFFECT_FINISHED;
        if (alreadySeen && rn2(4) && !forcebungle) return TRAP_EFFECT_FINISHED;
    }

    monLearnsTraps(mtmp, tt);
    monsSeeTrap(trap);

    if (trap.madeby_u && rnl(5)) {
        mtmp.mpeaceful = 0;
        mtmp.mAngry = 1;
    }

    const teff = await trapeffectMonsterSelector(mtmp, trap, mintrapflags);
    maybeMonsterUnhideAfterTrap(g, mtmp);
    return teff;
}

/**
 * C: monmove.c tail — after **`m_move`**, **`mintrap(mtmp)`** when monster entered a trapped square.
 * Syncs **`_trapPrev*`** each moveloop step so stationary monsters do not re-trigger.
 */
export async function mintrapMoveloopTail() {
    const mons = game.level?.monsters;
    if (!mons?.length) return;
    for (const m of mons) {
        if (
            m._trapPrevMx !== undefined
            && m._trapPrevMy !== undefined
            && (m._trapPrevMx !== m.mx || m._trapPrevMy !== m.my)
            && tAt(m.mx, m.my)
        ) {
            await mintrap(m, NO_TRAP_FLAGS);
        }
        m._trapPrevMx = m.mx;
        m._trapPrevMy = m.my;
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
