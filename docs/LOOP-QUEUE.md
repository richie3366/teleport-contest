# Loop work queue

Unattended **port** iterations pop the **first unchecked** row, preferring
**Must-fix** over Open. Live file is **unchecked-only**; done rows go to
`docs/archive/LOOP-QUEUE-DONE.md`, parked proofs to
`docs/archive/LOOP-QUEUE-PARKED.md` (index below).

## Row eligibility (2026-09-16 process take — read before refilling)

Between 2026-09-09 and 2026-09-15, **126 of 362** non-audit iterations were
parks, and **109 of the 161** parked rows were **stale**: the function was
already live and C-cited when the row was written (refill from
`data.md`/`debt.md`/TOP30 line ratios without checking JS). Each cost a
full iteration. The rules below exist to make that class impossible.

Every `- [ ]` row **carries its evidence** in the row text, one of:

- **corpus:** `blocks N/553 (<session-id>, step S, kind=rng|screen)` from
  `node scripts/hidden-proxy.mjs queue` or a park that named this writer;
- **missing arm:** `C <file.c>:<a>–<b> absent from js/<file>.js:<fn>` —
  verified by reading the JS body in `node scripts/brief.mjs <fn>` at
  enqueue, **not** by trusting a map/debt line or a D-number;
- **hang/throw:** a corpus worker `ETIMEDOUT` / `ReferenceError` (Must-fix).

Not evidence: a `c-js-map` deferral line, a `debt.md` D-number, a TOP30
line ratio, "dead callees" that are C `staticfn`, or "never own-row".
A row without evidence is not appended. **The 8–12 band counts eligible
rows only**; when none exists the queue sits short and the iteration does
the next campaign step or a measurement (below) — never filler. Say so in
the journal in one line.

**Stale check (≤3 calls, never an iteration):** the brief for the popped
row shows a live same-named JS body, `0 blocked`, and no C arm missing →
(1) move the row to the Parked **Stale** list as one line, (2) retire or
correct the map/debt line that spawned it, (3) **pop the next row and ship
it in this same iteration**. Do not write a proof essay; do not end the
iteration on a stale row.

**Park-and-requeue:** a diagnostic park that names the real writer (C
function + session) **adds that writer as an Open row in the same commit**
with the session as evidence. A park that names no writer records the one
C-side measurement that would (`geom-probe`, temp C dump, recorder
screen) — that measurement is the next iteration's deliverable
(`[measure]` row), not a reason to refill from the map.

Live Parked lines are **≤ 300 chars**: name — class — proof pointer —
falsifier. Longer proof goes to the archive file under the same name.

Refill sources, in order: `node scripts/hidden-proxy.mjs queue`
(owners not yet parked; a parked owner's **writer** row, if named, counts),
`[campaign]` next steps, `[measure]` rows for the top parked corpus owners
by sessions blocked, `PORT-GAP-TOP30.md` rows the corpus reaches **with a
verified missing arm**, then `c-js-map` omits only when every corpus
family is ≥ 90 % PASS (Constitution §10.13). A level-gen owner
(`mineralize`, `bound_digging`, `wallification`, `place_lregion`…) is where
C *noticed* the difference: its falsifier is `node scripts/geom-probe.mjs
<session>`. Do not duplicate live, archived or parked rows. Do not enqueue
parked D-0006 or `dog_invent`.

## Must-fix (from reviews) — pop first

Written reviews are not theater. Each item is a Keep’d **C-wrong** (JS
contradicts C, not a named omit). After shipping: stamp the cited review
`**Addressed:** D-NNNN` (D-id only), mark the queue line `- [x]`, then
run `node scripts/archive-loop-queue-done.mjs` **in this same commit**.
Do **not** leave `- [x]` in this file. Do **not** put this commit’s hash
in the same SHA (chicken-egg), amend, or make a stamp-only follow-up.
The **next** real commit fills the short hash on the review (and on the
archive row) from `git log -1 --format=%h` of the fix.

Review iterations **prepend** new Keep’d C-wrongs here (not under Open).

A **JS throw** in any corpus session (`hidden-proxy status` owner
`js-throw …`, or a `ReferenceError` in `.cache/hidden/scores.json`
`error`), and a corpus worker **hang** (`ETIMEDOUT` under `verify`), are
always Must-fix rows: they forfeit every later screen of that session
(Constitution §10.14).

## Open (corpus-driven, after Must-fix is empty)

Ranked by corpus sessions blocked. Every row is a recorded C-vs-JS fact;
the fix is the owning C function's port, never a read of a seed, step or
coordinate. Verify with `node scripts/verify.mjs --fn <fn>` (uses the
committed scoreboard; if the row was queued at an older SHA pass
`--base <sha>`). `[campaign]` rows are steps of one multi-iteration plan
(pop in order; each step ships `js/` and keeps 44/44). `[measure]` rows
deliver a C-side measurement + the writer's Open row, no `js/` (commit
and push; the supervisor logs "empty port pushed" — expected).

- [ ] `eat.c` maybe_finished_meal + `allmain.c` stop_occupation gate `[campaign botl-parity 3/3]` — C `stop_occupation` (`allmain.c:684–695`) calls `maybe_finished_meal(TRUE)` (`eat.c:3877–3890`) so a meal at `usedtime >= reqtime` completes («You're finally finished.») instead of aborting («You stop eating»); JS `stop_occupation` (`js/hack.js:1074`) lacks the gate although `maybe_finished_meal` is already exported (`js/eat.js:2101`) — a call-site wiring (measured byte-exact on both lembas sessions, 2026-09-07). Port after step 2; verify `--fn do_statusline2` (expect Healer-92092 + Tourist-91125 PASS) + eat cohort. 2026-09-16 masked-probe: the C-exact wiring (`if (!maybe_finished_meal(TRUE))` gate, D-2230 predicate live) verifies NO MOVEMENT — lembas first diffs (92092@58 / 91125@82 first-bite paint) precede the step-60 completion effect the lembas park measured, so the gate is unreachable pre-diff; full 44/44 + cohort 7/7 byte-identical with it on (reverted). Masked until the step-2 paint gate ships — do not re-attempt standalone.
- [ ] `mon.c` can_carry strong-flat cap + Knight worker spin `[measure]` — blocks 1/553 (scen-normal-Knight-92182, step 13; mattackm/can_carry parks 2026-09-08). C `can_carry` allows a 640-wt chest for a strong flat monster (cap 1000); JS stub caps at 448, so `dog_move` goal differs and `rn2(++chcnt)` draws shift. Importing the canonical `can_carry` (`monmove.js:248`) fixes step 13 **but the worker then spins** (`verify mattackm` → ETIMEDOUT), same class as the ready_weapon Knight-92204 spin. Deliverable: profile/stack of the spinning worker (`node --cpu-prof` or `--inspect` on the replay command from `hidden-proxy show scen-normal-Knight-92182`, prefix moves past step 13) naming the sync loop; then an Open row for that loop (a hang forfeits every later screen — Must-fix class). No `js/` unless the loop is found and is one C-cited fix.
- [ ] `mhitu.c` hitmu damage post-processing at a rat AD_DRCO bite `[measure]` — blocks 1/553 (scen-genesis-Priest-91110, step 130, kind=rng; minliquid_core park 2026-09-08). JS lands the bite 74→68, C 74→69 with **identical dice** and no player-damage draws in the step, so the delta is a draw-free damage adjustment (compare C `hitmu` post-`dmg` arms — AC-based reduction, `Half_physical_damage`, `u.uac` sign — against `js/mhitu.js` on a prefix probe). Deliverable: the C line whose arm JS lacks + its Open row; ship in the same iteration if it is one arm.
- [ ] `vision.c` vision_recalc (TOP30 #30 345/180, 36 callers) — **unverified at enqueue (2026-09-15 refill)**: run the stale check first; eligible only if the brief shows a C arm absent from `js/vision.js`. Probe: `node scripts/brief.mjs vision_recalc`.
- [ ] `end.c` disclose — blocks 1/553 (scen-wish-Priest-92179 step 100 kind=screen, identical toplines; parked 2026-09-09 as writer-unidentified, re-opened by really_done park terms). Falsifier from the park: C display-stream logging or a per-turn occupant/draw dump over steps 99–101. Treat as `[measure]` unless the brief shows a missing arm. Probe: `node scripts/brief.mjs disclose`.
- [ ] `mkobj.c` `mkbox_cnts` BoH weight factor (data.md:302) — **unverified at enqueue (2026-09-15 refill)**: stale check first. Probe: `node scripts/brief.mjs mkbox_cnts`.
- [ ] `polyself.c` `skinback` uskin merge arms (data.md:334) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs skinback`.
- [ ] `muse.c` `rnd_misc_item` See_invisible peaceful-invis arm (data.md:534) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs rnd_misc_item`.
- [ ] `display.c` `map_location` tseen + add_to_container merge (data.md:716) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs map_location`.
- [ ] `sp_lev.c` `load_special` soko1-1/soko4-1 remainder (data.md:784-788) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs load_special`.
- [ ] `region.c` `save_regions` binary format + free_region teardown (data.md:987) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs save_regions`.
- [ ] `dungeon.c` `single_level_branch` Knox arm (data.md:1039) — **unverified at enqueue**: stale check first. Probe: `node scripts/brief.mjs single_level_branch`.

## Deferred (map-driven singletons — do not pop while any corpus family is < 90 % PASS)

Plain bullets on purpose (not popped, not counted). Re-enable as `- [ ]`
Open rows only when `hidden-proxy status` shows every family ≥ 90 %.

- `monmove.c` dochug demon/caster retaliation — MS_BRIBE mux skipped by D-1798; live `demon_talk`/`cuss` unwired at monmove.c:823/985 (sounds.c:1143/1150 wired).
- `artifact.c` artiname/discover_artifact/artidisco[] save-rest — discovery announce + artidisco bit (D-1107 live; save/rest artidisco named; c-js-map data.md).
- `artifact.c` restore_artifacts save-rest — artilist restore on load (named in init_artifacts D-1201 row; c-js-map data.md).
- `artifact.c` arti_invoke on drop / questart artitouch / zap-poly addinv_core1 — invoke-touch family (named in cspfx W_ART D-1539 row; c-js-map data.md).
- `vision.c` howmonsseen — artifact-warn see-monsters helper (named in SPFX_WARN D-1514 row; c-js-map data.md).
- `dogmove.c` dog_move beg/dog_hunger caller wiring — dogmove.c:383 `beg(mtmp)` unwired in live `js/dogmove.js` dog_move (named in `beg` D-1763 + js/sounds.js:518; c-js-map turns.md).
- `wintty.c` core cliparound call sites — allmain.c:546 moveloop, dungeon.c:1580 u_on_newpos, muse.c:2637, restore.c:629 (named D-1974/D-1982; tty_cliparound live, unwired; c-js-map turns.md).
- `display.c` get_othersym base + assign_graphics showsyms copy (named D-1983; SYM_OFF_X/SYM_MAX live; c-js-map turns.md).
- `display.c` docrt_flags maponly/redrawonly/nocls + post_map botlx/update_inventory (named D-1974/D-1981; c-js-map turns.md).

## Parked (do not pop) — index

One line per row; **full proofs live in `docs/archive/LOOP-QUEUE-PARKED.md`**
(`rg -n '<fn>' docs/archive/LOOP-QUEUE-PARKED.md`). A parked row re-enters
Open only when its falsifier fires — `verify`/rescore names the function as
the **owner** of a blocked session — or when a park names its **writer**
(then the writer gets the Open row, see header). New parks: one line here
(≤ 300 chars: name — class — proof pointer — falsifier); the long proof, if
any, goes to the archive under the same name. Never re-pop a Stale entry
for a map/debt/TOP30 line.

### Diagnosed / misattributed / symptom owners (writer leads inside)

- `zap.c` poly_obj dealloc_oextra — MISATTRIBUTED 2026-09-14. Falsifier: a rescore or fresh `verify poly_obj` showing a session blocked with poly_obj as owner (not mere stepFns presence), or a C-side polymorph-of-named-object trace showing otmp keeping oname…
- `fountain.c` drinkfountain — MISATTRIBUTED 2026-09-14. Falsifier: a C display-RNG trace (temp-instrumented recorder tagging `rn2_on_display_rng` draws across the ESC step) naming the extra/missing draw, or any vision/display repaint port…
- `uhitm.c` that_is_a_mimic — MISATTRIBUTED 2026-09-14. Falsifier: a C experiment (temp print of levl glyph + newsym arm at the makemon appear message with a recorder rebuild, or a C memory dump at step 89) naming the glyph writer; re-queue under that…
- `mhitu.c` passiveum — PRESENCE-ONLY 2026-09-14. Falsifier: a rescore or fresh `verify passiveum` showing a session blocked with passiveum as owner (not mere stepFns presence)
- `sp_lev.c` get_location — PRESENCE-ONLY 2026-09-14. Falsifier: a rescore or fresh `verify get_location` showing a session blocked with get_location as owner (not mere stepFns presence)
- `makemon.c` mkclass_aligned — PRESENCE-ONLY 2026-09-14. Falsifier: a rescore or fresh `verify mkclass_aligned` showing a session blocked with mkclass_aligned as owner (not mere stepFns presence)
- `mhitu.c` mattacku — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify mattacku` showing a session blocked with mattacku as owner (not mere stepFns presence), a mattacku cEntry, or a mattacku-arm topline at its step
- `allmain.c` maybe_generate_rnd_mon — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify maybe_generate_rnd_mon` showing a session blocked with maybe_generate_rnd_mon as owner (not mere stepFns presence), a maybe_generate cEntry/jsEntry, or a…
- `eat.c` gethungry — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify gethungry` showing a session blocked with gethungry as owner (not mere stepFns presence) or a hunger topline at a gethungry step
- `attrib.c` exercise — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify exercise` showing a session blocked with an encumbrance topline or an `encumber_msg`/`pickup.c` owner at an exercise step — re-queue under that writer…
- `wield.c` chwepon — MISATTRIBUTED 2026-09-09. Falsifier: a rescore or fresh `verify chwepon` showing a session blocked at an enchant-weapon step with chwepon draws in stepFns; re-queue under the writer the diff names (live residuals belong to…
- `mcastu.c` mcast_death_touch — SYMPTOM 2026-09-09. Falsifier: such a dump or a writer port (`mplayer`/`newcham`/`mon_arrive`) moving `verify mcast_death_touch` (expect Tourist-92134 → PASS or a later owner)
- `apply.c` magic_whistled — MISATTRIBUTED 2026-09-08. Falsifier: a rescore or fresh `verify magic_whistled` naming a live step-≤78 block
- `weapon.c` dmgval — MISATTRIBUTED 2026-09-08 (fired owner: Priest-91137 moved to do_statusline2 with no js/)
- `objnam.c` doname_base — MISATTRIBUTED 2026-09-08. Falsifier: a `wield.c ready_weapon` shine-arm port (`artifact_light && !lamplit` → `begin_burn` + `pline("%s to shine %s!")`) moving `verify doname_base` (expect Rogue-92037 → PASS or a later…
- `zap.c` zapyourself — MISATTRIBUTED 2026-09-08. Falsifier: a `dobuzz`/display beam-paint port (why C shows `@` where JS shows `│` at row 6 col 8 at the «hits you!» More prompt) moving `verify zapyourself` (expect Priest-92235 → PASS or a later…
- `artifact.c` dump_artifact_info — MISATTRIBUTED 2026-09-08. Falsifier: a `touch_artifact`/makewish-port moving `verify dump_artifact_info` (expect Priest-92136 → PASS or a later owner); re-queue under that writer — cf
- `hack.c` spoteffects — MISATTRIBUTED 2026-09-08. Falsifier: an `mthrowu.c m_throw`/`u_catch_thrown_obj` port (forcehit stop + catch inventory/pline) moving `verify spoteffects` (expect Samurai-92161 → PASS or a later owner); re-queue as Open…
- `mhitm.c` mattackm + `mon.c` can_carry — SYMPTOM 2026-09-08. Body faithful; the step-13 writer is the `can_carry` stub (cap 448 vs C 1000) whose import hangs the Knight-92182 worker → Open `[measure]` row above
- `were.c` were_change residual scen-intrinsic-Healer-92124 — MISATTRIBUTED 2026-09-08. Falsifier: a JS prefix-state probe of map cell (57,0) at step 69 (monster covering gold that C's `m_move` step moved away vs a gold-paint gap in `newsym`/`show_glyph`), then re-queue under the…
- `zap.c` lightdamage — MISATTRIBUTED 2026-09-08. Falsifier: a live-C per-turn dump (mon minvis/pos, levl glyph, shadow writes) across the zap turn showing a real repaint, or a session where the transient does NOT converge on the next step
- `teleport.c` rloc — SYMPTOM 2026-09-08. Falsifier: C migrating_mons dump at arrival naming the →(2,8) migrant + its creation step, or a creator port moving `verify rloc`
- `monmove.c` m_move — SYMPTOM 2026-09-08. Falsifier: dohide port moving `verify m_move` for Wizard-92076. (B) scen-poly-Caveman-92202 step 103: C `rn2(20)=5` vs JS `rn2(16)=13` — first draw of that m_move call, both nonzero (both skip),…
- `mon.c` mcalcmove — SYMPTOM 2026-09-08. Falsifier: mask port moving `verify mcalcmove` for Archeologist. (B) scen-wish-Rogue-92137 step 26 + scen-death-Knight-92188 step 20: C lifesave toplines (cMsgOwners savelife end.c:727, unmul…
- `botl.c` do_statusline2 lembas pair — DIAGNOSED 2026-09-07. Falsifier: a botl-parity iteration (menu-close redraw + the three missing sets) that keeps 44/44 green with the gate on; then re-apply gate + maybe_finished_meal and `verify do_statusline2` (expect…
- `dungeon.c` save_dungeon — MISATTRIBUTED 2026-09-07. Falsifier: true-owner rows re-queued — `hidden-proxy verify done_in_by` moving 92080/92140/92050, and a `dunlev_ureached`-writer port moving 92075
- `teleport.c` collect_coords — SYMPTOM 2026-09-07. Falsifier: that port moving `verify collect_coords`
- `wield.c` ready_weapon — DIAGNOSED 2026-09-07. Falsifier: stack/profile of the Knight worker past step 25 (suspects: multi-turn/search lifecycle — recipe carries `20s` keys — or input-exhaustion microtask spin)
- `steal.c` mdrop_obj — DISPLAY-STREAM. Falsifier: C post-turn state (rebuilt-recorder dog_move dump) contradicting JS, or a re-record
- `worn.c` mon_adjust_speed — MISATTRIBUTED 2026-09-08. Falsifier: a C per-turn dump (mons pos/minvis + levl glyphs at step 62) naming the glyph writer, or a summon/display port moving `verify mon_adjust_speed` (expect Barbarian-92079 → PASS or a later…
- `hack.c` dopush — MISATTRIBUTED 2026-09-09. Falsifier: C-side viz at step 127 (`cansee(33,12)` / IN_SIGHT bit) or JS `view_from` boundary audit around wall gap (32,11)
- `dogmove.c` dog_invent — MISATTRIBUTED (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Falsifier: C `movement[]` capture; do not pop
- D-0006 seed1800 pet movement — NEEDS-C-STATE. Falsifier: C `movement[]`/candidate capture for the pet turn (recorder dump); do not implement before it exists
- `zap.c` obj_resists — SYMPTOM 2026-09-08. Falsifier: per-session owner rows moving under `verify obj_resists`
- `detect.c` dosearch residual — DIAGNOSED 2026-09-07. Falsifier: C per-turn mon positions during the multi-turn search (geom-probe invalid: appended playmode:debug diverges the run — different drop item, whole-map unknown, RNG totals differ; recorder…
- `timeout.c` slimed_to_death — MISATTRIBUTED 2026-09-08. Falsifier: mhitu.c caller read confirming the landing gate + a combined port moving `verify slimed_to_death` (expect Valkyrie-92229 → PASS or a later owner)
- `uhitm.c` hmonas — MISATTRIBUTED 2026-09-08. Falsifier: a hitum/mattacku More-paint-ordering port (why C defers newsym/botl past the More prompt) moving `verify hmonas` (expect Priest-92163 → PASS or a later owner); re-queue under that writer…
- `mon.c` minliquid_core — SYMPTOM 2026-09-08. Falsifier: an `mhitu.c` rat-bite AD_DRCO (Con-drain/damage) port that makes step-130 HP/dice match and moves `verify minliquid_core` (expect Priest-91110 → PASS or a later owner); re-queue under…
- `monmove.c` distfleeck — SYMPTOM 2026-09-08. Falsifier: per-session owner rows moving under `verify distfleeck` — Healer via a domove_bump_mon port (re-queue as Open `hack.c domove_bump_mon` when singletons re-enable at ≥ 90 % or a second…
- `allmain.c` regen_hp — SYMPTOM 2026-09-08. Falsifier: a rescore or fresh `verify regen_hp` showing a session blocked at a regen_hp step
- `polyself.c` break_armor — DISPLAY-STREAM 2026-09-09. Falsifier: a More-paint-ordering port (why C holds the pre-newsym map at the More prompt) moving `verify break_armor` (expect Tourist-92171 → PASS or a later owner); re-queue under that writer —…
- `mkmaze.c` mv_bubble — MISATTRIBUTED 2026-09-09. Falsifier: a writer port moving `verify collect_coords` for Tourist-92100 (expect PASS or a later owner)
- `do.c` dodown — MISATTRIBUTED 2026-09-09. Falsifier: a rescore or fresh `verify dodown` showing a session blocked at a stair-key step under owner dodown, or a muse/mthrowu More-paint port moving `verify dodown` (expect Samurai-92088 → PASS…
- `insight.c` one_characteristic — MISATTRIBUTED 2026-09-09. Falsifier: a rescore or fresh `verify one_characteristic` showing a session whose first-differing row is one of the six characteristics lines; re-queue under the writer the diff names (Caveman →…
- `botl.c` do_statusline2 value-residuals — SYMPTOM 2026-09-09. Falsifier: /tmp prefix-state probe (`runSegment` truncated moves) reading JS `u.uac` + worn slots at the step boundary — post-poly `uac`=3 ⟹ message-geometry writer (getlin/display flush path), 7 ⟹…
- `botl.c` do_statusline1 — MISATTRIBUTED 2026-09-09. Falsifier: an enlightenment infravision-gate port moving `verify do_statusline1` (expect Caveman-92138 → PASS or a later owner)
- `insight.c` list_vanquished — MISATTRIBUTED 2026-09-09. Falsifier: a rescore or fresh `verify list_vanquished` showing a session blocked on list *content* (a vanquished line or count row); re-queue under the display/memory writer it names
- `end.c` disclose — SYMPTOM 2026-09-09. Falsifier: C display-stream logging (or a C per-turn occupant/draw dump over steps 99–101) naming the extra C draw / differing occupant; or a paint-path port moving `verify disclose` (expect 92179…
- `allmain.c` u_calc_moveamt — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify u_calc_moveamt` showing a session blocked with u_calc_moveamt as owner (not mere stepFns presence), a u_calc_moveamt cEntry/jsEntry, or an `rn2(3) @…

### Stale (already shipped when the row was written; verify 0 blocked)

Grouped by C file. Each was a refill row copied from a `data.md`/`debt.md`/
`absent.md`/TOP30 line after the function had shipped. Do not re-enqueue;
retire the spawning map line when you touch that section.

- `apply.c`: getobj_apply CMDQ_KEY; release_hold WAN_OPENING + flash_hits_mon; use_crystal_ball; use_figurine; flip_through_book/flip_coin; use_unicorn_horn trouble-fix envelope; use_bell; use_pole; fig_transform; use_towel wet/dry_a_towel + burnarmor dry; use_tinning_kit; use_candle/use_candelabrum; use_stone; use_whip grapple/pole family; use_trap
- `artifact.c`: arti_cost; artifact_hit realizes/drain/blind arms
- `attrib.c`: from_what; adjattrib
- `cmd.c`: getdir direction machinery; paranoid_query ParanoidBreakwand/ParanoidPray
- `detect.c`: do_mapping; reveal_terrain
- `dig.c`: adj_pit_checks ladder arm; furniture_handled + digactualhole HOLE fall/migrate; dig_up_grave + dighole IS_GRAVE; mkcavearea/mkcavepos/rm_waslit; use_pick_axe/use_pick_axe2 via doapply is_pick|is_axe
- `do_name.c`: x_monnam
- `do_wear.c`: stop_donning; toggle_stealth RIN/ELVEN cloak+boots on/off + EStealth; ggetobj takeoff + take_off occupation + cancel_doff
- `do.c`: u_stuck_cannot_go
- `dokick.c`: costly_gold/donate_gold shop gold bill; kick_object Is_box/container_impact/chest_trap + ghitm; kick_nondoor SDOOR/altar/fountain/grave/sink + helpers; kick_nondoor throne destroy/loot/fall_through + tree fruit/swarm
- `eat.c`: is_edible poly diets + doeat_nonfood; cprefx; lesshungry; doeat_nonfood; newuhs; costly_tin + use_tin_opener tin-shop bill; cpostfx corpse specials / corpse_intrinsic / givit / AD_STUN hallu; eatspecial PAPER/potion/eataccessory/leash/trident/flint/uwepgone/unpunish
- `end.c`: really_done
- `hack.c`: test_move + domove_core; trapmove; still_chewing body
- `insight.c`: show_conduct
- `makemon.c`: corpse-name mextra; m_initweap; grow_up
- `mhitu.c`: hitmu monster-hits-hero dispatch; hitmu
- `mkmaze.c`: fix_wall_spines lavawall→wall
- `mon.c`: undead_to_corpse; resists_ston/poly_when_stoned worn/artifact STONE_RES arms [dead arm]; xkilled; newcham; make_corpse; can_be_hatched body
- `mondata.c`: big_little_match; name_to_monplus
- `monmove.c`: dochug
- `muse.c`: use_offensive; use_defensive hurt-monster defensive-item depth
- `music.c`: awaken_soldiers BUGLE + ubuzz FIRE/FROST horn; do_earthquake DRUM_OF_EARTHQUAKE
- `objnam.c`: makeplural
- `pager.c`: look_at_monster; lookat; do_screen_description
- `pickup.c`: in_or_out_menu more-containers 'n'; loot_in_first 'r' reversed + explain_container_prompt; collect_obj_classes INVLET arms (+ `invent.c`)
- `pline.c`: vpline
- `polyself.c`: set_uasmon INFRAVISION FROMFORM + enlightenment infravision line — D-2276 shipped (1237c4d4); arm live at js/polyself.js:678-679, 0 blocked; Caveman-92138 → PASS (83/83) at HEAD
- `potion.c`: potionhit GAIN_LEVEL/LEVITATION/FRUIT/DETECT [dead arm]; peffect_acid; make_sick Unaware talk suppress; dodrink underwater drink_ok_extra + Strangled residual; peffect_invisibility body; peffect_restore_ability body
- `pray.c`: offer_too_soon; doturn; gcrownu; fix_worst_trouble majors Stoned…Region
- `shk.c`: dopay robbed/angry/debit; getcad + `mkobj.c` costly_alteration/bill_dummy_object; sellobj BSS + robbed micro-arms
- `sit.c`: rndcurse
- `sounds.c`: dosounds fountain/sink You_hear + shop You_hear; domonnoise
- `steed.c`: dismount_steed
- `timeout.c`: burn_away_slime + LS_OBJECT/BURN_OBJECT; vomiting_dialogue; nh_timeout dialogues
- `topten.c`: formatkiller
- `trap.c`: untrap disarm arms; ignite_items + `apply.c` catch_lit; mintrap; dotrap; instapetrify + barefoot kick petrify + bhit DISP_FLASH
- `uhitm.c`: mhitm_ad_famn; hmon_hitmon_barehands
- `vault.c`: gd_sound
- `wield.c`: ready_weapon artifact-light shine arm — D-2182 shipped (review 1148 ACCEPT); arm live at js/wield.js:490-496, 0 blocked; Rogue-92037 → drinkfountain@227 (later owner)
- `worn.c`: mon_break_armor
- `zap.c`: unturn_dead/revive invent+floor; zap_over_floor closed-door/SDOOR/IRONBARS shopdamage; cancel_monst; explode
