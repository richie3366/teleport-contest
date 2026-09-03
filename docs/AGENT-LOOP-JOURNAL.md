# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — D-1791 eat.c newuhs hunger / faint / end_running

**Objective:** Open `eat.c` `newuhs` (not `gethungry`).
**C:** `eat.c:3362–3512` + `unfaint` `:3335–3344` + `hack.c`
`end_running` `:4129–4158`.
**JS was:** 14-line field stub; cmd.js `end_running` always zeroed
`multi`.
**Fix:** C body; `unfaint` afternmv; `gethungry`/`morehungry` async;
`end_running` in `hack.js`; cmd clone deleted. Probe 25/25.
**Verify:** green + strict; cohort 8/8 incl. seed1800/0361. save-oracle
skip (untagged).
**Next:** Open `timeout.c` `nh_timeout` property dialogues.
## 2026-09-03 — hidden-score gap ranking; Open queue re-pointed

**Objective:** user request (not a port iteration) — rank the C
functions a session we cannot see is most likely to hit, and make the
Open queue follow that order instead of map-walk order.
**Built:** `scripts/port-coverage.mjs` — indexes 4,868 pinned-C
functions and `js/**` symbols, builds the C call graph, BFSes from the
turn loop, and scores reach x call-breadth x (RNG + message loudness) x
coverage gap, amplified by **dead callees** (C callees with no symbol
and no mention anywhere in `js/`). `--md`, `--limit`, `--name` modes.
**Wrote:** `docs/PORT-GAP-TOP30.md` — the 30 rows with evidence
columns, plus honourable mentions, deliberate exclusions (polymorph /
Gehennom / wizard-wish paths), and the caveat that this is a prior, not
a measurement.
**Hand-verified false positives excluded:** `makelevel` (split into
`makelevel_ordinary`), `display_pickinv`, `mon_arrive`,
`look_at_monster`, `do_screen_description` — all ported piecewise under
other names. Every "dead callee" cited was confirmed absent with
`sym.mjs`.
**Queue:** Open replaced with rows 1–12 (newuhs, nh_timeout dialogues,
dmgval RNG bonuses, make_corpse, mattacku, xkilled, dochug,
spoteffects, test_move/domove_core, moveloop_core, xname_flags,
x_monnam). The nine displaced map rows are listed in the new doc so
nothing is lost. No `js/` change; suite untouched at 44/44.
**Next:** Open row 1 — `eat.c` `newuhs` hunger messages / faint / starve.
## 2026-09-03 — D-1790 mon_nam_too / monverbself one home

**Objective:** first Open — `do_name.c` `mon_nam_too` + `monverbself`
(named; `mhitm.js` clone). Not `pronoun_gender`. Must-fix empty.
**C locus:** `do_name.c` `:1189–1216` / `:1219–1249`; live callers
`apply.c:1126` + `:1158`, `muse.c:184`, `steed.c:429`; callee
`objnam.c` `makeplural` pronoun block `:2853–2869`.
**JS locus:** `js/do_name.js` (both exports), `js/objnam.js`
(makeplural), `js/mhitm.js` (clone deleted, 6 uses rebound),
`js/apply.js`, `js/muse.js`, `js/steed.js`.
**Change:** `monverbself` did not exist; each caller had invented a
stand-in that dropped the reflexive — "too far away to see **in the
dark**" instead of "to see itself in the dark", "<mon> zaps <wand>!"
instead of "<mon> zaps himself with <wand>!", and a hand-rolled
they/themselves table in `kick_steed`. `mon_nam_too` was an
`is_neuter`/`female` clone that never drew C's `rn2(4)`.
**The genders[3] arm is ported as C writes it, not as C's comment
reads:** makeplural("It") = "They" (genders[2].he beats .him), and
`:1240` rewrites that to genders[3].him, so a hallucinated steed reads
"Them rouse themselves!" and "They" → "Theys". Do not correct it.
**Verify:** probe **29/29** (makeplural pronouns, vtense plural test,
mon_nam_too genders, all five live caller strings, three hallucination
shapes). Green+strict incl. seed0383 hallucinate; full `sessions`
**44/44**. save-oracle `do_name.c:monverbself` untagged skip. Rule #2
clean. 116 ins / 39 del across 6 files.
**Next:** Open `apply.c` corpse gender PRONOUN_NO_IT arm `:230–248`.
## 2026-09-03 — D-1789 keepdogs walks a snapshot of fmon

**Objective:** Must-fix review **752** — `dog.c` `keepdogs` must not
`for-of` live `fmon` while `migrate_to_level` splices it. Not
`mon_leave`. Not `losedogs`.
**C locus:** `dog.c` `keepdogs` `:793–794` (`mtmp2 = mtmp->nmon`
saved before the body); departure arms `relmon(&gm.mydogs)` `:863`
and `migrate_to_level` `:906`.
**JS locus:** `js/dog.js` `keepdogs`.
**Change:** walk `[...(game.fmon || [])]` instead of aliasing the
live array, and unlink departers in place — the follower arm splices
`game.fmon` before `mydogs.unshift` (C `relmon`), the accessible arm
already splices inside `migrate_to_level`. Dropped the `stay` array
and the `game.fmon = stay` rebuild, which deleted whatever a
mid-walk splice skipped past.
**Verify:** falsifier probe `[wizard,B,C]` — HEAD `fmon=[C]` (B
vanished) vs patched `fmon=[B,C]`; parity probe `[pet,B,C]` identical
either way, which is why the fortress never saw it. green+strict per
session; cohort 7/7; full `sessions` **44/44**. save-oracle
`dog.c:keepdogs` untagged skip. Rule #2 clean. 28 ins / 17 del.
**Next:** Must-fix empty — first Open `do_name.c` `mon_nam_too` +
`monverbself`.
## 2026-09-03 — D-1788 spell.c SPE_DETECT_FOOD seffects(pseudo)

**Objective:** Must-fix review **750** — `spell.c` `SPE_DETECT_FOOD`
must call `seffects(pseudo)` (skilled bless FALLTHROUGH). Not
`food_detect` scroll. Not `look_traps`.
**C locus:** `spell.c` `spelleffects` `:1517–1531`.
**JS locus:** `js/spell.js` `spelleffects`.
**Change:** D-1781 wired the helper + `seffects` switch. `#cast`
only handed `pseudo` to `seffects` for MAGIC_MAPPING/CREATE_MONSTER.
DETECT_FOOD is now in that arm; bless when `role_skill >= P_SKILLED`.
Remaining scroll-duplicate otyps still named.
**Verify:** green+strict PASS; cohort incl. seed2200 wizard
quaff-zap-read PASS; probe 13/13 (unskilled smell, skilled
tingle+uedibility, REMOVE_CURSE still Nothing happens). save-oracle
`spell.c:spelleffects` untagged skip. Rule #2 clean. 25 ins / 6 del.
**Next:** Must-fix `dog.c` keepdogs must not `for-of` live `fmon`
while `migrate_to_level` splices it.
## 2026-09-03 — D-1787 lookat trap tnum = glyph_to_trap(glyph_at)

**Objective:** Must-fix review **748** — `pager.c` lookat trap tnum =
`glyph_to_trap(glyph_at)`, not `t_at&&tseen`. Not `trapname` Hallu.
Not `look_traps`.
**C locus:** `pager.c` `lookat` `:718–721`; `display.h` `glyph_to_trap`
`:671–674`; `display.c` `glyph_at` `:2477–2483`.
**JS locus:** `js/display.js` `glyph_to_trap`/`glyph_at`; `js/pager.js`
`brief_at`/`describe_looked`; `js/getpos.js` `auto_describe_text`.
**Change:** D-1779 helpers were live behind `t_at&&tseen`. Dummytrap
chest/door is a trap glyph with no `ftrap`. Three lookat clones now
enter on `glyph_is_trap(glyph_at)` and pass `glyph_to_trap`. Floor
objects no longer beat a trap glyph. `glyph_at_gbuf` clone deleted.
**Verify:** green+strict PASS; cohort incl. seed0383 hallu PASS;
probe dummytrap chest+pile → `"trapped chest"`; hallu pit 0×
`rn2(20)`; hallu chest 1×. save-oracle `pager.c:lookat` untagged skip.
Rule #2 clean. 64 ins / 38 del.
**Next:** Must-fix `spell.c` `SPE_DETECT_FOOD` must call `seffects(pseudo)`.
## 2026-09-03 — D-1786 do.c/trap.c ballfall callers gate on u.uball

**Objective:** Must-fix review **747** — `do.c`/`trap.c` ballfall
callers gate on `u.uball` (C `Punished` ≡ `uball != 0`), not sticky
`u.Punished`. Not `drop_ball`. Not `hard_helmet`.
**C locus:** `do.c` `goto_level` `:1805–1808`; `trap.c`
`trapeffect_pit` `:1955–1958`; `youprop.h:77`.
**JS locus:** `js/do.js` falling arm; `js/trap.js` `trapeffect_pit`.
**Change:** D-1778 ported the helper and wrote both C call sites behind
`u.Punished`, which is never assigned. Same `goto_level` already uses
`u.uball` for stair-fall. Both sites now read `u.uball` / `game.u?.uball`;
`!welded` / `!carried` and pit `unplacebc`/`ballfall`/`placebc` kept.
Did not assign `u.Punished`.
**Verify:** green+strict PASS; cohort seed1500/0014/0004 PASS; probe
pit+uball with Punished unset draws `rn2(5)` after set_utrap `rn2(6)`
and fall `rnd(6)`. save-oracle `do.c:goto_level` tagged
ledger-seed0015 (pre-existing stairs-vs-pickup fidelity, not this arm);
`trap.c:trapeffect_pit` / `ball.c:ballfall` untagged skip. Rule #2
clean. 10 ins / 7 del.
**Next:** Must-fix `pager.c` lookat trap tnum = `glyph_to_trap(glyph_at)`.
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
