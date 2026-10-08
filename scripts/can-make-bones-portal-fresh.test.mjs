import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: bones.c can_make_bones `:366–370` — non-branch levels with a
// MAGIC_PORTAL in ftrap never leave bones. The Tourist dies on wizard3
// (Gehennom), whose des.levregion type="portal" (wizard3.lua:33) C
// materializes as an ftrap MAGIC_PORTAL via put_lregion_here LR_PORTAL
// (mkmaze.c:458 mkportal). C draws nothing after the killing blow and
// never prompts, so bones_ok is FALSE via the portal arm; JS must read
// the live level.traps (game.ftrap stays null on fresh levels) and skip
// the end.c:1364 "Save bones?" prompt, reaching the RIP screen instead.
const CASES = [
    ["scen-tour-Tourist-92134", 81],
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

async function replayTopline(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const storage = sharedStorage();
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s || "");
    }
    const recTop = String(sess.segments[0].steps[step].screen).split("\n")[0];
    const jsTop = String(screens[step]).split("\n")[0];
    return { recTop, jsTop };
}

describe("can_make_bones skips Save-bones on fresh portal levels (bones.c:366-370)", () => {
    for (const [id, step] of CASES) {
        it(`${id}: step ${step} shows the RIP screen, not Save bones?`, { timeout: 300000 }, async () => {
            const { recTop, jsTop } = await replayTopline(id, step);
            assert.equal(recTop, "", "recorded C reaches the RIP screen with no Save-bones prompt");
            assert.equal(jsTop, recTop, "JS must skip the Save-bones prompt like C (portal in live traps)");
        });
    }
});
