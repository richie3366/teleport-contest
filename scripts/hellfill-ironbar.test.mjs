import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: dat/hellfill.lua hells[4] (:353-371) + sp_lev.c lspo_replace_terrain
// (:5051-5143, mapfragment arm :5126-5129). JS's hells[4] style burned the
// percent(80) gate and the chance RNG (math.random(4)) but deferred the
// horizontal iron-bar floor replace itself, so at a Gehennom maze arrival
// with cwid==1 + iron-bars walls C drew the rn2(100) chance grid while JS
// skipped to the post-style stair lookup rn2(79) — an RNG cliff
// (scen-sweep-Ranger-50556011 s605 + scen-worldtour-Valkyrie-50056020 s275,
// both prevEntry hellfill.lua:366). D-4033 wires the live whole
// lspo_replace_terrain ({ mapfragment: ".\nF\n.", toterrain: "." }).
// This test replays the queue row's probe and pins C's recorded first grid
// draw at the pre-fix first-divergence index.
const ID = "scen-sweep-Ranger-50556011";
// Pre-fix: first value mismatch at index 45502
// (C rn2(100)=25 @ lspo_replace_terrain sp_lev.c:5127 vs JS rn2(79)=24 @ stair get_location).
const DIVERGE_AT = 45502;
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

describe("hellfill hells[4] iron-bar floor replace draws C's rn2(100) grid (hellfill.lua:366)", () => {
    it(`${ID}: JS emits C's recorded rn2(100)=25 grid draw`, { timeout: 300000 }, async () => {
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
