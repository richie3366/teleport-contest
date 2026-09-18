# Review 1404 — 61e88a0a — pager.c look_at_monster whole body (D-2445)

- Commit: `61e88a0a` — "`pager.c` look_at_monster whole body in C order (coverage MISSING → live) (D-2445)."
- Files: `js/pager.js` (+242/−~136), `js/do_name.js` (+27: coyotename +
  PM_COYOTE); docs + map + queue pop.
- D-log: D-2445. Queue row popped: look_at_monster MISSING (C 135 L).

## Intent vs deliverable

Subject promises whole `look_at_monster` (`pager.c:421–555`) in C
order. Diff delivers: new `look_at_monster(mtmp, x, y) → {buf,
monbuf}`, new `coyotename` + `monhealthdescr` (`''`, C-disabled),
old helpers kept as delegating halves. Promise kept.

## Inventory

New/changed JS: `look_at_monster` (`js/pager.js:453–567`),
`monhealthdescr` (`:431`), `coyotename` + `PM_COYOTE`
(`js/do_name.js`), re-signed `look_at_monster_buf(mtmp, x, y)` /
`howmonseen_look_buf`. No symbol deleted. Required `sym.mjs`
spot-checks (all LIVE): `Mgender js/do_name.js:598 sync`,
`visible_region_at js/region.js:91 sync`, `mhidden_description
js/pager.js:1875 sync`; `coyotename`/`distant_monnam`/`PM_COYOTE`
imported from do_name (`--can` → ALREADY).

## C ↔ JS fidelity

C loci via csym: `look_at_monster :421–555` (135 lines),
`coyotename do_name.c:1525–1535`, `monhealthdescr pager.c:136–163`.
Branch-by-branch confirm:

- `accurate = !Hallucination` gates coyote/tail/health/tame ✓;
  coyote `m_id % (SIZE-1)` + mcan-last ≡ C ✓ (mndx compare
  justified: JS builds fresh permonst objects); tail
  isshk&&accurate split ✓; health always `''` ≡ disabled C ✓;
  tame/peaceful accurate-gated ✓.
- ustuck `===` compare + `uswallow||save_uswallow` +
  digests-swallow/engulf + `Upolyd&&sticks` held/holding ✓
  (`Upolyd(` is the 5× file idiom).
- mfrozen/msleeping/STRAT texts ✓; mleashed ✓; mtrapped +
  cansee(mx,my) + BEAR/is_pit/WEB + `an(trapname)` + `tseen=1` ✓
  (NULL-trap safe: NO_TRAP fails the gate in both).
- mhidden on mundetected/M_AP_TYPE/`visible_region_at(x, y)` with
  the LOOK coords ✓.
- monbuf: 7 bits in C order with while-remaining `", "` (not
  join) ✓; WARNMON hallu arm + warntype obj|polyd chain +
  `pmname(data, Mgender)` + makeplural ✓; leftover `(%u)` suffix
  preserved with the `>>>0` unsigned note ✓.
- Caller closure complete: C has exactly 2 sites (`:710`
  lookat, `:2002` look_all); JS wires both with real coords
  (`:2016`, `:2163` loop x,y). Old 1-arg `look_at_monster_buf`
  callers: none remain (sole caller passes x,y) ✓.
- Banned-pattern grep on the hunks: zero hits. No RNG in C body,
  none in JS.

Nits (not C-wrongs): `howmonseen_look_buf` is now callerless
(3-line dead helper, kept from the old split); `coyotename(null)`
returns `'it'` where C writes garbage to the buf (unreachable —
callers never pass NULL); leftover-arm `impossible()` skipped in
the sync path with the suffix preserved (named in D-log, debug-log
only — acceptable named omit).

## Hallucinations / overclaim

None. "Old helpers kept as thin halves delegating to it" is true
(`:574–584`). The `(%u)`-preserved claim verified in code. No
dispatch/callee split: all callees LIVE.

## Density

One C function + its two do_name callees, two modules that already
import each other, +276/−136. Right-sized.

## Verification

D-log: `verify.mjs --fn look_at_monster` → PASS (syntax 2 files ·
rule2 · hidden note · smoke 24/24 · green · strict · cohort). My
re-run on this SHA:

- `hidden-proxy.mjs verify look_at_monster --base 61e88a0a~1
  --reach-all` → "0 session(s) blocked on it (0 at baseline, 0 in
  the working scoreboard)" + "smoke look_at_monster: no RNG-tagged
  reach; fixed smoke spread (24 run): 24 PASS, 0 regressed →
  REACH-OK". Vacuous but honestly logged; no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
