// livelog.js — C do.c goto_level "entered %s" + record.c livelog_printf metadata (contest: no file I/O).
// C ref: do.c goto_level (after **`new`** from **`mklev`**) — **`describe_level(dloc, 2)`**; **`livelog_printf(major ? LL_ACHIEVE : LL_DEBUG, "entered %s", dloc)`**.

import { LL_ACHIEVE, LL_DEBUG } from './const.js';
import { In_endgame, In_quest, Is_astralevel } from './const.js';
import { describeLevelLivelogEnteredBufLikeC } from './describe_level.js';

/**
 * C: **`do.c`** **`goto_level`** — **`major`** for **`livelog_printf`** first arg; **`dloc`** from **`describe_level(..., 2)`**.
 * Pure return value; wire to **`livelog_printf`** / recorder when **`goto_level`** **`LFILE_EXISTS`** / **`new`** parity exists.
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
