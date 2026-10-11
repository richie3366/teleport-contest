import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c chat_with_leader Rule 5 (`:318–353`) via quest_talk
// (monmove.c:722/981) <- monster movement; qt_pager("leader_first") then
// is_pure(TRUE) wizard talk then qt_pager("badalign") <- questpgr.c
// com_pager_core <- dat/quest.lua Bar leader_first `:562–569` (output=text)
// + Bar badalign `:443–450` (output=text). JS com_pager_core is whole, but
// QUEST_LEADER_FIRST/QUEST_BADALIGN had no Bar bodies (Arc+Pri / Arc only)
// → role lookup miss → silence: no text window, no blocking, so the whole
// chat (chugging + is_pure + yn + badalign + expulsion) collapsed into one
// step. C spreads it over s369–374 (More, text window, is_pure, yn, text).
// Pins the machine-recorded C expectation: Bar leader_first text at
// scen-worldtour-Barbarian-578309 step 370 (%p→wizard via set_playmode
// rename, options.c:10138) + Bar badalign text at step 373 (%pC→Wizard,
// %a→chaotic, %n→Thoth Amon).
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games (D-3762; hidden-proxy scores one
// process per session, unaffected).
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
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return (game.getScreens?.() || []).join("\n");
}

describe("quest Barbarian leader_first + badalign chat texts (quest.lua Bar bodies)", () => {
  it("leader chat shows leader_first then badalign windows", { timeout: 240000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Barbarian-578309", 376);
    assert.ok(screens.includes("You hear a chugging sound."),
      "prefix reached the leader-chat turn");
    assert.ok(screens.includes("Ah, wizard.  You have returned at last.  The world is in dire"),
      "Bar leader_first line 1 (%p→wizard)");
    assert.ok(screens.includes("But first, I must see if you are ready to take on such a challenge."),
      "Bar leader_first last line");
    assert.ok(screens.includes("Wizard!  You have wandered from the path of the chaotic!"),
      "Bar badalign line 1 (%pC→Wizard, %a→chaotic)");
    assert.ok(screens.includes("If you attempt to overcome Thoth Amon in this state, he will surely"),
      "Bar badalign line 2 (%n→Thoth Amon)");
  });
});
