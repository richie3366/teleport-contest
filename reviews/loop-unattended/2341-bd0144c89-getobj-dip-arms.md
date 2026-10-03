# Review 2341 — bd0144c89 — getobj cmdq + pickinv arms in getobj_dip

**SHA:** `bd0144c89` — "`getobj` cmdq HANDS_SYM + ?/* pickinv arms in getobj_dip (D-3386)."
**Scope:** js/potion.js +53/−8 (cmdq call, ?/* arm, raw-lets split, export) + scripts/getobj-dip.test.mjs 4 tests. One clone, two arms.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: #dip's getobj clone gains the canned-cmdq path and the ?/* pickinv menu as mirrors of sibling getobj_dip_ok, closing two missing-arm rows. Delivered: cmdq call in C order, full ?/* arm, raw-lets helper split, test seam export. No drift; the one D-log label error is docs-only (see fidelity).

## Inventory

| # | JS change | Kind | C locus |
|---|-----------|------|---------|
| 1 | cmdq call :2406–2407 | missing path (shared helper) | invent.c:1786–1801 + miss-clear :1813–1815 |
| 2 | ?/* arm :2437–2466 | missing arm (was 'Never mind'+null) | invent.c:1963–1992 + gold :2004–2012 + EXCLUDE :2070–2073 |
| 3 | dippable_lets_raw split :325–338 | helper refactor | lets-vs-buf :1905–1910 |
| 4 | `export getobj_dip` + test file | test seam + 4 tests | — |

No deletion/re-point; no re-point sym owed. All names pre-scoped (HANDS_SYM/hands_obj/COIN_CLASS/GETOBJ_EXCLUDE pre-imported; cmdq helper hoisted :2493; pickinv via dynamic invent.js import like the sibling). Callee closure: cmdq_pop_getobj_key + getobj_display_pickinv are shared LIVE helpers; dip_ok/dip_hands_ok in-file; pline/nhgetch live. No stubs, no new clones.

## C ↔ JS fidelity

**cmdq — Confirm.** Call sits after obj_ok selection, before handsListed/prompt — C order (:1776–1820 before :1832). Protocol `canned!==undefined → return canned` matches C: hit → obj/hands, miss → cleared+null (:1813–1815), empty/non-key → prompt. Helper internals (HANDS_SYM verdict, letter scan, INT fall-through) are pre-existing, sibling-shared; the INT gap is D-log-named with its C cite (:1798–1811) and behavior note (allowcnt false → C clears+NULLs). Docs-only drift: the D-log calls dip "GETOBJ_NOFLAGS" — C potion.c:2279 passes GETOBJ_PROMPT (the sibling's own doc has it right). Inert here: allowcnt is false either way and forceprompt gates only :1912, untouched by these arms.

**?/* — Confirm modulo disclosed corners.** ESC→verbose 'Never mind.'+null (:1989–1992 ✓), !ilet→continue (:1983–1986, oneloop pre-existing), HANDS_SYM→hands (:1987–1988; order vs ESC irrelevant — distinct values), redo_menu on ?/*-return lives INSIDE the helper (`continue`, invent.js) so the arm never sees it ✓, gold→'You cannot dip gold.' (dip coins are always EXCLUDE per potion.c:2220, so C's :2007 verdict gate is vacuous; string ≡ `You("cannot %s gold.","dip")` ✓), EXCLUDE→silly text (`===` ≡ C :2070 `==`; decl.c:43 "That is a silly thing to %s." ✓), `_pending_message=''` mirrors the sibling. allownone:true ✓ (C :1833–1844 sets it for SUGGEST and DOWNPLAY alike); promptHasHands=handsListed ⟺ C `*buf=='-'` ⟺ SUGGEST (:1833–1837) ✓; raw lets uncompacted ⟺ C `Strcpy(lets,bp)` before compactify (:1908–1910) ✓. `allowed` for '?' vs `*`→full is helper-internal, pre-existing. Named corners: :1967 altlets fallback (helper SUPPORTS ctx.altLets; neither clone passes it — hands-only empty-menu corner, D-log-named) and in_doagain/force_invmenu/oneloop (map-named D-1563/D-1578/D-1804, which names potion clones).

Pre-existing, out of scope: getobj_dip's obj_ok never passes `inacc`, so C-EXCLUDE_INACCESS items (cloak-covered suit etc., do_wear.c:3340–3400) list as SUGGEST in the prompt (pre-existing) and now the menu — while the sibling passes `equipment_is_inaccessible` (:2808). Acceptance still matches C (C :2070 accepts EXCLUDE_INACCESS direct picks too); only listing differs. Root is the clone's verdict wiring (D-3380 era), not this arm; needs its own audit, not queued here.

```c
/* invent.c:1790–1794,1813–1815 */ if (cq.key == HANDS_SYM) {
        v = (*obj_ok)(0); if (v==SUGGEST||v==DOWNPLAY) otmp=&hands_obj; } ...
    if (!otmp) { cmdq_clear(CQ_CANNED); }
/* invent.c:1908–1910 */ Strcpy(lets, bp); /* uncompacted */
    if (suggested > 5) compactify(bp);
```

## Hallucinations / overclaim

None behavioral. The "GETOBJ_NOFLAGS" label (above) misnames a flag with zero effect on these arms; the D-log's behavioral claims (INT clear+NULL, no-count) are right. "Single caller, behavior-identical" for the lets split verified (`raw.split('')` reconstructs the sorted array; sole caller :2413).

## Density

Two missing-arm rows, one clone, one C function family — a coherent cluster; per-arm C-locus/Verify/Named sub-bullets, own `Ledger:` entry (getobj stays ported — D-id prepend only, no flip, no burial). ~53 js/ insertions + committed test; D-log states the exception (both invent.c Open rows ship; every callee live).

## Verification

Re-measured (`verify getobj --base bd0144c89~1 --reach-all`): 0 blocked + vacuous note + smoke 24/24 REACH-OK — matches the D-log, 0 regressed. Committed test run myself: `node --test scripts/getobj-dip.test.mjs` → 4/4 pass. D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 → VERIFY: PASS. Verbatim:

```text
smoke getobj: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
