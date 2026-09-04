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

Target **≤12k tokens** of docs before touching C.

| Order | Doc | What to extract | Skip |
|------:|-----|-----------------|------|
| 1 | **This file** | priority, **Rule #2**, anti-patterns, endings | — |
| 2 | Cursor rules / `CONSTITUTION.md` §1–2 (esp. §1.5 Rule #2), §5, §10 | hard bans only | full essays |
| 3 | **`CURRENT.md`** | score, green gate, **primary objective**, focused cmd | — |
| 4 | `NOTES.md` | live hypothesis + don’t-recheck | — |
| 5 | `node scripts/brief.mjs <cfn>` | C body + callers, JS body, map lines, D-rows, corpus rows — one call | paging map files, grepping for definitions |
| 6 | `HIDDEN-PROXY.md` §1–3 | what a corpus row is; verify semantics | the method essay |
| 7 | `PORTING-RUNBOOK.md` §3–7 | only if procedure unclear | strategy rationale |

**Do not read by default:** `PORTING-STRATEGY.md`, `archive/**`, full
`DIVERGENCE-LOG.md`, full journal archive. Use `DIVERGENCE-INDEX.md` + **one**
`## D-NNNN` entry. Read only `AGENT-LOOP-JOURNAL.md` (tail), not archives.

**Always re-read the relevant C function** (body + callers + guarding `if`)
before patching — `brief.mjs` / `csym.mjs fn --callers` fetch both in one call.

---

## 2. Objective priority (non-negotiable)

1. **`CURRENT.md` → Primary objective** (chooses work).
2. Deep canary only when primary is complete, blocked on a named prerequisite,
   or a human moved it to primary.
3. **Parked** items in `CURRENT.md` / `DIVERGENCE-INDEX.md` — diagnose only;
   **do not implement** until the listed falsifier exists.

**Parked (do not code):** **D-0006** (seed1800 pet movement) until C
state/candidate capture exists.

### 2a. After local public suite PASS (map-driven mode)

When `CURRENT.md` shows a clean local public suite (all sessions PASS),
treat that score as a **regression fortress**, not a work picker.

| Do | Do not |
|----|--------|
| Pop the queue row: level content (`PORT-GAP-HELDOUT.md`), a corpus first-diff owner (`hidden-proxy queue`), or a map omission | Invent FAIL peels, ALIGN/FORCE, or seed-shaped gates |
| A `hidden-corpus` / `private-sessions` first diff is a **C-vs-JS fact** with a recorded expectation; port the **owning C function** | Make a corpus session pass by reading a seed, step, coordinate or RNG index |
| Verify with `hidden-proxy verify <fn>`: blocked sessions PASS or move to a **later** owner | Call NO MOVEMENT a named omission, or chase public leaderboard / CDN drift in-loop |
| Keep green + cohort + cadence full `sessions` PASS | “Improve” already-matching public paths without a C citation |
| Pop `LOOP-QUEUE.md` **Must-fix** (written-review C-wrongs) before Open | Leave QUALITY-RISK reviews unread and keep map-dumping |
| Keep 8–12 open rows; refill from `hidden-proxy queue` / HELDOUT / map | Halt and wait for a human because the queue ran dry |

Sessions measure progress; they are **not** the specification. Local
signals for what the held-out 44 hit, in order: blank level content
(`PORT-GAP-HELDOUT.md`), corpus first-diff owners (`HIDDEN-PROXY.md`),
then map debt. Tagged restore: save-oracle probe.

### 2b. Iteration density (token vs quality)

Each fresh agent pays large fixed cost (docs, C read-in, verify,
journal). Prefer **fewer, denser** iterations once the suite is green.

| Too small (waste) | Right size | Too big (quality risk) |
|-------------------|------------|------------------------|
| One deferred `if` alone | One C function **or** tight caller/callee cluster | “Finish potions” / half of `mon.c` |
| Separate iters for sibling `switch` arms | Whole practical `switch` / role kit / item-class envelope | Unrelated subsystems in one commit |
| Docs-only then code next iter | Code + map update + verify in one handoff | Multiple independent hypotheses |

**Rule:** one falsifier, one C locus family, usually one JS module (or
two that already call each other). Related map deferrals in that
envelope may retire together. Target roughly **80–400 lines** of
C-faithful JS or one small-file restart. Below ~40 insertions on a
non-Must-fix port is a failed density handoff unless C is that small.
Consecutive Open rows of the **same** C `file.c:function` may ship
together iff every C callee is live, a C-matched clone, or a named
omit in this commit (no stub in a live arm). Must-fix stays one item,
alone. If success/failure needs two unrelated theories, split.

Amortize verification: focused → green → cohort; full `sessions` on
cadence or shared/startup/display/RNG changes. Stop the loop on empty
“hold green / refresh docs only” iterations.

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
| Grid snapshot/restore to emulate a tty side effect the C loop never draws | D-1831 `_snapshotStatusGrid` broke 12 corpus sessions; port the C control flow (no `docrt` on an unhandled menu key) |

**Rule of thumb:** if you cannot explain the change by pointing at a C `if`,
call order, struct field, or macro expansion, it is probably trace tailoring.

---

## 4. Work packet (fill in before editing)

```text
Objective:        <from CURRENT.md primary>
C locus:          nethack-c/upstream/src/<file>.c:<function>
JS locus:         js/<file>.js:<function>
Symptom channel:  throw | state | RNG | screen | cursor | map-omission
Hypothesis:       <one falsifiable sentence>
C reads done:     <function body + N callers + 1 branch predicate>
Branch envelope:  <covered this iteration; deferred>
Falsifier:        <exact command + expected observation if wrong>
Focused verify:   <runner; rng-diff [--all-segments]; save-oracle if tagged>
Green gate:       from CURRENT.md
Cohort:           <distinct session sharing this code>
```

`node scripts/brief.mjs <cfn>` fills C locus, JS locus, callers, corpus
falsifier and replay command in one call. When the suite is already PASS,
the falsifier is a corpus session blocked on the function (channel RNG or
screen, both sides named) or a named `c-js-map` row — never an invented
public FAIL (§2a–2b).

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

**One call:** `node scripts/verify.mjs --fn <cfn>` runs corpus verify, syntax,
Rule #2 scan, green + strict, cohort, and the full suite when a shared file
changed; paste its tail into the D-log Verify bullet. On a cohort/full FAIL
it lists every failing session's first divergence: **triage them all**
(group by row/owner), fix each cause once, re-run once. `note hidden … no
corpus session is blocked` is **not** a corpus PASS — if the queue row
cited N blocks, `--base <sha the row was queued at>`. **Resuming a
leftover:** verify is call ≤5, not call 150 (#2240).
**`rng-diff`:** default segment 0; `--all-segments` for save recipes.
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
| Geometry / flip / land | `flip_level`, `place_lregion`, stairs, `dndest` | tty cursor misread as map (#1087, #1092) |
| Keystream / `--More--` | `NEED_MORE`, topline, `WIN_STOP`, pending more at `hitmsg`/`unmul`/`yn` | JS may queue a More C already dismissed (#1127, #1132) |


---

## 8. Durable memory (your context dies)

| Fact type | Owner |
|-----------|-------|
| Score / green gate / primary objective | **`CURRENT.md`** (keep tiny; refresh Score every 10 loop iters via full `sessions`) |
| Unresolved hypothesis / dead end | `NOTES.md` (target 100 lines; `check-hot-docs.mjs`) |
| Proved cause / rejected theory | `DIVERGENCE-LOG.md` + index row |
| Module status / omissions | one `c-js-map/*.md` |
| Iteration audit | prepend `AGENT-LOOP-JOURNAL.md` (`rotate-journal.mjs` / `--fix`) |

Loop agents may **not** edit Constitution, runbook, **this playbook**, strategy,
loop scripts, `sessions/**`, `frozen/**`, or upstream C. Propose process fixes
in the journal.

---

## 9. Pitfalls

- Ship confident partials — name every deferral in the map section.
- Over-edit or under-edit — one iteration ≈ one semantic **cluster** (§2b).
- Confuse observation with rule — trace coords are evidence, not control flow.
- Infer C geometry or more-state from screens — dump C at the locus (§7).
- Skip cohort — Tourist green ≠ Rogue/orc/combat proof.
- Stack shims — prefer **delete wrong JS + re-port from C**.
- Reach for Node `fs` — **Rule #2**; Chrome must load it too.
- Spend calls on lookup — `brief.mjs` / `sym.mjs` / `csym.mjs` are one call each.
- Serial regression rounds — one verify lists every FAIL; fix causes, not sessions.

---

## 10. End each loop iteration with git

Commit with why (C locus / D-ID / verification); **`git push origin
HEAD`**. The supervisor fail-closes on density / authority / empty port
and pushes if you forgot (`docs/AGENT-PORT-LOOP.md`); green / full-suite
regression and banned-pattern hits (bare `FORCE`/`DIAG`, seed gate,
`console.log`) are logged and the loop continues — rewrite those lines
next iter. No `--force`, no amend of pushed commits, no `git reset
--hard`. `STOP_AGENT_LOOP.md` is gitignored; only the supervisor writes
`0`. `finish-iteration.mjs --commit` stamps `**Addressed:** D-NNNN`,
archives the `- [x]` queue row and rotates the journal; the short hash
goes in the **next** real commit (never a stamp-only SHA).

---

## 11. Quick commands

```bash
node scripts/brief.mjs <cfn>              # orient: C + JS + map + D-rows + corpus (1 call)
node scripts/verify.mjs --fn <cfn>        # corpus verify + green/strict + cohort (+full)
node scripts/finish-iteration.mjs --commit   # index/journal/CURRENT/NOTES/stamps from the D-log entry, push
node scripts/hidden-proxy.mjs status|queue|show <id>   # hidden-score proxy
node frozen/ps_test_runner.mjs sessions   # full public score (audit iters); CURRENT from __RESULTS_JSON__
node scripts/check-hot-docs.mjs --fix     # caps — read statuses, act on FAIL/ROTATE/REFILL only
```

---

*When in doubt: read the C, port the C, verify broadly, write small notes for the
next amnesiac agent.*
