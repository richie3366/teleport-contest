# Loop work queue

Unattended **port** iterations pop the **first unchecked** row, preferring
**Must-fix** over Open. The **Open — coverage** block is **generated** from
`docs/ledger/` (`docs/LEDGER.md`); every other section is hand-kept and
unchecked-only. Done Must-fix/corpus rows go to
`docs/archive/LOOP-QUEUE-DONE.md`, parked proofs to
`docs/archive/LOOP-QUEUE-PARKED.md`; the retired refill paragraphs and
Stale lines live in `docs/archive/LOOP-QUEUE-REFILLS.md` /
`docs/archive/LOOP-QUEUE-STALE.md` (2026-09-27).

## Breadth phase (opened 2026-09-18 — Constitution §10.17, `CURRENT.md`)

Held-out read **11/44, RNG 26.6 %, screens 50.0 %** on 2026-09-17 while the
local corpus read 91.7 %: the corpus stopped predicting the judge. Until a
human closes the phase, **Open — coverage** rows are the work: one whole C
function per iteration (every arm, callee, caller; 200–800 lines).

- **The block is generated** by `node scripts/ledger.mjs rows --write`
  (`finish-iteration.mjs` and `check-hot-docs.mjs --fix` run it): measured
  gap on the JS tree, ledger status unknown/absent/scaffold, not live
  elsewhere, not parked. Never paste, reorder or hand-edit block rows.
- **Handoff:** the D-entry `- **Ledger:** <fn> ported|partial|split` bullet;
  finish writes the ledger row and the shipped row leaves the block.
- **Stale check (≤ 3 calls, never an iteration):** `brief.mjs <fn>` shows the
  C body already complete under this or split names →
  `node scripts/ledger.mjs set <fn> ported --note "stale: <js file:line>"`
  (split names: `set <fn> split --js a.js:x,b.js:y --note "stale: …"`), then
  pop the next row and ship it in the same iteration. No Parked line.
- A Must-fix/Open row in the **same C file** as the popped row ships in the
  same iteration. `[measure]` rows, parks-as-work and `hidden-proxy queue`
  refills are **phase 2** (section below) — not popped now. Every `verify`
  must end **REACH-OK**; a regression is fixed in the port, never parked.

## Row eligibility (hand-written rows — Must-fix and corpus)

Between 2026-09-09 and 2026-09-15, 109 of 161 parked rows were **stale**
(already shipped when written, refilled from map/debt/TOP30 lines). The
ledger now records every retired function, so generated rows cannot repeat
them; hand-written rows still carry their evidence.

Every `- [ ]` row **carries its evidence** in the row text, one of:

- **coverage:** generated block only (never hand-written);
- **corpus:** `blocks N/553 (<session-id>, step S, kind=rng|screen)` from
  `node scripts/hidden-proxy.mjs queue` or a park that named this writer;
- **missing arm:** `C <file.c>:<a>–<b> absent from js/<file>.js:<fn>` —
  verified by reading the JS body in `node scripts/brief.mjs <fn>` at
  enqueue, **not** by trusting a map/debt line or a D-number;
- **hang/throw:** a corpus worker `ETIMEDOUT` / `ReferenceError` (Must-fix).

Not evidence: a `c-js-map` deferral line, a `debt.md` D-number, a TOP30
line ratio copied by hand, "dead callees" that are C `staticfn`, or
"never own-row". A row without evidence is not appended. **The 8–12 band
counts eligible rows only**; the generated block always tops itself up,
so the queue never sits short during the breadth phase.

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
The supervisor recognises a Parked-row move, a ledger stale note, or a
popped `[measure]` row as a legitimate no-`js/` iteration; an iteration
whose only parks are stale gets a "ship the queue head" overlay on the
next port iteration.

Sources for hand-written rows — **breadth phase:** none (the block is generated).
**Phase 2 (closed):** `node scripts/hidden-proxy.mjs queue` (owners not yet parked; a
parked owner's **writer** row, if named, counts), `[campaign]` next steps,
`[measure]` rows for the top parked corpus owners by sessions blocked,
`ledger.mjs summary --top N` rows the corpus reaches **with a verified
missing arm**, then ledger `partial` omissions. A level-gen owner (`mineralize`, `bound_digging`,
`wallification`, `place_lregion`…) is where C *noticed* the difference: its
falsifier is `node scripts/geom-probe.mjs <session>`. Do not duplicate live,
archived or parked rows. Do not enqueue parked D-0006 or `dog_invent`.

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

## Open — coverage (breadth phase — pop first after Must-fix)

Generated block — do not edit between the markers. Row: measured class,
C/JS code lines (comments, `#if 0`, braces dropped), hops from the turn
loop, callers, RNG/message loudness, enqueue sha. Deliverable: the whole C
body in C order — every arm, every callee live or named, every C caller
wired — 200–800 lines, `node scripts/verify.mjs --fn <fn>` REACH-OK.
Head order is call-heat from the 2026-09-28 replay of 985 sessions
(941 hidden + 44 public): hottest queue-eligible functions first.
`rows --write` keeps that order while they stay eligible.

<!-- coverage:begin -->
<!-- coverage:end -->

## Open — missing-arm (hand-verified 2026-10-02; coverage block ungeneratable)

The generated block is empty and stays empty: `rows --write` needs C ≥ 8
code lines but every remaining unknown/absent ledger gap is ≤ 7 lines
(all top-1000 verified 2026-10-02). Hand-written per this iteration's
refill authorization: each row's evidence is a `brief.mjs` output read at
enqueue (C body + call sites + JS status), never a map/debt/TOP30 line.
Pop order: first unchecked here after Must-fix/coverage.

- [ ] `rm.h` m_at shknam.js clone removal — C rm.h:510–511 MON_AT-gated lookup call absent from js/shknam.js (local clone :268 with 2 live call sites :624/:677 instead of importing live js/mon.js:1749; C body + 188 refs in brief this session, JS read this session); rewire both sites to the live export, delete clone.
- [ ] `dungeon.c` Is_special end/quest clone removal — C dungeon.c:1448–1457 sp_levchn scan call absent from js/end.js + js/quest.js (local clones :616/:61 instead of importing live js/dungeon.js:2871; brief this session: 14 C call sites, callee live js/dungeon.js:1809) — rewire clone call sites to the C-locus export, delete clones.
- [ ] `dungeon.c` Is_branchlev — C dungeon.c:1464–1473 branches-scan loop absent from js/ (no export; brief this session; sole same-name JS is local clone js/end.js:624; 11 C call sites incl bones/mklev/mkmaze/restore; callee live js/dungeon.js:1809) — port to C locus + rewire clone.
- [ ] `dungeon.c` has_ceiling clone removal — C dungeon.c:1689–1698 endgame-non-earth gate absent from js/dothrow.js + js/mon.js + js/potion.js (local clones :1223/:3944/:642 instead of importing live js/dungeon.js:1330; brief this session: 13 code refs + decl, C-locus body read this session) — rewire clone call sites to the C-locus export, delete clones.

## Open — corpus residuals (breadth phase: ship only with a same-C-file coverage row)

Ranked by corpus sessions blocked. Every row is a recorded C-vs-JS fact;
the fix is the owning C function's port, never a read of a seed, step or
coordinate. Verify with `node scripts/verify.mjs --fn <fn>` (uses the
committed scoreboard; if the row was queued at an older SHA pass
`--base <sha>`). During the breadth phase these pop only when the
coverage list is empty, or alongside a coverage row in the same C file.

## Phase 2 — corpus debugging (closed 2026-09-18; a human reopens it in `CURRENT.md`)

Plain bullets on purpose (not popped, not counted). `[measure]` rows
deliver a C-side measurement + the writer's Open row, no `js/`;
`[campaign]` rows are steps of one multi-iteration plan. Re-enable as
`- [ ]` under Open when the phase reopens.

- `[measure]` Healer (43–47,10–14) cluster first-divergent-turn (W2 park follow-up) — C TEMP-W2 MFND history (re-record scen-tour-Healer-92055 with a log-only `mfndpos`/`m_move` dump in the ignored recorder tree: `mon.c` pre-`data->cnt`, `monmove.c` post-`mfndpos` + track-check, `rng_log_get_call_count()` for correlation, rebuild `CC="cc -arch x86_64"`, revert + rebuild after) vs JS prefix probes (`runSegment` with step-keys 1..T from the committed session, dump cluster occupancy) for T=95–104: bisect to the first turn whose start arrangement differs (turn-104-start: (44,12) C 230 vs JS empty, (45,12) C 246 vs JS 230, (45,11) C 244 vs JS 246?, (46,10) JS 244; test one-turn-lag), then queue the writer's Open row with the session as evidence. No `js/` in the measure commit.
- `[measure]` Samurai-92161 step-37 pet-turn ray-rejector (W3 park follow-up) — blocks 1/553 (scen-tour-Samurai-92161 step 37/88 kind=rng: C 1× rnd(5)@score_targ then distfleeck vs JS wolf+samurai 2×; dog loop proven faithful, see Parked `dogmove.c` W3). Deliverable: TEMP-C re-record with log-only find_targ/best_target dump in the ignored recorder tree (W2-park recipe: `nethack-c/recorder/src/dogmove.c` per-ray m_at/minvis/mundetected/head-square + pet mux/muy + best_target per-ray scores at step 37, `make Sysunix CC="cc -arch x86_64"`, revert + rebuild after; probes in /tmp, never committed), then the writer's Open row with the session as evidence (suspect unseen-layout/lifecycle writer: C (54,7)/(55,8) content vs JS samurai@(55,8)); if the dump shows C's loop (not state) differs, re-queue as dog-loop Open instead. No `js/` in the measure commit.

## Deferred (map-driven singletons — not popped by hand)

Plain bullets on purpose (not popped, not counted). During the breadth
phase a function listed here enters Open only through
the generated coverage block (ledger status + measured gap), or as a same-C-file companion
of a popped coverage row — never by copying the line.

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
any, goes to the archive under the same name. Stale retirements are ledger
rows now (`ledger.mjs set … --note "stale: …"`), not Parked lines.

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
- `botl.c` do_statusline2 lembas pair — RETIRED D-2720 (meal half fired: gate wired js/hack.js, Healer PASS, Tourist → lesshungry@162, 44/44; botl-gate half stays reverted; proof archive:165).
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
- `monmove.c` mfndpos Healer W2 — SYMPTOM 2026-09-16, body faithful: C bat cnt=5, missing cells MON_AT-occupied (230/246/244), same code both sides; arrangement differs pre-turn (C 244@(45,11) vs JS 244@(46,10)). Falsifier: TEMP-W2 C dump + JS prefix probe; proof in archive.
- `dogmove.c` best_target/score_targ Samurai W3 — SYMPTOM 2026-09-16: loop count-identical under identical state (JS find_targ hits ⊆ C hits; full elimination in archive). Falsifier: TEMP-C step-37 pet-turn ray dump naming the (1,1) rejector; re-queue under that writer.
