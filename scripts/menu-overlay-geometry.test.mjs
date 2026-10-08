import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const gs = await import("../js/gstate.js");
const { nhw_menu_geometry } = await import("../js/invent.js");

// C ref: wintty.c `:13` (#define H2344_BROKEN — the live branch) +
// `:1924–1925` (tty_display_nhwindow NHW_MENU: maxrow >= rows ||
// !iflags.menu_overlay → offx = 0 fullscreen) + include/optlist.h
// `:455–456` (NHOPTB menu_overlay → &iflags.menu_overlay) +
// include/flag.h `:340` (instance_flags home). The doset twin already
// writes the C home (game.iflags.menu_overlay) but the three menu
// geometry readers + the two select_menu fullscreen forcers used
// game.flags.menu_overlay — a key nothing ever writes — so a
// menu_overlay-off session kept painting corner menus.
// In scen-options-Archeologist-94231 the player toggles menu_overlay
// off in the 'O' menu (C step 22: "'menu_overlay' option toggled
// off."); at step 33 C paints the #terrain "View which?" menu
// fullscreen (row 0 " View which?", text at col 1) while JS painted
// the corner box (text at col offx+1).
const ID = "scen-options-Archeologist-94231";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));
// Recorded recipe prefix yielding exactly the first 34 screens
// (steps 0..33); the step-22 toggle + step-33 menu both fall inside.
const PREFIX = 33;

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

// doterrain's small menu (brief: cmd.c:1098–1191; 3 normal items here):
// narrow enough that offx is nonzero without the menu_overlay arm.
function terrainEntries() {
    return [
        { text: "View which?", attr: 0 },
        { text: "", attr: 0 },
        { text: "a * known map without monsters, objects, and traps", attr: 0 },
        { text: "b - known map without monsters and objects", attr: 0 },
        { text: "c - known map without monsters", attr: 0 },
    ];
}

describe("menu_overlay geometry home (wintty.c:1924-1925)", () => {
    it(`${ID}: step-33 terrain menu paints fullscreen like C`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, PREFIX),
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 34, `screens ${screens.length} < 34`);
        const row0 = decodeScreen(screens[33] || "")[0];
        assert.equal(row0[0].ch, " "); // fullscreen leading pad
        assert.equal(row0[1].ch, "V"); // text at col 1, not offx+1
        const text = row0.map((c) => c.ch).join("").trimEnd();
        assert.equal(text, " View which?");
    });

    it(`${ID}: menu_overlay-off forces fullscreen geometry on the C home`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, PREFIX),
            storage: sharedStorage(),
        });
        assert.equal(gs.game.iflags?.menu_overlay, false);
        assert.ok(!("menu_overlay" in (gs.game.flags || {})),
            "phantom flags key must stay unset");
        assert.equal(nhw_menu_geometry(terrainEntries(), "(end) ").offx, 0);
    });
});
