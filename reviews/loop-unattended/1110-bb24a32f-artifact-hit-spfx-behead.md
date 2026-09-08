# Review 1110 — bb24a32f — artifact_hit SPFX_BEHEAD (D-2144)

Metadata: SHA `bb24a32f`, `js/artifact.js` only (~+95/−3 in `js/`).
Queue row fired: Open `artifact.c artifact_hit` (scen-genesis-Rogue-92214
step 104). No prior review claimed closed.

## Intent vs deliverable

Subject promises the full SPFX_BEHEAD arm (Tsurugi + Vorpal) in C order
and short-circuit. Diff delivers exactly that: Tsurugi
`dieroll==1` block + Vorpal `dieroll==1 || Jabberwock` block, DRLI left
named-deferred.

## Inventory

- `artifact_hit` (extended): SPFX_BEHEAD arm, `C :1550–1644`.
- Imports: `bigmonst/has_head/noncorporeal/amorphous` (+monsters.js edge),
  `NECK` (+const.js), `Monnam` (+do_name.js), `observe_object` (+invent.js),
  `mbodypart/body_part` (+polyself.js), `ART_VORPAL_BLADE` /
  `ART_TSURUGI_OF_MURAMASA` (+generated), local `PM_JABBERWOCK` /
  `FATAL_DAMAGE_MODIFIER = 200` consts.

## C ↔ JS fidelity

Walked `artifact.c:1550–1644` arm-for-arm against the new JS. Tsurugi:
engulf-slice (`2*mhp+FATAL`, silent return TRUE), `notonhead→FALSE`
before `bigmonst`, deep-cut `dmg*=2`, bisect + `observe_object`,
youdefend `bigmonst(youmonst)` deep-cut vs `2*(mh|uhp)+FATAL` bisect —
all in C order with C-identical values. Vorpal: engulfed-attacker
silent FALSE, `has_head||notonhead||uswallow` miss-wildly (`dmg=0`,
`return youattack||vis`), noncorporeal/amorphous slice-through with no
dmg change, `2*mhp+FATAL` + `ROLL_FROM` + Henry-gate + observe,
youdefend mirror with lowercase `mon_nam(magr)` fallback — all match,
including the `!youdefend`-block-always-returns structure that makes
JS's `if/if` equivalent to C's `if/else`. `rn2(2)` beheadverb draws
only on message paths, as C's `ROLL_FROM` does; the corpus C die
(`rn2(2)=0 @ :1618`) is reproduced — session PASS is empirical proof.
Callee closure all LIVE: `engulfing_u` (const.js), `Monnam`
(do_name.js:1149), `observe_object` (invent.js:2677), `bigmonst` /
`noncorporeal` / `amorphous` (monsters.js), `mbodypart`/`body_part`
(polyself.js hoisted exports), `Upolyd` (const.js),
`get_artifact`/`is_art`/`spec_ability` (same module). `has_head` has a
shk.js clone but this commit imports the monsters.js export — correct
per sym guidance. `NECK`/`ART_*` consts check out. One pre-existing
nit, not this commit's: the arm reads the module-local `Hallucination()`
(`js/artifact.js:1316`) rather than the live export
(`js/display.js:963`, D-1493); the clone omits the
`uprops[HALLUC_RES]` intrinsic/extrinsic resistance check, so a hero
with uprops-granted halluc-resistance would wrongly see the Henry pline.
Clone pre-exists, no corpus session reaches it (Henry gate needs
Hallucination true at a behead), fix belongs to a clone-unification
iter, not Must-fix here.

## Hallucinations / overclaim

None. D-log claims BEHEAD only, names DRLI/`Mb_hit`/destroy-ignite as
still deferred, documents the `RUN_STEP`-style deviations (`wepdesc`
fallback, full-text pline). "Draw always fires" for `rn2(2)` is borne
out by the PASS.

## Density

~95 `js/` insertions for a 95-line C arm — exactly the §2b unit (one
practical switch arm + its import edges).

## Verification

D-log Verify: `verify.mjs --fn artifact_hit` → 1 PASS + green/strict/
cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify artifact_hit --base bb24a32f~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-genesis-Rogue-92214: PASS). Exact match, no regression.
`imports.mjs --rulecheck`: Rule #2 clean. No FORCE/DIAG/seed/coordinate
gates in the hunks.

## Actionable C-wrongs

None (Hallucination-clone unification noted above is pre-existing debt
without corpus demand — not queueable as this SHA's Must-fix).

Verdict: **ACCEPT**
