# Review 1951 — 1b2296131 — alloc.c nhalloc family, new js/alloc.js (D-2991)

## Metadata

- Full / short hash: `1b229613121f13d5ff159b29c5e05e075e054b8d` / `1b2296131`
- Parent: `ebc63743c` (D-2990, review 1950 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 21:06:56 +0200
- D-id: **D-2991**
- Stats: new `js/alloc.js`, 216 lines, zero imports. `js/` insertions
  **~216**. Band 80–350.
- Claims to close: coverage row `alloc.c nhalloc` (0 blocks).

## Intent vs deliverable

Subject promises the nhalloc family port as a new `js/alloc.js`. Body
promises C-order `forceAlignedLength`/`alloc`/`re_alloc`/`heapmon_init`/
`nhalloc`/`nhrealloc`/`nhfree`/`nhdupstr`/`FITSint_`/`FITSuint_` with
C-identical panic messages and a 26/26 scratch probe.

Diff actually adds exactly that module. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `alloc` / `re_alloc` | LIVE new | `js/alloc.js:52/:73`, sync, exported |
| `heapmon_init` | LIVE local | latch only, C staticfn |
| `nhalloc` / `nhrealloc` / `nhfree` / `nhdupstr` | LIVE new | exported; C `#ifdef MONITOR_HEAP` (uncompiled — disclosed) |
| `FITSint_` / `FITSuint_` | LIVE new | exported |
| `forceAlignedLength` | local helper | macro `:48–52`, no C symbol |
| heaplog `fprintf` arms + `getenv`/`fopen` | OMIT named | Rule #2 file/env I/O; `heaplog` always null |
| `fmt_ptr` | LIVE elsewhere | `js/mkobj.js:1795`, no clone |
| `dupstr_n` | compiled out | C `#if 0` `:249–262` |

`node scripts/sym.mjs` (all eight exports, no locals):

```
nhalloc          js/alloc.js:107   sync
nhrealloc        js/alloc.js:132   sync
nhfree           js/alloc.js:155   sync
nhdupstr         js/alloc.js:171   sync
FITSint_         js/alloc.js:194   sync
FITSuint_        js/alloc.js:210   sync
alloc            js/alloc.js:52   sync
re_alloc         js/alloc.js:73   sync
```

No symbol deleted or re-pointed. Zero imports — no edge to check.
Diff grep `FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C loci: macro `:48–52`, `alloc` `:68–81`, `re_alloc` `:85–99`,
`heapmon_init` `:142–149`, `nhalloc` `:152–166`, `nhrealloc` `:170–202`,
`nhfree` `:205–214`, `nhdupstr` `:219–229`, `FITSint_` `:266–273`,
`FITSuint_` `:276–283`. Verified MONITOR_HEAP is defined nowhere in
the build — the nh* half ports uncompiled C, disclosed in the module
header. No live C or JS callers either side (allocation is GC).

- Alignment macro: `n === 0 || n % 8 !== 0` + round-up. Exact
  (`alloc(0)` → 8 like C).
- `alloc`/`re_alloc`: aligned size, zero-filled `Uint8Array`,
  `min(old,new)` carry, `re_alloc(null,n)` ≡ fresh, C-identical
  messages with the **aligned** length (macro mutates before panic).
  The `newlth &&` guard folds correctly (n ≥ 8 always). Match.
- `nhalloc`/`nhrealloc`: latch guards, Rule #2 log omits, deferred
  null arms kept for shape with C-identical messages using the
  **raw** `lth` (C's macro does not propagate back to the caller).
  OOM would throw from `alloc` with the alloc message rather than the
  deferred one — unreachable, disclosed. Match.
- `nhfree`: silent latch. Match. `nhdupstr`: NUL-truncated length,
  immutable-slice copy (dungeon.js `dupstr` idiom), C-identical
  overflow message. One gap: see Actionable 1.
- `FITSint_`/`FITSuint_`: `|0`/`>>>0` with `!==` guard match the C
  casts + comparison exactly, including `2**31` and `-1` rejections
  (probed).

Independent probe (`/tmp/review1951-alloc-probe.mjs`, 18 cases:
alignment, grow/shrink, NUL truncation, all throw arms, silent nhfree):
**18/18 pass**. No RNG in C; none in JS.

## Hallucinations / overclaim

None. The uncompiled-MONITOR_HEAP status and the shape-kept dead arms
are disclosed, not sold as live behavior.

## Density

§2b: whole C file family (10 functions + macro), 216 JS lines, one
leaf module. Right size.

## Verification

D-log: vacuous hidden note + REACH-OK + gates, full skipped (new leaf
file). Re-ran:

```
verify nhalloc: baseline 1b2296131~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke nhalloc: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous + REACH-OK, no REGRESSED. Claim holds.

## Actionable C-wrongs

1. (review-debt, unqueued — unreachable in JS) `nhdupstr` `len + 1`
   does not wrap mod 2³² before `FITSuint_`. C computes `len + 1` in
   `unsigned`, so len = 2³²−1 wraps to 0 and C panics with the
   `nhdupstr: string length overflow` message; JS keeps the double
   2³² and `FITSuint_` throws `Overflow at f:l` first. JS strings cap
   near 2³⁰ chars so the input is unconstructible — same reachable
   behavior, different message on impossible input. One-line fix:
   `FITSuint_((len + 1) >>> 0, ...)` to match C unsigned arithmetic
   exactly (same wrap-modeling bar as D-2988 `snprintfAppend`).

Verdict: **ACCEPT-WITH-DEBT**
