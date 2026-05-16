// zap_over_floor.js — Floor tile effects from zaps / breath / wand explosions (subset).
// C ref: zap.c zap_over_floor(), zaptype(); monattk.h AD_* → ZT_* in zap.c preamble;
//        zap.c buzz()/bhit() — beam **`range += zap_over_floor(...)`** stepping (subset).
//        detect.c cvt_sdoor_to_door — secret-door reveal before **`closed_door`**.
// TODO: exploding misc **`WAN_STRIKING`** door branch (**`zap.c`** default **`def_case`**).

import {
    PHYS_EXPL_TYPE, BOLT_LIM, isok, DOOR, SDOOR, D_NODOOR, D_BROKEN, D_CLOSED, D_LOCKED,
    WM_MASK, Is_rogue_level,
} from './const.js';
import { cansee } from './vision.js';
import { coldZapHitsWaterAt } from './melt_ice.js';
import { pline, newsym } from './display.js';
import { isClosedDoorLoc } from './walkable.js';

/** C: objects.h — passed as **`exploding_wand_typ`** for oil/splatter fire (zap.c). */
const OTYP_POT_OIL = 320;
/** C: objects.h — exploding scroll fire (zap.c). */
const OTYP_SCR_FIRE = 338;

export const ZT_MAGIC_MISSILE = 0;
export const ZT_FIRE = 1;
export const ZT_COLD = 2;
export const ZT_SLEEP = 3;
export const ZT_DEATH = 4;
export const ZT_LIGHTNING = 5;
export const ZT_POISON_GAS = 6;
export const ZT_ACID = 7;

/** C: zap.c ZT_WAND(x) */
export function ZT_WAND(x) {
    return x | 0;
}

/** C: zap.c ZT_SPELL(x) */
export function ZT_SPELL(x) {
    return 10 + (x | 0);
}

/** C: zap.c ZT_BREATH(x) */
export function ZT_BREATH(x) {
    return 20 + (x | 0);
}

/**
 * C: zap.c zaptype(int type) — monster wand zaps −39..−30 normalize before abs().
 * @param {number} type
 * @returns {number}
 */
export function zaptype(type) {
    let t = type | 0;
    if (t <= -30 && t >= -39) t += 30;
    return Math.abs(t);
}

/**
 * C: int damgtype = zaptype(type) % 10;
 * @param {number} type
 * @returns {number}
 */
export function zapDamgtype(type) {
    return zaptype(type) % 10;
}

/**
 * C: detect.c cvt_sdoor_to_door(struct rm *lev)
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} loc
 */
function cvtSdoorToDoor(g, loc) {
    let newmask = (loc.doormask | 0) & ~WM_MASK;
    if (Is_rogue_level(g.u?.uz)) {
        newmask = D_NODOOR;
    } else if (!(newmask & D_LOCKED)) {
        newmask |= D_CLOSED;
    }
    loc.typ = DOOR;
    loc.doormask = newmask;
    if ('arboreal_sdoor' in loc) loc.arboreal_sdoor = 0;
}

/**
 * C: zap.c zap_over_floor(x, y, type, shopdamage, ignoremon, exploding_wand_typ) — JS subset.
 * **`ZT_COLD`** → **`coldZapHitsWaterAt`**; **`SDOOR`** / **`closed_door`** tail (**`rangemod = -1000`**).
 *
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} type
 * @param {{ value?: boolean }|null} [_shopdamage] — C **`*shopdamage`** (shop doors stub)
 * @param {boolean} [_ignoremon]
 * @param {number} [_explodingWandTyp]
 * @returns {Promise<number>} rangemod (negative reduces beam range in **C**)
 */
export async function zapOverFloor(g, x, y, type, _shopdamage = null, _ignoremon = true, _explodingWandTyp = 0) {
    void _ignoremon;
    if ((type | 0) === PHYS_EXPL_TYPE) return -1000;
    if (!isok(x, y)) return 0;

    const damg = zapDamgtype(type);
    const seeIt = cansee(x, y);

    let rangemod = 0;
    switch (damg) {
    case ZT_COLD:
        rangemod = await coldZapHitsWaterAt(g, x, y, seeIt);
        break;
    default:
        break;
    }

    /* C: zap_over_floor — zapverb / yourzap for SDOOR + door absorb plines */
    let doorExploding = _explodingWandTyp | 0;
    let zapverb = 'blast';
    const yourZap = (type | 0) >= 0 && !(_explodingWandTyp | 0);
    if (!doorExploding) {
        const ztype = zaptype(type);
        if (ztype < ZT_SPELL(0)) zapverb = 'bolt';
        else if (ztype < ZT_BREATH(0)) zapverb = 'spell';
    } else if (doorExploding === OTYP_POT_OIL || doorExploding === OTYP_SCR_FIRE) {
        /* C: POT_OIL / SCR_FIRE — not a real "exploding wand" for door absorb wording (zap.c). */
        doorExploding = 0;
    }
    if (!loc) return rangemod;

    /* C: SDOOR → DOOR + newsym + pline / rogue draft */
    if (loc.typ === SDOOR) {
        cvtSdoorToDoor(g, loc);
        g.vision_full_recalc = 1;
        newsym(x, y);
        if (seeIt) {
            const who = yourZap ? 'Your' : 'The';
            await pline(`${who} ${zapverb} reveals a secret door.`);
        } else if (Is_rogue_level(g.u?.uz)) {
            await pline('You feel a draft.');
        }
    }

    /* C: closed_door — overwrites rangemod */
    if (isClosedDoorLoc(loc)) {
        rangemod = -1000;
        let newDoormask = -1;
        let seeTxt = '';
        let senseTxt = '';
        let hearTxt = '';

        switch (damg) {
        case ZT_FIRE:
            newDoormask = D_NODOOR;
            seeTxt = 'The door is consumed in flames!';
            senseTxt = 'You smell smoke.';
            break;
        case ZT_COLD:
            newDoormask = D_NODOOR;
            seeTxt = 'The door freezes and shatters!';
            hearTxt = 'a deep cracking sound.';
            break;
        case ZT_DEATH:
            if (Math.abs(type | 0) !== ZT_BREATH(ZT_DEATH)) {
                /* default absorb */
                if (doorExploding > 0 && seeIt) {
                    await pline('The door remains intact.');
                } else if (seeIt) {
                    const subj = yourZap ? 'your' : 'the';
                    await pline(`The door absorbs ${subj} ${zapverb}!`);
                } else {
                    await pline('You feel vibrations.');
                }
                return rangemod;
            }
            newDoormask = D_NODOOR;
            seeTxt = 'The door disintegrates!';
            hearTxt = 'crashing wood.';
            break;
        case ZT_LIGHTNING:
            newDoormask = D_BROKEN;
            seeTxt = 'The door splinters!';
            hearTxt = 'crackling.';
            break;
        default:
            if (doorExploding > 0 && seeIt) {
                await pline('The door remains intact.');
            } else if (seeIt) {
                const subj = yourZap ? 'your' : 'the';
                await pline(`The door absorbs ${subj} ${zapverb}!`);
            } else {
                await pline('You feel vibrations.');
            }
            return rangemod;
        }

        if (newDoormask >= 0) {
            void _shopdamage; /* C: add_damage + *shopdamage in shop — stub */
            loc.doormask = newDoormask;
            g.vision_full_recalc = 1;
            if (seeIt && seeTxt) await pline(seeTxt);
            else if (!seeIt && senseTxt) await pline(senseTxt);
            else if (!seeIt && hearTxt) await pline(`You hear ${hearTxt}`);
            newsym(x, y);
        }
    }

    return rangemod;
}

/**
 * C: zap.c buzz()/bhit() — walk **`(dx,dy)`** from **`(x0,y0)`**, each step **`range += zap_over_floor(...)`**.
 * When **`dx`=`dy`=0`**, a single **`zapOverFloor`** at **`(x0,y0)`** (hero self-zap / harness).
 *
 * @param {import('./gstate.js').game} g
 * @param {number} x0
 * @param {number} y0
 * @param {number} dx — −1, 0, or 1
 * @param {number} dy — −1, 0, or 1
 * @param {number} type — e.g. **`ZT_SPELL(ZT_COLD)`**
 * @param {number} [maxRange] — C beam range cap; default **`BOLT_LIM`**
 */
export async function zapOverFloorAlongRay(g, x0, y0, dx, dy, type, maxRange = BOLT_LIM) {
    const sx = x0 | 0;
    const sy = y0 | 0;
    const ddx = dx | 0;
    const ddy = dy | 0;
    if (ddx === 0 && ddy === 0) {
        await zapOverFloor(g, sx, sy, type);
        return;
    }
    let remaining = maxRange | 0;
    if (remaining <= 0) return;
    const cap = maxRange | 0;
    for (let i = 1; i <= cap; i++) {
        const x = sx + ddx * i;
        const y = sy + ddy * i;
        if (!isok(x, y)) break;
        const mod = await zapOverFloor(g, x, y, type);
        remaining += mod;
        if (mod <= -1000) break;
        if (remaining <= 0) break;
    }
}
