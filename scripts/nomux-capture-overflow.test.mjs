import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const { nomux_capture_bytes, nomux_marker } = await import("../js/nomux_capture.js");

// Contest recorder patch 006 renders each marker's screen into
// `static char nomux_out[24 * 256]` without a bound (termcap.c :795–862).
// Past 6144 bytes the payload overwrites int nomux_raw_active/row/col and
// the marker reports CX=raw_col, CY=raw_row; past 6448 it reaches obuf
// (stdout's setbuf buffer) and the recorded screen carries the header.

function term(fill) {
    const grid = [];
    for (let r = 0; r < 24; r++) {
        const row = [];
        for (let c = 0; c < 80; c++) row.push(fill(r, c));
        grid.push(row);
    }
    return { grid };
}
const blank = () => ({ ch: " ", color: 8, attr: 0 });
// Alternating colors: every cell costs an SGR (5 bytes) plus its char.
const dense = (r, c) => ({ ch: String.fromCharCode(65 + (c % 26)), color: 1 + (c % 2), attr: 0 });
const int32le = (b, o) => b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24);

describe("nomux_out overflow (recorder patch 006)", () => {
    it("encodes like nomux_capture_screen (trimmed rows, SGR per change)", () => {
        const t = term((r, c) => (r === 0 && c < 2
            ? { ch: "hi"[c], color: c === 0 ? 1 : 8, attr: 0 } : blank()));
        const s = String.fromCharCode(...nomux_capture_bytes(t));
        assert.equal(s, "\x1b[31mh\x1b[39mi" + "\n".repeat(23));
    });

    it("leaves the cursor alone while the payload fits", () => {
        const st = { mem: new Uint8Array(12) };
        const out = nomux_marker(st, term(blank), [5, 6, 1], { kind: "input", seq: 1, anim: 0 });
        assert.deepEqual(out.cursor, [5, 6, 1]);
        assert.equal(out.screen, null);
    });

    it("reports the overwritten raw counters, sticky across smaller screens", () => {
        const st = { mem: new Uint8Array(12) };
        const big = term(dense);
        const bytes = nomux_capture_bytes(big);
        assert.ok(bytes.length > 6448);
        const want = [int32le(bytes, 6152), int32le(bytes, 6148), 1];
        assert.deepEqual(nomux_marker(st, big, [1, 1, 1]).cursor, want);
        assert.deepEqual(nomux_marker(st, term(blank), [2, 2, 1]).cursor, want);
    });

    it("puts the marker header at payload offset 6448 once obuf is reached", () => {
        const st = { mem: new Uint8Array(12) };
        const out = nomux_marker(st, term(dense), [1, 1, 1], { kind: "input", seq: 9, anim: 3 });
        assert.ok(out.screen.includes("\x1b]7777;KIND=input;SEQ=9;ANIM=3;CX="));
    });

    const ID = "scen-tour-Healer-51152023";
    const file = new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url);
    it(`replays ${ID}: step 60's garbage cursor`, { skip: !existsSync(file) }, async () => {
        const seg = JSON.parse(readFileSync(file)).segments[0];
        const { runSegment } = await import("../js/jsmain.js");
        const mem = new Map();
        const storage = {
            getItem: (k) => (mem.has(k) ? mem.get(k) : null),
            setItem: (k, v) => mem.set(k, String(v)),
            removeItem: (k) => mem.delete(k),
            get length() { return mem.size; },
            key: (i) => [...mem.keys()][i] ?? null,
        };
        const g = await runSegment({ seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 61), storage });
        assert.deepEqual(g.getCursors()[59], [34, 8, 1]);
        assert.deepEqual(g.getCursors()[60], [842344498, 893024080, 1]);
    });
});
