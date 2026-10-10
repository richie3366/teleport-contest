import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { query_objlist } from "../js/pickup.js";
import { rndmonnam } from "../js/do_name.js";
import { obj_glyph } from "../js/display.js";
import { objectNames, objects, FOOD_CLASS } from "../js/objects.js";
import {
    OBJ_INVENT, PICK_ANY, INVORDER_SORT, AUTOSELECT_SINGLE,
} from "../js/const.js";
import { pushKeys, resetInputState } from "../js/input.js";

// C ref: pickup.c query_objlist `:1130–1140` — every allowed menu item
// burns obj_to_glyph(curr, rn2_on_display_rng) for its menu glyph
// (Hallu → random_obj_to_glyph display draws; tty shows ocsym only so
// the value is discarded). JS omitted the burn (named omit); hallu
// menus left the display stream behind, forking later hallu names
// (scen-sweep-Caveman-95343 step 602: C "orcus cosmicus"/"pony" vs JS
// "Bob the angry flower"/"wood golem" after the take-out menu).
// D-0856's display_pickinv burn (invent.js) is the same shape.
const EGG = objectNames.indexOf("EGG");
const SEED = 95343;

function makeFakeDisp() {
    const grid = Array.from({ length: 24 }, () => Array(80).fill(" "));
    return {
        rows: 24,
        cols: 80,
        grid,
        setCell(c, r, ch) {
            if (r >= 0 && r < 24 && c >= 0 && c < 80) grid[r][c] = ch;
        },
        clearScreen() {
            for (const row of grid) row.fill(" ");
        },
        setCursor(c, r) {
            this.cur = [c, r];
        },
        cur: [0, 0],
    };
}

function setup(hallu) {
    initRng(SEED);
    resetInputState();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.flags = {};
    game.objects = objects;
    game.u = { ux: 5, uy: 5, Hallucination: hallu ? 1 : 0 };
    game.nhDisplay = makeFakeDisp();
    game.context = {};
    game.program_state = {};
}

function egg(invlet) {
    return {
        otyp: EGG, oclass: FOOD_CLASS, quan: 1, age: 0,
        corpsenm: -1, invlet, where: OBJ_INVENT,
        cursed: 0, blessed: 0, known: 0, unpaid: 0,
    };
}

async function queryThenName(olist, qflags) {
    pushKeys(["\x1b"]); // ESC: cancel after the construction burn
    await query_objlist("Take out what?", olist, qflags, PICK_ANY, () => true);
    return rndmonnam();
}

function manualBurnThenName(n) {
    for (let i = 0; i < n; i++) obj_glyph(egg("a"));
    return rndmonnam();
}

describe("query_objlist menu-glyph display burn (pickup.c:1131)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, invent: game.invent, context: game.context,
            flags: game.flags, iflags: game.iflags,
            program_state: game.program_state, objects: game.objects,
            nhDisplay: game.nhDisplay,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.invent = saved.invent;
        game.context = saved.context;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        game.program_state = saved.program_state;
        game.objects = saved.objects;
        game.nhDisplay = saved.nhDisplay;
        resetInputState();
    });

    it("hallu unsorted: 2 items burn exactly 2 glyphs", async () => {
        setup(true);
        const viaQuery = await queryThenName([egg("a"), egg("b")], 0);
        setup(true);
        const viaManual = manualBurnThenName(2);
        assert.equal(viaQuery, viaManual);
    });

    it("hallu sorted (INVORDER_SORT): 2 items burn exactly 2 glyphs", async () => {
        setup(true);
        const viaQuery = await queryThenName([egg("a"), egg("b")], INVORDER_SORT);
        setup(true);
        const viaManual = manualBurnThenName(2);
        assert.equal(viaQuery, viaManual);
    });

    it("no-hallu control: menu burns nothing", async () => {
        setup(false);
        const viaQuery = await queryThenName([egg("a"), egg("b")], 0);
        setup(false);
        const fresh = rndmonnam();
        assert.equal(viaQuery, fresh);
    });

    it("AUTOSELECT_SINGLE control: no menu, no burn", async () => {
        setup(true);
        const r = await query_objlist(
            "Take out what?", [egg("a")], AUTOSELECT_SINGLE, PICK_ANY, () => true,
        );
        assert.equal(r.n, 1);
        const viaQuery = rndmonnam();
        setup(true);
        const fresh = rndmonnam();
        assert.equal(viaQuery, fresh);
    });
});
