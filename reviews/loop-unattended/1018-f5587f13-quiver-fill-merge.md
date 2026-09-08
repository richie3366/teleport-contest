# Review 1018 — f5587f13 — addinv_core0 quiver fill fires on merge (D-2048)

Metadata: SHA `f5587f13`, D-2048, Must-fix row from
review 1014 C-wrong 1 (review-measured, zero corpus
blocks). js/ touches 1 file: `u_init.js` (+2/−8,
deletion-only). Stamps review 1014 **Addressed:**
D-2048.

## Intent vs deliverable

Subject promises: delete the merge-survivor quiver
fill so `setuqwep` fires on fresh insert only, per C
`goto added` bypass. Diff actually does: removes the
8-line fill hunk on the general-merge path, leaves a
two-line C comment. Promise ≡ diff. No import
changes.

## Inventory

- Changed JS: `addinv` (`js/u_init.js:987-997`),
  async (pre-existing awaits kept).
- `sym.mjs`: `setuqwep js/wield.js:289 sync` — real
  export, still used by the surviving fresh-insert
  arm and `ini_inv_use_obj`. No symbol deleted or
  re-pointed (deletion removes a *call site*, not
  the callee).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/invent.c:1055-1148`
(94 lines, full body via `csym.mjs`). Branch
confirm:

- Three merge paths — `other_obj` reinsert
  (`:1091-1101`), quiver-prefer merge (`:1106-1111`),
  general merge loop (`:1113-1119`) — all end in
  `goto added` (`:1100`, `:1110`, `:1118`).
- Fill arm (`:1128-1140`): `obj_was_thrown &&
  flags.pickup_thrown && !uquiver && oartifact !=
  ART_MJOLLNIR && otyp != AKLYS &&
  (throwing_weapon || is_ammo)` → `setuqwep`
  sits strictly after the merge loop, on the
  fresh-insert fall-through only. `added:` label
  (`:1141`) follows it.
- So a merged stack can never reach the fill —
  the deleted JS hunk fired `setuqwep(otmp)` exactly
  there. Deletion restores C control flow.

Residual note (not a wrong): JS `addinv` models
only the general-merge arm — quiver-prefer merge
and `other_obj` reinsert remain named map omits
(turns.md, pre-existing, re-stated in the D-log
Named line). The deleted hunk sat in the
general-merge arm only, so no named omit is
disturbed.

Callee closure: N/A (no callee added; one call
site removed from a C-bypassed path).

## Hallucinations / overclaim

None. The D-log Verify bullet labels the hidden
note "vacuous … NOT claimed as a corpus PASS"
itself — the anti-overclaim is in the source.

## Density

+2/−8, one Must-fix item alone. §2b density floor
(~40 insertions) does not apply to a Must-fix
deletion — the item ships alone by rule, and the
deleted lines are the whole fix.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed
  gates/fastforward/coords (only hit is the commit
  message quoting its own Verify line). Rule #2:
  `imports.mjs --rulecheck` → clean (this review).
- Re-measured `hidden-proxy verify addinv_core0
  --base f5587f13~1`: `0 session(s) blocked on it
  (0 at baseline, 0 in the working scoreboard)` —
  matches the D-log; vacuous honestly, as labeled.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail; `u_init.js` is not shared-file
  so full-suite skip is per procedure (cadence
  re-runs full `sessions` this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
