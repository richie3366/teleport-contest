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

- [ ] `pager.c` describe_looked self '@' found-count — C `pager.c:1346–1355` `found += append_str(out_str, "you")` takes found 1→2 so `do_look :1941` (`found == 1`) skips checkfile; JS keeps `found: 1` so verbose (`:`) look at own square as dwarf/gnome/orc with help on emits `More info about "dwarven archeologist"?` (data keys `archeolog*`/`* valkyrie`/`* ranger`/`* wizard` pmatch the simplified self-lookat string; measured vs embedded dat_text.js) where C prints nothing. Fix: `found: orYou ? 2 : 1` in the self branch. Probe: verbose-look own square as dwarven hero, watch for the extra yn prompt. Source: reviews/loop-unattended/983-488f18ab-pager-or-you-found.md.

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

- [ ] `mkobj.c` next_ident — blocks 6/553 corpus sessions (first at step 157): C draws `rnd(2)=1` in next_ident, JS `rn2(5)=2` from distfleeck(monmove.js:808). Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-poly-Priest-92021, scen-tour-Wizard-92103, scen-wish-Archeologist-92038).
- [ ] `attrib.c` exercise — blocks 5/553 corpus sessions (first at step 60): C draws `rn2(2)=1` in exercise, JS `rn2(300)=129` from dosounds(sounds.js:344). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-death-Monk-92000, scen-death-Tourist-92095, scen-death-Wizard-92120).
- [ ] `botl.c` do_statusline2 — blocks 5/553 corpus sessions (first at step 63): C «The jackal bites! The jackal bites!» vs JS «The jackal bites! The jackal bites!». Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-poly-Monk-92164, scen-poly-Priest-91137, scen-poly-Tourist-92047).
- [ ] `insight.c` one_characteristic — blocks 5/553 corpus sessions (first at step 54): C «Your constitution was 14 (limit:18).» vs JS «Your constitution was 14 (limit:18).». Probe: `node scripts/hidden-proxy.mjs verify one_characteristic` (scen-genesis-Ranger-91139, scen-genesis-Ranger-92073, scen-genesis-Ranger-92151).
- [ ] `eat.c` lesshungry — blocks 5/553 corpus sessions (first at step 7): C «You're finally finished.» vs JS «You finish eating the food ration.». Probe: `node scripts/hidden-proxy.mjs verify lesshungry` (scen-kit-Archeologist-92190, scen-kit-Monk-92139, scen-kit-Valkyrie-91116).
- [ ] `wizard.c` pick_nasty juvenile alt gate — blocks 1/553 corpus sessions: scen-genesis-Caveman-92118 step 97/167 C «A green dragon appears next to you.» vs JS «A baby green dragon appears next to you.» (ROLL_FROM matches on GREEN_DRAGON; C `big_to_little` juvenile name-string gate keeps the adult, JS `pick_nasty` doc-named omission always accepts the non-geno baby alt; `newmonhp` is now verbatim so only the mndx input differs — see latest D-log entry). Probe: `node scripts/hidden-proxy.mjs show scen-genesis-Caveman-92118` (replay in output; `verify pick_nasty` is vacuous until rescore re-attributes it from `newmonhp`).
- [ ] `pickup.c` use_container — blocks 4/553 corpus sessions (first at step 84): C «Your sack is empty. Do what with it?» vs JS «Your sack is empty. Do what with it?». Probe: `node scripts/hidden-proxy.mjs verify use_container` (scen-intrinsic-Rogue-92089, scen-kit-Rogue-92225, scen-normal-Rogue-92160).
- [ ] `hack.c` trapmove — blocks 3/553 corpus sessions (first at step 85): C «You are a statue.--More--» vs JS «You are a statue. You can move again.». Probe: `node scripts/hidden-proxy.mjs verify trapmove` (scen-death-Knight-92203, scen-death-Monk-92123, scen-intrinsic-Caveman-92070).
- [ ] `teleport.c` collect_coords — blocks 3/553 corpus sessions (first at step 114): C draws `rn2(8)=1` in collect_coords, JS `rn2(5)=3` from distfleeck(monmove.js:805). Probe: `node scripts/hidden-proxy.mjs verify collect_coords` (scen-poly-Healer-92107, scen-tour-Priest-92235, scen-tour-Samurai-91113).
- [ ] `potion.c` dodrink — blocks 3/553 corpus sessions (first at step 118): C «If you can't breathe air, how can you drink liquid?» vs JS «What do you want to drink? [di or ?*]». Probe: `node scripts/hidden-proxy.mjs verify dodrink` (scen-intrinsic-Priest-92096, scen-wish-Knight-91128, scen-wish-Rogue-92137).

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

- `wield.c` ready_weapon — PARKED 2026-09-07: full-arm port (bimanual+shield `:187–191`, weld pline `:198–215`, aklys tether `:232–233`, unpaid `:264–271`; corpse/arti_speak/artifact_light stay named-deferred) moves 5/6 blocked sessions (scen-genesis-Valkyrie-92166 + scen-wish-Valkyrie-92027 + scen-wish-Tourist-92181 PASS; scen-wish-Priest-92041 → use_grapple@146; scen-wish-Samurai-92088 → dodown@88) but scen-wish-Knight-92204 (blessed horn + shield, step 25) spins at ~99% CPU (worker 45 s timeout, no row → verify REGRESSION). New arms proven innocent: byte-identical bimanual pline PASSES on Genesis/Valkyrie mattock; weld pline advances Priest/Samurai/Tourist — so the hang is downstream of the corrected step-25 fail (horn unwielded, no turn), a pre-existing sync loop on that path, not the port. Green fortress 44/44 held throughout. Falsifier: stack/profile of the Knight worker past step 25 (suspects: multi-turn/search lifecycle — recipe carries `20s` keys — or input-exhaustion microtask spin). Do not pop until that measurement exists. Port reverted (no D-log); retry from this note.
- `insight.c` show_conduct — STALE premise + misattributed owner (parked 2026-09-05, HEAD c209ccc7). Row was queued at baf24c95 as "859 conduct-text vs yn prompt"; at HEAD the session diverges at **824 x_monnam** (do_name.c:967): C row 0 `@ a human or elf (human wizard called wizard)--More--` (message-more, map intact, 35 frozen steps) vs JS row 0 Ebenezum `wizard` data.base entry menu (offx 18). Owner `insight.c:2122` is a C **comment** line — C screen is the pager.c checkfile `* wizard` entry, never conduct text. True C chain (all read at HEAD): getpos ':' → LOOK_VERBOSE (hack.h:544-546 "show more info w/o asking") → do_look `:1942-1952` `checkfile(temp_buf=firstmatch, pm, chkfilDontAsk, …)` → pass 1 alt="wizard" displays Ebenezum entry, pass 0 dbase="human wizard" same-offset-skipped; the message-more pending from putmixed is serviced (blocking, 34 bell keys + space at 859) before the menu paints. Proven: `(ans==LOOK_VERBOSE)?chkfilDontAsk:0` alone REGRESSES 859→824 (verify show_conduct), because JS reaches checkfile during turn 824 — its look pline saw `_toplin=NON_EMPTY` (traced) where C had NEED_MORE — so the load-bearing gap is topline-more/window-display timing (does tty_display_nhwindow flush a pending message-more first? cmdq REPEAT interplay from yn_function:1607?), not the flags. Do not pop until: re-baselined `hidden-proxy verify` shows a post-824 owner, or a display-timing iteration takes the do_look+topline envelope together. Do not "fix" with a yn-gate or coordinate seed-gate (D-1831/D-1849).
- `steal.c` mdrop_obj — capture-point divergence, not game logic (parked iter ~2279). explore-seed1500-rogue-explore-move-d7877f7d step 30 (key H): C frame is a MID-TURN --More-- pause (kitten glyph @x70 pre-move, dart pre-place, cursor parked at topline col 32, then 58 rng=0 repeats); JS frame is post-turn (kitten@x69, dart@x70 = JS end-state). C vs JS RNG identical through the session incl. all 48 drop-turn draws site-by-site (drop gates, 2× rn2(8) APPORT arms failed → appr=0 both, loop rn2(1..7) first-accepted/rest-rejected both). Falsified: flooreffects, stay-square accept, appr≠0, ALLOW_U, region veto, digweapon, stale-glyph, sound/pickup/curse extra line. Full mdrop_obj port is a proven no-op here → NO MOVEMENT on verify. Falsifier: C post-turn state (rebuilt-recorder dog_move dump) contradicting JS, or a re-record. Do not contort display (D-1831). See NOTES.md Active `mdrop_obj park`. Do not pop until that measurement exists.

- `hack.c` dopush — misattributed owner: the step-127 cell is a giant mimic's memory/viz, not the push. explore-seed0116-wizard-wear-shop-cfabc006 step 127/175, single cell r13c32 (map 33,12): C `` ` `` vs JS `·`, RNG 12853/12853, screens re-match at 128. Falsifier: C-side viz at step 127 (`cansee(33,12)` / IN_SIGHT bit) or JS `view_from` boundary audit around wall gap (32,11). See NOTES.md Active `dopush park`. Do not pop until that measurement exists.
- `dogmove.c` dog_invent — misattributed corpus owner (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Iter 2278. Do not pop. Falsifier: `node scripts/hidden-proxy.mjs verify dog_invent` (NO MOVEMENT until proxy rescore). Needs C `movement[]`/`mtrack` on tour-Priest-70006 step 44–45 (also Barbarian step 34: 0 dogmove draws, RNG match).
- D-0006 seed1800 pet movement — needs C state/candidate capture.
