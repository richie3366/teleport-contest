# Review 2313 — 1a4880b6b — dmgtype_fromattack canonical + 5-clone removal

Metadata: SHA `1a4880b6b`, D-3357, C `mondata.c:698–708` /
`:711–715` / `:54–57`. Stat: 6 js files, 7 clones deleted, 1
new canonical export, 35 sites rewired, test extended (8/8).

Intent vs deliverable: subject promises "dmgtype_fromattack
canonical export + dmgtype/attacktype 5-clone removal
(mhitm/mhitu/monmove/zap → live exports)". Diff actually: 7
edge extensions (all inside existing import braces), 1 new
canonical port, 7 clone deletions, mhitm export-list shrink.
Matches promise. Commit message again prints only the
dmgtype Verify/Named bullets; the D-log carries all three —
truncation, record complete.

Inventory (dmgtype_fromattack): 1 new **C callee** port at
js/mondata.js:93 + 2 clone deletions (mhitm exported,
mhitu local). Both clones dropped the C `:705`
`atyp == AT_ANY` arm — the canonical restores it.

Inventory (dmgtype): 4 clone→import (mhitm/mhitu/monmove
`|0`-folded for-of; zap `dmgtype_zap` NATTK-bounded,
unfolded rhs). Live target untouched (reviewed exact in
2311).

Inventory (attacktype): 1 rename-clone→import
(`attacktype_mm`, `|0`-folded). Live target untouched
(reviewed exact in 2306).

C ↔ JS fidelity (dmgtype_fromattack): C (`mondata.c:698–708`)
scans `mattk[0..NATTK)` returning `struct attack *` or NULL
on `adtyp == dtyp && (atyp == AT_ANY || aatyp == atyp)`; no
RNG. JS mirrors the predicate exactly, including the
restored AT_ANY arm, in boolean shape. Boolean shape is
justified: all 8 C refs are boolean context
(mondata.c:260/:261 `if`, :714 `?:`, polyself.c:108/:109
PROPSET, mondata.h:72/:74 `!= 0`, extern.h decl) — verified
via `csym --callers`. All 8 JS sites are boolean context
too (`||`/`if`/`!!`), and none passes AT_ANY
(all AD_BLND + AT_EXPL/AT_GAZE) — the restored arm is
latent, so the rewire is behavior-neutral at every site.
Branch-by-branch confirm.

C ↔ JS fidelity (dmgtype): live ≡ the three `|0`-folded
clones on int inputs; zap's NATTK/`?.` shape differs from
live only for a short-slots AD_PHYS(0) probe, while its 2
sites pass const AD_SEDU/AD_SSEX — identical. D-log Callers
maps all 21 sites to real C call sites (resists_magm,
rustm, could_seduce, sticks ×2 files, seduce, STCK/STUN,
RUST/CORR, zap SEDU/SSEX). Confirm.

C ↔ JS fidelity (attacktype): live fordmg AD_ANY ≡ the
`|0` aatyp scan per D-3355 precedent; 5 sites pass const
AT_ENGL/HUGS/EXPL/BOOM mapped to mon.c sticks/mswallower/
reconstitutes. Confirm.

Hallucinations / overclaim: none. The "boolean shape" and
"latent AT_ANY" claims are each falsifiable and both check
out against pinned C and the JS call sites.

Density: 3-function same-C-file (mondata.c) cluster, each
whole, each with D-log C-locus/JS/Callers/Verify/Named
bullets + `Ledger: … ported` ×3 + combined `verify.mjs`.
Per function: dmgtype ACCEPT; attacktype ACCEPT;
dmgtype_fromattack ACCEPT.

Verification: re-measured in one call — `verify
dmgtype,attacktype,dmgtype_fromattack --base 1a4880b6b~1
--reach-all` → all three "0 blocked" + vacuous-note +
"fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK"; matches the D-log (rows cited 0 blocks).
`--can`: 4/4 sampled edges ALREADY (all 7 diff edits extend
existing braces — no new edge possible). Rule #2 clean
(iteration-wide). Diff grep: no banned patterns. `sym.mjs`
output (required paste):

```text
dmgtype          js/monsters.js:565   sync
attacktype       js/mondata.js:81   sync
dmgtype_fromattack js/mondata.js:93   sync
attacktype_mm    NOT FOUND in js/** (no export, no local function/const).
dmgtype_zap      NOT FOUND in js/** (no export, no local function/const).
```

Actionable C-wrongs: none.

Verdict: **ACCEPT**
