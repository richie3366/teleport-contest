# Review 1034 — dda50839 — dozap self-zap fatal losehp never killed (D-2064)

## Metadata

- SHA: `dda50839` — `dozap self-zap fatal losehp never killed (queue owner zapyourself, writer dozap) (D-2064).`
- JS diff: `js/zap.js` +7/−0 (one guarded block inside `dozap`).
- Docs: D-2064 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1034.

## Intent vs deliverable

Subject promises: a fatal self-zap (`zapyourself` → `losehp`) now actually
kills, fixing scen-death-Knight-92188 step 17 (C «You've set yourself
afire! Your gloves smoulder!--More--» vs JS empty stall, gameover false).
Diff actually adds: after the self-zap `losehp`, `if
(game._losehp_needs_done || game.program_state?.gameover) { await
finish_losehp_done(); if (game.program_state?.gameover) return 1; }` —
a verbatim mirror of the backfire arm three branches above (js/zap.js:6413).
No new import (`finish_losehp_done` already top-level, js/zap.js:275),
no new module edge. Promise == diff.

## Inventory

- Changed: `dozap` (js/zap.js:6458–6468) — added block only, no signature change.
- No new helpers, no deleted symbols (no `sym.mjs` re-point check owed).
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `dozap` (`nethack-c/upstream/src/zap.c:2626–2683`, via `csym.mjs dozap`):
the self-zap arm at `:2658–2666` calls `losehp(Maybe_Half_Phys(damage),
buf, NO_KILLER_PREFIX)` with **no death check after it**. C needs none:
`losehp` (`hack.c:4255–4292`) ends in `done(DIED)` — noreturn — so on
fatal damage C never reaches the `spe<0` dust check either.

JS `losehp` only flags `game._losehp_needs_done`; death runs later in
`finish_losehp_done` (js/end.js). The self-zap arm never processed the
flag, so fatal damage (38 vs 16 HP) left the hero at HP≤0 alive with the
fire/smoulder topline unflushed — exactly the recorded stall (17/31
screens, RNG 2268/2393, gameover false). Branch-by-branch confirm:

1. `return 1` == `ECMD_TIME` (js/const.js:1936 `0x01`); the sibling
   backfire-caller arm (js/zap.js:6447/6449) and `dozap`'s own tail
   (js/zap.js:6479) use the same literal. Convention holds.
2. Skipping the `spe<0` dust/`update_inventory` tail on death matches C
   (noreturn `done()` skips them too). Non-fatal path falls through
   unchanged. No branch-order divergence.
3. RNG: zero new draws; `finish_losehp_done` is the same deferred-death
   path every other fatal arm uses.

No callee closure to audit (no new calls beyond the already-imported,
already-live `finish_losehp_done`). Named omits (`spe<0` turn-to-dust,
`useupall`, `update_inventory`, `check_capacity`, `check_unpaid`) are
pre-existing defers recorded in the header + `c-js-map/turns.md`, not
introduced here. Rogue sleep/dream path explicitly untouched (D-2065's row).

## Hallucinations / overclaim

None. D-log says «mirror the `backfire` arm» — the added 4 lines are
token-identical to js/zap.js:6413–6416 modulo the `return` (backfire
returns void to its caller; `dozap` must return `ECMD_TIME`, hence
`return 1`). «No new import/edge» verified true (line 275). The D-log
does not claim a Rogue fix.

## Density

7 insertions is below the §2b ~40 guideline, but the C locus is 9 lines
(`:2658–2666`) and the omission is a missing 4-line gate, not a missing
arm — C is that small, the stated exception. One falsifier, one locus,
one module. Acceptable.

## Verification

D-log Verify bullet cites `verify.mjs --fn zapyourself` → PROGRESS
(Knight 17→mcalcmove@20; Rogue still zapyourself@110) + green/strict/cohort.
Re-measured myself: `hidden-proxy.mjs verify zapyourself --base
dda50839~1` → `0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(Knight 17→mcalcmove@20 exactly as claimed; Rogue 110→unstuck@120 —
D-2065's later fix landing on the current tree, strictly forward).
No WORSE, no vacuous «no session blocked» (2 sessions at baseline, both
named). Green + strict + cohort re-run in-iteration per the bullet;
`skip full` justified (single non-shared module; D-2065 re-ran full
44/44 on the shared change).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
