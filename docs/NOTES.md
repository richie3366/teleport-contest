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
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3363 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3363.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3363 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3363: measured H1 (same cell, wrong glyph): prefix replay shows cursor [41,16] both sides at step 97; the single lookat call is (42,15) with NO_GLYPH; temp  Named: - `def_char_is_furniture`: none in-body — whole C body live at js/drawing.js:20.
- D-3362: 8-way parallel `xargs -P 8` worker stress: 8/8 complete, byte-identical attribution (distfleeck@287, error null) — the kill does not reproduce at HEAD Named: none (no port).
- D-3361: ported the dobuzz arms in C order behind a per-iteration `buzzmonst` closure for the C :4867 label (the steed :4956 goto shares it, skipping fireball- Named: - `dobuzz`: AD_MAGM..ACID explode combat → explode.js (D-0973, pre-existing); flash_str no
- D-3360: extended the six ALREADY static edges (`highc` → js/botl.js:92 hacklib import; `upstart` → js/potion.js:177 hacklib import; `s_suffix` → js/potion.js: Named: - `highc`: none in-body — whole C body live at js/hacklib.js:455.
- D-3359: extended the two ALREADY static →mondata edges (`attacktype` added to the mondata.js imports js/mhitu.js:86, js/uhitm.js:114; `imports.mjs --can` ALRE Named: - `attacktype`: none in-body — whole C body live at js/mondata.js:81.
- D-3358: extended the six ALREADY static →hacklib edges (`upstart` added to the hacklib.js imports js/trap.js:146, js/pickup.js:121, js/apply.js:146, js/do_nam Named: - `upstart`: none in-body — whole C body live at js/hacklib.js:498.
- D-3357: extended the 7 ALREADY static edges (`dmgtype` added to the monsters.js imports js/mhitm.js:120, js/mhitu.js:70, js/monmove.js:15, js/zap.js:263; `att Named: - `dmgtype`: none in-body — whole C body live at js/monsters.js:565.
- D-3356: extended the two ALREADY static →hacklib edges (`upstart` added to the hacklib.js imports js/mthrowu.js:11, js/read.js:142; `imports.mjs --can` ALREAD Named: - `upstart`: none in-body — whole C body live at js/hacklib.js:497.
- D-3355: extended the 6 ALREADY static edges (`attacktype` added to the mondata.js imports js/makemon.js:100, js/muse.js:53, js/polyself.js:40, js/trap.js:148; Named: - `attacktype`: none in-body — whole C body live at js/mondata.js:79.
- D-3354: extended the two ALREADY static →hack edges (`On_stairs` added to the hack.js imports js/dogmove.js:63, js/apply.js:83; `imports.mjs --can` ALREADY bo Named: - `On_stairs`: none in-body — whole C body live at js/hack.js:3409.
- D-3353: extended the two ALREADY static →hack edges (`invocation_pos` added to the hack.js imports js/mklev.js:166, js/apply.js:83; `imports.mjs --can` ALREAD Named: - `invocation_pos`: none in-body — whole C body live at js/hack.js:3434.
- D-3352: - `unique_corpstat`: extended the four ALREADY static →mon edges (`unique_corpstat` added to the mon.js imports js/trap.js:46, js/teleport.js:92, js/z Named: - `unique_corpstat`: none in-body — whole C body live at js/mon.js:2961.
- D-3351: exported the canonical body at C-home js/priest.js:88 (whole C body in C order, unchanged); extended the ALREADY static teleport→priest edge (`histemp Named: - `histemple_at`: none in-body — whole C body live at js/priest.js:88.
- D-3350: ported `export function attacktype` at C-home js/mondata.js:79 (whole 1-line C body in C order + file-local `AD_ANY = -1`, monattk.h:41 — no js/ expor Named: - `attacktype`: none in-body — whole C body live at js/mondata.js:79.
- D-3349: rewired the 2 mklev sites to the ALREADY-imported live export (no import change — :150; same-module live uses :3235/:3245); new static apply→dungeon e Named: - `Invocation_lev`: none in-body — whole C body live at js/dungeon.js:2392.
<!-- landmarks:end -->
