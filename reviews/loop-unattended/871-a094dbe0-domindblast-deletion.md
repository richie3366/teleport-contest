# Review 871 — a094dbe0 — polyself.c domindblast invented gaze-retaliation blocks deleted (D-1901)

Metadata: SHA `a094dbe0`, D-1901. Files: `js/polyself.js` (43-line
deletion: two gaze blocks + dead guard + 4 unused imports), review-868
stamp (`Addressed: D-1901`), Must-fix row archived. Next index 871.

Intent vs deliverable: subject promises deletion of the floating-eye
freeze and Medusa-stoning blocks that review 868 flagged as absent
from C. The diff delivers exactly that deletion plus the import
cleanup it enables, nothing else. Promise ≡ diff.

Inventory: 0 new functions, 2 blocks deleted, 1 dead guard line
deleted, 4 import names dropped (`l_monnam`, `KILLED_BY`, `STONING`,
file-local `PM_MEDUSA`). `nomul`/`urgent_pline`/`done`/`d` stay —
grep confirms live uses elsewhere in the file.

**C ↔ JS fidelity** (`csym domindblast` →
`nethack-c/upstream/src/polyself.c:1893–1938`, 46 lines, sole caller
`cmd.c:917`): C is uen<10 refuse → uen−=10 + botl → two plines →
fmon loop (DEADMONSTER / BOLT_LIM / peaceful / mindless gates →
`u_sen || rn2(2) || !rn2(10)` gate → `rnd(15)` → wakeup-before-blast
→ lock-in pline → mhp−=dmg → killed). No `passive()` call, no
floating-eye arm, no Medusa arm anywhere in the range — confirmed by
reading the full printed body. Remaining JS (`js/polyself.js:1286+`)
walks the same gates in the same order with the same three RNG calls
(`rn2(2)`, `rn2(10)`, `rnd(15)`); the `[...fmon]` snapshot stands in
for C's saved `nmon` (killed() can unlink). The deleted
`if (mhp<1) continue` was dead code: after the gaze blocks go, nothing
follows `killed()` in the iteration, and the loop head already carries
the DEADMONSTER guard. Deletion is branch-exact, not a re-port.

Hallucinations / overclaim: none. D-log calls the hidden verify
vacuous by name and leans on public gates openly; the `passive()`
ownership claim matches C (no such call in :1893–1938).

Density: deletion-only Must-fix, alone in the commit — correct shape.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7,
`skip full` — polyself.js is not shared). Re-measured myself:
`hidden-proxy.mjs verify domindblast --base a094dbe0~1` →
`0 session(s) blocked on it (0 at baseline, 0 in the working
scoreboard)` — vacuous exactly as stated, and the queue row cited no
corpus blocks, so no `--base`-at-queue re-run is owed. Diff grep: no
FORCE/DIAG/seed/coordinate patterns (deleted code only).
`imports.mjs --rulecheck` → Rule #2 clean (run at HEAD, covers this
SHA). `sym.mjs`: `l_monnam` still a live `do_name.js:1007` export
(import drop only ✓); `KILLED_BY`/`STONING` still `const.js`
exports ✓; `PM_MEDUSA` NOT FOUND anywhere (local const fully gone,
zero dangling refs per grep ✓); `domindblast` still the sole async
export.

**Actionable C-wrongs**: none. (Nit, not queueable: the
LOOP-QUEUE-DONE archive row for the 868 Must-fix carries no short
hash yet — the next real commit touching that file should fill it
from `git log`, per the queue header rule.)

Verdict: **ACCEPT**
