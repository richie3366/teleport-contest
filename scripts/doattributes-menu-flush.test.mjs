import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: win/tty/wintty.c tty_display_nhwindow NHW_MENU `:1921–1922` —
// display flushes a pending topline --More-- (tty_display_nhwindow
// WIN_MESSAGE) before painting any menu. JS doattributes inlined its own
// menu painter without the select_menu_pick_none `:3271` flush_topl_more,
// so an artifact-invoke enlightenment painted over the queued low-HP wail:
// scen-sweep-Barbarian-95306 step 876 shows attributes where C shows the
// wail page, shifting every later screen one step early (RNG unaffected).
// Single prefix per file (multi-prefix runSegment leaks module state).

describe("doattributes menu NEED_MORE flush (wintty.c:1921-1922)", () => {
  it("95306 steps 876-878 match C wail page then attributes", { timeout: 240000 }, async () => {
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
    const row0 = (i) => String(screens[i]).split("\n")[0];
    const cRow0 = (i) => String(sess.segments[0].steps[i].screen).split("\n")[0];
    assert.equal(row0(875), cRow0(875), "step 875 blast setup intact");
    assert.equal(row0(876), cRow0(876), "step 876 matches C wail page");
    assert.ok(row0(876).includes("howling of the CwnAnnwn"), "wail, not attributes");
    assert.equal(row0(877), cRow0(877), "step 877 matches C attributes menu");
    assert.ok(String(screens[877]).includes("harmed by silver"), "Hate_silver arm present (insight.c:1894-1895)");
    assert.equal(row0(878), cRow0(878), "step 878 realigned on minotaur turn");
  });
});
