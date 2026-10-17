import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: fountain.c drinkfountain case 29 (Scare) :367-379 — pline "bad
// breath", then monflee(mtmp, 0, FALSE, FALSE) over the whole fmon list,
// then the :389 dryup tail. JS inlined a reduced scare loop (mflee=1,
// mfleetim=0, mtrack zeroing) that skipped monflee's Vrock arm
// (monmove.c:521-524: mspec_used = 75 + rn2(25) + create_gas_cloud), so at
// the Tourist quaff C drew rn2(25)=19 while JS drew dryup's rn2(3)=2
// (scen-sweep-Tourist-50150017 step 320, kind=rng @ monmove.c:522).
// This test replays the probe and pins C's recorded rn2(25) draw at the
// pre-fix first-divergence index.
const ID = "scen-sweep-Tourist-50150017";
// Pre-fix first RNG mismatch: C rn2(25)=19 @ monflee(monmove.c:522) vs JS
// rn2(3)=2 @ dryup, immediately after the quaff's fate draw (the board's
// rngM counts coinciding positions past the divergence, so the pin finds
// the fate dynamically instead of trusting a fixed index).
const RECIPE = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url),
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

function isRngCall(entry) {
    return typeof entry === "string" && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, "").replace(/^\d+\s+/, "").trim();
}

const strip = (s) => (s || '').split('\n')[0].replace(/\x1b\[[0-9;]*m/g, '');

describe("drinkfountain scare calls live monflee (fountain.c:376)", () => {
    it(`${ID}: JS emits C's recorded vrock rn2(25) before dryup`, { timeout: 300000 }, async () => {
        const seg = RECIPE.segments[0];
        const game = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = game.getScreens?.() || [];
        const s320 = strip(screens[320] || '');
        assert.match(s320, /bad breath/, "replay reaches the step-320 quaff");
        const jsAll = (game.getRngLog?.() || [])
            .map((e) => (typeof e === "string" ? e.replace(/^\d+\s+/, "") : String(e)))
            .filter(isRngCall);
        const fateAt = jsAll.map(normalizeRng).lastIndexOf("rnd(30)=29");
        assert.ok(fateAt >= 0, "quaff fate rnd(30)=29 drawn");
        assert.equal(
            normalizeRng(jsAll[fateAt + 1]),
            "rn2(25)=19",
            `draw after fate [${fateAt + 1}]: want C's vrock draw, got ${jsAll[fateAt + 1]}`,
        );
    });
});
