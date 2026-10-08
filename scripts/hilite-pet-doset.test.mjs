import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gs = await import("../js/gstate.js");

// C ref: include/optlist.h `:365–366` (NHOPTB hilite_pet →
// &iflags.wc_hilite_pet) + include/flag.h `:508` (hilite_pet ≡
// wc_hilite_pet, one field) + options.c optfn_boolean `:5286` (SET IT
// HERE writes *addr) and `:5300–5311` (the after-change arm reads the
// same field). The full-doset twin wrote a phantom short key
// (iflags.hilite_pet) while the paint reader (display.js
// hilite_pet_opt) prefers the initval-defined wc_hilite_pet — so a
// menu-enabled hilite_pet never reached the map paint.
// In scen-options-Archeologist-94231 the player enables hilite_pet in
// the 'O' menu; at step 24 C paints the tame kitten at game (25,7)
// inverse (`\E[7m\E[97mf`, screen row 8 col 24) while JS painted it
// plain. RNG is in full lockstep (5519/5519) — pure paint, owner null.
const ID = "scen-options-Archeologist-94231";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));
// Recorded recipe prefix yielding exactly the first 25 screens
// (steps 0..24); the toggle + step-24 capture both fall inside.
const PREFIX = 24;

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

describe("hilite_pet doset home (optlist.h:366)", () => {
    it(`${ID}: step-24 pet paints inverse like C`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, PREFIX),
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 25, `screens ${screens.length} < 25`);
        const cell = decodeScreen(screens[24] || "")[8][24];
        assert.equal(cell.ch, "f");
        assert.equal(cell.color, 15); // CLR_WHITE, both sides
        assert.equal(cell.attr & 1, 1); // ATR_INVERSE bit, C `\E[7m`
    });

    it(`${ID}: doset toggle lands on the C home`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, PREFIX),
            storage: sharedStorage(),
        });
        assert.equal(gs.game.iflags?.wc_hilite_pet, true);
        assert.ok(!("hilite_pet" in (gs.game.iflags || {})),
            "phantom short key must stay unset");
    });
});
