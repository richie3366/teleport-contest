import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: coloratt.c query_color `:475–518` (end_menu prompt `:497`) +
// query_attr `:396–472` (prompt `:417`) + wintty.c tty_end_menu
// `:2680–2690` — the end_menu prompt is prepended as a menu item painted
// with tty_menu_promptstyle (= iflags.menu_headings, default
// {NO_COLOR, ATR_INVERSE} per options.c `:7188–7189` + allmain.c `:728`),
// followed by a blank separator item (`:2685–2686`; tty_add_menu
// prepends, so the prompt lands before the blank). Sibling submenu
// handlers (whatis_coord D-3403, whatis_filter D-3645, autocomplete
// D-3646 …) carry `attr: ATR_INVERSE` + the blank; the query_color /
// query_attr headers had neither, so C painted the "How to highlight
// menu headings:" prompt inverse at row 0 with items from row 2 while JS
// painted it plain with items shifted up one row. Pre-fix (measured /tmp
// decode probe): step 58 row 0 col 41 attr 0 (C 1), 185 diff cells.
const ID = "scen-options-Caveman-94011";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("query_color/query_attr paint the tty_end_menu prompt (wintty.c:2687-2689)", () => {
    it(`${ID}: steps 58-59 prompt inverse + blank separator`, { timeout: 300000 }, async () => {
        const storage = sharedStorage();
        const screens = [];
        for (const seg of SESS.segments) {
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves,
                storage,
            });
            for (const s of (g.getScreens?.() || [])) screens.push(s || "");
        }
        assert.ok(screens.length > 59, `only ${screens.length} screens`);
        const text = (grid, r) => grid[r].map((x) => x.ch).join("").replace(/\s+$/, "");
        for (const [step, firstItem, footerRow] of [[58, /a - black/, 18], [59, /a - none/, 9]]) {
            const grid = decodeScreen(screens[step]);
            // Prompt row: inverse (SGR 7 → attr bit 0x1) from col 41.
            assert.equal(grid[0][41].ch, "H", `step ${step} prompt col`);
            assert.equal(grid[0][41].attr, 1, `step ${step} prompt inverse like C tty_menu_promptstyle`);
            assert.equal(grid[0][41].color, 8, `step ${step} prompt NO_COLOR`);
            // Blank separator, then items from row 2, then (end).
            assert.equal(text(grid, 1), "", `step ${step} wintty.c:2686 blank item`);
            assert.match(text(grid, 2), firstItem);
            assert.match(text(grid, footerRow), /\(end\)/);
        }
        // Step 58 (query_color): basic_menu_colors patterns paint each name
        // in its color via get_menu_coloring; black/white/no-color have no
        // pattern (plain) and gray records default fg (empty hilite).
        const g58 = decodeScreen(screens[58]);
        assert.equal(g58[3][45].ch, "r");
        assert.equal(g58[3][45].color, 1, "step 58 red paints CLR_RED");
        assert.equal(g58[2][41].color, 8, "step 58 selector prefix stays plain (attr_n)");
        assert.equal(g58[9][45].ch, "g");
        assert.equal(g58[9][45].color, 8, "step 58 gray records NO_COLOR (empty hilite)");
        assert.equal(g58[16][45].color, 8, "step 58 white has no pattern (plain)");
        // Step 59 (query_attr): caller per-item attr paints from attr_n;
        // dim/blink/italic have no cell bit (record plain like C).
        const g59 = decodeScreen(screens[59]);
        assert.equal(g59[3][45].ch, "b");
        assert.equal(g59[3][45].attr, 2, "step 59 bold paints SGR 1");
        assert.equal(g59[8][45].ch, "i");
        assert.equal(g59[8][45].attr, 1, "step 59 inverse paints SGR 7");
        assert.equal(g59[4][45].attr, 0, "step 59 dim records plain");
        assert.equal(g59[7][45].attr, 0, "step 59 blink records plain");
    });
});
