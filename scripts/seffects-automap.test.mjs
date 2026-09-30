import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { get_sound_effect_filename, add_sound_mapping } from "../js/sounds.js";
import {
  se_alarm, se_air_crackles, se_zap_then_explosion,
  number_of_se_entries, se_mappings_init,
} from "../js/generated/seffects_data.js";

// C ref: sounds.c se_mappings_init `:1969–1975` (SEFFECTS_AUTOMAP) +
// get_sound_effect_filename `:1994–2080`. Contest C compiles none of
// it (no SND_SOUNDEFFECTS_AUTOMAP in the unix build); the JS is a
// live source-level port (D-2776 USER_SOUNDS precedent), unwired —
// extern.h `:3025–3027` decl only. Pre-port the import itself fails
// (brief: no JS symbol); expectations below are computed from the C
// text (prefix "se_", suffix ".wav", consumes `:2019–2040`).
describe("seffects automap table (sounds.c)", () => {
  it("generated table mirrors the C init array", () => {
    assert.equal(number_of_se_entries, 198);
    assert.equal(se_mappings_init.length, 198);
    assert.deepEqual(se_mappings_init[0], { seid: 0, base_filename: "" });
    for (const i of [1, 2, 100, 197]) {
      assert.equal(se_mappings_init[i].seid, i);
    }
    assert.equal(se_mappings_init[1].base_filename, "air_crackles");
    assert.equal(se_mappings_init[197].base_filename, "zap_then_explosion");
    assert.equal(se_mappings_init[se_alarm].base_filename, "alarm");
    assert.equal(se_alarm, 2);
    assert.equal(se_air_crackles, 1);
    assert.equal(se_zap_then_explosion, 197);
  });
});

describe("get_sound_effect_filename arms (sounds.c)", () => {
  it("default arm needs sounddir; null buf/seid fail (:2008, :2040)", () => {
    // Runs first: sounddir is still null (only writer is
    // add_sound_mapping below).
    assert.equal(get_sound_effect_filename(se_alarm, "", 256, 0), null);
    assert.equal(get_sound_effect_filename(se_alarm, null, 256, 1), null);
    assert.equal(get_sound_effect_filename(0, "", 256, 1), null);
    assert.equal(get_sound_effect_filename(999, "", 256, 1), null);
    assert.equal(get_sound_effect_filename(-1, "", 256, 1), null);
  });
  it("base_only returns prefix+base with the cap gate (:2073-2074)", () => {
    assert.equal(get_sound_effect_filename(se_alarm, "", 256, 1), "se_alarm");
    assert.equal(
      get_sound_effect_filename(se_air_crackles, "", 256, 1),
      "se_air_crackles",
    );
    assert.equal(
      get_sound_effect_filename(se_zap_then_explosion, "", 256, 1),
      "se_zap_then_explosion",
    );
    // consumes = 3+5+1 = 9: cap 9 passes, 8 fails.
    assert.equal(get_sound_effect_filename(se_alarm, "", 9, 1), "se_alarm");
    assert.equal(get_sound_effect_filename(se_alarm, "", 8, 1), null);
  });
  it("havedir appends base+suffix with slash logic (:2064-2072)", () => {
    assert.equal(
      get_sound_effect_filename(se_alarm, "/tmp/snd", 256, 2),
      "/tmp/snd/se_alarm.wav",
    );
    assert.equal(
      get_sound_effect_filename(se_alarm, "/tmp/snd/", 256, 2),
      "/tmp/snd/se_alarm.wav",
    );
    assert.equal(
      get_sound_effect_filename(se_alarm, "C:\\snd\\", 256, 2),
      "C:\\snd\\se_alarm.wav",
    );
    assert.equal(
      get_sound_effect_filename(se_alarm, "", 256, 2),
      "/se_alarm.wav",
    );
    assert.equal(get_sound_effect_filename(se_alarm, "abcdefgh", 8, 2), null);
  });
  it("baseknown/bogus approaches return null (:2075-2076)", () => {
    assert.equal(get_sound_effect_filename(se_alarm, "", 256, 3), null);
    assert.equal(get_sound_effect_filename(se_alarm, "", 256, 9), null);
  });
  it("default arm builds dir/prefix/base/suffix (:2061-2063)", () => {
    // add_sound_mapping's :1580-1581 side effect sets sounddir='.'
    // (the mapping itself takes the cannot-read arm -> 0).
    assert.equal(add_sound_mapping('MESG "t" "f" 5'), 0);
    assert.equal(
      get_sound_effect_filename(se_alarm, "ignored", 256, 0),
      "./se_alarm.wav",
    );
    // consumes = 3+5+4+1+1+1 = 15: cap 15 passes, 14 fails.
    assert.equal(get_sound_effect_filename(se_alarm, "", 15, 0), "./se_alarm.wav");
    assert.equal(get_sound_effect_filename(se_alarm, "", 14, 0), null);
  });
});
