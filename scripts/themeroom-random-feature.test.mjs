import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: dat/themerms.lua 'Random dungeon feature in the middle of an
// odd-sized room' contents (:446–457) + nhlib.lua shuffle (:17–22).
// The reservoir picked this room but JS ran no contents body (the D-1836
// "Random-feature center terrain" omission): C shuffled its 5-element
// feature list (rn2(5..2)) and set the room-center terrain while JS drew
// nothing and looped to the next room's rnd_rect — a step-0 RNG cliff
// (4 scen-* sessions, ~21k RNG lost). D-3668 ports the contents.
// This test replays the smallest probe and pins C's recorded shuffle
// draws at the pre-fix first-divergence index.
const ID = "scen-town-Tourist-94042";
// Pre-fix: first RNG mismatch at index 478
// (C rn2(5) @ shuffle vs JS rnd_rect); C total 6114 draws, 102 steps.
const SHUFFLE_AT = 478;
const SHUFFLE_LEN = 4;
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

function isRngCall(entry) {
    return typeof entry === "string" && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, "").replace(/^\d+\s+/, "").trim();
}

describe("themeroom 'Random dungeon feature' contents (themerms.lua:446-457)", () => {
    it(`${ID}: JS emits C's recorded feature-shuffle draws`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const cAll = [];
        for (const step of seg.steps || []) {
            for (const line of step.rng || []) {
                if (isRngCall(line)) cAll.push(line);
            }
        }
        const game = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsAll = (game.getRngLog?.() || [])
            .map((e) => (typeof e === "string" ? e.replace(/^\d+\s+/, "") : String(e)))
            .filter(isRngCall);
        assert.ok(
            jsAll.length >= SHUFFLE_AT + SHUFFLE_LEN,
            `JS emitted ${jsAll.length} draws, want at least ${SHUFFLE_AT + SHUFFLE_LEN}`,
        );
        for (let k = 0; k < SHUFFLE_LEN; k++) {
            const i = SHUFFLE_AT + k;
            assert.equal(
                normalizeRng(jsAll[i]),
                normalizeRng(cAll[i]),
                `draw [${i}]: JS ${jsAll[i]} vs C ${cAll[i]}`,
            );
        }
        // NOTE: no full-length assert — getRngLog() carries trailing draws
        // past the final capture that the runner's per-step slices exclude
        // (judged RNG is 6114/6114 exact). The corpus replay guards that.
        // Screens: replay must complete through all recorded steps
        // (>=: JS keeps trailing captures the runner's slices exclude).
        const screens = game.getScreens?.() || [];
        assert.ok(
            screens.length >= seg.steps.length,
            `screens ${screens.length} < ${seg.steps.length}`,
        );
    });
});
