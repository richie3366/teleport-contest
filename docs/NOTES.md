# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#866:** D-0769 `maybe_unhide_at` — prefix **86029→86100**; RNG **86137**.
- **Next @86100:** C `m_move` track `rn2(8)` vs JS `rnd(25)` sleep-gas
  (`trapeffect_slp_gas_trap`). Falsify: provenance of JS `rnd(25)` — early
  trap vs C still in track loop.
- **D-0731:** unicorn @58,12 cnt=7; WEB@58,13; FORCE WEB-know →cnt=6
  still need one more omit. Pair ID exhausted.
- **D-0708:** gnome @23,11 cnt=6; chcnt implies C drops one of first-five
  (suspect (22,10) diagonal past TRCORNER); omit any 1 →@49300.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0769 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only —
  same string can hide different call sites (see D-0769 @86015).
- seed5002 **PASS** (write/cmdassist/itemed throw — D-0742).
- D-0743…D-0769 seed0360 peels (…/wizard1/maybe_unhide_at).
- D-0764: `selection.fillrect` adds xstart like C get_location_coord.
- D-0765: swamp `lvlfill_swamp`; map align left/right/top/bottom.
- D-0766: baalz corrmaze + no map-contents `reset_xystart`; bughack wallify.
- D-0767: orcus mazegrid + hell_tweaks; Orcus invent `obj_resists`+detach.
- D-0768: wizard1 mazegrid + center map + east mazewalk + morgue door.
- D-0769: `m_move` `maybe_unhide_at` after place (clears mundetected).
- D-0602: playmode:debug → `flags.debug`; pick_room must test it.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z; don’t “always next lastinvnr”.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.
- Wish does **not** `makeknown` (C: otmp unidentified).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44** @#865;
  Scr 8278, RNG 77.79%; seed0360 **86100**/273 after D-0769).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @49039 mfndpos (D-0708 open).
- S_KOP / minetn-1/3/4/6/7 / **medusa-2/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred;
  **hellfill/wizard2–3/fakewiz next**;
  minend-3 / soko2-2 / other bigrm-N deferred;
  `LVLINIT_ROGUE` sp_lev deferred;
  `pick_nasty` GEHENNOM dnum deferred.
- Rolling boulder: `launch_obj` + `ohitmon` + `mons_see_trap` (D-0700/01).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
  **wizard1** (D-0768); **orcus** (D-0767); **baalz** (D-0766);
  **juiblex + lvlfill_swamp** (D-0765); **hell_tweaks** (D-0764);
  **asmodeus + hell helpers** (D-0763);
  **makeroguerooms + rogue skip0** (D-0762);
  **makemon mlet before G_SGROUP** (D-0761);
  **bigrm-4 L-replace+fountains** (D-0760);
  **medusa-3 + mk_artifact A_NONE** (D-0759).
