import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: hack.c domove_core :2766–2776 — the run-stop (nomul(0) + move=0,
// silent return) fires whenever context.run is set and the blocking
// non-safemon is visible, with NO forcefight exemption in the condition.
// C's "We should never get here if forcefight" comment is aspirational:
// with stale run=8 left over from travel, F+j reaches it and C silently
// declines the attack (temp-C dump at the questtour s32 turn: domove
// moves=3 ff=1 run=8 m_at=human zombie, do_attack never runs, 0 draws).
// D-0440 ported the stop with a JS-invented `!forcefight` guard; JS then
// attacked (hit rolls + damage + "You hit") where C stands still.
// scen-questtour-Priest-50950030 step 32 names it: C topline empty vs JS
// "You hit the human zombie!--More--". Pre-fix: topline shows the hit
// and the zombie loses HP.
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

describe("domove run-stop under forcefight (questtour s32)", () => {
    it("stale run=8 + F+j vs visible zombie: silent stand, no damage", { timeout: 180000 }, async () => {
        const screens = await replayTruncated("scen-questtour-Priest-50950030", 32);
        assert.ok(screens.length > 32, `only ${screens.length} screens`);
        assert.equal(topline(screens, 32), "",
            "step-32 topline is empty like C (no 'You hit the human zombie')");
        const game = gstate.game;
        const u = game.u || {};
        const zed = (game.fmon || []).find((m) => m.mx === u.ux && m.my === u.uy + 1);
        assert.ok(zed, "zombie still directly south of the hero");
        assert.equal(zed.mhp, 19, "zombie takes no damage (C drew 0 for the turn)");
    });
});
