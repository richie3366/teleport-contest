// dozap.js — **`#zap`** / **`z`** until full **`getobj`** invent exists.
// C ref: zap.c **`dozap`**, **`weffects`** (RAY wands → **`ubuzz(BZ_U_WAND(BZ_OFS_WAN(otyp)), …)`**).

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { readDirIntoU } from './dir_input.js';
import { ubuzzOverFloor, wandUbuzzTypeFromOtyp, WAN_MAGIC_MISSILE } from './buzz.js';

/** C: objects.h — **`WAN_FIRE`** immediately after **`WAN_MAGIC_MISSILE`**. */
const WAN_FIRE = WAN_MAGIC_MISSILE + 1;

/**
 * Wizard harness: **`getdir`** then **`ubuzz`** with wand-of-fire encoding (**`nd`** ignored here).
 * Non-wizard: cancel-style message (no **`getobj`** yet).
 */
export async function doZapCmd() {
    const g = game;
    g.context.move = 0;
    if (!g.flags?.wizard) {
        await pline('You do not have anything to zap yet.');
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
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
}
