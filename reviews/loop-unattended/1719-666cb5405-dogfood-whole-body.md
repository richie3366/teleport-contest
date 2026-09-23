# Review 1719 — 666cb5405 — dogfood whole-body restart (D-2760)

- SHA: `666cb5405` (`dog.c` dogfood: whole-body restart, D-2760)
- Files: `js/dogmove.js` (+178)
- D-log: D-2760; queue row: Open (`dogfood` PARTIAL), 0 corpus blocks
- Banned grep: 0 hits

## Intent vs deliverable

Subject promises the whole 142-line classifier. Diff restarts `dogfood`
in C order with all listed arms. Promise kept.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `dogfood` (export, restarted) | C body | `dog.c:993–1134` (csym range) |

New imports only (no new helpers): `peek_at_iced_corpse_age`,
`is_organic/metallic/rustprone`, `find_pmmonst`, `resists_poison`,
`polyfood`, `SILVER`, predicate batch from monsters.js. `sym.mjs`: all
live single exports. No deleted symbols.

## C ↔ JS fidelity

Walked arm-by-arm: opoisoned+`resists_poison` head (C macro =
`Resists_Elem(mon, POISON_RES)`; JS `mon_resists_bit(mon, MR_POISON)`
is RNG-free and sane — old code missed the gate); quest-arti/
obj_resists short-circuit with the rn2 in C-order position;
fx/fptr via LOW_PM/NUMMONS bounds with null = NUMMONS entry (verified
null-safe: is_rider/flesh_petrifies via touch_petrifies/vegan/acidic/
poisonous/same_race all return false on null, matching C's "predicates
fail" contract); rider TABU; petrify POISON; royal-jelly via live
`find_pmmonst(PM_QUEEN_BEE)`; `!carni&&!herbi` → cursed?UNDEF:APPORT;
starving (`mtame && !isminion && edog.mhpmax_penalty`); mblind
(`!mcansee && haseyes`); ghoul CORPSE/EGG/TABU with iced age,
lizard/lichen exempt, `stale_egg` inlined exactly
(`moves−age > 2·200`, `obj.h:315–317` verified); inner switch
(meats, pyrolisk-egg `likes_fire`, CORPSE iced/acid/poison with newly
wired `resists_acid/poison`, polyfood `mtame>1`, vegan, cannibalism
with kobold/orc/ogre + undead + elf gates, slime-glob, garlic,
metallivore TIN, APPLE, mblind CARROT, yeti BANANA,
starving/SLIME_MOLD default); non-food default: (strangulation/
slow-digestion, silver via `game.objects` oc_material with SILVER=14
verified both sides, gelcube-organic, metallivore with rust-monster
rustprone gate + oerodeproof preference, uncursed non-ball/chain
APPORT) with ROCK_CLASS skipping to UNDEF — the JS guard structure is
exactly C's switch/FALLTHROUGH. `mptr==&mons[PM_X]` via the file's
`mndx` idiom (wrappers carry mndx). Callers unchanged, signature
unchanged. No new RNG; the one rn2 (`obj_resists`) sits where C puts it.

Nit (not a C-wrong, not queued): file-local `MAX_EGG_HATCH_TIME = 200`
dupes the identical `const.js:1363` export. Value-identical, zero
behavioral risk — fold into any future touch of this file.

## Hallucinations / overclaim

None. "None new" named-omits claim holds — every callee verified live
or macro-inlined with the header cited.

## Density

178 insertions for a 142-line C body: right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify dogfood --base 666cb5405~1 --reach-all`
→ 0 blocked, smoke 24/24 REACH-OK. Matches the bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
