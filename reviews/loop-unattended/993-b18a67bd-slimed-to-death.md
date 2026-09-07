# Review 993 — b18a67bd — timeout slimed_to_death (D-2023)

Metadata: SHA `b18a67bd`, D-2023, Open-row port
(exercise-symptom writer, 4/6 sessions). js/ touches
`js/timeout.js` (+106/−5: new `done_timeout` +
`slimed_to_death`, `SLIMED` arm, import extensions). No
stamp owed.

## Intent vs deliverable

Subject promises: Slimed expiry polymorphs into a slime
via `slimed_to_death`, ending in `done_timeout` — the
turn aborts into death inside nh_timeout (C step log ends
in the terminal `rn2(2), rn2(2), rn2(19)` exercise triple
with no dosounds/gethungry/wipe draws after), not a
skipped exerper arm. Diff actually adds: both functions
plus the expiry-loop arm. Promise == diff.

## Inventory

- New JS functions: `done_timeout`, `slimed_to_death`
  (both local; C declares both `staticfn` — correctly
  unexported).
- Classification: all callees LIVE. `polymon` extends the
  pre-existing polyself edge (rehumanize/body_part
  already imported); `emits_light` / `del_light_source`,
  `monst_to_any`, `urgent_pline`, `upstart` all
  pre-existing imports (verified present at
  `timeout.js:46/57`). New `end.js` names (`done`,
  `find_delayed_killer`, `dealloc_killer`):
  `imports.mjs --can` on both reports ALREADY statically
  imported — stronger than the D-log's CHECK claim: names
  on an existing edge, no TDZ possible.
- No deletes / re-points, no STUB / clone / no-op.
  Named omits: STONED `done_timeout` (same switch, no
  corpus coverage); genocided-lifesave slimicide arm (no
  corpus session genocides slime — straight-line C,
  unreached, though the code IS ported, see below);
  polymon's pre-existing Slimed/strangle/glib omits.

## C ↔ JS fidelity

Walked against `timeout.c:456–521` (`slimed_to_death`),
`:574–585` (`done_timeout`), call site `:686–688`
(`case SLIMED: slimed_to_death(kptr)`). Redundant
green-slime check renders the data-pointer compare as
`Upolyd(u) && umonnum === PM_GREEN_SLIME` (justified
in-comment by the set_uasmon invariant; same idiom as
reviews 994/996) ✓. Killer setup preserves the
`kptr && name[0]`-empty default (`kptr.name` truthiness
is string-equivalent) with `dealloc_killer` on both
paths ✓. emits_light / del_light_source + mvitals
ungenocide dance + `await polymon` + restore in exact C
order ✓. `done_timeout` keeps the I_SPECIAL set → done
→ clear → botl shape ✓ (with a defensive uprops-slot
create C never needs — harmless). Post-done flow uses a
`program_state.gameover` guard for C's non-returning
`done` ✓. Genocided arm keeps the KILLED_BY/slimicide
killer, both message variants, the `last_msg ==
PLNMSG_OK_DONT_DIE` gate — and even C's own open
question, `done(GENOCIDED); /* [should it be
done_timeout(GENOCIDED, SLIMED)?] */`, copied honestly
instead of "resolved" ✓. Call site: C's switch case
lands in JS's equivalent expiry if-chain under the same
`!(next & TIMEOUT)` condition with `p === SLIMED` ✓.

## Hallucinations / overclaim

None. "Match C" here covers ported dispatch AND live
callees — no stubbed callee anywhere in the arm, so the
dispatch/callee hallucination pattern does not apply.

## Density

One C function + its tiny sibling, one module.
Right-sized.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify exercise --base b18a67bd~1
→ 0 PASS, 4 moved past, 2 unchanged, 0 worse → PROGRESS
```

Reproducing the D-log exactly (Monk-92000 →
enlightenment@67; Tourist-92095 → do_statusline2@46;
Wizard-92120 → enlightenment@48; Caveman-92138 →
do_statusline2@66). The 2 unchanged rows are honestly
triaged downstream owners (scroll-of-fire → Open row
`seffect_fire`; Famine hits → Open row `mhitm_ad_famn`;
both now live queue rows, confirming the triage). js/
hunk grep: no banned patterns. Rule #2 clean (global
re-run). Cited green + strict ×2, cohort 7/7, full 44/44
(manual frozen run for the shared per-turn path).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
