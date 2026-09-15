# Review 1351 — f285c65c — use_skill may-advance arm + async caller cascade

- SHA: `f285c65c`, D-2385. JS files: 7 (`weapon.js` core + awaits in
  cmd/dokick/hack/spell/steed/uhitm; 61 insertions).
- Prior reviews closed: none (Open queue row `use_skill`; 0 blocks).

## Intent vs deliverable

Subject promises the `give_may_advance_msg` edge in `use_skill` plus
awaiting the whole caller cascade. Diff delivers: async `use_skill`
with the before/after edge, 5 awaited call sites, `exercise_steed` /
`hmon_hitmon_dmg_recalc` async flips, and the spell.js clone deletion →
canonical import. Promise matches diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `use_skill` (weapon.js:1235) | changed, C `weapon.c:1423–1434` | LIVE, now async |
| `use_skill` (spell.js, deleted) | local clone | CLONE retired → canonical import |
| `exercise_steed` (steed.js) | changed (async flip) | LIVE, single caller awaited |
| `hmon_hitmon_dmg_recalc` (uhitm.js) | changed (async flip) | LIVE, single caller awaited |
| `can_advance` (weapon.js:796) | C callee, same-file | LIVE, sync |
| `give_may_advance_msg` (weapon.js:856) | C callee, same-file | LIVE, async, awaited |

Required `sym.mjs` output (deleted symbol): `use_skill →
js/weapon.js:1235 ASYNC` — exactly one canonical export remains; the
spell.js clone is truly gone. `can_advance → js/weapon.js:796 sync`;
`give_may_advance_msg → js/weapon.js:856 ASYNC`. D-log's "`--can` →
SAFE" understates it: re-run shows ALREADY (spell.js statically imports
weapon.js — not even a new edge).

## C ↔ JS fidelity

C locus opened: `use_skill` `:1423–1434` (12 lines) + all 5 call sites
(`dokick.c:122`, `hack.c:2086`, `spell.c:1599`, `steed.c:395`,
`uhitm.c:1498`).

- Body: `P_RESTRICTED(type) ≡ weapon_skills[type].skill ==
  P_ISRESTRICTED` (`skills.h:118`) ≡ JS `ws.skill === P_ISRESTRICTED`
  ✓ exact, not a subset. Guard order equivalent: C short-circuits
  `P_NONE` before indexing; JS returns before lookup (plus a `!ws`
  guard for slot-less saves — robustness superset, no behavior change
  when the slot exists). `advance_before` → `+= degree|0` → `!before &&
  can_advance` → message ✓ C order; no RNG either side.
- Caller parity 5 C = 5 JS, every site awaited — verified by my own
  grep, not taken from the commit message: dokick kickdmg `:917`, hack
  web-cut `:2238`, spell spelleffects `:2451`, steed riding `:442`,
  uhitm recalc `:887`. No un-awaited stragglers anywhere in `js/`.
- `exercise_steed` single caller `cmd.js:3581` awaited ✓;
  `hmon_hitmon_dmg_recalc` single caller `hmon` awaited ✓ (both
  confirmed single by grep).
- Callee closure: all LIVE; no STUB in any live arm. Named deferrals
  (`lose_weapon_skill`/`drain_weapon_skill` arms, PROJECTILE swap,
  TIP_GETPOS) stay in turns.md with citations.

## Hallucinations / overclaim

None. The /tmp threshold probe (79→80 fires, 10→11 silent, 80→81
silent, P_NONE/restricted no-ops) is supplement. No corpus PASS
claimed.

## Density

One 12-line C function + its caller envelope across 7 files but one
semantic cluster — the §2b caller/callee-cluster shape. Right-sized.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed` → clean.
- Re-measured: `verify use_skill --base f285c65c~1` → 0 blocked at
  baseline and working. Matches; no WORSE/relocation.
- Green 2/2 + strict ×2 + cohort 7/7 + full 44/44 per D-log accepted
  (shared files changed; this review re-ran the corpus half).
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
