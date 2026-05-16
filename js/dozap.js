// dozap.js — **`#zap`** / **`z`** ( **`zap.c`** **`dozap`** / **`weffects`** subset until full **`getobj`**).
// C ref: zap.c **`dozap`**, **`weffects`** (**`WAN_DIGGING`** → **`zap_dig()`**; ray block **`WAN_MAGIC_MISSILE`…`WAN_LIGHTNING`**
//        → **`ubuzz(BZ_U_WAND(BZ_OFS_WAN(otyp)), …)`**); **`zap_ok`** (**`WAND_CLASS`** only).

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { readDirIntoU } from './dir_input.js';
import {
    ubuzzOverFloor,
    wandUbuzzTypeFromOtyp,
    WAN_DIGGING,
    WAN_FIRE,
    WAN_MAGIC_MISSILE,
    WAN_LIGHTNING,
} from './buzz.js';
import { heroZapDigHorizontalLikeC } from './zap_dig.js';
import { NH5_WAND_CLASS } from './nh5_objclass.js';

/**
 * C: zap.c **`zap_ok`** — first carried wand (**`getobj`** not ported; order = invent chain).
 * @param {import('./gstate.js').game} g
 * @returns {{ otyp: number }|null}
 */
export function firstCarriedWandForZapLikeC(g) {
    for (let o = g.invent; o; o = o.nobj) {
        if ((o.oclass | 0) === NH5_WAND_CLASS) return o;
    }
    return null;
}

/**
 * C: zap.c **`weffects`** — **`nd`** for hero ray (**`2`** magic missile, else **`6`**).
 * @param {number} otyp
 */
export function wandUbuzzNdLikeC(otyp) {
    return (otyp | 0) === WAN_MAGIC_MISSILE ? 2 : 6;
}

/** C: zap.c **`weffects`** — directional digging + offensive ray wands only ( **`oc_dir`** **`RAY`**). */
function wandOtypUsesGetdirLikeC(otyp) {
    const t = otyp | 0;
    if (t === WAN_DIGGING) return true;
    return t >= WAN_MAGIC_MISSILE && t <= WAN_LIGHTNING;
}

/**
 * C: zap.c **`dozap`** → **`weffects`** (no **`zappable`** / backfire / **`zapyourself`** yet).
 */
export async function doZapCmd() {
    const g = game;
    g.context.move = 0;
    const wand = firstCarriedWandForZapLikeC(g);

    if (!wand) {
        if (!g.flags?.wizard) {
            await pline('You do not have anything to zap yet.');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            return;
        }
        /* Harness until **`g.invent`** links real wands: same as historical wizard fire test. */
        await pline('In what direction?');
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        if (!(await readDirIntoU(g))) {
            await pline('Never mind.');
            await flush_screen(1);
            return;
        }
        await ubuzzOverFloor(g, wandUbuzzTypeFromOtyp(WAN_FIRE), 6);
        await flush_screen(1);
        return;
    }

    const otyp = wand.otyp | 0;
    if (!wandOtypUsesGetdirLikeC(otyp)) {
        await pline('Nothing happens.');
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }

    await pline('In what direction?');
    game._retainMessageAfterCommand = true;
    await flush_screen(1);
    if (!(await readDirIntoU(g))) {
        /* C: **`getdir`** cancel — **`The <wand> glows and fades.`** when !Blind */
        await pline('The wand glows and fades.');
        await flush_screen(1);
        return;
    }

    const u = g.u;
    if (u && !(u.dx | 0) && !(u.dy | 0) && !(u.dz | 0)) {
        /* C: **`zapyourself`** — digging is a no-op; ray self-zap not ported */
        if (otyp === WAN_DIGGING) {
            await flush_screen(1);
            return;
        }
        await pline('Nothing happens.');
        await flush_screen(1);
        return;
    }

    if (otyp === WAN_DIGGING) {
        await heroZapDigHorizontalLikeC(g);
    } else {
        await ubuzzOverFloor(g, wandUbuzzTypeFromOtyp(otyp), wandUbuzzNdLikeC(otyp));
    }
    await flush_screen(1);
}
