# Review 1676 — f72cbdb10 — `uhitm.c` do_attack overload/pacifist gate (D-2717)

Metadata: commit `f72cbdb10`, D-2717, `js/uhitm.js` only (+42/−6 with docs). Corpus-residual row (D-2420 W6, Caveman-92202). No prior review claimed closed.

## Intent vs deliverable

Subject promises: the Upolyd/`noattacks` pacifist gate and the `check_capacity || overexertion` short-circuit in C order, all three arms falling to an `atk_done` plant mirroring the existing end-of-function block; `noattacks`/`EXT_ENCUMBER` join existing imports. Diff delivers exactly that. Promise matches deliverable.

## Inventory

Changed JS: `do_attack` gate section only (new `attack_atk_done` closure + two gate arms + faint-path `attack_atk_done()` call); import lines extended (`EXT_ENCUMBER`, `noattacks`). No deleted/re-pointed symbols — new calls to live exports only.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (newly imported live callees):

```text
noattacks        js/hack.js:1211   sync
near_capacity    js/invent.js:1068   sync
```

(`--can` per commit message ALREADY — both join existing static imports, no new edge.) Bodies read: `noattacks` (`hack.js:1211`) skips `AT_BOOM` slots exactly like C `mondata.c` ✓; `check_capacity` C body (`hack.c:4398–4409`) is literally `near_capacity() >= EXT_ENCUMBER` + `pline(str)` — the JS inlines precisely this, so no `check_capacity` import was needed and no behavior was dropped ✓. `attack_atk_done` is line-identical in structure to the pre-existing end-of-function plant (`uhitm.js:4423–4436`, same five conjuncts incl. `memory_glyph_is_invisible`); whether memory-vs-raw glyph is the right predicate is pre-existing (both sites agree), not this SHA's scope. No STUB in any touched arm.

## C ↔ JS fidelity

C locus read: `do_attack uhitm.c:446–583` (csym range; the gate is `:525–534`): `if (Upolyd && noattacks(...)) { You(...); mstrategy &= ~; goto atk_done; }` then `if (check_capacity("...") || overexertion()) goto atk_done;`. RNG walk: no RNG call added/removed — the fix *removes* a spurious `rn2(20)` draw path (`overexertion→gethungry`) by restoring C's `||` short-circuit; the D-log's flat#6619 evidence (C `rn2(5)`@distfleeck vs JS `rn2(20)`@gethungry) makes the mechanism C-derived.

- Pacifist arm: `Upolyd(game.u) && noattacks(youmonst.data)` → pline + strategy-clear + plant + `return true` ✓. (`if (mstrategy != null)` guard before `&=` is a null-safe rendering of C's unconditional clear — no caller passes a strategy-less mtmp; not a C-wrong.)
- Capacity arm: `near_capacity() >= EXT_ENCUMBER` → same message + plant + return ✓; `overexertion()` now runs only when not overloaded, matching C `||` ✓. Faint path gains the plant call — C's faint also falls to `atk_done` ✓.
- Named omits (`twoweap→untwoweapon`, boulder/`throws_rocks`, `weight_cap` steed branch, scared/`onscary`/`monflee`) are pre-existing map rows, untouched per the row's do-not-re-port scope — correctly kept out of Must-fix.

## Hallucinations / overclaim

None. The "dispatch ported, callee stubbed" pattern does not occur — both gates call live bodies. Diff grep: no FORCE/DIAG/seed/step/coords (the commit message explicitly disclaims them; the diff confirms). Container/BoH state is left to live `weight()` per the row's falsification note, not re-ported — disclosed, not hidden.

## Density

Corpus-residual gate fix + same-function contract completion, one module. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base f72cbdb10~1 --reach-all`) — both summary lines:

```text
verify distfleeck: baseline f72cbdb10~1 — 3 session(s) blocked on it (3 at baseline, 2 in the working scoreboard)
  scen-poly-Caveman-92202: PASS
  scen-tour-Healer-92055: still distfleeck at step 104 [...]
  scen-tour-Samurai-92161: still distfleeck at step 37 [...]
verify distfleeck: 1 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS
reach distfleeck: 476 baseline-PASS session(s) reach it (476 run, 77.2s): 476 PASS, 0 regressed → REACH-OK
```

Note: the D-log (written at the commit) says Caveman moved 116 → later owner `monhp_per_lvl`@197; my re-run on current HEAD shows Caveman fully PASS — the later owner was itself fixed by D-2719 below, so this reads *better*, not worse. Healer/Samurai sit at their own W2/W3 writers, unchanged, not worse. Genuine PROGRESS + full-reach REACH-OK. Green/strict/cohort per D-log; Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
