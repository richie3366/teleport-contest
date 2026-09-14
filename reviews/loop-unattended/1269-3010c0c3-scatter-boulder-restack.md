# Review 1269 — 3010c0c3 — explode.c scatter MAY_FRACTURE boulder restack (D-2303)

Metadata: SHA `3010c0c3`, D-2303, C-fidelity residual (no corpus owner). Method: `git show` stat + full `js/explode.js` diff; C `explode.c:776–790` read directly; JS `scatter` surroundings read for `otmp` reuse; `sym.mjs sobj_at` + `imports.mjs --can`; `hidden-proxy verify --base` re-run; D-log entry cross-checked against the commit message; green gate re-run at HEAD; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: the C restack arm verbatim in C order over live callees — a pre-existing boulder under the fresh ROCK pile goes back on top.
Diff actually adds (`git show 3010c0c3 -- js/explode.js`, single function): `otmp = sobj_at(BOULDER, sx, sy); if (otmp) { obj_extract_self(otmp); place_object(otmp, sx, sy); }` after the existing `fracture_rock` + `place_object`. Promise kept.

## Inventory

- `scatter` MAY_FRACTURE boulder arm (js/explode.js) — 5 added lines + comment refreshes.
- `sobj_at` joins the existing `mkobj.js` import (name only).

## C ↔ JS fidelity

C locus `explode.c:776–790` (verified in pinned source; JS comment cites the same range):

```c
fracture_rock(otmp);
place_object(otmp, sx, sy);
if ((otmp = sobj_at(BOULDER, sx, sy)) != 0) {
    /* another boulder here, restack it to the top */
    obj_extract_self(otmp);
    place_object(otmp, sx, sy);
}
```

JS is line-for-line identical including the `otmp` reassignment and the restack comment's content. Downstream safety checked by reading the surroundings (`js/explode.js:900–975`): the boulder path sets `used_up = true`, so the reassigned `otmp` never reaches the throw-chain — same as C, where the fractured/restacked object likewise leaves the arm via `used_up`. The statue `else` branch is untouched.
Callee closure, all LIVE (`sym.mjs`):

```text
sobj_at          js/mkobj.js:2201   sync
```

Sole copy — the D-2281/D-2285 clone retire holds, zero clones remain. `obj_extract_self`/`place_object` already imported. `imports.mjs --can explode.js mkobj.js sobj_at` → ALREADY, no new edge. No RNG/message/control-flow delta beyond C order (the three callees draw nothing). VIS_EFFECTS stays named — correctly, since it is commented out in C too.

## Hallucinations / overclaim

None on fidelity. One documentation wrinkle found and resolved: the commit *message* shows preflight-only verification, but the D-log entry (`DIVERGENCE-LOG.md:3`, D-2303) claims the full matrix — syntax/rule2/hidden-vacuous/green 2/2/strict ×2/cohort 7/7 plus an import smoke check. An early draft of this review flagged a verification gap from the message alone; re-reading the D-log retracts it — the D-log is the record of what ran, and its claims are specific (per-file syntax scope, both strict sessions, import-smoke output). No overclaim stands.

## Density

Five functional lines for a three-line C arm plus its datum import — C is that small. OK.

## Verification

D-log (corrected reading): preflight clean-tree green + `verify --fn scatter` full matrix PASS with the hidden note explicitly vacuous (NOT a corpus PASS). Re-measured by this review:

```text
verify scatter: baseline 3010c0c3~1 (scoreboard at 775e5959) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Row cited no blocks — vacuous-honest, no `--base` debt. Green gate re-run by this review at HEAD (covers all nine SHAs cumulatively): seed8000 + seed0900 → 2/2 PASS (RNG 3130/3130 + 2983/2983, screens 23/23 + 84/84). Full-44 cadence run follows at iteration end. Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
