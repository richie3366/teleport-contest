import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c lspo_object CORPSE arm + create_object (:2230-2231):
// des.object({id="corpse"}) with no male/female/historic sets
// tmpobj.spe=lflags=0, discarding the mksobj gender roll. themerms.lua
// "Buried zombies" passes no flags, so every buried corpse has spe=0
// and revive() draws the makemon gender rn2(2). JS preserved the roll
// (spe 1/2/3 → MM_MALE/MM_FEMALE, gender skipped): 6 scen-* sessions
// diverged at makemon.c:1279 (C rn2(2) vs JS start_corpse_timeout).
// Temp C dump in revive() proved every C revive sees spe=0.
// This test replays the smallest probe and pins the pre-fix divergence.
const ID = "scen-trek-Healer-49950011";
// Pre-fix: first RNG mismatch at index 9561
// (C rn2(2)=0 @ makemon vs JS rn2(1000)=700 @ start_corpse_timeout).
const DIV_AT = 9561;
const DIV_LEN = 6;
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

describe("themeroom 'Buried zombies' corpse spe=0 (sp_lev.c lspo_object)", () => {
    it(`${ID}: JS draws C's recorded makemon gender rn2(2)`, { timeout: 300000 }, async () => {
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
            jsAll.length >= DIV_AT + DIV_LEN,
            `JS emitted ${jsAll.length} draws, want at least ${DIV_AT + DIV_LEN}`,
        );
        for (let k = 0; k < DIV_LEN; k++) {
            const i = DIV_AT + k;
            assert.equal(
                normalizeRng(jsAll[i]),
                normalizeRng(cAll[i]),
                `draw [${i}]: JS ${jsAll[i]} vs C ${cAll[i]}`,
            );
        }
        const screens = game.getScreens?.() || [];
        assert.ok(
            screens.length >= seg.steps.length,
            `screens ${screens.length} < ${seg.steps.length}`,
        );
    });
});
