// Mines walls paint default (gray) under MACgraphics (Archeologist-50150039
// writer): C wallcolors[] is all gray (display.c:2677); branch colors come
// ONLY from the symset's G_ customizations (dat/symbols G_*_mines /brown
// etc.), stamped by glyphs.c apply_customizations via coloratt.c
// set_map_customcolor and read back in wintty.c tty_print_glyph :3899-3909
// (basic bit → COLORVAL). MACgraphics carries no G_ rows, so C records
// default fg; JS wall_cmap_color returned CLR_BROWN for any In_mines uz.
// Covers: scen-symset-Archeologist-50150039 step 39 (row 20, cols 17-18).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";
import { CLR_BROWN, CLR_WHITE, NO_COLOR } from "../js/terminal.js";

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-symset-Archeologist-50150039";
const at = 39;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];

// Truncated replay (screen[N] state = after N keys): step-39 mines wall
// corners paint default fg like C (no SGR brown).
const moves = [...seg.moves].slice(0, at).join("");
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves, storage: undefined,
});
const screens = g.getScreens?.() || [];
assert.ok(screens.length > at, `${id}: want screen ${at}, got ${screens.length}`);
const grid = decodeScreen(screens[at]);
for (const [c, r, ch] of [[17, 20, "I"], [18, 20, ";"]]) {
    assert.equal(grid[r][c].ch, ch,
        `${id}@${at} screen(${c},${r}): want wall ${ch}, got ${JSON.stringify(grid[r][c].ch)}`);
    assert.equal(grid[r][c].color, NO_COLOR,
        `${id}@${at} screen(${c},${r}): want default ${NO_COLOR}, got ${grid[r][c].color}`);
}
// Controls: hero stays white, adjacent floor stays default.
assert.equal(grid[19][17].ch, "@");
assert.equal(grid[19][17].color, CLR_WHITE);
assert.equal(grid[19][16].color, NO_COLOR);
assert.equal(grid[20][16].color, NO_COLOR);

// Stored wall memory carries the gray base (repaint re-maps to default
// via tty_map_color, like C's repaint through tty_print_glyph).
const { game } = await import("../js/gstate.js");
const { In_mines } = await import("../js/const.js");
const { CLR_GRAY } = await import("../js/terminal.js");
assert.equal(In_mines(game.u?.uz), true,
    `${id}@${at}: want Mines uz, got ${JSON.stringify(game.u?.uz)}`);
for (const [x, y] of [[18, 19], [19, 19]]) {
    const mem = game.level.at(x, y).remembered_glyph;
    assert.equal(mem && mem.color, CLR_GRAY,
        `${id}@${at} map(${x},${y}): want gray memory, got ${mem && mem.color}`);
}

// DEC control: the same game under a G_-carrying symset keeps brown
// mines walls (stamped customcolor 0x1000003 read back, D-0283).
const g2 = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc.replace(/symset:\w+/, "symset:DECgraphics"),
    moves, storage: undefined,
});
const grid2 = decodeScreen((g2.getScreens?.() || [])[at]);
assert.equal(grid2[20][17].color, CLR_BROWN,
    `${id}@${at} DEC control screen(17,20): want brown ${CLR_BROWN}, got ${grid2[20][17].color}`);
assert.equal(grid2[20][18].color, CLR_BROWN,
    `${id}@${at} DEC control screen(18,20): want brown ${CLR_BROWN}, got ${grid2[20][18].color}`);
console.log(`ok ${id}@${at}`);
console.log("PASS symset-mines-walls-gray");
