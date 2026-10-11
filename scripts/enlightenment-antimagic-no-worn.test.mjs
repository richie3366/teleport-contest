import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: insight.c:1523-1524 (Antimagic arm of the resistances list) +
// youprop.h:55-57 (Antimagic = HAntimagic || EAntimagic, u.uprops bits
// only — C never reads the worn gear live; the nhlua.c gamestate
// save/restore extrinsic clobber is permanent — D-3790).
// JS enlightenment()'s final-attributes inline had a worn-cloak-of-MR
// arm that fired TRUE on clobbered (worn, E=0) disclosure state where C
// reads FALSE, printing an extra " You were magic-protected." line and
// shifting every later menu row (D-3805 Antimagic pair). This test pins
// both probe menus without the invented line.
const CASES = [
    {
        id: "scen-worldtour-Wizard-95208", step: 285,
        row: 15, line: "You had infravision innately.",
    },
    {
        id: "scen-worldtour-Wizard-95221", step: 621,
        row: 13, line: "You were poison resistant innately.",
    },
];

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

describe("final enlightenment Antimagic reads uprops-only, no worn arm (D-3811)", () => {
    for (const { id, step, row, line } of CASES) {
        it(`${id}: step-${step} menu has C's line, no magic-protected`, { timeout: 300000 }, async () => {
            const sess = JSON.parse(readFileSync(
                new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
            ));
            const seg = sess.segments[0];
            const steps = seg.steps || [];
            // C-side pins: the recording really is the no-MR menu, or this
            // test is vacuous.
            const cScr = String(steps[step].screen || "");
            assert.equal(cScr.split("\n")[row], ` ${line}`,
                `C step-${step} row ${row} moved: ${JSON.stringify(cScr.split("\n")[row])}`);
            assert.doesNotMatch(cScr, /magic-protected/,
                `C step-${step} gained a magic-protected line`);

            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves,
                storage: sharedStorage(),
            });
            const screens = (g.getScreens?.() || []).map(String);
            assert.ok(screens.length > step,
                `session truncated: ${screens.length} screens <= ${step}`);
            assert.equal(screens[step].split("\n")[row], ` ${line}`,
                `step ${step} row ${row} is not C's: ${JSON.stringify(screens[step].split("\n")[row])}`);
            assert.doesNotMatch(screens[step] || "", /magic-protected/,
                `step ${step} still prints the invented Antimagic line`);
        });
    }
});
