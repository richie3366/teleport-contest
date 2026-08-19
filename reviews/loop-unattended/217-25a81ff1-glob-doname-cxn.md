# Review 217 — 25a81ff1 — objnam.c glob / doname CXN (D-1255)

## Metadata
- Full / short hash: `25a81ff1f67c3cf67bfb8f987e3c68e2dddc911e` / `25a81ff1`
- Parent: `fd5ebd92` (D-1254). This file audits **this SHA only**. Archive row **Addressed:** D-1255 `25a81ff1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 04:44:03 +0200
- D-id: **D-1255**
- Stats: 11 files, +134 / −42 — `js/objnam.js` +63 / −18; comment `js/do.js`.
- Claims to close: Open `objnam.c` glob / doname `CXN_ARTICLE|CXN_NOCORPSE` (named from D-1234 / review **196**). Not unique/pname adjective (already live). `reviews/loop-2026-08-15/` has no unpaid doname Must-fix.
- JS / map: `objnam.js` `corpse_xname` / `pretty_base` / `doname`; `c-js-map/turns.md`. EGG / MEAT_RING / candle `partly used` still named.
- Prior reviews this SHA claims to close: **196** named omit glob + doname prefix-as-adjective.

## Intent vs deliverable

Git subject promises: “Match C objnam.c glob/doname CXN so unique/pname corpses take a possessive article from corpse_xname and globs get size prefixes, instead of pretty_base \`a Medusa corpse\`.”

C `corpse_xname` (`objnam.c:1841–1900`): `glob = (otyp != CORPSE && globby)` uses `OBJ_NAME`; skip omit_corpse/quan. `xname_flags` FOOD_CLASS (`:783–789`): owt ≤100 small / ≤300 medium / ≤500 large / else very large + `actualn`. `doname_base` (`:1288–1291`) skips article for CORPSE; FOOD_CLASS (`:1507–1523`) `corpse_xname(obj, prefix, CXN_ARTICLE|CXN_NOCORPSE)` then `Sprintf(prefix, "%s ", cxstr)` so bp stays xname’s bare `"corpse"`. EGG / MEAT_RING named.

Old JS: unique/pname live in `corpse_xname` (D-1234) but glob omitted; `doname` used `pretty_base` `"<mon> corpse"` plus a leading `"a "`/`"the "`.

The diff **does** glob `OBJ_NAME`, xname size prefixes, doname skip-article + rewrite prefix. It does **not** wire EGG / MEAT_RING / candle. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `corpse_xname` glob | C `:1848–1850`, `:1899–1900`, **new** | `objectNameStrs` ≡ `OBJ_NAME` |
| `pretty_base` globby | C `:783–789`, **new** | owt thresholds |
| `doname` CORPSE skip article | C `:1288–1291`, **wired** | was `"a "` |
| `doname` FOOD CORPSE `corpse_xname` | C `:1507–1523`, **wired** | prefix-as-adjective |
| `mungspaces_objnam` | C `mungspaces`, **already live** | now only in adjective arms |
| `an` / `just_an` | C, **imported live** | CXN_ARTICLE |
| `obj_pmname_corpse` / `s_suffix` | C, **already live** | D-1234 |
| EGG / MEAT_RING / candle | C `:1524–1538`, **named omit** | |
| `iflags.partly_eaten_hack` | C `:776–781`, **named omit** | shrink_glob `Yname2` |
| `xname` CORPSE still pretty_base | C xname omits type | doname overwrites; other callers named historically |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C doname CORPSE (`objnam.c:1288–1520`):

```
    } else if (obj->otyp == CORPSE) {
        /* skip article prefix */
        ;
    }
    ...
        if (obj->otyp == CORPSE) {
            unsigned cxarg = (((obj->quan != 1L) ? 0 : CXN_ARTICLE)
                              | CXN_NOCORPSE);
            cxstr = corpse_xname(obj, prefix, cxarg);
            Sprintf(prefix, "%s ", cxstr);
```

JS: `oname === 'CORPSE'` forces `base` to `"corpse"` / `"corpses"` (C xname is bare `"corpse"`; `pretty_base` still has the monster type for non-doname). Skip article when `quan===1`. After oeaten `"partly eaten "`, `prefix = corpse_xname(obj, prefix, cxarg) + ' '`. `bp = prefix + base`. Unique/pname: D-1234 already set `possessive` and `s_suffix`, so adjective sits after `"Medusa's"`. Ordinary newt: empty adjective → `an("newt")` + `" corpse"`. Match the claimed doname path.

Glob in `corpse_xname`: C `OBJ_NAME(objects[otyp])` is `"glob of <monster>"`. JS `objectNameStrs[obj.otyp]`. Skip unique/pname (glob branch is before `omndx`). Empty `if (glob)` instead of `" corpse"`. Quantity always 1. Match.

xname size: `owt <= 100/300/500` then `"small|medium|large|very large " + actualn`. Checked **before** the CORPSE pretty_base arm. `partly_eaten_hack` named. Match C FOOD_CLASS order (hack then globby then Concat actualn).

C `!adjective || !*adjective` vs JS `if (!adjective)`: empty string is falsy. Digit-leading adjective clears `any_prefix` only in the adjective arms (C same; this SHA moved `mungspaces` in). Match.

## Hallucinations / overclaim

Subject + D-1255 say unique/pname invent is possessive from `corpse_xname` and globs get size prefixes instead of `"a Medusa corpse"`. **Skip-article + prefix rewrite + glob size/`OBJ_NAME` are the hunk.** Stamping **Addressed:** D-1255 is fair. This is **not** “Match C dispatch, callee is a stub”: `corpse_xname` / `an` / `s_suffix` are live. Do **not** stamp “Match C doname EGG / MEAT_RING” or “Match C xname omits corpse type for every caller.” `pretty_base` CORPSE still names the monster for `xname`; doname no longer uses that string.

## Density

One `objnam.c` family: glob arm + xname size + the doname CXN wiring C uses for corpses. ~60 JS lines. Right size. Did not glue `launch_obj`.

## Branch-by-branch confirm

1. Newt corpse, identified, quan 1: `"a newt corpse"`. Match.
2. Medusa: `"Medusa's corpse"` (no `"a "`). Match.
3. Oracle cursed: `"the Oracle's cursed corpse"`. Match.
4. Partly eaten troll: adjective before mnam. Match.
5. Partly eaten Medusa: `"Medusa's … partly eaten corpse"`. Match.
6. Stack `quan!=1`: no `CXN_ARTICLE`; count prefix; `"corpses"`. Match.
7. Glob owt 50/200/400/600: small/medium/large/very large + `OBJ_NAME`. Match.
8. Glob `corpse_xname`: no `" corpse"` suffix. Match.
9. Tin / non-glob food: pretty_base unchanged. Match.
10. EGG still `"a yellow egg"` without species prefix: named omit. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **45**/45 (C glob/doname/xname thresholds; glob `OBJ_NAME` + size + doname; newt/ogre/troll ordinary unchanged; Medusa/Oracle/Wizard possessive doname; stack quan); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session shows a glob or unique/pname corpse in invent. Cadence this audit: full `sessions` at HEAD `466adf3e` **44**/44.

## Actionable C-wrongs

None for Must-fix. Doname unique/pname now goes through live `corpse_xname`; glob size is C’s owt table. Remaining FOOD_CLASS arms are named skips, not a prefix rewrite that still prints `"a Medusa corpse"`.

Named omits (map, not Must-fix):

1. doname EGG species / `(laid by you)` (`objnam.c:1524–1535`)
2. doname MEAT_RING `goto ring` (`:1536–1538`)
3. candle `partly used`; `iflags.partly_eaten_hack` shrink_glob
4. `xname` CORPSE still `pretty_base` `"<mon> corpse"` for non-doname callers

Do not Must-fix “JS `objectNameStrs` vs C `OBJ_NAME`.” Do not Must-fix “mungspaces only on adjective arms.”

## Callers / RNG ledger

C: `doname` / `cxname` / eatcorpse glob death reason. JS `doname` + `corpse_xname` export. No RNG. Public fortress is not evidence a Medusa corpse printed possessive.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unique/pname doname now takes the BUC/oeaten prefix as `corpse_xname` adjective, and globs get C’s size prefixes; EGG / MEAT_RING stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1255 `25a81ff1`.
