# Review 1621 — a505c4ce — spell.c propagate_chain_lightning whole-body restart (D-2662)

**Metadata:** SHA `a505c4ce`, `spell.c`
`propagate_chain_lightning`, D-2662. JS: `js/spell.js`
(+17/−11: per-arm `:line` cites + `!defended(mon,
AD_ELEC)` live in the `:975` arm + `defended` import
join). Retires the D-1400 named omit for this arm.

## Intent vs deliverable

Subject promises: the JS carried every arm in C order
except `!defended(mon, AD_ELEC)` (commented out when
`defended` was not live), so a shock-resistant-via-
artifact monster wrongly regained strength 3 and chained
further; restart wires the live export. Diff delivers
exactly that. Promise matches deliverable.

## Inventory

- `propagate_chain_lightning(clq, zapIn)`
  (spell.js:1997, sync, local — matches C `staticfn`).
- `defended` (mondata.js:155, sync): import join, no
  local clone involved. Required `sym.mjs` paste:

```text
defended         js/mondata.js:155   sync
```

Single live export, no other defs. No deletions.

## C ↔ JS fidelity

C locus read in full: `spell.c:949–1000` (52 L, body
above). No RNG either side. Arm-by-arm confirm:

- By-value step-forward `:958–959` (copy-then-step) ✓;
  tail-limit `:961–962`, POS `:963–964` ✓.
- `m_at` `:966`, peaceful `:967–968` ✓.
- Strength `:975–978`: `if (mon && !resists_elec(mon)
  && !defended(mon, AD_ELEC)) strength = 3; else if
  (mon) strength = 0` — C short-circuit order kept,
  unbraced C shape restored ✓ (the kept C-wrong is gone:
  defended monsters now chain no further while the hit
  still lands for the shield effect, per the C comment).
- `!mon && !strength` discard `:983–984`, dup-square
  loop `:986–990`, inbounds enqueue `:992–994`, draw
  `:996–999` ✓.
- OMITs: none new (`| 0` casts + `loc?.` guards are the
  named JS data-model idiom; zhitm's own
  defended/shieldeff omits stay on their row).

## Hallucinations / overclaim

None. The `--can` SAFE claim (hoisted fn, same SCC, no
top-level TDZ read) is consistent with a plain function
import already on spell.js's import set.

## Density

Breadth phase: one-function restart, 32-line hunk —
right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort).
Re-measured here: `hidden-proxy.mjs verify
propagate_chain_lightning --base a505c4ce~1 --reach-all`
→ 0 blocked both sides (vacuous note, correctly labeled
coverage row) + smoke 24/24 PASS, 0 regressed →
REACH-OK. Claim true. Diff grep: only the `+import`
line; 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
