import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c erase_menu_or_text / tty_dismiss_nhwindow(NHW_MENU) —
// a corner menu dismisses via docorner (reprint retained gbuf, no
// newsym); only fullscreen (offx==0) docrts. getpos.c handle_tip shows
// the farlook tip as a corner NHW_MENU; closing it must not newsym the
// hero `@` over a cell C still shows stale (scen-dig-Caveman-94195 s66:
// the hero stands on a seen trap `^`; C keeps `^`, a docrt paints `@`).
describe("show_getpos_tip dismiss reprints gbuf without newsym", () => {
  it("keeps the stale trap glyph under the hero (Caveman-94195 s66)", async () => {
    const recipe = JSON.parse(readFileSync(
      join(ROOT, "hidden-corpus/recipes/scen-dig-Caveman-94195.recipe.json"), "utf8"));
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
      moves: seg.moves.slice(0, 66),
      storage,
    });
    const screens = g.getScreens();
    assert.ok(screens.length > 66, `expected >66 screens, got ${screens.length}`);
    const clean = (s) => s.replace(/\x1b\[[0-9;]*[A-Za-z]/g, "").replace(/[\x0e\x0f]/g, "");
    const row14 = clean(screens[66].split("\n")[14] || "");
    assert.ok(row14.includes("+^"), `s66 row14 keeps ^, got ${JSON.stringify(row14)}`);
  });
});
