import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: pray.c dopray `:2265–2270` — p_type==3 && !Inhell prints the
// shimmering-light message only `if (!Blind)`; C Blind is youprop.h:103
// `(HBlinded || EBlinded) && !BBlinded`, and eyeless polyforms carry
// HBlinded|=FROMFORM via polyself.c set_uasmon `:107`. pray.js read a
// local `Blind()` clone (`u.Blind || u.ublind` — flats only the timed
// make_blinded path syncs), so a form-blind hero praying printed the
// shimmer C suppresses (scen-engulf-Ranger-94312 step 115: C «You feel
// something move nearby. ×2», JS «You are surrounded by a shimmering
// light.»). The clone is deleted; pray.js uses the canonical export.

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

describe("pray while form-blind suppresses shimmer (pray.c:2267, youprop.h:103)", () => {
    it("engulf-Ranger force-prayer shows pull-backs, no shimmer", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-engulf-Ranger-94312.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // Through the 'y' answering "Force the gods to be pleased?"
        // (116 keys): C prints the two uinvulnerable pull-backs with no
        // shimmer (hero is an eyeless ochre jelly, HBlinded|=FROMFORM).
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 116),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const f = screens.findIndex((s) => strip(s).includes('Force the gods to be pleased?'));
        assert.ok(f >= 0, "replay reaches the Force-the-gods prompt");
        const top = strip(screens[f + 1] || '');
        assert.doesNotMatch(top, /shimmering light/, "form-blind hero: no shimmer (C behavior)");
        assert.match(top, /You feel something move nearby/, "pull-back messages print instead");
    });
});
