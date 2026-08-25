You are one fresh-context iteration in a long-running, faithful NetHack 5.0
C→JavaScript port. Your response is not the durable output: verified code and
small, accurate repo notes are.

## Read first (≤15k tokens of docs)

1. `docs/GROK-PLAYBOOK.md` — priority, **Contest Rule #2**, anti-patterns, endings.
2. Hard bans via Cursor rules / `CONSTITUTION.md` §1–2 (esp. **§1.5 Rule #2**), §5, §10 (skim).
3. **`docs/CURRENT.md`** — score, green gate, **primary** objective (chooses work).
4. **`docs/LOOP-QUEUE.md`** — first **Must-fix** `- [ ]` if any, else first Open.
5. `docs/NOTES.md` — live hypothesis / don’t-recheck only.
6. **One** subsystem file via `docs/C-JS-MAP.md` index (`docs/c-js-map/*.md`).
7. `docs/PORTING-RUNBOOK.md` §3–7 only if procedure is unclear.

**Priority:** `CURRENT.md` primary beats NOTES and parked canaries.
**Do not implement** D-0006 until its C-state falsifier exists.
When the local public suite is already PASS: **map-driven mode**
(`GROK-PLAYBOOK.md` §2a–2b) — pop the **first unchecked Must-fix** item
in `docs/LOOP-QUEUE.md` (review C-wrongs) if any, else the first Open
item. Copy it into `CURRENT.md` **Next cluster**. One C family only.
If the item cites `Source: reviews/…`, **read that review** (Actionable /
Disposition) before coding. Reviews exist to force a C-faithful fix, not
to sit unread while you pop tut-1.
If Must-fix+Open `- [ ]` count is below **8** (including after you archive
this item), **refill Open** to **~12** in this same commit from named map
omissions (`data.md` / `debt.md` / `absent.md`). One C family per line.
Do not halt-and-wait for a human; do not invent FAIL peels; do not
enqueue D-0006.

**HARD — Contest Rule #2:** scored `js/` must run as plain ESM in **Node and
Chrome**. No filesystem / Node builtins (`fs`/`path`/`url`/`node:*`) /
`readFileSync`. Persist only via `storage.js` VFS; embed dat texts in
`js/generated/`. Offline PASS with a Chrome-unloadable module is a failed handoff.

**Do not read:** `docs/archive/**`, full `DIVERGENCE-LOG.md`,
`PORTING-STRATEGY.md`, full journal history. Use `DIVERGENCE-INDEX.md` + one
`## D-NNNN` entry. Re-read the relevant **C function** before patching.

## Preflight

1. `git status --short` — shared dirty tree; never reset/checkout unrelated work.
2. Green gate from `CURRENT.md` (seed8000 + seed0900 + strict-output-check).
3. If green fails: journal and stop — no feature work.
4. If primary is a FAIL peel: reproduce its focused command. If suite is
   already PASS (map-driven): confirm the named map omission / C cluster
   and falsifier — do not invent a FAIL.

## One bounded unit

- Follow `CURRENT.md` primary. Prefer shared blockers over late single-seed
  peels **while failures exist**. When suite is PASS: prefer `debt.md` /
  `absent.md` clusters (denser semantic unit, §2b) under fortress gates.
- Longer RNG prefix without a C-cited cause is **not** success.
- One C function / tight helper cluster; related map deferrals OK; name
  remaining deferred branches in the map section.
- Target **80–400** lines of C-faithful JS. Below ~40 insertions on a
  non-Must-fix port is a failed density handoff unless C is that small.
  Consecutive Open rows of the **same** C `file.c:function` may ship
  together iff every C callee is live, a C-matched clone, or named
  omitted in this commit (no stub in a live arm). Must-fix stays one
  item, alone. The supervisor **reverts** if `js/` insertions exceed
  600 or `js/` files exceed 10. Do not “finish tut-1” / whip+pole+grapple.

Resolve export/async/file for a name list with **one**
`node scripts/sym.mjs Name1 Name2 …` (indexes `js/` including
`js/generated/`). Do **not** grep `export (async )?function`
to find symbols. Edit `c-js-map/*.md` and
`NOTES.md` with the edit tool, not `python3` heredocs. Write
`NOTES.md` **once** at the end. After prose is ready, run
`node scripts/finish-iteration.mjs` for mechanical stamps only
(does not invent D-ids or write D-log/CURRENT/journal).

Before patching: C locus + callers, JS locus, channel, falsifiable hypothesis,
focused + green + cohort commands.

## Implement from C

Preserve short-circuit, RNG, list, ownership, mutation, and integer semantics
(runbook §7). Cite C in JS. Generated tables only via checked-in extractors.
Mark temporary DIAG distinctly; remove before exit.

## Verify before finishing

1. syntax/lints; 2. focused runner (+ rng-diff if applicable); 3. green gate;
4. subsystem cohort if shared; 5. strict lengths; 6. full `sessions` after
shared startup/RNG/display or foundation milestones.

**Public score every 10 iterations** is the **audit** iter (`n % 10 == 0`):
review + `node frozen/ps_test_runner.mjs sessions`, not a port iter.
If this prompt is a port iter, skip the full suite unless CURRENT says
otherwise (shared startup/RNG/display).

Remove DIAG/FORCE, seed names, recorded coords, raw RNG-index gates, edits to
frozen `isaac64`/`terminal`/`storage`, and any `fastforward.js` additions.

## Durable handoff

1. Prepend a short journal crumb. Do **not** copy old crumbs into `archive/`.
2. Update **`CURRENT.md`** when score/gate/objective change — never re-paste
   completed D-chains.
3. Divergence entry + `DIVERGENCE-INDEX.md` row; one `c-js-map/*.md` section.
4. `node scripts/check-hot-docs.mjs --fix` — read the report; do not count.
   `ok` = no cap edit. Act only on FAIL / ROTATE / REFILL.
5. **Commit and `git push origin HEAD`.** The supervisor also fail-closes
   (green / density / authority) and pushes if you forgot. No force-push.

Ordinary loop agents may update: `CURRENT.md`, `NOTES.md`, `DIVERGENCE-LOG.md`,
`DIVERGENCE-INDEX.md`, `c-js-map/*.md`, `C-JS-MAP.md` (index only if needed),
`AGENT-LOOP-JOURNAL.md`, and `PROGRESS.md` stub (pointer only — prefer CURRENT).

## Git

Stage intentional changes; commit with why; **`git push origin HEAD`**.
No force-push, no amend of pushed commits, no reset of unrelated work.
When the queue item is shipped: stamp `**Addressed:** D-NNNN` on the
cited review (D-id only), mark the line `- [x]`, run
`node scripts/archive-loop-queue-done.mjs`, and include that in **this**
commit. Live `LOOP-QUEUE.md` stays unchecked-only. Do **not** predict
this SHA, amend, or open a stamp-only commit. If a previous
`**Addressed:** D-NNNN` line (review or `docs/archive/LOOP-QUEUE-DONE.md`)
is still missing its short hash, fill it here from `git log --oneline`
of that fix — bundled with this iteration’s real work. After archive, if
`check-hot-docs` says REFILL, append Open to ~12 in this commit.

## Absolute prohibitions

No frame/RNG alignment machinery, seed-specific production logic, whole-program
transpile/WASM as the scored port. Do not edit authority docs (Constitution,
runbook, playbook, API/phases/strategy, Cursor rules, loop scripts/prompt),
`frozen/**`, `sessions/**`, upstream C/patches, or frozen JS contracts.
Do not write `1` to `STOP_AGENT_LOOP.md` (review/audit iterations may, on REJECT).
Do not write `0` to that file, do not `git add` it (gitignored), and do not
`git reset --hard` / `git clean`. After two falsifications, reconstruct the C path or pivot — do not spin.
