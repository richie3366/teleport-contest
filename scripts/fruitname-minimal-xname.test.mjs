import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
// First js import: do_name carries an eval-time set_y_monnam into objnam,
// so it must lead — every back-path to it then skips (in progress) and
// objnam completes before its body runs. objnam-first entry throws (TDZ).
import "../js/do_name.js";
import { fruitname } from "../js/potion.js";
import { minimal_xname, makesingular } from "../js/objnam.js";
import { objects_globals_init } from "../js/objects.js";
import { game } from "../js/gstate.js";
import { objectNames } from "../js/generated/objects_data.js";

// C ref: objnam.c fruitname `:412–427` — strstri " of " skip, makesingular,
// " juice" suffix. Pins the shipped arms headless: no RNG anywhere.
describe("fruitname (objnam.c:412-427)", () => {
  let savedPlFruit, savedFlagsFruit, hadFlags;
  beforeEach(() => {
    savedPlFruit = game.pl_fruit;
    hadFlags = !!game.flags;
    savedFlagsFruit = game.flags?.fruit;
  });
  afterEach(() => {
    game.pl_fruit = savedPlFruit;
    if (game.flags) game.flags.fruit = savedFlagsFruit;
    else if (hadFlags) game.flags = { fruit: savedFlagsFruit };
  });

  it("default fruit, plain and juice", () => {
    game.pl_fruit = "slime mold";
    if (game.flags) game.flags.fruit = undefined;
    assert.equal(fruitname(false), "slime mold");
    assert.equal(fruitname(true), "slime mold juice");
  });

  it("C comment example: slice of pizza -> pizza juice", () => {
    game.pl_fruit = "slice of pizza";
    assert.equal(fruitname(false), "pizza");
    assert.equal(fruitname(true), "pizza juice");
  });

  it("case-insensitive ' of ' + makesingular", () => {
    game.pl_fruit = "bunch OF grapes";
    assert.equal(fruitname(false), "grape");
  });
});

// C ref: objnam.c minimal_xname `:1037–1086` — bareobj xname with oc_uname
// + unknown description suppressed and restored. Distant far path calls
// xname on the bare object; no RNG anywhere.
const GOLD_PIECE = objectNames.indexOf("GOLD_PIECE");

describe("minimal_xname (objnam.c:1037-1086)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      urole: game.urole,
      iflags: game.iflags,
      objects: game.objects,
      distantname: game.distantname,
      program_state: game.program_state,
    };
    objects_globals_init();
    game.u = { ux: 40, uy: 12 };
    game.urole = null;
    game.iflags = {};
    game.distantname = 0;
    game.program_state = {};
  });
  afterEach(() => {
    game.u = saved.u;
    game.urole = saved.urole;
    game.iflags = saved.iflags;
    game.objects = saved.objects;
    game.distantname = saved.distantname;
    game.program_state = saved.program_state;
  });

  const goldObj = (over) => ({
    otyp: GOLD_PIECE,
    oclass: game.objects[GOLD_PIECE].oc_class,
    quan: 5,
    known: 1,
    dknown: 1,
    ...over,
  });

  it("singular base name despite quan != 1", () => {
    assert.equal(minimal_xname(goldObj()), "gold piece");
  });

  it("suppresses oc_uname and restores it", () => {
    const oc = game.objects[GOLD_PIECE];
    oc.oc_uname = "bob";
    const s = minimal_xname(goldObj());
    assert.ok(!s.includes("bob"));
    assert.equal(oc.oc_uname, "bob");
  });

  it("unknown description forced during, oc_name_known restored after", () => {
    const oc = game.objects[GOLD_PIECE];
    oc.oc_name_known = 1;
    minimal_xname(goldObj({ dknown: 0 }));
    assert.equal(oc.oc_name_known, 1);
    assert.equal(game.objects[GOLD_PIECE].oc_uname, oc.oc_uname);
  });
});

// C ref: objnam.c makesingular shipped arms — pronoun block (`:3053–3068`)
// + ia→ium (`:3147–3153`). No RNG anywhere.
describe("makesingular shipped arms", () => {
  it("pronouns they/them/their -> it/it/its", () => {
    assert.equal(makesingular("they"), "it");
    assert.equal(makesingular("them"), "it");
    assert.equal(makesingular("their"), "its");
  });

  it("pronoun cap follows input", () => {
    assert.equal(makesingular("They"), "It");
    assert.equal(makesingular("Their"), "Its");
  });

  it("balactheria -> balactherium", () => {
    assert.equal(makesingular("balactheria"), "balactherium");
  });
});
