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
- Audit 2151–2157: 6 ACCEPT, 1 debt (2155, map); 0 Must-fix families; public 44/44; corpus 654/953 (+6, 0 losses). Gap: D-3189/D-3190 lack per-SHA audits.

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

- D-1790…D-3215 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present: `hidden-proxy record --jobs 8` reports all sessions present (953 entries). Full scores require unfiltered `score`, after every audit verify.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3215.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3215 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3215: restart both in C order. Named: - `Gloves_off`: none added — null-gloves graceful clear kept (C dereferences uarmg; siblin
- D-3214: fill the blnd stub with the established 8-site `pline('Your vision clears.')` idiom (`Your1` is the `Your("%s",·)` macro, `hack.h:1027`; `vision_clear Named: - `mhitm_ad_blnd`: none — all three arms live; `Your1`/`vision_clears` are a macro + commo
- D-3213: cache `nobj` before `do_loot_cont` in the single walk; restart `able_to_loot` in C order wiring the live `rider_cant_reach` (steed.js), `cant_reach_fl Named: - `doloot_core`: none in the body — PICK_ANY extras (invert/pages/>26 accelerators) are `s
- D-3212: mplayer dlev arm in all 3 clones (`is_mplayer` via existing monsters.js edges — mhitm already imported it); TELL `shieldeff_mon` at both async TELL si Named: - `resist`: caller-side only — mbhitm STRIKING vs-monster arm (`muse.c:1632–1644`: resists
- D-3211: wire the live exports in C order — `defended(mdef, AD_COLD)` disjunct (`uhitm.c:2641`); `monstseesu(M_SEEN_COLD)` / `monstunseesu` else-branch (`:2660 Named: - `mhitm_ad_cold`: none — all three arms whole, every callee live.
- D-3210: the 4 one-line clones drop the `|| endsWith('S')` disjunct (comment now cites the lowercase-only C predicate); zap restarted as the C-exact 4-arm body Named: - `s_suffix`: none in the body — all 11 homes now C-exact (D-3200's caller-level omits fil
- D-3209: walk `[...(game.fmon || [])]` — the snapshot is C's mtmp2 chain (C-created mons prepend to fmon and are likewise unvisited mid-walk, so the snapshot m Named: - `iter_mons`: none — whole 13-line C body live.
- D-3208: the two `if` arms in C switch order after the BLINDED arm. Named: - `from_what`: none added — birth blind/deaf + Blindfolded_only/cream stay named in the JS
- D-3207: `else { if (!final) { … } }` in C nesting: inline `await import('./pray.js')` (reuses the live invent→pray edge from `:7539`, no new module edge), `ca Named: - `attributes_enlightenment`: none added — the `#if 0` pray wording is compiled out of C (
- D-3206: `ep` is now the live `nh_getenv('SHOPTYPE')` call under the existing `wizard` gate; the ten single-char arms ported in C order with C's early returns  Named: - `mkshop`: none — every arm live, every callee live (`nh_getenv` mail.js, `mkzoo`/`mktemp
- D-3205: `js/invent.js` only, no new module edges (16 consts join the existing static `./const.js` import; per-arm dynamic imports reuse live edges — `imports. Named: - `status_enlightenment`: none — every arm live, including the three dead-in-C arms.
- D-3204: `scripts/extract-quest-nemesis.py` generalized (ARRAY_KEYS incl. the guardtalk pair, GUARD_KEYS extraction, Arc Lash-LaRue anchor asserts) writing new Named: - `com_pager_core`: impossible() text on all miss arms (pre-existing — embedded tables can
- D-3203: roguename restarted in C order keeping name/signature: live `nh_getenv('ROGUEOPTS')` import from mail.js (no clone #2), per-position `startsWith('name Named: - `roguename`: none in the body — C's NUL-write into the env string has no later reader, s
- D-3202: `js/end.js` savebones restarted in C order keeping name/signature: clear_bypasses head; unleash_all + Punished-gated unpunish + usteed-gated dismount_ Named: - `savebones`: close_nhfile on the probe hit (no VFS handle); compress_bonesfile on all th
- D-3201: `js/do_wear.js` only, no new module edges (There/You_cant/humanoid/FACE/something added to existing imports): helm quest arm in C order (dnum compare, Named: - `accessory_or_armor_on`: none (the `:2397` panic abort has no live panic export; the dia
<!-- landmarks:end -->
