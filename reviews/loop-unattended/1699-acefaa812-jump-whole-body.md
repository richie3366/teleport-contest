# Review 1699 — acefaa812 — `apply.c` jump whole body (D-2740)

Metadata: commit `acefaa812`, D-2740, `js/apply.js` + `js/dothrow.js` + `js/spell.js` (1 export line). Coverage row (was CURRENT Next-cluster), 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole `jump` in C order (spell fallback, guard chain, utrap switch, hurtle path) + `hurtle_jump` port + `walk_path_async` twin. The diff delivers all of it. Promise matches deliverable.

## Inventory

Changed JS: `jump` (restarted, stays `export async`); new `walk_path_async` + `hurtle_jump` (`js/dothrow.js`); `SPE_JUMPING` export-only (`js/spell.js`); ~20 new import names on existing edges; const adds. No deleted symbols, no export clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (all newly-wired names):

```text
stucksteed:          stucksteed       js/steed.js:455   ASYNC — await required
spelleffects:        spelleffects     js/spell.js:2358   ASYNC — await required
known_spell:         js/spell.js:1338   sync
spe_Fresh:           js/spell.js:257   sync   export const
legs_in_no_shape:    js/trap.js:3341   ASYNC — await required
set_wounded_legs:    js/trap.js:3311   ASYNC — await required
Flying:              js/mhitu.js:711   sync
slithy:              js/monsters.js:519   sync
```

Every call site matches (async awaited/returned through the async `jump`; sync bare). `--can` on both sampled new names returns ALREADY — zero new module edges despite the message's "new edges" phrasing. `walk_path_async` is a documented async twin with no separate C body (verified line-identical to sync `walk_path` except the awaited `check_proc`); `hurtle_jump` is the C `:742–752` shape verbatim. No STUB in any arm.

## C ↔ JS fidelity

C loci read verbatim: `jump — apply.c:1987-2164` (head + tail), `hurtle_jump (dothrow.c:742–752)`, `hurtle_step` range protocol (`:776–789`, `:967–969`). Branch-by-branch:

- Spell fallback (`known_spell>=spe_Fresh` → `spelleffects` return) ✓; nolimbs/slithy `You_cant` (knight comment kept) ✓; `!Jumping` `You_cant` ✓; stucksteed ✓ — the old `pline("You can't…")` shapes are corrected to C's `You_cant` throughout the touched arms.
- uswallow/uinwater/ustuck/Levitation/encumbrance/hunger/legs/steed-trap chain ✓ in C order with C returns (`You(...)` message forms corrected from the old `pline('You …')` shapes; Levitation uses the H||E&&!B youprop shape; Wounded_legs reuses the file's `:4554` shape).
- getpos/ESC/is_valid/steed-in-place ✓ (`u_at` ≡ C `u_at`, exact).
- utrap switch: BEARTRAP (`rn2(3)` side, `maybe_half_phys(rnd(10))`, `rn1(1000,500)`) ✓; PIT/WEB (`deltrap`) /LAVA (`hliquid`, cc=u) ✓; BURIEDBALL/INFLOOR (strain text, dual `rn1(10,11)`, TIME return before reset) ✓; default impossible ✓; `reset_utrap(TRUE)` ✓.
- Same-spot: wastrapped→`morehungry(rnd(10))` precedence ✓; trap→come/fly + `dotrap(FORCETRAP|TOOKPLUNGE)` ✓; Hallu hop/decide ✓.
- Walk: max|dx|,|dy| range (manual abs ≡ C), `walk_path_async(uc, cc, hurtle_jump, {n:range})` — the `{n}` box is load-bearing and correct (`hurtle_step` reads `.n` for the `*range==0` stop, `rnd(2+*range)`, and the decrement/clamp, all replicated pre-existing); unconditional `multi_reason` assignment fixes the old guarded version to C ✓; teleds/nomul/nomovemsg/`morehungry(rnd(25))` ✓.
- `hurtle_step`'s missing `stopping_short`/`via_jumping` is that function's pre-existing named omit (doc `:2978`), not this commit's gap; the flag set/restore here is still C-exact and globally meaningful.
- RNG: draws only in C positions; none added/reordered.

## Hallucinations / overclaim

One conservative-direction imprecision ("new edges" where `--can` says ALREADY). No FORCE/DIAG/seed/coordinate logic (grep hits are message text + legitimate `FORCETRAP`/`uinwater` identifiers).

## Density

Whole 178-line C body + twin + callback, three modules, zero new edges. Right-sized; the twin + `{n}`-box are justified async adaptations, not scope creep.

## Verification

Re-measured per-SHA re-run (`--base acefaa812~1 --reach-all`) — both lines, matching the D-log (non-vacuous):

```text
verify jump: baseline acefaa812~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach jump: 12 baseline-PASS session(s) reach it (12 run, 7.3s): 12 PASS, 0 regressed → REACH-OK
```

Reach 12/12 PASS, 0 regressed → REACH-OK. Green/strict/cohort per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
