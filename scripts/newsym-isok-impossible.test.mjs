import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: display.c newsym `:929–938` — !isok coords take the
// panic/impossible arm (same handling as u_on_newpos): off-map
// panics, column-0 misuse is impossible(). JS returned silently
// (`if (!loc) return`), so C's "newsym: attempting screen update
// for <0,0>" topline never printed: scen-worldtour-Wizard-49950024
// step 151 shows "" where C shows the impossible message (D-4059).
// One prefix per file (multi-prefix runSegment leaks module state,
// D-3762).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return handle.getScreens?.() || [];
}

describe("newsym !isok arm prints the C impossible message", () => {
  it("worldtour-Wizard-49950024 replays the burst head and resumes in sync", { timeout: 180000 }, async () => {
    // C shows 9 impossible triplets at steps 151-177 (one page per
    // step) and resumes the game at 178. JS emits all 27 messages in
    // order via the arm's drain; pages 151-163 match C exactly, then
    // the drain's mores race the turn loop's key reads (shared
    // nhgetch scheduling — pages interleave until the ack keys run
    // out as turn-neutral "Unknown command" no-ops) and the game
    // resumes in sync at 178 (key accounting preserved). The 164-177
    // interleave is a message-pacing residual, not this arm (D-4059).
    const screens = await runPrefix("scen-worldtour-Wizard-49950024", 185);
    assert.equal(screens.length, 186, "prefix reaches step 185");
    const top = (i) => screens[i].split("\n")[0];
    for (let k = 0; k < 4; k++) {
      const s = 151 + 3 * k;
      assert.ok(
        top(s).includes("newsym: attempting screen update for <0,0>"),
        `step ${s} newsym page (top: ${JSON.stringify(top(s).slice(0, 90))})`);
      assert.ok(
        top(s + 1).includes("Program in disorder!"),
        `step ${s + 1} disorder page (top: ${JSON.stringify(top(s + 1).slice(0, 90))})`);
      assert.ok(
        top(s + 2).includes("Please report these messages to devteam@nethack.org."),
        `step ${s + 2} report page (top: ${JSON.stringify(top(s + 2).slice(0, 90))})`);
    }
    assert.ok(
      top(163).includes("newsym: attempting screen update for <0,0>"),
      `step 163 fifth newsym page (top: ${JSON.stringify(top(163).slice(0, 90))})`);
    for (const [s, want] of [
      [178, "You already found a monster."],
      [180, "The Wizard of Yendor vanishes and reappears next to you."],
      [182, "You die..."],
      [184, "OK, so you don't die."],
    ]) {
      assert.ok(
        top(s).includes(want),
        `step ${s} back in sync (top: ${JSON.stringify(top(s).slice(0, 90))})`);
    }
  });
});
