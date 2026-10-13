import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: restore.c find_lev_obj `:70–107` — level load re-places every
// floor object oldest-first through place_object, so a non-boulder lands
// under the last consecutive boulder (mkobj.c `:2336–2344`) and the map
// shows boulder (D-3910). JS rebuilt piles by naive prepend, leaving the
// fire-giant corpse over the boulder at (19,9) after the s781 load, so
// scen-sweep-Healer-585512 step 781 showed `%` where C shows `` ` ``.
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
  return { screens: handle.getScreens?.() || [] };
}

const strip = (t) => t.replace(/\u001b\[[0-9;]*[A-Za-z]/g, "").replace(/[\u000e\u000f]/g, "");

describe("find_lev_obj re-threads boulder piles at load (restore.c:70-107)", () => {
  it("585512 step 781 map row matches C-recorded boulder-top row", { timeout: 240000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Healer-585512", 782);
    assert.ok(screens.length > 781, `expected 782+ screens, got ${screens.length}`);
    const line10 = strip(String(screens[781]).split("\n")[10]);
    // JS renders walls/floor as unicode (scorer-normalized C is identical).
    assert.equal(line10, "│····`%·······+",
      `step 781 map row 10: ${JSON.stringify(line10)}`);
    const { objects_at } = await import("../js/mkobj.js");
    const { objectNames } = await import("../js/objects.js");
    const head = objects_at(19, 9);
    assert.ok(head, "expected a pile at (19,9)");
    assert.equal(head.otyp, objectNames.indexOf("BOULDER"),
      `pile head otyp: ${head.otyp} (${objectNames[head.otyp]})`);
  });
});
