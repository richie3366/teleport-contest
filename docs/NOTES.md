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
  the ledger's declared-ported count rises (`docs/ledger/SNAPSHOTS.tsv`,
  one line per audit) ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.
- Audit 1946–1955: 9 ACCEPT, 1 WITH-DEBT (1951, unqueued). No Must-fix; do not re-open. `piousness`/`corpse_intrinsic` parked Stale.
- Audit 1956–1962: 6 ACCEPT, 1 WITH-DEBT (1962, unqueued). No Must-fix; do not re-open. Env: node v20, no `node:sqlite`.
- Audit 1963–1971: 6 ACCEPT, 3 WITH-DEBT (unqueued). No Must-fix; do not re-open.
- Audit 1972–1980: 9 ACCEPT + Must-fix mtele_trap @54; do not re-open.
- Audit 1981–1989: 9 ACCEPT, 0 Must-fix (631/953, no flips); do not re-open.
- Audit 1990–1998: 9 ACCEPT, 0 Must-fix (631/953, no flips); do not re-open.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3040 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3040.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3040.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3040: new exports in js/options.js in C order with per-arm `:line` cites. Named: - `set_option_mod_status`: wintty.c:2965 `set_option_mod_status("perm_invent", set_gamevie
- D-3039: restarted `quest_chat` whole in C order with per-arm `:line` cites (bare `m_id` compare per C; `await setmangry(mtmp, false)` for C `FALSE`; `mtmp.dat Named: - `quest_chat`: none — every arm ported, every callee live (`chat_with_leader`, `setmangry
- D-3038: restarted the export whole in C order with per-arm `:line` cites; null arm keeps the `return FALSE` control flow and cites the impossible pline as omi Named: - `objdescr_is`: C `:357` impossible("objdescr_is: null obj") pline — omitted: impossible(
- D-3037: new `js/decl.js` `decl_globals_init()` in C order with per-arm `:line` cites: modeled `game.g*` namespaces (`ga,gb,gc,gd,gf,gg,gh,gi,gm,gn,go,gp,gr,gs Named: - `decl_globals_init`: unmodeled `g*` namespaces `ge,gj,gk,gl,gq,gt,gv,gx,gy,gz` (no JS re
- D-3036: - `t_warn`: no code change — stale confirmed (switch whole, both C callers wired, `impossible()` cite per D-2608: `impossible()` is async, `wall_angle Named: - `stat_update_time`: `windowprocs.wincap2` registry (caps read 0; FLUSH arm skips as with
- D-3035: restarted the export whole (`js/mklev.js:395`) with per-arm `:line` cites — `|0` on x/y (C `coordxy`), `!!` on up/isladder (C `boolean`; every reader  Named: - `stairway_add`: reststairs NHFILE restore loop (restore.c:978 + `u_traversed` fixup `:98
- D-3034: `fix_wall_spines` whole + panic arm (`js/mklev.js:32463`); helpers C-named; okay/check_ransacked split. Named: none.
- D-3033: - `fhito_loc`: new staticfn (`js/muse.js:894`) in C order with per-arm `:line` cites; async since live `bhito` is async; `|0` on ox/oy/tx/ty (C `coord Named: `destroy_drawbridge` (mbhit STRIKING arm, pre-existing); `use_offensive` tele/undead `fhit
- D-3032: - `l_push_mkroom_table`: new export (`js/mklev.js:23014`) returning the C-exact table object (plain object = the Lua push; region sub-object = nhl_add Named: - `l_push_mkroom_table`: contents callbacks receive the live room, not the table (above); 
- D-3031: - `get_saved_pline`: new export (`js/display.js:2559`) in C order with per-arm `:line` cites over the live ring — `|0` lineno, newest-slot start, 50-s Named: - `get_saved_pline`: C `(0 - 1) % 50` out-of-bounds read at ring index 0 (decl.c zero-init
- D-3030: - `bare_artifactname`: restarted the export whole in C order against live callees — `artiname(obj.oartifact | 0)` (same file, C-exact incl. Named: - `bare_artifactname`: `nextobuf()` rotating-buffer allocation elided — JS strings immutab
- D-3029: new `export function wizcustom_callback` (`js/wizcmds.js:1609`) in C order with per-arm `:line` cites: glyphmap via `ensure_glyphmap()` (exported from Named: - `wizcustom_callback`: `wiz_custom` (wizcmds.c:1933, own row — sole consumer of the fille
- D-3028: `js/dokeylist.js` — restarted `dokeylist_lines` in C order with per-arm `:line` cites: new file-local `live_spkey` (live `game.Cmd.spkeys[nhkf]` with  Named: - `dokeylist`: the `#else` (NO_SIGNAL defined) ^C arm `:2957–2958` — not compiled in the u
- D-3027: `js/engrave.js` — restarted `del_engr` in C order with per-arm `:line` cites: `!ep` JS guard kept (C NONNULLARG1; JS passes engr_at() misses straight  Named: - `del_engr`: none — every arm ported, every callee live (impossible) or a macro (dealloc_
- D-3026: new `js/sys.js` in C order with per-arm `:line` cites. Named: - `sys_early_init`: none in the compiled body — every live arm ported; dead `#else`/`#ifde
<!-- landmarks:end -->
