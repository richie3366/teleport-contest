# Review 705 — a2be8560 — weapon.c possibly_unwield / setmnotwielded (D-1744)

## Metadata
- Full / short hash: `a2be85604972839d7a6dedf18ee6bb6f794944fb` / `a2be8560`
- Parent: `5a8392de` (D-1743). This file audits **this SHA only** (fifth of nine `js/` commits since review **700**). Archive **Addressed:** D-1744 `a2be8560`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:40:35 +0200
- D-id: **D-1744**
- Stats: `js/weapon.js` +101/−14; `js/apply.js` +6/−41; `js/makemon.js` +14/−7; `js/were.js` +10/−5; `js/worn.js` +11/−1; `js/wield.js` +9; `js/mhitm.js` +3/−2; `js/potion.js` +2/−2; `js/mon.js` +1/−1. Total `js/` insertions **157** <250. Band **150–350**.
- Claims to close: Open `possibly_unwield` after D-1743 (queue said `worn.c`; C is `weapon.c`). Not setworn `oc_oprop`. `reviews/loop-2026-08-15/` has no unpaid unwield Must-fix.
- JS / map: `weapon.js` helper; `wield.js` `mwelded`; `worn.js` `bypass_obj`; four C callers. `c-js-map/turns.md`.
- Prior: map named the helper under newcham/were/`mattackm`/`use_whip`.

## Intent vs deliverable

Git subject promises: poly/were/whip/`mattackm` drop or recheck monster weapons instead of omitting the helper after D-1743.

`node scripts/csym.mjs possibly_unwield` → `weapon.c:746–795`. `--callers possibly_unwield`: `apply.c:3176`; `mhitm.c:411`; `mon.c:5484`; `were.c:130`; `uhitm.c:2255`/`:4726`; `mthrowu.c:604` comment (not this fn). `setmnotwielded` `weapon.c:1813–1828`. `mwepgone` `weapon.c:937–946`. `mwelded` `wield.c:1077–1084`. `will_weld` `wield.c:68–69`. `bypass_obj` `worn.c:1118–1123`. `attacktype` `mondata.c:53–57` → `attacktype_fordmg(..., AD_ANY)` (`AD_ANY` is `-1`, `monattk.h:41`). `AT_WEAP` 254 (`monattk.h:28`).

```746:778:nethack-c/upstream/src/weapon.c
    if (!(mw_tmp = MON_WEP(mon))) return;
    for (obj = mon->minvent; obj; obj = obj->nobj)
        if (obj == mw_tmp) break;
    if (!obj) { MON_NOWEP(mon); mon->weapon_check = NEED_WEAPON; return; }
    if (!attacktype(mon->data, AT_WEAP)) {
        setmnotwielded(mon, mw_tmp);
        mon->weapon_check = NO_WEAPON_WANTED;
        if (cansee(mon->mx, mon->my)) {
            pline_mon(mon, "%s drops %s.", Monnam(mon), distant_name(obj, doname));
            newsym(mon->mx, mon->my);
        }
        obj_extract_self(obj);
        if (!flooreffects(obj, mon->mx, mon->my, "drop")) {
            if (polyspot) bypass_obj(obj);
            place_object(obj, mon->mx, mon->my);
            stackobj(obj);
        }
        return;
    }
```

Parent: apply.js stolen-only clones; newcham/were/`mattackm` comments. The diff **does** export C-home `possibly_unwield` / `setmnotwielded` / `mwepgone` / `MON_NOWEP`, export `mwelded`/`bypass_obj`, delete the three apply clones, and wire newcham (after SHOW_MSG, `polyspot`), `new_were`/`were_change`, `mattackm`, `use_whip`. It **does not** wire `uhitm.c` steal. Named. It **does not** port `mon_break_armor` / setworn `oc_oprop`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `possibly_unwield` | LIVE export | C `:746–795`; drop arm async |
| `possibly_unwield_drop` | LIVE local | C !AT_WEAP block |
| `setmnotwielded` | LIVE export | C `:1813–1828`; may return pline Promise |
| `mwepgone` | LIVE repaired | C `:937–946` |
| `MON_NOWEP` | LIVE | `monst.h` |
| `mwelded` | LIVE new export | C `wield.c`; `will_weld` verified |
| `bypass_obj` | LIVE new export | C `worn.c:1118–1123` |
| `attacktype_fordmg(..., -1)` | LIVE import | ≡ C `attacktype` / `AD_ANY` |
| `flooreffects` | LIVE import async | awaited on drop |
| `mbodypart` | LIVE import | polyself.c C-home; not the banned wield.js edge |
| apply `*_apply` clones | gone | `sym` NOT FOUND — do **not** write #2 |
| steal_it / mhitm_ad_sitm | OMIT named | `uhitm.c:2255`/`:4726` |
| m_throw `setmnotwielded` | OMIT named | C `:604–607` |
| `mon_break_armor` | OMIT named | |
| zap `bypass_obj` / monmove `mwelded` | leftover CLONE | do **not** add #2 |

`node scripts/sym.mjs` (deletes / re-points required):

```
possibly_unwield js/weapon.js:128   sync
setmnotwielded   js/weapon.js:92   sync
mwepgone         js/weapon.js:111   sync
mwelded          js/wield.js:171   sync  (+ monmove.js clone)
bypass_obj       js/worn.js:359   sync  (+ zap.js clone)
attacktype_fordmg js/uhitm.js:420   sync
mbodypart        js/polyself.js:278   sync
flooreffects     js/do.js:668   ASYNC — await required
possibly_unwield_apply / setmnotwielded_apply / mwelded_apply NOT FOUND
```

`--can weapon.js uhitm.js attacktype_fordmg`: NEW-CYCLE vs `uhitm.js`→`weapon.js`; **function-hoisted — VERDICT SAFE** (read inside `possibly_unwield`). `--can weapon.js polyself.js mbodypart`: function-body only (setmnotwielded shine). `--can weapon.js do.js flooreffects`: awaited in drop. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Stolen/destroyed (`:757–760`).** minvent walk misses `mw_tmp` → `MON_NOWEP` + `NEED_WEAPON` + return (sync). Whip extracts **before** the helper, so this is the C path. **Match.**

**!AT_WEAP drop (`:761–777`).** C `attacktype(data, AT_WEAP)`. JS `attacktype_fordmg(data, 254, -1)` — `AT_WEAP` 254, `AD_ANY` -1. **Match the predicate.** Then `setmnotwielded`, `NO_WEAPON_WANTED`, `distant_name` **before** `extract_self`, `newsym`, `flooreffects("drop")`, else `bypass_obj` if polyspot then `place_object`+`stackobj`. JS awaits pline/`flooreffects`. **Match branch order.** No `rn2` in this function.

**Still AT_WEAP (`:792–794`).** `NEED_WEAPON` unless `mwelded` && `NO_WEAPON_WANTED`. C `mwelded` is `W_WEP && will_weld`; `will_weld` is cursed && (weapon/weptool/ball/chain/tin-opener). JS `wield.js` `will_weld` matches `wield.c:63–69`. **Match.** Apply’s old cursed+skill clone is gone.

**`setmnotwielded` (`:1813–1828`).** `artifact_light` && `lamplit` → `end_burn(FALSE)` then canseemon shine pline (`The(xname)` / `s_suffix(mon_nam)` / `mbodypart(HAND)` / `otense("stop")`), then `MON_NOWEP` if still mw, `owornmask &= ~W_WEP`. JS the same strings. Promise only for that pline so newcham can stay boolean on the stolen/AT_WEAP arms. **Match C when awaited.** `trap.js` `mwepgone` (C `:3931`) does not await the shine — rare Sunsword; named with extract-inline `mwepgone`.

**Callers.** `mon.c:5484` after vampire cham / SHOW_MSG: JS `newcham_after_unleash` `after_msg`. `were.c:130` after `newsym`: JS `new_were` returns the helper (`mon_break_armor` still named; C order there is armor then unwield). `mhitm.c:411` after `mon_wield_item`: JS `await` before `MON_WEP`/`hitval`. `apply.c:3176–3177` after extract: JS await helper then `setmnotwielded`. `mon.js` `await were_change`; potion `await new_were`. **Match those four.** uhitm steal stays named.

**Callee closure (`possibly_unwield`).** LIVE: `MON_WEP`/`MON_NOWEP`, `attacktype_fordmg`≡`attacktype`, `setmnotwielded`, `mwelded`, `pline_mon`, `distant_name`/`doname`, `obj_extract_self`, `flooreffects`, `bypass_obj`, `place_object`, `stackobj`, `end_burn`/`artifact_light`/`mbodypart`. OMIT named: steal_it; m_throw; `mon_break_armor`; `mselftouch`. STUB: **none**. Apply clones deleted. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “poly/were/whip/mattackm drop or recheck”: **true** for those four. D-log `setmnotwielded` `end_burn`: **true**. Do **not** stamp “Match C steal_it / AD_SITM.” Do **not** stamp “Match C `mon_break_armor`.” Do **not** stamp “Match C setworn `oc_oprop`.” Do **not** stamp “Match C every `mwepgone` await.” Journal “fortress held” is not a poly-drop screen proof. Public poly-into-weaponless **thin**; canary was node 13/13. Admit public-unhit.

## Density

§2b: C `possibly_unwield` + `setmnotwielded`/`mwepgone`/`mwelded`/`bypass_obj` + the four live callers. +157. Did not glue setworn `oc_oprop`. Did **not** reopen D-1743 `dealloc_obj`.

## Verification

D-log: save-oracle skip (untagged `weapon.c:possibly_unwield`); node 13/13 (no-mw, stolen, AT_WEAP sync, mwelded keep, !AT_WEAP Promise+bypass, mwepgone, bypass_obj); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Weaponless-poly drop **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the helper and the four wired callers match C; steal/`mon_break_armor` are named). Named: `uhitm.c` steal_it / mhitm_ad_sitm; m_throw `setmnotwielded`; `mon_break_armor`; extract_from_minvent mwepgone inline; `trap.js` `mwepgone` shine-await; zap `bypass_obj` clone; monmove `mwelded` clone; setworn `oc_oprop`. Do **not** restore `possibly_unwield_apply`. Do **not** add `mwelded` #3 / `bypass_obj` #3. Do **not** import `wield.js`→`polyself.js` for `body_part`. Do **not** skip `distant_name` after extract. Do **not** re-port D-1743.

Verdict: **ACCEPT-WITH-DEBT**
