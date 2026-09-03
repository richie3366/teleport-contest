# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
