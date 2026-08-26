# Review 475 — 9a50ef27 — artifact.c SPFX_WARN conferral + MATCH_WARN (D-1514)

## Metadata
- Full / short hash: `9a50ef2775418473f5ea6b659e1dbfce813ce4a1` / `9a50ef27`
- Parent: `2f5f7fd1` (D-1513). This file audits **this SHA only** (second of nine `js/` commits since review **473**). Archive **Addressed:** D-1514 `9a50ef27`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 01:59:19 +0200
- D-id: **D-1514**
- Stats: 12 files, +224 / −91 — `js/artifact.js` +67 / −31, `js/display.js` +50 / −24 (js/ insertions 117). Band 150–350.
- Claims to close: Open `artifact.c` SPFX_WARN conferral / MATCH_WARN (named from D-1493 / review **454**). Not Sting_effects. `reviews/loop-2026-08-15/` has no unpaid Sting-glow Must-fix.
- JS / map: `artifact.js` `spec_m2` / `set_artifact_intrinsic`; `display.js` `MATCH_WARN_OF_MON`. `c-js-map/data.md` + `turns.md`.
- Prior reviews this SHA claims to close: **454** named the `warntype.obj` writer and MATCH_WARN overlay after the D-1493 count.

## Intent vs deliverable

Git subject promises: wielding Sting writes `EWarn_of_mon` and `warntype.obj`, and MATCH_WARN shows those monsters instead of leaving Sting glow at zero.

Pinned C `artifact.c` `set_artifact_intrinsic` `:770` then `:824–839`: `spfx = (wp_mask != W_ART) ? oart->spfx : oart->cspfx`. If `spfx & SPFX_WARN`: `if (spec_m2(otmp))` then on → `EWarn_of_mon |= wp_mask` and `warntype.obj |= spec_m2(otmp)`; off → `&= ~`; then `see_monsters()`; else `EWarning |=` / `&= ~` (no `see_monsters`). `spec_m2` `:1065–1072` returns `artifact->mtype` or `0L`. `hack.h` `MATCH_WARN_OF_MON` `:1135–1140`: `Warn_of_mon` and (`warntype.obj|polyd` & `mflags2`, or `species == mon->data`). Callers: `wield.c`/`worn.c` `setuwep`/`setworn` W_WEP; `invent.c` `:991` / `:1383` W_ART carry; `display.h` `_sensemon` `:55–58`; `display.c` `newsym` see_it `:1013–1015` `:1047` and `display_warning` `:634–650`.

artilist.h: Grimtooth `SPFX_WARN|SPFX_DFLAG2` `M2_ELF`; Orcrist/Sting `SPFX_WARN|SPFX_DFLAG2` `M2_ORC`. MKoT / Orb of Fate carry WARN on **cspfx** with mtype 0 (EWarning, not EWarn_of_mon). Dragonbane is DCLAS `S_DRAGON` **without** SPFX_WARN.

Old JS: HALRES + REFLECT W_WEP only (D-1342); `see_monsters` counted `warntype.obj` but nothing wrote it (review **454**).

The diff **does** export `SPFX_WARN` `0x20`, export `spec_m2`, confer the spec_m2 / else-EWarning split, OR MATCH_WARN into `sensemon` and both `newsym` see_it arms, and add the `display_warning` mon_to_glyph else-if. It **does not** extract cspfx or call `set_artifact_intrinsic(..., W_ART)` from invent. Named. It **does not** port `see_wsegs`, worm_tail skip, Detect_monsters cansee, or polyself `warntype.polyd`/`species` producers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `SPFX_WARN` | C `artifact.h:20` `0x20`, **LIVE this SHA** | Sting extract `8388640` includes the bit |
| `spec_m2` | C `:1065–1072`, **LIVE this SHA** | m2/num only; DCLAS string → 0 |
| `set_artifact_intrinsic` SPFX_WARN | C `:824–839`, **LIVE this SHA** | W_WEP via `setuwep` |
| `set_spfx_extrinsic` | JS factor of `E* \|= mask`, **not a C name** | HALRES/REFLECT/WARN share it |
| `warntype_info` | C `context.warntype`, **CLONE this SHA** | obj/polyd/species fields |
| `see_monsters` | C `display.c:1488`, **LIVE** | D-1493 count; not a stub |
| `MATCH_WARN_OF_MON` | C `hack.h:1135`, **LIVE this SHA** | |
| `sensemon` / `newsym` see_it | C `_sensemon` / `:1013` `:1047`, **LIVE this SHA** | |
| `display_warning` MATCH_WARN arm | C `:644–645`, **LIVE this SHA** | `mon_glyph` ≈ `mon_to_glyph` |
| `Sting_effects` | C `:2466`, **LIVE** | D-1493; unreached until writer |
| cspfx W_ART (MKoT/Orb) | C `:770` + invent `:991`, **OMIT named** | JS `spfx=0` when `wp_mask===W_ART` |
| invent W_ART conferral | C invent.c, **OMIT named** | no JS caller with `W_ART` |
| `see_wsegs` / worm_tail / Detect_monsters cansee | C, **OMIT named** | |
| polyd/species producer | C polyself, **OMIT named** | readers exist; stay 0 |

`node scripts/sym.mjs spec_m2 MATCH_WARN_OF_MON set_artifact_intrinsic see_monsters Warn_of_mon Sting_effects SPFX_WARN set_spfx_extrinsic warntype_info display_warning sensemon newsym mon_glyph EWarn_of_mon EWarning`:

```
spec_m2          js/artifact.js:346   sync
MATCH_WARN_OF_MON js/display.js:327   sync
set_artifact_intrinsic js/artifact.js:570   sync
see_monsters     js/display.js:2899   sync
Warn_of_mon      js/display.js:307   sync
Sting_effects    js/artifact.js:502   ASYNC — await required
SPFX_WARN        js/artifact.js:104   sync   export const
set_spfx_extrinsic NOT EXPORTED — 1 LOCAL js/artifact.js:529
warntype_info    NOT EXPORTED — 1 LOCAL js/artifact.js:547
display_warning  NOT EXPORTED — 1 LOCAL js/display.js:408
sensemon         js/display.js:368   sync
newsym           js/display.js:2611   sync
mon_glyph        js/display.js:579   sync
EWarn_of_mon     NOT EXPORTED — 1 LOCAL js/objnam.js:1681
EWarning         NOT FOUND in js/** (no export, no local function/const).
```

`EWarn_of_mon` in `objnam.js` is a **reader** for doname glow, not a second conferral. `EWarning` is a **flat field** (`u.EWarning`) written by `set_spfx_extrinsic(..., 'EWarning', ...)`, not a function. `see_monsters` import is display→artifact late-bind still via `set_sting_effects`; display does not import artifact. No cycle.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in conferral (`spec_m2` is a table read). `mon_glyph` still burns `rn2_on_display_rng` under Hallu (pre-existing; C `mon_to_glyph(..., rn2_on_display_rng)`). Public fortress: **public-unhit** until a session wields Sting/Orcrist/Grimtooth.

## C ↔ JS fidelity

Conferral. C `:824–839` nested `spec_m2` then else EWarning. JS caches `m2 = spec_m2(otmp)` once (C calls it twice; no RNG). Sting/Orcrist extract `mtypeKind:'m2'` `mtypeVal:128` (`M2_ORC`); Grimtooth `16` (`M2_ELF`); Excalibur `0`. **Match those rows.** `typeof mt === 'number'` drops DCLAS strings; no SPFX_WARN art is DCLAS. **Match live artilist.** On: `EWarn_of_mon` + `uprops[WARN_OF_MON].extrinsic` OR mask, `warntype.obj |= m2`, `see_monsters()`. Off: AND-NOT. Else: `EWarning` + `uprops[WARNING]`. Else does **not** call `see_monsters`. **Match.** `wp_mask !== W_ART ? spfx : 0` is the named cspfx omit (C `:770` uses `oart->cspfx`). W_WEP caller `setuwep` is LIVE. C `worn.c` `:93` / `:120` **skips** SWAPWEP/QUIVER conferral; JS `setuswapwep` also does not call this. **Match that skip.** C invent W_ART is the named carry omit.

MATCH_WARN. C three-term OR after `Warn_of_mon`. JS the same, plus `!mon` / `!wt` early false (C zeros/`NULL` also false). **Match `:1135–1140`.** `_sensemon` last term; JS `tp_sensemon || MATCH_WARN` after Detect_monsters. **Match `:55–58` minus named Underwater pool.** `newsym` cansee see_it: C `mon_visible || (!worm_tail && (tp_sensemon || MATCH_WARN))`. JS ORs MATCH_WARN without worm_tail. **Named omit.** `!cansee` see_it: C `:1047` includes MATCH_WARN. **Match.** `display_warning`: C `mon_warning` float else MATCH_WARN `mon_to_glyph`. JS the same; `mon_glyph` Hallu display-rng. **Match `:639–645`.** newsym only calls `display_warning` when `mon_warning` (C `:1030`); MATCH_WARN overlay on the live path is the see_it `mon_glyph` arm, not that else-if. **Match C order.**

Callee closure (W_WEP SPFX_WARN arm). LIVE: `spec_m2`, `see_monsters`, `MATCH_WARN_OF_MON`, `sensemon`, `newsym`, `mon_glyph`, `Warn_of_mon`, `Sting_effects`. CLONE: `warntype_info`; `set_spfx_extrinsic` (E* mask). OMIT named: cspfx W_ART, invent conferral, worm_tail, `see_wsegs`, polyd/species producer. STUB: none in the W_WEP arm. **Arm may ship.** Not “dispatch ported, callee stubbed.” D-1493 `Sting_effects` is LIVE and now reachable.

## Hallucinations / overclaim

Subject Sting writes `EWarn_of_mon` + `warntype.obj` and MATCH_WARN shows orcs: **true** after `setuwep(Sting)`. Subject “instead of leaving Sting glow at zero”: **true of the writer**; glow messages still need orcs on the level and `see_monsters` count change (D-1493). D-log canary 44/44: **true of unit bits**, **not** a public Sting session. Stamping **Addressed:** D-1514 for **`:824–839` + MATCH_WARN see_it** is fair. Do **not** stamp “Match C invent W_ART / cspfx MKoT Warning.” Do **not** stamp “Match C `see_wsegs`.” Do **not** treat fortress PASS as a Sting glow (public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

One conferral bit plus the display macro that consumes it (review **454** leftover). +117 JS. Playbook §2b. Did not glue S_KOP. Acceptable.

## Branch-by-branch confirm

1. Wield Sting/Orcrist: `spec_m2` M2_ORC, `EWarn_of_mon|W_WEP`, `warntype.obj|=M2_ORC`, `see_monsters`. **Match `:825–833`.**
2. Wield Grimtooth: M2_ELF. **Match artilist.**
3. Unwield: AND-NOT both bits, `see_monsters`. **Match `:829–833`.**
4. Wield Excalibur: `spec_m2==0`; SPFX_WARN not set on that row so this `if` is skipped. **Match.**
5. `spfx & SPFX_WARN` and `spec_m2==0`: `EWarning` only, no `see_monsters`. **Match `:834–838`.** Live artilist has no such wielded row; MKoT/Orb are cspfx (named).
6. MATCH_WARN orc vs elf vs jackal. **Match macro.** polyd/species stay 0 until producer. Named.
7. `sensemon` / cansee see_it / !cansee see_it OR MATCH_WARN. **Match** minus named worm_tail / Underwater / Detect_monsters cansee.
8. `display_warning` MATCH_WARN `mon_glyph`. **Match `:644–645`.**
9. HALRES / REFLECT W_WEP still via the helper. **Match D-1342; not rewritten confer_oc_oprop.**
10. **Public-unhit** until a session wields those daggers/swords.

## Callers / RNG ledger

C: `setuwep` → `setworn` W_WEP → conferral → `see_monsters` → count → `Sting_effects`. JS the same. invent W_ART not wired. No new `rn2` in conferral. Hallu `mon_glyph` display-rng unchanged.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. No seed-shaped Sting glow.

## Verification

D-log: private canary **44**/44 (spec_m2 Sting/Orcrist/Grimtooth/Excalibur; on/off bits; MATCH_WARN orc vs elf vs jackal; sensemon vs tp_sensemon; count 2 orcs skip !mx; polyd/species arms; Warn_of_mon gate; Longbow REFLECT D-1342; C grep; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until a session wields Sting/Orcrist/Grimtooth. Cohort is shared-startup, not a Sting glow. Honest.

## Actionable C-wrongs

None that contradict C at the claimed locus. Remaining **named** (map / Open, not Must-fix): cspfx W_ART (MKoT/Orb of Fate `EWarning`); invent `set_artifact_intrinsic(..., W_ART)`; worm_tail skip / `see_wsegs` / `MON_STILL_ARRIVING`; Detect_monsters cansee; polyself `warntype.polyd`/`species` producer; Underwater pool `sensemon` gate; `howmonsseen`. Do not Must-fix “should confer SWAPWEP” (C `worn.c` `:93` skips that mask). Do not Must-fix “`display_warning` MATCH_WARN is dead from newsym” (C structure; live overlay is see_it).

Verdict: **ACCEPT-WITH-DEBT**
