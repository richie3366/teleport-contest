# Review 1057 — 25328721 — resists_elem species mresists bits (D-2087)

## Metadata

- SHA: `25328721` — `trap.c resists_elem dropped species mresists (queue owner burnarmor) (D-2087).`
- JS diff: `js/trap.js` +9/−4 (comment rewrite, 2-line gate).
- Docs: D-2087 D-log/D-index/CURRENT/NOTES/queue/data.md map.
- Next index: 1057.

## Intent vs deliverable

Subject promises OR-ing species `mresists` into `resists_elem`
for monsters only, so the fire-resistant master lich takes the
burnarmor path. Diff does exactly that. Promise == diff; no scope
creep.

## Inventory

- Changed: `resists_elem` (trap.js:3735) — one gate.
- `is_youmonst` is a pre-existing local clone (trap.js:1365,
  used 10+ times in-file; body `mtmp === game.youmonst ||
  mtmp._youmonst` = C `mon == &gy.youmonst`); `mr_bit`
  pre-existing. Same-module edit — no import, cycle, or TDZ
  surface. Nothing deleted (no re-point duty).
- Diff grep: no `FORCE`/`DIAG`/seed reads, no RNG change.

## C ↔ JS fidelity

`monst.h:270–271` (read directly) is verbatim:

```c
#define mon_resistancebits(mon) \
    ((mon)->data->mresists | (mon)->mextrinsics | (mon)->mintrinsics)
```

JS now computes exactly this for monsters. The `is_youmonst ? 0`
gate matches C `mondata.c:171` (`is_you ? u_resist : …` — the
hero never consults species bits). Both consumers ride the fix
(`resists_fire` :3741, `resists_sleep` :3744 — confirmed by grep),
as claimed. Remaining arms (wielded `defends`, worn/carried
`oc_oprop`, alchemy-smock pair, `defends_when_carried`, all at
`mondata.c:175–196`, read directly) stay map-named in the
rewritten comment. No gap found.

## Hallucinations / overclaim

None.

## Density

5 functional lines on one predicate — the accepted corpus-row
exception.

## Verification

D-log Verify bullet: `verify --fn burnarmor` → `0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Wizard-91112
72→lightdamage@73) + green + strict + cohort. Re-measured
myself: `hidden-proxy.mjs verify burnarmor --base 25328721~1` →
identical, 0 worse (baseline scoreboard here at `f042b695`,
fresher than the 84dc0e34 pin — same outcome). Claim reproduced
exactly. Rule #2 clean (prior step).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
