# Review 304 — 34de9f33 — artifact.c arti_reflects W_WEP (D-1342)

## Metadata
- Full / short hash: `34de9f3323ec90447a2771add005970424a24fb2` / `34de9f33`
- Parent: `36035cf8` (reviews **300–303** + cadence **#1700**). This file audits **this SHA only**. Archive **Addressed:** D-1342 `34de9f33` already has the short hash (filled by D-1343).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 06:37:21 +0200
- D-id: **D-1342**
- Stats: 14 files, +174 / −47 — `js/artifact.js` +45 / −1; `js/mhitu.js` +13 / −3; `js/mhitm.js` +15 / −4; `js/zap.js` +17 / −6; `js/pray.js` +15 / −4.
- Claims to close: Open `artifact.c` `arti_reflects` W_WEP (named from D-1328 / review **303**). Not `kickstr`. `reviews/loop-2026-08-15/` has no unpaid reflection Must-fix.
- JS / map: `artifact.js` `arti_reflects` / `set_artifact_intrinsic`; `mhitu.js`/`mhitm.js` `mon_reflects`; zap/pray `ureflects` W_WEP; `c-js-map/data.md` + `turns.md`. cspfx extract; zap/pray W_AMUL/W_ARM/dragon; mcastu `ureflects` still named.
- Prior reviews this SHA claims to close: **303** named `arti_reflects` after `shade_miss`; **300** / D-1338 named `arti_reflects(MON_WEP)` in `mon_reflects_mm`.

## Intent vs deliverable

Git subject promises: “Match C artifact.c arti_reflects so a wielded Dragonbane or Longbow of Diana actually reflects, instead of skipping the weapon slot.”

C `arti_reflects` (`artifact.c:537–550`):

```
    if (arti != &artilist[ART_NONARTIFACT]) {
        if ((obj->owornmask & ~W_ART) && (arti->spfx & SPFX_REFLECT))
            return TRUE;
        if (arti->cspfx & SPFX_REFLECT)
            return TRUE;
    }
    return FALSE;
```

C `set_artifact_intrinsic` (`:867–872`): `(spfx & SPFX_REFLECT) && (wp_mask & W_WEP)` then `EReflecting |=` / `&=~` `wp_mask`. `EReflecting` is `u.uprops[REFLECTING].extrinsic` (`youprop.h:380`). C `mon_reflects` (`muse.c:2807–2811`) inserts `arti_reflects(MON_WEP(mon))` between shield and amulet, no `makeknown`. C `ureflects` (`:2845–2849`) `EReflecting & W_WEP` then `pline(fmt, str, "weapon")`.

Artiflist: Dragonbane `spfx = SPFX_RESTR|SPFX_DCLAS|SPFX_REFLECT`, cspfx 0 (`artilist.h:157–160`). Longbow `spfx` includes `SPFX_REFLECT`, cspfx `SPFX_ESP` (`:271–274`). No row has `cspfx & SPFX_REFLECT`.

Old JS: named omit. `mon_reflects` clones skipped MON_WEP. `set_artifact_intrinsic` had HALRES only. zap/pray `ureflects` were shield-otyp only.

The diff **does** port `arti_reflects`, `SPFX_REFLECT = 0x04000000` (`artifact.h:42`), confer W_WEP into `uprops[REFLECTING].extrinsic` **and** `u.EReflecting`, and wire both `mon_reflects` clones plus zap/pray W_WEP arms. It does **not** extract cspfx into `artifacts_data.js` (`raw.cspfx | 0` is always 0). Named. It does **not** add zap/pray W_AMUL/W_ARM/dragon. Named. `mhitu.js` `ureflects` already had `er & W_WEP` + `sprintf2(fmt, str, what)` — this SHA only comments that the bit is now conferred.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `arti_reflects` | C `:537–550`, **wired** | new export |
| `SPFX_REFLECT` | C `artifact.h:42`, **wired** | `0x04000000` |
| `get_artifact` | C, **imported live** | null/`!oartifact` → `list[0]` |
| `set_artifact_intrinsic` W_WEP | C `:867–872`, **wired** | HALRES pre-existing |
| `setuwep` conferral | C `wield.c`, **pre-existing callee** | already called this helper |
| `mon_reflects` / `mon_reflects_mm` | C `muse.c:2797–2833`, **pre-existing clones** | MON_WEP now live |
| `ureflects` mhitu | C `:2836–2866`, **pre-existing clone** | already `EReflecting & W_WEP` |
| `ureflects` zap / pray | C same, **pre-existing clones** | W_WEP hardcoded to each file’s one caller fmt |
| cspfx extract | C artilist field, **named omit** | no row has `cspfx&SPFX_REFLECT` |
| zap/pray W_AMUL/W_ARM/dragon | C `:2850–2864`, **named omit** | |
| mcastu `ureflects` | C other caller, **named omit** | `mcastu.js` has no `ureflects` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none.

## C ↔ JS fidelity

`get_artifact(null)` returns `list[0]`, so `arti_reflects(MON_WEP(mon))` when `mw` is null never reads `obj.owornmask`. Match C (null → `ART_NONARTIFACT`). Worn test is `(owornmask & ~W_ART)` then `spfx & SPFX_REFLECT`. `W_WEP` is `0x00000100`, `W_ART` `0x00001000`. A wielded Dragonbane (`mon_wield_item` / `setuwep` sets `owornmask |= W_WEP`) returns true. Unworn / inventory-only Dragonbane has mask 0 and cspfx 0 → false. Match C for this artilist. Longbow same on the worn arm; its cspfx is ESP, not reflect.

`set_artifact_intrinsic`: when `wp_mask !== W_ART` uses `oart.spfx` (C `:spfx = (wp_mask != W_ART) ? oart->spfx : oart->cspfx`). W_WEP conferral ORs `wp_mask` into both the uprops extrinsic and the JS `u.EReflecting` mirror (same HALRES pattern). `setuwep` already calls this on/off. zap `Reflecting()` is `HReflecting \|\| EReflecting` plus shield otyp, so a W_WEP bit makes the dobuzz gate true, then `ureflects` names `"weapon"`. That is not a stub callee behind a “Match C” dispatch.

zap clone: caller `ureflects('But %s reflects from your %s!', 'it')`. C `pline(fmt, str, "weapon")` → `"But it reflects from your weapon!"`. JS hardcodes that string. Match **this** caller; not a general `fmt` port. pray caller `'%s reflects from your %s.', 'It'` → `"It reflects from your weapon."`. Match **this** caller. mhitu uses `sprintf2` like C. Do **not** stamp “Match C zap/pray W_AMUL.”

Hallucination check: “Match C `arti_reflects`” while **cspfx is unextracted** is an overclaim on **carried-only** reflection. No artilist row has that bit. Dispatch for wielded Dragonbane/Longbow is live. Do **not** stamp “Match C `mcastu` `ureflects`.” Do **not** stamp “Match C silver DSM in zap `ureflects`.”

## Hallucinations / overclaim

Subject says a wielded Dragonbane or Longbow actually reflects instead of skipping the weapon slot. **True for `mon_reflects` MON_WEP and for hero `EReflecting&W_WEP` on the wired clones (mhitu gaze, zap dobuzz, pray `god_zaps_you`).** False until named for mcastu and for zap/pray amulet/armor/dragon. Stamping **Addressed:** D-1342 for the W_WEP slot is fair. Do **not** stamp “Match C cspfx.” Do **not** treat fortress PASS as a Dragonbane bounce.

## Density

One C function plus its queued conferral and the `mon_reflects` / `ureflects` clones that were skipping the weapon slot. ~90 lines of JS across modules that already call each other. Playbook §2b. Did not glue `kickstr` or `killer_xname`. Acceptable size.

## Branch-by-branch confirm

1. Null / non-artifact: false. Match `:541`.
2. Dragonbane unworn: false (cspfx 0). Match.
3. Dragonbane / Longbow `owornmask & W_WEP`: true. Match `:543–544`.
4. Excalibur W_WEP: false (no `SPFX_REFLECT`). Match.
5. `mon_reflects`: shield then weapon then amulet. Match `:2801–2818`. No `makeknown` on weapon. Match `:2809–2811`.
6. Hero wield then zap ray: `EReflecting&W_WEP` → `"weapon"`. Match `:2845–2848` for the zap fmt.
7. Hero wield then Medusa gaze: mhitu `ureflects` already used the bit. Conferral now sets it. Match.
8. zap/pray amulet-only: still false (named). C would take `:2850–2854`.
9. **Public-unhit** unless a session wields Dragonbane or the Longbow of Diana.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Dual-write `uprops` + `u.EReflecting` is the existing conferral mirror, not a trace gate.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on Dragonbane. This audit’s full `sessions` is logged on review **307** (HEAD `2a5e72e0`). I did not re-run the private canary. Fortress PASS is not evidence a Longbow bounced a gaze.

## Actionable C-wrongs

None for Must-fix. `arti_reflects` and W_WEP conferral match C `:537–550` / `:867–872`. zap/pray W_AMUL/W_ARM and mcastu are named omits of live clones, not a stub `arti_reflects`.

Named omits (map, not Must-fix):

1. cspfx extract (vacuous for this artilist’s `SPFX_REFLECT`)
2. zap/pray `ureflects` W_AMUL / W_ARM / silver dragon
3. mcastu / uhitm-passive `ureflects`
4. other `set_artifact_intrinsic` SPFX (SEARCH/ESP/…)

Do not Must-fix “unworn Dragonbane should reflect” (C cspfx is 0). Do not Must-fix “zap should `makeknown` the artifact” (C does not).

## Callers / RNG ledger

C: `mon_reflects` → `arti_reflects` (no RNG) → maybe `ureflects` after `Reflecting`. JS: same. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wielded Dragonbane/Longbow now set `EReflecting&W_WEP` and `mon_reflects` asks `arti_reflects(MON_WEP)`; zap/pray amulet/armor stay named.
- Must-fix stays empty for this SHA.
