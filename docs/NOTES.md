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

- D-1790…D-2728 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2728.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2728.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2728: `js/dogmove.js` only — missing arms added in C order with C cites inline, function stays async (all five call sites already await): `:257–261` via liv Named: none new — whole C body live; every callee live or named above.
- D-2727: `js/shknam.js` only — whole body restarted in C order with C cites inline, stays sync (30+ sync call sites, no signature change): `:859–863` via live  Named: `:866` impossible message (async in JS; unreachable for valid input; C fallthrough stands)
- D-2726: `js/mklev.js` — arms added in C order with C cites inline, function stays sync (all four callers sync): recharged/tknown two-liners; CONTENT branch wi Named: bury-inline uball arm (dig.c:1991–1995 `unpunish`/`set_utrap`/pline) — fresh otmp is never
- D-2725: `js/allmain.js` — whole body restarted in C order with C cites inline: currentgend via live `Upolyd(u)` (`js/const.js:3184`) + `u.mfemale`; `:860` via Named: none new — whole C body live; every callee live (`l_nhcore_call` `js/do.js:1164`; `ugenoci
- D-2724: `js/end.js` — whole body restarted in C order as `export async function` with C cites inline: `:854` via dynamically-imported `inven_inuse(true)` (imp Named: `save.c:1111` freedynamicdata (no JS counterpart — save-freeing teardown, never in JS per 
- D-2723: `js/dokick.js` only — whole body re-ported in C order with C cited inline: boots-99 (`u.uarmf` vs local `KICKING_BOOTS` const); swallow switch with `d Named: none new — whole C body live; every callee live (`digests` `js/mhitu.js:1117`; `hliquid` `
- D-2722: `js/dog.js` only — port the head in C order ahead of the live `:366` block (vote/reset/veto/keep-looping/mydogs-break/`make_happy_shoppers(true)`; `ES Named: none new — whole C body now live; every callee live (`make_happy_shoppers` `js/shk.js:1853
- D-2721: `js/do_wear.js` only — C-order restart of the whole body: `hits` drawn before the gather/early-return (C `:3282` cited inline), dead null guard droppe Named: none — whole 38-line body ported; every callee live (rn2 `js/rng.js:89`; erosion_matters/i
- D-2720: `js/hack.js` only — C-order gate (`if (!(await maybe_finished_meal(true)))` around the «stop» pline), then occupation=null, flags.botl + disp.botl (ho Named: `do_statusline1/2` re-port (row forbids; painter untouched); none new.
- D-2719: `js/makemon.js` only — C-order restart (`let hp = rnd(8)`, `else-if` arm chain, C comments `:993–1004` cited inline); stale «Named omit» doc replaced  Named: none — whole body ported; every callee live (`rnd`/`rn2` `js/rng.js:97/:89`, `is_golem` `j
- D-2718: `js/mhitu.js` only — discard the return (`await destroy_items(you, AD_COLD, orig_dmg)`, C `:2661` cited inline); doc comment now cites the mhitu arm r Named: `monstseesu`/`monstunseesu(M_SEEN_COLD)` (deferred, same as elec_u — row keeps); `mhitm.js
- D-2717: `js/uhitm.js` only, in C order — Upolyd + live `noattacks` (`js/hack.js:1211`, C-identical incl. Named: `u.twoweap && !can_twoweapon() → untwoweapon()` (pre-existing named deferral, kept); `inv_
- D-2716: `js/mklev.js` only — LEVEL_TELEP arm → `lvl < 5 || noteleport || single_level_branch(game.u?.uz)` in C short-circuit order (C `:1961–1965`); FIRE_TRAP Named: none — whole body ported; every callee live (`level_difficulty` `js/hacklib.js:96`, `rnd`/
- D-2715: restarted `autokey` from C — akey/apick/acard split for other-role quest artifacts, `is_magic_key(game.youmonst, o)` displacement, `!opening` drops ca Named: none — whole body ported; `any_quest_artifact` inlined as the macro comparison (no JS expo
- D-2714: `js/invent.js` only — `ECMD_TIME` joins the existing `./const.js` import (`imports.mjs --can` ALREADY, no new edge); can't-reach arm → `return ECMD_OK Named: `look_here` `u.uswallow` arm incl. its `:4160` Blind-gated return (pre-existing «engulfer 
<!-- landmarks:end -->
