# Review 1232 — 9ac4640d — pager DEF_INVISIBLE arm keyed on shown glyph

- SHA: `9ac4640d` — "`pager.c` `do_screen_description` DEF_INVISIBLE arm keyed on the shown glyph, not `mon_at` (D-2266)"
- D-log: D-2266. Queue row: `cmd.c there_cmd_menu_next2u` (literal-heuristic misattribution).
- Corpus session: scen-tour-Wizard-91112 step 77 (`;l.` farlook at the invisible master lich cell).

## Intent vs deliverable

Subject promises: the DEF_INVISIBLE arm of `do_screen_description` driven by the
shown glyph, not by `mon_at`. Diff actually adds: 12 lines in `js/pager.js`
`describe_looked` — a `glyph_is_invisible_id(glyph)` check before `mon_at`,
returning `I` + `an(unseen)` with the EDetect/Blind select, `first = unseen`,
`found = 1`. No new imports, no other files. Promise matches diff exactly.

## Inventory

- New/changed JS: `describe_looked` invisible-glyph early arm (`js/pager.js:1570-1577`).
- Helpers: `glyph_is_invisible_id` — C callee, live canonical export
  (`js/display.js:789`, `sym.mjs`: sync, `glyph === GLYPH_INVISIBLE`). `an`,
  `I_SPECIAL`, `EDetect_monsters`, `Blind` — all pre-existing live uses.
- No symbol deleted or re-pointed (the older `mon_glyph`-keyed `ch === 'I'`
  fallback at `:1587-1595` is kept, now shadowed when the glyph itself is
  invisible).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/pager.c:1406-1417` (via `csym.mjs`,
body range `:1246-1627`). Branch walk:

- C derives `sym = glyphinfo.ttychar` from `glyph_at` when looked (`:1267-1271`),
  then the monster-class loop explicitly skips `S_invisible` (`:1338-1339`),
  the object loop cannot match `'I'`, and `if (sym == DEF_INVISIBLE)` (`:1406`)
  prints `an(unseen_explain)` with
  `usealt = (EDetect_monsters & I_SPECIAL) != 0` and
  `(usealt || Blind) ? altinvisexplain : invisexplain` (`:1407-1410`).
- Strings confirmed at `pager.c:63-64`: `invisexplain = "remembered, unseen,
  creature"`, `altinvisexplain = "unseen creature"` — JS literals match
  verbatim, select order matches.
- JS tests glyph-id equality where C tests the derived ttychar. For the looked
  path both derive from the same `glyph_at` value and GLYPH_INVISIBLE's ttychar
  is DEF_INVISIBLE, so they agree on every reachable input; the only theoretical
  split is a hallucination-remapped ttychar, which has no corpus weight and no
  C arm I can cite for farlook — noted, not queued.
- C does not return after the arm, but with `sym == 'I'` none of the later arms
  (nothing/unexplored/cmap) can match, and C `found` is 0 on entry
  (S_invisible skipped, no object match), so JS `found: 1` + early return is
  exactly the C end state. The trap arm ahead of it in JS is disjoint by glyph-id
  range, so the JS-vs-C arm order difference is immaterial.
- `first = unseen` matches C `*firstmatch = unseen_explain`; `need_to_look`
  stays clear both sides (no didlook parenthetical — JS comment at `:1584-1586`
  states this correctly).

No C-wrong. The kept `mon_glyph` fallback is now redundant on its main path but
harmless (identical output); not a clone-divergence.

## Hallucinations / overclaim

None. D-log says "Match C" for the dispatch arm and the arm's only callees
(`glyph_is_invisible_id`, `an`) are live. The "js-throw" token in the verify
line is explicitly disclosed as the null-owner display fallback with
`error: null` — I re-checked the working scoreboard row for
scen-tour-Wizard-91112: `"error":null,"owner":null`, step 78, region map/menu.
Disclosure is accurate, not an overclaim.

## Density

12 insertions for a 12-line C arm — C is that small, so the sub-40-line size is
explicitly allowed (§2b). One falsifier, one locus, one module. OK.

## Verification

- `node scripts/imports.mjs --rulecheck` → "Rule #2 clean" (re-run this review).
- Re-measured: `node scripts/hidden-proxy.mjs verify there_cmd_menu_next2u
  --base 9ac4640d~1` → "1 session(s) blocked on it (1 at baseline, 0 in the
  working scoreboard) … moved → js-throw at step 78 (was 77) … 0 PASS, 1 moved
  past, 0 unchanged, 0 worse → PROGRESS". Step-77 screen now passes; the step-78
  residual is a wizmap `^F` map-row diff with empty toplines and null owner —
  a genuinely later owner, not a same-step re-report. Matches the D-log claim.
- D-log cites green 2/2 + strict ×2 + cohort 7/7; the 12-line diff touches only
  the looked-`I` path, which no public session paints (fortress re-confirmed at
  the end-of-iteration cadence run).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
