# Review 2489 — 9439e5972 — potion fatal-losehp drains (D-3608)

- SHA: `9439e5972b4433bf0afa3307373933edc2dcc65c`
- Subject: cliffs-head peffect_water: fatal quaff never drained done()
  (Priest-94282 → PASS) (D-3608)
- Type: cliff (7 C functions, one file), js +95 in `js/potion.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: 9 oil-pattern drains at fatal losehp sites + a dopotion tail bail;
Priest-94282 → PASS. Diff actually adds 10 hunks in `js/potion.js`: drains in
peffect_sickness ×3, peffect_levitation, peffect_water ×2, peffect_acid,
dip_potion_explosion, potionhit ×2, and the dopotion `if (gameover) return 1`
bail. "9 drains" counts JS drain sites (C :994/:997 share one — see below).
No new imports. Promise matches deliverable.

## Inventory

All changed (drain insertions only, no new functions, no deleted symbols):

- `peffect_sickness` — C potion.c:971, :994, :997, :1001
- `peffect_levitation` — C potion.c:1204
- `peffect_water` — C potion.c:738, :759
- `peffect_acid` — C potion.c:1309
- `dip_potion_explosion` — C potion.c:2433
- `potionhit` — C potion.c:1638, :1702
- `dopotion` tail bail — C potion.c dopotion :618–641

Every cited C line verified by direct read: all 11 `losehp(` sites exist at
the cited lines. The one other potion.c losehp (:1277) sits in peffect_oil,
the pre-existing drained precedent (js :403–413) — no site missed.

## C ↔ JS fidelity

C `losehp` (hack.c:4279–4291, read directly): polymorph branch returns early;
else `uhp -= n`; `uhp < 1` → `urgent_pline("You die...")` + `done(DIED)`
noreturn; survival with `n > 0 && uhp*10 < uhpmax` → `maybe_wail()`. The JS
idiom placed immediately after every losehp call mirrors this exactly:

```js
if (game._losehp_needs_done) {
    await finish_losehp_done();
    if (game.program_state?.gameover) return;
} else {
    await finish_maybe_wail();
}
```

Death → drain done(), never continue (C noreturn); lifesave clears gameover
inside done() → execution continues in C order (empirically confirmed by
D-3610's lifesave probe); survival → wail check before trailing statements,
matching C's in-losehp wail order (before the trailing `exercise` calls at
the sickness/acid sites). `finish_losehp_done` (js/end.js:1898, async) and
`finish_maybe_wail` (js/hack.js:1997, async) are both live imports, awaited.
C :994/:997 (fromsink if/else, identical damage) are one JS call with a
ternary format — RNG-identical, one drain correct. dopotion bail: C's tail
(:625–641 potion_nothing/trycall/useup) runs only when peffects returns; a
fatal losehp never returns, so `if (gameover) return 1` (= ECMD_TIME analogue)
is the faithful adapter. No RNG drawn by the drains themselves.

Cheat grep: no FORCE/DIAG/getRngLog/seed/fastforward/coords in js/ hunks.
Rule #2: `imports.mjs --rulecheck` → clean (run this iteration).

## Hallucinations / overclaim

None. "Both finishers already imported" true (js :158/:190). The dothrow
post-potionhit bail is correctly scoped as a Next item (another file's
caller), not hidden. The `mswings_verb → PASS` stale-head note is labeled as
such.

## Density

Cliff phase: one cliff (peffect_water owns the probe), same-file family of
the identical silent-gameover shape — legitimate companions, not another C
file's work. Movement on the probe session, not an arm-only sale (drains are
adapters at noreturn positions; bodies were whole). Per-function verdicts:
all 7 ACCEPT.

## Verification

Re-measured myself, one call, baseline parent:
`verify peffect_water,…(7 fns) --base 9439e5972~1 --reach-all` →
peffect_water: Priest-94282 PASS, `1 PASS → PROGRESS`, reach 3/3;
sickness/levitation/acid/dip/potionhit/dopotion vacuous at baseline (0
blocked) with reaches 7/7, 4/4, smoke 24/24, 1/1, 17/17, smoke 24/24 — every
count identical to the D-log bullet. 0 regressed anywhere. Not a vacuous-PASS
claim: the D-log says PROGRESS only for peffect_water and prints the vacuous
notes for the rest.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
