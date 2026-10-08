import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c handler_disclose `:5674–5777` (end_menu prompt `:5704`,
// select PICK_ANY `:5705–5706`) + wintty.c tty_end_menu `:2685–2689` —
// the end_menu prompt is prepended as a menu item painted with
// tty_menu_promptstyle (= iflags.menu_headings, default {NO_COLOR,
// ATR_INVERSE}), followed by a blank separator item. Sibling menus
// (doset, query_color/query_attr, handler_change_autocompletions D-3646)
// already carry `...menu_prompt_style()` + the blank; handler_disclose's
// category prompt had neither, so C painted it inverse at row 0 with a
// blank row 1 and items from row 2 while JS painted it plain with items
// shifted up one row. Recorded C step 68: `\x1b[35C\x1b[7mChange which
// disclosure options categories:\x1b[0m\n\n…`. This test pins that paint.
const ID = "scen-options-Wizard-94291";
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

describe("handler_disclose paints the tty_end_menu prompt (wintty.c:2685-2689)", () => {
    it(`${ID}: step 68 prompt inverse + blank separator`, { timeout: 300000 }, async () => {
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
        assert.ok(screens.length > 68, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[68]);
        // Prompt row: inverse (SGR 7 → attr bit 0x1) over cols 35–77
        // (43-char prompt).
        assert.equal(grid[0][35].ch, "C");
        assert.equal(grid[0][35].attr, 1, "prompt inverse like C tty_menu_promptstyle");
        assert.equal(grid[0][35].color, 8, "prompt NO_COLOR");
        assert.equal(grid[0][77].attr, 1, "inverse spans the whole prompt");
        assert.equal(grid[0][78].attr, 0, "inverse ends after the prompt");
        // Blank separator, then items from row 2.
        const text = (r) => grid[r].map((x) => x.ch).join("").replace(/\s+$/, "");
        assert.equal(text(1), "", "wintty.c blank item");
        assert.match(text(2), /i - inventory +\[yi\]/);
    });
});
