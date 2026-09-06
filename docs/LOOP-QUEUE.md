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

- [ ] `botl.c` do_statusline2 — blocks 11/553 (first at step 16): row 23 C `… Xp:1 Strngl` vs JS without the condition; `#wizintrinsic` strangling / sliming / stoning / sickness / vomiting etc. Port the full `bot2` condition list in C order (`botl.c:130` onwards, `bl_conditions` order + width truncation), not just Hunger/Conf/Blind. Probe: `node scripts/hidden-proxy.mjs verify do_statusline2` (scen-death-Caveman-92141, scen-death-Caveman-92159, scen-death-Monk-92121).
- [ ] `polyself.c` break_armor — blocks 9/553 (first at step 54): `You turn into a gelatinous cube!  You break out of your armor!` — C `break_armor :1171` message/RNG order per armor slot (cloak vs body armor first, `Your cloak tears apart`, shield/helmet/gloves/boots drop arms, `polyself.c:1189` clasp arm). Probe: `node scripts/hidden-proxy.mjs verify break_armor` (scen-poly-Knight-92220, scen-poly-Monk-92005, scen-poly-Priest-91137).
- [ ] `polyself.c` drop_weapon — blocks 4/553 (first at step 93, 12.5k RNG): C `You find you must drop your dagger!` names the weapon (`:1331` `yname`/`aobjnam` arm, `alone` flag, twoweapon and `nohands` cases); JS says `your weapon`. Ship after `break_armor` (same file, shared falsifier `scen-poly-*`). Probe: `node scripts/hidden-proxy.mjs verify drop_weapon` (scen-poly-Ranger-91131, scen-poly-Ranger-92090, scen-poly-Valkyrie-92195).
- [ ] `attrib.c` exercise — blocks 8/553 (first at step 48): C draws `rn2(19)` in `exercise :509` (the `attrib.c` exercise/exerchk gate after dressing / fighting) where JS is already in `mcalcmove`. Read `exercise`, `exerper`, `exerchk` and their callers (`do_wear.c` `Armor_on`, `uhitm.c`, `allmain.c`). Probe: `node scripts/hidden-proxy.mjs verify exercise` (scen-genesis-Archeologist-92084, scen-genesis-Samurai-92083, scen-genesis-Samurai-92110).
- [ ] `insight.c` enlightenment family — `enlightenment` blocks 7/553 (^X attributes screen), `one_characteristic` 5 (`Your wisdom was 18 (limit:18).` row set), `status_enlightenment` 3 (`You are turning into slime.`): one falsifier (`^X` / death disclosure), one file. Port the C page order arm by arm (`insight.c:398` `enlightenment` sections, `:926` characteristics, status). Probe: `node scripts/hidden-proxy.mjs verify enlightenment` (scen-death-Valkyrie-92176, scen-intrinsic-Caveman-92150, scen-normal-Knight-92215), then `verify one_characteristic`, `verify status_enlightenment`.
- [ ] `wizcmds.c` wiz_intrinsic — blocks 7/553 (first at step 16): C `You feel deathly sick.--More--` then `Timeout for fatally sick set to 30.`; JS prints the timeout line first and draws `rn2(12)` from `mcalcmove` where C draws `rn2(2)` in `wiz_intrinsic :1036` (the `make_sick`/`set_itimeout` + `incr` arms). Probe: `node scripts/hidden-proxy.mjs verify wiz_intrinsic` (scen-death-Archeologist-92015, scen-death-Knight-92203, scen-intrinsic-Barbarian-92008).
- [ ] `monmove.c` set_apparxy — blocks 6/553 (first at step 7): C draws `rn2(4)` in `set_apparxy :2280` (displacement / `mtmp->mux` notseen gate) where JS is in `m_initinv`; a freshly created (`^G`) monster's first move. Probe: `node scripts/hidden-proxy.mjs verify set_apparxy` (scen-genesis-Ranger-92126, scen-genesis-Ranger-92151, scen-wish-Healer-92147).
- [ ] `steed.c` doride / mount_steed — blocks 6/553 (first at step 51): C `Force the mount to succeed? [yn] (n)` (wizard-mode arm of `mount_steed`, `steed.c:185`) vs JS `I see nobody there.`; saddle / `#ride` toward an adjacent monster. Probe: `node scripts/hidden-proxy.mjs verify doride` (scen-intrinsic-Ranger-92193, scen-kit-Valkyrie-92131, scen-normal-Healer-92231).
- [ ] `makemon.c` makemon → `mkobj.c` next_ident order + monster gender — blocks 5/553 (first at step 34): C `An elf-lord appears next to you.` / `Elvenking` vs JS `elf-lady` / `Elvenqueen`; C draws `rnd(2)` in `next_ident :521` (object creation inside `m_initweap`/`m_initinv`) where JS draws `rn2(2)` in `m_initweap` first — the gender roll and the object ident draw are in the wrong order. Read `makemon :1494` (`m_initgrp`, `mkobj_at` ident) and `pmnames[]` gendered naming. Probe: `node scripts/hidden-proxy.mjs verify next_ident` (scen-genesis-Archeologist-92175, scen-tour-Wizard-92103, scen-wish-Knight-92130).
- [ ] `lock.c` pick_lock / `apply.c` use_pick_axe on an occupied square — blocks 5/553 (first at step 6): C `I don't think the kitten would appreciate that.` (`lock.c:567` `pick_lock` direction arm with a monster there) vs JS `You see no door there.`. Probe: `node scripts/hidden-proxy.mjs verify pick_lock` (scen-kit-Rogue-92225, scen-kit-Tourist-91126, scen-wish-Barbarian-92102).
- [ ] `read.c` create_particular_creation — blocks 5/553 (first at step 14): `^G` of a unique / genocided / not-yet-eligible monster: C `Creating doppelganger instead; force Demogorgon? [yn] (n)` (`read.c:3267` `create_particular_creation` uniqueness / `mvitals` gate) vs JS creating it directly. Probe: `node scripts/hidden-proxy.mjs verify create_particular_creation` (scen-death-Valkyrie-92229, scen-genesis-Barbarian-91118, scen-genesis-Knight-92149).
- [ ] `uhitm.c` mhitm_mgc_atk_negated — blocks 5/553 (first at step 26): C draws `rn2(10)` in `mhitm_mgc_atk_negated :87` (the `AD_*` magic-attack negation gate before knockback) where JS is already in `mhitm_knockback`. Probe: `node scripts/hidden-proxy.mjs verify mhitm_mgc_atk_negated` (scen-genesis-Tourist-92003, scen-poly-Caveman-92050, scen-wish-Caveman-92183).
- [ ] `mkroom.c` somex / `themerms.lua` themed-room fills at Dlvl 1 — blocks 4/553 at step 0 (15.7k RNG) plus 5 `unattributed` step-0 rows (`rn2(27) @ nhlib.lua random parent=contents(themerms.lua:183)` vs JS `rnd_rect`): a themed room C fills that the port skips. Geometry owner → `node scripts/geom-probe.mjs scen-genesis-Monk-92025` first, then port the missing `themerms.lua` room/fill from `nethack-c/upstream/dat/themerms.lua` (26 rooms; check which `name =` entries `js/mklev.js` lacks). Probe: `node scripts/hidden-proxy.mjs verify somex` (scen-genesis-Monk-92025, scen-genesis-Rogue-92069, scen-poly-Caveman-91133).

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
