# Review 1098 — 4d859c92 — make_stunned poly stagger verb via local clone (D-2132)

Metadata: SHA `4d859c92`, `js/potion.js` +31/−3 only. Queue row
`mhitu.c` gazemu, scen-poly-Tourist-92047 step 163/189, screen-first
at `mhitu.c:1806`: C «You are blinded by the Archon's radiance! You
falter... It hits!--More--» vs JS «... You stagger... It hits!».
Recipe polys stone golem → djinni → marilith, then the Archon. No
prior review claimed closed.

## Intent vs deliverable

Subject promises: marilith-poly hero printed the human-default
stagger verb where C prints the slithy verb; fix ports the
`stagger()` selector. Diff actually adds: file-local `stagger_poly`
plus import-line extension and a one-line pline change. Promise
matches diff.

## Inventory

New JS: `stagger_poly(ptr, def)` (potion.js, hoisted `function`, no
new import edge — `is_floater`/`is_flyer`/`slithy`/`amorphous`/
`nolimbs`/`MZ_SMALL` join the pre-existing monsters.js edge).
Classification: **CLONE** of C `mondata.c:1394–1407` `stagger`.
`sym.mjs stagger` reports NOT EXPORTED with one pre-existing local
clone at `js/mhitm.js:845` and advises against clone #2 — noted
below; there is no JS export to import, so a same-commit export
refactor was the only alternative. No stub, no no-op, no RNG, no
DIAG/FORCE/seed gates; `imports.mjs --rulecheck` clean.

## C ↔ JS fidelity

C `stagger` (`csym.mjs`, 14 lines): `locoindx = (*def !=
highc(*def)) ? 2 : 3`, then the chain floater → flyer-small →
flyer-large → slithy → amorphous → !mmove → nolimbs → def. Tables
(`mondata.c:1367-1370`): `slither = {"slither","Slither","falter",
"Falter"}`, i.e. index 2 is the lowercase verb. JS reproduces the
chain arm-for-arm in C order with `pick(lo,hi) = cap ? hi : lo`
where `cap` is exactly `*def == highc(*def)` — so `def='stagger'`
(lowercase) takes index-2 equivalents throughout. Marilith
(`M1_SLITHY`) → `slithy` arm → 'falter' → «You falter...», matching
the recorded C topline. `make_stunned` position unchanged (only the
pline argument inside the existing `else` of the usteed check) —
C `potion.c:119–126` order kept. The clone is byte-for-byte the same
logic as the mhitm.js:845 clone (compared both bodies) — no drift
between the two copies today. Verdict on the clone-#2 advisory:
matched-to-C-here CLONE, openly declared in the D-log, not a
C-wrong; the residual is duplication debt (two copies to keep in
sync), map-grade rather than Must-fix-grade. Callers left untouched
(`pickup.c`/`trap.c`/`mhitm.c` stagger sites, invent.js
near_capacity plines) are correctly out of scope — no corpus session
proves them this iter, and the D-log names them.

## Hallucinations / overclaim

None. "Same clone as mhitm.js" verified true by direct comparison.
"Exact C position" true — the surrounding `if` structure is
untouched. The D-log correctly identifies gazemu as symptom owner
(its AD_BLND arm prints only the radiance line; the verb comes from
`make_stunned`) rather than claiming a gazemu body fix.

## Density

+31/−3 for one C function (14 lines) + one call site — C is that
small. Right-sized per §2b.

## Verification

D-log Verify bullet shows `verify.mjs --fn gazemu` → hidden 0 PASS,
1 moved past (Tourist-92047 gazemu@163 → cursetxt@166) + green 2/2 +
strict ×2 + cohort 7/7. Re-measured: `hidden-proxy.mjs verify
gazemu --base 4d859c92~1` → `0 PASS, 1 moved past, 0 unchanged, 0
worse → PROGRESS` (Tourist-92047: moved → cursetxt at step 166, was
163). Claim true; movement to a later owner is PROGRESS per §2a, and
the owner change (verb fixed, next divergence downstream) is exactly
what this fix predicts. No vacuous check, no seed reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
