import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: wintty.c tty_end_menu `:2680–2690` — a non-null end_menu prompt
// goes in above a blank item, so cmd.c extcmd_via_menu's «Extended
// Command: %s» (`:856–857`) sits over an empty row. JS unshifted only the
// prompt, so «? - ?» rose to row 1 and the page held one more entry
// (scen-options-Tourist-49951011 s176, D-4083). Single prefix per file
// (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes-reserve/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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

describe("extcmd_via_menu prompt sits above a blank row (wintty.c)", () => {
  it("49951011 step 176 has a blank row under the prompt", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-options-Tourist-49951011", 177);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[176]));
    const row = (r) => g[r].map(renderCell).join("");
    assert.ok(row(0).includes("Extended Command:"), JSON.stringify(row(0)));
    assert.equal(row(1).trim(), "", JSON.stringify(row(1)));
    assert.ok(row(2).includes("? - ? [list all extended commands]"), JSON.stringify(row(2)));
  });
});
