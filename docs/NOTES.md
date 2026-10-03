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

- D-1790…D-3393 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3393.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3393 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3393: (a) new `export function fn_cmap_to_glyph` beside `cmap_to_glyph`, whole C body; (b) `newsym` gains `if (suppress_map_output()) return;` first (in-fil Named: - `fn_cmap_to_glyph`: none — whole C body live (0 C callees besides `cmap_to_glyph`).
- D-3392: (a) none — falsified with git evidence (a redundant call-site guard drafted mid-iteration was reverted; it would be constant-true). (b) `repopulate_pe Named: - `repopulate_perminvent`: none — DUMPLOG in_dumplog (`:3089–3093`) is compiled out (D-177
- D-3391: deleted the dead JS — `recover_savefile` doc+body, `sfo_int` doc+body, `sfvalue_int` doc+body (git retains the text); ledger → by-design. Named: - `recover_savefile`: none — by-design: the whole function is absent from the scored binar
- D-3390: whole C body in C order at C-home js/bones.js:553 — `if (mtmp.mextra && EBONES(mtmp)) mtmp.mextra.ebones = 0`. Named: - `free_ebones`: none — whole C body live (0 C callees).
- D-3389: whole C bodies in C order at C-home js/files.js. Named: - `compress_bonesfile`: none in-body — converter/compressor sinks stay by-design inside th
- D-3388: `losehp` stays sync (async would cascade to 124 sites): both C sites capture `{dmg, post-decrement hp}` into `_losehp_showdamage` (option-gated like t Named: - `losehp`: multi-call-before-drain coalescing (one rehumanize run; same class as existing
- D-3387: whole C bodies in C order at C-home js/files.js, mirroring the live levelfile/savefile VFS-analogue pairs: `{ s }` holders for `char **`/`char errbuf[ Named: - `rewind_nhfile`: stdio rewind(fpdef) (Rule #2); lseek structural no-op (fd token positio
- D-3386: both arms ported into getobj_dip as mirrors of the live sibling. Named: - `getobj` (cmdq): CMDQ_INT count prefix (C :1798–1811) — shared-helper gap, pre-existing 
- D-3385: ported all three poisoned arms in C order against live-export callees (shieldeff + pline_The join the existing display.js edge; strncmpi the hacklib.j Named: - `poisoned`: none — whole C body live.
- D-3384: made after_shk_move `export async`, added the gameover-guarded `await check_special_room(false)` in C order after the reset (gameover via `game.progra Named: - `after_shk_move`: none — whole C body live; all 3 C callers wired.
- D-3383: ported the three stops into the inline fly in C order after the monster stop. Named: - `throwit`: none in this arm — all three stops live. (Pre-existing inline-fly gaps vs bhi
- D-3382: C-order arms at both homes. throwit splash block gains Soundeffect(se_splash, 50) before the pline (dynamic sndprocs + generated/seffects_data imports Named: - `throwit`: none remaining — all four ledger omits now live.
- D-3381: whole C bodies in C order at C-home js/files.js. Named: - `close_nhfile`: nhclose/fclose/fplog-fprintf sinks (Rule #2; resets live).
- D-3380: new `dip_hands_ok(obj)` in C order (Glib()/can_reach_floor already live in-file/imported; GETOBJ_SUGGEST on the const edge); getobj_dip selects `at_he Named: - `dip_hands_ok`: none in-body — whole C body live. (Pre-existing getobj_dip gap, out of r
- D-3379: restart as 4-arg canonical `await losestr(strloss, knam, k_format)` then `losehp(dmg, knam, k_format)` in C order; the losehp call is skipped once gam Named: - `poison_strdmg`: none remaining — ledger omits (knam/k_format killer params, Upolyd mh c
<!-- landmarks:end -->
