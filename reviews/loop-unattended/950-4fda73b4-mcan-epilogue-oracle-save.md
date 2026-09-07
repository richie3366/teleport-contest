# Review 950 — 4fda73b4 — sounds.c domonnoise mcan epilogue + oracle save-rest (D-1980)

- SHA: `4fda73b4` — "sounds.c domonnoise verbl_msg_mcan epilogue + oracle_loc save-rest (D-1980)."
- D-id: D-1980. JS: `js/sounds.js`, `js/rumors.js`, `js/save.js` (+55/−10). C locus: `nethack-c/upstream/src/sounds.c` `domonnoise` epilogue `:1222–1241`, `rumors.c` `save_oracles` `:597–619` + `restore_oracles` `:622–636`, call sites `save.c:321` + `restore.c:712` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the cancelled-nurse epilogue arm plus oracle-deck
save/restore. Diff actually adds: the `mtmp.mcan && verbl_msg_mcan`
epilogue arm, exported `save_oracles()`/`restore_oracles(saved)`, the
`oracles` payload write + restore call, comment updates. Promise
matches deliverable.

## Inventory

- New: 1 arm, 2 exported functions, 1 save payload key + 1 restore call.
- Changed: import line (save.js), doc comments.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Epilogue `:1222–1241` ✓ branch-by-branch: C's
`if (pline_msg) … else if (mtmp->mcan && verbl_msg_mcan) … else if
(verbl_msg)` maps to three JS `if`+`return` arms in the same order.
C has one trailing `return ECMD_TIME`; JS returns inside each arm —
same value on every path, nothing in between, so equivalent ✓.
`SetVoice(mtmp, 0, 80, 0)` + `verbalize` matches C's
`SetVoice` + `verbalize1` via the same fold the adjacent
`verbl_msg` arm uses (sounds.js:1372 vs :1386) ✓. No RNG on this path.

`save_oracles` ✓: cnt + live-deck prefix only (`loc.slice(0, cnt)`),
C `Sfo_unsigned`/`Sfo_ulong` loop shape. The `release_data` FREEING
arm (zero cnt/flg + free) is omitted with a named precedent
(save_msghistory); in C that arm runs post-write before exit, so
keeping in-memory state is behavior-neutral for restore ✓.
`restore_oracles` ✓: cnt 0/missing → early return leaving flg at
fresh-boot 0, exactly C's "no flg assignment on cnt 0"; nonzero →
deck + `flg = 1` with C's own comment preserved ✓. Short-entry
zero-padding is defensive-only (C reads exactly cnt) ✓.
Call-site order matches C: save after artifacts (`save.c:321`),
restore after artifacts (`restore.c:712`) ✓.

Callee closure: `SetVoice`/`verbalize` already imported (no new
edge); `save_oracles`/`restore_oracles` are hoisted function
declarations read lazily in `dosave0`/`try_restore_save` bodies —
`--can` reports the save.js→rumors.js edge ALREADY, same SCC, and
hoisted functions cannot TDZ ✓. No STUBs, no clones.

## Hallucinations / overclaim

None. D-log claims "exact C order", verified above; makes no
corpus-PASS claim (states vacuous explicitly).

## Density

+55/−10 across three files, one C family (domonnoise epilogue) plus
its save/restore tail. Right-size per §2b.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green +
strict + cohort 7/7 + full 44/44. Re-measured:
`verify domonnoise --base 4fda73b4~1` → "0 session(s) blocked on
it (0 at baseline, 0 in the working scoreboard)". `imports.mjs
--rulecheck` clean (re-run this review). Added-line grep: no banned
tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
