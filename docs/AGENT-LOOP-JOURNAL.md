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
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-21 04:23 — #1102 goodpos youmonst allows u_at (wizard ^T)
- Objective: seed4500 @100421 C `distfleeck` `rn2(5)` vs JS `rnd(79)`
  (D-0928).
- C locus: `teleport.c` `goodpos` / `teleok` / `scrolltele`.
- Change: `goodpos` no longer rejects `u_at` when `mtmp` is
  youmonst / swallowed ustuck / usteed. DIAG: wizard ^T getpos
  self on FOUNTAIN → JS `Sorry`→`safe_teleds`.
- Verification: prefix **100421→100475**; RNG **100613** Scr **926**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: @**100475** `polyself` `rn2(20)` vs `rn2(5)`; cadence @#1105.

## 2026-07-21 04:12 — #1101 water_damage Waterproof before luck rn2(20)
- Objective: seed4500 @100395 C `gush` `rn2(3)` vs JS `rn2(20)`
  (D-0928).
- C locus: `trap.c` `water_damage` / `Waterproof_container`;
  `fountain.c` `gush` → `water_damage_chain`.
- Change: port splash_lit / grease / towel / container arms before
  luck `rn2(20)`; add `Waterproof_container`. DIAG: floor CHEST at
  gush pool cell — C skips luck roll.
- Verification: prefix **100395→100421**; RNG **100477** Scr **926**;
  green+strict PASS; cohort 0002/0014/0060/0102/0700/1150/1800 **7/7**.
- Next: @**100421** `distfleeck` `rn2(5)` vs `rnd(79)`; cadence @#1105.

## 2026-07-21 04:09 — #1100 public score + check_caitiff
- Objective: mandatory full `sessions` score (@#1100 % 5 == 0);
  seed4500 @95154 Erinys abuse (D-0928).
- C locus: `uhitm.c` `check_caitiff` / `find_roll_to_hit`;
  `dokick.c` `kickdmg`.
- Change: port `check_caitiff` (knight helpless/flee + samurai
  peaceful); wire from `find_roll_to_hit` and `kickdmg`. Prefix
  **95154→100395** (FORCE abuse=2 canary matched).
- Verification: suite **42/44** Scr **10516**/11405 RNG **785042**
  (99.02%); seed4500 RNG **100479** Scr **926**; green+strict PASS;
  cohort knight/samurai/kick **9/9**.
- Next: @**100395** `gush` `rn2(3)` vs `rn2(20)`; cadence @#1105.

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

## 2026-07-21 03:37 — #1096 Count:N . wait + Blind feel
- Objective: seed4500 @89775 early `#pray` cmd/key desync (D-0928).
- C locus: `cmd.c` `parse`/`set_occupation`/`timed_occupation` +
  `donull` f_text "waiting"; `invent.c` `look_here` Blind arm.
- Change: `rhack` sets `multi=count-1`; `.`/`rest_on_space` →
  `set_occupation(donull,"waiting",multi)`; Blind feel pline/verb
  in `look_here`.
- Verification: prefix **89775→90492**; RNG **90604** Scr **815**;
  green+strict PASS; cohort 7/7.
- Next: @90492 post-tiger-kill feel `--More--` key sync (JS `e`
  vs C `distfleeck`).

## 2026-07-21 03:28 — #1095 public score + @89775 early #pray
- Objective: mandatory full `sessions` score (@#1095 % 5 == 0);
  peel seed4500 @89775 gethungry.
- C locus: `eat.c` `gethungry` (symptom); `pray.c` `dopray`
  (JS early); C session Count:20 wait @Dlvl1 Blind.
- Falsified: missing EOT `gethungry` / wrong accessorytime.
  Evidence: JS `dopray` @**89766** `p_type=3`→`uinvulnerable`
  skips `rn2(20)`; C next `#pray` @**90510** (no shimmer).
  Prior doprays 8690/61356/61518 matched C.
- Change: score docs only; DIAG removed; no production JS.
- Verification: green+strict PASS; suite **42/44** Scr
  **10397**/11405 RNG **774444**/792838 (**97.68%**)
  speed `33+0.26/turn`.
- Next: cmd/key desync before @89766 early `#pray` (post
  ^V-teleport / feel-floor / Count:20).

## 2026-07-21 03:24 — #1094 D-0928 dobuzz type<0 monkilled
- Objective: seed4500 @88399 corpse_chance rn2(2) vs JS rn2(6).
- C locus: `zap.c` `dobuzz` (`type < 0` → `monkilled`); `mon.c`
  `monkilled`/`mondied`/`corpse_chance`.
- Change: export `monkilled`; dobuzz mon-breath kill uses it (no
  `xkilled` treasure `rn2(6)`).
- Verification: prefix **88399→89775**; RNG **89881** Scr **807**;
  green+strict PASS; cohort 7/7.
- Next: @89775 C `gethungry` `rn2(20)` vs JS `rn2(67)`.

## 2026-07-21 03:22 — #1093 D-0928 fight_empty remembered I
- Objective: seed4500 @88377 linedup (D-0928).
- C locus: `hack.c` `domove_fight_empty` (I-glyph + !m_at + !nopick).
- Change: Blind Ctrl-j onto remembered `'I'` wastes turn like C;
  `unmap_object`+`newsym`. Place/flip already matched (#1092).
- Verification: prefix **88377→88399**; RNG **89887** Scr **806**;
  green+strict PASS; cohort 7/7.
- Next: @88399 C `corpse_chance` `rn2(2)` vs JS `rn2(6)`.

## 2026-07-21 03:05 — process: C dump when stuck (geometry)
- Objective: promote D-0928 #1092 learning into durable loop guidance.
- C locus: n/a (docs).
- Change: `GROK-PLAYBOOK` §7 + §9; `PORTING-RUNBOOK` diagnose §C.5;
  `agent-notes.mdc` when-to-write — prefer temp C locus dump over
  FORCE/screen-inferred geometry after two falsifications.
- Verification: n/a (docs-only).
- Next: loop agents follow playbook §7 on geometry peels.

## 2026-07-21 02:50 — #1092 D-0928 C flip dump falsifies last=77
- Objective: seed4500 medusa-3 place / @88377 (D-0928).
- C locus: `sp_lev.c` `flip_level` / `Flip_coord` / `place_lregion`.
- Change: temp C recorder dump — medusa-3 flip **sum81**, stair
  **(32,16)**, place rect**(40,3)-(45,8)** tries≡JS land**(43,6)**;
  last=77/sum80 dead. Restored `Flip_coord` inFlipArea+x; removed
  invented SpLev_Map flip. Recorder DIAG reverted.
- Verification: green+strict PASS; cohort 7/7; rng-diff still @88377.
- Next: linedup geometry with matched place; cadence @#1095.

## 2026-07-21 02:43 — #1091 D-0928 flip extras + stone78@83695 track
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level` (mgoal/EPRI/ESHK/doors/
  `level.monsters[][]`); `monmove.c` `m_move:1963`.
- Change: port Flip_coord(mgoal)+priest/shk + ungated door flip +
  `_level_monsters` swap. DIAG: stone78@83695 = track
  `rn2(4*(cnt-j))` JS cnt=8 vs C7 (j=0), mon@(44,13) u@(41,6) —
  not chcnt; baseline still @88377 (no last=77).
- Verification: green+strict PASS; cohort 7/7; rng-diff @88377.
- Next: C-cited last=77 without FORCE; cadence @#1095.

## 2026-07-21 02:35 — #1090 public score cadence
- Objective: mandatory full `sessions` score (@#1090 % 5 == 0).
- C locus: n/a (score-only; no JS port change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  Stable vs @#1085: **42/44**, Scr **10398**/11405, RNG
  **773047**/792838 (**97.50%**), speed `31+0.25/turn`.
  Non-PASS unchanged: seed2200 229/230; seed4500 @88377
  88484/108275 Scr 808/1814 (D-0928).
- Verification: green+strict PASS; full suite run complete.
- Next: D-0928 C-cited last=77 / stone78@83695 `m_move` rn2(28)
  vs rn2(32); cadence @#1095.

