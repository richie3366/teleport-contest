# Review 882 — 9b416bde — role.c setup_rolemenu/racemenu/gendmenu/algnmenu extraction into js/player_selection.js (D-1912)

Metadata: SHA `9b416bde`, D-1912. Files: `js/player_selection.js`
(+218/−103: four canonical exports + five call-site mappings),
startup map section, queue row archived. Next index 882.

Intent vs deliverable: subject promises the four setup_*menu
extractions in C order/param order. The diff delivers the four
exports plus the rewiring of all five call sites (four pick menus
+ reset's four sections), and deletes the two drifted inline
bodies. Promise ≡ diff.

Inventory: 4 new functions (all `export function`, sync), 0
deleted names (inline bodies consolidated), 0 re-pointed imports.

**C ↔ JS fidelity** (all four C bodies read via csym —
`role.c:2853–2902`, `:2904–2940`, `:2942–2976`, `:2978–3012`):
role predicate conjunction `ok_role/ok_race/ok_gend/ok_align` ✓;
race `ok_race/ok_role/ok_align` (no `ok_gend`) ✓; gender
`ok_gend/ok_role/ok_race` (no `ok_align`) ✓; align
`ok_align/ok_role/ok_race` (no `ok_gend`) ✓ — asymmetries kept
verbatim. `filtering && !*_ok` skip ✓; `a_int = i+1` vs `a_string`
name ✓; role `lowc(first)` + `== lastch → highc`, with C's
case-sensitive `lastch = thisch` update restored (parent SHA had
`lastch = thisch.toLowerCase()` in pick and an `items.some` dedup
in reset — both confirmed in the deleted lines, both gone) ✓;
race/gend/align raw `*noun/*adj` first letter with
`filtering ? ch : highc(ch)` key and `filtering ? highc : 0`
second accelerator (JS `altkey: null` for 0) ✓; female-name arms
(`gend==1` replace, `gend<0` slash-append — reset passes
`ROLE_NONE = -1` per `const.js:1591`, so slash-append preserved)
✓; `!filtering && !*_ok` preselect ✓. Param orders match C minus
`win` in all four. Call-site mapping: role choices drop the
always-null altkey (C passes literal 0) ✓; race/gend/align keep
`{key, altkey, value}` and the `:969` matcher null-guards altkey
✓; reset entries keep `{key, filterStr, textBase, selected}`
shape with identical values ✓; body text `${key} - ${text}`
unchanged ✓. No RNG in any arm (C draws none) ✓.

Hallucinations / overclaim: none. The drift characterization
matches the deleted lines exactly.

Density: one contiguous C locus (`role.c:2853–3012`), +218 —
right-sized.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7;
no full — single non-shared file, correct skip). Hand probe
(old-vs-new keys identical on current data) is the right falsifier
for a startup-menu refactor and its claim checks out against the
mapping above. Re-measured:
`hidden-proxy.mjs verify setup_rolemenu --base 9b416bde~1` → 0
blocked at baseline and now — vacuous as stated, map-driven row.
Diff grep: no FORCE/DIAG/seed/coordinate patterns.
`imports.mjs --rulecheck` → clean (at HEAD). `sym.mjs`: four
canonical sync exports, no clones, no other `setup_*menu` defs.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
