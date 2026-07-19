# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#827 D-0739 done:** `mattackm` sets `magr.mlstmv`; dog_move return
  attack also gates `!onscary`. seed5002 cont **11715→11725**; Scr 108→114.
- **Falsify next (@11725):** after EOT, JS `wiz_wish`→`readobjnam`
  `rn2(181)` vs C `distfleeck` (C `^Wscroll of identify` steps 141–198
  have **0** RNG). Dump makewish/readobjnam vs C named-scroll path.
- **D-0731 open:** black unicorn cnt7vs5; FORCE omit-pair ID exhausted.
- **D-0708:** gnome @23,11 cnt=6; omit any 1 →@49300.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0739 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- seed5002 seg0 now FULL 5904; flattened @11725 is mid-seg1 step199.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0658: hx=39 alone or link_doors + rect roomno gate → @14403.
- D-0665…D-0673: TREE cmap; altar `{`; Warning floats; lit clear.
- D-0674/D-0675: gas `does_block` needs `clear_regions` on mklev.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z; don’t “always next lastinvnr”.
- `Fumbling()` ≡ H||E||uprops[FUMBLING]; not a sticky boolean.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.
- Wish does **not** `makeknown` (C: otmp unidentified); trailing exercise
  was death-noreturn hole, not wish-known (D-0737).
- Stethoscope free/TIME needs live `hero_seq` (D-0738); don’t hardcode seq.
- `mattackm` **must** set `magr.mlstmv = moves` (D-0739); undefined ≠ C 0.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** **PASS** (suite **36/44** @#825).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @49039 mfndpos (D-0708 open).
- S_KOP / minetn-1/3–7 / **medusa-2/3/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  `temperature_shift` stub; worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred.
- Rolling boulder: `launch_obj` + `ohitmon` + `mons_see_trap` (D-0700/01).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
  **stethoscope adjacent returns `res` TIME** (D-0735);
  **mirror/camera getdir+beam/flash** (D-0736);
  **zhitu fatal → finish_losehp_done before learnwand** (D-0737);
  **hero_seq + stethoscope seemimic/mstatusline** (D-0738);
  **mattackm mlstmv + dog_move return onscary** (D-0739);
  **unicorn NOTONL + fail-tele + rloc track clear** (D-0731);
  **mon_allowflags + temple SANCT** (D-0732);
  **mfndpos worm_cross + rogue door-cut** (D-0733);
  **zhitu non-sleep + hero destroy_items AD_FIRE** (D-0734).
