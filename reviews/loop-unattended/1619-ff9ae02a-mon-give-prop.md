# Review 1619 — ff9ae02a — mon.c mon_give_prop whole-body restart (D-2660)

**Metadata:** SHA `ff9ae02a`, `mon.c` `mon_give_prop`,
D-2660. JS: `js/mon.js` (+67/−46: restart + `res_to_mr`
import join, clone deleted) + `js/worn.js` (+4/−2: clone →
live export). Closes the clone-divergence the subject names
(eager `Monnam` + local `res_to_mr_mon`).

## Intent vs deliverable

Subject promises: `msg` stays a `'%s …'` format string per
arm, live `res_to_mr` import (clone deleted), C-ordered
suppression/grant gates, tail `pline_mon(mtmp, msg,
Monnam(mtmp))` restoring C evaluation order. Diff delivers
all of it. Promise matches deliverable.

## Inventory

- `mon_give_prop(mtmp, prop)` (mon.js:2706, async,
  exported) — C `mon.c:1725–1774` (50 L).
- `res_to_mr` (worn.js:242, sync): file-local → exported
  (clone→import re-point). Required `sym.mjs` paste:

```text
res_to_mr_mon    NOT FOUND in js/** (no export, no local function/const).
res_to_mr        js/worn.js:242   sync
```

Clone fully removed, live export joined at mon.js:81 (no
new edge — worn.js already imported). No other deletions.

## C ↔ JS fidelity

C loci read in full: `mon_give_prop :1725–1774` (body
above), `res_to_mr` (prop.h:25–26), callers (`--callers`:
mon.c:1823 `mon_givit`, uhitm.c:3057). No RNG either side.
Branch-by-branch confirm:

- Six resist arms `:1735–1752`: format strings byte-equal
  (`'%s shivers slightly.'` etc.), `Monnam` no longer
  pre-formatted ✓; `default: return` `:1753–1755` ✓.
- `res_to_mr(prop)` `:1757` ≡ prop.h macro (range +
  `1<<(r-1)`, else 0; uchar cast immaterial) ✓ — a
  verified clone-to-import, not a new clone.
- Suppression `:1759–1764` (`mresists|mintrinsics &
  intrinsic → msg = NULL`, grant still applies) ✓;
  grant `:1766–1767` ✓.
- Tail `:1769–1773`: `canseemon && msg →
  pline_mon(mtmp, msg, Monnam(mtmp))` — `Monnam` evaluates
  only inside the gate, as in C (a suppressed/unseen gift
  names nothing — the old eager-`Monnam` wrong is gone);
  `pline_mon(mtmp, fmt, ...args)` → `vpline` expands `%s`
  (display.js, verified here), output-identical ✓.
  DISABLE/RESTORE macros compile-time-only, no JS
  equivalent ✓.
- Caller closure: mon.c:1823 → `mon_givit` :2777 (with
  the `prop == 0` / `should_givit` gates, read here) ✓;
  uhitm.c:3057 → mhitu.js:2998 (split-file caller,
  pre-existing) ✓.
- OMITs: none new. `mresists` null guard (C NONNULLARG1),
  `| 0` int cast, STONE_RES bulk import — all named.

## Hallucinations / overclaim

None. "A suppressed or unseen gift must not name" states
the C mechanism the old code violated; the fix matches
the cited lines.

## Density

Breadth phase: one-function restart + clone-to-import (77
ins, 2 files, same edges) — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort).
Re-measured here: `hidden-proxy.mjs verify mon_give_prop
--base ff9ae02a~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled coverage row) + smoke
24/24 PASS, 0 regressed → REACH-OK. Claim true. Diff
grep: 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
