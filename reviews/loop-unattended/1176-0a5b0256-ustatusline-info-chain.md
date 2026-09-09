# Review 1176 — 0a5b0256 — ustatusline info chain (D-2210)

Metadata: SHA `0a5b0256`, `js/insight.js` only (+119/−~12),
D-2210. Queue row `ustatusline` (scen-wish-Archeologist-92004
step 141).

Intent vs deliverable: subject promises the full `ustatusline`
info suffix (was hardcoded `''`, losing C's `, fast`). Diff
actually extends `ustatusline` with the whole C info chain plus
import/const extensions on existing edges. Promise == diff.

Inventory: one extended function (`ustatusline`), zero new
functions, zero new modules. Named omits: none new (D-log says
the 87-line C function is now fully live).

**C ↔ JS fidelity**: branch-by-branch confirm vs
`insight.c:3402–3489` (`csym.mjs` body range `:3401–3489`).
Order matches C exactly: Sick (vomitable/and/illness) →
Stoned → Slimed → Strangled → Vomiting (`!"nauseous"` kept) →
Confusion → Blind + ucreamed goop (`cover` split) → Stunned →
Wounded_legs (side mask, plural, no side naming) → Glib →
utrap → Fast/Very_fast → concealed/disguised → Invis →
ustuck (digested/engulfed/held/holding + `a_monnam`) →
region cloud → Upolyd level/HP select → pline. Macros
verified: `U_AP_TYPE` masked (`monst.h:71`) exact;
`BlindedTimeout ≡ HBlinded & TIMEOUT` (`youprop.h:93`),
`Blindfolded ≡ EBlinded` (`:96`) exact; `Upolyd`
(`you.h:554`) via live const import; `Wounded_legs =
HW||EW` (`:138`) plus flat mirror (house idiom, same as
`display.js:5700–5703`); `Fast`/`Very_fast` (`:376–377`)
via live imports. `sticks` imports the C-locus
`engrave.js:346` (verbatim `mondata.c:653–659`),
correctly avoiding the divergent `monmove.js:1629`
hardcoded-number variant; `digests` matches
`mondata.h:71–72`. No RNG either side. Region
`strlen < sizeof` guard dropped — N/A, unbounded JS
strings. One observation, not queued: C `Strangled` is
intrinsic-only while JS ORs H/E flats + extrinsic, but
that is the house dual-store idiom (mirrors display.js)
with no session evidence of divergence. Callee closure:
`Fast`/`Very_fast`/`Blind`/`Invis`/`Glib`/
`fingers_or_gloves`/`body_part`/`reg_damg`/`haseyes`/
`a_monnam`/`Upolyd`/`visible_region_at`/`digests`/
`sticks` all LIVE (`sym.mjs`); no clones, no stubs.

Hallucinations / overclaim: none. "Full function live" is
true arm-for-arm; no dispatch-with-stubbed-callee. Banned
grep clean; `imports.mjs --rulecheck` → clean.

Density: one C function, one module — right-sized.

Verification: D-log Verify bullet shows hidden PROGRESS
(141→use_misc@145) + green + cohort. Re-measured:
`hidden-proxy.mjs verify ustatusline --base 0a5b0256~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(Archeologist-92004 fully PASS on current tree — at least
as good as claimed, no worse). Not vacuous.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
