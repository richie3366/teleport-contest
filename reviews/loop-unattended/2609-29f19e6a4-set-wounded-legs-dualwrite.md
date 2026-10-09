# Review 2609 — 29f19e6a4 — set_wounded_legs slot dual-write (D-3741)

Metadata. SHA `29f19e6a4` (2026-10-09), D-3741, parent `b760db68b`.
js diff: `js/trap.js` +13/−0 in `set_wounded_legs` (mirror TIMEOUT
bits to the uprops slot inside the extending-write gate) +
`scripts/wounded-legs-mirror.test.mjs` (+3 its). Ledger:
`set_wounded_legs` ported (D-3741 appended). Works its HEAD's
cliffs head (`allmain.c` moveloop_core, 2 blocked: 95337, 95234
— verified in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): both probes are RNG-first at
allmain.c:360 (`rn2(85)` vs `rn2(82)`) with a C-only `Your legs
feel better.` tail — C heals wounded legs at s397 while JS
still holds 9 ticks, because the extending re-wound wrote the
flat only and the nh_timeout OR-read inflated the countdown.
Mirror the TIMEOUT bits to the slot. Claimed: 0 PASS + 2 moved
(95337 → dosacrifice s729, 95234 → xname_flags s624),
REACH-OK, test 6/6.

Diff actually adds exactly the slot mirror + cite comment.
Promise and diff match. No signature change, no new import.

## Inventory

Changed JS function (1):

- `set_wounded_legs` — `js/trap.js:3563–3594` (mirror at
  :3576–3588). C: `do.c` set_wounded_legs `:2425–2446`
  (`csym` range); single storage `HWounded_legs ≡
  uprops[WOUNDED_LEGS].intrinsic` (youprop.h:136, verified);
  heal path `timeout.c` WOUNDED_LEGS arm → `heal_legs`
  (`do.c:2448–2486`, verified: `ATEMP(A_DEX)++` when negative
  + "legs feel better" pline).

## C ↔ JS fidelity

**Placement.** The mirror sits inside the extending-write gate
(`!wounded || (hw&TIMEOUT) < timex` → `set_itimeout_prop`),
which is C's `:2439–2440` max-keep arm. C's `set_itimeout`
writes the single storage; JS must write both mirrors — the
gate is the only correct site (a short re-wound correctly
writes neither, preserving max-keep; the new test pins this).

**Idiom.** The write (create slot `{intrinsic, extrinsic,
blocked}` when absent; preserve non-TIMEOUT slot bits; OR in
`timex & TIMEOUT`) is byte-shape-identical to the nh_timeout
ticker arm (`js/timeout.js:1103–1109`, verified), which OR-reads
flat|slot at :1097–1098. The bug mechanism is proven by
construction: OR ≠ max inflates whenever flat and slot hold
different nonzero TIMEOUT values (measured 56 remaining at
s285 vs C ≤ 45, 9 at s397 vs C 0). After the fix both mirrors
agree on every write path, so the OR-read equals C's value.

**Reader audit** (re-checked, not trusted): invent.js:1103
reads extrinsic/side bits only (LEFT/RIGHT_SIDE) — the fix
writes intrinsic TIMEOUT bits, extrinsic untouched, zero
effect. steed.js:591 `woundedNow` OR-reads H and E with flats
— post-fix the OR equals the flat equals C (the pre-fix
inflation *was* the bug there too). dokick/pray/botl OR with
flats likewise. PASS sessions cannot carry inflation (it would
already have mistimed their heal) — sound.

**Callers.** Signature unchanged; all 10 C call sites were
pre-wired (uhitm.c:4475 xan prick is this cliff's wound path).
`WOUNDED_LEGS`/`TIMEOUT` already imported (trap.js:88/:112) —
no new edge. No symbol deleted or re-pointed, so no `sym.mjs`
paste required.

**Measurement.** C-side xan-prick counts (95337: seventeen
pricks s244–300; 95234: seven s209–228) plus per-step JS
remaining-ticks traces localize the divergence to the
countdown, not the wounding (wounding, ticker, heal_legs
already C-exact). The cMsgOwners literal-match dismissal
(fix_worst_trouble et al.) is argued from call order
(occupation-time prayer runs after the rn2) — sound, and the
movement below confirms the writer.

**Named omissions:** none new (pre-existing steed-leg-messaging
note stands).

## Hallucinations / overclaim

None. Diff grep: zero hits for `FORCE`/`DIAG`/`getRngLog`/
`fastforward`/seed/coordinate gates across js + scripts hunks.
Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is moveloop_core (2 blocked, RNG
lost 78940); this commit ports the measured writer (one arm of
one function — the function is otherwise whole), names nothing
new, and moves both probes. One cliff, one C locus, no
bundling. Correct gates (green/strict/cohort; no full-44 run
claimed — trap.js is not shared-file-gated, and this audit's
overlay re-runs full `sessions` anyway).

## Verification

D-log Verify (`verify.mjs --fn moveloop_core`): 0 PASS + 2
moved + 0 + 0 → PROGRESS; reach 80/80 spread of 986 →
REACH-OK; green/strict/cohort PASS. Test 6/6 (pre-fix 4/6).

Re-measured by this audit (`verify moveloop_core --base
29f19e6a4~1 --reach-all`):

```text
verify moveloop_core: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
reach moveloop_core: 986 baseline-PASS session(s) reach it (986 run, 437.7s): 986 PASS, 0 regressed → REACH-OK
```

Both probes land exactly as claimed (95337 → dosacrifice@729,
95234 → xname_flags@624); the full 986-session reach (not just
the 80-spread) is clean. No vacuous check (row cited 2; both
moved past).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
