# Review 2674 — 38c910247 — swim_move_danger writer: u_locomotion slot unions

Metadata: SHA `38c910247`, D-3810, cliff row-2 `hack.c` swim_move_danger
writer (@6657185de; row-1 void-barred, falsifier live-checked). JS:
`js/hack.js` (+7/−2, two arms). Test:
`scripts/u-locomotion-levitation.test.mjs`.

## Intent vs deliverable

Promise: u_locomotion read never-written `u.Levitation`/`u.Flying`
flats, so every call fell to the polyform fallback ("fly"/"step");
both arms now read flat OR file-local slot union. Claimed: 2 PASS.
Diff actually does: two `||` unions + C cite. Match.

## Inventory

- `u_locomotion` (js/hack.js:2246) — changed: two arm predicates. C
  `hack.c:1816–1829` (csym range).
- Callees `Levitation_st`/`Flying_st` (hack.js:3300/3311) — pre-existing
  file-local unions, same module, no import. No new helpers, no
  deletes, no re-points.

## C ↔ JS fidelity

C (:1826–1828): `Levitation ? Float/float : Flying ? Fly/fly :
locomotion(data, def)` with capitalize from `*def == highc(*def)`.
JS keeps the identical ternary shape; predicates become `u.Levitation
|| Levitation_st()` / `u.Flying || Flying_st()` where the helpers are
C-exact macro expansions (H/E flats OR slot H/E, either blocked
source; Flying_st includes the steed is_flyer arm — matches
youprop.h:235–240 / :253–256). Dead-flat claim verified: no
`u.Levitation =` write and no `.Levitation:` initializer exist in
`js/` — both old arms were provably dead. Firing-level measurement
(temp DIAG, reverted): 95347's single firing (E/sE 131072, levUnion
true, fly blocked) → "float"; 95213's 9 firings — first 8 all-zero
(match C's "stepping", unchanged), 9th (E/sE 32, levUnion true) →
"float". Fix flips exactly the divergent firings. No RNG in the body;
none added. 14 JS call sites inherit (signature unchanged); C's sole
swim_move_danger site (hack.c:2852) → cmd.js:6878 already wired.
Gap: none. Predicate-by-predicate confirm.

## Hallucinations / overclaim

None. Owner verified whole (message fires identically, only the
locomotion word differs) and not re-ported. Diagnosis chain is
measured: RNG identity proves same polyforms both sides, so C's
"floating" ⟹ C Levitation true — no inference leap.

## Density

Cliff-phase: writer correct, function now whole vs C :1816–1829.
Named latents (u_simple_floortyp :1835 dead-flat air-read, mhitu
Levitation() H/E-only, 10 Levitation clones) are named with
firing-level outcome agreement (10/10, gate fired iff C fired) — the
latent direction has no reaching probe, honest per the no-sweep rule.
Ledger: `u_locomotion ported`. Verify bullet: 2 PASS + REACH-OK +
green + strict + cohort + auto full 44/44. Not unreached: both
probes PASS.

## Verification

Added-lines grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify swim_move_danger --base 38c910247~1
--reach-all` → `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(95347/95213 PASS) and `smoke 24/24 → REACH-OK` — exactly the D-log
claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
