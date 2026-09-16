You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code
and one accurate D-log entry are. Tool calls are the cost; each step below
is one call unless it says otherwise.

## Read first (≤12k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10 (skim).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective.
4. **`docs/LOOP-QUEUE.md`** header + first **Must-fix** `- [ ]` if any, else
   first Open. Do not read the Parked index unless a row points there.
5. `docs/NOTES.md` — live hypothesis / don’t-recheck only.
6. `docs/HIDDEN-PROXY.md` §1–3 — what the corpus is and what a row means.

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

Pop the first unchecked **Must-fix** row, else the first **Open** row
(`LOOP-QUEUE.md`). Copy it into `CURRENT.md` **Next cluster**. Then:

    node scripts/brief.mjs <C function>        # or: --next

It prints the queue row, the pinned-C body + every C call site, which C
callees exist in `js/`, the same-named JS body, the map lines, D-index rows,
the corpus sessions blocked on it (C vs JS, both owners, replay command) and
reviews naming it. Read the C **in that output**; `sym.mjs` / `csym.mjs` /
`map.mjs` are one call each — no `grep`/`cat` of whole modules.
`imports.mjs --can A.js B.js Name` before any new cross-module import (a
cycle alone is not a blocker; a top-level TDZ read is). If the row cites
`Source: reviews/…`, read that review's Actionable/Disposition first.

**Stale check (≤3 calls, never the iteration).** Brief shows a live
same-named JS body, `0 blocked`, no C arm missing → the row is stale: one
line (≤ 300 chars) under `LOOP-QUEUE.md` Parked **Stale**, retire the
map/debt line that spawned it, **pop the next row and ship it in this
iteration**. No proof essay; an iteration that only parks stale rows is
flagged by the supervisor and the next one is told to ship the head.

A row naming a **corpus session** (`scen-*` = held-out genre) is a real
C-vs-JS divergence with a recorded expectation: the deliverable is the **C
function’s** port (`hidden-proxy show <id>` prints recipe + replay). A fix
that reads a seed, step, coordinate or RNG index is reverted.

**Symptom owners.** A level-gen scan (`mineralize`, `wallification`,
`place_lregion`…) or status-row owner (`do_statusline1/2`) is where C
*noticed* the difference. Measure before opening a second C function:
`node scripts/geom-probe.mjs <session-id>` for geometry, a prefix-state
probe or temp C dump otherwise. RNG counts are location-blind; a JS
FORCE/DIAG restoring a count proves nothing (D-1849). By call ~40 without
a C-side measurement, take one or park.

## One bounded unit

One C function / tight helper cluster, ported from the C body in the brief:
preserve short-circuit, RNG, list, ownership, mutation and integer semantics
(runbook §7). Cite C in JS. Generated tables only via checked-in extractors.
Target **80–400** lines of C-faithful JS; below ~40 insertions on a
non-Must-fix port is a failed density handoff unless C is that small.
Consecutive Open rows of the **same** C `file.c:function` may ship together
iff every C callee is live, a C-matched clone, or named omitted in this
commit (no stub in a live arm). Must-fix stays one item, alone.
`[campaign N/M]` rows are steps of one plan: pop in order, each ships `js/`
and keeps 44/44. Supervisor caps: 600 `js/` insertions / 10 files. Remove
DIAG/FORCE, seed names, recorded coords, raw RNG-index gates; never edit
frozen `isaac64`/`terminal`/`storage` or add to `fastforward.js`. If an
extension keeps regressing the fortress after two fixes, revert it, name it
in the map, queue it as its own row, ship the verified core. Port C control
flow, never a screen side effect (no grid snapshot/restore — D-1831).

**Callers, not just callees.** For every C call site in the brief, the
D-log names the JS site now wired (file:line) or the named omission. A call
from a site C never calls from, or a C caller left unwired and unnamed, is
a C-wrong (reviews 1359/1361).

## Verify (1 call)

    node scripts/verify.mjs --fn <C function>

Syntax · Rule #2 / DIAG / seed-gate scan · `hidden-proxy verify <fn>` (every
blocked session must PASS or move to a **later** owner; NO MOVEMENT or
REGRESSION is a failed port) · green + strict · cohort · full `sessions`
when a shared file changed. Paste its tail into the D-log **Verify**
bullet. Hand probes only for arms no corpus session reaches; delete them.
On a cohort/full FAIL it lists every failing session's first divergence:
**triage them all**, fix each cause once, re-run once. `note hidden … no
corpus session is blocked` is **not** a PASS: if the row cited N blocks,
re-run with `--base <sha the row was queued at>` and paste that (D-1831).

## Durable handoff (1 hand-written entry, then 1 call)

Write **one** `## D-NNNN — title` entry atop `docs/DIVERGENCE-LOG.md`
(Status · Symptom · C locus · JS was · Fix · JS · Callers · Verify · Named
omissions · Next). Edit the **one** `c-js-map/*.md` section (edit tool, no
heredocs). Mark the queue row `- [x] … **Addressed:** D-NNNN`. Then:

    node scripts/finish-iteration.mjs --commit

It generates index row, journal crumb, `CURRENT.md` recent block, `NOTES.md`
landmark, review stamp, hash backfill, queue archive, cap check, commit and
push (do not hand-edit those blocks). Update `CURRENT.md` **primary
objective** / `NOTES.md` **Active** only when they changed.

**Refill** (REFILL or supervisor ask): append only rows carrying **evidence**
per the `LOOP-QUEUE.md` header — a corpus block (`hidden-proxy queue` or a
park's named writer), a `[campaign]` step, a `[measure]` row for the top
parked corpus owner, or a C arm you verified absent from the JS body in a
brief. A map/debt/TOP30 line is not evidence. If the supervisor overlay
names `data.md`/`debt.md`, the eligibility rule wins: nothing eligible →
append nothing, one journal line. `js-throw` / worker hang = Must-fix.

**Every 10th iteration** (`n % 10 == 0`) is the audit iter: review +
`node frozen/ps_test_runner.mjs sessions` + `hidden-proxy score`
(+ `scenario-gen.mjs` at ≥ 85 % corpus PASS), not a port iter.

## Park and measure (no `js/`)

A **diagnostic** park (body faithful, owner is a symptom) moves the row to
Parked as **one line** (name — class — proof pointer — falsifier; long proof
to `docs/archive/LOOP-QUEUE-PARKED.md`) and, if it names the writer, **adds
the writer's Open row in the same commit** (session as evidence, after a
brief confirms the arm is still absent); if not, adds a `[measure]` row
naming the one C-side measurement that would. A `[measure]` row's
deliverable is the writer's Open row carrying the measurement (≤ 3 lines
in `NOTES.md` Active, *measured*, with command). Both: **commit and
push**, no `finish-iteration`; the supervisor accepts them as no-`js/`.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic,
whole-program transpile/WASM as the scored port. Do not edit authority docs
(Constitution, runbook, playbook, API/phases/strategy, Cursor rules, loop
scripts/prompt), `frozen/**`, `sessions/**`, upstream C/patches, or frozen JS
contracts. Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit may, on
REJECT) nor `0`; do not `git add` it. No `git reset --hard` / `git clean`,
force-push, or amend of pushed commits. After two falsifications, or ~40
calls with no C-side measurement, measure C or park — do not spin.
