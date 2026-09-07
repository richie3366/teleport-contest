# Review 1015 — 29aff746 — do_screen_description monster arm (D-2045)

Metadata: SHA `29aff746`, D-2045, Open-row port (queue
owner `mondata.c name_to_monclass`; three screen-first
farlook rows: pet prefix letter + class-explain +
lookat parenthetical). js/ touches 2 files: `pager.js`,
`mondata.js`. No stamp owed.

## Intent vs deliverable

Subject promises: monster arm keyed on shown glyph with
`an(class explain)` + ` (lookat)`, DEF_INVISIBLE arm,
`mlet_class_explain` helper, and the missing
`LOOK_QUICK` conjunct in `do_look`. Diff delivers all
four. Promise ≡ diff.

## Inventory

- New JS: `mlet_class_explain` (`mondata.js:464`,
  sync export); monster arm + I arm (`pager.js`
  `describe_looked`); QUICK conjunct (`do_look`).
- `sym.mjs`: `mlet_class_explain` single def, no
  clash; `mon_glyph js/display.js:1512 sync` (shown
  char source, shared with `look_all`); `LOOK_QUICK
  js/const.js:1680` live const;
  `look_at_monster_buf` pre-existing pager-local clone
  (untouched, out of unit). `--can pager.js mondata.js`:
  ALREADY statically imported — no new edge at all
  (commit's "new edge" framing is harmlessly
  conservative). No symbol deleted or re-pointed.

## C ↔ JS fidelity

C loci (read directly): check_monsters
`pager.c:1327-1345`, DEF_INVISIBLE `pager.c:1406-1417`,
didlook `pager.c:1607-1625`, do_look gate
`pager.c:1941-1943`, invis strings `:63-64`, prefix
(`"%c        "`, 8 spaces).

Branch-by-branch confirm:

- Class arm: C matches shown `sym == showsyms[i]`,
  prints `prefix + an(explain)`, `firstmatch =
  explain` (bare). JS: `ch = mon_glyph(mtmp).ch`
  (shown char), `out = ch + 8sp + an(explain)`,
  `first = explain`. Prefix width ✓.
- didlook: C `look_buf[0] != '\0'` → `firstmatch =
  look_buf` (UNSTRIPPED — corpus proves it: C prints
  `(tame kitten)`), then ` (firstmatch)` appended,
  then ` [seen: monbuf]`. JS: `if (look)` →
  `first = look` unstripped (the old `^(tame|peaceful)`
  strip is correctly gone), parenthetical before
  `[seen:]` ✓ order.
- I arm: `usealt = EDetect & I_SPECIAL` ✓;
  `"unseen creature"` / `"remembered, unseen,
  creature"` ≡ `:63-64` ✓; no parenthetical, no
  `[seen:]`, `found = 1` ✓ (class loop skips
  S_invisible and the arm doesn't set need_to_look,
  so didlook never runs — early return exact).
  The `!found`/`else-append` split is unreachable
  here (`x_str` can't be set for `'I'`), so the
  unconditional shape is equivalent.
- `mlet_class_explain`: tables index-parallel to C
  (row 0 null/`''`, mirroring the loop-from-1 and
  the `explain && *explain` guard); `i > 0` is
  unobservable (`EXPLAIN[0] || null` is null either
  way). Mlet-keyed ≡ C's sym-keyed lookup because
  `newcham` changes `data` to the shown form
  (shifters carry their shown mlet); the genuinely
  shown≠data case (mimic furniture/object) is named.
- QUICK conjunct: C `:1941` reads `found == 1 &&
  ans != LOOK_QUICK && ans != LOOK_ONCE && (VERBOSE
  || (help && !quick)) && !clicklook` — the added
  `ans !== LOOK_QUICK` is C-literal (ONCE pre-existed;
  `!clicklook` is pre-existing JS structure, out of
  unit). Corpus-unreached, stated honestly.

Callee closure: `mlet_class_explain`/`mon_glyph`/
`an` LIVE; `look_at_monster_buf` pre-existing clone
(unchanged semantics — still returns the full look
buffer C's `look_buf` holds). Named omits (mimic
dispatch, multi-class `or …`, engraving quote,
coord suffixes) are pre-existing structure, each
cited. No STUB in the arm.

## Hallucinations / overclaim

None. "No corpus session reaches … the QUICK path"
is explicit; the `--can` CHECK-verdict line is
accurate in substance (edge safe).

## Density

~40 insertions / 2 files, one symptom family +
one same-function gate conjunct. Right-sized.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates
  (full `--rulecheck` once for the iteration — see
  review 1017).
- Re-measured `hidden-proxy verify name_to_monclass
  --base 29aff746~1`: `1 PASS, 2 moved past,
  0 unchanged, 0 worse → PROGRESS` (kit-Monk-92007
  PASS; genesis-Wizard-92223 → find_trap@81;
  normal-Knight-91100 → def_char_is_furniture@104)
  — non-vacuous (3 blocked at baseline), matches
  the D-log. My run includes the later-added QUICK
  conjunct and PROGRESS persists.
- Green 2/2 + strict ×2, cohort 7/7 per pasted tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
