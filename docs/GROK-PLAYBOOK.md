# Grok playbook — faithful porting in fresh context

For **autonomous loop agents** (`scripts/agent-port-loop.sh`) and any
fresh-context model continuing this repo. Read this **first**, every iteration.
It is operational guidance, not architecture law — `CONSTITUTION.md` and
`PORTING-RUNBOOK.md` still win on conflicts.

**Goal:** port pinned C + contest patches into readable JS. Sessions measure
progress; they are **not** the specification. A longer RNG prefix from a
trace-shaped hack is failure, not success.

### Contest Rule #2 — HARD BAN (read every iteration)

Scored `js/` is **plain ESM**, runnable as-is in **Node 22+ and modern
Chrome**. No build step, WASM, network, **filesystem**, threads, or native
addons. Persist only via frozen `storage.js` VFS; keep everything else
in-process. **Never** add `import … from 'fs'|'path'|'url'|'os'|'node:*'`
or `readFileSync` to scored code. Embed dat/help (and similar) via
`js/generated/` extractors (D-0477). Node-only offline PASS while Chrome /
Session Viewer cannot load the module is a **failed handoff**.

---

## 1. Read order (time-boxed)

Spend context on C and verification, not essays. Target **≤10–15k tokens** of
docs before touching C.

| Order | Doc | What to extract | Skip |
|------:|-----|-----------------|------|
| 1 | **This file** | priority, **Rule #2**, anti-patterns, endings | — |
| 2 | Cursor rules / `CONSTITUTION.md` §1–2 (esp. §1.5 Rule #2), §5, §10 | hard bans only | full essays |
| 3 | **`CURRENT.md`** | score, green gate, **primary objective**, focused cmd | — |
| 4 | `NOTES.md` | live hypothesis + don’t-recheck | — |
| 5 | One `c-js-map/*.md` via `C-JS-MAP.md` index | rows for the subsystem you edit | other map files |
| 6 | `PORTING-RUNBOOK.md` §3–7 | only if procedure unclear | strategy rationale |

**Do not read by default:** `PORTING-STRATEGY.md`, `archive/**`, full
`DIVERGENCE-LOG.md`, full journal archive. Use `DIVERGENCE-INDEX.md` + **one**
`## D-NNNN` entry. Read only `AGENT-LOOP-JOURNAL.md` (tail), not archives.

**Always re-read the relevant C function** (body + callers + guarding `if`)
before patching. Smaller docs are not a substitute for C.

---

## 2. Objective priority (non-negotiable)

1. **`CURRENT.md` → Primary objective** (chooses work).
2. Deep canary only when primary is complete, blocked on a named prerequisite,
   or a human moved it to primary.
3. **Parked** items in `CURRENT.md` / `DIVERGENCE-INDEX.md` — diagnose only;
   **do not implement** until the listed falsifier exists.

**Parked (do not code):** **D-0006** (seed1800 pet movement) until C
state/candidate capture exists.

---

## 3. What “faithful” means here

### Good (ship these)

| Pattern | Example from this repo |
|---------|------------------------|
| Cite C, port branch order | `throwit` stops on `!ZAP_POS` like `bhit` (D-0005) |
| Fix shared data semantics | `mkgold` merges into existing gold (D-0002) |
| Remove invented fallback | `apport` from real `ACURR(A_CHA)` clamp, not `\|\| 10` (D-0004) |
| Input-boundary fix | `--More--` owns keys before combat RNG (D-0001) |
| Name omissions | `c-js-map/*.md`: `partial` + deferred branches |
| Small diff, one cluster | `dogmove.js` `can_reach_location` + squared `udist` |

### Bad (delete on sight)

| Anti-pattern | Why it is cheating |
|--------------|-------------------|
| `if (getRngLog().length === 2417)` | Trace index is not C semantics |
| `if (gg.gx === 47 && gg.gy === 18)` in production | Recorded coordinate, not a rule |
| `appr = 0` to match one `rn2(1)` | Symptom alignment without C proof |
| Seed-shaped inventory / role fakes | Not `u_init.c` |
| `// not needed for seed8000` as design | Omission must live in C-JS-MAP section |
| New `fastforward.js` burns | Constitution §5 — delete-only |
| PASS without `strict-output-check` | Trailing RNG/screens can hide bugs |
| `import` from `fs` / `path` / `url` / `node:*` | Contest Rule #2 — Chrome + judge both must load `js/` |
| Runtime `readFileSync` of `dat/*` | Embed via `js/generated/` (D-0477); VFS is storage only |

**Rule of thumb:** if you cannot explain the change by pointing at a C `if`,
call order, struct field, or macro expansion, it is probably trace tailoring.

---

## 4. Work packet (fill in before editing)

```text
Objective:        <from CURRENT.md primary>
C locus:          nethack-c/upstream/src/<file>.c:<function>
JS locus:         js/<file>.js:<function>
Symptom channel:  throw | state | RNG | screen | cursor
Hypothesis:       <one falsifiable sentence>
C reads done:     <function body + N callers + 1 branch predicate>
Branch envelope:  <covered this iteration; deferred>
Falsifier:        <exact command + expected observation if wrong>
Focused verify:   <runner + rng-diff if single-segment>
Green gate:       from CURRENT.md
Cohort:           <distinct session sharing this code>
```

**Minimum C read:** function body + immediate callers + the `if` that guards the
diverging RNG. Do not patch from `rng-diff` output alone.

---

## 5. Verification matrix

| You changed | Minimum before handoff |
|-------------|------------------------|
| One function, narrow path | focused session; `rng-diff` if segment 0 + RNG-related |
| Shared startup/RNG/display | green gate + **strict-output-check** + cohort |
| roles / u_init / mkobj / mon | cohort + full `sessions` before claiming milestone |
| Display/cursor/menus | green + viewer smoke if available |

**`rng-diff`:** segment 0 only; first mismatch is a clue, not proof.
**`PASS`:** inspect `__RESULTS_JSON__` / per-session lines — runner exit code
can be 0 when sessions fail. Always `strict-output-check` on green sessions.

---

## 6. Iteration must end as exactly one of

1. **Verified faithful change** — C cited, gates pass, DIAG removed, docs updated.
2. **Falsified hypothesis** — revert experiment if needed; dead end in `NOTES.md`.
3. **Prerequisite identified** — record as next objective in `CURRENT.md` with a command.

**Not acceptable:** unverified hack, “prefix moved” without C cause, DIAG left in `js/`.

---

## 7. When stuck (after two falsifications)

Stop patching the symptom. Reconstruct the C call path; inspect state/input
boundaries; port a tighter prerequisite; or park in the divergence log and
return to `CURRENT.md` primary. Do not spin on the same theory.

**Prefer a temp C dump at the cited locus** (compare to JS; revert after)
over another FORCE / topline patch peel when:

| Stuck on | Dump | Why |
|----------|------|-----|
| Geometry / flip / land / extends | `flip_level`, `place_lregion`, stairs, `dndest` | Screens/tty cursor misread as map (#1087 Y+1; #1092 FlipX sum80 — C already matched JS) |
| Keystream / `more` / `--More--` / wizard keys | `NEED_MORE`, topline, `WIN_STOP`, prompt, pending more at `hitmsg`/`unmul`/`yn` | JS may queue More that C already dismissed (#1127 More-behind; #1132 unmul more ate `^V`) |

Do not stack JS FORCE or WIN_STOP shims until C state at those loci is known.

---

## 8. Durable memory (your context dies)

| Fact type | Owner |
|-----------|-------|
| Score / green gate / primary objective | **`CURRENT.md`** (keep tiny; refresh Score every 5 loop iters via full `sessions`) |
| Unresolved hypothesis / dead end | `NOTES.md` (≤100 lines) |
| Proved cause / rejected theory | `DIVERGENCE-LOG.md` + index row |
| Module status / omissions | one `c-js-map/*.md` |
| Iteration audit | prepend `AGENT-LOOP-JOURNAL.md` (rotate into `archive/` when >15) |

Loop agents may **not** edit Constitution, runbook, **this playbook**, strategy,
loop scripts, `sessions/**`, `frozen/**`, or upstream C. Propose process fixes
in the journal for human/auditor review.

---

## 9. Grok-specific pitfalls

- Chase late-seed metrics over shared blockers — read §2 / `CURRENT.md`.
- Ship confident partials — name every deferral in the map section.
- Over-edit — one iteration ≈ one semantic unit.
- Confuse observation with rule — trace coords are evidence, not JS control flow.
- Infer C geometry from screens/`FORCE` success — dump C at the locus (§7).
- Patch topline/`WIN_STOP`/`NEED_MORE` without dumping C more-state (§7).
- Skip cohort — Tourist green ≠ Rogue/orc/combat proof.
- Prefer **delete wrong JS + re-port from C** over stacking shims.
- Reach for Node `fs` because “the judge is Node” — **Rule #2**; Chrome must load it too.

---

## 10. End each loop iteration with git

Stage intentional changes; commit with why (C locus / D-ID / verification);
`git push origin HEAD` (no `--force`). If push fails, journal the error.

---

## 11. Quick commands

```bash
# Hot-doc budget (optional sanity)
node scripts/check-hot-docs.mjs

# Green gate — exact commands also in CURRENT.md
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json

# Full public score (mandatory every 5 global loop iterations)
node frozen/ps_test_runner.mjs sessions
# Then update CURRENT.md Score from __RESULTS_JSON__ aggregates — not guesses.

# Shared-blocker survey
node frozen/ps_test_runner.mjs sessions 2>&1 | rg 'role not ported|PASS|FAIL' | head -40
```

---

*When in doubt: read the C, port the C, verify broadly, write small notes for the
next amnesiac agent.*
