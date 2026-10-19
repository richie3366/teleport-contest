import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: minion.c gain_guardian_angel `:507` — `if (Conflict)`, youprop.h
// HConflict || EConflict, where a worn ring of conflict's EConflict lives
// in u.uprops[CONFLICT].extrinsic. JS tested the phantom flat
// u.HConflict || u.EConflict, so arriving on the Astral Plane wearing the
// ring took the fervent/no-op arm: «A voice booms:» and the hostile
// angels went missing (scen-worldtour-Wizard-50350024 step 834, D-4066).
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
  return handle.getScreens?.() || [];
}

describe("gain_guardian_angel honours a worn ring of conflict (minion.c:507)", () => {
  it("50350024 step 834 Astral arrival booms", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Wizard-50350024", 835);
    const top = String(screens[834]).split("\n")[0];
    assert.ok(top.includes("A voice booms:"), JSON.stringify(top.slice(0, 90)));
  });
});
