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

- D-1790…D-3020 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3020.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3020.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3020: new `export async function wiz_display_macros` (`js/wizcmds.js:1527`) in C order against live exports — live helpers. Named: - `wiz_display_macros`: none — every arm ported, every callee live, the C caller wired.
- D-3019: restarted the export in C order: guard, `for` over `glyphidCacheSize` (mirrors C's bound; `init_glyph_cache` fills exactly that many entries so the in Named: - `free_glyphid_cache`: none in the body — every arm ported, no live callee.
- D-3018: `arti_speak` whole in C order (`js/artifact.js`); wield + doapply (5 artifact-eligible arms) tails wired. Named: none.
- D-3017: `save_worm()` (`js/worm.js`) snapshots slots 1..MAX-1 tail-first as plain `{wx,wy}` lists (list length IS the C count, dummy head included; empty ⇔ nu Named: - `save_worm`/`rest_worm`: Sfo/Sfi binary encode (stash/JSON architecture, engrave precede
- D-3016: new `js/mkroom.js` (1:1 file mapping) — file-local `save_room` (scalar-record copy ⇔ `Sfo_mkroom`, children nested under `subrooms` mirroring C file o Named: - `save_room`/`save_rooms`: Sfo binary encode (stash/JSON architecture, engrave precedent)
- D-3015: `wishymatch` (`js/readobjnam.js:249`) restarted whole in C order against live exports — `fuzzymatch(u,o,' -',true)`, `strstri` tail semantics (`!*(p+l Named: - `wishymatch`: `eos` — C buffer-cursor navigation only (`copynchars(eos(strcat(buf," ")),
- D-3014: `can_reach_location` obstructed arm restarted exact-C — `IS_OBSTRUCTED(typ) && !passes_walls(ptr) && (!may_dig(i,j) || !tunnels(ptr) || Is_rogue_level Named: - `can_reach_location`: none — every arm ported, every callee live, both C callers wired.
- D-3013: new exact-C `glyph_is_normal_generic_obj` (`js/display.js:901`, `glyph_id` null-convention like its siblings). Named: - `show_glyph`: no integer-glyph `show_glyph(x,y,glyph)` entry point — callers pre-decode 
- D-3012: Port the `:1258` vision and `:1261-1264` bypass/split arms in C order at both movement levels. Named: - `movemon_singlemon`: `dist2` at the Conflict arm resolves to the pre-existing `js/mon.js
- D-3011: export drops `|| c === 13` (per-arm `:line` cites added); pager.js deletes the clone and adds `key2txt` to its existing dokeylist.js import (`imports. Named: - `key2txt`: C `:229` cmdq_print `(key:%s)` — the whole function is commented out in C (`/
- D-3010: new file-local async `see_lamp_flicker(obj, tailer)` + `lantern_message(obj)` in C order (C staticfn → file-local, async because Your/You_see/pline aw Named: - `lantern_message`: none — every arm ported, every callee live (Your/You_see/pline/Halluc
- D-3009: restart in C order. Named: - `doset_simple_menu`: symset pick → handler_symset `:6320–6328` → symbols.c do_symset (no
- D-3008: `bless` (`js/mkobj.js:680`) restarted whole in C order — COIN guard, radius-before-flip, BUC flip (JS booleans per curse idiom), luck → bag weight → t Named: - `bless`: none in the body — every arm ported, every callee live (`arti_light_radius`, `c
- D-3007: `load_special(name)` at `js/mklev.js:3012` — strips LEV_EXT and reuses `load_special_proto` entry/exit/dispatch (its `finally` is C's give_up free + N Named: - `load_special`: `load_lua` bare-file IO (by-design nhlua, no scored analogue); `wiz_load
- D-3006: port `lock_mouse_buttons(savebtns)` at `js/cmd.js:1023` in C order — module-local `_locked_mousebtn` stash (`:1022`, C `:3329` static), save arm stash Named: - `lock_mouse_buttons`: none — both arms ported, both C callers wired (`bind_mousebtn` unp
<!-- landmarks:end -->
