import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { initoptions_init, BUILTIN_OPT, SYSCF_OPT } from "../js/options.js";
import { assure_syscf_file } from "../js/cfgfiles.js";
import { do_deferred_showpaths } from "../js/files.js";
import { InMemoryStorage, vfsWriteFile } from "../js/storage.js";
import {
    ROLE_NONE, WARNCOUNT, GPCOORDS_NONE, MENU_FULL, MOD_ENCUMBER,
    ALIGN_TOP, ALIGN_BOTTOM, VI_NUMBER, RUN_LEAP,
    NUM_DISCLOSURE_OPTIONS, DISCLOSE_PROMPT_DEFAULT_NO,
    PARANOID_PRAY, PARANOID_SWIM, PARANOID_TRAP,
    WINTYPELEN, EXIT_SUCCESS, EXIT_FAILURE,
} from "../js/const.js";
import { ATR_INVERSE, NO_COLOR } from "../js/terminal.js";
import { DEF_INV_ORDER } from "../js/invent.js";
import { game } from "../js/gstate.js";

// C ref: options.c initoptions_init `:7119–7305` (builtin defaults before
// any config pass). Headless notes: the VFS holds no sysconf, so the wired
// assure_syscf_file `:7289` records the missing-file termination
// (nh_terminate flags) and the SYSCF_FILE read returns false with no queued
// errors; scored JS cannot exit, so the pass still ends at `:7298` in the
// syscf phase. The init_random `:7161–7162`, symset and TERM arms are named
// omits (see the export doc) and are not pinned here. No RNG is drawn on
// any pinned arm.

describe("options.c initoptions_init", () => {
    let saved;
    beforeEach(() => {
        saved = {
            go: game.go, flags: game.flags, iflags: game.iflags,
            gc: game.gc, gw: game.gw, pl_fruit: game.pl_fruit,
            nomakedefs: game.nomakedefs, windowprocs: game.windowprocs,
            program_state: game.program_state, gd: game.gd,
            mockStorage: game.mockStorage,
        };
        game.go = {};
        game.flags = {};
        game.iflags = {};
        game.gc = {};
        game.gw = {};
        delete game.pl_fruit;
        delete game.nomakedefs;
        delete game.windowprocs;
    });
    afterEach(() => {
        game.go = saved.go;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        game.gc = saved.gc;
        game.gw = saved.gw;
        game.pl_fruit = saved.pl_fruit;
        game.nomakedefs = saved.nomakedefs;
        game.windowprocs = saved.windowprocs;
        game.program_state = saved.program_state;
        game.gd = saved.gd;
        game.mockStorage = saved.mockStorage;
    });

    it("stores the C flags defaults (`:7170–7176`, `:7193–7194`, `:7204–7211`, `:7258`)", () => {
        initoptions_init();
        const f = game.flags;
        assert.equal(f.end_own, false);
        assert.equal(f.end_top, 3);
        assert.equal(f.end_around, 2);
        assert.equal(f.paranoia_bits, PARANOID_PRAY | PARANOID_SWIM | PARANOID_TRAP);
        assert.equal(f.versinfo, VI_NUMBER); // no git_branch in headless game
        assert.equal(f.pile_limit, 5);
        assert.equal(f.runmode, RUN_LEAP);
        assert.equal(f.initrole, ROLE_NONE);
        assert.equal(f.initrace, ROLE_NONE);
        assert.equal(f.initgend, ROLE_NONE);
        assert.equal(f.initalign, ROLE_NONE);
        assert.deepEqual(f.inv_order, [...DEF_INV_ORDER]); // C `:7204–7205` memcpy
        assert.equal(f.pickup_types, "");
        assert.equal(f.pickup_burden, MOD_ENCUMBER);
        assert.equal(f.sortloot, "l");
        assert.equal(f.end_disclose, DISCLOSE_PROMPT_DEFAULT_NO.repeat(NUM_DISCLOSURE_OPTIONS));
        assert.equal(f.menu_style, MENU_FULL);
    });

    it("stores the C iflags defaults (`:7177`, `:7181`, `:7188–7190`, `:7260–7279`)", () => {
        initoptions_init();
        const fl = game.iflags;
        assert.equal(fl.msg_history, 20);
        assert.equal(fl.prevmsg_window, "s");
        assert.deepEqual(fl.menu_headings, { attr: ATR_INVERSE, color: NO_COLOR });
        assert.equal(fl.getpos_coords, GPCOORDS_NONE);
        assert.equal(fl.wc_align_message, ALIGN_TOP);
        assert.equal(fl.wc_align_status, ALIGN_BOTTOM);
        assert.equal(fl.wc2_statuslines, 2);
        assert.equal(fl.wc2_petattr, ATR_INVERSE);
        assert.equal(fl.wc2_windowborders, 2);
        assert.equal(fl.menuinvertmode, 1);
    });

    it("seeds warnsyms, pl_fruit, and ends in the syscf phase (`:7200–7201`, `:7282–7298`)", () => {
        initoptions_init();
        assert.equal(game.gw.warnsyms.length, WARNCOUNT);
        assert.ok(game.gw.warnsyms.every((c) => typeof c === "number"));
        assert.equal(game.pl_fruit, "slime mold");
        assert.equal(game.go.opt_phase, SYSCF_OPT);
    });

    it("reapplies the allopt initval loop on repeat calls (`:7165–7168`)", () => {
        initoptions_init(); // allopt_array_init one-shot runs here
        game.iflags.menu_tab_sep = true; // allopt initval is false
        initoptions_init(); // one-shot no-ops; the `:7165` loop still runs
        assert.equal(game.iflags.menu_tab_sep, false);
        assert.equal(game.go.opt_phase, SYSCF_OPT);
    });

    it("consumes a cmdline windowtype (`:7133–7150`) and skips it when absent", () => {
        initoptions_init();
        assert.equal(game.gc.chosen_windowtype, undefined);
        game.gc.cmdline_windowsys = "tty";
        game.go.opt_phase = BUILTIN_OPT; //restore builtin so only the arm matters
        initoptions_init();
        assert.equal(game.gc.chosen_windowtype, "tty");
        assert.equal(game.gc.cmdline_windowsys, null); // C `:7149–7150`
        assert.ok((game.gc.chosen_windowtype.length | 0) < WINTYPELEN);
        assert.equal(game.iflags.windowtype_locked, undefined); // no windowprocs.name
    });

    it("records the missing-sysconf termination but still ends in syscf phase (`:7289` + `:7293–7298`)", () => {
        initoptions_init(); // empty VFS: C would exit at `:2067`; JS flags and continues
        assert.equal(game.program_state.exiting, 1);
        assert.equal(game.program_state.exit_status, EXIT_FAILURE);
        assert.equal(game.program_state.gameover, true);
        assert.equal(game.go.opt_phase, SYSCF_OPT);
    });

    it("assure_syscf_file returns silently when sysconf is readable (cfgfiles.c `:2057–2060`)", () => {
        game.mockStorage = new InMemoryStorage();
        assert.equal(vfsWriteFile("sysconf", "WIZARDS=*\n"), true);
        const psBefore = game.program_state;
        assure_syscf_file();
        assert.equal(game.program_state, psBefore); // no raw_printf/terminate side effects
    });

    it("do_deferred_showpaths clears the flag and terminates (files.c `:3092–3101`)", () => {
        game.gd = { deferred_showpaths: true, deferred_showpaths_dir: "/tmp/nh" };
        do_deferred_showpaths(1); // C ATTRNORETURN; JS flags via opt_terminate and returns
        assert.equal(game.gd.deferred_showpaths, false);
        assert.equal(game.program_state.exiting, 1);
        assert.equal(game.program_state.exit_status, EXIT_SUCCESS);
    });
});
