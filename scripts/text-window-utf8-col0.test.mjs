import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { show_text_pages } from "../js/pager.js";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { H_UTF8, H_DEC } from "../js/const.js";

// C ref: wintty.c process_text_window `:1819–1829` linestart — under
// SYMHANDLING(H_UTF8) (`:1820–1822`) a text line's first char goes through
// g_putch, whose patch-006 nomux hook writes at the pre-incremented curx
// (one cell right); the second char's hook overwrites it, so the capture
// keeps col 0 cleared and loses text[0]. Enhanced recordings show
// " mdassist..." / " alid..." (the `cmd.c` getdir cliffs row — getdir
// itself is whole since D-2434; the writer is this paint path). A
// high-bit first char under other handlings takes the same g_putch arm
// (`:1823–1825` + end_glyphout, D-3962 omission (1) text path). A 1-char
// line shifts (no second char to overwrite): " x". The dmore footer
// paints via its own path and stays intact.
function stubDisplay() {
    const cells = new Map();
    const disp = {
        cols: 80,
        rows: 24,
        clearScreen() { cells.clear(); },
        setCell(c, r, ch) { cells.set(c + "," + r, ch); },
        setCursor() {},
    };
    return { disp, cells };
}
// NOTE: the stub has no `grid`, so erase_menu_or_text early-returns and
// every recorded setCell is a text/footer paint.

describe("TEXT window linestart capture (wintty.c:1819-1829)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            disp: game.nhDisplay,
            gs: game.gs,
            cg: game.currentgraphics,
            overlay: game._menu_overlay,
            pend: game._pending_message,
        };
        resetInputState();
    });
    afterEach(() => {
        game.nhDisplay = saved.disp;
        game.gs = saved.gs;
        game.currentgraphics = saved.cg;
        game._menu_overlay = saved.overlay;
        game._pending_message = saved.pend;
        resetInputState();
    });

    it("UTF8 handling drops the first char of each text line, footer intact", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_UTF8 }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_text_pages(["cmdassist: Invalid direction key!", "", "Valid direction keys are:"]);
        assert.equal(cells.has("0,0"), false);
        assert.equal(cells.get("1,0"), "m");
        assert.equal(cells.get("32,0"), "!");
        assert.equal(cells.has("0,2"), false);
        assert.equal(cells.get("1,2"), "a");
        assert.equal(cells.get("0,23"), "-");
        assert.equal(cells.get("7,23"), "-");
    });

    it("DEC handling paints col 0 (control)", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_DEC }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_text_pages(["cmdassist: Invalid direction key!"]);
        assert.equal(cells.get("0,0"), "c");
        assert.equal(cells.get("1,0"), "m");
    });

    it("high-bit first char drops col 0 under DEC handling (IBM arm)", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_DEC }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_text_pages(["¼ corner"]);
        assert.equal(cells.has("0,0"), false);
        assert.equal(cells.get("1,0"), " ");
        assert.equal(cells.get("2,0"), "c");
    });

    it("1-char line under UTF8 shifts to col 1", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_UTF8 }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_text_pages(["x"]);
        assert.equal(cells.has("0,0"), false);
        assert.equal(cells.get("1,0"), "x");
    });
});
