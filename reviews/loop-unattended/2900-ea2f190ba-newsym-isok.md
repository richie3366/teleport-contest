# Review 2900 — ea2f190ba — newsym !isok arm + ordered drain

- SHA: `ea2f190ba` (cliff: newsym :929–935 arm, 7 sessions)
- D-entry: D-4059; Ledger: display.c (`newsym ported`)
- `js/` diff: `js/display.js` +48 (arm + `queueNewsymImpossible`
  drain + cites); new `scripts/newsym-isok-impossible.test.mjs`

## Intent vs deliverable

Promise: port the missing !isok arm (off-map → panic, column-0
→ impossible) with an ordered microtask drain awaiting the real
`impossible()` per hit; 3 sessions move, 3 more topline-fixed at
the same step, 1 unreached with its own diagnosis. Delivers
exactly that. Promise = diff.

## Inventory

- `newsym` !isok arm — display.js:6564–6605: `isok` gate, off-map
  `panic`, column-0 `queueNewsymImpossible` + return. C:
  display.c:929–935 (csym range :916–1099), `isok` cmd.c:4326–4330.
- `queueNewsymImpossible` — display.js:6568–6582: FIFO, one drain
  task, each `impossible()` awaited to completion. C semantics:
  pline.c:584–634 sequential calls.

No new imports/edges (`isok`/`panic`/`COLNO`/`ROWNO` pre-wired;
`impossible` is same-module display.js:10422, ASYNC, awaited).
No deleted symbols, no clones.

## C ↔ JS fidelity

C (display.c:929–935):

```c
if (!isok(x, y)) {
    void (*errfunc)(const char *, ...) PRINTF_F_PTR(1, 2);
    errfunc = (x < 0 || y < 0 || x > COLNO - 1 || y > ROWNO - 1) ? panic
              : impossible; /* misuse of column 0 is less severe */
    (*errfunc)("newsym: attempting screen update for <%d,%d>", x, y);
    return;
}
```

JS is the same split with the same format string and the same
return. `isok` on both candidate homes (const.js:2326,
hacklib.js:7) reads `x >= 1 && x <= COLNO-1 && y >= 0 && y <=
ROWNO-1` — cmd.c:4326–4330 verbatim ("x==1 is the first
column"), so column 0 lands in the impossible arm on both sides.
`x|0`/`y|0` matches C's integer params.

The drain exists for a real async artifact, verified: JS
`impossible()` holds `ps.in_impossible` across `await pline`
(display.js:10422–10431), so sequential fire-and-forget calls
would trip C's pline.c:591–592 recursion panic
(`if (program_state.in_impossible) panic(...)`) — the commit
reports this killed the probe run before the drain. The drain
awaits each call to completion (latch cleared, C order) before
the next: exactly C's sequential semantics, with latch/URGENT/
report/support/fuzzer-panic unduplicated in `impossible()`
proper. The order caveat (drain links behind same-stretch
post-burst sync emissions; C orders burst first) is disclosed
in-code with its unobserved status (151–163 pages pure burst).
Latent note (not a C-wrong): the module-level queue has no
reset hook; in practice it drains to empty long before session
end (bursts are mid-session, sessions run hundreds of steps
past), and no cross-session phantom was observed in any gate.

Caller table: all 452 C newsym sites inherit via the one live
export (signature unchanged); the probe (0,0) chain traced C →
JS per frame (mv_bubble → mnearto → mon_leaving → unstuck →
docrt → see_monsters → newsym) with a temp probe, reverted.

## Hallucinations / overclaim

None. The Verify line reports "0 PASS, 3 moved, 4 unchanged (3
topline-fixed, 1 unreached)" — the same-step topline fixes are
not sold as moves, and the unreached session gets a mechanism
(JS never calls newsym(0,0) there). The two rejected designs are
measured rejections (NhPanic trace, vpline 27-pline trace), not
theory. Related honesty check: D-4058's Status (visible in this
diff's context) calls Monk-50850031 STALE rather than claiming
it — consistent with review 2899's reading.

## Density

Cliff row ("first ACTIONABLE row past held parks", 10 dupe-rc +
95340 re-verified live with falsifiers unfired). Movement on 3
(strictly later steps), topline-exact on 3 more at the same step
(newly-surfaced map-cell residuals honestly out of this arm's
reach: column 0 + messages only). Whole-function holds for the
arm; rest of newsym untouched. One `Ledger:` entry. The pacing
interleave (named (1)) is shared-scheduler scope, correctly not
attempted here.

## Verification

Re-measure (`--base ea2f190ba~1 --no-reach`):

```text
verify newsym: baseline ea2f190ba~1 — 7 session(s) blocked on it
  Valkyrie-50358010: moved → impossible at step 538 (was 537)
  Ranger-50556518: moved → impossible at step 371 (was 363)
  Wizard-50650088: moved → impossible at step 459 (was 458)
  49950024/95217/51550050: toplines now identical both sides
  symset-Rogue-50350015: still newsym at 683, J«» (unreached)
verify newsym: 0 PASS, 3 moved past, 4 unchanged, 0 worse → PROGRESS
```

Exact match — same 3 movers, same steps, same topline-fixed vs
unreached split. Focused test 1/1 green. No FORCE/DIAG/seed
strings. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
