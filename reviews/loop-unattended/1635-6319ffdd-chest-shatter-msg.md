# Review 1635 — 6319ffdd — lock.c chest_shatter_msg whole-body port (D-2676)

**Metadata:** SHA `6319ffdd`, `lock.c`
`chest_shatter_msg`, D-2676. JS:
`js/lock.js` (+62/−30ish) + `js/potion.js`
(1-word export). No Must-fix.

## Intent vs deliverable

Subject promises: the potion arm (You
hear/see + bottlename + potionbreathe) plus
a C-order switch and `An`. Diff restarts
the body with exactly that. Promise matches
deliverable.

## Inventory

- Restarted file-local `chest_shatter_msg`
  (C `staticfn`, correctly unexported).
- `bottlename` local→export
  (js/potion.js:2720, sync). Required
  `sym.mjs` on the re-point:

```text
bottlename       js/potion.js:2720   sync
potionbreathe    js/potion.js:2776   ASYNC — await required
An               js/objnam.js:2355   sync
```

All single live exports; `potionbreathe`
correctly awaited. No deleted symbols.

## C ↔ JS fidelity

C locus: `lock.c:1275–1318` (44 L via
`csym.mjs`). Arm-by-arm confirm, no RNG:

- Potion arm — `You("%s %s shatter!",
  Blind?"hear":"see", an(bottlename()))`
  exact; `You(fmt, ...args)` printf form
  verified at js/display.js:7610.
- `!breathless||haseyes → potionbreathe`
  guard exact, awaited.
- Blind save/force/restore keeps the
  sticky-`u.Blind` JS extra (restored,
  harmless).
- Material switch PAPER/WAX/VEGGY/FLESH/
  GLASS/WOOD/default in C order with
  identical literals; final `pline('%s %s!',
  An(thing), disposition)` replaces the
  manual capitalize.
- The `canon_an` alias avoids the file-local
  `an` shadow without touching other sites
  — legitimate.
- No new import cycle (`potion.js` has no
  `lock.js` edge).
- Caller: C `lock.c:187` → js/lock.js:1720,
  unchanged, none unwired.

## Hallucinations / overclaim

None.

## Density

Whole 42-line C function completed, two
files. Right-sized.

## Verification

D-log Verify PASS with honest 0-blocked
note. Re-ran `hidden-proxy.mjs verify
chest_shatter_msg --base 6319ffdd~1
--reach-all`:

```text
verify chest_shatter_msg: baseline 6319ffdd~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke chest_shatter_msg: no RNG-tagged reach; fixed smoke spread (24 run, 6.0s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
