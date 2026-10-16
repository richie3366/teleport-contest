import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";
import { ROOM } from "../js/const.js";

// C ref: dig.c adj_pit_checks `:1776` — `ltyp = room->typ, room->flags = 0`
// clears the cell's flags UNCONDITIONALLY (even on the reject arms).
// C rm.h `:213-215` — `#define wall_info flags` (one field): the clear
// zeroes wall_info too, including W_NONDIGGABLE. JS keeps `flags` and
// `wall_info` as two fields (D-0865: checks OR both); adj_pit_checks
// cleared only `flags`, leaving a stale W_NONDIGGABLE behind.
//
// scen-sweep-Barbarian-50750065 (blind hero, maze level, dlvl 5):
// - step 619 (E1): pitted hero zaps digging south; adj_pit_checks takes
//   the IS_WALL arm (message + flags=0). C wall_info 26->0 (temp-C dump
//   SEQ 610->620); JS kept wall_info=26. Screens still agree (blind
//   memory shows the wall on both sides).
// - step 782 (E2): hero (out of the pit) zaps digging south again;
//   zap_dig's maze_dig IS_WALL arm (dig.c:1684-1696) reads wall_info.
//   C (0, diggable) digs: typ HWALL->ROOM, silent (temp-C dump
//   SEQ 782->783 typ 2->25, flags 0). JS (26, stale NONDIGGABLE) takes
//   the `else` no-dig arm, silent when blind (D-4007's arm) — same
//   silence, divergent terrain.
// - step 828: blind `s` search calls feel_location(45,15) on all eight
//   neighbours (detect.c:2041); _map_location maps actual terrain: C
//   paints `·` (ROOM, glyph 3975->3993 at SEQ 829), JS paints `·`-less
//   `─` (HWALL). Row 16 col 44.
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("adj_pit_checks clears wall_info with flags (dig.c:1776, rm.h:215)", () => {
  it("Barbarian-50750065 step 828 shows the dug floor · at row 16 col 44", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Barbarian-50750065", 828);
    assert.ok(screens.length > 828, `expected 829+ screens, got ${screens.length}`);
    const g = decodeScreen(screens[828] || "");
    const row16 = g[16].map((c) => c.ch).join("");
    assert.ok(row16.includes("└────·─┘"),
      `row 16 should show the felt floor: ${JSON.stringify(row16.trim())}`);
    assert.equal(g[16][44].ch, "·", `cell col 44: ${JSON.stringify(row16.trim())}`);
    // Mechanism: E2 dug the wall (typ ROOM) because E1's pit-reject had
    // cleared the single C field (flags==wall_info==0, no NONDIGGABLE).
    const cell = game.level?.at(45, 15);
    assert.equal(cell?.typ, ROOM, `typ at (45,15): ${cell?.typ}`);
    assert.equal(cell?.flags | 0, 0, `flags at (45,15): ${cell?.flags}`);
    assert.equal(cell?.wall_info | 0, 0, `wall_info at (45,15): ${cell?.wall_info}`);
  });
});
