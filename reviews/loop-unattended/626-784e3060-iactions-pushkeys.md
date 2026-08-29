# Review 626 — 784e3060 — iactions.c remaining pushkeys offer/tip/invoke (D-1665)

## Metadata
- Full / short hash: `784e3060d434850598af162ea10f84e3fd39b223` / `784e3060`
- Parent: `88a989f0` (D-1664). This file audits **this SHA only** (ninth of nine `js/` commits since review **617**). Archive **Addressed:** D-1665 `784e3060`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 16:25:00 +0200
- D-id: **D-1665**
- Stats: `js/eat.js` +72/−9, `js/iactions.js` +52/−13, `js/pickup.js` +45/−17, `js/pray.js` +22/−7, `js/artifact.js` +4/−41. `js/` **195** insertions. Band **150–350**.
- Claims to close: Open remaining `itemactions_pushkeys` offer/tip/invoke after D-1641. Not `offer_corpse`. Not remaining unwield/name/eat/….
- JS / map: `iactions.js` pushkeys + O-row; `eat.js` `offer_ok` / `floorfood_sacrifice`; `pray.js` `dosacrifice`; `artifact.js` `doinvoke`; `pickup.js` `tip_ok` / `dotip`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **602** named remaining pushkeys. `reviews/loop-2026-08-15/` has no unpaid offer/tip/invoke Must-fix.

## Intent vs deliverable

Git subject promises: offer/tip/invoke queue `dosacrifice` / `do_reqmenu`+`dotip` / `doinvoke` plus invlet, instead of default-breaking those acts after D-1641.

Pinned C `itemactions_pushkeys` `:139–274` (`node scripts/csym.mjs itemactions_pushkeys`). `--callers`: prototype `:11`; `:707`. Offer `:198–201`; tip `:233–243`; invoke `:245–248`. Menu O `:472–483`; T `:592–595`; V `:597–604`. `offer_ok` `eat.c:3538–3557`. `floorfood` `:3578–3731` (sacrifice getobj `:3706–3711`). `dosacrifice` `pray.c:1853–1896`. `doinvoke` `artifact.c:1748–1759`. `tip_ok` `pickup.c:3480–3497`. `dotip` `:3561–3677`. `container_at` `:2023–2038`.

```198:201:nethack-c/upstream/src/iactions.c
    case IA_SACRIFICE:
        cmdq_add_ec(CQ_CANNED, dosacrifice);
        cmdq_add_key(CQ_CANNED, otmp->invlet);
        break;
```

```1872:1895:nethack-c/upstream/src/pray.c
    otmp = floorfood("sacrifice", 1);
    if (!otmp)
        return ECMD_OK;
    if (otmp->otyp == AMULET_OF_YENDOR) {
        ...
            return ECMD_TIME;
    ...
    if (otmp->otyp == CORPSE) {
        offer_corpse(otmp, highaltar, altaralign);
        return ECMD_TIME;
    }
    pline1(nothing_happens);
    return ECMD_TIME;
```

Old JS: silent `default` for those acts; `dosacrifice` returned after altar checks; `getobj_invoke` nhgetch clone; `dotip` `pline('Tip what?')`. The diff **does** three pushkeys arms (tip `reqmenu` PREFIXCMD flags), O-row, live `getobj("sacrifice"|"invoke"|"tip")`, `offer_ok` XOR DOWNPLAY, `floorfood` corpsecheck==1, `container_at` + TRADITIONAL boxes>1 gate, `tipcontainer` / potion sealed. It **does not** port `offer_corpse` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet`, `choose_tip_container_menu`, spill/tiphat/statue, remaining pushkeys. Named. After a successful corpse/amulet pick, JS **`return ECMD_OK`** where C **`return ECMD_TIME`**. That is not a named-omit of a body; it is a **wrong ECMD** on the live `dosacrifice` arm.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `IA_SACRIFICE` pushkeys | C `:198–201`, **LIVE this SHA** | `cmdq_add_ec` + invlet |
| `IA_TIP_CONTAINER` | C `:233–243`, **LIVE this SHA** | `do_reqmenu` PREFIXCMD + `dotip` |
| `IA_INVOKE_OBJ` | C `:245–248`, **LIVE this SHA** | |
| itemactions O/T/V rows | C `:472–483` / `:592–604`, **LIVE** | T/V were already present; O added |
| `offer_ok` | C `:3538–3557`, **LIVE this SHA** | local static equivalent |
| `floorfood` corpsecheck==1 | C `:3706–3711`, **LIVE this SHA** | `floorfood_sacrifice` |
| `dosacrifice` floorfood | C `:1869–1895`, **LIVE + STUB** | **ECMD_OK vs TIME** |
| `doinvoke` | C `:1748–1759`, **LIVE this SHA** | clone `getobj_invoke` **deleted** |
| `invoke_ok` | **LIVE** | already local |
| `tip_ok` | C `:3480–3497`, **LIVE this SHA** | |
| `dotip` getobj | C `:3624–3632`, **LIVE this SHA** | |
| `tipcontainer` | **LIVE** | |
| `container_at` | C `:2023–2038`, **LIVE** | local; do not add #2 |
| `getobj` | **LIVE** | canned invlet |
| `do_reqmenu` | **LIVE** | |
| `offer_corpse` / amulet offers | C `:1874–1892`, **STUB** in live `dosacrifice` | early return |
| `choose_tip_container_menu` | C `:3597`, **OMIT named** | empty `boxes>1` |
| spill / tiphat / statue | C `:3638–3674`, **OMIT named** | `nothing_happens` |
| remaining pushkeys | C eat/engrave/buy/…, **OMIT named** | |
| `will_feel_cockatrice` / `safe_qbuf` floor | C floorfood, **OMIT named** | |

`node scripts/csym.mjs itemactions_pushkeys` → `:139-274`. `offer_ok` → `:3538-3557`. `floorfood` → `:3578-3731`. `dosacrifice` → `:1853-1896`. `doinvoke` → `:1748-1759`. `tip_ok` → `:3480-3497`. `dotip` → `:3561-3677`. `container_at` → `:2023-2038`. `--callers itemactions_pushkeys`: `:707`.

RNG: none in these three pushkeys arms / `offer_ok` / `tip_ok` / `doinvoke` getobj. Floor `yn_function` is not `rn2`. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
getobj           js/invent.js:6247   ASYNC — await required
getobj_invoke    NOT FOUND in js/** (deleted this SHA)
             => Do NOT write clone #2.
invoke_ok        NOT EXPORTED — 1 LOCAL js/artifact.js:905
offer_ok         NOT EXPORTED — 1 LOCAL js/eat.js:3332
floorfood        js/eat.js:3390   ASYNC — await required
floorfood_sacrifice NOT EXPORTED — 1 LOCAL js/eat.js:3353
dosacrifice      js/pray.js:1472   ASYNC — await required
doinvoke         js/artifact.js:1562   ASYNC — await required
tip_ok           NOT EXPORTED — 1 LOCAL js/pickup.js:3642
dotip            js/pickup.js:3660   ASYNC — await required
tipcontainer     js/pickup.js:3528   ASYNC — await required
do_reqmenu       js/cmd.js:281   ASYNC — await required
cmdq_add_ec      5 LOCAL CLONES — do NOT add #6
cmdq_add_key     js/invent.js:5901 + iactions local — do NOT add #4
cmdq_add_ec_entry NOT EXPORTED — 1 LOCAL js/iactions.js:46
arti_invoke      js/artifact.js:1494   ASYNC
retouch_object   js/artifact.js:892   sync
Is_astralevel    js/const.js:3032   sync
container_at     NOT EXPORTED — 1 LOCAL js/pickup.js:3287
             => Do NOT write clone #2.
```

`--can artifact.js invent.js getobj`: ALREADY. `--can eat.js invent.js getobj`: ALREADY. `--can pickup.js invent.js getobj`: ALREADY. `--can pray.js eat.js floorfood`: ALREADY. `--can iactions.js pray.js dosacrifice`: **dynamic import**; do not add a static edge. Do **not** stamp cycle-forced clone. Do **not** restore `getobj_invoke`. Do **not** add `cmdq_add_ec` #6. Do **not** add `container_at` export/`#2`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Pushkeys.** C sacrifice: `cmdq_add_ec(CQ_CANNED, dosacrifice)` + invlet. JS same via local `cmdq_add_ec`. Tip: `do_reqmenu` then `dotip` then invlet. JS `cmdq_add_ec_entry('reqmenu', do_reqmenu, tab?.flags|0)` then `dotip` — PREFIXCMD so m-prefix skips floor (`dotip` `:3561` comment). Invoke: `doinvoke` + invlet. **Match those three cases.** Remaining `default: break` vs C `impossible("Unknown item action")` — still named.

**O-row.** C `IS_ALTAR && !uswallow`; corpse vs Yendor/fake strings. JS same (`IS_ALTAR(loc?.typ)`). C FIXME that this does not match #offer DOWNPLAY — JS copies that FIXME. T/V rows already matched C `:592–604`.

**`offer_ok` / floorfood sacrifice.** C null → `getobj_else ? EXCLUDE_NONINVENT : EXCLUDE`; non-FOOD/AMULET EXCLUDE; not corpse/Yendor/fake EXCLUDE_SELECTABLE; `Is_astralevel ^ (oclass==AMULET_CLASS)` DOWNPLAY; else SUGGEST. JS `!!Is_astralevel !== (oclass===AMULET_CLASS)` is boolean XOR for 0/1. **Match.** Skip-floor: C `menu_requested || !can_reach_floor || (feeding && usteed) || pool-lava…`. Offering is not feeding — usteed does **not** skip. JS omits usteed. **Match.** Floor loop: CORPSE only; ynq `n`; `q` null; else `getobj_else++`. JS `doname` template vs C `safe_qbuf` — named. Then `getobj("sacrifice", offer_ok, GETOBJ_NOFLAGS)`; reject non-amulet non-CORPSE. **Match the getobj arm.** Cockatrice feel: named.

**`doinvoke`.** C 12 lines: `getobj("invoke", invoke_ok, GETOBJ_PROMPT)`; null → CANCEL; `!retouch_object` → TIME; `arti_invoke`. JS now that. `getobj_invoke` clone **gone**. **Match.**

**`dotip`.** C `container_at(..., TRUE)`; floor if `boxes>0 && (!menu_requested || (TRADITIONAL && boxes>1))`; `!check_capacity && able_to_loot`; boxes>1 → `choose_tip_container_menu`; else ynq one box → `tipcontainer` TIME. Then `getobj("tip", tip_ok, GETOBJ_PROMPT)`; container/horn → `tipcontainer` TIME; spill TIME; potion `pline_The` sealed OK; tiphat; statue; `nothing_happens` OK. JS: `container_at`; same m-prefix/TRADITIONAL gate; boxes>1 empty (falls through to getobj) — named menu; live getobj; container/horn LIVE; potion sealed; spill/hat/statue → `nothing_happens` OK (C spill is TIME). **`tip_ok`:** COIN EXCLUDE; container SUGGEST; discovered horn SUGGEST; else DOWNPLAY. **Match.**

**`dosacrifice` ECMD.** C after a non-null `floorfood`: Yendor / fake / CORPSE all end in **`return ECMD_TIME`** (or NOTREACHED on real amulet). Only the empty pick is `ECMD_OK`. `nothing_happens` is TIME. JS: those three otyps **`return ECMD_OK`**. Itemactions O then canned invlet then getobj succeeds, then **no turn**. C spends the turn even when the offer body is what you are not porting. **C-wrong.** Hallucination: D-log “floorfood + live getobj” is true; “Match C `dosacrifice`” as a finished command is **false**.

Callee closure (three pushkeys). LIVE: `dosacrifice` queue, `dotip`+`tipcontainer`, `doinvoke`+`getobj`+`arti_invoke`, `offer_ok`, `tip_ok`, `do_reqmenu`. STUB: **`offer_corpse` / amulet offers inside live `dosacrifice`** plus wrong ECMD. OMIT named: remaining pushkeys, `choose_tip_container_menu`, spill. Combined-arm: **one STUB in a live arm** — QUALITY-RISK even though the subject says Match C pushkeys.

## Hallucinations / overclaim

Subject “queue dosacrifice / do_reqmenu+dotip / doinvoke plus invlet”: **true** for the cmdq. D-log “live `getobj("sacrifice"/"invoke"/"tip")`”: **true**. D-log / subject as “#offer works”: **false** — corpse/amulet return `ECMD_OK` with no `offer_*`. Do **not** stamp “Match C `offer_corpse`.” Do **not** stamp “Match C `ECMD_TIME` after sacrifice pick.” Do **not** stamp “Match C `choose_tip_container_menu`.” Do **not** stamp “Match C spill/tiphat.” Do **not** restore `getobj_invoke`. Private canned-invlet canary does not prove a turn was spent. Public-unhit (no itemactions O in sessions).

## Density

+195: three pushkeys + O-row + sacrifice getobj + invoke clone deletion + tip getobj. §2b one itemactions family. Did not glue `offer_corpse`. Above a one-`if` peel.

## Verification

Wired: cmdq + invlet; live getobj on three verbs; tip container/horn. Unwired C: `offer_*` bodies; ECMD_TIME after pick; tip multi-box menu; spill. Conf: no extra `rn2` in these arms. No seed gate. Journal: private canary + green+strict seed8000/0900 + cohort **7**/7. Fortress 44/44 does not hit itemactions O/T/V.

## Actionable C-wrongs

1. `dosacrifice` (`pray.c:1874–1892`): after a successful `floorfood` pick of `CORPSE` / `AMULET_OF_YENDOR` / `FAKE_AMULET_OF_YENDOR`, `return ECMD_TIME`, not `ECMD_OK`. Do not port `offer_corpse` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` in that iter unless that is the Open row.

Named (map, not Must-fix): `offer_corpse` bodies; `choose_tip_container_menu`; spill/tiphat/statue; remaining pushkeys (unwield/name/eat/engrave/buy/rub/swap/two-weapon/whatis); floorfood `safe_qbuf` / cockatrice. Do **not** restore `getobj_invoke`. Do **not** add `cmdq_add_ec` #6. Do **not** add `container_at` #2. Do **not** add `offer_ok` export/`#2`.

Verdict: **QUALITY-RISK**

**Addressed:** D-1667
