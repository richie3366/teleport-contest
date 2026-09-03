# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-03 — D-1772 mon.c peacefuls_respond / MS_ARREST Halt

**Objective:** Open `mon.c` peacefuls_respond / MS_ARREST Halt. Not beg.
**C locus:** `mon.c` `peacefuls_respond` `:4162–4257`; `setmangry`
`:4317`; `mondata.c` `big_little_match` `:1329–1351`.
**JS locus:** `js/mon.js` `peacefuls_respond`+`setmangry`;
`js/mondata.js` `big_little_match`; growl `PLNMSG_GROWL`.
**Change:** Port Halt/`angry_guards`, humanoid gasp/flee/anger,
same-mlet growl+flee; async `setmangry` `!mon_moving` wire; await
callers. Named: `qst_guardians_respond`; Elbereth; victim growl.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `mon.c:peacefuls_respond`; Halt
canary watch `mpeaceful→0`; green+strict; cohort **7**/7 + strict.
**Next:** Open `detect.c` gold_detect. Not sense_trap.
**Blocked:** none.
## 2026-09-03 — D-1771 invent.c useupf + eat.c carried hybrid

**Objective:** Open `eat.c` useup+useupf hybrid. Not delete_contents.
**C locus:** `invent.c` `useupf` `:4762–4783`; `useup` `:1320–1333`;
eat.c `done_eating`/`use_up_tin`/`eatcorpse`/`eatspecial`.
**JS locus:** `js/invent.js` `useupf`; `js/eat.js` hybrid retired.
**Change:** Port `useupf` (split+`delobj`+`hideunder`); eat.c
`carried()?useup:useupf`; retarget apply/engrave/fountain/pray/zap.
Named: shop bill, zap.js useupf clone, detect/potion/read/spell
useup clones.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `invent.c:useupf`; load ok;
green+strict; cohort **7**/7 + strict (seed1800 eat-throw).
**Next:** Open `mon.c` peacefuls_respond / MS_ARREST Halt.
**Blocked:** none.
## 2026-09-03 — D-1770 shk.c delete_contents (zap clone retired)

**Objective:** Open `zap.c` delete_contents clone. Not delobj extract.
**C locus:** `shk.c` `delete_contents` `:1174–1183`; caller
`zap.c` `poly_obj` `:1827–1829`.
**JS locus:** `js/zap.js` import; `js/shk.js` export.
**Change:** Retire zap unlink clone; `poly_obj` uses extract+`obfree`.
Named: trap.js `delete_contents_chest`; mklev.js
`create_object_delete_contents`.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `zap.c:delete_contents`; node
canary nested+mkbox_cnts `OBJ_DELETED` + poly empty box; green+strict;
cohort **9**/9 + strict.
**Next:** Open `eat.c` useup+useupf hybrid.
**Blocked:** none.
## 2026-09-03 — D-1769 ball.c set_bc Punished blind snapshot

**Objective:** Open `ball.c` Punished set_bc. Not Unaware talk.
**C locus:** `ball.c` `set_bc` `:379–424`; callers `potion.c` `:309`,
`do_wear.c` `:1476`/`:1523`, `read.c` `:3059`.
**JS locus:** `js/ball.js` `set_bc`; `js/do.js` `make_blinded`;
`js/do_wear.js` `Blindf_on`/`Blindf_off`; `js/read.js` `punish`.
**Change:** Port `set_bc`; wire four Punished-blind sites. Named:
Blind `move_bc` glyph, `unplacebc` Blind restore.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `ball.c:set_bc`; node canary 6/6
+ sighted DIFFER peek; green+strict; cohort **7**/7 + strict.
**Next:** Open `zap.c` delete_contents clone.
**Blocked:** none.
## 2026-09-03 — D-1768 potion.c make_blinded Unaware talk=FALSE

**Objective:** Open `potion.c` make_blinded Unaware talk=FALSE.
Not Sting(-1).
**C locus:** `potion.c` `make_blinded` `:275–276`; `youprop.h`
Unaware `:399`; `eat.c` `is_fainted` `:3346–3350`; `trap.c`
`unconscious` `:6775–6786`.
**JS locus:** `js/do.js` `make_blinded`; `js/eat.js`
`is_fainted`/`Unaware` (import, no clone #9).
**Change:** Port `is_fainted`; Unaware ORs faint after unconscious;
`make_blinded` clears talk. Punished `set_bc` still named.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `potion.c:make_blinded`; node
canary 16/16; green+strict; cohort **9**/9 + strict.
**Next:** Open `ball.c` Punished set_bc.
**Blocked:** none.
## 2026-09-03 — D-1767 display.c show_glyph gbuf stamp

**Objective:** Must-fix `display.c` `show_glyph` always overwrite
`gbuf.glyph` (stale `disp_glyph` / `see_traps`). Not usteed.
Source: reviews/loop-unattended/726-3b34b789-glyph-offsets.md
**C locus:** `display.c` `show_glyph` `:2039`; `see_traps`
`:1610–1621`; `back_to_glyph` `:2286–2427`; `do_vicinity_map`
`:1528`.
**JS locus:** `js/display.js` `show_glyph_cell`/`see_traps`/
`back_to_glyph`; `js/detect.js` import `map_background`.
**Change:** Always stamp `loc.disp_glyph`; pass cmap ids from
map_* / memory / zap / explode; `see_traps` `glyph_is_trap` only;
vicinity drops kind hybrid. Not usteed / swallow / `map_glyphinfo`.
**Score:** **43**/44, Scr **11,320**/11,405, RNG **777,491**/792,838
(98.1%). Speed `41+0.31/turn` (R² 0.863). Recovered seed0006/0030/4500;
seed0014 still FAIL.
**Verified:** probe skip untagged `display.c:show_glyph`; node canary;
green+strict; cohort **7**/7 + strict; full `sessions` 43/44.
**Next:** Open `potion.c` make_blinded Unaware talk=FALSE.
**Blocked:** none.
