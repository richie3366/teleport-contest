import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: allmain.c moveloop `:587–597` — `for (;;) { moveloop_core(); }`:
// the turn driver is unbounded; a moves-based cap truncates turn-dense
// segments (multi-turn search/rest runs ~9+ turns per keypress) with the
// hero alive and input remaining. Both over-cap corpus segments forked
// inside a later turn's distfleeck :538 draw (Valk seg0 stopped after
// 16928 draws / 119 screens; Arch after its step-287 prefix).
const IDS = [
    "scen-longrun-Valkyrie-94274",
    "scen-longrun-Archeologist-94094",
];
const SESS = Object.fromEntries(IDS.map((id) => [id, JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
))]));
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];

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

async function replayAll(id) {
    const segs = SESS[id].segments;
    const storage = sharedStorage();
    const draws = [];
    let screens = 0;
    for (const seg of segs) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves, storage,
        });
        for (const d of (g.getRngLog?.() || [])) draws.push(strip(d));
        screens += (g.getScreens?.() || []).length;
    }
    return { draws, screens };
}

function recordedAll(id) {
    const draws = [];
    let screens = 0;
    for (const seg of SESS[id].segments) {
        for (const st of seg.steps) for (const d of (st.rng || [])) draws.push(strip(d));
        screens += seg.steps.length;
    }
    return { draws, screens };
}

describe("moveloop unbounded drive (allmain.c:587-597)", () => {
    for (const id of IDS) {
        it(`${id}: full RNG + screen match (no drive-cap truncation)`, { timeout: 300000 }, async () => {
            const got = await replayAll(id);
            const want = recordedAll(id);
            assert.equal(got.draws.length, want.draws.length, `draw count ${got.draws.length} vs ${want.draws.length}`);
            assert.deepEqual(got.draws, want.draws);
            assert.equal(got.screens, want.screens, `screen count ${got.screens} vs ${want.screens}`);
        });
    }
});
