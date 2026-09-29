# Review 2082 — ee5dff112 — container_at whole-body + pit dirprompt

- SHA: `ee5dff112` (D-3122)
- Subject: "`pickup.c` container_at whole-body + lock.c:794 pit-dirprompt caller wiring (coverage)"
- js/ insertions: ~17 (js/pickup.js + js/lock.js)
- Prior index: 2081; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: complete PARTIAL `container_at` (the C `:2030`
next-cache) and wire its lock.c:794 caller (pit +
container-underfoot dirprompt), retiring the doc deferral.

Diff actually adds: the 2-line nobj cache, the 9-line dirprompt
arm, and the one-line doc retirement. Matches the promise.

## Inventory

- `container_at` (js/pickup.js:4161, export) — C
  pickup.c:2023–2038 (csym range). Live: whole body now.
- `doopen_indir` (js/lock.js:827, async export) — caller wiring
  only: the lock.c:793–795 dirprompt arm.

Helpers: none added. Callees `objects_at` + `Is_container`
pre-existing live; `TT_PIT` + `container_at` already imported
in lock.js (no new edge). Nothing deleted or re-pointed.

## C ↔ JS fidelity

`container_at`: `for (cobj, nobj); cobj; cobj = nobj` +
`nobj = cobj.nexthere` is now textually C's loop (:2029–2030);
Is_container/count/!countem-break (:2031–2034) unchanged and
exact. The cache is unobservable (no mutation during the scan)
but C-exact list semantics, as the D-log says. No RNG either
side.

Caller wiring: C lock.c:793–795 read in full — `dirprompt =
NULL`, then the `u.utrap && TT_PIT && container_at(ux, uy,
FALSE)` gate setting `"Open where? [.>]"`. JS :830–836 is the
same predicate (with `| 0` on utraptype), same string, computed
before the x>0/coords branch exactly like C, and passed to
`get_adjacent_loc(dirprompt, null)` whose first param feeds
`getdir(prompt)` (js/lock.js:766 verified live). Order exact.

Callers: all 6 C sites wired — lock.c:794 → :835 (new),
lock.c:847 → :886 (verbatim lootable line), pickup.c:2217 →
:4224 (num_conts), :2302 → :4423 (underfoot goto), :2326 →
:4440 (!underfoot), :3586 → :5199 (boxes). (JS lines sit +1
above the D-log cites — the inserted cache line; expected.)

The remaining named omission (pit-reach gate :815–818) is real:
the two "reach over the edge" strings in js/lock.js (:1058,
:1319) belong to doclose and pick_lock's own C sites, not
doopen_indir. Not stale.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "Unobservable today, C-exact" is the honest framing; "0
blocked" is a note, not a PASS.

## Density

Single function + caller wiring at ~17 insertions — below the
~80 floor, but the unless-clause holds: the parent block held
exactly one pickup.c row (the head itself), the callee closure
is live, and the iteration also retired the two rows above the
head (fopen_config_file stale, shuffle_tiles by-design with
verified TILES guards — config.h:607 commented, both call
sites `#ifdef TILES_IN_GLYPHMAP`). Verified against
`ee5dff112~1:docs/LOOP-QUEUE.md`. Verdict: ACCEPT.

## Verification

Re-measured (`--base ee5dff112~1 --reach-all`): 0 blocked at
baseline and working tree, vacuous note, smoke 24/24 → REACH-OK.
Matches the D-log; no REGRESSED session. Shared gates per D-log:
syntax 2 files, rule2, green 2/2, strict ×2, cohort 7/7 (full
skipped — no shared file; lock.js/pickup.js are not in the
shared set, plausible).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
