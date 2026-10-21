# Re-read pass: every live function once, against C

**Status:** experimental. Human decision 2026-10-21, branch `experimental`,
Constitution §10.22. The iteration prompt is
`scripts/agent-port-loop.reread.prompt.md`; the tools are
`ledger.mjs batch --reread`, `ledger.mjs reread` and `ledger.mjs defer`
(`scripts/lib/reread.mjs`). Measurements below are at `4498679f7`.

## 1. Why sampling stopped working

- **The proxy is saturated.** Every board session passes. The last four
  fresh cohorts (Grow #20–23: 639 sessions, 351,702 screens, median 565
  screens per session) had 9 failing sessions: 0.026 per 1,000 screens.
  Held-out has 9 failing in 11,265 screens: 0.80 per 1,000, so **31×
  denser**. The §10.20 trigger compares pass rates in points (99.4 − 79.5
  = 19.9, "inside the band") and cannot see this. New seeds on worked
  generator families are not a new distribution.
- **The judge agrees.** The 63 port commits pushed between
  10-19 19:15Z and 10-21 07:23Z moved held-out by 0 points over six judge
  runs. The next 15 gave +230, all screens with RNG unchanged (menu
  headings and prompt colours, a botl tail).
- **Grows stopped paying.** At 99.4 % on arrival, a 160-session grow finds
  about one failing owner, so the "< 6 owners" trigger fires again after
  every fix. In one loop session on 10-21, three grows cost 32M of 87M
  tokens and found 5 failing sessions.
- **The code admits its gaps.** js/ carries 309 `named omit` comments.
  About 215 describe behaviour rather than by-design plumbing (file IO,
  platform, `#if 0`, sound), and 163 of those sit inside functions the
  ledger calls `ported`. The ledger's own omit column has 132 rows.
- **Most bugs are in `ported` code.** Of the 265 fixes from 10-14 to 10-21,
  59 have the shape "C does X here, JS lacked it", 45 are local copies,
  flat mirrors or phantom fields, and 23 are sync/async ordering. Only 15
  mention an omit, a deferral or a stub.
- **The breadth phase is not a counter-example.** §10.17 (09-18 to 10-06)
  walked the ledger too, and held-out sat at 16/44 for about 50 iterations.
  It only ported declared gaps (missing or thin functions) and never
  re-read `ported` ones. At the time, a few early cliffs in common code
  (RNG 34.8 %) dominated the judge's losses, and sampling finds those
  fastest. With RNG at 99.5 %, the residual is scattered thinly through
  rare arms, where reading everything beats sampling: a re-read costs the
  same however rare the bugs are.
- **The calendar.** Phase 1 freezes on Nov 29, 2026 at 00:00 UTC. Phase 2
  divides parity by the `js/` diff from the freeze tag, so a fix or
  de-cloning made before the freeze is free and the same change made after
  it is penalized. Qualification is safe (79/88; 10th place has 44).

## 2. The unit

A **slice** is the next ~1,000 C code lines of one C file, in C order,
covering every function that is not by-design/frozen and not yet stamped
`audited`. Kinds:

| kind | meaning | expected outcome |
|---|---|---|
| `reread` | ported / split / parity, not audited | `audited` (whole) or `ported` (fixed) |
| `partial` | declared partial | finish the omit, or `partial` naming only what cannot ship |
| `open` | never ported, measured gap | port whole |
| `declare` | never declared, measured ok | read, then declare |

**Order.** Files go by Σ reach × loudness × size over their functions.
Reach is the share of callheat sessions that execute the C function
(`.cache/callheat/functions.json`, 2026-09-28, 985 sessions), or `0.2 / (1
+ hops)` when it never ran. Loudness counts RNG calls once and message and
map calls twice, because held-out RNG is at 99.5 % and screens at 98.3 %.
The order at the start: trap.c, hack.c, uhitm.c, mon.c, options.c, zap.c,
objnam.c, sp_lev.c, do_wear.c, eat.c, invent.c, cmd.c, … The order is
static, so a file stays on top until its last function is stamped.

**Size.** 4,949 functions with 135,120 C code lines; 524 (10 %) were
already audited. That is about 120 slices. The first slice is trap.c
:88–1822: 26 functions, 1,063 lines.

## 3. Iteration contract (the prompt is authoritative)

1. **Pick.** Must-fix, else the cliffs head (both under the port prompt),
   else a deferral-flag unit when `CURRENT.md` **Next** names one, else
   `ledger.mjs batch --reread --write`.
2. **Read** each manifest function whole, in C order, C beside JS, and
   compare arms and guards, callees, state, output and order (§4 lists
   what the notes flag). Fix what differs C-literally in this iteration.
3. **Verify** with `verify.mjs --fn <changed functions>`. REACH must stay
   PASS; there is no movement check. A changed function no session
   executes is reported `REACH 0: C-literal, unverified`.
4. **Hand off.** Write one D-entry (D-ids from D-6001 on this branch) with
   a `Re-read:` bullet giving each function's verdict, and a `Ledger:`
   bullet naming every manifest function not left open. Then run
   `finish-iteration.mjs --commit`, which stamps every declared manifest
   function `audited D-NNNN`; `Left open:` ones come back in the next
   slice.
5. **No grows.** The fresh cohort and audits run on request.

## 4. Margin notes

The notes say where to look first, never what to conclude.

| note | flags | caveat |
|---|---|---|
| `mark` | comment lines in the JS body or its doc block that admit a gap: named omit, deferred, stub, TODO, simplified, hard-coded | some are by-design; say why |
| `defer` | JS-only deferral flags in the body (§5) | listed in Next, converted in a flag unit |
| `callees` | pinned-C callees of the C body whose name never occurs in the JS body (comments and strings stripped; message wrappers like `You`/`pline_The` ignored) | could be wired elsewhere, renamed or inlined |
| `copies` (slice header) | names the JS file defines locally while other js/ files define them too, with the exporting file | a local `Blind` is a bug by construction |
| `dups` | other js/ files defining this function's own name | make them call this one |
| `float` | statement-level calls to an async-only function with no await/return | its effects can land after C's order |

Hits in the first slice: js/trap.js keeps its own `Blind` (one of 27
definitions; the live one is exported from invent.js). `animate_statue`
calls the async `m_dowear` without `await` (js/trap.js:503).
`trapeffect_rust_trap` carries `// update_inventory deferred` where C
calls it (js/trap.js:3992), and the callee note flags the same call.

**Calibration.** Run back over the fixes since 10-14, the callee note alone
would have pointed at 18 of 114 measurable fixes (detect_obj_traps,
zapyourself, dismount_steed, vision_recalc, goto_level, losehp…). It fires
on 37 % of all functions and misses wrong conditions, fields and order. It
is a lead, never a filter: every function is read.

## 5. Deferral flags

C runs these effects inline; JS postpones them to a later drain, so any
code between the set and the drain runs in an order C never does. Code
occurrences, comments excluded (`node scripts/ledger.mjs defer` lists every
site by enclosing function):

| flag | what C does inline | sites |
|---|---|---|
| `_losehp_needs_done` | hack.c losehp → `done(DIED)`; JS drains it in finish_losehp_done | 60 in 25 files |
| `_losehp_gameover` | losehp's bail marker (gameover set early, dropped before done) | 5 in 2 files |
| `_losehp_needs_rehumanize` | losehp → `rehumanize()` for a polymorphed hero | 3 in hack.js |
| `_needs_maybe_wail` | losehp → `maybe_wail()` | 3 in hack.js |
| `_grpAppearPending` | makemon.c prints each group member's appearance inside makemon | 9 in makemon.js |
| `_pending_botl` | `bot()` at C's point; JS defers it to the next putmesg (D-4173) | 3 in 2 files |
| `isThenable` | mklev.js sync loaders forwarding a promise (D-4195 class) | 120 in mklev.js |

A **flag unit** removes one flag: the work happens at C's point (async,
awaited) and every set/drain pair goes. These are architecture, so they
land before the freeze. They start after the pilot review, when a human
names the first one in `CURRENT.md` **Next**.

## 6. Verification and review

- **Reached code** is verified by REACH (`verify.mjs --fn`): every
  baseline-PASS corpus session executing the function must stay PASS.
- **Unreached code** gets the C-literal port, marked `REACH 0: C-literal,
  unverified`. It cannot regress a measured session, and Phase 2 sessions
  may reach it.
- **Audits** treat a re-read commit as a batch: the review prompt samples
  its fixed functions and two of its `audited` stamps, re-read whole. A
  missed divergence in a stamp is WITH-DEBT, and Must-fix when corpus
  sessions reach it.

## 7. Pilot and falsifier

- **Pilot:** the first 8 slices (trap.c, then hack.c).
- **Measure per slice:** confirmed divergences fixed (the K in each
  title), functions found whole, REACH failures (must be 0), and tokens
  per iteration from the transcript.
- **Baseline:** the grow-driven loop on 10-21 cost about 13M tokens per
  fix in one long session (7M port + ~6M grow share).
- **Continue** if the 8 slices fix at least 8 confirmed divergences with
  no unrepaired REACH failure. Otherwise shrink the pass to the
  omit/deferral lists (`ledger.mjs reread` prints the census) or close it.
- **Judge check (§10.17 style):** if held-out stays flat for ~30 re-read
  iterations, revisit.

## 8. Calendar

| when | what |
|---|---|
| now | pilot (8 slices) |
| after the pilot review | slices, plus a flag unit when Next names one |
| ~Nov 20 | last cross-file change (flag units, de-cloning) |
| Nov 20–28 | fixes only; one full rescore including the archive |
| Nov 29 00:00 UTC | Phase 1 freeze tag |

## 9. Running it

- **Checkout.** Worktree `../teleport-contest-revisited-experimental`
  (branch `experimental`), next to the main checkout:
  - shared by symlink with the main checkout: `.cache/hidden/sessions`
    (13 GB), `.cache/callheat`, `.cache/fuzz`, `nethack-c/recorder`;
  - its own copies: `.cache/ledger.db`, `.cache/batch.json`,
    `.cache/hidden/scores.json`, `.cache/hidden/fnsets.json`;
  - `nethack-c/upstream` is a local clone at the pinned commit;
    `/nethack-c/recorder` is listed in `.git/info/exclude`.
- **Interactive** (how the loop runs now): open a Claude Code session in
  the worktree and say "Do a port iteration". `CLAUDE.md` there points at
  the re-read prompt. Start each iteration with `/clear`: in one long
  session the context sent with each call grew from 88k to 473k tokens
  over nine iterations.
- **Supervisor** (untested in this mode):
  `PROMPT_FILE=scripts/agent-port-loop.reread.prompt.md LOOP_GROWTH_MIN=0
  LOOP_GROW_EVERY=0 ./scripts/agent-port-loop.sh --claude`.
- **Pushing.** `finish-iteration --commit` pushes `origin HEAD`, which
  creates or updates the remote branch `experimental`. The judge scores
  the default branch.
- **Merging back.** The D-id range (D-6001 and up) keeps both logs
  mergeable.

## 10. Commands

    node scripts/ledger.mjs batch --reread --write        # next slice + manifest
    node scripts/ledger.mjs batch --reread hack.c --lines 600   # a named file, a smaller slice
    node scripts/ledger.mjs reread [--top 30]             # progress, next files, census
    node scripts/ledger.mjs defer                         # every deferral-flag site
    node scripts/verify.mjs --fn a,b,c                    # REACH for changed functions
    node scripts/finish-iteration.mjs --commit            # stamps, index, journal, commit, push
