# Review 2634 — 455ed3849 — Unaware macro family always-false (D-3770)

Metadata. SHA `455ed3849` (2026-10-10), D-3770, parent
`130fbe6fd`. js diff: 5 files — `js/potion.js`
+5/−9 (gates → live export, `Unaware_pot` deleted),
`js/dig.js` +13/−2, `js/were.js` +12/−3 (clones
completed), `js/trap.js` −6, `js/mcastu.js` −5 (dead
locals deleted) +
`scripts/potionbreathe-unaware-gate.test.mjs` (new, 2
its). Ledger: `potionbreathe` ported (D-3770
prepended). Works the parent queue's row-2 (`read.c`
seffect_enchant_armor, 1 blocked: 95348) — row-1
randomize exhausted, skipped per D-3769 precedent,
honestly labeled "row 2" in Status.

## Intent vs deliverable

Promise: 95348@694 — C never prints the blindness
line (hero asleep: multi<0 + usleep ⇒ Unaware true
⇒ gate skips), JS printed «It suddenly gets dark.»
because every Unaware clone read never-written
`u.multi`/`u.Unaware` — statically always-false.
Fix: potion gates call the live `eat.js` export;
dig/were clones completed to the C-exact macro;
two zero-reader locals deleted.

Diff delivers exactly that across the 5 files. No
new imports (FAINTED joins existing const.js
imports; eat.js/Unaware already imported in
potion.js:186). Promise and diff match.

## Inventory

Changed JS (macro family, 1 writer + clones):

- potionbreathe gates `:3091/:3102` → `Unaware()`
  (live eat.js import); `Unaware_pot` deleted.
  C: `potion.c:2072/2077` (`if (!Blind &&
  !Unaware)` ×2 — header window read).
- dig.js:211 / were.js:83 `Unaware` clones →
  full macro bodies.
  C: `youprop.h:399` (`Unaware ≡ multi<0 &&
  (unconscious() || is_fainted())` — read) +
  `trap.c:6776–6786` (unconscious: `multi>=0 →
  FALSE`, else `usleep || nomovemsg prefixes`
  — read) + `eat.c:3346–3350` (`is_fainted ≡
  uhs==FAINTED` — read).
- trap.js / mcastu.js local `Unaware` deleted.

## C ↔ JS fidelity

**Macro arm-for-arm C-exact, all three sites.**
House export `js/eat.js:477` (`game.multi<0 &&
(unconscious() || is_fainted())`) with callees
`:432` (multi guard + usleep + three `startsWith`
prefixes — strings length-match C's `strncmp`
9/14/14) and `:445` (`uhs===FAINTED`) — all read,
all exact. The dig/were clones inline the identical
predicate (`game.multi` guard + usleep + three
prefixes + FAINTED; were keeps its `u` param for
u-fields only — multi/msg correctly read from
game). The `|| ''` nomovemsg default is equivalent
to C's null check (empty string matches no prefix).

**Never-written premise verified statically:**
`u.multi` has zero refs left in all of `js/`;
`game.multi` is the live field (written cmd.js /
apply.js, incl. the allmain `:380` wakeup path the
D-log cites). Old clones were indeed vacuous.

**sym.mjs (required — deletions + re-points):**

```text
Unaware_pot      NOT FOUND in js/** (no export, no local function/const).
Unaware          js/eat.js:477   sync
             !! ALSO 6 LOCAL CLONE(S) in 6 files — IMPORT the export; do NOT add another
               js/dig.js:211  js/lock.js:1052  js/mhitu.js:652  js/muse.js:493  js/were.js:83  js/zap.js:4595
```

Deletions clean: trap.js has 0 `Unaware(` readers
(the drown site already uses the eat.js dynamic
import); mcastu.js keeps only `insects_Unaware`
def + call. Kept dig/were clones: `--can` reports
an eat.js import would be cycle-safe (hoisted fn),
but neither file imports eat.js today, so the
in-place completion adds no new module edge — a
defensible call, and the bodies are verified
C-exact above, so they are verified CLONEs, not
C-wrongs. Remaining partials (zap/muse/mhitu/lock)
are named in the D-log with line numbers — named
omits, correctly not Must-fix.

## Hallucinations / overclaim

None. Diff grep: zero code hits (only the commit
message's own "no DIAG/FORCE/seed gates" line).
The "makeknown ran, skipping the prompt" causal
chain follows from the gate (kn++ ⇒ dknown path in
the C-exact tail). The wakeup-timing analysis
(same-turn both sides, display lag in C) is
measured from recorded toplines g691–696.

## Density

Cliff-phase §2b: one row, writer = the macro the
gate reads (owner correctly diagnosed
MISATTRIBUTED — seffect cannot print a potion
subject — read whole, untouched). One C locus
family (`youprop.h:399` + 3 bodies), no bundling.
95348 → FULL PASS 1793/1793.

## Verification

D-log Verify: seffect 1 PASS; reach 4/4 + 23/23;
green/strict/cohort PASS; full skipped (not
shared).

Re-measured by this audit (`verify
seffect_enchant_armor,potionbreathe --base
455ed3849~1 --reach-all`):

```text
verify seffect_enchant_armor: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95348: PASS
reach seffect_enchant_armor: 4 baseline-PASS session(s) reach it (4 run, 4.5s): 4 PASS, 0 regressed → REACH-OK
verify potionbreathe: no corpus session is blocked on it at 455ed3849~1 — […] vacuous […]
reach potionbreathe: 23 baseline-PASS session(s) reach it (23 run, 31.6s): 23 PASS, 0 regressed → REACH-OK
```

Matches exactly. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
