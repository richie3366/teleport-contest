# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#797 peel:** D-0715 `#invoke` — seed0108 **2958→3011**. Suite RNG
  3029→3112. Next @3011: after Mjollnir invoke, session keys `p␠␠#wizwish`
  — C attributes full turns to both spaces (EOT then more fleeck) before
  chest `rn2(36)`; JS starts chest early. Falsifier:
  `node scripts/rng-diff.mjs sessions/seed0108-wizard-extcmd-wishlist.session.json`
- **Falsified:** forcing `flags.rest_on_space=true` → regresses @2869
  (spaces that were `--More--` become `donull`). Don’t re-try global ROS.
- **D-0708 parked sharpen:** seed0014 @49039 mfndpos cnt 6 vs 5;
  C dest~(24,12); omit suspect `(22,10)`.
- **Don’t:** re-break D-0660…D-0715; invent nearby force for D-0710.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0715 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0658: hx=39 alone or link_doors + rect roomno gate → @14403.
- D-0665…D-0668/D-0673: TREE cmap; altar `{`; Warning floats; lit clear.
- D-0674/D-0675: gas `does_block` needs `clear_regions` on mklev.
- D-0676…D-0707: blue DSM / … / lookaround / kick / corpse_chance always-TRUE.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z (steal→return); don’t “always
  next lastinvnr”.
- `Fumbling()` ≡ H||E||uprops[FUMBLING]; not a sticky boolean.
- Water vault is `des.map` (wid=6→`rn2(73)`), not rectangular create_room.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.
- D-0710…15: `#rub`/cream/`#wipe`/`#polyself`/`drop_weapon`/`#invoke` —
  not pet AI. Mjollnir `inv_prop==0` → nothing_happens+ECMD_TIME only.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** **PASS** (suite **35/44** @#795).
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
  defsym `')'`=WEAPON `'('`=TOOL; Arc-goal **14** `des.object()`.
  Boots `oc_delay`=2; FUMBLE `Boots_on` → `incr_itimeout(HFumbling,rnd(20))`.
  `cantwield` ≡ nohands||verysmall; polymon always `drop_weapon(1)`.
  `#invoke` AC+EXT_CMDS; arti_invoke !inv_prop path only (D-0715).
