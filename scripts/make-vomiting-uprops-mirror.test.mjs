import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");
const { VOMITING } = await import("../js/const.js");

// C ref: potion.c make_vomiting :243-255 — Vomiting ≡ uprops[VOMITING]
// .intrinsic (youprop.h:111, single storage); set_itimeout writes the
// slot's TIMEOUT bits. JS wrote the u.Vomiting flat only, so the slot
// survived a clear and intr_bits (flat||slot) kept running
// vomiting_dialogue where C skips it — an extra exercise rn2(2).
// scen-sweep-Tourist-51050041 step 112: C stoned_dialogue case 2
// (timeout.c:177) clears Vomiting, then draws regen rn2(100)=34;
// JS drew exercise rn2(2)=0 first (D-4034).
function norm(e) {
    return String(e).replace(/^\d+\s+/, "").replace(/\s*@\s.*$/, "").trim();
}

describe("make_vomiting clears the uprops slot (Tourist s112)", () => {
    it("stoned case-2 leaves flat and slot at 0; regen draw unshifted", { timeout: 180000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL("../.cache/hidden/sessions/scen-sweep-Tourist-51050041.session.json", import.meta.url),
        ));
        const seg = sess.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 112),
            storage: undefined,
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 112, `only ${screens.length} screens`);
        const tl = decodeScreen(screens[112])[0].map((c) => c.ch).join("").trimEnd();
        assert.equal(tl, "You have turned to stone.  You feel a bit steadier now.--More--");
        const u = gstate.game.u || {};
        assert.equal(u.Vomiting | 0, 0, "u.Vomiting flat cleared by stoned case-2");
        assert.equal(u.uprops?.[VOMITING]?.intrinsic | 0, 0, "uprops[VOMITING] slot cleared (C single storage)");
        const draws = (g.getRngLog?.() || [])
            .map(norm)
            .filter((e) => /^(rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(e));
        assert.equal(draws[3406], "rn2(100)=34", "no extra exercise draw before regen_hp");
    });
});
