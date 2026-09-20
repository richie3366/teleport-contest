# Review 1629 — 8f5cd3c6 — worm.c worm_cross whole-body restart (D-2670)

**Metadata:** SHA `8f5cd3c6`, `worm.c`
`worm_cross`, D-2670. JS: `js/worm.js` only
(+30/−24 with per-arm cites). No Must-fix.
Rule #2 clean (repo-wide `imports.mjs
--rulecheck` this iteration).

## Intent vs deliverable

Subject promises: whole-body restart
(impossible arm + live distmin + C-order
cites). Diff delivers exactly that: one
import line (`distmin` from `./hacklib.js`),
restarted `worm_cross` with per-arm `:line`
cites, deletion of the file-local `distmin`
shadow. No scope creep, no stubs. Promise
matches deliverable.

## Inventory

- `worm_cross` (worm.js:656, sync,
  exported) — restarted, signature kept.
- Local `const distmin` shadow: deleted;
  `distmin` joins the hacklib import (clone →
  import re-point). Required `sym.mjs` paste:

```text
distmin          js/hacklib.js:19   sync
                 js/mon.js:1097   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/shknam.js:266
```

The join points at hacklib.js:19
(`Math.max(|dx|,|dy|)`, C-equivalent). The
mon.js:1097 duplicate and the shknam.js:266
local are pre-existing, untouched here — not
this SHA's scope. `impossible` was already
imported (:20). No new helpers, no deleted
exports.

## C ↔ JS fidelity

C locus read: `worm.c:896–942` (47 L, full
body above via `csym.mjs`). No RNG.
Branch-by-branch confirm:

- `:913–916` non-adjacent guard now calls
  `void impossible(...)` then FALSE — matches
  C including the call the old body dropped.
- `:917–919` diagonal-only early-out
  identical.
- `:921–924` same-monster flank gate folded
  to one C-order `if` — identical semantics.
  `m_at` ≡ `worm_mon_at || _fmon_at` split is
  the pre-existing cycle-avoiding equivalent
  (worm.js:374 precedent), noted in-body.
- Loop `:928–939` now head-advances
  `curr = wnxt` with C-style `wnxt`
  declaration and `if (!wnxt) break` —
  matches.
- Tail `:940–941` FALSE kept. Dropped `!wnum`
  early-out is behavior-preserving:
  `wtails[0]` is always null so wormno-0 falls
  out of the loop FALSE exactly like C.
- Cycle check: `imports.mjs --can worm.js
  mon.js m_at` → same 98-module SCC, `m_at`
  hoisted/cycle-safe; keeping the split is a
  size choice, not a TDZ blocker.
- Callers: `hack.c:1172` → js/hack.js:511 and
  `mon.c:2253` → js/mon.js:3184, both
  pre-existing and untouched; `steed.c:265`
  is a comment, not a call. None unwired.

## Hallucinations / overclaim

None. D-log names the occupancy split and
the wormno-0 reasoning in-body rather than
claiming a verbatim port.

## Density

Whole 44-line C function, one module, ~48 JS
lines with cites. Right-sized
breadth-phase step.

## Verification

D-log Verify claims `verify.mjs --fn
worm_cross` PASS with 0 blocked + smoke
REACH-OK — honest vacuous note, not a corpus
PASS. Re-ran `hidden-proxy.mjs verify
worm_cross --base 8f5cd3c6~1 --reach-all`:

```text
verify worm_cross: baseline 8f5cd3c6~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke worm_cross: no RNG-tagged reach; fixed smoke spread (24 run, 6.5s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED sessions. Diff grep: no FORCE /
DIAG / RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
