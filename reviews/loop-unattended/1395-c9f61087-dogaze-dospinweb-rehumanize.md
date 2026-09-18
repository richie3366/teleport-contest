# Review 1395 — c9f61087 — dogaze + dospinweb + rehumanize (D-2436)

- Commit: `c9f61087` — "`polyself.c` dogaze + dospinweb + rehumanize whole bodies in C order (D-2436)."
- Files: `js/polyself.js` only (+351/−26); docs + map + 3 queue rows popped.
- D-log: D-2436. Rows popped: dogaze MISSING (C 131 L), dospinweb MISSING
  (C 124 L), rehumanize THIN (C 51 L / JS 20 L).

## Intent vs deliverable

Subject promises three whole C bodies in C order. Diff delivers: new
`dogaze` (`:2383`), new `dospinweb` (`:2523`), restarted `rehumanize`
(`:961`), two `domonability` dispatch arms, imports/consts. The C-order
port is real — but two live arms call functions that are neither
imported nor defined in the module (see C-wrongs). Promise half-kept.

## Inventory

New/changed JS: `dogaze`, `dospinweb`, `rehumanize`, `domonability`
(2 arms). No symbol deleted or re-pointed; required `sym.mjs`
delete/re-point check vacuous. Ran `sym.mjs` on every newly imported
symbol (below) plus a full identifier sweep of the new regions
(80 names) — that sweep found the two C-wrongs.

## C ↔ JS fidelity

C loci via csym: `dogaze :1641–1773`, `dospinweb :1496–1621`,
`rehumanize :1365–1418`, plus `helpless` (`monst.h:251` ≡
msleeping||!mcanmove ✓ inlined exact), `perceives` (`mondata.h:81` ≡
M1_SEE_INVIS flag ✓ inlined exact), `safe_dog` default On
(`optlist.h` NHOPTB ✓ `!== false` matches), AT_ENGL=11
(`monattk.h:21` ✓ via live `mhitm.js:296` export).

- dogaze: AT_GAZE scan/first-adtyp, CONF/FIRE-else-impossible, Blind/Hallu,
  uen<15 / −=15 + botl (`flags.botl` is the live flag — `display.js:5796`
  consumes it ✓), snapshot fmon loop with DEADMONSTER skip (one visit per
  monster while `killed()` unlinks ✓), Invis/perceives, minvis/See_invisible,
  mimic looked--, safe_dog-tame, confirm y_n (no looked-- on decline ✓),
  setmangry, helpless/stun/blind/eyeless looked--, AD_CONF mconf arms,
  AD_FIRE `d(2,6)` + resists + `lev>rn2(20)` destroy/ignite + killed,
  post-fire DEAD skip, floating-eye `nomul(-d(m_lev+1,damd) / -200)` +
  multi_reason + nomovemsg + ECMD_TIME vs stiffen, Medusa killer + STONING,
  looked==0 tail — all branch/RNG-order exact.
- dospinweb: Levitation/terrain inline (`is_pool||is_lava||IS_AIR` — no JS
  export exists, cf. review 1391), uswallow animal-expels(TRUE) / whirly
  NATTK AT_ENGL sweep + impossible / dissolve, utrap, `exercise(A_DEX)`,
  full 11-case trap switch + default-impossible, stairs cop-out (`Your`
  idiom renders identical text), maketrap + madeby_u + feeltrap + shop
  `add_damage` via dynamic `shk.js` import (zap.js precedent; `add_damage`
  sync ✓) — exact.
- rehumanize: `if (Unchanging)` restructure matches C (old combined gate
  fixed), mh<1 killer + return, amulet Your/observe/makeknown,
  emits_light→del_light_source, polyman race-adj, uhp<1 killer + fallthrough
  (no return, as in C ✓), nomul, botl/vision/encumber, update_inventory,
  flying-steed You, `!uarmg → selftouch` — exact. `retouch_equipment(2)`
  stays map-named (own row) ✓.
- Callee closure otherwise LIVE: `couldsee` vision.js:1110 ✓, `setmangry`
  mon.js:1120 ASYNC ✓ (call site awaits), `destroy_items` zap.js:1706 ASYNC
  awaited ✓, `ignite_items` trap.js ASYNC awaited ✓, `killed` ASYNC awaited
  ✓, `bury_objs` dig.js:450 ASYNC ✓ (call site awaits), `dotrap` ASYNC
  awaited ✓, `emits_light`/`del_light_source`, `otense`, `observe_object`,
  `makeknown`, `update_inventory`, `surface`, `Flying`, `Unchanging`
  (module-local, pre-existing) all resolve ✓. Banned-pattern grep on added
  lines: 0 hits.

## Hallucinations / overclaim

"Rest join existing edges" is FALSE for two callees (they join no edge —
nothing was imported). "No new … clone" holds. The Verify bullet's green/
cohort PASS is true but blind: no corpus session executes dogaze/dospinweb
(a vacuous verify each — confirmed by re-run), so the suite cannot catch
the throws below. Dispatch-ported/callee-missing in two live arms.

## Density

Three small C functions, one module, +351/−26. Whole-body claim holds for
what is wired; the two missing imports are one line each.

## Verification

D-log: verify ×3 → syntax · rule2 · hidden note · smoke 24/24 · green ·
strict · cohort · PASS. Independent re-measure on this SHA:

- `verify dogaze/dospinweb/rehumanize --base c9f61087~1 --reach-all` → 0
  blocked on each (vacuous, as logged) + smoke 24/24 PASS, 0 regressed on
  each → REACH-OK. Confirms the D-log — and explains the escape: nothing
  in the corpus fires a gaze or a pit-web, so green/cohort/smoke never
  evaluate the two throwing lines.

## Actionable C-wrongs

1. `dogaze` calls unimported `setmangry` (`js/polyself.js:2439`,
   `await setmangry(mtmp, true)`; no import, no local, no global — full
   80-identifier sweep). Guaranteed ReferenceError on the first gazeable
   monster (live `domonability` AT_GAZE arm). Still throwing at HEAD.
   Fix: add `setmangry` to the existing `./mon.js` import —
   `imports.mjs --can polyself.js mon.js setmangry` → ALREADY, no new
   edge. Verify `verify.mjs --fn dogaze`.
   **Addressed:** D-2441 `5f5f6f7a`
2. `dospinweb` PIT arm calls unimported `bury_objs`
   (`js/polyself.js:2584`, `await bury_objs(x, y)`; only `./dig.js`
   import is `buried_ball_to_freedom`). Guaranteed ReferenceError on web
   over pit. Still throwing at HEAD. Fix: add `bury_objs` to the existing
   `./dig.js` import — `--can` → ALREADY, no new edge. Verify
   `verify.mjs --fn dospinweb`.
   **Addressed:** D-2442 `eebc6dc2`

Verdict: **QUALITY-RISK**
