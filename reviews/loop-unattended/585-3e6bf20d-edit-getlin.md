# Review 585 — 3e6bf20d — getline.c EDIT_GETLIN off / name_from_player / query_annotation (D-1624)

## Metadata
- Full / short hash: `3e6bf20d5f4386d76bed383b6f5bcd70c0b69096` / `3e6bf20d`
- Parent: `935c8220` (D-1623). This file audits **this SHA only** (fourth of nine `js/` commits since review **581**). Archive **Addressed:** D-1624 `3e6bf20d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 05:21:44 +0200
- D-id: **D-1624**
- Stats: `js/getline.js` +35/−8, `js/display.js` +19, `js/do_name.js` +44/−16, `js/dungeon.js` +55/−13. Band **150–350** (js/ insertions **153**).
- Claims to close: Open EDIT_GETLIN after D-1611. Not getline ^P. Not `kill_char`. `reviews/loop-2026-08-15/` has no unpaid EDIT_GETLIN Must-fix.
- JS / map: `getline.js` `getlin` / `get_ext_cmd`; `display.js` `hooked_getlin_epilogue`; `do_name.js` `name_from_player`; `dungeon.js` `query_annotation`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **572** named EDIT_GETLIN `:70–77`.

## Intent vs deliverable

Git subject promises: EDIT_GETLIN stays off (`config.h` commented) with `name_from_player`, `query_annotation` replace/`describe_level`, and epilogue `dumplogmsg`, instead of a missing two-arg getlin after D-1611.

Pinned C `include/config.h:655` `/* #define EDIT_GETLIN */` (commented — contest build uses the `#else`). `win/tty/getline.c` `hooked_tty_getlin` `:42–227`; `#else *bufp='\0'` `:70–78`; epilogue `:173–186`. `do_name.c` `name_from_player` `:103–128` (`--callers`: `:253` `do_mgivenname`, `:306` `do_oname`, `:656` `docall`). `dungeon.c` `query_annotation` `:2498–2567` (`--callers`: `:2575` current, `:3336` overview lev). `find_mapseen` `:2639–2649`. `describe_level` `botl.c` `:440–476`. getline ^P is D-1611.

```70:78:nethack-c/upstream/win/tty/getline.c
#ifdef EDIT_GETLIN
    addtopl(obufp);
    bufp = eos(obufp);
#else
    /* !EDIT_GETLIN: bufp is output only; init it to empty */
    *bufp = '\0';
#endif
```

```173:186:nethack-c/upstream/win/tty/getline.c
    ttyDisplay->toplin = TOPLINE_NON_EMPTY;
    ttyDisplay->inread--;
    clear_nhwindow(WIN_MESSAGE);
    if (suppress_history) {
        *gt.toplines = '\0';
#ifdef DUMPLOG_CORE
    } else {
        dumplogmsg(gt.toplines);
#endif
    }
```

Old JS: `getlin(query)` always `buf=''`; do_oname/docall inlined mung/PL_PSIZ; annotate `ensure_mapseen` + current-level-only prompt; no epilogue dumplogmsg.

The diff **does** two-arg `getlin` with `EDIT_GETLIN=false` (`#else` empty buf), `name_from_player` `void defres` then getlin+mung+PL_PSIZ for `do_oname`/`docall`, `query_annotation` `find_mapseen` early-out + replace prompt + other-level `describe_level` (dflgs 0/2) + mung/clear/set, `hooked_getlin_epilogue` (getlin dumplogmsg; `#` extcmd suppress_history). It **does not** port `kill_char` / `tty_nhbell`, `do_mgivenname` `:253`, overview `PICK_ONE` (`why==-1`), or enabling EDIT_GETLIN. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getlin` | C `tty_getlin` → hooked `:42`, **LIVE this SHA** two-arg | `EDIT_GETLIN=false` |
| `get_ext_cmd` | C `tty_get_ext_cmd` suppress TRUE, **LIVE this SHA** epilogue | |
| `hooked_getlin_epilogue` | C `:173–186`, **LIVE this SHA** | display.js |
| `name_from_player` | C `:103–128` staticfn, **LIVE this SHA** | local; do not export #2 |
| `query_annotation` | C `:2498–2567`, **LIVE this SHA** | local |
| `find_mapseen` | C `:2639–2649`, **LIVE** | replaced `ensure_mapseen` |
| `describe_level` | C botl `:440–476`, **LIVE** | display.js; dflgs 0/2 |
| `on_level` | C, **CLONE** | dungeon.js local; 13 clones — do not add #14 |
| `safe_oname` | C, **LIVE** | do_oname defres |
| `dumplogmsg` | C pline `:21–46`, **LIVE** | |
| `EDIT_GETLIN` #ifdef preload | C `:70–73` / name_from_player Strcpy / annotate strncpy, **OMIT correctly** | commented `config.h:655` |
| `do_mgivenname` | C `:253`, **OMIT named** | |
| `kill_char` / `tty_nhbell` | C `:196` / `:209`, **OMIT named** | |
| overview PICK_ONE | C `:3336` why==-1, **OMIT named** | |

`node scripts/csym.mjs hooked_tty_getlin` → `:42-227`. `name_from_player` → `:103-128`. `query_annotation` → `:2498-2567`. `describe_level` → `botl.c:440-476`. `find_mapseen` → `:2639-2649`. `--callers name_from_player` `:253`/`:306`/`:656`. `--callers query_annotation` `:2575`/`:3336`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
getlin           js/getline.js:140   ASYNC — await required
get_ext_cmd      js/getline.js:877   ASYNC — await required
hooked_getlin_epilogue js/display.js:1705   sync
name_from_player NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:202
             => Do NOT write clone #2.
query_annotation NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:1233
             => Do NOT write clone #2.
find_mapseen     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:758
describe_level   js/display.js:3773   sync
on_level         NOT EXPORTED — but 13 LOCAL CLONE(S) in 13 file(s):
               … js/dungeon.js:839 …
             => Do NOT write clone #14.
safe_oname       js/do_name.js:771   sync
dumplogmsg       js/display.js:1352   sync
```

`--can do_name.js getline.js getlin`: already imports. `--can getline.js display.js hooked_getlin_epilogue`: already. `--can dungeon.js display.js describe_level`: `NEW-CYCLE` but `VERDICT: SAFE` (`describe_level` hoisted). The SHA uses `await import('./display.js')` inside `query_annotation`, not a top-level TDZ read. Do **not** stamp “cycle-forced clone.” Do **not** add `name_from_player` / `query_annotation` / `on_level` #14.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

EDIT_GETLIN. Contest `config.h:655` is commented. C `#else *bufp='\0'`. JS `const EDIT_GETLIN = false`; `buf = EDIT_GETLIN ? preload : ''`. Two-arg `getlin(query, bufp)` exists so a future on-switch could preload; live path ignores `bufp`. **Match `:70–78`.** Do not enable the const to “prove” the `#ifdef`.

`name_from_player`. C `outbuf[0]=0`; `#else nhUse(defres)`; `getlin(prompt, outbuf)`; empty/ESC → NULL; `mungspaces`; `PL_PSIZ-1`. JS `void defres`; `getlin(prompt)` (buffer already empty); same empty/ESC/mung/slice. **Match `:111–127`.** Wired `do_oname` `:306` `safe_oname(obj)` and `docall` `:656` `oc_uname`. **Match those callers.** `:253` `do_mgivenname` still inlined/absent. Named.

`query_annotation` `#else`. C `find_mapseen` miss → return (not init). JS `find_mapseen` (was `ensure_mapseen`). **Match `:2505–2506` — this SHA fixes a C-wrong.** If custom: replace `"%.30s%s"` + `...`. JS slice 30 + `...`. **Match `:2516–2520`.** Else current `on_level` → `"this dungeon level"` else `dflgs = (dnum==u.uz.dnum)?0:2`, save `u.uz`, `describe_level`, restore, `strsubst("Dlvl:","level ")`, `trimspaces`. JS mutates `uuz.dnum/dlevel`, `describe_level(dflgs)`, restore, replace+trim. **Match `:2526–2541`.** Empty/ESC return **before** discarding custom. **Match `:2549–2550`.** Then free custom, set if `*nbuf && strcmp(nbuf," ")`. JS `custom=null` then set if `nbuf && nbuf!==' '`. **Match `:2554–2565`.** `#ifdef` strncpy-into-nbuf + skip replace is the on-switch; they left it off. **Match contest C.**

Epilogue. C `toplin=NON_EMPTY`, `inread--`, `clear_nhwindow` (does **not** wipe `gt.toplines`), then suppress `*gt.toplines=0` else `dumplogmsg`. JS `hooked_getlin_epilogue` first (release SPECIAL + dumplogmsg or `_toplines=''`) because `clear_nhwindow_message` **would** wipe `_toplines`; then `hooked_getlin_end` (inread--); then `_pending_message=''`. getlin `suppress=false`; extcmd `true`. **Match `:173–186` for dumplog vs suppress.** Screen clear is the `_pending_message=''` stand-in, not a skipped callee stub of `dumplogmsg`.

Callee closure (EDIT_GETLIN `#else` arm). LIVE: `getlin`, `name_from_player`, `find_mapseen`, `describe_level`, `dumplogmsg`, `safe_oname`. CLONE: `on_level` (local dungeon). OMIT named: `do_mgivenname`, `kill_char`, overview PICK_ONE, `#ifdef` preload. STUB: none. Combined `#else` sites may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject EDIT_GETLIN off + `name_from_player` + annotate replace/`describe_level` + epilogue dumplogmsg: **true for getlin/extcmd, do_oname, docall, and `#annotate`.** D-log `find_mapseen` miss returns: **true (old `ensure_mapseen` was the C-wrong).** Do **not** stamp “Match C EDIT_GETLIN `#ifdef` preload (`:70–73`).” Do **not** stamp “Match C `do_mgivenname` (`:253`).” Do **not** stamp “Match C `kill_char` / `tty_nhbell`.” Do **not** stamp “Match C overview PICK_ONE `why==-1`.” Do **not** stamp “Match C getline ^P” (D-1611). Do **not** stamp “Match C yn post-answer” (D-1623). Public `#annotate` / name-item getlin may hit replace vs first-name; other-level `describe_level` is overview-unhit.

## Density

+153 across getline + the two C files that share the EDIT_GETLIN `#ifdef` (`do_name.c`, `dungeon.c`) + the epilogue the `#else` getlin needs. §2b one config-switch family, not two unrelated Open rows glued. Did not enable EDIT_GETLIN. Did not glue `kill_char`.

## Branch-by-branch confirm

1. `*bufp='\0'` / ignore preload. **Match contest `#else`.**
2. `name_from_player` nhUse + mung + PL_PSIZ; do_oname/docall. **Match; mgivenname named.**
3. `find_mapseen` miss return. **Match this SHA.**
4. custom replace vs `describe_level` dflgs 0/2. **Match `#else`.**
5. ESC/empty keep old custom; space-only discard. **Match.**
6. getlin dumplogmsg; extcmd suppress. **Match.**
7. `kill_char` / PICK_ONE. **Named.**

## Callers / RNG ledger

Wired: `getlin`/`get_ext_cmd`; `do_oname`/`docall`; `#annotate` current (`:2575`). Unwired C: `do_mgivenname`; overview `:3336` PICK_ONE still named. Conf: no `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not set `EDIT_GETLIN=true`. Do not add `on_level` #14. Do not `ensure_mapseen` on miss. Do not import `fs`. The `dungeon.js`→`display.js` cycle is SAFE (hoisted `describe_level`; dynamic import).

## Verification

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for other-level annotate `describe_level`, `find_mapseen` miss, extcmd suppress_history, and dumplog of getlin `gt.toplines`. Fortress getlin empty-start already matched the `#else` buffer. `do_mgivenname` unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `kill_char` / `tty_nhbell` (`getline.c:196` / `:209`); `do_mgivenname` (`do_name.c:253`); overview PICK_ONE (`dungeon.c:3336`); enabling EDIT_GETLIN. Do not glue those into yn. Do not add `name_from_player` #2. Do not restore `ensure_mapseen` here.

Verdict: **ACCEPT-WITH-DEBT**
