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

## 2026-07-16 00:26 — #454 seed0004 @297 autodescribe stairs (D-0423)
- Objective: seed0004 @297 PRIMARY — C `staircase down` vs JS blank
  after travel `_>` getpos.
- C locus: `optlist.h` autodescribe default On; `getpos.c`
  `auto_describe` → lookat cmap; `defsym.h` S_*stair explanations.
- Change: `jsmain` default `iflags.autodescribe: true`; `getpos`
  `auto_describe_text` stairs/ladder firstmatch.
- Verification: seed0004 Scr **391→395**/409; @297 fixed; miss
  @310 `dart trap`; RNG full; green+strict; cohort **25/25**.
- Next: seed0004 @310 whatis `brief_at` / trap_description.

## 2026-07-15 19:43 — #453 seed0004 @288 message_menu (D-0422)
- Objective: seed0004 @288 PRIMARY — C invent
  `o - a scroll…--More--` vs JS corner `Scrolls` heading.
- C locus: `invent.c` `display_pickinv` n==1; `wintty.c`
  `tty_message_menu`; `getline.c` `xwaitforspace` dismiss_more.
- Change: getobj `?` with `strlen(lets)==1` → `message_menu`
  PICK_ONE + `more` dismiss_more; not corner NHW_MENU.
- Verification: seed0004 Scr **390→391**/409; @288 fixed; miss
  @297 `staircase down`; RNG full; green+strict; cohort **25/25**.
- Next: seed0004 @297 getpos autodescribe stairs.

## 2026-07-15 19:34 — #452 choose_ring_hand yn [rl] (D-0421)
- Objective: seed0004 @285 PRIMARY — C `…Left? [rl]` vs JS without
  choices.
- C locus: `do_wear.c` `accessory_or_armor_on`; `decl.c`
  `rightleftchars`; `win/tty/topl.c` `tty_yn_function`.
- Change: `choose_ring_hand` → `yn_function(q,'rl','\0')`;
  `yn_function` treats `'\0'` def like C (no `(c)`, return def).
- Verification: seed0004 Scr **389→390**/409; @285 fixed; miss
  @288 invent More; RNG full; green+strict; cohort **25/25**.
- Next: seed0004 @288 invent long scroll `--More--` vs corner
  `Scrolls` heading.

## 2026-07-15 19:30 — #451 RING xname descr (D-0420)
- Objective: seed0004 @277 PRIMARY — C `an engagement ring` vs JS
  `a ring of conflict` (look_here).
- C locus: `objnam.c` `xname_flags` RING_CLASS (`nn` / `dn`).
- Change: `objnam.js` `pretty_base` RING — `oc_name_known` only
  (not `obj.known`); dknown+!nn → `<descr> ring`.
- Verification: seed0004 Scr **382→389**/409; miss @277→@285; RNG
  full; green+strict; cohort **25/25**.
- Next: seed0004 @285 `choose_ring_hand` yn `[rl]` via C
  `yn_function`/`rightleftchars`.

## 2026-07-15 19:20 — #450 score + map_trap tseen (D-0419)
- Objective: mandatory full `sessions` (#450÷5); seed0004 @248 PRIMARY —
  C trap `^` vs JS floor.
- C locus: `display.c` `map_trap` / `_map_location`; `defsym.h` trap
  PCHARs; `display.h` `covers_traps`.
- Change: `display.js` `trap_glyph` + `map_trap` wired into
  `map_location`/`newsym` when `tseen && !covers_traps`. Hallu trap
  glyphs deferred.
- Verification: full score **25/44** Scr **4336**/11405 RNG
  **263155**/792838 `22+0.13/turn`; seed0004 Scr **254→382**/409
  (miss @248→@277); green+strict; cohort **25/25**.
- Next: seed0004 @277 look_here `an engagement ring` vs
  `a ring of conflict`.

## 2026-07-15 19:12 — #449 seed0004 @240 WEAPON poisoned xname (D-0418)
- Objective: seed0004 @240 PRIMARY — C `a - 10 darts` /
  `b - a poisoned dart` vs JS `a - a dart` / `b - 10 darts`.
- C locus: `objnam.c` xname WEAPON poisoned; doname_base strip;
  `invent.c` loot_xname → sortloot.
- Change: `objnam.js` `is_poisonable_obj` + `poisoned ` in
  pretty_base; doname strip/reinsert before erosion/spe.
- Verification: seed0004 Scr **245→254**/409; miss @240→@248; RNG
  full; green+strict PASS; cohort **25/25**.
- Next: seed0004 @248 trap `^` vs `.`.

## 2026-07-15 19:04 — #448 seed0004 @239 Ysimple_name2 emptymsg (D-0417)
- Objective: seed0004 @239 PRIMARY — C `The bag is empty.` vs JS
  `the bag is empty.`
- C locus: `pickup.c` `use_container` emptymsg/`pline1`;
  `objnam.c` `Ysimple_name2`.
- Change: `pickup.js` `simpleonames`/`ysimple_name`/`Ysimple_name2`;
  preformat emptymsg when `!outokay`; loot-out empty uses it.
- Verification: seed0004 Scr **244→245**/409; miss @239→@240; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @240 floor pickup `10 darts` vs `a dart`.

## 2026-07-15 18:58 — #447 seed0004 @182 cursemsg canseemon (D-0416)
- Objective: seed0004 screen-only PRIMARY — first cell miss after full RNG.
- C locus: `dogmove.c` `dog_move` cursemsg `(wasseen || canseemon)`;
  `display.h` `_canseemon`.
- Change: replace always-true local `canseemon` stub in `dogmove.js`
  with `display.canseemon` (LOS + mon_visible). Out-of-sight cursed
  pet step no longer plines.
- Verification: seed0004 Scr **243→244**/409; miss @182→@239; RNG
  full; green+strict PASS; cohort **23/23**.
- Next: seed0004 @239 `The bag is empty.` vs `the bag is empty.`
  (`Ysimple_name2` / upstart).

## 2026-07-15 18:50 — #446 seed0004 throw carrot feed (D-0415)
- Objective: seed0004 @11722 PRIMARY — C `next_ident` vs JS `distfleeck`.
- C locus: dothrow.c thitmonst befriend; dog.c tamedog mtame+obj;
  dogmove.c dog_eat; mondata.h befriend_with_obj.
- Change: getobj_throw `*` pickinv; throwit mon-hit food→tamedog;
  tamedog already-tame dogfood/dog_eat (before mtame<10 bump).
- Verification: seed0004 RNG **12084**/12084; Scr **243**/409;
  green+strict PASS; cohort **25/25**.
- Next: seed0004 screen-only peel (cells 243/409).

## 2026-07-15 18:34 — #445 score + dog ALLOW_U mattacku (D-0414)
- Objective: mandatory full `sessions` score (#445÷5); seed0004 @11708
  PRIMARY — C `mattacku` vs JS `distfleeck`.
- C locus: `dogmove.c` newdogpos `ALLOW_U`→`mattacku`; not bare dochug.
- Change: `dogmove.js` chosen-candidate `ALLOW_U` attacks hero then
  `MMOVE_DONE` (leash-break pline stub; full `m_unleash` deferred).
- Verification: full score **25/44** Scr **4194**/11405 RNG
  **262860**/792838 `21+0.13/turn`; seed0004 prefix **11708→11722**
  (RNG 11790); green+strict; cohort **25/25**.
- Next: seed0004 @11722 `next_ident` vs `distfleeck`.

## 2026-07-15 18:30 — #444 seed0004 Conflict fightm (D-0413)
- Objective: seed0004 @11568 PRIMARY — C `resist_conflict` vs JS
  `distfleeck` mid-travel.
- C locus: `mon.c` `movemon_singlemon` Conflict→`fightm`; `mhitm.c`
  `fightm`; `monmove.c` `dochug` `hero_conflict` + PHASE FOUR.
- Change: port `fightm` (always `resist_conflict`); wire before
  `dochugw`; dochug uses `hero_conflict` + peaceful P4 resist.
- Verification: seed0004 prefix **11568→11708** (RNG 11774); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11708 `mattacku` vs `distfleeck`.

## 2026-07-15 18:20 — #443 seed0004 findtravelpath (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `hack.c` `findtravelpath` / `test_move(TEST_TRAV)` boulder delay.
- Change: falsified after_calc/leftover theory (DIAG 9→21 UNENC). Root:
  hero→dest BFS walked onto boulder. Ported dest→hero BFS + `dirs_ord`
  + boulder-node skip + `TRAVP_GUESS` fallback in `cmd.js`.
- Verification: seed0004 prefix **10966→11568** (RNG 11662); green+strict
  PASS; cohort **25/25**.
- Next: seed0004 @11568 `resist_conflict` vs `distfleeck`.

## 2026-07-15 18:05 — #442 seed0004 @10966 after_calc diag (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `allmain.c` `u_calc_moveamt` / EOT; `hack.c` near_capacity.
- Change: diagnosis only (DIAG/FORCE removed). Invent @miss: inv=-15
  owt≡live; force after=9|leftover0+SLT|before=-3+UNENC→10979. Heal
  frame 51 double-EOT syncs 9→21 both sides — leftover0-alone falsified
  as sole cause. C second gethungry @10977 proves after<12 at miss EOT.
- Verification: green+strict PASS; seed0004 still @10966.
- Next: before=9⇒need EXT/mmove anomaly, or post-heal leftover→0 + ≥16
  aum SLT gap (BoH factor wrong direction).

## 2026-07-15 17:45 — #441 seed0004 @10966 after_calc diag (D-0412)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`.
- C locus: `allmain.c` `u_calc_moveamt` / EOT; `hack.c` near_capacity.
- Change: diagnosis only (DIAG removed). Reconfirmed force leftover0+SLT
  / after=9 →10979; SLT|leftover0 alone no. JS sticky 9→21 UNENC since
  heal; inv=-15; !usteed. Silent 0→12 vs 9→21 possible under UNENC.
- Verification: green+strict PASS; seed0004 still @10966.
- Next: ≥16 aum inv/cap gap at miss; or how C leftover →0 after heal.

