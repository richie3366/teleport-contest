# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-03 — D-1777 ball.c Blind move_bc / unplacebc glyph restore

**Objective:** queue rows `ball.c` unplacebc Blind glyph restore and
`ball.c` move_bc Blind glyph — one `bc_felt`/`bglyph`/`cglyph` cluster,
shipped together. Checked first that the state is actually fed:
`feel_location` (`js/display.js:4262`) maintains `u.bc_felt` and `set_bc`
(D-1769) takes the snapshots, so these arms are reachable, not dead.
**C locus:** `ball.c` `move_bc` `:436-556` (Blind arm `:437-532`),
`unplacebc` `:211-219` → `unplacebc_core` `:146-177`, `hack.c` `movobj`
`:824-833`.
**JS locus:** `js/ball.js`; `js/hack.js` (export `movobj` only).
**Change:** both Blind arms ported statement-for-statement — drop the
felt piece's saved glyph, consult `bc_order` so the top of a shared pile
`map_object`s its sibling instead of restoring terrain, clear the felt
bit, pick up the destination glyph, `movobj`. `unplacebc` gained the
`Is_waterlevel` swallow arm and the per-piece restore. `u.bglyph` /
`u.cglyph` now hold remembered **cells** (`levl_glyph_at` snapshot +
new `set_levl_glyph` write side) because this port's map memory stores
rendered cells, not int glyph ids.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(63+0.49/turn); per-session strict lengths PASS on all six ball&chain
sessions. save-oracle probes skipped (both omits untagged).
No public session is Punished **and** Blind, so the suite is only a
no-regression signal — the new arms were exercised directly in a
scratchpad probe with a blind vision state and matched C on glyph
restore, felt-bit clearing, pickup and movobj.
**Harness note:** `strict-output-check.mjs` leaks state across sessions
in one process (pre-existing, reproduced on HEAD) — seed0012/seed0014
fail when batched after seed4500, pass alone.
**Next:** `ball.c` ballfall (named). Not set_bc.

## 2026-09-03 — D-1776 pronoun_gender single home / DUMPLOG retired

**Objective:** queue head was `end.c` DUMPLOG. Checked the build first:
`nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so every `end.c`
`#ifdef DUMPLOG` block is compiled out of the scored binary, and the
`DUMPLOG_CORE` `saved_plines[]` ring that *is* compiled in is write-only
(sole reader `report.c:579`, crash path). Retired that row with the
evidence rather than porting dead, filesystem-bound code, and took the
next row: `mhitu.c` noit_mhim Hallu.
**C locus:** `mondata.c` `pronoun_gender` `:1188-1207`; `you.h:317-331`;
`role.c` `genders[]` `:688-694`; `shk.c` `getcad` `:5137-5171` and
partial-pay `:2657-2661`.
**JS locus:** new home `js/mondata.js`; clones deleted from `shk`,
`mhitu`, `uhitm`, `sit`, `vault`, `mthrowu`, `fountain`, `steed`.
**Change:** eight divergent clones of the you.h pronoun macros collapsed
into one C-faithful `pronoun_gender(mtmp, pg_flags)`. Three were
RNG-wrong (shk `noit_*`, mthrowu `mhim` = constant 'it', vault `mhe`)
because C draws `rn2(4)` first under Hallucination; two more skipped the
canspotmon / neuter / pname gates. `PRONOUN_NO_IT` now exists at all.
shk `getcad` and the partial-payment pline wired to `noit_mhis` /
`noit_mhim` + `currency` + the "you " customer prefix.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(62+0.49/turn); strict lengths also on seed0383/seed0399 (hallu) and
seed0116 (shop). `sym.mjs` now reports 0 clones for all seven names.
103 ins / 134 del across 9 js files — net smaller.
**Next:** `ball.c` unplacebc Blind glyph restore (named). Not set_bc.

## 2026-09-03 — D-1775 detect.c findone flash/foundone/mimic/hider/invis

**Objective:** queue Open `detect.c` findone (named); suite already 44/44.
Operator recovery first: the two new `js/display.js` comments carrying a
seed name now cite D-1774 instead. Fresh scan clean.
**C locus:** `detect.c` `findone` `:1637-1726`, `foundone` `:1607-1634`,
`findit` `:1791-1898` invis tail, `FOUND_FLASH_COUNT` `:19`;
`display.c` `flash_glyph_at` `:1304-1321`.
**JS locus:** `js/display.js` (`flash_glyph_at`, `invisible_glyph_cell`),
`js/detect.js` (`foundone`, `findone`, `findit`, async `do_clear_area`).
**Change:** every found SDOOR/SCORR/trap/dummytrap now flashes and runs
`foundone`'s seenv-SVALL + `COULD_SEE|IN_SIGHT` viz pulse; SCORR uses
`unblock_point` (SDOOR keeps `recalc_block_point`) per C; the monster
tail is live — `seemimic`, hider/eel `mundetected=0`, `map_invisible`
vs `num_kept_invis` vs `unmap_invisible` — using D-1774's memory
`glyph_is_invisible`. `findit` prints C's detect/paranoid messages.
**Verify:** green gate + strict lengths PASS; cohort 7/7; full
`sessions` 44/44 (shared display.js). save-oracle probe skipped
(`detect.c:findone` untagged).
**Next:** `end.c` DUMPLOG (named). Not companion pet HP.

## 2026-09-03 — D-1774 display.c newsym I-arm lev->glyph

**Objective:** seed0014 @43789 eatcorpse `rn2(20)` vs JS `rn2(5)`.
**C locus:** `display.c` `newsym` `:1032`; `unmap_invisible`;
`hack.c` fight_empty `glyph_at`; `do_attack` atk_done; `mondead`.
**JS locus:** `js/display.js` `memory_glyph_is_invisible`; `js/cmd.js`;
`js/uhitm.js`; `js/mhitm.js`.
**Change:** newsym/unmap/mondead use memory I, not leftover gbuf;
fight_empty uses `glyph_at`; atk_done plants I only if still alive.
eat.c rot arm was already live.
**Score:** **44**/44 (full `sessions`; seed0014 PASS).
**Verified:** probe skip untagged `eat.c:eatcorpse`; seed0014
59178/59178 + 714/714; green+strict; cohort **7**/7 + strict.
**Next:** Open `detect.c` findone (named). Not gold_detect.
**Blocked:** none.

## 2026-09-03 — human: seed0014 eatcorpse first-diff next

**Objective:** seed0014 leftover (not findone). Not a 44/44 peel.
**C locus:** `eat.c` `eatcorpse` `:1884–1887`.
**JS locus:** `js/eat.js` `eatcorpse` / `nonrotting_corpse`.
**Change:** docs only — CURRENT/NOTES/QUEUE retarget.
**Score:** **43**/44 reconfirmed `c206da54`.
**Verified:** `rng-diff --all-segments` seed0014 @43789 C
`rn2(20)` vs JS `rn2(5)` after matching regen/gethungry/moveloop.
**Next:** dump why JS skipped the rot roll; no FORCE; no gbuf.
**Blocked:** none.

## 2026-09-03 — D-1773 detect.c gold_detect / o_in o_material

**Objective:** Open `detect.c` gold_detect (named). Not sense_trap.
**C locus:** `detect.c` `gold_detect` `:334–475`; `o_in` `:200–223`;
`o_material` `:228–246`; `clear_stale_map` `:317–331`; caller
`seffect_gold_detection` `:2034–2043`; steal.c `findgold` `:44–52`.
**JS locus:** `js/detect.js` `gold_detect`; `js/read.js`
`seffect_gold_detection`; `js/steal.js` `findgold`;
`js/display.js` `glyph_is_object`/`glyph_to_obj`.
**Change:** Port gold map / underfoot / strange_feeling; blessed
GOLD vs COIN; export steal.c `findgold`. Named: food_detect;
object_detect `clear_stale_map` caller; findone flash.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `detect.c:gold_detect`;
green+strict; cohort **9**/9 + strict.
**Next:** Open `detect.c` findone (named). Not gold_detect.
**Blocked:** none.
