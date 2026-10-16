# Review 2863 — 1c7d7bc15 — muse create-monster MM_ASYNCGROUP + birthPtr gate

## Metadata

- SHA: `1c7d7bc15a582e38b1d936f8a4b5253046f57b02` (D-4021)
- Cliff writer: xname_flags divergence (group paint lumped
  before member-Norep More) + use_defensive; live-head claim
  with stale-block note (see Density)
- js/ diff: `js/muse.js` +10/-4 (flag ORs ×4 + import),
  `js/makemon.js` +9/-2 (birthPtr stash + tail gate);
  `scripts/muse-create-monster-group-split.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: (1) wire `MM_ASYNCGROUP` through both muse
create-monster arms (D-4014 pattern: member appears inline,
mid-group More splits placements like C); (2) fix the
deferred tail to gate group/invent predicates on the stashed
birth type instead of `mtmp.data` (a shapechanger birth's
newcham swaps data — doppelganger birth fired an orc-zombie
SGROUP gate). 8 PASS + 1 moved.

Diff actually: 4 flag ORs, the import, stash field, tail
`ptr` line + comment. Promise == diff.

## Inventory

- `use_defensive` (`js/muse.js:2653-2690`, C
  `muse.c:998-1036`): flag ORs only; arm logic untouched.
- `makemon` FLAGSET (`js/makemon.js:3796`): stash gains
  `birthPtr: ptr`.
- `makemon_appear_msg` deferred head (`:3910`): `const ptr =
  deferred.birthPtr || mtmp.data` gates SGROUP/LGROUP +
  `is_armed`/`is_domestic`.

## C ↔ JS fidelity

- C `makemon.c:1356-1367` (read): sync-prefix `newcham`
  swaps `mtmp->data` and clears `allow_minvent`; local `ptr`
  stays the birth type. C group gates `:1430-1439`
  (`ptr->geno & G_SGROUP/LGROUP`) and invent predicates
  `:1443/:1447` (`is_armed(ptr)`, `is_domestic(ptr)`) all
  read `ptr` — the tail now does too. Direction correct.
- C `m_initgrp` `:79-145` (read): members use `mtmp->data`
  (current form) for `enexto_gpflags` and `makemon` — JS
  keeps passing `mtmp` (data) as member type. Correct split:
  gates on birth, members on current.
- JS order: `let ptr = mdat` (birth) → `newcham` at `:3694`
  → stash at `:3796` — `birthPtr` is genuinely the birth
  type. The `|| mtmp.data` fallback only covers
  cross-version in-flight stashes.
- Muse arms: C passes `NO_MM_FLAGS` (`muse.c:1022`, read);
  the JS-only flag adds zero draws and only selects the
  C-order deferred tail (mechanism verified in 2857). No RNG
  change except placement splitting across Mores, which is
  the fix.
- `sym.mjs`: `MM_ASYNCGROUP` import joins the existing
  const.js import line — no new edge. Nothing deleted or
  re-pointed. (`canseemon||sensemon` vs C `canspotmon` in
  the scroll arm is pre-existing, untouched here.)

## Hallucinations / overclaim

None. The temp-DIAG doppelganger measurement (FLAGSET
type=270 vs TAIL type=241) is reported as reverted
diagnostics, and the fix direction matches the C reads above.

## Density

One cause (mid-group More split), one family, 9 sessions
moved — plainly session-reaching, not a self-filed row. The
Status note (committed block stale, worked the live head) is
transparent; I did not fully reconstruct the live-vs-
committed ranking archaeology, but the re-measure below
proves the rows were live. `Ledger:` use_defensive ported +
makemon partial with accurate notes. Follow-up wiring
(read.c hero scroll) correctly refused until a generated row
names it. Test 2/2 PASS (re-run; fail 0).

## Verification

Re-measured `--base 1c7d7bc15~1 --no-reach`, both exact:
`verify xname_flags: 4 PASS, 0 moved past, 0 unchanged, 0
worse`; `verify use_defensive: 4 PASS, 1 moved past
(738→748), 0 unchanged, 0 worse`. 0 worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
