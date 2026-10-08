import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: windows.c adjust_menu_promptstyle `:1769–1778` + wintty.c
// tty_end_menu `:2685–2689` — the end_menu prompt paints with the relayed
// tty_menu_promptstyle (a snapshot of iflags.menu_headings), not the
// hardcoded default. scen-options-Caveman-94011 drives doset →
// menu_headings → query_color_attr and picks light-blue + inverse; C's
// «Set what options?» prompt then paints color 12 (CLR_BRIGHT_BLUE) with
// inverse attr, while JS kept the default no-color inverse (color 8).
// This test replays that segment and pins C's prompt cells.
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

describe("menu promptstyle relay (windows.c:1769)", () => {
    it(`${ID}: doset prompt paints relayed menu_headings (light-blue inverse)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 65, `screens ${screens.length} <= 65`);
        const grid = decodeScreen(screens[65] || "");
        const row = grid[0].map(renderCell).join("").trim();
        assert.equal(row, "Set what options?");
        for (const c of [1, 5, 10, 17]) {
            assert.equal(grid[0][c].color, 12, `col ${c} color`);
            assert.equal(grid[0][c].attr, 1, `col ${c} attr`);
        }
    });

    it(`${ID}: query_attr prompt paints relayed menu_headings (light-blue inverse)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 77, `screens ${screens.length} <= 77`);
        const grid = decodeScreen(screens[77] || "");
        const row = grid[0].map(renderCell).join("").trim();
        assert.equal(row, "Select pet highlight attribute");
        for (const c of [41, 45, 50, 60]) {
            assert.equal(grid[0][c].color, 12, `col ${c} color`);
            assert.equal(grid[0][c].attr, 1, `col ${c} attr`);
        }
    });
});
