# Review 2774 — 2446743ec — attrcurse uprops-mirror strip

- **SHA:** `2446743ec` (Tue 2026-10-13) — cliffs-head `uhitm.c` mhitm_ad_curs writer (D-3921).
- **D-entry:** D-3921. **Ledger:** `attrcurse` ported.
- **Diff size:** `js/sit.js` attrcurse restart (+63/−21 across the function); new test `scripts/sit-attrcurse-uprops-mirror.test.mjs` (5 its).
- **Method:** cliff commit, 1 function — whole Method on `attrcurse` + its 2 new helpers.

## Intent vs deliverable (promise vs diff)

The subject promises: `sit.c` attrcurse stripped only the flat `u.H*`
mirror while the `uprops[]` slot kept INTRINSIC, so a later timeout tick
restored the flat and the victim lost the same intrinsic twice
(Knight-587209 steps 557/561); the fix OR-reads and dual-writes all 11
arms; probe goes 561→PASS.

The diff actually adds: `has_intr`/`clear_intr` closures plus the gate
rewrite of all 11 arms (messages, ret values, extra blocks untouched). No
new imports, no caller rewiring (signature unchanged). Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `attrcurse` (sit.js:350-466) | sit.c:641-762 (`csym.mjs` range) | restarted, whole |
| 2 | `has_intr` / `clear_intr` (sit.js:355-363) | youprop.h single-storage `H*` | house-pattern helpers |
| 3 | test `sit-attrcurse-uprops-mirror.test.mjs` | Knight-587209 steps 557/561 | new, in scripts/ |

No symbol deleted or re-pointed (no local clone → import), so no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/sit.c:641-762` (`node scripts/csym.mjs
attrcurse`; D-log cites :644–762 — same body, header-comment offset only).
Walked arm-for-arm:

- **Structure:** `switch (rnd(11))`, cases 1–11 each `if (H* & INTRINSIC)
  { H* &= ~INTRINSIC; <msg>; ret = PROP; break; } FALLTHROUGH;`, default,
  `return ret`. JS matches exactly, same order, single `rnd(11)` draw.
- **Arms 1,2,3,5,6,8,9,10,11:** gate + `&= ~INTRINSIC` + message + ret all
  match (`warmer.` / `less jumpy.` / `a little sick!` / `cooler.` /
  `paranoid.` / `slower.` / `clumsy.` / `vulnerable.` / `less attractive.`).
- **Arm 4 (telepat):** C `if (Blind && !Blind_telepat) see_monsters();
  Your("senses fail!");` → JS `if (Blind() && !Blind_telepat())
  see_monsters(); await pline('Your senses fail!');` — `Your()` renders
  "Your senses fail!", identical.
- **Arm 7 (see_invis):** C `if (!See_invisible) { set_mimic_blocking();
  see_monsters(); newsym(u.ux, u.uy); }` + hallu-dependent `You(...)` →
  JS identical including `newsym(u.ux|0, u.uy|0)` and both message
  variants.
- **Arm 10:** C comment "intrinsic protection is just disabled, not set
  back to 0" — JS `&= ~INTRINSIC` is exactly that (TIMEOUT kept).
- **Helpers vs C storage:** C `H*` is single storage
  (`u.uprops[*].intrinsic`). JS `has_intr` ORs flat and slot
  (`((u[flat]|0) | (slot?.intrinsic|0)) & INTRINSIC`), `clear_intr` clears
  the INTRINSIC bit in both and never creates an absent slot. This is the
  house OR-read/dual-write pattern (timeout.js FAST arms, `set_HFast`);
  both mirrors converge to C's single value after the strip.

Callees (all pre-existing, unchanged lines): `rnd`, `You_feel`, `pline`
(LIVE imports); `Blind`, `See_invisible`, `Hallucination` (LIVE);
`see_monsters`, `set_mimic_blocking`, `newsym` (LIVE imports);
`Blind_telepat` — local clone (sit.js:167), one of 4 per `sym.mjs`.
Checked against C: `youprop.h:156 #define Blind_telepat (HTelepat ||
ETelepat)` — the clone reads `(u.HTelepat|0) || (u.ETelepat|0)` plus a
redundant `|| u.Blind_telepat` flag. Verified CLONE for this arm's
purpose; the extra disjunct is pre-existing debt, untouched by this SHA,
and the probe session PASSES through it — not this review's Must-fix.

Callers (C `--callers`: sit.c:283, eat.c:1274, pray.c:757, uhitm.c:3057):
D-log table spot-checked — eat.js:2034 `await attrcurse();` ✓,
pray.js:1314 `if (rn2(2) || !(await attrcurse()))` ✓ (C `:757` shape),
mhitu.js:2779 `await mon_give_prop(mtmp, await attrcurse())` ✓ (C
`:3057` shape). Signature unchanged, no rewiring needed.

## Hallucinations / overclaim

- "attrcurse now whole vs C" — true: all 11 arms + default + ret verified
  above against the pinned body.
- The D-log "Next" names sibling flat-only writers (eat.c toggle,
  pray.c gift) as out-of-scope future rows rather than riding them along
  — correct cliff discipline, no overclaim.
- No "Match C" is claimed for any stubbed callee. None found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `uhitm.c`
mhitm_ad_curs blocking scen-sweep-Knight-587209 at step 561 (verified in
`2446743ec~1:docs/LOOP-QUEUE.md`, top row, RNG lost 23947). Owner stands
whole per D-3708 (read once per tag); this commit ports exactly the named
writer, whole, same-C-file family (`sit.c`), with its own Ledger row. No
bundled work. One cliff, code + ledger + verify in one handoff.

Anti-pattern grep on the `js/` hunks: only the commit message's own "no
DIAG/FORCE/seed gates" sentence. Rule #2: `imports.mjs --rulecheck` →
clean across scored `js/` (run this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself:

```
verify mhitm_ad_curs: baseline 2446743ec~1 — 1 session(s) blocked on it
  scen-sweep-Knight-587209: PASS
verify mhitm_ad_curs: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach mhitm_ad_curs: 13 baseline-PASS session(s) reach it: 13 PASS, 0 regressed → REACH-OK
```

D-log's "1 PASS" reproduced exactly; no REGRESSED session. (The D-log's
separate `reach attrcurse 16/16` line is consistent — attrcurse had no
blocked session at baseline, so no hidden row for it.) Movement + REACH-OK:
satisfied. New test 1/5 pre → 5/5 post per the D-log (authentic red on
the 4 mirror cases, silent control green).

## Actionable C-wrongs

None. All 11 arms match C branch-for-branch; the mirror helpers implement
C's single-storage semantics; the corpus claim re-measures clean.

Verdict: **ACCEPT**
