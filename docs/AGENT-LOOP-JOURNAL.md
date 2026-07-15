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

## 2026-07-16 01:55 — #465 score + drinksink (D-0434)
- Objective: mandatory full `sessions` score (#465÷5); primary
  seed0002 @8831 drinksink.
- C locus: `potion.c` `dodrink` sink yn; `fountain.c` `drinksink`/
  `breaksink`.
- Change: full suite **26/44** Scr **4503**/11405 RNG
  **267277**/792838 speed `22+0.13/turn`. Ported sink yn +
  `drinksink` switch + `breaksink` (D-0434).
- Verification: seed0002 prefix **8831→8863**; Scr **190→194**/595;
  green+strict; cohort **24/24**.
- Next: seed0002 @8863 `SCR_ENCHANT_WEAPON` / seffects exercise
  vs doread unimplemented gate.

## 2026-07-16 01:50 — #464 closed-door rush bump (D-0433)
- Objective: seed0002 @8609 C `exercise` rn2(2) vs JS `rnl(20)` (PRIMARY).
- C locus: `hack.c` `test_move` closed_door autoopen/bump; `attrib.c`
  `exercise`.
- Change: JS `end_running()` before autoopen `!run` check forced
  `doopen_indir` on capital-H rush; C bumps when run set. Ported
  orthogonal Ouch+`exercise(A_DEX,FALSE)` / “That door is closed.”
- Verification: seed0002 prefix **8609→8831**; Scr **172→190**/595;
  RNG matched **9227**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8831 `drinksink` rn2(20) vs JS rn2(5).

## 2026-07-16 01:45 — #463 SCR_REMOVE_CURSE (D-0432)
- Objective: seed0002 @6954 C `exercise` rn2(19) vs JS rn2(5) (PRIMARY).
- C locus: `read.c` `doread` nodisappear / `seffects` /
  `seffect_remove_curse`; `mkobj.c` `uncurse`; `do_name.c` `trycall`.
- Change: JS gated SCR_REMOVE_CURSE unimplemented; C cursed remove-curse
  read `v` exercises WIS, You_feel + disintegrates, then trycall
  (“helping you”). Ported seffect_remove_curse/uncurse + nodisappear +
  trycall wire.
- Verification: seed0002 prefix **6954→8609**; Scr **126→172**/595;
  RNG matched **8887**/27158; green+strict; cohort **24/24**.
- Next: seed0002 @8609 H-rush door bump `exercise` rn2(2) vs JS
  `doopen_indir` rnl(20).

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

