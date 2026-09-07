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

Score last measured: **2026-09-07** — full `sessions` at **D-2002**
(audit **966–972**, `4a48e698`). Fortress **44/44** (D-1996 DEAF fix
restored `seed0002`; no throws). Scr **11,405**/11,405, RNG
**792,838**/792,838, speed `57+0.37/turn`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `57+0.37/turn` (R² 0.81) |
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
Reviews 966–972: 6 ACCEPT, 1 QUALITY-RISK (971 → Must-fix).
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
Pop `LOOP-QUEUE.md` Must-fix (4 `ReferenceError` imports kill 8
sessions) then Open in order; every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** Must-fix — `read.js` create_particular_parse gender-term search: drop the leading-space pad and match C bare `strstri` (`read.c:3186–3195`; `shemale …` misses MALE in JS, hits in C) + align the blanking splice with the C `memset` width. Probe: replica of the parse blanking on `shemale elf-lord` (expect fem=0/MALE). Source: reviews/loop-unattended/971-d9e7079e-gendered-name-flags.md.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2003 (index).**
<!-- recent:begin -->
**D-2003** `read.c:3186–3195` — `js/read.js` — drop the pad (`asciiLow` is now plain ASCII lower), search bare `'female '` / `'male '` female-first, and blank exactly the hit width in place (7 / 5 spaces, length-preserving like `memset`); re-`mungspace
**D-2002** `lock.c:547–550` (pit rim → `You_cant reach over the edge`, DID_NOTHING), `:552–570` (`m_a — `js/lock.js` — pit gate, visible-monster arm (`mon_nam` + credit-card shk/Oracle `SetVoice`/`verbalize`), door-mimic reveal (`stumble_onto_mimic`), !IS_DOOR feel/mapseen + Blind feel/see + drawbridge message, in exact C 
**D-2001** `read.c:3186–3195` (`create_particular_parse` blanks explicit "female "/"male " terms — `js/read.js` — parse: case-insensitive "female "/"male " blanking (female first; ASCII-only lower so byte indices align; leading-pad-only search so a trailing word does not hit, matching C `strstri` needing a literal tra
**D-2000** `steed.c:177–193` `doride` — `js/steed.js` — static `import { y_n } from './getline.js'` (hoisted function, cycle-safe per `imports.mjs --can`; `mhitu.js` precedent) + `let forcemount` set by `(game.flags?.debug || game.flags?.wizard) && (await y_n(
**D-1999** `makemon.c:1391–1396` (`!in_mklev && byyou` → `newsym` + `set_apparxy` BEFORE `m_initweap` — `js/makemon.js` — `set_apparxy(mtmp)` after `newsym` in the `byyou` branch (C `:1393–1394` cite; import already existed, no new edge).
**D-1998** `wizcmds.c:948–1096` `wiz_intrinsic` — `js/wizcmds.js` — per-prop switch in exact C order with `:line` citations: SICK `!rn2(2) ?
**D-1996** `attrib.c:905–1001` `from_what` (DEAF `:931` roleplay-deaf arm); `insight.c:1059–1074` Bli — one-word addition to the existing same-edge `./const.js` import (after `BLINDED`, matching C `BLINDED=15, DEAF=16` order) with a C-citation comment.
**D-1995** `insight.c` enlightenment family — `js/invent.js` status arms (Stoned/Slimed/Strangled/Sick/Vomit/Stun/Conf/Blind-kinds/held-swallowed/Fumbling+Sleepy+Hunger-magic) + resistance `from_what` catalogue (Sleep/See_invisible/telepathic/warned/Fast/Reflecting/Lifesaved/spell-cast/wizard-record/Luck/Nth-death/bones) + corner `^X` menu; `js/attrib.js` dwa/gno infra + innate H-fields; `js/wizcmds.js` SLIMED arm. Verify: enlightenment 6 moved/1 unchanged, one_characteristic 5 PASS/8 moved, status_enlightenment 4 moved, 0 worse; wiz_intrinsic 9 unchanged (rest remains).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2003; wrap `wildmiss` /
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
