# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  `port-coverage.mjs` MISSING/THIN count falls ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **2026-09-16 process take (measured):** 126/362 non-audit iterations
  2026-09-09..15 were parks; 109/161 parked rows were stale copies from
  `data.md`/`debt.md`/TOP30. Superseded by the breadth phase (parks closed;
  rows come from `port-coverage.mjs --rows`, measured at enqueue).
- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **Shipped writers (detail in D-logs, do not re-check):** rloc arrivals (D-2418/2419); distfleeck mail-daemon (D-2410); mon_adjust_speed glyph (D-2421); enlightenment BoH/Unchanging (D-2422/23); collect_coords mk_bubble flips (D-2427); mfndpos can_fog door (D-2428 — both Valkyries moved past).
- **m_move cnt-j (D-2409 + D-2424 + D-2428 shipped):** goblin C5/J4 → mfndpos ALLOW_M arm; Valkyrie residuals → can_fog door writer, shipped. Falsified: mtrack, occupants.
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2487 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2487.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2487.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2487: new `js/glyphs.js` (634 L) in C order — `zero_find`, `strcmpi` (hacklib `strncmpi` -1 idiom), `fix_glyphname`, `glyph_hash` (rotl-1/XOR uint32), doubl Named: `find_struct` callback/color/unicode consumers — `glyphrep_to_custom_map_entries`, `glyphr
- D-2486: `js/uhitm.js` — new module-local `async function hmon_hitmon_misc_obj(mon, obj, ctx)` (C staticfn shape, mirroring sibling `hmon_hitmon_weapon_melee`' Named: `munstone` (`muse.c:2884`, treat FALSE — mhitm.js `do_stone_mon` idiom); `hmon_hitmon_msg_
- D-2485: one word — `has_egd` added to the existing const.js import in `js/mon.js:25` (no new edge: `imports.mjs --can mon.js const.js has_egd` reports mon.js  Named: none new (D-2479 `panic`/`levltyp_to_name`/`#if 0` arms + unwired `mon_sanity_check` calle
- D-2484: `js/zap.js` only + one import — new `export async function wishcmdassist(triesleft)` in C order: `WISHCMDASSIST_INFO[]` (all 15 `wishinfo` lines verba Named: `wish_history_add`/`wish_history_menu` DEBUG menu (pre-existing no-op/deferred, map turns.
- D-2483: `js/objnam.js` only, no new imports — new `export function xname_flags(obj, cxn_flags)` holding the former `xname` body in C order (prologue `:632–650 Named: nextobuf/PREFIX/ConcUpdate/Concat truncation + eos overflow paniclog (by-design JS strings
- D-2482: `js/mhitm.js` in C order, mirroring shipped `mhitm_ad_were` (D-2049, identical 3-arm shape) — `const AD_HEAL = 27` (monattk.h `:69`); exported `mhitm_ Named: uhitm arm (`:4300–4304`) has no `damageum_adtyping` row (hero-as-nurse-attacker keeps defa
- D-2481: `js/roles.js` (C home) in C order — `randrole` (`rn2(roles.length)` ≡ `rn2(SIZE-1)`; display arm via live `rn2_on_display_rng`), module-local `randrol Named: restore-path re-derivation (above); `iflags.defer_plname`/`sysopt.genericusers` arms porte
- D-2480: `js/cmd.js` in C order — `pgetchar` (fuzzer arm returns `randomkey()`, else `await nhgetch()`; async only per Constitution §2), `randomkey` (full body Named: `readchar_core` fuzzer arm (`cmd.c:5218`); `wintty.c:4068` tty fuzzer arm.
- D-2479: both functions added module-local in `js/mon.js` (C home, matching C `staticfn`) in C order — data-pointer range, mnum fixup, HP bounds (gremlin `m_le Named: `panic` (own unported row; throw used); `levltyp_to_name` + all three `#if 0` arms (dead-m
- D-2478: `js/mail.js` in C order — file-local C-macro equivalents (`Deaf`/`Blind`/`Blind_telepat`/`distu`, sibling-idiom verbatim; `mail_text` + `md_exclamatio Named: `ckmailstatus` mustgetmail/stat/broadcast variants (mailbox `stat()` is Rule #2 filesystem
- D-2477: `js/trap.js` only, no new imports — anti-magic site walks `for (const _am of game.invent || [])` with the same predicate (`oartifact` + `!is_quest_art Named: none new (D-2470's "none" stands; FIRE_TRAP invent-burn walk stays the map-named `immune_t
- D-2476: route each through the `%s` arm (verbalize/impossible D-2471 precedent — substituted args are never re-scanned by `vpline_expand`): engrave keeps the  Named: the remaining ~100 single-arg `pline(variable)` sites (apply/artifact/bones/detect/dig/do/
- D-2475: `js/topten.js` only, in C order — new module-local `score_wanted` (version gate; `pers_is_uid` uid arm; `-uname` strip; `-p/-r/-u` + next-arg arms wit Named: `fopen_datafile` (VFS read is the Rule #2 analogue); `readentry`/`newttentry` allocation m
- D-2474: `js/priest.js` only, in C order — new `export async function ghod_hitsu` (`:191`): roomno-char gate (`temple_occupied`, `'\0'` check) + `has_shrine`;  Named: C `hmon` anger_guards tail (`uhitm.c:826–827` + `:831–833`; mon.js angry_guards live, unwi
- D-2473: `js/artifact.js` restart in C order — `retouch_object(obj, loseit)` (`:1451`): Bell-of-Opening invocation-square pass-through (`BELL_OF_OPENING` const Named: `untouchable`/`retouch_equipment` (sole unwired caller chain; `loseit=TRUE` reachable only
<!-- landmarks:end -->
