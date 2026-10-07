import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c doset `:8871–8880` gameview pass → doset_add_menu
// `:9036–9044` (optfn get_val into buf2) → optfn_pettype `:3237–3243`
// (preferred_pet 'h' → «horse»). scen-options-Valkyrie-94311 carries
// OPTIONS=pettype:horse; C page 6 shows «pettype [horse]» but JS
// hardcoded «[random]» (D-3580 omission 3) until the doset gameview rows
// were wired to their live optfns.
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

describe("doset gameview pettype (options.c doset_add_menu :9038)", () => {
    it("Valkyrie-94311 page 6 shows [horse] from rc pettype:horse", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-options-Valkyrie-94311.recipe.json", import.meta.url),
        ));
        const seg = recipe.segments[0];
        // Moves 0–35 open the full menu (mO@26–27) and page to 6 of 8
        // (5× >@28–32); input exhausts on the page-6 screen.
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 36),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const last = screens[screens.length - 1] || "";
        assert.match(last, /pettype/, "page 6 lists pettype");
        assert.match(last, /\[horse\]/, "rc pettype:horse displays [horse] (C :3240)");
        assert.doesNotMatch(last, /\[random\]/, "must not fall back to hardcoded [random]");
    });
});
