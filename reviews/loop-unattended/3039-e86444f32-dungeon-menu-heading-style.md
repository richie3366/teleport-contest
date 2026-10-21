# Review 3039 — e86444f32 — dungeon.c headings through add_menu_heading

- SHA: `e86444f32` (cliffs head, owner label save_dungeon, parked
  MISATTRIBUTED: scen-options-Barbarian-50355007 step 92)
- D-entry: D-4199; Ledger: print_mapseen ported; print_dungeon ported
- `js/` diff: dungeon.js +10 −10

## Intent vs deliverable

Promise: print_mapseen's dungeon line (`:3553`) and print_dungeon's
dungeon lines (`:2331`) go through add_menu_heading, i.e. the live
`iflags.menu_headings` attr and colour, cleared during final disclosure.
The level-teleport prompt gets tty_menu_promptstyle (end_menu `:2369`).

Diff: three `attr: ATR_INVERSE` literals become spreads of the D-4186
helpers (`menu_heading_style()` ×2, `menu_prompt_style()` ×1).
show_overview passes menu_heading_style through `ctx` in place of
ATR_INVERSE, and both now-unused terminal.js imports are dropped. The
promise matches the diff.

## Inventory

- print_mapseen — dungeon.js:3052 (C dungeon.c:3515–3728); the heading
  at `:3079–3085`.
- show_overview — dungeon.js:3269 (ctx build only).
- print_dungeon — dungeon.js:3540 (C `:2290–2390`); prompt row and the
  bymenu heading row.
- menu_heading_style / menu_prompt_style — options.js:6331 / :6318,
  sync exports, reviewed at 3026 (D-4186). Dynamic imports, no cycle
  question.

## C ↔ JS fidelity

C add_menu_heading (windows.c `:1815–1828`) reads
`iflags.menu_headings.{attr,color}` and forces ATR_NONE / NO_COLOR
under `program_state.gameover`. menu_heading_style does the same, in
that order (options.js:6332). The old print_mapseen gate was
`why > 0 ? 0 : ATR_INVERSE`, a proxy for final disclosure that also
ignored the colour. The new one reads gameover, the C condition.

print_dungeon: C `if (bymenu) add_menu_heading(win, buf); else
putstr(win, 0, buf);`. The JS bymenu=FALSE branch writes its own text
lines at attr 0 and is untouched, which matches C. The prompt row stands
for tty_end_menu's prompt, which wintty.c paints in
tty_menu_promptstyle (`:2685–2689`): menu_prompt_style models exactly
that. No RNG on either path.

## Hallucinations / overclaim

None. The named-omission list of other add_menu_heading callers is
accurate for this window: D-4201 (review 3041) then takes pickup.c, and
the remaining files are each another C file.

## Density

Three call sites in one C file, one falsifier. Right-sized.

## Verification

```text
verify save_dungeon,print_mapseen,print_dungeon --base e86444f32~1 --no-reach
  save_dungeon: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-options-Barbarian-50355007: PASS
  print_mapseen, print_dungeon: 0 blocked (vacuous; row labelled save_dungeon)
```

D-log: green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 672
baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
