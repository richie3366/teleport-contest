# Review 808 — 27758e2a — hack.c pickup_checks furniture / pool / lava / swallow (D-1838)

## Metadata
- Full / short hash: `27758e2aa91bf40b7c68910b68b4022c83eded68` / `27758e2a`
- Parent: `13150e4c` (D-1837). Map-driven Open: 3 corpus blocks; `,` on empty STAIRS.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 02:32:18 +0200
- D-id: **D-1838**
- Stats: `js/pickup.js` +117/−19. `js/` insertions **117** ≤250. Band **80–350**.
- Claims to close: stairs affixed / furniture nothing-msgs / swallow `-2`. Not leftover WIN_STATUS.
- JS / map: `pickup_checks` / `dopickup`. `c-js-map/turns.md`. Archive **Addressed:** D-1838 `27758e2a`.

## Intent vs deliverable

Git subject promises: empty STAIRS printed generic nothing; C `"The stairs are solidly affixed."`

`node scripts/csym.mjs pickup_checks` → `hack.c:3783–3872`. `--callers`: `hack.c:3883`. `dopickup` `:3875–3892` (`ret==-2` → `loot_mon(u.ustuck, …)`).

The diff **does** the C body and the `-2` arm.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `pickup_checks` | LIVE repaired | swallow / pool / lava / furniture / reach |
| `dopickup` | LIVE repaired | `-2` → `loot_mon` |
| `loot_mon` / `can_reach_floor` | LIVE callees | |
| `dungeon.c` `surface` | OMIT named | default `"floor"`; HOLE/TRAPDOOR live |

`node scripts/sym.mjs`:

```
pickup_checks    NOT EXPORTED — 1 LOCAL pickup.js:1623
dopickup         js/pickup.js:1733   ASYNC
loot_mon         js/pickup.js:3750   ASYNC
can_reach_floor  js/engrave.js:358   sync
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Swallow (`:3792–3804`).** Empty minvent: digest tongue+slimy else don’t feel/see; return 1. Else `-2`. **Match.**

**Pool / lava (`:3806–3826`).** Wwalking/floater/clinger/(Flying&&!Breathless) dive/reach msgs; else underwater / likes_lava. **Match those predicates.**

**Empty floor (`:3827–3846`).** Throne / sink / grave / fountain / open door / altar / STAIRS / `There("is nothing here to pick up.")`. JS `pline('The stairs are solidly affixed.')` ≡ `pline_The`. **Match that order.**

**Reach (`:3848–3870`).** `can_reach_floor(traphere && is_pit)`. Pit bottom / rider / Blind / `surface` with HOLE/TRAPDOOR overrides. **Match;** generic `surface` named as `"floor"`.

**`dopickup` `:3883–3891`.** `>=0` TIME vs OK; `-2` `loot_mon`; else `pickup(-count)`. **Match.**

**Callee closure.** One function. `loot_mon` LIVE. Named `surface` only. No STUB.

## Hallucinations / overclaim

Do **not** stamp `dungeon.c` `surface`. Tourist → `glibr` step 29 is later-owner movement.

## Density

§2b: remaining `pickup_checks` body. +117. Right size.

## Verification

This audit, `js/` at `27758e2a`: `node scripts/hidden-proxy.mjs verify pickup_checks --base 27758e2a~1` → `3 session(s) blocked`. Summary: **`2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`**. Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
