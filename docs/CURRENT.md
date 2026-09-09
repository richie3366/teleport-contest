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

Score last measured: **2026-09-09** — full `sessions` on the working tree
(audit **1156–1163**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`92+0.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `58+0.37/turn` (R² 0.80) |
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
Reviews 990–1073: 75 ACCEPT, 5 ACCEPT-WITH-DEBT (debts map-named), 4 QUALITY-RISK Must-fix all shipped/prepended (full record: reviews/ + DIVERGENCE-INDEX).
Reviews 1074–1082: 7 ACCEPT, 2 ACCEPT-WITH-DEBT (debts map-pointed), 0 Must-fix.
Reviews 1089–1132: 44 ACCEPT, 0 Must-fix.
Reviews 1133–1137: 3 ACCEPT, 2 ACCEPT-WITH-DEBT (debts review-pointed: 1136 Hallucination import source, 1137 save.js restore_waterlevel await), 0 Must-fix.
Reviews 1138–1145: 8 ACCEPT, 0 Must-fix.
Reviews 1146–1151: 6 ACCEPT, 0 Must-fix.
Reviews 1152–1155: 3 ACCEPT, 1 QUALITY-RISK (1152 burnarmor gloves literal — Must-fix prepended).
Reviews 1156–1163: 8 ACCEPT, 0 Must-fix.
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
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** shipped (D-2198 heal_legs); next pop: `float_vs_flight`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2198 (index).**
<!-- recent:begin -->
**D-2198** `do.c:2449–2486` `heal_legs(int how)` (body already live, re-audited arm-for-arm: `Wounded — `js/eat.js` — full royal-jelly fpostfx arm in C order (killer-bee `hero_form_data()?.mndx` + `Unchanging` morph break via live `polymon`; `gainstr(piece,1,true)`; Upolyd `mh` vs hero `uhp` `rnd(20)` + dual `botl`; `rn2(1
**D-2197** `mon.c:975–981` steed gate (`mtmp == u.usteed && (Flying || Levitation) && !waterwall`); ` — steed gate in C position (after inpool/inlava/infountain, before gremlin) with the youprop shape (flat cache or `(H||E)&&!B`, as in do.js); engulfing flush `pline` in C order (after drown pline, before mondied/xkilled) v
**D-2196** `sounds.c:201–339` `dosounds` (swamp `You1(swamp_msg[rn2(2)+hallu])` + return `:234–243`;  — port all seven arms in C order with identical draw sequences (same rn2 calls, same gates).
**D-2195** `trap.c:6711–6773` `thitm` (strike `find_mac+tlev+spe <= rnd(20)`; miss `pline_mon` "almos — harmless arm in C order — `const harmless = !!(obj && stone_missile(obj) && passes_rocks(mon.data))` (same expression shape as live `js/dothrow.js hittmu`), suffix ternary, dam computed before the gate (preserves `dmgval
**D-2194** `trap.c:1106–1187` `m_harmless_trap` (SLP_GAS `resists_sleep \|\| defended(AD_SLEE)` :1133 — canonical `defended` + full `resists_magm` (+ file-local `monsndx` = `(mndx ?? mnum ??
**D-2193** `mhitu.c:263–306` `expels`, reached from `mhitu.c:1578–1584` `gulpmu` (`You("get %s!", … : — port the C tail in order — `um_dist(mtmp.mx, mtmp.my, 1)` → `pline('Brrooaa...
**D-2192** `do_wear.c:434–516` `Helmet_on`, reached as `afternmv` from `hack.c:4177–4208` `unmul` (pl — full Helmet_on switch in C order: plain-helm breaks; CAUTION → live `see_monsters`; BRILLIANCE → inline `adj_abon` helm half (`:3331–3339`: makeknown iff spe, ABON INT/WIS, botl); CORNUTHAUM → ABON CHA ±1, botl, makeknow
**D-2191** (1) `end.c:743–758` `savelife` tail — `js/end.js` `savelife` only — `await curs_on_u()` (live `js/display.js`, same-file edge already imported), then the `uswallow → expels(ustuck, ustuck.data, true)` / `ustuck → You-release vs Monnam-releases-you + unstuck(
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2198; wrap `wildmiss` /
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
