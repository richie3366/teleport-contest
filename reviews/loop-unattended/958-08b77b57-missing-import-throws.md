# Review 958 — 08b77b57 — missing-import ReferenceError throw fix (D-1988)

- SHA: `08b77b57` — "missing JS imports (is_pit/FORCEBUNGLE/otense/STARVED) threw at first step in 8 corpus sessions (D-1988)."
- D-id: D-1988. JS: `js/muse.js`, `js/read.js`, `js/eat.js` (3 one-line import extensions). C locus: `trap.h:113` `is_pit` macro (fetched this review); the four names are call-site wirings, not new ports.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises four missing imports that threw. Diff actually
adds: `is_pit` + `FORCEBUNGLE` (muse.js), `otense` (read.js),
`STARVED` (eat.js) — all onto existing import lists. Promise
matches deliverable.

## Inventory

- Changed: 3 import lines. No new functions, no deletions.
- Required `sym.mjs` output (symbols re-pointed local→import —
  here, bare-name→import): `is_pit` const.js:2531 sync,
  `FORCEBUNGLE` const.js:2475 export, `otense` objnam.js:2202
  sync, `STARVED` const.js:1694 export — all four exports exist.

## C ↔ JS fidelity

`is_pit` export matches C `trap.h:113`
(`PIT || SPIKED_PIT`) character-exact ✓. The other three names
resolve to live exports on already-imported modules; this commit
ports no logic, so there is no branch order to walk. Clone note:
`sym.mjs` flags a textually identical local `is_pit` duplicate
at mklev.js:343 — same truth table as C, so a dedup candidate,
not a C-wrong; out of this SHA's scope.

Callee closure: `--can` ALREADY on all three edges (same SCC,
name-only extensions — no new edge, no TDZ surface). No STUBs,
no new clones.

## Hallucinations / overclaim

None — the "8 sessions" claim is itemized by session:step:symbol
and the two slow-path sessions (poly-Arch timeout→polyself@63,
wish-Knight still timeout) are disclosed, not swept into the
6-row verify line.

## Density

3 one-line imports killing 8 first-step throws. Dense per §2b
(Must-fix shaped, ships alone).

## Verification

`verify randomize_gem_colors --base 08b77b57~1` re-run this
review → "0 PASS, 6 moved past (2 re-attributed at the same
step), 0 unchanged, 0 worse → PROGRESS", matching the D-log;
green + strict + cohort 7/7. `--rulecheck` clean (re-run).
Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
