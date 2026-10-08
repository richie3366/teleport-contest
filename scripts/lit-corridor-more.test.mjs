import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c optfn_boolean `:5362–5374` — the lit_corridor/dark_room
// arm sets opt_need_redraw when iflags.use_color, so doset's
// reset_needed_visuals → docrt → cls flushes the pending toggle message
// through more() (the D-3623 chain). scen-options-Tourist-94171 step 99
// toggles lit_corridor on: C shows the toggle text with --More--, and the
// step-100 ' ' is consumed dismissing it. JS gated the redraw on truthy
// use_color, which stays unset (no TERM probe under Rule #2), so no
// docrt ran, no --More-- appeared, and ' ' fell through to the command
// loop as "Unknown command ' '.".
const ID = "scen-options-Tourist-94171";
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

describe("lit_corridor toggle --More-- (options.c:5362)", () => {
    it(`${ID}: step-99 toggle keeps --More--, step-100 space dismisses it`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 100, `screens ${screens.length} <= 100`);
        const rowText = (i, r) => decodeScreen(screens[i] || "")[r]
            .map(renderCell).join("").replace(/\s+$/, "");
        assert.equal(rowText(99, 0), "'lit_corridor' option toggled on.--More--");
        assert.equal(rowText(100, 0), "");
    });
});
