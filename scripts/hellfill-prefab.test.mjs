import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: dat/hellfill.lua rnd_hell_prefab (:300-317) + hell_prefabs table
// (:99-298). JS ported the hells[2]/[4]/[6] percent(25) gates but deferred
// the prefab body, so at a cold-Gehennom arrival C drew the prefab pick
// rn2(10) while JS skipped to the post-style stair lookup rn2(79) — an RNG
// cliff (scen-worldtour Samurai-50358004 s150 + 5 kin sessions with
// parent=rnd_hell_prefab in their C logs, ~300k RNG lost). D-4019 ports the
// whole table (10 prefabs) and wires the 3 gates: 4/6 kin FULL PASS, probe
// + Ranger RNG-full at much later screen owners.
// This test replays the queue row's probe and pins C's recorded prefab
// pick at the pre-fix first-divergence index.
const ID = "scen-worldtour-Samurai-50358004";
// Pre-fix: first RNG mismatch at index 11228
// (C rn2(10)=6 @ rnd_hell_prefab hellfill.lua:305 vs JS rn2(79)=65 @ stair get_location).
const DIVERGE_AT = 11228;
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

describe("hellfill prefab port draws C's rnd_hell_prefab pick (hellfill.lua:300-317)", () => {
    it(`${ID}: JS emits C's recorded rn2(10) prefab pick`, { timeout: 300000 }, async () => {
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
            jsAll.length > DIVERGE_AT,
            `JS emitted ${jsAll.length} draws, want more than ${DIVERGE_AT}`,
        );
        assert.equal(
            normalizeRng(jsAll[DIVERGE_AT]),
            normalizeRng(cAll[DIVERGE_AT]),
            `draw [${DIVERGE_AT}]: JS ${jsAll[DIVERGE_AT]} vs C ${cAll[DIVERGE_AT]}`,
        );
        // Screens: replay must complete through all recorded steps
        // (>=: JS keeps trailing captures the runner's slices exclude).
        const screens = game.getScreens?.() || [];
        assert.ok(
            screens.length >= seg.steps.length,
            `screens ${screens.length} < ${seg.steps.length}`,
        );
    });
});
