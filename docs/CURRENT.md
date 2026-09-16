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
(audit **1374–1385**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.30/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-16
audit 1374–1385): **493 / 540 PASS (91.3 %)** excl. 13 env-only rows
(493/553; D-2408…D-2429 cleared the `obj_resists`, `rloc`,
`one_characteristic` and `mon_adjust_speed` owners and cut `m_move` 3→2); RNG 99.2 %; screens 98.9 %. Top owners:
`distfleeck` ×7, `do_statusline2` ×4, `m_move` ×2, then 1-block singles
(`mktrap`, `collect_coords`, `savelife`, `peffect_polymorph`, `zapyourself`,
`doturn`, `dopush`, `mdrop_obj`, `that_is_a_mimic`; all parked/archived owners).
Reviews 1225–1385: 146 ACCEPT, 3 ACCEPT-WITH-DEBT, 1 DEBT, 6 QUALITY-RISK (all Must-fix shipped, including 1372's utrap-steed verb via D-2408).
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
scenario corpus** (`hidden-proxy status`): 493/540 PASS; the 47 remaining
sessions sit under **parked symptom owners** (distfleeck ×7,
do_statusline2 ×4, m_move ×2, …) worked through
`[measure]`/writer rows, never symptom re-ports. 2026-09-16 process take:
rows carry evidence, stale rows are a 3-call detour, parks requeue their
writer, `[campaign]`/`[measure]` rows replace map filler
(`LOOP-QUEUE.md` header; Constitution §10.15–16).
Pop `LOOP-QUEUE.md` Must-fix (freehand guard, docrt early-path botlx),
then Open in order — campaign botl-parity 2/3, `status_enlightenment`
held-by/utrap arms (3 sessions), the `[measure]` rows, eat `losehp`.
**Next cluster:** `mklev.c` mktrap trap-kind die (Ranger downstream of the shkinit insurance port) — blocks 1/553 (scen-tour-Ranger-92033 step 98 kind=rng: C `rnd(4)=2`@mktrap vs JS `rn2(3)=2`@induced_align(mklev.js:25312); surfaced at HEAD when the shkinit insurance port moved Ranger rloc@70 → mktrap@98; untagged owner in `hidden-proxy queue`, eligible as-is). Fix: port the owning C arm in mktrap trap selection (brief mktrap first; never read seed/step/coords into logic). Verify `node scripts/verify.mjs --fn mktrap` (expect Ranger → PASS or later owner).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2429 (index).**
<!-- recent:begin -->
**D-2429** `nethack-c/upstream/src/mklev.c:2135–2144` victim gate (`lvl <= (unsigned) rnd(4)` at `:21 — `js/mklev.js` only — capture `ttmp` and call `mktrap_seen_victim(ttmp, {})` (exact: not-WEB so spider flag moot, seen/novictim false per the string+coord defaults) in both blocks with a C-order comment; intentionally min
**D-2428** `nethack-c/upstream/src/monmove.c:2365–2371` `can_fog` (fog-cloud `mvitals` not `G_GENOD`  — `js/monmove.js` — `function can_fog` → `export function can_fog` (hoisted declaration, no TDZ risk); `js/mon.js` — `can_fog` added to the existing static `./monmove.js` import (`imports.mjs --can` → ALREADY, no new edge)
**D-2427** `nethack-c/upstream/src/mkmaze.c:1873–1925` `mk_bubble` ends with `mv_bubble(b, 0, 0, TRUE — `js/mklev.js` only — `dx`/`dy` → `let`; inside the existing `!Is_airlevel || !rn2(6)` gate (same RNG shape: water draws nothing new, air keeps its single `rn2(6)`), compute `colli` from `(bx,by)` vs `(gbxmin,gbymin,gbxma
**D-2423** `nethack-c/upstream/src/insight.c` attributes_enlightenment — arms ported in C order on both builders — final `enlightenment()` (past tense via `final`, `you_are`/`enlght_line_txt` directly) and `doattributes()` ^X (in-progress tense via `o()` wrapper; C `!final` arms read `polymor
**D-2422** `nethack-c/upstream/src/mkobj.c` weight() `:1932–1934` — the three divisor arms in C order (cursed first, C ternary short-circuit; `Math.trunc` for the round-up divisions) + a module-level `BAG_OF_HOLDING` const via `objectNames.indexOf` (same shape as `STATUE`); doc header no
**D-2421** `makemon.c:1476–1504` (`!gi.in_mklev`: `newsym`, then `!MM_NOMSG`-gated appear `Norep`, th — `js/makemon.js` only for the arm — `dochugw` added to the existing static `./monmove.js` import (`imports.mjs --can` → ALREADY, hoisted `async function`, no new edge); `makemon_appear_msg` restructured so the appear `Nor
**D-2419** `dungeon.c:1403–1414` (`ledger_to_dnum`: `ledger_start < ledgerno && ledgerno <= ledger_st — `js/teleport.js` only — local condition → `start < want && want <= start + n` with a `|0` coercion (same shape as `js/dungeon.js:718–729`), C-order comment citing `:1408–1411`.
**D-2418** `shknam.c:658–660` (`if (MON_AT(sx, sy)) (void) rloc(m_at(sx, sy), RLOC_NOMSG); /* insuran — `js/shknam.js` — `shkinit` async with the insurance arm `if (blocker) await rloc(blocker, RLOC_NOMSG)` in C order (result ignored like C's `(void)`); `RLOC_NOMSG` added to the `./const.js` import; static `import { rloc }
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2429; wrap `wildmiss` /
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
