import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { write_timer } = await import("../js/mkobj.js");
const { TIMER_OBJECT, TIMER_MONSTER } = await import("../js/const.js");
const { runSegment } = await import("../js/jsmain.js");

// C ref: timeout.c write_timer `:2517–2544` — a non-fixup entry writes the
// CURRENT id from its live pointer (`:2524` obj->o_id / `:2539` mon->m_id);
// only needs_fixup entries write the stored numeric id (`:2518–2519` /
// `:2533–2534`). C's `anything` union holds one value or the other, so a
// re-save can never resurrect a stale id. JS kept both fields and preferred
// the numeric arg_id, which on the bones path is the PRE-REMAP blob id:
// D-3864 installs the blob's timers, the remap renumbers the objects, and a
// later savebones re-saved the stale id — the next load threw
// `relink_timers: no object 13` (scen-chain-Archeologist-95418 seg5).

describe("write_timer derives the id from the live pointer", () => {
    it("relinked+remapped object timer saves the live o_id, not the blob id", () => {
        const rec = write_timer({
            timeout: 100, tid: 1, kind: TIMER_OBJECT, action: 0, a_long: 0,
            arg_id: 13, obj: { o_id: 452 }, mon: null,
        });
        assert.equal(rec.arg_id, 452);
    });
    it("live object timer without a stored id saves obj.o_id", () => {
        const rec = write_timer({
            timeout: 100, tid: 1, kind: TIMER_OBJECT, action: 0, a_long: 0,
            obj: { o_id: 7 }, mon: null,
        });
        assert.equal(rec.arg_id, 7);
    });
    it("needs_fixup entry writes the stored numeric id untouched", () => {
        const rec = write_timer({
            timeout: 100, tid: 1, kind: TIMER_OBJECT, action: 0, a_long: 0,
            needs_fixup: 1, arg_id: 9, obj: null, mon: null,
        });
        assert.equal(rec.arg_id, 9);
    });
    it("restored-but-unrelinked entry keeps its numeric id", () => {
        const rec = write_timer({
            timeout: 100, tid: 1, kind: TIMER_OBJECT, action: 0, a_long: 0,
            arg_id: 11, obj: null, mon: null,
        });
        assert.equal(rec.arg_id, 11);
    });
    it("relinked monster timer saves the live m_id, not the blob id", () => {
        const rec = write_timer({
            timeout: 100, tid: 1, kind: TIMER_MONSTER, action: 0, a_long: 0,
            arg_id: 21, obj: null, mon: { m_id: 77 },
        });
        assert.equal(rec.arg_id, 77);
    });
});

// scen-chain-Archeologist-95418: seg5 starts a new game on a level whose
// bones file an earlier segment saved after D-3864 installed ghostly timers.
// Pre-fix the load threw `relink_timers: no object 13` (stale pre-remap id
// re-saved); post-fix all six segments replay to completion.
const ID = "scen-chain-Archeologist-95418";

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

describe("bones timer resave across chain segments", () => {
    it(`${ID}: all segments replay without a relink throw`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const storage = sharedStorage();
        for (let si = 0; si < sess.segments.length; si++) {
            const seg = sess.segments[si];
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves, storage,
            });
            const screens = g.getScreens?.() || [];
            assert.equal(screens.length, seg.steps.length, `seg${si} replay reaches its recorded end`);
        }
    });
});
