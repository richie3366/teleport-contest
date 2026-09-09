# Review 1179 — 430852e1 — use_grapple/use_whip surface_apply stub (D-2213)

Metadata: SHA `430852e1`, `js/apply.js` only
(stub deleted + 7 call sites re-pointed), D-2213.
Queue row `use_grapple` (scen-wish-Priest-92041
step 146/171, 0 blocked RNG, 3327/3327 positional).

Intent vs deliverable: subject promises the local
`surface_apply` stub («furniture») replaced by the
canonical C `surface()` («stairs») at the yank
message. Diff actually does that at all 7 whip/grapple
message sites, deletes the 9-line stub, and adds
`import { surface } from './sit.js'`. Promise == diff.

Inventory: changed — `use_whip` pickup arm,
`whip_attack` case 2, `use_grapple` menu texts x2,
snag pline, slices-through/yanked arms. Deleted
helper `surface_apply` (diverging local CLONE).
Added import of `surface` (C callee, live since
D-2008). No new functions.

**C ↔ JS fidelity**: confirmed arm-by-arm. C calls
`surface()` at all 7 sites with exactly the coordinates
JS now passes: `apply.c:3051` (wrap bullwhip,
`surface(u.ux,u.uy)`), `:3183` (yank to, same args),
`:3788/:3795` (menu, `surface(cc.x,cc.y)`), `:3819`
(snag), `:3855/:3857` (slices-through/yanked).
Deleted stub was a diverging CLONE (4 outcomes:
furniture/water/lava/floor) vs C `dungeon.c:1749–1788`
14-arm `surface` (stairs/altar/fountain/doorway/wall/
bridge/ice/bottom/air-bubble/cloud/ground/...).
Canonical `js/sit.js:475` matches C arm order and
predicates; its uswallow maw/husk head arm stays
named-deferred in sit.js (dead on the yank path).
Callee closure: `surface` LIVE, no STUB in any touched
arm. `imports.mjs --can apply.js sit.js surface` →
`ALREADY: apply.js already statically imports sit.js.
No new edge needed.` No cycle question at all.
`sym.mjs surface` → `js/sit.js:475 sync` (+3 named
dig/dokick/engrave clones, untouched per D-log).

Hallucinations / overclaim: none. Subject says
«import canonical surface()» and «stub deleted» —
both literally true. Named omits (untrap FIXME,
S_goodpos tmp_at, dig/dokick/engrave clones) carried
in map + D-log.

Density: §2b right-size — one C locus family (surface
naming on the whip/grapple envelope), one JS module,
stub deletion + re-point.

Verification: D-log Verify bullet cites
`verify.mjs --fn use_grapple` → PROGRESS (146 →
weldmsg@158) + green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify use_grapple --base
430852e1~1` → "0 PASS, 1 moved past, 0 unchanged,
0 worse → PROGRESS" (Priest-92041 step 146 →
weldmsg@158). Claim true, no vacuous PASS.
`imports.mjs --rulecheck` → Rule #2 clean. No
FORCE/DIAG/seed/coordinate in diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
