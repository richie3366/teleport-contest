// engrave.js — Floor engravings and reachability at the hero’s square.
// C ref: engrave.c read_engr_at(), engr_at(), make_engr_at(), can_reach_floor();
//        dungeon.c surface()

import { game } from './gstate.js';
import { pline } from './display.js';
import {
    Is_airlevel,
    Is_waterlevel,
    is_pit,
    P_BASIC,
    P_RIDING,
    IS_POOL,
    IS_LAVA,
    IS_ALTAR,
    IS_GRAVE,
    IS_FOUNTAIN,
    IS_DOOR,
    IS_ROOM,
    IS_WALL,
    DRAWBRIDGE_DOWN,
    ICE,
} from './const.js';
import { raceptr } from './mondata.js';
import { tAt } from './search.js';
import { levlTypAt, stairwayAt } from './decor.js';

/** C: engrave.h — engraving_texts */
export const ENGR_TXT_ACTUAL = 0;
export const ENGR_TXT_REMEMBERED = 1;
export const ENGR_TXT_PRISTINE = 2;

/** C: engrave.h engr_type */
export const ENGR_DUST = 1;
export const ENGR_ENGRAVE = 2;
export const ENGR_BURN = 3;
export const ENGR_MARK = 4;
export const ENGR_BLOOD = 5;
export const ENGR_HEADSTONE = 6;

/** C: monflag.h MZ_HUGE */
const MZ_HUGE = 4;

/** C: sticks(ptr) — stub until mondata.c */
function sticks(/** @type {unknown} */ _ptr) {
    return false;
}

/** C: attacktype(..., AT_HUGS) — stub */
function attackTypeHugs(/** @type {unknown} */ _mon) {
    return false;
}

/** C: ceiling_hider — stub */
function ceilingHider(/** @type {unknown} */ _ptr) {
    return false;
}

function engravingsList() {
    const L = game.level;
    if (!L) return null;
    if (!L.engravings) L.engravings = [];
    return L.engravings;
}

/**
 * C: engrave.c engr_at(x, y)
 * @returns {{ engr_x: number, engr_y: number, engr_type: number, engr_txt: string[], eread: number, erevealed: number, engr_time?: number }|null}
 */
export function engrAt(x, y) {
    const list = engravingsList();
    if (!list) return null;
    return list.find((e) => e.engr_x === x && e.engr_y === y) ?? null;
}

/** C: del_engr — remove engraving at (x,y) if present. */
export function delEngrAt(x, y) {
    const L = game.level;
    if (!L?.engravings?.length) return;
    L.engravings = L.engravings.filter((e) => !(e.engr_x === x && e.engr_y === y));
}

/**
 * C: make_engr_at — minimal until full doengrave port.
 * @param {number} engrType — ENGR_* constants
 */
export function makeEngrAt(x, y, text, engrType = ENGR_ENGRAVE) {
    const s = text || '';
    delEngrAt(x, y);
    const ep = {
        engr_x: x,
        engr_y: y,
        engr_type: engrType,
        engr_txt: [s, s, s],
        eread: 0,
        erevealed: 0,
        engr_time: 0,
    };
    engravingsList()?.push(ep);
    return ep;
}

/** C: dungeon.c surface(x, y) — subset for read_engr_at eloc. */
function surfaceAt(x, y) {
    const levtyp = levlTypAt(x, y);
    const u = game.u;
    if (IS_POOL(levtyp) && u?.underwater) return 'bottom';
    if (IS_POOL(levtyp)) return 'water';
    if (levtyp === ICE) return 'ice';
    if (IS_LAVA(levtyp)) return 'lava';
    if (levtyp === DRAWBRIDGE_DOWN) return 'bridge';
    if (IS_ALTAR(levtyp)) return 'altar';
    if (IS_GRAVE(levtyp)) return 'headstone';
    if (IS_FOUNTAIN(levtyp)) return 'fountain';
    if (stairwayAt(x, y)) return 'stairs';
    if (IS_WALL(levtyp)) return 'wall';
    if (IS_DOOR(levtyp)) return 'doorway';
    if (IS_ROOM(levtyp)) return 'floor';
    return 'ground';
}

/**
 * C: engrave.c can_reach_floor(boolean check_pit)
 * @param {boolean} [checkPit]
 */
export function canReachFloor(checkPit = false) {
    const u = game.u;
    if (!u) return false;

    if (u.uswallow) return false;

    const ptr = raceptr(game.youmonst);
    if (u.ustuck && !sticks(ptr) && attackTypeHugs(u.ustuck)) return false;

    if (u.ulevitation && !Is_airlevel(u.uz) && !Is_waterlevel(u.uz)) return false;

    if (u.usteed && (u.skills?.[P_RIDING] ?? 0) < P_BASIC) return false;

    if (u.uundetected && ceilingHider(ptr)) return false;

    if (u.uflying || ptr.msize >= MZ_HUGE) return true;

    if (checkPit) {
        const t = tAt(u.ux, u.uy);
        if (t && is_pit(t.ttyp) && (u.uteetering_seen_pit || u.uescaped_shaft)) return false;
    }

    return true;
}

/**
 * C: engrave.c read_engr_at(x, y)
 * @param {number} x
 * @param {number} y
 */
export async function readEngrAt(x, y) {
    const ep = engrAt(x, y);
    const eloc = surfaceAt(x, y);
    let sensed = 0;

    if (!ep || !ep.engr_txt?.[ENGR_TXT_ACTUAL]?.[0]) return;

    const Blind = !!game.u?.ublind;

    switch (ep.engr_type) {
    case ENGR_DUST:
        if (!Blind) {
            sensed = 1;
            const dustWord = levlTypAt(x, y) === ICE ? 'frost' : 'dust';
            await pline(`Something is written here in the ${dustWord}.`);
        }
        break;
    case ENGR_ENGRAVE:
    case ENGR_HEADSTONE:
        if (!Blind || canReachFloor(true)) {
            sensed = 1;
            await pline(`Something is engraved here on the ${eloc}.`);
        }
        break;
    case ENGR_BURN:
        if (!Blind || canReachFloor(true)) {
            sensed = 1;
            const verb = levlTypAt(x, y) === ICE ? 'melted' : 'burned';
            await pline(`Some text has been ${verb} into the ${eloc} here.`);
        }
        break;
    case ENGR_MARK:
        if (!Blind) {
            sensed = 1;
            await pline(`There's some graffiti on the ${eloc} here.`);
        }
        break;
    case ENGR_BLOOD:
        if (!Blind) {
            sensed = 1;
            await pline('You see a message scrawled in blood here.');
        }
        break;
    default:
        sensed = 1;
        await pline('Something is written in a very strange way.');
        break;
    }

    if (!sensed) return;

    let et = ep.engr_txt[ENGR_TXT_ACTUAL];
    const maxelen = 256;
    if (et.length > maxelen) et = et.slice(0, maxelen);

    const elen = et.length;
    const pr = ep.engr_txt[ENGR_TXT_PRISTINE];
    const last = elen > 0 ? et[elen - 1] : '';
    const endpunct = elen < 2 || !(pr && pr[elen - 1] === last && '.!?'.includes(last)) ? '.' : '';

    const verb = Blind ? 'feel the words' : 'read';
    await pline(`You ${verb}: "${et}"${endpunct}`);

    ep.engr_txt[ENGR_TXT_REMEMBERED] = ep.engr_txt[ENGR_TXT_ACTUAL];
    ep.eread = 1;
    ep.erevealed = 1;

    if ((game.context?.run ?? 0) > 0) game.context.run = 0;
}
