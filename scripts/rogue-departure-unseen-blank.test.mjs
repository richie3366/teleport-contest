// D-3807: departure vision_recalc(2) shutdown newsyms + arrival
// reglyph_darkroom rogue blanking. On a rogue level, leaving the level
// newsyms old-visible unlit ROOM cells !cansee (C do.c:1631 shutdown loop,
// vision.c:820-836): S_room memory goes S_stone (display.c:1082-1084),
// the hero cell goes S_darkroom via feel_location; arrival reglyph
// (C do.c:1715, display.c:1838-1840) converts S_darkroom+!waslit to
// GLYPH_NOTHING. Revisits must show stone, not remembered floor.
// Covers: scen-worldtour-Archeologist-95240 (4 cells), -Wizard-95218.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

const CASES = [
    {
        id: "scen-worldtour-Archeologist-95240",
        at: 488,
        // [screenCol, screenRow] blank in C (map x = col+1, y = row-1)
        cells: [[48, 11], [49, 11], [48, 12], [49, 12]],
        // same cells as map coords for the memory assertion
        map: [[49, 10], [50, 10], [49, 11], [50, 11]],
    },
    {
        id: "scen-worldtour-Wizard-95218",
        at: 695,
        cells: [[21, 16]],
        map: [[22, 15]],
    },
];

for (const { id, at, cells, map } of CASES) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
        "utf8"));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
    });
    const grid = decodeScreen((g.getScreens?.() || [])[at]);
    for (const [c, r] of cells) {
        assert.equal(grid[r][c].ch, " ",
            `${id}@${at} screen(${c},${r}): want stone, got ${JSON.stringify(grid[r][c].ch)}`);
    }
    // Mechanism: stashed level memory is blank, not floor.
    const moves = [...seg.moves].slice(0, at + 1).join("");
    await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves, storage: undefined,
    });
    const { game } = await import("../js/gstate.js");
    for (const [x, y] of map) {
        const mem = game.level.locations[x][y].remembered_glyph;
        assert.ok(!mem || mem.ch === " ",
            `${id}@${at} map(${x},${y}): want blank memory, got ${JSON.stringify(mem && mem.ch)}`);
    }
    console.log(`ok ${id}@${at}`);
}
console.log("PASS rogue-departure-unseen-blank");
