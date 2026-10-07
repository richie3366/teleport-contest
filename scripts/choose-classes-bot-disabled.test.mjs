import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: windows.c select_menu `:1859–1863` wraps display + dismiss with
// gb.bot_disabled = TRUE (saved/restored); tty_display_nhwindow MENU-corner
// clears only WIN_MESSAGE, so the pending botlx from the parent fullscreen
// dismiss's docrt is serviced only after the select returns — WIN_STATUS
// stays as the erase left it (blank after fullscreen).
// scen-options-Tourist-94111 step 23: "Autopickup what?" corner submenu
// painted while botlx pends — C row 22 is blank + "(end)", JS repainted
// the committed status ("Wizard the Rambler" + "(end)") + status line 2.
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-options-Tourist-94111.recipe.json", import.meta.url),
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

describe("choose_classes_menu select runs bot-disabled (windows.c select_menu)", () => {
    it("step-23 submenu leaves WIN_STATUS blank like C", { timeout: 120000 }, async () => {
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
        assert.ok(screens.length > 25, `expected >25 screens, got ${screens.length}`);
        const rows = String(screens[23]).split("\n");
        assert.equal(rows[22], "\x1b[25C(end)", `row 22: ${JSON.stringify(rows[22])}`);
        assert.ok(rows[23] === undefined || rows[23] === "", `row 23: ${JSON.stringify(rows[23])}`);
        assert.deepEqual(g.getCursors()[23], [31, 22, 1]);
    });
});
