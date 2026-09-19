# Loop work queue

Unattended **port** iterations pop the **first unchecked** row, preferring
**Must-fix** over Open. Live file is **unchecked-only**; done rows go to
`docs/archive/LOOP-QUEUE-DONE.md`, parked proofs to
`docs/archive/LOOP-QUEUE-PARKED.md` (index below).

## Breadth phase (opened 2026-09-18 — Constitution §10.17, `CURRENT.md`)

Held-out read **11/44, RNG 26.6 %, screens 50.0 %** on 2026-09-17 while the
local corpus read 91.7 %: the corpus stopped predicting the judge. Until a
human closes the phase, **Open — coverage** rows are the work: one whole C
function per iteration (every arm, callee, caller; 200–800 lines), emitted
by `node scripts/port-coverage.mjs --rows N` which measures the JS tree at
enqueue and skips live rows / by-design names. **Refill = paste its output
verbatim** under Open — coverage (top up to ~12 when below 8). Pop-time
stale check (≤ 3 calls): `brief.mjs <fn>` shows the C body already
complete under this or split names → one Parked **Stale** line, next row.
A Must-fix/Open row in the **same C file** as the popped row ships in the
same iteration. `[measure]` rows, parks-as-work and `hidden-proxy queue`
refills are **phase 2** (section below) — not popped now. Every `verify`
must end **REACH-OK**: corpus sessions that executed the function still
PASS; a regression is fixed in the port before handoff, never parked.

## Row eligibility (2026-09-16 process take — read before refilling)

Between 2026-09-09 and 2026-09-15, **126 of 362** non-audit iterations were
parks, and **109 of the 161** parked rows were **stale**: the function was
already live and C-cited when the row was written (refill from
`data.md`/`debt.md`/TOP30 line ratios without checking JS). Each cost a
full iteration. The rules below exist to make that class impossible.

Every `- [ ]` row **carries its evidence** in the row text, one of:

- **coverage:** `coverage MISSING|THIN|PARTIAL (C N L … / JS M L …)` as
  printed by `port-coverage.mjs --rows` (measured on the JS tree at
  enqueue; the breadth-phase class — never hand-written);
- **corpus:** `blocks N/553 (<session-id>, step S, kind=rng|screen)` from
  `node scripts/hidden-proxy.mjs queue` or a park that named this writer;
- **missing arm:** `C <file.c>:<a>–<b> absent from js/<file>.js:<fn>` —
  verified by reading the JS body in `node scripts/brief.mjs <fn>` at
  enqueue, **not** by trusting a map/debt line or a D-number;
- **hang/throw:** a corpus worker `ETIMEDOUT` / `ReferenceError` (Must-fix).

Not evidence: a `c-js-map` deferral line, a `debt.md` D-number, a TOP30
line ratio copied by hand, "dead callees" that are C `staticfn`, or
"never own-row". A row without evidence is not appended. **The 8–12 band
counts eligible rows only**; `port-coverage.mjs --rows` always has more,
so the queue never sits short during the breadth phase.

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

Refill sources, in order — **breadth phase:** `node scripts/port-coverage.mjs
--rows N` (paste verbatim; it skips live rows and by-design names). **Phase 2
(closed):** `node scripts/hidden-proxy.mjs queue` (owners not yet parked; a
parked owner's **writer** row, if named, counts), `[campaign]` next steps,
`[measure]` rows for the top parked corpus owners by sessions blocked,
`PORT-GAP-TOP30.md` rows the corpus reaches **with a verified missing arm**,
then `c-js-map` omits. A level-gen owner (`mineralize`, `bound_digging`,
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

Rows below are `port-coverage.mjs --rows` output (score = reach × call
breadth × RNG/message loudness × coverage gap, measured on the JS tree at
the stamped SHA). Pop the first; `brief.mjs <fn>` decides stale in ≤ 3
calls (`split?` rows especially — the body may live under other names).
Deliverable: the whole C body, callers wired, 200–800 lines, REACH-OK.
Refill: `node scripts/port-coverage.mjs --rows N`, paste verbatim.

Refill 2026-09-19 @d6cf97e2: 12 rows → 11 shipped (6 pre-parked dupes + 5 parked below); @aad9f117 batch of 9 likewise all stale (7 pre-parked + 2 parked below), removed. Follow-up `--rows 30`: xname_flags/help_dir/fill_ordinary_room/shkname/destroy_items re-emitted post-DONE (archived, skipped); 4 fresh rows queued below.
Refill 2026-09-19 @4131ec6e: `--rows 12` emitted 12; 6 skipped as Stale-parked (newcham/getobj/checkfile/yn_function/getdir/mon_arrive — archive proofs, never re-pop); 5 appended verbatim below (rloc_to_core/show_glyph narrow-arm DONEs are smaller scope, not dupes; split? rows say brief first). 2026-09-19: domove_core/show_glyph rows removed as refill dupes of the Stale parks below (D-2453-fixed / no-same-named-symbol-by-architecture) — not re-parked, not re-popped.
Refill 2026-09-19 @e131537d: `--rows 12` emitted 12, all Stale-parked dupes, none appended; `--rows 40`: 15 Stale-parked skipped (first-12 set + make_corpse/getmattk/makeroguerooms) + rloc_to_core just shipped + 19 archived/done/parked dupes (do_look/makemaz/see_monsters/recharge/findtravelpath/newman/trapmove/worm_move/steal/use_whip/thitu/moverock_core/thitmonst/jump/xname_flags/help_dir/fill_ordinary_room/shkname/destroy_items); 5 fresh appended verbatim below.
- [ ] `insight.c` record_achievement — coverage PARTIAL (C 65 L `insight.c:2407–2472` / JS 45 L in js/insight.js; hops 2, callers 32, RNG 0, msg 3). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn record_achievement` (reach regression must be 0). Measured `port-coverage.mjs --name record_achievement` 2026-09-19 @ e131537d.
Refill follow-up 2026-09-19 @e131537d: `--rows 60` tail 20 (rows 41–60); skipped monstone/safe_qbuf/poly_obj/use_offensive/pick_lock/dowhatdoes_core/possibly_unwield/mhitm_ad_drst (done/parked/live history) + freedynamicdata (save-freeing infra, NOTES guard); 3 fresh appended verbatim below (getrumor/restmon/bot_via_windowport/wiz_map_levltyp/mhitm_ad_acid/mhitm_ad_drli/makerooms/insane_object/look_engrs left for the next top-up).
- [ ] `hack.c` domove_swap_with_pet — coverage PARTIAL (C 125 L `hack.c:2098–2225` / JS 83 L in js/hack.js; hops 2, callers 1, RNG 1, msg 8). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn domove_swap_with_pet` (reach regression must be 0). Measured `port-coverage.mjs --name domove_swap_with_pet` 2026-09-19 @ e131537d.
- [ ] `teleport.c` random_teleport_level — coverage PARTIAL (C 67 L `teleport.c:2191–2258` / JS 45 L in js/teleport.js; hops 2, callers 5, RNG 4, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn random_teleport_level` (reach regression must be 0). Measured `port-coverage.mjs --name random_teleport_level` 2026-09-19 @ e131537d.
- [ ] `uhitm.c` mhitm_ad_heal — coverage THIN (C 87 L `uhitm.c:4296–4385` / JS 4 L in js/mhitm.js; hops 4, callers 1, RNG 11, msg 2). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn mhitm_ad_heal` (reach regression must be 0). Measured `port-coverage.mjs --name mhitm_ad_heal` 2026-09-19 @ e131537d.

## Open — corpus residuals (breadth phase: ship only with a same-C-file coverage row)

- [ ] `doopen_indir` extra rnl Wizard (D-2420 W5) — blocks 1/553 (scen-normal-Wizard-92127 step 101/114 kind=rng flat#3271: C `rn2(5)=3`@distfleeck vs JS `rnl(20)=3`@doopen_indir, prev moveloop_core matched; JS-extra-single-draw proven; C step 18 draws; MEASURED D-2420 vs JS probe). Fix: the open-action RNG gate in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect Wizard → PASS or later owner). Do not re-port `distfleeck`.
- [ ] hero overload attack-gate Caveman (D-2420 W6) — blocks 1/553 (scen-poly-Caveman-92202 step 116/265 kind=rng flat#6619: C `rn2(5)=3`@distfleeck vs JS `rn2(20)=18`@gethungry, prev makemon matched; C «You cannot fight while so heavily loaded» + m_lined_up/m_move vs JS hmonas/passive combat «You miss Slasher…»; C step 65 draws; MEASURED D-2420 vs JS probe; BoH-blessed row is the opposite direction — check cursed-bag/container state first). Fix: the inv_weight/capacity attack gate in C order. Verify `node scripts/verify.mjs --fn distfleeck` (recorded owner: expect Caveman → PASS or later owner). Do not re-port `distfleeck` or `inv_weight` beyond the gate.
- [ ] `uhitm.c` mhitm_ad_cold `:2661` (void)-discard Healer (D-2425 W1) — blocks 1/553 (scen-poly-Healer-92107 step 126/321 kind=screen: C `HP:7(33)` vs JS `HP:2(33)`, toplines identical; MEASURED D-2425: one lich-touch turn spans captures s123–s126 — to-hit `rnd(20)=3` + base `d(3,6)=10` in s123 bucket both sides; destroy-A quan-1 `rnd(4)=3` losehp 22→19; destroy-B quan-3 `rnd(4)=2` losehp 19→17; recorder s126 dump = knockback×2+passiveum+spell-choice identical both sides; instrumented /tmp js/ copy logging mdamageu/losehp callers: JS `mdamageu(10+5=15)`@hitmu after `losehp(2)`@maybe_destroy_item vs C `mdamageu(10+0)` — JS `mhitm_ad_cold_u` (`js/mhitu.js:913`) adds the destroy return that C discards (`(void)`, hero already losehps inside); Δ5 = destroy total 3+2; only adjacent monster = master lich (38,18 vs hero-owlbear 37,17)). Fix: discard the return in `mhitm_ad_cold_u` per C `:2661` (fire_u `:953` already discards; elec_u body deferred, keep). Verify `node scripts/verify.mjs --fn do_statusline2` (recorded owner: expect Healer → PASS or later owner). Do not re-port `do_statusline1/2`; do not touch `mhitm.js` monster-defender arms (destroy deferred, pre-existing). Falsified: destroy-pagination, hidden d(N,1)/d(N,0), knockback FALSE, passiveum tmp=0, no cast, half-phys, permdmg.
- [ ] `eat.c` eatfood meal-progress uhs/botl timing lembas pair (D-2425 W2) — blocks 2/553 (scen-wish-Healer-92092 step 59/144 + scen-wish-Tourist-91125 step 83/189, kind=screen: C `Xp:N Satiated` vs JS bare `Xp:N`, toplines identical («hard time getting all of it down»); MEASURED D-2425: C stepFns empty both, RNG fully matched (92092 3078/3078) — deterministic; C flips+paints Satiated at the hard-time turn; JS prefix probe + uhs-scan shows `uhs`=0=SATIATED already after the first bite («delicious») yet paints Satiated a turn late («stop eating» — state converges +1 step); `newuhs` eatfood early-return (`js/eat.js:562–568`) sets `uhs` with no botl). Fix: C-order audit of first-bite lesshungry/newuhs vs botl in the eatfood/maybe_finished_meal path (both live: `js/eat.js:551`/:2101 — ordering, not a missing fn). Verify `node scripts/verify.mjs --fn do_statusline2` (recorded owner: expect both → PASS or later owner). Do not re-port `do_statusline1/2`. See parked `botl.c` do_statusline2 lembas pair (retire on ship if the port confirms the mechanism).
- [ ] `wizcmds.c` wiz_levltyp_legend #terrain legend Valkyrie — blocks 1/553 (scen-tour-Valkyrie-92162 step 129 kind=screen: C «#terrain encodings:» vs JS «»; untagged owner in `hidden-proxy queue`, eligible as-is). Fix: port the owning C arm in wiz_levltyp_legend (brief wiz_levltyp_legend first; never read seed/step/coords into logic). Verify `node scripts/verify.mjs --fn wiz_levltyp_legend` (expect Valkyrie-92162 → PASS or later owner).

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
`port-coverage.mjs --rows` (measured gap), or as a same-C-file companion
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
- `monmove.c` mfndpos Healer W2 — SYMPTOM 2026-09-16, body faithful: C bat cnt=5, missing cells MON_AT-occupied (230/246/244), same code both sides; arrangement differs pre-turn (C 244@(45,11) vs JS 244@(46,10)). Falsifier: TEMP-W2 C dump + JS prefix probe; proof in archive.
- `dogmove.c` best_target/score_targ Samurai W3 — SYMPTOM 2026-09-16: loop count-identical under identical state (JS find_targ hits ⊆ C hits; full elimination in archive). Falsifier: TEMP-C step-37 pet-turn ray dump naming the (1,1) rejector; re-queue under that writer.

### Stale (already shipped when the row was written; verify 0 blocked)

Grouped by C file. Each was a refill row copied from a `data.md`/`debt.md`/
`absent.md`/TOP30 line after the function had shipped. Do not re-enqueue;
retire the spawning map line when you touch that section.
- `mon.c` make_corpse — STALE 2026-09-18: whole body live js/mhitm.js:2449 (dragon/unicorn/worm default_1, undead collapse, all golems, pudding loop, bury tail; mondied+xkilled wired); 0 blocked; 0.576 is the devel-status list. Falsifier: rescore blocking on make_corpse.
- `invent.c` getobj — STALE 2026-09-18: C 339 L body complete split across js/invent.js helpers (getobj_from_cmdq/filter_prompt/take_count/display_pickinv/apply_count/finish_pick + compactify_invlets, D-1530/1551/1559/1563/1569/1578/1579/1588/1682); same-name 94 L misreads the split, 0 blocked. Falsifier: rescore blocking a session on getobj.
- `mhitu.c` hitmu rat AD_DRCO `[measure]` — STALE 2026-09-16: scen-genesis-Priest-91110 now PASS 151/151 at HEAD; `js/mhitu.js:3307` live C-order body, 0 blocked. Falsifier: rescore newly blocking a session on hitmu.
- `vision.c` vision_recalc (TOP30 #30) — STALE 2026-09-16: `js/vision.js:908` full C-order port (Blind/pit/xray/nv/lights/main loop), 0 blocked; only delta `notice_all_mons(TRUE)` tail (async fan-out, 36 callers). Falsifier: rescore blocking a session on vision_recalc.
- `mkobj.c` mkbox_cnts BoH weight — STALE 2026-09-16: full C-order body live js/mkobj.js:791 (D-0361/D-2265), 0 blocked; weight factor = bless-arm deferral, not this fn. Falsifier: rescore blocking a session on mkbox_cnts.
- `polyself.c` skinback merge arms — STALE 2026-09-16: 15-line C verbatim live js/polyself.js:1366, 0 blocked; merge arms live in polymon. Falsifier: rescore blocking a session on skinback.
- `muse.c` rnd_misc_item See_invisible arm — STALE 2026-09-16: case-1 gate shipped D-2086 (js/makemon.js:2665+2694), 0 blocked. Falsifier: rescore blocking a session on rnd_misc_item.
- `display.c` map_location tseen — STALE 2026-09-16: wrapper + tseen arm live js/display.js:4798 (D-0120/D-0326/D-1528), 0 blocked. Falsifier: rescore blocking a session on map_location.
- `sp_lev.c` load_special soko remainder — STALE 2026-09-16: load_soko1_1/4_1 live js/mklev.js:12307/12839 (D-0756 fixed), 0 blocked. Falsifier: rescore blocking a session on load_special.
- `dungeon.c` single_level_branch Knox — STALE 2026-09-16: 7-line fn + stairs/end/teleport callers live (js/teleport.js:2133), 0 blocked; 2 caller gates stay named omits. Falsifier: rescore blocking a session on single_level_branch.
- `cmd.c` yn_function — STALE 2026-09-18: body live js/getline.js:1572 (D-1721/1728/1805/1806) + y_n/ynq/ynaq/nyaq/YN wrappers; deltas SND_SPEECH/DUMPLOG/paniclog (dead/retired/Rule #2); 0 blocked; ratio 0.65 misreads ifdefs. Falsifier: rescore blocking on yn_function.
- `mon.c` newcham — STALE 2026-09-18: whole body live split across js/makemon.js helpers (D-2433 fixed, no omits); 83 L misreads split, 0 blocked. Falsifier: rescore blocking on newcham.
- `pager.c` checkfile — STALE 2026-09-18: whole body live split across js/pager.js helpers (D-2443 fixed; named: supplemental + dlb arms); 0 blocked. Falsifier: rescore blocking on checkfile.
- `cmd.c` getdir — STALE 2026-09-18: whole body live js/lock.js:605 + dirsym reader (D-2434 fixed; named: readchar/docrt/num_pad/yn-pick); 0 blocked. Falsifier: rescore blocking on getdir.
- `end.c` really_done — STALE 2026-09-18: whole body live js/end.js:985 (D-2435; named: dumplog/platform/panic); 0 blocked. Falsifier: rescore blocking on really_done.
- `potion.c` make_blinded — STALE 2026-09-19: C :261–331 whole body live js/do.js:2802–2873 (probe/restore, Unaware, regain/clear/lose/set arms, set_bc, xor toggle; D-1768/1755/1769/2452); 39 C callers wired (D-2452 audit); 0 blocked. Falsifier: rescore blocking on make_blinded.
- `invent.c` display_pickinv — STALE 2026-09-18: body live split js/invent.js display_inventory/display_pickinv_reply/display_pickinv_wizid + iactions dispinv_with_action (D-1589/1590/1600/1850); dead DUMPLOG/maybereleaseobuf; 0 blocked. Falsifier: rescore blocking on display_pickinv.
- `uhitm.c` mhitm_ad_phys — STALE 2026-09-18: 3 arms live split (damageum_ad_phys uhitm.js:1400, mhitm_ad_phys_u mhitu.js:766, mhitm_ad_phys mhitm.js:1455); D-1864 fixed 2 blocks PASS; named worm-cap/drst/knockback; 0 blocked. Falsifier: rescore blocking on mhitm_ad_phys.
- `teleport.c` rloc_to_core — STALE 2026-09-18: C 120 L body complete split across js/teleport.js (rloc_to + rloc_pre/post_move_msg + rloc_to_flag + angry/bill/occupation/mintrap helpers, D-0885/86/1180/83/95/96/1160-64/70); callers rloc_to/rloc_to_flag/rloc wired, mtele_trap RLOC_MSG stays named omit; 0 blocked. Falsifier: rescore blocking on rloc_to_core.
- `objnam.c` makeplural — STALE 2026-09-18: C `:2836–3022` all arms live `js/objnam.js:1999` + in-file singplur_lookup/badman/ch_ksound (D-1923 envelope); impossible() stays named omit; 0 blocked. Falsifier: rescore blocking on makeplural.
- `mhitu.c` getmattk — STALE 2026-09-18: body live split-named js/mhitm.js:438 get_mattk (DISE/DREN/mspec/WEAP/lich/home-elem; SEDUCE c_sa_no named omit); callers wired mhitm:4918/mhitu:4261/uhitm:3086+3104; 0 blocked. Falsifier: rescore blocking on getmattk.
- `display.c` show_glyph — STALE 2026-09-18: no same-named symbol by architecture; arms live in show_glyph_cell + change helpers (D-1765/67/85); 0 blocked. Falsifier: rescore blocking on show_glyph.
- `dog.c` mon_arrive — STALE 2026-09-19: whole body live split js/dog.js dispatcher :1157 + mon_arrive_link :763 / with_you :785 / after_you :1003 (D-2459 fixed, REACH 123/123); 4 L misreads split, 0 blocked. Falsifier: rescore blocking on mon_arrive.
- `potion.c` make_blinded — STALE 2026-09-19: body live js/do.js:2825 + all 39 callers wired (D-2452 fixed, REACH-OK); 49 L misreads split, 0 blocked. Falsifier: rescore blocking on make_blinded.
- `hack.c` domove_core — STALE 2026-09-19: body wired into live js/cmd.js domove (D-2453 fixed; air_turbulence :2273, slippery :2300, stucksteed steed :452, attackmon_at cmd :3256 all live, REACH-OK); 0 blocked. Falsifier: rescore blocking on domove_core.
- `pline.c` vpline — STALE 2026-09-19: whole body live js/display.js:7756 vpline(fmt, ...args) (D-2471 fixed + D-2476 follow-up, REACH-OK); 0 blocked. Falsifier: rescore blocking on vpline.
- `pager.c` do_look — STALE 2026-09-19: whole body live js/pager.js:2560 do_look(mode, click_cc) (D-2468 fixed, 0 blocked); 0 blocked. Falsifier: rescore blocking on do_look.
- `mkmaze.c` makemaz — STALE 2026-09-19: whole body live js/mklev.js:1480 (D-2492 fixed, REACH-OK); 51 L misreads restart, 0 blocked. Falsifier: rescore blocking on makemaz.
- `display.c` see_monsters — STALE 2026-09-19: whole body live js/display.js:5271 (D-2493 fixed, REACH-OK); 26 L misreads restart, 0 blocked. Falsifier: rescore blocking on see_monsters.
- `extralev.c` makeroguerooms — STALE 2026-09-19: whole body live js/extralev.js:234 (D-0762 fixed + D-2226 guards/LVLINIT_ROGUE; mklev.js:18038/24225 callers wired); 82 L vs 58 L misreads comments; 0 blocked. Falsifier: rescore blocking on makeroguerooms.
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
- `dothrow.c` thrown-whip landing vs kitten square — STALE 2026-09-16: Arch-92238 PASS at HEAD (`verify obj_resists --base c8def23e` 3 PASS incl. Arch; D-2417 wakeup/finish_meating was the writer). Falsifier: rescore newly blocking a session on drop_throw landing.
- `teleport.c` rloc_to_core — STALE 2026-09-18: 120L body complete split js/teleport.js (rloc_to/pre/post_move_msg/to_flag/maybe_*; D-0885…D-1196); ratio 0.00 misreads split; 0 blocked; mtele_trap RLOC_MSG code-named omit (:1347). Falsifier: rescore blocking on rloc_to_core.
