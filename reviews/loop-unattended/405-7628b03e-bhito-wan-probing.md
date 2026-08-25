# Review 405 — 7628b03e — zap.c bhito WAN_PROBING (D-1445)

## Metadata
- Full / short hash: `7628b03e41d2d373ed8a544dba45e605e4f65dd0` / `7628b03e`
- Parent: `ae0cf7f4` (D-1444). This file audits **this SHA only** (fifth of nine `js/` commits since review **400**). Archive **Addressed:** D-1445 `7628b03e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 04:55:37 +0200
- D-id: **D-1445**
- Stats: 12 files, +328 / −155 — `js/zap.js` +82 / −11; `js/invent.js` +47 / −3. Journal rotate accounts for most of the docs churn.
- Claims to close: Open `zap.c` `bhito` WAN_PROBING (named from D-1444 / review **404**). Not updown. `reviews/loop-2026-08-15/` has no unpaid bhito-probe Must-fix.
- JS / map: `zap.js` `bhito`; `invent.js` `display_cinventory` / `cinv_doname` / `set_cknown_lknown`. `c-js-map/turns.md` + `debt.md`. `drain_item` still named.
- Prior reviews this SHA claims to close: **404** named `bhito` as the stub callee behind D-1444’s `bhitpile`.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhito WAN_PROBING so a probing wand hitting a floor object observes it, peeks containers/statues, and identifies tins/eggs instead of skipping the pile.”

C `zap.c` `bhito` `:2222–2274`:

```
        case WAN_PROBING:
            res = !obj->dknown;
            observe_object(obj);
            if (Is_container(obj) || obj->otyp == STATUE) {
                obj->cknown = obj->lknown = 1;
                if (Is_box(obj) && !obj->tknown) {
                    if (obj->otrapped) pline("%s trapped!", Tobjnam(obj, "are"));
                    obj->tknown = 1;
                }
                if (!obj->cobj) pline("%s empty.", Tobjnam(obj, "are"));
                else if (SchroedingersBox(obj)) { You aren't sure…; cknown=0; }
                else { observe cobj; display_cinventory(obj); }
                res = 1;
            } else if (TIN) { if (!known || !cknown) res=1; known=1; set_cknown_lknown; }
            else if (EGG) { if (!known && corpsenm != NON_PM) res=1; known=1; }
            if (res) learn_it = TRUE;
```

Callers: `bhitpile` (lateral `bhit` + D-1444 down). Callee `invent.c` `display_cinventory` `:5446–5473`. Lateral IMMEDIATE `weffects` does **not** set disclose; pile learn is only this `learn_it`. `obj==otmp` already returns 0 (`:2130`).

Old JS: `bhito` default `res=0` — D-1444’s `bhitpile` walked the pile and observed nothing.

The diff **does** add the WAN_PROBING arm, `Tobjnam_zap`/`otense_zap`, `display_cinventory` + `cinv_doname`, and export `set_cknown_lknown`. It **does not** port `bhito` SPE_DRAIN `drain_item` / boxlock / opening chain. Named. It **does not** port `cinv_ansimpleoname` overflow. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhito` WAN_PROBING | C `:2222–2274`, **wired this SHA** | |
| `observe_object` | C `o_init.c`, **imported live** | Hallu skip dknown |
| `Is_container` / `Is_box` | C macros, **imported live** | |
| `SchroedingersBox` | C, **pre-existing local** | LARGE_BOX spe==1 |
| `Tobjnam_zap` / `otense_zap` | C `Tobjnam`/`otense`, **clones** | `The(xname)` + quan≠1 |
| `display_cinventory` | C `:5446–5473`, **C callee** | INVORDER PICK_NONE analog |
| `cinv_doname` | C `:5391–5418`, **clone** | insert “trapped” |
| `set_cknown_lknown` | C `invent.c`, **imported live** | tin |
| `rndmonnam` | C, **imported live** | hallu cat |
| `learnwand` iff `res` | C `:2272–2273`, **wired** | |
| `drain_item` | C SPE_DRAIN bhito, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** hallu Schroedinger `rndmonnam` may `rn2`. Public fortress does not probe a floor object.

## C ↔ JS fidelity

Prefix unchanged: `obj===otmp` → 0; bypass; uball/uchain 0. Then `res = !dknown` **before** observe (already-seen dagger: res 0 unless container/tin/egg gates). `observe_object` always. Match `:2222–2225`.

Container/statue: cknown+lknown; box `!tknown` trap pline only if `otrapped` then tknown always; empty Tobjnam “are empty”; Schroedinger inconclusive + `cknown=0` (does **not** cinventory); else observe each `cobj` then `display_cinventory`. Those arms force `res=1`. Match.

TIN: learn if `!known || !cknown`; then known=1 + `set_cknown_lknown`. EGG: learn if `!known && corpsenm != NON_PM`; then known=1; no `learn_egg_type` (C comments the same question). `if (res) learn_it`. `learnwand(otmp)` at function end. Match.

`display_cinventory`: title `Contents of ${cinv_doname}:`; nonempty INVORDER analog (`query_objlist_pick_none_binv` from D-1444); empty `(empty)` menu; always `cknown=1`; return null (C PICK_NONE never selects). **Callee is not a stub.** `safe_qbuf` / `cinv_ansimpleoname` overflow named.

`cinv_doname`: insert “trapped locked/unlocked” and `an trapped` → `a trapped`. Match `:5404–5416` minus QBUFSZ length guard (JS strings have no QBUFSZ). Acceptable clone.

Hallucination check: “Match C bhito WAN_PROBING observe/peek/tin/egg” while **`observe_object` and `display_cinventory` are live** is **not** a dispatch-stub lie. Review **404** called this callee a stub; this SHA fills it. “Match C `drain_item`” **would** be. “Match C `cinv_ansimpleoname`” **would** be.

## Hallucinations / overclaim

Subject says a probing wand hitting a floor object observes it, peeks containers/statues, and identifies tins/eggs instead of skipping the pile. **True:** fresh dagger `!dknown` → observe+learn; already-dknown skip learn; empty trapped chest Tobjnam; contents cinventory; Schroedinger skip cknown; tin/egg known gates; self-hit 0; D-1444 down `bhitpile` now actually probes. **False until named** for `drain_item`, boxlock/opening, `cinv_ansimpleoname`. Stamping **Addressed:** D-1445 for `:2222–2274` is fair. Do **not** treat fortress PASS as a floor probe.

## Density

One `bhito` otyp plus the cinventory callee C actually calls. ~90 lines of JS. Playbook §2b right size. Completes D-1444’s named `bhitpile` hole. Did not glue drain_item. Acceptable.

## Branch-by-branch confirm

1. Fresh floor dagger: `res=1`, observe, learnwand. Match.
2. Already `dknown` dagger: `res=0`, still observe, no learn. Match.
3. Empty trapped chest: trap pline + empty pline; `res=1`. Match.
4. Chest with contents: observe cobj + cinventory menu. Match.
5. Schroedinger: inconclusive; `cknown=0`; no cinventory. Match.
6. Tin already known+cknown: identify still, `res` stays 0. Match.
7. Unhatchable egg (`NON_PM`): known=1, no learn. Match.
8. `obj===otmp`: 0 before switch. Match `:2130`.
9. SPE_DRAIN floor still default `res=0`. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `Tobjnam_zap` is English formatting, not a trace index. Cinventory reuses D-1444’s PICK_NONE analog.

## Verification

Journal: private canary **19**/19 (C/JS grep; Rule #2; fresh dagger learn; already-dknown no learn; self-hit 0; empty trapped chest; contents observe; SchroedingersBox; tin/egg known gates; empty statue; locking default; bhitm still D-1426); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a floor probe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `bhito` reaches live `observe_object` / `display_cinventory`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. `bhito` SPE_DRAIN_LIFE `drain_item` (`:2318+`)
2. `cinv_ansimpleoname` / `safe_qbuf` overflow
3. other `zap_updown` otyps; zap_steed teleport; `zap_map` from lateral `bhit`

Do not Must-fix “already-dknown should skip `observe_object`” (C still observes). Do not Must-fix “Schroedinger should set cknown.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `bhitpile` ← `bhit` / `zap_updown` down. New RNG: hallu `rndmonnam` only. Public fortress does not take this path.

Verdict: **ACCEPT-WITH-DEBT**
