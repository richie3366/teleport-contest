import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: polyself.c newman `:414` (u.uhunger = rn1(500,500)) + `:436`
// (newuhs(FALSE)) — the new form re-rolls hunger into 500..999 and
// recomputes uhs from it. JS newman reset uhunger but dropped the
// `:436` newuhs call, so u.uhs stayed SATIATED (stale) and the status
// line kept "Satiated": scen-sweep-Rogue-578101 step 580 shows C row 23
// bare while JS row 23 carries " Satiated" (RNG fully matched).
const ID = "scen-sweep-Rogue-578101";
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

describe("newman recomputes uhs after resetting uhunger (578101)", () => {
    it(`${ID}: step-580 status row has no Satiated`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        assert.ok(steps.length > 580, `expected >580 C steps, got ${steps.length}`);
        // C-side pins below guard recording-shape change: if they fail
        // the test is vacuous.
        const cPrev = String(steps[579].screen).split("\n")[23];
        assert.ok(cPrev.includes("Satiated"),
            `C pre-step lost Satiated: ${JSON.stringify(cPrev)}`);
        const cRow = String(steps[580].screen).split("\n")[23];
        assert.equal(cRow, "Dlvl:22 $:0 HP:52(132) Pw:62(62) AC:10 Xp:20",
            `C step-580 status moved: ${JSON.stringify(cRow)}`);
        assert.ok((steps[580].rng || []).some((e) => String(e).includes("newman(polyself.c:414)")),
            "C step-580 has no newman uhunger draw");

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length > 580,
            `session truncated: ${screens.length} screens`);
        const jsRow = (screens[580] || "").split("\n")[23] || "";
        assert.ok(jsRow.includes("Xp:20"),
            `step 580 row 23 is not the status row: ${JSON.stringify(jsRow)}`);
        assert.ok(!jsRow.includes("Satiated"),
            `stale uhs after newman: ${JSON.stringify(jsRow)}`);
    });
});
