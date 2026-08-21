# Review 326 — 9a144895 — zap.c lightdamage WAN_LIGHT/camera (D-1366)

## Metadata
- Full / short hash: `9a1448952139247a174c680e81f03e351f71c243` / `9a144895`
- Parent: `d8f4fba6` (D-1365). This file audits **this SHA only** (last of four `js/` commits since review **322**). Archive **Addressed:** D-1366 lacked the short hash; this review commit fills `9a144895`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 13:52:20 +0200
- D-id: **D-1366**
- Stats: 11 files, +176 / −47 — `js/zap.js` +90 / −9 (`lightdamage` + zapnodir WAN/SPE_LIGHT + zapyourself WAN_LIGHT FALLTHROUGH CAMERA); `js/read.js` −8 stub / + dynamic import in `seffect_light`.
- Claims to close: Open `zap.c` `lightdamage` (named; WAN_LIGHT/camera) from D-1355 / D-1365 / review **317**. Not flashburn lightning. `reviews/loop-2026-08-15/` has no unpaid lightdamage Must-fix.
- JS / map: `zap.js` `lightdamage` / `zapnodir` / `zapyourself`; `read.js` `seffect_light`; apply `use_camera` already dispatched to `zapyourself` (D-0736). `c-js-map/turns.md` + `debt.md`. muse `MUSE_CAMERA` / `invoke_blinding_ray` still named.
- Prior reviews this SHA claims to close: **317** named `lightdamage` / WAN_LIGHT `flashburn(FALSE)` as remaining after lightning. apply.js comment still says “full zapyourself CAMERA” named — this SHA wires that callee.

## Intent vs deliverable

Git subject promises: “Match C zap.c lightdamage so a wand of light or camera actually hurts a gremlin hero and blinds via flashburn, instead of a stub that returned amt and skipped the callers.”

C `lightdamage` (`zap.c:3024–3056`): non-gremlin returns `amt` with no RNG; gremlin `rnd(amt)`, if `>10` then `10+rnd(amt-10)`, cap 20; Ow pline; SCROLL/SPBOOK force `ordinary=FALSE`; how = spell-of-light / `ansimpleoname` / `bare_artifactname`; `losehp(Maybe_Half_Phys(dmg), buf, NO_KILLER_PREFIX)`.

C callers this SHA: `zapnodir` `:2544–2550` WAN/SPE_LIGHT `litroom(TRUE)` then `lightdamage(obj,TRUE,5)`; `zapyourself` `:2915–2928` WAN_LIGHT `d(spe,25)` FALLTHROUGH CAMERA; `read.c` `seffect_light` already called the stub. C `apply.c` `use_camera` cursed/`!dx&&!dy` already `zapyourself(obj,TRUE)`. C `muse.c` `MUSE_CAMERA` calls `lightdamage` directly — JS muse still named.

Old JS: `read.js` stub `return amt`; `zapnodir` default; zapyourself WAN_LIGHT comment-only `damage=0`.

The diff **does** port `lightdamage`, wire zapnodir + zapyourself FALLTHROUGH + `seffect_light` import. It does **not** port muse camera / Sunsword invoke. Named. `flashburn` is the D-1355 export, not a new stub.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `lightdamage` | C `:3024–3056`, **wired export** | was read.js stub |
| `zapnodir` WAN/SPE_LIGHT | C `:2544–2550`, **wired** | `weffects` NODIR already dispatched |
| `zapyourself` WAN_LIGHT | C `:2915–2918`, **wired FALLTHROUGH** | `d(spe,25)` |
| `zapyourself` EXPENSIVE_CAMERA | C `:2920–2928`, **wired** | amt 5; `+rnd(25)`; `flashburn(FALSE)` |
| `flashburn` | C `:3059–3079`, **pre-existing live** | D-1355; `via_lightning` false |
| `litroom` | C `read.c`, **imported live** | zap←read; lightdamage dynamic the other way |
| `seffect_light` | C `read.c`, **wired callee** | `lightdamage(sobj,true,5)` |
| `use_camera` | C `apply.c:95–104`, **pre-existing dispatch** | already `zapyourself` |
| `ansimpleoname` / `bare_artifactname` | C, **imported live** | objnam / artifact |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | `hack.js`; H\|\|E only |
| `uhim` | C, **imported live** | `roles.js` |
| muse `MUSE_CAMERA` | C `muse.c:1938–1955`, **named omit** | monster camera |
| `invoke_blinding_ray` | C `artifact.c`, **named omit** | Sunsword |
| `resists_blnd_by_arti` sparkle | C `:3075–3077`, **named omit** | D-1355; CAMERA `learn_it` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** gremlin `rnd`/`rnd` cap; CAMERA/broken-wand `d(spe,25)` then `rnd(25)` flash duration (caller always burns `rnd(25)` even for non-gremlin). zapnodir amt 5: no extra RNG unless gremlin.

## C ↔ JS fidelity

Gremlin test: C `youmonst.data == &mons[PM_GREMLIN]`. JS `youmonst.data.mndx === PM_GREMLIN || umonnum === PM_GREMLIN` because `mons()` allocates a new object. `set_uasmon` keeps `mndx` on the stored data; the `umonnum` OR is the same poly id, not a second damage apply. Cap math matches `:3037–3041`. Ow `'!'` vs `'.'` uses `(dmg>2 || mh<=5)`. SCROLL/SPBOOK force blasted. SPBOOK how is `"spell of light"`; else artifact `bare_artifactname` else `ansimpleoname`. Killer `"zapped|blasted ${uhim()}self with ${how}"` matches `Sprintf("%s %sself with %s", ...)`. `losehp(maybe_half_phys(dmg), buf, NO_KILLER_PREFIX)`. Non-gremlin returns `amt` with no `rnd`. Match `:3035–3055`.

`zapnodir`: `known = dknown && !Blind`; `litroom(true, obj)`; `lightdamage(obj, true, 5)` void. Then existing `learnwand` if known. Match `:2548–2550` + after-switch. `weffects` already `oc_dir===NODIR` → `zapnodir` (`:3928–3929`). Dispatcher is live. SPE_DETECT_UNSEEN still missing from the secret-door case — **pre-existing**, not this SHA.

`zapyourself` WAN_LIGHT: `damage = d(obj.spe, 25)` then no `break` into CAMERA. `if (!damage) damage = 5`; `lightdamage`; `+= rnd(25)`; `flashburn(damage, false)` may `learn_it`; `damage = 0`. Match `:2915–2928`. Camera apply at self / cursed camera already reached this case; the callee was the stub. This SHA completes that path.

`seffect_light`: dynamic `import('./zap.js')` avoids the cycle after deleting the local stub. C is a direct call. Semantic match. Confused yellow/black-light pets still named.

Hallucination check: “Match C `lightdamage`” while **muse `MUSE_CAMERA` is omitted** is an overclaim on **monster cameras**. The **function is not a stub** (`return amt` is gone) and the **wand/scroll/self-camera callers are live**. Do **not** stamp “Match C muse camera.” Do **not** stamp “Match C `invoke_blinding_ray`.” Do **not** stamp “Match C `resists_blnd_by_arti`” (D-1355 named; CAMERA `flashburn(FALSE)` would `return TRUE` + `shieldeff` in C, JS returns false — same named omit, not a new silent clone).

## Hallucinations / overclaim

Subject says a wand of light or camera hurts a gremlin and blinds via `flashburn` instead of a stub that skipped callers. **True for NODIR zap, broken wand of light, scroll of light, and apply-camera at self/cursed.** **False for a monster using a camera** until muse. D-log names muse / invoke. Stamping **Addressed:** D-1366 for `:3024–3056` + those callers is fair. Do **not** treat fortress PASS as `"Ow, that light hurts!"` or `"You are blinded by the flash!"` from a wand of light.

apply.js header still says “full zapyourself CAMERA” named — stale comment, not a remaining JS stub. This review does not edit `js/`.

## Density

One C function plus the callers C already uses from zapnodir / zapyourself / seffect_light (~90 lines). Playbook §2b caller/callee cluster. Did not glue `maybe_destroy_item` AD_ELEC (next Open) or muse camera (queued after). Right size. WAN_MAKE_INVISIBLE stays default. Did not combine with D-1364’s thin missile peel.

## Branch-by-branch confirm

1. Non-gremlin, any caller: return amt; no `rnd`. Match `:3035` false.
2. Gremlin amt 5 (zapnodir / scroll): `rnd(5)`; Ow; `losehp`; blasted if scroll. Match.
3. Gremlin `d(spe,25)` large: cap 10+`rnd` then 20. Match `:3038–3041`.
4. CAMERA `damage==0` → 5 then `lightdamage` then `rnd(25)` flash. Match `:2921–2925`.
5. WAN_LIGHT broken: skip the `if (!damage) damage=5` when `d()` >0. Match FALLTHROUGH.
6. `flashburn(false)` seeing: flash You + `make_blinded` + maybe vision-clears. Match D-1355 body.
7. `flashburn(false)` Blind: skip You; still burned `rnd(25)` at the caller. Match.
8. Sunsword arti resist: C sparkle + `learn_it`; JS false. Named D-1355.
9. SPE_LIGHT zapnodir: `how="spell of light"` via SPBOOK. Match `:3047`.
10. muse MUSE_CAMERA: not called. Named.
11. WAN_MAKE_INVISIBLE: still default. Named.
12. **Public-unhit** unless a session zaps light / self-photos.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Gremlin test is `mndx`/`umonnum`, not a recorded coordinate. Dynamic `import('./zap.js')` is cycle avoidance, not Node `fs`. Plain ESM. `litroom` static import from `read.js` is the opposite edge of that cycle.

## Verification

Journal: private canary **25**/25 (C/JS grep; non-gremlin no RNG; gremlin rnd+mh; fatal zapped/blasted/spell-of-light; CAMERA `rnd(25)`+`flashburn(FALSE)` + Blind skip; broken WAN_LIGHT `d(spe,25)`; MAKE_INVISIBLE still default; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on light/camera. This audit cadence: full `sessions` at HEAD `9a144895` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a gremlin flash.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `lightdamage` matches `:3024–3056` including RNG cap and killer string; zapnodir / FALLTHROUGH CAMERA / seffect_light call the live export; apply camera already dispatched. muse / invoke / arti-sparkle are named omits.

Named omits (map / already-Open, not Must-fix):

1. muse.c `MUSE_CAMERA` `lightdamage` — already Open
2. `artifact.c` `invoke_blinding_ray` — already Open
3. `resists_blnd` expl/gaze / `resists_blnd_by_arti` (D-1355)
4. WAN_MAKE_INVISIBLE / `maybe_destroy_item` AD_ELEC — Open
5. zapnodir create/wish/enlighten/stasis
6. D-1364 Antimagic uprops — Must-fix on **324**

Do not Must-fix “camera apply still stubs `zapyourself`” (`use_camera` already awaits it). Do not Must-fix “non-gremlin must `rnd`” (C returns amt). Do not Must-fix “keep damage after CAMERA flashburn” (C resets to 0).

## Callers / RNG ledger

C zapnodir: no RNG unless gremlin. C CAMERA: `rnd(25)` always after `lightdamage`. C broken WAN_LIGHT: `d(spe,25)` then that. JS same. muse still 0. Public fortress is not a wand of light.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `lightdamage` is the live zap.c body and wand/scroll/self-camera callers reach it; monster camera stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1366 `9a144895`.
