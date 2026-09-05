# Review 807 — 13150e4c — pickup.c doloot_core loot-at-feet + lootmon (D-1837)

## Metadata
- Full / short hash: `13150e4c0a856ef1033a43832ec3d4ee36772833` / `13150e4c`
- Parent: `c9b87e23` (D-1836). Map-driven Open: 4 corpus blocks (`o` then `.`/`>` stayed on the door arm).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 02:22:45 +0200
- D-id: **D-1837**
- Stats: `js/pickup.js` +185/−47; `lock.js` +12/−6; `u_init.js` +7. `js/` insertions **204** ≤250. Band **80–350**.
- Claims to close: loot-at-feet + `Loot in what direction?`. Not leftover WIN_STATUS.
- JS / map: `doopen_indir` → `doloot`; `doloot_core` / `loot_mon`. `c-js-map/turns.md`. Archive **Addressed:** D-1837 `13150e4c`.

## Intent vs deliverable

Git subject promises: C `doopen_indir` switches to `#loot` at self/down; JS printed `"You see no door there."`

`node scripts/csym.mjs doloot_core` → `pickup.c:2177–2346`. `doloot` `:2165–2174`. `loot_mon` `:2430–2481`. `doopen_indir` `lock.c:779–923` (`:808–811`). `get_adjacent_loc` `cmd.c:3930–3953`.

The diff **does** that switch, wrap `loot_reset_justpicked`, lootmon `get_adjacent_loc`, saddle + swallowed `pickup`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `doopen_indir` loot-at-feet | LIVE repaired | `:808–811` |
| `doloot` / `doloot_core` | LIVE | wrap + lootcont/lootmon |
| `get_adjacent_loc` | LIVE callee | `getdir` then `u.dx/dy` |
| `loot_mon` | LIVE | saddle yn + `u.uswallow` `pickup` |
| `addinv` `loot_reset_justpicked` | LIVE | |
| Confusion `reverse_loot` / pit prompt / door-mimic / AUTOUNLOCK_FORCE / PICK_ANY invert | OMIT named | |

`node scripts/sym.mjs`:

```
doloot           js/pickup.js:3705   ASYNC
doloot_core      NOT EXPORTED — 1 LOCAL pickup.js:3717
loot_mon         js/pickup.js:3652   ASYNC
doopen_indir     js/lock.js:619   ASYNC
get_adjacent_loc js/lock.js:586   ASYNC
addinv           js/u_init.js:893   ASYNC
```

(HEAD line numbers; `loot_mon` body is `:3750`.) FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**`doopen_indir` `:808–811`.** `u_at && (u.dz > 0 || !closed_door)` → `doloot()`. JS same. Pit reach / mimic named.

**`doloot` `:2170–2173`.** `loot_reset_justpicked` around core; `addinv` clears `pickup_prev` once. **Match.**

**`doloot_core`.** Capacity / nohands. Confusion named. `menu_requested` → lootmon. lootcont: `container_at` / `able_to_loot` / Blind `feel_cockatrice` / grave. lootmon: `get_adjacent_loc("Loot in what direction?", …)` (`:3938–3952` `getdir` + `Never_mind`). `u.dz<0` ceiling. `loot_mon`. Empty `"don't find anything"`. **Match those prompts.** `get_adjacent_loc` is LIVE `getdir`.

**`loot_mon` `:2430–2481`.** Saddle yn (`ynqchars`, default n); nolimbs; cursed stuck; `extract_from_minvent`; verbose take-off; `hold_another_object`; `rnd(3)`. Swallow `pickup(count)`. **Match.**

**Callee closure.** `doloot`/`doopen_indir`/`get_adjacent_loc`/`loot_mon` LIVE. Named OMITs only. No STUB in the loot-at-feet arm.

## Hallucinations / overclaim

Do **not** stamp `reverse_loot`, pit `"Open where? [.>]"`, mimic, AUTOUNLOCK_FORCE, or PICK_ANY invert. `explore-seed0360` → `lookat` step 832 is later-owner movement.

## Density

§2b: loot-at-feet + lootmon, one `doloot_core` family. +204. Right size.

## Verification

This audit, `js/` at `13150e4c`: `node scripts/hidden-proxy.mjs verify doloot_core --base 13150e4c~1` → `4 session(s) blocked`. Summary: **`3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`**. Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
