// wizcmds.js — Wizard-mode extended commands (partial).
// C ref: wizcmds.c

import { game } from './gstate.js';
import { pline } from './display.js';
import { getlin } from './getline.js';
import { pluslvl } from './exper.js';
import { MAXULEV } from './const.js';

/**
 * C ref: wizcmds.c wiz_level_change — #levelchange
 * Level-drain (losexp) path deferred; raise via pluslvl(FALSE) only.
 */
export async function wiz_level_change() {
    const u = game.u || (game.u = {});
    const buf = await getlin('To what experience level do you want to be set?');
    if (!buf || buf === '\x1b') return;

    const trimmed = buf.trim();
    if (!trimmed) return;

    // C: sscanf("%d%c") must consume the whole string as one int
    if (!/^-?\d+$/.test(trimmed)) {
        await pline('Never mind.');
        return;
    }
    let newlevel = parseInt(trimmed, 10);
    if (!Number.isFinite(newlevel)) {
        await pline('Never mind.');
        return;
    }

    if (newlevel === (u.ulevel | 0)) {
        await pline('You are already that experienced.');
    } else if (newlevel < (u.ulevel | 0)) {
        // C: losexp("#levelchange") loop — deferred (tours only raise)
        if ((u.ulevel | 0) === 1) {
            await pline('You are already as inexperienced as you can get.');
            return;
        }
        // Drain path omitted; see C-JS-MAP.
        return;
    } else {
        if ((u.ulevel | 0) >= MAXULEV) {
            await pline('You are already as experienced as you can get.');
            return;
        }
        if (newlevel > MAXULEV) newlevel = MAXULEV;
        while ((u.ulevel | 0) < newlevel) {
            await pluslvl(false);
        }
    }
    u.ulevelmax = u.ulevel;
}
