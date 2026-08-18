# Review 196 — e0ea385e — objnam.c `corpse_xname` unique/pname adjective (D-1234)

## Metadata
- Full / short hash: `e0ea385e707bcaa564f4c2d03088fa35e03a9ea4` / `e0ea385e`
- Parent: `824201ab` (reviews **192–195**). This file audits **this SHA only**. Archive row **Addressed:** D-1234 `e0ea385e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 22:56:03 +0200
- D-id: **D-1234**
- Stats: 11 files, +223 / −112 — `js/objnam.js` +112 / −6; `js/do.js` +19 / −8; `js/mkobj.js` +8 / −3.
- Claims to close: Open `do.c` `revive_corpse` unique/pname `corpse_xname` adjective (named from D-1081 / D-1212 / D-1213 / D-1222 / review **195**). Not Soundeffect. `reviews/loop-2026-08-15/` has no unpaid corpse-name Must-fix.
- JS / map: `objnam.js` `corpse_xname` / `cxname`; `do.js` `revive_corpse`; `mkobj.js` `rot_corpse`. `c-js-map/data.md`. Glob / doname `CXN_ARTICLE|CXN_NOCORPSE` still named.
- Prior reviews this SHA claims to close: **195** named omit unique/pname adjective (map, not Must-fix).

## Intent vs deliverable

Git subject promises: “Match C objnam.c corpse_xname unique/pname so a revived unique or named corpse uses possessive plus adjective-after (Medusa's bite-covered), instead of a lowercase bite-covered prefix.”

C `corpse_xname` (`objnam.c:1824–1919`): `obj_pmname`; if `the_unique_pm` or `type_is_pname` then `s_suffix` + `possessive`; pname forces `no_prefix`; unique non-pname sets `the_prefix` unless `CXN_NO_PFX`; adjective after possessive else before the monster name; then `" corpse"` / plural `s` unless `CXN_NOCORPSE`. Caller `revive_corpse` (`do.c:2131–2133`) passes `chewed?"bite-covered":0` + `CXN_SINGULAR`. `rot_corpse` (`dig.c:2158`) uses `CXN_NO_PFX` so invent `Your` is not `"Your the Oracle's corpse"`.

Old JS: `cxname_singular` then `bite-covered ${cname}`; local `corpse_xname` ignored unique/pname and the adjective argument.

The diff **does** export `corpse_xname` with that bitmask + adjective order, a `obj_pmname` clone, `revive_corpse` calling it before `revive`, and invent `rot_corpse` `CXN_NO_PFX`. It does **not** port glob (`otmp->otyp != CORPSE && globby`) or doname `CXN_ARTICLE|CXN_NOCORPSE` prefix-as-adjective. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `corpse_xname` | C `:1824–1919`, **rewritten** | was a 6-line `"${mnam} corpse"` helper |
| `obj_pmname_corpse` | C `do_name.c:1321–1358`, **clone** | gender + aligned-cleric remap; omonst `#if 0` named |
| `the_unique_pm` | C `:1121–1139`, **already live** | not a new clone |
| `type_is_pname_objnam` | C `mondata.h` `M2_PNAME`, **already live** | local vs do_name cycle |
| `s_suffix_objnam` | C `hacklib.c`, **already live** | |
| `mungspaces_objnam` | C `hacklib.c` `mungspaces`, **clone** | collapse whitespace |
| `revive_corpse` | C `:2131–2133`, **wired** | live `revive` already |
| `rot_corpse` invent | C `:2158`, **wired** | CXN_NO_PFX |
| `cxname` / `cxname_singular` | C `:1924–1937` | now pass CXN_NORMAL / SINGULAR |
| glob | C `:1841` / `:1899–1900`, **named omit** | |
| doname FOOD prefix-as-adjective | **named omit** | still `pretty_base` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C unique/pname + adjective (`objnam.c:1853–1896`):

```
        mnam = obj_pmname(otmp);
        if (the_unique_pm(&mons[omndx]) || type_is_pname(&mons[omndx])) {
            mnam = s_suffix(mnam);
            possessive = TRUE;
            if (type_is_pname(&mons[omndx]))
                no_prefix = TRUE;
            else if (the_unique_pm(&mons[omndx]) && !no_prefix)
                the_prefix = TRUE;
        }
    ...
        if (possessive)
            Sprintf(eos(nambuf), "%s %s", mnam, adjective);
        else
            Sprintf(eos(nambuf), "%s %s", adjective, mnam);
```

JS (`objnam.js` `corpse_xname`): same `s_suffix` + `possessive`; pname `no_prefix`; unique `the_prefix` unless `CXN_NO_PFX`; `"the "` then `${mnam} ${adjective}` vs `${adjective} ${mnam}`; `mungspaces`; leading-digit adjective clears `any_prefix`; `" corpse"` + `s` when `quan>1 && !CXN_SINGULAR`; `an()` if `CXN_ARTICLE`. CXN bits match `hack.h:61–66` (`NORMAL=0` `SINGULAR=1` `NO_PFX=2` `PFX_THE=4` `ARTICLE=8` `NOCORPSE=16`).

`obj_pmname_corpse` vs `do_name.c:1335–1355`: CORPSE/STATUE/FIGURINE + `ismnum`; `spe & CORPSTAT_GENDER` (`0x03`); MALE/FEMALE else NEUTRAL; `PM_ALIGNED_CLERIC` + `CORPSTAT_RANDOM` (`0`) remaps to `PM_CLERIC`; `pmnames[mndx][g]` with NEUTRAL fallback. **Clone of a real C function**, not a stand-in that returns `"thing corpse"` for Medusa. C `impossible` + `"two-legged glorkum-seeker"` on bad otyp is not this caller (revive/rot are CORPSE).

`the_unique_pm`: pname false; `G_UNIQ`; high priest / worm-tail false; Wizard forced true. Matches C `:1121–1139`. Oracle (unique, not pname) → `"the Oracle's …"`; Medusa (pname) → `"Medusa's …"` with no article.

`revive_corpse` now calls `corpse_xname` **before** `revive()` like C copies `cname` first. **Callee `revive` is live** (D-1081 / D-1212). Chewed unique: `"Medusa's bite-covered corpse"` not `"bite-covered medusa corpse"`. Unchewed troll: `"troll corpse"` (no possessive). `CXN_SINGULAR` ignores `quan>1`.

Invent `rot_corpse`: `corpse_xname(..., CXN_NO_PFX)` so unique is `"Oracle's corpse"` under `Your("%s%s …")`. Without NO_PFX C would still set `the_prefix` and print `"Your the Oracle's corpse"`. Match the caller flag.

Glob: C uses `OBJ_NAME` and skips the `" corpse"` suffix. JS has no `glob` test — a globby non-CORPSE would get `"thing corpse"`. **Named omit**, not a wrong unique/pname arm. Doname still does not pass `CXN_ARTICLE|CXN_NOCORPSE` into this function.

C `mungspaces` only in the adjective branch; JS always trims. No-adjective strings have no extra spaces. Digit check is adjective-gated in both (`!adjective` / empty string is falsy in JS ≡ C `!*adjective`).

## Hallucinations / overclaim

Subject + D-1234 say unique/pname revive uses possessive + adjective-after. **`corpse_xname` + live `revive` + rot `CXN_NO_PFX` are the hunk.** Stamping **Addressed:** D-1234 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C glob `corpse_xname`” or “Match C doname FOOD prefix-as-adjective.”

## Density

C `corpse_xname` + the two callers that were already named (`revive_corpse` adjective, `rot_corpse` NO_PFX). ~112 JS lines in one naming family. Right size. Did not glue Soundeffect or doname.

## Branch-by-branch confirm

1. Medusa chewed revive: `"Medusa's bite-covered corpse"`. Match pname + after.
2. Oracle chewed: `"the Oracle's bite-covered corpse"`. Match unique `the_prefix`.
3. Oracle invent rot: `CXN_NO_PFX` → no `"the"` under `Your`. Match.
4. Troll chewed: `"bite-covered troll corpse"`. Match non-possessive before.
5. Unchewed unique: `"the Oracle's corpse"` / `"Medusa's corpse"`. Match `cxname`.
6. `CXN_SINGULAR` quan>1: no `" corpses"`. Match revive.
7. `CXN_NOCORPSE`: omit suffix. Implemented; doname does not pass it. **Named.**
8. Aligned-cleric RANDOM gender: `PM_CLERIC` name, not `"aligned"`. Match `obj_pmname`.
9. Glob: **named skip**.
10. `cxname` non-CORPSE: still `xname`. Match C `:1926–1928`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `PM_ALIGNED_CLERIC` is `monsterNames.indexOf`, not a recorded seed.

## Verification

Journal: private canary **45**/45 (C unique/pname + adjective order; Medusa/Oracle/Wizard/troll strings; CXN_NO_PFX; live uwep Medusa/Oracle/troll plines); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session revives a unique/pname corpse. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. Unique/pname strings come from the live `corpse_xname` body around live `revive`/`rot_corpse`.

Named omits (map, not Must-fix):

1. glob (`globby` non-CORPSE; skip `" corpse"`)
2. doname `CXN_ARTICLE|CXN_NOCORPSE` prefix-as-adjective / EGG / MEAT_RING
3. `obj_pmname` omonst traits (`#if 0` in C)

Do not Must-fix “finish every `cxn_flags` caller.” Do not restore `bite-covered ${cxname_singular}`.

## Callers / RNG ledger

C `corpse_xname` callers this SHA wired: `revive_corpse`, invent `rot_corpse`, `cxname`/`cxname_singular`. Other C callers (eatcorpse death reason, doname) still named. No `rn2` in the function. Public fortress is not evidence a unique corpse revived.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unique/pname corpses now take `s_suffix` and put `bite-covered` after the possessive like C; glob and doname CXN_ARTICLE|CXN_NOCORPSE stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1234 `e0ea385e`.
