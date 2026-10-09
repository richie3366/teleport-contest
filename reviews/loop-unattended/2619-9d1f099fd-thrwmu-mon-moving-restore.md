# Review 2619 — 9d1f099fd — thrwmu mon_moving save/restore (D-3752)

Metadata. SHA `9d1f099fd` (2026-10-09), D-3752, parent
`6af5aea14`. js diff: `js/mthrowu.js` +7/−1 (save +
restore + C-cited comment) +
`scripts/thrwmu-mon-moving-restore.test.mjs` (new, 3
its). Ledger: `thrwmu` ported (D-3752 appended). Works
its HEAD's cliffs head (`mkobj.c` next_ident, 3 blocked:
95420, 95229, 95248 — verified in the parent queue;
owner symptom per D-2228/D-3751, writer = the thrwmu
flag clobber).

## Intent vs deliverable

Promise (subject + D-log): 95248@340 + 95229@493 C
`rnd(2) @ next_ident` (monkilled corpse, no rn2(6)) vs
JS `rn2(6) @ xkilled` (killed treasure roll) — both
sides gas-kill with identical damage/HP; the only
difference is hero's-fault on JS breath clouds. Measured
(per-draw windows offset by exactly the extra rn2(6),
boundary probe, reverted temp instrumentation showing
the clobber + 7 SETFAULT breath clouds): the thrwmu
try/finally stuck mon_moving FALSE after the first
monster throw in a movemon loop, faulting later
dragon-breath clouds. Save/restore the flag (C's nested
pattern).

Diff actually adds exactly the save + restore. Promise
and diff match. No new imports, no signature change.

## Inventory

Changed JS (1 wrapper):

- thrwmu — `js/mthrowu.js:1575–1586` (wrapper; body
  untouched).
  C: `allmain.c:210–216` (mon_moving TRUE around the
  movemon loop, FALSE after — verified, sole writer);
  `mthrowu.c` thrwmu `:1174–1264` (whole file has only
  mon_moving READS at :460/:491, zero writes —
  verified); `region.c` make_gas_cloud `:1187–1188`
  (`!in_mklev && !mon_moving → set_heros_fault` —
  verified); heros_fault → killed/monkilled
  `:1153–1157` (verified in the inside_gas_cloud body
  during review 2615); `zap.c:5336–5342` ZT_POISON_GAS
  1x1 dam-8 clouds (verified).

## C ↔ JS fidelity

**Wrapper now exactly transparent.** C never writes the
flag inside thrwmu; JS now saves on entry and restores
in `finally` — post-call state identical to C on every
path including throws. The in-body TRUE-set: every C
mattacku caller (dogmove :911/:1286, monmove :954/:971,
priest :202, shk :4900, worm :359 — all movemon-driven,
verified via csym callers) runs with the flag TRUE, and
the sole JS thrwmu caller is the in-movemon AT_WEAP arm
(`js/mhitu.js:4105`, verified sole via grep) — so the
set is a no-op in practice, and C reads TRUE there too.
Stronger than the D-log's "harmless": in-body and
post-call states both match C. The save/restore idiom is
live in-tree (`js/quest.js:723`, same shape).

**Mechanism proven, not inferred:** temp instrumentation
(reverted md5-verified) showed `mon_moving_before=true`
once then false for every later action + exactly 7
SETFAULT breath clouds; the corpse-draw windows agree
call-for-call past the single extra rn2(6). The fix also
heals the other documented readers (`:972`/`:998`
thrown-kill/anger, minliquid mondied/xkilled D-1138) by
construction — same flag, same transparency.

**Test.** Flag survives a real thrwmu; post-throw
breath-shape cloud carries REG_NOT_HEROS; hero-phase
control still faults. 2 fail pre-fix (authentic),
control passes both, 3/3 post-fix. Pins cause and
non-regression.

## Hallucinations / overclaim

None. The fault-path chain (breath → breamm→dobuzz→
zap_over_floor in the C log → faulted cloud → killed vs
monkilled) is measured end to end, and the "sole caller
in-movemon" claim I verified independently in C and JS.
Diff grep (FORCE / DIAG / getRngLog / fastforward /
seed): zero hits. No symbol deleted or re-pointed, so no
`sym.mjs` paste required. Rule #2: global re-check this
audit → clean.

## Density

Cliff-phase §2b: parent head is next_ident (3 blocked,
RNG lost 71054); this commit ships one writer whole (1
FULL PASS + 1 moved +61 at ship), leaves 95420 to its
predicted bones-remap writer (correct — D-3754). One
cliff, one C locus, no bundling. Correct gates
(green/strict/cohort + forced full 44/44 with speed
label).

## Verification

D-log Verify (`verify.mjs --fn next_ident,thrwmu`): 1
PASS + 1 moved + 1 unchanged + 0 worse → PROGRESS
(95248 PASS; 95229 493→554 toss_up; 95420 unchanged per
prediction); reach 80-spread + 15/15 → REACH-OK;
green/strict/cohort PASS; full 44/44.

Re-measured by this audit (`verify next_ident,thrwmu
--base 9d1f099fd~1 --reach-all`; HEAD code includes 3
later SHAs):

```text
verify next_ident: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach next_ident: 1013 baseline-PASS session(s) reach it (1013 run, 450.8s): 1013 PASS, 0 regressed → REACH-OK
reach thrwmu: 15 baseline-PASS session(s) reach it (15 run, 17.9s): 15 PASS, 0 regressed → REACH-OK
```

95420 is now FULL PASS via D-3754 exactly as predicted;
95229 sits at toss_up@554. Full reach 1028 sessions, 0
regressed. No vacuous check (row cited 3; all 3
itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
