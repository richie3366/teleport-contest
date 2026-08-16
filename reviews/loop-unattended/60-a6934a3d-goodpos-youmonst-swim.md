# Review 60 — a6934a3d — `goodpos` youmonst swim / lev / fly / wwalk (D-1099)

## Metadata
- Full / short hash: `a6934a3d952e333f6168c20ecb9ffaf81d7a7c3b` / `a6934a3d`
- Parent: `cdb72162` (D-1098). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 19:17:07 +0200
- D-id: **D-1099**
- Stats: 10 files, +200 / −45 — `js/teleport.js` +106 / −11 (youprop clones + youmonst pool/lava returns).
- Claims to close: Open queue `teleport.c` `goodpos` youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (named). Not `passes_walls`. Stamped **Addressed:** D-1099 `a6934a3d` on the archive row (filled by D-1100). Filled D-1098 hash `cdb72162`. Review **52** named the youmonst arms as still Open after D-1091 macros.
- JS / map: `teleport.js` `goodpos`. `c-js-map/turns.md` teleport row. `passes_walls`/`may_passwall` later D-1100; `GP_AVOID_MONPOS` `is_exclusion_zone` and `goodpos_onscary` Elbereth still named (live Open).
- Prior reviews this SHA claims to close: **52** / **38** follow-on youmonst swim (named omit, not Must-fix).

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos so the hero's pool and lava cells use Swimming/Amphibious/Levitation/Flying/Wwalking.”

Old JS used monster `is_swimmer` / `m_in_air` / `likes_lava` for **every** `mtmp`, including `&gy.youmonst`. A grounded tourist on water was rejected the same way a jackal is; a hero in water-walking boots (confer writes `uprops[WWALKING]`, not `EWwalking`) still failed. C splits youmonst vs monster.

The diff **does** that split: `mtmp === game.youmonst` pool/lava returns use local youprop clones (flats **or** `uprops[]`; Lev/Fly honor `B*`; no sticky `u.Levitation`/`u.Flying`). Monster arm unchanged. Floating-eye lava reject still **before** the youmonst lava arm.

It does **not** port `passes_walls`+`may_passwall` (next SHA). It does **not** port `is_exclusion_zone` or live-mon `onscary`. Named. C pool-arm comment `[what about Breathless?]` is not a predicate — correctly not invented.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos` youmonst pool/lava | C body, **retouched** | `teleport.c:136–161` |
| `Swimming` / `Amphibious` / `Levitation` / `Flying` / `Wwalking` / `Fire_resistance` | **clones** of `youprop.h` | confer-uprops OR; Lev/Fly `!B*` |
| `_uprop_he` | JS helper | H/E flat **or** `uprops[idx]` intrinsic/extrinsic |
| `is_swimmer` / `m_in_air` / `likes_lava` | C callees, **untouched** | monster arm |
| `is_pool` / `is_lava` | C callees, **imported** | D-1091 / D-1090 / D-1077 |
| `Upolyd` | C macro, **imported** | `you.h` `mtimedone != 0` |
| `passes_walls` | C after lava, **named omit this SHA** | D-1100 |
| `is_waterwall` | C `dbridge.c:38–43` | JS `IS_WATERWALL(typ)` after `isok` — equivalent |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Pool eel `rn2(13)` is **pre-existing** (D-0653), not this SHA; order still pool → eel → lava.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates, no recorded coordinates. Youprop clones follow D-1085 / D-1089 (flats **and** `uprops[]` because `confer_oc_oprop` does not mirror every `E*`). Sticky `u.Levitation` / `u.Flying` are **excluded** (D-1070). Not a seed-shaped water walk.

## C ↔ JS fidelity

### Order — pool, eel, lava, then (still deferred this SHA) wallwalk

C `teleport.c:134–164`:

```
if (is_pool(x, y) && !ignorewater) {
    if (mtmp == &gy.youmonst)
        return (Swimming || Amphibious
                || (!Is_waterlevel(&u.uz) && !is_waterwall(x, y)
                    && (Levitation || Flying || Wwalking)));
    else
        return (is_swimmer(mdat) || (!waterlevel && !waterwall && m_in_air(mtmp)));
} else if (mdat->mlet == S_EEL && rn2(13) && !ignorewater) {
    return FALSE;
} else if (is_lava(x, y) && !ignorelava) {
    if (mdat == &mons[PM_FLOATING_EYE]) return FALSE;
    else if (mtmp == &gy.youmonst)
        return (Levitation || Flying
                || (Fire_resistance && Wwalking && uarmf && uarmf->oerodeproof)
                || (Upolyd && likes_lava(gy.youmonst.data)));
    else
        return (m_in_air(mtmp) || likes_lava(mdat));
}
if (passes_walls(mdat) && may_passwall(x, y)) return TRUE;
```

JS `249–284` matches the youmonst/monster split and the floating-eye-first lava gate. `passes_walls` is still a comment in **this** SHA (D-1100 next). Pool still **returns** — a xorn on water never reaches wallwalk in C either (`is_swimmer`/`m_in_air` false → false). Match.

`is_waterwall(x,y)` is `isok && IS_WATERWALL(typ)` (`dbridge.c:38–43`; `rm.h` `typ==WATER`). `goodpos` already `isok`s; JS `!IS_WATERWALL(typ)` on the current loc is the same boolean. Waterlevel + Wwalk/Lev: C `Wwalking` is already `&& !Is_waterlevel`; the pool extra `!Is_waterlevel && !waterwall && (Lev||Fly||Wwalk)` means a levitating hero **cannot** stand on Plane-of-Water surface, but `Swimming||Amphibious` still can. JS copies that nesting. Match.

Identity: C `mtmp == &gy.youmonst`; JS `mtmp === game.youmonst`. Callers that pass `game.youmonst` (wizard `^T` / `teleok`) hit the hero arm. Fakemon `{data, mx:0}` does not. Match.

### Youprop clones vs macros

C (`youprop.h`):

| Macro | Expansion |
|-------|-----------|
| `Levitation` | `(H\|\|E) && !BLevitation` where `H/E/B` **are** `uprops[LEVITATION]` |
| `Flying` | `(H\|\|E \|\| steed is_flyer) && !BFlying` |
| `Wwalking` | `(H\|\|E) && !Is_waterlevel` |
| `Swimming` | `H\|\|E \|\| steed is_swimmer` |
| `Amphibious` | `HMagical_breathing \|\| E \|\| amphibious(youmonst.data)` |
| `Fire_resistance` | `HFire_resistance \|\| EFire_resistance` (uprops FIRE_RES) |

JS `_uprop_he` ORs JS flats **and** `uprops[idx]` because confer often writes only the latter (D-1085 flying amulet, water-walking boots, amulet of magical breathing, fire-res armor). Lev/Fly blocked = `u.B*` **or** `prop.blocked` (C `B*` **is** `uprops[].blocked`; extra flat is the established alias). Sticky `u.Levitation` / `u.Flying` omitted — a leftover flag must not ignore `B*` (D-1070). Steed swim/fly uses `is_swimmer` / `is_flyer` on `usteed.data` — C callees.

`Fire_resistance()` **also** ORs sticky `u.Fire_resistance`. C has no such field and no `BFire`. Extra sticky can only **enable** lava survival, not skip a block bit. Same confer-debt shape as sit D-1060, not a D-1070-class C-wrong. Do not Must-fix it on this SHA; do not spread sticky into Lev/Fly.

`Upolyd(u) && likes_lava(game.youmonst.data)`: C `Upolyd && likes_lava(gy.youmonst.data)`. Unpolyd salamander-looking `data` must not lava-walk; poly salamander must. D-log canary. `likes_lava` is fire elemental / salamander mndx (`monsters.js`) — C `mondata.h`. Match.

Floating eye: C `mdat == &mons[PM_FLOATING_EYE]` before youmonst. A poly’d floating-eye hero on lava returns **false** even with Levitation. JS `mdat.mndx === PM_FLOATING_EYE` first. Match. Ignorewater / ignorelava skip the whole arm. Match.

Monster pool still `is_swimmer` / `m_in_air`, not youprop. A water elemental fakemon is unchanged. Match.

`!mtmp`: C only enters the pool/lava/wallwalk block when `mtmp` is non-NULL (`teleport.c:117`). Null `mtmp` falls through to `accessible` + ignorewater/ignorelava (D-1091 deleted a JS-only else). This SHA does not reintroduce that else. Object/engraving relocation can pass null. Match.

`MM_IGNOREWATER` / `MM_IGNORELAVA`: both arms skipped so a drowning-immune placement (`enexto` flags) can sit on pool/lava without swim/fire. C same. `GP_ALLOW_U` / occupied / wormno tests are **before** the pool arm and untouched. `is_pool`/`is_lava` remain the D-1091 helpers (DRAWBRIDGE_UP+`DB_LAVA` is lava, not pool). Youmonst on a raised lava bridge now uses the **lava** youprop arm (Lev/Fly/Fire+Wwalk+proof), not the swimmer arm. That is why D-1091 had to ship first.

`m_in_air` for monsters is still `is_flyer || is_floater` (`teleport.js:128–130`) — C `m_in_air` in this file. Youmonst must **not** use that for pool (C uses Lev/Fly/Wwalk youprop, which includes steed flyer and blocked bits). The split is the whole point of this SHA.

## Hallucinations / overclaim

“Match C so the hero's pool and lava cells use Swimming/Amphibious/Levitation/Flying/Wwalking” is **true for the youmonst returns, B* on Lev/Fly, confer-uprops, lava Fire+Wwalk+oerodeproof boots, and Upolyd likes_lava.** It is **not** true that `passes_walls` ran, that Breathless was added, or that `is_exclusion_zone` ran.

This is **not** “Match C dispatch, callee is a stub.” There is no new callee; the predicates are youprop expansions. Stamping **Addressed:** D-1099 is fair. Hash `a6934a3d` is on the archive row (filled by D-1100).

## Density (§2b)

One Open cluster: youmonst pool **and** lava (C’s two arms in the same `if/else if`). Youprop clones are the predicates those arms read — not a second subsystem. ~75 executable lines plus clones. `passes_walls` correctly deferred. Right size.

## Verification

Journal: private canary **52**/52 (grounded false; HSwimming / uprops swim/breath/wwalk/fly; amphibious form; BLev/BFly block; sticky Lev/Fly false; steed swim/fly; WATER wall Lev false / swim true; waterlevel Wwalk/Lev false swim true; lava Fire+Wwalk+proof boots; Upolyd salamander vs unpolyd data; floating-eye first; UP+moat vs UP+lava; ignorewater/ignorelava; fakemon regression); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (wizard `^T` onto water with youprop, not form). Cadence **#1400** **44**/44 is fortress, not a water-walk proof.

C read of `teleport.c:86–185`, `youprop.h:28` / `240–273`, `dbridge.c:38–43`; JS `teleport.js:132–284`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| grounded hero pool | false | **same** |
| `uprops[FLYING]` amulet, `!BFlying` | pool true (not waterlevel wall) | **same** |
| sticky `u.Flying` only | false (`!E/H`) | **same** (no sticky) |
| `BFlying` | false | **same** |
| steed `is_swimmer` | pool true | **same** |
| waterlevel Lev/Wwalk | false unless swim/amph | **same** |
| lava Fire+Wwalk+proof boots | true | **same** |
| unpolyd `likes_lava(data)` | false | **same** |
| poly salamander | true | **same** |
| floating-eye (even youmonst) lava | false first | **same** |
| monster jackal pool | still `is_swimmer` | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The youmonst pool/lava returns are C’s predicates with confer-uprops ORs.

Named omits / do-nots (map / Open, not Must-fix):

1. `passes_walls`+`may_passwall` — **Addressed:** D-1100 `305ad188` (next SHA).
2. `GP_AVOID_MONPOS` `is_exclusion_zone`; `onscary` when `m_id != 0`.
3. Do not add Breathless to the pool arm (C comments it, does not test it).

Do not restore youmonst pool/lava to `is_swimmer`/`m_in_air`. Do not honor sticky `u.Levitation`/`u.Flying`. Do not skip `B*`. Do not rewrite `confer_oc_oprop` to save the clones (D-1085 / D-1089).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: youmonst pool and lava in `goodpos` now use C’s youprop Swimming/Amphibious/Levitation/Flying/Wwalking (and lava Fire+Wwalk+proof boots / Upolyd likes_lava), while wallwalk stays the next SHA and monster `is_swimmer` is untouched.
- Must-fix stays empty for this SHA.
