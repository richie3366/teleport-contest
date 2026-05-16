// livelog.js — C do.c goto_level "entered %s" + record.c livelog_printf metadata (contest: no file I/O).
// C ref: do.c goto_level (after **`new`** from **`mklev`**) — **`describe_level(dloc, 2)`**; **`livelog_printf(major ? LL_ACHIEVE : LL_DEBUG, "entered %s", dloc)`**.

import { LL_ACHIEVE, LL_DEBUG } from './const.js';
import { In_endgame, In_quest, Is_astralevel } from './const.js';
import { describeLevelLivelogEnteredBufLikeC } from './describe_level.js';

/**
 * C: **`do.c`** **`goto_level`** — **`major`** for **`livelog_printf`** first arg; **`dloc`** from **`describe_level(..., 2)`**.
 * Pure return value; **`maybeRecordEnteredNewLevelLivelogLikeC`** stores **`g.context.lastEnteredLevelLivelog`** on first visit per **`(dnum,dlevel)`** after **`mklev`**.
 * @param {import('./gstate.js').game} g
 * @returns {{ flags: number, dloc: string, template: string } | null}
 */
export function enteredNewLevelLivelogMetaLikeC(g) {
    const uz = g?.u?.uz;
    if (!uz) return null;
    const major = (In_endgame(uz) && !Is_astralevel(uz)) || In_quest(uz);
    return {
        flags: major ? LL_ACHIEVE : LL_DEBUG,
        dloc: describeLevelLivelogEnteredBufLikeC(g),
        template: 'entered %s',
    };
}

/** C: **`d_level`** key for visit set (**`ledger_no`** parity stub). */
export function heroLevelVisitKeyLikeC(uz) {
    if (!uz) return '';
    return `${uz.dnum | 0}:${uz.dlevel | 0}`;
}

/**
 * C: **`do.c`** **`goto_level`** — **`if (new)`** after **`mklev`** when the level was first materialized (**`!LFILE_EXISTS`**).
 * JS: at most one **`entered`** livelog meta per **`(dnum,dlevel)`** per session, only after **`mklev()`** returned true.
 * Sets **`g.context.lastEnteredLevelLivelog`**; **`livelog_printf`** / file sink still TODO.
 * @param {import('./gstate.js').game} g
 * @returns {boolean} true if this was the first visit and meta was stored.
 */
export function maybeRecordEnteredNewLevelLivelogLikeC(g) {
    const uz = g?.u?.uz;
    if (!uz) return false;
    g.gd = g.gd || {};
    const key = heroLevelVisitKeyLikeC(uz);
    const visits = g.gd.hero_level_visits ?? (g.gd.hero_level_visits = Object.create(null));
    if (visits[key]) return false;
    visits[key] = true;
    g.context = g.context || {};
    const meta = enteredNewLevelLivelogMetaLikeC(g);
    if (meta) g.context.lastEnteredLevelLivelog = meta;
    return !!meta;
}
