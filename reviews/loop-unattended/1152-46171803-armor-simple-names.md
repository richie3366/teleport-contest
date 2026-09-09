# Review 1152 — 46171803 — objnam.c armor simple names in trap.js burn/water paths (D-2186)

Metadata: SHA `46171803`, js/ +16/−25 in `do_wear.js`
(new `helm_simple_name` export + 2 ternary reuses) and
`trap.js` (4 stubs deleted, 2 import lines). D-log D-2186.
Subject promises: robe-vs-cloak in burn/water paths —
1 session PASS (Priest-92020 step 86).

Intent vs deliverable: promise matches diff. Actually adds:
one 1-line canonical `helm_simple_name` in do_wear.js;
trap.js re-points 4 clone names to imports. No new module
edge (`--can` confirms both edges pre-exist).

Inventory: +1 export (`helm_simple_name`), −4 locals
(`helm/cloak/gloves/suit_simple_name` in trap.js). No other
new/changed functions; `armor_simple_name` /
`armor_doff_simple_name` swap an inline ternary for the new
export (behavior-identical — same `hard_helmet` predicate).

**C ↔ JS fidelity**: confirm, four loci read at HEAD —
with one introduced gap.

- `helm_simple_name`: C `objnam.c:5512–5528` =
  `!hard_helmet ? "hat" : "helm"`. New JS verbatim
  (modulo operand order). ✓
- `cloak_simple_name`: C `objnam.c:5491–5509` (ROBE→robe,
  MUMMY_WRAPPING→wrapping, ALCHEMY_SMOCK→smock/apron,
  else cloak). do_wear.js export arm-for-arm. ✓
- `gloves_simple_name`: C `objnam.c:5531–5547` (dknown +
  strstri gauntlets). objnam.js export arm-for-arm. ✓
- `suit_simple_name`: C `objnam.c:5470–5489` (dragon
  mail/scales, ` mail`/` jacket` suffixes, else suit).
  do_wear.js export arm-for-arm. ✓
- Call sites: all `water_damage` ostr args now match C
  (`trap.c:1613/1622/1639/1641/1670/1685/1703/1706` use the
  same four fns); rocktrap passes_rocks arm now matches C
  `:1352` `an(helm_simple_name(uarmh))` (was constant
  'helmet' — wrong for hats); burnarmor case 1 now matches
  C `:119–121` (the shipped robe symptom). ✓
- GAP (introduced here): burnarmor case 3. C
  `trap.c:143–146` passes the literal `"gloves"`, never
  `gloves_simple_name`. The old trap.js stub returned
  constant 'gloves' (= C-correct); the new import returns
  'gauntlets' for dknown gauntlets, and JS `erode_obj`
  (`trap.js:3796`) prints `Your ${ostr} smoulders!`. So
  worn identified leather gauntlets + fire trap +
  `rn2(5)=3` now prints "gauntlets" where C prints
  "gloves". One-line fix, Must-fix below.
- Pre-existing, not this SHA: case-0 `materialnm` prefix
  (named in D-log); rocktrap verbose arm prints a fixed
  string where C `:1359` uses `Yname2(uarmh)` (noted
  in-code, untouched); mhitu.js keeps a second
  `helm_simple_name` export (`sym.mjs`: "multiple exports")
  and mhitu/uhitm/fountain keep C-matched local twins —
  D-log verified-and-left-local, acceptable debt.

RNG: none on these paths either side (pure nouns).

Hallucinations / overclaim: none. "1 session PASS" is a
PROGRESS-shape claim with the session named, not a
blanket "Match C".

Density: +16 for a 4-stub unification + 1 canonical —
density exception (C arms that small), one queue row.

Verification: D-log cites `verify.mjs --fn erode_obj` →
1 PASS + green + cohort + manual 44/44. Re-measured
independently: `hidden-proxy.mjs verify erode_obj --base
46171803~1` → baseline 1 blocked,
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(Priest-92020: PASS). Exact match. `rulecheck` clean
(re-ran). No DIAG/FORCE/seed/coordinate gates.

**Actionable C-wrongs**:

1. burnarmor case 3 must pass literal `'gloves'`
   (`js/trap.js` erode call), not
   `gloves_simple_name(item)` — C `trap.c:143–146`.
   One-line, queueable alone.

Verdict: **QUALITY-RISK**
