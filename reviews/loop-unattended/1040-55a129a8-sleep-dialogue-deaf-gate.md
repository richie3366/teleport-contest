# Review 1040 — 55a129a8 — sleep_dialogue HSleepy split-brain + You_hear Deaf gate (D-2070)

## Metadata

- SHA: `55a129a8` — `queue owner xname_flags:864 is a literal-match bucket: the yawn is timeout.c sleep_dialogue with an HSleepy split-brain, the laugh is You_hear's dead u.Deaf gate (queue owner xname_flags, writers sleep_dialogue + You_hear) (D-2070).`
- JS diff: `js/timeout.js` +18/−1 (sleep_dialogue + call site + flat
  entry + comment), `js/wizcmds.js` +4/−1 (PROP_FLAT entry),
  `js/hack.js` +5/−2 (Deaf disjunction + comment).
- Docs: D-2070 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1040.

## Intent vs deliverable

Subject promises: (1) the missing «You yawn.» is
`sleep_dialogue` — never ported — plus an HSleepy split-brain (the
`#wizintrinsic` default arm wrote the flat or the uprop, readers saw
only one); (2) the unsuppressed scare-monster laugh is `You_hear`'s
flat-only `u.Deaf` gate missing H/E/role deafness. Diff actually adds
both, and correctly re-attributes the queue owner as a literal-match
bucket rather than a writer. Promise == diff.

## Inventory

- New file-local fn: `sleep_dialogue` (js/timeout.js), + guarded call
  site in `nh_timeout`.
- Changed: `You_hear` Deaf predicate (js/hack.js:149); `TIMEOUT_FLAT`
  / `PROP_FLAT` gain `[SLEEPY]: 'HSleepy'`; `nh_timeout` header
  omission list shrinks correctly (`sleep_dialogue` struck,
  `region_dialogue` stays).
- No new imports/edges (SLEEPY/TIMEOUT already imported in both
  files); no deleted symbols (no `sym.mjs` re-point check owed).
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `sleep_dialogue` (`timeout.c:267–274`, via `csym.mjs`): `i =
HSleepy & TIMEOUT; if (i == 4) You("yawn.")`. JS is verbatim
(`intr_bits(u, SLEEPY, 'HSleepy') & TIMEOUT`, `=== 4`,
`pline('You yawn.')`). C call site (`timeout.c:639–640`, read
directly): `if (HSleepy & TIMEOUT) sleep_dialogue();` — JS mirrors
the guard before the generic `--` loop, so it sees the pre-decrement
value exactly as C does; relative order (after `phaze_dialogue`,
`region_dialogue` deferred-named) matches C's dialogue sequence.
`HSleepy ≡ uprops[SLEEPY].intrinsic` (`youprop.h:141`, read directly);
`intr_bits` (js/timeout.js:265: flat `||` intrinsic) is the
module-standard accommodation, and both mirrors keep the two
storages in sync. Zero RNG. No branch-order divergence.

C `Deaf` (`youprop.h:123–125`, read directly): `(HDeaf || EDeaf ||
u.uroleplay.deaf)`. JS `HDeaf||EDeaf||uroleplay.deaf||u.Deaf` — the
trailing `u.Deaf` flat is the JS split-brain accommodation, and the
four-term form is token-consistent with the D-1967 idiom in
dbridge.js:391, do.js:406, detect.js:136 (verified by direct read).
CLONE-consistent, not drift. Priest-92035's HDeaf-only hero now
suppresses the scare laugh while the `(Deaf && !Unaware)` + dream-arm
shape from D-2065 is preserved untouched.

Named omits are precise, not sweeping: `region_dialogue` (adjacent
arm, same call-site block), SLEEPY-expiry `fall_asleep`+incr (JS
generic arm silently clears — flagged as where Samurai *will*
re-block), Underwater/`You_feel`/`You_see` (D-2065 pre-existing),
remaining PROP/TIMEOUT_FLAT gaps (no blocked session reaches them).

## Hallucinations / overclaim

None. «Zero new edges, `--can` not needed» verified true (both consts
already imported at timeout.js:8 / hack.js). The re-attribution
(xname_flags:864 as bucket, dobuzz vs zapyourself per D-2065, float_down
and do_statusline2 as the named later owners) is all falsifiable and
matches the verify output below.

## Density

27 insertions across 3 files for two writers sharing one queue owner —
the combined-arm shape §2b allows (one falsifier per writer, same
bucket row, no unrelated subsystem). Acceptable.

## Verification

D-log Verify bullet: `verify --fn xname_flags` → 0 PASS, 2 moved
past (Samurai 38→float_down@43; Priest 179→do_statusline2@209) +
green/strict/cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify xname_flags --base 55a129a8~1` → `0 PASS, 2
moved past, 0 unchanged, 0 worse → PROGRESS` with both moves
identical to the claim. No WORSE, no vacuous check (2 sessions at
baseline, both named). Full-suite re-run justified (hack.js shared).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
