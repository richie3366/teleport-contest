# Review 905 — 45c4bb85 — found_artifact/find_artifact discovery tracking (D-1935)

Metadata: SHA `45c4bb85`, D-1935. Files: `js/artifact.js`
(+41: `found_artifact`, `find_artifact`), `js/objnam.js`
(+10: `set_find_artifact` + one `xname` line). Map-driven
Open row (data.md), 0 corpus blocks cited.

Intent vs deliverable: subject promises discovery tracking
(`artiexist[].found` + `LL_ARTIFACT` livelog) plus the
`xname_flags` call-site arm. The diff delivers exactly
that; nothing else. Promise ≡ diff.

Inventory: two new sync exports (`artifact.js:419`,
`:436`; `sym.mjs`: single definitions, no collision) + one
late-binding setter mirroring `set_undiscovered_artifact`
(D-1521 cycle dodge: artifact already imports objnam).
No stub, no new omit beyond the named impossible arms.

**C ↔ JS fidelity**: `found_artifact`
(`artifact.c:408–417` via csym): C's two error arms
`impossible()` and continue *without* setting found — JS
early returns keep exactly that (never set on bad
index/missing exists). `find_artifact` (`:420–459`):
`a && !found` short-circuit, `found_artifact(a)` call,
then the where-ternary in C order (FLOOR →
`inside_shop != NO_ROOM` shop/floor → CONTAINED →
MINVENT → catchall `""`), then
`livelog_printf(LL_ARTIFACT, "found %s%s",
bare_artifactname)` — JS matches arm-for-arm, including
the inside_shop-over-costly_spot choice the C comment
mandates. Call site (`objnam.c:660–661`, read directly):
`if (obj->oartifact && obj->dknown) find_artifact(obj)`
after observe, before `obj_is_pname` — JS's guarded
`xname` line sits after `_xname_observe`, before
CORPSE/base, on real `obj.dknown` per the C comment at
`:656–658`. No RNG either side. Callee closure: LIVE =
`inside_shop` (`shk.js:727`), `livelog_printf`
(`pline.js:23`), `bare_artifactname` (same-module
`artifact.js:565`). Named omits (in-commit, C-cited):
the two `impossible()` arms, steal-arm wiring, dogmove/
monmove where-timing — all with loci.

Hallucinations / overclaim: none. The D-log calls its own
hidden-verify "vacuous" and makes no corpus-PASS claim.

Density: ~51 lines for a two-function family + wiring —
right-sized per §2b.

Verification: re-measured `hidden-proxy verify
find_artifact --base 45c4bb85~1` → `0 session(s) blocked
on it (0 at baseline, 0 in the working scoreboard)` —
vacuous as stated, nothing owed. D-log gates: preflight
green 2/2 + strict, post green 2/2 + strict ×2, cohort
7/7; full skipped (no shared file) — legitimate. Rule #2
clean (`imports.mjs --rulecheck`). Diff grep: zero banned
hits (only the message's own denial).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
