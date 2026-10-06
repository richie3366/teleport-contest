You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code
and one accurate D-log entry are. Tool calls are the cost; each step below
is one call unless it says otherwise.

**Cliff phase (Constitution §10.18, 2026-10-06):** held-out is 16/44, RNG
34.8 %, screens 64.1 % and has not moved while the ledger picker ran dry.
The local corpus (953 C-recorded sessions in the held-out genre) fails
212 times; the first divergence of each failing session is attributed to a
C function. You ship **one cliff**: the top owner of the generated
**Open — cliffs** block (ranked by RNG lost after the divergence), ported
whole, with **movement** on its probe sessions. Public 44/44 and the
corpus PASS set are the regression fortress (`verify` must end REACH-OK).

## Read first (≤12k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10.18 (skim rest).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective.
4. **`docs/LOOP-QUEUE.md`** Cliff-phase block, first **Must-fix** `- [ ]`
   if any, then the **Open — cliffs** head. Skip Parked and Deferred.
5. `docs/NOTES.md` — live hypothesis / don't-recheck only.
6. `docs/HIDDEN-PROXY.md` §3 — verify, movement and REACH semantics.

**Do not read:** `docs/archive/**` (except the one parked row a queue row
points at), full `DIVERGENCE-LOG.md`, `PORTING-STRATEGY.md`, full journal.
Use `DIVERGENCE-INDEX.md` + **one** `## D-NNNN` entry (the row's
`history:` tag names it — read it so you do not re-port the same arm).

**HARD — Contest Rule #2:** scored `js/` must run as plain ESM in **Node and
Chrome**. No `fs`/`path`/`url`/`node:*`, no `readFileSync`. Persist only via
`storage.js` VFS; embed dat texts in `js/generated/`.

## Preflight (2 calls)

1. `git status --short` — shared dirty tree; never reset/checkout others' work.
2. `node scripts/verify.mjs --no-cohort` — green gate + strict. FAIL before
   you changed anything → journal and stop, no feature work.

## Pick and orient (2 calls)

Pop the first unchecked **Must-fix** row (ships **alone**). Otherwise the
**Open — cliffs** head. Then:

    node scripts/hidden-proxy.mjs show <first probe session id>   # recipe, first divergence, cEntry/jsEntry, cMsgOwners, differing row, replay command
    node scripts/brief.mjs <owner>                                 # C body + every C call site, JS body, ledger row, D-rows, the corpus rows blocked on it

Read the **whole** C body in the brief output. `sym.mjs` / `csym.mjs` /
`map.mjs` are one call each — no `grep`/`cat` of whole modules.
`imports.mjs --can A.js B.js Name` before any new cross-module import.

**Owner vs writer.** The owner is where C and JS first disagree. When the
row's tag is `parked: SYMPTOM/MISATTRIBUTED/DIAGNOSED`, or the JS draw
(`jsEntry`) comes from a different function than the C draw, the port is
the **writer**: the function whose state the owner read (the `jsOwner`
function, the message owner in `cMsgOwners`, the writer the park names).
Never re-port a symptom owner that the park already proved faithful. If
no writer can be named from `show` + `brief`, the deliverable is the
owner's `[measure]` row (Measurements section; or write one): the one
C-side measurement that names it (`geom-probe.mjs <id> --step N`, temp C
dump at the cited locus, recorder screen) — no `js/` in that commit.

**Already whole (≤3 calls, never the iteration).** Brief shows the C body
complete in JS under this or split names → `ledger.mjs set <fn> ported
--note "stale: …"`, and the cliff is a writer problem: go back to `show`.

A cliff row names **corpus sessions** (`scen-*` = held-out genre) with a
machine-recorded expectation: the deliverable is the **C function's** port.
A fix that reads a seed, step, coordinate or RNG index is reverted.

## One bounded unit: the cliff, the function whole

Port the C body in its brief **entirely**, in C order: every `case`, every
guarded arm, every callee (import the live export — `sym.mjs` — or port it
in this commit, or name it in Named omissions with its C line), every C
caller wired (brief callers table → JS `file:line` each). Preserve
short-circuit, RNG, list, ownership, mutation and integer semantics
(runbook §7). Cite C in JS. Prefer **restart** of a thin JS body over
patching it; keep the export name and signature so callers stay wired.
Generated tables only via checked-in extractors. A same-C-file coverage
or missing-arm row may ride along; nothing from another C file does.
Remove DIAG/FORCE, seed names, recorded coords, raw RNG-index gates; never
edit frozen `isaac64`/`terminal`/`storage` or add to `fastforward.js`.
Port C control flow, never a screen side effect (no grid snapshot/restore
— D-1831). Supervisor caps: **15000** `js/` insertions / **80** files (a
cliff is normally one function family, far below).

**Callers, not just callees.** For every C call site in the brief, the
D-log names the JS site now wired (file:line) or the named omission.

## Verify (1 call, maybe 2)

    node scripts/verify.mjs --fn <owner-or-writer>[,<companion>]

`hidden-proxy verify <fn>` re-runs every session blocked on `<fn>` in the
**committed** board: each must **PASS or move to a strictly later step /
later owner** — that is movement. **NO MOVEMENT** means the arm is still
wrong: fix once more; if still NO MOVEMENT, stop patching and **measure C**
(playbook §7) in this iteration — the measurement is the deliverable
(`[measure]` row + park with the probe command), not a third patch.
**REACH** re-runs every baseline-PASS session that executes `<fn>`: any
PASS→FAIL is a bug you just wrote — fix the port, never the session, never
"name" it. Then syntax · Rule #2 / DIAG / seed-gate scan · green + strict ·
cohort · full `sessions` when a shared file changed. Paste the tail into
the D-log **Verify** bullet. If a row was built from an older board, pass
`--base <that sha>`.

## Durable handoff (1 hand-written entry, then 1 call)

Write **one** `## D-NNNN — title` entry atop `docs/DIVERGENCE-LOG.md`
(Status · Symptom · C locus · JS was · Fix · JS · Callers · Verify · Named
omissions · **Ledger** · Next). `- **Ledger:** fn ported|partial|split
js=a.js:x+b.js:y|by-design|audited` — one item per C function whose JS
changed (`partial` when Named omissions names missing C). **Movement** goes
in Verify as the `verify <fn>: N PASS, M moved, K no-movement` line. Mark a
Must-fix row `- [x] … **Addressed:** D-NNNN`. Then:

    node scripts/finish-iteration.mjs --commit

It **fails closed** on a new JS body under an undeclared open/partial C
name. It writes the ledger rows, regenerates both Open blocks (cliffs from
the committed board, coverage from the ledger), then index row, journal
crumb, `CURRENT.md` recent block, `NOTES.md` landmark, review stamp, hash
backfill, queue archive, cap check, commit and push (do not hand-edit those
blocks). Update `CURRENT.md` **primary objective** / `NOTES.md` **Active**
only when they changed.

**Refill: none.** Both Open blocks are generated; hand-written rows are
Must-fix only (JS throw / worker hang / corpus or public PASS→FAIL /
review-named C-wrong). A ledger omit or note that disagrees with the live
body is one `ledger.mjs set` inside this iteration — never a row, never an
iteration. If both blocks are empty after `check-hot-docs --fix`, the
corpus is saturated: journal it and stop; the audit grows the corpus.

**Every 10th iteration** (`n % 10 == 0`) is the audit iter (sampled review
+ full suite + **full** scoreboard rescore + leaderboard + corpus growth
when the worst family is ≥ 85 % PASS), not a port iter.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic,
whole-program transpile/WASM as the scored port. Do not edit authority docs
(Constitution, runbook, playbook, API/phases/strategy, Cursor rules, loop
scripts/prompt), `frozen/**`, `sessions/**`, upstream C/patches, or frozen JS
contracts. Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit may, on
REJECT) nor `0`; do not `git add` it. No `git reset --hard` / `git clean`,
force-push, or amend of pushed commits. After two NO MOVEMENT results, or
~40 calls with no C-side measurement, measure C or park — do not spin.
No iteration whose only output is ledger text, a re-audit of a function
already `audited`, or a campaign step on a path no corpus session reaches.
