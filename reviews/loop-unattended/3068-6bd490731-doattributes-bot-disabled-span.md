# Review 3068 — 6bd490731 — doattributes wraps its menu span in bot_disabled

- SHA: `6bd490731` (cliffs rows process_menu_window ×3:
  scen-vault-Caveman-53456079 step 256, Ranger-53456004,
  Wizard-53456040)
- D-entry: D-4228; Ledger: doattributes ported (status unchanged, D-id
  added)
- `js/` diff: invent.js +10 −0 (a try/finally around the existing
  painter, no re-indent)

## Intent vs deliverable

Promise: in C, ^X goes doattributes → enlightenment(mode,
ENL_GAMEINPROGRESS) → `select_menu(en_win, PICK_NONE)` (insight.c
`:451–460`, en_via_menu = !final). windows.c select_menu sets
`gb.bot_disabled = TRUE` around win_select_menu (`:1855–1865`).
tty_select_menu dismisses inside that span, and the docrt there meets a
guard parked at <0,0>. The impossible()'s flush_screen then calls bot(),
which returns at once (botl.c `:255–256`), so the status rows that docrt
blanked stay blank through the --More--. JS painted, waited and
dismissed with bot enabled.

Diff: `const _botPrev = set_bot_disabled(true); try { … } finally {
set_bot_disabled(_botPrev); }`. The span covers the NEED_MORE flush,
both page painters, the key wait and the docrt / erase_menu_or_text
dismissal. The closing `flush_screen(1)` stays outside. The diff
matches the promise.

## Inventory

- doattributes — js/invent.js:7929 (C insight.c `:2008–2019`; the JS
  body inlines enlightenment `:385–462` and a select_menu /
  process_menu_window painter). Touched span `:8955–9065`.
- Callee: set_bot_disabled (display.js:7787, sync, the
  `gb.bot_disabled` setter that returns the previous value). It is the
  same idiom as select_menu_pick_none (invent.js:3407), getline.js:287
  and iactions.js:877.

```text
$ node scripts/sym.mjs set_bot_disabled
set_bot_disabled js/display.js:7787   sync
$ node scripts/sym.mjs select_menu_pick_none
select_menu_pick_none js/invent.js:3404   ASYNC — await required
```

  No symbol was deleted or re-pointed.

## C ↔ JS fidelity

C windows.c select_menu `:1855–1865`:

```c
boolean old_bot_disabled = gb.bot_disabled;
gb.bot_disabled = TRUE;
reslt = (*windowprocs.win_select_menu)(window, how, menu_list);
gb.bot_disabled = old_bot_disabled;
```

What C runs inside the span (tty_select_menu `:2774–2815`), and what JS
now runs inside it:

- tty_display_nhwindow(NHW_MENU) `:1854–1950`: the
  `toplin == TOPLINE_NEED_MORE` → tty_display_nhwindow(WIN_MESSAGE)
  flush at `:1921–1922` is inside select_menu. JS's
  `if (topline_need_more()) await display_nhwindow_message()` is
  inside the span too. This matches.
- Fullscreen (offx == 0) clear and paint vs corner tty_clear_nhwindow:
  JS's two branches are inside the span. They paint no status, as
  process_menu_window paints none.
- tty_dismiss_nhwindow → erase_menu_or_text `:965–984`: offx == 0 →
  `docrt(); flush_screen(1);`, else docorner (`:3649–3721`), whose tail `:3716–3720`
  sets `botlx = TRUE; bot();`. In C both bot() calls return under the
  flag and leave botl/botlx set, because bot() clears the flags only
  past the gate. JS's `docrt()` / `erase_menu_or_text` are inside the
  span, and display.js set_bot_disabled's note confirms that botlx is
  preserved, not cleared.
- After the span: C returns ECMD_OK, and the next flush paints the
  status from the surviving botlx. JS's `flush_screen(1)` after
  `finally` does the same before the next key wait. C's own
  `flush_screen(1)` inside erase_menu_or_text has no JS twin in the
  fullscreen arm, but under bot_disabled it paints nothing that the
  post-span flush would not. No capture boundary falls between the
  two, so the result is net-identical.

The `try/finally` also restores the flag when a pending impossible()
throws (NhTerminate), which matches C because C cannot unwind there.
No RNG is involved.

## Same-C-file sites

insight.c's other select_menu call (`:2754`, the vanquished sort order,
PICK_ONE) goes through JS options.js select_menu_pick_one (insight.js:1149), which opens its own span (options.js:10092). So
no insight.c site is left without the flag.

## Hallucinations / overclaim

- Cite drift in the D-entry: "wintty.c tty_select_menu `:2832–2858`
  (dismiss `:2851`)" points at the tail of tty_yn_function. Pinned
  tty_select_menu is `:2774–2815` with dismiss at `:2794` (`csym.mjs
  tty_select_menu`). "erase_menu_or_text `:991–1008`" is really
  `:965–984`, which the JS comment cites correctly. These are text
  errors only, and the code follows the right C.
- "Named omissions: none in doattributes" holds for the span. The
  structural debt is not named: doattributes is a hand clone of
  enlightenment + select_menu/process_menu_window (≈1,100 lines) and
  not a call into select_menu_pick_none. This commit adds a hand copy
  of select_menu's bot_disabled bracket to that clone. I found no
  divergence in the touched span, so it is debt, not a C-wrong.

## Density

One owner, 3 rows, the cliffs head after D-4227, a 10-line bracket in
the C shape. Right-sized.

## Verification

```text
hidden-proxy verify process_menu_window,doattributes --base 6bd490731~1 --no-reach
  verify process_menu_window: baseline 6bd490731~1 (scoreboard at eac44aba5) — 3 blocked
    scen-vault-Caveman-53456079: PASS
    scen-vault-Ranger-53456004: PASS
    scen-vault-Wizard-53456040: PASS
  verify process_menu_window: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify doattributes: 0 blocked (vacuous; rows were owned by process_menu_window)
```

This agrees with the D-log (3 PASS, green 2/2, strict ×2, cohort 7/7,
full 44/44, sweep 769/0 regressed → REACH-OK, board 772/773).
`--rulecheck` is clean, and the diff has no FORCE, DIAG or seed reads.

## Actionable C-wrongs

None that block this SHA.

Debt (map, not Must-fix): doattributes paints its own select_menu /
process_menu_window clone, so every windows.c select_menu behaviour,
now including bot_disabled, has to be hand-copied into it. Routing the
`!final` arm through a menu window + select_menu_pick_none would retire
the copy. No failing row asks for that today.

Verdict: **ACCEPT-WITH-DEBT**
