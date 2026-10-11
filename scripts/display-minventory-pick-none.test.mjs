import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { display_minventory } from "../js/invent.js";
import { xname } from "../js/objnam.js";
import { objectNames, objects, FOOD_CLASS, COIN_CLASS } from "../js/objects.js";
import { MINV_ALL, PICK_NONE } from "../js/const.js";
import { pushKeys, resetInputState } from "../js/input.js";

// C ref: invent.c display_minventory `:5340–5386` → pickup.c query_objlist
// `:1130–1139` + win/tty/wintty.c tty_add_menu `:2602–2605` ("%c - "
// prefix for identifier items) + tty_end_menu `:2680–2690` (prompt
// prepends "" then title) + `:2716–2726` (menu letters a..z/A.. in menu
// order per page; first-item gold keeps '$', consuming no letter).
//
// The PICK_NONE analog used to emit bare doname lines with no prompt
// blank: the missing 4-char prefixes shrank maxcol, shifting offx one
// right (scen-sweep-Caveman-95327 step 1315: C title at col 38 = offx
// 37+1 with maxcol 42 from "c - a pair of walking shoes (being worn)",
// JS at col 39 with maxcol 41).
const EGG = objectNames.indexOf("EGG");
const GOLD_PIECE = objectNames.indexOf("GOLD_PIECE");
const SEED = 95327;

function makeSpyDisp(spy) {
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

function fakeObj(otyp, oclass, extra = {}) {
    return {
        otyp, oclass, quan: 1, age: 0,
        corpsenm: -1, invlet: 0, where: 0,
        cursed: 0, blessed: 0, known: 0, unpaid: 0,
        owornmask: 0, nobj: null,
        ...extra,
    };
}

function setup(spy) {
    initRng(SEED);
    resetInputState();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.flags = {};
    game.objects = objects;
    game.u = { ux: 5, uy: 5 };
    game.youmonst = { data: {} };
    game.nhDisplay = makeSpyDisp(spy);
    game.context = {};
    game.program_state = {};
    game._tty_menu_geom = null;
    game._menu_overlay = false;
}

function spyRows(spy, nrows) {
    const cells = new Map();
    for (const [c, r, ch] of spy) cells.set(`${c},${r}`, ch);
    const rows = [];
    for (let r = 0; r < nrows; r++) {
        let s = "";
        for (let c = 0; c < 80; c++) s += cells.get(`${c},${r}`) ?? " ";
        rows.push(s.replace(/ +$/, ""));
    }
    return rows;
}

describe("display_minventory PICK_NONE analog (invent.c:5340 + wintty.c)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, invent: game.invent, context: game.context,
            flags: game.flags, iflags: game.iflags,
            program_state: game.program_state, objects: game.objects,
            nhDisplay: game.nhDisplay, youmonst: game.youmonst,
            geom: game._tty_menu_geom, overlay: game._menu_overlay,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.invent = saved.invent;
        game.context = saved.context;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        game.program_state = saved.program_state;
        game.objects = saved.objects;
        game.nhDisplay = saved.nhDisplay;
        game.youmonst = saved.youmonst;
        game._tty_menu_geom = saved.geom;
        game._menu_overlay = saved.overlay;
        resetInputState();
    });

    it("prefixes items a/b/.., blanks row 1, geometry from prefixed len", async () => {
        const spy = [];
        setup(spy);
        const egg = fakeObj(EGG, FOOD_CLASS);
        const gold = fakeObj(GOLD_PIECE, COIN_CLASS, { nobj: egg });
        const mon = { minvent: gold, data: {} };
        pushKeys(["\r"]);
        // Explicit title (invent.c:4156 look_here shape); null-title
        // s_suffix(noit_Monnam) is covered by the corpus probe.
        const ret = await display_minventory(
            mon, MINV_ALL | PICK_NONE, "Test monster's possessions:",
        );
        assert.equal(ret, null);
        const rows = spyRows(spy, 8);
        // C tty_end_menu: prompt row then blank row.
        assert.match(rows[0], /Test monster's possessions:$/);
        assert.equal(rows[1], "");
        // Selectable items carry "X - " prefixes; first-item gold keeps
        // '$' and consumes no menu letter (query_objlist :1133–1135).
        const goldRow = rows.find((s) => s.includes("gold piece"));
        assert.match(goldRow.trimStart(), /^\$ - /);
        const eggRow = rows.find((s) => s.includes("egg"));
        assert.match(eggRow.trimStart(), /^a - /);
        // C geometry: text col = offx+1 with maxcol = longest
        // prefixed len + 2 (tty_end_menu :2729 + display :1914);
        // offx is capped at cols/2 (H2344 :1910).
        const lens = rows.map((s) => s.trimStart().length);
        const longest = Math.max(...lens);
        const titleStart = rows[0].length - rows[0].trimStart().length;
        assert.equal(titleStart, Math.min(40, 80 - (longest + 2) - 1) + 1);
    });

    it("xname food base is oc_name: C-ration/K-ration keep hyphen", () => {
        // Same probe screen, row 10: C «f - a C-ration» vs JS
        // «f - a c ration» — the pretty_base tail used the lossy
        // lowercase-macro fallback instead of OBJ_NAME.
        game.objects = objects;
        game.u = { ux: 5, uy: 5 };
        for (const [sym, want] of [["C_RATION", "C-ration"], ["K_RATION", "K-ration"]]) {
            const otyp = objectNames.indexOf(sym);
            assert.equal(xname({ otyp, oclass: FOOD_CLASS, quan: 1 }), want);
        }
    });

    it("geometry: probe-shaped menu computes offx 37 (uncapped)", async () => {
        const { nhw_menu_geometry } = await import("../js/invent.js");
        // scen-sweep-Caveman-95327 step 1315: longest painted line is
        // the prefixed item (40 chars) → maxcol 42 → offx 37 → title
        // text at col 38. Without prefixes maxcol would be 41 → 38.
        const entries = [
            { text: "The invisible lieutenant's possessions:", attr: 1 },
            { text: "", attr: 0 },
            { text: "Armor", attr: 1 },
            { text: "b - a pair of riding gloves (being worn)", attr: 0 },
            { text: "c - a pair of walking shoes (being worn)", attr: 0 },
        ];
        const { offx, maxcol } = nhw_menu_geometry(entries, "(end) ");
        assert.equal(maxcol, 42);
        assert.equal(offx, 37);
    });
});
