import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c create_monster `:1947–1953` — a genocided or extinct
// named id falls through to a random monster (pm cleared, makemon(null)
// → rndmonst reservoir). Three erinyes were born before the sanctum
// arrival, so propagate's born>=mbirth_limit arm (makemon.c `:972–980`,
// limit 3 for erinys) set G_EXTINCT: C's des.monster({ id = "erinys" })
// record (sanctum.lua:111) draws the reservoir while JS's load_sanctum
// placeNamed (which bypasses splev_create_monster) spawned a 4th erinys
// explicitly — first RNG mismatch C rn2(5) @ rndmonst_adj vs JS rnd(2) @
// next_ident (D-4023 class; D-4065 M3 resolved statically).
// This test pins C's recorded reservoir draw at the pre-fix
// first-divergence index.
const ID = "scen-worldtour-Wizard-49950016";
// Pre-fix: first RNG mismatch at index 28907
// (C rn2(5)=0 @ rndmonst_adj(makemon.c:1716) vs JS rnd(2)=1 @ next_ident).
const DIVERGE_AT = 28907;
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

describe("sanctum drops extinct erinys id to random (sp_lev.c:1947-1953)", () => {
    it(`${ID}: JS emits C's recorded reservoir draw`, { timeout: 300000 }, async () => {
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
