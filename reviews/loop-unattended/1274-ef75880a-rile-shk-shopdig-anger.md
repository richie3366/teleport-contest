# Review 1274 — ef75880a — shk.c shopdig anger arms: rile_shk surcharge + digactualhole make_angry_shk (D-2308)

Metadata: SHA `ef75880a`, D-2308, C-fidelity residuals (no corpus owner). Method: `git show` stat + full `js/shk.js` + `js/dig.js` diff; C `shk.c:1361–1377` (`rile_shk`), `shk.c:54–55` (`NOTANGRY`), `shk.c:1469–1489` (`make_angry_shk` signature), `dig.c:821–822` + `:505–540` (drive-by) via `csym.mjs` + direct read; JS `dig()` breakthrough (`js/dig.js:2034–2063`) + `mkcavepos` (`:1416`) read; `sym.mjs make_angry_shk`; `bill_p || bill` precedent grep; `hidden-proxy verify shopdig --base ef75880a~1` re-run; added-lines-only banned-pattern grep.

## Intent vs deliverable

Subject promises: `rile_shk` bill-walk verbatim over the live bill shape, plus the teleported-shopkeeper `make_angry_shk` arm in `digactualhole`.
Diff actually changes (+10/−2 shk.js, +4/−2 dig.js): the surcharge loop filling the `rile_shk` stub, and the `isshk`-gated anger call before `migrate_to_level`. Promise kept.

## Inventory

- `rile_shk` bill walk (js/shk.js:4084, still module-private; C is `staticfn`).
- `digactualhole` teleport arm (js/dig.js) — `make_angry_shk(mtmp, 0, 0)` via call-time dynamic `shk.js` import (already-live export, awaited).

## C ↔ JS fidelity

`rile_shk` walked against C `:1361–1377` (`csym.mjs rile_shk` range `:1361–1377`):

```c
staticfn void
rile_shk(struct monst *shkp)
{
    NOTANGRY(shkp) = FALSE; /* make angry */
    if (!ESHK(shkp)->surcharge) {
        long surcharge;
        struct bill_x *bp = ESHK(shkp)->bill_p;
        int ct = ESHK(shkp)->billct;

        ESHK(shkp)->surcharge = TRUE;
        while (ct-- > 0) {
            surcharge = (bp->price + 2L) / 3L;
            bp->price += surcharge;
            bp++;
        }
    }
}
```

JS mapping: `NOTANGRY(shkp) = FALSE` ≡ `mpeaceful = 0` (`shk.c:54`: `NOTANGRY(mon)` is `mon->mpeaceful`); `surcharge` flag set before the walk both sides; `while (ct-- > 0)` with `price += (price + 2) / 3` — JS `| 0` idiom is bit-exact for non-negative prices (C `long` truncation ≡ `| 0` truncation; spot-checks 10→14, 1→2, 0→0 recomputed true). The `bill_p || bill` fallback matches six in-file precedents (`:894/:934/:3272/:3466/:4124/:4142`, incl. `addupbill`) and is outcome-equivalent: when `billct == 0` neither side walks, and `billct > 0` implies a live bill array both sides; the `if (!e) continue` guard only covers sparse-JS-array states C cannot construct. The `!shkp`/`eshk` null guards are defensive additions on paths all C callers enter non-null — behavior-preserving. No RNG in the arm.
Callee closure: `make_angry_shk` (`shk.js:1549`, ASYNC, awaited; `(0,0)` args are `UNUSED` in C `:1469–1472`, so literals are exact); `ESHK`, bill fields pre-existing live. `dig.c:821–822` placement (anger before `migrate_to_level`) matched. No STUB in a live arm.

Drive-by adjudicated (not shipped, correctly): the commit notes `dig()` `:520` `unblock_point` vs JS `recalc_block_point`. Read both sides: C `dig.c:520–522` gates on `!does_block(...)` where JS `dig()` `:2050` recalculates unconditionally — but every path reaching the site leaves a non-blocking cell (D_NODOOR/D_BROKEN/CORR), except the trapped-door case where C skips-then-recalcs after `D_NODOOR` (`:532–537`) and JS recalc-then-recalcs; recomputing a still-blocking cell yields blocked ≡ C's skip, and the post-`D_NODOOR` recalc coincides — final vision state identical under the file's stated rebuild idiom (cf. `:1416` comment). No corpus witness, no outcome delta found: NOT a Must-fix; the commit was right to disclose-and-defer. (Also note the commit's `:520` line pointer loosely covers what JS splits across `:2050` and `:2061`; a future row should cite both.)

## Hallucinations / overclaim

None. The "no hand probe" paragraph is honest about *why* (module-private, straight-line port, arithmetic spot-checked both sides) rather than claiming untestability.

Two closure notes verified beyond the message: `rile_shk` stays module-private, matching C `staticfn` (its callers are the shk-internal shopdig warn/snatch arms, not other modules — no export owed). The `surcharge = TRUE`-before-walk order is preserved, which matters because `make_angry_shk` downstream folds `addupbill(shkp)` into `robbed` (C `:1473–1475`, pre-existing live body, untouched here): had a re-entrant anger path re-run the walk, the flag-first order keeps the surcharge single-applied exactly as C.

## Density

Fourteen lines for two arms of one C envelope across two already-linked modules. OK.

## Verification

D-log: preflight clean-tree PASS, `verify --fn shopdig` full matrix PASS with the hidden note explicitly vacuous (NOT a corpus PASS), cohort 7/7, full skipped (tool-gated — acceptable). Re-measured by this review:

```text
verify shopdig: baseline ef75880a~1 (scoreboard at 775e5959) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Row cited 0 blocks — vacuous-honest, no `--base` debt. Added-lines-only grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward` reads. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
