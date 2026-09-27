# Review 1954 — d2d72caa6 — engrave.c u_can_engrave whole-body port (D-2994)

## Metadata

- Full / short hash: `d2d72caa661b92deec61932f3ef3bd08ed7b3ca0` / `d2d72caa6`
- Parent: `e61bdd324` (D-2993, review 1953 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 22:02:13 +0200
- D-id: **D-2994**
- Stats: `js/engrave.js` only, +~55/−15. `js/` insertions **~55**. Band
  80–350.
- Claims to close: coverage row `u_can_engrave` (0 blocks).

## Intent vs deliverable

Subject promises the whole-body port with messages. Body promises the
C-order async restart (swallow/lava/pool/air/cantwield/capacity), the
caller's invented pline dropped, `return 0` kept as doengrave's
convention.

Diff actually adds exactly that. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `u_can_engrave` | LIVE repaired | restart sync→async, `js/engrave.js:989`, C staticfn |
| `doengrave` gate | LIVE repaired | await + invented pline dropped |
| `You_cant`/`near_capacity`/`is_lava`/`is_pool`/`SURFACE_AT`/4 mondata | LIVE import | all ALREADY edges, +names only |
| `check_capacity(NULL)` | folded | inlined at call site with cite (trap.js precedent) |
| `cantwield` | macro expanded | `mondata.h:123` exactly |

`node scripts/sym.mjs u_can_engrave`:

```
u_can_engrave    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/engrave.js:989
```

"CLONE" flag is a false positive: C is `staticfn`, single file-local
in its home module. No symbol deleted or re-pointed. Diff grep
`FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs u_can_engrave` →
`nethack-c/upstream/src/engrave.c:502-541` (40 lines). Sole caller:
`:964` doengrave.

- `:505` SURFACE_AT; `:507–516` uswallow arm: animal → Jonah pline
  (double space after `?` kept), whirly → `cant_reach_floor(F,F,F)`,
  amorphous falls through. All four mondata predicates null-safe.
  Match.
- `:517–531` else-if chain: lava / pool-or-fountain /
  air (CLOUD-gated vapor/air) / inaccessible, with C's exact five
  `You_cant` lines and `surface()` args. Match.
- `:533–536` cantwield on `game.youmonst?.data` →
  `nohands || verysmall`, `You_cant('even hold anything!')`. Match.
- `:539–540` `check_capacity(NULL)` (`hack.c:4398-4409`: `>=
  EXT_ENCUMBER` → `You_cant('do that while carrying so much stuff.')`
  → true-blocks) folded exactly. Match.
- `:541` true. Match. Caller `:964` now awaits with no second pline.
  Match; the kept `return 0` vs C `ECMD_FAIL` (0x04) is pre-existing
  doengrave-scope debt, disclosed as doengrave's row — not this SHA.

No RNG in C; none in JS.

## Hallucinations / overclaim

None. "Every arm ported, every callee live, the sole caller wired"
holds; the two pre-existing doengrave items (`jello` arm, ECMD map)
are disclosed as untouched.

## Density

§2b: whole 40-line C function restarted + caller fix, ~55 JS lines.
Right size.

## Verification

D-log: vacuous hidden note + REACH-OK + gates, full skipped (one
file). Re-ran:

```
verify u_can_engrave: baseline d2d72caa6~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke u_can_engrave: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous + REACH-OK, no REGRESSED. Claim holds.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
