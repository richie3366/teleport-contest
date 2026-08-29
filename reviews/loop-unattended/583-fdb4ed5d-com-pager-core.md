# Review 583 — fdb4ed5d — questpgr.c com_pager_core synopsis putmsghistory (D-1622)

## Metadata
- Full / short hash: `fdb4ed5de5e2b01c0871e070172a0bda03cf16e2` / `fdb4ed5d`
- Parent: `5f2c5f4d` (D-1621). This file audits **this SHA only** (second of nine `js/` commits since review **581**). Archive **Addressed:** D-1622 `fdb4ed5d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 04:54:21 +0200
- D-id: **D-1622**
- Stats: `js/questpgr.js` +293/−73. Band **200–450** (js/ insertions **293** >250; id >454).
- Claims to close: Open `questpgr.c` `com_pager_core` synopsis after D-0616 / D-1588. Not restore_msghistory. Not convert_line `%Xh`. `reviews/loop-2026-08-15/` has no unpaid synopsis Must-fix.
- JS / map: `questpgr.js` `com_pager_core` / `qt_pager` / `com_pager` / `com_pager_legacy`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **549** named questpgr synopsis put; **575** named questpgr synopsis; D-0616 deliver-only (no unattended file for that SHA).

## Intent vs deliverable

Git subject promises: quest and legacy pager texts store `convert_line(synopsis)` via `putmsghistory` for `^P` (and synthesize `[text]` when default output promotes to a window), instead of delivering bodies with no history synopsis after D-0616.

Pinned C `questpgr.c` `com_pager_core` `:467–621` (`node scripts/csym.mjs com_pager_core`). Wrappers `com_pager` `:623–627`; `qt_pager` `:629–634`. `skip_pager` `:458–465` (`--callers` `:484`). `convert_line` `:327–420` (`--callers` `:433` pline, `:450` window, `:606` synopsis). `qtext_pronoun` `:197–233`. `deliver_by_pline` `:422–436`; `deliver_by_window` `:438–456`. `--callers com_pager_core`: `:626` common; `:632–633` role then common; `:163`/`:172` `killed_nemesis` rawtext. `--callers com_pager`: `allmain.c:832` legacy/pauper; `do.c:1927` portal; `quest.c` Bell/banished; `wizard.c` cuss. `--callers qt_pager`: `quest.c` firsttime/locate/goal/leader/… `:29`–`:447`. `putmsghistory` is D-1588 (`topl.c:676`).

```576:609:nethack-c/upstream/src/questpgr.c
    if (output == 0 && (strchr(text, '\n') || strlen(text) >= BUFSZ - 1)) {
        output = 2;
        if (!synopsis) {
            char tmpbuf[BUFSZ];
            Sprintf(tmpbuf, "[%.*s]", BUFSZ - 1 - 2, text);
            (void) strNsubst(tmpbuf, "\n", " ", 0);
            synopsis = dupstr(tmpbuf);
        }
    }
    if (output == 0 || output == 1)
        deliver_by_pline(text);
    else
        deliver_by_window(text, (output == 3) ? NHW_MENU : NHW_TEXT);
    if (synopsis) {
        char in_line[BUFSZ], out_line[BUFSZ];
        Strcpy(in_line, synopsis);
        convert_line(in_line, out_line);
        putmsghistory(out_line, FALSE);
    }
```

Old JS (D-0616): `qt_pager`/`com_pager` delivered via `deliver_quest_text` (convert whole blob, then newline/`>=255` → NHW_TEXT). No `com_pager_core`. No synopsis history. Legacy was a separate NHW_MENU clone (`com_pager_legacy`). `putmsghistory` already live (D-1588).

The diff **does** add `com_pager_core` (skip_pager, `nhl_nhlib_align_shuffle`, howtoput/`howtoput2i`, promote default+newline/`BUFSZ-1` then synthesize `[text]` with newlines→spaces, deliver pline vs window, `putmsghistory(convert_line(synopsis), false)`), wrap `com_pager`/`qt_pager`, embed `QUEST_MSG_META` synopses for live Arc/Bar/Pri/Wiz/Kni msgids, `msg_fallbacks.goal_alt→goal_next`, and append the same history tail on `com_pager_legacy` with `dat/quest.lua` `common.legacy` synopsis. It **does not** port lua VM, `qt_pager` second `nhl_init` common (`:632–633`), `qtext_pronoun` `%Xh`/`%dI`/`%ni`/`%oh`, array `rn2` (`:553–570` angel/demon_cuss), `output==3` NHW_MENU inside core, `pauper_legacy`, `killed_nemesis` rawtext (`:163`/`:172`), or `showerror` `impossible`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `com_pager_core` | C `:467–621` staticfn, **LIVE this SHA** | local; do not export #2 |
| `com_pager` | C `:623–627`, **LIVE** | now calls core `"common"` |
| `qt_pager` | C `:629–634`, **LIVE** role arm | common fallback **OMIT named** |
| `com_pager_legacy` | C `com_pager("legacy")` NHW_MENU clone, **LIVE this SHA** history tail | not core; `QUEST_COMMON` has no `"legacy"` |
| `skip_pager` | C `:458–465`, **LIVE this SHA** in core | wizkit; legacy clone still bypasses |
| `howtoput` / `howtoput2i` | C `:474–476`, **LIVE this SHA** | pline=1 window=2 text=2 menu=3 default=0 |
| `lookup_quest_entry` | C lua `questtext[section][msgid]`, **CLONE** | embedded tables, not VM |
| `synthesize_window_synopsis` | C `:591–598`, **LIVE this SHA** | `BUFSZ-1-2` then `\n`→space |
| `deliver_by_pline` | C `:422–436`, **LIVE** | per-line `convert_line` + `pline` |
| `deliver_by_window` | C `:438–456`, **LIVE** NHW_TEXT | `_how` ignored; NHW_MENU named |
| `convert_line` | C `:327–420`, **CLONE** | `%Xh` / `qtext_pronoun` named |
| `convert_arg` | C, **CLONE** | `%x` see/sense live |
| `qtext_pronoun` | C `:197–233`, **OMIT named** | `%dI`/`%ni`/`%oh` on synopsis |
| `putmsghistory` | C topl D-1588, **LIVE** | import; `FALSE` = no redotoplin |
| `nhl_nhlib_align_shuffle` | C `nhl_init` shuffle, **LIVE** | dungeon.js |
| lua VM / `nhl_loadlua` | C `:488–498`, **OMIT named** | embed |
| `qt_pager` common 2nd init | C `:632–633`, **OMIT named** | |
| array `rn2` | C `:553–570`, **OMIT named** | |
| `killed_nemesis` rawtext | C `:163`/`:172`, **OMIT named** | core has `rawOut`; unwired |
| `pauper_legacy` | C `allmain.c:832`, **OMIT named** | |

`node scripts/csym.mjs com_pager_core` → `:467-621`. `convert_line` → `:327-420`. `qtext_pronoun` → `:197-233`. `skip_pager` → `:458-465`. `--callers convert_line` includes `:606`. `--callers com_pager` includes `allmain.c:832`. `--callers qt_pager` includes `quest.c:29`.

RNG: `rn2` only in the named array-text arm (`:566`). Core success path has no RNG beyond `nhl_init` shuffle (pre-existing). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
com_pager_core   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:705
             => Do NOT write clone #2.
com_pager        js/questpgr.js:749   ASYNC — await required
qt_pager         js/questpgr.js:758   ASYNC — await required
com_pager_legacy js/questpgr.js:127   ASYNC — await required
convert_line     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:551
             => Do NOT write clone #2.
convert_arg      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:477
             => Do NOT write clone #2.
putmsghistory    js/display.js:1451   sync
skip_pager       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:621
             => Do NOT write clone #2.
howtoput2i       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:613
             => Do NOT write clone #2.
lookup_quest_entry NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:629
             => Do NOT write clone #2.
synthesize_window_synopsis NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:660
             => Do NOT write clone #2.
deliver_by_pline NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:670
deliver_by_window NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/questpgr.js:681
nhl_nhlib_align_shuffle js/dungeon.js:695   sync
```

`--can questpgr.js display.js putmsghistory`: `ALREADY: questpgr.js already statically imports display.js.` Do **not** stamp “cycle-forced clone.” Do **not** add `com_pager_core` / `convert_line` / `skip_pager` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`skip_pager(TRUE)` then `nhl_init`. JS `skip_pager` is `program_state.wizkit_wishing` (`:458–465`). Shuffle via live `nhl_nhlib_align_shuffle`. **Match `:484–498` for the JS-init stand-in.** Miss → `impossible` when `showerror`. JS `void showerror; return false`. Named.

Lookup. C `questtext[section][msgid]` then `msg_fallbacks` `tryagain`. JS `QUEST_ROLE_TEXT` + `QUEST_MSG_FALLBACKS.goal_alt='goal_next'` (`quest.lua:31–32`). Sampled synopses match lua: Arc firsttime `[You arrive at %H, but all is not well.]` (`quest.lua:257`); Arc `leader_first` (`:321`); Kni `goal_first` `[You %x the entrance…]` (`:1189`); Pri `leader_first` (`:1672`); `common.legacy` (`:136`). **Match those lua rows.** Other-role / other msgid → `null` → false. Named.

`rawtext`. C copies text and skips deliver/synopsis. JS `rawOut.text=text; return true`. No caller this SHA. Named `killed_nemesis`.

howtoput. C `get_table_option(..., "default", howtoput)` → `howtoput2i[]`. JS `HOWTOPUT`/`HOWTOPUT2I` same five names and `{1,2,2,3,0}`. Common `quest_portal` forced `'pline'`; other common `'default'`. **Match lua portal vs default; menu common.legacy is the clone path, not core.**

Promote. C checks **raw** `strchr('\n') \|\| strlen>=BUFSZ-1` while `output==0`. Old JS converted first then `>=255`. This SHA uses raw `text.includes('\n') \|\| text.length >= BUFSZ-1` with `BUFSZ=256`. **Match `:576–585`.** Synthesize `[%.*s]` width `BUFSZ-1-2` then all newlines to spaces. JS `slice(0, BUFSZ-1-2).split('\\n').join(' ')` then wrap. **Match `:591–598`.** `output==0\|\|1` pline else window. **Match `:601–604`.** `output==3` NHW_MENU: JS `_how` unused, always `show_text_pages`. Named. No live `QUEST_MSG_META` uses `'menu'`.

Synopsis history. C `#if 0` extra brackets off; `Strcpy` then `convert_line` then `putmsghistory(..., FALSE)`. JS `putmsghistory(convert_line(synopsis), false)`. **Match `:606–608` for the call.** `convert_line` clone does **not** run `qtext_pronoun` (`:197–233`). `%dI` (legacy), Pri `assignquest` `%ni`/`%oh`: JS leaves the modifier char on the string (`%d` expands, literal `I`). Open row `convert_line` pronoun `%Xh`. Not a silent stub of `putmsghistory`.

`qt_pager`. C role core then common if false (second `nhl_init`). JS one `com_pager_core(filecode, …)` only. **Named omit `:632–633`.** Success path: one shuffle. **Match the success arm.**

`com_pager`. C always core `"common"`. JS same. Portal still `deliver_by_pline` despite embedded newlines (`output==1` does not promote). **Match `:601` + lua `output="pline"`.**

Legacy. C `com_pager("legacy")` → core, `output=menu` → `deliver_by_window(NHW_MENU)` then lua synopsis through `convert_line`. JS `allmain.js` still calls `com_pager_legacy` (NHW_MENU clone). This SHA adds `putmsghistory(convert_line(QUEST_LEGACY_SYNOPSIS), false)` after `docrt`. Synopsis string **matches** `quest.lua:136`. `%dC` capitalize live; `%dI` pronoun named. `com_pager('legacy')` would miss (`QUEST_COMMON` has no key) — the live intro is the clone. `skip_pager` is **not** on that clone (C would skip wizkit). Pre-existing delivery; this SHA did not wrap it.

Callee closure (synopsis arm). LIVE: `putmsghistory`, `deliver_by_pline`, `deliver_by_window` (NHW_TEXT), `nhl_nhlib_align_shuffle`, `skip_pager` (core), `pline`. CLONE: `convert_line`/`convert_arg`, `lookup_quest_entry` (embed), `com_pager_legacy` (NHW_MENU). OMIT named: `qtext_pronoun`, qt_pager common, array `rn2`, NHW_MENU in core, `pauper_legacy`, rawtext, `impossible`. STUB: none on `putmsghistory`. The arm may ship. Not “Match C dispatch, callee is a stub” for the history put. It **is** “Match C `convert_line` on `%dI`/`%ni`” if anyone stamps that — they must not.

## Hallucinations / overclaim

Subject `convert_line(synopsis)` + `putmsghistory` and synthesize on promote: **true for `qt_pager`/`com_pager` success and for the legacy clone’s history tail.** D-log howtoput + live Arc/Bar/Pri/Wiz/Kni lua synopsis: **true vs the sampled lua rows.** Do **not** stamp “Match C `qtext_pronoun` `%dI`/`%ni`/`%oh` (`:197–233`).” Do **not** stamp “Match C `qt_pager` common fallback second `nhl_init` (`:632–633`).” Do **not** stamp “Match C lua VM / `nhl_loadlua`.” Do **not** stamp “Match C `output==3` NHW_MENU inside `com_pager_core`.” Do **not** stamp “Match C `skip_pager` on `com_pager_legacy`.” Do **not** stamp “Match C `killed_nemesis` rawtext / `stinky_nemesis`.” Do **not** stamp “Match C array `rn2` angel/demon_cuss.” Do **not** stamp “Match C `restore_msghistory`” (D-1614). Public `^P` after quest/legacy is unhit.

## Density

+293 in one `questpgr.js` envelope: C `com_pager_core` plus the lookup/howtoput/promote callees the synopsis tail needs. §2b one locus family. Did not glue restore_msghistory or `adjust_split`. Above the ~40-line peel floor. Large because the lua synopsis table is in-module; that is still one C function family, not a second subsystem.

## Branch-by-branch confirm

1. skip_pager wizkit in core. **Match; legacy clone named.**
2. howtoput default/pline/text/window. **Match table; menu named.**
3. Promote raw newline / `BUFSZ-1` + synthesize. **Match this SHA (old convert-first was C-wrong; fixed).**
4. deliver pline vs NHW_TEXT. **Match; NHW_MENU named.**
5. `putmsghistory(convert_line(synopsis), false)`. **Match the call; pronoun named.**
6. `msg_fallbacks.goal_alt`. **Match lua `:31–32`.**
7. `qt_pager` common / array rn2 / rawtext. **Named.**

## Callers / RNG ledger

Wired: `qt_pager` from `quest.js`; `com_pager` portal/Bell; `com_pager_legacy` from `allmain.js` `flags.legacy`. Unwired C: `qt_pager` common; `com_pager("legacy")` itself; `pauper_legacy`; cuss array; rawtext. Conf: no new `rn2` in the success envelope. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `convert_line` #2. Do not import `fs` to load `quest.lua`. Do not treat public `^P` absence as proof the synopsis ring matches C `%dI`.

## Verification

D-log green+strict seed8000/0900; cohort **7**/7 + seed0367/0360/0361/4500 + strict. **Public-unhit** for `^P` after quest/legacy synopsis (sessions do not dump the history ring). Fortress firsttime/legacy screens prove delivery, not the silent `putmsghistory(FALSE)` line. Pronoun modifiers unhit. `goal_alt` fallback unhit unless the role lacks `QUEST_GOAL_ALT`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `convert_line` `qtext_pronoun` `%Xh`/`%dI`/`%ni`/`%oh` (`questpgr.c:197–233` / `:342–351`); `qt_pager` common fallback (`:632–633`); array `rn2` (`:553–570`); NHW_MENU inside core (`:604`); `pauper_legacy`; `killed_nemesis` rawtext; `skip_pager` on the legacy clone; lua VM. Do not glue those into restore_msghistory. Do not add `com_pager_core` #2. Do not re-port `putmsghistory`.

Verdict: **ACCEPT-WITH-DEBT**
