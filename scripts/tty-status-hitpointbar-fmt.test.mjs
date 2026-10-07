import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: win/tty/wintty.c tty_status_update `:4503–4513` —
// Sprintf(status_vals[fldidx], fmt, text) with full %s width/precision
// semantics. With hitpointbar on, BL_TITLE's fieldfmt is `%-30.30s`
// (src/botl.c:1714), so the stored value is the title padded/truncated
// to 30 — never the format text itself. JS applied the fmt with a plain
// `replace('%s', …)` no-op, stored the literal, and render_status's
// `:5130–5135` bar arm padded the literal to 30: row 22 showed
// `[%-30.30s …]` where C shows the name in the HP-bar brackets.
function loadRecipe(id) {
    return JSON.parse(readFileSync(
        new URL(`../hidden-corpus/recipes/${id}.recipe.json`, import.meta.url),
    ));
}

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

async function screenRowAt(id, step, row) {
    const seg = loadRecipe(id).segments[0];
    const g = await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        timezone: seg.timezone,
        nethackrc: seg.nethackrc,
        moves: seg.moves,
        storage: freshStorage(),
    });
    const screens = g.getScreens();
    assert.ok(screens.length > step, `${id}: expected >${step} screens, got ${screens.length}`);
    return String(screens[step]).split("\n")[row];
}

const stripSgr = (row) => row.replace(/\x1b\[[0-9;]*[A-Za-z]/g, (m) =>
    m.match(/\x1b\[\d+C/) ? ' '.repeat(parseInt(m.slice(2), 10) || 0) : '');

describe("tty_status_update hitpointbar %-30.30s title (wintty :4513)", () => {
    it("Archeologist-94051 step-8 row 22 names Indiana, not the fmt", { timeout: 120000 }, async () => {
        const row = await screenRowAt("scen-options-Archeologist-94051", 8, 22);
        assert.ok(!row.includes("%-30.30s"), `fmt leaked literal: ${JSON.stringify(row)}`);
        assert.ok(stripSgr(row).includes("Indiana the Digger"), `title missing: ${JSON.stringify(row)}`);
        assert.ok(row.includes("\x1b[7m"), `bar inverse missing: ${JSON.stringify(row)}`);
    });
    it("Healer-94271 step-6 row 22 names the Rhizotomist, not the fmt", { timeout: 120000 }, async () => {
        const row = await screenRowAt("scen-options-Healer-94271", 6, 22);
        assert.ok(!row.includes("%-30.30s"), `fmt leaked literal: ${JSON.stringify(row)}`);
        assert.ok(stripSgr(row).includes("the Rhizotomist"), `title missing: ${JSON.stringify(row)}`);
        assert.ok(row.includes("\x1b[7m"), `bar inverse missing: ${JSON.stringify(row)}`);
    });
});
