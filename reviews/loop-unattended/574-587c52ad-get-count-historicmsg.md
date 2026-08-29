# Review 574 — 587c52ad — cmd.c get_count historicmsg (D-1613)

## Metadata
- Full / short hash: `587c52adbc1b643ed16dd2d988bd133d0d1e2d5d` / `587c52ad`
- Parent: `7012e194` (D-1612). This file audits **this SHA only** (second of nine `js/` commits since review **572**). Archive **Addressed:** D-1613 `587c52ad`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 02:35:36 +0200
- D-id: **D-1613**
- Stats: `js/cmd.js` +95/−33, `js/invent.js` +10/−60, `js/display.js` +1/−1. Band **150–350** (js/ insertions **106**).
- Claims to close: Open get_count historicmsg after D-1588 / D-1612. Not putmsghistory body. `reviews/loop-2026-08-15/` has no unpaid get_count Must-fix.
- JS / map: `cmd.js` `get_count`; `invent.js` `getobj_take_count`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **549** named `cmd.c:5086` Count; **491** named unify `cmd.js` `get_count` + `getobj_get_count` and `GC_SAVEHIST` hist; **572** / **573** named get_count historicmsg.

## Intent vs deliverable

Git subject promises: `GC_SAVEHIST` / `GC_CONDHIST` put `"Count: N "` plus `key2txt` into `putmsghistory` like C, instead of omitting the history ring.

Pinned C `cmd.c` `get_count` `:5009–5090`. Flags `hack.h` `:1384–1388`. Callers (`node scripts/csym.mjs --callers get_count`): `parse` `:5118` `GC_NOFLAGS`; `invent.c` getobj `:1944` `GC_SAVEHIST`; `adjust_split` `:5031` `GC_ECHOFIRST|GC_CONDHIST` (comment `:5034`). Callees `AppendLongDigit` (`integer.h:120–124`), `key2txt` (`cmd.c:3224–3240`), `putmsghistory` (D-1588).

```5082:5089:nethack-c/upstream/src/cmd.c
    if (historicmsg || (conditionalmsg && *count != first)) {
        Sprintf(qbuf, "Count: %ld ", *count);
        (void) key2txt((uchar) key, eos(qbuf));
        putmsghistory(qbuf, FALSE);
    }

    return key;
```

Old JS: parse-local `get_count` (no inkey, cap **500**, wrote `command_count` internally) and invent `getobj_get_count` clone (inkey, `LARGEST_INT`, echo only). Neither called `putmsghistory`. C has **one** function.

The diff **does** export one `get_count` with C’s five arguments, `AppendLongDigit` + `maxcount` clamp, echo when `cnt>9||backspaced||echoalways`, historicmsg tail via live `putmsghistory`/`key2txt`, parse `GC_NOFLAGS` out-param, getobj `GC_SAVEHIST` deleting `getobj_get_count`. It **does not** wire `adjust_split`, `custompline(SUPPRESS_HISTORY)`, altmeta `input_state`, or num_pad `NHKF_COUNT`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `get_count` | C `:5009–5090`, **LIVE this SHA** | one export; parse + getobj |
| `append_long_digit` (`cmd.js`) | C macro, **CLONE this SHA** | `MAX_SAFE_INTEGER`; cap 32767 on wired callers |
| `append_long_digit` (`invent.js:1620`) | **CLONE pre-existing** | do not write #3 |
| `getobj_take_count` | C getobj `:1937–1948`, **LIVE** | now imports `get_count` |
| `getobj_get_count` | **deleted** | re-pointed to `cmd.js` |
| `putmsghistory` | C topl.c, **LIVE** | D-1588; `FALSE` |
| `key2txt` | C `cmd.c:3224`, **LIVE** | `dokeylist.js` export |
| `parse` / rhack | C `:5118` `GC_NOFLAGS`, **LIVE** | must not hist |
| `adjust_split` caller | C `:5031`, **OMIT named** | Open row |
| `custompline` echo | C `:5078`, **OMIT named** | `_pending_message` stand-in |
| altmeta `input_state` | C `:5040` / `:5111–5116`, **OMIT named** | |
| num_pad `NHKF_COUNT` | C `:5110`, **OMIT named** | |
| `restore_msghistory` | C restore, **OMIT named** | next Open at the time |

`node scripts/csym.mjs get_count` → `:5009-5090`. `--callers` as above.

RNG: none. No seed gate.

`node scripts/sym.mjs` on deleted / re-pointed / new names:

```
get_count        js/cmd.js:1643   ASYNC — await required
getobj_get_count NOT FOUND in js/** (deleted; do not add a local clone)
getobj_take_count js/invent.js:4859   ASYNC — await required
append_long_digit NOT EXPORTED — 2 LOCAL CLONES: js/cmd.js:1610  js/invent.js:1620
putmsghistory    js/display.js:1450   sync
key2txt          js/dokeylist.js:58   sync  (+ pager.js:1593 local clone, pre-existing)
visctrl          js/dokeylist.js:40   sync
```

`--can invent.js cmd.js get_count`: ALREADY. `--can cmd.js display.js putmsghistory`: ALREADY. `--can cmd.js dokeylist.js key2txt`: ALREADY. New `invent.js` → `cmd.js` edge is function-body only (`getobj_take_count`); `cmd.js` already imported invent command fns. Cycle is the existing SCC, not a top-level TDZ read. Do **not** stamp “cycle-forced clone” for keeping `getobj_get_count`. Do **not** add `get_count` #2. Do **not** add `append_long_digit` #3. Do **not** add `putmsghistory` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Signature. `allowchars`, `inkey`, `maxcount`, `*count`, `gc_flags`. JS `countOut` box. **Match `:5010–5016`.** `first = inkey ? inkey-'0' : 0`. **Match `:5019`.** Flags `historicmsg`/`conditionalmsg`/`echoalways` from `GC_SAVEHIST`/`GC_CONDHIST`/`GC_ECHOFIRST` (`1`/`2`/`4`). **Match `hack.h:1384–1388`.**

Digit / overflow / cap. `AppendLongDigit` then `cnt<0` → 0 else `maxcount>0 && cnt>maxcount` → maxcount. Wired callers pass `LARGEST_INT` **32767** (`global.h:135`). Old parse cap **500** was a C-wrong; this SHA uses C’s max. **Match `:5044–5052`.**

Backspace / ESC / terminator. Empty backspace without `echoalways` breaks with `*count` still 0. ESC breaks, `*count` 0. Else `!allowchars || strchr` sets `*count=cnt` and breaks. JS `8`/`127` ≡ C `\b`/`STANDBY_erase_char`. **Match `:5056–5068`.** `*count` is **not** written on ESC / empty-bs. parse then copies the box. **Match.**

Echo. `cnt>9 \|\| backspaced \|\| echoalways`: clear + `"Count: "` vs `"Count: %ld"` and clear `backspaced` in the else. JS `_pending_message` not `custompline(SUPPRESS_HISTORY)`. Named vs `:5071–5079`. First digit alone still silent unless `GC_ECHOFIRST`. **Match the predicate.**

Historicmsg tail. `GC_SAVEHIST` always; `GC_CONDHIST` iff `*count != first`. Format `"Count: N "` + `key2txt`. `putmsghistory(..., FALSE)`. parse `GC_NOFLAGS` skips the tail. **Match `:5082–5086`.** JS `key2txt` takes the numeric key (`& 0xff`); C `uchar`. Space / ESC / enter / del strings match C `:3228–3236`.

getobj. `get_count(NULL, ilet, LARGEST_INT, &tmpcnt, GC_SAVEHIST)` then `if (tmpcnt) cntgiven`. JS `box.n !== 0`. **Match `:1944–1948`.** Clone retired.

`adjust_split`. C `:5031` `maxcount 0L` (no clamp) + `GC_ECHOFIRST|GC_CONDHIST`. Unwired. Named. Implementing the flags inside `get_count` without this caller is not “dispatch stubbed”: the live parse/getobj arms’ callees are LIVE.

Callee closure (historicmsg arm). LIVE: `putmsghistory`, `key2txt`. CLONE: `append_long_digit` (overflow unreachable under 32767). STUB: none. OMIT named: `adjust_split`, custompline, altmeta, num_pad. Arm may ship.

## Hallucinations / overclaim

Subject getobj counts enter the ^P ring: **true** (`GC_SAVEHIST`). D-log “parse uses `GC_NOFLAGS` and must not”: **true.** Do **not** stamp “Match C `adjust_split` `GC_ECHOFIRST|GC_CONDHIST` (`:5031`).” Do **not** stamp “Match C `custompline(SUPPRESS_HISTORY)`.” Do **not** stamp “Match C altmeta / num_pad `NHKF_COUNT`.” Do **not** stamp “Match C `restore_msghistory`.” Do **not** stamp “Match C `AppendLongDigit` LONG_MAX” (`MAX_SAFE_INTEGER` clone; unused at 32767). Public getobj-count ^P is unhit.

## Density

One C `get_count` plus retiring the getobj clone. +106 JS. Did not glue restore_msghistory or `adjust_split`. §2b OK.

## Branch-by-branch confirm

1. parse digits, `GC_NOFLAGS`: out-param count, no `putmsghistory`, cap 32767. **Match.**
2. getobj first digit inkey, `GC_SAVEHIST`: hist `"Count: N "+key2txt`. **Match.**
3. ESC / empty backspace: `*count` 0, getobj still hist. **Match.**
4. `GC_CONDHIST` && count==first: skip hist. Implemented; caller **named.**
5. `GC_ECHOFIRST` first-digit echo. Implemented; caller **named.**
6. custompline / altmeta / num_pad. **Named.**

## Callers / RNG ledger

Wired: rhack/parse, `getobj_take_count`. Unwired C: `adjust_split`. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore `getobj_get_count`. Do not put parse on `GC_SAVEHIST`. Do not add `append_long_digit` #3. Do not skip painting spaces. putmsghistory body is D-1588.

## Verification

D-log private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the new ring line (sessions do not ^P after a getobj count). Fortress command-count digits do not prove `GC_SAVEHIST`. `adjust_split` / restore_msghistory unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `invent.c` `adjust_split` `:5031` `GC_ECHOFIRST|GC_CONDHIST`; `custompline(SUPPRESS_HISTORY)` echo; altmeta `input_state`; num_pad `NHKF_COUNT`; `restore_msghistory`; `append_long_digit` clone #2 vs C one macro. Do not add `get_count` in `invent.js`. Do not hist on parse.

Verdict: **ACCEPT-WITH-DEBT**
