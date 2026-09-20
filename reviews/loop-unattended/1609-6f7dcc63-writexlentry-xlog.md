# Review 1609 — 6f7dcc63 — topten.c writexlentry + XLOGFILE family (D-2650)

**Metadata:** SHA `6f7dcc63`, `topten.c` `writexlentry` + encoders,
D-2650. JS: `js/topten.js` (+314: 5 exports + file-local
`add_achieveX`) + `js/allmain.js` (+11: new `timet_to_seconds`
export) + `js/insight.js` (one keyword: `sokoban_in_play` → export).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: `writexlentry` tab-separated line builder in C
order, `encodexlogflags`/`encodeconduct`/`encodeachieve`,
file-local `add_achieveX`, full 22-arm
`encode_extended_achievements` + 19-name `encode_extended_conducts`.
Diff delivers all of it. Promise matches deliverable.

## Inventory

- `writexlentry(tt, how)` — C `writexlentry :339–391` (FILE* ⇒
  return string).
- `encodexlogflags` (`:393–408`), `encodeconduct` (`:410–452`),
  `encodeachieve(secondlong)` (`:454–476`), `add_achieveX`
  (file-local), `encode_extended_achievements` (`:490–581`),
  `encode_extended_conducts` (`:583–610`).
- `timet_to_seconds` (allmain.js, new export at C home) —
  `timet_delta(ttim, 0)` ≡ C `allmain.c:986–992` verbatim ✓.
- `sokoban_in_play` (insight.js) — export-only, body pre-existing.
- No deleted symbol, no clone→import re-point (topten.js held no
  local clone of any joined import).

## C ↔ JS fidelity

C loci read here: `writexlentry :339–391` (full, quoted above),
`encodexlogflags/conduct` (full), `encodeachieve` head,
`add_achieveX :479–488`, rank arm `:565–575`, conducts `:583–610`,
`timet_to_seconds :986–992`. No RNG either side. Confirm:

- 33-field line order byte-matches C (version→points→…→rerolls +
  `\n`); `while=` gated on `multi < 0` with `?? "helpless"` ✓;
  `conduct/achieve/flags` as `0x`+lowercase-hex ≡ `%lx` ✓;
  `gender0`/`align0` filecode reads ✓; `gold =
  money_cnt+hidden_gold(TRUE)` ✓.
- `encodeconduct` 14 bits in order, sokoban bit gated on live
  `sokoban_in_play` (probe shows 0x2FFF→0x3FFF) ✓; `encodeachieve`
  31-bit cap + secondlong offset (probe covers) ✓.
- Rank arm: `rank_of(rank_to_xlev(absidx − (ACH_RNK1−1)),
  game.urole.mnum, achidx<0)` + strNsubst-spaces + lcase ≡ C
  `:568–572` (`Role_switch` ≡ `gu.urole.mnum`) ✓; default arm
  `continue` ✓.
- Conducts: all 19 names in C order; sokoban gated on in-play ✓;
  `bonesless` as `flags.bones === false` — stricter than C's
  `!flags.bones`, and correctly so: C defaults bones TRUE
  (always initialized), while JS `undefined` must read as enabled;
  `!` would misread unset. Verified reasoning, not a wrong.
- Callees LIVE (sym.mjs): `formatkiller` end.js, `money_cnt`
  shk.js:4415 (import direction right — 5 clones elsewhere
  untouched, out of scope), `hidden_gold` vault.js:100,
  `num_genocides` + `sokoban_in_play` insight.js:263/315,
  `timet_to_seconds` allmain.js:1328, strNsubst/lcase, rank
  fns, 22 ACH_* consts. No STUB in a live arm. OMITs named:
  FILE*/lock append (no VFS consumer, D-2585 stands), alloc≡GC.
- C caller `:718` (xlogfile append) has no JS caller — producer for
  external post-processors, named. Body complete.

One shared-convention note (not this SHA's wrong): `wizard`/
`discover` read as `flags.debug||flags.wizard` /
`flags.explore||flags.discover`, while flag.h:30/33 define the
macros as single flags (`flags.debug`, `flags.explore`). The port
matches the live `topten()` read (topten.js:758–759) byte-for-byte —
xlog flags stay consistent with the score display. Any narrowing
belongs to the pre-existing convention, not this diff.

## Hallucinations / overclaim

None. "33-field line shape" and "neg-id abs switch" probe claims
match the code read here.

## Density

Breadth phase: 314 insertions for a 53 L + ~270 L encoder family —
one C function family, right-sized (shared-file full 44/44 run
correctly included since allmain.js/insight.js changed).

## Verification

D-log Verify bullet claims PASS on both fns + full 44/44 + probe
24/24. Re-measured here: `hidden-proxy.mjs verify writexlentry
--base 6f7dcc63~1 --reach-all` → 0 blocked both sides (vacuous note
quoted verbatim, correctly labeled) + smoke 24/24 REACH-OK, no
REGRESSED. Claim true. Diff grep: no FORCE/DIAG/getRngLog/seed/
coordinates/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
