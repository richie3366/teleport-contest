# Review 622 — 536904b4 — options.c optfn_perminv_mode (D-1661)

## Metadata
- Full / short hash: `536904b4abddbf812a420d0e7da82c122180e922` / `536904b4`
- Parent: `7504982e` (D-1660). This file audits **this SHA only** (fifth of nine `js/` commits since review **617**). Archive **Addressed:** D-1661 `536904b4`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 15:30:25 +0200
- D-id: **D-1661**
- Stats: `js/options.js` +277/−12. Band **200–450** (`js/` insertions **277** >250; id >454).
- Claims to close: Open `optfn_perminv_mode` after D-1642. Not doperminv. Not mO compound row.
- JS / map: `options.js` `optfn_perminv_mode` / `handler_perminv_mode` / `can_set_perm_invent`; `parseNethackrc`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **603** named OPTIONS=perminv_mode after doperminv. `reviews/loop-2026-08-15/` has no unpaid perminv_mode Must-fix.

## Intent vs deliverable

Git subject promises: `OPTIONS=perminv_mode` sets `iflags.perminv_mode`/`perm_invent` from the C table, instead of storing a flags string after D-1642.

Pinned C `optfn_perminv_mode` `:3045–3135` (`node scripts/csym.mjs optfn_perminv_mode`). `--callers`: `handler_perminv_mode` `:6060` `get_val` with `op=NULL`. Table `perminv_modes[][3]` `:225–240`. `handler_perminv_mode` `:6010–6083`. `can_set_perm_invent` `:5487–5527` (`--callers` includes `:6065`, `optfn_boolean` `:5266`). `enum requests` `:87` `do_init=1` `do_set=2` `get_val=4` `get_cnf_val=5`. `optn_ok=1` `:83–85`. `InvOptNone=0` / `InvOptOn=1` / `InvSparse=4` / `InvOptInUse=8` `wintype.h:188–204`.

```3071:3102:nethack-c/upstream/src/options.c
        } else if (op != empty_optstr) { /* "perminv_mode=foo" */
            ...
            for (i = 0; i < SIZE(perminv_modes); ++i) {
                if (!(pi0 = perminv_modes[i][0]))
                    continue;
                pi1 = perminv_modes[i][1];
                if (!strncmpi(op, pi0, ln) || !strncmpi(op, pi1, ln)
                    || op[0] == i + '0') {
                    ...
                    iflags.perminv_mode = (uchar) i;
                    iflags.perm_invent = TRUE;
                    break;
                }
            }
```

```5507:5508:nethack-c/upstream/src/options.c
    if (iflags.perminv_mode == InvOptNone)
        iflags.perminv_mode = InvOptOn;
```

Old JS: colon values fell through to `flags.perminv_mode` string; no optfn. The diff **does** the table (NULL holes 3/4/7; TTY +grid 5/6), do_init/do_set/get_val/get_cnf_val, OPTIONS= colon/`=`/`!`, handler PICK_ONE, `can_set` tty `perm_invent_toggled`. It **does not** insert the mO compound row (D-log: seed0007 letter shift, reverted), `optfn_boolean` perm_invent gate, `check_tty_wincap`, `config_error_add`, TTYINV `#if 0`. Named. It **does** ship `can_set_perm_invent` with C’s `InvOptOn` line **without importing `InvOptOn`**.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `optfn_perminv_mode` | C `:3045–3135`, **LIVE this SHA** | export; no `do_handler` req (doset calls handler) |
| `perminv_modes` | C `:225–240`, **LIVE this SHA** | local table |
| `handler_perminv_mode` | C `:6010–6083`, **LIVE this SHA** | do **not** add #2 |
| `can_set_perm_invent` | C `:5487–5527`, **LIVE this SHA** | **C-wrong:** `InvOptOn` unbound |
| `perm_invent_toggled` | C invent/wintty, **LIVE** | D-1642 |
| `strsubst` / `strstri` / `highc` | C hacklib, **LIVE** | imported |
| `perminv_name_prefixi` | C `strncmpi(op,name,ln)`, **CLONE** | do **not** add `strncmpi` #4 |
| `windowport_tty` | C `WINDOWPORT(tty)`, **CLONE** | always true |
| mO compound row | C doset allopt, **OMIT named** | |
| `optfn_boolean` perm_invent | C `:5266`, **OMIT named** | |
| `check_tty_wincap` | C `:5501`, **OMIT named** | |
| `config_error_add` | C unknown/`+grid`, **OMIT named** | |

`node scripts/csym.mjs optfn_perminv_mode` → `:3045-3135`. `handler_perminv_mode` → `:6010-6083`. `can_set_perm_invent` → `:5487-5527`. `--callers optfn_perminv_mode`: `:6060`. `--callers handler_perminv_mode`: `:3113`. `--callers can_set_perm_invent`: `:5266`/`:6065`/`:7398`.

RNG: none in optfn/handler/table. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
optfn_perminv_mode js/options.js:479   sync
handler_perminv_mode NOT EXPORTED — 1 LOCAL js/options.js:906
             => Do NOT write clone #2.
can_set_perm_invent NOT EXPORTED — 1 LOCAL js/options.js:448
             => Do NOT write clone #2.
perm_invent_toggled js/invent.js:834   sync
InvOptOn         js/const.js:349   sync   export const
strsubst         js/hacklib.js:234   sync
highc            js/hacklib.js:94   sync
             !! ALSO 1 LOCAL CLONE — dokeylist.js
strstri          js/hacklib.js:217   sync
             !! ALSO 2 LOCAL CLONES — attrib.js write.js
strncmpi         NOT EXPORTED — 3 LOCAL insight/vault/write
             => Do NOT write clone #4.
```

`--can options.js invent.js perm_invent_toggled`: ALREADY. `--can options.js hacklib.js strsubst`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `strncmpi` #4. Do **not** add `handler_perminv_mode` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks (`AUTOUNLOCK_FORCE` is a pre-existing const import). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Table. C rows 0 none / 1 all / 2 full / 3–4 NULL / 5–6 +grid under TTY_PERM_INVENT / 7 NULL / 8 in-use. JS same strings and holes. **Match `:225–240`.** `InvSparse=4` so indices 5/6 have the grid bit. **Match `wintype.h`.**

do_set. C `string_for_opt` then reject `!perminv_mode=foo`; else loop `strncmpi` + `op[0]==i+'0'`; skip NULL `pi0` **before** the digit test (so `'3'` is not a mode); +grid on non-tty `i&=~InvSparse`; miss → None + `perm_invent=FALSE` + silenterr; bare `!perminv_mode` → None. JS `perminv_name_prefixi` (`name.length < ln` then slice-equal) plus `val.charAt(0)===String(i)`. **Match the match order.** `!optInitial` redraw. **Match `:3098–3102`.** `config_error_add` omitted. Named. parseNethackrc colon writes `result.iflags` (`iflags: {}` is truthy so `perminv_iflags` does not divert to `game.iflags`). **Match OPTIONS= into the parse bag.**

get_val. C `perminv_modes[mode][2]`; Off suffix only when mode≠None && !perm_invent && **`op` non-NULL** (`:3116–3130`). Handler passes NULL. JS `getValOp != null`; handler passes `null`; display helper passes `true`. LIVE `strsubst` for `" currently"` / `" inventory"`. **Match.** get_cnf_val uses `[0]`. **Match `:3132–3134`.** do_init returns ok; TTYINV `#if 0` not ported. **Match C compiled.**

Handler. C skip NULL/+grid-non-tty; letter `InvSparse ? highc(pi1[0]) : pi0[0]`; gacc `'0'+i`; PICK_ONE; n>0 sets mode (`a_int-1`); n>1 && first==old → second pick; n≥0 pline + can_set / clear perm_invent + tty toggle off/on. JS LIVE `highc`/`strstri`; `select_menu_pick_one` (Enter/ESC → cancel, **no** n≥0 empty-pick pline; **no** n>1 deselect). Named helper debt. ESC skip pline **matches** C `n<0`. Pline format **matches** `:6061–6063`. can_set only when leaving None with perm_invent was off. **Match `:6064–6067`.**

`can_set_perm_invent`. C wincap / `check_tty_wincap`; None → **InvOptOn**; tty && !opt_initial → `perm_invent_toggled(FALSE)` then `WIN_INVEN==WIN_ERR` restore mode and fail. JS `(wincap & WC_PERM_INVENT) \|\| windowport_tty()` (always tty ⇒ wincap fail is skipped); LIVE `perm_invent_toggled`; `WIN_ERR`. **`InvOptOn` is not imported** from `const.js` (`js/options.js:41–46` has `InvOptNone`/`InvOptInUse`/`InvSparse` only). Reaching `:5507–5508` is a **ReferenceError**. The handler sets `perminv_mode` **before** can_set, so the public `'all'` path currently skips that line (suite 44/44 does not prove it). `optfn_boolean` perm_invent is the C caller that can still have mode None. **C-wrong in a live callee, not a named omit.**

do_init. C returns `optn_ok` with no write (`:3049–3051`). JS same. TTYINV `#if 0` compile-out: **Match C as built.** `!` / `do_set` with empty `op` after `string_for_opt` reject: C `return optn_err` for `!perminv_mode=foo` (`:3074–3078`); bare `!perminv_mode` sets None (`:3056–3061`). JS `!` bang path sets None and `perm_invent=false`. **Match the two `!` shapes.** Digit `'0'`…`'8'` uses `op[0]==i+'0'` **after** skipping NULL `pi0`, so `'3'`/`'4'`/`'7'` miss and fall to unknown. JS `if (!pi0) continue` before the digit test. **Match.**

Handler n==1 vs n>1. C `n>0` then `if (n>1 && pick[0].item.a_int-1==oldmode) use pick[1]`. JS `select_menu_pick_one` never returns two picks — named. Empty pick `n==0` still plines and can_set; JS cancel skips. Named helper debt, not this Must-fix.

Callee closure (do_set / handler arms). LIVE: table, `strsubst`/`strstri`/`highc`, `perm_invent_toggled`, `select_menu_pick_one`. CLONE: `perminv_name_prefixi` matched to `strncmpi`; `windowport_tty`. OMIT named: mO row; `optfn_boolean`; `check_tty_wincap`; `config_error_add`; TTYINV. STUB: **InvOptOn unbound** in can_set. That arm should have been its own Open/Must-fix. “Dispatch ported, callee throws” is QUALITY-RISK even though the subject says Match C.

## Hallucinations / overclaim

Subject OPTIONS= table → iflags: **true** for colon/`=`/digit/`!` when `result.iflags` exists. D-log handler + get_val Off suffix: **true** for the `op` NULL vs non-NULL split. D-log “mO row not inserted”: **true** (not Match C `#optionsfull` compound letter). Do **not** stamp “Match C `can_set_perm_invent` `InvOptOn`.” Do **not** stamp “Match C `check_tty_wincap`.” Do **not** stamp “Match C `config_error_add`.” Do **not** stamp “Match C `optfn_boolean` perm_invent.” Do **not** re-port `doperminv` (D-1642). Public OPTIONS=perminv_mode is **public-unhit** on default tourist rc; mO menu is **unhit by design** this SHA.

## Density

+277: C optfn 91 + handler 74 + can_set 41 + table 16. §2b one `options.c` perminv_mode cluster including parse + O handler. Did not glue wizweight. Above a one-`if` peel. Large but one family.

## Verification

Wired: table/prefixi/digit; `!` none; get_val Off when `getValOp`; handler letters/gacc; OPTIONS= colon. Unwired C: mO row; boolean gate; tty wincap; config_error; InvOptOn import. Conf: no RNG. No seed gate.

C `optfn_boolean` perm_invent (`:5266`) is the other `can_set_perm_invent` caller: turning the boolean On with mode still None hits `:5507–5508`. This SHA names that gate as omit, so the live `can_set` body still contains the unbound identifier. Importing `InvOptOn` is the one-iter fix; wiring `optfn_boolean` is a separate Open row.

`InvOptOn` already exists as `export const` in `const.js:349` (`sym.mjs` printed that). The bug is the missing import in `options.js`, not a missing constant. `can_set` compares `=== InvOptNone` (imported) then assigns `InvOptOn` (not imported).

WC_PERM_INVENT is in the tty wincap mask C tests before the None→On assignment. JS `windowport_tty()` is always true so that mask is skipped; the next statement is still the `InvOptOn` write. Importing the constant does not port `check_tty_wincap`.

`perm_invent_toggled(false)` then `WIN_INVEN===WIN_ERR` restore: C and JS both do that after the None→On write. If `InvOptOn` throws, that restore never runs.

opt_initial / `optlist` parse vs in-game O: C skips the tty toggle when `opt_initial`. JS `game.program_state?.opt_initial` same. OPTIONS= is opt_initial.

D-log private canary table/digit/`!`/get_val Off; green+strict seed8000/0900; cohort **7**/7 + strict; inserting mO failed seed0007 (reverted). **Public-unhit** for OPTIONS=perminv_mode and the O handler. Fortress does not prove `:5508`.

## Actionable C-wrongs

1. `can_set_perm_invent` (`options.c:5507–5508`) assigns `InvOptOn` but `js/options.js` never imports it from `const.js`. Import `InvOptOn` (do not rewrite can_set; do not add `strncmpi` #4; do not insert the mO row). Source: reviews/loop-unattended/622-536904b4-optfn-perminv-mode.md

Named (map, not Must-fix): mO `#optionsfull` compound row; `optfn_boolean` perm_invent `can_set` gate; `check_tty_wincap`; `config_error_add`; TTYINV `#if 0`; handler n>1 / n==0 pline; wizweight after-change. Do **not** add `handler_perminv_mode` #2. Do **not** add `strncmpi` #4. Do **not** re-port `doperminv` (D-1642). Do **not** re-port `'o'` getobj (D-1660).

Verdict: **QUALITY-RISK**

**Addressed:** D-1666 `3c77e49a`
