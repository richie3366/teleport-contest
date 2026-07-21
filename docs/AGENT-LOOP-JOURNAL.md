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

## 2026-07-21 06:10 — #1113 eat key-desync (not getlev)
- Objective: seed4500 @103155 C fleeck vs JS `getlev` `rnd(10)`.
- C locus: `eat.c` `doeat`/`floorfood`/`is_edible` (session keys).
- Falsified: post-refuse `^V`/getlev as root. DIAG: after Count:40
  `.`, C `e` nothing-to-eat then SP+Count:20 `.`; JS floor apples +
  invent food → getobj eats Count:20 keys. Inediate `is_edible=false`
  advances to 104217 but contradicts C — not shipped.
- Verification: green+strict PASS; no js/ code change.
- Next: invent/floor food provenance vs C empty eat @103155.

## 2026-07-21 05:48 — #1112 ok_to_throw + mtimedone
- Objective: seed4500 @103155 C `rn2(5) @ distfleeck` vs JS `rnd(20)`.
- C locus: `dothrow.c` `ok_to_throw`; `timeout.c` `mtimedone`→`rehumanize`.
- Change: `dothrow.js` refuse `notake`/`nohands` before getobj;
  `timeout.js` decrement `mtimedone` + `polyself.js` `rehumanize`.
  DIAG: mold threw shield→`thitmonst`; after fix JS `^V`→`getlev`
  `rnd(10)` (prefix unchanged).
- Verification: green+strict PASS; cohort 5/5 (1500/1800/0060/0013/0361).
- Next: @**103155** C fleeck vs JS `getlev_catchup` `rnd(10)`.

## 2026-07-21 05:29 — #1111 select_newcham_form random while
- Objective: seed4500 @103071 C `rn2(3) @ select_newcham_form` vs JS `rn2(330)`.
- C locus: `mon.c` `select_newcham_form` random arm `while` (rogue uppercase gate).
- Change: `makemon.js` match C — only continue on `!validspecmon` when
  `tryct>40 && Is_rogue_level && !monsym_isupper`; else one `rn1` and
  `newcham` outer accept re-enters select (fresh cham `rn2(3)`).
- Verification: prefix **103071→103155** (runner RNG **103264** Scr
  **928**); green+strict PASS; cohort 5/5 (1500/1800/0013/0361/0373).
- Next: @**103155** C `rn2(5) @ distfleeck` vs JS `rnd(20)`.

## 2026-07-21 05:25 — #1110 cadence + minliquid eel monflee
- Objective: cadence full `sessions` + seed4500 @101710 postmov vs rn2(8).
- C locus: `mon.c` `minliquid_core` → `monflee(mtmp,2,FALSE,FALSE)`.
- Change: `mon.js` `minliquid` await `monflee` (was inline flee bits
  without `mon_track_clear`). Stale track forced JS `rn2(8)` track
  avoid while C hid in `postmov`.
- Verification: prefix **101710→103071** (runner RNG **103190** Scr
  **928**); green+strict PASS; cohort 5/5; full suite **42/44** Scr
  **10518** RNG **787753** (99.36%) speed `29+0.25/turn`.
- Next: @**103071** C `rn2(3) @ select_newcham_form` vs JS `rn2(330)`.

## 2026-07-21 05:15 — #1109 set_uasmon BLINDED FROMFORM
- Objective: seed4500 @101641 C nhlib shuffle vs JS rn2(61) (masked).
- C locus: `polyself.c` `set_uasmon` PROPSET(BLINDED, !haseyes).
- Change: `polyself.js` `propset_fromform(BLINDED, HBlinded, !haseyes)`.
  Sighted Monnam "The cockatrice" forced mid-turn More that ate
  `#version`; C Blind → "It bites! … It touches you!".
- Verification: prefix **101641→101710** (runner RNG **101871** Scr
  **928**); green+strict PASS; cohort 12/12.
- Next: @**101710** C `rn2(5) @ postmov` vs JS `rn2(8)`.

## 2026-07-21 05:04 — #1108 mfndpos eel nexttry
- Objective: seed4500 @101616 C `distfleeck` vs JS `mattacku` (masked).
- C locus: `mon.c` `mfndpos` nexttry — land eel clears `wantpool`.
- Change: `mon.js` `mfndpos` retry when `!cnt && wantpool && !is_pool`.
  Real split was @101612 C `postmov` hide vs JS 2nd fleeck (`cnt=0`).
- Verification: prefix **101616→101641** (runner RNG **101731** Scr
  **924**); green+strict PASS; cohort 12/12.
- Next: @**101641** C `rn2(3) @ nhlib.lua shuffle` vs JS `rn2(61)`.

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

