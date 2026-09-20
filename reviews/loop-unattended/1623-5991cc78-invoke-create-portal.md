# Review 1623 — 5991cc78 — artifact.c invoke_create_portal whole-body restart (D-2664)

**Metadata:** SHA `5991cc78`, `artifact.c`
`invoke_create_portal`, D-2664. JS: `js/artifact.js`
(+40/−12: 4 dynamic→static import hoists + per-arm
`:line` cites; logic lines unchanged).

## Intent vs deliverable

Subject promises: whole-body restart with import hoist +
per-arm cites (no behavior change named — the body was
already arm-complete; the deliverable is static imports
+ cites). Diff delivers exactly that. Promise matches
deliverable.

## Inventory

- `invoke_create_portal(obj)` (artifact.js:1913,
  async, local — matches C `staticfn`).
- Hoists (dynamic `await import` → static, all LIVE):
  `depth` (hacklib.js:34, sync), `goto_level`
  (do.js:1490, async, awaited ✓), `next_to_u`
  (apply.js:1574, async, awaited ✓),
  `select_menu_pick_one` (options.js:2309, async,
  awaited ✓). `ATR_INVERSE` already static
  (artifact.js:193) — the removed dynamic import leaves
  no dangling ref. No deletions, no clones.

## C ↔ JS fidelity

C locus read in full: `artifact.c:1866–1931` (66 L,
body above). No RNG either side. Arm-by-arm confirm:

- Window lifecycle `:1872–1875/:1905` → comments (JS
  menu model owns teardown; the picker call below) ✓;
  `zeroany`/`a_int = i+1` ✓; loop `:1877–1886`
  (`!ureached` skip, tutorial skip, `add_menu` dname,
  count + last) ✓; prompt `:1891` → header rows ✓.
- `num > 1 → select_menu PICK_ONE :1892–1896`;
  `n <= 0 → destroy + nothing_special + ECMD_TIME
  :1897–1900`; `i = a_int − 1 :1901`; else arm `:1904–
  1905` ✓.
- Closest level `:1912–1918` (`depth_start >=
  depth(uz)` → entry else ureached) ✓.
- Five-disjunct block gate `:1920–1922` in C order
  (amulet → endgame ×2 → same-dnum → `!next_to_u()`)
  ✓; `!Blind → You(shimmering) :1924` via
  output-identical pline literal; `Blind →
  You_feel(weightless) :1926`; `goto_level ×FALSE
  :1927`; tail `ECMD_TIME :1929` ✓.
- Cycle check: `--can` on both new edges returns
  ALREADY (artifact.js statically imported apply.js and
  options.js before this SHA) — zero new cycle risk.

## Hallucinations / overclaim

None.

## Density

Breadth phase: one-function restart (hoist + cites),
single file — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 ·
hidden note · REACH-OK smoke 24/24 · green · strict ·
cohort). Re-measured here: `hidden-proxy.mjs verify
invoke_create_portal --base 5991cc78~1 --reach-all` → 0
blocked both sides (vacuous note, correctly labeled
coverage row) + smoke 24/24, 0 regressed → REACH-OK.
Claim true. Diff grep: 0 hits for FORCE/DIAG/getRngLog/
fastforward/RNG/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
