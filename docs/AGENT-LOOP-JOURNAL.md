# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — D-1783 dog.c keepdogs stay_behind + leash arms

**Objective:** queue Open row `dog.c` keepdogs leash. Must-fix empty.
**C locus:** `dog.c` `keepdogs` `:786-884`, `keep_mon_accessible`
`:764-785`, `mon_leave` `:725-763`; `trap.c` `mintrap` `:3739`.
**JS locus:** `js/dog.js`; `js/dungeon.js` (export `on_level`);
`js/do.js` + `js/end.js` (await the now-async keepdogs).
**Change:** keepdogs decided follow-or-stay on distance alone and left
leashes silently intact in both directions. C snaps a held-back pet's
leash ("suddenly comes loose") and slackens an out-of-range one ("goes
slack"), calling m_unleash each time. Also ported: the mintrap escape
attempt for a trapped follower (an RNG draw), the steed trap/meal clear
plus mdrop_special_objs so the steed drops the Amulet, the
mon_has_amulet "very disoriented" hold-back, the left-behind-steed
impossible guard, and the keep_mon_accessible -> migrate_to_level arm
that keeps the Wizard and an off-home shk/priest/guard reachable.
`on_level` had 13 clones and no export; exported from dungeon.js rather
than adding a 14th. keepdogs became async, so both callers await it —
unawaited it would have rebuilt fmon after the caller moved on.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(61+0.49/turn); per-session strict PASS on the pet/steed/shop/vault/
level-change sessions (0004, 0103, 0104, 0012, 0116, 0360, 0367, 0030,
4500, 0015). No public session leaves a level with a stuck leashed pet,
so probed directly: adjacent pet follows; still-eating leashed pet stays
with leash released; trapped leashed pet follows with leash intact,
which is C-correct because mintrap's !trap arm clears mtrapped before
the "still trapped" test; out-of-range leashed pet stays with leash
slack.
**Pre-existing:** importing dog.js as the first module TDZ-fails on
`_body_part` — reproduced on the HEAD baseline; game order is fine.
122 ins / 21 del across 4 js files.
**Next:** `display.c` ridden_mon_to_glyph usteed (named).

## 2026-09-03 — D-1782 detect.c object_detect (gate + missing arms)

**Objective:** queue Open row `detect.c` object_detect clear_stale_map
caller. Must-fix empty.
**C locus:** `detect.c` `object_detect` `:602-789`; `o_in` `:200-223`.
**JS locus:** `js/detect.js`.
**Change:** the JS was a floor-only simplification with a raw
`obj.oclass === class` compare. Missing and now ported: C's
`!clear_stale_map(...) && !ct` gate (a stale map redraws even when
nothing is found now); the `ctu` split that prints "You sense ...
nearby" and returns 0 instead of returning 1 and letting the caller
consume the item; `o_in`'s container recursion; the buried chain;
monster inventories (C counts *every* match, then a cursed mimic or any
gold adds one and breaks); the cursed-mimic `M_AP_OBJECT` and
`findgold` stand-ins, the latter drawing a real `rnd(10)`; the boulder
dual-class; `def_oc_syms[].name` and Hallu/Confusion "something"; the
steed fixup; `unconstrain_map`; and the
`glyph_is_object(glyph_at())` -> newsym + TER_MON arm.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(63+0.49/turn); per-session strict PASS on seed2200/0501/0116/4500/
0030/0360. Probed the counting and gate: empty clean map -> 1 with 0
RNG draws; underfoot -> 0; buried-underfoot -> 0 (buried chain counted);
ring-inside-a-sack -> 0 (o_in recursion); sack alone vs RING_CLASS -> 1.
Two earlier probe runs were my bug, not the port's — I read class
constants from const.js when they live in objects.js, so every case ran
as class 0.
**Not probe-covered:** everything past `cls()` (mapping loops, mimic and
gold stand-ins incl. the rnd(10), browse_map) needs a real display and
blocks headless; recorded in the D-log rather than implied.
183 ins / 34 del in 1 js file.
**Next:** `dog.c` keepdogs leash (named). Not losedogs.

## 2026-09-03 — D-1781 detect.c food_detect + read.c caller

**Objective:** queue Open row `detect.c` food_detect. Must-fix empty.
**C locus:** `detect.c` `food_detect` `:478-594`; `read.c`
`seffect_food_detection` `:2045-2053`; `seffects` `:2252-2253`
(SCR_FOOD_DETECTION + SPE_DETECT_FOOD).
**JS locus:** `js/detect.js` (new export), `js/read.js` (caller +
dispatch + unported-scroll gate).
**Change:** the scroll and the spell both hit the "not implemented yet"
default and were not even used up. Ported whole over detect.js's
existing staticfn helpers. Load-bearing details kept: confused **or
cursed** swaps FOOD_CLASS→POTION_CLASS and "food"→"something"; `ctu`
counts matches under the hero and `ct` elsewhere with C's
`(!ct || !ctu)` monster-loop guard and one match per monster;
nothing-found returns `!stale`, which is what tells read.c the
strange_feeling already useup'd; `gk.known` is `stale && !confused`
there but TRUE in the other two arms; blessed sets `u.uedibility` and
C's `flags.beginner = FALSE` around strange_feeling is preserved.
`gk.known` is a C global, so food_detect reports it via an out-param
(read.js keeps `known` module-local) — same device as print_dungeon.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(63+0.49/turn); per-session strict PASS on seed2200/0501/5006/4500/
0030/0108. No public session reads this scroll, so probed directly:
nothing-found → 1 with known false (blessed still sets uedibility);
under-hero-only → 0/known; food away → known + ration mapped at its
square; class switch verified both ways (cursed ignores food, sober
ignores potions); monster-carrying-food-on-hero counts as ctu; dead
monster skipped. browse_map/getpos is interactive and shared with
object_detect — not probe-covered, said so in the D-log.
187 ins / 4 del across 2 js files.
**Next:** `detect.c` object_detect clear_stale_map caller (named).

## 2026-09-03 — D-1780 dungeon.c lev_by_name / find_branch pd==NULL

**Objective:** queue Open row `teleport.c` lev_by_name. The function
actually lives in `dungeon.c`; teleport.c is only its caller.
**C locus:** `dungeon.c` `lev_by_name` `:2096-2170`,
`find_mapseen_by_str` `:2651-2661`, `dlev_in_current_branch`
`:2087-2092`, `find_branch` `pd == NULL` arm `:322-334`; caller
`teleport.c` `:1248-1249`.
**JS locus:** `js/dungeon.js` (export + three file-locals, C staticfn),
`js/teleport.js` (caller).
**Change:** the level-tport prompt understood numbers only — every name
returned 0 and the prompt re-asked to the 10-try random-tport limit.
Ported whole with C's normalisation order: `#annotate` label first,
then strip "The "/" level", then the gehennom·hell → valley and delphi
→ oracle aliases, then `find_level`, else branch names via the new
`find_branch` null-pd arm. Both gates ported — `dlev_in_current_branch`
(valley/medusa are one branch) and wizard-or-VISITED, needing both
ledger ends for a branch. teleport.js now runs C's
`else if ((newlev = lev_by_name(buf)) == 0) newlev = atoi(buf)`.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(42+0.33/turn); per-session strict PASS on seed0360 (wizard world tour,
which does drive ^V), seed0108, 2600, 0367, 0361. No public session
teleports by name, so `lev_by_name` was probed against a real
`init_dungeons()` state: wizard off with nothing VISITED gives 0 for
everything; wizard on gives oracle/delphi/"the oracle level" → 8,
sokoban → 9, "the gnomish mines" → 3, "mines" → 0, gehennom and hell
→ 29 (the Valley, not the castle — the alias doing its job), an
annotation "My Stash" → 7 case-insensitively; and both gates flip
correctly in each direction.
154 ins / 12 del across 2 js files.
**Next:** `detect.c` food_detect (named). Not object_detect.
## 2026-09-03 — D-1779 pager.c trap_description + detect.c gates

**Objective:** queue Open row `pager.c` trap_description. Must-fix was
empty after the 728–737 audit (ten ACCEPT-WITH-DEBT, no C-wrongs).
**C locus:** `pager.c` `trap_description` `:164-181`; `detect.c`
`trapped_chest_at` `:135-177` / `trapped_door_at` `:178-197`; call sites
`pager.c:721` `lookat` and `:2094` `look_traps`.
**JS locus:** `js/detect.js` (both gates, exported), `js/pager.js`
(local `trap_description`, C is `staticfn`) at both `lookat` arms.
**Change:** farlook used to answer every trap glyph with `trapname`, so
a detected trapped chest or trapped door read as "bear trap" — and,
because both C gates draw `rn2(20)` while hallucinating, that was an
RNG-visible divergence, not just wording. Ported with C's order intact:
chest gate first, then door, and `trapped_door_at` re-enters
`trapped_chest_at` for a doorless doorway, so a hallucinating farlook
can draw up to three times. Kept C's asymmetry — any floor container
satisfies the chest gate, but an invent/minvent box must be `otrapped`.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(42+0.32/turn); per-session strict PASS on seed0383/0399 (hallu),
seed0106, seed4500, seed0030. No public session farlooks a trapped
chest or door, so the gates were probed directly: 0 draws on a wrong
ttyp, floor chest/large-box true vs rock false, pack box true only when
otrapped, closed trapped door true vs non-door false, and over 400
hallucinating seeds exactly 400 draws with 19 suppressions (~1/20).
92 ins / 6 del across 2 js files.
**Next:** `teleport.c` lev_by_name (named). Not heaven u_left_shop.
## 2026-09-03 — Audit reviews 728–737 (D-1769…D-1778)

**Objective:** C-fidelity review of every JS-touching SHA since the last
`reviews/loop-unattended/` file; cadence full `sessions`. No `js/` edits.
**Reviewed:** `3baada67` D-1769 `set_bc`; `1fbbe0c0` D-1770
`delete_contents`; `dd090eaf` D-1771 `useupf`; `81276343` D-1772
`peacefuls_respond`; `c206da54` D-1773 `gold_detect`; `1f5d551a`
D-1774 newsym I-arm; `b4d526e9` D-1775 `findone`; `24ced3ef`
D-1776 `pronoun_gender`; `cd3e1091` D-1777 Blind `move_bc`;
`c4a32e7c` D-1778 `ballfall`. Ten **ACCEPT-WITH-DEBT**. No Must-fix.
**Score:** 44/44, Scr 11405/11405, RNG 792838/792838,
speed `42+0.32/turn` (R² 0.859). Fortress held.
**Next:** `pager.c` trap_description (named). Not trapname Hallu.
## 2026-09-03 — D-1778 ball.c ballfall + hard_helmet single export

**Objective:** queue row `ball.c` ballfall (named).
**C locus:** `ball.c` `ballfall` `:42-67`; callers `do.c:1805-1809` and
`trap.c:1955-1958`; callee `do_wear.c` `hard_helmet` `:567-573` over
`obj.h` `is_helmet` `:283` and `objclass.h` `is_metallic`/`is_crackable`.
**JS locus:** `js/ball.js` (ballfall), `js/do_wear.js` (new exports),
callers `js/do.js` + `js/trap.js`, clones removed from `dothrow`,
`mhitu`, `potion`, `trap`, `uhitm`, `zap`.
**Change:** ballfall ported with C's evaluation order — `gets_hit` is
computed before `ballrelease`, so the `rn2(5)` is drawn while the ball
is still held, and no draw happens at all when the ball sits on the
hero's spot or is the wielded weapon. Both `// deferred` call sites
wired. Its callee `hard_helmet` had six clones; two (`dothrow`, `trap`)
were C-wrong — no `is_helmet` gate and an inlined IRON..MITHRIL/GLASS
range instead of `is_metallic`/`is_crackable`. One export now.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(69+0.50/turn); per-session strict PASS on seed4500/0030/0012/0014/0360.
No public session is Punished while falling, so both pieces were probed
directly: rng-log counts confirm the short-circuit (0 draws when the
ball is on the hero's spot or wielded; 0 and still carried when welded),
and `hard_helmet` over the real object table returns false for long
sword and iron shoes — the gate the bad clones lacked.
88 ins / 95 del across 9 js files.
**Next:** `pager.c` trap_description (named). Not trapname Hallu.
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
