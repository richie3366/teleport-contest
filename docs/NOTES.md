# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **obj_resists writers (D-2407 S2/S3 + D-2413/14/15 K/A/H, MEASURED):** dumps reverted, VALUES/BYTE-IDENTICAL — S2/S3 `steal.c` relobj `flooreffects`; Knight apple-eat, Arch whip-rate, Healer gloves-disintegrate. Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **2026-09-16 process take (measured):** 126/362 non-audit iterations
  2026-09-09..15 were parks; 109/161 parked rows were stale copies of
  shipped work from `data.md`/`debt.md`/TOP30 refills. Falsifier for the
  fix: park share over the next 30 port iterations
  (`git log --format=%s -60 | rg -c '^Park'`) — expect ≤ 3, all diagnostic
  (writer or `[measure]` row added in the same commit).
- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **rloc arrivals (SHIPPED D-2418 `shkinit` + D-2419 `migrate_orc`):** Healer-92042 orc-captain + Ranger-92033 minetn arrivals (detail in those D-logs).
- **m_move cnt-j (D-2409 + D-2424):** goblin C5/J4 → mfndpos ALLOW_M arm; Valkyrie residuals → can_fog door writer (below). Falsified: mtrack, occupants.
- **m_move Valkyrie can_fog door (MEASURED 2026-09-16, D-2424):** temp C fprintf post-`mfndpos` (reverted; 92040 re-record byte-identical) vs neutral worker-cloned JS prefix probe — both movers wild vampire-bat lev7 cham=227, C cnt=6 vs JS cnt=5, extra cell a FREE door ((19,14) D_CLOSED info=0; (47,13) D_LOCKED info=NOTONL), zero occupants either side; C `can_fog` all-true (fogmvflags=16, protshape=0, stuffprev=0) vs JS `/* || can_fog(mon) */` deferred (`js/mon.js:2693`; live `can_fog` at `js/monmove.js:761`). Wire door arm only, not squeeze (`:191`). Falsified: occupants, mtrack, re-ports.
- **distfleeck stream (SHIPPED D-2410):** mail-daemon writer → PASS (detail in D-2410); residuals → D-2420 writer rows.
- **mon_adjust_speed glyph (SHIPPED D-2421):** `makemon` dochugw arm live in `makemon_appear_msg` + `nasty` wired; Barbarian-92079 → PASS. Falsified — do not re-check: glyph, `nasty` break, re-port.
- **enlightenment writers (delivered D-2422/D-2423):** Caveman BoH-divisor; Monk Unchanging arms. Falsified — do not re-check: `one_characteristic` re-port, `inv_weight`.
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED, 6 writer rows):** tags+probe → 5 single-draw shifts (W1 Rogue/Samurai92239 distfleeck; W2 Healer mfndpos; W3 Samurai92161 score_targ; W5 Wizard doopen_indir) + 2 branch divergences (W4 Tourist fox-detach; W6 Caveman overload-gate). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (MEASURED D-2425, 2 writer rows):** W1 Healer-92107 = `mhitm_ad_cold` (void)-discard — JS `mhitm_ad_cold_u` adds destroy return (mdamageu 10+5=15 vs C 10; Δ5 = rnd(4) 3+2); W2 Satiated pair (92092/91125) = eat-progress timing — JS `uhs` satiated a bite early, paints a turn late (newuhs no-botl early return). Monk-92194 Pw = D-2161 gulpmu residual (JS drains a turn late) — no new row. Probes in /tmp (botl-probe, uhs-scan, probe125 copy), kept out of repo.
## Don't re-check (≤15)

- D-1790…D-2424 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2423.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2424.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2423: arms ported in C order on both builders — final `enlightenment()` (past tense via `final`, `you_are`/`enlght_line_txt` directly) and `doattributes()`  Named: `lays_eggs` `:1879` (both builders), were-form on the ^X path (live on final path), Free_a
- D-2422: the three divisor arms in C order (cursed first, C ternary short-circuit; `Math.trunc` for the round-up divisions) + a module-level `BAG_OF_HOLDING` c Named: STATUE corpsenm/msize/minwt arms (C `:1919–1931`) still absent from JS `weight()`; HEAVY_I
- D-2421: `js/makemon.js` only for the arm — `dochugw` added to the existing static `./monmove.js` import (`imports.mjs --can` → ALREADY, hoisted `async functio Named: `set_msg_xy` in the appear block (pre-existing, kept); `unmakemon` geno-substitute kill (p
- D-2419: `js/teleport.js` only — local condition → `start < want && want <= start + n` with a `|0` coercion (same shape as `js/dungeon.js:718–729`), C-order co Named: leash `mtame--`/`m_unleash` + light-source `vision_recalc` inside `migrate_to_level` (pre-
- D-2418: `js/shknam.js` — `shkinit` async with the insurance arm `if (blocker) await rloc(blocker, RLOC_NOMSG)` in C order (result ignored like C's `(void)`);  Named: `assign_level` clones, `good_shopdoor`/`nameshk` locals (pre-existing, untouched); `rloc` 
- D-2417: `js/mon.js` only — `finish_meating` added to the existing static `./dogmove.js` import (`imports.mjs --can` → ALREADY, no new edge); unconditional `fi Named: `finish_meating` mimic-AP reset (pre-existing, kept); `ghod_hitsu` (pre-existing).
- D-2416: `js/read.js` only — `else if (await disintegrate_arm(otmp)) { known = true; }` in C order with the `return sobj` fallthrough (C `return`, not useup);  Named: vibrate `adj_abon` + `make_stunned` body (pre-existing, doc-kept); blessed getobj choice +
- D-2412: `js/insight.js` — exported `num_extinct`/`num_gone` (C `staticfn`, exported for the test pin; out-param→returned array, LOW_PM order); `genocided_prom Named: DUMPLOG-only `putstr(0,0,"No species were genocided or became extinct.")` (DUMPLOG retired
- D-2411: `js/eat.js` only — both sites call canonical sync `losehp` with C arg order and killer strings (`rnd(15)`/`rnd(8)` kept per C, not `1+rn2`); `finish_m Named: tainted-arm `make_sick` stays deferred (pre-existing, map-kept); `showdamage`/`rehumanize`
- D-2410: `js/monmove.js` only — the arm in C order: `(ptr?.mndx ?? -1) === PM_MAIL_DAEMON` (module idiom, cf. the Tengu arm); `!hero_Deaf() && canseemon(mtmp)` Named: none new (local `canseemon` infrared/invis stand-in per D-1548 stays as named there).
- D-2409: `js/mon.js` only — three file-local functions (C `staticfn`, same shape as NODIAG/may_passwall) + the MON_AT arm in C order (`mmflag = flag | mm_aggre Named: none new (the `mfndpos` header comment now cites only `can_fog`-in-squeeze plus the pre-ex
- D-2408: `js/invent.js` only — new exported `utrap_steed_verb(final, anchored)` (`:4975`-area, C `:1094–1096` verbatim: `final ? (anchored ? 'were ' : 'was ')  Named: none new (`self_lookat` steed `y_monnam` arm stays per D-2406; null-steedname → `you_are` 
- D-2407: `js/mkobj.js` — `relobj_on_death` now `async`, dynamic-imports `flooreffects` from `./do.js` (no new static edge into the 90-module SCC; same shape as Named: vault-guard gold arm inside `relobj_on_death` (`grddead` issues isgd inline; a guard dying
- D-2406: `js/invent.js` — new exported `trap_predicament(final, wizxtra)` (`:4975`, C `:232–261` verbatim incl. Named: `self_lookat` steed arm (`y_monnam`, pre-existing deferral kept — own row on a falsifier);
- D-2405: `js/allmain.js` only — the C gate verbatim on the live store (`game.flags`, which `bot()`/`flush_screen` already gate on): `botl|botlx → bot() + curs_ Named: `set_move_cmd` `menu_requested→nopick` arm stays named (same C body, adjacent line, no ses
<!-- landmarks:end -->
