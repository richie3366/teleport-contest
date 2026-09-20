# Review 1626 — 873be5f1 — objnam.c paydoname whole-body restart (D-2667)

**Metadata:** SHA `873be5f1`, `objnam.c` `paydoname`,
D-2667. JS: `js/objnam.js` (+42/−12: `doname_base`
direct + article-strip + BUFSZ guard + per-arm cites).

## Intent vs deliverable

Subject promises: whole-body restart — `doname(obj)` →
C-named `doname_base(obj, 0)`, the missing article-strip
before the "unpaid"/"your" prepend, and the missing
BUFSZ−PREFIX fit guard on the " and its contents" tail.
Diff delivers all three. Promise matches deliverable.

## Inventory

- `paydoname(obj)` (objnam.js:3572, sync, exported) —
  the only function touched. No imports, no deletions,
  no clones.

## C ↔ JS fidelity

C locus read in full: `paydoname :2312–2355` (44 L,
body above). No RNG either side. Branch-by-branch
confirm:

- Setup `:2319–2328` (save cknown/wizweight, zero
  cknown on contents, hide wizweight, `suppress_price`
  ±1 around the name call) ✓; `doname_base(obj, 0U)`
  directly — JS `doname(obj)` was already exactly
  `doname_base(obj, 0)` (objnam.js:3086), so the swap
  is naming, not behavior ✓.
- Container arm `:2331–2343`: `no_charge` skip, strip
  `"a "/"an "` (`slice(2/3)` ≡ `p += 2/3`), prepend
  `"an unpaid "/"your "` ✓ — the old code prepended
  onto the unstripped article ("an unpaid a box"), the
  kept C-wrong, now gone.
- Contents tail `:2345–2352`: unpaid + fits →
  append; paid → `"the contents of "` prepend ✓.
  Guard `p.length + 17 < BUFSZ − XNAME_PREFIX` ≡ C
  `strlen + sizeof−1 < BUFSZ − PREFIX` (`BUFSZ` 256
  both sides; `XNAME_PREFIX` 80 = objnam.c:9
  `PREFIX`, checked both sides; strict `<` kept) ✓.
- Tail `:2354` (restore cknown) ✓.
- Caller closure: 3 JS sites (shk.js:2635/5224/5310)
  call the unchanged signature ✓.

## Hallucinations / overclaim

None.

## Density

Breadth phase: one-function restart, single file —
right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 ·
hidden note · REACH-OK smoke 24/24 · green · strict ·
cohort 7/7). Re-measured here: `hidden-proxy.mjs
verify paydoname --base 873be5f1~1 --reach-all` → 0
blocked both sides (vacuous note, correctly labeled
coverage row) + smoke 24/24, 0 regressed → REACH-OK.
Claim true. Diff grep: 0 hits for FORCE/DIAG/getRngLog/
fastforward/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
