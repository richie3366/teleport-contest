# Review 636 — 9613be3b — iactions.c remaining pushkeys unwield/name/eat/engrave (D-1675)

## Metadata
- Full / short hash: `9613be3bf5dd29931cf57a1d9b392ef20c006c7b` / `9613be3b`
- Parent: `5b987c38` (audit #2080 of D-1666–D-1674). This file audits **this SHA only** (first of nine `js/` commits since review **635**). Archive **Addressed:** D-1675 `9613be3b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 19:08:56 +0200
- D-id: **D-1675**
- Stats: `js/iactions.js` +69/−9; `js/do_wear.js` +38/−2; `js/engrave.js` +33/−11; `js/do_name.js` +5/−1; `js/eat.js` +4/−4. Total `js/` insertions **149** <250. Band **150–350**.
- Claims to close: Open remaining `itemactions_pushkeys` unwield/name/eat/engrave after D-1665. Not IA_BUY_OBJ. Not IA_TWOWEAPON. Not doengrave non-hands stylus body. Not live `'i'` getobj (that is D-1681). `reviews/loop-2026-08-15/` has no unpaid unwield Must-fix.
- JS / map: `iactions.js` four pushkeys + eat `is_edible` row; `do_wear.js` `remarm_swapwep`; `eat.js` `iflags.menu_requested`; `engrave.js` `stylus_ok` / canned `getobj_stylus`; `do_name.js` canned `getobj_name`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **626** named remaining pushkeys (unwield/name/eat/engrave/buy/…). Not **626** Actionable #1 (ECMD_TIME is D-1667).

## Intent vs deliverable

Git subject promises: unwield/name/eat/engrave queue canned follow-ups including `#altunwield` `remarm_swapwep`, instead of default-breaking those acts after D-1665.

Pinned C `itemactions_pushkeys` `:139–274` (`node scripts/csym.mjs itemactions_pushkeys`). `--callers`: prototype `:11`; `:707`. Unwield `:148–156`; name `:167–171`; eat `:177–182`; engrave `:184–187`. Menu eat `:417–427`. `remarm_swapwep` `do_wear.c:3060–3087` (`node scripts/csym.mjs remarm_swapwep`; function-pointer sites `iactions.c:150`, `cmd.c:2065` `"altunwield"` INTERNALCMD, `extern.h:781`). `stylus_ok` `:480–499`. `is_edible` `:90–121` (`--callers` includes `iactions.c:425`). `floorfood` `:3596` `iflags.menu_requested`. `do_takeoff` `:2823–2896` caller `:3085`. `HANDS_SYM` `hack.h:577` `'-'`.

```148:156:nethack-c/upstream/src/iactions.c
    case IA_UNWIELD:
        cmdq_add_ec(CQ_CANNED, (otmp == uwep) ? dowield
                    : (otmp == uswapwep) ? remarm_swapwep
                      : (otmp == uquiver) ? dowieldquiver
                        : donull); /* can't happen */
        cmdq_add_key(CQ_CANNED, HANDS_SYM);
        break;
```

```3069:3086:nethack-c/upstream/src/do_wear.c
    if (cq.typ != CMDQ_KEY || cq.key != '-' || !uswapwep)
        return ECMD_FAIL;
    oldbknown = uswapwep->bknown;
    reset_remarm();
    svc.context.takeoff.what = svc.context.takeoff.mask = W_SWAPWEP;
    (void) do_takeoff();
    return (!uswapwep || uswapwep->bknown != oldbknown) ? ECMD_TIME : ECMD_OK;
```

Old JS: those four acts fell to silent `default`; no `remarm_swapwep`; eat menu tin-only; `floorfood_eat` read `flags.menu_requested`; name/stylus clones ignored canned KEY. The diff **does** the four queues (uswapwep via `cmdq_add_ec_entry('altunwield', remarm_swapwep)`), ports `remarm_swapwep`, exports `is_edible` for the else-tin row, `stylus_ok`, canned `getobj_from_cmdq` on name/stylus, and `iflags` skipfloor. It **does not** port doengrave non-hands sfx, live `'i'` getobj, buy/rub/swap/two-weapon/whatis. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `IA_UNWIELD` pushkeys | C `:148–156`, **LIVE this SHA** | uwep/`dowield`, uswapwep/`remarm_swapwep`, quiver/`dowieldquiver`, else `donull`, then `HANDS_SYM` |
| `IA_NAME_OBJ` / `IA_NAME_OTYP` | C `:167–171`, **LIVE this SHA** | `docallcmd` + `'i'`/`'o'` + invlet |
| `IA_EAT_OBJ` | C `:177–182`, **LIVE this SHA** | `do_reqmenu` PREFIXCMD + `doeat` + invlet |
| `IA_ENGRAVE_OBJ` | C `:184–187`, **LIVE this SHA** | `doengrave` + invlet |
| `remarm_swapwep` | C `:3060–3087`, **LIVE this SHA** | export `do_wear.js`; `#altunwield` INTERNALCMD |
| `do_takeoff` W_SWAPWEP | C `:2839–2843`, **LIVE** (not rewritten) | `setuswapwep(null)`; cursed secondary still comes off |
| `reset_remarm` / `takeoff_info` | C `:3013–3018`, **LIVE** | same `game.context.takeoff` object |
| `is_edible` | C `:90–121`, **LIVE this SHA** (export) | already a C-shaped local; now the menu callee |
| itemactions eat row | C `:417–427`, **LIVE this SHA** | tin first, else `is_edible` |
| `stylus_ok` | C `:480–499`, **CLONE** (local `engrave.js`) | one clone; do not write #2 |
| `getobj_stylus` canned | C `getobj` `:977`, **CLONE** + **OMIT** non-hands | canned KEY live; non-hands `Never_mind` named |
| `getobj_name` canned | C `getobj("name")`, **CLONE** at this SHA | canned KEY live; interactive clone named (deleted D-1681) |
| `getobj_from_cmdq` | **LIVE** | invent.js; not a new clone |
| `cmdq_add_ec_entry` | **CLONE** (iactions local, pre-existing) | altdip/altunwield INTERNALCMD; do not write #6 |
| `floorfood` skipfloor | C `:3596`, **LIVE this SHA** | `iflags.menu_requested` |
| remaining pushkeys buy/rub/swap/X/whatis | C `:188+`, **OMIT named** | |
| `doengrave` non-hands body | C `:983+` / `doengrave_sfx_item`, **OMIT named** | |

`node scripts/csym.mjs itemactions_pushkeys` → `:139-274`. `--callers`: `:11` / `:707`. `remarm_swapwep` → `:3060-3087`. `stylus_ok` → `:480-499`. `is_edible` → `:90-121`. `--callers is_edible`: `:2864` / `:3515` / `:3525` / `:3679` / `iactions.c:425` / `extern.h:945`. `do_takeoff` → `:2823-2896`. `reset_remarm` → `:3013-3018`. `floorfood` skip `:3596`.

RNG: none in these four pushkeys / `remarm_swapwep` / `stylus_ok` / `is_edible`. `doengrave` occupation still has `rn2` in the hands path (pre-existing). No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names (HEAD after later D-1681 deleted `getobj_name`):

```
remarm_swapwep   js/do_wear.js:1467   ASYNC — await required
is_edible        js/eat.js:824   sync
stylus_ok        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/engrave.js:546
             => Do NOT write clone #2.
getobj_stylus    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/engrave.js:575
             => Do NOT write clone #2.
getobj_name      NOT FOUND in js/** (deleted D-1681; at this SHA it was
             a local clone in do_name.js that gained getobj_from_cmdq)
getobj_from_cmdq js/invent.js:5977   sync
cmdq_add_ec_entry NOT EXPORTED — 1 LOCAL js/iactions.js:49
             => Do NOT write clone #6.
name_ok          js/do_name.js:107   sync
do_takeoff       NOT EXPORTED — 1 LOCAL js/do_wear.js:1392
reset_remarm     js/do_wear.js:1379   sync
takeoff_info     NOT EXPORTED — 1 LOCAL js/do_wear.js:1365
```

`--can engrave.js invent.js getobj_from_cmdq`: **ALREADY**. `--can do_name.js invent.js getobj_from_cmdq`: **ALREADY**. `--can do_wear.js cmd.js cmdq_pop`: **ALREADY**. `iactions.js` reaches `remarm_swapwep` / `is_edible` via dynamic `import()`, not a new static edge. A cycle alone is not a blocker; no top-level TDZ read of those names. Do **not** stamp “cycle-forced clone.” Do **not** add `stylus_ok` #2 or `cmdq_add_ec` #6. Do **not** revive `getobj_name`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Unwield queue.** C ternary `uwep` / `uswapwep` / `uquiver` / `donull` then `HANDS_SYM`. JS the same. uswapwep uses `cmdq_add_ec_entry('altunwield', remarm_swapwep)` because C `cmdq_add_ec` stores the INTERNALCMD function pointer (`cmd.c:2065`, flags `0x0040`). `run_cmdq_extcmd` looks up `ext_func_tab_from_txt('altunwield')` then `can_do_extcmd` (does **not** reject INTERNALCMD; `#` menu does). **Match `:148–156`.**

**`remarm_swapwep`.** C: pop; missing queue → `CMDQ_KEY` + `'\0'`; fail unless KEY `'-'` and `uswapwep`; save `bknown`; `reset_remarm`; `what = mask = W_SWAPWEP`; `do_takeoff`; TIME if gone or `bknown` flipped. JS: no queue → `isKey` false → FAIL (same as `'\0'`). `HANDS_SYM === '-'`. `takeoff_info()` is `game.context.takeoff` (same object `do_takeoff` reads). `do_takeoff` W_SWAPWEP is `setuswapwep(null)` without `cursed()` — C `:2839–2843` the same; the TIME/`bknown` comment is C’s. **Match `:3060–3087` call-for-call.** No RNG.

**Name queue.** C `docallcmd` + `'i'`/`'o'` + invlet. JS same. At this SHA the `'i'` getobj callee is still the `getobj_name` clone; canned KEY now goes through `getobj_from_cmdq(name_ok,…)`. Interactive clone named (Open, shipped D-1681). **Match the cmdq.** Do **not** stamp Match C live `getobj("name")` at this SHA.

**Eat queue + skipfloor.** C `do_reqmenu` then `doeat` then invlet; `floorfood` `:3596` tests `iflags.menu_requested`. JS `cmdq_add_ec_entry('reqmenu', do_reqmenu, tab?.flags|0)` — `reqmenu` flags **512** = `PREFIXCMD`; rhack continues to `doeat`. `floorfood_eat` now reads `game.iflags?.menu_requested` (was `flags`, which `do_reqmenu` never sets). Feeding `usteed` skip matches C `(feeding && u.usteed)` because this helper is eat. **Match `:177–182` and `:3596`.** `floorfood_tin` / sacrifice still `flags` — not this SHA’s eat arm.

**Eat menu.** C tin string then `else if (is_edible)`. JS tin then `else { is_edible }`. String `Eat one of these` / `Eat this` matches `:425–427`. `is_edible`: unique false; fire-elem flammable; metallivore metallic (rust → rustprone); ghoul corpse/egg; gel organic `!Has_contents`; else `FOOD_CLASS`. JS `hero_form_data()` ≡ `youmonst.data` for fire/metal; `u.umonnum` for ghoul/gel. Extra `if (!obj) return false` is JS-only. **Match `:90–121` and `:417–427`.** TIN stays the Open-tin row (FOOD_CLASS would also be edible).

**Engrave queue.** C `doengrave` + invlet. JS same. `stylus_ok` is C `:480–499` (null SUGGEST; weapon/wand/gem/ring SUGGEST; towel/marker SUGGEST; else DOWNPLAY). Canned KEY: `getobj_from_cmdq` returns the object. Hands → `HANDS_OBJ` into the existing DUST occupation. Non-hands → `pline(Never_mind)` return null. C `:977–987` would keep the stylus and run freehand/jello/floor/altar/grave/`doengrave_sfx_item`. That abort is the **named** non-hands omit, not a silent default. C `Never_mind` at `:1123` is add-to-engraving `'q'`, not getobj success. Do **not** stamp Match C `doengrave` wand/weapon/marker body.

Callee closure (four pushkeys). LIVE: `dowield` / `dowieldquiver` / `donull` / `docallcmd` / `do_reqmenu` / `doeat` / `doengrave` queue, `remarm_swapwep`, `is_edible`, `stylus_ok`, `getobj_from_cmdq`, `do_takeoff` W_SWAPWEP, `iflags` skipfloor. CLONE: `getobj_name` (this SHA), `getobj_stylus`, `cmdq_add_ec_entry`. OMIT named: non-hands stylus body; `'i'` live getobj; buy/rub/swap/X/whatis. STUB: **none** in the live queue / `remarm_swapwep` / eat-menu arms. Combined-arm: every C callee of `:148–187` is LIVE, OMIT, or a verified CLONE. “Dispatch ported, callee stubbed” for `#altunwield` / eat skipfloor / name canned KEY is **false**. For `doengrave` the subject claims the **queue**, and the map names the body.

## Hallucinations / overclaim

Subject “queue … including `#altunwield` `remarm_swapwep`”: **true**. D-log “`iflags` skipfloor”: **true** (`do_reqmenu` writes `iflags`). D-log “canned KEY on name/stylus”: **true** for getobj consumption (leftover invlet is no longer the next rhack key). Do **not** stamp “Match C `doengrave` non-hands sfx.” Do **not** stamp “Match C live `getobj("name")`” (clone until D-1681). Do **not** stamp “Match C IA_BUY_OBJ / IA_TWOWEAPON.” Do **not** stamp “`#` menu lists altunwield” (INTERNALCMD). Private canary FAIL/TIME + ration edible does not prove a public itemactions `-`/`e`/`E`/`c` path. Fortress 44/44 is public-unhit for those menus.

## Density

+149: four pushkeys + `#altunwield` body + eat menu + skipfloor + `stylus_ok` + two canned getobj hooks. §2b one itemactions family. Did not glue buy/two-weapon/stylus sfx. Above a one-`if` peel.

## Verification

Wired: four cmdq arms; `remarm_swapwep` KEY/`bknown`/W_SWAPWEP; `is_edible` row; eat `iflags`; canned name/stylus KEY. Unwired C: non-hands `doengrave`; live `'i'` getobj (later D-1681); remaining pushkeys. Conf: no extra `rn2` in these arms. No seed gate.

Journal: private canary (`remarm_swapwep` FAIL/TIME, ration edible, canned name KEY); green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44. Public sessions do not hit itemactions `-`/`e`/`E`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `doengrave` non-hands stylus / `doengrave_sfx_item`; remaining pushkeys rub/swap/whatis (buy/X shipped later); `'i'` live getobj (D-1681). Do **not** restore `getobj_name`. Do **not** add `stylus_ok` #2. Do **not** add `cmdq_add_ec` #6. Do **not** add `is_edible` clone. Do **not** re-port `do_takeoff`. Do **not** re-port offer/tip/invoke (D-1665). Do **not** switch `floorfood_eat` back to `flags.menu_requested`.

Verdict: **ACCEPT-WITH-DEBT**
