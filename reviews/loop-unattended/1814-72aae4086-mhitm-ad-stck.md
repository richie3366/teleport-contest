# Review 1814 — 72aae4086 — mhitm_ad_stck (D-2855)

- SHA: `72aae4086` (coverage; `uhitm.c` `mhitm_ad_stck` plus `nohandglow`)
- Files: `js/mhitm.js`, `js/mhitu.js`, `js/uhitm.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `mhitm_ad_stck` for all three defenders, and `nohandglow` on a non-killing hand-to-hand hit before the spellbook `resist`. The diff adds `mhitm_ad_stck`, deletes `mhitm_ad_stck_u`, calls the shared function from `mdamagem`, `mhitm_adtyping_u`, and `damageum_adtyping`, and adds `nohandglow` plus the `umconf` arm in `hmon_hitmon`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mhitm_ad_stck` | async export `mhitm.js:1916` | `uhitm.c:3305–3334` |
| `nohandglow` | local `uhitm.js:2117` (C is `staticfn`) | `uhitm.c:6314–6337` |
| `mhitm_mgc_atk_negated` | LIVE `mhitm.js:2696` | `uhitm.c:74–99` |
| `sticks` | LIVE import `engrave.js:377` | `mondata.c:653–659` |
| `m_next2u_mm` | local `mhitm.js:5409` | `you.h:560` `distu <= 2` |
| `set_ustuck` / `hitmsg` | LIVE `mhitu.js:1620` / `:416` | the mhitu/uhitm calls |
| `resist` | LIVE `zap.js:1815` | `zap.c:6099–6158` |
| `hcolor` | LIVE `do_name.js:330` | `hcolor(NH_RED)` |
| `Blind` | LIVE `invent.js:365` | `Blind` in `altfeedback` |

`sym.mjs` (the deleted helper was `mhitm_ad_stck_u`, not an export):

```
mhitm_ad_stck    js/mhitm.js:1916   ASYNC — await required
nohandglow       NOT EXPORTED — 1 LOCAL: js/uhitm.js:2117
sticks           js/engrave.js:377   sync
                 js/monmove.js:1751   sync  (not the import this commit uses)
mhitm_mgc_atk_negated js/mhitm.js:2696   ASYNC
set_ustuck       js/mhitu.js:1620   sync
hitmsg           js/mhitu.js:416   ASYNC
resist           js/zap.js:1815   ASYNC
hcolor           js/do_name.js:330   sync
```

`engrave.js` `sticks` is `dmgtype(AD_STCK) || (AD_WRAP && !AT_ENGL) || AT_HUGS` with `AT_HUGS` 7 and `AT_ENGL` 11. That is `mondata.c:653–659`. `m_next2u_mm` is `dist2 <= 2`.

## C ↔ JS fidelity

`csym` body is `uhitm.c:3305–3334`. The only call is `mhitm_adtyping` at `:4813`. JS reaches that through the three role splits: hero attacker `damageum_adtyping` (`uhitm.js` AD_STCK), hero defender `mhitm_adtyping_u`, monster defender `mdamagem`.

Gate: `mhitm_mgc_atk_negated(magr, mdef, FALSE)`. One `rn2(10)` unless `magr->mcan` returns first (`uhitm.c:82–84` skips that test when `magr == &youmonst`). JS passes `null` for a youmonst defender so `magic_negation_you` runs, and `false` so there is no "avoids harm" line. `pd` is `mdef->data`. `barbs` is `magr->data == &mons[PM_BARBED_DEVIL]`.

uhitm (`magr` is youmonst): if `!negated && !sticks(pd) && m_next2u(mdef)`, `set_ustuck(mdef)` then `Your("barbs stick to %s!")` when `barbs`. Damage is not cleared. mhitu: `hitmsg` first, then stick the attacker when `!negated && !u.ustuck && !sticks(pd)`, then `pline("The barbs stick to you!")`. mhitm: `mhm->damage = 0` only when `negated`. No other RNG in the function. The three arms match that order.

`nohandglow` (`uhitm.c:6314–6337`) returns when `!u.umconf || mon->mconf`. `altfeedback` is `Blind || Invisible`. Charge 1 uses `Your("%s stop tingling.")` or `Your("%s stop glowing %s.", hcolor(NH_RED))`. A higher charge uses `pline_The("tingling in your %s lessens.")` or `Your("%s no longer glow so brightly %s.")`. Then `u.umconf--`. `hcolor('red')` rolls display `rn2` only when `Hallucination()` (`do_name.js:331`), which is C's hallu arm. `Your` / `pline_The` go through `vpline`. The sole C call is `uhitm.c:1912`, after poison, in `else if (u.umconf && hand_to_hand)` once `destroyed` is false. JS (`uhitm.js:2053–2071`) is that `else if`, then `resist(mon, SPBOOK_CLASS, 0, NOTELL)`. `SPBOOK_CLASS` is the `default` arm (`alev = u.ulevel`). `NOTELL` is 0, so no shield. Damage 0, so no HP change. One `rn2(100 + alev - dlev)`. Then `mconf = 1` and the `!mstun && !helpless && canseemon` line. `hand_to_hand` is `HMON_MELEE` or applied polearm (`uhitm.c:1780–1782`).

`mdamagem` still starts `hitflags` at `M_ATTK_MISS` (`mhitm.c:1026`). A negated sticky hit leaves damage 0. C then returns that `hitflags` (`mhitm.c:1070–1071`), which is `M_ATTK_MISS`. The JS shared tail (`mhitm.js:5380`) returns `M_ATTK_HIT` whenever damage is 0 and the flags are not `M_ATTK_AGR_DIED`. That tail already did this when every `AD_STCK` zeroed the dice. An un-negated hit now keeps the opening `d()` and returns `M_ATTK_HIT` after HP, which is `mhitm.c:1073` and `:1118`.

## Hallucinations / overclaim

The three-arm order and the `nohandglow` messages match the bodies. The subject names the gaps that are still true: cream pie returns at `uhitm.js:1737` before `nohandglow` (C `hmon_hitmon_misc_obj` does not set `doreturn`, so `:1911` still runs); `mhitm_mgc_atk_negated` (`mhitm.js:2698`) returns on `magr.mcan` even when `magr` is youmonst; `Invisible_you` is the local flat/`H`/`E` test, not `timeout.js` `Invis`; `monmove.js` `sticks` is not the import. The D-log does not claim the negated mhitm return is `M_ATTK_MISS`.

## Density

Whole `mhitm_ad_stck`, the one C caller via the three JS dispatches, and the one `nohandglow` caller except the named cream-pie return. C is 30 lines; the extra body is the glow helper and the `hmon_hitmon` arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mhitm_ad_stck --base 72aae4086~1 --reach-all`.

```
verify mhitm_ad_stck: baseline 72aae4086~1 (scoreboard at d15d25c20) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mhitm_ad_stck: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

None. The cream-pie return, the youmonst `mcan` test, and `Invisible_you` are the named gaps. The negated mhitm `M_ATTK_HIT` return is the pre-existing zero-damage tail, not a new dice clear.

Verdict: **ACCEPT**
