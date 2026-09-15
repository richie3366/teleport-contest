# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-09-16** — full `sessions` on the working tree
(audit **1363–1367** + D-2402 polymon port).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `47+0.29/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-16
audit 1363–1367 + D-2402): **483 / 540 PASS (89.4 %)** excl. 13 env-only rows
(483/553; D-2402 moved 4 poly sessions to PASS and Tourist-92095/Valkyrie-92195 to later owners); RNG 98.9 %; screens 98.7 %. Top owners:
`distfleeck` ×7, `obj_resists` ×5, `do_statusline2` ×4,
`m_move` ×3, `one_characteristic` ×3, `rloc` ×2, then 1-block singles
(incl. new `savelife` ×1 Tourist-92095 step 49 and `peffect_polymorph` ×1 Valkyrie-92195 step 312, both moved past by D-2402; all parked/archived owners).
Reviews 1225–1367: 129 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 5 QUALITY-RISK (D-2380/D-2393/D-2395 Must-fix shipped; 2 Must-fix outstanding from 1365/1366: freehand guard + docrt early-path botlx).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx (both map notes).
Refresh on audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s);
families ≥ 85 % → grow first via `scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none — 44/44.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 483/540 PASS; the 57 remaining
sessions sit under **parked symptom owners** (distfleeck ×7,
obj_resists ×5, do_statusline2 ×4, m_move ×3, …) worked through
`[measure]`/writer rows, never symptom re-ports. 2026-09-16 process take:
rows carry evidence, stale rows are a 3-call detour, parks requeue their
writer, `[campaign]`/`[measure]` rows replace map filler
(`LOOP-QUEUE.md` header; Constitution §10.15–16).
Pop `LOOP-QUEUE.md` Must-fix (freehand guard, docrt early-path botlx),
then Open in order — campaign botl-parity 2/3 gate, distfleeck
`[measure]`, eat `losehp` arm. Refilled 2026-09-16 to 3 eligible rows
(0 as-is owners; parks name measurements not writers; singletons gated
< 90 %; no D-0006/dog_invent) — short of the 8–12 band by rule, not by
omission.
**Next cluster:** Must-fix `mthrowu.c` freehand guard (review 1365), then docrt early-path `botlx` (review 1366) — then Open head campaign botl-parity 2/3. Open head `polyself.c` polymon DELIVERED by D-2402 (Tourist-92095 step 46 → `savelife` at 49; 4 poly PASS; seed0108 303/303 holds). Popped 7 head rows: mkbox_cnts/skinback/rnd_misc_item/map_location/load_special/single_level_branch STALE, save_regions DIAGNOSED-unportable (map clauses corrected). Shipped: `mhitu.c` hitmu `[measure]` STALE (scen-genesis-Priest-91110 now PASS 151/151), `vision.c` vision_recalc STALE (TOP30 unverified, body live, 0 blocked), `end.c` disclose parked SYMPTOM (step-100 display-stream-only diff, 2nd drinkfountain-class witness; no new writer row — falsifier already live under drinkfountain). Prior: `eat.c` 3/3 parked Stale (masked, NO MOVEMENT) and `can_carry` `[measure]` delivered 2026-09-16 (no spin at HEAD, import live at js/dogmove.js:17).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2402 (index).**
<!-- recent:begin -->
**D-2402** `nethack-c/upstream/src/polyself.c` `polymon` find_ac `:890` + `:967` (D-0722 deferral retired, C order — `js/polyself.js` only — `find_ac()` after `drop_weapon(1)`, second after `see_monsters` before `encumber_msg()`; Tourist-92095 step-46 `AC:6` now paints post-strip; 4 poly PASS + 2 moved past, 0 worse; seed0108 303/303 holds; full 44/44)
**D-2401** `nethack-c/upstream/src/dogmove.c` `droppables` `:27–136` (dummy sentinel GOLD_PIECE/oarti — `js/dogmove.js` only — full C-order port with C FALLTHROUGH structure, `|0` oartifact integer idiom, `MON_WEP(mon)` canonical wep, `which_armor(mon, W_ARMS)` mattock gate, `is_pick`/`tunnels`/`needspick`/`nohands`/`verys
**D-2400** `display.c` docrt post_map `:1766–1769` (`!maponly`: `update_inventory(); disp.botlx = TRU — `js/display.js` only — docrt sets `game.flags.botlx = true` after `see_monsters()` (post vision path, mirroring post_map; early uswallow/water/buried returns skip it as in C); omission narrowed to params + `update_invent
**D-2399** `nethack-c/upstream/src/mthrowu.c` `u_catch_thrown_obj :532–550` (gate `:536–543`: `!Blind — `js/mthrowu.js` only — `u_catch_thrown_obj` now `async`, tests `!nohands(game.youmonst?.data)` (null-safe; identical for unpoly'd heroes), and on success computes `simpleonames(otmp)` once (pre-addinv, as C's `buf`/`drop
**D-2398** `nethack-c/upstream/src/dothrow.c` `throwit :1806–1809` (`flooreffects(obj, bhitpos, "fall — `js/dothrow.js` only — deleted the dead `throw_gold` block; added the same dynamic-import + `await` in `throwit` between the `flooreffects` block and the snuff arm (exact C `:1808` position; pick-snatch stays named omit)
**D-2397** `nethack-c/upstream/src/do_wear.c` Gloves_off `:646–702` (`gloves = uarmg` capture `:647`, — `js/do_wear.js` — `Gloves_off` now async in C order: capture `gloves` + `on_purpose` pre-clear, `takeoff.mask &= ~W_ARMG`, `clear_worn(W_ARMG)`, then the CORPSE-gated pair on the captured gloves (KMH comment preserved); 
**D-2396** `nethack-c/upstream/src/potion.c` make_sick `:140–188` (onset message gate `:158`, `set_it — `js/potion.js` only — the make_sick onset, partial-cure and full-cure arms plus make_slimed/make_stoned now mirror TIMEOUT bits to `u.uprops[…].intrinsic` (slot created when missing; full cure clears intrinsic per C `Sic
**D-2395** `nethack-c/upstream/src/do_wear.c` `wielding_corpse :606–643` (null/non-CORPSE/gloved retu — `js/do_wear.js` only — new exported `wielding_corpse(obj, how, voluntary)` in exact C order (CORPSE/uarmg/wield gates; `touch_petrifies(mons(corpsenm))` + flat/H/E Stone check; `pline You … in your bare …` blue-arm idiom
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2402; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

The full index is `LOOP-QUEUE.md` **Parked** (one line each; proofs in
`docs/archive/LOOP-QUEUE-PARKED.md`). Two never re-pop without C state:

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-TOP30.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
