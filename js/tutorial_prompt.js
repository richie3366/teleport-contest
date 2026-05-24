// tutorial_prompt.js — Tutorial yes/no when special level tut-1 exists.
// C ref: options.c ask_do_tutorial() (NHW_MENU + select_menu(PICK_ONE) loop).

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, clearPendingMessageAndToplineLikeC } from './display.js';
import { NO_COLOR } from './terminal.js';

const MENU_COL = 21;

/**
 * C: options.c config-file hint (tty **`seed0077`** records **`.nethackrc`** basename).
 * @returns {string}
 */
export function tutorialSkipQueryHintLineLikeC() {
    return 'Put "OPTIONS=!tutorial" in .nethackrc to skip this query.';
}

/**
 * C: options.c **`ask_do_tutorial`** — tty menu rows at column **21** (map stays visible).
 * @param {import('./game_display.js').GameDisplay} disp
 * @returns {Promise<boolean>} true → tutorial, false → skip or ESC
 */
export async function askDoTutorialMenuTTYLikeC(disp) {
    const hint = tutorialSkipQueryHintLineLikeC();
    /* C: first key dismisses welcome `--More--` before tutorial menu paints. */
    if (game._toplineNeedMore) await nhgetch();
    const g = game;
    g._tutorialMenuActive = true;
    clearPendingMessageAndToplineLikeC();
    for (let pass = 0; ; pass++) {
        g._pending_message = `\x1b[${MENU_COL}C\x1b[7mDo you want a tutorial?\x1b[0m`;
        disp.putstr(MENU_COL, 2, 'y - Yes, do a tutorial', NO_COLOR, 0);
        disp.putstr(MENU_COL, 3, 'n - No, just start play', NO_COLOR, 0);
        disp.putstr(MENU_COL, 5, hint, NO_COLOR, 0);
        if (pass > 0) {
            disp.putstr(MENU_COL, 17, "(Please choose 'y' or 'n'.)", NO_COLOR, 0);
        }
        disp.putstr(MENU_COL, 6, '(end)', NO_COLOR, 0);
        await flush_screen(1);
        const k = await nhgetch();
        if (k === 27) break;
        if (k === 121 || k === 89) {
            g._tutorialMenuActive = false;
            clearPendingMessageAndToplineLikeC();
            return true;
        }
        if (k === 110 || k === 78) break;
    }
    g._tutorialMenuActive = false;
    clearPendingMessageAndToplineLikeC();
    return false;
}
