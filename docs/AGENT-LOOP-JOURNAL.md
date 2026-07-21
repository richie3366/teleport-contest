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

## 2026-07-21 09:07 — #1125 score cadence + @106838 hypothesis
- Objective: mandatory full `sessions` @#1125; sharpen seed4500 peel.
- C locus: `monmove.c:1963` `rn2(4*(cnt-j))` (track skip in `m_move`).
- Change: no `js/` patch. Score **42/44** Scr **10529**/11405 RNG
  **791421**/792838 (99.82%) speed `31+0.25/turn`. @106838 is same
  site — C arg 20 vs JS 32 ⇒ cnt−j 5 vs 8 (mfndpos/`mtrack`), not a
  missing literal rn2(32).
- Verification: green+strict PASS; full sessions documented in CURRENT.
- Next: dump C/JS `cnt`/`j`/`mtrack` at track-skip; cadence @#1130.

## 2026-07-21 09:03 — #1124 dowear verysmall/nohands
- Objective: seed4500 @106540 Unchanging wear vs C (invent-letter hyp).
- C locus: `do_wear.c` `dowear` verysmall/nohands → "Don't even bother."
- Change: C wish letter `t` then `W` while brown-mold rejects Wear;
  `t`/`z` become throw/zap. JS deferred the gate → put on Unchanging.
  Port early reject; invent-letter theory falsified.
- Verification: green+strict PASS; cohort 6/6; prefix **106540→106838**
  (runner RNG **106858** Scr **939**).
- Next: @**106838** C `m_move` `rn2(20)` vs JS `rn2(32)`; cadence @#1125.

## 2026-07-21 08:58 — #1123 castmu PSI_BOLT→mdamageu/rehumanize
- Objective: seed4500 @106540 C fleeck rn2(5) vs JS rn2(25).
- C locus: `mcastu.c` `mcast_psi_bolt`/`mdamageu`; `polyself.c` `rehumanize`.
- Change: burn+apply PSI_BOLT/OPEN_WOUNDS; `mdamageu`→`rehumanize`;
  Unchanging+mh<1→`done(DIED)`. Still @106540: JS wears wished
  amulet of unchanging (savelife keeps Upolyd); force-ignore
  Unchanging → **106540→106838**. Courage hyp falsified.
- Verification: green+strict PASS; cohort 4/4; prefix still **106540**.
- Next: Put-on / invent-letter for amulet of unchanging vs C.

## 2026-07-21 08:28 — #1122 mattacku AT_MAGC→castmu
- Objective: seed4500 @106536 C choose_monster_spell rn2(23) vs JS rn2(5).
- C locus: `mhitu.c` `mattacku` AT_MAGC → `castmu`; `mcastu.c` dmg dice.
- Change: JS omitted AT_MAGC (default no-op). Wired castmu/buzzmu;
  burn `d((ml/2)+1,6)` before deferred mcast_spell.
- Verification: green+strict PASS; cohort 6/6; prefix **106536→106540**
  (runner RNG **106559** Scr **937**).
- Next: @**106540** C fleeck rn2(5) vs JS rn2(25); cadence @#1125.

## 2026-07-21 08:19 — #1121 set_uasmon MR_* + getmattk lich cold
- Objective: seed4500 @106531 C hitmu d(2,6) vs JS d(3,6).
- C locus: `polyself.c` `set_uasmon` resist_from_form; `mhitu.c` `getmattk` lich cold→PHYS.
- Change: brown-mold poly omitted COLD_RES FROMFORM; master lich stayed 3d6.
  Port MR_* PROPSETs + getmattk cold-resist arm (mdef null=hero).
- Verification: green+strict PASS; cohort 6/6; prefix **106531→106536**
  (runner RNG **106546** Scr **937**).
- Next: @**106536** C `choose_monster_spell` rn2(23) vs JS rn2(5); cadence @#1125.

## 2026-07-21 08:12 — #1120 score + tactics + fire destroy_items
- Objective: cadence full `sessions`; seed4500 @106304 fleeck vs lined_up.
- C locus: `wizard.c` `tactics`/`strategy`; `monmove.c` `dochug`;
  `trap.c` `trapeffect_fire_trap` → `destroy_items`.
- Change: covetous `tactics` STRAT_NONE before fleeck; fire-trap
  `destroy_items(AD_FIRE)` after burnarmor (dynamic import).
- Verification: green+strict PASS; cohort 6/6; prefix **106304→106531**
  (runner RNG **106540** Scr **937**); suite **42/44** Scr **10527**
  RNG **791103** (99.78%).
- Next: @**106531** C `hitmu` `d(2,6)` vs JS `d(3,6)`; cadence @#1125.

## 2026-07-21 07:56 — #1119 S_BAT Inhell MFAST
- Objective: seed4500 @104705 bat@46 mcalcmove 12vs24.
- C locus: `makemon.c` S_BAT / `Inhell` / `is_bat` → `mon_adjust_speed(...,2)`.
- Change: C dump — fmon order matched; bat mspeed MFAST vs JS 0.
  Port `is_bat` + S_BAT hell arm (`permspeed`/`mspeed` MFAST).
- Verification: green+strict PASS; cohort 5/5; prefix **104705→106304**
  (runner RNG **106354** Scr **939**).
- Next: @**106304** C fleeck vs JS `m_lined_up` rn2(25); cadence @#1120.

## 2026-07-21 07:35 — #1118 bat@46 mcalcmove (falsify fleeck rn2(4))
- Objective: seed4500 @104705 C fleeck rn2(5) vs JS rn2(4).
- C locus: `mon.c` `mcalcmove` / `mcalcdistress`; `allmain.c` EOT allot.
- Change: none shipped. DIAG: JS rn2(4)=early `decide_to_shapeshift`;
  missing vamp-bat @46,19 2nd move (mcalcmove add 12 needs 24).
  Leftover after getlev=0; n=140. FORCE +12 →104943 (reverted).
- Verification: green+strict PASS; rng-diff still @104705.
- Next: C why bat@46 mcalcmove slot is 24 (fmon order); cadence @#1120.

## 2026-07-21 07:23 — #1117 carrying_too_much
- Objective: seed4500 @104241 C fleeck vs JS overexertion rn2(20).
- C locus: `hack.c` `carrying_too_much` / `domove_core`.
- Change: C dump falsified umov<12 theory (both after=12 OVERLOADED).
  Port `carrying_too_much` before attack — mold `l` collapses, no overexertion.
- Verification: green+strict PASS; cohort 5/5; prefix **104241→104705**
  (runner RNG **104797** Scr **936**).
- Next: @**104705** C fleeck rn2(5) vs JS rn2(4); cadence @#1120.

## 2026-07-21 07:05 — #1116 break_armor nohands shed
- Objective: seed4500 @104241 C fleeck vs JS rn2(20).
- C locus: `polyself.c` `break_armor` nohands/verysmall gloves/helm/boots.
- Change: port glove (+drop_weapon)/shield/helm/boots shed; DIAG showed
  JS overexertion vs C fleeck — fungus Fast roll0 leaves JS umov=12.
- Verification: green+strict PASS; cohort 4/4; prefix still **104241**.
- Next: C-state umovement/wtcap at that u_calc; cadence @#1120.

## 2026-07-21 06:45 — #1115 mfind0 + wizwhere (score cadence)
- Objective: public score @#1115; seed4500 @104217 exercise peel.
- C locus: `detect.c` `mfind0`; `dungeon.c` `print_dungeon(FALSE)`; `wizcmds.c` `wiz_where`.
- Change: port `mfind0` (search find-unseen → exercise); wire `#wizwhere` text pages so pager `s` does not leak into rhack.
- Verification: suite **42/44** Scr **10516**/11405 RNG **788815**/792838 (99.49%) `31+0.24/turn`; prefix **104217→104241** (runner **104252** Scr **926**); green+strict PASS; cohort 5/5.
- Next: @**104241** C fleeck vs JS `rn2(20)`.

## 2026-07-21 06:28 — #1114 hitmu hidden-under More
- Objective: seed4500 @103155 invent/floor food vs C empty eat.
- C locus: `mhitu.c` `hitmu` mundetected hides_under/eel reveal.
- Change: #1113 misread — C `e`s were `--More--` quitchars (both
  have floor apples). Port `hitmu` “was hidden under” pline so gold-
  coins More aligns; stop early `doeat` key-desync.
- Verification: prefix **103155→104217** (runner RNG **104364** Scr
  **928**); green+strict PASS; cohort 5/5.
- Next: @**104217** C `rn2(19) @ exercise` vs JS `rn2(5)`.

