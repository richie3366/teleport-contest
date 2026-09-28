# Review 2013 — a196fca24 — artifact_origin whole port

Metadata: SHA `a196fca24`, D-3053, js/artifact.js only (+45/−~20).

## Intent vs deliverable

Subject promises "`artifact_origin` whole port (origin-bit count +
impossible arm)". Diff actually restarts the export in C order (zero
slot, exists, KNOW_ARTI, seven counted arms, impossible arm). Matches
promise.

## Inventory

- `artifact_origin` (restarted export js/artifact.js:1391, sync) —
  C artifact.c:474–513.

## C ↔ JS fidelity

Arm-by-arm vs C (csym range cited): `a = oartifact; if (a)` gate
:482–484 ✓; zero-slot (`zero_artiexist`) :486 ✓ — `rnd` holds C
`.rndm` per documented file convention (js/artifact.js:559) ✓;
`exists = 1` :488 ✓; KNOW_ARTI → found :491–492 ✓; `ct = 0` plus the
seven arms in C order (wish/gift/viadip/named/lvldef/bones/random, each
bit + `++ct`) :494–509 ✓; `ct != 1 → impossible("invalid artifact
origin: %4o", aflags)` :510–511 ✓ with `%4o` pre-formatted as unsigned
space-padded octal (`>>> 0`, `toString(8)`, `padStart(4, ' ')` — JS
`impossible` expands `%s`/`%d` only) ✓. No RNG either side.

Two removed behaviors verified correct, not regressions: (1) the old
`slot.rnd = 1` no-bit default is C `artifact_exists` :390–393 behavior,
confirmed at the C locus — and JS `artifact_exists` applies it before
calling origin (js/artifact.js:1437–1439) ✓; (2) the old independent
flag tests are replaced by counted arms, which is exactly C's shape.

Caller closure: all 4 real C sites wired with single-bit flags —
artifact.c:284 → js/artifact.js:1316 (RANDOM), artifact.c:397 →
js/artifact.js:1440 (defaulted `f`), pray.c:1803 → js/pray.js:2410
(GIFT|KNOW), zap.c:6383 → js/zap.js:7274 (WISH|KNOW); KNOW_ARTI never
counts toward `ct`, so `ct === 1` at every site in both languages ✓.
`impossible` is async-live but called sync-`void` — established
precedent (botl/dungeon/engrave/light), and the arm is unreachable at
all wired sites. No STUB, no named omits — "none" holds.

## Hallucinations / overclaim

None. The `%4o` limitation and the fire-and-forget justification are
both stated with their reasons, and both check out.

## Density

One 23-line function restarted whole. Small but complete — sole callee
live, all callers dispositioned. OK.

## Verification

D-log cites verify.mjs → PASS + vacuous hidden note + REACH-OK +
green/strict/cohort. Re-measured: `hidden-proxy.mjs verify
artifact_origin --base a196fca24~1 --reach-all` → 0 blocked at baseline
and now (vacuous, as stated — coverage row); smoke 24/24 PASS →
REACH-OK, no regressions. Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
