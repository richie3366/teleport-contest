import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: detect.c dosearch0 `:2048/2058/2080` — each find path (hidden
// door, hidden passage, trap) calls nomul(0), which sets disp.botl
// (multi>=0) and, via end_running, time_botl when a run stops. JS
// called a thin clone (nomul_clear: silent multi/run clear, no botl),
// so an autosearch trap find during a run never repainted the status
// clock: scen-chain-Knight-578142 step 308 showed stale T:39 where C
// paints T:40 (live moves=40 both sides; only that screen differed).
// Pins the machine-recorded C screen. Chain replay needs shared
// storage across segments — one prefix per file (multi-prefix
// runSegment in one process leaks module state, D-3762).
async function runChainPrefix(recipeName, segIdx, nmoves) {
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
  let nhGame = null;
  for (let i = 0; i <= segIdx; i++) {
    const seg = raw.segments[i];
    const mv = (i < segIdx) ? seg.moves : seg.moves.slice(0, nmoves);
    nhGame = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: mv, storage,
    });
  }
  return nhGame;
}

describe("dosearch0 find paths call nomul(0), not a silent clear", () => {
  it("chain-Knight seg2 step 308 paints T:40 on run-stop trap find", { timeout: 300000 }, async () => {
    const nhGame = await runChainPrefix("scen-chain-Knight-578142", 2, 48);
    const screens = nhGame.getScreens?.() || [];
    assert.equal(screens.length, 49, "prefix reaches local step 48");
    const rows = screens[screens.length - 1].split("\n");
    assert.ok(
      rows[0].includes("You find a trap door."),
      `reached the trap-find turn (top: ${rows[0].slice(0, 80)})`);
    assert.ok(
      rows[23].includes("T:40"),
      `status clock repainted after run stop (r23: ${rows[23]})`);
  });
});
