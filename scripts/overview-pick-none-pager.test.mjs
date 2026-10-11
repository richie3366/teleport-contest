import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dungeon.c show_overview `:3328` select_menu PICK_NONE — tty pages
// 23/page with "(N of M)" when multi-page (wintty.c tty_end_menu
// `:2693-2694`, tty_display_nhwindow `:1537-1547`, dmore `:1154-1172`).
// JS show_overview painted via paint_corner_nhw_menu(entries, '(end) '),
// which cannot page: scen-sweep-Barbarian-95306 step 1227 (end-of-game
// disclose overview, 2 pages) showed the 24th content line
// ("Some fountains.") where C shows " (1 of 2)". Now routed through the
// live select_menu_pick_none export (D-1849 pattern).
// Single prefix per file (multi-prefix runSegment leaks module state).

describe("show_overview PICK_NONE pager (dungeon.c:3328)", () => {
  it("95306 steps 1226-1228 match C overview pager then dismiss", { timeout: 240000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Barbarian-95306.recipe.json", import.meta.url), "utf8"));
    const sess = JSON.parse(readFileSync(
      new URL("../.cache/hidden/sessions/scen-sweep-Barbarian-95306.session.json", import.meta.url), "utf8"));
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    const seg = raw.segments[0];
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves, storage,
    });
    const screens = game.getScreens?.() || [];
    const row = (i, r) => String(screens[i]).split("\n")[r];
    const cScreen = (i) => String(sess.segments[0].steps[i].screen);
    const cRow = (i, r) => cScreen(i).split("\n")[r];
    assert.equal(row(1226, 0), cRow(1226, 0), "step 1226 ynq setup intact");
    assert.ok(row(1226, 0).includes("dungeon overview?"), "ynq prompt present");
    assert.equal(String(screens[1227]), cScreen(1227), "step 1227 overview page 1 byte-exact");
    assert.equal(row(1227, 23), " (1 of 2)", "multi-page morestr, not content line 24");
    assert.equal(row(1228, 0), cRow(1228, 0), "step 1228 dismiss intact");
    assert.ok(row(1228, 0).includes("Save bones?"), "ESC dismissed to bones prompt");
  });
});
