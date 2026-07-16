# Rotated from AGENT-LOOP-JOURNAL.md (D-0484 iteration)

## 2026-07-16 07:58 — #514 D-0476 filter tty page packing
- Objective: seed0006 screen@22 — C filter `(1 of 2)` vs JS blank
  morestr off-screen after `~`.
- C locus: `wintty.c` `tty_end_menu`/`process_menu_window`;
  `role.c` `reset_role_filtering`.
- Change: page title+blank inside `nitems`/`lmax` (was re-prepended
  each page so morestr landed at row 25).
- Verification: seed0006 Scr **80→89**/123; @22–@30 match; first
  miss **@22→@71** (`hilite_pet` inverse on fox); RNG full;
  green+strict; cohort **25/25**.
- Next: seed0006 @71 pet `hilite_pet` / `wc2_petattr` ATR_INVERSE.

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


