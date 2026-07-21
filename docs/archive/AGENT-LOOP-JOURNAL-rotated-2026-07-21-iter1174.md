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

