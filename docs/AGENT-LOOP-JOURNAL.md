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

## 2026-07-20 16:30 — D-0862 makesingular / gold / SCR_MAIL
- Objective: seed0399 @10217 `rnd_otyp_by_namedesc` rn2(31) vs rn2(181).
- C locus: `objnam.c` `makesingular`/`readobjnam` gold; `mkobj.c`
  SCROLL `!= SCR_MAIL` blessorcurse.
- Change: port makesingular (+as_is); gold early-return; wizard quan;
  SCR_MAIL skip blessorcurse. as_is required (boots/gloves).
- Verification: green+strict PASS; prefix **10217→10269** Scr **156→392**;
  seed0360/5006/0398/5002/0108/0383 PASS.
- Next: seed0399 @10269 C `gethungry` rn2(20) vs JS rnd(20).

## 2026-07-20 16:20 — #1010 full public score refresh
- Objective: mandatory score cadence (iteration % 5 == 0).
- C locus: n/a (docs-only).
- Change: full `sessions` — **39/44** PASS; Scr **9064**/11405
  (+43 vs #1005); RNG **666535**/792838 (84.07%, −108); speed
  `32+0.25/turn` (R² 0.846). seed0399 Scr 156 @10217 namedesc.
- Verification: green+strict PASS; suite exit 0.
- Next: seed0399 @10217 `rnd_otyp_by_namedesc` C rn2(31) vs JS
  rn2(181); or D-0708; score @#1015.

## 2026-07-20 16:14 — #1009 D-0861 Is_container; D-0731 closed
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731 mon drift).
- C locus: muse.c searches_for_item TOOL Is_container.
- Change: port Is_container / Is_mbag / !olocked in js/muse.js.
  First diverge @n=10109: C gg=sack(58,13) vs JS tripe(54,11).
- Verification: green+strict PASS; seed0399 **10157→10217** Scr
  **113→156**; cohort 1500/1800/0060/0108/0373/0398/0383/0102/0700 PASS.
- Next: seed0399 @10217 rnd_otyp_by_namedesc rn2(31)vs rn2(181);
  or D-0708; score @#1010.

## 2026-07-20 16:05 — #1008 D-0731 C poss[] DIAG; mon drift
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos (recorder DIAG); mon positions.
- Change: none in scored js/. Fixed Darwin install sysconf
  (GDBPATH/GREPPATH comment + WIZARDS=*) for recorder rerecord.
  C DIAG: unicorn cnt=5; MON_AT elf×2 + spider; JS elves/spider
  drifted NW while unicorn matched. Falsified ROOM/trap/online omit.
- Verification: green+strict PASS; seed0399 still @10157; C rerecord
  RNG bit-equal to canonical (11409).
- Next: first silent coord diverge of PM_ELF_NOBLE / PM_GIANT_SPIDER;
  or D-0708; score @#1010.

## 2026-07-20 15:51 — #1007 D-0731 DIAG; falsify FORCE→namedesc
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: mon.c mfndpos; monmove.c m_move track skip.
- Change: none shipped. DIAG reconfirmed unicorn @58,12 cnt=7
  ROOM×7 spider@57,12 WEB+sack@58,13; no engr/online. Falsified
  FORCE→namedesc@10217 as next peel (key desync; JS identify
  rn2(181) vs C rn2(31) not comparable).
- Verification: green+strict PASS; seed0399 still @10157;
  no js/ production change.
- Next: C recorder poss[] DIAG (sysconf in install); or D-0708;
  score @#1010.

## 2026-07-20 15:36 — #1006 monflee mon_track_clear (D-0860)
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: monmove.c monflee always mon_track_clear; callers music/uhitm/fountain.
- Change: wire mon_track_clear (export + monflee + music/uhitm/fountain).
  DIAG: unicorn @58,12 cnt=7 j=0 mtrack=[59,13]; (57,12) MON_AT mhp34;
  open ROOM×7; FORCE-pair ID still needs C-state (track clear inert here).
- Verification: green+strict PASS; cohort 1500/1800/0383/0398/0108/0013 PASS;
  seed0399 still @10157 rn2(28)vs rn2(20).
- Next: C-state which 2 of 7 cells; or namedesc rn2(31)vs181 after arity;
  D-0708; score @#1010.

## 2026-07-20 15:28 — #1005 full public score refresh
- Objective: mandatory score (iteration % 5 == 0).
- C locus: n/a (docs-only score cadence).
- Change: full `sessions` → **39/44** PASS; Scr **9021**/11405;
  RNG **666643**/792838 (84.08%); speed `33+0.23/turn` (R² 0.825).
  Δ vs #1000: Scr +10, RNG 0, PASS +1 (seed0383). Non-PASS unchanged
  (0014/0399/2200/2600/4500).
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0399 @10157 needs C-state which 2 mfndpos cells (D-0731);
  or D-0708; next score @#1010.

## 2026-07-20 15:25 — #1004 unicorn noteleport_level + D-0731 DIAG
- Objective: seed0399 @10157 mfndpos cnt7vs5 (D-0731).
- C locus: teleport.c noteleport_level; mon.c mon_allowflags;
  monmove.c m_move avoid / dochug mflee tele.
- Diagnosis: unicorn @58,12 open ROOM; spider excludes 1; FORCE any
  keep-track 2-omit →10217 (WEB not unique); next namedesc rn2(31)
  vs rn2(181). No JS-visible reason for which 2 C drops.
- Change: D-0859 wire noteleport_level (C fidelity; inert on maze).
- Verification: green+strict PASS; cohort 0383/0398/1500/1800 PASS;
  seed0399 still @10157.
- Next: C-state which 2 mfndpos cells; or D-0708; score @#1005.

## 2026-07-20 15:10 — #1003 doattributes Hallu+Antimagic (D-0858)
- Objective: seed0383 Scr 217/219; first miss @213 Ctrl-X attrs.
- C locus: insight.c status_enlightenment Hallucination;
  attributes_enlightenment Antimagic before Fire.
- Diagnosis: Status missing hallucinating; Attributes missing
  magic-protected (GDSM); hungry already present → (1 of 2)≠(1 of 3).
- Change: invent.js status_core_lines + doattributes Antimagic/from_what.
- Verification: seed0383 **PASS** 219/219 RNG FULL strict; green+strict;
  cohort 38/38.
- Next: seed0399 @10157 (D-0731) or seed0014 @50259; score @#1005.

## 2026-07-20 15:05 — #1002 corner menu dismiss≠docrt (D-0857)
- Objective: seed0383 Scr 211/219; first miss @210 after +/ESC.
- C locus: wintty.c erase_menu_or_text — offx==0 docrt; else docorner.
- Diagnosis: invent fullscreen docrt OK; spell corner always-docrt
  burned Hallu RNG before once-per-input see_monsters → mon r≠e.
- Change: invent.js dismiss_nhw_menu; spell/invent/options wired.
- Verification: Scr **217**/219 RNG FULL; @210 e; green+strict; 15/15.
- Next: @213 Ctrl-X attributes (hungry line / page shift).

## 2026-07-20 14:55 — #1001 invent Hallu obj_to_glyph (D-0856)
- Objective: seed0383 Scr 209/219; first miss past @199.
- C locus: invent.c display_pickinv obj_to_glyph(otmp, rn2_on_display_rng).
- Diagnosis: @208 soldier Hallu after i/ESC; core RNG FULL; invent menus
  omitted Hallu display burns. Post-fix map through spell menu OK.
- Change: invent_lines + display_pickinv_reply call obj_glyph per item.
- Verification: Scr **211**/219 RNG FULL; green+strict PASS; cohort 10/10.
- Next: @210 map after +/ESC (soldier Hallu); wear plines still deferred.

## 2026-07-20 14:45 — #1000 public score cadence
- Objective: mandatory 5-iter full `sessions` score refresh.
- C locus: n/a (docs only; no JS peel).
- Change: measured **38/44** PASS; Scr **9011**/11405 (+13 vs #995 =
  seed0383 196→209 from D-0852…D-0855); RNG **666643**/792838 (flat);
  speed `32+0.23/turn`. seed0383 still 209/219 RNG FULL; first miss
  past @199. Rotated journal #985–#990 → archive.
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0383 Scr @209+ (Hallu map / deferred wear plines).

## 2026-07-20 14:40 — #999 m_dowear_type nambuf Monnam (D-0855)
- Objective: name C caller of 7×rndmonnam after fleeck @16751 / LCP 555.
- C locus: worn.c m_dowear_type nambuf; mon.c movemon_singlemon I_SPECIAL.
- Diagnosis: C backtrace rndmonnam←mon_nam←m_dowear_type←m_dowear←
  movemon_singlemon (soldier re-equip after gnome turn). Not fleeck.
- Change: JS m_dowear_type evaluates See_invisible?Monnam:mon_nam at entry.
- Verification: seed0383 Scr **209**/219 RNG FULL; green+strict PASS;
  cohort 8/8.
- Next: remaining Scr @209+; wear/invis plines still deferred.

## 2026-07-20 14:25 — #998 LCP 555 fleeck monflee falsified (D-0854)
- Objective: seed0383 LCP 555 C Monnam(430) vs JS mon(383) @199.
- C locus: probed; not distfleeck→monflee (monmove.c:564 would burn
  core rnd before Monnam).
- Falsified: after core 16751 (2nd fleeck post m_move rn2(24)) C emits
  7×rndmonnam with zero core before next fleeck; site tag is stale
  last-core. JS next display = postmov mon_glyph@16754. No JS change.
- Verification: green+strict PASS; seed0383 Scr 201 RNG FULL; LCP 555.
- Next: identify C caller of Monnam×7 post-2nd-fleeck (pline/state dump).

