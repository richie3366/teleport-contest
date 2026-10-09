import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: win/tty/topl.c tty_yn_function `:419–420,425` paints the prompt via
// custompline(OVERRIDE_MSGTYPE | SUPPRESS_HISTORY) → vpline, and vpline
// `:266–271` flushes a pending vision_full_recalc (with in_pline saved at 0)
// before flush_screen + putmesg. Wizard-mode slime death
// (timeout.c slimed_to_death → polymon, which blinds the eyeless hero and
// sets vision_full_recalc) reaches the "Die?" prompt with the recalc still
// pending, so C's prompt repaints the map blind (stale monster glyph gone)
// while a prompt that skips vpline leaves it for one screen (or, when the
// hero stays dead, through disclose).
// scen-chain-Ranger-95437 step 41: C «│·│» vs JS «│·d│» at (61,10).
const ID = "scen-chain-Ranger-95437";
const SESS_PATH = new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url);

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

describe("tty_yn_function prompt flushes pending vision recalc (topl.c:420 + pline.c:270)", () => {
    it(`${ID}: Die? screen shows floor, not the stale dog`, { timeout: 180000 }, async () => {
        assert.ok(existsSync(SESS_PATH),
            `missing ${ID} session; record it with hidden-proxy record`);
        const SESS = JSON.parse(readFileSync(SESS_PATH, "utf8"));
        // Div step 41 is in seg0 (steps 0-58); seg0 is dependency-free.
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 41,
            `seg0 replay produced ${screens.length} screens, need step 41`);
        const grid = decodeScreen(screens[41]);
        const rowText = (r) => {
            let s = "";
            for (let x = 0; x < 80; x++) s += renderCell(grid[r][x]);
            return s.trimEnd();
        };
        assert.ok(rowText(0).startsWith("Die? [yn] (n)"),
            `step 41 topline is not the Die? prompt: ${JSON.stringify(rowText(0))}`);
        assert.equal(renderCell(grid[10][61]), "·");
    });
});
