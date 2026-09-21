# Review 1686 — e381a6676 — `shknam.c` shkname whole body (D-2727)

Metadata: commit `e381a6676`, D-2727, `js/shknam.js` only (small). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: `:859–868` guard/fallback/panic arms → live, stays sync. The diff delivers the whole 45-line C body in C order (save/clear, fallback, impossible fallthrough, panic, eshk + Hallu + strip + return). Promise matches deliverable.

## Inventory

Changed JS: `shkname` (`js/shknam.js`, restarted, stays sync `export function`); `has_eshk` joins the existing `./const.js` import; `noit_mon_nam` joins the existing `./do_name.js` import. `Shknam` unchanged (same-file caller inherits). No deleted symbols, no clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (both new names):

```text
noit_mon_nam     js/do_name.js:1260   sync
has_eshk         js/const.js:3150   sync
```

Both LIVE sync. `--can shknam.js→do_name.js noit_mon_nam`: `ALREADY: shknam.js already statically imports do_name.js. No new edge needed.` — again better than the message's "new edge" phrasing; no new module edge. No STUB in any arm.

## C ↔ JS fidelity

C locus read: `shkname — shknam.c:853-897` (csym range; message cites `:856–897`). Branch-by-branch against the full C body printed above:

- save/clear/restore `isshk` + `noit_mon_nam` buffer/fallback ✓ verbatim (the mon_nam recursion guard now runs).
- `!isshk`: C `impossible(...)` then falls through to `return nam`; JS returns `nam` directly with the async-impossible message named — same return value ✓.
- `!has_eshk`: C `panic` (abort) → JS `throw` ✓ (D-2607 precedent; unreachable for valid input, previously silently rendered `'s` suffixes).
- eshk `shknam` ✓; Hallu arm kept with `Hallucination()` call adaptation (D-2725 shape) and unchanged `rn2` order ✓; `!letter(*shknm)` → ASCII regex with empty-string guard (C advances past NUL and copies empty — same result) ✓; `Strcpy` copy-out is the return per by-design strings ✓.
- Callers: 40 C sites; JS signature unchanged, 30+ sync call sites unaffected, `Shknam` inherits — no wiring needed, none missed.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. "New edge" is ALREADY (conservative direction). Named omits (`:866` impossible, fracture_rock caller-side gap owned by fracture_rock, C buffer, `!mtmp` null-safety) are explicit in message and map. No FORCE/DIAG/seed/coordinate logic in the hunks.

## Density

Breadth-phase small-function restart, one module, zero new edges. Right-sized (C is 41 lines; below-40-insertions is fine here since C is that small).

## Verification

Re-measured per-SHA re-run (`--base e381a6676~1 --reach-all`) — both lines, matching the D-log:

```text
verify shkname: baseline e381a6676~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify shkname: no corpus session is blocked on it at e381a6676~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke shkname: no RNG-tagged reach; fixed smoke spread (24 run, 6.2s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log (full skipped — single non-shared module, acceptable); throwaway probe covered 7 behavior cases. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
