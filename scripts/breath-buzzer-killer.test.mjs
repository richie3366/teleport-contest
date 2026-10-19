import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mthrowu.c breamm `:1122` sets gb.buzzer = mtmp around dobuzz;
// zap.c zhitu `:4572–4577` then names the killer «<fltxt> exhaled by
// <mon>». JS breamm/priest/timeout wrote `game.buzzer` while zap.js (and
// muse/mcastu) read `game._buzzer`, so a fatal breath recorded just
// «a blast of fire» in the final resting place (scen-worldtour-Wizard-
// 51250064 step 624 overview, D-4071). Single prefix per file
// (multi-prefix runSegment leaks module state).
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
  return handle.getScreens?.() || [];
}

describe("breath killer names the breather (zap.c:4572 / mthrowu.c:1122)", () => {
  it("51250064 step 624 overview grave line says exhaled by", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Wizard-51250064", 625);
    const scr = String(screens[624]);
    assert.ok(scr.includes("killed by a blast of fire exhaled by a hell hound"), JSON.stringify(scr.split("\n")[3]));
  });
});
