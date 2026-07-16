# Agent loop journal (rotated at #635 score)

Older crumbs moved from live `AGENT-LOOP-JOURNAL.md` on 2026-07-16
during mandatory #635 formal score refresh.

## 2026-07-16 21:40 — #622 D-0562 botl rank_of titles
- Objective: seed0373 Scr 23/124 residual after D-0561 RNG full.
- C locus: botl.c xlev_to_rank/rank_of; role.c roles[].rank[9].
- Change: full title[9]; rank_of in botl/insight/questpgr; u_init
  stores urole.title (was sticky title[0] → Plunderer at Xp:3).
- Verification: seed0373 Scr **23→47**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0373 @41 print_dungeon menu; or seed5006 dosounds @8468.

## 2026-07-16 21:35 — #621 D-0560/61 endgame ^V-2 → air RNG full
- Objective: seed0373 @32479 getbones after `^V-2` from Fire plane.
- C locus: teleport.c In_endgame level_tele; dat/air.lua; mkmaze.c
  setup_waterlevel/movebubbles/mv_bubble; do.c deliver_splev_message.
- Change: endgame negative dest; load_air; monclass D/E/J map;
  bubbles+movebubbles boing; splev arrival msgs.
- Verification: seed0373 RNG **OK 35386**/35386 Scr 23/124; green+strict
  PASS; cohort **28**/28 PASS.
- Next: seed0373 screen residual; or seed5006 dosounds @8468.

## 2026-07-16 21:20 — #620 score + D-0559 Amulet wish
- Objective: mandatory full score (#620÷5); seed0373 @32473 makewish.
- C locus: allmain amulet_wish; objnam readobjnam any; makemon appear;
  do temperature_change_msg; zap makewish.
- Change: amulet_wish→makewish; empty/null→wrpsym rn2+mkobj; Wizard
  appear Norep; hellish hot pline. (Empty-wish≠cancel.)
- Verification: seed0373 32473→32479; green+strict PASS; #620 full
  **30/44** Scr 5901 RNG 350686 (44.23%) `31+0.14/turn`.
- Next: seed0373 getbones @32479 (`^V-2`); or seed5006 dosounds @8468.

## 2026-07-16 21:06 — #619 D-0558 endgame resurrect Wizard
- Objective: seed0373 @32419 C collect_coords rn2(8) vs JS rn2(12)
- C locus: do.c goto_level In_endgame+newdungeon+amulet→resurrect;
  wizard.c resurrect; makemon.c adj_lev/iswiz
- Change: js/wizard.js resurrect; do.js call; makemon Wizard adj_lev+iswiz
- Verification: rng-diff 32419→32473; runner RNG 32473/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @32473 makewish/readobjnam (ESC); or dosounds @8468
