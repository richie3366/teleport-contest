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

Score last measured: **2026-09-07** — full `sessions` at **D-2039**
(audit **1004–1009**, `55de4d0e`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`69+0.54/turn` (R² 0.84).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `69+0.54/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 990–997: 7 ACCEPT, 1 ACCEPT-WITH-DEBT (991 readobjnam grey-spell/armour fixups → map-name debt, no Must-fix).
Reviews 998–1003: 5 ACCEPT, 1 ACCEPT-WITH-DEBT (998 use_container lknown pre-branch `:2985–2989` state debt, no Must-fix; 1000 notes D-2030 "nothing imports wizard.js" slip, harmless).
Reviews 1004–1009: 5 ACCEPT, 1 QUALITY-RISK (1006 → 3 Must-fix).
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none — fortress 44/44.
Fortress report `docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (3 rows — review 1006) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `wield.c` doquiver_core — blocks 3/553 corpus sessions (first at step 18): C «Your alternate weapon is 6 orcish daggers. Ready 5 of them? » vs JS «Your alternate weapon is 6 orcish dagger. Ready 5 of them? [». Probe: `node scripts/hidden-proxy.mjs verify doquiver_core` (scen-normal-Rogue-92115, scen-normal-Valkyrie-92200, scen-tour-Rogue-92030).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2044 (index).**
<!-- recent:begin -->
**D-2044** (a) `objnam.c:2428–2442 simpleonames` — `js/objnam.js` — `simpleonames` pluralizes via `makeplural(base)` when `((obj.quan ?? 1) | 0) !== 1` (missing quan reads as 1 — C always sets quan; same guard as the pre-existing iactions clone).
**D-2043** `mhitm_ad_slow :3652–3689` (gate FALSE always `:3658`, `defended(mdef, AD_SLOW)` early ret — `js/mhitu.js` — `mhitm_ad_slow_u` in exact C mhitu-branch order (gate first, then hitmsg, then HFast+`rn2(4)` → awaited `u_slow_down`; leftover `d()` kept like FAMN) + `case AD_SLOW` + file-local `AD_SLOW = 13` (`monattk
**D-2042** `nethack-c/upstream/src/dokick.c:68` `check_caitiff(mon);` inside `kickdmg :33–123`, synch — `js/dokick.js` — `await check_caitiff(mon);` with a C citation comment (`dokick.c:68`, sync in C / async in JS for the awaited pline, must await to keep topline order).
**D-2041** `nethack-c/upstream/src/uhitm.c:896` `if (hmd->material == SILVER && mon_hates_silver(mon) — `js/uhitm.js` — `mon_hates_silver` extends the pre-existing `./monsters.js` import (no new module edge per `imports.mjs --can`: already statically imported; sync callee, same 82-module SCC, no top-level TDZ read) and the
**D-2040** `nethack-c/upstream/src/uhitm.c` `hmon_hitmon_weapon_ranged :884–917`: shade-glare/`rnd(2) — `js/uhitm.js` ranged branch — C-order boomerang tail after silver: `!thrown && obj===game.u?.uwep && obj.otyp===BOOMERANG && rnl(4)===3` (short-circuit order preserved; `!thrown` = HMON_MELEE per the existing dispatch at
**D-2039** `dungeon.c` `prev_level :1518–1545`: `if (at_stairs && stway && stway->tolev.dnum != u.uz. — `js/do.js` `prev_level` — C-order branch arm: Dlvl1 (`!(uz.dnum) && uz.dlevel===1`) without the Amulet → dynamic `import('./end.js')` + `await done(ESCAPED)` + return (same noreturn-stop pattern as `goto_level`'s ledger≤
**D-2038** `display.c` `seenv_matrix :3358–3362` (center `[1][1]` is SVALL — `js/vision.js` — center constant `0`→SVALL + comment citing `display.c:3358–3362`.
**D-2037** `detect.c` `find_trap :1936–1962` (`tseen`, `exercise(A_WIS)`, `feel_newsym`, then `if (Ha — `js/detect.js` — `find_trap` now in C order: `feel_newsym`; `Hallucination() || glyph_at(tx,ty) !== trap_to_glyph(trap)` (tty-cell→id normalization per the `foundone` precedent) → `await cls(); map_trap(trap, 1); display
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2044; wrap `wildmiss` /
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

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
