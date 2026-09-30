# Review 2096 — 92b27a5b5 — end.c quit cluster (done2/done1/done_intr/done_hangup)

- SHA: `92b27a5b5cbe9648a5e4771d81f12973e553246f` (D-3136)
- Parent: `7cc43ecc2` (audit commit, docs-only)
- Files: `js/end.js` (+108/−21); docs + ledger only otherwise
- Cluster: 4 ports + 1 by-design disposition, one C file

## Intent vs deliverable

Subject promises: "`end.c` quit cluster: done2 restart + done1/done_intr/done_hangup ports, odds_and_ends by-design".
Diff actually adds: restarted `done2` (tutorial gate, cancel arm, wizard Dump-core split), new export `done1`,
new module-locals `done_intr`/`done_hangup`, import-name additions plus one new edge `end.js → do.js schedule_goto`.
No `js/` for `odds_and_ends`. Promise matches deliverable.

## Inventory

| JS function | kind | C locus |
|---|---|---|
| `done2` (restart) | port | `end.c:89–148` (csym) |
| `done1` (new export) | port | `end.c:67–86` (csym) |
| `done_intr` (new local) | port of staticfn | `end.c:153–164` (csym) |
| `done_hangup` (new local) | port of staticfn | `end.c:168–177` (csym) |
| `odds_and_ends` | by-design, no JS | `end.c:830–846` inside `#if 0` `:820–847` (verified) |

No helpers added; no clones; no deleted symbols (no `sym.mjs` re-point check needed).
`sym.mjs`: `In_tutorial js/dungeon.js:1250 sync`, `nh_terminate js/end.js:1012 sync`,
`schedule_goto js/do.js:2317 sync`, `ynq js/getline.js:1947 sync`, `y_n js/getline.js:1943 sync`,
`nomul js/hack.js:1654 sync`, `curs_on_u js/display.js:5668 ASYNC`, `clear_nhwindow_message js/display.js:2957 sync`.

## C ↔ JS fidelity

**done2** (`end.c:89–148`), branch-by-branch confirm:
- `:92–96` abandon gate: `In_tutorial(game.u?.uz) && (await y_n(...)) === 'y'` mirrors
  `In_tutorial(&u.uz) && y_n(...) == 'y'` with `&&` short-circuit. `In_tutorial(lev)` reads `lev?.dnum` — correct arg shape.
- `:98–117` cancel arm in C order: signal omit (named), `clear_nhwindow_message` (`:103`),
  awaited `curs_on_u` (`:104`, async — await required, present), wait_synch omit (named),
  two-if `multi>0 → nomul(0)` / `multi==0 → uinvulnerable=false, usleep=0` (`:106–110`),
  `schedule_goto(game.u.ucamefrom, UTOTYPE_ATSTAIRS, 'Resuming regular play.', null)` (`:113–115`,
  arg order matches `schedule_goto(tolev, flags, pre, post)`), `return ECMD_OK` (`:116`).
- `:120–144` wizard arm: unix `ynq("Dump core?")` (`:130`); VMS/LATTICE prompt arms named-not-this-build.
  `'y'` (`:133`): signal omit, sound-exit guard (`typeof exitSound === 'function'` ≡ C `:137–138` NULL check),
  `nh_terminate(EXIT_FAILURE)` as the named NH_abort analogue (C `:141` never returns; JS sets
  `gameover` and returns ECMD_OK — moveloop stops; acceptable, documented). `'q'` (`:142–143`): `stopprint++`.
  Old code conflated 'y' with stopprint — fixed.
- `:146` `done(QUIT)` + ECMD_OK. Wizard predicate `flags.debug || flags.wizard` follows the repo-wide
  D-0576 convention (end.js:674/1232/1641/2055, teleport.js, topten.js); C `wizard ≡ flags.debug` (flag.h:30).
  Convention predates this SHA — not this SHA's C-wrong.
- Callers: C `end.c:84` (done1) → JS `done1` else arm; C `cmd.c:41` `#quit` extcmd → pre-existing
  `getline.js:645` lazy runner (wired, though the D-log Callers bullet names only the done1 site — doc gap, not a C-wrong).

**done1** (`end.c:67–86`), confirm: fuzzer-off (`:73`), ignintr arm (`:74–82`: signal omits named,
clear/curs_on_u/wait_synch-omit/nomul), else `await done2()` (`:84`). Signal-only, no JS callers — correct.

**done_intr** (`end.c:153–164`), confirm: `done_stopprint++` (`:156`), signal ignores named (`:157–162`).
Compiles under `#ifndef NO_SIGNAL` (`:150`); NO_SIGNAL is not defined for the unix build — the "compiled in" claim holds.

**done_hangup** (`end.c:168–177`), confirm: `done_hup++` (`:172`) unconditional is faithful —
`HANGUPHANDLING` is unconditionally `#define`d (global.h:278); unix wrapper `:166` cited correctly;
sethanguphandler omit named (`:174`); `done_intr()` chain (`:175`). Signal-only, no JS callers — correct.

**odds_and_ends**: `#if 0` uncompiled (`:820–847`, "was used for 3.6.0 and 3.6.1") — by-design with ledger note is correct.

Callee closure: every portable callee is LIVE (`y_n`, `ynq`, `paranoid_query`, `nomul`, `curs_on_u`,
`clear_nhwindow_message`, `schedule_goto`, `In_tutorial`, `done`, `nh_terminate`); signal/window-teardown
callees are named omits. No RNG in any arm (no `rn2` walk needed).

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords in the diff.
`node scripts/imports.mjs --rulecheck` → `Rule #2 clean: no bare/node specifiers or fs calls in js/.`

## Hallucinations / overclaim

None. The D-log says "vacuous: 0 blocked — coverage rows, NOT corpus PASSes" explicitly.
"seed0398 (Dump-core exerciser)" full-suite claim is a public-gate observation, not a corpus PASS claim.
The new `end.js → do.js` edge claim (`--can`: SAFE, hoisted decl) matches `schedule_goto` being a hoisted
`export function` declaration.

## Density

Breadth-phase cluster: 4 whole C functions of one C file + 1 by-design disposition — within §2b
(≤10 fns, one file, 129 js insertions). Each function whole: every arm ported or named; every C caller wired
or signal-only. Ledger entries present for all five (done2/done1/done_intr/done_hangup ported, odds_and_ends by-design).
Verdicts per function: done2 ACCEPT, done1 ACCEPT, done_intr ACCEPT, done_hangup ACCEPT, odds_and_ends ACCEPT (by-design).

## Verification

Re-measured: `node scripts/hidden-proxy.mjs verify done2,done1,done_intr,done_hangup --base 92b27a5b5~1 --reach-all`
→ all four: `0 session(s) blocked` (vacuous note, correctly labelled) + `smoke … 24 PASS, 0 regressed → REACH-OK`.
No REGRESSED, no WORSE. Matches the D-log Verify bullet exactly (vacuous + REACH-OK, green/strict/cohort/full claimed
in-commit; public 44/44 re-checked at iteration end).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
