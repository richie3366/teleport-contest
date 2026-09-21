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

- D-1790…D-2737 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2737.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2737.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2737: `js/mklev.js` only, after `lspo_room` (same-file locals throughout — no new cross-module edge): file-local `sel_set_lit` (C staticfn shape, numeric li Named: `mapfrag_free`/dupstr/`free` (GC no-ops — `lspo_map_themeroom` precedent); `lcheck_param_t
- D-2736: `js/mklev.js` only (same-file locals — no new cross-module edge; `maketrap` already imported from `./trap.js`): `LSPO_TRAPTYPES` table (C `:4322–4347` Named: Lua-stack callback (lspo_trap takes no function arg — contentsFn pattern N/A); Lua argc di
- D-2735: `js/mhitm.js` — completed + exported `golemeffects_mm` in full C order (slow block before heal block, per-arm `:line` cites); slow calls live `mon_adj Named: `explode.c:525` (map-named no-port); hero-side `ugolemeffects` slow (`polyself.c:2160–2187
- D-2734: `js/mkobj.js` only — module-local `place_object_no_longer_held` replicating do.c:893–920 in C order (`Has_contents` joins the existing const.js import Named: async completion of the COST_DEGRD billing tail (message + bill float, only when obj is un
- D-2733: restarted `learn_unseen_invent` in C order as `export async function` (async: live `addinv_core2` awaits pline on its decipher arm): role gates via th Named: `maybereleaseobuf` (C obuf release — GC no-op, no JS counterpart by design); luckstone `se
- D-2732: `js/mkobj.js` only — restarted `place_object` in C order with per-arm cites: isok gate (OOB throws — no live JS panic export, mklev.js:19190 precedent Named: `:2330` obj_no_longer_held (async in JS — costly_alteration await chain, do.js:690; awaiti
- D-2731: `js/questpgr.js` only — restarted `com_pager_core` in C order with per-arm cites: entry-miss → silent FALSE; rawtext arm before the array arm (`rawOut Named: impossible() text on all miss arms (tables are embedded constants so load cannot fail, and
- D-2730: `js/mhitm.js` — restarted `mhitm_ad_fire` as an exported three-arm port in C order with C cites inline: uhitm arm via live `mhitm_mgc_atk_negated` (sa Named: `golemeffects` (C `mon.c:5680–5707`, clone `golemeffects_mm` `js/mhitm.js:2145` — iron FIR
- D-2729: `js/rumors.js` — gate block added before `getrumor` in C order with C cites inline: faint arm via live `is_fainted` (new `./eat.js` edge — `imports.mj Named: none new — whole C body live; every callee live or named above.
- D-2728: `js/dogmove.js` only — missing arms added in C order with C cites inline, function stays async (all five call sites already await): `:257–261` via liv Named: none new — whole C body live; every callee live or named above.
- D-2727: `js/shknam.js` only — whole body restarted in C order with C cites inline, stays sync (30+ sync call sites, no signature change): `:859–863` via live  Named: `:866` impossible message (async in JS; unreachable for valid input; C fallthrough stands)
- D-2726: `js/mklev.js` — arms added in C order with C cites inline, function stays sync (all four callers sync): recharged/tknown two-liners; CONTENT branch wi Named: bury-inline uball arm (dig.c:1991–1995 `unpunish`/`set_utrap`/pline) — fresh otmp is never
- D-2725: `js/allmain.js` — whole body restarted in C order with C cites inline: currentgend via live `Upolyd(u)` (`js/const.js:3184`) + `u.mfemale`; `:860` via Named: none new — whole C body live; every callee live (`l_nhcore_call` `js/do.js:1164`; `ugenoci
- D-2724: `js/end.js` — whole body restarted in C order as `export async function` with C cites inline: `:854` via dynamically-imported `inven_inuse(true)` (imp Named: `save.c:1111` freedynamicdata (no JS counterpart — save-freeing teardown, never in JS per 
- D-2723: `js/dokick.js` only — whole body re-ported in C order with C cited inline: boots-99 (`u.uarmf` vs local `KICKING_BOOTS` const); swallow switch with `d Named: none new — whole C body live; every callee live (`digests` `js/mhitu.js:1117`; `hliquid` `
<!-- landmarks:end -->
