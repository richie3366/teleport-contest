import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c create_monster `:1947–1953` — an extinct unique never
// spawns (G_UNIQ && G_EXTINCT → return, after the `:1943` amask burn).
// G_EXTINCT for a unique is set at BIRTH by propagate's "don't ever make
// it again" side effect (makemon.c `:966–968`), not only at death: both
// probe sessions genesis'd Juiblex steps before arriving at his lair, so C
// drops the des.monster("Juiblex",25,08) record (amask only) while JS's
// load_juiblex placeNamedAtAbs (which bypasses splev_create_monster)
// created a second Juiblex — first RNG mismatch C rn2(2) @ find_montype
// (the next record, "lemure") vs JS rnd(2) @ next_ident (the extra
// Juiblex's m_id).
// This test pins C's recorded lemure-parse draw at the pre-fix
// first-divergence index.
const ID = "scen-sweep-Ranger-50456024";
// Pre-fix: first RNG mismatch at index 25057
// (C rn2(2)=0 @ find_montype(sp_lev.c:3156) vs JS rnd(2)=1 @ next_ident).
const DIVERGE_AT = 25057;
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

describe("juiblex lair drops already-born Juiblex (sp_lev.c:1947-1953)", () => {
    it(`${ID}: JS emits C's recorded lemure-parse draw`, { timeout: 300000 }, async () => {
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
