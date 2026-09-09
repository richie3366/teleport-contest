# Review 1153 — 4e0fe784 — eat.c start_tin via objnam.c aobjnam quan prefix (D-2187)

Metadata: SHA `4e0fe784`, js/ +4/−9 in `objnam.js`
(`aobjnam` quan line + ref) and `eat.js` (import name,
clone deleted, `null` verb). D-log D-2187. Subject
promises: "6 orcish daggers" tin-opener noun — 1 session
PASS (Rogue-92115 step 118).

Intent vs deliverable: promise matches diff. Actually
adds: the missing `quan != 1` prefix in canonical
`aobjnam`; `start_tin` re-points to canonical `yobjnam`.
No new module edge (existing objnam.js edge).

Inventory: −1 local clone (eat.js `yobjnam`), +0
functions. Re-point verified: `sym.mjs yobjnam` →
single export `objnam.js:2505` sync, zero remaining
clones; `sym.mjs aobjnam` → single export `:2497` sync
plus the pre-existing artifact.js:1382 local (C-matched,
see below).

**C ↔ JS fidelity**: confirm, three loci read at HEAD.

- `aobjnam`: C `objnam.c:2243–2258` = `cxname`, then
  `if (quan != 1L)` prepend `"%ld "`, then optional
  `otense` verb. JS now line-for-line (null-safe guard
  reads missing quan as 1; C never passes NULL here and
  always sets quan, so the guard is unreachable on the
  C domain). The old comment's "quan prefix via xname"
  was wrong — xname only pluralizes — and is fixed. ✓
- `yobjnam`: C `objnam.c:2261–2276` = `aobjnam` +
  `shk_your` unless carried-pname below ORB_OF_DETECTION.
  JS export (pre-existing, untouched) matches. ✓
- `start_tin`: C `eat.c:1722–1797` prints the
  `yobjnam(uwep, NULL)` line only inside the
  `else if (uwep)` arm (bare hands → `no_opener`
  message), so JS can never pass NULL — the deleted
  clone's `'your weapon'` fallback was dead. Branch
  order (blessed `rn2(2)` / opener / dagger 3 / axe 6 /
  default no_opener) untouched from D-0935. ✓
- Collateral: the quan line also flows to
  `wield.js:438` and `zap.js:6726` — both call C's
  `aobjnam` at the same sites (`wield.c:203`,
  `zap.c:6419`), so both gain C-correct counts, no
  divergence. artifact.js:1382 local already had the
  prefix; on the C domain (quan always a number) it is
  now exactly identical to the canonical (guards differ
  only for missing quan, which C never produces). ✓

RNG: none on this path either side (pure noun).

Hallucinations / overclaim: none. PASS claim names the
session and the step; "no live-arm stub" for the
artifact twin is accurate (local, C-matched, out of
this arm's envelope).

Density: ~4 production lines on an Open row — density
exception (C locus 16+16 lines, `start_tin` already
ported). D-log carries the density note itself.

Verification: D-log cites `verify.mjs --fn start_tin` →
1 PASS + green + cohort. Re-measured independently:
`hidden-proxy.mjs verify start_tin --base 4e0fe784~1` →
baseline 1 blocked, `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS` (Rogue-92115: PASS). Exact match.
`rulecheck` clean (re-ran). No DIAG/FORCE/seed/
coordinate gates in added lines.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
