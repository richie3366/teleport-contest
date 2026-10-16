import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: dat/themerms.lua is_eligible (:890-902) reads nh.level_difficulty(),
// not depth(). JS passed depth() to the rooms picker (mklev.js makerooms
// call site) and the fills picker (themeroom_fill), so at Dlvl 3 with an
// aggravate ring (difficulty 6) C drew the 'Twin businesses' (mindiff 4)
// reservoir entry rn2(1037) while JS ended its loop after rn2(1036) and
// burned the build_room rn2(100) chance — an RNG cliff (scen-sweep
// Valkyrie-50156016 s539 + Ranger-95308 s432, ~45k RNG lost).
// This test replays the smallest probe and pins C's recorded Twin draw
// at the pre-fix first-divergence index.
const ID = "scen-sweep-Valkyrie-50156016";
// Pre-fix: first RNG mismatch at index 9745
// (C rn2(1037)=478 @ themerms.lua:969 vs JS rn2(100)=27 @ build_room burn).
const DIVERGE_AT = 9745;
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

describe("themeroom eligibility reads level_difficulty (themerms.lua:890-902)", () => {
    it(`${ID}: JS emits C's recorded Twin-businesses draw`, { timeout: 300000 }, async () => {
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
