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

## 2026-07-16 07:55 — #513 D-0475 rename askname BASE cury
- Objective: seed0006 first screen miss @13 — C `Who are you?` row 10
  vs JS row 12 after confirm `'a'` rename.
- C locus: `wintty.c` `erase_menu_or_text`/`docorner` + `tty_askname`
  blank putstr; `role.c` case 3 rename (no `term_clear_screen`).
- Change: dismiss corner confirm via docorner (sets `_base_cury`);
  `tty_askname` uses BASE cury not hardcoded row 12; splash sets 11.
  Deferred: filter `(N of M)` page packing @22.
- Verification: seed0006 Scr **72→80**/123 first miss **@13→@22**;
  RNG full; green+strict; cohort **25/25**.
- Next: seed0006 @22 filter menu `(1 of 2)` page packing.

## 2026-07-16 07:46 — #512 D-0474 M2_STALK levl_follower
- Objective: seed0006 @6685 C `rn2(2) @ mon_arrive` vs JS `rn2(5)`.
- C locus: `mondata.c` `levl_follower`; `dog.c` `keepdogs`/`relmon`/
  `mon_arrive`; `monflag.h` `M2_STALK`.
- Change: JS `rn2(5)` was `distfleeck` (water demon never followed);
  port `M2_STALK` + flee/amulet; `mydogs.unshift`; wiz+amulet chase.
  Deferred: `mon_has_amulet` iswiz; `is_fshk`.
- Verification: seed0006 RNG **full 6736**/6736 Scr **68→72**/123;
  green+strict; cohort **25/25**.
- Next: seed0006 screen peel or seed0007 snake swamp.

## 2026-07-16 07:40 — #511 D-0473 summonmu demon help
- Objective: seed0006 @6660 C `rn2(16) @ summonmu` vs JS `rnd(21) @ mattacku`.
- C locus: `mhitu.c` `summonmu`/`mattacku`; `minion.c` `msummon`/`ndemon`.
- Change: `mhitu.js` summonmu before find_offensive; `minion.js` msummon
  demon arms + ndemon/dlord/dprince; `makemon.js` MM_EMIN; `monsters.js`
  is_ndemon/is_were. Deferred: were_summon; is_lminion/angel msummon.
- Verification: seed0006 prefix **6660→6685** RNG **6667→6686**/6736;
  green+strict; cohort **25/25**.
- Next: D-0474 @6685 `mon_arrive` rn2(2) vs JS rn2(5).

## 2026-07-16 07:34 — #510 D-0472 dowaterdemon + score cadence
- Objective: #510 %5 full score + seed0006 @6574 collect_coords.
- C locus: `fountain.c` `dowaterdemon`; `makemon.c` `m_initweap`
  `S_DEMON`→default; `mondata.h` `is_demon`.
- Change: `fountain.js` case 23 `dowaterdemon`; `makemon.js`
  named demons + `is_demon` fallthrough; `monsters.js` `is_demon`.
- Verification: suite **27/44** Scr **4959** RNG **289750**;
  seed0006 prefix **6574→6660** RNG **6578→6667**; green+cohort.
- Next: D-0473 @6660 `summonmu` (mhitu.c:968).

## 2026-07-16 07:29 — #509 D-0471 chargen rename + role filter
- Objective: seed0006 early RNG — missing 2nd pick_align rn2(1).
- C locus: `role.c` genl_player_setup case 3 rename; `reset_role_filtering`
  / `setrolefilter`; `plsel_startmenu` → `rigid_role_checks`/`pick_align`.
- Change: `player_selection.js` — confirm `'a'` → `tty_askname` + restore
  facets; PICK_ANY filter menu; wire `~` Set/Reset in pick_* menus.
- Verification: rng-diff prefix **1→6574**; seed0006 RNG **2276→6578**
  Scr **13→68**; green+strict; cohort **25/25**.
- Next: D-0472 seed0006 @6574 `collect_coords` (teleport.c:700).

## 2026-07-16 07:21 — #508 D-0470 ^X Status deaf + encumbrance
- Objective: seed0002 screen@590 ^X Status missing deaf / burdened.
- C locus: `insight.c` `status_enlightenment` Deaf + `hu_stat` +
  `near_capacity`/`enc_stat` movement phrase.
- Change: `invent.js` `status_core_lines` for ^X + final Status
  (Deaf, real hunger, encumbrance); removed hardcoded unencumbered.
- Verification: seed0002 **PASS** Scr **594→595** RNG full;
  green+strict; cohort **24/24**.
- Next: seed0006 water demon early RNG (D-0471 TBD).

## 2026-07-16 07:17 — D-0469 discoveries spear + {buy}
- Objective: seed0002 screen@587 `\` discoveries (throwing spear + `{buy N}`).
- C locus: `objnam.c` `distant_name`/`xname_flags` observe; `dogmove.c`/`steal.c`
  pet pick/drop; `shk.c` `record_price_quote`/`append_price_quote`;
  `o_init.c` `disco_append_typename`; `objects.h` OBJECT quote init.
- Change: `distant_name` + doname/xname observe when `!Blind && !distantname`;
  dogmove wires `distant_name`; objects buy/sell min/maxseen init;
  record/append price quotes on unpaid/`doname_with_price`/discoveries.
- Verification: seed0002 Scr **593→594**; first miss **@587→@590**; RNG full;
  green+strict; cohort **24/24**.
- Next: D-0470 ^X Status deaf + encumbrance @590.


## 2026-07-16 07:04 — #506 D-0468 dobuzz DISP_BEAM
- Objective: seed0002 @538 C DEC hbeam `q` vs JS `@` during
  sleep-ray bounce/hit `--More--`.
- C locus: `zap.c` `dobuzz` `tmp_at(DISP_BEAM)`/`zapdir_to_glyph`;
  `display.c` `tmp_at`/`zapdir_to_glyph`.
- Change: `zapdir_to_glyph` (DEC h/vbeam + zapcolors); `dobuzz`
  paints BEAM before hit, CHANGE after bounce, END in finally.
- Verification: @538 matches; first miss @538→@587; Scr 568→593;
  RNG full; green+strict; cohort 24/24.
- Next: D-0469 discoveries menu class order / `{buy}` @587.

## 2026-07-16 07:00 — #505 score + D-0467 invent itemed
- Objective: mandatory #505 full `sessions` score; primary D-0467
  invent `i` → `itemactions` menu @530.
- C locus: `invent.c` `ddoinv`/`dispinv_with_action`; `iactions.c`
  `itemactions`; status blank until bot after fullscreen invent.
- Change: `js/iactions.js` + `ddoinv` PICK_ONE→`itemactions`;
  `ia_checkfile`; status suppress only inside `itemactions`.
- Verification: #505 score **26/44** Scr **4877**/11405 RNG
  **285359**/792838; seed0002 Scr **566→568** first miss
  **@530→@538**; green+strict; cohort seed0004 held.
- Next: D-0468 sleep-ray bounce map `@` vs `q` @538.

## 2026-07-16 06:50 — #504 D-0466 apply getobj compactify
- Objective: seed0002 @525 C `[ch-kop or ?*]` vs JS `[chijkop or ?*]`.
- C locus: `invent.c` `getobj`/`compactify`; `apply.c` `doapply`.
- Change: `js/apply.js` prompt `compactify_invlets` when suggested>5;
  `?`/`*` keeps raw lets (same as D-0455 drink).
- Verification: @525 matches; first miss @525→@530; Scr 563→566;
  RNG full; green+strict; cohort 26/26.
- Next: D-0467 invent `i` → `itemactions` `Do what with` menu.

## 2026-07-16 06:46 — #503 D-0465 TER_MAP trap strip
- Objective: seed0002 @502 #terrain C floor/`·` vs JS trap `^`.
- C locus: `detect.c` `reveal_terrain_getglyph` `glyph_is_trap` strip.
- Change: `js/display.js` classify tseen traps + `glyph_is_trap_at`
  after mon→memory; keep_traps `trap_to_glyph` restore; TER_MAP strip.
- Verification: @502 matches; first miss @502→@525; Scr 561→563;
  RNG full; green+strict; cohort 26/26.
- Next: D-0466 apply getobj compactify `[ch-kop]` vs `[chijkop]`.

## 2026-07-16 06:40 — #502 D-0464 doname locked-box prefixes
- Objective: seed0002 @454 C `You see here a locked chest.` vs JS
  `You see here a chest.`
- C locus: `objnam.c` `doname_base` trap/lock prefixes; `obj.h` `Is_box`.
- Change: `js/objnam.js` `doname` adds `trapped`/`locked`/`unlocked`/
  `broken`; `js/const.js` exports `Is_box`. Greased deferred.
- Verification: @454 matches; first miss @454→@502 (#terrain);
  Scr 560→561; RNG full; green+strict; cohort 26/26.
- Next: D-0465 TER_MAP still shows traps @502.

## 2026-07-16 06:34 — #501 D-0463 wear on_msg xname
- Objective: seed0002 @363 C `polished silver shield` vs JS
  `shield of reflection` on wear pline.
- C locus: `do_wear.c` `on_msg`; `objnam.c` `xname`/`obj_is_pname`.
- Change: `js/do_wear.js` `on_msg` uses `xname` + `an`/`the`
  (was `objectNameStrs` type name).
- Verification: @363 matches; first miss @363→@454
  (`locked chest`); Scr 559→560; RNG full; green+strict; cohort
  26/26.
- Next: D-0464 doname locked-box prefix @454.

## 2026-07-16 06:30 — #500 D-0462 money2mon `_goldCount` + public score
- Objective: mandatory #500 full `sessions` score; primary D-0462
  seed0002 botl `$:1175` vs `$:1225` after shop pay.
- C locus: `shk.c` `money2mon` / `freeinv_core`; `botl.c` `money_cnt`.
- Change: `js/shk.js` `money2mon` decrements `game._goldCount` by
  payment amount (JS botl `$:` cache).
- Verification: seed0002 @359 botl matches; first miss @359→@363
  (`polished silver shield` vs `shield of reflection`); Scr 363→559;
  RNG full; green+strict; cohort 26/26. Full suite: **26/44** PASS;
  Scr **4868**/11405; RNG **285358**/792838; speed `23+0.13/turn`.
- Next: D-0463 wear pline appearance vs type name @363.

## 2026-07-16 06:26 — #499 D-0461 doname unpaid_cost + paydoname
- Objective: seed0002 screen@345 C slightload prinv unpaid suffix vs
  JS bare shield name.
- C locus: `objnam.c` `doname_base` unpaid / `paydoname`; `shk.c`
  `is_unpaid` / `unpaid_cost` / `count_unpaid`.
- Change: `js/shk.js` unpaid helpers + doname suffix hook;
  `js/objnam.js` `paydoname` (`suppress_price`); pay menu/`dopayobj`
  use `paydoname`. Deferred: `contained_cost`; container paydoname
  rewrite.
- Verification: seed0002 @345 matches; first miss @345→@359; Scr
  361→363; RNG full; green+strict; cohort 24/24.
- Next: D-0462 botl `$:1175` vs `$:1225` after `pay`/`money2mon`.

