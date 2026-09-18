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

- D-1790…D-2473 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2473.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2473.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2473: `js/artifact.js` restart in C order — `retouch_object(obj, loseit)` (`:1451`): Bell-of-Opening invocation-square pass-through (`BELL_OF_OPENING` const Named: `untouchable`/`retouch_equipment` (sole unwired caller chain; `loseit=TRUE` reachable only
- D-2472: `js/files.js` only, in C order — new `export function fqname` (`:501`: PREFIX branch live, prefixes from `game.gf?.fqn_prefix` (unset → basenam, as C  Named: MACOS9 `macopen`, MSDOS/WIN32 `setmode`, VMS `;1`, WIN32 `translate_path_variables` (platf
- D-2471: `js/display.js` only, in C order — new `export async function vpline(fmt, ...args)` (`:7650`): consume-then-format accessiblemsg (`vpline_consume_msg_ Named: `panic` on `ln > BIGBUFSZ-1` (fatal exit, no JS export — never hit; JS keeps the BUFSZ-tru
- D-2470: `js/trap.js` only, in C order — module-local `async trapeffect_anti_magic` (`:5128`): iron-shoes `spe>0` drain (same-object fetch via `u.uarmf`/file-l Named: none new in this body (every callee live; `which_armor`/`monkilled`/`attacktype` file-loca
- D-2469: `js/mklev.js` only, in C order — `(u.uhave.amulet || !rn2(3))` short-circuit with `makemon` + spider check (`data?.mndx === PM_GIANT_SPIDER`, monmove. Named: `set_levltyp` full `count_level_features` recount (`mkmaze.c:106–108`) — C recounts then `
- D-2468: `js/pager.js` only, in C order — `do_look(mode = 0, click_cc = null)` with `quick`/`clicklook` (`:1675–1676`); cmdq pop/`cmdq_clear()` (= CQ_CANNED de Named: `create/start/add/end/select/destroy_nhwindow` windowing mechanism (JS paints the same ent
- D-2467: `js/mklev.js` only — new `export async function mkinvokearea()` + module-local `mkinvpos`/`mkinvk_check_wall` in C order: shake pline + wall-count loo Named: `display_nhwindow(WIN_MESSAGE, TRUE)` (no JS export; pline flushes); C `deadbook` caller (
- D-2466: new `export async function sink_into_lava()` (`js/trap.js:6296`, placed after `lava_effects` in C file order) — whole body in C order: not-trapped no- Named: none new in this body (every callee live, every arm ported).
- D-2465: new module-local `async function fpostfx(otmp)` (`js/eat.js:1980`) in C order — `:2513–2516` wolfsbane `you_unwere(TRUE)` (moved verbatim); `:2517–252 Named: none new in this body.
- D-2464: restart in C order — `gp.pline_flags |= PLINE_VERBALIZE` (`PLINE_VERBALIZE` joins the existing const.js import); quote-then-format (`"..."` wrap, then Named: `mail.c:342,373,418,434` (`md_rush` — no JS counterpart); `eat.c:2588` (inside `fpostfx`, 
- D-2463: restart as `async` in C order — `:2109–2112` Rider corpse `revive_corpse` (dynamic do.js import); `:2114–2117` extract-then-read otx/oty + `restricted Named: `mkobj.c:2081` `mkcorpstat` x==0&&y==0 `rloco` — JS `mkcorpstat` is sync with 5+ transitiv
- D-2462: `js/mhitu.js` only — restart in C order: `t_at` + pit/boulder miss (`is_pit`, `sobj_at`, BOULDER const); Punished `unplacebc()`; live remove/place_mon Named: none new in this body.
- D-2461: `js/display.js` — new exported `docrtRecalc/Refresh/MapOnly/Nocls` consts + `export async function docrt_flags(refresh_flags)` in C order (flag decode Named: wintty.c:435 rescale trigger (above); non-docrt under_water/under_ground caller wiring (pr
- D-2460: `js/weapon.js` restart of mon_wield_item in C order — impossible('weapon_check %d for %s?') + bare return-0 in default; mwelded refuse arm (bimanual/m Named: none new in-body (every arm live); the two caller defers above stay with their owners (dog
- D-2459: `js/dog.js` — module-local when consts + `failed_arrivals` (C dog.c:301 reset-in-losedogs) + `mon_arrive_link` head (STILL_ARRIVING/fmon/isshk→set_res Named: losedogs kops-dismiss scan (dismissKops/make_happy_shoppers `:310–356`); full mnearto yank
<!-- landmarks:end -->
