# Review 832 — c0ed9964 — artifact.c spec_applies ATTK resists (D-1862)

Metadata: SHA `c0ed9964`, D-1862, `js/artifact.js` (6 arms + imports) +
`js/zap.js` (8 export keywords). No Must-fix open.

## Intent vs deliverable

Subject promises the six SPFX_ATTK resists arms in C order with hero props and
mon `resists_*` imported live. Diff delivers exactly that; Magm/Stun arm
behavior unchanged (only hoists `const u`). Matches.

## Inventory

Changed: `spec_applies` switch; newly exported `Fire/Cold/Shock/Drain_resistance`,
`resists_fire/cold/poison` (all pre-existing bodies, export-only). No
deleted/re-pointed symbols. Notably the commit *imports* instead of cloning —
`sym.mjs` shows 7 pre-existing local `Fire_resistance` clones elsewhere; no
clone #8 was added (D-1849 lesson applied).

## C ↔ JS fidelity

C locus `artifact.c:1008–1060` (53 lines, read whole). Switch confirmed
arm-for-arm in C order: FIRE/COLD/ELEC/MAGM+STUN/DRST/DRLI/STON/default, with
the `yours ? HeroProp : resists_mon(mtmp)` shape exact in every arm.
`resists_drli`/`resists_ston` were already live; `Fire/Cold/Shock/Drain_resistance`
and `resists_fire/cold/poison` newly exported from zap.js (bodies untouched —
`sym.mjs` confirms single live home each). `imports.mjs --can` SAFE shape
claimed; the new edges are function-hoisted, call-at-runtime only — no
top-level TDZ read possible. No RNG added (Magm/Stun `rn2(100)<mr` pre-existing).

Two deltas, both non-findings: (a) C `default: impossible("Weird weapon special
attack.")` → JS `return 0` without the call — matches file convention
(`impossible` appears in artifact.js only as a comment; the helper is async in
display.js and sync callers port-wide skip it). (b) Hero-side reads include the
sticky flat (`u.Poison_resistance` etc.) where C macros are H||E-only — but that
is the established zap.js convention shared with the pre-existing Antimagic arm
in this same switch, not a divergence this commit introduces. Named omits
(`defended()`, DFLAG1, DFLAG2 hero-as-target arms, artifact/worn grants) are in
the D-log and the map section. No STUB in a live arm; no FORCE/DIAG/seed hits.

## Hallucinations / overclaim

None. "Dispatch ported, callee stubbed" does not occur — every callee LIVE.

## Density

One switch, ~50 lines, two already-coupled modules. Right-sized.

## Verification

D-log: syntax, rule2, hidden 0 PASS / 2 moved past (same-step re-attribution),
green, strict ×2, cohort 7/7, no full (no shared file changed — correct call).
Re-ran `hidden-proxy.mjs verify hitum --base c0ed9964~1` myself: identical
`0 PASS, 2 moved past (2 re-attributed at the same step) → PROGRESS`, both
sessions now owned by `artifact_hit` at the same step with RNG aligned through
the dieroll (`spec_abon` 0 both sides, hit/miss matches). The D-log reads the
row diff honestly instead of claiming PASS, and the continuation was genuinely
re-queued (`fe799525` restores artifact_hit; it sits in Open now). No vacuous
check, no regression.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
