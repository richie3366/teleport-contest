import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { unmul } from "../js/hack.js";
import { clear_nhwindow_message } from "../js/display.js";
import { monsterNames } from "../js/generated/monsters_data.js";

// C ref: hack.c unmul `:4192–4194` — after pline(nomovemsg), when poly'd
// and the message is the lifesave one ("You survived that ..."), C prints
// a current-form reminder: You("are %s.", an(pmname(&mons[u.umonnum],
// Ugender))) — "(ignore Hallu)". Comment: "primarily for life-saving
// while turning into green slime". JS printed nomovemsg but lacked the
// follow-up, so the topline never overflowed there: C pauses on --More--
// (pre-pass-2 capture) while JS ran pass 2 first (scen-death-Tourist-92095
// step 49 pet-I diff; global RNG otherwise identical thru step 65).
const PM_GREEN_SLIME = monsterNames.indexOf("PM_GREEN_SLIME");
const PM_TOURIST = monsterNames.indexOf("PM_TOURIST");
const SURVIVED = "You survived that attempt on your life.";

describe("unmul lifesave-while-poly'd form reminder (hack.c:4192-4194)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      flags: game.flags,
      iflags: game.iflags,
      nomovemsg: game.nomovemsg,
      multi: game.multi,
      multi_reason: game.multi_reason,
      afternmv: game.afternmv,
      youmonst: game.youmonst,
    };
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  const setup = ({ polyd, msg }) => {
    initRng(92095);
    clear_nhwindow_message();
    game.flags = { female: false };
    game.iflags = { window_inited: true };
    game.u = polyd
      ? { umonnum: PM_GREEN_SLIME, umonster: PM_TOURIST, mfemale: 0, usleep: 0 }
      : { umonnum: PM_TOURIST, umonster: PM_TOURIST, usleep: 0 };
    game.youmonst = polyd ? { data: { mndx: PM_GREEN_SLIME } } : null;
    game.nomovemsg = msg === undefined ? null : msg;
    game.multi = 0;
    game.multi_reason = null;
    game.afternmv = null;
  };

  it("prints 'You are a green slime.' after the lifesave message when poly'd", async () => {
    setup({ polyd: true, msg: SURVIVED });
    await unmul(null);
    assert.equal(game.nomovemsg, null);
    assert.match(
      game._pending_message || "",
      /You are a green slime\./,
      "poly'd lifesave must print the C :4193-4194 form reminder",
    );
  });

  it("prints no reminder when not poly'd", async () => {
    setup({ polyd: false, msg: SURVIVED });
    await unmul(null);
    assert.doesNotMatch(
      game._pending_message || "",
      /You are a /,
      "human lifesave must not print a form reminder",
    );
  });

  it("prints no reminder for a non-lifesave message when poly'd", async () => {
    setup({ polyd: true, msg: "You can move again." });
    await unmul(null);
    assert.doesNotMatch(
      game._pending_message || "",
      /You are a /,
      "ordinary unmul must not print a form reminder",
    );
  });
});
