# Review 2340 — 51eafd91c — poisoned three arms + is_innate FROM_FORM arm

**SHA:** `51eafd91c` — "`attrib.c` poisoned blast/killer/towel arms + is_innate FROM_FORM arm (D-3385)."
**Scope:** js/attrib.js +66/−37 (three poisoned arms, is_innate arm, 11 import names, doc). Two-function cluster — per-function blocks below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: poisoned's blast-shieldeff resist arm, G_UNIQ/the() killer polish, and towel halving, plus is_innate's :896–898 FROM_FORM disjunction — both to ported with whole bodies live. Diff delivers exactly that in C order; no drift, no stubs, no new clones (the region.js Half_gas_damage clone sym flags is pre-existing and untouched — attrib.js imports the potion.js export).

## Inventory (per function)

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| P1 | resist blast arm :434–436 | missing arm of live fn | attrib.c:316–408, :338–342 |
| P2 | killer polish :442–451 | missing arm (replaces startsWith shim) | attrib.c:345–351 |
| P3 | towel halving :487–489 | missing arm of live fn | attrib.c:385–390 |
| P4 | FIXME + 2× pline_The switches | comment + canonical render | :353–356; :342/:369 |
| I1 | FROM_FORM arm :1238–1242 | missing arm of live fn | attrib.c:879–900, :896–898 |

No deletion/re-point; no re-point sym owed. Import sym (all LIVE): `shieldeff display.js:4837 ASYNC` (awaited ✓), `pline_The display.js:7990 ASYNC` (awaited ✓), `the objnam.js:1776 sync`, `strncmpi hacklib.js:615 sync`, `name_to_mon mondata.js:881 sync` (null 2nd arg ≡ C `(int*)0` ✓), `type_is_pname do_name.js:653 sync`, `Half_gas_damage potion.js:2839 sync` (call form ✓), `ismnum const.js:3235`, `G_UNIQ/mons/haseyes monsters.js`, `FROMFORM const.js:756`. `FROM_FORM_REASON` is the file-local const :1145 (pre-existing; sym's index misses it — verified by grep, no throw).

## C ↔ JS fidelity

**poisoned — Confirm.** Resist: `if (blast) await shieldeff(ux,uy)` + `pline_The("poison doesn't seem to affect you.")` + return ≡ :338–342 (`blast` pre-existing :420; blast reachable via live zap.js:2192 `poisoned('blast',…)`). Killer: `name_to_mon(killer,null)` → `ismnum && geno&G_UNIQ` → KILLED_BY + `the()` unless pname → else `!strncmpi` the/an/a chain (order + short-circuit + verbatim `[ does this need a plural check too? ]` comment) ≡ :345–351; `the()` is the canonical lowercase article (objnam.js:1776). Halving: `cloud = reason==='gas cloud'`; `(blast||cloud) && Half_gas_damage()` → `Math.trunc((loss+1)/2)` ≡ :385–390 (C int-div on positive loss ✓). No RNG added (pure lookups; shieldeff is display, called by C too). The dropped doc omit "Fixed_abil via adjattrib" is justified, not a burial: the guard lives in JS adjattrib (:541–542, C :124) and is live — poisoned's own body has no Fixed_abil reference. Callers: no signature change; the 8-site table is pre-existing wiring (10th csym ref is a comment, mcastu.c:342).

**is_innate — Confirm.** `(BLINDED && !haseyes(game.youmonst?.data)) || (BLND_RES && (HBlnd_resist|0 & FROMFORM))` → `FROM_FORM_REASON`, placed after knight-JUMPING before `return FROM_NONE` ≡ :896–898 in C order. FROMFORM/BLINDED/BLND_RES pre-imported; `FROM_FORM_REASON=5` matches innately()'s own FROMFORM mapping (:1214) and from_what handles it (:1294), so the sole caller (attrib.c:920, pre-wired :1285) needs no change. Pure predicate, no RNG.

```c
/* attrib.c:345–351 */ i = name_to_mon(pkiller, (int *) 0);
    if (ismnum(i) && (mons[i].geno & G_UNIQ)) { kprefix = KILLED_BY;
        if (!type_is_pname(&mons[i])) pkiller = the(pkiller);
    } else if (!strncmpi(pkiller, "the ", 4) || ...) kprefix = KILLED_BY;
/* attrib.c:896–898 */ if ((propidx == BLINDED && !haseyes(gy.youmonst.data))
        || (propidx == BLND_RES && (HBlnd_resist & FROMFORM) != 0)) return FROM_FORM;
```

## Hallucinations / overclaim

None. "Identical output" for the pline_The switches holds (canonical helper, same strings); "whole C body live" holds for both functions (the three retired poisoned omits + Fixed_abil resolution verified above).

## Density

Breadth §2b: 2 same-file (attrib.c) functions, each with own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry; ≤10 fns, no Must-fix bundled. ~66 insertions, below bar; D-log states the exception (queue's only other attrib.c row is the second member; every callee live). Per-function verdicts: both whole ✓. SHA unanimous.

## Verification

Re-measured (`verify poisoned,is_innate --base 51eafd91c~1 --reach-all`): 0 blocked + vacuous note each; poisoned reach 10/10 REACH-OK, is_innate smoke 24/24 REACH-OK — matches the D-log, 0 regressed. D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 → VERIFY: PASS. Verbatim:

```text
reach poisoned: 10 baseline-PASS session(s) reach it (10 run, 3.7s): 10 PASS, 0 regressed → REACH-OK
smoke is_innate: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
