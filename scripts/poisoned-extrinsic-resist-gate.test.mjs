import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `mhitm_really_poison` cliff writer (misattributed owner — C never calls
// it here: the bite is the mhitm_ad_drst mhitu arm → poisoned()).
//
// scen-sweep-Samurai-95302: hero wishes a ring of poison resistance (~808)
// and puts it on (~830, "on left hand"). C step 1121: vampire bat bites
// the hero, mhitm_ad_drst mhitu gate passes (rn2(8)=0), poisoned() takes
// the Poison_resistance early-out (youprop.h:46-48: uprops intrinsic ||
// extrinsic — the worn ring confers extrinsic) and prints only "The
// vampire bat's bite was poisoned!" + "The poison doesn't seem to affect
// you.", drawing no RNG. JS's poisoned() read only the H/E/flag flats,
// which the ring-wear path never writes (confer_oc_oprop sets
// uprops[POISON_RES].extrinsic only), so JS took the attrib-loss arm:
// extra "You feel weaker!", STR loss, and rn2(30)+d(2,2) draws.
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
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

function row0(screens, n) {
    return decodeScreen(screens[n])[0].map((c) => c.ch).join("").trimEnd();
}

describe("poisoned() honors worn-ring extrinsic resistance (95302)", () => {
    it("step 1122: bite poisoned, no weaker tell", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Samurai-95302");
        assert.ok(screens.length > 1122, `only ${screens.length} screens`);
        assert.equal(row0(screens, 1122), "The vampire bat's bite was poisoned!--More--");
    });

    it("step 1123: resist early-out, no poison RNG", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Samurai-95302");
        assert.ok(screens.length > 1123, `only ${screens.length} screens`);
        assert.equal(row0(screens, 1123), "The poison doesn't seem to affect you.  The flesh golem hits!--More--");
    });
});
