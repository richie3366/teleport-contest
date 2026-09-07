# Review 961 — ab0522c0 — polyself.c break_armor full port (D-1991)

- SHA: `ab0522c0` — "polyself.c break_armor full port: breakarm destroy order, cloak 3-way names, horns/eyewear arms (D-1991)."
- D-id: D-1991. JS: `js/polyself.js` (+98/−35 across the hunk), `js/do_wear.js`, `js/mhitu.js`, `js/worn.js` (export keywords). C locus: `nethack-c/upstream/src/polyself.c` `break_armor` `:1156–1302` (both halves fetched this review); `mondata.c` `breakarm` `:640–650` (fetched); `do_wear.c:1498` (cited).
- Verdict: **ACCEPT-WITH-DEBT**

## Intent vs deliverable

Subject promises destroy order, cloak 3-way names, horns/eyewear
arms. Diff actually adds: end_burn/Armor_gone/useup destroy
order, wrapping/smock/clasp 3-way, sliparm racial gate,
horns pierce/drop, helm `surface()` names, ublindf eyewear arm,
plus four export keywords. Promise matches deliverable.

## Inventory

- Changed: `break_armor` body (all arms), `breakarm()` special cases, `Blindf_off` nooffmsg, 4 export keywords, import extensions.
- Required `sym.mjs` output (local→export re-points): `helm_simple_name` mhitu.js:979 sync, `WrappingAllowed` worn.js:176 sync, `has_horns` worn.js:194 sync — all live; `num_horns` same file. `is_flimsy` already imported (used, not re-pointed).
- No deletions.

## C ↔ JS fidelity

Walked `:1156–1302` arm-for-arm ✓: uarm destroy (lamplit
end_burn/message/exercise/Armor_gone/useup) ✓; cloak gate +
3-way (tears/useup, knot/dropp, clasp/dropp, Cloak_off each) ✓;
shirt destroyed with no _off ✓; sliparm racial gate +
Armor_gone/dropp, whirly/shrink cloak names, shirt setworn+dropp
✓; horns pierce (`horn`+plur/`vtense`/`yname`) vs helm fall
(`helm_simple_name`/`surface`/Helmet_off/dropp) ✓;
nohands gloves/shield/helm ✓; ublindf (`has_head` gate,
pair-of strip, `vtense` fall, `Blindf_off(null)`, dropp) ✓;
rings-stay comment ✓. `breakarm` marilith/gargoyle specials
match mondata.c exactly ✓. `Blindf_off` nooffmsg: all 4 live
callers pass non-null (verified), so behavior unchanged ✓.
Horns `!donning` conjunct folded out consistently with the
function-wide named donning omit ✓.
`--can` on all three import targets reports ALREADY (name-only
extensions, same SCC) ✓. No STUBs; shipped arms use the LIVE
exports.

## Hallucinations / overclaim

None. Residuals dissected per session (Priest-91137 same-step
re-attribution correctly classed as the documented polymon
`u.mh` misattribution, not the painter).

## Density

+98/−35 across 4 files, one C function. Right-size per §2b.

## Verification

`verify break_armor --base ab0522c0~1` re-run this review →
"0 PASS, 10 moved past (1 re-attributed at the same step; 1
still break_armor at a later step), 0 unchanged, 0 worse →
PROGRESS", matching the D-log exactly. Green + strict + cohort
7/7. `--rulecheck` clean (re-run). Added-line grep: no banned
tokens.

## Actionable C-wrongs

1. (Debt, review-listed) Three `helm_simple_name` clones return
   constant `'helmet'` (dothrow.js:1074, trap.js:3163,
   uhitm.js:1078) while C (`objnam.c:5513–5530`,
   `!hard_helmet ? "hat" : "helm"`) and the live export agree on
   hat/helm. Pre-existing, untouched by this SHA, no corpus
   session attributed — consolidation pass, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
