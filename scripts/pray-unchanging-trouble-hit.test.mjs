import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: youprop.h:372 `#define Unchanging (HUnchanging || EUnchanging)`;
// worn.c:117-125 setworn confers the amulet's oc_oprop (UNCHANGING) into
// uprops[].extrinsic (JS: confer_oc_oprop, uprops-only, no EUnchanging flat
// mirror). pray.js in_trouble read `u.Unchanging || u.HUnchanging`, so a
// polymorphed hero wearing an amulet of unchanging skipped TROUBLE_HIT
// (pray.c:220 `(!Upolyd || Unchanging) && critically_low_hp(FALSE)`) and
// pleased never ran the TROUBLE_HIT fix (pray.c:425 «much better» +
// full heal) that C prints behind --More-- (scen-sweep-Ranger-50055084
// step 355: C «...Venus is pleased.--More--» revealing «You feel much
// better.», JS no More).

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

describe("poly + unchanging amulet ranks TROUBLE_HIT (pray.c:220)", () => {
    it("sweep-Ranger prayer completion queues C's much-better behind More", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Ranger-50055084.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 356 keys: through the space that acks the step-355 --More--.
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 356),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const completion = strip(screens[screens.length - 2] || '');
        const revealed = strip(screens[screens.length - 1] || '');
        assert.match(completion, /You finish your prayer/, "replay reaches prayer completion");
        assert.match(completion, /--More--/, "C queues the heal message behind More");
        assert.match(revealed, /You feel much better\./, "revealed message is the TROUBLE_HIT fix");
    });
});
