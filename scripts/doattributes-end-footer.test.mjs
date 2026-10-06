import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c tty_end_menu `:2742–2750` + process_menu_window
// `:1537–1543` — single-page menus show "(end) " (trailing space);
// only multi-page menus show "(x of y)" (no trailing space). Cursor
// after the morestr (`:1545–1547` + dmore: col strlen+1 0-based).
// scen-impaired-Samurai-94130 step 240: 23-line enlightenment menu,
// fullscreen single page — C footer " (end) " + cursor [7,23], JS
// painted " (1 of 1)" + cursor [9,23].
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-impaired-Samurai-94130.recipe.json", import.meta.url),
));

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("doattributes fullscreen single-page footer (wintty morestr)", () => {
    it("step-240 enlightenment footer is C's ' (end) ' + cursor [7,23]", { timeout: 120000 }, async () => {
        const seg = RECIPE.segments[0];
        const g = await runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 240, `expected >240 screens, got ${screens.length}`);
        const rows = String(screens[240]).split("\n");
        assert.ok(rows[23].startsWith(" (end)"), `row 23: ${JSON.stringify(rows[23])}`);
        assert.deepEqual(g.getCursors()[240], [7, 23, 1]);
    });
});
