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

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3373 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3373.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3373 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3373: extended the two ALREADY static edges (`highc` → js/dokeylist.js:43 hacklib import; `s_suffix` → js/eat.js:127 do_name import — zap/mhitm already impo Named: - `highc`: none in-body — whole C body live at js/hacklib.js:455.
- D-3372: restart as `export async function choose_classes_menu(prompt, category, way, classList, classSelect)` — whole C body in C order at js/options.js:5543  Named: select_menu/add_menu/add_menu_str/create_nhwindow/start_menu/end_menu/destroy_nhwindow — s
- D-3371: whole C body in C order at C-home js/restore.js:256 — unconditional reset (`game.sp_levchn = []`), JSON array length as the `Sfi_int lev_count`, per-n Named: `alloc` — GC object literal, not the alloc.js byte buffer (no struct call sites exist).
- D-3370: same-name JSON-analogue exports at C-home js/save.js (savefruitchn precedent, js/bones.js:339): `savelevchn` walks `game.sp_levchn` (dungeon.js keeps  Named: - `savelevchn`: release_data arm (C :984, :992–993 — free each node, null head) → JSON per
- D-3369: whole C body in C order at C-home js/restore.js:237 — fobj chain walk, ghostly-gated omonst arm (`m_id = 0`, `mpeaceful = mtame = 0`), ghostly-gated o Named: none in-body — whole C body live.
- D-3368: deleted both clones; js/music.js:62 + js/potion.js:196 import the canonical export (`imports.mjs --can` SAFE — hoisted function declaration; zap→mhitm Named: none new.
- D-3367: restructured the u_at block into if/else: the steed arm (:2584–2587) ends the branch after buzzmonst (break on Rider/PM_DEATH absorb preserved); the h Named: none new (D-3361 omits stand: AD_MAGM..ACID explode combat → explode.js; flash_str nohallu
- D-3366: deleted both blocks; restored the pre-6da1640bc direct `return reveal_terrain_cmap_hack(...)` tail (verified against `git show 6da1640bc~1:js/display. Named: none (deletion only; the reveal id arms and their D-3363 omissions stand).
- D-3365: deleted the stale duplicate; `set_symhandling` iterates KNOWN_HANDLING (identical null-terminated scan + case-insensitive compare). Named: parse_sym_line (sole C caller; unported — ships via its own coverage row when eligible).
- D-3364: js/display.js — new showsyms_defaults(set): P from generated DEFSYMS (+ rogue +/% overrides, C :196–198), O from local DEF_OC_SYM (+ rogue armor/amule Named: - `assign_graphics`: :249 reset_glyphmap(gm_symchange) → by-design (fortress guard; queue 
- D-3363: measured H1 (same cell, wrong glyph): prefix replay shows cursor [41,16] both sides at step 97; the single lookat call is (42,15) with NO_GLYPH; temp  Named: - `def_char_is_furniture`: none in-body — whole C body live at js/drawing.js:20.
- D-3362: 8-way parallel `xargs -P 8` worker stress: 8/8 complete, byte-identical attribution (distfleeck@287, error null) — the kill does not reproduce at HEAD Named: none (no port).
- D-3361: ported the dobuzz arms in C order behind a per-iteration `buzzmonst` closure for the C :4867 label (the steed :4956 goto shares it, skipping fireball- Named: - `dobuzz`: AD_MAGM..ACID explode combat → explode.js (D-0973, pre-existing); flash_str no
- D-3360: extended the six ALREADY static edges (`highc` → js/botl.js:92 hacklib import; `upstart` → js/potion.js:177 hacklib import; `s_suffix` → js/potion.js: Named: - `highc`: none in-body — whole C body live at js/hacklib.js:455.
- D-3359: extended the two ALREADY static →mondata edges (`attacktype` added to the mondata.js imports js/mhitu.js:86, js/uhitm.js:114; `imports.mjs --can` ALRE Named: - `attacktype`: none in-body — whole C body live at js/mondata.js:81.
<!-- landmarks:end -->
