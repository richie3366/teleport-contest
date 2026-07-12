# Grok playbook — faithful porting in fresh context

For **autonomous loop agents** (`scripts/agent-port-loop.sh`) and any
fresh-context model continuing this repo. Read this **first**, every iteration.
It is operational guidance, not architecture law — `CONSTITUTION.md` and
`PORTING-RUNBOOK.md` still win on conflicts.

**Goal:** port pinned C + contest patches into readable JS. Sessions measure
progress; they are **not** the specification. A longer RNG prefix from a
trace-shaped hack is failure, not success.

---

## 1. Read order (time-boxed)

Spend context on C and verification, not essays.

| Order | Doc | What to extract | Skip |
|------:|-----|-----------------|------|
| 1 | **This file** | priority, anti-patterns, endings | — |
| 2 | `CONSTITUTION.md` | hard bans only (§1–2, §5, §10) | Lua essay unless touching Lua |
| 3 | `PROGRESS.md` | green gate, **primary objective**, focused command | historical baselines |
| 4 | `NOTES.md` | live hypothesis + dead ends | resolved history |
| 5 | `C-JS-MAP.md` | rows for the subsystem you will edit | full audit table |
| 6 | `PORTING-RUNBOOK.md` | §3–7 only if procedure is unclear | strategy rationale |

**Do not read by default:** `PORTING-STRATEGY.md`, full `AGENT-LOOP-JOURNAL.md`,
full `DIVERGENCE-LOG.md` (use index + one entry if needed).

---

## 2. Objective priority (non-negotiable)

When sources disagree about *what to work on*, use this order:

1. **`PROGRESS.md` → Primary foundation objective** (currently shared startup /
   role initialization blocking most sessions).
2. **`PROGRESS.md` → Deep canary** only when the primary slice is complete,
   blocked on a **named prerequisite you cannot port this iteration**, or a
   human/auditor moved it to primary.
3. **`NOTES.md` / `DIVERGENCE-LOG.md` → Parked items** — diagnose only; **do
   not implement** until the listed falsifier exists.

**Parked (do not code):** `DIVERGENCE-LOG.md` **D-0006** (seed1800 pet movement).
`rng-diff` alone cannot prove C `gg`/`appr` or the `mfndpos` candidate set. Until
a recorder/instrumentation command exists, record ideas in the journal and work
the foundation frontier.

**Why:** 33/44 public sessions still die at `u_init_role: role not ported`.
Fixing one late Tourist RNG index does not advance the port; fixing Rogue/human
init advances dozens of scenarios from real C.

---

## 3. What “faithful” means here

### Good (ship these)

| Pattern | Example from this repo |
|---------|------------------------|
| Cite C, port branch order | `throwit` stops on `!ZAP_POS` like `bhit` (D-0005) |
| Fix shared data semantics | `mkgold` merges into existing gold (D-0002) |
| Remove invented fallback | `apport` from real `ACURR(A_CHA)` clamp, not `\|\| 10` (D-0004) |
| Input-boundary fix | `--More--` owns keys before combat RNG (D-0001) |
| Name omissions | `C-JS-MAP.md`: `partial` + deferred branches, not “seed1800 only” |
| Small diff, one cluster | `dogmove.js` `can_reach_location` + squared `udist` together |

### Bad (delete on sight)

| Anti-pattern | Why it is cheating |
|--------------|-------------------|
| `if (getRngLog().length === 2417)` | Trace index is not C semantics |
| `if (gg.gx === 47 && gg.gy === 18)` in production | Recorded coordinate, not a rule |
| `appr = 0` to match one `rn2(1)` | Symptom alignment without C proof |
| `can_carry` returns 0 for dart because seed needs it | Contradicted by earlier C APPORT |
| Tourist inventory copied for Rogue “temporarily” | Role-specific fake, not `u_init.c` |
| `// not needed for seed8000` as design | Omission must live in `C-JS-MAP.md` |
| New `fastforward.js` burns | Constitution §5 — delete-only |
| PASS without `strict-output-check` | Trailing RNG/screens can hide bugs |

**Rule of thumb:** if you cannot explain the change by pointing at a C `if`,
call order, struct field, or macro expansion, it is probably trace tailoring.

---

## 4. Work packet (fill in before editing)

Copy into your journal entry or a scratch comment you delete before exit:

```text
Objective:        <from PROGRESS primary, not NOTES parked item>
C locus:          nethack-c/upstream/src/<file>.c:<function>
JS locus:         js/<file>.js:<function>
Symptom channel:  throw | state | RNG | screen | cursor
Hypothesis:       <one falsifiable sentence>
C reads done:     <function body + N callers + 1 branch predicate>
Branch envelope:  <which cases this iteration covers; what is deferred>
Falsifier:        <exact command + expected observation if hypothesis wrong>
Focused verify:   <runner + rng-diff if single-segment>
Green gate:       seed8000 + seed0900 + strict-output-check
Cohort:           <distinct session/role that shares this code differently>
```

**Minimum C read:** function body + immediate callers + the `if` that guards the
diverging RNG. Do not patch from `rng-diff` output alone.

---

## 5. Foundation slice: Rogue + human init (current primary)

Bounded unit from `PROGRESS.md` — execute as C port, not Tourist remix.

1. **Identity data:** `js/roles.js` must use C monster-table IDs (`PM_ROGUE`,
   `PM_HUMAN`, …), not role/race **array indexes**. Known bug: JS used index `8`
   where C uses `PM_ROGUE=338`.
2. **C sources:** `role.c` entries; `u_init.c` `u_init_role` / `u_init_race` for
   Rogue + human noninteractive path (inventory `trobj`, skills, attrs,
   substitutions, knowledge).
3. **JS targets:** `js/roles.js`, `js/u_init.js`, generated/extracted tables as
   needed — deterministic extractors only.
4. **Forbidden:** `throw new Error('role not ported')` replaced by Tourist-shaped
   data; hardcoded Tourist `trobj` for Rogue.
5. **Focused cohort:**
   `seed1500-rogue-explore-move`, `seed0013-rogue-friday13-combat`
6. **Green gate:** always after shared startup edits.

When this slice passes focused + green, update `C-JS-MAP.md` startup rows and
`PROGRESS.md` — then pick the next role/race from the runbook target list.

---

## 6. Verification matrix

| You changed | Minimum before handoff |
|-------------|------------------------|
| One function, narrow path | focused session runner; `rng-diff` only if **segment 0** and RNG-related |
| Shared startup/RNG/display | green gate + **strict-output-check** + focused cohort |
| `roles.js` / `u_init.js` / `mkobj` / `mon` | cohort above + full `node frozen/ps_test_runner.mjs sessions` before claiming milestone |
| Display/cursor/menus | green + viewer smoke if available |

**`rng-diff` limits:** segment 0 only; first mismatch is a clue, not proof of fix.
**`PASS` limits:** `ps_test_runner.mjs` often exits **0 even when sessions fail**.
Inspect `__RESULTS_JSON__` / per-session PASS lines, not only `$?`. Always run
`scripts/strict-output-check.mjs` on green sessions — the runner ignores trailing
RNG/screens/cursors beyond the canonical C length.

---

## 7. Iteration must end as exactly one of

1. **Verified faithful change** — C cited, gates pass, DIAG removed, docs updated.
2. **Falsified hypothesis** — no production change (or revert your experiment),
   dead end in `NOTES.md`, next step in journal.
3. **Prerequisite identified** — cannot be faithful this iteration; make it the
   next objective in `PROGRESS.md` / `NOTES.md` with a concrete command.

**Not acceptable:** unverified hack, “prefix moved” without C cause, or ending with
DIAG/FORCE still in `js/`.

---

## 8. When stuck (after two falsifications)

Stop patching the symptom. Pick one:

- Reconstruct the **full C call path** from divergence to the differing branch.
- Inspect **state** (coordinates, list order, flags, prompt), not only RNG names.
- Check **input boundaries** (`--More--`, menus, 0-RNG keys) before movement logic.
- Port a **tighter prerequisite** (helper, struct field, extractor field).
- **Park** the item in `DIVERGENCE-LOG.md` and return to the primary objective.

Do not spin on the same theory across iterations — that burns loop time and
contaminates `NOTES.md`.

---

## 9. Durable memory (your context dies)

| Fact type | Owner |
|-----------|-------|
| Unresolved hypothesis / dead end | `NOTES.md` (tiny) |
| Proved cause / rejected theory | `DIVERGENCE-LOG.md` |
| Module status / omissions | `C-JS-MAP.md` |
| Scores / active objective | `PROGRESS.md` |
| Iteration audit | append `AGENT-LOOP-JOURNAL.md` |

Loop agents may **not** edit Constitution, runbook, **this playbook**, strategy,
loop scripts, `sessions/**`, `frozen/**`, or upstream C. Propose process fixes
in the journal for human/auditor review.

---

## 10. Grok-specific pitfalls

Models in this loop tend to:

- **Chase visible metrics** — prefer seed1800’s “2417/2458” over 33 role throws.
  Resist: read §2.
- **Ship confident partials** — one branch with TODO stubs. Name every deferral
  in `C-JS-MAP.md`; do not mark `ported`.
- **Over-edit** — touch five modules when one C function suffices. One iteration
  ≈ one semantic unit.
- **Explain instead of port** — long comments without C logic. Delete comment;
  port the `if`.
- **Confuse observation with rule** — “C pet at (48,17)” is evidence from one
  trace, not JS control flow.
- **Skip cohort** — Tourist green is not proof for Rogue/orc/combat paths.

Prefer **delete wrong JS + re-port from C** over stacking the fifth shim (runbook
§11). In unattended loop, **propose** subsystem restart in the journal; do not
delete large modules without human checkpoint.

---

## 10. End each loop iteration with git

After docs handoff and DIAG cleanup:

1. Stage intentional changes (not `.agent-port-loop-logs/` or secrets).
2. Commit with a why-focused message (C locus / D-ID / verification).
3. `git push origin HEAD` (no `--force`).

If push fails, journal the error. Repo history is the durable checkpoint
between amnesiac agents.

---

## 11. Quick commands

```bash
# Green gate (every iteration touching shared code)
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json

# Current foundation focus
node frozen/ps_test_runner.mjs \
  sessions/seed1500-rogue-explore-move.session.json \
  sessions/seed0013-rogue-friday13-combat.session.json

# Deep canary (diagnose only while parked — do not “fix” without C state)
node scripts/rng-diff.mjs sessions/seed1800-tourist-eat-throw.session.json

# Shared-blocker survey
node frozen/ps_test_runner.mjs sessions 2>&1 | rg 'role not ported|PASS|FAIL' | head -40
```

---

*When in doubt: read the C, port the C, verify broadly, write small notes for the
next amnesiac agent.*
