import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: win/tty/wintty.c erase_menu_or_text `:965–984` — corner (offx≠0)
// menu destroy repaints via docorner(offx, maxrow+1, 0) (targeted gbuf
// replay); only fullscreen (offx==0, non-clear) does docrt()+flush.
// D-3626 measured on tour-Priest-92235 step 106 (disclose vanquished menu
// destroy, post-death): C never docrts, so the blind-hero `I` cells stay;
// JS corner-dismiss docrted, and the see_monsters overlay repainted them
// as warnings (`3`/`5`). Pre-fix, step 106 row 5 col 7 is `3` (C `I`)
// and row 6 col 9 is `5` (C `I`). This test pins the recorded C paint.
const ID = "scen-tour-Priest-92235";
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

describe("erase_menu_or_text corner arm (wintty.c:965-984)", () => {
    it(`${ID}: vanquished-menu destroy keeps the I cells (step 106)`, { timeout: 180000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 106, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[106]);
        assert.equal(grid[5][7].ch, "I", "row5 col7 map_invisible I (not `3`)");
        assert.equal(grid[6][9].ch, "I", "row6 col9 map_invisible I (not `5`)");
    });
});
