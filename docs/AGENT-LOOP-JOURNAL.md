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

## 2026-07-21 04:52 — #1107 movemon_singlemon S_EEL hideunder
- Objective: seed4500 @101608 C `rn2(4) @ movemon_singlemon` vs JS `rn2(40)`.
- C locus: `mon.c` `movemon_singlemon` eel arm → `hideunder`.
- Change: `mon.js` else-if S_EEL `!mundetected` `(mflee||!m_next2u)`
  `!canseemon` `!rn2(4)` → existing `hideunder` (was deferred).
- Verification: prefix **101608→101616** (runner RNG **101621** Scr
  **926**); green+strict PASS; cohort 7/7.
- Next: @**101616** C `rn2(5) @ distfleeck` vs JS `rnd(20) @ mattacku`.

## 2026-07-21 04:49 — #1106 u_rooted (brown mold)
- Objective: seed4500 @101391 C `distfleeck` `rn2(5)` vs JS `rn2(61)`.
- C locus: `hack.c` `u_rooted` / `domove_core` (mmove==0).
- Change: `cmd.js` `u_rooted` after attack path; spend turn, no step.
  Symptom was early `#wizwish` after omitted rooted `k` turns.
- Verification: prefix **101391→101608** (runner RNG **102013**);
  Scr **924**; green+strict PASS.
- Next: @**101608** `movemon_singlemon` `rn2(4)` vs JS `rn2(40)`.

## 2026-07-21 04:39 — #1105 score + passiveum + mhitm_ad_ston
- Objective: cadence full `sessions`; seed4500 @101373 C `passiveum`
  `d(2,6)` vs JS `rnd(21)` (D-0928).
- C locus: `mhitu.c` `passiveum`/`assess_dmg`/`hitmu`; `uhitm.c`
  `mhitm_ad_ston` mhitu arm.
- Change: `mhitu.js` `passiveum`+`assess_dmg` after damage; `hitmu`
  Upolyd mh gate; `mhitm_ad_ston_u` hitmsg+`!rn2(3)`.
- Verification: prefix **101373→101391** (runner RNG **101579**);
  Scr **924**; green+strict PASS; cohort 7/7; suite **42/44** Scr
  **10514** RNG **786142** (99.16%).
- Next: @**101391** `distfleeck` `rn2(5)` vs JS `rn2(61)`.

## 2026-07-21 04:35 — #1104 nolimbs ring put-on + doread check_capacity
- Objective: seed4500 @100699 C `rn2(46) @ rnd_otyp_by_namedesc` vs
  JS `rn2(5)` (D-0928) — misread; JS namedesc ran 14 calls late.
- C locus: `do_wear.c` `accessory_or_armor_on` `nolimbs`; `read.c`
  `doread` → `check_capacity`; `mondata.h` `nolimbs`.
- Change: `monsters.js` `nolimbs`/`M1_NOLIMBS`; ring cannot-stick
  before Right/Left yn; `doread` EXT_ENCUMBER → pline + ECMD_OK.
- Verification: prefix **100699→101373**; RNG **101373** Scr **926**;
  green+strict PASS; cohort 1500/1800/0108/5002/5006/0014/2600 **7/7**.
- Next: @**101373** `passiveum` `d(2,6)` vs `rnd(21)`; cadence @#1105.

## 2026-07-21 04:30 — #1103 polyself NOFLAGS + zap poly + drink empty-getobj
- Objective: seed4500 @100475 C `polyself` `rn2(20)` vs JS `rn2(5)`
  (D-0928).
- C locus: `polyself.c` `polyself`; `zap.c` `zapyourself`/`dozap`;
  `invent.c` `getobj` empty+!PROMPT.
- Change: system-shock + random `rn1(SPECIAL_PM)` in `polyself`;
  `zapyourself` WAN/SPE_POLYMORPH; `dozap` `nohands` before getobj;
  drink getobj short-circuit when no potions.
- Verification: prefix **100475→100699**; RNG **100862** Scr **926**;
  green+strict PASS; cohort 0002/0060/0108/1800 **4/4**.
- Next: @**100699** `rnd_otyp_by_namedesc` vs `rn2(5)`; cadence @#1105.

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
