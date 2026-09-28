# Review 1966 — 12641c043 — cmd.c lock_mouse_buttons (D-3006)

Metadata: SHA `12641c043`, D-3006, single-function `cmd.c`
port + two call-site wirings + one stale retirement.
Stat: `js/cmd.js` +28 (doc + stash + port),
`js/getpos.js` +11/−1 (import name + two calls),
`js/const.js` +1 name on an existing import line. No prior
review file on disk.

## Intent vs deliverable

Subject promises the whole `lock_mouse_buttons` body with
both C callers wired and `trapped_door_at` retired stale.
Diff actually adds the port, the const, both wirings, and
the ledger stale note. Promise and diff match.

## Inventory

- `lock_mouse_buttons` (NEW, exported sync,
  `js/cmd.js:1023`): save arm (stash + clear) + restore
  arm (write back), C order.
- `_locked_mousebtn` (NEW, module-local, `:1022`): C
  function-static stash (module-local is the file's idiom).
- `NUM_MOUSE_BUTTONS` (NEW export, `js/const.js:1282`):
  value 2, verified against `wintype.h:143` (`#define
  NUM_MOUSE_BUTTONS 2`) ✓.
- Wirings: `getpos()` loop entry TRUE (`js/getpos.js:1371`,
  C `getpos.c:858`); existing `finally` FALSE (`:1665`, C
  `getpos.c:1155` exitgetpos label).
- `trapped_door_at`: stale retirement (`sym.mjs` →
  `js/detect.js:1590 sync` — live ported symbol, so the
  retirement is plausible on its face).

## C ↔ JS fidelity

`lock_mouse_buttons`, `csym` `cmd.c:3325–3340` (16 lines,
read whole): save loop `:3333–3337` → stash-then-clear
per index ✓; restore loop `:3338–3340` → write-back per
index ✓; static stash → module-local ✓; `gc.Cmd` →
`game.Cmd` (click_to_cmd precedent) ✓. Deltas, both
unobservable: save arm guards the clear with `if (btns)`
(C's table always exists; JS's stays undefined while
`bind_mousebtn` `:2624` is unported) and both arms stash/
restore nulls when the table is missing — documented in
the doc comment as "stays undefined and inert" ✓;
restore arm skips when `btns` is missing (C cannot lose
its static table mid-targeting) ✓. No RNG, no stub.

Callers (`--callers`: exactly the 2 refs): `:858` →
loop-entry call ✓; `:1155` → the function's `finally`,
which the comment correctly identifies as the single-exit
funnel covering all four returns plus fall-through, like
the C `exitgetpos` label; disjointness from the
`u.dx/dy/dz` restore (order unobservable) holds ✓. No
new import edge is possible here at all: the getpos hunk
only adds a name to the pre-existing
`is_valid_travelpt` import from `./cmd.js` — the edge
pre-existed textually, so no `--can` output is required.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963).

## Hallucinations / overclaim

None. The "four returns + fall-through" funnel claim is
structurally checkable and the disjoint-state argument is
sound. No dispatch-over-stub (direct calls, whole body).

## Density

Single-function cluster, +39 lines — under the ~80-line
floor, but paired with a same-iteration stale retirement
and no same-file Open rows to grow with (sole-row case).
Whole function, both callers wired → OK.

## Verification

D-log: `verify.mjs --fn lock_mouse_buttons,trapped_door_at`
→ syntax · rule2 · 2× note hidden + REACH-OK (smoke 24
each) · green 2/2 · strict ×2 · cohort 7/7 · VERIFY:
PASS (no shared file changed → full 44/44 correctly
skipped). Re-measured here
(`--base 12641c043~1 --reach-all`, both): 0 blocked at
baseline and in the working scoreboard with
`fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK` each (captured in-session). Honest vacuous
notes. Zero REGRESSED. No seed/step/coordinate/RNG-index
reads. The D-log's scratch behavior smoke (undefined-table
no-op; defined-table lock/restore round-trip) is labeled
scratch, not evidence — correct labeling.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
