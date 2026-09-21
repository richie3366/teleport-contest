# Review 1679 — 54325651d — `allmain.c` stop_occupation gate + `adj_victual_nutrition` race (D-2720)

Metadata: commit `54325651d`, D-2720, `js/hack.js` + `js/eat.js`. Corpus-residual Satiated pair (Healer-92092 → PASS, Tourist-91125 moved). No prior review claimed closed.

## Intent vs deliverable

Subject promises: `stop_occupation` C-order gate (`maybe_finished_meal(TRUE)` around the «stop» pline, then occupation=null, botl, nomul) and a C-order `adj_victual_nutrition` (lembas elf/orc, cram dwarf, clamp ≥1) wired into `bite` for nmod<0, retiring that named omit. Diff delivers both, plus doc updates. Promise matches deliverable.

## Inventory

Changed JS: `stop_occupation` (gate + `disp.botl`, `js/hack.js`); new local `adj_victual_nutrition` (`js/eat.js:1506`) + `bite` one-liner; import lines extended (`maybe_finished_meal`, `is_dwarf`). No deleted symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (both names newly imported → re-pointed to live exports):

```text
maybe_finished_meal js/eat.js:2269   ASYNC — await required
is_dwarf         js/monsters.js:603   sync
adj_victual_nutrition NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/eat.js:1506
```

`--can` per message ALREADY for both (existing static imports extended). The `adj_victual_nutrition` "NOT EXPORTED / clone" line needs one clarifying sentence: C declares it `staticfn` (`eat.c:335–356`), so a file-local unexported JS function in the same module that owns its sole caller (`bite :3148`) is the faithful shape, not clone drift. `hero_form_data()` reused from the module-local helper (`eat.js:193`, pre-existing) — no new edge. Await discipline: `maybe_finished_meal` awaited in its async caller ✓. No STUB in either arm.

## C ↔ JS fidelity

C loci read: `stop_occupation allmain.c:683–696` (csym range; message cites `:685–699`, same 14-line body) and `adj_victual_nutrition eat.c:335–356` (csym). No RNG in either body.

- `stop_occupation`: `maybe_finished_meal(TRUE)` gate around the «stop» pline ✓ (`if (!(await ...))` — C `if (!...)`); occupation=null ✓; `flags.botl` + `disp.botl` (C `disp.botl = TRUE`; flags.botl is the house twin per botl.js:753, both cleared together) ✓; `nomul(0)` both branches ✓; `cmdq_clear(CQ_CANNED)` → pre-existing `game._cmdq_canned = []` (untouched line, "avoid importing cmd.js" — pre-existing rendering, not this SHA).
- `adj_victual_nutrition`: `Upolyd(u) ? is_X(form) : Race_if(PM_X)` renders C `maybe_polyd(is_X(youmonst.data), Race_if(...))` per `youprop.h:22` ✓; lembas `±(nut+2)/4`, cram `+(nut+3)/6` via `Math.trunc` (C positive-int `/` truncates; `nut>0` asserted in C, clamped `≥1` in both) ✓; otyp/nmod sourced from `victual.piece`/`victual.nmod`, called only when nmod<0 ✓. `bite`'s old inline (`nut=-nmod; clamp; lesshungry`) is replaced, retiring the named omit — the old inline is *deleted*, not left as a shadow ✓.
- `Upolyd(player)` (`const.js:3184`, `umonnum !== umonster`) matches the C macro ✓.
- Named: statusline re-port explicitly forbidden by the row and untouched ✓.

## Hallucinations / overclaim

None. The D-log's measurement (stepFns empty both sides, RNG 3078/3078 matched, C flips Satiated at the hard-time turn while JS paints a turn late) is a deterministic state-timing claim with both sides' evidence, not a fitted count. No FORCE/DIAG/seed gates in the hunks.

## Density

Corpus-residual pair fix: one gate + one whole (22-line) C staticfn + caller wiring, two modules. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 54325651d~1 --reach-all`) — both lines, matching the D-log:

```text
verify do_statusline2: baseline 54325651d~1 — 3 session(s) blocked on it (3 at baseline, 1 in the working scoreboard)
  scen-wish-Healer-92092: PASS
  scen-wish-Monk-92194: still do_statusline2 at step 88 [...]
  scen-wish-Tourist-91125: moved → lesshungry at step 162 (was 83)
verify do_statusline2: 1 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS
smoke do_statusline2: no RNG-tagged reach; fixed smoke spread (24 run, 3.4s): 24 PASS, 0 regressed → REACH-OK
```

Healer-92092 fully PASS; Tourist moved to `lesshungry` (a live function, later owner — disclosed); Monk-92194 sits at the D-2161 gulpmu residual (named, untouched per scope). No session worse. Genuine PROGRESS + smoke REACH-OK. Full 44/44 per D-log (shared `hack.js`); Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
