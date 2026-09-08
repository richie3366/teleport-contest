# Review 1033 — 84dc0e34 — polyself article + vampire shape (D-2063)

**SHA:** `84dc0e34` · **D-id:** D-2063 · **Files:** `js/polyself.js`
only (~60 insertions)

## Intent vs deliverable

Subject promises: "controlled-name article + POLY_MONSTER vampire
shape change (queue owner polyself)". Two sessions, two arms:

- scen-poly-Archeologist-92119 step 63, screen-first at
  `polyself.c:613`: C «You can't polymorph into Croesus.--More--»
  vs JS «…into a Croesus.--More--» (controlled poly; «ghost» →
  «a ghost» already matched, «Croesus» did not).
- scen-poly-Caveman-91133 step 67, RNG-first at `polyself.c:675`:
  C «Become a vampire bat? [yn] (n)» + `rn2(4)=2` vs JS «You feel
  like a new gnome!» + `rn2(330)=72` (vampire `#monster` fell into
  the `rn1(SPECIAL_PM)` random pick).

Diff actually adds the article arm + `controllable_poly` const +
`vampyr_goto` skip + do_vampyr block. Promise matches diff.

## Inventory

| JS function | Change |
|---|---|
| `polyself` (polyself.js) | article arm, controllable_poly, vampyr_goto, do_vampyr block |

## C ↔ JS fidelity

C loci read in full: `:470–530` (controllable/goto),
`:585–624` (article + post-loop gotos), `:660–690` (do_vampyr).

**Article arm — confirms verbatim** against `:608–615`:
`pmname` → `the_unique_pm` → `the()` → else
`!type_is_pname` → `an()`. JS reproduces the chain exactly,
including the `:596–601` guard (`PM_HUMAN` / `your_race` +
`!(geno & G_UNIQ)` / own role → `newman`, not the message).
`You_cant("polymorph into %s.")` ≡ the `pline` literal. All four
helpers LIVE on existing edges (`the_unique_pm` objnam.js:2399,
`type_is_pname` do_name.js:587, `your_race` monsters.js:473,
`G_UNIQ` monsters.js:73 — the diff imports the exports, adding no
clone).

**controllable_poly — confirms** `Polymorph_control && !(Stunned
|| Unaware)` (`:480`); Stunned shape mirrors the `hack.js`
idiom; `Unaware()` is the LIVE `eat.js:479` export (not one of
the 8 local clones elsewhere).

**vampyr_goto — confirms** `monsterpoly && isvamp → skip getlin`
(`:511`), placed before the `forcecontrol` block as C places the
goto before it.

**do_vampyr block — confirms**, including RNG short-circuit
order. C `:662–668`: leader-gated `rn2(10)` → WOLF, else `rn2(4)`
→ FOG else BAT, then cham `rn2(2)`. JS `if (A && !rn2(10))…
else if (!rn2(4))…` draws identically under short-circuit
(verified by case analysis, not just reading). `youdata?.mndx`
is sound: `mons()` (`monsters.js:201`) stamps `mndx` on every
permonst product and `set_uasmon` installs exactly that as
`youmonst.data`, so pointer-equality ≡ mndx-equality here.
`y_n('Become …?')` uses NEUTRAL gender because no getlin ran —
`gvariant` is still its NEUTRAL init on this path, as commented.
Direct `polymon`/`newman` + return matches `:680–685` (`goto
made_change`; light bookkeeping deferred and named; no
`sex_change_ok` wrap per C's own comment).

**Second-disjunct priority — confirms.** C's `else if
(draconian || iswere || isvamp)` dispatches merge/shift/vampyr by
priority; JS takes do_vampyr only with `!draconian && !iswere`,
so a draconian/lycanthrope vampire falls through exactly as C's
priority demands (merge/shift arms deferred and named). Post-loop
`tryct<=0` gotos likewise deferred and named in this commit.

## Hallucinations / overclaim

None. No dispatch-with-stub-callee shape: every callee on the new
paths is LIVE.

## Density

~60 insertions, one function, one falsifier family. Right-sized.

## Verification

Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify polyself --base 84dc0e34~1
verify polyself: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-poly-Archeologist-92119: moved → rehumanize at step 90 (was 63)
  scen-poly-Caveman-91133: moved → dog_invent at step 115 (was 67)
```

Identical to the D-log. 0 PASS is honest forward movement here:
both sessions advance 27/48 steps to strictly later owners
(rehumanize, dog_invent), which is PROGRESS per §2a, not NO
MOVEMENT. Diff grep: no FORCE/DIAG/RNG-log gates. Green/strict/
cohort per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
