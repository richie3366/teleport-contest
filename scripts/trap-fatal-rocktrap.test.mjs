import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c losehp (u.uhp < 1 → urgent_pline("You die...") +
// done(DIED), noreturn unless life-saved) + trap.c trapeffect_rocktrap
// `:1368-1373` (d(2,6) rock + losehp + exercise STR).
// JS losehp is sync: fatal sets gameover + _losehp_needs_done and defers
// done() to finish_losehp_done (trap.js finish_hero_losehp precedent,
// pit/lava/drown sites). trapeffect_rocktrap never drained it, so a
// fatal rock ended the run with no death sequence: scen-trap-Caveman-94281
// stopped at 146/179 screens (trap RNG drawn, rock message never shown).
// Wizard mode then declines death (Die? → n → lifesave), so the drained
// path continues: exercise + the remaining 33 screens.
// This test pins the 146 rock + 147 death + 148 Die? + 149 lifesave
// toplines and session completion.
const ID = "scen-trap-Caveman-94281";
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

describe("fatal rocktrap drains done() (trapeffect_rocktrap, cliff)", () => {
    it(`${ID}: 146 rock + 147 You die + 148 Die? + 149 lifesave + completes`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        const row0 = (i) => JSON.stringify((screens[i] || "").slice(0, 90));
        assert.ok(screens.length >= 179,
            `session truncated: ${screens.length} screens < 179 steps`);
        assert.ok(screens[146].includes("A trap door in the ceiling opens and a rock falls on your head!"),
            `step 146 is not the rocktrap message: ${row0(146)}`);
        assert.ok(screens[147].includes("You die..."),
            `step 147 is not the death line: ${row0(147)}`);
        assert.ok(screens[148].includes("Die? [yn]"),
            `step 148 is not the wizard death prompt: ${row0(148)}`);
        assert.ok(screens[149].includes("don't die"),
            `step 149 is not the lifesave line: ${row0(149)}`);
    });
});
