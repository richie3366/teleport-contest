# Review 607 — 48758020 — wintty.c MENU_SEARCH + tty_wait_synch (D-1646)

## Metadata
- Full / short hash: `48758020045aba8b892df3b48f3f8705bb29957a` / `48758020`
- Parent: `cc8a839c` (D-1645). This file audits **this SHA only** (eighth of nine `js/` commits since review **599**). Archive **Addressed:** D-1646 `48758020`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 11:41:09 +0200
- D-id: **D-1646**
- Stats: `js/invent.js` +130/−6, `js/display.js` +84/−6, `js/options.js` +26/−6, `js/cmd.js` +1/−1, `js/getline.js` +1/−1. Band **150–350** (js/ insertions **242** <250; id >454).
- Claims to close: Open MENU_SEARCH / `tty_wait_synch` after D-1632/D-1642. Not kill_char (D-1632). Not doperminv body (D-1642). Review **603** named `tty_wait_synch` omit. `reviews/loop-2026-08-15/` has no unpaid MENU_SEARCH Must-fix.
- JS / map: `invent.js` `process_menu_search` / `toggle_menu_curr`; `options.js` pick_one/any; `display.js` `tty_wait_synch` / `more` inmore. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named `:` invalid + too_small skip wait_synch; review **593** ESC fallthrough is D-1639 not this SHA.

## Intent vs deliverable

Git subject promises: `:` searches via getlin+pmatchi+toggle (PICK_NONE bells; PICK_ONE first match) and too_small perm_invent flushes/recovers inmore/inread, instead of treating `:` as invalid after D-1632/D-1642.

Pinned C `wintty.c` `process_menu_window` `:1328–1768` (`node scripts/csym.mjs process_menu_window`). MENU_SEARCH `:1698–1731`. `toggle_menu_curr` is `static` `:1112–1151` (csym “no definition” — cite that range; `--callers` not used to find it). `tty_wait_synch` `:3623–3647` (`--callers`: `wintty.c:2475/:2963`, `termcap.c:259`). invent.c uses `wait_synch` macro `winprocs.h:140` at `:5637` (too_small) and `:2681` (identify_pack loop — **still named**). Callees `strutil.c` `pmatchi` `:151–155`; `topl.c` `more` `:204–248` / `addtopl` `:193–202`; `getret` `:763–781`.

```1700:1731:nethack-c/upstream/win/tty/wintty.c
        case MENU_SEARCH:
            if (cw->how == PICK_NONE) {
                tty_nhbell();
                break;
            } else {
                tty_getlin("Search for:", tmpbuf);
                if (!tmpbuf[0] || tmpbuf[0] == '\033')
                    break;
                Sprintf(searchbuf, "*%s*", tmpbuf);
                for (curr = cw->mlist; curr; curr = curr->next) {
                    ...
                    if (curr->identifier.a_void
                        && pmatchi(searchbuf, curr->str)) {
                        toggle_menu_curr(...);
                        if (cw->how == PICK_ONE) {
                            finished = TRUE;
                            break;
                        }
                    }
                }
            }
```

Old JS: pick_any named omit; pick_one/pickinv ignored `:`; too_small `void pline` without wait_synch; `intr++` named. The diff **does** shared `process_menu_search`, PICK_NONE bell, pick_one/any/pickinv/used-invlets/PICK_NONE wiring, `tty_wait_synch`, `more` inmore guard, export `pmatchi`. It **does not** port `map_menu_cmd` remaps, identify_pack loop `wait_synch`, or `tty_raw_print` setter. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `process_menu_search` | C MENU_SEARCH `:1698–1731`, **CLONE** | shared across pick_one/any/pickinv |
| `toggle_menu_curr` | C `:1112–1151`, **CLONE** | no `in_view`/`set_item_state` (no tty lineno) |
| `menu_search_str` / `menu_items_from_lets` | C `curr->str` analogue, **CLONE** | |
| `pmatchi` | C strutil.c `:151–155`, **LIVE this SHA** | was local; now export |
| `tty_wait_synch` | C `:3623–3647`, **LIVE this SHA** | ASYNC |
| `addtopl` | C topl.c `:193–202`, **CLONE** | `display.js:4572` — **do not add #2** |
| `getret` | C wintty.c `:763–781`, **CLONE** | `display.js:4586` — **do not add #2** |
| `more` inmore | C topl.c `:204–248`, **LIVE this SHA** | recursion guard |
| `ttyinv_create` / `sync_perminvent` too_small | C `:2963` / invent.c `:5637`, **LIVE this SHA** | `void tty_wait_synch()` from sync |
| `map_menu_cmd` | C before switch, **OMIT named** | |
| `wait_synch` identify_pack loop | C invent.c `:2681`, **OMIT named** | |
| `tty_raw_print` setter | C, **OMIT named** | `_tty_rawprint` field exists, setter named |

`node scripts/csym.mjs process_menu_window` → `wintty.c:1328-1768`. `tty_wait_synch` → `:3623-3647`. `more` → `topl.c:204-248`. `addtopl` → `topl.c:193-202`. `getret` → `wintty.c:763-781`. `pmatchi` → `strutil.c:151-155`. `--callers tty_wait_synch`: `:2963` create; invent.c uses the `wait_synch` macro not the tty name.

RNG: none in MENU_SEARCH / wait_synch / more inmore. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
pmatchi          js/cmd.js:357   sync
tty_wait_synch   js/display.js:4609   ASYNC — await required
process_menu_search js/invent.js:1616   ASYNC — await required
toggle_menu_curr js/invent.js:1548   sync
addtopl          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:4572
getret           NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:4586
more             js/display.js:4488   ASYNC — await required
```

`--can invent.js display.js tty_wait_synch`: ALREADY. `--can invent.js cmd.js pmatchi`: ALREADY. `--can options.js invent.js process_menu_search`: ALREADY. `--can display.js input.js nhgetch`: IN-SCC, **SAFE** (hoisted `nhgetch`; dynamic import in `getret`/`more`). Do **not** stamp “cycle-forced clone.” Do **not** write `addtopl` #2 or `getret` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

MENU_SEARCH. PICK_NONE → `tty_nhbell`, no getlin. Else `getlin('Search for:')`; empty/ESC noop. Pattern `*tmp*`. Walk selectable rows (`identifier.a_void` analogue); `pmatchi`; `toggle_menu_curr`; PICK_ONE finishes on first match. **Match `:1700–1731`.** C searches the **whole** `mlist`, not only the current page (lineno is only for `set_item_state`). JS walks the items array passed in (full menu for pick_one/any). **Match.** `toggle_menu_curr`: selected+counting+count>0 keeps selected and sets count; selected else deselects; !selected+counting+count>0 selects; !counting selects; counting&&count==0 returns false. **Match `:1112–1151`** minus `in_view` paint (no tty cursor). Do **not** add `toggle_menu_curr` #2.

Explicit `:`. C: if `:` is in `resp` before `resp_len` (page selector or, for PICK_ONE, gacc), `morc = MENU_EXPLICIT_CHOICE` and SEARCH is **not** taken. JS pick_one: search only if `!hit && !ghit && ch === ':'`. pick_any: page selector first, then SEARCH if `:` and `!hit`, then gacc. pickinv: after page/gacc. **Match the explicit-choice rule.** `map_menu_cmd` remaps **OMIT named** — a remapped `:` would still search in JS.

PICK_NONE menus: `process_menu_search([], PICK_NONE)` bells without getlin. **Match.**

`tty_wait_synch`. C: HUPSKIP named; `WIN_MAP==WIN_ERR || !ttyDisplay || rawprint` → `getret` then clear rawprint; else display map; if `inmore` `addtopl("--More--")`; else if `inread > gameover` SPECIAL_PROMPT + two `tty_doprev_message` + `intr++`. JS `!disp || _tty_rawprint` → `getret`; else `_buildScreenOutput`; inmore / inread same. **Match `:3623–3647`.** `getret`: C `xwaitforspace(" ")` after “Hit space/return to continue”; JS also accepts ESC in cbreak — **named analogue**. MICRO/WIN32CON `getreturn` **OMIT**.

too_small callers. C `:2963` / invent.c `:5637` are **blocking** `wait_synch()`. JS `void tty_wait_synch()` from **sync** `ttyinv_create_window` / `sync_perminvent`. When `disp` exists and `inmore==0` and `inread==0` (the 24×80 too_small path), C only fflushs the map — JS `_buildScreenOutput` and the Promise resolves with **no** `await`. `void` is then equivalent. The inread/rawprint arms **would** drop a real wait; those arms are not how too_small is entered in the port. Named analogue, not Must-fix. identify_pack `:2681` still **OMIT**.

`more`. C `if (inmore) return; inmore++; … inmore=0`. JS same via try/finally. debug_fuzzer skip **OMIT named**. WIN_STOP on ESC lives in `more_wait_keys` (pre-existing). **Match the recursion guard C `:213–216`.**

Callee closure (`:` / too_small). LIVE: `getlin`, `pmatchi`, `tty_nhbell`, `tty_doprev_message`, `tty_wait_synch`. CLONE: `process_menu_search`, `toggle_menu_curr`, `addtopl`, `getret`. OMIT named: `map_menu_cmd`, identify_pack wait_synch, rawprint setter, HUPSKIP, debug_fuzzer. STUB: **none in the live SEARCH / wait_synch arms.** Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `:` getlin+pmatchi+toggle + wait_synch inmore/inread: **true.** D-log green+cohort: **claimed; this review does not re-run.** Do **not** stamp “Match C `map_menu_cmd`.” Do **not** stamp “Match C identify_pack loop `wait_synch`.” Do **not** stamp “Match C `tty_raw_print` setter.” Do **not** stamp “Match C too_small always blocks on getret” — only the rawprint/`!disp` arm does. Public `:` search and 52×79 perm_invent are **public-unhit** (default perm_invent Off; menus in fortress rarely type `:`).

## Density

+242: C MENU_SEARCH 34 + toggle 40 + wait_synch 25 + more inmore + pick_one/any/pickinv wiring. §2b one wintty menu/synch family after D-1632/D-1642. Did not glue `optfn_perminv_mode`. Above a one-`if` peel.

## Verification

Wired: PICK_NONE bell; PICK_ONE first match; explicit `:` not search; inmore/`intr++`; too_small calls wait_synch. Unwired C: remaps; `:2681`; rawprint setter. Conf: no `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `:` and inread recovery. Fortress proves menus still accept letters; it does not prove SEARCH.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `map_menu_cmd` remaps; invent.c `:2681` display_inventory/`identify_pack` loop `wait_synch`; `tty_raw_print` setter; HUPSKIP; more debug_fuzzer; getret ESC vs `xwaitforspace(" ")`. Do **not** add `addtopl` #2 or `getret` #2. Do **not** re-port kill_char (D-1632) or `doperminv` (D-1642). Do **not** treat `void tty_wait_synch` on the too_small fflush-only path as a Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
