import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { show_nhw_menu_text } from "../js/pager.js";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { H_UTF8, H_DEC } from "../js/const.js";

// C ref: wintty.c process_text_window `:1805–1831` linestart — putstr-only
// NHW_MENU windows carry cw->data, so tty_display_nhwindow (`:1943–1946`)
// routes them through process_text_window, not process_menu_window. Under
// SYMHANDLING(H_UTF8) (`:1820–1822`) a line's first char goes through
// g_putch, whose patch-006 nomux hook writes at the pre-incremented curx
// (one cell right); the second char's hook overwrites it, so the capture
// keeps the text-start cell cleared and loses text[0]. Corner (offx≠0,
// H2344 `:1914`): pad at offx, text[0] dropped at offx+1, text from
// offx+2 — Enhanced recordings show "hings that are here:" (the
// `invent.c` look_here cliffs row: Knight-50058518 s22 and 3 more; the
// D-3977 omission-(1) falsifier). A high-bit first char under other
// handlings takes the same g_putch arm (`:1823–1825` + end_glyphout). A
// 1-char line shifts instead (no second char to overwrite it). The dmore
// footer paints via its own path and stays intact.
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
// every recorded setCell is a menu/footer paint. _menu_overlay is preset
// so the helper's grid-sync flush_screen(1)s take the overlay early-return
// (they paint topline/status, not menu cells).

describe("menu-text linestart capture (wintty.c:1805-1831, D-3977 omission 1)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            disp: game.nhDisplay,
            gs: game.gs,
            cg: game.currentgraphics,
            overlay: game._menu_overlay,
            pend: game._pending_message,
            iflags: game.iflags,
        };
        game._menu_overlay = true;
        resetInputState();
    });
    afterEach(() => {
        game.nhDisplay = saved.disp;
        game.gs = saved.gs;
        game.currentgraphics = saved.cg;
        game._menu_overlay = saved.overlay;
        game._pending_message = saved.pend;
        game.iflags = saved.iflags;
        resetInputState();
    });

    it("UTF8 corner menu drops text[0] at offx+1 (look_here hings)", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_UTF8 }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_nhw_menu_text(["Things that are here:", "a pony corpse"]);
        // offx = min(40, 80-22-1) = 40: pad@40, drop@41, text from 42.
        assert.equal(cells.get("40,0"), " ");
        assert.equal(cells.get("41,0"), " ");
        assert.equal(cells.get("42,0"), "h");
        assert.equal(cells.get("41,1"), " ");
        assert.equal(cells.get("42,1"), " ");
        assert.equal(cells.get("43,1"), "p");
        // dmore footer intact at offx+1.
        assert.equal(cells.get("41,2"), "-");
        assert.equal(cells.get("48,2"), "-");
    });

    it("UTF8 fullscreen menu drops col 0", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_UTF8 }] };
        game.currentgraphics = 0;
        game.iflags = { menu_overlay: false }; // force offx=0
        pushKeys(" ");
        await show_nhw_menu_text(["Things that are here:"]);
        assert.equal(cells.has("0,0"), false);
        assert.equal(cells.get("1,0"), "h");
    });

    it("DEC corner menu paints text[0] (control)", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_DEC }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_nhw_menu_text(["Things that are here:"]);
        assert.equal(cells.get("41,0"), "T");
        assert.equal(cells.get("42,0"), "h");
    });

    it("1-char corner line under UTF8 shifts to offx+2", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_UTF8 }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_nhw_menu_text(["x"]);
        // offx = min(40, 80-2-1) = 40: displaced char at 42.
        assert.equal(cells.get("41,0"), " ");
        assert.equal(cells.get("42,0"), "x");
    });

    it("high-bit first char drops under DEC handling (IBM arm)", async () => {
        const { disp, cells } = stubDisplay();
        game.nhDisplay = disp;
        game.gs = { symset: [{ handling: H_DEC }] };
        game.currentgraphics = 0;
        pushKeys(" ");
        await show_nhw_menu_text(["¼ corner"]);
        assert.equal(cells.get("41,0"), " ");
        assert.equal(cells.get("42,0"), " ");
        assert.equal(cells.get("43,0"), "c");
    });
});
