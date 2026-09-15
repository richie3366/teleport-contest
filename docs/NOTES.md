# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **do_statusline2→polymon writer (MEASURED 2026-09-16):** scen-death-Tourist-92095 step-46 screen (C AC:6 vs JS AC:10, identical `Your shirt rips to shreds!` toplines) is find_ac-vs-capture ordering inside one polymon batch, NOT armor state. Fresh-process prefix replays: 27 tokens→45 screens u.uac=10 (matches C AC:10 @44); 28 tokens→49 screens u.uac=6, all worn null, umonnum set (matches C AC:6). So JS find_ac HAS the `mons[u.umonnum].ac` form-base arm (C do_wear.c:2475); JS step-46 capture lands pre-find_ac (deferred post-encumber_msg, js/polyself.js:1305) while C lands post-find_ac (polyself.c:888–890). Steps 44–45 + 47–49 identical both sides; only screen 46 diverges. Prior AC:9 session needed the deferral (js/polyself.js:1292–1296) — porter must fix flush/More timing, not just move find_ac. Cmds: `node scripts/hidden-proxy.mjs show scen-death-Tourist-92095`, probes /tmp/dbg-trunc27.mjs /tmp/dbg-trunc.mjs /tmp/dbg-rows.mjs. Falsifier: `verify polymon` moving Tourist-92095 to PASS/later owner.
- **2026-09-16 process take (measured):** 126/362 non-audit iterations
  2026-09-09..15 were parks; 109/161 parked rows were stale copies of
  shipped work from `data.md`/`debt.md`/TOP30 refills. Falsifier for the
  fix: park share over the next 30 port iterations
  (`git log --format=%s -60 | rg -c '^Park'`) — expect ≤ 3, all diagnostic
  (writer or `[measure]` row added in the same commit).
- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **botl parity (1/3 shipped D-2400; 2/3 gate open, 3/3 masked):** C paints
  status only on `disp.botl/botlx/time_botl`; JS `bot()` runs every loop.
  3/3 meal gate measured 2026-09-16: C-exact wiring verifies NO MOVEMENT
  (lembas first diffs @58/@82 precede the park step-60 effect; 44/44 +
  cohort identical, reverted) — masked until the step-2 gate ships. DONE
  2/3 stamped D-2400 but the gate was reverted (seed0007-T needs a C-side
  flag trace); no live 2/3 row — supervisor to re-queue or consolidate.
- **Knight worker spin** (MEASURED 2026-09-16, `[measure]` row delivered): no spin at HEAD — canonical `can_carry` import live (`js/dogmove.js:17`), Knight-92182 replays in 0.3 s to step 95 (parked `obj_resists`); `verify mattackm` vacuous, cohort 7/7. The 2026-09-08 ETIMEDOUT premise is retired with its row.
- **disclose→enlightenment writer (MEASURED 2026-09-16):** scen-wish-Priest-92179 step-100 conduct-screen map diff is display-stream-only. Core RNG 3081/3081 identical C vs JS through step 100 (per-function match; sole delta C `nh:210` ≡ JS `themerooms_generate:217` is the Lua-tag scheme, not draws), 0 core draws steps 93–100 (bones `rn2(1)` @95 only); hero hallucinating both sides (JS `HHallucination=1039`); C map glyphs frozen steps 90→97 (death + invent-menu open/close restores, no fresh draws), full fresh hallucinated repaint at step 100 after the attributes menu on BOTH sides (JS shows the identical freeze/repaint shape) with different picks ⇒ desync entered in the 97→100 window (attributes menu/scroll/close or the silent v/g arms; invent path proven draw-free by the matched step-97 restore). No new writer row: 2nd witness of the live drinkfountain-park display-stream desync (same signature — post-enlightenment-menu fresh hallucinated repaint, identical core RNG, 4 cells; that park already verified mechanism/constants/reseed/newsym/display_self/notice_all_mons matching and named the one open measurement). Disclose parks as SYMPTOM pointing at that park's C display-RNG-trace falsifier. Falsifier: the trace naming the extra/missing draw, or any vision/display repaint port moving `node scripts/hidden-proxy.mjs show scen-wish-Priest-92179` to PASS/later owner. Probes: /tmp/disclose-probe2.mjs, /tmp/cglyph-track.mjs, /tmp/jglyph-track.mjs; `node scripts/brief.mjs disclose`.
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
## Don't re-check (≤15)

- D-1790…D-2401 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2401.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2401.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2401: `js/dogmove.js` only — full C-order port with C FALLTHROUGH structure, `|0` oartifact integer idiom, `MON_WEP(mon)` canonical wep, `which_armor(mon, W Named: `mdrop_obj` flooreffects + vault-guard gold + worn/shop extrinsics stay named (pre-existin
- D-2400: `js/display.js` only — docrt sets `game.flags.botlx = true` after `see_monsters()` (post vision path, mirroring post_map; early uswallow/water/buried  Named: docrt_flags maponly/redrawonly/nocls params + `update_inventory()` (map turns.md display s
- D-2399: `js/mthrowu.js` only — `u_catch_thrown_obj` now `async`, tests `!nohands(game.youmonst?.data)` (null-safe; identical for unpoly'd heroes), and on succ Named: `mthrowu.js:292` file-local `freehand` clone kept (engrave.js:610 canonical is C-home and 
- D-2398: `js/dothrow.js` only — deleted the dead `throw_gold` block; added the same dynamic-import + `await` in `throwit` between the `flooreffects` block and  Named: `throwit` shk pick-snatch (`is_pick`/`mpickobj`, pre-existing named per review 295/D-2393)
- D-2397: `js/do_wear.js` — `Gloves_off` now async in C order: capture `gloves` + `on_purpose` pre-clear, `takeoff.mask &= ~W_ARMG`, `clear_worn(W_ARMG)`, then  Named: Gloves_off Fumbling/Power/Dexterity switch arms + Glib cure + encumber_msg (pre-existing t
- D-2396: `js/potion.js` only — the make_sick onset, partial-cure and full-cure arms plus make_slimed/make_stoned now mirror TIMEOUT bits to `u.uprops[…].intrin Named: make_vomiting/make_stunned/make_confused flat writers share the dual-storage shape (own ro
- D-2395: `js/do_wear.js` only — new exported `wielding_corpse(obj, how, voluntary)` in exact C order (CORPSE/uarmg/wield gates; `touch_petrifies(mons(corpsenm) Named: none new.
- D-2394: `js/topten.js` only — the four arms in exact C order with `slice(0,6/8/7/13)` prefix checks (≡ the `strncmp` lens) and `t1.plgend?.[0]==='F'`, then th Named: none new; both `outentry` map omissions retired (turns.md line updated to live, this entry
- D-2393: `js/do.js` — canonical exported `async obj_no_longer_held` in exact C order (null return; `Has_contents` recursion; `(otyp|0)===CRYSKNIFE` + `!oerodep Named: sync cores `place_object` (`mkobj.c:2330`), `add_to_container` (`mkobj.c:2683`), `extract_
- D-2392: `js/mhitm.js` — exported `mhitm_ad_slow` in exact C mhitm-branch order (gate first, `|0` mspeed/MSLOW guard, oldspeed snapshot, `await mon_adjust_spee Named: `defended(mdef, AD_SLOW)` early return (`:3659–3660`, RNG-free wielded-artifact / blue-sca
- D-2391: `js/weapon.js` — canonical exported `autoreturn_weapon` (C order: null guard, `otyp('AKLYS')` compare, `{ otyp, range: AKLYS_LIM², tethered: 1 }`; `BO Named: `thrwmu` polearm arm (`mthrowu.c:1195–1240` is_pole/MON_POLE_DIST/couldsee/canseemon + msw
- D-2390: `js/vault.js` — full async `wallify_vault` in C order/branch structure (boundary-ring loops with interior `continue`; `IS_WALL || g_at || sobj_at(ROCK Named: `xy_set_wall_state` paint (mklev.js file-local, not exported — `wall_info=0` set exactly, 
- D-2389: `js/do_wear.js` — new `carrying_stoning_corpse()` (C invent walk over `game.invent`, `CORPSE` + `touch_petrifies(mons(corpsenm))`; exported: C declare Named: none new — ring-arm `gloves_simple_name` gauntlets variant, `cloak_simple_name` robe, `sur
- D-2388: `js/pickup.js` only (+ import line): `query_classes` calls canonical `tally_BUCX(objs, here)` from `./invent.js` (`imports.mjs --can` → ALREADY, same  Named: none new — `count_unpaid` floor-head nobj note retired as already-exact (see C locus); qbu
- D-2387: `js/mhitu.js` — `gulpmu_can_blnd` gains C's `check_visor` flag (set in the CLAW arm only) + the `:388–396` tail via new file-local `visored_helmet_wor Named: `uhitm.js` exported `can_blnd` + `mhitu.js` `can_blnd_u` keep their own visor defers (othe
<!-- landmarks:end -->
