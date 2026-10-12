// Knox (Fort Ludios) walls paint CLR_YELLOW under DECgraphics (level_tele
// writer): C dat/symbols gives every graphical symset G_vwall_knox ..
// G_trwall_knox `: /yellow` customizations (DECgraphics :754-764), applied
// by glyphs.c apply_customizations via coloratt.c set_map_customcolor and
// read back as the tty fg override in wintty.c tty_print_glyph (TEMP-C
// measured cust=0x100000B on glyphs 3963/3964/3966). JS wall_cmap_color
// had mines/hellish/sokoban arms but no Knox arm (D-0801 named omission),
// so Fort Ludios arrival walls painted default instead of yellow.
// Covers: scen-worldtour-Knight-578306 step 859 (rows 16-18, cols 72-74).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";
import { CLR_YELLOW, CLR_WHITE, NO_COLOR } from "../js/terminal.js";

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-worldtour-Knight-578306";
const at = 859;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];

// Full replay: arrival screen paints the Fort Ludios corner walls yellow.
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
});
const grid = decodeScreen((g.getScreens?.() || [])[at]);
const walls = [[72, 16, "─"], [73, 16, "─"], [74, 16, "┐"], [74, 17, "│"], [74, 18, "│"]];
for (const [c, r, ch] of walls) {
    assert.equal(grid[r][c].ch, ch,
        `${id}@${at} screen(${c},${r}): want wall ${ch}, got ${JSON.stringify(grid[r][c].ch)}`);
    assert.equal(grid[r][c].color, CLR_YELLOW,
        `${id}@${at} screen(${c},${r}): want yellow ${CLR_YELLOW}, got ${grid[r][c].color}`);
}
// Controls: hero stays white, dark-room floor stays default.
assert.equal(grid[17][73].ch, "@");
assert.equal(grid[17][73].color, CLR_WHITE);
assert.equal(grid[17][72].color, NO_COLOR);
assert.equal(grid[18][72].color, NO_COLOR);

// Truncated replay (screen[N] state = after N keys): uz is Knox and the
// stored wall memory carries yellow, matching C's repaint-from-memory.
const moves = [...seg.moves].slice(0, at).join("");
await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves, storage: undefined,
});
const { game } = await import("../js/gstate.js");
const { Is_knox } = await import("../js/const.js");
assert.equal(Is_knox(game.u?.uz), true,
    `${id}@${at}: want Knox uz, got ${JSON.stringify(game.u?.uz)}`);
for (const [x, y] of [[73, 15], [74, 15], [75, 15], [75, 16], [75, 17]]) {
    const mem = game.level.locations[x][y].remembered_glyph;
    assert.equal(mem && mem.color, CLR_YELLOW,
        `${id}@${at} map(${x},${y}): want yellow memory, got ${mem && mem.color}`);
}
console.log(`ok ${id}@${at}`);
console.log("PASS knox-walls-yellow");
