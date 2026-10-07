import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: win/tty/wintty.c tty_end_menu `:2680–2690` — when end_menu gets a
// prompt, C prepends two items ahead of the menu rows (tty_add_menu
// `:2621–2622` prepends, so final order is prompt-then-blank): the prompt
// string with tty_menu_promptstyle.attr (= menu_headings, default
// ATR_INVERSE) and a blank "" separator. handler_number_pad passes
// "Select number_pad mode:" (options.c `:5915`), so C paints row 0 in
// reverse (`\x1b[7m...\x1b[0m`), row 1 blank, items from row 2.
// JS painted the prompt as a plain attr-0 header with items immediately
// after, failing 3 scen-options sessions at the picker step (e.g.
// Barbarian-94191 step 6: row 0 attr 1 vs 0, row 1 blank vs `a - ...`).
// This test pins the recorded C paint on the replayed picker screen.
const ID = "scen-options-Barbarian-94191";
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

describe("handler_number_pad end_menu prompt paint (wintty.c:2685-2689)", () => {
    it(`${ID}: picker prompt is reverse + blank row (step 6)`, { timeout: 120000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 6, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[6]);
        // Prompt "Select number_pad mode:" at row 0 col 24, reverse video.
        const prompt = "Select number_pad mode:";
        for (let i = 0; i < prompt.length; i++) {
            const cell = grid[0][24 + i];
            assert.equal(cell.ch, prompt[i], `row0 col${24 + i} char`);
            assert.equal(cell.attr, 1, `row0 col${24 + i} attr (reverse)`);
        }
        // Blank separator row, then items from row 2, (end) at row 8.
        for (let c = 0; c < 80; c++) {
            assert.equal(grid[1][c].ch, " ", `row1 col${c} blank`);
        }
        const rowText = (r) => grid[r].map((x) => x.ch).join("").replace(/\s+$/, "");
        assert.equal(rowText(2), "                        a -  0 (off)");
        assert.equal(rowText(8), "                        (end)");
    });
});
