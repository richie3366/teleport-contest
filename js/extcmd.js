// extcmd.js — Extended commands (`#` prefix, doextcmd).
// C ref: cmd.c doextcmd, extcmdlist
//
// JS extras: wizard **`#F`** — **`ubuzz`** spell cold; **`#c`** — wand cold (**`ZT_WAND`**);
// wizard **`z`** — **`dozap.js`** getdir + wand fire (**`weffects`** **`WAN_FIRE`** slice).

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, pline, docrt } from './display.js';
import { versionPlineText } from './nethack_version.js';
import { enhanceWeaponSkillOneStep } from './u_init_skills.js';
import { ZT_SPELL, ZT_COLD, ZT_WAND } from './zap_over_floor.js';
import { ubuzzOverFloor } from './buzz.js';

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
        /* C: zap.c ubuzz — cone of cold (**`ZT_SPELL(ZT_COLD)`**), wizard harness. */
        await ubuzzOverFloor(game, ZT_SPELL(ZT_COLD), 0);
        await flush_screen(1);
        return;
    }
    if (ch2 === 'c' && game.flags?.wizard) {
        /* C: zap.c weffects — wand of cold (**`ZT_WAND(ZT_COLD)`**), same facing as **`#F`**. */
        await ubuzzOverFloor(game, ZT_WAND(ZT_COLD), 6);
        await flush_screen(1);
        return;
    }
    await pline(`Unknown extended command '#${ch2}'.`);
    game._retainMessageAfterCommand = true;
    await flush_screen(1);
}
