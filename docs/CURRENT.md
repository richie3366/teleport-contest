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

Score last measured: **2026-09-15** — full `sessions` on the working tree
(audit **1359–1362**, HEAD `a00fc90c`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.30/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-15
audit 1307–1313): **479 / 540 PASS (88.7 %)** excl. 13 env-only rows
(479/553, +Valkyrie-92229 via D-2396); RNG 98.9 %; screens 98.5 %. Top owners:
`do_statusline2` ×10, `obj_resists` ×6, `distfleeck` ×5,
`m_move` ×3, `one_characteristic` ×3, `rloc` ×2, then 1-block singles
(all parked symptom/misattributed owners; `save_dungeon` ×8 cleared by D-2341, knockback cleared by D-2347).
Reviews 1225–1362: 126 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 3 QUALITY-RISK (D-2380 Must-fix shipped; 2 Must-fix outstanding from 1359/1361, both call-site wirings).
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
scenario corpus** (`hidden-proxy status`): 463/540 PASS.
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order.
Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** Must-fix `dothrow.c` throwit landing misses `obj_no_longer_held` (review 1359; Gloves_off Must-fix retired by D-2397). Probe: `node scripts/brief.mjs throwit`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2397 (index).**
<!-- recent:begin -->
**D-2397** `nethack-c/upstream/src/do_wear.c` Gloves_off `:646–702` (`gloves = uarmg` capture `:647`, — `js/do_wear.js` — `Gloves_off` now async in C order: capture `gloves` + `on_purpose` pre-clear, `takeoff.mask &= ~W_ARMG`, `clear_worn(W_ARMG)`, then the CORPSE-gated pair on the captured gloves (KMH comment preserved); 
**D-2396** `nethack-c/upstream/src/potion.c` make_sick `:140–188` (onset message gate `:158`, `set_it — `js/potion.js` only — the make_sick onset, partial-cure and full-cure arms plus make_slimed/make_stoned now mirror TIMEOUT bits to `u.uprops[…].intrinsic` (slot created when missing; full cure clears intrinsic per C `Sic
**D-2395** `nethack-c/upstream/src/do_wear.c` `wielding_corpse :606–643` (null/non-CORPSE/gloved retu — `js/do_wear.js` only — new exported `wielding_corpse(obj, how, voluntary)` in exact C order (CORPSE/uarmg/wield gates; `touch_petrifies(mons(corpsenm))` + flat/H/E Stone check; `pline You … in your bare …` blue-arm idiom
**D-2394** `nethack-c/upstream/src/topten.c` `outentry :946–1107` — `js/topten.js` only — the four arms in exact C order with `slice(0,6/8/7/13)` prefix checks (≡ the `strncmp` lens) and `t1.plgend?.[0]==='F'`, then the astral switch in C order with C's two fmt strings (`replace('%s',arg
**D-2393** `nethack-c/upstream/src/do.c` `obj_no_longer_held :893–920` — `js/do.js` — canonical exported `async obj_no_longer_held` in exact C order (null return; `Has_contents` recursion; `(otyp|0)===CRYSKNIFE` + `!oerodeproof || !rn2(10)` short-circuit so normal draws zero RNG and fixed dra
**D-2392** `nethack-c/upstream/src/uhitm.c` `mhitm_ad_slow :3652–3687` — `js/mhitm.js` — exported `mhitm_ad_slow` in exact C mhitm-branch order (gate first, `|0` mspeed/MSLOW guard, oldspeed snapshot, `await mon_adjust_speed(mdef,-1,null)`, WAITFORU clear, `_mm_vis && canspotmon` + `pline_mon
**D-2391** `nethack-c/upstream/src/weapon.c` `autoreturn_weapon` `:519–529` over `arwep[]` `:513–517` — `js/weapon.js` — canonical exported `autoreturn_weapon` (C order: null guard, `otyp('AKLYS')` compare, `{ otyp, range: AKLYS_LIM², tethered: 1 }`; `BOLT_LIM`/`AKLYS_LIM` join the const.js import; `otyp`/`objectNames` alr
**D-2390** `nethack-c/upstream/src/vault.c` `wallify_vault` `:646–731` (boundary-ring scan with inter — `js/vault.js` — full async `wallify_vault` in C order/branch structure (boundary-ring loops with interior `continue`; `IS_WALL || g_at || sobj_at(ROCK) || sobj_at(BOULDER)` gate short-circuit + `!in_fcorridor`; `m_at` oc
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2397; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

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
