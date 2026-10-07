# Review 2486 — 49f0a62e0 — stun dual-write + tick order (D-3605)

**Metadata.** SHA `49f0a62e0` (2026-10-07, D-3605). Type: **cliff**:
writer fix for the cliffs head `dokick.c otransit_msg` (1
corpus block; symptom owner cannot emit either diverging line
— cMsgOwners names make_stunned). `js/` insertions: 46
(`js/potion.js` +12/−2, `js/timeout.js` +34/−18) + new test.

## Intent vs deliverable

Promise: (1) make_stunned dual-writes the slot C masters, so
stacking/lizard/cure grants stick; (2) a dedicated STUNNED arm
first among dedicated arms, so same-tick stun+confusion expiry
prints "steadier" first as C's index order does; Monk-94230 →
PASS.

Diff actually adds: the dual-write + `set_HStun` helper + the
dedicated arm + TIMEOUT_DEDICATED entry, minus the generic-loop
STUNNED block. Promise matches diff. No symbols deleted or
re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | make_stunned (dual-write) | ported | [potion.js](/home/debian/dev/teleport-contest/js/potion.js:946) | potion.c:106–131 + youprop.h:80–81 |
| 2 | nh_timeout STUNNED arm (dedicated-first) | ported | [timeout.js](/home/debian/dev/teleport-contest/js/timeout.js:1076) | timeout.c:670–673/:737–742 + prop.h:32–33 |

Helpers: `set_HStun` (new, timeout.js:350) — storage-sync
helper on the in-file `set_HDeaf` pattern, not a C-function
clone (`sym.mjs`'s "LOCAL CLONE" flag is its heuristic firing
on a non-exported helper; C has single storage so no C
counterpart can exist). `set_itimeout` — live same-module
callee.

## C ↔ JS fidelity

**Single storage confirmed.** `HStun ≡
u.uprops[STUNNED].intrinsic` (youprop.h:80, read), `Stunned ≡
HStun` (:81) ✓; make_stunned is `old=HStun … set_itimeout(&HStun,
xtime)` (potion.c:106–131, read in full) ✓. JS make_stunned
mirrors every arm (Unaware talk-kill, "less wobbly"/"a bit
steadier", usteed wobble vs stagger, botl-on-transition) and
now writes flat + slot with the same flag-preserving
`itimeout(xtime)` ✓ — the "Named: none (usteed saddle arm
live)" doc fix is accurate (:951–952, read).

**Order confirmed.** C decrements in index order (:670–673
shape per D-log; switch arms CONFUSION :730–736 then STUNNED
:737–742, read) with STUNNED=13 < CONFUSION=14 (prop.h, read)
✓. JS arm sits at :1076, before the CONFUSION arm at :1117,
with STUNNED in TIMEOUT_DEDICATED skipped at :1239 — no
double-decrement ✓. Expiry shape (re-arm flat to 1 →
make_stunned(0,TRUE) → full-value `!Stunned`
stop_occupation) matches C :737–742 ✓.

**Write discipline closes the loop.** HStun writers repo-wide:
only make_stunned, `set_HStun`, and the re-arm line (grepped)
— all dual-write paths. FROMFORM setter dual-writes
(polyself.js:658–671, read); all readers (spell/zap/uhitm)
OR-read flat|Stunned|slot ✓.

Bounded corner (not actionable): C would print a same-tick
resistance-expiry message (ACID_RES/FIRE_RES/STONE_RES arms,
timeout.c:813–851, read — indices 1–12) before "steadier";
JS's dedicated-first STUNNED prints steadier first in that
unprobed corner. The dedicated-arm architecture (D-1817,
6 pre-existing arms) cannot express full index order, and the
alternative keeps the measured stun/confusion bug — the SHA
fixes the probed pair and the corner has no session. Named
here, not queued.

## Hallucinations / overclaim

None. The 26-site callers table is checkable (signature
unchanged, so wiring holds by construction); the step-by-step
C-screen measurement (stagger@16, re-grant@136, lizard@155,
same-tick expiry@172) is specific and falsifiable.

## Density

Cliff §10.18: parent queue head is otransit_msg (Monk-94230 —
re-read from `49f0a62e0~1:docs/LOOP-QUEUE.md`) ✓. One cliff,
own `Ledger:` touches (D-3605 on make_stunned + nh_timeout),
probe → PASS. Per-function verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: clean (dual-writes + arm + cites).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `stun-dualwrite.test.mjs`: 5/5 PASS now.
- Re-measure (mine): `verify otransit_msg --base 49f0a62e0~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0
  worse** (Monk-94230 PASS) + smoke 24/24 REACH-OK. No
  REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
