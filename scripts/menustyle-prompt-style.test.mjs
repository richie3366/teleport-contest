import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c handler_menustyle `:5543–5583` (end_menu prompt `:5570`,
// select PICK_ONE `:5571`) + wintty.c tty_end_menu `:2685–2689` —
// the end_menu prompt is prepended as a menu item painted with
// tty_menu_promptstyle (= iflags.menu_headings, default {NO_COLOR,
// ATR_INVERSE}), followed by a blank separator item. Sibling menus
// (doset, handler_disclose D-3654, query_color/query_attr) already carry
// `...menu_prompt_style()` + the blank; handler_menustyle's prompt had
// neither, so C painted it inverse at row 0 with a blank row 1 and items
// from row 2 while JS painted it plain with items shifted up one row.
// Recorded C step 96 row 0: 21 spaces + `Select menustyle:`. Pins it.
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

describe("handler_menustyle paints the tty_end_menu prompt (wintty.c:2685-2689)", () => {
    it(`${ID}: step 96 prompt inverse + blank separator`, { timeout: 300000 }, async () => {
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
        assert.ok(screens.length > 96, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[96]);
        // Prompt row: inverse (SGR 7 → attr bit 0x1) over cols 21–37
        // (17-char prompt at C's recorded offset).
        assert.equal(grid[0][21].ch, "S");
        assert.equal(grid[0][21].attr, 1, "prompt inverse like C tty_menu_promptstyle");
        assert.equal(grid[0][21].color, 8, "prompt NO_COLOR");
        assert.equal(grid[0][37].attr, 1, "inverse spans the whole prompt");
        assert.equal(grid[0][38].attr, 0, "inverse ends after the prompt");
        // Blank separator, then items from row 2.
        const text = (r) => grid[r].map((x) => x.ch).join("").replace(/\s+$/, "");
        assert.equal(text(1), "", "wintty.c blank item");
        assert.match(text(2), /t - traditional/);
    });
});
