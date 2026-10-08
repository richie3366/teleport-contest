import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c yn_function_menu `:5416–5463` end_menu(win, query) +
// wintty.c tty_end_menu `:2680–2690` — the query paints as the menu
// prompt row (relayed tty_menu_promptstyle) above a blank separator,
// ahead of the Yes/No rows in C order (D-3403/doset sibling pattern).
// scen-options-Tourist-94171 step 85 answers doup's ledger-1 «Beware,
// there will be no return!  Still climb?» via the query_menu path; JS
// dropped the prompt rows so the menu painted at col 41 without them
// (C: prompt at col 32 inverse + blank + items + (end)). This test
// replays that segment and pins C's step-85 prompt/item cells.
const ID = "scen-options-Tourist-94171";
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

describe("yn_function_menu query prompt (cmd.c:5416)", () => {
    it(`${ID}: step-85 yn menu paints the query prompt + items at col 32`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 85, `screens ${screens.length} <= 85`);
        const grid = decodeScreen(screens[85] || "");
        const rowText = (r) => grid[r].map(renderCell).join("").replace(/\s+$/, "");
        assert.equal(rowText(0).slice(32), "Beware, there will be no return!  Still climb?");
        assert.equal(rowText(0).slice(0, 32).trim(), "");
        assert.equal(rowText(1), "");
        assert.equal(rowText(2).slice(32), "y - Yes");
        assert.equal(rowText(3).slice(32), "n * No");
        assert.equal(rowText(4).slice(32), "(end)");
        // C tty_end_menu `:2687–2689`: prompt paints with the relayed
        // tty_menu_promptstyle (default no-color inverse here).
        for (const c of [32, 40, 60, 77]) {
            assert.equal(grid[0][c].attr, 1, `prompt col ${c} attr`);
        }
    });
});
