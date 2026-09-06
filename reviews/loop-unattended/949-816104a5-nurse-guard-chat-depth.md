# Review 949 — 816104a5 — sounds.c domonnoise MS_NURSE/GUARD nurse/guard chat depth (D-1979)

- SHA: `816104a5` — "sounds.c domonnoise MS_NURSE/GUARD nurse/guard chat depth (D-1979)."
- D-id: D-1979. JS: `js/sounds.js` (1 file, +55/−13). C locus: `nethack-c/upstream/src/sounds.c` `MS_NURSE` `:1160–1172`, `MS_GUARD` `:1173–1178`, decl `:682–686`, mcan epilogue `:1222–1228` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the nurse/guard arms in C switch order with the mcan
variable staged. Diff actually adds: `MS_NURSE` + `MS_GUARD` else-if
arms (before SOLDIER, matching C), `verbl_msg_mcan` declaration + NURSE
set, four import-name extensions, doc/deferred-comment updates. Promise
matches deliverable.

## Inventory

- New: 2 arms, 1 local (`verbl_msg_mcan`, set-but-unconsumed by design).
- Changed: import lines, domonnoise doc block, epilogue comment.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Both arms walked against the C text (no RNG in either — "order-exact
by construction" is vacuous-but-true here since there are no draws):

- NURSE `:1160–1172` ✓: unconditional `verbl_msg_mcan = "I hate this
  job!"` ✓; ladder `uwep && (WEAPON_CLASS || is_weptool)` ✓;
  `uarmc||uarm||uarmh||uarms||uarmg||uarmf` in C order ✓ with
  `Role_if(PM_HEALER)` → Doc vs undress ✓; `uarmu` → shirt ✓; else
  relax ✓. All five strings verbatim.
- `uwep` ≡ `game.u.uwep`, `uarm*` ≡ `game.u.uarm*` (do_wear precedent
  cited) ✓ — these are C's worn-item globals, no accessor subtlety.
- `Role_if(PM_HEALER)` ≡ `(game.urole?.mnum|0)===PM_HEALER`: verified
  byte-identical to the potion.js:419 `Role_if_healer` precedent (which
  is unexported, so the local inline is the codebase-shaped choice, not
  a clone) ✓.
- GUARD `:1173–1178` ✓ verbatim with `money_cnt(game.invent)` (C
  `gi.invent`) ✓.
- `verbl_msg_mcan` staging matches C exactly: declared at `:684`,
  set at `:1161`, consumed at `:1224–1226` — decl+set ship here,
  consumption stays named for the next Open row (map + D-log + code
  comment all say so). The dead store is therefore staged C order, not
  an omission ✓. Epilogue comment updated to cite the exact consumer
  lines ✓.

Callee closure: `is_weptool` (wield.js — `--can`: ALREADY edge, new
name only), `money_cnt` (shk.js ALREADY, re-checked), `WEAPON_CLASS`
(objects.js ALREADY), `PM_HEALER` (generated/monsters_data.js — genuinely
new module edge for sounds.js, but the target has **zero** imports
(verified) and the export exists (`PM_HEALER = 334`, verified by import)
— cycle- and TDZ-impossible, D-log's "leaf" claim true). No STUBs, no
clones. Block-scoped `const uwep`/`const u` cannot collide with function
scope ✓.

## Hallucinations / overclaim

"8/8 exact C strings" probe claim is plausible (5 nurse + 2 guard + 1
mcan, all verified verbatim above). No dispatch/stub mismatch. The
D-log does not claim the mcan arm works — it names the consumer row.

## Density

+55/−13, two adjacent arms + staged variable, one module. Right-size
per §2b; the mcan consumption row is already queued as next.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green + strict
+ cohort 7/7 (no full-suite line this time — single-module display-free
change with no reachability impact; the cohort + green gates suffice).
Re-measured: `verify domonnoise --base 816104a5~1` → 0 blocked at
baseline and now. `imports.mjs --rulecheck` clean (re-run this review).
Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
