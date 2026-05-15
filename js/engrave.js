// engrave.js — Floor engravings and reachability at the hero’s square.
// C ref: engrave.c read_engr_at(), can_reach_floor()

import { game } from './gstate.js';
import { Is_airlevel, Is_waterlevel, is_pit, P_BASIC, P_RIDING } from './const.js';
import { raceptr } from './mondata.js';
import { tAt } from './search.js';

/** C: monflag.h MZ_HUGE */
const MZ_HUGE = 4;

/** C: sticks(ptr) — adhesive grip; stub until mondata.c is wired. */
function sticks(/** @type {unknown} */ _ptr) {
    return false;
}

/** C: attacktype(mdat, AT_HUGS) — stub until monst.c / mattack.c. */
function attackTypeHugs(/** @type {unknown} */ _mon) {
    return false;
}

/** C: ceiling_hider(ptr) — e.g. ceiling hider poly; stub false. */
function ceilingHider(/** @type {unknown} */ _ptr) {
    return false;
}

/**
 * C: engrave.c can_reach_floor(boolean check_pit)
 * @param {boolean} [checkPit] — C: traphere && is_pit(traphere->ttyp) from pickup.c
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

/** C: read_engr_at(x, y) — subset of pickup() on restore. */
export function readEngrAt(x, y) {
    void x;
    void y;
}
