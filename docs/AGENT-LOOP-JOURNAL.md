# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

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

## 2026-07-16 01:08 — #460 score + seed0002 @4565 diagnose (D-0429)
- Objective: mandatory full score (#460÷5) + primary seed0002 @4565.
- C locus: `dogmove.c` `dog_goal` invent `dogfood` / `udist>1` `!rn2(4)`.
- Change: no JS port delta. DIAG: JS pet udist=4 invent=20 → `rn2(4)`;
  C’s 20×`obj_resists` ≈ invent scan (`udist<=1`). Rejected broken
  `obj_resists` body / missing fobj pile.
- Verification: green+strict; full suite **26**/44 Scr **4363**/11405
  RNG **262922**/792838 speed `24+0.13/turn`.
- Next: find prior pet/hero placement split before @4565 (D-0429).

## 2026-07-16 01:05 — #459 eatcorpse rnd logging (D-0428)
- Objective: seed0002 eatcorpse / early peel (PRIMARY).
- C locus: `eat.c` `eatcorpse` `losehp(rnd(15)|rnd(8), …)`.
- Change: acid/sick inline damage used `1+rn2(N)` (logs `rn2`) →
  `rnd(N)` to match C provenance; poison path already correct.
- Verification: rng-diff prefix **3808→4565**; Scr still 54/595;
  green+strict; cohort **24/24** (incl. seed0004).
- Next: seed0002 @4565 C `obj_resists` vs JS `rn2(4)`.

## 2026-07-16 00:59 — #458 throwit land newsym (D-0427)
- Objective: seed0004 @354 map `%` vs floor (misread as gem; FOOD carrot).
- C locus: `dothrow.c` `throwit` after `stackobj` — `cansee`→`newsym`.
- Change: JS `throwit` called `place_object`/`stackobj` but omitted land
  `newsym`; object existed with `disp` still floor.
- Verification: seed0004 **PASS** Scr **409**/409; green+strict; cohort
  **23/23**; full suite **26**/44 Scr **4363**/11405.
- Next: seed0002 eatcorpse / early peel.

## 2026-07-16 00:50 — #457 seed0004 invent multi-page (D-0426)
- Objective: seed0004 @330 `i` invent footer `(1 of 2)`.
- C locus: `wintty.c` `tty_end_menu`/`process_menu_window`;
  `invent.c` `display_pickinv`.
- Change: `display_inventory` → `select_menu_pick_none` when
  npages>1; `display_pickinv_reply` fullscreen `(N of M)` + Space
  page + current-page selectors (also fixes @336 `t*`).
- Verification: seed0004 Scr **397→403**/409; cursors full; RNG
  full; green+strict; cohort **23/23**.
- Next: seed0004 @354 map `%` vs floor at (11,49).

## 2026-07-16 00:42 — #456 seed0004 @312 wall describe_looked (D-0425)
- Objective: seed0004 @312 `/` whatis `describe_looked` wall.
- C locus: `pager.c` `is_swallow_sym` + `do_screen_description` cmap
  walls; DECgraphics `S_vwall`/`S_sw_ml` share `\xf8`.
- Change: `describe_wall_looked` + swallow mid envelope; Unicode │
  prefix (JS topline lacks decgfx); export `terrain_glyph`.
- Verification: seed0004 Scr **396→397**/409; @312 fixed; RNG full;
  green+strict; cohort **23/23**.
- Next: seed0004 @330 invent `(1 of 2)` footer.

## 2026-07-16 00:31 — #455 score + D-0424 trap lookat
- Objective: mandatory full `sessions` score (#455÷5); primary seed0004 @310 dart trap `brief_at`.
- C locus: `pager.c` `lookat` `glyph_is_trap` → `trap_description`/`trapname`.
- Change: export full `trapname`; wire tseen trap into `brief_at` / `describe_looked` / `auto_describe_text` (D-0424).
- Verification: full suite **25/44** Scr **4350**/11405 RNG **263166**/792838; seed0004 **396**/409; green+strict; cohort 25/25.
- Next: seed0004 @312 wall `describe_looked` ambiguous cmap.

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
