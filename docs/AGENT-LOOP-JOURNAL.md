# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — review 738–754 re-audit `3baada67`…HEAD (4 QUALITY-RISK)

**Objective:** manual review overlay of every JS SHA from `3baada67`
inclusive. Do not port. Do not treat overlay 728–737 as finished.
**Verdicts:** 738–746 and 749/751/753/754 **ACCEPT-WITH-DEBT**; **747,
748, 750, 752 QUALITY-RISK**. Overlay **737** AWD was wrong.
**C-wrongs (Must-fix, oldest first):** (1) `do.c:1805` / `trap.c:1955`
ballfall gated on never-written `u.Punished` (C `Punished` ≡ `uball
!= 0`); (2) lookat still `t_at&&tseen` so detected chest/door never
named (`glyph_to_trap` NOT FOUND; `getpos.js:666` still `trapname`);
(3) `spell.c` `SPE_DETECT_FOOD` never calls `seffects(pseudo)`;
(4) `keepdogs` `for-of` live `fmon` while `migrate_to_level` splices.
**Cadence:** full `sessions` at `da520eda` **44**/44, Scr
**11,405**/11,405, RNG **792,838**/792,838, speed `44+0.34/turn`.
Rule #2 clean. **Next:** first Must-fix (`u.uball` ballfall callers).
Did not write STOP.
## 2026-09-03 — D-1785 vision.c do_clear_area override_vision / one export

**Objective:** queue Open row `vision.c` do_clear_area off-hero
view_from + detect.js clone. Must-fix empty.
**C locus:** `vision.c` `do_clear_area` `:2106-2148`; `detect.c`
`detecting` `:1927-1932`; five call sites (findit, openit, wantdoor,
gush, set_lit).
**JS locus:** `js/vision.js` (the one export), `js/detect.js` (clone
deleted, `detecting` exported, `openit` fixed), `js/dogmove.js`,
`js/fountain.js`, `js/read.js`.
**Change:** detect.js had a second, hero-only do_clear_area with no
off-hero view_from arm, and neither copy had C's override_vision. That
gate is load-bearing: vision does not pass through water or clouds, so
on the water and air levels couldsee is false almost everywhere and
detection would sweep nothing. openit had also been rewritten to collect
cells through an anonymous arrow, which silently destroyed the callback
identity detecting() tests — so even a correct gate could not have
fired. Now one async export with C's shape end to end, `detecting`
exported from detect.js (C's own extern.h structure), the clone gone,
and openit passing `openone` itself again. All five callers await, which
made dog_goal async; dog_move already was.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(66+0.50/turn). dog_goal turning async touches pet movement, so strict
lengths were checked on the pet/fountain sessions specifically —
seed1800 (the parked D-0006 seed), 0004, 0015, 0014, 0103, plus 0030,
4500, 0360 — all PASS. sym.mjs now reports a single do_clear_area.
No public session detects on water/air, so override_vision was probed:
with couldsee false everywhere and a locked chest in range, an ordinary
level opens 0 and the chest stays locked; the water and air levels each
open 1 and unlock it. A first probe run hung on both special levels —
my synthetic grid used typ 19 as "room" when the real ROOM is 25, and 19
reads as drawbridge terrain, so open_drawbridge blocked on display.
Probe bug, not a port defect. The leftover `CIRCLE_*` clone tables in
detect.js were deleted with the helper.
49 ins / 61 del across 5 js files — net delete, one clone gone.
**Next:** `do_name.c` mon_nam_too + monverbself (mhitm.js clone).
## 2026-09-03 — D-1784 display.h maybe_display_usteed ridden bank

**Objective:** queue Open row `display.c` ridden_mon_to_glyph usteed.
Must-fix empty.
**C locus:** `display.h` `maybe_display_usteed` `:246-249` /
`display_self` `:251-259` / `ridden_mon_to_glyph` `:560-562`;
`map_glyphinfo` `:2986-2997` ridden arms.
**JS locus:** `js/display.js` `hero_display_glyph` + `display_self`.
**Change:** while riding, the hero's square used `mon_glyph(steed)`, so
it carried a GLYPH_MON_* id where C emits GLYPH_RIDDEN_*. Same ch and
colour, so nothing on screen moved — but the id is what downstream reads,
so `glyph_is_ridden_monster` was never true and `glyph_to_mon`'s two
ridden arms were dead code. `display_self` also took its wizmgender attr
from the hero when C's map_glyphinfo sets MG_FEMALE from the *steed*.
Both fixed; the stale "named: ridden_mon_to_glyph display_self/usteed
wire" note on `display_monster` corrected — C has no steed arm there.
**Size:** 22 ins / 3 del, deliberately small. C is a two-line macro plus
one map_glyphinfo arm; there is nothing more of this function to port and
padding would break the one-C-function rule.
**Verify:** green gate + strict lengths PASS; full `sessions` 44/44
(63+0.48/turn); strict PASS on the riding sessions 0103/0104 plus 0004
and 4500 — those do ride, so an unchanged screen is the expected result.
Probed with a female pony: mon id 483 (is_ridden false) vs ridden id 3165
(is_ridden true, still is_monster), same ch `u`, `glyph_to_mon(3165)` →
PM_PONY, and `display_self()` mounted stamps 3165 on the hero cell.
**Next:** `vision.c` do_clear_area off-hero view_from + detect.js clone.
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
