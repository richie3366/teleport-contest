# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Live hypotheses only:

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
- Audit 2167–2175 gap: D-3189/D-3190 lack per-SHA audits (counts live in CURRENT Score + journal).

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

- D-1790…D-3265 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3265.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3265 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3265: js/do.js only — impossible arm (`await impossible('Not a boulder?')`, C :57, then FALSE fallthrough); steed whobuf (`y_monnam(u.usteed)` + `upstart`/` Named: - `boulder_hits_pool`: none in-body — whole C body live (pre-existing local notes kept: `m
- D-3264: js/hack.js — unmul prints the follow-up after nomovemsg in C order (`Upolyd(game.u)` + 18-char case-insensitive prefix + `await You('are %s.', an(pmna Named: - `done`: paniclog TRICKED file write (Rule #2); fuzzer_savelife (debug-fuzz only).
- D-3263: Medusa: `await mon_reflects(mtmp, 'The gaze is reflected away by %s %s!')` early-return, then vis-gated stone pline + `game.context.stoned = true` (mh Named: `use_mirror`: full zap.c `bhit` (Open row; INVIS_BEAM mon-targeting via file-local `bhit_i
- D-3262: js/uhitm.js + js/mthrowu.js; the m_useupall import extends the pre-existing uhitm.js→mthrowu.js edge (:133 `hit`, call-time use — no `imports.mjs --ca Named: - `hmon_hitmon_stagger`: none in-body — whole C body live.
- D-3261: js/do.js only + js/end.js only; all imports extend pre-existing module edges (fill_pit on the do.js→dig.js edge :183; DB_FLOOR/DB_UNDER + PLNMSG_OK_DO Named: - `goto_level`: pre-existing — binary NHFILE savelev/getlev (by-design); Gehennom amulet m
- D-3260: js/end.js — savelife restart in C order on live imports (minuhpmax, setuhpmax, make_sick, endmultishot; TIMEOUT/SICK_ALL consts; 3 new edges, all impo Named: - `savelife`: end.c:952 fuzzer_savelife caller (debug-fuzz only); pre-existing run/mv clea
- D-3259: js/zap.js only, all six imports extend pre-existing module edges (display/hack/trap/dungeon/seffects_data/const — no `imports.mjs --can` needed). Named: - `zap_over_floor`: none in-body — whole C body live (pre-existing "dotrap polish" doc phr
- D-3258: C-exact `if (Is_rogue_level(u.uz)) unblock_point(x, y);` via live js/vision.js:482 on the pre-existing vision.js edge (extended import, no new module  Named: - `seffect_magic_mapping`: none in-body — whole C body live.
- D-3257: `show_map_spot` restart in C order: live `unblock_point` in the SCORR arm; `glyph_at` id + disp-render snapshot before the background repaint (C's `sh Named: - `show_map_spot`: none in-body — whole C body live.
- D-3256: `passive_obj`: AD_RUST `erode_obj(weapon,null,ERODE_RUST,EF_GREASE)`; AD_ENCH `drain_item(weapon,TRUE) && carried && (known||ARMOR)` → `Yobjnam2 "seem Named: - `passive_obj`: none in-body — whole C body live.
- D-3255: restart the thin body as `export async function reset_utrap(msg)` in C order (was_Lev/was_Fly snapshot via same-file `hero_Levitation`/`hero_Flying` y Named: - `reset_utrap`: zap.c:5303 (`zap_over_floor` TT_LAVA Passes_walls arm — no JS counterpart
- D-3254: `js/display.js` only, no new module edge (same-file `glyph_is_unexplored` :885 + `glyph_is_cmap` :891; no `imports.mjs --can` needed): gate the `remem Named: - `seffect_magic_mapping`: blessed-scroll Rogue `unblock_point` stands approximated as `vi
- D-3253: `js/uhitm.js` only, no new module edge (in-scope `get_dmg_bonus` local + `PM_SHADE`; no `imports.mjs --can` needed): floor → `dmg = (get_dmg_bonus &&  Named: - `abuse_dog`: none in-body — whole C body live.
- D-3252: `js/do.js` only, no new module edge — all callees pre-imported (set_move_cmd/u_rooted via cmd.js :184; stucksteed via steed.js :158; near_capacity via Named: - `doup`: none in-body — whole C body live (at_ladder `stway.isladder` fallback pre-existi
- D-3251: `js/uhitm.js` only, no new module edge — AD_STUN guard → file-local `hero_Stunned()` (:1494, the youprop.h:81 equivalent) + `await (await import('./po Named: - `passive`: AD_ACID remainder — M_SEEN markers (:5916/:5918), erode_armor (:5921; live js
<!-- landmarks:end -->
