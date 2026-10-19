import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: getpos.c getpos `:804` msg_given = TRUE by default, reset only by
// `:891` (autodescribe) or a "Done." `:1137`; exitgetpos `:1156–1157`
// clears the message window when it is still set. JS's pick arms (. , ; :)
// returned straight from the loop, so with autodescribe off the travel
// prompt «Where do you want to travel to?» stayed on the topline after
// the pick (scen-extcmd-Rogue-51257076 step 599 `,` — 30 corpus sessions,
// D-4072). Single prefix per file (multi-prefix runSegment leaks module
// state).
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

describe("getpos exit clears the message window when msg_given (getpos.c:1156)", () => {
  it("51257076 step 599 travel pick leaves an empty topline", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-extcmd-Rogue-51257076", 600);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const top = decodeScreen(String(screens[599]))[0].map(renderCell).join("").trimEnd();
    assert.equal(top, "");
  });
});
