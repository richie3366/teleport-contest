import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c menu_identify `:2660–2695` → pickup.c query_objlist
// INVORDER_SORT `:1102–1117` add_menu_heading(let_to_name) (D-3753).
// scen-worldtour-Ranger-95231 step 152: the identify menu must show the
// "Armor" class heading (inverse) above the two armor picks. The old JS
// menu_identify hand-rolled its menu via paint_corner_nhw_menu without
// headings, so row 2 showed the boots line directly.
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-worldtour-Ranger-95231.recipe.json", import.meta.url),
));

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

describe("menu_identify shows INVORDER_SORT class headings (D-3753)", () => {
    it("step-152 identify menu shows 'Armor' above the armor picks", { timeout: 180000 }, async () => {
        const seg = RECIPE.segments[0];
        const g = await runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 152, `expected >152 screens, got ${screens.length}`);
        const rows = String(screens[152]).split("\n");
        assert.ok(rows[2].includes("Armor") && !rows[2].includes("boots"),
            `row 2: ${JSON.stringify(rows[2])}`);
        assert.ok(rows[3].includes("g - a +3 pair of speed boots (being worn)"),
            `row 3: ${JSON.stringify(rows[3])}`);
    });
});
