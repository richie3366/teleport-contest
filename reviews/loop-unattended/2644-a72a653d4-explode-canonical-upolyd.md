# Review 2644 — a72a653d4 — explode canonical Upolyd (D-3780)

Metadata. SHA `a72a653d4` (2026-10-10), D-3780, parent
`0929ad09c`. js diff: `js/explode.js` +5/−4 (4 flat
reads → canonical `Upolyd(u)`) +
`scripts/explode-upolyd-rehumanize.test.mjs` (new).
Ledger: `explode` ported-note. Works the cliffs
head (explode writer, 95347).

## Intent vs deliverable

Promise: 95347@824 — poly-blast read the
never-written `u.Upolyd` flat (always false), so
damage hit uhp, the form never reverted (no
rehumanize message, no More), and exercise(A_STR)
early-returned on the true Upolyd. Fix: all 4
sites call the canonical macro.

Diff delivers exactly those 4 calls + import.
Promise and diff match. ALREADY edge.

## Inventory

Changed JS (1 writer, 4 sites):

- grab sticks gate — `js/explode.js:469`. C:
  `explode.c:277` (`Upolyd && sticks` — read).
- mh-vs-uhp damage — `js/explode.js:738`. C:
  `explode.c:628` (read).
- revert-vs-die gate ×2 — `js/explode.js:748/750`.
  C: `explode.c:641–644` (read).
- Canonical `Upolyd(player)` (`js/const.js:3216`,
  read) ≡ C `you.h:554` (`umonnum != umonster` —
  read). These are ALL of C explode.c's Upolyd
  reads (grep: :277/:628/:641/:642 only).

## C ↔ JS fidelity

**Migration C-exact.** Never-written premise
verified: zero `.Upolyd =` writes in scored js/
(every other site imports the canonical or shadows
it correctly, e.g. `js/do.js:3468`). Old code was
unconditionally human-pathed; new code is the C
macro verbatim. RNG order preserved (no draws
moved). Latent same-family readers found by this
audit (pre-existing, out of scope, no session —
NOT queued, per no-sweep): `js/potion.js:2346`
(healup credits uhp instead of mh when poly'd —
C healup uses Upolyd; will need its proving
session) and `js/apply.js:801` (mirror "look
like" arm, display-only). No symbol deleted or
re-pointed (import extension only), so no sym.mjs
paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The causal chain
(mh=7 both sides pre-blast; JS uhp 59→49, mh
unchanged; missing revert → missing More →
skipped exercise) is prefix-replay measured, and
the "same stream word, different N" RNG signature
matches a skipped draw exactly.

## Density

Cliff-phase §2b: one row, one writer, no bundling.
95347 824 → do_statusline2@986, RNG now complete
(30692/30692). Forced full 44/44 despite
"not shared" (explode is blast-shared in
practice — correct caution).

## Verification

D-log Verify: explode 1 moved; smoke 24/24;
gates + cohort + full PASS.

Re-measured by this audit (`verify explode --base
a72a653d4~1 --reach-all`):

```text
verify explode: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Wizard-95347: moved → do_statusline2 at step 986 (was 824)
smoke explode: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly, 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
