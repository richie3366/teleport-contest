import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wield.c chwepon `:918–920` — `const char *color =
// hcolor(amount < 0 ? NH_BLACK : NH_BLUE)` runs UNCONDITIONALLY at entry,
// even on the early-return !uwep/non-weapon arm that never uses `color`.
// Under Hallucination hcolor draws one display-RNG (do_name.c:1464), so in
// scen-impaired-Knight-94330 C's scroll-of-enchant-weapon read at step 96
// consumes display offset o_48 (`~drn2(74)=42`) while JS — whose chwepon
// called a local no-draw hcolor clone (js/wield.js:1290) — spent o_48 on the
// step-97 melee's first rndmonnam pick. Every later display draw shifted one
// offset: step 98 showed JS «centaur/mole/manes» where C shows
// «lynx/lieutenant/naga» (plus shifted hallu room glyphs). This test replays
// that segment and pins C's step-98 topline.
const ID = "scen-impaired-Knight-94330";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("chwepon entry hcolor display draw (wield.c:920)", () => {
    it(`${ID}: step-98 melee names match C (lynx/lieutenant/naga)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 99, `screens ${screens.length} < 99`);
        assert.equal(
            rowText(screens, 98, 0),
            "The lynx hits the lieutenant.  The black naga is killed!",
        );
    });
});
