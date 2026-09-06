# The hidden-score proxy — how the loop measures what it cannot see

**Status:** adopted 2026-09-04; scenario cohort + saturation rule 2026-09-06. Companion to `PORT-GAP-HELDOUT.md` (what
content is missing) and `PORT-GAP-TOP30.md` (which functions are thin).
This file is about **evidence**: where a hidden session's divergence
comes from, how to find it locally, and how to prove a port moved it.

## 1. Why

Public score is saturated (44/44, 100 %). Held-out is 6/44 passing at
43 % screens. Every point still available lives on paths no public
session walks, so the loop needs a local measurement of *those* paths,
not more reads of the 44 it already passes. The pinned C recorder is a
deterministic oracle that costs ~0.3 s per session, so the cheapest
evidence is simply **more sessions**: ordinary play the public set never
recorded, and descents to the levels a held-out tour walks into.

## 2. What a row means

`node scripts/hidden-proxy.mjs score` replays every corpus session in JS
(one process each — no state leaks between sessions), applies the frozen
runner's rules, and attributes the **first** divergence:

| kind | how the owner is found | what you get |
|---|---|---|
| RNG first | the recorder tags every C draw `@ fn(file.c:line)`; the worker tags every JS draw `@ jsfn(file.js:line)` (`globalThis.__NH_RNG_TRACE`, stripped before comparison) | **both** functions at the first positional mismatch, e.g. `rn2(100)=3 @ build_room(sp_lev.c:2811)` vs `rn2(1)=0 @ rnd_rect(rect.js:64)` |
| screen first | the C topline (or, when toplines match, the first differing screen row) is matched against every string literal in `src/*.c` + `win/tty/*.c`, most specific literal wins | the C function that printed it, e.g. `describe_decor(pickup.c:401)` for "There is a pit here." |
| env | a temp-dir path on screen (help/version screens) | `env:config-path` — the recording environment, excluded from the queue and the pass-rate denominator |

Each row also carries: step and total steps, C vs JS topline, the C
functions that drew RNG in that step, RNG calls and screens lost after
the divergence (what fixing it would unlock, upper bound), and the
replay command. `hidden-proxy queue` groups rows by owner and prints
LOOP-QUEUE lines with the probe sessions attached.

**A row is a C-vs-JS fact with a machine-recorded expectation.** The
deliverable is the owning C function's port. Reading a seed, a step, a
coordinate or an RNG index to make a corpus session pass is the same
ban as for the public sessions and is a REJECT in review.

An RNG-first row owned by a level-wide scan (`mineralize`,
`bound_digging`, `wallification`, `place_lregion`) names where C
*noticed* a terrain difference, not the writer; positional scoring
re-aligns after a one-cell gap, so the count cannot localize it. Probe
first: `node scripts/geom-probe.mjs <id> [--step N]` records a wizard
`^F` map on the C recorder, replays JS and prints every differing map
cell plus the mineralize-eligible diff (D-1849).

## 3. The loop's use of it

| when | command | what it replaces |
|---|---|---|
| orient | `node scripts/brief.mjs <cfn>` | 8–15 grep/sed/csym/sym/map calls; the corpus rows for that function come with C vs JS draw and replay |
| diagnose | `node scripts/geom-probe.mjs <id> [--step N]` | JS DIAG dumps and coordinate FORCEs that cannot see C `levl[]` (#2262: 54 min, 362 calls, no C measurement) |
| verify | `node scripts/verify.mjs --fn <cfn>` (runs `hidden-proxy verify <cfn>`) | hand probes with expectations the agent derived by *reading* C — the expectation is now recorded from C |
| handoff | `node scripts/finish-iteration.mjs --commit` | index row, journal crumb, CURRENT recent block and ranges, NOTES landmark, review stamp, hash backfill, archive, caps, commit message, push — all from the one hand-written D-log entry |
| audit | `node scripts/hidden-proxy.mjs score` | nothing existed; CURRENT now carries the proxy pass rate next to the public score |
| refill | `node scripts/hidden-proxy.mjs queue` → then `PORT-GAP-TOP30.md` rows the corpus reaches → map omits only at ≥ 90 % corpus PASS | map-walk order |
| grow | `node scripts/scenario-gen.mjs --n 120 --seed N` when every family is ≥ 85 % PASS (audit iters) | a saturated proxy that picked display singletons |

`verify <fn>` semantics: every session blocked on `<fn>` must **PASS** or
**move to a later owner** (step strictly later, or a different owner at
the same step or later). **NO MOVEMENT** means the port did not change
what C does at that point — the arm is still wrong, not "named".
**REGRESSION** (an earlier step, fewer RNG matched, or a session that was
PASS at the baseline) fails the iteration.

The blocked set comes from the **committed** scoreboard (`HEAD`, or
`--base <rev>` — the rows the queue row was built from), unioned with
the working scoreboard, so a second verify in the same iteration re-runs
the same sessions. A vacuous verify (nothing blocked) is reported as
`note`, never PASS: if the row cited N blocks, `--base <sha the row was
queued at>`. Movement by one step under the same owner, or
re-attribution at the same step, is printed as such — read the row diff
before calling it progress. Reviews re-measure with `--base HASH~1`.
(D-1831: a verify rewrote the working rows — 16 PASS — then the code was
edited four more times without those sessions ever being re-run, and 12
of them shipped regressed behind "no corpus session is blocked".)

## 4. The corpus (2026-09-06, scoreboard after the scenario cohort)

553 sessions: 278 of the first generation (240 tail-mutants and fresh-role
games `explore-*` / `random-*` / `ind-*`, 26 debug-mode `^V` descents
`tour-*`, 12 hand-curated `private-sessions`) plus **275 `scen-*`
scenario sessions** (§5). Score at HEAD:

| family | n | PASS | RNG | screens | what it measures |
|---|--:|--:|--:|--:|---|
| `explore-*` / `random-*` / `ind-*` / `tour-*` / private | 278 | 255 (91.7 %) | 99.6 % | 99.7 % | ordinary play near the public distribution — **saturated**, no longer picks work |
| `scen-wish` | 72 | 3 | 84.2 % | 58.4 % | wish for an object, use it by class (zap/quaff/read/wear/wield/apply/eat/throw) |
| `scen-genesis` | 45 | 0 | 82.0 % | 57.0 % | `^G` a monster, then fight / `#chat` / farlook / wait |
| `scen-poly` | 26 | 0 | 67.1 % | 54.4 % | ring of polymorph control + `#polyself` into named forms, `#monster` |
| `scen-intrinsic` | 23 | 1 | 82.8 % | 58.6 % | `#wizintrinsic` timeouts (stoning, sliming, sickness, strangling, …) |
| `scen-death` | 20 | 1 | 77.3 % | 34.8 % | die (monster, intrinsic, self-zap, quit) and answer disclosure |
| `scen-tour` | 29 | 0 | 66.9 % | 57.7 % | `^V ?` teleports **by level name** (oracle, bigrm, castle, quest, Vlad, planes) |
| `scen-kit` / `scen-normal` | 60 | 2 | 91 % | 68 % | normal mode: exercise the role kit, travel, engrave, pray, kick, `#terrain`, … |
| **all** (excl. 13 env-only) | 540 | **262 (48.5 %)** | 95.3 % | 88.3 % | |

The scenario families reproduce the **held-out shape**: the live
leaderboard (2026-09-06) scores this fork **7/44 held-out, RNG 22.8 %,
screens 45.4 %** while the old corpus said 96 %. Top blocking owners
after the cohort landed (sessions blocked / RNG lost):

| owner | blocks | RNG lost | C vs JS at the first diff |
|---|--:|--:|---|
| `allmain.c` `welcome` → `calendar.c getlt` | 51 | 37,659 | new-moon date `20000206`: C prints `Be careful!  New moon tonight.`; JS `getlt()` skips the EDT→EST shift the patch's `mktime` applies |
| 4 `ReferenceError` throws (`is_pit`, `FORCEBUNGLE`, `otense`, `STARVED`) | 8 | 104,018 | the JS process dies at its first step — every screen of the session is lost |
| `botl.c` `do_statusline2` | 11 | 12,236 | `Strngl` / `Slime` / `Stone` conditions missing from row 23 |
| `polyself.c` `break_armor` + `drop_weapon` | 13 | 18,896 | armor-break / weapon-drop messages and RNG on polymorph |
| `attrib.c` `exercise` | 8 | 3,294 | `rn2(19)` exercise gate after dressing / fighting |
| `insight.c` `enlightenment` family | 15 | 22,000 | `^X` attributes page and death disclosure rows |
| `wizcmds.c` `wiz_intrinsic` | 7 | 3,551 | effect message before the `Timeout … set to 30` line |
| `monmove.c` `set_apparxy`, `steed.c` `doride`, `mkobj.c` `next_ident`, `lock.c` `pick_lock`, `read.c` `create_particular_creation`, `uhitm.c` `mhitm_mgc_atk_negated` | 5–6 each | | see `LOOP-QUEUE.md` |
| `mkroom.c` `somex` + `themerms.lua` fills | 4 + 5 | 88,000 | a themed room C fills at Dlvl 1 that the port skips (step 0) |

## 5. Growing the corpus — and keeping it unsaturated

```bash
node scripts/scenario-gen.mjs --n 120 --seed 93000 [--jobs 6] [--family wish|genesis|poly|intrinsic|death|kit|tour|normal]
                                                     # scenario sessions authored on the C recorder (≈0.3 s each)
node scripts/scenario-gen.mjs --probe --family poly --seed 5   # print every screen of one authored session
node scripts/hidden-proxy.mjs gen --n 240            # more tail-mutants / fresh roles (saturated family)
node scripts/hidden-proxy.mjs gen --mode tour --n 26 # more ^V descents (new seeds)
node scripts/hidden-proxy.mjs record                 # rebuild .cache sessions from recipes
node scripts/hidden-proxy.mjs score --jobs 8         # ≈200 s for 553 sessions
```

`scenario-gen.mjs` is a **policy, not a spec**: it plays the recorder key
by key (the same marker protocol as `record-session.mjs`), reads the
screen after each key, and composes acts the way the contest's own
session author did — wish and use, genesis and fight, polyself,
`#wizintrinsic`, level teleports chosen from the `^V ?` menu by name,
role kits in normal mode, deaths with disclosure. C decides what happens;
only the resulting key string is kept, and the session is re-recorded from
that recipe so it is byte-identical to a `hidden-proxy record` rebuild.
Recipes carry `fuzz.mode = "scenario"` and `fuzz.family`. The driver never
reads `js/`.

**Saturation rule (Constitution §10.13).** A corpus family that passes
≥ 90 % has stopped discriminating. When `hidden-proxy status` shows every
family ≥ 85 % PASS, the audit iteration generates a fresh scenario cohort
(`--n 120 --seed <iteration × 100>`), records, scores and commits the
recipes **before** refilling the queue from map omissions. The public 44
were saturated on 2026-09-04 and the mutant corpus on 2026-09-06; each
time, the loop spent its iterations on display singletons that moved
nothing the judge can see. Held-out is measured only by the leaderboard;
the corpus is the local stand-in and must keep failing somewhere.

Only recipes and `scoreboard.json` are committed; sessions are rebuilt
from the recipes by the deterministic recorder. Cost is compute, not
tokens. Next families worth adding: shop / temple / vault interactions
(`^V` to `minetn`, buy/sell/steal), Sokoban pushes, riding, engulfment
and digging, save/restore prefixes on scenario games
(`scripts/save-oracle.mjs`), and long searches so hunger and timeouts fire.

## 6. Why not a state-dump patch or a fntrace build (yet)

Both were considered. The RNG stream is already a near-perfect
divergence detector: any state difference that ever influences a later
draw shows up as an RNG mismatch, and the recorder already names the C
function per draw. A function-entry trace (`-finstrument-functions` on a
separate debug build, one set of entered functions per input boundary)
would give exact reach for non-RNG functions and make `port-coverage`
empirical; it is the next instrument to build if attribution ever comes
back `null` often. A JSON state dump would only matter for divergences
that surface after the session ends, which the score does not see.

## 7. Caveats

- The corpus is a prior, not the held-out set. Tail-mutants sit near
  the public distribution and are saturated; scenario sessions share the
  held-out genre (wizard-mode wishes, genesis, named-level tours, deaths)
  but are ≤ 320 keys long, so they under-sample long games and shops.
- `env:config-path` rows are unmatchable locally by construction and
  are not bugs.
- Attribution by literal is heuristic: when a row's owner looks wrong,
  `hidden-proxy show <id>` prints the alternatives (`cMsgOwners`) and
  the first differing screen row.
