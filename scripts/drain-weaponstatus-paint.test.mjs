import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// D-3629 (Open — cliffs head `botl.c` do_statusline2, parked RETIRED).
// Two writer defects behind one symptom owner, both state-home bugs in
// already-ported functions — JS game state was right, the paint/wire wrong:
//  1. trap.c drain_en set game.disp.botl only; JS flush_screen/bot read
//     game.flags.botl (house: writers set both), so the statusline at a
//     mid-turn More pause showed the pre-drain Pw (JS uen was correct).
//  2. DOSET_BOOL_ADDR.weaponstatus pointed at iflags while C is
//     &flags.weaponstatus (optlist.h:866), so the doset toggle never
//     reached the bot() gate and BL_WEAPON stayed blank forever.
// Both tests pin the recorded C paint. Pre-fix: Pw:154(161) at engulf-163
// (C Pw:143), blank weapon field at options-20 (C Empty-hnd).
async function replayAll(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: undefined,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s);
    }
    return screens;
}

function statusRow2(screens, step) {
    const grid = decodeScreen(screens[step]);
    return grid[23].map((c) => c.ch).join("");
}

describe("do_statusline2 cliff writers (D-3629)", () => {
    it("engulf-Archeologist-94292: drain repaints Pw at the step-163 More pause", { timeout: 180000 }, async () => {
        const screens = await replayAll("scen-engulf-Archeologist-94292");
        assert.ok(screens.length > 163, `only ${screens.length} screens`);
        assert.match(statusRow2(screens, 163), /Pw:143\(161\)/,
            "step-163 statusline2 shows post-drain Pw (not stale 154)");
    });

    it("options-Monk-94371: weaponstatus toggle lands on flags + paints Empty-hnd at step 20", { timeout: 180000 }, async () => {
        const screens = await replayAll("scen-options-Monk-94371");
        assert.ok(screens.length > 20, `only ${screens.length} screens`);
        assert.match(statusRow2(screens, 20), /Empty-hnd/,
            "step-20 statusline2 shows the weapon field (not blank)");
        const { game } = await import("../js/gstate.js");
        assert.equal(game.flags?.weaponstatus, true,
            "doset toggle writes flags.weaponstatus (C optlist.h:866)");
    });
});
