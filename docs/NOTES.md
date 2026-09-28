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
- Audit 1956–1962: 6 ACCEPT, 1 WITH-DEBT (1962, unqueued). No Must-fix; do not re-open. Env: node v20, no `node:sqlite`.
- Audit 1963–1971: 6 ACCEPT, 3 WITH-DEBT (unqueued). No Must-fix; do not re-open.
- Audit 1972–1980: 9 ACCEPT + Must-fix mtele_trap @54; do not re-open.
- Audit 1981–1989: 9 ACCEPT, 0 Must-fix (631/953, no flips); do not re-open.
- Audit 1990–1998: 9 ACCEPT, 0 Must-fix (631/953, no flips); do not re-open.
- Audit 1999–2007: 9 ACCEPT, 0 Must-fix (631/953, no flips); do not re-open. Env: node v20, no `node:sqlite` (ledger sql sample skipped).

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

- D-1790…D-3053 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3053.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3053.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3053: restarted the export whole in C order with per-arm `:line` cites — zero-literal slot (`rnd` holds C `.rndm`; file convention js/artifact.js:558), `exi Named: - `artifact_origin`: none — every arm ported, sole C callee `impossible` live.
- D-3052: new export in js/display.js in C order with per-arm `:line` cites — nocolor guard via `game.gs?.symset?.[game.currentgraphics | 0]?.nocolor` (same sha Named: - `cmap_to_roguecolor`: the five `reset_glyphmap` `has_rogue_color` arms (C `:2874`, `:291
- D-3051: restarted `check_credit` whole in C order with per-arm `:line` cites — async only because `pline_The` can reach --More-- (Constitution §2), `credit == Named: - `pay`: invent-full dropy on money2u (gold merges; pre-existing).
- D-3050: restarted the export whole in C order with per-arm `:line` cites — explicit `switch` with `A_NEUTRAL` and `default: gnam = 0` arms, `result` variable, Named: - `align_gtitle`: none — every arm ported, 0 C callees, every C caller wired.
- D-3049: restarted the export whole in C order with per-arm `:line` cites — `!mon` defensive guard kept (C declares NONNULLARG1; every call site passes live mt Named: - `relmon`: keepdogs follower arm (dog.c:861–863) keeps its inline splice at js/dog.js:524
- D-3048: restarted the export whole in C order with per-arm `:line` cites — `let croom = null` (:1662), `(game.level?.nroom | 0) === 0 → mazexy(mp)` (:1664–166 Named: - `find_branch_room`: none — every arm ported, every callee live (`mazexy` ok D-1952, `gen
- D-3047: new exports in js/options.js in C order with per-arm `:line` cites. Named: - `handler_menu_headings`: C `:5790` `adjust_menu_promptstyle(WIN_INVEN, …)` — by-design, 
- D-3046: expanded the Valkyrie arm in C order with per-arm `:line` cites: `mtmp && mtmp.data?.name === 'PM_MAIL_DAEMON'` → `'Hallo'`, else `'Velkommen'` — mirr Named: - `Hello`: none — every arm ported, every callee live (0 C callees), every C caller wired.
- D-3045: restarted `furniture_detect` whole with per-arm `:line` cites — `unconstrain_map()` :1097, `glyph_at`/`glyph_to_cmap` reads :1101–1102, `IS_FURNITURE( Named: - `furniture_detect`: C :1126 `display_nhwindow(WIN_MAP, TRUE)` — no JS `display_nhwindow`
- D-3044: deleted both twins, added `cloak_simple_name` to the existing `./do_wear.js` imports (both edges already existed — no new cycle); wired the five do_we Named: - `cannot_push_msg`: none.
- D-3043: stale pair untouched (ledger notes only). Named: - `hawaiian_motif`: `hawaiian_design` (read.c:223–252, different `~ubirthday` hash + `hawa
- D-3042: `necrophiliac` declared by-design, no code (porting `#if 0` C would add dead JS C never executes). Named: - `necrophiliac`: whole function — C `#if 0`, never compiled (muse.c:2688/2703, both trees
- D-3041: restarted `drop` whole in C order with per-arm `:line` cites (same export name/signature); new sync `finesse_ahriman` export in js/artifact.js in C po Named: - `drop`: none — every arm ported, every callee live.
- D-3040: new exports in js/options.js in C order with per-arm `:line` cites. Named: - `set_option_mod_status`: wintty.c:2965 `set_option_mod_status("perm_invent", set_gamevie
- D-3039: restarted `quest_chat` whole in C order with per-arm `:line` cites (bare `m_id` compare per C; `await setmangry(mtmp, false)` for C `FALSE`; `mtmp.dat Named: - `quest_chat`: none — every arm ported, every callee live (`chat_with_leader`, `setmangry
<!-- landmarks:end -->
