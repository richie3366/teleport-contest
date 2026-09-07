# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine **unrelated** items. Consecutive
Open rows that share one C `file.c:function` may ship in one port iff
every C callee those arms reach is **live** (imported, C body), a
**clone** matched to C in this commit, or **named omitted** in the map
in this commit. A **stub** in a live arm → split that arm back out.
Must-fix stays **one item, first, not glued** to Open. Do not invent a
substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`. Rows come from the **scenario corpus**
(`node scripts/hidden-proxy.mjs queue`; `docs/HIDDEN-PROXY.md` §5) — a
row names the C function that owns a recorded C-vs-JS first divergence,
how many corpus sessions it blocks, and the exact probe. Map-omission
rows (`c-js-map/*.md` singletons with no corpus session and no C
RNG/message surface) are **deferred** while any corpus family is below
90 % PASS (Constitution §10.13).

**Keep 8–12 open `- [ ]` rows** (`check-hot-docs.mjs` reports the count). If Must-fix+Open drops below **8**
(including after you archive this iter’s item), **refill Open** in the
**same commit** up to **12**. Sources, in order: `node scripts/hidden-proxy.mjs queue` (corpus
owners, most sessions blocked first), then `PORT-GAP-TOP30.md` rows the
corpus reaches, then named omits in `docs/c-js-map/*.md` only when the
corpus is ≥ 90 % PASS. One C function/family per line; cite C file +
function and the probe. A level-gen owner
(`mineralize`, `bound_digging`, `wallification`, `place_lregion`…) is where
C *noticed* the difference: its falsifier is `node scripts/geom-probe.mjs
<session>`, and the shipped D-log cites the C writer actually changed.
Do not duplicate live or archived rows. Do not invent FAIL peels. Do
not enqueue parked D-0006 or parked `dog_invent`.

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
`error`) is always a Must-fix row: it forfeits every later screen of that
session (Constitution §10.14).

- [ ] `uhitm.c` hmon_hitmon_weapon_ranged boomerang tail `:901–917` — unported, unnamed in D-2036: `!thrown && obj==uwep && BOOMERANG && rnl(4)==3` → splinter pline + `uwepgone`/`useup` + `hittxt` + `dmg++` (RNG + state surface; all callees live: `rnl` sync, `uwepgone` async-await, `useup` sync). Probe: port the arm, `node scripts/verify.mjs --fn do_attack` + wield-boomerang replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 1).
- [ ] `uhitm.c` ranged silver predicate — D-2036 tests `hates_silver(mon.data)`, dropping C's `is_vampshifter(mon)` disjunct (`mondata.c:516–520`); exact callee `mon_hates_silver` live in `js/monsters.js:833`. Probe: import + swap, silver-vs-vampshifter replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 2).
- [ ] `dokick.c` kick_monster caitiff float — `js/dokick.js:860` calls now-async `check_caitiff` without await (C `dokick.c:68` synchronous; the 9 other sites were awaited in D-2036). Probe: add await, Knight/Samurai kick replay. Source: reviews/loop-unattended/1006-4c3db33a-do-attack-cluster.md (C-wrong 3).

## Open (corpus-driven, after Must-fix is empty)

Ranked by corpus sessions blocked (`hidden-proxy queue`, scoreboard at
`6f87bee1`+scenario cohort, 2026-09-06: **262/540 PASS**). Every row is
a recorded C-vs-JS fact; the fix is the owning C function's port, never
a read of a seed, step or coordinate. Verify with
`node scripts/verify.mjs --fn <fn>` (uses the committed scoreboard; if
the row was queued at an older SHA pass `--base <sha>`). Refill from
`node scripts/hidden-proxy.mjs queue --limit 30` — rows 13+ of that
output are the next candidates; `PORT-GAP-TOP30.md` rows the corpus
reaches come after; map singletons only at ≥ 90 % corpus PASS.

- [ ] `uhitm.c` mhitm_mgc_atk_negated — blocks 4/553 corpus sessions (first at step 127): C draws `rn2(10)=1` in mhitm_mgc_atk_negated, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:1997). Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-genesis-Caveman-92118, scen-poly-Valkyrie-92195, scen-wish-Archeologist-92038).
- [ ] `uhitm.c` mhitm_knockback — blocks 3/553 corpus sessions (first at step 77): C draws `rn2(3)=2` in mhitm_knockback, JS `d(3,4)=10` from hitmu(mhitu.js:2431). Probe: `node scripts/hidden-proxy.mjs verify mhitm_knockback` (scen-tour-Wizard-92219, scen-wish-Valkyrie-92142, scen-wish-Valkyrie-92206).
- [ ] `wield.c` doquiver_core — blocks 3/553 corpus sessions (first at step 18): C «Your alternate weapon is 6 orcish daggers. Ready 5 of them? » vs JS «Your alternate weapon is 6 orcish dagger. Ready 5 of them? [». Probe: `node scripts/hidden-proxy.mjs verify doquiver_core` (scen-normal-Rogue-92115, scen-normal-Valkyrie-92200, scen-tour-Rogue-92030).
- [ ] `mondata.c` name_to_monclass — blocks 3/553 corpus sessions (first at step 59): C «fa cat or other feline (tame kitten)» vs JS «ka kitten». Probe: `node scripts/hidden-proxy.mjs verify name_to_monclass` (scen-genesis-Wizard-92223, scen-kit-Monk-92007, scen-normal-Knight-91100).
- [ ] `music.c` do_play_instrument — blocks 3/553 corpus sessions (first at step 63): C «Improvise? [ynq] (q)» vs JS «Improvise? [ynq] (y)». Probe: `node scripts/hidden-proxy.mjs verify do_play_instrument` (scen-intrinsic-Healer-92168, scen-wish-Caveman-92174, scen-wish-Ranger-92156).
- [ ] `monmove.c` m_search_items — blocks 2/553 corpus sessions (first at step 59): C draws `rn2(25)=12` in m_search_items, JS `rn2(1)=0` from m_move(monmove.js:1813). Probe: `node scripts/hidden-proxy.mjs verify m_search_items` (scen-tour-Samurai-92032, scen-tour-Tourist-92100).
- [ ] `uhitm.c` mhitm_ad_were — blocks 2/553 corpus sessions (first at step 41): C draws `rn2(4)=1` in mhitm_ad_were, JS `rn2(3)=2` from mhitm_knockback(mhitm.js:2015). Probe: `node scripts/hidden-proxy.mjs verify mhitm_ad_were` (scen-genesis-Knight-92149, scen-wish-Rogue-92184).
- [ ] `do_wear.c` Blindf_off — blocks 2/553 corpus sessions (first at step 211): C «You turn into a ghoul! You can see again.» vs JS «You turn into a ghoul!». Probe: `node scripts/hidden-proxy.mjs verify Blindf_off` (scen-poly-Ranger-92090, scen-poly-Ranger-92133).

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

## Parked (do not pop)

- `botl.c` do_statusline2 lembas pair — PARKED 2026-09-07, no D-log (was Open: 6 sessions; ports reverted, tree green). scen-wish-Healer-92092 step 58 + scen-wish-Tourist-91125 step 82: identical trigger (wished lembas eaten beside a hostile monster), identical two-part symptom — (a) JS paints `Satiated` on the `delicious!--More--` step where C keeps the stale bare line; (b) JS aborts the meal `You stop eating...` where C finishes `You're finally finished.`. Diagnosed end to end with byte-exact local probes: (a) C repaints status only on botl/botlx/time_botl (allmain.c:473–479) while JS `bot()` runs unconditionally every iteration (allmain.js:1158) — gating it fixes step 58 byte-exact on both sessions; (b) JS `stop_occupation` (hack.js:1014) lacks C's `maybe_finished_meal(TRUE)` gate (allmain.c:684–695 + eat.c:3877–3890): with the genesis'd chickatrice adjacent-hostile in both (mpeaceful=0, maps identical, RNG fully matched), JS kills a meal at usedtime>=reqtime while C completes it via done_eating — porting the gate fixes step 60 byte-exact on both. BUT the botl gate regresses 7 fortress sessions, so both ports were reverted: menu-close blank ×4 (process_menu_window row 22 — Options/fullscreen teardown needs a C docrt-equivalent repaint; JS _statusSuppressed persists with flags cleared), stale T ×1 (seed0007 T:350 vs 351), stale HP ×1 (seed0002 sick 11 vs 5), stale gold ×1 (seed0399 wish $:0 vs 30) — JS is missing botl/time_botl sets the C paint relies on. Residual 4 sessions are other writers (uac/HP/order per D-1990/D-2024-Next). Resume notes: falsified, do not re-chase — nutrition double-count (JS bite counts match C exactly: start bite + one eatfood bite per turn), lembas/cram race adjustment (both heroes unpoly'd human/gnome, adj is identity), turn-count drift (full-session RNG 3078/3078 positional match forces identical turn counts), peaceful genesis (C defaults hostile too; mpeaceful=0 both sides). Probe recipe: prefix-truncation replay (moves.slice(0,k)) + temporary pre-nhgetch capture-hook logging (screen index, moves, uhunger/uhs, occupation) + bite/lesshungry entry logging; beware module-level eat.js save_hs/saved_hs leaking across prefix runs in one process (use fresh processes for state reads). NOT yet localized — this is the real remaining work, do not claim otherwise: the exact C botl-set sites behind the seed0002 HP, seed0399 gold and seed0007 time repaints, and the fullscreen-menu-close redraw point. Falsifier: a botl-parity iteration (menu-close redraw + the three missing sets) that keeps 44/44 green with the gate on; then re-apply gate + maybe_finished_meal and `verify do_statusline2` (expect the lembas pair PASS). Do not pop until that measurement exists. Do not "fix" with seed/step/coordinate gates.
- `dungeon.c` save_dungeon — MISATTRIBUTED owner (parked 2026-09-07, no D-log, no js/). C `save_dungeon` (`dungeon.c:148–206`) performs only `Sfo_*` NHFILE writes + `free_data` frees — zero display calls, so it cannot paint the overview screen; none of the 4 blocked recipes contains save/restore (`S`/`^S` absent in all four moves), so neither arm can affect these runs. All 4 diffs are `print_mapseen` (`dungeon.c:3516`) live-state content: 92080 row 3 epitaph `you, killed by Demogorgon.` vs JS `a Demogorgon` = `end.c done_in_by` G_UNIQ arm (`:198–207`, `KILLED_BY` + `the ` unless `type_is_pname`), named omitted in `js/end.js:1112–1114`; 92140 (`fire elemental of Ishtar`) / 92050 (`, while paralyzed`) = `done_in_by` mgivenname + `topten.c formatkiller` helpless suffix, both omitted in JS (`js/end.js:463` `void incl_helpless`); 92075 `Sokoban: levels 6 up to 4` vs `up to 5` = `print_mapseen :3544` `dunlev_ureached` topology state. A save_dungeon port guarantees NO MOVEMENT on all 4. Falsifier: true-owner rows re-queued — `hidden-proxy verify done_in_by` moving 92080/92140/92050, and a `dunlev_ureached`-writer port moving 92075. Do not pop until then.
- `teleport.c` collect_coords — SYMPTOM OWNER (parked 2026-09-07, no D-log, port reverted: none needed — body already faithful). JS `collect_coords` matches C verbatim for all live shapes: flags/dims (`CC_*`, `COLNO`/`ROWNO`), `rowrange`/`colrange`/`maxradius` (incl. `cy=10<10.5`≡10, `cx=40`≡40), ring loop bounds/edge predicate, `CC_NO_FLAGS` (no `m_at`/`ZAP_POS`/`filter`), per-ring Fisher-Yates (`rn2(nn)` swap-with-front), `RING_PAIRS` newpass/passend accumulation, rloc call site passes int center (`(COLNO/2)|0`). All 4 blocked sessions show C `rn2(8)`@`collect_coords` with zero tactics draws in stepFns vs JS `tactics`/`distfleeck` at the same index — a body port cannot move them (NO MOVEMENT guaranteed). True owner re-queued as Open `wizard.c tactics/target_on`. Falsifier: that port moving `verify collect_coords`. Do not pop until then.
- `wield.c` ready_weapon — PARKED 2026-09-07: full-arm port (bimanual+shield `:187–191`, weld pline `:198–215`, aklys tether `:232–233`, unpaid `:264–271`; corpse/arti_speak/artifact_light stay named-deferred) moves 5/6 blocked sessions (scen-genesis-Valkyrie-92166 + scen-wish-Valkyrie-92027 + scen-wish-Tourist-92181 PASS; scen-wish-Priest-92041 → use_grapple@146; scen-wish-Samurai-92088 → dodown@88) but scen-wish-Knight-92204 (blessed horn + shield, step 25) spins at ~99% CPU (worker 45 s timeout, no row → verify REGRESSION). New arms proven innocent: byte-identical bimanual pline PASSES on Genesis/Valkyrie mattock; weld pline advances Priest/Samurai/Tourist — so the hang is downstream of the corrected step-25 fail (horn unwielded, no turn), a pre-existing sync loop on that path, not the port. Green fortress 44/44 held throughout. Falsifier: stack/profile of the Knight worker past step 25 (suspects: multi-turn/search lifecycle — recipe carries `20s` keys — or input-exhaustion microtask spin). Do not pop until that measurement exists. Port reverted (no D-log); retry from this note.
- `insight.c` show_conduct — STALE premise + misattributed owner (parked 2026-09-05, HEAD c209ccc7). Row was queued at baf24c95 as "859 conduct-text vs yn prompt"; at HEAD the session diverges at **824 x_monnam** (do_name.c:967): C row 0 `@ a human or elf (human wizard called wizard)--More--` (message-more, map intact, 35 frozen steps) vs JS row 0 Ebenezum `wizard` data.base entry menu (offx 18). Owner `insight.c:2122` is a C **comment** line — C screen is the pager.c checkfile `* wizard` entry, never conduct text. True C chain (all read at HEAD): getpos ':' → LOOK_VERBOSE (hack.h:544-546 "show more info w/o asking") → do_look `:1942-1952` `checkfile(temp_buf=firstmatch, pm, chkfilDontAsk, …)` → pass 1 alt="wizard" displays Ebenezum entry, pass 0 dbase="human wizard" same-offset-skipped; the message-more pending from putmixed is serviced (blocking, 34 bell keys + space at 859) before the menu paints. Proven: `(ans==LOOK_VERBOSE)?chkfilDontAsk:0` alone REGRESSES 859→824 (verify show_conduct), because JS reaches checkfile during turn 824 — its look pline saw `_toplin=NON_EMPTY` (traced) where C had NEED_MORE — so the load-bearing gap is topline-more/window-display timing (does tty_display_nhwindow flush a pending message-more first? cmdq REPEAT interplay from yn_function:1607?), not the flags. Do not pop until: re-baselined `hidden-proxy verify` shows a post-824 owner, or a display-timing iteration takes the do_look+topline envelope together. Do not "fix" with a yn-gate or coordinate seed-gate (D-1831/D-1849).
- `steal.c` mdrop_obj — capture-point divergence, not game logic (parked iter ~2279). explore-seed1500-rogue-explore-move-d7877f7d step 30 (key H): C frame is a MID-TURN --More-- pause (kitten glyph @x70 pre-move, dart pre-place, cursor parked at topline col 32, then 58 rng=0 repeats); JS frame is post-turn (kitten@x69, dart@x70 = JS end-state). C vs JS RNG identical through the session incl. all 48 drop-turn draws site-by-site (drop gates, 2× rn2(8) APPORT arms failed → appr=0 both, loop rn2(1..7) first-accepted/rest-rejected both). Falsified: flooreffects, stay-square accept, appr≠0, ALLOW_U, region veto, digweapon, stale-glyph, sound/pickup/curse extra line. Full mdrop_obj port is a proven no-op here → NO MOVEMENT on verify. Falsifier: C post-turn state (rebuilt-recorder dog_move dump) contradicting JS, or a re-record. Do not contort display (D-1831). See NOTES.md Active `mdrop_obj park`. Do not pop until that measurement exists.

- `hack.c` dopush — misattributed owner: the step-127 cell is a giant mimic's memory/viz, not the push. explore-seed0116-wizard-wear-shop-cfabc006 step 127/175, single cell r13c32 (map 33,12): C `` ` `` vs JS `·`, RNG 12853/12853, screens re-match at 128. Falsifier: C-side viz at step 127 (`cansee(33,12)` / IN_SIGHT bit) or JS `view_from` boundary audit around wall gap (32,11). See NOTES.md Active `dopush park`. Do not pop until that measurement exists.
- `dogmove.c` dog_invent — misattributed corpus owner (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Iter 2278. Do not pop. Falsifier: `node scripts/hidden-proxy.mjs verify dog_invent` (NO MOVEMENT until proxy rescore). Needs C `movement[]`/`mtrack` on tour-Priest-70006 step 44–45 (also Barbarian step 34: 0 dogmove draws, RNG match).
- D-0006 seed1800 pet movement — needs C state/candidate capture.
- `detect.c` dosearch residual — PARKED 2026-09-07, no D-log (was Open: strangulation pair PASS per D-2035; residual 3 sessions). Grid-bug `x` (mnum 116 = PM_GRID_BUG, speed 12, S_XAN class) at different map cells with fully matched RNG (scen-normal-Archeologist-92012 step 11 `s`: C x @(39,7)-decode vs JS id=23 (40,4)→(40,12) in 10 turns; scen-normal-Wizard-92127 step 32 `s`: C x @(54,8)-decode vs JS id=26 (48,7)→(58,6) in 13 turns; first RNG mismatch is strictly after each search step — 92127 idx 2975 = kick_dumb `exercise(A_DEX,FALSE)`+`rn2(3)`, a path consequence since JS kicks toward the adjacent bug) + gremlin short round (scen-tour-Archeologist-92023 step 65, diagnosed `mattacku` per D-2035-Next, own brief when re-queued). Falsifier: C per-turn mon positions during the multi-turn search (geom-probe invalid: appended playmode:debug diverges the run — different drop item, whole-map unknown, RNG totals differ; recorder has no mon-dump). See NOTES.md Active `dosearch grid-bug park`. Do not pop until that measurement exists.
