# Review 586 — 1d6a8b20 — cmd.c doextlist / doextcmd loop (D-1625)

## Metadata
- Full / short hash: `1d6a8b203f0c37f8a99b4c75c8562a16ba35c70a` / `1d6a8b20`
- Parent: `3e6bf20d` (D-1624). This file audits **this SHA only** (fifth of nine `js/` commits since review **581**). Archive **Addressed:** D-1625 `1d6a8b20`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 05:33:13 +0200
- D-id: **D-1625**
- Stats: `js/cmd.js` +249/−3, `js/getline.js` +66/−18, `js/hacklib.js` +34, `js/options.js` +11, `js/pager.js` +5/−1. Band **200–450** (js/ insertions **365** >250; id >454).
- Claims to close: Open `doextlist` after D-1605. Not `#seeall`. Not BIND= `seeall`. `reviews/loop-2026-08-15/` has no unpaid doextlist Must-fix.
- JS / map: `cmd.js` `doextlist` / `doc_extcmd_flagstr`; `getline.js` `#?` + `doextcmd`; `pager.js` help `k`; `hacklib.js` `strstri`/`strsubst`; `options.js` `gselector`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **566** named `doextlist` re-prompt loop `:498–518`.

## Intent vs deliverable

Git subject promises: `#?` and help list EXTCMDLIST via NHW_MENU, and `doextcmd` loops while `doextlist`, instead of typed `#?` unknown / help `k` showing `cmdhelp` after D-1605.

Pinned C `cmd.c` `doextlist` `:560–734` (`node scripts/csym.mjs doextlist`). `doc_extcmd_flagstr` `:523–557`. `doextcmd` `:492–520` `while (func == doextlist)`. `--callers doextlist`: `pager.c:2816` `hmenu_doextlist` (table `"?"` is a function pointer — csym 0 besides pager). `hmenu_doextlist` `:2813–2817`. `pmatchi` `strutil.c` `:151–155` / `pmatch_internal` `:105–141`. `strstri` `hacklib.c` `:739–779`. EXTCMDLIST JS row `txt:"?"` flags `139`. `#seeall` is D-1605.

```516:518:nethack-c/upstream/src/cmd.c
        retval = (*func)();
    } while (func == doextlist);
```

```598:612:nethack-c/upstream/src/cmd.c
                add_menu(menuwin, &nul_glyphinfo, &any, ':', 's', ATR_NONE,
                         clr, "Search extended commands",
                         MENU_ITEMFLAGS_NONE);
```

Old JS (D-1605): EXT_CMD_AC `"?"` and help `k` `display_file('cmdhelp')`; no `doextlist` runner; `doextcmd` ran once.

The diff **does** export `doextlist` (meta `a`/`:`/`s`/`z`, two-pass EXTCMDLIST skip INTERNALCMD/NOT_AVAILABLE/wiz, genocided `strsubst`, search `strstri`+`pmatchi`, flagstr, footnote), `#?` EXT_CMDS runner, `doextcmd` `while (ec.name==='?')`, help `k` → `doextlist`, `gselector` in `select_menu_pick_one`, `hacklib` `strstri`/`strsubst`. It **does not** port BIND= `seeall` / `M('?')` default keystroke / `cmd_from_func`, `pmatch` case-sensitive / `pmatchz` skip-set, or remaining extcmd bodies. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doextlist` | C `:560–734`, **LIVE this SHA** | export |
| `doc_extcmd_flagstr` | C `:523–557`, **LIVE this SHA** | local |
| `doextcmd` | C `:492–520`, **LIVE this SHA** loop | getline.js |
| `hmenu_doextlist` | C pager `:2813`, **LIVE** | help `k` |
| `pmatch_internal` / `pmatchi` | C strutil `:105–155`, **CLONE** | cmd.js; no skip-set |
| `strstri` | C hacklib `:739–779`, **LIVE this SHA** | export; attrib/write still clones |
| `strsubst` | C hacklib `:534–551`, **LIVE this SHA** | |
| `mungspaces` | C, **LIVE** | getline export |
| `getlin` | C, **LIVE** | search phrase |
| `select_menu_pick_one` | C `select_menu` PICK_ONE, **LIVE** | gselector this SHA |
| `accept_menu_prefix_tab` | C `accept_menu_prefix` `:3507`, **CLONE** | cmd.js; getline already has one — do not add #3 |
| `visctrl('m')` footnote | C `cmd_from_func(do_reqmenu)`, **OMIT named** | |
| BIND= / `M('?')` | C table key 191, **OMIT named** | |
| `pmatch` / `pmatchz` | C, **OMIT named** | |

`node scripts/csym.mjs doextlist` → `:560-734`. `doc_extcmd_flagstr` → `:523-557`. `doextcmd` → `:492-520`. `pmatchi` → `:151-155`. `strstri` → `:739-779`. `--callers doextlist` `pager.c:2816`. `--callers pmatchi` includes `cmd.c:664–665`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
doextlist        js/cmd.js:410   ASYNC — await required
doc_extcmd_flagstr NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:377
             => Do NOT write clone #2.
doextcmd         js/getline.js:960   ASYNC — await required
pmatchi          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:357
             => Do NOT write clone #2.
pmatch_internal  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:327
             => Do NOT write clone #2.
strstri          js/hacklib.js:158   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/attrib.js:305  js/write.js:90
strsubst         js/hacklib.js:175   sync
mungspaces       js/getline.js:990   sync
             !! ALSO 8 LOCAL CLONE(S) …
select_menu_pick_one js/options.js:1004   ASYNC — await required
accept_menu_prefix NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/getline.js:846
             => Do NOT write clone #2.
```

`--can cmd.js getline.js getlin`: already imports. `--can cmd.js hacklib.js strstri`: already. `--can pager.js cmd.js doextlist`: IN-SCC, `VERDICT: SAFE` (hoisted; pager uses `await import`). Do **not** stamp “cycle-forced clone.” Do **not** add `pmatchi` / `doc_extcmd_flagstr` / `strstri` #3 / `accept_menu_prefix` #2 under another name.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Filters. Skip `CMD_NOT_AVAILABLE|INTERNALCMD`. menumode==1 skip `!AUTOCOMPLETE`. wizc skip if `!wizard`; `!onelist && pass!=wizc`. **Match `:632–645`.** Wizard `debug\|\|wizard`. discover for genocided. **Match.**

Genocided. `!wizard && !discover && GENERALCMD && strstri(desc,"extinct")` then `strsubst(..., " been genocided or become extinct", " been genocided")`. **Match `:646–654`.** `strstri`/`strsubst` are the C home in `hacklib.js` this SHA.

Search. `strstri` txt and desc, then `pmatchi` both. JS `pmatch_internal` `*`/`?` + `lowc` (no skip-set) matches `strutil.c:105–141` with `sk==NULL` and `ci`. **Match `:655–665` for pmatchi.** `pmatch` (ci false) and `pmatchz` named.

Headings. C `"Extended commands"` / `"Debugging Extended Commands"`. JS `"Extended Commands"` (capital C). **String miss on pass 0.** Command rows `add_menu_str` (not selectable). JS `selectable:false`. **Match.** Format ` %-14s %4s %s`. JS `padEnd(14)` + `padStart(4)`. **Match `:677–679`.**

Meta. `'a'` toggle menumode; `':'` gaccel `'s'` start search; searching `'s'` gaccel `':'` stop; `'z'` onelist. JS `selector`/`gselector` + options `ghit` whole-list. **Match `:588–621` + `:693–713`.** ESC clears search. **Match `:714–717`.** Search getlin `"Extended command list search phrase?"` then mung; ESC empties. **Match `:719–728`.**

Footnote. C `visctrl(cmd_from_func(do_reqmenu))`. JS `visctrl('m')`. Named BIND. Strings `[A] Command autocompletes` / `[m] Command accepts 'm' prefix`. **Match the default m-prefix.**

`doextcmd`. C `while (func == doextlist)` after `can_do` / m-prefix / `ext_tlist`. JS `funcIsDoextlist = ec.name==='?'`. Table `txt:"?"` is that function. BIND overlay named. **Match `:498–518` for the default table.** `#?` runner `await doextlist()`. **Match.** Help `k` `hmenu_doextlist`. **Match `:2813–2816`.** Old `cmdhelp` gone.

Callee closure (`doextlist` arm). LIVE: `getlin`, `mungspaces`, `strstri`, `strsubst`, `select_menu_pick_one`, `can_do_extcmd`. CLONE: `pmatchi`/`pmatch_internal`, `accept_menu_prefix_tab`, `visctrl('m')`. OMIT named: BIND=`cmd_from_func`, `pmatch`/`pmatchz`. STUB: none. The arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `#?` and help `k` list EXTCMDLIST NHW_MENU and `doextcmd` loops: **true.** D-log `':'`/`'s'` group accel: **true.** Do **not** stamp “Match C heading `"Extended commands"`” (JS capital-C). Do **not** stamp “Match C `cmd_from_func(do_reqmenu)` footnote.” Do **not** stamp “Match C BIND= `seeall` / `M('?')` keystroke.” Do **not** stamp “Match C `pmatch` / `pmatchz`.” Do **not** stamp “Match C `#seeall`” (D-1605). Fortress help `k` / `#?` is public-unhit unless a session types them.

## Density

+365: C `doextlist` + `doc_extcmd_flagstr` + `doextcmd` loop + help caller + the search callees (`strstri`/`pmatchi`/`gselector`). §2b one cmd.c family. Did not glue `#seeall` or BIND=. Large because the menu body is 175 C lines.

## Branch-by-branch confirm

1. Skip INTERNALCMD / not-available / wiz / autocomplete toggle. **Match.**
2. Two-pass headings / onelist. **Match control; pass-0 heading capital-C miss.**
3. Search strstri + pmatchi; no-matches. **Match.**
4. `'a'`/`:`/`s`/`z` + getlin phrase. **Match.**
5. Footnote `[A]`/`[m]`. **Match default m.**
6. `doextcmd` while `?`. **Match table.**
7. Help `k`. **Match.**

## Callers / RNG ledger

Wired: EXT_CMDS `"?"`; `doextcmd` loop; `dohelp` `k`. Unwired C: BIND= keystroke. Conf: no `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `strstri` in `cmd.js`. Do not add `pmatchi` #2. Do not add `accept_menu_prefix` #2. Do not import `fs`. pager→cmd is SAFE (dynamic + hoisted).

## Verification

D-log green+strict seed8000/0900; cohort **7**/7 + seed2200/0383 + strict. **Public-unhit** for `#?` / help `k` / search / wizard onelist / genocided strsubst. Fortress does not type `#?`. BIND= unhit.

## Actionable C-wrongs

1. Pass-0 heading JS `"Extended Commands"` vs C `"Extended commands"` (`cmd.c:573–574`). One-line string fix. Do not treat that as BIND=.

Named (map, not Must-fix): BIND= `seeall` / `M('?')` / `cmd_from_func(do_reqmenu)`; `pmatch` / `pmatchz`; remaining extcmd bodies. Do not add `doextlist` in `pager.js`. Do not re-port `#seeall`.

Verdict: **ACCEPT-WITH-DEBT**
