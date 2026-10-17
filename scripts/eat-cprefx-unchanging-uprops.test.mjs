import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: eat.c cprefx :851-857 (PM_GREEN_SLIME arm: slime unless Slimed /
// Unchanging / slimeproof) + youprop.h:372 `#define Unchanging
// (HUnchanging || EUnchanging)`. JS read only the three flats, missing the
// uprops slot where worn.c confers the worn amulet of unchanging (D-4037 /
// D-4055 class): the Ranger wears the amulet (wished + put on ~step 385,
// never removed), so C skips the slime at the step-648 glob meal while JS
// printed "You don't feel very well." + slimed ahead of the quasit attack,
// slipping every later topline by one message (scen-sweep-Ranger-50250033
// step 648: C «stomach acid. The quasit hits!--More--» vs JS «stomach acid.
// You don't feel very well.--More--»).

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

describe("cprefx green-slime arm honors worn unchanging amulet (eat.c:852)", () => {
    it("sweep-Ranger step 648 matches C: acid then quasit hits, no slime", { timeout: 240000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Ranger-50250033.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 649 keys: through the step-648 meal start (screens[648] is step 648).
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 649),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const s648 = strip(screens[648] || '');
        assert.match(s648, /very bad case of stomach acid/, "replay reaches the glob meal");
        assert.doesNotMatch(s648, /don't feel very well/, "no slime message while unchanging (C skips)");
        assert.match(s648, /stomach acid\.\s+The quasit hits!--More--/, "C order: acid then quasit hits");
        const s649 = strip(screens[649] || '');
        assert.match(s649, /^You stop eating the small glob of green slime\./, "step 649 leads with the interruption (no spilled 648 hits)");
    });
});
