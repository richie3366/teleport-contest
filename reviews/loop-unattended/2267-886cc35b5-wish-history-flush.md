# Review 2267 — 886cc35b5 — zap wish_history_flush + add omit retired

Metadata: SHA
`886cc35b5e289a8802bf37445438ae5d305b762c`
(D-3309, 2026-10-02).
`js/zap.js` only (+18):
one new export in C file
order. 1 port + 1 stale
omit retired, both zap.c.

Intent vs deliverable:
subject promises the flush
body as a live export +
retiring the stale
wish_history_add omit. The
diff adds
`wish_history_flush`
between add and menu; the
omit retirement is D-log +
ledger. Delivers what it
promises.

Inventory (per-function):

- `export function
  wish_history_flush()`
  (js/zap.js:7340): null
  `game.wish_history[0..19]`
  when array, then
  `game.wish_history_idx =
  0` unconditionally.
- `wish_history_add`:
  unchanged js/zap.js:7308
  (omit retired via
  ledger).
- No import touched
  (same module), no symbol
  deleted, no clone added.

**C ↔ JS fidelity**
(per-function):

`wish_history_flush` (C
zap.c:6258–6270): `#ifdef
DEBUG` body — loop
`free + NULL` over all
MAX_WISH_HISTORY slots
(:6263–6266), then
`wish_history_idx = 0`
(:6268, unconditional,
outside the loop). JS is
the whole body in C order
✓: nulling ≡ free+NULL
(GC strings), idx reset
unconditional ✓. The
`Array.isArray` guard has
no C analogue (C's static
array always exists) but
is the sound JS half:
ring created lazily by
add; guard skips only the
loop while the idx reset
still runs — C-equivalent
in every creatable state,
no-throw otherwise ✓.
DEBUG-on verified:
patchlevel.h:36 `#define
DEBUG` ✓ (same treatment
as the D-2873 add port).
Ring size 20 both sides
(C zap.c:6221 define, JS
:7298 const) ✓. No RNG ✓.
Sole C caller save.c:1136
inside freedynamicdata
(re-confirmed in the
:1134–1136 teardown run)
— by-design, no JS
counterpart; named omit,
no call site to wire ✓.

`wish_history_add` (C
zap.c:6226–6255, no body
change): the retired omit
had two halves, both
verified shipped — menu
live as `export async
function wish_history_menu`
(:7361, D-3057) ✓, and
the makewish
C :6334–6337 condition
wired at :7426–7429
(`menu_requested &&
wish_history[0] && tries
=== 0` → menu else getlin,
mungspaces on both arms ≡
C's post-branch mungspaces)
✓. The add body itself
(pre-existing) matches C:
wizard gate, dedup scan
with prefix-break,
replace + idx advance ✓.
Callers files.c:2572 +
zap.c:6375/:6379 unchanged
since D-2873/D-2880 ✓.
Review 1832's
characterization checks:
it names flush only as an
omit, verdict
QUALITY-RISK with
`**Addressed:** D-2880` —
no stamp owed by this
SHA ✓.

Hallucinations / overclaim:
none. No “Match C” over
stubs — 0 C callees, sole
caller genuinely
by-design. The D-log probe
(add×3 → flush → 20 nulls
+ idx 0) describes exactly
the shipped code path.

Density: 2 functions, one
C file ✓. 18 insertions
below ~80 — defended and
holds: the deliverable is
a 5-line body (DEBUG-on
closes the by-design
option, so it must be
ported, and it cannot be
longer); zap.c shows zero
absent rows and every
remaining unknown
measured-ok (re-checked),
so the file holds nothing
more Open. Two `Ledger:`
entries, one Verify line
covering both ✓.

Verification: D-log claims
hidden note ×2 + REACH-OK
×2 (smoke 24/24 each),
green 2/2, strict ×2,
cohort 7/7, full skipped
(no shared file —
correct: zap.js only).
Re-measured in one call:
both print “0 blocked” +
vacuous note + “fixed
smoke spread (24 run): 24
PASS, 0 regressed →
REACH-OK” — all 6 lines
match ✓ (queue cited 0
blocks). Diff grep: no
FORCE/DIAG/getRngLog/seed/
fastforward/coords ✓.
Rule #2: no import added ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
