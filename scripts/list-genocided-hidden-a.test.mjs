import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: insight.c list_genocided `:3040–3041` — a lone gone species asks
// with `"ynq\033a"`: tty_yn_function shows only "[ynq]" but still accepts
// the hidden 'a' after the ESC. JS passed plain 'ynq', so 'a' rang the bell
// and the prompt stayed up while C listed «Genocided species:»
// (scen-kit-Wizard-50552014 s74, D-4075). Single prefix per file
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

describe("list_genocided accepts the hidden 'a' answer (insight.c)", () => {
  it("50552014 step 74 'a' lists genocided species", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-kit-Wizard-50552014", 75);
    const top = String(screens[74]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("Genocided species:"), JSON.stringify(top.slice(0, 80)));
  });
});
