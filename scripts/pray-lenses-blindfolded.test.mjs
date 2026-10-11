import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: youprop.h:96 `#define Blindfolded EBlinded` — "worn blindfold
// (or towel; lenses don't set [BLINDED].extrinsic)". pray.js read
// `EBlinded || ublindf`, so cursed lenses ranked TROUBLE_CURSED_BLINDFOLD
// (+1, major) instead of TROUBLE_CURSED_ITEMS (-3, minor); pleased case 1
// then fixed+glowed where C stays silent (scen-sweep-Wizard-578213 step
// 468: C «...satisfied.» with no More, JS queued the glow behind --More--).

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

const strip = (s) => (s || '').split('\n')[0].replace(/\x1b\[[0-9;]*m/g, '');

describe("cursed lenses are not a blindfold (youprop.h:96)", () => {
    it("sweep-Wizard prayer completion shows no extra More", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Wizard-578213.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 468 keys: through the ' ' that completes the prayer (multi
        // expires, nomovemsg + pleased print; C shows them with no More).
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 468),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const last = strip(screens[screens.length - 1] || '');
        assert.match(last, /You finish your prayer/, "replay reaches prayer completion");
        assert.doesNotMatch(last, /--More--/, "no spurious glow queued behind (C behavior)");
    });
});
