import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: dokick.c kick_monster :153–159 + youprop.h :240 — the wild-miss
// arm reads the Levitation MACRO ((HLevitation||ELevitation)&&!BLevitation).
// js/dokick.js kick_monster read the JS-only sticky u.Levitation instead
// (D-1070: not a C field), so a hero levitating via H/E flats skipped the
// arm: C draws rn2(3)@dokick.c:154 first, JS drew rn2(4)/rn2(2) downstream.
// scen-intrinsic-Rogue-50852003 step 121 names it: C "Floating in the air,
// you miss wildly!--More--" vs JS "You kick the sewer rat. ...".
async function replayTruncated(id, nkeys) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves.slice(0, nkeys),
        storage: undefined,
    });
    return g.getScreens?.() || [];
}

function topline(screens, step) {
    return decodeScreen(screens[step])[0].map((c) => c.ch).join("").trimEnd();
}

describe("kick_monster Levitation wild-miss (intrinsic-Rogue s121)", () => {
    it("H/E levitation fires the C wild-miss arm, not the kick", { timeout: 180000 }, async () => {
        const screens = await replayTruncated("scen-intrinsic-Rogue-50852003", 121);
        assert.ok(screens.length > 121, `only ${screens.length} screens`);
        const u = gstate.game.u || {};
        assert.ok(((u.HLevitation | 0) || (u.ELevitation | 0)) && !(u.BLevitation | 0),
            "C Levitation macro is true at the kick turn");
        assert.ok(!u.Levitation, "sticky u.Levitation is false (the old read missed the arm)");
        assert.equal(topline(screens, 121), "Floating in the air, you miss wildly!--More--");
    });
});
