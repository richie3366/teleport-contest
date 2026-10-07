import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
    WC2_FULLSCREEN, WC2_SOFTKEYBOARD, WC2_WRAPTEXT, WC2_HILITE_STATUS,
    WC2_SELECTSAVED, WC2_DARKGRAY, WC2_HITPOINTBAR, WC2_FLUSH_STATUS,
    WC2_RESET_STATUS, WC2_TERM_SIZE, WC2_STATUSLINES, WC2_WINDOWBORDERS,
    WC2_PETATTR, WC2_GUICOLOR, WC2_URGENT_MESG, WC2_SUPPRESS_HIST,
    WC2_MENU_SHIFT, WC2_U_UTF8STR, WC2_EXTRACOLORS, WC2_EXTRASTATUS,
    TTY_WINCAP2,
} from "../js/const.js";
import {
    wc2_supported, allopt_idx, optfn_statuslines, optfn_boolean_do_set,
} from "../js/options.js";
import { install_tty_wincap2 } from "../js/display.js";

// C refs: wintty.c tty_procs.wincap2 `:111–125` (SELECTSAVED/STATUS_HILITES
// on per config.h:575/:616; EXTRACOLORS on, NO_TERMS is not unix),
// options.c wc2_supported `:9965–9976`, optfn_statuslines `:4100–4103`,
// optfn_boolean `:5334–5351`. Pins the JS wincap2 model: every C unix tty
// bit except the four status bits (VIA_WINDOWPORT would reroute into the
// unported status_update delivery, botl.js header).
describe("tty wincap2 model (wintty.c)", () => {
    let savedWindowprocs, savedFlags, savedIflags;
    beforeEach(() => {
        savedWindowprocs = game.windowprocs;
        savedFlags = game.flags;
        savedIflags = game.iflags;
    });
    afterEach(() => {
        game.windowprocs = savedWindowprocs;
        game.flags = savedFlags;
        game.iflags = savedIflags;
    });

    it("TTY_WINCAP2 carries every C tty bit but the status four", () => {
        for (const bit of [WC2_URGENT_MESG, WC2_SUPPRESS_HIST, WC2_DARKGRAY,
            WC2_STATUSLINES, WC2_U_UTF8STR, WC2_PETATTR, WC2_EXTRACOLORS,
            WC2_EXTRASTATUS, WC2_SELECTSAVED]) {
            assert.notEqual(TTY_WINCAP2 & bit, 0, `bit 0x${bit.toString(16)} set`);
        }
        for (const bit of [WC2_HILITE_STATUS, WC2_HITPOINTBAR,
            WC2_FLUSH_STATUS, WC2_RESET_STATUS, WC2_FULLSCREEN,
            WC2_SOFTKEYBOARD, WC2_WRAPTEXT, WC2_MENU_SHIFT, WC2_TERM_SIZE,
            WC2_WINDOWBORDERS, WC2_GUICOLOR]) {
            assert.equal(TTY_WINCAP2 & bit, 0, `bit 0x${bit.toString(16)} clear`);
        }
    });

    it("install_tty_wincap2 installs the model, keeps explicit caps", () => {
        delete game.windowprocs;
        assert.equal(install_tty_wincap2(), TTY_WINCAP2);
        assert.equal(game.windowprocs.wincap2, TTY_WINCAP2);
        game.windowprocs.wincap2 = 0;
        assert.equal(install_tty_wincap2(), 0);
    });

    it("wc2_supported matches C tty over the option table", () => {
        delete game.windowprocs; // fallback path mirrors the installer
        for (const name of ["use_darkgray", "statuslines", "petattr",
            "armorstatus", "terrainstatus", "weaponstatus"]) {
            assert.equal(wc2_supported(name), true, name);
        }
        for (const name of ["hilite_status", "statushilites",
            "status hilite rules", "hitpointbar", "menu_shift", "fullscreen",
            "guicolor", "softkeyboard", "term_cols", "term_rows",
            "windowborders", "wraptext", "bogus_option"]) {
            assert.equal(wc2_supported(name), false, name);
        }
    });

    it("weaponstatus toggle sets botl, not 'not supported' (C :5337–5351)", async () => {
        delete game.windowprocs;
        game.flags = {};
        await optfn_boolean_do_set("weaponstatus", false, false);
        assert.equal(game.flags.botl, true);
    });

    it("statuslines get_val reads 2/3, not unknown (C :4100–4101)", () => {
        delete game.windowprocs;
        const REQ_GET_VAL = 4; // options.c optfn req (module-local in JS)
        const idx = allopt_idx("statuslines");
        const lo = { buf: "" };
        optfn_statuslines(idx, REQ_GET_VAL, false, lo, "", {}, false);
        assert.equal(lo.buf, "2");
        const hi = { buf: "" };
        optfn_statuslines(idx, REQ_GET_VAL, false, hi, "", { wc2_statuslines: 3 }, false);
        assert.equal(hi.buf, "3");
    });
});
