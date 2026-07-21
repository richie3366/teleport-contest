# Rotated from AGENT-LOOP-JOURNAL.md @#1113

## 2026-07-21 04:05 — #1099 adj_erinys infra; abuse path TBD
- Objective: seed4500 @95154 newmonhp `d(13,8)` vs `d(10,8)` (D-0928).
- C locus: `mon.c` `adj_erinys`; `attrib.c` `adjalign`; `mon.c`
  `setmangry`; `mthrowu.c` `ohitmon`; `makemon.c` `adj_lev`.
- Change: port adj_erinys/reset; wire adjalign; setmangry→adjalign;
  ohitmon setmangry; adj_lev live mlevel. Falsified: ohitmon alone
  supplies abuse. FORCE abuse=2 → prefix **100395**.
- Verification: still @**95154** (abuse=0); green+strict PASS; cohort
  0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: find C path that yields `ualign.abuse==2` before Erinys.

## 2026-07-21 03:54 — #1098 peffect_extra_healing + Blind timeout
- Objective: seed4500 @90543 wish/extra_healing (D-0928).
- C locus: `potion.c` `peffect_extra_healing`/`healup`/`make_blinded`;
  `timeout.c` BLINDED; `invent.c` `learn_unseen_invent`.
- Change: port peffect_extra_healing; nh_timeout BLINDED expiry;
  healup→make_blinded→learn_unseen_invent; hold observe via Blind().
- Verification: prefix **90543→95154**; RNG **95188** Scr **903**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: @95154 C `newmonhp` `d(13,8)` vs JS `d(10,8)`.

## 2026-07-21 03:45 — #1097 annotation + hitmu stop + wiz Blind
- Objective: seed4500 @90492 post-feel key desync (D-0928).
- C locus: `dungeon.c` `print_level_annotation`; `mhitu.c` `hitmu`
  `stop_occupation`; `hack.c` `monster_nearby`/`canspotmon`;
  `wizcmds.c` BLINDED → `make_blinded` (no Timeout pline).
- Change: wire annotation from `goto_level`; always stop_occupation
  in hitmu; nearby via canspotmon; wiz BLINDED silent when Blind.
- Verification: prefix **90492→90543**; RNG **91186** Scr **841**;
  green+strict PASS; cohort 7/7.
- Next: @90543 C `peffect_extra_healing` `d(4,8)` vs JS `rn2(12)`.
