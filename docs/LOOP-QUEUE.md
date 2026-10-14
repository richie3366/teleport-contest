# Loop work queue

Unattended **port** iterations pop the **first unchecked** row, in this
order: **Must-fix** (hand-written, strict), then the **Open — cliffs** head;
an **Open — coverage** row rides along only as a same-C-file companion
(§10.19: a short cliffs block means a grow iteration). Both Open blocks are **generated**
(`node scripts/check-hot-docs.mjs --fix` regenerates both; `hidden-proxy.mjs
queue --write` and `ledger.mjs rows --write` individually). Every other
section is hand-kept. Done Must-fix rows go to
`docs/archive/LOOP-QUEUE-DONE.md`, parked proofs to
`docs/archive/LOOP-QUEUE-PARKED.md`; retired refill paragraphs and
Stale lines live in `docs/archive/LOOP-QUEUE-REFILLS.md` /
`docs/archive/LOOP-QUEUE-STALE.md`.

## Cliff phase (opened 2026-10-06 — Constitution §10.18; marathons + grow mode 2026-10-09, §10.19)

**2026-10-09:** the corpus had saturated at 939/953 (100 % RNG) with no
session past 344 steps while held-out stayed at 18/44, RNG 41.7 %. The
marathon families (`scen-worldtour`, `scen-sweep`, `scen-chain`,
`scen-trek`; 600–2000 steps) now lead the cliffs block. When the block
holds fewer than 6 rows and Must-fix is empty, the supervisor runs a
**grow** iteration instead of a port slot; a port slot with both blocks
empty journals and stops. Never self-file rows to fill the slot.

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
  owners by screens lost summed over their sessions since 2026-10-13 —
  §10.20; JS throws first; unattributed sessions one per row, deliverable
  = measure at the step, name the writer, port it). It changes only when a `verify`
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

Generated block — do not edit between the markers. Ranked by screens
lost × sessions (§10.20). Row: owner (C function at the first
divergence, or `unattributed <session>`), sessions blocked, first step,
RNG and screens lost after it, C vs JS at the divergence, probe sessions, board
SHA, and the tag (history / parked / none). Deliverable: the owner — or the
writer the divergence names — ported whole in C order, every C caller
wired, `node scripts/verify.mjs --fn <fn>` showing **movement** on the
probe sessions and **REACH-OK**.

<!-- cliffs:begin -->
- [ ] `options.c` handler_menu_colors — blocks 29/3233 corpus sessions (first at step 5; RNG lost 41602, screens lost 3447): toplines identical; first differing screen row 14: C «k - menu colors             [(1 currently set)]» vs JS «k - menu colors             [(0 currently set)]» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify handler_menu_colors` (scen-symset-Archeologist-50058510, scen-symset-Archeologist-50059031, scen-symset-Barbarian-50155025). @2c11b48c7 **[history: archived D-2506 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `pager.c` do_screen_description — blocks 6/3233 corpus sessions (first at step 750; RNG lost 53318, screens lost 3008): C «%a staircase up or a staircase down (staircase up)» vs JS «%a staircase up or a ladder up or a branch staircase up or a». Probe: `node scripts/hidden-proxy.mjs verify do_screen_description` (scen-sweep-Healer-49956018, scen-symset-Archeologist-50059042, scen-symset-Caveman-50059032). @2c11b48c7 **[history: archived D-2449 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `monmove.c` m_move — blocks 3/3233 corpus sessions (first at step 505; RNG lost 104850, screens lost 2251): C draws `rn2(20)=6` in m_move, JS `rn2(5)=1` from distfleeck(monmove.js:1180). Probe: `node scripts/hidden-proxy.mjs verify m_move` (scen-sweep-Caveman-49956036, scen-sweep-Healer-50055087, scen-sweep-Tourist-50055019). @2c11b48c7 **[parked: RESOLVED — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `o_init.c` randomize_gem_colors — blocks 2/3233 corpus sessions (first at step 0; RNG lost 163592, screens lost 2205): C draws `rn2(2)=0` in randomize_gem_colors, JS draws nothing. Probe: `node scripts/hidden-proxy.mjs verify randomize_gem_colors` (scen-questtour-Healer-50157014, scen-worldtour-Wizard-50056058). @2c11b48c7 **[parked: REFUTED D- — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `monmove.c` distfleeck — blocks 5/3233 corpus sessions (first at step 1214; RNG lost 63119, screens lost 2170): C draws `rn2(5)=4` in distfleeck, JS `rn2(20)=4` from water_damage(trap.js:6379). Probe: `node scripts/hidden-proxy.mjs verify distfleeck` (scen-sweep-Healer-49950029, scen-sweep-Healer-620037, scen-sweep-Wizard-50055094). @2c11b48c7 **[parked: SYMPTOM — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `botl.c` do_statusline2 — blocks 9/3233 corpus sessions (first at step 106; RNG lost 33636, screens lost 1509): toplines identical; first differing screen row 23: C «Dlvl:1 $:0 HP:15(15) Pw:1(1) AC:9 Xp:1/0 T:12» vs JS «Dlvl:1 $:0 HP:15(15) Pw:1(1) AC:9 Xp:1/0 T:11» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-chain-Tourist-50150002, scen-sweep-Ranger-49956043, scen-sweep-Ranger-50050043). @2c11b48c7 **[parked: RETIRED D- — deliverable is the writer the first divergence names, or this owner's [measure] row; not a re-port of the symptom owner]**
- [ ] `objnam.c` minimal_xname — blocks 8/3233 corpus sessions (first at step 248; RNG lost 22017, screens lost 1444): toplines identical; first differing screen row 10: C «k - implicit_uncursed       [true]» vs JS «k - implicit_uncursed       [true]» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify minimal_xname` (scen-symset-Barbarian-50059049, scen-symset-Barbarian-50059065, scen-symset-Healer-50059079). @2c11b48c7 **[history: archived D-1872 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `cmd.c` getdir — blocks 4/3233 corpus sessions (first at step 5; RNG lost 5007, screens lost 1385): C «mdassist: Invalid direction key!» vs JS «cmdassist: Invalid direction key!». Probe: `node scripts/hidden-proxy.mjs verify getdir` (scen-symset-Healer-50059005, scen-symset-Healer-50059030, scen-symset-Healer-50155029). @2c11b48c7 **[history: archived D-2434 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `makemon.c` makemon_rnd_goodpos — blocks 1/3233 corpus sessions (first at step 186; RNG lost 53864, screens lost 1250): C draws `rn2(77)=12` in makemon_rnd_goodpos, JS `rn2(3)=2` from rndmonst_adj(makemon.js:655). Probe: `node scripts/hidden-proxy.mjs verify makemon_rnd_goodpos` (scen-sweep-Samurai-50156038). @2c11b48c7 **[history: archived D-2264 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `do_name.c` x_monnam — blocks 2/3233 corpus sessions (first at step 6; RNG lost 26383, screens lost 1237): C «human healer called wizard» vs JS «wall (no travel path)». Probe: `node scripts/hidden-proxy.mjs verify x_monnam` (scen-symset-Healer-50155002, scen-symset-Tourist-50059020). @2c11b48c7 **[history: archived D-2092 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `makemon.c` peace_minded — blocks 3/3233 corpus sessions (first at step 90; RNG lost 79706, screens lost 1211): C draws `rn2(16)=15` in peace_minded, JS `rn2(8)=7` from collect_coords(teleport.js:566). Probe: `node scripts/hidden-proxy.mjs verify peace_minded` (scen-chain-Knight-610030, scen-chain-Valkyrie-49958016, scen-worldtour-Wizard-587319). @2c11b48c7 **[history: ledger: ported D-1079 — read that D-entry once; the arm this divergence names is still open]**
- [ ] `invent.c` inuse_classify — blocks 8/3233 corpus sessions (first at step 23; RNG lost 9433, screens lost 1168): toplines identical; first differing screen row 3: C «b - an uncursed +0 leather jacket (being worn)» vs JS «b - an uncursed +0 leather jacket (being worn)» — the owner is the region heuristic; port the writer of the differing value, not the painter. Probe: `node scripts/hidden-proxy.mjs verify inuse_classify` (scen-symset-Archeologist-50058507, scen-symset-Barbarian-50058503, scen-symset-Knight-50155020). @2c11b48c7 **[history: archived D-2121 — read that D-entry once; the arm this divergence names is still open]**
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

- [ ] apply.js covers_objects_pole lava arm (Underwater-idiom follow-up; briefed in the pole-gate iteration — QUEUE_MIN 1; corrects the gate row's "lava arm runs either side" given) — C display.h covers_objects :218–220 lava arms `LAVAPOOL || LAVAWALL` are false on DRAWBRIDGE_UP-over-lava (typ is DRAWBRIDGE_UP; C is_pool dbridge.c:46 false there — macro false, floor shown); js/apply.js:3564 (covers_objects_pole :3557–3565, `(is_pool(x, y) && !Underwater_hero()) \|\| is_lava(x, y)`) uses `is_lava(x, y)` (dbridge.c:62–74 ⊃ bridge-over-lava, true there) — the macro-exact lava arms are absent from js/apply.js:3564 — so a polearm probe over a raised bridge over lava hides floor objects where C shows them (Underwater gate live as of the pole-gate ship; canonical covers_objects js/display.js:2291 C-exact via typ arms D-3726). Gate briefed (C :218–220 + dbridge.c:46/:62–74 quoted + gate shape match; full-body brief at ship time; pure gate, no RNG). Deliverable: lava arm reads LAVAPOOL/LAVAWALL typ arms (canonical shape); focused test (bridge-over-lava shown vs LAVAPOOL covered control). Callers: shown_floor_obj_pole pole display sites; JS export unchanged. — C display.h covers_objects :218–220 pool arm `is_pool && !Underwater` (shipped this iteration: gate reads the live bit via Underwater_hero() :1803, D-3400 idiom; 5-it focused test through glyph_is_poleable_at; sticky-flat enumeration complete — dothrow.js:937 + read.js:1870 harmless).

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

- `monmove.c` dochug demon/caster retaliation — MS_BRIBE mux-match `demon_talk` wired D-3926 (monmove.c:823 → monmove.js:2814; was: skipped by D-1798); mux-mismatch + `cuss` :985 + sounds.c:1143/1150 pre-existing wired (D-1798/D-2090/D-3250).
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

- `do_statusline2` T+1 (12 shop) — DIAGNOSED D-3939 (C 2 rounds@553 moves 92 stale T:91; JS freshens@menu-open). Falsifier: gate menu-path freshen → verify do_statusline2 PASS; or C dump moves=91 re-queues round-trigger.
- `do.c` flooreffects Healer s632 — SYMPTOM 2026-10-11 (D-3843). Temp-C fmon dump 14/14 identical; C holds paint+message behind --More--/gbuf, JS paints through (architectural). Falsifier: JS-633 flow topline (then canseemon ports) or a hold/buffer design moving `verify flooreffects`.
- `zap.c` poly_obj dealloc_oextra — MISATTRIBUTED 2026-09-14. Falsifier: a rescore or fresh `verify poly_obj` showing a session blocked with poly_obj as owner (not mere stepFns presence), or a C-side polymorph-of-named-object trace showing otmp keeping oname…
- `fountain.c` drinkfountain — MISATTRIBUTED 2026-09-14; [measure] D-3666 DONE, writer = `wintty.c` erase_menu_or_text docorner arm. Falsifier: that port moving `verify drinkfountain` (predict 227→229+).
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
- `zap.c` zapyourself — MISATTRIBUTED 2026-09-08. Falsifier: a `dobuzz`/display beam-paint port (why C shows `@` where JS shows `│` at row 6 col 8 at the «hits you!» More prompt) moving `verify zapyourself` (expect Priest-92235 → PASS or a later…
- `artifact.c` dump_artifact_info — MISATTRIBUTED 2026-09-08. Falsifier: a `touch_artifact`/makewish-port moving `verify dump_artifact_info` (expect Priest-92136 → PASS or a later owner); re-queue under that writer — cf
- `hack.c` spoteffects — MISATTRIBUTED 2026-09-08. Falsifier: an `mthrowu.c m_throw`/`u_catch_thrown_obj` port (forcehit stop + catch inventory/pline) moving `verify spoteffects` (expect Samurai-92161 → PASS or a later owner); re-queue as Open…
- `mhitm.c` mattackm — RESOLVED 2026-09-16 (can_carry import shipped); falsifier fired (4 marathon blocks); [measure] D-3748 DONE, writer = `monmove.c` m_move covetous-intruder arm :1778–1800. Falsifier: that port moving `verify mattackm` (predict 95309 617→618+).
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
- `weapon.c` mon_wield_item Priest-94382 — REFUTED D-3698 (writer = moveloop_core :470 gate; FULL PASS on game js/). V1/v2 proof in archive kept as history.
- `termcap.c` nomux_out/Samurai-92032 — RECORDER-ARTIFACT 2026-10-08 (D-3684): ^F 6562 B screen overflows nomux_out[6144] onto nm-adjacent raw_active/row/col; CX/CY = screen bytes exact. Falsifier: bounded-serialization rebuild + re-record → PASS.
- `wintty.c` g_pututf8/Enhanced-blank — RESOLVED D-3946 (falsifier fired: temp hook + rebuild + re-record moved 18/20; JS arm D-3945). Residuals → fountain-customcolor park below.
- `wintty.c` extracolor/fountain-customcolor — TOOLING-LIMIT D-3946 (5 sessions: C payload fg8 vs JS base-12 at ⌠; shadow has no extracolor hook, frozen wire is 16-color). Falsifier: extracolor wire + JS reader → 5 move.
- `ledger_to_dnum(-1)` / `o_init.c` randomize_gem_colors 95230/95244 — REFUTED D-3820 (writer = end.c panic: C's Oops raw print + getret wait IS the recorded tail; panic ported, both PASS). D-3733/D-3767/D-3768 measurements kept as history.
- `mhitu.c` gulpmu Monk-578214 s241 stale-I — FIRED D-3863 (writer = vision_recalc(2) loop via gulpmu site, display_warning→unmap; 578112 PASS, 578214 →getpos@433). D-3861 proof kept as history.
- `nhlua.c` nhl_gamestate Priest s1166 — UNPORTABLE D-3885+D-3895 (supersedes D-3884): TEMP-C dump confirms malloc reuse (mon==usteed, 927≠993, alias 1); pristine flaky (ASLR). Falsifier: C dump contradicting (a) or the mid-stamp session (D-3895); else never a port row.
- `polyself.c` mbodypart Knight s841 — SYMPTOM (D-3903, traced D-3904): writer = sp_lev.c:2406 soko_prize_oid (C 950=amulet skip → gg=(32,14); JS achieveo null → gg=(36,17)). Falsifier: that port moving verify mbodypart.
