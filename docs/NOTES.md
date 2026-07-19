# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#852 D-0756 fixed:** `load_soko4_1` (Sokoban entry). Prefix **53361**.
  Branch must be in `g.lregions` pre-flip — post-flip pre-flip coords →
  oneshot `bad_location` `rn2(1)` spin vs C hero `place_lregion` `rn2(79)`.
- **Next @53361:** C `tower2` (Dlvl:35 after Vlad tower1; niche shuffle
  of 10) vs JS `rn2(79)`. Falsifier: `dat/tower2.lua` after getbones.
- **D-0731:** unicorn @58,12 cnt=7; WEB@58,13; FORCE WEB-know →cnt=6
  still need one more omit. Pair ID exhausted.
- **D-0708:** gnome @23,11 cnt=6; chcnt implies C drops one of first-five
  (suspect (22,10) diagonal past TRCORNER); omit any 1 →@49300.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0756 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- seed5002 **PASS** (write/cmdassist/itemed throw — D-0742).
- D-0743…D-0756 seed0360 peels (boots/oracle/castle/valley/mkclass/
  rnd_misc/sanctum+peace_minded/hell-temp+temperature_shift/region_islev/
  maybe_generate/minetn-5/minend-2/soko4-1).
- D-0750: next miss after valley is **sanctum** (not asmodeus).
- D-0754: next miss after sanctum is **minetn-5** (not hellfill/asmodeus).
- D-0755: next miss after minetn-5 is **minend-2** (not Gehennom).
- D-0756: next miss after soko4-1/tower1 is **tower2** (not castle).
- D-0602: playmode:debug → `flags.debug`; pick_room must test it.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z; don’t “always next lastinvnr”.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.
- Wish does **not** `makeknown` (C: otmp unidentified).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **  seed0367** / **seed0108** / **seed5002** **PASS** (suite **37/44** @#850;
  Scr 8212, RNG 72.38%; seed0360 **53361**/242 after D-0756).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @49039 mfndpos (D-0708 open).
- S_KOP / minetn-1/3/4/6/7 / **medusa-2/3/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred;
  asmodeus/baalz/orcus/juiblex/hellfill/wizard*/fakewiz deferred;
  minend-3 / soko2-2 / **tower2**/tower3 deferred;
  `pick_nasty` GEHENNOM dnum deferred.
- Rolling boulder: `launch_obj` + `ohitmon` + `mons_see_trap` (D-0700/01).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
  **soko4-1 Sokoban entry** (D-0756);
  **minend-2 Wine Cellar** (D-0755);
  **minetn-5 Grotto Town** (D-0754);
  **maybe_generate stronghold depth rate** (D-0753);
  **sanctum region_islev absolute tele** (D-0752);
  **hell temp + temperature_shift** (D-0751);
  **sanctum load + peace_minded is_minion** (D-0750);
  **rnd_misc_item nonliving/vampshifter** (D-0749);
  **mkclass_aligned Inhell hellish** (D-0748);
  **valley load_special + Inhell G_NOHELL** (D-0747);
  **castle load_special + mazewalk/squadmon** (D-0746);
  **oracle load_special** (D-0745);
  **SPEED_BOOTS Boots_on makeknown→exercise** (D-0744);
  **mattackm AT_WEAP mon_wield_item → MISS** (D-0743);
  **stethoscope adjacent returns `res` TIME** (D-0735);
  **mirror/camera getdir+beam/flash** (D-0736);
  **zhitu fatal → finish_losehp_done before learnwand** (D-0737);
  **hero_seq + stethoscope seemimic/mstatusline** (D-0738);
  **mattackm mlstmv + dog_move return onscary** (D-0739);
  **`c` → doclose getdir** (D-0740);
  **burnarmor erode + destroy pline/potionbreathe** (D-0741);
  **dowrite + open cmdassist + itemed throw** (D-0742);
  **unicorn NOTONL + fail-tele + rloc track clear** (D-0731);
  **mon_allowflags + temple SANCT** (D-0732);
  **mfndpos worm_cross + rogue door-cut** (D-0733);
  **zhitu non-sleep + hero destroy_items AD_FIRE** (D-0734).
