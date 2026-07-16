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

## 2026-07-16 06:20 — #498 D-0460 look_here doname_with_price
- Objective: seed0002 screen@342 C `You see here a banded mail
  (for sale, 68 zorkmids).` vs JS bare banded mail.
- C locus: `invent.c` `look_here`; `objnam.c` `doname_with_price`;
  `shk.c` `get_cost_of_shop_item` / `inside_shop`.
- Change: `js/shk.js` — roomno `inside_shop`, `get_obj_location`
  subset, `get_cost_of_shop_item`, `doname_with_price`.
  `js/invent.js` `look_here` single+pile. Deferred: unpaid_cost /
  pricequotes / contained_cost.
- Verification: seed0002 @342 matches; first miss @342→@345; Scr
  354→361; RNG full; green+strict; cohort 24/24.
- Next: D-0461 screen@345 doname unpaid on slightload prinv.

## 2026-07-16 06:14 — #497 D-0459 safemon in-the-way pline
- Objective: seed0002 screen@272 C `You stop.  Your little dog is in
  the way!` vs JS blank topline.
- C locus: `uhitm.c` `do_attack` safemon `foo` → `y_monnam`/`You`/
  `end_running(TRUE)`.
- Change: `js/uhitm.js` — after tame monflee, emit stop pline via
  `x_monnam_tame`+highc; clear run/travel/mv/multi. Deferred: inshop
  when !foo; isshk dopay; frozen/helpless pline; longworm/`passes_walls`
  in foo; `mon_track_clear`/Vrock.
- Verification: seed0002 @272 matches; first miss @272→@342; Scr
  353→354; RNG full; green+strict; cohort 24/24.
- Next: D-0460 screen@342 look_here `doname_with_price` for-sale.

## 2026-07-16 06:10 — #496 D-0458 botl Conf conditions
- Objective: seed0002 screen@237 C botl `Burdened Conf` vs JS `Burdened`.
- C locus: `botl.c` `do_statusline2` Blind…Conf…Fly after enc_stat.
- Change: `js/display.js` `_statusLine2` — Blind/Deaf/Stun/Conf/Hallu/
  Lev/Fly before Ride (youprop-shaped); Stone/hunger still deferred.
- Verification: seed0002 @237 matches; first miss @237→@272; Scr
  327→353; RNG full; green+strict; cohort 24/24.
- Next: D-0459 screen@272 safemon `You stop. … is in the way!`.

## 2026-07-16 06:06 — #495 score + D-0457 wield SUGGEST prompt
- Objective: mandatory full `sessions` (#495 %5); D-0457 primary.
- C locus: `invent.c` `getobj`/`compactify`; `wield.c` `wield_ok`.
- Change: `js/wield.js` — SUGGEST-only prompt letters, `- ` hands
  prefix, compactify when suggested>5; DOWNPLAY still selectable.
- Verification: full suite **26/44** Scr **4636**/11405 RNG
  **285358**/792838; seed0002 @229→@237 Scr 326→327; green+strict;
  cohort **26/26**.
- Next: D-0458 screen@237 botl `Conf`.

## 2026-07-16 06:02 — D-0456 pickup_prinv slightload lifting
- Objective: seed0002 screen@221 C `You have a little trouble lifting x - a chain mail.--More--` vs JS bare `x - a chain mail.--More--`.
- C locus: `pickup.c` `pickup_prinv` / `slightloadpfx` + `gp.pickup_encumbrance`.
- Change: `js/pickup.js` — load pfx + verb `lifting`/`removing`; reset `pickup_encumbrance` in `pickup` / `menu_loot_*`.
- Verification: seed0002 first miss @221→@229; Scr 325→326; RNG full; green+strict; cohort 24/24.
- Next: D-0457 screen@229 wield getobj compactify.



## 2026-07-16 05:52 — #492 D-0454 music LEATHER_DRUM
- Objective: seed0002 @27050 D-0454 primary (`do_improvisation`).
- C locus: `music.c` `do_play_instrument`/`do_improvisation`/
  `awaken_*`; `zap.c` resist TOOL alev=10; `monmove.c` auditory
  `onscary(0,0)`→`monflee`; `sounds.c` dosounds Deaf≡HDeaf.
- Change: new `js/music.js` + apply instrument dispatch; TOOL resist
  alev=10 (not ulevel); auditory onscary→monflee; dosounds gates on
  HDeaf. Deferred: passtune/flute/harp/horn effects; Hero_playnotes;
  awaken_soldiers; flees_light/mon_track_clear.
- Verification: seed0002 RNG **27050→27158** (full); Scr still 323/595
  (first cell @54 drink `[d-gnq]` vs `[defgnq]`); green+strict;
  cohort **24/24**.
- Next: D-0455 screen@54 drink getobj compactify.

## 2026-07-16 05:42 — #491 D-0453 travelcc clear
- Objective: seed0002 @26987 D-0453 primary (dog_goal udist).
- C locus: `hack.c` `findtravelpath` dest clear; `do.c` `goto_level` travelcc.
- Change: clear `travelcc`+`nomul(0)` when BFS step cell is destination;
  clear `travelcc` in `goto_level`. Root was stale travelcc → `_`+`.`
  walked JS hero (34,8) vs C (34,7) → pet `udist` gate. Deferred:
  travelmap visited arm; dog_move `m_in_out_region`/`m_digweapon_check`.
- Verification: seed0002 **26987→27050**; RNG **27042→27061**; Scr 323;
  green+strict; cohort **26/26**.
- Next: @27050 C `do_improvisation` vs JS `rn2(19)` (D-0454).

## 2026-07-16 05:25 — #490 score cadence + D-0453 DIAG
- Objective: mandatory full `sessions` score (#490 %5); D-0453 peel.
- C locus: `dogmove.c` `dog_goal` `udist>1` / `dog_move` place.
- Change: no code — DIAG only (removed). Score **26/44** Scr
  **4632**/11405 RNG **285242**/792838 (+3/+274 vs #485). D-0453:
  same dog_goal; JS udist=1 invent vs C rn2(4); JS stepped
  (32,7)→(33,8) with matching mfndpos RNG.
- Verification: green+strict PASS; full sessions documented.
- Next: C mx/my/ux/uy at @26987 (or JS place/postmov desync).

## 2026-07-16 05:16 — #489 D-0452 ureflects makeknown
- Objective: seed0002 @26883 D-0452 primary.
- C locus: `muse.c` `ureflects`; `o_init.c` `makeknown`/`discover_object`.
- Change: shield `ureflects` calls `makeknown(SHIELD_OF_REFLECTION)`
  after pline (WIS exercise on first discover). Deferred: W_WEP/
  W_AMUL/W_ARM/dragon; `mon_reflects`; setworn EReflecting.
- Verification: seed0002 **26883→26987**; Scr **322→323**; green+strict;
  cohort **24/24**.
- Next: @26987 C `dog_goal` vs JS `obj_resists` (D-0453).

