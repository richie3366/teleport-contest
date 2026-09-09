# Review 1209 — 1fb930b1 — poly_steed steed-polymorph body + newcham wiring

Metadata: SHA `1fb930b1` (D-2243). Queue row `steed.c` poly_steed, no
corpus block. js/ steed.js +24 (new fn), makemon.js +7/−4 (wire call
site + comment updates).

## Intent vs deliverable

Subject promises the `poly_steed` body in C order plus its `newcham`
call-site wiring. Diff adds exactly `export async function
poly_steed(steed, oldshape)` and threads it into
`newcham_after_unleash` between boulders and Elbereth, retiring the
`poly_steed` named omit. Promise kept.

## Inventory

New: `poly_steed` (steed.js:985, ASYNC per `sym.mjs`). Callees:
`can_saddle` (already imported), `can_ride` (same module),
`dismount_steed` (same module), `x_monnam` (new import name, LIVE
`sym.mjs` do_name.js:828 sync), `strsubst` (new import name, LIVE
hacklib.js:278 sync), `pline` (already imported), `steed_vs_stealth`
(same module). Both new import names are additions to pre-existing
module edges (do_name, hacklib), not new edges — no `--can` owed
beyond the stated LIVE check; no local clone created (no other
`poly_steed`/`x_monnam`/`strsubst` locals). No STUB in a live arm.

## C ↔ JS fidelity

Body vs `steed.c:851–873` (23 lines, `csym.mjs` range, pasted during
audit): `!can_saddle || !can_ride` short-circuit →
`dismount_steed(DISMOUNT_FELL)` (with the C "can't get here" comment
carried); else `x_monnam(ARTICLE_YOUR, null, SUPPRESS_SADDLE, FALSE)`
→ `oldshape !== steed.data` pointer-inequality → `strsubst "your " →
"your new "` → `You("adjust yourself in the saddle on %s.")` →
`steed_vs_stealth()` — exact, branch for branch. `oldshape !== data`
is the correct JS reading of C pointer comparison (shape tables are
object-identity keyed). Draw-free by construction (no RNG in either
arm).

Call-site position vs `mon.c:5485–5518` (read directly):
`mon_break_armor` → boulder loop → `if (mtmp == u.usteed)
poly_steed(mtmp, olddata)` → Elbereth re-check. JS `after_boulder →
after_steed → after_pu` (Elbereth) matches exactly, including the
`mtmp !== game.u?.usteed` gate.

## Hallucinations / overclaim

None. Vacuous-0 labeled as vacuous.

## Density

One 23-line C function + one call site in one handoff. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify poly_steed: baseline 1fb930b1~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 +
cohort 7/7 pasted per D-log. Diff grep: no FORCE/DIAG/seed/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
