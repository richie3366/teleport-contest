# Review 1202 — dda478bc — m_into_limbo caller wiring (collide/teleport/vault)

Metadata: SHA `dda478bc` (D-2236). Queue row `mon.c` m_into_limbo, no
corpus block. js/ 5 files: do.js arm, mon.js export, teleport.js arm,
vault.js arm + awaits, mhitm.js ×2 awaits.

## Intent vs deliverable

Subject promises export + three call-site arms (`u_collide_m` tail,
`u_teleport_mon` engulfing, `clear_fcorr` occupant) with complete async
ripple, sync sites deferred with file:line causes. Diff delivers all of
it. Promise kept.

## Inventory

Exported: `m_into_limbo` (body unchanged — MON_LIMBO + current-ledger
MIGR_APPROX_XY matches `mon.c:3834–3840`). New arms use LIVE callees:
`rloc` (static where `--can` SAFE, dynamic where CHECK — correct cycle
avoidance, not stubbing), `yelp` (sounds.js async, awaited), `unstuck`
(mhitu.js async, awaited per the mon.js:1571 precedent). OMIT (named with
causes): `put_lregion_here` LR_TELE (sync level-gen, ~15 sync callers),
wallify body + `gd_mv_monaway`, `losedogs` failed_arrivals +
`mon_arrive` Wiz_arrive (infra gaps).

Ripple completeness — `clear_fcorr` went sync→async; every caller
audited, none left floating:

```text
js/mhitm.js:2901  await clear_fcorr(grd, true)   (grddead ×2)
js/mhitm.js:2916  await clear_fcorr(grd, true)
js/vault.js:247   await clear_fcorr(grd, false)  (restfakecorr)
```

`restfakecorr` (module-local) has exactly two callers
(`gd_move_cleanup`, `gd_move`), both re-awaited in this diff. No other
`clear_fcorr(` call sites exist in js/. Complete.

## C ↔ JS fidelity

u_teleport_mon vs `teleport.c:2279–2285`: position before the rider arm,
`You are no longer inside…`, unstuck → rloc(MSG) → limbo → return true —
exact. clear_fcorr vs `vault.c:80–87`: isgd return-false, tame yelp,
`!rloc(MSG)` → limbo, then keep clearing — exact, RLOC_MSG correct here
(vs NOMSG in collide). u_collide_m vs `do.c:1436–1445`: wizard-gated
message (house debug/wizard idiom, message-only superset) and gate shape
match — **except** C reassigns (`(mtmp = m_at(u.ux,u.uy)) != 0`) so a
*remaining occupant* goes to limbo when rloc succeeds yet the square is
still held; JS (do.js:2171) always limbos the original `mtmp`. The
`!rloc` path is identical both sides; the divergence needs rloc to
succeed with a *different* monster still stacked on the hero square —
near-unreachable (monsters never stack). See Actionable 1.

## Hallucinations / overclaim

None. Vacuous hidden note stated with reason; every deferred sync site
named with its blocking cause. No stub-in-live-arm: all three arms'
callees are LIVE or dynamic-imports of LIVE bodies.

## Density

One family + mechanical await ripple across 5 files. Right-sized; the
ripple is the reason for the file count, not scope creep.

## Verification

Audit re-ran the corpus claim itself:

```text
verify m_into_limbo: baseline dda478bc~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Full 44/44 auto-ran (shared
files changed) + green/strict/cohort pasted. Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coordinates. Rule #2 clean (re-run here).

## Actionable C-wrongs

1. (Debt) `u_collide_m` limbo target (do.js:2171 vs do.c:1443–1445):
   pass the remaining occupant — capture `rlocOk`, then
   `if (!rlocOk || occ) await m_into_limbo(occ || mtmp)`. Near-dead path,
   no reachable RNG/screen impact, one-line fix queueable in one iter.

Verdict: **ACCEPT-WITH-DEBT**
