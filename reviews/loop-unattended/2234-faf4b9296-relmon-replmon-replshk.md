# Review 2234 — faf4b9296 — relmon export + replmon arms + replshk

Metadata: SHA `faf4b92961bef09b2ebd90a05261beed363096ee` (D-3273,
2026-10-02). `js/mon.js` + `js/dog.js` + `js/shk.js`
(+154/−67). 3-function cluster: relmon, replmon, replshk —
one Inventory + one fidelity block per function below.

Intent vs deliverable: subject promises "relmon canonical
export + replmon light/set_ustuck/replshk arms + shk.c
replshk". The diff delivers all three plus the keepdogs doc
correction. Delivers what it promises.

Inventory:

- `relmon` (`js/mon.js:3681`): dog.js clone promoted
  verbatim to canonical async export (C home); dog.js clone
  deleted, `relmon` added to the pre-existing mon.js edge,
  `mon_leaving_level` dropped from dog.js imports (sole use
  was the clone — verified: dog.js:1133 mon_arrive is the
  only remaining relmon call there, awaited ✓).
- `replmon` (`js/mon.js:3722`, sync): +light swap
  (:2538–2543), `set_ustuck` (:2546–2547), isshk-gated
  `replshk` (:2550–2551). Imports extend pre-existing
  light/hack/shk/const edges + one new mon→mhitu edge
  (post-commit `--can` reads ALREADY — the edge is this
  commit's; call-time use of a hoisted sync fn, safe).
- `replshk` (`js/shk.js:359`): new sync export (C home).
- `sym.mjs relmon` (required): `relmon js/mon.js:3681
  ASYNC` — single export, zero clones. Output pasted as
  required. set_ustuck mhitu.js:1602 sync ✓; emits_light /
  new_light_source / del_light_source / monst_to_any all
  sync ✓ (safe in sync replmon).

**C ↔ JS fidelity — `relmon`** (JS :3681 vs C
mon.c:2559–2594): empty-fmon impossible ✓ (fire-and-forget,
documented), mon_leaving_level awaited ✓, indexOf+splice
≡ head/scan unlink with absent-impossible ✓, list
unshift with nmon link / orphan null ✓, defensive !mon
guard documented ✓. C callers exactly 4 (dog.c:618/863/906,
mon.c:2531 — comments excluded) ✓; dog.c:618 wired
awaited; the other three are NAMED with queue rows at HEAD
(keepdogs + migrate_to_level Open rows carry the measured
regression evidence) or a named sync omit (replmon) ✓.

**C ↔ JS fidelity — `replmon`** (full re-walk, JS :3722 vs
C mon.c:2514–2556): minvent transfer + impossible ✓,
polearm.hitmon (+m_id bookkeeping, harmless) ✓, inline
:2530 splice (superset: worm-seg/head-cell grid clear;
panics skipped — NAMED in doc with the sync rationale)
✓, place_monster unless steed ✓, place_wsegs ✓, light
swap EXACT (emits_light gate, new-before-del order, arg
order mx/my/range/LS_MONSTER/monst_to_any; del inside the
gate as in C) ✓, fmon prepend ✓, ustuck→set_ustuck (botl
verified in mhitu.js:1602; null-arm clears uswallow as in
C) ✓, usteed ✓, isshk→replshk ✓, mx/my/nmon zeroing +
dealloc ✓. New-callee signatures verified
(new_light_source(x,y,range,type,id),
del_light_source(type,id)) ✓. Only C caller zap.c:819 →
zap.js:3073 sync call kept ✓.

**C ↔ JS fidelity — `replshk`** (JS :359 vs C
shk.c:279–286): resident assignment with bounds guard
(defensive; identical on valid input) ✓; `inhishop(mtmp)
&& ushops0===shoproom` ✓ — charCodeAt(0) matches the
established JS pattern (shk.js:907) for C's `*u.ushops`
✓; `bill_p = bill||[]` matches the restshk re-alias shape
(:283) for C's `&bill[0]` restart ✓. `!eshk2` early return
defensive ✓.

Hallucinations / overclaim: none. `Ledger: relmon ported;
replmon partial; replshk ported` is exactly right.

Density: 3 whole functions, one C file (mon.c) + one callee
(replshk) — §10.17 compliant. Per-function Ledger +
Verify lines ✓.

Verification: D-log Verify shows PASS + 3 vacuous notes +
3 smoke REACH-OK + green/strict/cohort + manual full
44/44. Re-measured (`hidden-proxy.mjs verify
relmon,replmon,replshk --base faf4b9296~1 --reach-all`):
all three vacuous (0 blocked — coverage rows citing no
blocks, notes honest) + smoke 24/24 PASS → REACH-OK each.
Zero regressed. Banned-pattern grep: clean. Rule #2 clean
(2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
