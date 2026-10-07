import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
    mark_topline_prompt,
    mark_topline_empty,
    clear_message_window_menu_overlay,
} from "../js/display.js";

// C refs: end.c really_done `:1246–1247` display_nhwindow(WIN_MESSAGE);
// wintty.c tty_display_nhwindow NHW_MESSAGE arm `:1873–1884` (not-NEED_MORE
// settles toplin EMPTY + msg cur zero with NO visual erase) and the NHW_MENU
// overlay arm `:1938–1941` → tty_clear_nhwindow(WIN_MESSAGE) `:1047–1058`
// (erase only when toplin != EMPTY).
//
// Wizard-mode death: the answered "Die? [yn] (n)" yn prompt stays visible
// (stale pixels, EMPTY state) while the disclose-inventory menu overlays it
// (scen-dig-Caveman-94195 step 82: C keeps «Die? [yn] (n)Weapons», JS showed
// «Weapons» only). Pins the settle + guarded-overlay-clear fix.
describe("death disclose topline retention (Die? prompt under menu)", () => {
    let savedPending;
    beforeEach(() => {
        savedPending = game._pending_message;
        // Simulate the answered yn prompt: NON_EMPTY + visible prompt text.
        mark_topline_prompt("Die? [yn] (n) ");
    });
    afterEach(() => {
        mark_topline_empty();
        game._pending_message = savedPending;
    });

    it("really_done settle keeps the stale prompt, overlay clear then skips", () => {
        mark_topline_empty();
        assert.equal(game._pending_message, "Die? [yn] (n) ");
        clear_message_window_menu_overlay();
        assert.equal(game._pending_message, "Die? [yn] (n) ");
    });

    it("menu overlay clear erases when topline NON_EMPTY (normal play)", () => {
        clear_message_window_menu_overlay();
        assert.equal(game._pending_message, "");
    });
});
