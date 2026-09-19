import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { objects_globals_init, objectNames } from "../js/objects.js";
import { init_artifacts } from "../js/artifact.js";
import { readobjnam } from "../js/readobjnam.js";

// C ref: objnam.c readobjnam_postparse1 `:4399–4404` — "Find corpse type
// w/o of" skips six head words that are object names or rank titles, not
// monsters ("samurai sword", "wizard lock", "death wand", "master key",
// "ninja-to", "magenta"). Without the "master key" guard the D-2577
// name_to_monplus restart matched the Monk rank title "Master", truncated
// bp to "Key of Thievery", and the wish died in postparse3 with `Nothing
// fitting that description exists in the game.` instead of reaching
// artifact_name (`:4872–4878`) → the touch_artifact blast. Corpus path:
// scen-wish-Priest-92163 step 234 + scen-wish-Rogue-92221 step 92
// (recorded owner next_ident mkobj.c:521), both PASS at js@a90eb521.
// The unit pins the postparse1→postparse3 flow under default unit state;
// the typfnd `!wizard` remaps stay deferred per the c-js-map.
const SKELETON_KEY = objectNames.indexOf("SKELETON_KEY");
const KATANA = objectNames.indexOf("KATANA");

describe("Master-Key wish guard (objnam.c:4399-4404)", () => {
  beforeEach(() => {
    objects_globals_init();
    init_artifacts();
    initRng(42);
    game.u = {};
  });

  it("cursed Master Key of Thievery grants the artifact key, not Nothing", () => {
    const o = readobjnam("cursed the Master Key of Thievery", null);
    assert.ok(o, "wish must resolve (regression: null → Nothing fitting)");
    assert.equal(o.otyp, SKELETON_KEY);
    assert.ok(o.oartifact, "oartifact set via oname (blast path)");
    assert.equal(o.cursed, true);
  });

  it("uncursed Master Key of Thievery still reaches artifact_name", () => {
    const o = readobjnam("the Master Key of Thievery", null);
    assert.ok(o, "wish must resolve (regression: null → Nothing fitting)");
    assert.equal(o.otyp, SKELETON_KEY);
  });

  it("samurai sword skips the samurai-monster scan (katana, not long sword)", () => {
    const o = readobjnam("blessed samurai sword", null);
    assert.ok(o);
    assert.equal(o.otyp, KATANA);
  });
});
