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

## 2026-07-16 11:20 — D-0481 makemon newsym after spawn
- Objective: seed0006 @102 JS `.` vs C `&` after water-demon unleash.
- C locus: `makemon.c` `makemon` `!gi.in_mklev` → `newsym` (+ byyou).
- Change: `js/makemon.js` `newsym(mx,my)` after invent when not
  mklev; early byyou `newsym`. Omit `set_apparxy` (circular import).
- Verification: seed0006 Scr **106→110**/123 @102→@110; RNG full;
  green+strict; 25 PASS cohort held.
- Next: seed0006 @110 disclose invent pages (or seed0007).

## 2026-07-16 10:35 — LB 23-vs-27 investigate + D-0480
- Objective: close judge 14-cell gap on seed0002/0004/0012/0030.
- C locus: tty blank fg; `insight.c` vanqsort `strcmpi`; altar DEC (D-0293).
- Change or falsified theory: local+hub PASS 100%; cannot repro judge
  misses. D-0480 serialize space NO_COLOR + vanqsort strcmpi. Rejected
  SO-wrap `{`/`\`` (C encoding mix / ROCK_CLASS).
- Verification: green+strict; four gap sessions PASS local+hub.
- Next: next judge cron; else upstream #5-style report; seed0006 @102.

## 2026-07-16 09:55 — D-0479 mondead unmap_object clears I
- Objective: seed0006 @77 JS `I` vs C `#` after kitten kills unseen mon.
- C locus: `mon.c` `mondead` → `unmap_object`; `display.c` unmap_*.
- Change: `unmap_object`/`unmap_invisible` in `display.js`; wire into
  `mondead` (mhitm/uhitm/trap) before `newsym`.
- Verification: seed0006 Scr **95→106**/123 @77→@102; green+strict;
  25 PASS cohort held.
- Next: seed0006 @102 `.` vs `&` water-demon display (or seed0007).

## 2026-07-16 08:15 — #515 score + D-0478 hilite_pet
- Objective: #515 %5 full score; seed0006 @71 hilite_pet primary.
- C locus: `wintty.c` `tty_print_glyph` MG_PET; `options.c` opt_hilite_pet.
- Change: `mon_map_attr` + `newsym` attr; enable sets `wc2_petattr`.
- Verification: seed0006 Scr **89→95**/123 @71→@77; green+strict;
  pet cohort PASS; suite **27/44** Scr **4986**/11405 RNG **289819**.
- Next: seed0006 @77 `I` vs `#` (or seed0007).

## 2026-07-16 08:10 — docs: Rule #2 hard-ban in loop entrypoints
- Objective: document Contest Rule #2 where loop agents always read it.
- C locus: n/a (process); contest README Rule #2; D-0477.
- Change: CONSTITUTION §1.5 + §3/§7; GROK-PLAYBOOK callout + Bad table;
  CURRENT header; Cursor rules; agent-port-loop.prompt.md.
- Verification: check-hot-docs; D-0477 already green.
- Next: seed0006 @71 hilite_pet (or seed0007).

## 2026-07-16 08:05 — D-0477 Rule #2 pager dat embed
- Objective: Contest Rule #2 — no filesystem; pager used Node fs.
- C locus: `pager.c` display_file/checkfile; README Rule #2.
- Change: `extract-dat-text.py` → `dat_text.js`; `pager.readDat`
  in-process only (drop fs/path/url).
- Verification: green+strict; seed0030/0002/0012 PASS; js/ clean
  of Node builtins.
- Next: seed0006 @71 hilite_pet (or seed0007).

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
