## 2026-07-16 01:40 — #462 SCR_LIGHT litroom (D-0431)
- Objective: seed0002 @6186 C `exercise` rn2(19) vs JS rn2(5) (PRIMARY).
- C locus: `read.c` `seffects`/`seffect_light`/`litroom`/`set_lit`;
  `makeknown`→`discover_object` credit_hero; `zap.c` `lightdamage`.
- Change: JS gated SCR_LIGHT unimplemented (`return 0`); C read
  light scroll `t` exercises WIS twice (seffects + learnscroll) then
  fleeck. Ported seffect_light/litroom/set_lit + wire SCR_LIGHT.
- Verification: seed0002 prefix **6186→6954**; Scr **99→126**/595;
  RNG matched **7649**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @6954 remove-curse read (`v` / “helping you”).
## 2026-07-16 01:30 — #461 drink getobj/? + trycall (D-0429/D-0430)
- Objective: seed0002 @4565 pet udist invent vs !rn2(4) (PRIMARY).
- C locus: `invent.c` getobj `?`; `potion.c` peffect_see_invisible/
  fruit juice + dopotion trycall; `do_name.c` docall; peffect_paralysis.
- Change: root was not dog_goal — JS `getobj_drink` cancelled on `?`,
  so call-name keys (incl. `l`) became walk; hero east → udist=4.
  Port display_pickinv_reply for drink `?`/`*`; fruit juice / see
  invisible + trycall/docall; paralysis `rn1(10,25-12*bcsign)`.
- Verification: seed0002 prefix **4565→6186**; Scr **54→99**/595;
  RNG matched **6851**/27158; green+strict; cohort **26/26**.
- Next: seed0002 @6186 C `exercise` vs JS `rn2(5)`.


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

## 2026-07-15 17:30 — #440 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: remasured suite post D-0408…D-0411 — still **25/44** PASS;
  screens **4196**/11405 (unchanged); RNG 261626→**262087**/792838;
  speed `21+0.13/turn` (R² 0.82). Green+strict PASS.
- Verification: `node frozen/ps_test_runner.mjs sessions`; seed0004
  still FAIL @10966 (RNG 11029/12084, Scr 242/409); seed0002 RNG 5199.
- Next: seed0004 @10966 after_calc<12 (weight/leftover+SLT|EXT).

## 2026-07-15 17:15 — #439 seed0004 @10966 youmonst/moveloop (D-0411)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`
  exercise; umovement after_calc.
- C locus: `u_init.c` umonnum/set_uasmon basic; `allmain.c` encumber_msg
  + mvl_wtcap after monsters.
- Change: basic `youmonst.data`; moveloop order. Experiments: need
  after_calc<12 (leftover0+SLT or leftover9+EXT); inv=-15 barely under.
- Verification: seed0004 still @10966; green+strict PASS; cohort 23/23.
- Next: ≥16 aum weight/cap gap or heal leftover desync + SLT.

## 2026-07-15 17:00 — #438 seed0004 @10713 gethungry (D-0410)
- Objective: seed0004 @10713 PRIMARY — C `exercise` `rn2(19)` vs JS
  `rn2(2)` after lichen eat EOT.
- C locus: `eat.c` `gethungry` metabolic `uhunger--` + accessorytime
  odd/even Regen/encumb/Hunger/Conflict.
- Change: `eat.js` `gethungry` diet via `hero_form_data`; accessory
  burns; `monsters.js` `metallivorous`. Ring/amulet + `newuhs` deferred.
- Verification: seed0004 RNG 11027→11029; prefix 10713→10966; miss
  @10966 C `distfleeck` vs JS `dopush` exercise (umove=21); green+strict
  PASS; cohort 25/25.
- Next: seed0004 @10966 umovement / encumbrance drift.

## 2026-07-14 18:12 — D-0286/87 mswings + botl HP clamp

- Objective: seed0030 Scr 103/1953 (CURRENT primary); first miss @62.
- C locus: `mhitu.c` `mswings`/`mswings_verb`/`hitval`; `botl.c` hp<0→0.
- Change: AT_WEAP melee calls `hitval` + `mswings` before hit/miss
  (D-0286); status line clamps negative HP for display (D-0287).
- Verification: Scr@62 topline+HP match; prefix miss **62→75**;
  Scr **103→116**; RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@75 death `--More--` vs invent-identify yn; or seed0013.


<!-- rotated from AGENT-LOOP-JOURNAL.md #457 -->
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
