import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import {
    select_menu_pick_none,
    nhw_menu_geometry,
} from "../js/invent.js";

// C ref: win/tty/wintty.c tty_display_nhwindow(NHW_MENU) H2344 `:1907–1946`
// + process_menu_window corner paint `:1427–1432` (tty_curs(1)+offx,
// cl_end, leading space, item text) + erase_menu_or_text corner dismiss
// `:966–985` (docorner, map kept).
//
// PICK_NONE menus used to paint fullscreen at col 0 always; C overlays
// single-page menus at offx>0 (map visible left of the menu) and only
// goes fullscreen when maxrow>=rows or !menu_overlay. The skill menus
// below mirror the enhance_weapon_skill probes (scen-caster-Healer-94269
// step 225: 22-line wizard menu at offx=33; scen-tutorial-Monk-94079
// step 89: 18-line menu at offx=40).
function makeFakeDisp(spy) {
    const grid = Array.from({ length: 24 }, () => Array(80).fill(" "));
    return {
        rows: 24,
        cols: 80,
        grid,
        setCell(c, r, ch) {
            if (r >= 0 && r < 24 && c >= 0 && c < 80) {
                grid[r][c] = ch;
                if (spy && ch !== " ") spy.push([c, r, ch]);
            }
        },
        clearScreen() {
            for (const row of grid) row.fill(" ");
        },
        setCursor(c, r) {
            this.cur = [c, r];
        },
        cur: [0, 0],
    };
}

describe("select_menu_pick_none corner overlay (wintty.c H2344)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            flags: game.flags,
            disp: game.nhDisplay,
            geom: game._tty_menu_geom,
            overlay: game._menu_overlay,
        };
        game.flags = {};
        game._tty_menu_geom = null;
        game._menu_overlay = false;
        resetInputState();
    });
    afterEach(() => {
        game.flags = saved.flags;
        game.nhDisplay = saved.disp;
        game._tty_menu_geom = saved.geom;
        game._menu_overlay = saved.overlay;
        resetInputState();
    });

    // Wizard skill menu shape: prompt + blank + heading + long item lines
    // + morestr. Longest line 44 chars -> maxcol 46 -> offx 33.
    const wizardMenu = () => [
        { text: "Current skills:  (19 slots available)", attr: 1 },
        { text: "", attr: 0 },
        { text: "Fighting Skills", attr: 1 },
        { text: " bare handed combat Unskilled        0(  20)", attr: 0 },
        { text: " healing spells     Basic           32(  80)", attr: 0 },
    ];

    it("geometry: wizard skill menu computes offx 33", () => {
        const { offx } = nhw_menu_geometry(wizardMenu(), "(end) ");
        assert.equal(offx, 33);
    });

    it("single-page PICK_NONE paints at offx (corner), not col 0", async () => {
        const spy = [];
        game.nhDisplay = makeFakeDisp(spy);
        pushKeys(["\r"]);
        const entries = wizardMenu();
        const { offx } = nhw_menu_geometry(entries, "(end) ");
        assert.equal(offx, 33);
        assert.equal(await select_menu_pick_none(entries), 0);
        // Prompt 'C' painted at offx+1 (leading space at offx).
        const promptPaint = spy.find(
            ([c, r, ch]) => r === 0 && ch === "C",
        );
        assert.ok(promptPaint, "prompt row painted");
        assert.equal(promptPaint[0], offx + 1);
        // Item text starts at offx+2 (leading space + str[0] space).
        const itemPaint = spy.find(
            ([c, r, ch]) => r === 3 && ch === "b",
        );
        assert.ok(itemPaint, "item row painted");
        assert.equal(itemPaint[0], offx + 2);
        // Dismissed: geom cleared, overlay down.
        assert.equal(game._tty_menu_geom, null);
        assert.equal(game._menu_overlay, false);
    });

    it("23-item single-page menu stays fullscreen (maxrow>=rows)", async () => {
        const spy = [];
        game.nhDisplay = makeFakeDisp(spy);
        const entries = Array.from({ length: 23 }, (_, i) => ({
            text: `line ${i}`,
            attr: 0,
        }));
        const { offx } = nhw_menu_geometry(entries, "(end) ");
        assert.equal(offx, 0);
        pushKeys(["\r"]);
        assert.equal(await select_menu_pick_none(entries), 0);
        const firstPaint = spy.find(([c, r, ch]) => r === 0 && ch === "l");
        assert.ok(firstPaint, "first row painted");
        assert.equal(firstPaint[0], 1);
    });

    it("menu_overlay off forces fullscreen", async () => {
        const spy = [];
        game.nhDisplay = makeFakeDisp(spy);
        game.flags.menu_overlay = false;
        const entries = wizardMenu();
        assert.equal(nhw_menu_geometry(entries, "(end) ").offx, 0);
        pushKeys(["\r"]);
        assert.equal(await select_menu_pick_none(entries), 0);
        const promptPaint = spy.find(
            ([c, r, ch]) => r === 0 && ch === "C",
        );
        assert.ok(promptPaint, "prompt row painted");
        assert.equal(promptPaint[0], 1);
    });
});
