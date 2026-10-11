import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: pray.c doturn `:2419–2425` — non-Cleric/Knight roles try the
// "turn undead" spell via known_spell(SPE_TURN_UNDEAD) + spelleffects,
// printing "don't know how" only when the spell is unknown. JS had the
// whole fallback deferred, so a Wizard who knew the spell still drew
// «You don't know how to turn undead!» where C casts (and here fails
// the rnd(100) roll in spelleffects_check). Pins the machine-recorded
// C topline at step 545. Pre-fix: "don't know how to turn undead".
// Single prefix per file (multi-prefix runSegment leaks module state).
async function replayAll(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const { runSegment } = await import("../js/jsmain.js");
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: undefined,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s);
    }
    return screens;
}

describe("doturn non-Cleric/Knight turn-undead spell fallback (pray.c:2421)", () => {
    it("sweep-Wizard-578137 step 545 casts (C fail message), not don't-know", { timeout: 180000 }, async () => {
        const screens = await replayAll("scen-sweep-Wizard-578137");
        assert.ok(screens.length > 545, `only ${screens.length} screens`);
        const row0 = String(screens[545]).split("\n")[0];
        assert.ok(row0.includes("You fail to cast the spell correctly."),
            `step 545 topline: ${JSON.stringify(row0)}`);
        assert.ok(!row0.includes("don't know how to turn undead"),
            `stale deferred arm at step 545: ${JSON.stringify(row0)}`);
    });
});
