# Review 774 — 3ff0752d — cmd.c yn_function fuzzer RNG / mismatch / otherInp (D-1805)

## Metadata
- Full / short hash: `3ff0752d6851b21b9e4b4372b7775199b3854195` / `3ff0752d`
- Parent: `fa5f3acc` (D-1804 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 04:09:40 +0200
- D-id: **D-1805**
- Stats: `js/getline.js` +46/−9; `js/const.js` +11. `js/` insertions **57** ≤250. Band **80–350**.
- Claims to close: Open `cmd.c` `yn_function` remaining body including RNG arms. Not `getlin`.
- JS / map: `getline.js` `yn_function`; `const.js` `InputState` + `debug_fuzzer_states`. `c-js-map/turns.md`. Archive **Addressed:** D-1805 `3ff0752d` (hash filled this audit).

## Intent vs deliverable

Git subject promises: Match C `cmd.c` `yn_function` so `debug_fuzzer` `rn2(20)` / `rn2(ln)` / ESC retry, mismatch `impossible`, and `input_state=otherInp` actually run, instead of skipping the fuzzer arm and silently remapping.

`node scripts/csym.mjs yn_function` → `cmd.c:5470–5583`. Fuzzer `:5513–5530`. Mismatch `:5559–5579`. `otherInp` `:5581`. `hack.h` `enum InputState` `:826–831`. `flag.h` `debug_fuzzer_states` `:239–243`. `visctrl` `hacklib.c:468–493`.

Parent already had cmdq / menu / tty. The diff **does** add the fuzzer arm, TEMP `fuzzer_impossible_continue` around `impossible`, and `program_state.input_state = otherInp`. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `yn_function` | LIVE repaired | remaining USER_INPUT + mismatch + otherInp |
| `rn2` | LIVE | rng.js |
| `visctrl` | LIVE | dokeylist.js; this SHA re-points mismatch through it |
| `impossible` | LIVE | display.js |
| `yn_function_menu` / `tty_yn_function` | LIVE | D-1728 / windowport |
| `otherInp` / `commandInp` / `getposInp` / `getdirInp` | LIVE new | hack.h 0..3 |
| `fuzzer_off` / `fuzzer_impossible_panic` / `fuzzer_impossible_continue` | LIVE new | flag.h 0..2 |
| SND_SPEECH `sound_speak` | OMIT named | `#ifdef` compiled out |
| DUMPLOG_CORE | OMIT named | D-1776 |
| `paniclog` file | OMIT named | Rule #2; truncate + mismatch still run |
| getdir fuzzer | OMIT named | next Open, not this function |

`node scripts/sym.mjs` (re-pointed / new):

```
yn_function                  js/getline.js:1559   ASYNC
visctrl                      js/dokeylist.js:42   sync
otherInp                     js/const.js:547
fuzzer_impossible_continue   js/const.js:1143
fuzzer_off                   js/const.js:1141
commandInp                   js/const.js:548
getdirInp                    js/const.js:550
```

`--can getline.js` rng `rn2` / dokeylist `visctrl` / display `impossible` / const `otherInp`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Fuzzer (`:5513–5530`).** Else-if on `CMDQ_USER_INPUT`: `iflags.debug_fuzzer && resp && *resp && rn2(20)` then `ln=strlen(resp)`, `ridx=rn2(ln)`, `res=resp[ridx]`. ESC + `ln>1`: `ridx==(0) ? 1+rn2(ln-1) : rn2(ridx)` (no `rn2(0)`). ESC + `ln==1`: `res=def`. **Match call-for-call.** `debug_fuzzer==0` (`fuzzer_off`) short-circuits before `rn2` — public sessions do not draw.

**Windowport else.** C `#ifdef SND_SPEECH` compiled out, then `yn_function_menu` else `win_yn_function`. JS menu then `tty_yn_function`. **Match live path.**

**Mismatch (`:5559–5579`).** After REPEAT record: `resp && *resp && res && !strchr(resp,res)` → `altres = def ? def : ESC`. `if (!in_doagain || wizard)`: save fuzzer, set `fuzzer_impossible_continue`, `impossible` with `visctrl`, restore. Always `res=altres`. JS `String(resp).includes(res)`; `visctrl(res.charCodeAt(0))` ≡ C `visctrl((uchar)res)`. **Match.** C `paniclog("yn debug", …)` file **OMIT named** (Rule #2) — `impossible` still runs.

**`input_state` (`:5581`).** Always `otherInp` (0). JS writes `game.program_state.input_state`. getdir/readchar/getpos writers of the other enum values are **not** this peel (`getdirInp` exported, getdir fuzzer named next Open).

**Callee closure.** `rn2`/`visctrl`/`impossible`/`cmdq_*`/`yn_function_menu` LIVE. `paniclog`/`sound_speak`/`dumplogmsg` **OMIT named**. No STUB in a shipped live arm.

## Hallucinations / overclaim

Subject is **true**. Do **not** stamp “Match C `getdir` fuzzer” or “Match C `paniclog` file.” Public suite does not set `debug_fuzzer`, so the new `rn2` arms are **public-unhit** — that is not an overclaim of the C body.

## Density

§2b: the remaining body of one C function + the two enums those arms store. +57. Did **not** glue `getdir`. Right size.

## Verification

D-log: green + named cohort. save-oracle skip. Public-unhit for fuzzer `rn2(20)`/`rn2(ln)`. This audit: `csym` `:5470–5583` vs HEAD `js/getline.js:1559–1627`; enums vs `hack.h:826–831` / `flag.h:239–243`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: SND_SPEECH; DUMPLOG_CORE; paniclog file; interned `'yn'`/`'ynq'` callers; hide+web `hidespinchars`; getdir fuzzer.

Verdict: **ACCEPT-WITH-DEBT**
