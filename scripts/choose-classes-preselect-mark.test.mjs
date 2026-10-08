import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c process_menu_window `:1467–1473` initial page paint shows
// '*' for a preselected menu item (count -1); runtime toggles show '+'
// via set_item_state `:1182` (D-3403 select_menu_pick_any sibling).
// scen-options-Knight-94331 step 88: "Autopickup what?" opens with the
// '$' class preselected — C row 2 is "a * $  pile of coins".
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-options-Knight-94331.recipe.json", import.meta.url),
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

describe("choose_classes_menu preselect paints '*' (wintty.c initial paint)", () => {
    it("step-88 submenu shows '*' for preselected, '-' for the rest", { timeout: 120000 }, async () => {
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
        assert.ok(screens.length > 88, `expected >88 screens, got ${screens.length}`);
        const rows = String(screens[88]).split("\n");
        assert.ok(rows[2].endsWith("a * $  pile of coins"), `row 2: ${JSON.stringify(rows[2])}`);
        assert.ok(rows[3].endsWith('b - "  amulet'), `row 3: ${JSON.stringify(rows[3])}`);
    });
});
