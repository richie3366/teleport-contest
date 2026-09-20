# Review 1573 — 1ac018aa — mcastu.c mcast_spell dispatcher C-exact args (D-2614)

**Metadata:** SHA `1ac018aa`, `mcastu.c` `mcast_spell` + 5 callees, D-2614.
JS: `js/mcastu.js` (+53/−37 net: 5 dispatcher arms + 5 callee signatures +
`se_bolt_of_lightning` import binding).

## Intent vs deliverable

Subject promises: dispatcher passes C call shapes in 5 of 20 arms;
FIRE_PILLAR/LIGHTNING gain floor effects; LIGHTNING gains its sound.
Diff actually adds: the 5 re-shaped dispatcher arms, callee params taken
and overwritten per C, geyser pline moved inside the callee (now async),
two `mon_spell_hits_spot` wirings, one `Soundeffect` line. Promise
matches deliverable.

## Inventory

- `mcast_spell(mtmp, dmg, spellnum)` — 5 arms re-shaped; other 15 untouched.
- `mcast_weaken_you(mtmp, dmg)` / `mcast_stun_you(dmg)` /
  `mcast_geyser(dmg)` / `mcast_fire_pillar(mtmp, dmg)` /
  `mcast_lightning(mtmp, dmg)` — params taken, overwritten per C.
- No deleted symbol, no local→import re-point (nothing to `sym.mjs`).

## C ↔ JS fidelity

C loci: dispatcher `mcastu.c:800–897` (via `csym.mjs mcast_spell`),
callees `:466–487` (weaken), `:504–520` (stun), `:523–537` (geyser),
`:540–563` (fire_pillar), `:566–599` (lightning) — all five bodies read
here. Arm-by-arm confirm:

- Dispatcher shapes now match C exactly: `mcast_weaken_you(mtmp, dmg)`
  (`:42`), `mcast_stun_you(dmg)` (`:50`), `dmg = mcast_geyser(dmg)`
  (`:64`), `dmg = mcast_fire_pillar(mtmp, dmg)` (`:67`), `dmg =
  mcast_lightning(mtmp, dmg)` (`:70`). Previously all five dropped an arg.
- weaken: C overwrites incoming `dmg = mtmp->m_lev - 6`, floors at 1,
  halves — JS identical (`dmg = (mtmp.m_lev|0) - 6`, same clamp/halve).
  The now-dead incoming param mirrors C (C's param is likewise pure
  incoming, always overwritten) — not a smell.
- stun: C `dmg = d(ACURR(A_DEX) < 12 ? 6 : 4, 4)` + halve + `make_stunned`
  — JS identical, RNG call-for-call.
- geyser: C prints the pline **inside** the callee (`:528`) then
  `dmg = d(8,6)` + halve, with the water-damage `#if 0`'d out — JS now
  does exactly this (async only for the pline); the `#if 0` omission is
  per-C, correctly omitted rather than named.
- fire_pillar: C order pline → `d(8,6)` → Fire_resistance → halve →
  `burn_away_slime` → `burnarmor` → `destroy_items(AD_FIRE, orig_dmg)` →
  `ignite_items` → `mon_spell_hits_spot(mtmp, AD_FIRE, u.ux, u.uy)` —
  JS identical including the new floor-effects line in C position.
- lightning: C `Soundeffect(se_bolt_of_lightning, 80)` **first**, then
  pline → ureflects → `d(8,6)` → resist → halve → `destroy_items(AD_ELEC)`
  → `mon_spell_hits_spot(AD_ELEC)` → `flashburn(rnd(100))` — JS identical
  including sound-first order; `se_bolt_of_lightning` is live
  (`js/generated/seffects_data.js:23`), binding added to the existing
  import (no new module edge).

Callee closure: `mon_spell_hits_spot` LIVE async (`sym.mjs`:
`js/zap.js:6897 ASYNC`, both call sites awaited ✓); `Soundeffect` live
(sync sound call, pre-imported); every other callee in the five arms
(`losestr`, `make_stunned`, `burn_away_slime`, `burnarmor`,
`destroy_items`, `ignite_items`, `ureflects`, `flashburn`) pre-existing
live, untouched. Named omits with C citations: `has_aggravatables`
(chooser-only), geyser `#if 0` water-damage, `uhitm.c:3863`
`touch_of_death` caller. No STUB in a live arm.

## Hallucinations / overclaim

"Dispatcher dropped C call shapes in 5 of 20 arms" — verified against the
C arm list (all 20 cases present in both; exactly these five shapes
differed). No dispatch/stub split: every newly-passed arg is consumed by
a live callee. "No new module edge" accurate (binding-only import edit).

## Density

One dispatcher + its five callees, one JS module. Right-sized tight
caller/callee cluster per §2b.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: zero hits for seeds/`fastforward`/`getRngLog`/`FORCE`/`DIAG`
  anywhere in the `js/` hunks.
- Re-measured: `hidden-proxy.mjs verify mcast_spell --base 1ac018aa~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed as a coverage row) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited; matches D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
