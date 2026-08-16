# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.87) after cadence **#1345**;
  next @**#1350**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Must-fix empty; Open tut-1 `tut_key` / eckey is next.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5, deferred while Must-fix is open).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1064** tut-1 `des.teleport_region` → `levregion_add`
  + `fixup_special` dest copy (`LR_TELE`, exclude `-1` `del_islev`).
  Reviews **24** ACCEPT `3f376b74` (D-1063 food) and **25** ACCEPT
  `dc354c44` (D-1064 dests).
- **Next cluster:** Open — tut-1 `tut_key` / eckey only.
- **Hypothesis:** none live. Next falsifier is Open `tut_key` /
  `eckey` (C `nh.eckey` vs JS hardcoded hjkl / `>`).

## Don't re-check (≤15)

- Do not predict / amend / extra-commit **Addressed** HASH (chicken-egg).
  Stamp `D-NNNN` in the fix commit; the next real commit fills
  `git log --format=%h` of that fix. No stamp-only SHAs. Live
  `LOOP-QUEUE.md` is unchecked-only — run
  `node scripts/archive-loop-queue-done.mjs` in the same commit.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129); leading bold pads (D-0932).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen / SpLev_Map flip (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Do not re-stub TIN … furniture/HOLE (D-0954) … through
  hatch_egg (D-1036/D-1037) or drop `objects_at` (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- `shopdig(1)` skip snatch iff `um_dist || helpless || !bill`.
  Tutorial stash needs `setnotworn`. Do not default `sell_response`
  to `'a'`; do not “fix” `robbed -= offer`.
- Do not memcpy gi worn/ball pointers with struct you (D-1035).
  Do not drive `setnotworn` from `owornmask`/`setworn(null)` (D-1020).
  Do not `delobj` tutorial loot on leave. Do not fire off-level
  object timers (D-1037). Do not omit `msounds[]` (D-1053). Do not
  restore `getdir_whip` / `hurtle_apply` `teleds` (D-1038). Do not
  put `confdir` inside shared `getdir`. Do not skip `dosit`
  `else if (trap)` before `IS_THRONE` (D-1039). Do not restore live
  `m_at` as poleable (D-1040) / always-`tmiss` (D-1041) /
  base-`data.ac` (D-1042) / mulch `rn2(4)` (D-1043) /
  `u.questarti` (D-1044) / apply name clones (D-1045) /
  `light_cocktail` by-value (D-1046) / `spe--` unpaid (D-1047) /
  extra flat `u.Confusion` (D-1048) / gold splice (D-1049) /
  `void telekinesis` (D-1050) / wipe/`tmp_at` no-ops (D-1051) /
  `(u.Glib|0)&TIMEOUT` (D-1052) / parent-chain `cobj.where`
  (D-1054) / skip `in_water` or second `water_damage`→`uarmf`
  (D-1055) / sit `u.Underwater` (D-1056) / skip furniture
  sit_message (D-1057) / skip lava/ice/DRAWBRIDGE_DOWN sit or
  trap TT_LAVA as terrain lava (D-1058). Do not restore sit
  Fire/Cold H||E-only (D-1060); do not rewrite `confer_oc_oprop`
  to mirror every E* for that peel. Do not skip `mineralize`
  `In_endgame` before kelp (D-1059). Do not skip `mkstairs`
  `force` ROOM or raw-mkstairs tut-1 packed `des.stair` (D-1061).
  Do not restore raw `rn2(sx/sy)` nested tut-1 box contents or skip
  `delete_contents` after `mkbox_cnts` (D-1062). Do not restore
  `tut1_object` for tut-1 food or skip `create_object` `corpsenm` /
  `find_montype` gender RNG for `montype` (D-1063). Do not restore
  tut-1 `updest`/`dndest` copy or exclude `0,0,0,0` (D-1064).

## Landmarks (≤15)

- Suite after cadence **#1345**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.87). Next @**#1350**.
- **D-1064:** tut-1 `des.teleport_region` `{9,3,9,3}` →
  `levregion_add` + `fixup_special` dest copy. `place_lregion`
  from `u_on_rndspot`. Review **25** ACCEPT `dc354c44`.
- **D-1063:** tut-1 packed apple/candy/lichen → `l_create_object`
  / `create_object` (buc 4, montype pmnames, CORPSE spe=lflags).
  Review **24** ACCEPT `3f376b74`.
- **D-1062:** tut-1 packed large box + nested wand → `l_create_object`
  / `create_object` (DRY `get_location_coord`, `delete_contents`,
  container_obj). Review **23** ACCEPT `3ca1b544`.
- **D-1061:** tut-1 packed `des.stair` → `l_create_stairway`
  (deltrap, SpLev_Map, `mkstairs` force). Tutorial is dlevel 1 of 2.
  Review **22** ACCEPT `05915d9b`.
- **D-1060:** sit Fire/Cold OR `uprops[FIRE_RES]`/`[COLD_RES]`
  (worn ring `d(2,10)`). Review **21** ACCEPT `ecd37108`.
