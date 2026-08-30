# Review 671 — b5cb56e6 — calendar.c yyyymmddhhmmss cemetery when[] (D-1710)

## Metadata
- Full / short hash: `b5cb56e670cae0109d9d2e5967f0efeffb639e64` / `b5cb56e6`
- Parent: `2353e6fb` (D-1709). This file audits **this SHA only** (third of nine `js/` commits since review **668**). Archive **Addressed:** D-1710 `b5cb56e6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 05:48:35 +0200
- D-id: **D-1710**
- Stats: `js/calendar.js` +58/−4; `js/end.js` +28/−16; `js/topten.js` +2/−1; `js/dungeon.js` comment. Total `js/` insertions **72** <250. Band **150–350**.
- Claims to close: Open cemetery `when[]` = `yyyymmddhhmmss(endtime)`, not leftover JSON/`''`. Not `hhmmss`. Not DRAWBRIDGE_UP lastseentyp. `reviews/loop-2026-08-15/` has no unpaid calendar Must-fix.
- JS / map: `calendar.js` `yyyymmddhhmmss` / date-aware `yyyymmdd`; `end.js` `really_done`/`savebones`; `c-js-map/startup.md` calendar row.
- Prior reviews this SHA claims to close: none written; map-driven after **656** leftover named `when[]`.

## Intent vs deliverable

Git subject promises: cemetery `when[]` is the 14-digit death stamp, instead of an empty leftover JSON date.

`node scripts/csym.mjs yyyymmddhhmmss` → `calendar.c:94–117`. `--callers`: `bones.c:586`; `end.c:563`/` :567` dump; `options.c:9688`; `save.c:288`/` :290` ubirthday/start_timing. `yyyymmdd` `:55–77` (`--callers` include `topten.c:695–696` birth/death; `rip.c:138`). `hhmmss` `:79–92` — **not** this peel. `getnow` `:31–38`. `--callers getnow` include `end.c:1164`. `savebones` `bones.c:402–625` (`--callers` `end.c:1365`). `really_done` `:1161–1168` one `getnow` then `:1365` / `:1394` `outrip` / topten.

```94:114:nethack-c/upstream/src/calendar.c
char *
yyyymmddhhmmss(time_t date)
{
    ...
    if (date == 0)
        lt = getlt();
    else
        lt = localtime((LOCALTIME_type) &date);
    if (lt->tm_year < 70)
        datenum = (long) lt->tm_year + 2000L;
    else
        datenum = (long) lt->tm_year + 1900L;
    Snprintf(datestr, sizeof datestr, "%04ld%02d%02d%02d%02d%02d",
             datenum, lt->tm_mon + 1,
             lt->tm_mday, lt->tm_hour, lt->tm_min, lt->tm_sec);
```

```1161:1168:nethack-c/upstream/src/end.c
    urealtime.finish_time = endtime = getnow();
    urealtime.realtime += timet_delta(endtime, urealtime.start_timing);
    iflags.at_night = night();
    iflags.at_midnight = midnight();
```

```585:586:nethack-c/upstream/src/bones.c
    formatkiller(newbones->how, sizeof newbones->how, how, TRUE);
    Strcpy(newbones->when, yyyymmddhhmmss(when));
```

Parent: `when: '' // yyyymmddhhmmss named`; `yyyymmdd` `void date` always `getlt()`; `at_night` collected late via dynamic `import('./calendar.js')` only when `how !== PANICKED`. The diff **does** add `yyyymmddhhmmss`; share `lt_for_date` / `yyyy_from_tm` with `yyyymmdd`; one `getnow()`; `savebones(how, when, corpse)`; pass `endtime` to rip/topten. It **does not** port `hhmmss`. Named. It **does not** print `when[]` on `#overview` (C `print_mapseen` who/how). It **does not** write dump_everything / `save.c` ubirthday stamps. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `yyyymmddhhmmss` | LIVE new export | C `:94–117`; cemetery caller |
| `yyyymmdd` | LIVE repaired | now honors `date!=0` like C `:61–64` |
| `lt_for_date` | CLONE | C `date==0?getlt():localtime`; contest UTC-4 inverse of `time_from_*` |
| `yyyy_from_tm` | CLONE | C `tm_year<70 ? +2000 : +1900` |
| `hhmmss` | OMIT named | NOT FOUND |
| `getnow` / `getlt` / `night` / `midnight` | LIVE | already; static import replaces dynamic |
| `savebones` | LIVE local in `end.js` | arity now matches C `(how, when, corpse)`. Do **not** add `bones.js` #2 |
| `topten` deathdate | LIVE | `yyyymmdd(when)`; birthdate still `yyyymmdd(0)` not `ubirthday` |
| dump / `ubirthday` / `urealtime` Sfo | OMIT named | |

`node scripts/sym.mjs`:

```
yyyymmddhhmmss   js/calendar.js:140   sync
yyyymmdd         js/calendar.js:128   sync
hhmmss           NOT FOUND
getnow           js/calendar.js:41   sync
getlt            js/calendar.js:55   sync
time_from_yyyymmddhhmmss js/calendar.js:31   sync
savebones        NOT EXPORTED — 1 LOCAL in js/end.js:868
topten           js/topten.js:316   sync
genl_outrip_lines js/rip.js:50   sync
lt_for_date      NOT EXPORTED — 1 LOCAL in js/calendar.js:100
```

Re-points: `end.js` dropped dynamic `import('./calendar.js')`; added static `{ night, midnight, getnow, yyyymmddhhmmss }`. `--can js/end.js js/calendar.js yyyymmddhhmmss` / `getnow`: **ALREADY**. `calendar.js` does not import `end.js`. No top-level TDZ read. Do **not** add `hhmmss` #1 in a later peel without C `:79–92`. Do **not** add `savebones` in `bones.js`. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Stamp format.** C static `datestr[15]` `"%04ld%02d%02d%02d%02d%02d"` → 14 chars + NUL (`rm.h` `when[15]`). JS concatenates `padStart(4)` year + `pad2` mon+1/day/hour/min/sec. Year split `<70` **Match `:107–111`.** No RNG.

**date==0 vs localtime.** C `date==0` → `getlt()`; else `localtime(&date)`. JS `if (!date) return getlt()`; else invert contest UTC-4: `(date - 4*3600)*1000` then `getUTC*`. That invert is the reverse of existing `time_from_yyyymmddhhmmss` (`Date.UTC(...) / 1000 + 4*3600`), not host `localtime`. Contest `getnow` already returns that unix. Roundtrip `yyyymmddhhmmss(getnow())` recovers `game.datetime`. **Match C control flow; match this repo’s contest time, not POSIX TZ.** Do **not** call this “Match C `localtime`.”

**One getnow.** C `:1164` before disclosure/bones so bones, rip, and topten share one `time_t`. JS `really_done` `:660` the same, then `savebones(how, endtime, corpse)`, `genl_outrip_lines(..., endtime)`, `topten(how, endtime, ...)`. **Match `:1365` arity.** C also `urealtime.finish_time` + `timet_delta`. JS does **not**. Named `urealtime`. C `dump_open_log(endtime)` DUMPLOG. JS has no dump. Named.

**at_night.** C `:1167–1168` unconditional after `getnow` (including PANICKED). Parent JS only set them inside `how !== PANICKED`. This SHA moves them with `getnow`. **Match C order.** `night()`/`midnight()` LIVE.

**Cemetery field.** C `Strcpy(newbones->when, yyyymmddhhmmss(when))`. JS `when: yyyymmddhhmmss(when)` instead of `''`. JSON persist was D-1685. **Match `:586`.** Overview still who/how (D-1659). Do **not** print the stamp on `#overview`.

**yyyymmdd(date).** Parent ignored `date`. C `:61–64` same gate as the 14-digit helper. Rip year `rip.c:138` and topten deathdate now see `endtime`. For contest datetime, invert ≡ `getlt()`, so public tombstone year should not move. Birthdate remains `yyyymmdd(0)` vs C `yyyymmdd(ubirthday)` (`topten.c:695`). **Named ubirthday**, pre-existing, not this cluster’s C-wrong.

**Callee closure (`savebones` when[] arm).** LIVE: `yyyymmddhhmmss`, `getnow`, `formatkiller` (already). CLONE: `lt_for_date` / `yyyy_from_tm`. OMIT named: `hhmmss`; dump; `ubirthday` Sfo; `urealtime`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “14-digit death stamp instead of empty leftover JSON date”: **true** for `savebones`. D-log “do not print `when[]` on `#overview`”: **true** (comment-only `dungeon.js`). Do **not** stamp “Match C `hhmmss`.” Do **not** stamp “Match C `yyyymmdd(ubirthday)` birthdate.” Do **not** stamp “Match C `localtime` TZ.” Do **not** stamp “Match C `urealtime.finish_time`.” Journal “fortress held” is not a stamp-format proof. The topten comment now says deathdate uses `when`; the **body** does (`:362`). Birthdate line was not silently claimed as fixed.

## Density

§2b: one calendar stamp family (`yyyymmddhhmmss` + the shared date gate on `yyyymmdd`) + the `really_done` one-`getnow` plumbing that C requires for `when[]`. Related. +72. `hhmmss` left named (sibling, not glued).

## Verification

D-log / journal: save-oracle skip (untagged `calendar.c:yyyymmddhhmmss` / `bones.c:savebones`); roundtrip smoke; focused seed0006/0007/5006; green+strict; cohort 7/7. Public death/rip **is** hit; cemetery `when[]` on a later `#overview` of **bones** **public-unhit**. Admit that. Smoke is the 14-digit check.

## Actionable C-wrongs

None for Must-fix. Named: `hhmmss`; `yyyymmdd(ubirthday)` topten birthdate; `urealtime.finish_time`/`timet_delta`; dump_everything `end.c:563–567`; `save.c` ubirthday/start_timing Sfo; DRAWBRIDGE_UP lastseentyp (next Open). Do **not** add `hhmmss` as a clone of `yyyymmddhhmmss` slice. Do **not** add `savebones` #2 in `bones.js`. Do **not** restore `when: ''`. Do **not** print cemetery time on `#overview`. Do **not** restore `void date` on `yyyymmdd`.

Verdict: **ACCEPT-WITH-DEBT**
