import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c set_move_cmd `:1386–1400` — every planar move writes
// `u.dz = zdir[dir]` (= 0) FIRST (`:1389`), before the `:1396–1399`
// `!u.dz` guard. The rhack walk/run/rush arms inlined dx/dy but never
// wrote dz, so a stale getdir dz (e.g. -1 from a dig-up `<`) leaked
// into the next planar move: the `:1396–1399` guard misread it AND
// trap.c climb_pit `:4226` (`u.dz || flags.verbose`) printed "You are
// still in a pit." where C (dz=0, !verbose rc) stayed silent.
// Recorded C step 44 of both scen-dig sessions has an empty topline.
const IDS = ["scen-dig-Samurai-94155", "scen-dig-Archeologist-94035"];

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

async function replayTopline(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const storage = sharedStorage();
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s || "");
    }
    const recTop = String(sess.segments[0].steps[step].screen).split("\n")[0];
    const jsTop = String(screens[step]).split("\n")[0];
    return { recTop, jsTop };
}

describe("planar move zeroes u.dz like set_move_cmd (cmd.c:1389)", () => {
    for (const id of IDS) {
        it(`${id}: step 44 stays silent in the pit like recorded C`, { timeout: 300000 }, async () => {
            const { recTop, jsTop } = await replayTopline(id, 44);
            assert.equal(recTop, "", "recorded C step-44 topline is empty");
            assert.equal(jsTop, recTop, "JS must stay silent (stale dz must not trip climb_pit)");
        });
    }
});
