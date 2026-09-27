You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code
and one accurate D-log entry are. Tool calls are the cost; each step below
is one call unless it says otherwise.

**Breadth phase (Constitution §10.17):** held-out is 11/44 while the local
corpus reads 91.7 % — the corpus no longer picks work. You port **one
cluster**: ≤ **10 whole C functions** of one C file or callee closure,
**200–800 lines** in total, from the generated **Open — coverage** block.
Public 44/44 and the corpus PASS set are the regression fortress
(`verify` must end REACH-OK).

## Read first (≤12k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10.17 (skim rest).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective.
4. **`docs/LOOP-QUEUE.md`** Breadth-phase block + first **Must-fix** `- [ ]`
   if any, else the first generated coverage row. Skip Parked and Phase 2.
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

Pop the first unchecked **Must-fix** row (ships **alone**), else the first
**Open — coverage** row as the **cluster head**. Then:

    node scripts/brief.mjs <C function>        # or: --next

Grow the cluster: the head's Open callees, then Open rows of the **same C
file** in queue order, while JS stays ≤ 800 lines and ≤ 10 functions (one
`brief` each). Copy it into `CURRENT.md` **Next cluster**.

Each brief prints the queue row, the pinned-C body + every C call site, which C
callees exist in `js/`, the same-named JS body, their ledger rows, D-index rows,
the corpus sessions blocked on it and reviews naming it. Read the **whole**
C body **in that output**; `sym.mjs` / `csym.mjs` / `map.mjs` are one call
each — no `grep`/`cat` of whole modules. `imports.mjs --can A.js B.js Name`
before any new cross-module import (a cycle alone is not a blocker; a
top-level TDZ read is). If the row cites `Source: reviews/…`, read that
review's Actionable/Disposition first.

**Stale check (≤3 calls, never the iteration).** Brief shows the C body
already complete in JS — under this name or split names (`split?` rows:
check the callers' JS sites) — → `node scripts/ledger.mjs set <fn> ported
--note "stale: <js file:line>"` (split names: `split --js a.js:x,b.js:y`),
**pop the next row and ship it in this iteration**. No proof essay; an iteration that only parks stale rows is
flagged by the supervisor and the next one is told to ship the head.

A row naming a **corpus session** (`scen-*` = held-out genre) is a real
C-vs-JS divergence with a recorded expectation: the deliverable is the **C
function’s** port (`hidden-proxy show <id>` prints recipe + replay). A fix
that reads a seed, step, coordinate or RNG index is reverted. Symptom
owners (`mineralize`, `do_statusline1/2`…), `[measure]` rows and parks are
**phase 2** — do not open them.

## One bounded unit: the cluster, each function whole

For **each** function of the cluster, port the C body in its brief **entirely**, in C order: every `case`, every
guarded arm, every callee (import the live export — `sym.mjs` — or port it
in this commit, or name it in Named omissions with its C line), every C caller
wired (brief callers table → JS `file:line` each). Preserve short-circuit,
RNG, list, ownership, mutation and integer semantics (runbook §7). Cite C
in JS. Prefer **restart** of a thin JS body over patching it; keep the
export name and signature so callers stay wired. Generated tables only via
checked-in extractors. Below ~80 insertions on a non-Must-fix port is a
failed density handoff unless the head's file and callee closure hold
nothing more Open. Ten is a ceiling, not a target: a function you cannot
port whole leaves the cluster (row stays Open). One too big for an
iteration ships its verified core + `[campaign k/n]` rows. Supervisor caps: **1500** `js/` insertions / **15** files (over → undone;
split at a C function boundary). Remove DIAG/FORCE, seed names, recorded
coords, raw RNG-index gates; never edit frozen `isaac64`/`terminal`/
`storage` or add to `fastforward.js`. If an arm keeps regressing the
fortress after two fixes, revert that arm, name it in the map, queue it as
its own row, ship the rest. Port C control flow, never a screen side
effect (no grid snapshot/restore — D-1831).

**Callers, not just callees.** For every C call site in the brief, the
D-log names the JS site now wired (file:line) or the named omission. A call
from a site C never calls from, or a C caller left unwired and unnamed, is
a C-wrong (reviews 1359/1361).

## Verify (1 call)

    node scripts/verify.mjs --fn <fn1>,<fn2>,…     # every function of the cluster

Per function: `hidden-proxy verify` (blocked sessions, if any, PASS or
move to a **later** owner) · **REACH** (baseline-PASS corpus sessions that
execute it — spread ≤ 80, or a smoke spread — must all still PASS;
`--reach-all` when hot). Once: syntax · Rule #2 / DIAG / seed-gate scan ·
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
omissions · **Ledger** · Next); in a cluster C locus / Callers / Verify /
Named omissions carry one `  - \`fn\`: …` sub-bullet per function.
`- **Ledger:** <fn> ported` — `partial` when Named omissions names missing
C; `split js=a.js:x+b.js:y`; a cluster: `a ported; b partial; c ported`. A coverage row leaves the block by itself; mark a
Must-fix/corpus row `- [x] … **Addressed:** D-NNNN`. Then:

    node scripts/finish-iteration.mjs --commit

It writes the ledger rows and the coverage block, then index row, journal crumb, `CURRENT.md` recent block, `NOTES.md`
landmark, review stamp, hash backfill, queue archive, cap check, commit and
push (do not hand-edit those blocks). Update `CURRENT.md` **primary
objective** / `NOTES.md` **Active** only when they changed.

**Refill:** none by hand — finish and `check-hot-docs.mjs --fix` regenerate
the coverage block (`ledger.mjs rows --write`). Hand-written rows are
Must-fix/corpus only, with evidence. `js-throw` / worker hang = Must-fix.

**Every 10th iteration** (`n % 10 == 0`) is the audit iter (review + full
suite + **full** scoreboard rescore + leaderboard), not a port iter. The
only park is the stale one above; `[measure]` rows and parks are phase 2.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic,
whole-program transpile/WASM as the scored port. Do not edit authority docs
(Constitution, runbook, playbook, API/phases/strategy, Cursor rules, loop
scripts/prompt), `frozen/**`, `sessions/**`, upstream C/patches, or frozen JS
contracts. Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit may, on
REJECT) nor `0`; do not `git add` it. No `git reset --hard` / `git clean`,
force-push, or amend of pushed commits. After two falsifications, or ~40
calls with no C-side measurement, measure C or park — do not spin.
