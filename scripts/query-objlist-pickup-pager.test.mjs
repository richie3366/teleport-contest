import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `botl.c` cliff writer: the floor-pickup menu must page through the ported
// tty pager (wintty.c tty_end_menu `:2717–2760`: lmax rows per page,
// per-page accelerators, "(N of M)" morestr). The private
// query_objlist_pickup loop painted all entries without paging, so an
// 18-item pile showed item p on row 23 where C shows "(1 of 2)"
// (scen-questtour-Barbarian-50361008 step 518) and swallowed the Tools
// page. The adapter routes through query_objlist + select_menu_pick_any.
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

describe("floor pickup menu pages like C tty_end_menu", () => {
    const id = "scen-questtour-Barbarian-50361008";
    it("step 518: page 1 ends with the (1 of 2) pager, not item p", { timeout: 300000 }, async () => {
        const { js, c } = await jsScreenAt(id, 518);
        assert.deepEqual(cells(js), cells(c));
        assert.match(cells(js)[23], /\(1 of 2\)/);
    });
    it("step 519: letter toggle repaints the same page", { timeout: 300000 }, async () => {
        const { js, c } = await jsScreenAt(id, 519);
        assert.deepEqual(cells(js), cells(c));
    });
    it("step 520: confirm picks the toggled pile and dismisses", { timeout: 300000 }, async () => {
        const { js, c } = await jsScreenAt(id, 520);
        assert.deepEqual(cells(js), cells(c));
    });
});
