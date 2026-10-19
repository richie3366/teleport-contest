import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: wintty.c tty_end_menu `:2680–2690` — a non-null end_menu prompt
// goes in above a blank item, so options.c handler_msg_window's «Select
// message history display type:» (`:5867`) sits over an empty row. JS
// painted the prompt straight above «s * single», one row high
// (scen-options-Monk-50457010 s39, D-4082). Single prefix per file
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

describe("handler_msg_window menu prompt sits above a blank row (wintty.c)", () => {
  it("50457010 step 39 has a blank row under the prompt", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-options-Monk-50457010", 40);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[39]));
    const row = (r) => g[r].map(renderCell).join("");
    assert.ok(row(0).includes("Select message history display type:"), JSON.stringify(row(0)));
    assert.equal(row(1).trim(), "", JSON.stringify(row(1)));
    assert.ok(row(2).includes("s * single"), JSON.stringify(row(2)));
  });
});
