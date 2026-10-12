# Review 2727 — 1aded8e8f — write_timer stale blob id (D-3867)

## Metadata

- SHA: `1aded8e8f` (Must-fix, ships alone)
- D-entry: D-3867; Ledger: `write_timer ported`
- js diff: `js/mkobj.js` +17/−15 (one function, two arms) + new test
  `scripts/bones-timer-resave.test.mjs`
- Type: cliff-phase Must-fix (PASS→FAIL regression), ≤10 functions → full
  Method on every changed function.

## Intent vs deliverable (promise vs diff)

Subject promises: write_timer re-saved the pre-remap blob id; the fix
derives the id from the live pointer when present (C `:2524`/`:2539`),
keeping the numeric arg_id only for needs_fixup and no-pointer-yet
entries; scen-chain-Archeologist-95418 FULL PASS.

The diff actually adds: exactly that reorder in both TIMER_OBJECT and
TIMER_MONSTER arms of `write_timer` (pointer-first, numeric fallback),
plus C cites. No new imports, no signature change, no new helpers. The
test adds 5 unit pins + the full 6-segment 95418 replay. Promise ==
deliverable.

## Inventory

- `write_timer` (`js/mkobj.js:1146`, sync) — OBJECT arm: `timer.obj`
  preferred over stored `arg_id`; MONSTER arm: `timer.mon` preferred.
  Only function touched. No helper added, none deleted, none re-pointed
  (no `sym.mjs` re-point paste required).

## C ↔ JS fidelity

C locus (`node scripts/csym.mjs write_timer`):
`nethack-c/upstream/src/timeout.c:2504–2551`. Non-fixup TIMER_OBJECT
replaces the object pointer with `(arg_save.a_obj)->o_id` — the CURRENT
id from the live pointer — writes, then restores the pointer; same shape
for TIMER_MONSTER (`->m_id`). needs_fixup entries write the struct
untouched. C callers: only `maybe_write_timer` `:2638`/`:2645`
(`--callers` output: decl `:1957` + those two sites), matching the D-log
Callers bullet (JS `maybe_write_timer` → `serTimer`, pre-wired).

Branch-by-branch confirm:

- GLOBAL/LEVEL arms: untouched, write as-is — matches C `:2511–2514`.
- OBJECT non-fixup: JS now writes `timer.obj.o_id` when a live pointer
  exists — matches C `:2522–2524`. The stored `arg_id` on a relinked
  entry is the pre-remap blob id, a value C's `anything` union cannot
  even hold post-relink (relink overwrites it with the pointer), so
  preferring it was the bug. C-exact.
- OBJECT no-pointer fallback (`arg_id`): covers the deserTimer
  pre-relink shape, which has no C counterpart (C always holds either
  pointer or post-write id) but is the only value available; writes the
  same id C would have written from the blob. Sound.
- MONSTER arm: mirror of OBJECT — matches C `:2535–2544`.
- Default: `panic`, matches C `:2547–2550`.

RNG: none drawn by this function on either side. No `rn2`/`rnd` walk
needed. D-3864 rot behavior unchanged (fire/stop follow the pointer, as
claimed; D-3864's test still 1/1 per the Verify bullet).

## Hallucinations / overclaim

None. The "Match C" claim is for the two arms changed, and both now
match C call-for-call. Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate
markers in code (the one grep hit is the commit message's own "No
DIAG/FORCE" sentence). `node scripts/imports.mjs --rulecheck`:
"Rule #2 clean" across scored `js/`. The D-log's falsifier chain
(pre-ac5580aa5 passes, post fails; find_oid coverage excluded) is
measured, not inferred.

## Density

Must-fix regression: PASS (24592/24592 RNG, 668/668) at f7cc0401e,
FAIL on the audit rescore — qualifies strictly. One function, whole-arm
fix, code + ledger + verify in one handoff. Not a no-op (js diff
non-empty, session moved). `Ledger: write_timer ported` — single entry,
correct owner (the writer; symptom owner `randomize_gem_colors` stands,
correctly not re-ported — jsEntry was null).

## Verification

Re-measured by this audit
(`verify write_timer,randomize_gem_colors --base 1aded8e8f~1 --reach-all`):

- `verify write_timer: 0 blocked` (writer, none blocked at baseline —
  expected; D-log said so) + `smoke 24/24 → REACH-OK`.
- `verify randomize_gem_colors: 1 PASS, 0 moved past, 0 unchanged,
  0 worse → PROGRESS` (scen-chain-Archeologist-95418: PASS).
- `reach randomize_gem_colors: 1167/1167 PASS, 0 regressed → REACH-OK`.

No REGRESSED session. The D-log's "1 PASS" movement claim is confirmed
on current code with the full 1167-spread reach (stronger than the
80-spread at ship time). No vacuous-check issue: the bullet never claims
a write_timer block.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
