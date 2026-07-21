# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## 2026-07-21 15:20 — #1168 nh_timeout generic uprops TIMEOUT

- Objective: seed4500 @1092 `#wizintrinsic` invulnerable `[30]` vs C bare.
- C locus: `timeout.c` `nh_timeout` — for all `u.uprops` TIMEOUT `--`.
- Change: `timeout.js` decrement remaining uprops TIMEOUT after
  dedicated arms; sync TIMEOUT_FLAT; expiry switch deferred (D-0928 #1168).
- Verification: green+strict PASS; cohort 38/38; Scr **1417→1419**;
  prefix **@1092→@1098**.
- Next: @**1098** Blind feel-floor map C altar `_` vs JS floor `·`.

## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 15:32 — #1170 public score cadence

- Objective: mandatory full `sessions` score @#1170 (÷5).
- C locus: n/a — docs/score only; primary remains @1151 Blind TIMEOUT.
- Change: Score refresh — **42**/44 Scr **11111**/11405 RNG
  **792838**/792838 (100%); speed `30+0.25/turn` (R² 0.86).
  Scr +87 vs @#1165 reflects #1166–#1169 seed4500 peels (1521/1814).
- Verification: green+strict PASS; full `sessions` 42/44.
- Next: seed4500 @**1151** `#wizintrinsic` Blind TIMEOUT JS `[23]`
  vs C `[119]` (D-0928).

## 2026-07-21 15:30 — #1169 Blind feel_location iron chain

- Objective: seed4500 @1098 Blind feel map `_` vs floor (misread altar).
- C locus: `display.c` `feel_location` / Blind `newsym` u_at.
- Change: `display.js` `feel_location`+`feel_newsym`+`set_seenv`;
  Blind newsym calls feel then display_self. `_` color 6 = chain
  (D-0928 #1169).
- Verification: green+strict PASS; cohort 5/5; Scr **1419→1521**;
  prefix **@1098→@1151**.
- Next: @**1151** `#wizintrinsic` Blind TIMEOUT JS `[23]` vs C `[119]`.

## 2026-07-21 15:20 — #1168 nh_timeout generic uprops TIMEOUT

- Objective: seed4500 @1092 `#wizintrinsic` invulnerable `[30]` vs C bare.
- C locus: `timeout.c` `nh_timeout` — for all `u.uprops` TIMEOUT `--`.
- Change: `timeout.js` decrement remaining uprops TIMEOUT after
  dedicated arms; sync TIMEOUT_FLAT; expiry switch deferred (D-0928 #1168).
- Verification: green+strict PASS; cohort 38/38; Scr **1417→1419**;
  prefix **@1092→@1098**.
- Next: @**1098** Blind feel-floor map C altar `_` vs JS floor `·`.

## 2026-07-21 15:10 — #1167 flags.pushweapon setuswapwep

- Objective: seed4500 @1053 carrots alt weapons vs JS bites.
- C locus: `wield.c` `dowield`/`wield_tool` — `flags.pushweapon` →
  `setuswapwep(oldwep)` after successful ready (no second prinv).
- Change: `wield.js` implement pushweapon in `dowield`+`wield_tool`
  (D-0928 #1167). Prior carrot wield then sword hit `doswapweapon`.
- Verification: green+strict PASS; cohort 19/19; Scr **1413→1417**;
  prefix **@1053→@1092**.
- Next: @**1092** `#wizintrinsic` invulnerable `[30]` TIMEOUT vs C bare.

## 2026-07-21 15:05 — #1166 unmap_object map_background + fight_empty

- Objective: seed4500 @1048 Blind map `:_` vs C DEC ROOM `~~`.
- C locus: `display.c` `unmap_object` (background not objects);
  `hack.c` `domove_fight_empty` always unmap.
- Change: `map_background` + fix `unmap_object`; fight_empty always
  unmap (+ boulder/statue remap); export `map_object` (D-0928 #1166).
- Verification: green+strict PASS; cohort 19/19; prefix **@1048→@1053**;
  Scr **1434→1413**.
- Next: @**1053** carrots alternate-weapons prinv vs bites.

## 2026-07-21 14:49 — #1165 public score + Blind ice diagnosis

- Objective: cadence full `sessions` @#1165; diagnose seed4500 @1048.
- C locus: `display.c` `feel_location` / Blind memory vs `map_object`
  (Punished chain + corpse); ICE typ still suspected under C `~~`.
- Change: docs only — Score **42**/44 Scr **11024**/11405 RNG
  **100%** `30+0.25/turn`; @1048 = 2 cells C ice vs JS `:`/`_`.
- Verification: green+strict PASS; focused seed4500 **1434**/1814.
- Next: C dump typ/glyph at map `(42,6)`/`(43,6)`, or port
  `feel_location` / ice persistence (D-0928).

## 2026-07-21 14:42 — #1164 makemon_appear_msg wizgenesis

- Objective: seed4500 @1034 invent `appears close by` vs C path.
- C locus: `makemon.c` !MM_NOMSG appear Norep (Amonnam +
  next2u(**requested** x,y) + MM_NOEXCLAM); `read.c`
  `create_particular_creation` has no caller pline.
- Change: drop invent create_particular appear; add
  `makemon_appear_msg` + await from creation (D-0928 #1164).
- Verification: green+strict PASS; cohort 36/36; Scr **1433→1434**;
  prefix **@1034→@1048**.
- Next: @**1048** Blind map `(41,7)`/`(42,7)` C `~~` vs JS `:_`.

## 2026-07-21 14:36 — #1163 waterbody_name Medusa shallow sea

- Objective: seed4500 @1001 C `shallow sea` vs JS `moat`.
- C locus: `pager.c` `waterbody_name` MOAT → `Is_medusa_level`
  / juiblex / samurai-qstart / hallu; ICE; waterlevel wall.
- Change: `hack.js` `waterbody_name` ports those arms; SURFACE_AT
  drawbridge still deferred (D-0928 #1163).
- Verification: green+strict PASS; cohort 36/36; Scr **1431→1433**;
  prefix **@1001→@1034**.
- Next: @**1034** C empty vs JS `A minotaur appears close by.`
  (`create_particular` invents pline).

## 2026-07-21 14:32 — #1162 zap_over_floor hissing-gas Norep

- Objective: seed4500 @997 C hissing gas vs JS fire-blast hits-you.
- C locus: `zap.c` `zap_over_floor` ZT_FIRE/is_pool → `Norep`;
  `hit` via objnam `The`.
- Change: async fire-pool Norep (+ Deaf/waterlevel/MOAT see_it);
  `hit_zap` uses objnam `The`; await from `dobuzz` (D-0928 #1162).
- Verification: green+strict PASS; cohort 36/36; Scr **1427→1431**;
  prefix **@997→@1001**.
- Next: @**1001** C `shallow sea` vs JS `moat` (`waterbody_name`).

## 2026-07-21 14:25 — #1161 wakeup wake_msg + growl

- Objective: seed4500 @985 JS nymph disarm vs C wakes up.
- C locus: `mon.c` `wake_msg`/`wakeup`; `sounds.c` `growl` →
  `wake_nearto` wake_msg.
- Change: async `wake_msg` before clear sleep; `was_sleeping` →
  dynamic-import `growl`; sounds `wake_nearto` awaits wake_msg
  (D-0928 #1161).
- Verification: green+strict PASS; cohort 36/36; Scr **1423→1427**;
  prefix **@985→@997**.
- Next: @**997** C `You hear hissing gas` vs JS fire-blast order.

## 2026-07-21 14:16 — #1160 score + lastseentyp savelev/getlev

- Objective: cadence full `sessions` + seed4500 @941 `#overview`
  extra Level-1 / Mines-5 fountains.
- C locus: `save.c`/`restore.c` Sfo/Sfi_schar `lastseentyp` with
  savelev/getlev; JS in-memory stash had omitted it.
- Change: `do.js` `goto_level` clone lastseentyp into `level_info`
  and restore on getlev (D-0928 #1160).
- Verification: green+strict PASS; cohort PASS; full `sessions`
  **42/44** Scr **11013**/11405 RNG **100%**; seed4500
  **1412→1423**; @941 OK.
- Next: seed4500 @985 wood nymph disarm vs wake (D-0928).

## 2026-07-21 14:12 — #1159 D-0928 goto_level climb great_effort

- Objective: seed4500 @929 C climb-stairs `--More--` vs JS Dlvl:6.
- C locus: `do.c` `goto_level` — `great_effort = Punished && !Levitation`
  + `u_locomotion("climb")` + Flying ladder " along".
- Change: `do.js` climb pline (Levitation/Flying helpers); poly
  locomotion / steed-flyer deferred.
- Verification: green+strict PASS; cohort 12/12; Scr **1409→1412**;
  prefix **@929→@941**.
- Next: seed4500 @941 `#overview` extra Level-1 fountain + Mines 5
  (D-0928).

