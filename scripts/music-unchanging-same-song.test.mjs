import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: music.c improvised_notes (music.c:740 `if (!(Unchanging &&
// svc.context.jingle[0] != '\0'))`) + youprop.h:372 `#define Unchanging
// (HUnchanging || EUnchanging)`. music.js read only the `u.Unchanging`
// flat, so a polymorphed hero wearing an amulet of unchanging (EUnchanging
// conferred via uprops, all flats unset — D-4037's Ranger-50055084 state)
// regenerated the tune instead of keeping it: no "yet familiar", the
// shorter second message joined the first on one topline, where C's longer
// familiar message overflows and Mores (scen-sweep-Ranger-50055084 step
// 1047: C «You generate a raucous noise.--More--» revealing «You produce
// a frightful, grave, yet familiar, sound.--More--»).

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

describe("poly + unchanging amulet keeps the improvised tune (music.c:740)", () => {
    it("sweep-Ranger second horn play splits C's familiar message behind More", { timeout: 240000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Ranger-50055084.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 1048 keys: through the space that acks the step-1047 --More--.
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 1048),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const completion = strip(screens[screens.length - 2] || '');
        const revealed = strip(screens[screens.length - 1] || '');
        assert.match(completion, /You generate a raucous noise/, "replay reaches the second horn play");
        assert.match(completion, /raucous noise\.--More--/, "C Mores after the mode line alone (familiar text overflows)");
        assert.match(revealed, /yet familiar/, "kept tune plays the familiar variant");
        assert.match(revealed, /--More--/, "C queues the awakening behind a second More");
    });
});
