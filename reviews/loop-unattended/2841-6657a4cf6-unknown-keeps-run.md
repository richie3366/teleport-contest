# Review 2841 — 6657a4cf6 — rhack Unknown keeps run stuck + call-local rush gate

## Metadata

- SHA: `6657a4cf6ec6524af5916d949e5d97779ba263eb` (D-3997)
- Cliff writer: do_statusline2 stale-T×6 (all symset number_pad),
  15 sessions on the owner at baseline
- js/ diff: `js/cmd.js` 23 lines; new
  `scripts/numpad-unknown-run-stuck.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: (1) the house `end_running` in `rhack_unknown_command`
cleared C's stuck run — C's Unknown arm (`:3833-3841`) resets
nothing, so run stays 3 and EOT suppresses `time_botl` while JS
repainted fresh T. Delete it (D-3953 omission-1 falsifier fired).
(2) With run stuck, the run/rush tlist gate must read call-local
`prefix_seen` like C `:3693` and the D-3953 fight gate, not
persistent run/domove_attempting — else the next call re-errors.
4 PASS + 4 moved + 7 unchanged (own causes, named).

Diff actually: the `end_running` line deleted with a cite
comment; `pendingRushPrefix` (persistent) replaced by
`prefix_seen?.txt === 'run'/'rush'` (call-local); error names
the local prefix. Promise == diff. `js/cmd.js` only.

## Inventory

- `rhack_unknown_command` (`js/cmd.js:5513`, C `cmd.c:rhack`
  `:3626-3843` via `csym.mjs`, Unknown arm `:3833-3841`): now
  C-verbatim (pline, 2× cmdq_clear, sanity skip, move FALSE,
  multi 0 — all present, read in full).
- `rhack` run/rush tlist gate (`js/cmd.js:5722-5729`, C
  `:3693-3700`): predicate source changed to call-local.

## C ↔ JS fidelity

- Unknown arm (`cmd.c:3833-3841` read): `custompline Unknown`,
  `cmdq_clear(CQ_CANNED)`, `cmdq_clear(CQ_REPEAT)`, sanity
  skip, `move = FALSE`, `multi = 0` — resets nothing about
  run. JS matches line-for-line now (read `cmd.js:5513-5530`
  whole, including `game.multi = 0`). The two kept house
  resets (`command_count`, `_repeat_search`) are JS-internal
  and named as omission 2.
- `do_run` (`:1605-1618` read): `run = 3` + `DOMOVE_RUSH` ✓;
  EOT `if (flags.time && !svc.context.run) disp.time_botl =
  TRUE` (`allmain.c:262-263` read) ✓ — the stuck-run → stale-T
  mechanism is C-exact.
- Tlist gate (`:3693-3700` read): fires on call-local
  `prefix_seen` only ✓. JS `prefix_seen` is `let`-local to
  rhack (`:5532`, set `:5964` from the current key's prefix —
  read) ✓, mirroring both C and the D-3953 fight gate
  (`:5695`). The `:3774-3777` "just do nothing" arm (read)
  corroborates the next-call-runs-normally claim.
- No RNG in either hunk; no branch reorder beyond the
  predicate source swap.

Diff grep clean; Rule #2 iteration-wide clean (review 2838).
No symbol deleted/re-pointed — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. The delicate claim — both "null-owner" moves are
`error:null/jsPanic:null` screen fallbacks, not throws — I
verified independently: the cached rows for Arch-50059047
(s626) and Arch-50350039 (s867) both record `error: null,
jsPanic: null, kind: screen, owner: null`. Note for future
readers: my `hidden-proxy verify` printed these moves as
"moved → js-throw", while ship-time `verify.mjs` printed
"null-owner" — a reporter label quirk for null owners, not a
real throw in either run. The D-log's "not throws" stands.

## Density

Cliff phase §10.18: one cliff writer, one file, code + ledger +
verify + focused test + 6 numpad guards. The 7 unchanged
sessions are itemized with per-pair causes and falsifiers
(OSC park, menu-count measure, capture race, unprobed AC) —
named, not shipped. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify do_statusline2,rhack --base 6657a4cf6~1 --no-reach`
- `verify do_statusline2: 4 PASS, 4 moved past, 7 unchanged, 0 worse`
- Same 4 PASS (Healer/Tourist/Valkyrie + pre-existing Monk),
  same 4 moves (Caveman 83→inuse_classify@462, Arch 42→@626,
  Arch 420→@867, pre-existing Knight→flooreffects@800), same 7
  unchanged at the same steps (210/397/1061/1002/1065/543/556).
- `verify rhack: no corpus session is blocked` — expected
  (writer); D-log says so.

Exact match to ship-time. Ship-time reach 24/24 + 24/24,
green, strict, cohort 7/7, full 44/44 corroborate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
