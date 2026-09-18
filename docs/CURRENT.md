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
notable non-PASS; the **Held-out** row from `node scripts/leaderboard.mjs`;
the corpus fortress from `hidden-proxy.mjs score` (PASS→FAIL = Must-fix
row naming the SHA). Do not invent suite totals from one focused session.

Score last measured: **2026-09-18** — full `sessions` on the working tree
(audit **1426–1434**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.30/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-18)** | **11 / 44**, 5,637 / 11,265 pts, RNG **26.6 %**, rngSteps 81.5 %, screens **50.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `60+0.47/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out moved 7 → 11 over 2026-09-06..17 while the local
corpus went 48 % → 91.7 %: the corpus no longer predicts the judge.
**Corpus fortress** (re-scored 2026-09-18 audit 1426–1434): **495 / 540
PASS (91.7 %)** excl. 13 env-only; RNG 99.29 %, screens 99.0 % — identical
to the prior audit, no flips across D-2467…D-2479 (every per-SHA re-run:
0 regressed).
Reviews 1225–1434: 185 ACCEPT, 6 WITH-DEBT, 1 DEBT, 13 QUALITY-RISK (2 Must-fix pending).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named).
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

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

## Primary objective — BREADTH PHASE (opened 2026-09-18, Constitution §10.17)

**Port the game as completely as possible, one whole C function per
iteration.** 2,345 of 4,868 pinned-C functions are MISSING or THIN in
`js/` (`node scripts/port-coverage.mjs`); every held-out session that
reaches one is a cliff. The work picker is **measured coverage**, not the
corpus: pop `LOOP-QUEUE.md` Must-fix, then the first **Open — coverage**
row (emitted by `port-coverage.mjs --rows`, gap measured on the JS tree at
enqueue; the pop-time `brief.mjs` re-check decides stale in ≤ 3 calls).
Deliverable = the **entire C body** in C order — every arm, every callee
live or named in the map, every C caller wired (brief callers table) —
**200–800 lines** of C-faithful JS (supervisor caps 1500 ins / 15 files).
Subsystem restart (delete the thin JS function, re-port from C) beats
patching arms. Also ship, in the same iteration, any Must-fix/Open row in
the **same C file**. Gates unchanged: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **REACH-OK** (corpus sessions that executed
the function still PASS — `verify.mjs --fn`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier for the phase:** held-out on `leaderboard.mjs` after ~30
breadth iterations; if it does not move while coverage does, the human
revisits the picker.
**Next cluster:** `mon.c` sanity_check_single_mon — coverage MISSING (C 179 L `mon.c:73–255` / JS no symbol; hops 3, callers 2, RNG 2, msg 0; dead callees: pet_sanity_check, levltyp_to_name). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn sanity_check_single_mon` (reach regression must be 0). Measured `port-coverage.mjs --name sanity_check_single_mon` 2026-09-18 @ 34ef28ed.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2479 (index).**
<!-- recent:begin -->
**D-2479** `nethack-c/upstream/src/mon.c:72–255` (`sanity_check_single_mon`); static `pet_sanity_chec — both functions added module-local in `js/mon.js` (C home, matching C `staticfn`) in C order — data-pointer range, mnum fixup, HP bounds (gremlin `m_lev` arm kept commented-out like C), dead-monster early return, genocide
**D-2478** `nethack-c/upstream/src/mail.c:399–456` (`newmail`); static `md_start` `:148–239`, `md_sto — `js/mail.js` in C order — file-local C-macro equivalents (`Deaf`/`Blind`/`Blind_telepat`/`distu`, sibling-idiom verbatim; `mail_text` + `md_exclamations` via `rn2(3)`); `md_start` (Blind-nearby arm, stairwell-in-sight sc
**D-2477** `nethack-c/upstream/src/trap.c:2360–2365` (`for (otmp = gi.invent; …)` carried `defends_wh — `js/trap.js` only, no new imports — anti-magic site walks `for (const _am of game.invent || [])` with the same predicate (`oartifact` + `!is_quest_artifact` + `defends_when_carried(AD_MAGM)`, live exports) and break-on-f
**D-2476** `engrave.c:396` (`You("%s: \"%s\"%s",…)`); `rumors.c:573` (`pline1(line)`); `pager.c:1922` — route each through the `%s` arm (verbalize/impossible D-2471 precedent — substituted args are never re-scanned by `vpline_expand`): engrave keeps the C format+args shape `You('%s: "%s"%s', feel/read, et, endpunct)`; rumo
**D-2475** `nethack-c/upstream/src/topten.c:1194–1353` (`prscore`); static `score_wanted` `:1112–1192 — `js/topten.js` only, in C order — new module-local `score_wanted` (version gate; `pers_is_uid` uid arm; `-uname` strip; `-p/-r/-u` + next-arg arms with `i++` consume; `all`/name-prefix/`-<roleletter>`/maxrank; `ch()` hel
**D-2474** `nethack-c/upstream/src/priest.c:795–874` (`ghod_hitsu`); callees `temple_occupied`/`has_s — `js/priest.js` only, in C order — new `export async function ghod_hitsu` (`:191`): roomno-char gate (`temple_occupied`, `'\0'` check) + `has_shrine`; shrpos origin; `svr.rooms` via bones.js `charCodeAt-ROOMOFFSET` idiom;
**D-2473** `nethack-c/upstream/src/artifact.c:2508–2591` (`retouch_object`); supporting `touch_blaste — `js/artifact.js` restart in C order — `retouch_object(obj, loseit)` (`:1451`): Bell-of-Opening invocation-square pass-through (`BELL_OF_OPENING` const via `objectNames.indexOf`, live `invocation_pos`/`On_stairs` from hac
**D-2472** `nethack-c/upstream/src/files.c:673–716` (`open_levelfile`); supporting `fqname` `:354–393 — `js/files.js` only, in C order — new `export function fqname` (`:501`: PREFIX branch live, prefixes from `game.gf?.fqn_prefix` (unset → basenam, as C with empty prefixes), buffnum-clamp + too-long `impossible()` arms in 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2479; wrap `wildmiss` /
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
