import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: spell.c dospellmenu `:2130–2132` passes MENU_ITEMFLAGS_SELECTED
// for (splnum == splaction), and win/tty/wintty.c `:1468–1473` paints a
// selected menu row (count -1) with '*' instead of '-'. The dovspell
// swap call passes the first-picked book index as splaction, so C shows
// e.g. `b * extra healing` in the "Reordering spells; swap 'b' with"
// menu. JS baked '-' for every row (spell.js dospellmenu), failing 6
// scen-caster sessions at their swap-menu step (e.g. Healer-94089 step
// 75: C `b * extra healing ...` vs JS `b - extra healing ...`).
// This test pins the preselected '*' on the recorded swap screen.
const ID = "scen-caster-Healer-94089";
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

const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "");

describe("dospellmenu swap preselected '*' (spell.c:2130 + wintty.c:1470)", () => {
    it(`${ID}: swap menu shows 'b * extra healing'`, { timeout: 120000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(stripAnsi);
        const swap = screens.filter((s) =>
            s.includes("Reordering spells; swap 'b' with"));
        assert.ok(swap.length >= 1,
            `no swap-menu screen for 'b' in ${screens.length} screens`);
        for (const s of swap) {
            assert.ok(s.includes("b * extra healing"),
                "swap screen lacks the preselected '*' row");
            assert.ok(!s.includes("b - extra healing"),
                "swap screen still paints '-' on the preselected row");
        }
    });
});
