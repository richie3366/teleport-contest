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

- D-1790…D-3252 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3252.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3252 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3252: `js/do.js` only, no new module edge — all callees pre-imported (set_move_cmd/u_rooted via cmd.js :184; stucksteed via steed.js :158; near_capacity via Named: - `doup`: none in-body — whole C body live (at_ladder `stway.isladder` fallback pre-existi
- D-3251: `js/uhitm.js` only, no new module edge — AD_STUN guard → file-local `hero_Stunned()` (:1494, the youprop.h:81 equivalent) + `await (await import('./po Named: - `passive`: AD_ACID remainder — M_SEEN markers (:5916/:5918), erode_armor (:5921; live js
- D-3250: `js/minion.js` only — delete the clone; extend the existing do_name.js import (Monnam/mon_nam/x_monnam edge — `imports.mjs --can minion.js do_name.js  Named: - `msummon`: none in-body — whole C body live.
- D-3249: `js/uhitm.js` only, no new module edge (Your :43, set_ustuck :118 pre-imported; missum :2272 + sticks :3647 same-file — no `imports.mjs --can` needed) Named: - `known_hitum`: none in-body — whole C body live.
- D-3248: `js/mhitm.js`: import live `finish_meating` on the pre-existing dogmove edge (`imports.mjs --can`: ALREADY, no new edge — the mhitm↔dogmove cycle pre- Named: - `mdisplacem`: none in-body — whole C body live (direct mx/my swap stands for remove/plac
- D-3247: `js/dig.js`: use_pick_axe2 — swallowed `&&` short-circuit with fall-through + `u.uinwater` Turbulence arm (C youprop.h:279 macro read at site, no new  Named: - `dig`: none in-body — whole C body live (local on_level/assign_level/next2u/m_at/yobjnam
- D-3246: `js/lev_json.js`: new serStashLight (lev_json.js:410) — stash-aware numeric write resolving pointers against the STASH roots (find_oid_in_blob over fr Named: - `write_ls`: none in-body — whole C body live (type gate, NEEDS_FIXUP, OBJECT/MONSTER ver
- D-3245: `js/muse.js` only, no new imports (pline_mon/impossible/Monnam/unbless all live in-file): heal arms → `pline_mon(mtmp, …)` ×3; `await unbless(otmp)`;  Named: - `use_defensive`: `!otmp` guards return 0 where C panics (MissingDefensiveItem ×12 — unre
- D-3244: `js/makemon.js` only — armBonus subtracts `min(max(oeroded,oeroded2), a_ac)` per hack.h ARM_BONUS + obj.h greatest_erosion (:3066–3077; macro expanded Named: - `m_initinv`: none in-body — every arm live; every C callee live (mongets/mksobj/curse/mp
- D-3243: `js/lock.js` only — 7 pre-existing edges extended (cant_reach_floor; COST_BRKLCK/SHOP_DOOR_COST; A_WIS; y_n/ynq; unblock_point; start_corpse_timeout;  Named: - `doforce`: none in-body — door force with edged weapon is a C TODO (unimplemented in C t
- D-3242: one-space fix at `js/mhitm.js:6185` (`` `${mhis(magr)} ${xname(otemp)}` ``, exact C `"%s%s %s"` order); new live export `mon_avoiding_this_attack` (js Named: - `mswings_verb`: none — whole body live (is_wet_towel served inline via the TOWEL-name ch
- D-3241: extended the existing `./mondata.js` import with the live sync `mhis`/`mhe` (C you.h `:322–324`); extended the existing `./display.js` import with liv Named: - `dowaterdemon`: C `:88` `Soundeffect(se_furious_bubbling, 20)` — named, not wired (conte
- D-3240: restarted `js/do.js` flooreffects in C order: exact else-if chain with per-branch `t_at`/levl reads (C assignment-in-condition shape, incl. tail re-fe Named: - `flooreffects`: none in-body.
- D-3239: steed arm inserted in C order (before mhidden) via live `y_monnam` (existing `do_name.js` edge extended); invis predicate is now live `Invis()` (`time Named: - `self_lookat`: pickup.c:1162 engulfer caller arm (see Callers); C `:128` `"nothing?"` Pu
- D-3238: new `unskip_engravings_for_save()` (js/engrave.js, same `:1559–1560` gate — alloc && non-empty actual) prepends engr_off blanks to actual_text and zer Named: - `wipeout_text`: none in-body.
<!-- landmarks:end -->
