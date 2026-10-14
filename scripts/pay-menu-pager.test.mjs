import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `shk.c` cliff writer: the pay menu must run over the ported tty pager
// (windows.c select_menu `:1859–1863` scopes gb.bot_disabled around
// win_select_menu; corner dismiss is docorner, never docrt+bot). The
// private menu_pick_pay_items loop repainted docrt()+flush_screen() per
// key, which committed fresh status C never paints (scen-shop-Monk-
// 50255713 kept stale T:35 where JS freshened T:36). The adapter builds
// the C-order raw list (amt width, used-up/unpaid headings, "%*ld Zm"
// text, a_int i+1) and delegates to select_menu_pick_any.
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

function cells(screen) {
    return decodeScreen(screen).map((row) => row.map(renderCell).join(""));
}

async function jsScreenAt(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves.slice(0, step),
        storage: sharedStorage(),
    });
    const screens = g.getScreens?.() || [];
    assert.ok(screens.length > step, `${id}: only ${screens.length} screens`);
    return { js: String(screens[step]), c: seg.steps[step].screen };
}

describe("pay menu runs over the ported pager without freshening status", () => {
    const id = "scen-shop-Monk-50255713";
    it("step 383: menu shows the C-order prompt, item and stale T:35", { timeout: 300000 }, async () => {
        const { js, c } = await jsScreenAt(id, 383);
        assert.deepEqual(cells(js), cells(c));
        assert.match(cells(js)[0], /Pay for which items\?/);
        assert.match(cells(js)[23], /T:35/);
    });
    it("step 384: ESC dismiss keeps stale T:35 (no docrt+bot freshen)", { timeout: 300000 }, async () => {
        const { js, c } = await jsScreenAt(id, 384);
        assert.deepEqual(cells(js), cells(c));
        assert.match(cells(js)[23], /T:35/);
    });
});
