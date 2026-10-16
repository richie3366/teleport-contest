import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: fountain.c drinksink case 2 `:611–621` — losehp() runs done(DIED),
// which is noreturn (lifesave / wizard-mode "Die?" decline returns via
// savelife). JS splits losehp (hack.js flags + end.js finish_losehp_done);
// the caller must drain. Without the drain, scen-sweep-Ranger-50550065
// (3 HP, scalding sip for rnd(6)=4) stuck gameover on and the run ended
// with no screen 606 (JS «» vs C «You take a sip of scalding hot
// water.--More--»). This test pins screen 606 after the drain.
//
// C ref: do_wear.c Amulet_on `:978–995` + worn.c setworn `:117–125` —
// donning an amulet of magical breathing confers EMagical_breathing
// (uprops[].extrinsic, mirrored to the E-flat like the other confer
// arms). Without the mirror, scen-worldtour-Tourist-50050066 computed
// m_poisongas_ok MINOR instead of OK at step 576 and printed the
// "enveloped" clause C suppresses. This test pins the stench-only line.
function loadRecipe(id) {
    return JSON.parse(readFileSync(
        new URL(`../hidden-corpus/recipes/${id}.recipe.json`, import.meta.url),
    ));
}

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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("drinksink scald drain + MB-amulet extrinsic", () => {
    it("Ranger-50550065: step-606 scalding sip renders (losehp drained)", { timeout: 300000 }, async () => {
        const seg = loadRecipe("scen-sweep-Ranger-50550065").segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 607),
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 607, `screens ${screens.length} < 607 (drain missing: run halts at the yn prompt)`);
        assert.equal(
            rowText(screens, 606, 0),
            "You take a sip of scalding hot water.--More--",
        );
    });

    it("Tourist-50050066: step-576 stench without enveloped (MB extrinsic)", { timeout: 300000 }, async () => {
        const seg = loadRecipe("scen-worldtour-Tourist-50050066").segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 577),
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 577, `screens ${screens.length} < 577`);
        assert.equal(
            rowText(screens, 576, 0),
            "Ew, what a stench!--More--",
        );
    });
});
