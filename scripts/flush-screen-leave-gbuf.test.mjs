import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: display.c flush_screen `:2241–2257` prints dirty gbuf spans;
// gg.gbuf survives level teardown, so vision_recalc(2)'s leave-level
// newsyms (display.c:1088 litcorr→corr) reach the terminal at the next
// flush — here the goto_level discarded-level impossible() More
// (do.c:1696 → pline.c:274 flush_screen). js/display.js flush_screen
// returned after topline+status when game.level was null, keeping the
// stale white corridor paint; it must paint the stashed leave level's
// dirty cells (bones yn precedent: paint_gbuf_level_to_terminal).
// This test replays the Barbarian worldtour and pins C's recorded
// step-94 corridor cell (red pre-fix with color 15, green post-fix).
const ID = "scen-worldtour-Barbarian-50650080";
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

describe("flush_screen paints leave gbuf mid-goto_level (display.c:2241-2257)", () => {
    it(`${ID}: step-94 corridor cell matches C (dark #)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 95, `screens ${screens.length} < 95`);
        const grid = decodeScreen(screens[94]);
        const cell = grid[6][29];
        // C recorded (r6,c29): `#` with NO_COLOR (8); JS painted 15.
        assert.equal(renderCell(cell), "#");
        assert.equal(cell.color, 8, `corridor color: got ${cell.color}, want 8 (C dark)`);
        // Control: the hero cell next to it stays bright-white both sides.
        const hero = grid[6][30];
        assert.equal(renderCell(hero), "@");
        assert.equal(hero.color, 15);
    });
});
