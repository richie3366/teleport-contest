# Review 1228 — 635fe331 — polyself shift/merge/revert/placeholder + skinback (D-2262)

Metadata: SHA `635fe331` (D-2262). Pops the Open row named by
D-2248 (polyself were/do_merge/POLY_REVERT). js/ +262/−121
(`js/polyself.js` +261/−120, `js/makemon.js` +1/−1). Insertions
>250 raise the ceiling to 450; this file stays well under it.

## Intent vs deliverable

Subject promises: were `do_shift`, draconian `do_merge`/uskin,
`POLY_REVERT`, placeholder and own-role arms, plus `skinback`.
Diff actually delivers all six, a flattened-goto restructure of
the whole `polyself` body, and the `Is_dragon_scales` export.
Promise matches diff. The rework also deletes the old
"shared-accept preview" duplicate and the wrong `mntmp =
NON_PM` resets — both justified by the C below, not drive-by
refactors.

## Inventory

New: `export async function skinback(silently)`; `target`
label variable; `gvariant` box; `PM_GIANT/HILL_ORC/MORDOR_ORC/
GREEN_ELF/GREY_ELF/STONE_GIANT/HILL_GIANT/ALIGNED_CLERIC`
consts + `PM_CLERIC` import. Changed: `polyself` control flow,
`polyman` + `polymon` skinback call sites, `Is_dragon_scales`
local → export (visibility only — no re-point, so no `sym.mjs`
deletion output is owed). New import names all extend
**existing** `from` lines (hacklib, mkobj, were, invent,
timeout, monsters, makemon, monsters_data) — no new module
edge. Callee closure, all LIVE: `strstri`/`strsubst`
(hacklib.js:261/278 sync — canonical exports imported, no new
clone), `maybe_adjust_light` (mkobj.js:602 async — awaited),
`were_beastie`/`counter_were` (were.js:99/123 sync),
`observe_object` (invent.js:2678 sync), `artifact_light`/
`arti_light_radius` (timeout.js:1351/1378 sync), `is_bat`
(monsters.js:805 sync), `Is_dragon_scales` (same body as
before, now exported), `PM_CLERIC` (generated:337). No STUB in
any live arm.

## C ↔ JS fidelity

Walked against `polyself.c:468–731` (full body fetched this
audit via `csym.mjs polyself`) plus `skinback :1953–1969`,
`polyman :217`, `polymon :886–887`:

- REVERT vs `:500–504`: `mntmp = cham`, `monsterpoly =
  true`, `controllable_poly = false` (hence `let`, not
  `const`). C order kept (before the LOW_CTRL downgrade).
- Loop head vs `:511–535`: `mntmp = NON_PM`, getlin,
  mungspaces, ESC → forcecontrol-only `Never_mind` return
  else `"*"` fallthrough, exact `"*"`/`"random"` strcmp (no
  case-fold), `class = 0`, `name_to_mon(buf, gvariant)` —
  the gender box is real (`mondata.js:492` threads it into
  `name_to_monplus`), and C declares exactly `gvariant =
  NEUTRAL` as one loop-wide box. C.
- by_class vs `:537–542` with label inside the `mntmp <
  LOW_PM` branch: JS `by_class` boolean + `continue` re-enters
  only the class pick without re-running `name_to_mon` —
  exactly what `goto by_class` does. The old
  "shared-accept preview" is gone with no behavior it owned
  that C lacks.
- Placeholder vs `:544–563` as `else if` (never runs for class
  picks), with the own-race and `PM_HUMAN` exclusions and the
  three `rn2(3)` substitutes. The old refusal message for
  orc/elf/giant is correctly deleted. C.
- Refusal arms vs `:566–569`: bare-miss vs class-miss split
  kept, `You_cant` text identical.
- Own-role vs `:570–582`: `(debug)` gate (C `#define wizard
  flags.debug` — `flag.h:30`, fetched; C has **no**
  `flags.wizard` field, and nothing in js/ ever assigns
  `flags.wizard`, so the house `debug || wizard` disjunct
  collapses to C exactly), `Upolyd`, `mntmp == u.umonster`,
  the CLERIC/ALIGNED_CLERIC + `!strstri(buf,'aligned')`
  override, `rehumanize()` then `made_change` (C's `old_light
  = 0` belongs to the named light omit). C.
- do_shift vs `:583–586` + `:665–670`: the three-disjunct
  test (`were_beastie == ulycn`, `counter_were`,
  `Upolyd && PM_HUMAN`) then illegal→`PM_HUMAN`/else `ulycn`.
  C.
- !polyok vs `:587–613`: exemption triple (HUMAN / own-race
  non-unique / own role) kept; class-only retry with the
  `rn2(3) || --tryct` short-circuit and the `++tryct`
  put-back; the()/an()/bare article ladder kept; **no
  `mntmp` reset** — C keeps the refused pick so it reaches
  `newman()`, which the old JS broke by resetting to NON_PM
  (and thereby drawing the 200-try `rn1` funnel). The fix is
  C-cited, not a refactor. RNG-traced equivalence: `break`
  skips the `--tryct` decrement exactly like C's `break`;
  `"*"` → tryct 0 → `continue` → −1 → no `thats_enough_tries`
  (C: −1 is nonzero too). tryct accounting is identical.
- Post-loop gotos vs `:618–625` with draconian→iswere→isvamp
  priority preserved on both the controlled tail and the
  `else` chain (the old second-disjunct condition
  `!forcecontrol && !controllable && isvamp && !draconian &&
  !iswere` folds into the same priority). C.
- do_merge vs `:629–664`: `armor_to_dragon(uarm.otyp)`
  (draconian implies non-null uarm, so no null deref on
  either path that reaches it), `mvitals` G_GENOD gate,
  scales-intact vs mail-reverts (`otyp += SCALES − MAIL`,
  `observe_object`, `botl`), `uskin = uarm`, `I_SPECIAL`
  save/restore hack, lit `maybe_adjust_light`,
  `update_inventory()` — same order. `strsubst` returns the
  first-occurrence substitution (hacklib.js:278), matching C's
  in-place edit. The extra `game.flags.botl` beside C's
  `disp.botl` is an idempotent repaint flag (the standard JS
  idiom, cf. allmain.js:443) — unobservable. C.
- do_vampyr vs `:671–686`: leader-`rn2(10)` → `rn2(4)` →
  cham-`rn2(2)` short-circuit order exact (non-leaders skip
  the first draw, as in C's ternary); `y_n` prompt reads
  `gvariant.gender` (NEUTRAL on the no-getlin path, filled
  after `name_to_mon` — the old hard-NEUTRAL was wrong there).
  C.
- Shared tail vs `:688–695`: HUMAN→`newman()` ("werecritter")
  else `polymon`, then made_change — the `target` flattening
  routes all three labels there and the funnel runs only for
  `!target`, so `sex_change_ok` still wraps only the funnel
  path as in C. C.
- `skinback` vs `:1953–1969`: old_light → message unless
  silent → `uarm = uskin` → `owornmask &= ~I_SPECIAL` →
  conditional `maybe_adjust_light`. Text «Your skin returns to
  its original form.» ≡ C `Your(...)`. Call sites match
  `:217` (after `mtimedone = 0`, before `uundetected = 0`)
  and `:886–887` (uskin/dragon mismatch gate, before
  `break_armor`). C.

## Hallucinations / overclaim

None. D-log Symptom even documents what the old JS got wrong
(preview duplicate skipping wizard/were arms, NON_PM reset
drawing the funnel) with C ranges, and the Verify bullet
states vacuous + full 44/44.

## Density

+262 for six arms + a goto-flattening + skinback + two call
sites. In-band for one C function envelope (§2b).

## Verification

Re-measured myself: `hidden-proxy verify polyself --base
635fe331~1` → 0 blocked at baseline and working scoreboard
(vacuous, as labeled); `verify.mjs --fn polyself` at HEAD →
syntax/rule2 PASS, green 2/2, strict ×2, cohort 7/7, VERIFY:
PASS. Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None. `made_change` light bookkeeping and the `do_genocide`
POLY_REVERT callers are named omits with stated prerequisites
(light.js hero arm; read.js wiring), not Must-fix.

Verdict: **ACCEPT**
