// dir_input.js — Read a vi movement key into **`u.dx`/`u.dy`** ( **`cmd.c`** **`getdir`** subset).

import { DIRECTION_KEYS, RUN_KEYS } from './const.js';
import { nhgetch } from './input.js';

/**
 * C: cmd.c **`getdir`** — one key sets **`u.dx`/`u.dy`** (**`hack.c`** movement deltas).
 * @param {import('./gstate.js').game} g
 * @returns {Promise<boolean>} false on ESC / unknown key
 */
export async function readDirIntoU(g) {
    const u = g.u;
    if (!u) return false;
    const k = await nhgetch();
    if (k === 27) return false;
    const ch = String.fromCharCode(k);
    let vec = DIRECTION_KEYS[ch];
    if (!vec) vec = RUN_KEYS[ch];
    if (!vec) return false;
    u.dx = vec[0] | 0;
    u.dy = vec[1] | 0;
    return true;
}
