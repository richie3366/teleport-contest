# Review 2906 — fbef2df47 — doset_simple_menu bool via live do_set + promptstyle + menu-C0

- SHA: `fbef2df47` (cliff writer: simple-menu bool toggle,
  1 probe + 2 verify sessions)
- D-entry: D-4067; Ledger: options.c (`doset_simple_menu
  ported`, +D-4067 tag; note now stale — see below)
- `js/` diff: `js/options.js` +26/−60 (stand-in deleted,
  bool arm rerouted, prompt + heading spreads),
  `js/invent.js` +9/−2 (menu C0 drop ×2 loops); 3 new
  focused tests

## Intent vs deliverable

Promise: (a) bool arm calls the shared
`optfn_boolean_do_set` mirror instead of the
`simple_bool_toggle` stand-in, so color-off marks
redraw+glyph-reset and reglyph_darkroom runs (probe
162→dosounds@269); (b) prompt/headings spread the relayed
`menu_prompt_style()` / `menu_heading_style()` (Barbarian
30→33); (c) menu painters drop C0 with column advance
(Samurai 120→146). The diff delivers exactly these three,
plus the stand-in deletion. Promise = diff.

## Inventory

- Deleted: `simple_bool_toggle` (was options.js:9975–
  1029) — bag write + partial after-change arms.
- Bool arm (options.js:10299): `await
  optfn_boolean_do_set(opt.name, simple_bool_value(opt),
  false)`. C: options.c :8660–8662 → optfn_boolean do_set
  :5191–5449.
- Prompt item (options.js:10213) + section headings
  (:10241): `...menu_prompt_style()` /
  `...menu_heading_style()` replacing hardcoded
  ATR_INVERSE. C: windows.c :1769–1778 / :1815–1828,
  wintty.c :2685–2689.
- `paint_overlay` (invent.js:2996) + corner menu loop
  (:3175): `charCodeAt(0) < 32 → continue` (drop, column
  advances). C: patch-006 nomux_putch.

Required step-3 paste (deleted symbol):

```text
simple_bool_toggle NOT FOUND in js/** (no export, no local function/const).
optfn_boolean_do_set js/options.js:11067   ASYNC — await required
```

Clean delete, zero dangling refs; the replacement is LIVE
and awaited at the call site.

## C ↔ JS fidelity

Arm A (bool toggle) — verified call-for-call. C :8661
builds `"!"+name` iff `*addr`, then parseoptions with
initial=FALSE; do_set writes `*addr = !negated` (:5286),
so negated = current value. JS passes
`simple_bool_value(opt)` (= current, read via opt.addr)
as negated with initial=false — toggle exact. I checked
all 22 Bool rows of `dosetSimpleOpts` against
`DOSET_BOOL_ADDR`: **22/22 identical addrs**, so the
kept read and the new write cannot diverge, and no
simple-menu name hits the mirror's silent-retreat
(:11069). The mirror covers every deleted stand-in arm
(hilite_pet :11090, terrain/weapon/armor status :11114,
showexp/time/showscore/showvers :11126, hitpointbar
:11132, OPT_GLYPH_RESET :11152, customcolors/symbols
:11170 — each C-cited) **plus** the previously missing
color :11166 (`:5399–5409` redraw+glyph marks — the fix),
fixinv/price_quotes/sortpack :11145, lit/dark vision
:11158, menucolors/guicolor :11178, mention_decor :11183.
C :8722 sets `give_opt_msg = FALSE` around the simple
loop, so the missing toggle pline is C-exact, not a gap.
Chain to the symptom: marks → doset_simple :8727
`reset_needed_visuals` (pre-wired) → reglyph_darkroom —
complete.

Arm B (promptstyle) — C paints the prompt with the
relayed slot (wintty.c :2685–2689) and headings with live
`iflags.menu_headings` (windows.c :1815–1828, gameover
suppression included in JS :6278). JS slot default
{NO_COLOR, MC_ATR_INVERSE} (:6235) equals C initoptions
(:7188–7189), so default rendering is unchanged; only rc
overrides diverge from the old hardcode — the C behavior
(Barbarian inverse+green corroborates).

Arm C (menu C0) — `continue` skips setCell while `i`
advances: drop + advance-1, the D-4056 grid rule
(review 2897 ACCEPT) applied to the menu painter the
Samurai session actually diverges in. No other painter
touched.

Ledger nit (not a C-wrong): the `doset_simple_menu` note
still lists "parseoptions-bool stand-in" as an omit —
the stand-in no longer exists (replaced by the direct
do_set call, same as fullscreen doset :11670–11673).
Next port iter folds one `ledger.mjs set` into its
commit; never a row.

## Hallucinations / overclaim

None. The "all 22 addrs identical" claim re-verified by
direct table diff above. The riding arms (B, C) are not
bundled cliffs: each was forced by a session blocked on
doset_simple_menu itself (playbook: fix each verify cause
once), same row, same function path.

## Density

Cliff writer, rank 22, first live past re-verified parks
(19 recipes ×2 msg_window, 95340 marker, D-4064/D-4065
parks — each falsifier quoted). Owner-null probe: writer
named by temp-DIAG measurement (reglyph never ran),
reverted. One `Ledger:` entry; omissions (1)–(3) named
in-commit with C cites — (1) matches the fullscreen
precedent, (2) is a standing row note, (3) is the D-1972
design. No unreached work: all three arms moved sessions.

## Verification

Re-measure (`--base fbef2df47~1 --no-reach`):

```text
verify doset_simple_menu: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-options-Barbarian-50355007: moved → handler_number_pad at step 33 (was 30)
  scen-options-Samurai-50162003: moved → doset at step 146 (was 120)
```

Exact match (owners + steps). Probe rescored live on HEAD
via read-only `show`: dosounds@269, RNG 9433/9433, scrM
920 — exactly the claimed 162/null→dosounds@269. Focused
tests 3/3 green on HEAD. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
