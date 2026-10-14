import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: botl.c do_statusline2 `:130–138` gold arm + check_gold_symbol
// (`:39–44`) + symbols.c assign_graphics/switch_symbols + the recorder
// capture (nomux_putch `ch < 32` drop, termcap.c:755-756).
// Under `symset:RogueEpyx` the coin showsym is S_coin `\x0f`
// (dat/symbols RogueEpyx); no check_gold_symbol call site fires before
// the step-0 paint (S_-parse, doset-commit, goto_level only), so C takes
// the encglyph path, decode_mixed yields `\x0f`, the tty writes it raw,
// and the capture drops it — the recorded cell keeps its cleared space
// while the cursor still advances. JS hardcoded the gold prefix `$`
// (assign_graphics snapshot), so 15 scen-symset sessions diverged at
// step 0, row 23 col 7: C `Dlvl:1  :0 …` vs JS `Dlvl:1 $:0 …`.
// This test boots the smallest probe (empty moves: step-0 paint only)
// and pins the recorded C row; the second case pins the default-symset
// `$` fallback arm on the same seed.
const ID = "scen-symset-Archeologist-50058509";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

// C-recorded step-0 row 23 (.cache/hidden/scores.json rowDiff.c).
const C_ROW23 = "Dlvl:1  :0 HP:15(15) Pw:1(1) AC:9 Xp:1";

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

async function bootRow23(nethackrc) {
    const seg = SESS.segments[0];
    const game = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc, moves: "",
        storage: sharedStorage(),
    });
    const screens = game.getScreens?.() || [];
    assert.ok(screens.length >= 1, "boot paints at least one screen");
    return String(screens[0]).split("\n")[23] ?? "";
}

describe("RogueEpyx status gold prefix (botl.c gold arm + capture parity)", () => {
    it(`${ID}: step-0 row 23 matches C's recorded space-prefix row`, { timeout: 120000 }, async () => {
        const row23 = await bootRow23(SESS.segments[0].nethackrc);
        assert.equal(row23[7], " ",
            `gold prefix cell: JS ${JSON.stringify(row23[7])} vs C ' '`);
        assert.ok(row23.startsWith(C_ROW23),
            `row23: JS ${JSON.stringify(row23)} vs C ${JSON.stringify(C_ROW23)}`);
    });

    it("default symset on the same seed keeps the `$` prefix", { timeout: 120000 }, async () => {
        const rc = SESS.segments[0].nethackrc
            .split("\n").filter((l) => !l.startsWith("OPTIONS=symset:")).join("\n");
        assert.ok(!rc.includes("symset:"),
            "test setup: symset line removed from rc");
        const row23 = await bootRow23(rc);
        assert.equal(row23[7], "$",
            `gold prefix cell: JS ${JSON.stringify(row23[7])} vs '$'`);
        assert.ok(row23.startsWith(C_ROW23.replace("Dlvl:1  :0", "Dlvl:1 $:0")),
            `row23: ${JSON.stringify(row23)}`);
    });
});
