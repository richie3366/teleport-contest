# Review 641 — c8309c01 — do_name.c oname via_naming livelog (D-1680)

## Metadata
- Full / short hash: `c8309c0146d3456e0de614751d7be557e4446aa9` / `c8309c01`
- Parent: `1b08a2d9` (D-1679). This file audits **this SHA only** (sixth of nine `js/` commits since review **635**). Archive **Addressed:** D-1680 `c8309c01`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 20:28:01 +0200
- D-id: **D-1680**
- Stats: `js/do_name.js` +59/−14. Total `js/` insertions **59** <250. Band **150–350**.
- Claims to close: Open `oname` via_naming livelog after D-1670. Not wield `restrict_name`. Not `'i'` live getobj. `reviews/loop-2026-08-15/` has no unpaid oname-livelog Must-fix.
- JS / map: `do_name.js` `oname`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **631** named oname livelog / wield restrict.

## Intent vs deliverable

Git subject promises: naming Sting/Orcrist via `do_oname` writes the literate/artifact livelog and updates wield/shop/inventory, instead of voiding `ONAME_VIA_NAMING` after D-1670.

Pinned C `oname` `:371–426` (`node scripts/csym.mjs oname`). `--callers` include `do_oname` `:367` `ONAME_VIA_NAMING | ONAME_KNOW_ARTI`. `untwoweapon` `:905–914`. `new_oname` `:60–77`. `carried` `obj.h:332` ≡ `OBJ_INVENT`.

```394:425:nethack-c/upstream/src/do_name.c
    if (lth)
        artifact_exists(obj, name, TRUE, oflgs);
    if (obj->oartifact) {
        if (obj == uswapwep)
            untwoweapon();
        if (obj == uwep)
            set_artifact_intrinsic(obj, TRUE, W_WEP);
        if (obj->unpaid)
            alter_cost(obj, 0L);
        if (via_naming) {
            if (!u.uconduct.literate++)
                livelog_printf(LL_CONDUCT | LL_ARTIFACT,
                               "became literate by naming %s",
                               bare_artifactname(obj));
            else
                livelog_printf(LL_ARTIFACT,
                               "chose %s to be named \"%s\"",
                               ansimpleoname(obj), bare_artifactname(obj));
        }
    }
    if (carried(obj) && !skip_inv_update)
        update_inventory();
```

Old JS: `void (oflgs & ONAME_VIA_NAMING)` after `artifact_exists`. The diff **does** via_naming flags, `new_oname`, uswapwep `set_twoweap(false)`+`update_inventory`, uwep intrinsic, unpaid `alter_cost`, literate++ livelog, `OBJ_INVENT` && !SKIP_INVUPD `update_inventory`. It **does not** call async `untwoweapon` (no `You("can no longer…")`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `oname` | C `:371–426`, **LIVE this SHA** | export; stays **sync** |
| `new_oname` | C `:60–77`, **LIVE** | already present |
| `exist_artifact` / `artifact_exists` | **LIVE** | D-1670 path |
| `set_twoweap` | C inside `untwoweapon`, **LIVE** | inlined; `You()` OMIT |
| `untwoweapon` | C `:905–914`, **OMIT named** (message) | JS function is async + defers invent |
| `set_artifact_intrinsic` | **LIVE** | |
| `alter_cost` | **LIVE** | shk.js |
| `livelog_printf` | **LIVE** | |
| `bare_artifactname` / `ansimpleoname` | **LIVE** | |
| `update_inventory` | **LIVE** | |
| wield `restrict_name` | **OMIT named** | `do_oname` slip is D-1670 |

RNG: none in `oname` (wipeout RNG is `do_oname`, D-1670). No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
oname            js/do_name.js:928   sync
new_oname        js/do_name.js:1045   sync
set_twoweap      js/wield.js:1007   sync
untwoweapon      js/wield.js:1091   ASYNC — await required
alter_cost       js/shk.js:675   sync
livelog_printf   js/pline.js:23   sync
bare_artifactname js/artifact.js:455   sync
ansimpleoname    js/objnam.js:1961   sync
set_artifact_intrinsic js/artifact.js:616   sync
exist_artifact   js/artifact.js:787   sync
```

`--can do_name.js shk.js alter_cost`: **ALREADY**. `--can do_name.js pline.js livelog_printf`: **ALREADY**. `--can do_name.js wield.js set_twoweap`: **ALREADY**. `set_twoweap` is a hoisted `function`. Do **not** `await` `oname`. Do **not** pull async `untwoweapon` into the sync function.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Flags / truncate / exist.** C `via_naming` / `skip_inv_update`; `lth = strlen+1` cap `PL_PSIZ`; `oartifact || (lth && exist_artifact)` return. JS slice then `n && exist_artifact`. **Match `:379–393`.**

**`new_oname` + `artifact_exists`.** C always `new_oname` then copy if `lth` then `artifact_exists` if `lth`. JS the same (`oextra.oname = n`). **Match `:395–400`.**

**Artifact aftermath.** C `uswapwep` → `untwoweapon` (if `twoweap`: You, `set_twoweap(FALSE)`, `update_inventory`). JS `uswapwep && twoweap` → `set_twoweap(false)` + `update_inventory` **without** You (named; `oname` is sync). uwep `set_artifact_intrinsic(..., W_WEP)`. unpaid `alter_cost(obj, 0)`. **Match state; message named omit.** Inlining is better than JS `untwoweapon`, which still comments `update_inventory` deferred.

**Literate livelog.** C `if (!literate++)` first `LL_CONDUCT|LL_ARTIFACT` else `LL_ARTIFACT` chose-named. JS `first = !literate` then `++`. Strings match. **Match `:411–421`.**

**Inventory.** C `carried(obj) && !skip_inv_update`. JS `where === OBJ_INVENT`. **Match `obj.h:332`.**

Callee closure. LIVE: `new_oname`, `exist_artifact`, `artifact_exists`, `set_artifact_intrinsic`, `alter_cost`, `livelog_printf`, `bare_artifactname`, `ansimpleoname`, `set_twoweap`, `update_inventory`. CLONE: none. OMIT named: `untwoweapon` You(); wield `restrict_name`. STUB: **none** in the live via_naming arm. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “literate/artifact livelog and updates wield/shop/inventory”: **true** for via_naming Sting/Orcrist. Do **not** stamp “Match C `You(can_no_longer_twoweap)`.” Do **not** stamp “Match C wield `restrict_name`.” Do **not** stamp “called `untwoweapon`.” Do **not** make `oname` async. Private canary (first-literate / chose-named / exist_artifact block / SKIP_INVUPD still logs) is the right split. Public-unhit for naming Sting.

## Density

+59: one `oname` aftermath cluster. §2b. Did not glue `'i'` getobj.

## Verification

Wired: via_naming literate; uwep intrinsic; unpaid cost; invent update; uswapwep twoweap off. Unwired C: dual-wield pline. Conf: no RNG. No seed gate.

Journal: private canary; green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `untwoweapon` You(); wield `restrict_name`. Do **not** `await oname`. Do **not** restore `void (ONAME_VIA_NAMING)`. Do **not** add `oname` clone. Do **not** re-port `do_oname` slip (D-1670).

Verdict: **ACCEPT-WITH-DEBT**
