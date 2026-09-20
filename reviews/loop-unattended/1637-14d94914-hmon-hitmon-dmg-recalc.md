# Review 1637 — 14d94914 — uhitm.c hmon_hitmon_dmg_recalc whole-body port (D-2678)

**Metadata:** SHA `14d94914`, `uhitm.c`
`hmon_hitmon_dmg_recalc`, D-2678 (+
anything_to_s STALE park). JS:
`js/uhitm.js` (+90/−40ish) + `js/weapon.js`
(+6) + `js/apply.js` (−6 net). No Must-fix.

## Intent vs deliverable

Subject promises: the get_dmg_bonus gate,
the PROJECTILE skillwep swap, and the
`uwep_skill_type` export. Diff delivers all
three plus caller threading. Promise
matches deliverable.

## Inventory

- Restarted file-local
  `hmon_hitmon_dmg_recalc` (C `staticfn`).
- New `uwep_skill_type` export
  (js/weapon.js:1317, C home); retired
  `apply.js` local clone → import (3 call
  sites unchanged). Required `sym.mjs` on
  the re-point:

```text
uwep_skill_type  js/weapon.js:1317   sync
```

Single live export, no remaining clones.
- Caller `hmon_hitmon` threads the flag
  (init/melee-copy/mctx-copy).

## C ↔ JS fidelity

C locus: `uhitm.c:1435–1507` (73 L via
`csym.mjs`). Exact, no RNG:

- `dmgbonus=0` init with the `:1447` gate
  (the real fix — old code seeded `udaminc`
  unconditionally), udaminc `:1450`,
  propellor skip `:1460–1461`, dbon/abs
  `:1462–1463`, twohits 3/4 and bimanual
  3/2 with `Math.trunc` `:1464–1467`,
  skill gate `:1484`.
- PROJECTILE swap `:1487–1488` where
  `PROJECTILE(obj)==((obj)&&is_ammo(obj))`
  verified at C `:72` — JS spells it
  identically, null-safe.
- Train ternary `:1496–1497` now calls the
  live export (byte-identical to the retired
  clone; C `weapon.c:1532–1537` verified).
- Apply + floor-at-1 `:1503–1506` with C's
  comment.
- Threading: init TRUE (C `:1778`), melee
  keeps TRUE, 5 misc_obj FALSE arms — count
  matches C `:1137/:1190/:1316/:1339/:1349`
  exactly and the MIRROR pair (C
  `:1130–1141` ↔ JS `:1262–1271`)
  spot-checked arm-for-arm. Recalc gated on
  `dmg > 0` (C `:1806–1807`).
- Shade bump `:1817` stays a map-named
  omission in its owning function —
  correctly not Must-fix.

## Hallucinations / overclaim

None.

## Density

Whole 71-line C function + callee export +
caller threading across 3 files. At the
ceiling of right-sized, justified as one
caller/callee cluster.

## Verification

D-log Verify claims `--full` PASS with
honest 0-blocked note + full 44/44. Re-ran
`hidden-proxy.mjs verify
hmon_hitmon_dmg_recalc --base 14d94914~1
--reach-all`:

```text
verify hmon_hitmon_dmg_recalc: baseline 14d94914~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke hmon_hitmon_dmg_recalc: no RNG-tagged reach; fixed smoke spread (24 run, 6.5s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
