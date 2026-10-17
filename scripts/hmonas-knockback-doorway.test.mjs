import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: uhitm.c mhitm_knockback :5301–5305 — the doorway-diagonal guard
// reads magr->mx/my RAW (unlike dx/dy, which use u.ux/u.uy for a hero
// attacker). gy.youmonst.mx/my are never written anywhere in C (BSS 0
// forever — light.c:17, polyself.c:9), so for a hero attacker the guard
// fires on any non-doorless doorway cell off row/col 0. JS derived the
// test from dx/dy (u.ux-based), missing the block: the dragon-hero's
// claw#1 knockback proceeded (message rn2(2)s + hurtle + loop break,
// skipping claw#2) where C silently returns FALSE and fights on.
// scen-sweep-Monk-49950093 step 1164 names it: C's claw#1 knockback gate
// rn2(6)=0, then claw#2 to-hit rnd(20)=14 (temp-C guard dump at the cited
// locus; recorder tree reverted + rebuilt after). Pre-fix JS topline has
// one "You hit the xan." (knockback-TRUE break); C and post-fix JS have
// two. The xan stands in a doorway (38,7); hero at (39,7).
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

describe("hmonas knockback doorway guard reads raw magr->mx/my (Monk s1164)", () => {
    it("claw#1 knockback blocked in doorway: bite+hit+hit like C", { timeout: 180000 }, async () => {
        const screens = await replayTruncated("scen-sweep-Monk-49950093", 1164);
        assert.ok(screens.length > 1164, `only ${screens.length} screens`);
        assert.equal(topline(screens, 1164),
            "You bite the xan.  You hit the xan.  You hit the xan.--More--",
            "step-1164 topline matches C exactly (no knockback, claw#2 lands)");
        const game = gstate.game;
        const xan = (game.fmon || []).find((m) => m.mx === 38 && m.my === 7);
        assert.ok(xan, "xan was not knocked out of its doorway cell (38,7)");
    });
});
