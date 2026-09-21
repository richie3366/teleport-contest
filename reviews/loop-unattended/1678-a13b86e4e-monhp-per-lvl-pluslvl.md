# Review 1678 — a13b86e4e — `makemon.c` monhp_per_lvl whole body + `pluslvl` Upolyd arm (D-2719)

Metadata: commit `a13b86e4e`, D-2719, `js/makemon.js` + `js/exper.js` + new `scripts/monhp-per-lvl.test.mjs` (6 tests). Corpus-residual row (Caveman-92202's later owner after D-2717). No prior review claimed closed.

## Intent vs deliverable

Subject promises: C-order `monhp_per_lvl` restart (unconditional `rnd(8)` default + overwriting arm chain) and the `pluslvl` Upolyd arm (`monhp_per_lvl :320 → mh += :321 → setuhpmax(mhmax,FALSE) :322` before `newhp :324`); no new imports; new unit test. Diff delivers all of it. Promise matches deliverable.

## Inventory

Changed JS: `monhp_per_lvl` (restart, `js/makemon.js:966`); `pluslvl` (Upolyd prefix, `js/exper.js:180`); docs only otherwise. Added `scripts/monhp-per-lvl.test.mjs` (outside scored `js/` — no Rule #2 surface). No deleted/re-pointed symbols; all callees already imported.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (restart uses pre-existing imports; nothing deleted or re-pointed):

```text
monhp_per_lvl    js/makemon.js:966   sync
pluslvl          js/exper.js:180   ASYNC — await required
```

Callees LIVE: `rnd`/`rn2` (`rng.js`), `is_golem` (`monsters.js`), `golemhp` (same file), `Upolyd` (already in `exper.js`), `setuhpmax` (same file — Upolyd/mhmax branch read this iteration, `exper.js:126–148`: `!Upolyd || evenWhenPolyd` → uhpmax else mhmax — exactly C's "acts as setmhmax()" at `:322`) ✓. `pm('GRAY_DRAGON')` renders C `PM_GRAY_DRAGON` via the house pm lookup. No STUB in either arm.

## C ↔ JS fidelity

C loci read: `monhp_per_lvl makemon.c:985–1007` (csym range), `pluslvl exper.c:306–330` (arm `:317–324` read above), callers `artifact.c:1653`, `exper.c:283/:320`, `zap.c:524/:755` (doc-cited; `uhitm.c:2497` correctly identified as comment-only).

- Draw envelope — the actual C-wrong fixed: C draws `rnd(8)` unconditionally, then each arm overwrites *with its own extra draw* (`4+rnd(4)`, `4+rn2(5)`, `rnd(4)`; golem arm draws nothing further). Old JS returned early per arm (1 draw on every arm); new JS `let hp = rnd(8)` + overwriting `else-if` chain reproduces C's 1-or-2-draw envelope arm-for-arm ✓. RNG walked call-for-call: `rnd(8)`×1 always; `rnd(4)`/`rn2(5)`/`rnd(4)` on exactly the C arms ✓. Golem `|| 1` zero-guard only covers C-divide-by-zero territory (golems always leveled in practice) — defensive, not divergent.
- `pluslvl`: Upolyd prefix order (`monhp → mh += → setuhpmax(mhmax,false)` → `newhp`) matches C `:317–324` statement-for-statement ✓. This was the session divergence: C `rnd(4)`@`monhp_per_lvl:1004` vs JS `rnd(1)`@`newhp` — C draws the monster-form HP first, JS skipped straight to human-form `newhp`.
- Named: none new — whole body live.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/step/coords in the hunks (verified pattern from prior SHAs; the message disclaims them and the hunks above show plain C-order code). The test's "pre-fix failure shape" note (old body 1 draw / old pluslvl none) is an honest regression artifact, not a fitted gate.

## Density

Breadth-phase whole-function restart + same-session caller arm, two modules + a 6-test unit file. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base a13b86e4e~1 --reach-all`) — both lines:

```text
verify monhp_per_lvl: baseline a13b86e4e~1 — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-poly-Caveman-92202: PASS
verify monhp_per_lvl: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke monhp_per_lvl: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

Note: the D-log (written at the commit) says Caveman moved 197 → `destroy_arm`@240; my HEAD re-run shows Caveman fully PASS — D-2721 fixed that later owner afterward. Reads better, not worse. The queue row cited exactly 1 block and it is gone. Unit test re-run this iteration: 6 pass, 0 fail. Full 44/44 per D-log (shared `exper.js` touched); Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
