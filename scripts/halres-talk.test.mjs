import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: artifact.c:788–796 SPFX_HALRES → make_hallucinated(!on, !restoring,
// wp_mask); potion.c:385–392 mask arm (changed iff a hallucination timeout
// runs) + :414–436 changed arm (talk pline). D-3223 ported the sync half
// (flip + see_* + update + botl) and named the talk pline async-only.
// scen-sweep-Healer-50556037 quaffs hallucination early, wishes Grayswandir
// (silver saber, the only SPFX_HALRES artifact, cspfx 0), wields it at step
// 289 while the timeout (678) still runs: C queues boring behind the weld
// ("...right hand!--More--" at 289, "Everything looks SO boring now.--More--"
// at 290); JS printed no boring, so the shaman's cast message surfaced a
// step early at 290 and the RNG stream shifted one step (JS-289 draws C-290's
// distfleeck + choose_monster_spell; cumulative 6234 vs C 6232).
// Second writer, same session: js/timeout.js's per-turn HALLUC re-mirror set
// u.Hallucination from the raw flat WITHOUT the resistance check (C
// Hallucination is a macro over the mask), so the hero re-hallucinated on
// the first turn after the flip while C stays non-Hallu.
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
    const raw = JSON.parse(readFileSync(
        new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
        getItem: (k) => (m.has(k) ? m.get(k) : null),
        setItem: (k, v) => m.set(k, String(v)),
        removeItem: (k) => m.delete(k),
        get length() { return m.size; },
        key: (i) => [...m.keys()][i] ?? null,
    };
    const handle = await runSegment({
        seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
        moves: seg.moves.slice(0, nmoves), storage,
    });
    const { game } = await import("../js/gstate.js");
    return { screens: handle.getScreens?.() || [], game };
}

function stripAnsi(s) {
    return String(s)
        .replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
        .replace(/[]/g, "");
}

let prefix = null;
async function prefix291() {
    if (!prefix) prefix = await runPrefix("scen-sweep-Healer-50556037", 291);
    return prefix;
}

describe("HALRES wield talk + resisted timeout mirror (artifact.c:788-796)", () => {
    it("Healer-50556037 step 290 shows the boring pline, not the shaman cast", { timeout: 180000 }, async () => {
        const { screens } = await prefix291();
        assert.ok(screens.length > 290, `expected 291+ screens, got ${screens.length}`);
        const row0 = stripAnsi(String(screens[290]).split("\n")[0]);
        assert.ok(
            row0.includes("Everything looks SO boring now."),
            `step-290 topline must be the boring pline: ${JSON.stringify(row0)}`,
        );
    });
    it("Healer-50556037 stays non-hallucinating while resisted (step 291)", { timeout: 180000 }, async () => {
        const { game } = await prefix291();
        const u = game.u || {};
        assert.ok((u.HHallucination | 0) > 0, "hallucination timeout still runs");
        assert.ok((u.EHalluc_resistance | 0) !== 0, "Grayswandir resistance holds");
        assert.equal(
            u.Hallucination, false,
            `stored bit must mirror C's resisted macro (false), got ${u.Hallucination}`,
        );
    });
});
