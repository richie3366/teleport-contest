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

- D-1790…D-2442 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2442.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2442.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2442: `js/polyself.js:89` only — added `bury_objs` to the existing `./dig.js` import. Named: none new; review 1395 both C-wrongs now closed (item 1 D-2441, item 2 this entry).
- D-2441: `js/polyself.js:38` only — added `setmangry` to the existing `./mon.js` import. Named: review 1395 item 2 — `dospinweb` PIT arm `bury_objs` (`js/polyself.js:2584`, live `js/dig.
- D-2440: `js/lock.js` only — deleted the `if (!applied) { u.dz = 0; }` block. Named: review 1393 item 2 — num_pad `'5'` self disjunct has no C counterpart (C binds `5` to the 
- D-2439: `js/hack.js:302–560` new `export async function test_move(ux, uy, dx, dy, mode)` in C order with per-arm `:line` cites: entry `door_opened=false` on a Named: block_door (shk.c:5791 — stub-false js/cmd.js:1176, no shop ESHK wire-up); block_entry (sh
- D-2438: `js/attrib.js` restart of the body in C order with per-arm `:line` cites: old_abase/old_amax snapshot beside old_acurr; abonflg from `u.abon.a[ndx]` ( Named: u_init.c:933/:935 (`u_init_carry_attr_boost` STR/CON loop) — JS `js/u_init.js:1689` stub s
- D-2437: `js/dungeon.js` restart in C order: memset/re-zero cited on the pd literal; nhl_init/nhl_loadlua failure panics named omits (generated `dungeon_data.j Named: nhl_init/nhl_loadlua/nhl_done Lua-state scaffolding + load-failure tbuf panic (generated-d
- D-2436: `js/polyself.js` only, in C order. dogaze: AT_GAZE mattk scan with AD_CONF/AD_FIRE gate else impossible; Blind/Hallucination/uen<15 gates; uen-=15 + b Named: retouch_equipment(2) (`artifact.c:2639`, own coverage row); regen_hp/losexp/explode/losehp
- D-2435: `js/end.js` only, in C order — achievements via live `record_achievement` (ACH_BLND/NUDE gated on `uachieved[0]||!beginner`, ACH_UWIN on ASCENDED; gam Named: dumplog family (`dump_open_log`/`dump_everything`/`dump_redirect`/`genl_outrip`/`dump_forw
- D-2434: `js/lock.js` only, in C order — cmdq DIR respects num_pad NDIR/SDIR + dirz `>`/`<`, non-DIR/KEY now `await impossible('getdir: command queue had no di Named: `readchar`/`readchar_queue`/`readchar_core` (altmeta pushback empty in sessions; nhgetch c
- D-2433: `js/makemon.js` only — split the post-`set_mon_data` block into `newcham_light_invis` (`:5399–5412`), `newcham_ustuck` (`:5413–5450`: break-out `You`  Named: none inside the function.
- D-2432: `js/polyself.js` only — restart of the thin body in C order: entry `sticking`/`wasHidingUnder`/`wasExpelled`/`ustuckNam` locals; first-poly `livelog_p Named: `retouch_equipment(2)` (`artifact.c:2639`, own coverage row); light-source bookkeeping (se
- D-2431: `js/trap.js` only — subtract + AD_FIRE monkilled nested under the existing `(mhp|0)>0` check in C order (`:1800–1806` comment); `trapeffect_fire_trap` Named: trap.js local `monkilled`/`mondied` clones ignoring `how`/disintegested + missing accessib
- D-2430: `js/lock.js` only for the locus — tail `if (!(u.dz | 0)) confdir(false)` in C order at both exits (self + normal); `confdir` was already imported (no  Named: stethoscope `apply.c:379` self-confdir (pre-existing deferral, kept); C getdir mouse `_` g
- D-2429: `js/mklev.js` only — capture `ttmp` and call `mktrap_seen_victim(ttmp, {})` (exact: not-WEB so spider flag moot, seen/novictim false per the string+co Named: other bare-`maketrap` NO-TAIL sites left exactly as found (no session evidence): `555` MAG
- D-2428: `js/monmove.js` — `function can_fog` → `export function can_fog` (hoisted declaration, no TDZ risk); `js/mon.js` — `can_fog` added to the existing sta Named: `stuff_prevents_passage` inside `can_fog` (pre-existing map note, same deferral as `can_oo
<!-- landmarks:end -->
