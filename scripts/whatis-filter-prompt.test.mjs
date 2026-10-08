import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c handler_whatis_filter `:6279–6318` + wintty.c
// tty_end_menu `:2680–2690` — the end_menu prompt is prepended as a menu
// item painted with tty_menu_promptstyle (= iflags.menu_headings, default
// {NO_COLOR, ATR_INVERSE} per options.c `:7188–7189` + allmain.c `:728`),
// followed by a blank separator item (`:2685–2686`). Sibling handlers
// (whatis_coord D-3403, number_pad, disclose …) carry `attr: ATR_INVERSE`
// + the blank; handler_whatis_filter's header had neither, so C painted
// the prompt inverse at row 0 with items at rows 2–4 while JS painted it
// plain with items shifted up one row. Pre-fix (measured /tmp decode
// probe): step 169 row 0 col 10 attr 0 (C 1), row 1 `n * no filtering`
// (C blank). This test pins the recorded C paint.
const ID = "scen-options-Barbarian-94251";
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

describe("handler_whatis_filter paints the tty_end_menu prompt (wintty.c:2687-2689)", () => {
    it(`${ID}: step 169 prompt inverse + blank separator`, { timeout: 300000 }, async () => {
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
        assert.ok(screens.length > 169, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[169]);
        // Prompt row: inverse (SGR 7 → attr bit 0x1) from col 10.
        assert.equal(grid[0][10].ch, "S");
        assert.equal(grid[0][10].attr, 1, "prompt inverse like C tty_menu_promptstyle");
        assert.equal(grid[0][10].color, 8, "prompt NO_COLOR");
        // Blank separator, then the three filter rows, then (end).
        const text = (r) => grid[r].map((x) => x.ch).join("").replace(/\s+$/, "");
        assert.equal(text(1), "", "wintty.c:2686 blank item");
        assert.match(text(2), /n \* no filtering/);
        assert.match(text(4), /a - in same area/);
        assert.match(text(5), /\(end\)/);
    });
});
