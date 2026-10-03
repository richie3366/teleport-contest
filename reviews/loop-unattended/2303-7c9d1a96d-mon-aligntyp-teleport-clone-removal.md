# Review 2303 — 7c9d1a96d — mon_aligntyp teleport clone removal

Metadata: SHA `7c9d1a96d`, D-3347, C `priest.c:279–289`,
JS live `js/priest.js:152` (untouched body), site `js/teleport.js`
(is_lminion). Stat: `priest.js +4/-4` (comment), `teleport.js
+22/-22` (import + clone delete + comment), new test file (38 lines).

Intent vs deliverable: subject promises "mon_aligntyp teleport.js
clone removal (sole site → live export)". Diff actually: new static
teleport→priest edge, deletes the local clone, drops the now-unused
EMIN const import, retires the priest.js clone note. Matches promise;
sole site is `is_lminion`, the `monst.h:282` macro use.

Inventory: 1 function: `mon_aligntyp` (clone→import). Deleted clone
is a **clone** (local re-def with an invented fallback arm); live
target is a **C callee** (imported real function, body ports C).
No stubs, no new helpers.

C ↔ JS fidelity: C (`priest.c:279–289`, via `csym.mjs`):

```c
aligntyp algn = mon->ispriest ? EPRI(mon)->shralign
                              : mon->isminion ? EMIN(mon)->min_align
                                              : mon->data->maligntyp;
if (algn == A_NONE)
    return A_NONE;
return (algn > 0) ? A_LAWFUL : (algn < 0) ? A_CHAOTIC : A_NEUTRAL;
```

No RNG. Live JS (`js/priest.js:152–158`): identical ternary with
`?? 0` guards on the EPRI/EMIN derefs (C derefs non-null directly;
benign). A_NONE passthrough, sign mapping — branch-by-branch confirm.
Delta vs clone: clone fell back to `data.maligntyp` when EPRI/EMIN
was missing; C never reads maligntyp for a priest/minion, so the
fallback was invented and the live `?? 0` (→NEUTRAL) is the C-true
choice. On-C-domain (EPRI/EMIN present) both agree; the site only
tests `== A_LAWFUL` for minions. C callers (`--callers`:
artifact.c:933, insight.c:3277, priest.c:364/372, monst.h:282) are
all wired per the priest.js doc block; this SHA rewires the last
one (monst.h:282 via is_lminion).

Hallucinations / overclaim: none on fidelity. "Cycle-avoidance
disproven by the ALREADY edge" in the next SHA's message is not this
SHA (here the edge was genuinely new, SAFE).

Density: single-function rewire; one fidelity block, one `Ledger:
mon_aligntyp` entry. Small by §2b lines but it closes the queued
row's whole deliverable (sole site + sole clone). Verdict for the
function: ACCEPT.

Verification: `hidden-proxy verify mon_aligntyp --base 7c9d1a96d~1
--reach-all` → "0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)" + "no RNG-tagged reach; fixed smoke spread (24
run): 24 PASS, 0 regressed → REACH-OK"; matches the D-log (queue row
cited 0 blocks, so the note is honest, not vacuous). `--can
teleport priest mon_aligntyp` → ALREADY now (new at commit time).
Diff grep: no FORCE/DIAG/seed/fastforward/coords. `sym.mjs` output
(required paste):

```text
mon_aligntyp     js/priest.js:152   sync
```

Single live definer, clone count 0. Maintained test: 2/3 pass at
this SHA's tree — the no-clone/import regex expects the exact line
`import { mon_aligntyp } from './priest.js'`, which D-3351 later
extends with `histemple_at` (see review 2307). Brittle regex, not a
fidelity miss; substance (import + sole definer + site call) holds.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
