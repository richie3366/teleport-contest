# Grok playbook — faithful porting in fresh context

For **autonomous loop agents** (`scripts/agent-port-loop.sh`) and any
fresh-context model. Read this **first**, every iteration. Operational
guidance — `CONSTITUTION.md` and `PORTING-RUNBOOK.md` win on conflicts.

**Goal:** port pinned C + contest patches into readable JS. Sessions measure
progress; they are **not** the specification. A longer RNG prefix from a
trace-shaped hack is failure, not success.

### Contest Rule #2 — HARD BAN (read every iteration)

Scored `js/` is **plain ESM**, runnable as-is in **Node 22+ and modern
Chrome**. No build step, WASM, network, **filesystem**, threads, or native
addons. Persist only via frozen `storage.js` VFS. **Never** add `import …
from 'fs'|'path'|'url'|'os'|'node:*'` or `readFileSync` to scored code;
embed dat/help via `js/generated/` extractors (D-0477). Node-only PASS
while Chrome cannot load the module is a **failed handoff**.

---

## 1. Read order (time-boxed)

Target **≤12k tokens** of docs before C.

| Order | Doc | What to extract | Skip |
|------:|-----|-----------------|------|
| 1 | **This file** | priority, **Rule #2**, anti-patterns, endings | — |
| 2 | Cursor rules / `CONSTITUTION.md` §1–2 (esp. §1.5 Rule #2), §5, §10 | hard bans only | full essays |
| 3 | **`CURRENT.md`** | score, green gate, **primary objective**, focused cmd | — |
| 4 | `LOOP-QUEUE.md` Cliff-phase block + first **Must-fix** row, else the **Open — cliffs** head | the row, its tag, its probe sessions | Parked index, Deferred |
| 5 | `NOTES.md` | live hypothesis + don’t-recheck | — |
| 6 | `hidden-proxy.mjs show <probe id>`, then `brief.mjs <owner>` | first divergence (C vs JS draw, `cMsgOwners`, differing row); C body + callers, JS body, ledger, D-rows — two calls | paging map files, grepping |
| 7 | `HIDDEN-PROXY.md` §3 | what **movement** and REACH mean; verify semantics | the method essay |
| 8 | `PORTING-RUNBOOK.md` §3–7 | only if procedure unclear | strategy rationale |

**Do not read by default:** `PORTING-STRATEGY.md`, `archive/**` (except
the one parked row a queue row points at), full `DIVERGENCE-LOG.md`, full
journal. `DIVERGENCE-INDEX.md` + **one** `## D-NNNN` entry (the row's
`history:` tag). **Always re-read the C function** before patching.

---

## 2. Objective priority (non-negotiable)

1. **`CURRENT.md` → Primary objective** (chooses work). Since 2026-10-06
   that is the **cliff phase** (Constitution §10.18): the breadth picker
   ran dry (`ledger.mjs batch` → 1 function, ledger counts frozen) while
   held-out sat at 16/44, RNG 34.8 % and the corpus still failed 212/953
   sessions in the held-out genre. **The corpus picks work**: Must-fix
   (strict), then the **Open — cliffs** head — owners ranked by **RNG lost**
   after the first divergence, generated from the committed scoreboard.
2. **A row's tag is context, not a veto.** `history: archived D-…` = read
   that one D-entry, then port the arm *this* divergence names. `parked:
   SYMPTOM / MISATTRIBUTED` = port the **writer** the divergence names
   (`hidden-proxy show`), or deliver the owner's `[measure]` row.
3. **Coverage** (ledger gap) rows pop only when the cliffs block is empty,
   or as a same-C-file companion.
4. Hand-written rows are **Must-fix only** (throw / hang / PASS→FAIL /
   review C-wrong). A ledger note that disagrees with the live body is
   one `ledger.mjs set` inside a real iteration, never a row.

### 2a. Cliff phase — what an iteration is

Public 44/44 **and** the corpus PASS set are a **regression fortress**
(REACH). Held-out (`leaderboard.mjs`) is the score; the committed board
(PASS, RNG %) is its proxy and must rise with it.

| Do | Do not |
|----|--------|
| No Must-fix → the **cliffs head**; `hidden-proxy show <probe id>`, then `brief.mjs <owner>`; read the **whole** C body + every caller | Pick a lower row because the head "was already worked" — the board says it still blocks |
| Decide **owner vs writer** from the divergence: JS drawing from another function (`jsOwner`), a parked tag, a region-heuristic screen owner (`do_statusline2`) → the **writer** is the port | Re-port a symptom owner a park proved faithful; patch the painter of a value |
| Port the function **whole**, in C order: every arm, every callee live or named, every C caller wired | Port the arm the probe hits and call the function done; `// TODO` in a live arm; a clone of an existing export (`sym.mjs` first) |
| Prefer **restart**: delete the thin JS body, re-port from C, keep the export name/signature | Stack a third shim on a thin function |
| `verify.mjs --fn <fn>` must show **movement** on the probe sessions (PASS or strictly later step/owner) **and** REACH-OK (+ green, strict, cohort, full when shared) | Ship NO MOVEMENT as a "named omission" or "docs only"; touch a session or seed; ship a PASS→FAIL |
| NO MOVEMENT after one more fix → **measure C** (§7) this iteration; the measurement names the writer (port it) or parks the owner with a `[measure]` row | Patch the symptom a third time; theorize from JS state or an RNG count |
| Both Open blocks are generated (`finish` / `check-hot-docs --fix`); both empty → journal "corpus saturated" and stop; the audit grows the corpus | Pad the queue; invent a Must-fix; re-audit an `audited` function; a campaign step no corpus session reaches |

The held-out 44 are scripted wizard-mode scenarios (wishes, `^G`,
named-level `^V`, polyself, deaths): one early cliff forfeits every later
screen — hence the ranking by RNG lost. Tagged restore: save-oracle probe.

### 2b. Iteration density (token vs quality)

Each fresh agent pays a large fixed cost. Prefer **fewer, denser**
iterations — density measured in **moved sessions and live C**, never in
rows touched or lines written. Too small: a ledger-text repair, a cite
refresh, a re-audit, one deferred `if`, docs now and code next iter. Right
size: **one cliff** — the owner (or writer) as a whole C function family,
callees and C callers in this commit, code + ledger + verify in one
handoff. Too big: several unrelated cliffs, another C file's gap "while
here", multiple hypotheses.

**Rule (2026-10-06, human decision):** one cliff per iteration, from the
generated block head. A `[measure]` iteration (C-side measurement + the
writer it names, no `js/`) is legitimate **once** per owner; a second
no-`js/` iteration on the same owner parks it. Must-fix stays one item,
alone. The legacy batch unit (§10.17, `ledger.mjs batch`) is used only
when the cliffs block is empty and the ledger still has ≥ 5 functions.

**Campaigns.** `[campaign k/n]` steps each ship `js/`, keep 44/44 +
REACH-OK, and move a probe session (or name the one the next step moves);
a campaign that moves nothing on the board is closed (D-3536…D-3554
`des.door` game-marks: 10 steps, 0 sessions moved).

---

## 3. What “faithful” means here

### Good (ship these)

| Pattern | Example from this repo |
|---------|------------------------|
| Cite C, port branch order | `throwit` stops on `!ZAP_POS` like `bhit` (D-0005) |
| Remove invented fallback | `apport` from real `ACURR(A_CHA)` clamp, not `\|\| 10` (D-0004) |
| Name omissions | D-entry Named omissions + `Ledger: <fn> partial` |

### Bad (delete on sight)

| Anti-pattern | Why it is cheating |
|--------------|-------------------|
| `if (getRngLog().length === 2417)` | Trace index is not C semantics |
| `if (gg.gx === 47 && gg.gy === 18)` in production | Recorded coordinate, not a rule |
| `appr = 0` to match one `rn2(1)` | Symptom alignment without C proof |
| Seed-shaped inventory / role fakes | Not `u_init.c` |
| `// not needed for seed8000` as design | Omission must live in the D-entry / ledger `omit` |
| New `fastforward.js` burns | Constitution §5 — delete-only |
| PASS without `strict-output-check` | Trailing RNG/screens can hide bugs |
| `import` from `fs` / `path` / `url` / `node:*` | Contest Rule #2 — Chrome + judge both must load `js/` |
| Runtime `readFileSync` of `dat/*` | Embed via `js/generated/` (D-0477); VFS is storage only |
| Grid snapshot/restore to emulate a tty side effect the C loop never draws | D-1831 broke 12 corpus sessions; port the C control flow instead |
| Helper clone dropping a C predicate (`inside_shop` sans `edge`) | D-1849; `sym.mjs`: IMPORT the export |

### Busywork (not cheating — still a wasted iteration)

| Anti-pattern | Why |
|--------------|-----|
| A "Must-fix" whose deliverable is `ledger.mjs set` (clipped omit, note/omit mismatch, cite drift) | No C-wrong, no `js/`, no session moves; ~40 shipped 2026-10-04..06 to hold a queue floor that no longer exists |
| Re-auditing the same coverage head (`impossible` ×60); a campaign step on a path no corpus session reaches | An `audited` partial leaves the block; progress is a moved session or newly live C a session executes |
| Treating `do not re-enqueue` / `archived D-…` as "done" while the board lists sessions blocked there | The tag is history; the board is the measurement |
| Skipping the cliffs head because it "needs C instrumentation" | Then the measurement **is** the iteration (`[measure]`, §7) |

**Rule of thumb:** if you cannot explain the change by a C `if`, call
order, struct field, or macro expansion, it is trace tailoring. If you cannot name the corpus session it moves, it
is busywork.

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

`hidden-proxy show <id>` fills the symptom channel and first divergence;
`brief.mjs <cfn>` fills C/JS locus, callers, corpus rows, replay. The
falsifier is `verify.mjs --fn <cfn>`: blocked sessions **PASS or move
strictly later**, **and** REACH-OK. Branch envelope = **the whole C body**;
"deferred" only for a callee that is itself a queue row, named in this
commit.

**Minimum C read:** body + immediate callers + the `if` that guards the
diverging RNG. Do not patch from `rng-diff` output alone.

---

## 5. Verification matrix

| You changed | Minimum before handoff |
|-------------|------------------------|
| One function, narrow path | focused session; `rng-diff` if segment 0 + RNG-related |
| Shared startup/RNG/display | green gate + **strict-output-check** + cohort |
| roles / u_init / mkobj / mon | cohort + full `sessions` before claiming milestone |
| Display/cursor/menus | green + viewer smoke if available |

**One call:** `node scripts/verify.mjs --fn <cfn>` runs corpus verify,
**REACH** (baseline-PASS sessions whose C RNG log executes `<cfn>`, spread
≤ 80 — `--reach-all` on a hot function; a fixed smoke spread when none
reach it), syntax, Rule #2 scan, green + strict, cohort, and the full
suite when a shared file changed; paste its tail into the D-log Verify
bullet. On a FAIL it lists every failing session's first divergence:
**triage them all**, fix each cause once, re-run once. A REACH regression
is a port bug you just wrote — fix it, never park it. For a **cliff row**
the `verify <fn>: N PASS, M moved, K no-movement` line is the deliverable:
K must be 0 for the probe sessions, or the iteration ends as a measurement
(§6.2). `note hidden … no corpus session is blocked` is expected only for
a coverage row. **Resuming a leftover:** verify is call ≤5, not call 150.
**`rng-diff`:** default segment 0; `--all-segments` for save recipes.
**`PASS`:** inspect `__RESULTS_JSON__` — runner exit code can be 0 when
sessions fail; always `strict-output-check` on green sessions.
**Callers table:** the D-log names, per C call site in the brief, the JS
call now wired (file:line) or the named omission (D-2393 / D-2395 were
caller misses on otherwise exact bodies).

---

## 6. Iteration must end as exactly one of

1. **Verified faithful change with movement** — the cliff's C function
   (family) whole, C cited, `verify` showing PASS / later step on the
   probe sessions, REACH + gates pass, DIAG removed, docs updated.
2. **Measurement** — NO MOVEMENT twice, so a C-side measurement at the
   cited locus (§7) was taken; it names the writer (its row is the next
   deliverable) or parks the owner with the exact probe command. One per
   owner; no `js/`.
3. **Falsified hypothesis** — revert experiment if needed; dead end in
   `NOTES.md`, the row stays at the head.
4. **Campaign step** — a C function too big for one iteration shipped its
   verified core, moved a probe session (or named the one the next step
   moves), and left `[campaign k/n]` rows naming the rest.

**Not acceptable:** unverified hack, one arm presented as the function, a
REACH regression shipped as a "named omission", DIAG left in `js/`, an
iteration that ends on a **stale** row (a 3-call detour, not an
iteration), a ledger-text-only iteration, a re-audit of an `audited`
function, a campaign step that moves no session, a row written to have a
row.

---

## 7. When stuck — measure C, do not theorize

**Geometry owner → probe first.** If the owner is a level-wide scan or
level-gen function (`mineralize`, `bound_digging`, `wallification`,
`place_lregion`, `somex`…), C only *noticed* a terrain difference there;
the writer is upstream and an RNG count cannot say which cell.
`node scripts/geom-probe.mjs <session-id> [--step N]` records a wizard
`^F` map on the C recorder, replays JS and prints every differing cell.
Run it before opening a second C function (D-1849).

**Evidence grades.** Every NOTES / D-log claim about C state says
*measured* (probe, recorded screen, temp C dump) or *inferred* (JS-only).
A JS FORCE/DIAG that restores an RNG count never localizes (D-1849).

**After two NO MOVEMENTs, or ~40 calls without a C measurement:** stop
patching the symptom. Measure (temp C dump at the cited locus for
keystream / `--More--` state, revert after), or park with the exact probe
command.

---

## 8. Durable memory (your context dies)

| Fact type | Owner |
|-----------|-------|
| Score / green gate / primary objective | **`CURRENT.md`** (keep tiny; Score refreshed on audits) |
| Unresolved hypothesis / dead end | `NOTES.md` (target 100 lines; `check-hot-docs.mjs`) |
| Parked row: one index line / full proof | `LOOP-QUEUE.md` Parked (≤ 300 chars) / `docs/archive/LOOP-QUEUE-PARKED.md` |
| Proved cause / rejected theory | `DIVERGENCE-LOG.md` + index row |
| Function status / omissions | D-entry `- **Ledger:**` bullet → `docs/ledger/` (never hand-edit) |
| Iteration audit | prepend `AGENT-LOOP-JOURNAL.md` (`rotate-journal.mjs` / `--fix`) |

Loop agents may **not** edit Constitution, runbook, **this playbook**,
loop scripts, `sessions/**`, `frozen/**`, or upstream C. Propose process
fixes in the journal.

---

## 9. Pitfalls

- Ship confident partials — name every deferral in the D-entry.
- Confuse observation with rule — trace coords are evidence, not code.
- Infer C state from JS, a FORCE, or an RNG count — measure C (§7).
- Stack shims — prefer **delete wrong JS + re-port C**.
- Spend calls on lookup — `brief.mjs` / `sym.mjs` / `csym.mjs` are one call each.
- Prove a negative at length — a stale row gets one line, not a 2 kB essay.
- Trust the owner column — `do_statusline1/2` and identical-topline rows
  are the region heuristic; the cliff row prints the differing screen row
  (`AC:6` vs `AC:10`): port the **value's writer**.

---

## 10. End each loop iteration with git

**Reap your own processes before `finish-iteration`** (`jobs -l`,
`ps -o pid,ppid,etime,command | grep -E 'node (scripts/|/tmp/|frozen/)'`,
`kill` what you started); never touch the supervisor shell or
`loop-observer/server.mjs`. Prefer `timeout <secs>` on probes/replays.

Commit with why (C locus / D-ID / verification); **`git push origin
HEAD`**. The supervisor self-heals density and authority edits, treats a
Parked-row move or a popped `[measure]` row as a legitimate no-`js/`
iteration, reverts an empty port, pushes if you forgot
(`docs/AGENT-PORT-LOOP.md`). No `--force`, no amend of pushed commits, no
`git reset --hard`. `STOP_AGENT_LOOP.md` is gitignored; only the
supervisor writes `0`. `finish-iteration.mjs --commit` stamps
`**Addressed:** D-NNNN`, archives the `- [x]` row, regenerates both Open
blocks, rotates the journal; the short hash goes in the **next** real
commit.

---

## 11. Quick commands

```bash
node scripts/hidden-proxy.mjs show <id>   # the cliff: first divergence, C vs JS draw, message owners, differing row, replay
node scripts/brief.mjs <cfn>              # orient (C + JS + ledger + D-rows + corpus)
node scripts/verify.mjs --fn <cfn>        # corpus verify (movement) + REACH + green/strict + cohort (+full)
node scripts/geom-probe.mjs <id> --step N # C-side map measurement when NO MOVEMENT repeats (§7)
node scripts/finish-iteration.mjs --commit   # stamps from the D-log entry, regenerates both Open blocks, commit, push
node scripts/ledger.mjs set <cfn> ported --note "stale: …"  # stale row (inside an iteration, never one)
node scripts/hidden-proxy.mjs queue       # the cliffs ranking (what --write puts in LOOP-QUEUE)
node scripts/leaderboard.mjs              # held-out score — the objective (audit iters)
node scripts/hidden-proxy.mjs status      # corpus PASS + worst owners/families (audit iters)
node frozen/ps_test_runner.mjs sessions   # public fortress (audit iters)
```

---

*When in doubt: read the C, port the C, verify broadly.*
