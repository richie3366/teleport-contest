# Review 3061 — 19281aa6e — buzzmonst Rider arm imports EYE

- SHA: `19281aa6e` (Must-fix at the parent: `zap.c` buzzmonst
  `ReferenceError: EYE is not defined`, scen-worldtour-Wizard-53250033,
  board owner misattributed to randomize_gem_colors step 0, @aabaf289f)
- D-entry: D-4221; Ledger: dobuzz ported
- `js/` diff: zap.js +1 −1 (import list only)

## Intent vs deliverable

Promise: zap.c dobuzz's Rider arm (the `buzzmonst:` label) prints
«%s body reintegrates before your %s!» with `body_part(EYE)` when a
breathed death ray disintegrates a Rider (`:4887–4897`). JS read `EYE`
without importing it, so the first such hit threw and voided the rest
of the session.

Diff: `EYE` added to zap.js's existing `./const.js` import list. That is
all. The promise matches the diff. The D-entry also backfills D-4220's
sweep line (docs only).

## Inventory

- dobuzz → `buzzmonst` closure — js/zap.js:2502–2640; the Rider arm is
  at `:2527–2551`. C zap.c dobuzz `:4779–5037`, `buzzmonst:` label
  `:4870`, Rider arm `:4887–4899`.
- Re-pointed symbol: `EYE` (was an unresolved global, now imported).

```text
$ node scripts/sym.mjs EYE
EYE              js/const.js:582   sync   export const
```

C hack.h `:131–133`: `ARM = 0, EYE = 1, FACE = 2`. JS const.js
`:581–583`: `ARM = 0, EYE = 1, FACE = 2`. The value matches.

- Other callees of the arm: hit, flash_str, Monnam, s_suffix, eyecount
  (mondata.js import `:265`), body_part (polyself.js import `:308`),
  makeplural (objnam.js import `:244`), canseemon, pline. All are LIVE
  imports. No other unresolved names: a scan of zap.js for const.js
  exports used but not imported finds `EYE` at the parent and nothing
  at HEAD.

## C ↔ JS fidelity

C `:4887–4899`:

```c
if (is_rider(mon->data)
    && abs(type) == ZT_BREATH(ZT_DEATH)) {
    if (canseemon(mon)) {
        hit(flash_str(fltyp, FALSE), mon, ".");
        pline("%s disintegrates.", Monnam(mon));
        pline("%s body reintegrates before your %s!",
              s_suffix(Monnam(mon)),
              (eyecount(gy.youmonst.data) == 1)
                  ? body_part(EYE)
                  : makeplural(body_part(EYE)));
        pline("%s resurrects!", Monnam(mon));
    }
    mon->mhp = mon->mhpmax;
    break; /* Out of while loop */
}
```

- Guard: `is_rider && abs(type) === ZT_BREATH_0 + ZT_DEATH`. ZT_BREATH(x)
  is `20 + x` (zap.c `:57`), which matches. The arm sits right after `zhitm`, as in C.
- Three plines in C order, under `canseemon`. The eyecount ==1 test
  picks singular or plural, as in C.
- `mhp = mhpmax`, then `return true`. The caller at `:2644` / `:2655`
  does `if (await buzzmonst(…)) break;`, the closure's encoding of C's
  `break; /* Out of while loop */`. Matches.

No RNG in the arm; zhitm's draws happen before it and are unchanged.

## Hallucinations / overclaim

None about this arm. "Named omissions: none" is true for buzzmonst.

But this is a *family* bug (a const.js name used without an import,
which throws only when reached), and the commit fixed the one instance
the corpus hit without sweeping for others. I ran the same scan over
every `js/*.js` at HEAD. After removing hits that are local
declarations, aliases or comments, it finds two more latent throws,
both from the 2026-10-01 root import (`6b304d1a2`):

```text
js/potion.js:3312  return sk >= -P_CROSSBOW && sk <= -P_BOW;   (P_BOW not imported)
js/pray.js:2698    await done(ESCAPED);    (also :2709 ESCAPED, :2722 ASCENDED; not imported)
```

- potion.js is_ammo_dip (obj.h is_ammo) is reached from the POT_OIL dip
  arm (`:3552`): an uncursed, unlit potion of oil dipped onto an eroded,
  rust-prone weapon. Any weapon skill ≥ −P_CROSSBOW evaluates `-P_BOW`,
  so the dip throws `ReferenceError: P_BOW is not defined` where C
  prints «… gleams with an oily sheen.» or repairs erosion.
- pray.js offer_real_amulet (the real Amulet offered on a high altar)
  ends the game with `done(ESCAPED)` / `done(ASCENDED)`. Both are
  undefined there, so the ascension or fry-by-god end throws.

Neither is in this SHA's diff, and no corpus session is known to reach
them. They are the same C-wrong family as the Must-fix this commit
closed, and each is a one-line import.

## Density

A one-token fix for a JS throw Must-fix. Must-fixes ship alone, so
the size is right. A family sweep would have been one grep.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify buzzmonst,randomize_gem_colors --base 19281aa6e~1 --no-reach
verify buzzmonst: 0 session(s) blocked on it (vacuous: the board owner was misattributed)
verify randomize_gem_colors: baseline 19281aa6e~1 (scoreboard at fbbb271b4) — 1 session(s) blocked on it
  scen-worldtour-Wizard-53250033: PASS
verify randomize_gem_colors: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

D-log: frozen runner PASS (RNG 25253/25253, Screen 246/246), REACH-OK
×2, green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 713 0
regressed. The misattributed owner (randomize_gem_colors) is the row
that moves. That is consistent with a step-0 js-throw label (see
`verify js-throw label`).

## Actionable C-wrongs

1. js/potion.js is_ammo_dip `:3312` reads `P_BOW`, which is never
   imported from const.js (const.js `:2952`). The POT_OIL weapon-dip arm
   (`:3552`; potion.c dodip oil arm) throws a ReferenceError. Fix: add
   `P_BOW` to the const.js import.
2. js/pray.js offer_real_amulet `:2698`, `:2709`, `:2722` call
   `done(ESCAPED)` / `done(ASCENDED)`, and neither is imported
   (const.js `:526–527`). Offering the Amulet throws instead of ending
   the game (pray.c offer_real_amulet `:1526–1589`). Fix: import both.

Both are debt outside this commit's diff (pre-existing since
`6b304d1a2`), not a C-wrong this commit introduced.

Verdict: **ACCEPT-WITH-DEBT**
