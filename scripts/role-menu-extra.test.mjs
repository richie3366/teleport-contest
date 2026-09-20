import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { roles } from "../js/roles.js";
import { RS_ROLE, ROLE_NONE } from "../js/const.js";
import { menu_extra_lines, rfilter } from "../js/player_selection.js";

// C ref: role.c role_menu_extra `:1840–1844` (D-2633, Must-fix review 1592):
//   f = r;
//   for (i = 0; i < SIZE(roles) - 1; ++i)
//       if (i != f && !gr.rfilter.roles[i]) break;
//   if (i == SIZE(roles) - 1) { constrainer = "filter"; forcedvalue = "role"; }
// When the filter excludes every role except the selected one, the entry is
// disabled as "filter forces role". A compare against anything but the local
// f (initrole) breaks at the selected role itself and the arm never fires.
describe("menu_extra_lines RS_ROLE filter arm (role.c:1840-1844)", () => {
  let savedFlags;
  let savedRoles;
  let savedMask;
  beforeEach(() => {
    savedFlags = game.flags;
    savedRoles = rfilter.roles.slice();
    savedMask = rfilter.mask;
    game.flags = { initrole: 0, initrace: ROLE_NONE };
    rfilter.mask = 0;
  });
  afterEach(() => {
    game.flags = savedFlags;
    rfilter.roles.length = 0;
    for (const v of savedRoles) rfilter.roles.push(v);
    rfilter.mask = savedMask;
  });

  it("filter excluding all but the selected role forces role", async () => {
    for (let i = 0; i < roles.length; i++) rfilter.roles[i] = true;
    rfilter.roles[0] = false;
    const lines = await menu_extra_lines(RS_ROLE);
    assert.equal(lines.length, 1);
    assert.match(lines[0].text, /filter forces role/);
  });

  it("no filter leaves the pick-role-first entry", async () => {
    for (let i = 0; i < roles.length; i++) rfilter.roles[i] = false;
    const lines = await menu_extra_lines(RS_ROLE);
    assert.equal(lines.length, 1);
    assert.match(lines[0].text, /Pick another role first/);
  });
});
