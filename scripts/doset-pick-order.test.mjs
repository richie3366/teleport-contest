import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: options.c doset `:8914–8959` walks pick_list in order (tty
// wintty.c tty_select_menu `:2806–2811` collects picks walking cw->mlist,
// i.e. menu order) and dispatches each pick by type — bools toggle,
// compounds with a handler run do_handler, compounds without prompt via
// getlin. scen-options-Ranger-582811 picks n (pickup_types, handler) then
// v (statushilites, getlin) in the compounds menu; C prompts pickup_types
// first ("Autopickup what?"), not statushilites ("Set statushilites to
// what?").
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-options-Ranger-582811.recipe.json", import.meta.url),
));

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

describe("doset processes multi-picks in menu order (options.c pick_list walk)", () => {
    it("step-91 prompts pickup_types before statushilites", { timeout: 120000 }, async () => {
        const seg = RECIPE.segments[0];
        const g = await runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 91, `expected >91 screens, got ${screens.length}`);
        const topline = String(screens[91]).split("\n")[0]
            .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "").trim();
        assert.equal(topline, "Autopickup what?");
    });
});
