# Review 910 — 628d0ae3 — gcrownu/at_your_feet + add_weapon_skill (D-1940)

Metadata: SHA `628d0ae3`, D-1940. Files: `js/pray.js`
(+304: `at_your_feet`, `gcrownu`), `js/weapon.js` (+28:
`add_weapon_skill`). Map-driven Open row, 0 corpus
blocks cited. Largest diff this batch (317 insertions).

Intent vs deliverable: subject promises the crowning
family (crowning gift + feet announcer + skill slot).
The diff delivers exactly that. Promise ≡ diff.

Inventory: two new async exports + one sync export
(single definitions). Two new edges, both `--can`-
cleared in-commit. New file-local `Your` (3rd repo
clone — see below). Named omits in-commit: SetVoice
pitch, actualoname→override_ID+xname nuance,
`give_may_advance_msg` body, caller wiring.

**C ↔ JS fidelity**: `at_your_feet`
(`pray.c:787–802` via csym) — Blind→Something,
uswallow→stomach, else beneath/at + feet, `vtense`
verb choice keyed on `Blind` — exact. `gcrownu`
(`:804–996` via csym, read in full) — walked
arm-by-arm: six intrinsics + godvoice; wizard/monk
class-gift gates (incl. the 3.3 comment); ok_wep
macro as arrow; lawful/neutral/chaotic switch
(livelog strings verbatim, uhand 1/2/3, take-lives/
steal-souls ternary); SPBOOK arm (mksobj TRUE/FALSE,
bbuf-before-drop, bless/bknown/observe,
upstart(ansimpleoname), dropy, ugifts++, 3-flag
livelog, known_spell→obj=uwep); second switch
(Excalibur simpleonames-before-oname order kept;
snicker-snack / hums arms; spe=1; P_LONG_SWORD /
P_BROAD_SWORD unrestrict); enhance tail (bless,
oeroded/oeroded2=0, proof, bknown+rknown, spe floor,
weapon_type unrestrict, else-if unworthy); update_inv
+ add_weapon_skill(1). No divergence found.
`add_weapon_skill` (`weapon.c:1436–1450` via csym) —
before/after `can_advance` counts exact; the
`give_may_advance_msg(P_NONE)` arm is an empty if
body, named in JSDoc + D-log with C citation — a
proper OMIT, not a silent stub. No RNG in any arm.
Debt note (not a C-wrong): `Your` is now 3 identical
file-local clones (`sym.mjs`); the wrapper is
divergence-proof (`pline('Your '+rest)`), but a 4th
copy should import instead.

Hallucinations / overclaim: none. Export-smoke +
vacuous verify both labeled as such.

Density: 317 lines for a 193-line C function + two
helpers — one locus family, justified per §2b.

Verification: re-measured `hidden-proxy verify
gcrownu --base 628d0ae3~1` → `0 session(s) blocked
(0 at baseline, 0 working)` — vacuous as stated.
D-log gates: preflight + post green 2/2 + strict ×2,
cohort 7/7; full skipped (two files, no shared-flag
claim — borderline but the new edges are
`--can`-cleared runtime-only reads). Rule #2 clean.
Diff grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
