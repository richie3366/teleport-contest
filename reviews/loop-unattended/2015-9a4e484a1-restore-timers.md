# Review 2015 — 9a4e484a1 — restore_timers timer save/restore closure

Metadata: SHA `9a4e484a1`, D-3055, js/mkobj.js + js/lev_json.js
(+177/−48). Per-function blocks below; SHA verdict is the worst of them.

## Intent vs deliverable

Subject (one-line commit; detail lives in D-3055) promises "timer
save/restore closure + maybe_write_timer/write_timer". Diff actually
adds both exports, restarts `restore_timers` in C order, re-points three
lev_json save paths at them, and ledger-marks three verify-and-declare
functions. Matches promise. Six-function single-C-file closure.

## Inventory

- `write_timer` (new export js/mkobj.js:1143, sync) — C :2504–2551.
- `maybe_write_timer` (new export js/mkobj.js:1200, sync) — C :2626–2651.
- `restore_timers` (restarted export js/mkobj.js:1258, sync) — C :2706–2728.
- Verify-and-declare (ledger only, no `js/`): `save_timers`, `insert_timer`,
  `timer_is_local`.
- Re-points: lev_json `serTimer` delegates to `write_timer`;
  snapshotLocal/GlobalTimers drive `maybe_write_timer`; stale
  `timer_is_local` import dropped (no dangling refs — grep clean).

## C ↔ JS fidelity

`write_timer` vs C `:2504–2551` (csym): GLOBAL/LEVEL as-is with arg_id 0
✓; OBJECT needs_fixup-untouched vs pointer→o_id+restore ✓ (JS never
mutates the live entry — the record takes the id, which collapses C's
swap/write/swap-back without observable difference); MONSTER same with
m_id ✓; default `panic("write_timer")` → loud `throw` ✓ (C terminates;
a throw aborts the save loudly — closer to panic than a continue; path
unreachable: live entries carry only the four valid kinds). The
`arg_id != null` relinked-entry preference is byte-identical to the old
serTimer fallback it replaces — no behavior change there. Verdict: ACCEPT.

`maybe_write_timer` vs C `:2626–2651` (csym): count init, chain walk,
RANGE_GLOBAL-vs-else arms, per-entry count + write_it gate, count return
✓ exact. Documented adaptation (NHFILE writer → callback; C's
(nhfp,range,bool) → JS (range,callback)) is the honest JSON-VFS shape,
same as write_ls D-2666. Verdict: ACCEPT.

`restore_timers` vs C `:2706–2728` (csym): C's NHFILE reads (timer_id
`:2714–2716`, count `:2717`, alloc+read per element `:2719–2721`) live at
the pre-existing call sites (save.js restgamestate, deserTimerList) and
this function is the `:2718–2726` insert loop with per-line cites ✓;
`insert_timer` live (C `:2724`, ifndef-arm always true in JS) ✓. Named:
ghostly `timeout += adjust` bones arm (review-657 JSON-ghostly precedent)
and NHFILE byte IO (Constitution §1.5/§1.6; relink_timers by-design
precedent) — both C-cited, legitimate. Verdict: ACCEPT.

Verify-and-declare trio: ledger rows carry JS loci + D-3055; the D-log's
Callers section wires save_timers (save.c:296/539 → save.js:583,
do.js:1754/1768), insert_timer (:2286 → mkobj.js:1548), timer_is_local
(both use sites) — each with its own Verify line in the D-log. No silent
stubs. Verdict: ACCEPT.

Callee closure: `timer_is_local` live same-file; `insert_timer` live;
field reads only otherwise. No STUB in a live arm. Density: 6 rows, one
C file, no Must-fix bundled — inside §10.17. OK.

## Hallucinations / overclaim

None. The commit message is a bare subject, but D-3055 carries the full
per-function evidence (loci, callers, verify, named) and every checked
claim holds.

## Verification

D-log cites verify.mjs (6 fns) → PASS + hidden note + REACH-OK ×6 +
green/strict/cohort, plus extra real-save evidence (seed0013
save-then-fullmoon-restore 1/1, RNG 4804/4804 — exercises the rewired
serTimer/snapshot path). Re-measured all six in one call `--base
9a4e484a1~1 --reach-all`: 0 blocked at baseline and now each (vacuous,
as stated — coverage rows); smoke 24/24 PASS each → REACH-OK, no
regressions. Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
