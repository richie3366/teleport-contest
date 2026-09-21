# Review 1673 — 70a4bf39 — `invent.c` look_here Blind returns + `:` wiring; doopen_indir feel arm (D-2714)

Metadata: commit `70a4bf39`, D-2714, `js/invent.js` (+28/−6) + `js/cmd.js` (+4/−3) + `js/lock.js` (+15/−4). Closes corpus-residual row D-2420 W5 (Wizard-92127). No prior review claimed closed.

## Intent vs deliverable

Subject promises: `look_here` Blind→ECMD_TIME returns + `:` wiring, and the doopen_indir feel arm. Diff does all three: four `look_here` return sites, the `:` turn-cost wiring, `b_trapped`-before-`D_NODOOR` reorder + `feel_newsym`. Promise matches deliverable.

## Inventory

Changed JS: `look_here` return contract (5 sites, body otherwise untouched); `:` arm one-liner; doopen_indir success arm (order + `feel_newsym`). Imports: `ECMD_TIME` joins the existing const import; `feel_newsym` joins the existing display import. No deleted/re-pointed symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (nothing deleted or re-pointed — return-value changes + new calls to live exports):

```text
look_here        js/invent.js:8021   ASYNC — await required
feel_newsym      js/display.js:4981   sync
```

`--can` lock→display: `ALREADY: lock.js already statically imports display.js. No new edge needed.` (`feel_newsym` body verified: `hero_Blind() ? feel_location : newsym` — exactly C's "the hero knows she opened it".) `dolook` propagation pre-existing (`invent.js:8210–8215`, `return res` — read). Async discipline unchanged (`look_here` was already async; pickup `(void)`-discard sites untouched). No STUB in any touched arm.

## C ↔ JS fidelity

C loci read: `invent.c:4214–4217` (can't-reach → `return ECMD_OK` inside the Blind-only block), `:4248` (no-object → `!!Blind ? ECMD_TIME : ECMD_OK`), `:4314` (shared skip/single/multi tail → same Blind gate), `:4319–4327` (`dolook` returns `res`), `cmd.c:1759` (`:` → `dolook` binding), `lock.c:904–914` (`rnl(20)` gate, `b_trapped` before `D_NODOOR`, shop `add_damage`, `feel_newsym`, `recalc_block_point`). RNG: no RNG call added/removed/reordered — the fix restores the *missing turn* (Blind `:` previously cost 0), which re-aligns the downstream `rnl(20)` draw; the D-log's C-log proof (C draws the 18-RNG Blind-look turn at step 101 AND `rnl(20)=5` at step 103) makes the mechanism C-derived, not fitted.

- `look_here`: can't-reach → `ECMD_OK` even when Blind ✓ (the one arm where C does NOT charge); no-object/skip/single/multi-falloff → `blind ? ECMD_TIME : ECMD_OK` ✓ (four sites, one shared gate).
- `:` arm → `game.context.move = ((await dolook()) & ECMD_TIME) ? 1 : 0` — byte-identical idiom to the sibling `do_repeat` arm (`cmd.js:3619`), matching C's generic `res & ECMD_TIME → move` dispatch used by the canned path (`:3374`) ✓.
- doopen_indir: `b_trapped` awaited before `D_NODOOR` ✓; `feel_newsym(x, y)` at C `:914` position before `recalc_block_point` ✓. `set_msg_xy` absent at all three lock.c sites (`:874/:905/:918`) — pre-existing (untouched lines), writes only `game.a11y.msg_loc` (verified `display.js:7501–7508`, no screen/RNG effect), family-named in the doc. Shop `add_damage` (`:911`) newly named in the map ✓.

## Hallucinations / overclaim

None — and the high-risk pattern ("dispatch ported, callee stubbed") does not occur: every callee on the touched paths is live, and the session movement is C-mechanism-backed (missing turn, not a fitted count). The D-log's stale-read note (one same-second `show` painting pre-fix glyphs, 4 later runs agreeing) is disclosed, not hidden. Diff grep: no FORCE/DIAG/seed/step/coords/fastforward — no trace-shaped production.

## Density

Corpus-residual fix + same-file return-contract completion, three modules, no new edges. Right-sized; the `verysmall/not-closed return res` latent noted in the D-log is explicitly deferred, not smuggled.

## Verification

Re-measured per-SHA re-run (`--base 70a4bf39~1 --reach-all`) — both summary lines, matching the D-log's claim line-for-line:

```text
verify distfleeck: baseline 70a4bf39~1 — 4 session(s) blocked on it (4 at baseline, 3 in the working scoreboard)
  scen-normal-Wizard-92127: PASS
  scen-poly-Caveman-92202: still distfleeck at step 116 [...]
  scen-tour-Healer-92055: still distfleeck at step 104 [...]
  scen-tour-Samurai-92161: still distfleeck at step 37 [...]
verify distfleeck: 1 PASS, 0 moved past, 3 unchanged, 0 worse → PROGRESS
reach distfleeck: 475 baseline-PASS session(s) reach it (475 run, 65.3s): 475 PASS, 0 regressed → REACH-OK
```

The queue row cited 1 block (Wizard-92127) and it is now PASS; the other three sit at their own writer rows (Caveman overload-gate, Healer W2, Samurai W3) — unchanged, not worse. REACH over all 475 baseline-PASS reach sessions: zero regressed. This is a genuine PROGRESS verify, not vacuous. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
