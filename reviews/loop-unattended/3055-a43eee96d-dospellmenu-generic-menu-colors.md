# Review 3055 — a43eee96d — dospellmenu and spellsortmenu on the generic tty menus

- SHA: `a43eee96d` (cliffs head `getspell`: scen-options-Priest-53051011
  step 51, `Z` after a menucolor «e» → white)
- D-entry: D-4215; Ledger: dospellmenu ported; spellsortmenu ported
- `js/` diff: spell.js +97 −130, options.js +6 −2, display.js +6 −5

## Intent vs deliverable

Promise: C dospellmenu builds its rows with add_menu_heading / add_menu /
end_menu and select_menu (`:2075–2168`), and windows.c add_menu applies
menucolors (`:1803–1807`). JS hand-painted fixed rows, so the coloured
row stayed gray. The commit says:

- dospellmenu and spellsortmenu run in C order on select_menu_pick_one /
  select_menu_pick_none, with the prompt/heading styles, the
  menu_tab_sep formats, and C's result arms;
- select_menu_pick_one cancels when a letter hits a preselected row;
- serialize_for_scoring CUFs mid-row inverse space runs.

Diff: all three are delivered. spell.js drops two private key loops and
the hand-painted heading parts. options.js changes two return lines in
select_menu_pick_one. display.js removes the `(!(wantAttr & 0x5) || end
=== lastCol)` guard on space-run compression.

## Inventory

- dospellmenu — spell.js:1667 (C spell.c `:2072–2168`). Rewritten.
- spellsortmenu — spell.js:1618 (C `:1975–2017`). Rewritten.
- select_menu_pick_one — options.js:10091 (generic PICK_ONE tty menu).
  One arm changed.
- serialize_for_scoring — display.js:7966 (capture serializer). One
  condition changed.
- New imports, all LIVE (sym.mjs):

```text
menu_prompt_style js/options.js:6333   sync
menu_heading_style js/options.js:6346   sync
get_menu_coloring js/options.js:6270   sync
cattr_to_cell    js/options.js:6363   sync
select_menu_pick_none js/invent.js:3404   ASYNC — await required
select_menu_pick_one js/options.js:10091   ASYNC — await required
paint_corner_nhw_menu js/invent.js:3152   ASYNC — await required
```

  paint_corner_nhw_menu is no longer called from these two functions
  but stays imported (other spell.js users). No symbol deleted. The
  options.js import carries `SAFE per imports.mjs (hoisted fns)`: only
  function declarations, no top-level TDZ read.

## C ↔ JS fidelity

**dospellmenu**, branch by branch against `:2103–2167`:

- Heading `:2103–2114`: the non-tab format is `"%s%-20s Level %-12s Fail
  Retention"` with the `""` vs `"    "` DUMP prefix; JS builds the same
  with padR(20)/padR(12). The tab arm is `Name\tLevel\tCategory\tFail\t
  Retention`, the same. Wizard adds `"%c%6s"` sep + "turns"; JS uses
  padL(6). It is added with add_menu_heading, so menu_heading_style
  applies: live iflags.menu_headings, none/no-colour at gameover
  (windows.c `:1815–1828`), and SKIPMENUCOLORS (no get_menu_coloring on
  the heading). Same.
- Rows `:2117–2131`: `splnum = spl_orderindx ? [i] : i`. Both fmts match
  char-for-char (`%-20s  %2d   %-12s %3d%% %9s` / `%s\t%-d\t%s\t%-d%%\t
  %s`). Wizard uses spellknow(i), the loop index, as C does. Selector is
  spellet(splnum). Preselected when splnum == splaction. In
  select_menu_pick_one, selectable rows get get_menu_coloring on the
  bare text with attr_n 4, which matches windows.c add_menu plus wintty
  `:1442–1446`.
- VIEW `:2133–2143`: one spell gives PICK_NONE, else a `'+'` "[sort
  spells]" row. Same.
- end_menu prompt: tty_end_menu (`:2681–2689`) prepends the prompt row
  in tty_menu_promptstyle, then a blank row. The JS raw order is prompt,
  blank, heading. Same.
- Result `:2148–2167`. n > 0 with the pick == splaction gives FALSE,
  else TRUE. n ≤ 0 with splaction ≥ 0 gives TRUE with spell_no =
  splaction, else FALSE. JS `picked` / `splaction >= 0` / fallthrough is
  the same. The C `n > 1` skip: in tty PICK_ONE, a letter on an
  unselected row toggles it on and finishes, and the preselected row
  stays on (wintty `:1752–1760`, toggle_menu_curr `:1114+`). So n = 2
  and C takes the non-preselected one. select_menu_pick_one returns that
  same hit row. Net-identical.
- PICK_NONE: rows go to select_menu_pick_none pre-rendered as `"x - "`
  plus text, with menucolor past descStart 4. tty bakes the selector
  into curr->str whatever `how` is, so the prefix is right. VIEW has no
  preselect, so `-` never needs to be `*`.

**spellsortmenu** `:1988–2016`: the blank add_menu_str ahead of 'z',
the letters `'a'+i` / `'z'`, preselect on spl_sortmode, the end_menu
prompt, and n > 0 → spl_sortmode = choice, TRUE, else FALSE. JS is the
same. Return keeps the preselected row: select_menu_pick_one's
`finishPick` gives n = 1, so it returns TRUE with the current mode, as
in C.

**select_menu_pick_one**: wintty `:1752–1760` toggle_menu_curr on a
selected row (no count) deselects it, then PICK_ONE finishes. With the
single preselect these menus use, n = 0, so cancel is C. The change is
global. Other PICK_ONE callers with preselected rows (options.js
handlers :463, :2392, :3021, …; insight.js:1178) now also get n = 0 on
their own letter, which is C's tty behaviour. The board-wide re-check is
the D-log's 710/710 sweep.

**serialize_for_scoring**: this is not C game logic. It emulates the
contest capture. The commit cites the captured byte string
`\e[7m    Name\e[17CLevel Category\e[5CFail Retention` (step 51) as the
evidence for compressing mid-row inverse runs. D-0129's old guard said
"no session shows them compressed", and this session now does.

## Hallucinations / overclaim

None found. The D-log moved the owner on to doset at step 73 (not
PASS) and said so. dowizcast's hand-painted menu is a named omit with
the true reason (no C call sites, `:787–815`). show_spells (DUMP) is
unwired by D-1776, so the DUMP path through select_menu_pick_one is
never reached in play.

Generic-helper limits, already present and not made worse here: in
select_menu_pick_one a count prefix (`5a`) is not modelled
(toggle_menu_curr with counting keeps a preselected row on, so n = 1).
A PICK_ONE menu with two preselected rows would return cancel where C
returns the other one. No spell or option menu has two preselects. No
session reaches either case.

## Density

One cliff (the spell menu's menucolor row), done as the whole C
function pair plus the one generic toggle arm and the serializer case
the probe needed. All three are on the same screen path. Right-sized.

## Verification

```text
verify getspell,dospellmenu,spellsortmenu,select_menu_pick_one,serialize_for_scoring
       --base a43eee96d~1 --no-reach
  verify getspell: 1 session(s) blocked (1 at baseline)
    scen-options-Priest-53051011: PASS
  verify getspell: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  dospellmenu / spellsortmenu / select_menu_pick_one / serialize_for_scoring:
    0 blocked each (vacuous; board names getspell)
```

The PASS on HEAD includes the later doset / nhl_text / print_mapseen
commits (D-4216..4218). At this SHA the D-log claimed "moved past to
doset step 73", which is consistent. The diff has no seed, step or
coordinate reads. The D-log lists green 2/2, strict ×2, cohort 7/7,
full 44/44 and sweep 710/710 REACH-OK. The sweep matters here because
the serializer change reaches every screen.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
