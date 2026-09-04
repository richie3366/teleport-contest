You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code and
one accurate D-log entry are. Tool calls are the cost; each step below is one
call unless it says otherwise.

## Read first (≤12k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10 (skim).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective.
4. **`docs/LOOP-QUEUE.md`** — first **Must-fix** `- [ ]` if any, else first Open.
5. `docs/NOTES.md` — live hypothesis / don’t-recheck only.
6. `docs/HIDDEN-PROXY.md` §1–3 — what the corpus is and what a row means.

**Do not read:** `docs/archive/**`, full `DIVERGENCE-LOG.md`, `PORTING-STRATEGY.md`,
full journal. Use `DIVERGENCE-INDEX.md` + **one** `## D-NNNN` entry.
**Do not implement** D-0006 until its C-state falsifier exists.

**HARD — Contest Rule #2:** scored `js/` must run as plain ESM in **Node and
Chrome**. No `fs`/`path`/`url`/`node:*`, no `readFileSync`. Persist only via
`storage.js` VFS; embed dat texts in `js/generated/`.

## Preflight (2 calls)

1. `git status --short` — shared dirty tree; never reset/checkout unrelated work.
2. `node scripts/verify.mjs --no-cohort` — green gate + strict. If it FAILS
   before you changed anything: journal and stop — no feature work.

## Pick and orient (1 call)

Pop the first unchecked **Must-fix** row, else the first **Open** row
(`LOOP-QUEUE.md`). Copy it into `CURRENT.md` **Next cluster**. Then:

    node scripts/brief.mjs <C function>        # or: --next

That single call prints the queue row, the pinned-C body and every C call
site, which C callees exist in `js/` (clone counts), the same-named JS body,
the `c-js-map` lines naming it, the D-index rows naming it, the corpus
sessions blocked on it (C vs JS topline, the C draw vs the JS draw with both
owners, the replay command), and reviews naming it. Read the C **in that
output**; re-read the C again only if you change your mind about the locus.
Do not `grep` for a definition, page `c-js-map/*.md`, or `cat` a whole
module: `sym.mjs` / `csym.mjs` / `map.mjs` / `brief.mjs` are each one call.
`imports.mjs --can A.js B.js Name` before any new cross-module import — a
cycle alone is not a blocker (`js/` is one 82-module SCC); a top-level TDZ
read is. If the row cites `Source: reviews/…`, read that review’s
Actionable/Disposition before coding.

A row that names a **corpus session** (`hidden-corpus/`, `private-sessions/`)
is a real C-vs-JS divergence with a machine-recorded expectation: the
deliverable is still the **C function’s** port. A fix that reads a seed, a
step index, a coordinate or an RNG index is reverted.

## One bounded unit

One C function / tight helper cluster, ported from the C body in the brief:
preserve short-circuit, RNG, list, ownership, mutation and integer semantics
(runbook §7). Cite C in JS. Generated tables only via checked-in extractors.
Target **80–400** lines of C-faithful JS; below ~40 insertions on a
non-Must-fix port is a failed density handoff unless C is that small.
Consecutive Open rows of the **same** C `file.c:function` may ship together
iff every C callee is live, a C-matched clone, or named omitted in this
commit (no stub in a live arm). Must-fix stays one item, alone. The
supervisor reverts if `js/` insertions exceed 600 or `js/` files exceed 10.
Remove DIAG/FORCE, seed names, recorded coords, raw RNG-index gates; never
edit frozen `isaac64`/`terminal`/`storage` or add to `fastforward.js`.
If an extension of the cluster keeps regressing the fortress after two
fixes, revert it, name it in the map, queue it as its own Open row, and
ship the verified core. Port C control flow, never a screen side effect
(no grid snapshot/restore to keep a tty leftover — D-1831).

## Verify (1 call)

    node scripts/verify.mjs --fn <C function>

Syntax on changed files · Rule #2 / DIAG / seed-gate scan of the diff ·
`hidden-proxy verify <fn>` (every corpus session blocked on that function
must PASS or move to a **later** owner; NO MOVEMENT or REGRESSION is a
failed port) · green gate + strict per session · cohort · full `sessions`
automatically when a shared file changed. Paste its last lines into the
D-log **Verify** bullet. Hand probes are for arms no corpus session reaches;
keep them under 30 lines and delete them before finishing.

On a cohort/full FAIL it also prints every failing session's first
divergence (step, row, owner, C vs JS row): **triage them all** — group by
(row/region, owner), fix each cause once, re-run once — never one session
per round. `note hidden … no corpus session is blocked` is **not** a corpus
PASS: if the queue row cited N corpus blocks, re-run with
`--base <sha the row was queued at>` and paste **that** tail. A D-log that
says "PASS hidden" for a vacuous check is a false claim (D-1831).

## Durable handoff (1 hand-written entry, then 1 call)

Write **one** `## D-NNNN — title` entry at the top of `docs/DIVERGENCE-LOG.md`
with the standard bullets (Status · Symptom · C locus · JS was · Fix · JS ·
Verify · Named omissions · Next). Edit the **one** `c-js-map/*.md` section
(edit tool, not heredocs). Mark the queue row `- [x] … **Addressed:** D-NNNN`.
Then:

    node scripts/finish-iteration.mjs --commit

It generates the index row, the journal crumb, the `CURRENT.md` recent
block and ranges, the `NOTES.md` landmark, stamps the cited review, backfills
missing short hashes, archives the queue row, refills nothing, runs the cap
check, commits with a message built from your entry, and pushes. Do not
hand-edit those generated blocks. Update `CURRENT.md` **primary objective**
and `NOTES.md` **Active** yourself only when the objective or a live
hypothesis changed. If `check-hot-docs` reports REFILL, append Open rows
from `node scripts/hidden-proxy.mjs queue` first, then `PORT-GAP-HELDOUT.md`
Tier A/B, then `PORT-GAP-TOP30.md`, one C family per line, to ~12.

**Public score every 10 iterations** (`n % 10 == 0`) is the audit iter:
review + `node frozen/ps_test_runner.mjs sessions` + `hidden-proxy score`,
not a port iter.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic,
whole-program transpile/WASM as the scored port. Do not edit authority docs
(Constitution, runbook, playbook, API/phases/strategy, Cursor rules, loop
scripts/prompt), `frozen/**`, `sessions/**`, upstream C/patches, or frozen JS
contracts. Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit iterations
may, on REJECT). Do not write `0` to it, do not `git add` it, no
`git reset --hard` / `git clean`, no force-push, no amend of pushed commits.
After two falsifications, reconstruct the C path or pivot — do not spin.
