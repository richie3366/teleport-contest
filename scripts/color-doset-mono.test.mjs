import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: include/optlist.h `:236–237` (NHOPTB color → `&iflags.wc_color`) +
// include/flag.h `:507` (`use_color` ≡ `wc_color`, one field) — every C
// map-paint `iflags.use_color` read and every `color` toggle (full doset,
// simple menu, config) share the single wc_color home. JS split it: the
// three toggle paths wrote `iflags.wc_color` while all fourteen paint
// gates read the never-written `iflags.use_color`, so toggling color off
// never reached the map. Recorded C step 74 repaints the map mono after
// the toggle+More sequence; JS kept colors.
const ID = "scen-options-Ranger-94031";
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

async function replayScreens() {
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
    return screens;
}

const cell = (grid, r, c) => ({ ch: grid[r][c].ch, color: grid[r][c].color, attr: grid[r][c].attr });

describe("color-off doset toggle reaches the map paint (optlist.h:236-237, flag.h:507)", () => {
    it(`${ID}: step 74 map repaints mono like recorded C`, { timeout: 300000 }, async () => {
        const screens = await replayScreens();
        assert.ok(screens.length > 74, `only ${screens.length} screens`);
        const rec74 = SESS.segments[0].steps[74].screen;
        const cGrid = decodeScreen(rec74);
        const jsGrid = decodeScreen(screens[74]);
        // Column alignment: the chest glyph at row 8 col 9.
        assert.equal(jsGrid[8][9].ch, ")", "map column alignment");
        assert.equal(cGrid[8][9].ch, ")", "recorded C column alignment");
        // C step 74 is mono (color toggled off at step 73, More dismissed):
        // the whole map row matches the recording cell-for-cell.
        for (const [r, c] of [[8, 9], [9, 7], [9, 8], [10, 14]]) {
            assert.deepEqual(
                cell(jsGrid, r, c), cell(cGrid, r, c),
                `step-74 cell (${r},${c}): JS must match recorded C mono paint`,
            );
        }
    });

    it(`${ID}: step 73 map keeps stale colors under the pending More`, { timeout: 300000 }, async () => {
        const screens = await replayScreens();
        const rec73 = SESS.segments[0].steps[73].screen;
        const cGrid = decodeScreen(rec73);
        const jsGrid = decodeScreen(screens[73]);
        // Guard against a premature mono repaint: while --More-- pends, C
        // shows the pre-toggle colored framebuffer on both sides.
        assert.deepEqual(
            cell(jsGrid, 8, 9), cell(cGrid, 8, 9),
            "step-73 cell (8,9): stale colored framebuffer under More",
        );
    });
});
