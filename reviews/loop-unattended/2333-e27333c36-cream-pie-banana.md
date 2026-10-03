# Review 2333 — e27333c36 — use_cream_pie COST_SPLAT tail + doapply BANANA arm

**SHA:** `e27333c36` — "`apply.c` use_cream_pie COST_SPLAT tail + doapply BANANA arm (D-3378)."
**Scope:** js/apply.js +15/−10 (const import, tail swap + clone deletion, BANANA arm). One clone deleted → required re-point sym pasted below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: the `use_cream_pie` COST_SPLAT tail (shop billing) with the local `freeinv_pie` clone replaced by canonical `obj_extract_self`, plus the `doapply` BANANA hallu arm. Diff delivers exactly that; `use_cream_pie` flips partial→ported, `doapply` stays partial. No drift in `js/` — but the `doapply` ledger row carries another function's bullet (see Actionable 1).

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | use_cream_pie tail js/apply.js:1134–1137 | missing tail of live fn | apply.c:3567–3603, tail :3597–3602 |
| 2 | `freeinv_pie` deleted → `obj_extract_self` | clone → canonical import | mkobj.c obj_extract_self |
| 3 | doapply BANANA arm js/apply.js:2789–2793 | missing arm of live fn | apply.c:4400–4406 (+default :4407–4416) |

Required re-point sym: `freeinv_pie NOT FOUND in js/**` (deleted ✓); `obj_extract_self js/mkobj.js:3840 sync` (canonical LIVE, pre-imported); `costly_alteration js/shk.js:2454 ASYNC` (LIVE, awaited ✓); `COST_SPLAT js/const.js:1689 export const` (=12 ✓); `use_cream_pie` local-only js/apply.js:1084 (correct — staticfn in C).

## C ↔ JS fidelity

**Tail** — C `:3597–3602`: `setnotworn(obj); /* useup() is appropriate, but we want costly_alteration()'s message */ costly_alteration(obj, COST_SPLAT); obj_extract_self(obj); delobj(obj); return ECMD_OK;`. JS: `setnotworn(pie); /* verbatim C comment */ await costly_alteration(pie, COST_SPLAT); obj_extract_self(pie); delobj(pie); return ECMD_OK;` — exact C order, comment cited verbatim. `COST_SPLAT=12` indexes pre-existing `ALTERATION_VERBS[12]='splatter'` (shk.js:1336–1339, "must match COST_xxx"). The deleted clone (invent splice + where=FREE) is subsumed by canonical `obj_extract_self` (same + nobj/nexthere null + pickup_prev=0 — a superset in C's direction). Common-path safety verified: `costly_alteration` returns before any message/RNG for non-unpaid carried/invent/free pie (shk.js:2464–2465). Sole C caller :4259 (doapply CREAM_PIE) — pre-wired, untouched. **Confirm.**

**BANANA** — C `:4400–4406`: hallu → `pline("It rings! ... But no-one answers.")` + break (=ECMD_TIME, since `res` inits ECMD_TIME at :4217); else FALLTHROUGH to default. JS: hallu-gated identical string + `return true` (ECMD_TIME in doapply's boolean interface, matching the sibling arm :2786), placed before the is_pole check so non-hallu falls through the chain. Banana is food: is_pole/is_pick/is_axe all false — I verified pick/axe is handled earlier in JS doapply (D-0951 dynamic import), pole next, then Sorry + `return false` (:2802–2803) exactly like C's `:4415–4416`. Hallu predicate matches the sibling downplay :337. **Confirm.**

Callee closure per arm: all LIVE (costly_alteration, obj_extract_self, delobj, pline) or deleted-to-canonical. No stubs, no new clones.

Quoted C (tail + BANANA + default):

```c
/* apply.c:3597–3602 */  setnotworn(obj);
    /* useup() is appropriate, but we want costly_alteration()'s message */
    costly_alteration(obj, COST_SPLAT);
    obj_extract_self(obj); delobj(obj); return ECMD_OK;
/* apply.c:4217 */       int res = ECMD_TIME;   /* BANANA break value */
/* apply.c:4400–4416 */  case BANANA:
        if (Hallucination) { pline("It rings! ... But no-one answers."); break; }
        FALLTHROUGH; /*FALLTHRU*/
    default:
        if (is_pole(obj)) { res = use_pole(obj, FALSE); break; }
        else if (is_pick(obj) || is_axe(obj)) { res = use_pick_axe(obj); break; }
        pline("Sorry, I don't know how to use that."); return ECMD_FAIL;
```

JS default chain verified end-to-end: BANANA hallu arm (:2789–2793) → is_pole (:2795) → Sorry + `return false` (:2802–2803); the is_pick/is_axe arm lives earlier (D-0951 dynamic import), so the chain covers C's three default branches. `COST_SPLAT=12` (const.js:1689) indexes pre-existing `ALTERATION_VERBS[12]='splatter'` ("must match COST_xxx"). The `costly_alteration` early-out for non-unpaid carried/invent/free pie (shk.js:2464–2465) keeps the common path message- and RNG-identical.

| Callee | Status | Evidence |
|---|---|---|
| costly_alteration | LIVE | shk.js:2454 async, awaited, pre-imported |
| obj_extract_self | LIVE | mkobj.js:3840, replaces deleted clone |
| delobj / pline | LIVE | pre-existing |
| is_pole / use_pole | LIVE | default chain, untouched |

## Hallucinations / overclaim

None in `js/` or the D-log body. The D-log "Named: doapply: BANANA omit retired, ledger stays partial" is true as far as it goes — but the ledger write itself is corrupt (below).

## Density

Breadth phase, §2b: 2 same-file (apply.c) arms closing ledger-listed gaps, each with own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry. ~15 js/ insertions, below bar; D-log states the exception (file holds nothing more Open, all callees live). Whole-function verdicts: use_cream_pie whole, doapply partial-with-BANANA-live — SHA unanimous modulo the ledger-recording debt.

## Verification

Re-measured (`verify use_cream_pie,doapply --base e27333c36~1 --reach-all`): 0 blocked + vacuous-note + smoke 24/24 REACH-OK for both — matches the D-log. Verbatim smoke lines:

```text
smoke use_cream_pie: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
smoke doapply: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no DIAG/RNG-log/fastforward/coordinate hits (the one FORCE-pattern hit is the `FORCETRAP` const name in the import block).

## Actionable C-wrongs

1. **`doapply` ledger omit is another function's bullet (finish-iteration paste error).** Current row: `omit:"- \`use_cream_pie\`: none remaining — ledger omit (COST_SPLAT tail) now live."` — verbatim use_cream_pie's Named bullet, self-contradictory inside a `partial` row, and it erased the row's real remaining-gap record (pre-image named only the now-live BANANA arm). Fix in one iter: re-read JS doapply (:2494–2804) against C apply.c:4214–4425 and `ledger.mjs set doapply` with the true remaining omit (or `ported` if the BANANA close completes it — pick/axe D-0951, pole, Sorry tail all verified live by this review). Docs-only; zero behavioral impact. Source: reviews/loop-unattended/2333-e27333c36-… (debt, not Must-fix — see verdict).

Verdict: **ACCEPT-WITH-DEBT**
