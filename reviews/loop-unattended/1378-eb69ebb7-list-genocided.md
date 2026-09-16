# Review 1378 — eb69ebb7 — list_genocided + set_vanq_order + pick-one preselect (D-2412)

- SHA: `eb69ebb7`, D-2412 (Open row: Samurai-92088 step 272,
  genocided-stub symptom). JS files: `js/insight.js` (+330/−~15:
  `num_extinct`/`num_gone`, three pure builders, `VANQORDERS`,
  `MLET_EXPLAIN`, `set_vanq_order`, full `list_genocided`),
  `js/options.js` (+20/−~2: pick-one preselect paint + finish).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the ngone>0 menu arm in C order, `set_vanq_order`
with the C table, and the pick-one preselect finish that the sort
menu needs. Diff delivers all three, with deferrals named in the
envelope. The shared-primitive change (`select_menu_pick_one`) is
the part that needed auditing — done below.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `num_extinct` / `num_gone` | new exports (C staticfn) | LIVE — `:2970–3002` verbatim (LOW_PM order, unique skip, `&G_GONE)==G_EXTINCT`, `(mvflags&mflg)!=0`) |
| `genocided_prompt`/`_title`/`_line` | new pure builders | LIVE — `:3043–3048`/`:3072–3074`/`:3092–3103` verbatim incl. the extinct-suffix gate |
| `VANQORDERS` | new table | LIVE — 8 entries byte-identical to C `:2601–2618` |
| `MLET_EXPLAIN` + `upstart` | new table + callee | LIVE — `upstart` joined the pre-existing hacklib edge (`--can` → ALREADY; D-log's "new edge" overstates, same pattern as 1375) |
| `set_vanq_order` | new export | LIVE — menu build verbatim (skips, desc override, `a_int=i+1`, SELECTED on current); `<0 → return` wired by the caller |
| `list_genocided` | new export | LIVE — both/genoing/dumping, ask-gated ynaq/ynq, `done_stopprint`, ngone>1-gated sort with COUNT→ALPHA_MIX save/restore, title/blanks/lines/counts, `!gameover` pline tail |
| pick-one `*` paint + enter/space finish | shared-primitive change | LIVE — C `wintty.c:1467–1473` (`count==-1` → `'*'`) and `:1606–1638` (`\n`/`\r`/last-page-space → finished; ESC → deselect + WIN_CANCELLED ≡ cancel) |

No symbols deleted or re-pointed. Dynamic `./options.js` +
`./terminal.js` imports follow the artifact.js pattern (no new
static edge).

## C ↔ JS fidelity

C loci read in pinned source: `list_genocided`
(`insight.c:3005–3131`, csym range), `num_extinct`/`num_gone`
(`:2970–3002`), `set_vanq_order` (`:2717–2765`), `vanqorders`
(`:2601–2618`), tty menu loop (`win/tty/wintty.c:1460–1480`,
`:1590–1645`).

- `both`: C `:3021` is `gameover || wizard || discover`. JS adds
  `|| flags.explore` — redundant, not wrong: C explore mode sets
  `discover=TRUE` (`earlyarg.c:351`), so the extra disjunct can
  only fire where `discover` already fires. Nit, uncharged.
- Caller-safety of the pick-one change (11 call sites): only two
  pass preselected items — `yn_function_menu` (outcome-neutral:
  pick-of-default ≡ cancel→def, both yield `def`) and the new
  `set_vanq_order` (the intended beneficiary). `detect.js`
  preselects run through its own `paint_corner_nhw_menu` loop,
  not this primitive; `toggle_menu_curr` (`invent.js:2260`) is
  user-toggle mutation, not preselect. All other callers pass
  `selected` falsy → `finishPick` null → byte-identical paths.
  Space still pages on non-last pages; `>` still never finishes —
  C `:1630–1638` exact. ✓
- Named (not charged): single-entry `ynq` ESC-pad simplification
  (same as `list_vanquished`), sort-menu n>1 preselect-skip
  (unreachable under PICK_ONE), class-header ATR (primitive
  carries no per-line attr), `vanqsort_cmp` MCLS arms
  (pre-existing deferral), DUMPLOG putstr (retired).
- RNG-neutral (menu code draws nothing). ✓

## Hallucinations / overclaim

None material. Two overstated edge claims ("new hacklib edge" —
already existed). The verify narrative (272 prompt → 274 sort
menu with `t *` preselect → space-finish → 279 menu → 288/288)
is specific and checkable, and the re-measure below confirms the
headline.

## Density

~350 `js/` lines + a 110-line unit test for one disclosure
family (prompt + sort + menu + shared primitive). One locus
family, one falsifier — at the §2b ceiling but coherent; the
primitive change was prerequisite, not scope creep.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify list_genocided --base
  eb69ebb7~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Samurai-92088 → PASS) — reproduces the D-log
  exactly. Genuine owner PASS, no D-1831 shape.
- `node --test scripts/list-genocided.test.mjs` → 6/6 (re-run
  this audit). Green/cohort/full-44/44 per D-log accepted as
  stated (shared files changed, full auto-ran per the runner).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
