import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";
import { ACID_RES } from "../js/const.js";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: uhitm.c passive AD_ACID (:5906–5933) — splash damage applies only
// `if (!Acid_resistance)`; C youprop.h:59-61 reads
// uprops[ACID_RES].intrinsic||extrinsic. The worn blessed alchemy smock
// confers EAcid_resistance into uprops only (worn.c:566-567,686;
// do_wear.js Cloak_on), leaving the JS EAcid_resistance flat clear — so
// JS's flats-only union missed it and applied tmp.
// scen-sweep-Archeologist-50456018 step 250: C draws d(1,8)=6,
// rn2(2)=1 (splash), rn2(30)=0 (corrode) and keeps HP 18(18); JS dealt
// the 6 → HP 12(18), first divergence (owner do_statusline2).
const ID = "scen-sweep-Archeologist-50456018";
const STEP = 250;

function memStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("passive splash damage honors uprops-conferred resistance (uhitm.c passive)", () => {
    it(`${ID}@${STEP}: acid splash resisted via smock, HP 18(18) like C`, { timeout: 300000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url),
        ));
        const seg = recipe.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, STEP),
            storage: memStorage(),
        });
        const u = game.u || {};
        assert.ok(
            (u.uprops?.[ACID_RES]?.extrinsic | 0) > 0,
            "smock-conferred uprops extrinsic present (the C resistance source)",
        );
        assert.equal(u.uhp, 18, "acid splash resisted — C keeps HP 18(18)");
        assert.equal(u.uhpmax, 18, "max HP unchanged");
        const grid = decodeScreen(g.getScreens()[STEP] || "");
        const topline = grid[0].map(renderCell).join("");
        assert.match(topline, /splashed by/, "splash message still emitted (rn2(2)=1 both sides)");
    });
});
