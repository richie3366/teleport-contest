# Review 1332 — 80a89d3e — resist tell-shield shieldeff_mon arm (D-2366)

Metadata: SHA `80a89d3e`, `js/zap.js` only (+10/−3: one `if (tell)` arm +
docstring). No new modules, no new edges (callee is a hoisted same-file
function). D-log: D-2366, short commit message, map-named row.

## Intent vs deliverable

Subject promises the C `zap.c:6141–6144` tell-shield arm in otherwise-live
`resist`. Diff adds exactly `if (tell) await shieldeff_mon(mtmp)` before
the halve and retires the `void tell` deferral. Matches.

## Inventory

- `resist` — one arm (no new helpers, no clones added, no stubs).

## C ↔ JS fidelity

Vs C `zap.c:6100–6158` (body re-read above): the `if (resisted)` arm now
runs shield-before-halve gated on `tell`, matching `:6141–6144`
(`if (tell) shieldeff_mon(mtmp); damage = (damage+1)/2`) — including the
C integer-division shape via the pre-existing `Math.trunc((dmg+1)/2)`.
The surrounding alev/dlev/rng/damage/kill arms are untouched and were
already live. Confirm.

Callee classification: `shieldeff_mon` (`js/zap.js:3650`) is a
pre-existing file-local (present at parent `:3646`), re-verified here
vs C `mon.c:6058–6066`: `shieldeff(mx,my)` + `cansee`-gated
`pline_mon(Monnam resists!)` — exact, so a verified CLONE, not a stub.
This SHA wires it at the C-cited position; per the combined-arm rule
the arm ships (every callee LIVE or verified CLONE). `sym.mjs`
output pasted per Method (`NOT EXPORTED — 1 LOCAL CLONE in zap.js`;
no canonical export exists to import, so no retire is owed here).
Confirm.

## Hallucinations / overclaim

None — the one-arm claim is exactly the diff.

## Density

~10 lines for a one-arm C locus. Minimal; acceptable (C is that small).

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify resist --base 80a89d3e~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous; the D-log Verify bullet for this
  SHA is terse (message-only commit) but the queue row cited 0 blocks,
  so no `--base` owed and no PASS was claimed. Confirm.
- Green/strict/cohort covered by the loop's `verify.mjs` gate quoted on
  sibling SHAs; tree has since moved.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
