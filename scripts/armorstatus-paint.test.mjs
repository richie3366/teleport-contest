import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// D-3629 named this twin ("DOSET_BOOL_ADDR.armorstatus also points at
// iflags while C is &flags.armorstatus (optlist.h:168) — same one-word
// class ... fix when a session names it"). scen-options-Rogue-94391
// step 44 names it: C statusline2 ends "Xp:1 Suit" after the
// 'armorstatus' toggle while JS shows a blank armor field — the doset
// toggle landed on iflags.armorstatus (zero JS readers) while bot() and
// the worn.c mirrors read flags.armorstatus. This test pins the
// recorded C paint. Pre-fix: blank armor field at step 44 (C "Suit").
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

describe("do_statusline2 cliff writer armorstatus home (D-3629 twin)", () => {
    it("options-Rogue-94391: armorstatus toggle lands on flags + paints Suit at step 44", { timeout: 180000 }, async () => {
        const screens = await replayAll("scen-options-Rogue-94391");
        assert.ok(screens.length > 44, `only ${screens.length} screens`);
        assert.match(statusRow2(screens, 44), /Xp:1 Suit/,
            "step-44 statusline2 shows the armor field (not blank)");
        const { game } = await import("../js/gstate.js");
        assert.equal(game.flags?.armorstatus, true,
            "doset toggle writes flags.armorstatus (C optlist.h:168)");
    });
});
