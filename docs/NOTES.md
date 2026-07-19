# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#877 / D-0773:** @98492 still JS linedup `rn2(3)`. **C screen (Dlvl42
  wizard2) step367/368:** warning `'1'` @(55,9) + visible `q` @(60,10);
  after `.` wait the `'1'` clears; **(57,9) never non-space on D42**.
  C step368 RNG = 16× fleeck + hides_under `rn2(10)` @98502. JS DIAG
  (removed): fleeck@98491 S_QUADRUPED (55,9)→(59,9) → linedup boulder
  → post (55,8). JS post-flip: ROOM+boulder @(57,9), lava @(55–56,9),
  ROOM @(58,9); C reveals lava `~` @(58,9)/(60,9) when hero arrives —
  **lava geometry differs**. Falsified: drop bounds2 `+xstart` (C
  `fillsrect` also adds xstart via `get_location`). **Hypothesis:** C
  `couldsee(55,9)` true (no LOS boulder / different lava) so lined_up
  silent. **Falsify:** recorder C-state `sobj_at(BOULDER,57,9)` +
  `couldsee(55,9)` + typ@(58,9) at step368; or find hell_tweaks cell
  pick bug with matched RNG. Do not FORCE.
- **D-0731:** unicorn @58,12 cnt=7; WEB@58,13; FORCE WEB-know →cnt=6
  still need one more omit. Pair ID exhausted.
- **D-0708:** gnome @23,11 cnt=6; chcnt implies C drops one of first-five
  (suspect (22,10) diagonal past TRCORNER); omit any 1 →@49300.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0774 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only —
  same string can hide different call sites (see D-0769 @86015).
- seed5002 **PASS** (write/cmdassist/itemed throw — D-0742).
- D-0743…D-0772 seed0360 peels (…/wizard2/hell_tweaks `.w.`).
- D-0770: flyers ignore floor_trigger traps; mfndpos avoids only
  `S_poisoncloud` (damage>0), not fog/steam `S_cloud`.
- D-0771: wizard2 = shuffle→walkfrom (not hellfill hellno before mazewalk).
- D-0772: nhlib `[[.w.]]` ≠ `'[.w.]'`; bigrm-3 brackets intentional.
- D-0774: map_cleanup before wallify/flip; does **not** strip ROOM LOS
  boulder @98492.
- FlipY ymin=2 is correct for mazegrid (not the FlipY→7 theory).
- LAVAPOOL is not `blocking_terrain` / not `does_block` (only LAVAWALL).
- `assigninvlet` **preserves** free a-z/A-Z; don’t “always next lastinvnr”.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44** @#875;
  Scr 8280, RNG 79.35%; seed0360 **98492**/275 after D-0771/72/74).
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
  **wizard3/hellfill/fakewiz after @98502**;
  minend-3 / soko2-2 / other bigrm-N deferred;
  `LVLINIT_ROGUE` sp_lev deferred;
  `pick_nasty` GEHENNOM dnum deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup uses handling=2.
- **wizard2** (D-0771); **wizard1** (D-0768); **orcus** (D-0767);
  **baalz** (D-0766); **juiblex + lvlfill_swamp** (D-0765);
  **hell_tweaks** (D-0764/D-0772 `.w.`); **asmodeus + hell helpers** (D-0763);
  **makeroguerooms + rogue skip0** (D-0762);
  **makemon mlet before G_SGROUP** (D-0761);
  **bigrm-4 L-replace+fountains** (D-0760);
  **medusa-3 + mk_artifact A_NONE** (D-0759).
