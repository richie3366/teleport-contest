// describe_level.js — C botl.c describe_level() subset for TTY status (dflgs branch addbranch==0).
// C ref: botl.c describe_level(); dungeon.c endgamelevelname().

import { depth } from './hacklib.js';
import { In_quest, In_endgame, Is_knox_level } from './const.js';
import { inTutorialAtLevelLikeC } from './tutorial_branch.js';

/**
 * C: **`dungeon.c`** **`endgamelevelname(char *outbuf, int indx)`** — **`indx`** is **`depth(&u.uz)`**.
 * @param {number} indx
 * @returns {string}
 */
export function endgamelevelnameLikeC(indx) {
    const i = Number(indx) | 0;
    switch (i) {
    case -5:
        return 'Astral Plane';
    case -4:
        return 'Plane of Water';
    case -3:
        return 'Plane of Fire';
    case -2:
        return 'Plane of Air';
    case -1:
        return 'Plane of Earth';
    default:
        return `unknown plane #${i}`;
    }
}

/** C: **`botl.c`** **`strsubst(buf, "Plane of ", "")`** for status (**`!addbranch`**). */
function stripPlaneOfPrefixLikeC(s) {
    return String(s ?? '').replace('Plane of ', '');
}

/** C: **`%-2d`** depth column after **`Tutorial:`** / **`Dlvl:`**. */
function describeLevelDepthColMinus2dLikeC(uz) {
    const d = depth(uz);
    const t = String(d | 0);
    return t.length >= 2 ? t : `${t} `;
}

/**
 * C: **`botl.c`** **`describe_level`** first field for status (no branch name suffix).
 * @param {import('./gstate.js').game} g
 * @param {{ dnum?: number, dlevel?: number }} uz
 * @returns {string}
 */
export function describeLevelStatusSlotLikeC(g, uz) {
    const lev = uz || { dnum: 0, dlevel: 1 };

    if (Is_knox_level(lev)) {
        const dn = g?.dungeons?.[lev.dnum | 0]?.dname;
        const s = String(dn ?? '').trim();
        return s || 'Knox';
    }
    if (In_quest(lev)) {
        /* C: **`Home %d`**, **`dunlev(&u.uz)`** === **`dlevel`** within branch */
        return `Home ${lev.dlevel | 0}`;
    }
    if (In_endgame(lev)) {
        const raw = endgamelevelnameLikeC(depth(lev));
        return stripPlaneOfPrefixLikeC(raw);
    }

    const label = inTutorialAtLevelLikeC(g, lev) ? 'Tutorial' : 'Dlvl';
    return `${label}:${describeLevelDepthColMinus2dLikeC(lev)}`;
}
