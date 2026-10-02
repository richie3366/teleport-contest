# Review 2244 — 1b0ae0968 — encumber stagger verbs + 3 callers

Metadata: SHA `1b0ae096823a0b946f08a9b1c94f3dccae3f976f` (D-3283,
2026-10-02). `js/invent.js`, `js/mhitm.js`, `js/mhitu.js`,
`js/trap.js` (4 one-line verb wirings + 3 import-list
extensions, no new module edges). Two functions:
`encumber_msg` (C pickup.c:1977–2020) + `stagger` (C
mondata.c:1394–1407, callee verification + caller
wiring).

Intent vs deliverable: subject promises the HVY
stagger() verbs + mhitm/mhitu/trap caller arms. The
diff wires canonical `stagger` at all 4 hardcoded
sites. Delivers what it promises; no clone added
(potion.js stagger_poly deliberately not re-pointed
— out of cluster, disclosed).

Inventory:

- invent.js:1186/:1208 — both HVY arms →
  `stagger(game.youmonst?.data, 'stagger')`.
- mhitm.js:2635 (passivemm AD_STUN) →
  `makeplural(stagger(magr.data, 'stagger'))`.
- mhitu.js:3226 (passiveum AD_STUN) →
  `makeplural(stagger(mtmp.data, 'stagger'))`.
- trap.js:8217 (chest gas) → `stagger(...)` in the
  `You %s%s...` shape.
- No symbol deleted or re-pointed → no required
  `sym.mjs` paste; ran anyway: `stagger
  js/mhitm.js:1131 sync`, single export, zero clones.

**C ↔ JS fidelity — `encumber_msg`**: whole body vs
C pickup.c:1977–2020 — oldcap/newcap switches
verbatim (both HVY arms now `stagger(...)` ✓),
botl sets, `oldcap = newcap` tail ✓. JS
`game.youmonst?.data` ≡ C `gy.youmonst.data` ✓.
**`stagger`**: branch chain ≡ C mondata.c:1394–1407
(floater → flyer small/big → slithy → amorphous →
!mmove → nolimbs → def) ✓; highc locoindx ✓; all 7
index-2 table entries verified against C :1367–1377
(wobble/flutter/stagger/falter/tremble/pulsate/
falter + caps) ✓. **Caller arms**: mhitm.c:1415
`makeplural(stagger(magr->data,"stagger"))` with the
canseemon gate ✓; mhitu.c:2580 same shape, gate-less
with `.` ✓ (JS keeps pre-existing plain `pline`
where C has `pline_mon` — routing-only, pre-existing
AND named in this D-log's stagger note ✓); trap.c:
6481–6484 `You("%s%s...", stagger(...),
Halluc_resistance ? "" : Blind ? ... : ...)` ✓
verbatim. No RNG in any hunk (pure verb lookup).

Hallucinations / overclaim: none. The D-log's caller
maps (40 encumber_msg sites with pre-existing deltas
disclosed as sets-not-pairs; all 9 stagger sites)
are unusually honest about what predates the iter.

Density: 4-site verb wiring (sub-80), exception
documented. `Ledger: encumber_msg ported; stagger
ported` + Verify ✓.

Verification: D-log Verify shows encumber_msg
PROGRESS (Valkyrie-94041 step 80 → step 111 later
owner) + stagger note + smoke REACH-OK ×2 +
green/strict/cohort (full skipped — no shared file;
scoreboard.json committed with the move ✓).
Re-measured (`hidden-proxy.mjs verify
encumber_msg,stagger --base 1b0ae0968~1 --reach-all`):
encumber_msg 0 PASS, 1 moved past, 0 worse →
PROGRESS — Valkyrie-94041 at
trapeffect_rolling_boulder_trap step 111, EXACTLY as
claimed; stagger vacuous + smoke 24/24; encumber
smoke 24/24 → REACH-OK ×2. Zero regressed.
Banned-pattern grep: clean. Rule #2 clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
