# Review 1123 — 756b0fe9 — do_light_sources exact circle ring (D-2157)

Metadata: SHA `756b0fe9`, js/ +11/−2 across `light.js` and
`vision.js`. D-log D-2157. Subject promises: exact C circle ring
instead of a square for `do_light_sources`; scen-wish-Valkyrie-92206
moves use_lamp@220 → do_statusline1@253 (+33 steps, later owner);
queue row misattributed to `use_lamp`.

Intent vs deliverable: promise matches diff. Actually adds:
(1) `circle_ptr(range)` import + `limits[Math.abs(y − ls.y)]` offset
replacing `const offset = range` ("Approximate circle as square");
(2) one `export` keyword on `circle_ptr` in `vision.js`; (3) header
comment + map `data.md` updates retiring the named omit. No scope
creep, no new file.

Inventory: no new functions; one computation ported in place plus
an export-keyword visibility change. `circle_ptr` table itself
untouched (already a verbatim C copy of `circle_data` /
`circle_start`).

**C ↔ JS fidelity**: confirmed against
`nethack-c/upstream/src/light.c:168–250` (csym range for
`do_light_sources`). Line-for-line: `limits = circle_ptr(ls->range)`
(`:218`), y clamps (`:219–222`, max_y ≥ ROWNO → ROWNO−1, y < 0 → 0),
`offset = limits[abs(y − ls.y)]` (`:225`), x clamps (`:226–229`,
<1 → 1, ≥COLNO → COLNO−1), then the at-hero COULD_SEE arm
(`:228–233`, the clear_path correction) vs the `clear_path` arm
(`:234–240`). JS walks the same branch order with identical clamps
and both paint arms intact, including the center-cell
`(ls.x === x && ls.y === y)` short-circuit. The two remaining gaps
(LSF_NEEDS_FIXUP refresh; at-hero duplicate-source trim) are
OR-idempotent and named in the code comment + map — legitimate
omits, not stubs. No RNG draws on either side, so no keystream walk
is owed. `sym.mjs circle_ptr` → single sync export in
`js/vision.js:77`, no clone; no deleted or re-pointed symbols, so no
`--can` cycle question beyond the D-log's ALREADY (same 82-module
SCC, hoisted function, no new edge). No STUB in a live arm.

Hallucinations / overclaim: none. The D-log correctly downgrades
the owner string: `use_lamp` is a topline-literal tie-break across
cMsgOwners (same class as parked doname_base/zapyourself), its own
arms verified faithful arm-for-arm, true writer the TEMP_LIT ring.
The measured probe is cited (prefix replay: JS lights CORR (59,16)
at dy=2 where C's `circle_ptr(3) = [3,3,2,1]` excludes x=59), not a
bare RNG count.

Density: 12 js/ insertions on a 2-line C fix + export keyword.
Below the ~40-line norm, but C is exactly this small — §2b allows
it, and the misattribution analysis + probe come in the same commit.

Verification: D-log bullet shows `verify.mjs --fn use_lamp` →
hidden PROGRESS + green 2/2 + strict ×2 + cohort 7/7 + full 44/44
(auto: shared file changed). Re-measured:
`hidden-proxy.mjs verify use_lamp --base 756b0fe9~1` → "0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS" (Valkyrie-92206
use_lamp@220 → do_statusline1@253). True claim, no vacuous check.
`imports.mjs --rulecheck` → Rule #2 clean. Diff grep: no FORCE,
DIAG, getRngLog, seed names, fastforward, or hardcoded coordinates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
