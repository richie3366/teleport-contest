# Constitution — agentic NetHack JS port

Non-negotiable rules for this fork. Agents and humans obey these.
If a “clever” fix violates them, the fix is wrong — delete it.

Category: **agentic**. No shipping a transpiled C engine.

---

## 1. Ground truth

1. **Target C wins.** Behavior comes from pinned `nethack-c/upstream`
   **plus the complete contest patch set** (seed, datetime, stable sort, RNG
   logging/provenance, capture behavior, and any other observable delta).
   Do not rank unpatched C above a deliberate patch or “improve” NetHack.
2. **Sessions are acceptance tests**, not specifications to memorize.
   Never hardcode public traces, screens, or RNG sequences into `js/`
   except while deleting existing `fastforward.js` chunks.
   **Narrow exception (human 2026-07-21):** the contest recorder’s
   absolute `get_configfile()` path string shown by `option_help`
   (`?g`) — currently
   `/Users/davidbau/git/mazesofmenace/teleport/maud/test/comparison/c-harness/results/.nethackrc`
   — may be the default `configfile` in `js/options.js`. The judge does
   not elide it (`verify-rerecord` does; D-0933), Rule #2 forbids reading
   `$HOME`/`fs`, and no session API field supplies the path. Do **not**
   generalize this carve-out to other recorded coordinates, screens, or
   seed-named branches.
3. **Held-out generalization matters.** Prefer real ports over
   seed-specific scaffolding.
4. A session trace is an **observation**, not a missing C specification.
   When docs, comments, or hypotheses disagree with pinned C + observable
   contest patches, C wins.
5. **Contest Rule #2 — plain JS, dual runtime (HARD BAN).** Scored `js/`
   must be plain ES6 modules, runnable **as-is** in **both** Node 22+ and
   modern Chrome: no build step, no WASM, no network, **no filesystem**,
   no threads, no native addons. Persistent state goes only through frozen
   `js/storage.js` VFS; everything else stays in-process. Never
   `import` Node builtins (`fs`, `path`, `url`, `os`, `node:*`, …) or call
   `readFileSync` / `existsSync` from scored code. Dat/help texts and similar
   assets belong in `js/generated/` (checked-in extractors), not runtime disk
   reads. Offline PASS does not excuse Chrome/Session-Viewer breakage.
6. **Save-prefixed private recordings are observations, not specs.** A tagged
   restore / other-floor omit may be scored against a private C-recorded
   prefix ending `Sy` plus restore-segment mutants (`scripts/save-oracle.mjs`).
   Never copy C NHFILE `save/` into JS VFS JSON or the reverse. Fork only from
   a prefix JS already PASSes. Never add these recipes to `sessions/manifest.json`.
   The session is evidence of a bug; the fix still cites pinned C.

---

## 2. Game loop and async

1. **One async boundary: input.** `await` belongs at `nhgetch` (and
   at optional `animationFrame`). Game physics, RNG, and most display
   updates are synchronous relative to that.
2. **Capture before read.** Screens / RNG slices / cursors are taken
   in `_preNhgetchHook`, matching C blocking in `tty_nhgetch`.
3. **Forbidden religions** (Bau):
   - “Sparse boundary frames”
   - Deferred action queues to *align* tests
   - Reordering work across `nhgetch` boundaries to make RNG match
   - Inventing replay middleware when the bug is wrong call order
4. If JS RNG order ≠ C, **fix the port** (or the hook timing) —
   do not invent alignment machinery.
5. `animationFrame` is optional / supplemental. Do not warp the main
   loop for Anim%.
6. `async` may propagate up a call chain only because that chain can reach
   `nhgetch` (for example `pline` → `more`) or `animationFrame`. It must not
   defer, queue, or reorder game physics.

---

## 3. Module and naming layout

1. Prefer **1:1 files**: `nethack-c/upstream/src/foo.c` → `js/foo.js`.
2. Prefer **C names** for functions, struct fields, and flags so agents
   can cross-read `decl.h` / `you.h` without a glossary.
3. Global state lives on the mutable `game` object from `gstate.js`
   for now. Evolve toward C’s `u` / transient / saved groupings
   **without** inventing a parallel Redux store.
4. Keep the DAG acyclic. Generated data under `js/generated/` is fine —
   and is the **required** home for upstream `dat/*` text (and similar)
   that the port needs at runtime (Rule #2 / D-0477).
5. Frozen files (`isaac64.js`, `terminal.js`, `storage.js`) are
   untouchable for scoring — do not fork their contracts.
6. A partial module must name semantic omissions in the relevant
   `docs/c-js-map/*.md` section.
   Passing one session is not proof that a C function is complete.
7. **No Node-only modules in scored `js/`.** If it needs `fs` to load, it
   is unfinished — embed or redesign before handoff.

---

## 4. RNG

1. All gameplay randomness goes through `js/rng.js` → frozen ISAAC64.
2. Log format must stay judge-compatible (`rn2(N)=M`, etc.).
3. Match the **two ISAAC64 streams** in `rnd.c`: core gameplay and
   display/hallucination. NetHack Lua `nh.rn2`/`nh.random` calls consume the
   core stream; patch 004 adds Lua caller provenance, not a third ISAAC stream.
   Preserve Lua VM initialization/load order in case its built-in PRNG is
   observable before the `nhlib.lua` override.
4. Match **clang** left-to-right argument evaluation for nested RNG
   calls.
5. Use a **stable sort** wherever C uses `qsort`.
6. Integer ops that must match C should use explicit helpers
   (`i32` trunc, etc.) — do not assume JS `Number` ≡ C `int`.

---

## 5. Fastforward policy

1. `fastforward.js` is **delete-only**. No new seed-specific burn
   lists. No extending it to “almost pass” another session.
2. Progress is measured by:
   - C semantic units advanced and omissions retired (`c-js-map/*.md`);
   - sessions/scenarios reaching real ported code (not throws/fakes);
   - verified focused, green, and cohort evidence;
   - `fastforward.js` bytes/LOC removed (now mostly empty-hook deletion).
   Do not optimize only public session pass count or one Tourist trace.
   When the local public suite is already PASS, **map omission / debt
   retirement under a locked suite** is the primary progress metric —
   not inventing further public FAIL peels.
3. Temporary RNG-consuming stubs inside a real function (matching C’s
   call sites while the body is incomplete) are allowed; wholesale
   session replay is not.
4. Public seed names, trace indices, recorded coordinates/values, and
   expected screens must not drive production control flow. They belong in
   diagnostics/docs/tests. Production comments should describe C semantics,
   not "enough for seedXXXX."
   Exception: §1.2 recording-machine `get_configfile()` path only.

---

## 6. Macros and data

1. Property macros (`youprop.h`, `mondata.h`, …) → JS **functions**
   with single evaluation of arguments.
2. X-macro tables (`objects.h`, `monsters.h`, artifacts) →
   **generated** JS data (script re-runnable for Phase 2).
3. Do not whole-program-inline the engine.
4. Generated files must identify their pinned C source and extractor.
   Extractors must be deterministic; generated tables are not hand-edited.

---

## 7. Lua (decision)

**Production path:** execute upstream `dat/*.lua` through a **pure-JS
Lua VM** with `nh.*` bindings ported from `nhlua.c` / friends. RNG
inside scripts must hit the contest Lua/core wiring the same way C
does (`nhlib.lua` → `nh.rn2`, etc.).

**Constraints:**

- NetHack 5.0 vendors **Lua 5.4.8**. A 5.3-only VM (classic Fengari)
  is a spike candidate only — verify script compatibility or replace
  with a 5.4-capable pure-JS VM / agentic port of the Lua submodule.
- No WASM. VM source must be plain JS loadable in the sandbox.
- Upstream `dat/*.lua` may be read by **checked-in extractors / a pure-JS
  loader that never uses Node `fs` at game runtime**; do not depend on
  network. Runtime disk I/O in scored `js/` is forbidden (Rule #2).

**Forbidden as the long-term path:** prebaking special levels to JSON
for scoring. Prebake is allowed only as a temporary local scaffold
while the VM spike is in flight, and must not ship as the only way
tour/quest sessions work.

**Near term:** keep the skeleton’s minimal `l_nhcore_init` shuffle
until the VM + bindings exist; do not fake entire `dungeon.lua`
graphs with ad-hoc JS that will be thrown away *unless* that JS is
clearly marked temporary and scheduled for deletion.

---

## 8. Display and I/O

1. Drive the frozen `Terminal` / `GameDisplay`; judge reads
   `serialize()`.
2. Implement NetHack’s **window_procs** semantics in JS — do not port
   `win/tty` curses.
3. Cursor position is part of screen match — keep it honest.
4. Persist save/bones/record only via frozen `storage.js` VFS.

---

## 9. Datetime and options

1. Honor `input.datetime` (`YYYYMMDDHHMMSS`) for moon phase, Friday
   the 13th, hire dates, shopkeeper lines, etc. (skeleton stores it
   but does not apply it yet — that is a real gap).
2. Honor `nethackrc` / OPTIONS for chargen and flags; no hardcoded
   Tourist-only success path once chargen is ported.

---

## 10. Agent workflow

1. Follow `PORTING-RUNBOOK.md`; it owns the operational protocol.
2. **Vertical slices:** one function or tight cluster per task, with
   focused, green-gate, and subsystem-cohort acceptance commands.
   Small scope does not excuse porting only an observed seed branch.
   A cluster may retire several *related* map deferrals that share one
   C locus family and one falsifier; it must not mix unrelated
   subsystems. Prefer denser clusters over one-bullet peels once the
   public suite is PASS (see runbook / playbook). When the omit is tagged
   restore / other-floor or has a prefix id in
   `scripts/data/save-oracle-prefixes.json`, the port packet names the
   `save-oracle.mjs` probe/replay/fork command used as the falsifier.
3. **Cite C** in the change (file + function). Fixes that cannot point
   at C are suspect.
4. **Auditor > Porter** on architecture. Porters do not redefine the
   game loop.
5. After a clever non-C theory appears, **stop and delete** — then
   re-read C.
6. Remove all temporary diagnostics, raw-index gates, and debug prints
   before handing off.
7. Preserve the green gate and test a distinct scenario when shared
   behavior changes.
8. Put facts in their owning durable docs: unresolved theories in Notes,
   root causes in the divergence log, per-function port status and
   structural omissions in the **port ledger** (`docs/ledger/`, written
   through `scripts/ledger.mjs` / the D-entry `Ledger:` bullet —
   `docs/LEDGER.md`; the `c-js-map/*.md` prose is frozen history since
   2026-09-27), and measured objectives/scores in Progress.
9. Subsystem restart (delete + re-port a file) is normal and preferred
   over stacking shims.
10. Unattended loop agents read `GROK-PLAYBOOK.md` first; objective priority
    and anti-patterns live there. They do not edit that playbook in-loop.
11. After a verified loop iteration, **commit** stageable work and
    **`git push origin HEAD`**. The unattended supervisor
    (`scripts/agent-port-loop.sh`) fail-closes (density / authority)
    and pushes if the agent forgot (see `docs/AGENT-PORT-LOOP.md`).
    Green / full-suite regression is logged; the loop continues.
    No force-push, reset, or history rewrite. If a density/authority
    gate fails after a push, halt without `git reset` (human reverts
    origin).
12. **Measure C before theorizing.** Every claim about C state (terrain,
    flags, list order, a pending `--More--`) written to `NOTES.md` or the
    divergence log carries its evidence grade: *measured* (recorded C
    screen, wizard-mode probe, temp C dump) or *inferred* (from JS, from
    an RNG count, from a FORCE). A JS FORCE / DIAG that restores an RNG
    count is not a falsifier and never localizes a cause. The recorder is
    a 0.3 s oracle: when a recording can show the state, take it before
    reading more code. An unattended iteration with no C-side measurement
    after ~40 tool calls parks with the exact probe command rather than
    continuing (D-1849).
13. **The work picker is an unsaturated corpus, never a saturated one.**
    Held-out score is measured only by the judge; locally it is stood in
    for by C-recorded sessions the port does not yet pass
    (`docs/HIDDEN-PROXY.md`). A corpus family passing ≥ 90 % has stopped
    discriminating: when every family is ≥ 85 % the audit iteration grows
    the corpus (`scripts/scenario-gen.mjs`, the held-out genre — wizard
    wishes, genesis, named-level teleports, polyself, deaths) **before**
    any queue refill from map omissions. Map singletons with no corpus
    session and no C RNG/message surface are Deferred while any family is
    below 90 %. Twice (2026-09-04 public 44/44, 2026-09-06 mutant corpus
    96 %) the loop kept shipping display singletons against a saturated
    signal while held-out sat at 7/44. Suspended during the breadth
    phase (§10.17); **in force again since the cliff phase (§10.18)**,
    whose picker is the corpus ranked by RNG lost — saturation is
    answered by growing the corpus in a supervisor **grow** iteration
    (§10.19), not by inventing rows.
14. **A JS throw or worker hang in any corpus session is a Must-fix**,
    ahead of every Open row: a `ReferenceError` at step 0 (or an
    `ETIMEDOUT` sync spin) forfeits every screen of the session, and the
    fix is usually an import of an existing export or one loop. The
    scoreboard's `error` field / `js-throw` owner is the trigger; the
    iteration verifies with `hidden-proxy score --ids` on those sessions.
15. **Queue rows carry evidence; a stale row costs three calls, not an
    iteration.** Every live `LOOP-QUEUE.md` row states its corpus block
    (session, step), a C arm verified absent from the JS body in a brief,
    a `[campaign]`/`[measure]` tag, or a throw/hang. A map/debt/TOP30 line
    or a D-number is not evidence (2026-09-09..15: 109 of 161 parks were
    such copies of already-shipped work, ~35 % of iterations). A popped row
    whose function is live, `0 blocked`, with no missing arm is retired by
    one `ledger.mjs set <fn> ported --note "stale: …"` (the ledger remembers
    it, so the generated queue never re-emits it), and the iteration
    continues with the next row. Live Parked lines are an index (≤ 300
    chars); proofs live in `docs/archive/LOOP-QUEUE-PARKED.md`.
16. **A park names its writer or its measurement.** A diagnostic park
    (owner is a symptom, body faithful) adds, in the same commit, the Open
    row for the writer it names — or a `[measure]` row naming the one
    C-side measurement that would name it. Work too large for one
    iteration is a `[campaign k/n]` series whose every step ships `js/`
    and keeps the fortress. Parked corpus owners are the remaining held-out
    signal; they are worked through their writers, never by re-porting the
    symptom owner and never by padding the queue from the map.
17. **Breadth phase (human decision 2026-09-18; picker superseded by
    §10.18 on 2026-10-06 — its fortress, REACH, whole-function, ledger and
    audit-rescore rules stand).** The local corpus stopped
    predicting the judge: on 2026-09-17 it read 495/540 PASS (91.7 %) while
    the leaderboard read held-out **11/44, RNG 26.6 %, screens 50.0 %**
    (best agentic fork: 35/44, 93 %). Until a human closes the phase in
    `CURRENT.md`, the work picker is **measured coverage**, not corpus rows:
    the LOOP-QUEUE **Open — coverage** block is generated by
    `node scripts/ledger.mjs rows --write` from the pinned-C functions that
    are MISSING or THIN in `js/` **and** not declared ported/split/by-design
    in the ledger, ranked by reach × loudness and measured on the JS tree at
    enqueue (evidence class `coverage`, §10.15). Rows are never pasted by
    hand. Each audit appends `ledger.mjs summary --snapshot` to
    `docs/ledger/SNAPSHOTS.tsv` — the coverage half of the phase falsifier.
    An iteration ports **one batch** (human decision 2026-10-03, ten
    times the 2026-09-28 cluster of ≤ 10 functions / 200–800 lines,
    whose iterations had settled at a median of ~3 functions / ~50
    lines while the generated coverage block ran dry): the manifest
    `node scripts/ledger.mjs batch --write` prints — the whole remaining
    gap (open, `partial`, and `ported` rows measured thin) of the C file
    with the highest reach × loudness, then the next files, **40–100
    functions**. Each function of the batch is whole — every arm, every
    callee live or named, every C caller wired — never one arm of it; a
    function that cannot be ported whole goes to the D-entry `Left
    open:` bullet with its blocker and stays in the gap. A re-read
    `ported`/`partial` body that is already whole (or whose remaining
    omissions cannot ship) is declared `audited`. `finish-iteration`
    fails closed unless every manifest function is in `Ledger:` or
    `Left open:`, and unless every JS body the diff adds under a
    pinned-C name is declared. Each function gets its own `verify.mjs
    --fn` line (a list over 10 runs one REACH sweep of every
    baseline-PASS corpus session, attributed per function) and its own
    `Ledger:` entry; audits review a sample (review prompt). Must-fix
    ships alone. §10.13's deferral of map singletons is suspended
    for the phase; §10.14 (throws are Must-fix) and §10.15–16 stand. The
    public 44 **and** the corpus PASS set are the regression fortress:
    `verify.mjs --fn` re-runs the corpus sessions that execute the function
    (REACH) and any PASS→FAIL fails the iteration — fix the port, never the
    session. Corpus-driven debugging (`[measure]` rows, parks, writers) is
    **phase 2**, reopened by a human; audits still re-score the corpus and
    record the leaderboard held-out line (`scripts/leaderboard.mjs`), which
    is the only number that measures the phase. The audit re-score is
    **entire and mandatory** (2026-09-28): record every missing corpus
    session, re-run every recorded one (`hidden-proxy score`, no filter),
    commit `hidden-corpus/scoreboard.json` marked `full`; the supervisor
    redoes it when an audit skips it. Port-time `verify` rewrites rows
    piecemeal, so only this rescore keeps the REACH baseline honest.
18. **Cliff phase (human decision 2026-10-06).** The breadth picker ran
    dry and the loop kept running: on 2026-10-06 `ledger.mjs batch` named
    **1** function, the ledger's measured counts had not moved since
    2026-10-04 (`SNAPSHOTS.tsv`: ok 3889→3887, missing 531→531 over ~140
    commits), held-out sat at **16/44, RNG 34.8 %, screens 64.1 %**
    through ~50 iterations (D-3508…D-3556), and the iterations were
    spent on ledger-text "1-row repairs" self-filed to hold an 8-row
    queue floor, re-audits of one coverage head whose omissions cannot
    ship, and `des.door` campaign steps on paths `CURRENT.md` itself
    called held-out-unreached. The §10.17 falsifier ("held-out flat
    after ~30 iterations → human revisits the picker") had fired. At the
    same time the corpus read **741/953** with whole families below half
    (`scen-options` 1/20, `scen-town` 2/20, `scen-quest` 3/20,
    `scen-tutorial` 4/20) and its top owners by RNG lost were the
    held-out genre itself (`^G`/wish monster parse → `next_ident`, 14
    sessions, 50 k RNG; `^V` named-level `level_tele` `--More--`, 13
    sessions, 38 k RNG) — every one tagged "do not re-enqueue" because a
    D-entry had once touched it. Until a human closes the phase in
    `CURRENT.md`:
    - **The picker is the corpus**, ranked by **RNG calls lost after the
      first divergence** (the held-out metric that lags most: RNG 34.8 %
      against rngSteps 87.7 % means a few early cliffs in long sessions,
      not many small ones), JS throws first. The LOOP-QUEUE **Open —
      cliffs** block is generated from the **committed**
      `hidden-corpus/scoreboard.json` by `hidden-proxy.mjs queue --write`
      (via `check-hot-docs --fix`); rows are never pasted, padded or
      hand-edited. Pop order: Must-fix (strict) → cliffs head → coverage
      head (ledger gap) only when the cliffs block is empty or as a
      same-C-file companion.
    - **A tag is context, not a veto.** An archived DONE row or a ledger
      `ported` status records that a D-entry once shipped the owner; the
      board recording sessions still blocked there records that the work
      is live. The porter reads that one D-entry so the same arm is not
      re-ported and ports the arm the current first divergence names. A
      **parked** owner keeps §10.16: the deliverable is the **writer** the
      divergence names (`hidden-proxy show`: `cEntry`/`jsEntry`,
      `cMsgOwners`, differing row) or the owner's `[measure]` row — never
      a re-port of the symptom owner.
    - **One iteration = one cliff, whole, with movement.** The owner (or
      writer) is ported as a whole C function (§10.17 rules: every arm,
      every callee live or named, every C caller wired, one `Ledger:`
      entry), and `verify.mjs --fn` must show **movement** on the row's
      probe sessions — PASS, or a strictly later first-divergence step or
      owner — **and** REACH-OK. NO MOVEMENT after one further fix means
      the arm is still wrong: the iteration measures C (§10.12) instead
      of patching a third time; the measurement names the writer (port
      it) or parks the owner with its `[measure]` row. `[measure]` rows
      and parks are live again, popped when their owner heads the block.
    - **Must-fix is strict**: a JS throw or worker hang in any session
      (§10.14), a corpus or public PASS→FAIL naming session + owner +
      `js/` SHAs, or a review-named C-wrong. A ledger omit/note that
      disagrees with the live body is one `ledger.mjs set` inside whatever
      iteration notices it — never a row, never an iteration. The queue
      has no floor (`QUEUE_MIN` 1): the generated blocks are the rows.
    - **No-op iterations are failures**, not neutral: an iteration whose
      only output is ledger text, a re-audit of a function already
      `audited`, a cite refresh, or a campaign step on a path no corpus
      session reaches is QUALITY-RISK in review with a Must-fix row naming
      the cliffs head it should have shipped. A coverage row whose
      remaining omissions cannot ship is `audited` once and leaves the
      block.
    - **Saturation is answered by growth, not invention** (§10.13 back
      in force; since §10.19 a supervisor grow iteration does it, not
      the audit): when the worst `scen-*` family passes ≥ 85 %, or the
      cliffs block holds fewer than 6 owners, the audit iteration authors
      a fresh cohort in the held-out genre (`scenario-gen.mjs`: long `^V`
      tours over several named levels, shops and temples, Sokoban,
      endgame planes, save/restore prefixes), records, rescores and
      commits it before anything else.
    - **Falsifier (human reads it):** held-out `leaderboard.mjs` after
      ~20 cliff iterations — passing count or RNG % not moving while the
      committed board's PASS count and RNG % rise means the corpus has
      stopped predicting the judge again; the human revisits the picker.
      The audit records both lines side by side in `CURRENT.md`.
19. **Marathons and growth as a gate (architect decision 2026-10-09,
    under delegated human authority; amends §10.18, whose picker,
    whole-function, movement, REACH and Must-fix rules stand).** The
    §10.18 falsifier fired. From 2026-10-08 to 2026-10-09 the board rose
    899 → 939/953 (positional RNG 100 %) while held-out stayed at
    **18/44, RNG 41.7 %, rngSteps 92.4 %** for ~80 iterations. Three
    failures, all structural:
    - **The corpus could not produce the judge's shape.** Four public
      sessions of 44 carry half the public RNG (world-tour 833 steps,
      knight-coverage 1814, ten-diverse-deaths 1953 over ten games,
      dequa-fountain-explore 714). RNG % against rngSteps % says a few
      long held-out sessions break early. `scenario-gen` capped every
      scenario at 320 keys: no `scen-*` session ran past 344 steps.
    - **Growth was an audit chore, so it never happened.** §10.18
      required a cohort when the cliffs block held < 6 owners; no recipe
      was added from 2026-10-01 to 2026-10-09, every port crumb ending
      "Audit owns growth" and every audit skipping it.
    - **The empty slot was filled with unreached work.** The supervisor
      still told an empty-queue port iteration to "refill Open from the
      map"; ten C-correct Underwater-idiom ships moved no session and
      every review accepted them.

    Until a human or architect closes it in `CURRENT.md`:
    - **The corpus carries the long shape.** The third-wave families of
      `scenario-gen.mjs` (`--family marathon`: `worldtour`, `sweep`,
      `chain`, `trek`; 600–2000 steps, debug games answer «Die?» with n,
      chained games keep bones and the score file) are part of the
      corpus. The first cohort (160, 2026-10-09) passed 50 with cohort
      RNG 74.7 %; `worldtour` 6/50. Every family older than them was at
      100 % RNG. `node scripts/hidden-proxy.mjs families` is the table.
    - **Growth is a supervisor mode, not a chore.** A port slot that
      starts with no Must-fix and fewer than 6 rows in the generated
      cliffs block is a **grow** iteration
      (`agent-port-loop.grow.prompt.md`): ≥ 80 new sessions, at least
      half marathon, weighted to the long family with the lowest RNG %,
      then `record`, a full `score`, both committed; the cliffs block is
      regenerated from that board. Three grow iterations in a row that
      add no recipe halt the loop (recorder broken). When every family
      including the long ones passes ≥ 90 %, the grow deliverable is a
      new family copying a named public session's shape — a key policy
      that reads only the screen, never `js/`.
    - **Only reached work ships.** A port slot pops Must-fix or the
      cliffs head; with both empty it journals and stops. A `js/` commit
      that is neither, whose Verify moves no corpus session, is
      QUALITY-RISK in review however correct its C (no "missing-arm"
      self-filing, idiom sweeps or successor leads). The audit is review
      + full rescore + leaderboard; it no longer grows.
    - **Long sessions are worked at their first divergence.** `show`
      gives the step and replay command; `geom-probe <id> --step N` and
      temp C dumps measure there. The fix is the C function, never the
      session (unchanged).
    - **Falsifier (architect/human reads it):** ~20 cliff iterations on
      marathon owners with the long families' RNG % rising and held-out
      RNG % flat → the long shape is still not the judge's; revisit the
      generator (compare against the public long sessions key by key),
      not the port. Held-out RNG % moving while passing count stays flat
      is progress, not a falsifier — positional RNG is what early
      cliffs cost.

---

## 11. Phase 2 posture

Ship Phase 1 as something a porter can regenerate: clear modules,
generated tables, Lua scripts unchanged from upstream, constitution
still true. Optimize for **small diffs when C changes**, not for
maximum opacity.

After public-suite PASS, keep optimizing for held-out generalization
and Phase 2 maintainability: retire scenario-shaped debt, prefer
subsystem restart over shim stacks, and harden thin spots with private
C-recorder canaries — not by overfitting the public corpus.

---

*When in doubt: delete the workaround, read the C, port the C.*
