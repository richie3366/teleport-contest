import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mon.c mon_leaving_level `:2717–2726` + relmon `:2571–2584` — the
// grid is cleared (remove_monster) and newsym runs BEFORE the fmon unlink,
// because C's m_at is grid-only (rm.h:510): newsym already sees no monster.
// JS m_at/mon_at_display fall back to the fmon coord scan (mon.js:1734–1741,
// display.js:586–592), which still holds a live migrant (mhp > 0, mx/my
// intact) — so migrate_to_level's sync mirror (teleport.js) must unlink
// fmon BEFORE newsym, or newsym repaints the migrant over the revealed
// trap. Pre-fix, 3 corpus sessions failed screen-first with the migrant
// glyph where C shows `^` (e.g. Valkyrie-94311 step 92 row 6 col 76:
// C `^` vs JS `d`). This test pins the recorded C paint on that cell.
const ID = "scen-options-Valkyrie-94311";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("migrate_to_level fmon unlink before newsym (mon.c:2561-2594)", () => {
    it(`${ID}: migrated dog's square shows the trap, not the dog (step 92)`, { timeout: 120000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 92, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[92]);
        // C row 6: `│···<^│` — stairs, then the revealed trap where the
        // dog stood. JS pre-fix painted the dog `d` at col 76.
        assert.equal(grid[6][75].ch, "<", "row6 col75 stairs context");
        assert.equal(grid[6][76].ch, "^", "row6 col76 revealed trap (not `d`)");
    });
});
