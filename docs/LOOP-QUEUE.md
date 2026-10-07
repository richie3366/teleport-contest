# Loop work queue

Unattended **port** iterations pop the **first unchecked** row, in this
order: **Must-fix** (hand-written, strict), then the **Open — cliffs** head,
then the **Open — coverage** head. Both Open blocks are **generated**
(`node scripts/check-hot-docs.mjs --fix` regenerates both; `hidden-proxy.mjs
queue --write` and `ledger.mjs rows --write` individually). Every other
section is hand-kept. Done Must-fix rows go to
`docs/archive/LOOP-QUEUE-DONE.md`, parked proofs to
`docs/archive/LOOP-QUEUE-PARKED.md`; retired refill paragraphs and
Stale lines live in `docs/archive/LOOP-QUEUE-REFILLS.md` /
`docs/archive/LOOP-QUEUE-STALE.md`.

## Cliff phase (opened 2026-10-06 — Constitution §10.18, `CURRENT.md`)

The breadth phase (§10.17) ran its picker dry: on 2026-10-06
`ledger.mjs batch` named **1** function, the ledger's measured counts had
not moved since 2026-10-04 (`docs/ledger/SNAPSHOTS.tsv`), held-out sat at
**16/44, RNG 34.8 %, screens 64.1 %** through ~50 iterations, and the loop
filled its iterations with ledger-text "repairs" and re-audits of the same
coverage head. Meanwhile the corpus read **741/953** with whole families
below half (`scen-options` 1/20, `scen-town` 2/20, `scen-quest` 3/20,
`scen-tutorial` 4/20) — unsaturated, and shaped like the held-out set.
**The picker is the corpus again**, ranked by the metric held-out lags
most: RNG calls lost after the first divergence.

- **The cliffs block is generated** from the **committed**
  `hidden-corpus/scoreboard.json` (`hidden-proxy.mjs queue --write`, top 12
  owners by RNG lost; JS throws first). It changes only when a `verify`
  moves its sessions or an audit rescores the board. Never paste, reorder,
  pad or hand-edit block rows.
- **A tag on a row is context, not a veto.** `history: archived D-…` /
  `ledger: ported` means a D-entry once shipped this owner — read that one
  entry so the same arm is not re-ported; the board saying sessions are
  still blocked there says the work is live. `parked: SYMPTOM /
  MISATTRIBUTED / DIAGNOSED` keeps its discipline: the deliverable is the
  **writer** the first divergence names (`hidden-proxy show <id>` →
  `cEntry` vs `jsEntry`, `cMsgOwners`, differing row), or the owner's
  `[measure]` row below — never a re-port of the symptom owner.
- **Deliverable of a cliff row:** the owning C function (or the writer)
  ported whole, and **movement** on the probe sessions —
  `node scripts/verify.mjs --fn <fn>` shows PASS or a strictly later
  first-divergence step for the sessions the row names, **and** REACH-OK.
  NO MOVEMENT after one fix → measure C in the same iteration (playbook §7:
  `geom-probe`, temp C dump, recorder screen); the measurement either names
  the writer (port it) or becomes the `[measure]` row that parks the owner.
- **Must-fix is strict:** a JS throw / worker hang in any session, a corpus
  or public PASS→FAIL, a review-named C-wrong. A ledger omit/note that
  disagrees with the live body is one `ledger.mjs set` inside whatever
  iteration notices it — never a row, never an iteration.
- **Stale check (≤ 3 calls, never an iteration):** `brief.mjs <fn>` shows
  the C body already complete → `ledger.mjs set <fn> ported --note "stale:
  <js file:line>"`, next row, same iteration.
- **Coverage rows** (ledger gap) pop only when the cliffs block is empty, or
  as a same-C-file companion of the cliff being worked. A coverage row
  whose remaining omissions cannot ship is `audited` once and leaves the
  block — never re-audited.
- Every `verify` must end **REACH-OK**; a regression is fixed in the port,
  never parked, never "named".

## Row eligibility (hand-written rows — Must-fix only)

Between 2026-09-09 and 2026-09-15, 109 of 161 parked rows were **stale**
(already shipped when written, refilled from map/debt/TOP30 lines);
between 2026-10-04 and 2026-10-06 ~40 Must-fix rows were ledger-text
repairs self-filed to hold a queue floor. Both are the same failure: rows
written to have rows. The generated blocks cannot repeat shipped work, and
the floor is gone (`QUEUE_MIN` 1). Hand-written rows are **Must-fix only**
and carry one of:

- **hang/throw:** a corpus or public worker `ETIMEDOUT` / `ReferenceError`
  (session id + step);
- **regression:** `PASS→FAIL` naming the session, owner and the `js/` SHAs
  since the last audit;
- **review C-wrong:** `Source: reviews/loop-unattended/NN-…` with the C
  lines the JS contradicts.

Not evidence: a `c-js-map` deferral line, a `debt.md` D-number, a TOP30
line, a ledger omit/note mismatch, a cite drift, "unverified at enqueue".
A row without evidence is not appended.

**Park-and-requeue:** a diagnostic park that names the real writer (C
function + session) **adds that writer as the deliverable of the cliff
row** — after one `brief.mjs <writer>` confirms the arm is still absent (a
park's writer claim ages too: `ready_weapon` shine and `set_uasmon`
infravision were queued 2026-09-16 from parks and had shipped as D-2182 /
D-2276). A park that names no writer records the one C-side measurement
that would (`geom-probe`, temp C dump, recorder screen) — that measurement
is a `[measure]` row (section below), popped when its owner is the cliffs
head. A finished `[measure]` row leaves **≤ 3 lines** in `NOTES.md` Active;
the full measurement goes into the writer's deliverable (and the archive
parked row).

Live Parked lines are **≤ 300 chars**: name — class — proof pointer —
falsifier. Longer proof goes to the archive file under the same name.
The supervisor recognises a Parked-row move, a ledger stale note, or a
popped `[measure]` row as a legitimate no-`js/` iteration; two consecutive
no-`js/` iterations on the same owner mean the owner is parked with its
probe command, not worked a third time.

## Must-fix (from reviews / rescore) — pop first, ships alone

Written reviews are not theater. Each item is a Keep'd **C-wrong** (JS
contradicts C, not a named omit), a throw/hang, or a PASS→FAIL. After
shipping: stamp the cited review `**Addressed:** D-NNNN` (D-id only), mark
the queue line `- [x]`, then run `node scripts/archive-loop-queue-done.mjs`
**in this same commit**. Do **not** leave `- [x]` in this file. Do **not**
put this commit's hash in the same SHA (chicken-egg), amend, or make a
stamp-only follow-up. The **next** real commit fills the short hash on the
review (and on the archive row) from `git log -1 --format=%h` of the fix.

Review iterations **prepend** new Keep'd C-wrongs here (not under Open).

A **JS throw** in any corpus session (`hidden-proxy status` owner
`js-throw …`, or a `ReferenceError` in `.cache/hidden/scores.json`
`error`), and a corpus worker **hang** (`ETIMEDOUT` under `verify`), are
always Must-fix rows: they forfeit every later screen of that session
(Constitution §10.14). The generated cliffs block lists them first as well.

## Open — cliffs (cliff phase — pop first after Must-fix)

Generated block — do not edit between the markers. Row: owner (C
function at the first divergence), sessions blocked, first step, RNG and
screens lost after it, C vs JS at the divergence, probe sessions, board
SHA, and the tag (history / parked / none). Deliverable: the owner — or the
writer the divergence names — ported whole in C order, every C caller
wired, `node scripts/verify.mjs --fn <fn>` showing **movement** on the
probe sessions and **REACH-OK**.

<!-- cliffs:begin -->
- [ ] `pickup.c` loot_mon — blocks 1/953 corpus sessions (first at step 213; RNG lost 729, screens lost 17): C «You take the saddle off of the pony. a - a saddle.--More--» vs JS «You take the saddle off of the pony. i - a saddle.--More--». Probe: `node scripts/hidden-proxy.mjs verify loot_mon` (scen-quest-Knight-94336). @2aa8bc28e **[history: ledger: ported — read that D-entry once; the arm this divergence names is still open]**
- [ ] `objnam.c` doname_base — blocks 4/953 corpus sessions (first at step 285; RNG lost 645, screens lost 66): toplines identical; first differing screen row 17: C «│··$?(│#» vs JS «│··$?d│#» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify doname_base` (scen-container-Barbarian-94366, scen-container-Caveman-94206, scen-town-Ranger-94002). @2aa8bc28e **[parked: MISATTRIBUTED — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `mhitu.c` mattacku — blocks 2/953 corpus sessions (first at step 115; RNG lost 460, screens lost 131): C «You feel something move nearby. You feel something move near» vs JS «You are surrounded by a shimmering light.--More--». Probe: `node scripts/hidden-proxy.mjs verify mattacku` (scen-engulf-Ranger-94312, scen-ranged-Rogue-94008). @2aa8bc28e **[parked: PRESENCE-ONLY — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `monmove.c` dochug — blocks 1/953 corpus sessions (first at step 171; RNG lost 450, screens lost 32): C draws `rn2(40)=20` in dochug, JS `rn2(2)=0` from exercise(attrib.js:237). Probe: `node scripts/hidden-proxy.mjs verify dochug` (scen-ride-Samurai-94407). @2aa8bc28e **[history: archived D-2430 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `files.c` paniclog — blocks 1/953 corpus sessions (first at step 33; RNG lost 422, screens lost 11): toplines identical; first differing screen row 2: C «pettype                 [horse]» vs JS «pettype                 [random]» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify paniclog` (scen-options-Valkyrie-94311). @2aa8bc28e **[history: ledger: by-design — read that D-entry once; the arm this divergence names is still open]**
- [ ] `sounds.c` dosounds — blocks 2/953 corpus sessions (first at step 61; RNG lost 377, screens lost 62): C «You stop digging. You hear water falling on coins.» vs JS «You hear water falling on coins.». Probe: `node scripts/hidden-proxy.mjs verify dosounds` (scen-dig-Archeologist-94215, scen-town-Tourist-94062). @2aa8bc28e **[history: archived D-2217 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `dokick.c` otransit_msg — blocks 1/953 corpus sessions (first at step 172; RNG lost 278, screens lost 28): C «You feel a bit steadier now. You stop eating the newt corpse» vs JS «You feel less confused now. You stop eating the newt corpse.». Probe: `node scripts/hidden-proxy.mjs verify otransit_msg` (scen-impaired-Monk-94230). @2aa8bc28e **[history: archived D-2318 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `eat.c` lesshungry — blocks 1/953 corpus sessions (first at step 162; RNG lost 261, screens lost 27): C «You're having a hard time getting all of it down.--More--» vs JS «Your movements are now unencumbered.--More--». Probe: `node scripts/hidden-proxy.mjs verify lesshungry` (scen-wish-Tourist-91125). @2aa8bc28e **[history: archived D-2026 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `mhitu.c` mswings_verb — blocks 1/953 corpus sessions (first at step 236; RNG lost 98, screens lost 27): C draws `rn2(2)=0` in mswings_verb, JS `rn2(5)=2` from distfleeck(monmove.js:1167). Probe: `node scripts/hidden-proxy.mjs verify mswings_verb` (scen-quest-Archeologist-94096). @2aa8bc28e **[history: archived D-3242 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `potion.c` peffect_water — blocks 1/953 corpus sessions (first at step 247; RNG lost 92, screens lost 18): C «This burns like acid!--More--» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify peffect_water` (scen-town-Priest-94282). @2aa8bc28e **[history: archived D-2377 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `attrib.c` exercise — blocks 1/953 corpus sessions (first at step 97; RNG lost 91, screens lost 58): C draws `rn2(19)=3` in exercise, JS `rn2(12)=10` from mcalcmove(mon.js:990). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-terrain-Monk-94160). @2aa8bc28e **[parked: PRESENCE-ONLY — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `dokick.c` kick_ouch — blocks 1/953 corpus sessions (first at step 229; RNG lost 64, screens lost 16): C «You kick an empty bag. Thump! Ouch! That hurts!--More--» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify kick_ouch` (scen-container-Healer-94086). @2aa8bc28e **[history: archived D-1370 — read that D-entry once; the arm this divergence names is still open]**
<!-- cliffs:end -->

## Open — coverage (ledger gap — pop when the cliffs block is empty, or as a same-file companion)

Generated block — do not edit between the markers. Row: measured class,
C/JS code lines (comments, `#if 0`, braces dropped), hops from the turn
loop, callers, RNG/message loudness, enqueue sha. Deliverable: the whole C
body in C order — every arm, every callee live or named, every C caller
wired, `node scripts/verify.mjs --fn <fn>` REACH-OK. A row whose
remaining omissions cannot ship is declared `audited` once and leaves.

<!-- coverage:begin -->
<!-- coverage:end -->

## Open — missing-arm (hand-verified; cliff-phase companions only)

Hand-written rows with `brief.mjs`-at-enqueue evidence (C arm quoted, JS
body read). Since the cliff phase they are **not** a pop source on their
own: a row ships as a same-C-file companion of the cliff being worked, or
when both generated blocks are empty. No new rows are added here (the
2026-10-03..06 "refilled +N to hold the 8-row band" chronology is archived
in `docs/archive/LOOP-QUEUE-REFILLS.md`).

- [ ] `read.c` strange_feeling_scroll — clone-drift: C has one `strange_feeling` (potion.c:1461–1476, read.c sites :1128/:1334/:1388); JS clone js/read.js:1217 serves :1279/:1331/:1568 instead of live js/detect.js:241 — C potion.c:1465 Hallucination-macro extrinsic arm absent from js/read.js:strange_feeling_scroll (clone reads `u.Hallucination` only, live reads H||HH) — C + both JS bodies read at enqueue 2026-10-06; deliverable: 3 sites → live export, delete clone.

## Measurements on file (`[measure]` rows — popped when their owner is the cliffs head)

A `[measure]` row delivers a C-side measurement + the writer named by it;
no `js/` in that commit (the supervisor recognises it). It is popped when
the owner it names heads the cliffs block (or is the writer of the head),
not on its own. `[campaign k/n]` rows are steps of one multi-iteration
plan and ship `js/` every step.

- [ ] `[measure]` `dogmove.c` best_target / Samurai-92161 step-37 pet-turn ray-rejector (W3 park follow-up) — blocks 1/953 (scen-tour-Samurai-92161 step 37/88 kind=rng: C 1× rnd(5)@score_targ then distfleeck vs JS wolf+samurai 2×; dog loop proven faithful, see Parked `dogmove.c` W3). Deliverable: TEMP-C re-record with log-only find_targ/best_target dump in the ignored recorder tree (W2-park recipe: `nethack-c/recorder/src/dogmove.c` per-ray m_at/minvis/mundetected/head-square + pet mux/muy + best_target per-ray scores at step 37, `make Sysunix CC="cc -arch x86_64"`, revert + rebuild after; probes in /tmp, never committed), then port the writer with the session as evidence (suspect unseen-layout/lifecycle writer: C (54,7)/(55,8) content vs JS samurai@(55,8)); if the dump shows C's loop (not state) differs, re-queue as dog-loop Open instead. No `js/` in the measure commit.

## Deferred (map-driven singletons — not popped by hand)

Plain bullets on purpose (not popped, not counted). A function listed
here enters Open only through a generated block (a corpus session blocked
on it, or ledger status + measured gap), or as a same-C-file companion of
the row being worked — never by copying the line.

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
- `weapon.c` mon_wield_item scen-town-Priest-94382 — RECORDER-ARTIFACT 2026-10-06 (D-3570): TEMP-C proves C never painted the screen-99 G (floor@4995, first G@5079 after the block); JS floor = true C tty. Falsifier: fixed-recorder re-record → PASS/later owner.
