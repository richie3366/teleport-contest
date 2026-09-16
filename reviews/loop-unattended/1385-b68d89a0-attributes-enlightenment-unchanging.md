# Review 1385 — b68d89a0 — attributes_enlightenment Unchanging arms (D-2423)

- SHA: `b68d89a0`, D-2423 (Open row: Monk-92013 step 135,
  Unchanging disclosure writer). JS files: `js/invent.js`
  (+140/−9: shape-change arms on both builders) and
  `js/pager.js` (+10: menu-text wrap at storage).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the `:1834–1856` + `:1892–1893` arms in C
order on both builders (final `enlightenment`, ^X
`doattributes`) plus the menu wrap the 68-char Unchanging line
needs. Diff delivers all of it, with remaining arms still
named.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| Protection arm (both builders) | new branch | LIVE — C `:1834–1836` |
| Unchanging + blocked-shape + Polymorph arms (both) | new branches | LIVE — C `:1837–1856` |
| Unchanging-while-poly arm (both) | new branch | LIVE — C `:1892–1893`, after were-form/foreign-shape, before Hate_silver |
| `Protection_from_shape_changers` (were.js:57, sync) | C callee | LIVE — dynamic import, no new static edge |
| `Unchanging` (polyself.js:363, sync) | C callee | LIVE — dynamic import, no new static edge (sym-listed clones elsewhere pre-existing, untouched) |
| `Upolyd` (const.js) / `ismnum` / `from_what` / `UNCHANGING`+2 consts | callees/consts | LIVE — pre-existing |
| Polymorph predicate (flat H/E + uprops) | local inline | verified CLONE — same predicate as `allmain.js` Polymorph per D-log (no canonical export to import) |
| menu-text wrap (`show_nhw_menu_text`) | shared-primitive change | LIVE — C `tty_putstr` NHW_MENU `:2401–2418` |

No symbols deleted or re-pointed.

## C ↔ JS fidelity

C loci read in pinned source: `attributes_enlightenment`
arms (`insight.c:1834–1856`, `:1892–1893`; single C function
serving both paths — JS's two-builder split is established),
`you_can` macro (`:109`: `enl_msg(You_, can, could, …)` with
`can[]="can "`, `could[]="could "` at `:45–46`), `tty_putstr`
(`win/tty/wintty.c:2401–2418`).

- `you_can("not change…")` ≡ `enlght_line_txt(You_, final ?
  'could ' : 'can ', …)` on the final builder; ^X hardcodes
  `'can '` (final==0) inside the `o()` in-progress wrapper —
  the established two-builder tense split. ✓
- Blocked-shape: `Polymorph → 'polymorph'/'have polymorphed'
  else ismnum(ulycn) → 'change shape'/'have changed shape'`
  with `enl_msg(You_, buf, buf, …)` same-wording-both-tenses
  ≡ JS verbatim (final builder keys on `final`, ^X on the
  `!final` readings). `else if (Polymorph) → 'polymorphing
  periodically'` preserved on both. ✓
- `:1892` arm placed after foreign-shape/were-form, before
  Hate_silver on both builders ("C order among live arms" —
  were-form deferred on ^X is named, not silently dropped). ✓
- Wrap: C stores the compressed line, sets `maxcol` from the
  raw `n0`, then breaks at a space when `n0 > CO` with the
  fragments as data rows. JS computes `maxcol` from raw
  `length+1` first, then expands via the D-1892-tested
  `wrap_text_window_line` — same order of operations. The ^X
  path needs no wrap (C `^X` uses `add_menu`, no compress) —
  correctly untouched. ✓
- RNG-neutral. Named (not charged): `lays_eggs`, ^X were-form,
  Free_action/Fixed_abil, Slow_digestion/combat set — all
  pre-existing. ✓

## Hallucinations / overclaim

None. The mid-iteration probe files were deleted (nothing
orphaned in the tree), and the D-log scopes the Monk PASS
against the Caveman residual explicitly.

## Density

~150 `js/` lines for one disclosure family on two builders +
one shared-primitive fix it required. One locus family, one
falsifier — acceptable.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify one_characteristic --base
  b68d89a0~1` → `1 PASS, 0 moved past, 1 unchanged, 0 worse →
  PROGRESS` (Monk-92013 → PASS; Caveman-92148 still
  `one_characteristic`@245 on its documented row-12 Grimtooth
  residual) — reproduces the D-log exactly. Genuine owner
  PASS, no D-1831 shape.
- D-log's green/strict/cohort + full fortress 44/44 (shared
  `pager.js`) accepted as stated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
