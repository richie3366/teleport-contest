# Review 1634 — d0c80b36 — wield.c doswapweapon whole-body port (D-2675)

**Metadata:** SHA `d0c80b36`, `wield.c`
`doswapweapon`, D-2675. JS: `js/wield.js`
only (+26/−12). No Must-fix.

## Intent vs deliverable

Subject promises: the cantwield arm plus
live prinv/You messages. Diff restarts
`doswapweapon` in C order with exactly
those three fixes and two import names.
Promise matches deliverable.

## Inventory

- Restarted `doswapweapon` (wield.js:391,
  async). No new helpers; none deleted or
  re-pointed. Required `sym.mjs`:

```text
prinv            js/invent.js:7529   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/do_wear.js:248
```

`prinv` correctly awaited; the do_wear.js
clone is pre-existing, untouched. `You` is
the core display export; `cantwield` local
(wield.js:171) matches the `mondata.h:123`
macro — C ships this as a macro so per-file
locals mirror C (4 same-named locals are not
clone drift). Both imports join existing
edges.

## C ↔ JS fidelity

C locus: `wield.c:460–501` (42 L via
`csym.mjs`). Statement-by-statement
confirm, no RNG:

- `multi=0`, cantwield→pline+ECMD_FAIL,
  welded→weldmsg+ECMD_FAIL, stash +
  `setuswapwep(0)`, `ready_weapon(oldswap)`,
  `uwep==oldwep` restore vs
  `setuswapwep(oldwep)` + `prinv(0,uswapwep,
  0)` / `You(...)`, twoweap tail — all in C
  order.
- `return 0` for the ECMD_FAIL arms is
  correct at the documented `swapRes ? 1 :
  0` dispatch (a truthy 4 would cost a
  turn); fail arms returned 0 before too.
- `prinv` is the C-correct call regardless
  of message-shape nuance (C calls prinv;
  JS now calls prinv — fidelity by
  construction).
- Callers spot-checked live and unchanged:
  C `wield.c:408` → js/wield.js:680 `return
  await doswapweapon()`, C `:733` →
  js/wield.js:257 swap-dispatch. None
  unwired, none invented.

## Hallucinations / overclaim

None. The `prinv` output-identity note is
backup for the primary fact (C calls
prinv).

## Density

Whole 40-line C function completed (three
missing facts), one module. Right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify doswapweapon
--base d0c80b36~1 --reach-all`:

```text
verify doswapweapon: baseline d0c80b36~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke doswapweapon: no RNG-tagged reach; fixed smoke spread (24 run, 6.3s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log claim. No REGRESSED.
Diff grep: no FORCE / DIAG / RNG-log / seed
/ coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
