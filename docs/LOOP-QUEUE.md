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

- [ ] `do.c` cmd_safety_prevention — blocks 7/553 corpus sessions (first at step 19): C «Searching doesn't feel like a good idea right now.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify cmd_safety_prevention` (scen-death-Caveman-92159, scen-death-Monk-92121, scen-death-Monk-92191).
- [ ] `wield.c` ready_weapon — blocks 6/553 corpus sessions (first at step 20): C «You cannot wield a two-handed weapon while wearing a shield.» vs JS «e - a dwarvish mattock (weapon in hands).». Probe: `node scripts/hidden-proxy.mjs verify ready_weapon` (scen-genesis-Valkyrie-92166, scen-wish-Knight-92204, scen-wish-Priest-92041).
- [ ] `allmain.c` regen_hp — blocks 6/553 corpus sessions (first at step 42): C «You are in full health.--More--» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify regen_hp` (scen-death-Ranger-92234, scen-genesis-Archeologist-92084, scen-intrinsic-Barbarian-92008).
- [ ] `objnam.c` wishymatch — blocks 5/553 corpus sessions (first at step 65): C «@a human or elf or you (dwarven archeologist called wizard)» vs JS «@a human or elf (dwarven archeologist called wizard)». Probe: `node scripts/hidden-proxy.mjs verify wishymatch` (scen-genesis-Archeologist-92175, scen-genesis-Archeologist-92205, scen-tour-Archeologist-92023).
- [ ] `engrave.c` engrave — blocks 5/553 corpus sessions (first at step 88): C «You finish writing in the dust.» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify engrave` (scen-intrinsic-Samurai-92043, scen-kit-Priest-92085, scen-normal-Caveman-92006).
- [ ] `end.c` disclose — blocks 5/553 corpus sessions (first at step 73): C «Do you want to see your conduct and achievements? [ynq] (n)» vs JS «Do you want to see your conduct? [ynq] (n)». Probe: `node scripts/hidden-proxy.mjs verify disclose` (scen-genesis-Caveman-91109, scen-genesis-Priest-92082, scen-genesis-Valkyrie-92074).
- [ ] `do.c` doup — blocks 4/553 corpus sessions (first at step 9): C «Beware, there will be no return! Still climb? [yn] (n)» vs JS «You can't go up here.». Probe: `node scripts/hidden-proxy.mjs verify doup` (scen-normal-Barbarian-92208, scen-normal-Healer-92227, scen-normal-Rogue-92160).
- [ ] `makemon.c` newmonhp — blocks 4/553 corpus sessions (first at step 83): C draws `d(10,8)=52` in newmonhp, JS `d(29,8)=116` from newmonhp(makemon.js:926). Probe: `node scripts/hidden-proxy.mjs verify newmonhp` (scen-genesis-Barbarian-91118, scen-genesis-Caveman-92118, scen-genesis-Knight-92149).
- [ ] `pickup.c` tipcontainer_gettarget — blocks 4/553 corpus sessions (first at step 63): C «Where to tip the contents of an empty uncursed sack» vs JS «The bag is empty.». Probe: `node scripts/hidden-proxy.mjs verify tipcontainer_gettarget` (scen-normal-Archeologist-92211, scen-normal-Archeologist-92228, scen-normal-Archeologist-92236).

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

- `insight.c` show_conduct — STALE premise + misattributed owner (parked 2026-09-05, HEAD c209ccc7). Row was queued at baf24c95 as "859 conduct-text vs yn prompt"; at HEAD the session diverges at **824 x_monnam** (do_name.c:967): C row 0 `@ a human or elf (human wizard called wizard)--More--` (message-more, map intact, 35 frozen steps) vs JS row 0 Ebenezum `wizard` data.base entry menu (offx 18). Owner `insight.c:2122` is a C **comment** line — C screen is the pager.c checkfile `* wizard` entry, never conduct text. True C chain (all read at HEAD): getpos ':' → LOOK_VERBOSE (hack.h:544-546 "show more info w/o asking") → do_look `:1942-1952` `checkfile(temp_buf=firstmatch, pm, chkfilDontAsk, …)` → pass 1 alt="wizard" displays Ebenezum entry, pass 0 dbase="human wizard" same-offset-skipped; the message-more pending from putmixed is serviced (blocking, 34 bell keys + space at 859) before the menu paints. Proven: `(ans==LOOK_VERBOSE)?chkfilDontAsk:0` alone REGRESSES 859→824 (verify show_conduct), because JS reaches checkfile during turn 824 — its look pline saw `_toplin=NON_EMPTY` (traced) where C had NEED_MORE — so the load-bearing gap is topline-more/window-display timing (does tty_display_nhwindow flush a pending message-more first? cmdq REPEAT interplay from yn_function:1607?), not the flags. Do not pop until: re-baselined `hidden-proxy verify` shows a post-824 owner, or a display-timing iteration takes the do_look+topline envelope together. Do not "fix" with a yn-gate or coordinate seed-gate (D-1831/D-1849).
- `steal.c` mdrop_obj — capture-point divergence, not game logic (parked iter ~2279). explore-seed1500-rogue-explore-move-d7877f7d step 30 (key H): C frame is a MID-TURN --More-- pause (kitten glyph @x70 pre-move, dart pre-place, cursor parked at topline col 32, then 58 rng=0 repeats); JS frame is post-turn (kitten@x69, dart@x70 = JS end-state). C vs JS RNG identical through the session incl. all 48 drop-turn draws site-by-site (drop gates, 2× rn2(8) APPORT arms failed → appr=0 both, loop rn2(1..7) first-accepted/rest-rejected both). Falsified: flooreffects, stay-square accept, appr≠0, ALLOW_U, region veto, digweapon, stale-glyph, sound/pickup/curse extra line. Full mdrop_obj port is a proven no-op here → NO MOVEMENT on verify. Falsifier: C post-turn state (rebuilt-recorder dog_move dump) contradicting JS, or a re-record. Do not contort display (D-1831). See NOTES.md Active `mdrop_obj park`. Do not pop until that measurement exists.

- `hack.c` dopush — misattributed owner: the step-127 cell is a giant mimic's memory/viz, not the push. explore-seed0116-wizard-wear-shop-cfabc006 step 127/175, single cell r13c32 (map 33,12): C `` ` `` vs JS `·`, RNG 12853/12853, screens re-match at 128. Falsifier: C-side viz at step 127 (`cansee(33,12)` / IN_SIGHT bit) or JS `view_from` boundary audit around wall gap (32,11). See NOTES.md Active `dopush park`. Do not pop until that measurement exists.
- `dogmove.c` dog_invent — misattributed corpus owner (shared `"%s picks up %s."`; both hits are `mon.c mpickstuff`). Iter 2278. Do not pop. Falsifier: `node scripts/hidden-proxy.mjs verify dog_invent` (NO MOVEMENT until proxy rescore). Needs C `movement[]`/`mtrack` on tour-Priest-70006 step 44–45 (also Barbarian step 34: 0 dogmove draws, RNG match).
- D-0006 seed1800 pet movement — needs C state/candidate capture.
