import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `menu_loot` cliff writer: the "Do what with your bag?" container menu
// (C pickup.c use_container :2971–3226) is a CORNER tty menu — C dismisses
// it via erase_menu_or_text → docorner (gbuf resend, no newsym, no
// display-RNG burns), so hallucinating heroes keep their current hallu
// glyphs. JS's in_or_out_menu open-coded a fullscreen dismiss
// (`game._menu_overlay = false; await docrt(); await flush_screen(1)`):
// docrt re-newsyms every visible cell, re-picking EVERY hallu mon/obj
// glyph from the display RNG. Under Hallu the map visibly reshuffles on
// every container-menu answer.
//
// scen-sweep-Caveman-95343 step 599 (key 'r' = put-in-first): C recorded
// (DEC source) `x~~~'~~~~~~` / `x~~~M@V(~~x` / `x~~~~@P~~~x` — the same
// hallu glyphs as steps 596-598. Pre-fix JS showed `T` / `u@w[` / `uH`
// (fresh display-RNG picks from the spurious docrt).
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

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

function rowN(screens, n, r) {
    return decodeScreen(screens[n])[r].map((c) => c.ch).join("");
}

describe("container-menu dismiss keeps hallu glyphs (95343)", () => {
    it("step 599 row 17: golem glyph survives the bag-menu answer", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95343");
        assert.ok(screens.length > 599, `only ${screens.length} screens`);
        // C recorded `x~~~'~~~~~~` (stable since step 596); pre-fix JS
        // re-picked `T` via the spurious docrt in in_or_out_menu.
        assert.ok(rowN(screens, 599, 17).includes("│···'······"),
            `row17 lost the hallu golem: ${JSON.stringify(rowN(screens, 599, 17).slice(0, 24))}`);
    });

    it("step 599 rows 18-19: mummy/vampire/tool + humanoid/ooze survive", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95343");
        assert.ok(screens.length > 599, `only ${screens.length} screens`);
        // C recorded `x~~~M@V(~~x` / `x~~~~@P~~~x`; pre-fix JS showed
        // `u@w[` / `uH` (fresh hallu picks, incl. the random-obj cell).
        assert.ok(rowN(screens, 599, 18).includes("│···M@V(··│"),
            `row18 reshuffled: ${JSON.stringify(rowN(screens, 599, 18).slice(0, 24))}`);
        assert.ok(rowN(screens, 599, 19).includes("│····@P···│"),
            `row19 reshuffled: ${JSON.stringify(rowN(screens, 599, 19).slice(0, 24))}`);
    });
});
