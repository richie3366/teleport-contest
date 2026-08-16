# Review 21 — ecd37108 — dosit Fire/Cold `uprops[]` (D-1060)

## Metadata
- Full / short hash: `ecd37108e5c02c58c8c0e8dff59d6d6ced60694c` / `ecd37108`
- Parent: `2d72af00` (reviews 19–20; Must-fix was review **19** Fire/Cold `uprops[]`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 03:56:32 +0200
- D-id: **D-1060**
- Stats: 11 files, +124 / −62 — `js/sit.js` +33 / −8 (two helpers only; lava/ice arms untouched)
- Claims to close: Must-fix from `reviews/loop-unattended/19-27f0a233-dosit-lava-ice.md` item 1. Stamped **Addressed:** D-1060 `ecd37108` on the archive row **and** on review 19 in this SHA (hash present, not chicken-egg).
- JS / map: `sit.js` `Fire_resistance` / `Cold_resistance`; `c-js-map/data.md` names zap/trap/explode H||E aliases. Cadence still **#1335** **44**/44 (not a score refresh).

## Intent vs deliverable

Git subject promises: “Match C youprop.h Fire/Cold so worn-ring sit lava rolls d(2,10), not H||E flats.” Body: `confer_oc_oprop` writes FIRE_RES only to uprops; sit helpers now OR that pair like `invent.js`. Did not rewrite `confer_oc_oprop` or pull DRAWBRIDGE_UP+DB_LAVA `is_lava`.

Review 19’s Must-fix was exactly that predicate, with those three “do not”s. The diff **only** retouches the two sit helpers. Lava `d((Fire_resistance?2:10),10)` and ice `!Cold_resistance` already called them (D-1058). `do_wear.js` `confer_oc_oprop` is unchanged. `hack.js` `is_lava` is unchanged. zap/trap/explode/fountain/mhitm aliases are unchanged.

It does **not** port `lay_an_egg`, steed `mon_nam`, or DRAWBRIDGE_UP+DB_LAVA. Those were named omits on D-1058, not this Must-fix.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Fire_resistance()` | **clone** of `youprop.h:26–28` | now ORs flats + `uprops[FIRE_RES]` like `invent.js` `hero_Fire_resistance` |
| `Cold_resistance()` | **clone** of `youprop.h:30–32` | same for `COLD_RES` |
| `dosit` lava `d(...)` | C call site, unchanged | `sit.c:548–549`; still `d(n,10)` via imported `d` |
| `dosit` ice pline | C call site, unchanged | `sit.c:552–553`; no RNG |
| `confer_oc_oprop` | imported C callee, **not this SHA** | `do_wear.js:261–288`; FIRE_RES/COLD_RES still unmirrored to `EFire`/`ECold` |
| `hero_Fire_resistance` | pre-existing C-shaped helper | `invent.js:1685–1689`; this SHA copies that OR |
| zap/trap/explode `Fire_resistance` | **clone**, untouched | still H\|\|E flats; named deferral |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. The helpers read `FIRE_RES=1` / `COLD_RES=2` (`prop.h:15–16`; `const.js:2334–2335`), not a seed-shaped resistance table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### C macros — there is no `u.Fire_resistance` member

C `youprop.h:26–32`:

```
#define HFire_resistance u.uprops[FIRE_RES].intrinsic
#define EFire_resistance u.uprops[FIRE_RES].extrinsic
#define Fire_resistance (HFire_resistance || EFire_resistance)

#define HCold_resistance u.uprops[COLD_RES].intrinsic
#define ECold_resistance u.uprops[COLD_RES].extrinsic
#define Cold_resistance (HCold_resistance || ECold_resistance)
```

`Fire_resistance` in `sit.c:548` is the macro, not a function. `d((Fire_resistance ? 2 : 10), 10)` evaluates the boolean **once**, then `d(n,10)` is n inner `RND(10)` (`hack.h` / `rng.js:98–106`). Ice `if (!Cold_resistance)` is a boolean; **no** gameplay RNG.

Wear path: C `worn.c` `setworn` → `oc_oprop` writes `u.uprops[p].extrinsic`. JS `confer_oc_oprop` (`do_wear.js:261–270`) writes that same pair for **every** `oc_oprop`, and mirrors a flat `E*` only for BLINDED / FAST / TELEPAT / STEALTH / LEVITATION. FIRE_RES and COLD_RES are **not** mirrored. `u.EFire_resistance` is still unassigned in scored `js/` (grep). Intrinsic fire from `adjabil` / eat / poly still sets `HFire_resistance`. That split is why review 19 rejected H||E flats: a worn ring is extrinsic-only in `uprops[]`.

C extrinsic is a **bitmask** of worn slots (`W_RINGL` / `W_RINGR` / armor), not a boolean 1. `Fire_resistance` is still `H || E` where E nonzero means true. JS `(e?.extrinsic | 0)` is that mask. Putting the ring on ORs the slot bit; taking it off clears that bit (`do_wear.js:269–270`). If both ring slots confer FIRE_RES, C keeps the property until the last bit clears. JS the same. Sit does not call `rn2` to read the mask.

`adjabil` / `propset_fromform` / eat still write `HFire_resistance` as a TIMEOUT/FROMOUTSIDE intrinsic. C `HFire_resistance` **is** `uprops[FIRE_RES].intrinsic`. JS dual-storage ORs the flat and the pair. If those two stay in sync on the eat/poly path, the extra OR is redundant, not a wrong `d(10,10)`. The Must-fix was the wear path where they were **not** in sync.

### Sit helpers after this SHA — call-for-call once the boolean is C

JS `sit.js:485–503`:

```
function Fire_resistance() {
    const u = game.u || {};
    const e = u.uprops?.[FIRE_RES];
    return !!((u.HFire_resistance | 0) || (u.EFire_resistance | 0)
        || u.Fire_resistance
        || (e?.intrinsic | 0) || (e?.extrinsic | 0));
}
```

Cold is the same shape on `COLD_RES`. `invent.js:1685–1689` `hero_Fire_resistance` is that OR. Review 19 asked for that shape and forbade rewriting `confer_oc_oprop`. Match the Must-fix.

| Hero state | C `Fire_resistance` | Prior sit helper | This SHA |
|------------|---------------------|------------------|----------|
| Valkyrie / eaten / poly `HFire_resistance` | true → `d(2,10)` | true | **match** |
| Worn ring / DSM, only `uprops[FIRE_RES].extrinsic` | true → `d(2,10)` | **false → `d(10,10)`** | **true → `d(2,10)`** |
| No fire res | `d(10,10)` | `d(10,10)` | **match** |
| Worn cold ring on ICE | skip “ice feels cold” | still printed | **skip** |
| No cold res on ICE | print | print | **match** |

`u.Fire_resistance` / `u.Cold_resistance` are extra OR terms C does not have. Grep finds **no** scored assignment to `u.Fire_resistance`. Dead on the wear path. They are invent.js compatibility, not a second storage that would make a worn ring false. Do not treat them as a remaining Must-fix.

`e?.intrinsic | 0` is C `HFire_resistance` (TIMEOUT bits are nonzero → true). `e?.extrinsic | 0` is C `EFire_resistance` (worn-slot bitmask nonzero → true). Boolean OR, not arithmetic add. Match.

Lava arm (`sit.js:1142–1158`) still: `You_sit_message(hliquid('lava'))` → `burn_away_slime` → `likes_lava` warm/`return` else `d(Fire_resistance() ? 2 : 10, 10)` + `"sitting on lava"`. Ice still: sit_message `'ice'` then `if (!Cold_resistance())` pline. **One** `Fire_resistance()` call before `d`, same as C’s ternary. Trap TT_LAVA (`sit.js:1058–1064`) still `rnd(4)` + `d(2,10)` + `"sitting in lava"` and does **not** call these helpers. Match the D-1058 split.

C ice (`sit.c:550–553`): `You(sit_message, defsyms[S_ice].explanation)` then `if (!Cold_resistance) pline_The("ice feels cold.")`. No `d()`, no `rn2`. JS `'ice'` is `defsym.h` S_ice desc. Worn cold ring: C `ECold_resistance` nonzero → skip pline. Prior JS printed it. This SHA skips. No-res still prints. DRAWBRIDGE_DOWN (`sit.c:554–555`) does not read Cold/Fire; this SHA did not retouch it.

`likes_lava` warm still returns **before** `d()`. A fire elemental with a fire-resistance ring must not roll dice. C `sit.c:543–546`. JS `sit.js:1146–1148`. The helper change does not move that return. Match.

### Callers of the two helpers

Only the D-1058 lava `d(...)` site and the ice `!Cold_resistance` site call these functions (`sit.js` grep). Throne, trap TT_LAVA, furniture, and `in_water` do not. Expanding the helpers cannot leak a `d(2,10)` into trap lava (`d(2,10)` is already fixed there and does **not** consult Fire_resistance). C trap lava is `d(2,10)` regardless of fire resistance (`sit.c` TT_LAVA arm, D-1039). Match.

Fountain / zap / explode keep their own local `Fire_resistance` clones. Those files are not imported by sit.js for this predicate. No accidental shared rewrite.

`d`, `burn_away_slime`, `likes_lava`, `hliquid`, `sit_losehp` were already real C callees (review 19). This SHA does not re-stub them. zap.js / trap.js / explode.js / fountain.js / mhitm.js `Fire_resistance` still H||E flats. D-log names that deferral. A worn ring sitting lava is sit.js. A worn ring hit by a fire bolt is still the zap clone. **Not** “Match C dispatch, callee is a stub” for **sit**.

C `losehp(d((Fire_resistance ? 2 : 10), 10), "sitting on lava", KILLED_BY)` evaluates the ternary, then `d`, then `losehp`. JS `sit_losehp(d(Fire_resistance() ? 2 : 10, 10), ...)` is that order. `sit_losehp` is the pre-existing wrapper (`hack.c` `losehp` + `maybe_wail` / `done`). `KILLED_BY` is the existing sit import. Killer string is C’s `"sitting on lava"`, not trap `"sitting in lava"`. No extra `rn2` on this arm. Ice has zero RNG either way.

`FIRE_RES` / `COLD_RES` in sit.js come from `const.js` (imported at `sit.js:62`), not a local `1`/`2` literal. `u.uprops?.[FIRE_RES]` missing → `e` undefined → `(e?.extrinsic | 0)` is 0. Same as C zero-init `uprops[]` before `setworn`. A hero who never wore a fire ring and never gained intrinsic fire still takes `d(10,10)`.

## Hallucinations / overclaim

“Match C youprop.h Fire/Cold so worn-ring sit lava rolls d(2,10), not H||E flats” is **true for the two sit helpers and the D-1058 lava/ice call sites.** It is **not** true that every JS `Fire_resistance` is now `youprop.h`, or that `confer_oc_oprop` grew an `EFire` mirror. The subject and D-log say they did not rewrite those. Honest.

Private node “`confer_oc_oprop` FIRE_RES ring, `EFire` unset → `d(2,10)`” is the right falsifier (review 19). Cadence **#1335** 44/44 does not prove lava sit. Path **public-unhit**. Green+cohort is regression cover.

Stamping the Must-fix **Addressed:** D-1060 `ecd37108` is fair. Hash already on the archive row and on review 19.

## Density (§2b)

Must-fix peel: two helpers (~12 executable lines). Playbook “too small” would apply to an *invented* one-`if` Open peel. Written-review C-wrongs pop first; this is the size Review 19 asked for. Not “finish youprop.h.” Not a zap rewrite. Right size for a queued C-wrong.

## Verification

Journal: private node worn FIRE_RES ring `EFire` unset → `d(2,10)`; `HFire` only → `d(2,10)`; no-res → `d(10,10)`; COLD_RES ring on ICE skips “ice feels cold”; trap TT_LAVA still `rnd(4)`+`d(2,10)`. green+strict PASS; cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path unhit.

This review iter did not re-run sessions (not a cadence slot; Must-fix empty after D-1061). C read of `youprop.h:26–32`, `sit.c:539–555`, `prop.h:15–16`, `do_wear.js:261–288`, `invent.js:1685–1689`, `sit.js:485–503` / `1142–1166`, plus grep `EFire_resistance=` / `u.Fire_resistance=` is the audit. Grep of the `js/sit.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the sit helpers this SHA shipped.

Named omits (map, not queue): zap/trap/explode/fountain/mhitm Fire/Cold still H||E-only; `hack.js` `is_lava` DRAWBRIDGE_UP+DB_LAVA; `lay_an_egg`; steed `mon_nam`; `can_reach_floor` / ustuck / hider.

Do not rewrite `confer_oc_oprop` to mirror every `E*` as a “cleanup” of this ACCEPT. Do not restore sit Fire/Cold H||E-only as C `youprop.h`. Do not merge trap TT_LAVA into the terrain lava arm.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: sit `Fire_resistance` / `Cold_resistance` now OR `uprops[FIRE_RES]` / `[COLD_RES]` like C `youprop.h` and `invent.js`, so a worn fire-resistance ring takes `d(2,10)`.
