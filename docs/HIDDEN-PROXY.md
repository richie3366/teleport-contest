# The hidden-score proxy — how the loop measures what it cannot see

**Status:** adopted 2026-09-04. Companion to `PORT-GAP-HELDOUT.md` (what
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

## 3. The loop's use of it

| when | command | what it replaces |
|---|---|---|
| orient | `node scripts/brief.mjs <cfn>` | 8–15 grep/sed/csym/sym/map calls; the corpus rows for that function come with C vs JS draw and replay |
| verify | `node scripts/verify.mjs --fn <cfn>` (runs `hidden-proxy verify <cfn>`) | hand probes with expectations the agent derived by *reading* C — the expectation is now recorded from C |
| handoff | `node scripts/finish-iteration.mjs --commit` | index row, journal crumb, CURRENT recent block and ranges, NOTES landmark, review stamp, hash backfill, archive, caps, commit message, push — all from the one hand-written D-log entry |
| audit | `node scripts/hidden-proxy.mjs score` | nothing existed; CURRENT now carries the proxy pass rate next to the public score |
| refill | `node scripts/hidden-proxy.mjs queue` → then `PORT-GAP-HELDOUT.md` Tier A/B → then `PORT-GAP-TOP30.md` | map-walk order |

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

## 4. The corpus (2026-09-04, at D-1817)

278 sessions: 240 tail-mutants and fresh-role games (`explore-*`,
`random-*`, `ind-*`), 26 debug-mode `^V` descents (`tour-*`), 12
hand-curated `private-sessions`. Score at HEAD:

| | PASS | RNG matched | screens matched |
|---|---:|---:|---:|
| all 278 | 157 (56.5 %) | 98.28 % | 96.5 % |
| excluding 13 env-only | **157 / 265 (59.2 %)** | | |

Top blocking owners (sessions blocked / RNG calls lost after the diff):

| owner | blocks | RNG lost | C vs JS at the first diff |
|---|--:|--:|---|
| `wintty.c` `process_menu_window` | 21 | 0 | the tty menu window clears only from its own left column, so the left of the status line stays under an item-action menu; the port blanks the row |
| `iactions.c` `itemactions` | 14 | 0 | menu text: "Engrave on the floor with this item" vs "Write…", "stack of fortune cookies" vs "…cookie" |
| `invent.c` `getobj` | 7 | 0 | "You don't have anything else to wear." vs re-prompting |
| `pickup.c` `describe_decor` | 5 | 0 | "There is a pit here." before the object list |
| `sp_lev.c` `build_room` + `selvar.c` `selection_filter_percent` + `nhlib.lua percent` | 4 + 2 + 2 | **53,345 + 19,383** | **the level-content cliff** — C runs the special-level / themed-room script, the port falls back to `rnd_rect`; two of these are Dlvl 1 at step 0 |
| `pickup.c` `doloot_core` | 4 | 805 | "You don't find anything here to loot." vs "You see no door there." |
| `pager.c` `lookat` / `getpos.c` `getpos` | 3 + 2 | 395 | "unexplored area"; `Can't find dungeon feature '/'` |
| `hack.c` `pickup_checks` | 3 | 0 | "The stairs are solidly affixed." |
| `insight.c` `attributes_enlightenment` | 3 | 0 | quest telepathic message names the leader; port prints ":" |
| `mhitu.c` `summonmu` | 2 | 3,558 | were-creature summoning draws |

The ordinary-play rows are what a held-out session hits *between*
levels; the `build_room` / `selection_filter_percent` rows are the
content cliff `PORT-GAP-HELDOUT.md` describes, now with a recorded
expectation per level. Tours pass 3/26.

## 5. Growing the corpus

```bash
node scripts/hidden-proxy.mjs gen --n 240            # more tail-mutants / fresh roles
node scripts/hidden-proxy.mjs gen --mode tour --n 26 # more ^V descents (new seeds)
node scripts/hidden-proxy.mjs record                 # rebuild .cache sessions from recipes
node scripts/hidden-proxy.mjs score --jobs 8
```

Only recipes and `scoreboard.json` are committed; sessions are
rebuilt from the recipes by the deterministic recorder. Cost is
compute, not tokens. Next corpus families worth adding, in order of
held-out value: named-level teleports (`^V` then `?` menu — the idiom
seed0360/seed0367 use to reach quest and branch levels), Sokoban and
Mines entries, and long searches (`20s` × n) so hunger and timeouts
fire.

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
  the public distribution; tours reach depth but not branches or quests
  yet. Both under-sample long games.
- `env:config-path` rows are unmatchable locally by construction and
  are not bugs.
- Attribution by literal is heuristic: when a row's owner looks wrong,
  `hidden-proxy show <id>` prints the alternatives (`cMsgOwners`) and
  the first differing screen row.
