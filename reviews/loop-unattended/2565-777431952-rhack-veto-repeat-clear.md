# Review 2565 — 777431952 — rhack S-arm veto queue clear (D-3693)

- SHA: `7774319523c34d15e9416ecedf45fe91f7729af2`
- Subject: Must-fix `cmd.c` rhack: S-arm veto omitted C `:3691–3693` reset_cmd_vars(TRUE), stale REPEAT=[dosave] (tutorial S→^A Norep; review 2563) (D-3693)
- D-entry: D-3693. Type: Must-fix (closes review 2563's Keep'd C-wrong), ships alone.
- Diff size: `js/cmd.js` +10/-0 (veto `else` + cite); +1 new test (1 it); ledger D-tag; D-3690 prose correction.

## Intent vs deliverable

Promise: review 2563 proved the D-3690 S-arm gate's veto path
omits C's `reset_cmd_vars(TRUE)` — with multi ≥ 0 the shared
ECMD_OK tail's `reset(FALSE)` keeps the pre-gate `_cmdq_repeat`
entry C never adds, so tutorial S then `^A` silently re-vetoes
save instead of printing C `do_repeat :1646` Norep. Add the veto
branch clear, pin S→`^A` Norep with a test, correct the D-3690
"buried S refuses" sentence.

Diff actually does: exactly that — the `else` calls
`reset_cmd_vars(true)` before the shared tail, the new test
replays Healer-94319 through the vetoed S + `^A` and asserts the
Norep topline, and the D-3690 Fix bullet now carries the
[rev-2563 correction] (IFBURIED exempts save on both sides).
No new import, no new edge, no caller edits.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/cmd.js:6024` S arm | veto `else` → `reset_cmd_vars(true)` + cite | `cmd.c:3689–3693`, `:3814–3816` |
| same-module helper (unchanged) | `reset_cmd_vars` (single def, `:564`) | `cmd.c:3606–3624` (staticfn) |
| `scripts/tutorial-save-veto.test.mjs` | +1 it (S→`^A` Norep) | `cmd.c:1643–1646` |

Name resolution (`sym.mjs`; diff deletes/re-points nothing):

```text
reset_cmd_vars   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:564
rhack            js/cmd.js:5398   ASYNC — await required
do_repeat        js/cmd.js:5287   ASYNC — await required
```

The "LOCAL CLONE" label is a false positive here: C declares
`reset_cmd_vars` as `staticfn` (`cmd.c:3606–3624`), so a
module-local single definition called only inside `js/cmd.js`
is the faithful shape, shared with the house veto precedent
`rhack_dispatch_bound :2813–2816`. No STUB, no new arm.

## C ↔ JS fidelity

Veto block (`cmd.c:3689–3693`, re-read this review): `if
(!can_do_extcmd(tlist)) { reset_cmd_vars(TRUE); res =
ECMD_OK; }`. Tail (`:3810–3816`, re-read): ECMD_OK-only →
`reset_cmd_vars(gm.multi < 0)`. C `reset_cmd_vars`
(`:3606–3624`, `csym`) zeroes `gm.multi` unconditionally and
clears `CQ_CANNED` + `CQ_REPEAT` iff TRUE. JS
(`js/cmd.js:564–583`) mirrors it statement-for-statement:
context/run/nopick/move/mv zeroes, `game.multi = 0`,
`travelmap = null` (named), both queues cleared iff
`reset_cmdq`. The S arm now runs TRUE-reset then the tail
`reset((multi|0)<0)` = `reset(FALSE)` — C's double-reset
convergence exactly, including `context.move = 0` (C: no
ECMD_TIME on the veto path).

REPEAT-add order confirmed: C adds post-gate (`:3732–3737`,
inside the pass branch, re-read); JS adds pre-gate
(`js/cmd.js:5619–5625`, `rhack_repeat_command` 'S'→dosave,
`^A` excluded at `:5620`). Pre-fix the veto path kept that
entry; the fix clears it, so `^A` reaches `do_repeat`'s empty
arm — JS `:5287–5296` mirrors C `:1637–1660`'s head
(`!cmdq_peek(CQ_REPEAT)` → Norep → ECMD_FAIL). No RNG in any
touched arm either side. Callers unchanged (C rhack ←
`allmain.c:530/:536`, `cmd.c:1651`); the `#save`/doagain gates
are untouched as logged.

Non-finding: a null `saveTab` would take the veto path — a
can't-happen (generated key 83 / flags 41 confirmed in 2563),
and fail-closed toward C's veto shape anyway.

## Hallucinations / overclaim

None. "C's double-reset convergence" is now literally true
(the TRUE reset zeroes multi, the tail is FALSE). The buried-S
correction matches `func_tab.h` IFBURIED ⊂ 41 (review 2563).
No FORCE/DIAG/seed/coordinate reads in the `js/` hunks (grep
count 0); Rule #2 clean (global `--rulecheck`: "no bare/node
specifiers or fs calls in js/").

## Density

Must-fix ships alone: one C-wrong, its branch, its test, its
ledger tag, its prose correction — correct density, no head
violation (Must-fix is strict). Whole-function rule
satisfied: rhack was already whole; this SHA repairs the one
veto statement review 2563 named. Ledger entry confirmed:
rhack ported, D-3693 prepended (`cmd.c.jsonl`).

## Verification

D-log claim: focused 3/4 pre-fix (new it `''` vs Norep) → 4/4
post-fix; `verify rhack --full` → note hidden (review-derived
path, no recorded recipe covers S→`^A`, D-3688 precedent) ·
REACH-OK · green · strict · cohort · full 44/44. Audit
re-measure (`verify rhack --base 777431952~1 --reach-all`):

```text
verify rhack: baseline 777431952~1 (scoreboard at de87e9526, 2026-10-08T18:47:11.533Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rhack: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced. This audit re-ran the focused file: 4/4 pass.
The vacuous-verify caveat does not apply — no queue row cited
blocks, the D-log says so, and the red→green mechanism is
airtight from the code (pre-gate add kept vs cleared).
No REGRESSED session.

## Actionable C-wrongs

None. Review 2563's item is fully closed: veto clear live,
S→`^A` Norep pinned, D-3690 prose corrected (stamped
`**Addressed:** D-3693 `777431952` on the review).

Verdict: **ACCEPT**
