import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { SCROLL_CLASS, SPBOOK_CLASS, objectNames } from "../js/objects.js";
import { learnscroll } from "../js/read.js";

// C ref: read.c learnscroll/learnscrolltyp — makeknown + more_experienced
// when the type is new; dknown is never written (read.c:72 is a comment
// claiming it is implied). D-3226 deleted the raw-u.Blind-gated
// `scroll.dknown = true` (u.Blind is a make_blinded snapshot, do.js).
describe("doread learnscroll (read.c)", () => {
  const otyp = objectNames.indexOf("SCR_IDENTIFY");
  let saved;
  beforeEach(() => {
    saved = {
      objects: game.objects,
      disco: game.disco,
      u: game.u,
      bases: game.bases,
      flags: game.flags,
    };
    game.objects = { [otyp]: { oc_name_known: 0, oc_class: SCROLL_CLASS } };
    game.u = {};
    initRng(1234);
  });
  afterEach(() => {
    for (const k of ["objects", "disco", "u", "bases", "flags"]) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  it("makeknowns a new scroll type without touching dknown", () => {
    const scroll = { oclass: SCROLL_CLASS, otyp, dknown: false };
    learnscroll(scroll);
    assert.equal(game.objects[otyp].oc_name_known, 1);
    assert.equal(scroll.dknown, false);
  });

  it("leaves dknown alone for an already-known type", () => {
    game.objects[otyp].oc_name_known = 1;
    const scroll = { oclass: SCROLL_CLASS, otyp, dknown: false };
    learnscroll(scroll);
    assert.equal(scroll.dknown, false);
  });

  it("ignores spellbooks", () => {
    const book = { oclass: SPBOOK_CLASS, otyp, dknown: false };
    learnscroll(book);
    assert.equal(game.objects[otyp].oc_name_known, 0);
  });
});
