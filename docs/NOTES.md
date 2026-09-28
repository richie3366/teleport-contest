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
- Audits 1956–1971: ACCEPT + WITH-DEBT (unqueued); no Must-fix; do not re-open.
- Audits 1972–1989: ACCEPT (mtele_trap Must-fix @54 noted 1972–1980); do not re-open.
- Audits 1990–2015: 9/9/8 ACCEPT (1990–1998: 631/953, no flips); do not re-open.
- Audit 2016–2023: 8 ACCEPT; do not re-open. Seeded sample 5/5 sound (mkshop gap = mkshop partial). Env: node v20, no node:sqlite.

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

- D-1790…D-3068 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only. Do not read 12/12 as the 614/940 fortress (last full board `086317c06`, replaced at `38d6c8a36`).
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3068.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3068.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3068: print_queue prints the live `name(ptr)` arm via the shared TIMEOUT_FUNC_NAMES (newly exported from mkobj.js — no clone #2); new exported `cleanup_burn Named: - `print_queue`: none — the `!VERBOSE_TIMER #%d` arm is not compiled (C :1963); %p renders
- D-3067: new exported `async unmakemon(mon, mmflags)` in js/makemon.js in C order with per-arm `:line` cites — countbirth from MM_NOCOUNTBIRTH (:1519), mndx vi Named: `unmakemon`: none — every arm ported, every callee live (`monsndx`, `discard_minvent`, `mo
- D-3066: onbill restructured to C order with fire-and-forget impossible arms (same_price precedent); new exported restshk in shk.js (strncmpi/assign_level/poly Named: - `onbill`: none — whole body, sole callee live, all C callers wired.
- D-3065: new exported `free_all_glyphmap_u()` in js/glyphs.js in C order with per-arm `:line` cites (nulls utf8str then u per cell — C `free` ≡ null, GC collec Named: - `free_all_glyphmap_u`: the `:74–79` gbuf `gm.u` NULL sweep — JS keeps no per-cell glyph_
- D-3064: new exported `shirt_simple_name()` in js/do_wear.js with the sibling `*_simple_name` family (C home is objnam.c); the ARM_SHIRT arms (armor_simple_nam Named: - `armor_simple_name`: none — every arm ported, every callee live (armcat reads oc_skill ≡
- D-3063: new exported `free_nomakedefs()` in js/date.js in C order with per-arm `:line` cites (nulls the 4 strdup'd `game.nomakedefs` fields — GC owns the memo Named: - `free_nomakedefs`: none — every arm ported; NETHACK_GIT_SHA/BRANCH/PREFIX arms compiled 
- D-3062: new sync exports in `js/hack.js` in C order with per-arm `:line` cites (`spot_checks`; `cmp_weights` file-local from the `:4486` staticfn; `dump_weigh Named: - `spot_checks`: none — every arm ported, every callee live (`spot_time_left`, `spot_stop_
- D-3061: new exported `initoptions_init()` in `js/options.js` in C order with per-arm `:line` cites (opt_phase ×2, allopt_array_init, cmdline-windowtype arm vi Named: `initoptions_init`: sf_init `:7129` (NHFILE proc tables, no scored analogue); init_random 
- D-3060: js/light.js — new `wiz_light_sources_lines()` (C-order putstr lines) plus `async wiz_light_sources()` (wiz gate rendering cmd.c:157 unavailcmd, NHW_ME Named: - `wiz_light_sources`: C `:945` WIN_ERR arm collapses (no JS window-allocation failure lay
- D-3059: js/pager.js — new `docontact_lines()` plus `async docontact()` (C-order lines via `show_text_pages`), wired as dohelp 'o'. Named: - `docontact`: WIZARDS sysconf (js/cfgfiles.js:634 keeps `cnf_store_str('wizards')`) never
- D-3058: js/dig.js — new exported `async unearth_you` + `escape_tomb` in C order with per-arm `:line` cites. Named: - `escape_tomb`: the tunneler `dighole` arm (`:2264–2265`) is ported but unpinned headless
- D-3057: js/zap.js — restarted `wish_history_menu` whole in C order as `async`, returning the pick (JS strings immutable): ring walk `i = 19..0`, `idx = (wish_ Named: - `wish_history_menu`: none — every arm ported, every callee live (`select_menu_pick_one`)
- D-3056: js/zap.js — new file-local `spell_hit_bonus` in C order (`P_SKILL(spell_skilltype(skill))` via the live weapon.js/spell.js exports, `imports.mjs --can Named: - `wish_history_menu`: the menu pick body (`create_nhwindow` through `select_menu`, which 
- D-3055: timer save/restore closure (js/mkobj.js:1143/1200/1258; lev_json.js delegates). Named: ghostly adjust deferred; NHFILE N/A (JSON VFS).
- D-3054: four new locals in js/uhitm.js in C order with per-arm `:line` cites (`hmon_hitmon_weapon_ranged` → `hmon_hitmon_weapon` → `hmon_hitmon_potion` → `hmo Named: - `hmon_hitmon_do_hit`: none — every arm ported, every callee live (`barehands`, `hit`, `m
<!-- landmarks:end -->
