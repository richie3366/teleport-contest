// exerper hallucination arm must use the resisted macro (Healer-50556037 s296):
// C Hallucination ≡ HHallucination && !Halluc_resistance, resistance H||E
// (youprop.h:119–120). JS read only the flat u.Halluc_resistance, missing the
// wielded-Grayswandir extrinsic (EHalluc_resistance), so a resisted running
// timeout trained WIS-down (extra rn2(2)@exercise) where C drew nothing.
// Covers: scen-sweep-Healer-50056037 step 296 (C rn2(64) wipe vs JS rn2(2)).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { ART_GRAYSWANDIR } from "../js/generated/artifacts_data.js";
import { enableRngLog, getRngLog } from "../js/rng.js";
import { hallucResisted } from "../js/potion.js";

const id = "scen-sweep-Healer-50556037";
const at = 296;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];
const { runSegment } = await import("../js/jsmain.js");

globalThis.__NH_RNG_TRACE = true;

async function replayTo(n) {
    enableRngLog();
    const moves = [...seg.moves].slice(0, n).join("");
    await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves, storage: undefined,
    });
    // NB: import game AFTER the run — runSegment rebinds the export, so a
    // destructured namespace snapshot from before the run is stale.
    const { game } = await import("../js/gstate.js");
    return { log: [...getRngLog()], game };
}

const r295 = await replayTo(295);
const log295 = r295.log;
// Preconditions at moves 54: Grayswandir wielded, extrinsic resistance set,
// hallucination timeout running, C macro false — while the old flat read
// sees no resistance (proves the test exercises the missed arm).
const u = r295.game.u || {};
assert.equal(u.uwep?.oartifact, ART_GRAYSWANDIR,
    `${id}@295: want Grayswandir wielded, got oartifact=${u.uwep?.oartifact}`);
assert.ok((u.EHalluc_resistance | 0) !== 0,
    `${id}@295: want extrinsic halluc resistance set, got ${u.EHalluc_resistance}`);
assert.ok((u.HHallucination | 0) > 0,
    `${id}@295: want hallucination timeout running, got ${u.HHallucination}`);
assert.equal(hallucResisted(u), true,
    `${id}@295: want house resisted-union true (C macro false)`);
assert.equal((u.Halluc_resistance | 0), 0,
    `${id}@295: want old flat read blind (0) so the test is relevant`);

const log296 = (await replayTo(296)).log;
const slice = log296.slice(log295.length);
const exerDec = slice.filter((e) => e.includes("rn2(2)") && e.includes("@ exercise("));
assert.equal(exerDec.length, 0,
    `${id}@${at}: want no rn2(2)@exercise in step 296, got ${JSON.stringify(exerDec)}`);
