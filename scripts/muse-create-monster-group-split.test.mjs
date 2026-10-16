import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// D-4014 wired MM_ASYNCGROUP for maybe_generate only and named the other
// grouped-capable mid-game makemon callers as follow-up wiring units. The
// monster create-monster arms (muse.c use_defensive MUSE_SCR_CREATE_MONSTER
// / MUSE_WAN_CREATE_MONSTER) are one such unit: C runs a group member's
// appear-Norep inline, so a member's --More-- splits the placements across
// replay steps; the sync tail paints every member before the first appear.
// scen-sweep-Healer-50850089 step 59 names it: the hill orc reads a scroll
// of create monster, C shows 1 ant at the scroll+More screen (member 1 of a
// giant-ant group) while JS shows all of them a screen early.
// Pre-fix: JS step-59 row 5 is `+·oaaa$··` (C `+·o···$··`).
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
    return { sess, screens };
}

function rowText(grid, r, c0, c1) {
    // renderCell: same DEC-graphics mapping the judge comparator uses
    // (C `~` floor == JS `·`, C `x` wall == JS `│`).
    return grid[r].slice(c0, c1).map((c) => renderCell(c)).join("");
}

describe("muse create-monster group split across --More-- (MM_ASYNCGROUP wiring)", () => {
    it("Healer-50850089: member placements split at the scroll+More screen", { timeout: 180000 }, async () => {
        const { sess, screens } = await replayAll("scen-sweep-Healer-50850089");
        const cScreens = sess.segments[0].steps.map((st) => st.screen);
        assert.ok(screens.length > 62, `only ${screens.length} screens`);
        // The scroll+More screen and the two member-appear screens match C
        // cell-for-cell on the message row and the two monster rows: member 1
        // painted at step 59, member 2 at 60, member 3 at 61 (not all at 59).
        for (const n of [59, 60, 61]) {
            const c = decodeScreen(cScreens[n]);
            const j = decodeScreen(screens[n]);
            assert.equal(rowText(j, 0, 0, 80).trimEnd(), rowText(c, 0, 0, 80).trimEnd(),
                `step-${n} topline matches C`);
            for (const r of [5, 6]) {
                assert.equal(rowText(j, r, 60, 80), rowText(c, r, 60, 80),
                    `step-${n} row ${r} matches C (mid-group split, not lumped)`);
            }
        }
    });

    it("Tourist-50456027: shapechanger birth gates on the birth type, not the new form", { timeout: 180000 }, async () => {
        // The deferred tail must read the BIRTH permonst for the group gates
        // (C's local `ptr` never updates after the sync-prefix newcham).
        // Step 679 summons a doppelganger that takes orc-zombie form; gating
        // on mtmp.data fired a phantom SGROUP rn2(2) where C draws the next
        // enexto (REACH regression without the birthPtr stash).
        const { sess, screens } = await replayAll("scen-sweep-Tourist-50456027");
        const cScreens = sess.segments[0].steps.map((st) => st.screen);
        assert.ok(screens.length > 681, `only ${screens.length} screens`);
        for (const n of [679, 680, 681]) {
            const c = decodeScreen(cScreens[n]);
            const j = decodeScreen(screens[n]);
            for (let r = 0; r < 24; r++) {
                assert.equal(rowText(j, r, 0, 80), rowText(c, r, 0, 80),
                    `step-${n} row ${r} matches C`);
            }
        }
    });
});
