import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c doset_add_menu `:9038–9044` (every compound via optfn
// get_val; "unknown" unless optn_ok + non-empty) → optfn_fruit get_val
// `:1769–1771` (Sprintf pl_fruit). scen-options-Archeologist-94231 sets
// fruit=j through the O menu ("Set fruit to what? j", steps 69–71); the
// full-menu compound row hardcoded "[slime mold]" instead of routing via
// the live optfn like its sibling rows (D-3602 gameview class).
function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("doset full-menu fruit (options.c doset_add_menu :9038)", () => {
    it("Archeologist-94231 page 6 shows [j] after the O-menu fruit set", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-options-Archeologist-94231.recipe.json", import.meta.url),
        ));
        const seg = recipe.segments[0];
        // Moves 0–150 open the full menu (mO@144–145) and page to 6 of 8
        // (5× >@146–150); input exhausts on the fruit page (C step 152).
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 151),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const last = screens[screens.length - 1] || "";
        assert.match(last, /fruit/, "page 6 lists fruit");
        assert.match(last, /\[j\]/, "user-set fruit=j displays [j] (C :1770)");
        assert.doesNotMatch(last, /\[slime mold\]/, "must not fall back to hardcoded [slime mold]");
    });
});
