You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code
and one accurate D-log entry are. Tool calls are the cost; each step below
is one call unless it says otherwise.

**Breadth phase (Constitution §10.17):** held-out is 11/44 while the local
corpus reads 91.7 % — the corpus no longer picks work. You port **one
batch** (2026-10-03): the **40–100 whole C functions** the
`ledger.mjs batch` manifest names — the remaining gap of the top C
file(s), typically 1000–8000 lines of JS.
Public 44/44 and the corpus PASS set are the regression fortress
(`verify` must end REACH-OK).

## Read first (≤12k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10.17 (skim rest).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective.
4. **`docs/LOOP-QUEUE.md`** Breadth-phase block + first **Must-fix** `- [ ]`
   if any. Skip Parked and Phase 2.
5. `docs/NOTES.md` — live hypothesis / don’t-recheck only.
6. `docs/HIDDEN-PROXY.md` §3 — verify + REACH semantics (one table).

**Do not read:** `docs/archive/**` (except the one parked row a queue row
points at), full `DIVERGENCE-LOG.md`, `PORTING-STRATEGY.md`, full journal.
Use `DIVERGENCE-INDEX.md` + **one** `## D-NNNN` entry.

**HARD — Contest Rule #2:** scored `js/` must run as plain ESM in **Node and
Chrome**. No `fs`/`path`/`url`/`node:*`, no `readFileSync`. Persist only via
`storage.js` VFS; embed dat texts in `js/generated/`.

## Preflight (2 calls)

1. `git status --short` — shared dirty tree; never reset/checkout others' work.
2. `node scripts/verify.mjs --no-cohort` — green gate + strict. FAIL before
   you changed anything → journal and stop, no feature work.

## Pick and orient (1 call)

Pop the first unchecked **Must-fix** row (ships **alone**; `brief.mjs
<fn>`). Otherwise, the batch:

    node scripts/ledger.mjs batch --write      # manifest → .cache/batch.json

Gap kinds: **open** (port the C body), **partial** (port the named
omissions), **recheck** (ported, measured thin: complete or `audited`).
Never re-pick or trim it by hand. One line in `CURRENT.md` **Next
cluster**, then one C file at a time, one `brief.mjs <fn>` per function.

Each brief prints the queue row, the pinned-C body + every C call site, which C
callees exist in `js/`, the same-named JS body, their ledger rows, D-index rows,
the corpus sessions blocked on it and reviews naming it. Read the **whole**
C body **in that output**; `sym.mjs` / `csym.mjs` / `map.mjs` are one call
each — no `grep`/`cat` of whole modules. `imports.mjs --can A.js B.js Name`
before any new cross-module import (a cycle alone is not a blocker; a
top-level TDZ read is). If the row cites `Source: reviews/…`, read that
review's Actionable/Disposition first.

**Already whole (≤3 calls per function, never the iteration).** Brief
shows the C body complete in JS — under this name or split names (check
the callers' JS sites) — → `fn audited` in the `Ledger:` bullet (or `fn
split js=a.js:x+b.js:y`; an open row: `fn ported`), then the next
function. No proof essay; a batch that only audits is flagged by the
supervisor.

A row naming a **corpus session** (`scen-*` = held-out genre) is a real
C-vs-JS divergence with a recorded expectation: the deliverable is the **C
function’s** port (`hidden-proxy show <id>` prints recipe + replay). A fix
that reads a seed, step, coordinate or RNG index is reverted. Symptom
owners (`mineralize`, `do_statusline1/2`…), `[measure]` rows and parks are
**phase 2** — do not open them.

## One bounded unit: the batch, each function whole

For **each** function of the batch, port the C body in its brief **entirely**, in C order: every `case`, every
guarded arm, every callee (import the live export — `sym.mjs` — or port it
in this commit, or name it in Named omissions with its C line), every C caller
wired (brief callers table → JS `file:line` each). Preserve short-circuit,
RNG, list, ownership, mutation and integer semantics (runbook §7). Cite C
in JS. Prefer **restart** of a thin JS body over patching it; keep the
export name and signature so callers stay wired. Generated tables only via
checked-in extractors. A function you cannot port whole goes to
`- **Left open:** \`fn\` — blocker; …` (it stays in the gap); more than a
third of the manifest left open is a failed density handoff. One too big
for an iteration ships its verified core + `[campaign k/n]` rows.
**Checkpoint per C file:** `verify.mjs --fn <that file's functions>`
before starting the next file. Supervisor caps:
**15000** `js/` insertions / **80** files (over → undone; re-pick with
`ledger.mjs batch <file.c> --write`). Remove DIAG/FORCE, seed names, recorded
coords, raw RNG-index gates; never edit frozen `isaac64`/`terminal`/
`storage` or add to `fastforward.js`. If an arm keeps regressing the
fortress after two fixes, revert that arm, name it in the map, queue it as
its own row, ship the rest. Port C control flow, never a screen side
effect (no grid snapshot/restore — D-1831).

**Callers, not just callees.** For every C call site in the brief, the
D-log names the JS site now wired (file:line) or the named omission. A call
from a site C never calls from, or a C caller left unwired and unnamed, is
a C-wrong (reviews 1359/1361).

## Verify (1 call per C file, then 1 for the batch)

    node scripts/verify.mjs --fn <fn1>,<fn2>,…     # every function of the batch (the line `ledger.mjs batch` printed)

Per function: `hidden-proxy verify` (blocked sessions, if any, PASS or
move to a **later** owner) · **REACH** (over 10 functions: one sweep of
every baseline-PASS corpus session, regressions attributed per
function; `sweep:` lines name regressions no batch function executes).
Once: syntax · Rule #2 / DIAG / seed-gate scan ·
green + strict · cohort · full `sessions` when a
shared file changed. Paste its tail into the D-log **Verify** bullet. On a
cohort/full/REACH FAIL it lists every failing session's first divergence:
**triage them all**, fix each cause once, re-run once. A REACH regression
is a bug in the code you just wrote — fix the port, never the session,
never "name" it. `note hidden … no corpus session is blocked` is normal
for a coverage row; REACH-OK is then the corpus evidence. A row that cited
N blocks: re-run with `--base <sha the row was queued at>` (D-1831).

## Durable handoff (1 hand-written entry, then 1 call)

Write **one** `## D-NNNN — title` entry atop `docs/DIVERGENCE-LOG.md`
(Status · Symptom · C locus · JS was · Fix · JS · Callers · Verify · Named
omissions · **Ledger** · Left open · Next); in a batch C locus / Callers /
Named omissions carry one `  - \`fn\`: …` sub-bullet per function whose
JS changed (`audited` functions: Ledger only); Verify is the verify tail.
`- **Ledger:** a ported; b partial; c audited; d split js=a.js:x+b.js:y;
e by-design` — one item **per manifest function** you finished: `partial`
when Named omissions names missing C, `audited` when a live body was
already whole (or its remaining omissions cannot ship), `by-design` when C
compiles it out / Rule #2 forbids it. `- **Left open:** \`f\` — blocker;
\`g\` — blocker` for the rest. Mark a Must-fix row `- [x] … **Addressed:**
D-NNNN`. Then:

    node scripts/finish-iteration.mjs --commit

It **fails closed** on a manifest function in neither bullet, or a new
JS body under an undeclared open/partial C name (warns on a clone). It writes the ledger rows and the coverage block, then index row, journal crumb, `CURRENT.md` recent block, `NOTES.md`
landmark, review stamp, hash backfill, queue archive, cap check, commit and
push (do not hand-edit those blocks). Update `CURRENT.md` **primary
objective** / `NOTES.md` **Active** only when they changed.

**Refill:** none — the batch picker reads the ledger directly. Hand-written
queue rows are Must-fix only, with evidence. `js-throw` / worker hang =
Must-fix.

**Every 10th iteration** (`n % 10 == 0`) is the audit iter (sampled review
+ full suite + **full** scoreboard rescore + leaderboard), not a port
iter. `[measure]` rows and parks are phase 2.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic,
whole-program transpile/WASM as the scored port. Do not edit authority docs
(Constitution, runbook, playbook, API/phases/strategy, Cursor rules, loop
scripts/prompt), `frozen/**`, `sessions/**`, upstream C/patches, or frozen JS
contracts. Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit may, on
REJECT) nor `0`; do not `git add` it. No `git reset --hard` / `git clean`,
force-push, or amend of pushed commits. After two falsifications, or ~40
calls with no C-side measurement, measure C or park — do not spin.
