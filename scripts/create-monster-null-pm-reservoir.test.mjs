import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c create_monster :1959-1961 + :1988, makemon.c :1212-1232 —
// the Mines your_race gate nulls pm, but C still spawns: makemon(NULL) →
// rndmonst() → the rndmonst_adj reservoir. Three compiled-loader class
// instances (wiz_strt/minetn-5/wizard3 placeClassAt) skipped the spawn on
// null pm, so scen-sweep-Healer-578141 step 683 drew rnddoor where C drew
// the reservoir (rn2(3)=1 @ rndmonst_adj, RNG index 15452).
const ID = "scen-sweep-Healer-578141";
const CLIFF = 15452;
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

const stripIdx = (e) => (typeof e === "string" ? e.replace(/^\d+\s+/, "") : String(e));

describe("mines-gate-cleared pm still spawns (create_monster null-pm arm)", () => {
    it(`${ID}: RNG matches C past index ${CLIFF}`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const cRng = [];
        for (const step of seg.steps || []) {
            for (const e of step.rng || []) {
                if (isRngCall(e)) cRng.push(e);
            }
        }
        // C-side pin: the recording still shows the reservoir draw at the cliff.
        assert.equal(normalizeRng(cRng[CLIFF] || ""), "rn2(3)=1",
            `C cliff draw moved: ${cRng[CLIFF]}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx).filter(isRngCall);
        let first = -1;
        const n = Math.max(cRng.length, jsRng.length);
        for (let i = 0; i < n; i++) {
            if (normalizeRng(jsRng[i] || "") !== normalizeRng(cRng[i] || "")) {
                first = i;
                break;
            }
        }
        assert.ok(first === -1 || first > CLIFF,
            `first RNG mismatch at ${first}, cliff was ${CLIFF}`);
    });
});
