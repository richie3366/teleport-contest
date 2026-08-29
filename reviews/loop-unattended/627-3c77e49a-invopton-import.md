# Review 627 — 3c77e49a — options.c can_set_perm_invent InvOptOn import (D-1666)

## Metadata
- Full / short hash: `3c77e49acc6d9bb709ae5906570610b43740949b` / `3c77e49a`
- Parent: `3844245f` (audit #2070 of D-1657–D-1665). This file audits **this SHA only** (first of nine `js/` commits since review **626**). Archive **Addressed:** D-1666 `3c77e49a`. Review **622** already stamped.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 17:11:15 +0200
- D-id: **D-1666**
- Stats: `js/options.js` +2/−0. Band **150–350** (`js/` insertions **2** <250; id >454). Must-fix, not an Open peel.
- Claims to close: Must-fix review **622** Actionable #1 (QUALITY-RISK). Not can_set rewrite. Not `strncmpi` #4. Not mO compound row. `reviews/loop-2026-08-15/` has no unpaid InvOptOn Must-fix.
- JS / map: `options.js` import of `InvOptOn`; `can_set_perm_invent` assignment already present from D-1661. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **622** Actionable #1. File already stamped `**Addressed:** D-1666 3c77e49a`.

## Intent vs deliverable

Git subject promises: None→On uses imported `InvOptOn`, instead of throwing ReferenceError on the live callee after D-1661.

Pinned C `can_set_perm_invent` `:5487–5527` (`node scripts/csym.mjs can_set_perm_invent`). `--callers`: prototype `:390`; `optfn_boolean` perm_invent `:5266`; `check_perm_invent_again` `:5536`; `handler_perminv_mode` `:6065`; comment `:7395`; doset retry `:7398`. Enum `wintype.h:194–205` `InvOptOn = InvNormal` (`1`).

```5507:5508:nethack-c/upstream/src/options.c
    if (iflags.perminv_mode == InvOptNone)
        iflags.perminv_mode = InvOptOn;
```

```194:196:nethack-c/upstream/include/wintype.h
enum inv_modes { /* 'perminv_mode' option settings */
    InvOptNone       = 0,           /* no perm_invent */
    InvOptOn         = InvNormal,   /* 1 */
```

Old JS after D-1661: the assignment line existed; `js/options.js:41–46` imported `InvOptNone` / `InvOptInUse` / `InvSparse` only. Reaching `:5507–5508` was a **ReferenceError**. The diff **does** add `InvOptOn` to that import and a comment citing C. It **does not** rewrite `can_set_perm_invent`, wire `optfn_boolean` `:5266`, port `check_tty_wincap`, or insert the mO row. Named, as **622** required.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `InvOptOn` | C `wintype.h:196`, **LIVE this SHA** (import) | `export const` `const.js:349` = `InvNormal` |
| `can_set_perm_invent` | C `:5487–5527`, **LIVE** (not rewritten) | body from D-1661; identifier now bound |
| `InvOptNone` | C `wintype.h:195`, **LIVE** | already imported |
| `perm_invent_toggled` | C invent/wintty, **LIVE** | D-1642; not this SHA |
| `windowport_tty` | C `WINDOWPORT(tty)`, **CLONE** | always true; not this SHA |
| `optfn_boolean` perm_invent | C `:5266`, **OMIT named** | other None-mode caller |
| `check_tty_wincap` | C `:5501`, **OMIT named** | |
| `check_perm_invent_again` | C `:5536`, **OMIT named** | |
| mO compound row | C doset allopt, **OMIT named** | |

`node scripts/csym.mjs can_set_perm_invent` → `:5487-5527`. `--callers can_set_perm_invent`: `:5266` / `:5536` / `:6065` / `:7398`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (import of an existing export; no clone deleted):

```
InvOptOn         js/const.js:349   sync   export const
can_set_perm_invent NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:450
             => Do NOT write clone #2.
InvOptNone       js/const.js:348   sync   export const
InvOptInUse      js/const.js:353   sync   export const
InvSparse        js/const.js:346   sync   export const
```

`--can options.js const.js InvOptOn`: **ALREADY** (`options.js` already statically imports `const.js`). Do **not** stamp “cycle-forced clone.” Do **not** add `can_set_perm_invent` export/`#2`. Do **not** add `strncmpi` #4.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C `:5507–5508` writes `InvOptOn` when mode is `InvOptNone`. JS after this SHA:

```456:456:js/options.js
    if ((bag.perminv_mode | 0) === InvOptNone) bag.perminv_mode = InvOptOn;
```

`InvOptOn` is the imported `export const` at `const.js:349` (`InvNormal`, value `1`), matching `wintype.h:196`. The identifier is bound. **Match `:5507–5508`.** This is not a clone of the enum; it is the C callee’s constant imported from the same table D-1661 already used for `InvOptNone`.

Handler `:6065`. C sets `iflags.perm_invent = can_set_perm_invent()` only when `new_pi != InvOptNone && !old_perm_invent`. The handler already stored `perminv_mode` from the pick, so this path usually skips None→On. **622** said the public `'all'` path skipped the throw. Importing the constant still matches C if a caller reaches the line with mode None.

`optfn_boolean` `:5266`. C `if (!negated && !go.opt_initial && !can_set_perm_invent()) return optn_silenterr`. That is the caller that can still have mode None when turning the boolean On. JS still does not run that gate. **Named omit, not this Must-fix.** The live `can_set` body is no longer a stub identifier.

`check_tty_wincap` `:5496–5504`. C returns FALSE when neither `wincap & WC_PERM_INVENT` nor tty wincap. JS `(wincap & WC_PERM_INVENT) || windowport_tty()` with `windowport_tty()` always true, so the wincap fail is skipped and execution continues to None→On. **Named.** Importing `InvOptOn` does not port that check.

TTY restore `:5511–5521`. C `perm_invent_toggled(FALSE)` then `WIN_INVEN==WIN_ERR` restore `old_perminv_mode`. JS the same after the None→On write. Previously a throw aborted before restore. **Match that order now that the write does not throw.**

Callee closure (this SHA). LIVE: `InvOptOn` import, `InvOptNone`, `perm_invent_toggled`, `WIN_ERR`. CLONE: `windowport_tty` (unchanged). OMIT named: `optfn_boolean` gate, `check_tty_wincap`, `check_perm_invent_again`, mO row, TTYINV. STUB: **none** in the live None→On arm. Combined-arm: the Must-fix identifier is LIVE. “Dispatch ported, callee unbound” is **false after this SHA**.

## Hallucinations / overclaim

Subject “None→On uses imported InvOptOn”: **true.** D-log “Did not rewrite can_set, add `strncmpi` #4, or insert the mO row”: **true** (two JS lines: import + comment). Do **not** stamp “Match C `optfn_boolean` perm_invent `can_set`.” Do **not** stamp “Match C `check_tty_wincap`.” Do **not** stamp “Match C mO `#optionsfull` compound letter.” Do **not** stamp “Match C `check_perm_invent_again`.” Public OPTIONS=perminv_mode / O handler None→On is **public-unhit**; fortress 44/44 does not prove `:5508`.

## Density

+2: Must-fix import after **622**. One identifier. Did not glue wizweight / `optfn_boolean`. Below §2b’s Open ~80 floor; Must-fix may be that small. Correct size.

## Verification

Wired: import + assignment binds `InvOptOn===1`. Unwired C: named omits above. Conf: no RNG. No seed gate.

D-log private canary (import block + assignment + module load; `InvOptOn===1`); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the None→On write. Fortress does not prove `optfn_boolean` would call `can_set`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `optfn_boolean` perm_invent `can_set` gate (`:5266`); `check_tty_wincap`; `check_perm_invent_again`; mO `#optionsfull` compound row; `config_error_add`; TTYINV `#if 0`; handler n>1 / n==0 pline. Do **not** add `can_set_perm_invent` export/`#2`. Do **not** add `strncmpi` #4. Do **not** re-port `doperminv` (D-1642). Do **not** re-port `optfn_perminv_mode` (D-1661). Do **not** rewrite `can_set`.

Verdict: **ACCEPT-WITH-DEBT**
