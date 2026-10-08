import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c erase_menu_or_text `:976–979` — a fullscreen NHW_MENU
// (offx==0: !menu_overlay per `:1924–1925` H2344, or maxrow>=rows)
// dismisses via docrt()+flush, redrawing level state over whatever temp
// map is up. nh.text's PICK_NONE tip (nhlua.c nhl_text `:846–848` →
// select+destroy → tty_dismiss_nhwindow `:1953` → erase_menu_or_text
// clearscreen=FALSE) is no exception: when #terrain's reveal map is up
// and menu_overlay is off, the getpos-tip dismiss newsyms the hero `@`
// and visible monsters back over the reveal (C step-34 reveal shows
// floor+stairs; step 36 shows the pet `f` + `@`).
// JS show_getpos_tip always took the corner cadence (flush gbuf resync —
// reveal intact), missing the fullscreen docrt.
const ID = "scen-options-Archeologist-94231";
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

describe("getpos tip fullscreen dismiss docrt (wintty.c:976-979)", () => {
    it(`${ID}: step-36 pet 'f' + hero '@' repainted over reveal`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const i = seg.moves.indexOf("#terrain");
        // Through the ESC that dismisses the Tip → getpos prompt painted.
        const prefix = seg.moves.slice(0, i + "#terrain\nc\n\u001b".length);
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: prefix,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 36, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[36]);
        // C raw bytes `\E[7m\E[97mf\E[27m`: tame kitten, petattr inverse.
        const f = grid[8][24];
        assert.equal(f.ch, "f", "row8 col24 char (pet kitten over reveal floor)");
        assert.equal(f.attr, 1, "row8 col24 attr (petattr inverse)");
        // C raw bytes `\E[97m@`: hero newsym'd over the reveal stairs.
        const at = grid[9][25];
        assert.equal(at.ch, "@", "row9 col25 char (hero over reveal stairs)");
        const cursors = g.getCursors?.() || [];
        assert.deepEqual(cursors[36]?.slice(0, 2), [25, 9], "step-36 cursor on hero");
    });
});
