import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");
const C = await import("../js/const.js");

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

function loadSeg(path) {
    return JSON.parse(readFileSync(new URL(path, import.meta.url))).segments[0];
}

function auraRow0(screens) {
    const s = screens.find((scr) => String(scr).includes("malignant aura"));
    assert.ok(s, "expected a screen carrying the malignant-aura line");
    return String(s).split("\n")[0];
}

function auraRow0s(screens) {
    const rows = screens
        .filter((scr) => String(scr).includes("malignant aura"))
        .map((scr) => String(scr).split("\n")[0]);
    assert.ok(rows.length > 0, "expected a screen carrying the malignant-aura line");
    return rows;
}

// C ref: pray.c angrygods `:760–762` — the black-glow line prints only when
// `!Blind && !Antimagic` (youprop.h:55–57: uprops[ANTIMAGIC].intrinsic||
// extrinsic). The pray.js Antimagic() clone read only the u.Antimagic/
// HAntimagic/EAntimagic flats, which confer_oc_oprop never mirrors for a
// worn cloak of magic resistance — so JS printed the glow while C skipped
// it (D-1089 fixed the sit.js clone only; the pray clone was deferred).
// scen-descend-Wizard-50255809 step 60 (6 sessions share this shape).
describe("angrygods glow gate reads worn-cloak MR (pray.js Antimagic)", () => {
    it("step-60 aura screen has no black glow; extrinsic set, flats unset", { timeout: 180000 }, async () => {
        const seg = loadSeg("../hidden-corpus/recipes/scen-descend-Wizard-50255809.recipe.json");
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime, timezone: seg.timezone,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 60),
            storage: freshStorage(),
        });
        const u = game.u || {};
        const am = u.uprops?.[C.ANTIMAGIC];
        assert.ok((am?.extrinsic | 0) !== 0, "worn-cloak MR extrinsic set");
        assert.ok(!u.Antimagic && !u.HAntimagic && !u.EAntimagic, "flats unset");
        assert.ok(!u.Blind && !u.HBlind && !u.EBlind, "awake-eyed context");
        assert.equal(auraRow0(g.getScreens()), "You feel a malignant aura surround you.");
    });
});

// C ref: sit.c rndcurse calls You(mal_aura, ...) — and C You() (pline.c
// `:366–374`) is a plain "You " prefix with no dream logic. Only You_feel
// (`:387–400`) dream-prefixes, iff Unaware. JS rndcurse called You_feel,
// so an Unaware (sleeping) hero got "You dream that you feel ..." while C
// printed "You feel ...". scen-sweep-Valkyrie-50550073 step 312 (5
// sessions share this shape).
describe("rndcurse aura line uses You(), never dream-prefixed (sit.js)", () => {
    it("step-312 aura screen has no dream prefix while asleep", { timeout: 180000 }, async () => {
        const seg = loadSeg("../hidden-corpus/recipes-reserve/scen-sweep-Valkyrie-50550073.recipe.json");
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime, timezone: seg.timezone,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 312),
            storage: freshStorage(),
        });
        const u = game.u || {};
        assert.ok((u.usleep | 0) > 0, "hero asleep (Unaware) in both C and JS");
        const rows = auraRow0s(g.getScreens());
        for (const row0 of rows) {
            assert.ok(!row0.includes("dream"), `no dream prefix: ${JSON.stringify(row0)}`);
        }
        assert.ok(
            rows.some((row0) => row0.startsWith("You feel a malignant aura surround you.")),
            `aura text: ${JSON.stringify(rows)}`,
        );
    });
});
