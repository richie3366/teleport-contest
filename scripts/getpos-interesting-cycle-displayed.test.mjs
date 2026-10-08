import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c gather_locs_interesting `:487–503` — GLOC_INTERESTING /
// GLOC_VALID are glyph-based: every cell whose DISPLAYED glyph is not a
// boring cmap (wall/tree/bars/ice/air/cloud/lava/water/ndoor/room/corr),
// not nothing, and not unexplored. In particular a sensed-but-unseen
// monster (detect-monsters paints its glyph; seenv stays 0) IS
// interesting, and a seenv≠0 cell whose displayed glyph is unexplored is
// NOT. JS approximated both with live typ/seenv, so `a` (all.next) and
// `Z` (valid.prev) skipped the sensed monster and landed on an
// unexplored-displaying cell instead.
const IDS = [
    { id: "scen-normal-Priest-91108", step: 54 },
    { id: "scen-kit-Priest-92122", step: 131 },
];

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

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const storage = sharedStorage();
    const screens = [];
    const cursors = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s || "");
        for (const c of (g.getCursors?.() || [])) cursors.push(c);
    }
    return { sess, screens, cursors };
}

describe("gather_locs_interesting INTERESTING/VALID read the displayed glyph (getpos.c:487-503)", () => {
    for (const { id, step } of IDS) {
        it(`${id}: cycle key lands on the sensed monster like recorded C`, { timeout: 300000 }, async () => {
            const { sess, screens, cursors } = await replay(id);
            const rec = sess.segments[0].steps[step];
            const recTop = String(rec.screen).split("\n")[0];
            const jsTop = String(screens[step]).split("\n")[0];
            assert.equal(jsTop, recTop, "JS topline must match recorded C");
            assert.deepEqual(
                [...cursors[step]],
                [...rec.cursor],
                "JS cursor must match recorded C",
            );
        });
    }
});
