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



