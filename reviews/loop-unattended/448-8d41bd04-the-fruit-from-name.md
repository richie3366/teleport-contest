# Review 448 — 8d41bd04 — objnam.c the() fruit_from_name + artifact_name (D-1487)

## Metadata
- Full / short hash: `8d41bd04d7607f333b9c02e3b6c57fa4f4ba13b1` / `8d41bd04`
- Parent: `9f784a5c` (D-1486). This file audits **this SHA only** (third of nine `js/` commits since review **445**). Archive **Addressed:** D-1487 `8d41bd04` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 17:20:36 +0200
- D-id: **D-1487**
- Stats: 9 files, +166 / −30 — `js/objnam.js` +85 / −6.
- Claims to close: Open `objnam.c` `the()` fruit_from_name + artifact_name (named from D-1357 / review **319**). Not CapitalMon. `reviews/loop-2026-08-15/` has no unpaid article Must-fix.
- JS / map: `objnam.js` `the` / `fruit_from_name` / local `artifact_name_objnam`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **319** named the fruit carve after CapitalMon.

## Intent vs deliverable

Git subject promises: “Match C objnam.c the() so a capitalized named fruit takes a definite article unless it collides with a pname artifact.”

Pinned C `the()` insert gate:

```2185:2193:nethack-c/upstream/src/objnam.c
    } else if (*str < 'A' || *str > 'Z'
               || CapitalMon(str)
               || (fruit_from_name(str, TRUE, (int *) 0)
                   && ((aname = artifact_name(str, (short *) 0, FALSE)) == 0
                       || strncmpi(aname, "the ", 4) == 0))) {
        insert_the = TRUE;
```

Callee `fruit_from_name` `:443–519`: exact `strcmp` then optional longest prefix (`!exact`); if still missing, `makesingular` even when exact; then prefix+singularize when `!exact`. Case-sensitive. `highest_fid` only when not found. Callee `artifact_name` `:329–353`: strip leading `"the "`, `artilist+1` until `!otyp`, `strcmpi` when `fuzzy=FALSE`.

Old JS after D-1357: lowercase / CapitalMon / last-sep / `" of "` / PYEC. Fruit conjunct commented as invent-cycle omit.

The diff **does** port `fruit_from_name` into `objnam.js` (C’s home) and wire the `||` short-circuit into `the()`. It **does** add a **local clone** of `artifact_name` (`artifact_name_objnam`) over `artilistRaw` so objnam does not import `artifact.js`. It **does not** port `fruit_from_indx` `:431`. Named. It **does not** rewire `options.js`’s exact-only fruit walker. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `the()` fruit disjunct | C `:2191–2193`, **wired this SHA** | exact TRUE; short-circuit |
| `fruit_from_name` | C `:443–519`, **C callee ported here** | not a stub |
| `makesingular` | C `objnam.c`, **already live** | used when first `strcmp` misses |
| `artifact_name_objnam` | C `artifact.c` `:329–353`, **clone** (fuzzy=FALSE subset) | invent cycle |
| `artifact_name` in `artifact.js` | C same, **already live elsewhere** | fuzzy stays there |
| `artilistRaw` | C `artilist[]`, **generated embed** | Rule #2 |
| `fruit_from_indx` | C `:431`, **named omit** | |
| `options.js` `fruit_from_name` | C `options.c` fruitadd walker, **pre-existing clone** | exact+count only |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Public fortress rarely names a capitalized player fruit via `the()`.

## C ↔ JS fidelity

`the()`: `c0` not A–Z **or** `CapitalMon` **or** (exact fruit **and** (no art **or** art name starts `"the "`)). JS assignment in the `&&` matches C `aname = artifact_name(...)`. Fruit is evaluated first; `artifact_name` does not run when there is no fruit. Match `:2191–2193`. Already-`the `, last-sep, `" of "`, PYEC unchanged from D-1357.

`fruit_from_name` first loop: `strcmp` return; else bump `highest_fid`. Match `:455–462`. `!exact` longest prefix: `strncmp(fname, k)` and next NUL or space. JS `name.slice(0,k)===f.fname && (!name[k]||name[k]===' ')`. Match `:467–476`. `if (!f)` `makesingular` then `strcmp` — **also when exact is TRUE** (C `:479–487`). the()’s `TRUE` still singularizes `"Apples"` → fruit `"Apple"`. Match. `!exact` prefix+singularize: `strchr` from index `k`, truncate, `makesingular`, keep longest. JS `indexOf(' ', k0)` then `slice(0,sp)`. Match `:488–516`. Case-sensitive. `the()` passes `null` for highest_fid.

`artifact_name_objnam` is a **clone**, not an import. For this caller `fuzzy=FALSE` / `otyp_p=NULL` it is the C loop: strip `"the "` on both sides, `strcmpi`, return stored `a->name`. Live `artifact.js` `artifact_name` does the same plus `otyp<0` skip and fuzzy. Clone starts at raw index 1 (C `artilist+1`); index 0 dummy has empty `name` and is skipped. Last raw row is Eye of Aethiopica (no extra sentinel with a colliding name). **Clone does not diverge from C `strcmpi` for this caller.** Hallucination check: “Match C `artifact_name`” while using a **local copy** is honest **if** the copy matches; it does for `FALSE`. Do not claim fuzzy/`otyp_p` moved into objnam.

Pname collision: fruit `"Excalibur"` + art `"Excalibur"` → aname not `"the …"` → do **not** insert. Fruit `"The Heart of Ahriman"` → aname starts `"The "` → insert. Match the C comment at `:2188–2190`. `"Apple"` fruit, no art: insert `"the Apple"`. `"Oracle"` already CapitalMon.

`options.js` still walks `ffruit` for exact fname+count. That is a **different clone** (no prefix/singular). C `fruitadd` uses objnam’s `fruit_from_name`. Named, not this SHA’s `the()` lie.

## Hallucinations / overclaim

Subject says a capitalized named fruit takes `"the "` unless it collides with a pname artifact. **True** for exact (and singularized) `ffruit` vs `strcmpi` arts. **False until named** for `fruit_from_indx` (slime/corpse fruit by `spe`) and for options fruitadd using the exact-only walker. Stamping **Addressed:** D-1487 for `:2191–2193` is fair. Do **not** stamp “Match C `fruit_from_indx`.” Do **not** treat fortress PASS as a `#name` fruit. The clone is **not** a no-op stub.

## Density

`the()` fruit conjunct plus the C callee it needed (`fruit_from_name`) plus the cycle-breaking `strcmpi` clone. ~80 JS lines. Playbook §2b. Did not glue `doinvoke`. Acceptable.

## Branch-by-branch confirm

1. Fruit `"Apple"`: insert `"the Apple"`. **Match `:2191–2195`.**
2. Fruit `"Magic Banana"` / `"Green-Apple"`: exact strcmp, insert. **Match.**
3. Fruit `"Apples"` with fname `"Apple"`: exact still `makesingular`. **Match `:479–484`.**
4. Fruit `"Excalibur"` / `"Sting"`: art pname, bare. **Match `:2192–2193`.**
5. Fruit `"The Heart of Ahriman"`: art name has `"the "`, insert. **Match.**
6. `"Oracle"` / `"Medusa"`: CapitalMon path unchanged (D-1357).
7. `"Amulet of Yendor"` / PYEC: later arms unchanged.
8. Prefix match: `the()` passes exact TRUE, so prefix loops do not run. **Match.**
9. `fruit_from_indx` still absent. Named.
10. options fruitadd walker unchanged. Named.
11. **Public-unhit** unless a session `the()`s a capitalized fruit.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed gates. `artilistRaw` is generated embed. Plain ESM. Clone is not a filesystem read.

## Verification

Journal: private canary **29**/29 (C/JS grep; Rule #2; fruit Apple/`Magic Banana`/`Green-Apple`/`Medusa` take `"the "`; Excalibur/Sting pname arts stay bare; `"The "` arts still take `"the "`; exact no prefix; singular Apples; CapitalMon/Medusa/of/PYEC regressions); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None in the `the()` fruit conjunct or in `fruit_from_name` vs `:443–519`. The artifact clone matches C `fuzzy=FALSE`.

Named omits (map / Open, not Must-fix):

1. `objnam.c` `fruit_from_indx`
2. `options.c` fruitadd should call objnam `fruit_from_name` (not the exact-only walker)

Do not Must-fix “clone is a stub” (it strcmpi’s the list). Do not Must-fix “prefix should run from `the()`” (C passes TRUE). Do not Must-fix “CapitalMon should have shipped here.”

## Callers / RNG ledger

C `the()` is the only new caller of this conjunct. JS `the()` same. `fruit_from_name` is now exported for later fruitadd/`fruit_from_indx` work. No dice.

Verdict: **ACCEPT-WITH-DEBT**
