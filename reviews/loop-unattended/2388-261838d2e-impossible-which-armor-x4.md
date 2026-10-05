# Review 2388 — 261838d2e — D-3451 impossible audit + which_armor ×4

Metadata: SHA `261838d2e`, D-3451, Open head ×4 + audit. js/ +4/−65
(4 files) + worn-rewire census update.

## Intent vs deliverable

Subject promises: impossible re-audited (no JS change); four
which_armor clones (weapon/steed/mklev/trap) deleted, users switched
to live js/worn.js:472. The diff delivers exactly that: four stubs,
switched call sites (weapon 5, steed 2 in-diff + 2 pre-wired, mklev 1,
trap 19 by import), extended worn imports in mklev/trap, census
drained. No scope drift.

## Inventory

| Clone (deleted) | Users | C locus |
|---|---|---|
| weapon which_armor_magr (slot dup, silent bad-flag) | special_dmgval ×5 | weapon.c:378–391 |
| steed which_armor_saddle (threw on null) | saddle sites | steed.c:62/:144/:281/:600 |
| mklev which_armor_local (monster scan) | priestini | worn.c:1006–1036 |
| trap which_armor (no youmonst arm) | 19 lines by import | trap.c 17 sites |

## C ↔ JS fidelity

Live js/worn.js:472 was walked against C worn.c:1006–1036 in review
2387 (youmonst 7-slot table + impossible default; monster nobj scan).
This SHA only re-points callers, so fidelity = arg-shape parity:

- weapon special_dmgval: C weapon.c:378–391 calls which_armor(magr,
  W_ARMC/W_ARM/W_ARMU/W_ARMG/raw armask) — JS passes identical flags.
  The deleted dup swallowed bad flags for youmonst; live calls
  impossible() exactly as C does. Exact.
- steed: C steed.c itself passes W_SADDLE (4 sites); JS passes
  (mtmp, W_SADDLE) at the same shapes. `can_saddle` (null-safe,
  `mtmp?.data`) still guards first; the deleted clone's null-throw is
  replaced by live's null→null, a safe superset. Exact.
- mklev priestini: monster + W_ARMC; old clone already was the nobj
  scan, so the switch is behavior-identical. Exact.
- trap (19 lines: 1187/1204/3942–3994/4724–4772/5599/5771): every flag
  is a valid slot flag (H/S/G/C/U/F), so the impossible() default is
  unreachable even for a hypothetical youmonst arg — the only possible
  delta is null→slot, which is C. Hero guards verified where claimed:
  :1204/:5599 `is_youmonst` ternaries, :4724+ `hitting_u` ternaries
  (mirroring C trap.c:115–150 line for line), :5771 inside
  trapeffect_poly_trap past the hero arm's early return (:5729+), and
  C trap.c:3930's mselftouch site is monsters-only. All 17 C trap.c
  call sites have their JS mirror.

impossible re-audit (no JS change — verified true: zero display.js
hunks): js/display.js:8970–9011 walked against C pline.c:584–634 —
recursion fatal (:591–592, house Error idiom), latch, vsnprintf chop
at BUFSZ-1 (:595–597), paniclog Rule #2 (:598), fuzzer gate before
pline (:599–600), URGENT pline (:602–604), sanity early return
(:606–610), disorder/worth-saving/report/support lines, CRASHREPORT
Rule #2 (:621–631), latch clear. Whole modulo the standing ledger
omits (files.c paniclog + report.c submit_web_report both by-design).
The D-3451 re-stamp is true.

sym.mjs (required paste):

```text
which_armor_magr NOT FOUND in js/** (no export, no local function/const).
which_armor_saddle NOT FOUND in js/** (no export, no local function/const).
which_armor_local NOT FOUND in js/** (no export, no local function/const).
```

Zero `function which_armor(` locals in all four files. `--can`:
mklev→worn ALREADY, trap→worn ALREADY (both edges pre-existed —
extensions only, no TDZ risk). Diff grep: no FORCE/DIAG/RNG/seed/
coordinate reads. Rewire suites 7/7 on the current tree.

## Hallucinations / overclaim

None. "19 users" is exact (19 call lines). "Trap lacked the youmonst
arm" is true of the clone and the rewire analysis names each guard;
I verified all of them.

## Density

≤10-function SHA, whole Method per row (4 switches + 1 re-audit;
every trap user line + every C site read). Ledger: which_armor
audited (unchanged status), impossible partial re-stamped with the
same standing omit. Verify bullet names both. No Left-open. No
Must-fix bundled (override disclosed, head still queued).

## Verification

Re-measured (`--base 261838d2e~1 --reach-all`): 2× vacuous (0 blocked
— disclosed: "rows cited none") + 2× smoke REACH-OK 24/24, 0
regressed. Claim true. (Full 44/44 re-checked by this audit's cadence
score.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
