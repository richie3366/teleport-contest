You are one fresh-context iteration of the faithful NetHack 5.0
C→JavaScript port, on branch **`experimental`**, in the **re-read pass**
(Constitution §10.22). Your response is not the durable output: verified
code, ledger stamps and one accurate D-log entry are. Tool calls are the
cost; each step below is one call unless it says otherwise.

**Why this mode.** Every board session passes, and fresh cohorts fail 31×
less per screen than the judge (0.026 vs 0.80 failing sessions per 1,000
screens), so sampling no longer finds what held-out loses. What is left
sits in arms of functions the ledger calls `ported`: 163 behaviour-type
`named omit` comments are inside such functions. This pass reads every
live function once, one C file at a time, and fixes what differs from C.

## Read first (≤10k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — **Contest Rule #2**, anti-patterns.
2. `CONSTITUTION.md` §1.5 and §10.22 (this mode; on this branch it replaces
   the §10.18–21 picker and grow trigger).
3. `docs/CURRENT.md` — score, green gate, objective, **Next**.
4. `docs/REREAD-PASS.md` §3–§4 — the contract and the margin notes.

Do not read `docs/archive/**`, the full `DIVERGENCE-LOG.md` or the journal.

**HARD — Contest Rule #2:** scored `js/` runs as plain ESM in **Node and
Chrome**: no `fs`/`path`/`url`/`node:*`, no `readFileSync`; persist only
via `storage.js`; dat texts live in `js/generated/`.

## Preflight (2 calls)

1. `git status --short` — never reset or check out others' work.
2. `node scripts/verify.mjs --no-cohort` — FAIL before you changed anything
   → journal it and stop.

## Pick (1 call)

1. An unchecked **Must-fix** row in `docs/LOOP-QUEUE.md`, else the head of
   the generated **Open — cliffs** block: work it under
   `scripts/agent-port-loop.prompt.md`, and only it.
2. `CURRENT.md` **Next** names a deferral-flag unit: that unit (below).
3. Otherwise the next slice:

       node scripts/ledger.mjs batch --reread --write

   One C file in C order, ~1,000 C code lines. Per function: kind
   (`reread` live, `partial`, `open` never ported, `declare` never
   declared), C range, status, heat (sessions that run it), JS body, and
   margin notes; the slice's local copies are listed once at the top. It
   writes `.cache/batch.json`, which finish-iteration reconciles.

## Re-read, function by function, in C order

For each manifest function read the **whole** C body and the **whole** JS
body (`node scripts/brief.mjs <fn>`, or `csym.mjs` + `sym.mjs`; never a
grep of a module), then compare:

- **arms and guards** — every `if`/`case`, short-circuit and early return;
  youprop.h macros are a family (`Blind` ≠ `Blinded`); uprops are not flat
  mirrors (`u.Blind`, `u.HBlind`, `u.EJumping` are wrong both ways);
- **callees** — every C call made, at C's point, to the live export, never
  a local copy (`copies` lines: import the export);
- **state** — every write lands in C's home field (no phantom or `_twin`
  globals, no field nothing reads); integer, list and ownership semantics;
- **output** — message text and argument shaping (articles, `noit_`
  pronouns, plurals), `--More--`/topline and display calls, RNG calls in
  order;
- **order** — what C does inline happens before the next statement: an
  async callee is awaited in C order (`float`); a deferral flag (`defer`)
  is a known gap — list its site in Next, do not convert it here.

Work every margin note. A `mark` is a gap the code admits: port it now when
it can ship, or say why it cannot (by-design, Rule #2). A `callees` name is
wired elsewhere, renamed, or missing (port the call). `dups`: another file
carries this function's body; make it call this one.

Fix what differs **C-literally**, citing C lines in JS. Restart a body
rather than patching arms when most of it differs. Keep export names and
signatures. A callee in another C file is fixed only when this function's
C needs it and it is wrong for this caller; it then goes in Ledger too.
No seed, step, coordinate or RNG-index reads.

Budget: the slice. What you cannot finish goes to `Left open:` with the
reason; it comes back in the next slice. Never declare a function you did
not read whole against C.

## Deferral-flag unit (only when CURRENT.md Next names one)

`node scripts/ledger.mjs defer` lists every site of the flag. Remove the
JS-only deferral: do the work at C's point (async, awaited, C order) and
delete every set/drain pair of that flag. One flag per iteration; Ledger
names every function whose JS changed.

## Verify

    node scripts/verify.mjs --fn <every function whose JS changed>

REACH re-runs every baseline-PASS corpus session that executes them; any
PASS→FAIL is a bug you wrote: fix the port, never the session. There is
no movement check (no cliff). For a changed function no corpus session
executes, write `REACH 0: C-literal, unverified` in Verify. A shared file
changed → full `node frozen/ps_test_runner.mjs sessions`. Paste the tails.

## Durable handoff

One entry atop `docs/DIVERGENCE-LOG.md`. **D-ids on this branch start at
D-6001** (main keeps D-42xx). Title: `## D-NNNN — Re-read <file.c>
:<first>–<last>: K fixed, M whole`. Bullets: Status · **Re-read** (one
line per manifest function: `` `fn` — whole `` or `` `fn` — fixed: <what
C does> ``) · C locus · Fix · JS · Callers · Verify · Named omissions ·
**Ledger** · Left open · Next. The Ledger bullet names every manifest
function not left open: `fn audited` (already whole), `fn ported` (fixed,
now whole), `fn partial` (only omissions that cannot ship remain, named in
Named omissions), `fn split js=a.js:x+b.js:y`, `fn by-design`. Then:

    node scripts/finish-iteration.mjs --commit

It fails closed unless every manifest function is in Ledger or Left open,
stamps each declared one `audited D-NNNN` (§10.22), writes the index row,
journal crumb, CURRENT recent block and NOTES landmark, then commits and
pushes.

**No grows in this mode.** A short cliffs block is not a grow trigger;
the fresh cohort and audits run when a human asks for them.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific logic, transpile/WASM. Do
not edit authority docs (Constitution, runbook, playbook,
`REREAD-PASS.md`, API/phases/strategy, Cursor rules, loop scripts and
prompts), `frozen/**`, `sessions/**`, upstream C/patches or frozen JS
contracts. Never delete a `named omit` comment without porting the arm or
recording why it cannot ship. No `git reset --hard` / `git clean`,
force-push, or amend of pushed commits. Do not write `STOP_AGENT_LOOP.md`.
After ~40 calls on one function with no decision, leave it open with what
you found and move on.
