# Review 520 — 30c83eb9 — invent.c display_pickinv &ctmp menu count (D-1559)

## Metadata
- Full / short hash: `30c83eb9d3b071243f492e22bcdcc524eb019f66` / `30c83eb9`
- Parent: `599494b3` (D-1558). This file audits **this SHA only** (second of nine `js/` commits since review **518**). Archive **Addressed:** D-1559 `30c83eb9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 04:12:20 +0200
- D-id: **D-1559**
- Stats: `js/invent.js` +136 / −16, `js/wield.js` +59 / −8, `js/do.js` +29 / −7, `js/artifact.js` +6 / −3, `js/dothrow.js` +4 / −5. Band 150–350 (js/ insertions **234**).
- Claims to close: Open pickinv `&ctmp` after D-1551 / review **512**. Not canned CMDQ_INT. Not stash. `reviews/loop-2026-08-15/` has no unpaid pickinv-count Must-fix.
- JS / map: `invent.js` `display_pickinv_reply` / `getobj_display_pickinv`; ALLOWCNT throw/drop/wield/ready/charge/adjust. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **491** / **512** named `&ctmp`.

## Intent vs deliverable

Git subject promises: getobj ALLOWCNT `?`/`*` menus pass a typed count via `&ctmp` instead of returning a letter only.

Pinned C `invent.c` `display_pickinv` is static (`csym` body miss; callers `invent.c:29` proto, `:1979` getobj, `:3451`/`:3458` display_inventory). Body `:3057–3417`. `*out_cnt = -1` n==1 `:3171–3172`; `*out_cnt = selected[0].count` `:3410–3411`. Caller `getobj` `:1963–1999` (`allowcnt ? &ctmp : NULL`; apply `ctmp >= 0`). tty `process_menu_window` `:1328–1768` digits; `tty_select_menu` `:2775–2815` copies `curr->count`; `toggle_menu_curr` `:1114–1143` `counting && count > 0`. `AppendLongDigit` `integer.h:120–124`.

```3171:3173:nethack-c/upstream/src/invent.c
        if (out_cnt)
            *out_cnt = -1L; /* select all */
        return ret;
```

```3410:3411:nethack-c/upstream/src/invent.c
            if (out_cnt)
                *out_cnt = selected[0].count;
```

```1996:1999:nethack-c/upstream/src/invent.c
            if (allowcnt && ctmp >= 0L) {
                cnt = ctmp;
                cntgiven = TRUE;
            }
```

Old JS: pickinv letter-only; throw/charge ignored menu count; drop/wield/ready/adjust `?`/`*` Never_mind.

The diff **does** add `out_cnt`, PICK_ONE digits, n==1 `-1`, `getobj_display_pickinv` / `getobj_pickinv_ctmp`, and wire the six ALLOWCNT clones except stash. It **does not** port hands/`xtra_choice`, force_invmenu `*`/`?` redo, gacc, stash, `finish_splitting`, eat/read/zap/tin (NOFLAGS, null `out_cnt`). Named. **No gameplay RNG** (Hallu `obj_glyph` pre-existing).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `display_pickinv_reply` `out_cnt` | C `:3063` / `:3171` / `:3410`, **LIVE this SHA** | `{ n }` ≡ `long *` |
| n==1 `*out_cnt=-1` | C `:3171–3172`, **LIVE this SHA** | after `message_menu` in C; JS writes before (same if ESC) |
| PICK_ONE digits | C `wintty.c:1554–1583`, **LIVE this SHA** | leading 0 ignored |
| `append_long_digit` | C `AppendLongDigit`, **CLONE** | `MAX_SAFE_INTEGER` not `LONG_MAX` |
| `toggle` count | C `:1136–1138`, **CLONE in take()** | `counting && count > 0` else −1 |
| `getobj_pickinv_ctmp` | C `:1996–1999`, **LIVE this SHA** | `ctmp >= 0` |
| `getobj_display_pickinv` | C `:1963–1999`, **LIVE this SHA** | `*` → NULL/allowAll; `?` → raw lets |
| throw/drop/wield/ready/charge/adjust | C ALLOWCNT callers, **LIVE this SHA** | |
| eat/read/zap/tin/apply/potion | C NOFLAGS, **LIVE unchanged** | `display_pickinv_reply(lets)` null `out_cnt` |
| stash ALLOWCNT | C `pickup.c:3176`, **OMIT named** | |
| hands / `xtra_choice` | C `:3059` / `:1979` `handsbuf`, **OMIT named** | |
| force_invmenu redo | C `:1973–1975` / `:1994`, **OMIT named** | |
| gacc / `'0'` ball class | C `:1355–1379` / `:1567`, **OMIT named** | |
| `finish_splitting` | C `wield.c`, **OMIT named** | |

`node scripts/csym.mjs display_pickinv` → no definition (static). `--callers display_pickinv`: invent `:29` / `:1979` / `:2980` / `:3451` / `:3458`. `csym.mjs getobj` → `invent.c:1751-2089`. `csym.mjs process_menu_window` → `wintty.c:1328-1768`. Digit arm `:1554–1583`; ESC `:1594–1605`. No `rn2`/`rnd` in `out_cnt` / getobj apply.

`node scripts/sym.mjs` on new / re-pointed names (`display_pickinv_reply` gained a param; throw stopped dynamic-importing it):

```
display_pickinv_reply js/invent.js:993   ASYNC — await required
getobj_display_pickinv js/invent.js:4032   ASYNC — await required
getobj_pickinv_ctmp js/invent.js:4014   sync
append_long_digit NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:965
             => Do NOT write clone #2.
getobj_apply_count js/invent.js:4056   ASYNC — await required
getobj_from_cmdq js/invent.js:3947   sync
```

Do **not** add `append_long_digit` #2. `node scripts/imports.mjs --can` wield/do/dothrow/artifact → invent `getobj_display_pickinv`: ALREADY statically imported. No new TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

n==1. `!force_invmenu && !menu_requested`, `lets` non-null, `*out_cnt=-1`, `message_menu` PICK_ONE. JS writes `-1` before the menu; C after. Cancel → getobj sees ESC and does not apply `ctmp`. Select → `ctmp=-1` → `ctmp >= 0` false → select-all. **Match `:3149–3173`.** `usextra` bump is named (no hands entry).

Digits. `reset_count` / `counting` / `count` match `process_menu_window` `:1395–1400` and `:1554–1583`. Overflow `continue` leaves `reset_count` true. Leading 0 does not set `counting`. ESC while counting: stop count only; next loop zeros (`reset_count` true). Space page: does not keep `reset_count` false, so paging clears the count — **Match C.** Letter `take()`: `counting && count > 0` else −1 — **Match `toggle_menu_curr` `:1136–1143` + `tty_select_menu` `:2809`.** Current-page selectors only. **Match.**

`AppendLongDigit`. JS uses `Number.MAX_SAFE_INTEGER` (2^53−1) not C `LONG_MAX`. Menu counts stay small. Verified CLONE for this caller. Do not stamp “Match C LONG_MAX.”

getobj apply. `allowcnt && ctmp.n >= 0` → `cnt` + `cntgiven`. **Match `:1996–1999`.** `*` passes `'*'` (allowAll ≡ C NULL lets). `?` passes non-compacted SUGGEST (`adjust_raw_lets` / `drop_raw_lets` / charge `raw` / throw `throwable_lets` SUGGEST-only). DOWNPLAY stay off `?` and on `*`. **Match `lets` vs `altlets`.** `!allowcnt` passes `null` — eat/read/zap/tin/apply still omit the second arg. **Match NULL `out_cnt`.**

Callers. C ALLOWCNT: charge, drop, throw, wield, ready, adjust, stash. This SHA wires six; stash named. `getobj_apply_count` (split_otmp) LIVE from D-1530. Wield `ilet==='-'` after pickinv is dead without `xtra_choice` in the menu — named, not a stub in the count arm.

Callee closure (`?`/`*` ALLOWCNT arm). LIVE: `display_pickinv_reply`, `message_menu`, `getobj_apply_count` / `splittable` / `splitobj`, `getobj_take_count` prompt digits. CLONE: `append_long_digit`, `take()` count. OMIT named: hands, force_invmenu redo, gacc, stash, finish_splitting. STUB: **none**. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `&ctmp` on ALLOWCNT `?`/`*`: **true** for the six wired callers. D-log “NOFLAGS still null `out_cnt`”: **true**. Do **not** stamp “Match C stash `'s'` count.” Do **not** stamp “Match C `xtra_choice` bare hands in pickinv.” Do **not** stamp “Match C force_invmenu menuquery redo.” Do **not** stamp “Match C gacc.” This is **not** “dispatch ported, callee stubbed.”

## Density

One C `out_cnt` path + the ALLOWCNT getobj clones that share it. +234 JS; stash left named. Did not glue `finish_splitting`. §2b OK.

## Branch-by-branch confirm

1. Menu `5` then letter, ALLOWCNT: `ctmp=5`, `cntgiven`, split. **Match.**
2. Letter, no digits: `take()` −1, `ctmp>=0` false, whole stack. **Match.**
3. n==1 `message_menu`: `out_cnt=-1`, select-all. **Match.**
4. `!allowcnt` (eat): second arg omitted, prompt digits still “No count allowed.” **Match.**
5. ESC while counting: stay in menu; next pick has count 0. **Match.**
6. Leading `0` then letter: not counting, −1. **Match.**
7. Drop/wield/ready/adjust `?`: no longer Never_mind; pick + count. **Match the named omit retirement.**
8. Wield `?` bare hands row: still missing. **Named.**
9. Stash `'s'`: still ignores menu count. **Named.**

## Callers / RNG ledger

C: getobj `:1979` only for `&ctmp` (display_inventory passes NULL). Public-unhit for typed menu counts. No seed gate. Hallu `obj_glyph` display-RNG pre-existing, not this SHA.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `append_long_digit` overflow −1 is C, not a recorded coordinate.

## Verification

D-log canary **20**/20 (C `&ctmp` / `*out_cnt`; JS write; ctmp 5/−1/0; `!allowcnt`; menu `5a`; n==1 ESC −1; ESC-while-count; split); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** for menu counts. Admit it.

## Actionable C-wrongs

None for Must-fix. Named: hands/`xtra_choice`; force_invmenu `*`/`?` redo; gacc; stash ALLOWCNT; `finish_splitting` / `unsplitobj`; eat/read/zap/tin stay NOFLAGS. Do not add `append_long_digit` #2. Do not pass `out_cnt` into NOFLAGS getobj.

Verdict: **ACCEPT-WITH-DEBT**
