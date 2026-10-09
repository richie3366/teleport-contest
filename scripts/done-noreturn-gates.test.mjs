import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: end.c done → nh_terminate (NORETURN, extern.h:997) → nethack_exit
// = exit (extern.h:2385-2387). done() returns only on lifesave /
// wizard-Discover `Die?` decline (before really_done); a real death never
// resumes the turn. JS really_done returns with program_state.gameover
// set, so every resumption after a fatal call must gate on it
// (god_zaps_you :1153 / artifact.c:959 idiom). Missing gates let a dead
// hero's turn continue: 7 scen-chain timeout deaths (stoning via
// done_timeout ← nh_timeout) draw turn maintenance (regen_hp, dosounds,
// gethungry, wipe_engr) after done(), and Tourist-95425's fry-by-god
// death draws angrygods' rnz(300) pray-timer tail after god_zaps_you.
// The concatenated scorer misattributes all 8 to the *next* segment's
// first draw (`randomize_gem_colors`, o_init.c:89).
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

function isRngCall(e) {
    return typeof e === "string"
        && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(e.replace(/^\d+\s+/, ""));
}

function norm(e) {
    return String(e).replace(/^\d+\s+/, "").replace(/\s*@\s.*$/, "").trim();
}

async function replayDeathSegment(id, segIdx) {
    const path = new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url);
    assert.ok(existsSync(path), `missing ${id} session; record it with hidden-proxy record`);
    const sess = JSON.parse(readFileSync(path, "utf8"));
    const storage = sharedStorage();
    let game = null;
    for (let si = 0; si <= segIdx; si++) {
        const seg = sess.segments[si];
        game = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves || "",
            storage,
        });
    }
    const seg = sess.segments[segIdx];
    const cSeg = [];
    for (const step of seg.steps || []) {
        for (const line of step.rng || []) if (isRngCall(line)) cSeg.push(norm(line));
    }
    const jsSeg = (game.getRngLog?.() || []).filter(isRngCall).map(norm);
    return { cSeg, jsSeg };
}

describe("no turn continuation after done() (extern.h NORETURN)", () => {
    it("Priest-95402 seg1: stoning death draws no maintenance after done", { timeout: 180000 }, async () => {
        const { cSeg, jsSeg } = await replayDeathSegment("scen-chain-Priest-95402", 1);
        assert.equal(jsSeg.length, cSeg.length,
            `JS drew ${jsSeg.length - cSeg.length} post-done draws: ${jsSeg.slice(cSeg.length).join(", ")}`);
        assert.deepEqual(jsSeg, cSeg);
    });
    it("Tourist-95425 seg1: fry-by-god draws no angrygods tail after the zap", { timeout: 180000 }, async () => {
        const { cSeg, jsSeg } = await replayDeathSegment("scen-chain-Tourist-95425", 1);
        assert.equal(jsSeg.length, cSeg.length,
            `JS drew ${jsSeg.length - cSeg.length} post-done draws: ${jsSeg.slice(cSeg.length).join(", ")}`);
        assert.deepEqual(jsSeg, cSeg);
    });
});
