// unmap dark-room S_stone (level_tele writer): C display.c unmap_object
// :431-434 turns remembered dark ROOM floor to S_stone (and :436 uses
// S_stone as the seenv-0 default) — stone renders blank but is NOT
// GLYPH_NOTHING, so arrival reglyph_darkroom :1845 (NOTHING + ROOM +
// seenv + !cansee → S_darkroom) skips it. JS wrote bare blank, which
// reglyph resurrected as S_darkroom floor on revisit.
// Covers: scen-worldtour-Wizard-578116 step 226 (map (45,8) blank).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";
import { GLYPH_CMAP_STONE_OFF, GLYPH_NOTHING } from "../js/display.js";

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-worldtour-Wizard-578116";
const at = 226;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];

// Full replay: arrival screen shows blank stone, not floor.
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
});
const grid = decodeScreen((g.getScreens?.() || [])[at]);
assert.equal(grid[9][44].ch, " ",
    `${id}@${at} screen(44,9): want blank stone, got ${JSON.stringify(grid[9][44].ch)}`);

// Truncated replay (screen[N] state = after N keys): live Dlvl:43
// memory at map (45,8) is S_stone, not NOTHING and not floor.
const moves = [...seg.moves].slice(0, at).join("");
await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves, storage: undefined,
});
const { game } = await import("../js/gstate.js");
const mem = game.level.locations[45][8].remembered_glyph;
assert.equal(mem && mem.ch, " ",
    `${id}@${at} map(45,8): want blank memory, got ${JSON.stringify(mem && mem.ch)}`);
assert.equal(mem && mem.glyph, GLYPH_CMAP_STONE_OFF,
    `${id}@${at} map(45,8): want S_stone glyph ${GLYPH_CMAP_STONE_OFF}, got ${mem && mem.glyph} (NOTHING=${GLYPH_NOTHING})`);
console.log(`ok ${id}@${at}`);
console.log("PASS unmap-darkroom-stone");
