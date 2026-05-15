// extcmd.js — Extended commands (`#` prefix, doextcmd).
// C ref: cmd.c doextcmd, extcmdlist

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, pline, docrt } from './display.js';
import { versionPlineText } from './nethack_version.js';
import { enhanceWeaponSkillOneStep } from './u_init_skills.js';

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
        /* C: cmd.c doextcmd → enhance_weapon_skill — menu not ported; one auto-pick per #e */
        const r = enhanceWeaponSkillOneStep();
        if (!r.ok) await pline('You cannot enhance any skills at the moment.');
        else {
            await pline(r.advancePline);
            if (r.moreDangerousPline) await pline(r.moreDangerousPline);
        }
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    await pline(`Unknown extended command '#${ch2}'.`);
    game._retainMessageAfterCommand = true;
    await flush_screen(1);
}
