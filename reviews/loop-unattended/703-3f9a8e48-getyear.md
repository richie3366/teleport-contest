# Review 703 — 3f9a8e48 — calendar.c getyear 1900+tm_year (D-1742)

## Metadata
- Full / short hash: `3f9a8e48c8a7960201db39804e4375f2bf639236` / `3f9a8e48`
- Parent: `522aeec1` (D-1741). This file audits **this SHA only** (third of nine `js/` commits since review **700**). Archive **Addressed:** D-1742 `3f9a8e48`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:10:29 +0200
- D-id: **D-1742**
- Stats: `js/calendar.js` +11/−0. Total `js/` insertions **11** <250. Band **150–350**.
- Claims to close: Open `getyear` after D-1725 / review **686** (`hhmmss` live; year helper named). Not `doseduce`/`ld()`. Not dump_fmtstr. `reviews/loop-2026-08-15/` has no unpaid getyear Must-fix.
- JS / map: `calendar.js` `getyear`. `c-js-map/startup.md` calendar row.
- Prior: **686** named `getyear` / `mhitu.c` `ld()`.

## Intent vs deliverable

Git subject promises: civil year is `1900+getlt()->tm_year` with **no** `yyyymmdd` `tm_year<70` → +2000 fallback, instead of omitting the helper after D-1725.

`node scripts/csym.mjs getyear` → `calendar.c:48–52`. `--callers getyear`: **one** site, `mhitu.c:25` `#define ld()`. `getlt` `calendar.c:40–46`. `yyyymmdd` year arm `calendar.c:66–70`. `doseduce` uses `ld()` at `mhitu.c:2141` (not opened as a port this SHA).

```48:52:nethack-c/upstream/src/calendar.c
int
getyear(void)
{
    return (1900 + getlt()->tm_year);
}
```

```66:70:nethack-c/upstream/src/calendar.c
    if (lt->tm_year < 70)
        datenum = (long) lt->tm_year + 2000L;
    else
        datenum = (long) lt->tm_year + 1900L;
```

Parent: `getyear` NOT FOUND; `getlt().tm_year` already `year-1900`; `yyyy_from_tm` still has the `<70` +2000 arm for `yyyymmdd` / `yyyymmddhhmmss`. The diff **does** export `return 1900 + getlt().tm_year`. It **does not** wire `ld()` / `doseduce`. Named. It **does not** change tombstone `yyyymmdd(when)/10000` (`genl_outrip`). It **does not** add dump_fmtstr / paniclog files. Named (Rule #2).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getyear` | LIVE new export | C `:48–52` void; current stamp only |
| `getlt` | LIVE callee | same file; `tm_year = civil-1900` |
| `yyyy_from_tm` | LIVE (untouched) | still `<70` +2000 for yyyymmdd family |
| `yyyymmdd` / `hhmmss` / `yyyymmddhhmmss` | LIVE (untouched) | D-1710 / D-1725 |
| `ld()` / `doseduce` | OMIT named | sole C caller of `getyear` |
| dump_fmtstr / paniclog | OMIT named | Rule #2 files; not getyear callers |

`node scripts/sym.mjs`:

```
getyear          js/calendar.js:85   sync
getlt            js/calendar.js:55   sync
yyyymmdd         js/calendar.js:139   sync
hhmmss           js/calendar.js:152   sync
yyyymmddhhmmss   js/calendar.js:163   sync
```

No clone→import re-point. Same-file callee. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Body (`:48–52`).** C `1900 + getlt()->tm_year`. JS `return 1900 + getlt().tm_year` (`calendar.js:85–87`). `getlt` already returns POSIX `tm_year` (civil year minus 1900) from `game.datetime` slices — not `Date.getFullYear()`. So 2015 → `tm_year` 115 → `getyear` 2015. **Match.** No `date` argument (unlike `yyyymmdd`/`hhmmss`). **Match void.**

**No `<70` fallback.** C `yyyymmdd` documents “somebody's localtime supplies (year % 100)”. `getyear` **does not** share that arm. A `tm_year` of 69 is year **1969** here and **2069** in `yyyymmdd`. JS `getyear` skips `yyyy_from_tm`. D-log node canary: 1969 vs `yyyymmdd` 2069. **Match the split.** Do **not** “fix” `getyear` onto `yyyy_from_tm`.

**`getlt` vs `getnow`/`localtime`.** C `getlt` is `localtime(&getnow())` (`calendar.c:40–46`). JS `getlt` reads civil fields from the contest `YYYYMMDDHHMMSS` stamp (no host TZ). That is the existing calendar policy (review **686** / D-1710), not a new getyear divergence. `getyear` consumes that `tm_year` exactly as C consumes `getlt()->tm_year`.

**RNG.** None. No `rn2`/`rnd` in `getyear` or `getlt`.

**Caller (`mhitu.c:25`).** `#define ld() ((yyyymmdd((time_t) 0) - (getyear() * 10000L)) == 0xe5)` — `0xe5` is 229 = Feb 29 as `mmdd`. Sole C use: `doseduce` `mhitu.c:2141` `if (!(ld() && mon->female))`. Leap-day succubus/incubus. JS `mhitu.js` still names `doseduce` deferred. Exporting the helper without the `#define` is the same shape as D-1725 `hhmmss` without dump_fmtstr: **helper LIVE, gameplay caller OMIT named**. Not a stub inside `getyear`.

**Tombstone.** C `genl_outrip` uses `yyyymmdd(when)/10000`, not `getyear`. JS unchanged. Wiring tombstones to `getyear` would be a C-wrong.

**Callee closure (`getyear`).** LIVE: `getlt`. CLONE: none. OMIT named: `ld()`/`doseduce`; dump_fmtstr; paniclog. STUB: **none**. Review **686** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

**`yyyy_from_tm` stays.** JS `calendar.js:126–128` still `tm_year < 70 ? +2000 : +1900` for `yyyymmdd` / `yyyymmddhhmmss` only. `getyear` does not call it. A later “unify year helpers” peel would be a C-wrong. `lt_for_date` is unused by `getyear` (void; current stamp via `getlt` only).

**`dump_fmtstr`.** C `--callers getyear` is solely `mhitu.c:25`. `files.c` dump/panic formatters are not getyear callers in pinned C. Naming them as Rule #2 omits is still correct (do not `fopen`); they are not a stub inside this helper.

## Hallucinations / overclaim

Subject “civil year is 1900+tm_year, no yyyymmdd +2000”: **true**. D-log 1969 vs 2069 canary: **true**. Do **not** stamp “Match C `doseduce` / `ld()` 0xe5.” Do **not** stamp “Match C dump_fmtstr `%d`.” Do **not** stamp “Match C tombstone year via `getyear`” — C tombstone uses `yyyymmdd`. Journal “fortress held” is not a leap-day seduce proof. Helper **public-unhit**; canary is the arithmetic. Admit that.

**`getnow`.** C `getlt` calls `getnow()` then `localtime`. JS `getlt` does not call `getnow`; the stamp is `game.datetime`. Same as D-1710. `getyear` does not grow a parallel clock.

## Density

§2b: one C function; the body is four lines. +11. Playbook: below ~40 is a failed density handoff **unless C is that small**. It is. Did not glue `doseduce`. Did **not** reopen D-1725 `hhmmss` or D-1710 cemetery `when[]`.

## Verification

D-log: save-oracle skip (untagged `calendar.c:getyear`); node 10/10 (2015 year field; 1969 no +2000 vs yyyymmdd 2069; leap-day `0xe5`; non-leap 228); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. `doseduce` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the helper matches C; the one C caller is named). Named: `mhitu.c` `ld()` / `doseduce` (`:2141`); dump_fmtstr / paniclog. Do **not** route `getyear` through `yyyy_from_tm`. Do **not** add `getyear` #2. Do **not** `fopen` dump/panic files. Do **not** change tombstone year to `getyear`. Do **not** re-port D-1725 / D-1710.

**Export only.** `getyear` is exported for the future `ld()` port. Nothing in scored `js/` called it at this SHA. That is named caller debt, not a dead export to delete.

Do **not** delete the export to “clean unused.”

Verdict: **ACCEPT-WITH-DEBT**
