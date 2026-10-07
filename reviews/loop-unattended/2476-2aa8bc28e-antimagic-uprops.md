# Review 2476 — 2aa8bc28e — Antimagic_prop uprops OR (D-3595)

**Metadata.** SHA `2aa8bc28e` (2026-10-07, D-3595). Type: **cliff**:
writer (predicate) port for the cliffs head `trap.c
trapeffect_anti_magic` (owner body whole per D-2470/D-2477,
untouched). `js/` insertions: 9 (`js/trap.js` +9/−3) + committed
test.

## Intent vs deliverable

Promise: `Antimagic_prop` OR'd only the H/E/sticky flats while
worn cloak-MR confers only into `uprops[ANTIMAGIC].extrinsic, so
JS took the drain arm (`d(2,6)`) where C takes the `:2347–2371`
implosion arm (`rnd(4)` + sluggish); OR-ing uprops moves
Wizard-94001 178→227.

Diff actually adds: the uprops disjuncts, `ANTIMAGIC` on the
existing const.js edge, doc cites. Promise matches diff. No
symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | Antimagic_prop predicate | ported (C-macro shape) | [trap.js](/home/debian/dev/teleport-contest/js/trap.js:1789) | youprop.h:55–57, trap.c:2351/:2486/:2865, worn.c:123–125 |

Helpers: none added. `ANTIMAGIC` is a live const (const.js:2602,
=12 — matching the D-log's measured `uprops[12]`).

## C ↔ JS fidelity

**The predicate is now C's macro.** `Antimagic ≡
HAntimagic||EAntimagic ≡ uprops[ANTIMAGIC].intrinsic||extrinsic`
(youprop.h:55–57, read) ✓; `setworn` confers worn `oc_oprop`
into `uprops[p].extrinsic` (worn.c:123–125, read) ✓ — so the
cloak-MR hero is C-true via a channel the flats never see, and
the JS widening is required, not optional. The new body matches
the canonical `hero_Antimagic` (invent.js:5640, read) disjunct
for disjunct ✓. All three JS call sites read sites where C
reads `Antimagic`: the hero arm (:5628 ⟺ :2351), the poly-trap
arm (:5761 ⟺ :2486 `Antimagic || Unchanging`), the immune arm
(:1896 ⟺ :2865) — all three C sites read and quoted ✓. No
behavior change when flats are already true (pure OR widening)
✓. RNG: the arm switch (`rnd(4)` first draw at :2353, read) is
C's control flow, not an RNG patch ✓.

Nit: the D-log cites the `if` at :2347 — the `if (Antimagic) {`
line is :2351 (:2347 is the `int drain` decl); first-draw :2353
is exact. Cite drift only.

## Hallucinations / overclaim

None. The "C-true, JS-false" claim is measured live at the
trigger (owornmask, flats, uprops quoted); the untouched
`Passes_walls`/`Half_spell_damage` flats-only readers are named
with their falsifier (a board row), not hidden.

## Density

Cliff §10.18: cliffs-head writer, one predicate completing the
ported row, own `Ledger:` touch (D-append on
trapeffect_anti_magic). Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2471).
- Committed test `trapeffect-antimagic-uprops.test.mjs`: 1/1 PASS
  now (pre-fix FAIL quoted in-ship with the exact wrong draw).
- Re-measure (mine): `verify trapeffect_anti_magic --base
  2aa8bc28e~1 --reach-all` → **0 PASS, 1 moved past, 0 unchanged,
  0 worse** (Wizard-94001 → welcome@227, was 178 — the D-log's
  line exactly, incl. real reach **4/4 REACH-OK**). No REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
