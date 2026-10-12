import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do.c save_currentstate `:1375-1395` (`#ifdef INSURANCE`) — the
// WRITING-only checkpoint at the end of every goto_level (do.c:1968-1969)
// runs savelev, whose save.c:493-494 arm marks the just-attained level
// VISITED. That arrival-time mark survives a later FREEING leave +
// cant_go_back discard (delete_levelfile clears only LFILE_EXISTS), so a
// re-entry takes the do.c:1695 discarded-level impossible arm.
// scen-worldtour-Healer-582620: Tutorial:2 (ledger 79) entered at step 286
// (checkpoint sets VISITED|LFILE... in C), left at 297 (FREEING + discard
// clears LFILE_EXISTS), re-entered at 633 — C prints the impossible, JS
// printed the arrival messages (VISITED never set: the checkpoint arm was
// a named omission). TEMP-C ORE trace measured slot 79 = flags 1 at 633.
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

describe("save_currentstate checkpoint marks arrival VISITED (do.c:1387, save.c:494)", () => {
  it("582620 step 633 prints the discarded-level impossible", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-worldtour-Healer-582620", 633);
    assert.ok(screens.length > 633, `expected 634+ screens, got ${screens.length}`);
    const top633 = String(screens[633]).split("\n")[0]
      .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
    assert.equal(top633,
      "goto_level: returning to discarded level?--More--",
      `step 633 topline: ${JSON.stringify(top633.slice(0, 120))}`);
    // Mechanism: slot 79 (Tutorial:2) carried VISITED-only into the
    // re-entry (286-arrival checkpoint set it, 297 FREEING leave +
    // discard cleared only LFILE_EXISTS) — the only path to the
    // impossible above; the :1697 arm cleared it and the 633-arrival
    // checkpoint re-marked it, so the slot reads exactly VISITED.
    const flags = (game.level_info?.[79]?.flags | 0);
    assert.equal(flags, 1,
      `expected slot 79 flags==VISITED after arrival checkpoint, got flags=${flags}`);
  });
});
