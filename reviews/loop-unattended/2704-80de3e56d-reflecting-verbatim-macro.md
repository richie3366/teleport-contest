# Review 2704 — 80de3e56d — zap.js Reflecting verbatim macro (zhitu writer)

Metadata: SHA `80de3e56d`, D-3841, cliffs-head `zap.c` zhitu
writer (owner proven already-whole, ledger ported). JS:
`js/zap.js` (+11/−21: body shrink + 5 const deletions).
Test: `scripts/dobuzz-reflect-gamestate.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: Ranger-578308@813 forks exactly at the dobuzz
hero-hit Reflecting check — C (worn amulet, gamestate-clobbered
EReflecting 0) takes zhitu, JS's worn-otyp stand-in reflects;
make Reflecting() the verbatim C macro; session PASSes. Diff
actually does: body → uprops[REFLECTING]
intrinsic||extrinsic only; deletes the 5 stand-in consts. Match.

## Inventory

- `Reflecting` (js/zap.js:702, sync) — rewritten. C:
  `nethack-c/upstream/include/youprop.h:379–381` (read):
  `#define Reflecting (HReflecting || EReflecting)` ≡
  uprops[REFLECTING].intrinsic/extrinsic, nothing else. JS is
  now that expression exactly. Gate: zap.c dobuzz `:4962–4982`
  (read): zap_hit → `if (Reflecting)` reflect branch else
  `zhitu(...)` — matches the subject's fork description.
- Deleted consts: module-local, zero remaining refs
  (`sym.mjs SHIELD_OF_REFLECTION` → `NOT FOUND in js/**
  (no export, no local function/const)`; grep over js/zap.js
  empty). No re-points — no import paste required.
- `sym.mjs Reflecting` → canonical js/zap.js:702 + 2 pre-existing
  local clones (mhitu.js:3377, pray.js:1045), untouched.

## C ↔ JS fidelity

Predicate-for-predicate confirm, plus every mirror the deletion
depends on re-verified live. confer_oc_oprop (do_wear.js:409,
read) writes generic oc_oprop extrinsic; all four retired
stand-in items carry oc_oprop=65=REFLECTING in the generated
table (probed: amulet 208, shield 158, mail 103, scales 113),
matching objects.h AMULET/SHIELD/DRGN_ARMR REFLECTING arms
(read). Silver-dragon form: polyself.js:858 calls
`propset_fromform(REFLECTING, 'HReflecting', mndx ===
PM_SILVER_DRAGON)`, matching C polyself.c:106 `PROPSET
(REFLECTING, mdat == &mons[PM_SILVER_DRAGON])` (both read);
the helper writes uprops intrinsic + the HReflecting flat
together. `u.EReflecting`/`u.Reflecting` have no writers
anywhere in js/ (only a pray.js:1178 read) — the dropped flat
reads mirrored nothing. Gamestate mechanism confirmed in
pinned C: nhlua.c save runs setnotworn over the inventory
(:1777) before memcpy'ing `u` (:1785), restore re-wears
(setworn) then memcpy's the stored extrinsic-0 `u` back over
it (:1753) — worn amulet with EReflecting 0 is a real C state,
and the D-log's temp-C dump measured exactly it (`Refl=0
H=0 E=0 uamul=208`) with a zero-perturbation re-record. No RNG,
no prints in the predicate. The mhitu/pray clones keep the
stale pattern but are named in the D-log Callers bullet with a
re-entry condition (a session blocked on their arm) — a proper
named deferral, not this diff's debt. invent.js hero_Reflecting
was already uprops+flats-only (correct under the clobber).

## Hallucinations / overclaim

None. "Mirrors verified live before deleting" is true on both
mirrors (re-verified above, including the propset call site the
D-log cites only by helper line). The "0/1 pre-fix → 1/1"
falsifier and the FULL PASS numbers are corroborated by my
re-measure.

## Density

Cliff-phase: head writer correct (divergence names Reflecting
at the dobuzz gate; zhitu body already whole). One predicate,
Ledger `dobuzz ported` + D-3841, Verify bullet with movement +
REACH + green + strict + cohort + forced full 44/44 (seed0002
reflection session 27158/27158). Reached: probe FULL PASSES
(RNG 126854/126854 + Screen 1392/1392).

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run:
`no bare/node specifiers or fs calls in js/`). Re-measure
(mine): `verify zhitu --base 80de3e56d~1` → `1 session(s)
blocked on it (1 at baseline, 0 in the working scoreboard)`,
`scen-worldtour-Ranger-578308: PASS`, `1 PASS, 0 moved past,
0 unchanged, 0 worse → PROGRESS`; reach 77/77 REACH-OK. Zero
regressed. The movement claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
