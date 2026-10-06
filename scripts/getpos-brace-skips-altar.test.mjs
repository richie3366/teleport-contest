import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c:1052-1061 matching[] build — a feature key matches a cmap
// only via defsyms[].sym or gs.showsyms[] (exact value compare). Under
// OPTIONS=symset:DECgraphics (dat/symbols) showsyms[S_altar] is \xfb
// (meta-'{'), S_tree \xe7, S_bars \xfc, S_pool/lava/lavawall/water \xe0,
// S_ice \xfe — none equal the ASCII keys '{'/g/|/`/~. So '{' matches only
// S_sink/S_fountain and the cursor must skip a scan-earlier altar
// (scen-town-Tourist-94022 s87: C cursor [26,11] "fountain", not [36,8]
// "chaotic altar").
async function replayTo(id, step) {
  const recipe = JSON.parse(readFileSync(
    join(ROOT, `hidden-corpus/recipes/${id}.recipe.json`), "utf8"));
  const seg = recipe.segments[0];
  const mem = new Map();
  const storage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    get length() { return mem.size; },
    key: (i) => [...mem.keys()][i] ?? null,
  };
  const g = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, step),
    storage,
  });
  return g;
}

describe("getpos '{' skips the altar under symset:DECgraphics", () => {
  it("lands on the fountain like C (Tourist-94022 s87)", async () => {
    const g = await replayTo("scen-town-Tourist-94022", 87);
    const screens = g.getScreens();
    const cursors = g.getCursors();
    assert.ok(screens.length > 87, `expected >87 screens, got ${screens.length}`);
    const row0 = String(screens[87]).split("\n")[0];
    assert.equal(row0, "fountain");
    assert.deepEqual(cursors[87], [26, 11, 1]);
  });
});
