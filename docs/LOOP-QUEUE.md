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
with the session as evidence — after one `brief.mjs <writer>` confirms
the arm is still absent (a park's writer claim ages too: `ready_weapon`
shine and `set_uasmon` infravision were queued 2026-09-16 from parks and
had shipped as D-2182 / D-2276). A park that names no writer records the
one C-side measurement that would (`geom-probe`, temp C dump, recorder
screen) — that measurement is the next iteration's deliverable
(`[measure]` row), not a reason to refill from the map. A finished
`[measure]` row leaves **≤ 3 lines** in `NOTES.md` Active; the full
measurement goes into the writer's Open row (and the archive parked row).

Live Parked lines are **≤ 300 chars**: name — class — proof pointer —
falsifier. Longer proof goes to the archive file under the same name.
The supervisor recognises a Parked-row move or a popped `[measure]` row
as a legitimate no-`js/` iteration; an iteration whose only parks are
**STALE** gets a "ship the queue head" overlay on the next port iteration.

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

- [ ] `insight.c` status_enlightenment held-by/holding + `trap_predicament` utrap arms — blocks 3/553 (scen-genesis-Knight-92002 step 81, scen-wish-Caveman-92148, scen-wish-Monk-92013; owner `one_characteristic` is the region heuristic — `hidden-proxy queue` shows the differing screen row: C «You were held by a pit fiend (north).» vs JS «You weren't hungry <891>.»). C `insight.c:1086–1098` (`u.utrap` → `trap_predicament(predicament, final, wizard)` + steed/anchored `enl_msg` vs `you_are`) and `:1124–1131` (`else if (u.ustuck)`: `ustick = Upolyd && sticks(youmonst.data)`, `"%s %s (%s)"` holding/held by + `heldmon` + `dxdy_to_dist_descr(dx, dy, TRUE)`, `you_are`) absent from `js/invent.js:5077–5097` status_enlightenment (its own comment defers both; only the `uswallow` arm is live). `trap_predicament` (`insight.c:233`) has no JS body; `dxdy_to_dist_descr` is live (`js/display.js:7158`). Port both arms in C order (utrap block before the ustuck/uswallow block). Probe: `node scripts/brief.mjs status_enlightenment`; verify `node scripts/verify.mjs --fn one_characteristic` (expect Knight-92002 → PASS or later owner) + `#enlightenment`/death-disclosure cohort (seed0030).
- [ ] [measure] `zap.c` obj_resists S2/S3 writers — blocks 6/553 (scen-tour-Samurai-92032 step 59: C 3× `rn2(100)`@obj_resists mid-`m_move` vs JS `rn2(5),rn2(1),rn2(2)` then reconvergence — fire-trap `burnarmor`/`destroy_items` event C ran and JS skipped?; scen-tour-Wizard-92219 step 115: C `obj_resists` ×3 with no preceding dochug draw vs JS HORSE/APE moves + gel cube skipped despite `movement=12` — fmon-order / move-gate split). S1 (savebones) shipped. Deliverable: a C-side per-turn dump (temp `fprintf` in `movemon`/`dochug` of fmon order + `movement` + trap state at those steps on the recorder, reverted after) naming the writer for each session, then the writer's Open row. Do not re-port `obj_resists` (body faithful, parked). Probe: `node scripts/hidden-proxy.mjs show scen-tour-Wizard-92219`; archive row `zap.c obj_resists` for the falsified candidates (do not re-check them).
- [ ] [measure] `teleport.c` rloc migrant creation — blocks 2/553 (scen-tour-Healer-92042 step 73: C `losedogs → mon_arrive(MIGR_RANDOM) → rloc` for a migrant JS never created — mydogs empty, all prior RNG matched, screens byte-identical; scen-tour-Ranger-92033 unprobed). Deliverable: C `migrating_mons` dump at arrival (temp fprintf in `losedogs`/`mon_arrive` on the recorder, reverted) naming the →(2,8) migrant + its creation site (`migrate_orc` / muse stairs / dig hole / dokick / RANDOM creator), then the creator's Open row; prefix-probe Ranger-92033 the same way. Do not re-port `rloc` (body faithful D-0686). Probe: `node scripts/hidden-proxy.mjs show scen-tour-Healer-92042`.
- [ ] [measure] `monmove.c` m_move Caveman-92202 `cnt-j` split — blocks 3/553 (scen-poly-Caveman-92202 step 103: C `rn2(20)=5` vs JS `rn2(16)=13`, first draw of that `m_move` call, `appr!=0` both sides, candidate count differs by exactly 1; Wizard-92076 writer `dohide` shipped). Candidates left by the park: one extra `mfndpos` candidate in C, an `mtrack` history shift (all 6 C `mon_track_clear` sites have JS counterparts — verify they fire at the same turns), a `mon_track_add` timing gap. Deliverable: C `mfndpos` position list + `mtrack[]` dump at step 103 on the recorder (temp fprintf, reverted) vs the JS prefix-state probe, then the writer's Open row. Do not re-port the selection loop (faithful, parked). Probe: `node scripts/hidden-proxy.mjs show scen-poly-Caveman-92202`.
- [ ] [measure] `distfleeck` invocation stream (top parked corpus owner post-rescore, 7/553: scen-genesis-Knight-92112 step 96, scen-intrinsic-Samurai-92239, scen-normal-Tourist-92061 — C draws `rn2(5)=1` in `distfleeck`, JS `rn2(10)=1` from `m_move` (monmove.js:1827)). Deliverable: temp C dump of the `distfleeck` call stream (which monster flees, from/to cells) across Knight-92112 step 96 vs the JS replay + the writer's Open row (no `js/`; commit and push — "empty port pushed" expected).
- [ ] [measure] `worn.c` mon_adjust_speed Barbarian-92079 glyph writer — blocks 1/553 (scen-tour-Barbarian-92079 step 62, kind=screen: identical toplines, row 5 C `·@·` vs JS `Y@'`; parked MISATTRIBUTED — body arm-for-arm D-0871, 0 RNG draws, proven no-movement). Deliverable: C per-turn dump (mons pos/minvis + levl glyphs at step 62 on the recorder, temp instrumentation reverted) naming the summon-path glyph writer, then the writer's Open row. Do not re-port `mon_adjust_speed`. Probe: `node scripts/hidden-proxy.mjs show scen-tour-Barbarian-92079`; archive row `worn.c mon_adjust_speed` for the full proof.
- [ ] `eat.c` `losehp` death-path bypass at the two corpse-damage sites: C `eat.c:1926–1942` `losehp`-call arms absent from js/eat.js:eatcorpse (verified via `brief.mjs losehp` at enqueue: canonical `losehp` live at `js/hack.js:1228` sync, 0 blocked, no row names it) — C `eat.c:1926` `losehp(rnd(15), "acidic corpse"/"acidic glob", …)` + `:1942` `losehp(rnd(8), "cadaver"/"rotted glob", KILLED_BY_AN)` vs JS inline `uhp -= rnd(15)/rnd(8)` + `botl` flag only (D-2402), so Upolyd/mh handling, `end_running`, killer attribution and the death path never run. Fix: route both sites through canonical `losehp` (`imports.mjs --can eat.js hack.js losehp` → ALREADY, no new edge).
- [ ] `insight.c` `list_genocided` ngone>0 menu arm — blocks 1/553 (scen-wish-Samurai-92088 step 272: C «Do you want a list of species genocided? [ynaq] (n)» vs JS «Do you want to see your conduct and achievements? [ynq] (n)»). C `insight.c:3007–3131` full menu body absent from `js/insight.js:846` stub (verified via `brief.mjs list_genocided` at enqueue: in-progress empty path only; `num_extinct`/`num_gone`/`set_vanq_order` NOT FOUND in `js/`). Port the ngone>0 arm in C order. Probe: `node scripts/brief.mjs list_genocided`; verify `node scripts/verify.mjs --fn list_genocided`.

Ranked by corpus sessions blocked. Every row is a recorded C-vs-JS fact;
the fix is the owning C function's port, never a read of a seed, step or
coordinate. Verify with `node scripts/verify.mjs --fn <fn>` (uses the
committed scoreboard; if the row was queued at an older SHA pass
`--base <sha>`). `[campaign]` rows are steps of one multi-iteration plan
(pop in order; each step ships `js/` and keeps 44/44). `[measure]` rows
deliver a C-side measurement + the writer's Open row, no `js/` (commit
and push; the supervisor logs "empty port pushed" — expected).

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
- `mhitm.c` mattackm + `mon.c` can_carry — RESOLVED 2026-09-16. Canonical `can_carry` import shipped (`js/dogmove.js:17`); Knight-92182 replays in 0.3 s with no spin, past step 13 to step 95 under parked `obj_resists`. Falsifier: a rescore newly blocking a session on mattackm/can_carry
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
- `end.c` disclose — SYMPTOM 2026-09-16 (re-measured): body faithful (js/end.js:769, 6 arms); step-100 diff = hallucinated repaint post-attributes-menu (C frozen 90–97, repaint at 100 both sides, core 3081/3081). 2nd drinkfountain-class witness. Falsifier: drinkfountain park trace; re-queue under its writer.
- `allmain.c` u_calc_moveamt — PRESENCE-ONLY 2026-09-10. Falsifier: a rescore or fresh `verify u_calc_moveamt` showing a session blocked with u_calc_moveamt as owner (not mere stepFns presence), a u_calc_moveamt cEntry/jsEntry, or an `rn2(3) @…
- `region.c` save_regions — DIAGNOSED 2026-09-16: binary NHFILE format unportable (JS saves JSON, Constitution §1.6); teardown clear_regions live js/region.js:647; never a corpus owner. Falsifier: save-oracle/tagged-restore divergence naming region state.

### Stale (already shipped when the row was written; verify 0 blocked)

Grouped by C file. Each was a refill row copied from a `data.md`/`debt.md`/
`absent.md`/TOP30 line after the function had shipped. Do not re-enqueue;
retire the spawning map line when you touch that section.
- `mhitu.c` hitmu rat AD_DRCO `[measure]` — STALE 2026-09-16: scen-genesis-Priest-91110 now PASS 151/151 at HEAD; `js/mhitu.js:3307` live C-order body, 0 blocked. Falsifier: rescore newly blocking a session on hitmu.
- `vision.c` vision_recalc (TOP30 #30) — STALE 2026-09-16: `js/vision.js:908` full C-order port (Blind/pit/xray/nv/lights/main loop), 0 blocked; only delta `notice_all_mons(TRUE)` tail (async fan-out, 36 callers). Falsifier: rescore blocking a session on vision_recalc.
- `mkobj.c` mkbox_cnts BoH weight — STALE 2026-09-16: full C-order body live js/mkobj.js:791 (D-0361/D-2265), 0 blocked; weight factor = bless-arm deferral, not this fn. Falsifier: rescore blocking a session on mkbox_cnts.
- `polyself.c` skinback merge arms — STALE 2026-09-16: 15-line C verbatim live js/polyself.js:1366, 0 blocked; merge arms live in polymon. Falsifier: rescore blocking a session on skinback.
- `muse.c` rnd_misc_item See_invisible arm — STALE 2026-09-16: case-1 gate shipped D-2086 (js/makemon.js:2665+2694), 0 blocked. Falsifier: rescore blocking a session on rnd_misc_item.
- `display.c` map_location tseen — STALE 2026-09-16: wrapper + tseen arm live js/display.js:4798 (D-0120/D-0326/D-1528), 0 blocked. Falsifier: rescore blocking a session on map_location.
- `sp_lev.c` load_special soko remainder — STALE 2026-09-16: load_soko1_1/4_1 live js/mklev.js:12307/12839 (D-0756 fixed), 0 blocked. Falsifier: rescore blocking a session on load_special.
- `dungeon.c` single_level_branch Knox — STALE 2026-09-16: 7-line fn + stairs/end/teleport callers live (js/teleport.js:2133), 0 blocked; 2 caller gates stay named omits. Falsifier: rescore blocking a session on single_level_branch.
- `eat.c` stop_occupation gate [botl-parity 3/3] — UNMASKED 2026-09-16 (D-2405 shipped step 2; re-queued Open with post-gate evidence: lembas pair at 59/83).
- `eat.c` deferred singletons (map turns.md eat section): is_edible poly diets + doeat_nonfood; cprefx; lesshungry; newuhs; costly_tin bill; cpostfx specials/intrinsic/givit/AD_STUN; eatspecial PAPER/potion/accessory/leash/trident/flint/uwepgone/unpunish.

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
