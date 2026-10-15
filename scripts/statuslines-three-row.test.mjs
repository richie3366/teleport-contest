import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: win/tty/wintty.c tty_preference_update `:594–608` — setting the
// in-game `statuslines` option to 3 destroys and recreates the status
// window with 3 rows (new_status_window `:491–507`, origin rows−3) and
// re-clips the map (newclipping `:471–485`; 24 < 1+21+3 so clipping turns
// on, clipymax 20). bot() then renders the threelineorder fields
// (`:5011`) at grid rows 21–23.
// scen-symset-Monk-50250007 step 423 (first screen after ESC from the
// options menu): C row 21 is status line 1 without alignment, row 22 is
// alignment + gold/HP/Pw/AC/Xp, row 23 is Dlvl. JS painted 2 lines at
// rows 22–23 (preference_update was a no-op).
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-symset-Monk-50250007.recipe.json", import.meta.url),
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

describe("statuslines=3 paints the tty 3-row status (wintty.c tty_preference_update)", () => {
    it("step-423 screen shows status at rows 21-23 like C", { timeout: 180000 }, async () => {
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
        assert.ok(screens.length > 423, `expected >423 screens, got ${screens.length}`);
        const rows = String(screens[422]).split("\n");
        assert.equal(rows[21], "Wizard the Candidate\x1b[11CSt:17 Dx:14 Co:12 In:10 Wi:12 Ch:10", `row 21: ${JSON.stringify(rows[21])}`);
        assert.equal(rows[22], "Lawful $:0 HP:19(19) Pw:5(5) AC:4 Xp:1", `row 22: ${JSON.stringify(rows[22])}`);
        assert.equal(rows[23], "Dlvl:7", `row 23: ${JSON.stringify(rows[23])}`);
        assert.deepEqual(g.getCursors()[422], [43, 5, 1]);
    });
});
