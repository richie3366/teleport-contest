import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: windows.c select_menu `:1855–1865` scopes gb.bot_disabled around
// win_select_menu but preserves disp.botl/botlx — nothing in the select
// path clears them. The fullscreen enhance-menu dismiss runs docrt()
// (disp.botlx=TRUE, display.c:1767) + flush_screen(1) whose bot() skips
// while disabled (botl.c:255–256, flags preserved); the repaint lands
// after the select returns via pline.c:274's flush_screen → bot() →
// status_update(BL_RESET) (botl.c:1670–1673) → render_status full repaint
// WITH the hitpointbar inverse (wintty.c:5155–5166).
// scen-options-Barbarian-94251 step 151: JS's post-dismiss
// clear_committed_status ate botlx, so the post-select bot() saw
// updated=0/botlx=false, sent neither RESET nor FLUSH, and the flush
// fallback repainted the bar text PLAIN (brackets, no inverse).
function loadRecipe(id) {
    return JSON.parse(readFileSync(
        new URL(`../hidden-corpus/recipes/${id}.recipe.json`, import.meta.url),
    ));
}

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

const stripSgr = (row) => row.replace(/\x1b\[[0-9;]*[A-Za-z]/g, (m) =>
    m.match(/\x1b\[\d+C/) ? ' '.repeat(parseInt(m.slice(2), 10) || 0) : '');

describe("fullscreen select dismiss preserves botlx (windows.c select_menu)", () => {
    it("Barbarian-94251 step-151 bar keeps the C inverse after #enhance", { timeout: 180000 }, async () => {
        const seg = loadRecipe("scen-options-Barbarian-94251").segments[0];
        const g = await runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 151, `expected >151 screens, got ${screens.length}`);
        // Guard: the bar inverse is on before the menu (step 149 yn prompt).
        const pre = String(screens[149]).split("\n")[22];
        assert.ok(pre.includes("\x1b[7m"), `pre-menu bar inverse missing: ${JSON.stringify(pre)}`);
        // The fix: step 151 (menu dismissed, "more skilled" --More--)
        // repaints the bar WITH inverse, like C.
        const row = String(screens[151]).split("\n")[22];
        assert.ok(row.includes("\x1b[7m"), `post-dismiss bar inverse missing: ${JSON.stringify(row)}`);
        assert.equal(
            stripSgr(row),
            "[Wizard the Plunderer          ] St:18/03 Dx:16 Co:18 In:7 Wi:7 Ch:6 Chaotic",
            `bar text: ${JSON.stringify(row)}`,
        );
    });
});
