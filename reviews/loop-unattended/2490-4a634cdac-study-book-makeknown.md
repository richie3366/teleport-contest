# Review 2490 — 4a634cdac — study_book makeknown credit (D-3609)

- SHA: `4a634cdac93e543f2677eb34064640feea818572`
- Subject: cliffs-head exercise writer: study_book blank-paper/refresh
  makeknown dropped credit_hero (Monk-94160 → PASS) (D-3609)
- Type: cliff (1 C function: study_book), js +14/−3 in `js/spell.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: both sites → live `makeknown` (credit_hero → WIS rn2(19)); default
arm → awaited `impossible`; Monk-94160 → PASS; study_book verified whole vs C
:468–641. Diff actually adds exactly that: blank-paper arm swap, default-arm
impossible, already-known refresh swap. No other js/ hunks. Matches.

## Inventory

- `study_book` (`js/spell.js:1105+`) — changed, 3 arms. C:
  `nethack-c/upstream/src/spell.c:467-641` (`csym` range).
- No new/deleted symbols. `makeknown` live at js/invent.js:4810 (sync),
  already imported at spell.js:130; `impossible` live at js/display.js:9146
  (async), already imported at spell.js:126, awaited at the new site.

## C ↔ JS fidelity

C `makeknown` is `#define makeknown(x) discover_object((x), TRUE, TRUE, TRUE)`
(hack.h:1530); C `discover_object` (o_init.c:454–484, read directly) exercises
`A_WIS` iff the type is newly named **and** `credit_hero` is set. JS was
calling `discover_object(booktype, true, true)` — credit defaults false
(js/invent.js:4768) — so both the blank-paper arm (C :506–510) and the
refresh arm (C :566–575) silently dropped the WIS exercise. The swap to
`makeknown(booktype)` (which passes `true, true, true`) is exactly C,
including the "newly named" gate and the divine-gift comment case at :570.
Default arm: C :555–558 `impossible("Unknown spellbook level %d, book %d;",`
— JS reproduces the format string verbatim including C's odd trailing
semicolon, awaited, `return 0` preserved. The D-log's whole-body walk
(:468–641 arm list) names its pre-existing shapes honestly (local
cursed/confused helpers, useup-clone, OBJ_NAME) as ledger-tracked elsewhere
rather than claiming them. RNG: the restored draw is C's `rn2(19)` inside
`exercise(A_WIS)` — call-for-call restored, no other draws touched.

Cheat grep: clean (no FORCE/DIAG/getRngLog/seed/fastforward/coords in js/).
Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. "Already-known refresh + yn" and the full arm enumeration were
spot-checked against C :560–575 — accurate. "Unreachable for generated
oc_level 1–7" is a fair reading of the switch (cases 1–7 exhaustive over the
generator's range); the arm still ports C rather than deleting it.

## Density

Cliff phase: owner exercise → writer study_book correctly identified from
the step-97 divergence (blank-book read precedes the missing WIS draw).
One function, verified whole, probe session moved. Per-function verdict:
study_book — ACCEPT.

## Verification

Re-measured myself: `verify exercise,study_book --base 4a634cdac~1
--reach-all` → Monk-94160 PASS, `1 PASS → PROGRESS`; reach exercise 775/775,
reach study_book 51/51, 0 regressed. Matches the D-log (my reach ran the
full 775, not the 80 spread). No REGRESSED rows.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
