import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c freeinv `:1403–1409` (extract_nobj + pickup_prev=0 +
// freeinv_core + update_inventory — no owornmask touch) + do.c dropx
// `:786–795` + wield.c drop_uswapwep `:809–831`.
// JS do.js freeinv_drop zeroed obj.owornmask while the dropped object was
// still in its worn slot; dropz's setuswapwep(null)→setworn then fired a
// spurious impossible("Setworn...") that C never prints. The second message
// raised --More--, which ate the following keys and forked the session.
// scen-worldtour-Barbarian-95200 step 608 (X with a cursed axe as uswapwep):
// C shows the axe line alone; JS showed it with --More--.
const ID = "scen-worldtour-Barbarian-95200";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

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

describe("drop_uswapwep prints no spurious Setworn/More (freeinv owornmask, D-3791)", () => {
    it(`${ID}: step 608 axe line without --More--, step 609 search runs`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        assert.equal(steps.length, 1104, `expected 1104 C steps`);
        // C-side pins: the recording shape this test asserts against, or the
        // test is vacuous.
        assert.ok(
            (steps[608].screen || "").includes("Your axe evades your grasp and drops from your left hand!"),
            `C step 608 is not the axe line: ${JSON.stringify((steps[608].screen || "").slice(0, 90))}`,
        );
        assert.ok(
            !(steps[608].screen || "").includes("--More--"),
            `C step 608 unexpectedly carries --More--`,
        );
        assert.ok(
            (steps[609].screen || "").includes("already found a monster"),
            `C step 609 is not the search message: ${JSON.stringify((steps[609].screen || "").slice(0, 90))}`,
        );

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 610,
            `session truncated: ${screens.length} screens < 610 steps`);
        assert.ok(
            (screens[608] || "").includes("Your axe evades your grasp and drops from your left hand!"),
            `step 608 lost the axe line: ${JSON.stringify((screens[608] || "").slice(0, 120))}`,
        );
        assert.ok(
            !(screens[608] || "").includes("--More--"),
            `step 608 carries spurious --More--: ${JSON.stringify((screens[608] || "").slice(0, 120))}`,
        );
        assert.ok(
            (screens[609] || "").includes("already found a monster"),
            `step 609 key eaten by More: ${JSON.stringify((screens[609] || "").slice(0, 120))}`,
        );
        assert.ok(
            !screens.slice(600, 620).some((s) => (s || "").includes("Setworn")),
            `spurious Setworn impossible near step 608`,
        );
    });
});
