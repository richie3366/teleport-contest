import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: wintty.c tty_destroy_nhwindow `:1999` → erase_menu_or_text →
// docorner(offx, maxrow+1) for a corner menu: bot() runs only when the
// menu reached WIN_STATUS (`:3716`), and destroy_nhwindow does no
// flush_screen. JS's show_nhw_menu_text added flush_screen(1) after the
// corner erase, so a pending botl repainted the status lines that C's
// final-disclosure screens leave blank between end.c container_contents
// menus (scen-sweep-Healer-50055088 s774, D-4085). Single prefix per file
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

describe("corner menu dismiss does not flush status (wintty.c)", () => {
  it("50055088 step 774 keeps the status rows blank", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Healer-50055088", 775);
    const rows = String(screens[774]).split("\n");
    assert.ok(String(rows[0]).includes("Contents of the bag of holding:"), JSON.stringify(rows[0]));
    assert.equal(String(rows[22] ?? "").trim(), "", JSON.stringify(rows[22]));
    assert.equal(String(rows[23] ?? "").trim(), "", JSON.stringify(rows[23]));
  });
});
