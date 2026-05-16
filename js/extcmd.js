// extcmd.js — Extended commands (`#` prefix, doextcmd).
// C ref: cmd.c doextcmd, extcmdlist
//
// JS extras: wizard **`#F`** — cold **`zapOverFloorAlongRay`** from hero using **`u.dx`/`u.dy`**
// ( **`zap.c`** beam **`range += zap_over_floor`** stepping; single tile when **`dx`=`dy`=0`**).

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, pline, docrt } from './display.js';
import { versionPlineText } from './nethack_version.js';
import { enhanceWeaponSkillOneStep } from './u_init_skills.js';
import { zapOverFloorAlongRay, ZT_SPELL, ZT_COLD } from './zap_over_floor.js';

/** C: doextcmd — echo '#' on the top line, then read the next key (tty). */
export async function runExtcmdFromHashPrefix() {
    game.context.move = 0;
    if (game._overlayScreen || game._inventoryMode) {
        game._overlayScreen = null;
        game._inventoryMode = false;
        await docrt();
    }
    game._pending_message = '#';
    await flush_screen(1);
    const k = await nhgetch();
    game._pending_message = '';
    if (k === 27) {
        await flush_screen(1);
        return;
    }
    const ch2 = String.fromCharCode(k);
    if (ch2 === 'v' || ch2 === 'V') {
        await pline(versionPlineText());
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    if (ch2 === 'e' || ch2 === 'E') {
        /* C: cmd.c doextcmd → enhance_weapon_skill — menu not ported; wizard y_n → speedy */
        let speedy = false;
        if (game.flags?.wizard) {
            await pline('Advance skills without practice? [yn]');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            const ans = await nhgetch();
            speedy = ans === 121 || ans === 89; /* y Y */
        }
        const r = enhanceWeaponSkillOneStep(game, { speedy });
        if (!r.ok) await pline('You cannot enhance any skills at the moment.');
        else {
            for (const line of r.plines) {
                await pline(line);
            }
        }
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    if (ch2 === 'F' && game.flags?.wizard) {
        /* C: zap.c buzz/bhit + zap_over_floor — cold spell beam from hero (wizard harness). */
        const u = game.u;
        if (u) {
            await zapOverFloorAlongRay(
                game,
                u.ux | 0,
                u.uy | 0,
                u.dx | 0,
                u.dy | 0,
                ZT_SPELL(ZT_COLD),
            );
        }
        await flush_screen(1);
        return;
    }
    await pline(`Unknown extended command '#${ch2}'.`);
    game._retainMessageAfterCommand = true;
    await flush_screen(1);
}
