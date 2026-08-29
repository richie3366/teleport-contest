# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — review D-1612–D-1620 (audit #2020)

**Objective:** C-fidelity review of nine `js/` SHAs since **572**;
cadence score. No `js/` edits.
**C locus:** yn ^P; `get_count` historicmsg; `restore_msghistory`;
`consume_obj_charge` known; `reset_hostility`; dog_move
`lose_guardian_angel`; MS_HUMANOID; `take_off`; floor
`query_classes`.
**JS locus:** reviews **573–581** (`7012e194`…`cb4d8a91`).
**Change:** ACCEPT-WITH-DEBT 573–581. No QUALITY-RISK / Must-fix.
Filled archive D-1620 `%h` `cb4d8a91`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`39+0.30/turn` (R² 0.853) at `cb4d8a91`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 573-581`.
**Next:** Open `adjust_split`. Not get_count.
**Blocked:** none.

## 2026-08-29 — D-1620 pickup.c floor query_classes

**Objective:** Open `pickup.c` floor `query_classes` (named). Not
traditional_loot.
**C locus:** `pickup.c` `pickup` `:793–891`; `query_classes`
`:140–262`; `hack.h` ynaq/ynNaq; `count_unpaid` nobj.
**JS locus:** `js/pickup.js` `pickup` / `pickup_traditional_floor` /
`query_classes`.
**Change:** TRADITIONAL && !menu_requested && ct>=2: There +
query_classes getlin then yn/`pickup_object` (default `'y'`). `'m'`
→ query_objlist allow_all/-3. `count_unpaid` for `'u'`. hideunder /
`safe_qbuf` / engulfer named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST.
Not get_count.
**Blocked:** none.

## 2026-08-29 — D-1619 do_wear.c take_off occupation

**Objective:** Open `do_wear.c` `take_off` occupation (named). Not
ggetobj.
**C locus:** `do_wear.c` `take_off` `:2899–2987`; `do_takeoff`
`:2823–2896`; `takeoff_order` `:17–21`; caller `doddoremarm`
`:3050`; `Amulet_off` `:1089–1189`.
**JS locus:** `js/do_wear.js` `take_off` / `do_takeoff` /
`Amulet_off`.
**Change:** occupation walks `takeoff_order` with `oc_delay` (cloak/
suit extra, start `--`); `do_takeoff` I_SPECIAL then cursed+`*_off`;
continue `'A'` `set_occupation`. ESP/`RESTFUL_SLEEP` `Amulet_off`.
`menu_remarm` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `pickup.c` floor `query_classes`. Not traditional_loot.
**Blocked:** none.

## 2026-08-29 — D-1618 sounds.c peaceful MS_HUMANOID

**Objective:** Open `sounds.c` peaceful MS_HUMANOID (named). Not
mplayer_talk.
**C locus:** `sounds.c` `domonnoise` MS_HUMANOID `:1025–1104`;
MS_ORC remap `:705–709`; epilogue `:1222–1241`.
**JS locus:** `js/sounds.js` `domonnoise`.
**Change:** hostile else `"threatens you."` then peaceful
flee/moan/Huh/blind/trapped/hungry/race switch; MS_ORC `same_race`
or Hallu remaps so gnome gag is reachable. Epilogue `verbalize`
not invented `says:`. MS_BOAST named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **34**/34; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `do_wear.c` `take_off` occupation. Not ggetobj.
**Blocked:** none.

## 2026-08-29 — D-1617 dogmove.c Conflict lose_guardian_angel

**Objective:** Open `dogmove.c` Conflict `lose_guardian_angel` caller
(named). Not gain_guardian_angel.
**C locus:** `dogmove.c` `dog_move` `:1046–1053`; callee
`minion.c` `lose_guardian_angel` `:467–494` (D-1608).
**JS locus:** `js/dogmove.js` `dog_move`; body `js/minion.js`.
**Change:** Conflict `!edog` awaits `lose_guardian_angel(mtmp)` then
`MMOVE_DIED` instead of returning DIED with the angel still on the
map. C is 8 lines (density exception). dismount_steed DISMOUNT_THROWN
named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004 Conflict).
**Next:** Open `sounds.c` peaceful MS_HUMANOID. Not mplayer_talk.
**Blocked:** none.

## 2026-08-29 — D-1616 priest.c reset_hostility

**Objective:** Open `mon.c` `reset_hostility` (named). Not
gain_guardian_angel. (C is `priest.c`; caller `do.c` `final_level`.)
**C locus:** `priest.c` `reset_hostility` `:754–768`; caller
`do.c` `final_level` `:2046` `iter_mons`.
**JS locus:** `js/priest.js` `reset_hostility`; `js/do.js`
`final_level`.
**Change:** isminion aligned cleric/angel whose emin.min_align
differs from hero align becomes hostile then set_malign; always
newsym after those checks. Astral `madeNew` walks fmon first.
ACH_ASTR named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open dogmove Conflict `lose_guardian_angel` caller. Not
gain_guardian_angel.
**Blocked:** none.
