import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: display.c reset_glyphmap `:2884–2917` (GLYPH_CMAP_B branch:
// S_lava/S_lavawall colliding with S_pool/S_water → MG_BW_LAVA, S_ice
// colliding with S_room/S_darkroom → MG_BW_ICE, S_sink colliding with
// S_fountain → MG_BW_SINK; whole switch under `:2890 if
// (!iflags.use_color)`) + wintty.c tty_print_glyph `:3930–3936`
// (special & MG_BW_* && use_inverse → ATR_INVERSE). With color off a
// sink shares the '{' ttychar with a fountain, so C paints it inverse
// to stay distinguishable. JS painted it plain.
// In scen-symset-Samurai-50455026 (symset:RogueIBM, color off) the
// sink at screen row 13 col 60 shows `\E[7m{\E[27m` in C from step 270
// on; RNG is in full lockstep (14163/14163) — pure paint, owner null.
const ID = "scen-symset-Samurai-50455026";
const SEG = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
)).segments[0];

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
    const g = await runSegment({
        seed: SEG.seed, datetime: SEG.datetime,
        nethackrc: SEG.nethackrc, moves: SEG.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

describe("BW lava/ice/sink inverse (display.c:2884-2917)", () => {
    it(`${ID}: step-270 sink '{' (row 13 col 60) paints inverse`, { timeout: 300000 }, async () => {
        const screens = await replayScreens();
        assert.ok(screens.length >= 271, `screens ${screens.length} < 271`);
        const cell = decodeScreen(screens[270] || "")[13][60];
        assert.equal(cell.ch, "{");
        assert.equal(cell.attr & 1, 1); // ATR_INVERSE bit, C `\E[7m`
        // Same decoded cell as the recorded C screen (C's attr-off is
        // `\E[27m`, the frozen terminal emits `\E[0m` — same cell).
        const cCell = decodeScreen(String(SEG.steps[270].screen))[13][60];
        assert.deepEqual({ ch: cell.ch, color: cell.color, attr: cell.attr },
            { ch: cCell.ch, color: cCell.color, attr: cCell.attr });
    });

    it(`${ID}: step-270 neighbor ':' (row 13 col 59) stays plain`, { timeout: 300000 }, async () => {
        const screens = await replayScreens();
        const cell = decodeScreen(screens[270] || "")[13][59];
        assert.equal(cell.ch, ":");
        assert.equal(cell.attr & 1, 0); // no MG_BW flag off the sink cell
    });
});
