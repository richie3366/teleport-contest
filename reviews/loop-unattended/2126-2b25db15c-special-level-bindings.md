# Review 2126 — 2b25db15c — special-level bindings

SHA `2b25db15c`, D-3166; 2026-09-30; +110 JS lines. No review closure.

## Intent vs deliverable

Subject promises “lspo_message/corridor/random_corridors ports + levregion
splits + 5 region.c #if 0 by-design”. Diff also rewires earth/air/astral
message joins.

## Inventory — lspo_message

New export; coder/error CLONEs; allocation uses GC.

## C ↔ JS fidelity — lspo_message

sp_lev.c:3075–3109: argc guard, coder, string, old-pointer-sensitive newline
append, return match. Numeric-string coercion is explicitly named.

## Inventory — lspo_corridor

New async export; integer/option/table adapters CLONE, create_corridor LIVE.

## C ↔ JS fidelity — lspo_corridor

sp_lev.c:4528–4554 preserves six field reads and awaited corridor; no direct
RNG. Corridor matches :2670–2725 random-wall guard and search/dig order.

## Inventory — lspo_random_corridors

New async export, same coder/corridor closure.

## C ↔ JS fidelity — lspo_random_corridors

sp_lev.c:4557–4574 preserves six -1 fields; inline loader makecorridors path
equivalent. No added RNG.

## Inventory — lspo_teleport_region

Changed l_teleport_region; local l_get_lregion/option adaptations are
CLONEs.

## C ↔ JS fidelity — lspo_teleport_region

sp_lev.c:5442–5460 coder precedes parsing/add; however invalid dir silently
defaults. Numeric boolean 2 silently becomes true where nhlua.c:1078–1104
errors. Clone divergence is C-wrong.

## Inventory — lspo_levregion

Changed l_levregion, same adapters.

## C ↔ JS fidelity — lspo_levregion

sp_lev.c:5471–5494 has identical validation gaps; invalid type falls back.
Named fallback cannot excuse a contradictory clone.

## Inventory / C ↔ JS fidelity — clone_region

No JS; region.c:226–254 excluded by #if 0 :220.

## Inventory / C ↔ JS fidelity — create_force_field

No JS; region.c:1002–1030 excluded at :945.

## Inventory / C ↔ JS fidelity — create_msg_region

No JS; region.c:954–973 excluded at :945.

## Inventory / C ↔ JS fidelity — replace_mon_regions

No JS; region.c:621–632 excluded at :613.

## Inventory / C ↔ JS fidelity — remove_mon_from_regions

No JS; region.c:637–645 excluded at :613. Each callers query finds only
excluded declarations. Binding queries likewise find declarations; Lua
registrations/loaders supply callers. Changed load_* names have no C
definitions; Lua message sequences match.

## Hallucinations / overclaim

“Full” region splits hide validation differences. Helpers resolve via sym;
no deletion/repoint. Diff anti-pattern scan empty; Rule #2 clean.

## Density

Ledger/verdict per function: lspo_message ported/ACCEPT-WITH-DEBT;
lspo_corridor ported/ACCEPT; lspo_random_corridors ported/ACCEPT;
lspo_teleport_region split/QUALITY-RISK; lspo_levregion split/QUALITY-RISK;
clone_region by-design/ACCEPT; create_force_field by-design/ACCEPT;
create_msg_region by-design/ACCEPT; replace_mon_regions by-design/ACCEPT;
remove_mon_from_regions by-design/ACCEPT. Uncompiled dispositions precede
the same-file live cluster. D-log supplies individual Ledger statuses and
grouped Verify with vacuous notes, green/strict/cohort/full.

## Verification

Historical SHA, all ten, `--base 2b25db15c~1 --reach-all`: each function
above has both summaries: `verify: 0 blocked`; `smoke: 24 PASS, 0 regressed
→ REACH-OK`. No movement claimed.

| Function | verify | smoke |
|---|---|---|
| clone_region | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| create_force_field | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| create_msg_region | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| replace_mon_regions | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| remove_mon_from_regions | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| lspo_message | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| lspo_corridor | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| lspo_random_corridors | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| lspo_teleport_region | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| lspo_levregion | 0 blocked | 24 PASS, 0 regressed, REACH-OK |

## Actionable C-wrongs

1. Re-port both region bindings' validation in C order: reject invalid
   dir/type and invalid numeric booleans; preserve padding/name conversion.

Verdict: **QUALITY-RISK**
