# Review 191 — 0ddfb189 — hack.c `impact_disturbs_zombies` (D-1229)

## Metadata
- Full / short hash: `0ddfb189d125a5b4628d0fa4754d6fee9aec753b` / `0ddfb189`
- Parent: `23f3f19e` (D-1228). This file audits **this SHA only**. Archive row **Addressed:** D-1229 lacked the short hash; this review commit fills `0ddfb189`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 21:18:58 +0200
- D-id: **D-1229**
- Stats: 12 files, +138 / −35 — `js/hack.js` +31 / −4; `js/do.js` +8 / −2; `js/dothrow.js` +12 / −2; `js/dokick.js` +8 / −4.
- Claims to close: Open `hack.c` `impact_disturbs_zombies` (named from D-1214 / review **176**). Not hideunder. `reviews/loop-2026-08-15/` has no unpaid impact Must-fix.
- JS / map: `hack.js` body + `is_flimsy`; callers `dropz` / throwit `!IS_SOFT` / two kick place sites. `c-js-map/turns.md`. container_impact / hitfloor `dropz(TRUE)` still named.
- Prior reviews this SHA claims to close: **176** named omit item (`:1787–1794`).

## Intent vs deliverable

Git subject promises: “Match C hack.c impact_disturbs_zombies so a heavy non-flimsy drop, throw, or kick shrinks nearby buried ZOMBIFY_MON remaining, instead of leaving the timer untouched.”

D-1214 already walks `buriedobjlist` and shrinks remaining `max(1,t*2/3)`. C also gates **drops/throws/kicks** through `impact_disturbs_zombies` (`hack.c:1787–1794`): skip if `owt < (violent ? 10U : 100U) || is_flimsy`; else `disturb_buried_zombies(obj->ox, obj->oy)` **after** `place_object`. Callers: `do.c:832` `dropz(obj, with_impact)`; `dothrow.c:1831` throwit land `!IS_SOFT` TRUE; `dokick.c:642` obstructed-loose TRUE and `:786` kick land TRUE.

Old JS `dropz` ignored `_with_impact`; throw/kick comments skipped the call. The diff **does** the C body and those four sites. It does **not** pull `container_impact_dmg` at the same sites, hitfloor `dropz(TRUE)` (JS `mkobj.js` still `dropy`), or hideunder after tread. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `impact_disturbs_zombies` | C callee `:1787–1794`, **new** | |
| `is_flimsy` | C `obj.h:418–420` macro, **clone** | `oc_material <= LEATHER` or rubber hose |
| `LEATHER` | C `objclass.h` = 7 | local `const LEATHER = 7` |
| `RUBBER_HOSE` | generated otyp | `objectNames` index 78 |
| `disturb_buried_zombies` | C callee, **already live** | D-1214 |
| `dropz(…, with_impact)` | C `:832`, **wired** | was ignored `_with_impact` |
| throwit `!IS_SOFT` | C `:1828–1831`, **wired** | TRUE |
| kick obstructed-loose | C `:640–642`, **wired** | TRUE at `u.ux,u.uy` |
| kick land | C `:785–786`, **wired** | TRUE at `bx,by` |
| `container_impact_dmg` | C sibling, **named omit** | same sites |
| hitfloor `dropz(TRUE)` | C, **named omit** | JS still `dropy` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (integer remaining already in D-1214).

Grep of this SHA’s `js/` hunks: `LEATHER = 7` is `objclass.h`, not a map cell. `violent ? 10 : 100` is C `10U`/`100U`.

## C ↔ JS fidelity

Pinned C (`hack.c:1787–1794` + `obj.h:418–420`):

```
void impact_disturbs_zombies(struct obj *obj, boolean violent)
{
    if (obj->owt < (violent ? 10U : 100U) || is_flimsy(obj))
        return;
    disturb_buried_zombies(obj->ox, obj->oy);
}
#define is_flimsy(otmp) \
    (objects[(otmp)->otyp].oc_material <= LEATHER || (otmp)->otyp == RUBBER_HOSE)
```

JS (`hack.js:382–398`): `(obj.owt | 0) < (violent ? 10 : 100) || is_flimsy`; then disturb `ox,oy`. Unsigned C vs JS `|0`: public owt is small positive; missing owt → 0 → skip (too light). `is_flimsy`: `game.objects[otyp].oc_material ?? 99` so unknown otyp is **not** flimsy (C always has `objects[]`). Rubber hose otyp 78. **Callee `disturb_buried_zombies` is live.** Not a stub that no-ops the timer walk.

Pinned C `dropz` (`do.c:816–832`):

```
    if (u.uswallow) { … engulfer … }
    else {
        if (flooreffects(obj, u.ux, u.uy, "drop")) return;
        place_object(obj, u.ux, u.uy);
        if (with_impact) container_impact_dmg(obj, u.ux, u.uy);
        impact_disturbs_zombies(obj, with_impact);
```

JS (`do.js:2043–2054`): swallow return (C impact is in the `!uswallow` else; engulfer inventory still named); `flooreffects` return before place; `place_object`; skip `container_impact_dmg` when `with_impact` (named); impact `!!with_impact`. `dropy` → `dropz(obj, false)` ≡ C `:800–802`. Gentle chest owt<100 skips; rock ≥100 disturbs. Match. Throwit C `:1828–1831` pairs container (hero `u.ux,u.uy`) with impact (obj ox,oy after place). JS only the second. Named.

Throwit: after `place_object(obj, x, y)`, `!IS_SOFT(land.typ)` → impact TRUE. C same on `gb.bhitpos` after place; JS `x,y` is that land cell. `IS_SOFT` already imported. `container_impact_dmg(obj, u.ux, u.uy)` still named (C comment: impact coords are throw origin for the container helper, **ox,oy** for zombies).

C kick land (`dokick.c:771–788`): `flooreffects` at `gb.bhitpos` can consume; else costly bill/refund; `place_object` at bhitpos; impact TRUE; `stackobj`; `newsym(obj->ox, obj->oy)`. JS `bx,by` is that land cell. Obstructed-loose (`:640–644`) places at **hero** `u.ux,u.uy` (object came loose onto the hero’s cell, not the kick dest). JS same. Box THUD `container_impact_dmg` at `:655` is a **different** C call (not `impact_disturbs_zombies`) and was already live — this SHA did not double it.

C has **no** other `impact_disturbs_zombies` callers (`extern.h` + grep). Did not invent moverock impact (rumble is D-1214 `disturb` directly).

## Hallucinations / overclaim

Subject + D-1229 say heavy non-flimsy drop/throw/kick shrink nearby buried ZOMBIFY remaining. **Body + four callers + live D-1214 walk are the hunk.** Stamping **Addressed:** D-1229 is fair. Do **not** stamp “Match C `container_impact_dmg`” or “Match C hitfloor `dropz(TRUE)`.” Swallow still leaves the object free (pre-existing named engulfer omit); C also skips impact when swallowed.

## Density

C function + the drop/throw/kick sites C actually calls. ~31 + 8 + 12 + 8 JS lines. Right size. Did not glue hideunder or hitfloor.

## Branch-by-branch confirm

1. Violent owt 9 / flimsy leather / rubber hose: skip. Match.
2. Violent owt 10 non-flimsy: disturb 3×3. Match `< 10` not `<=`.
3. Gentle (`with_impact` false) owt 99: skip; 100: disturb. Match `< 100`.
4. `dropy`: false → gentle. Match.
5. Throw onto `IS_SOFT`: no impact (C). Match.
6. Throw onto hard: TRUE after place so `ox,oy` are land. Match.
7. Kick loose onto feet: TRUE. Match.
8. Kick land `flooreffects` eats object: no impact. Match.
9. Swallow `dropz`: return before place. Match C `!uswallow` else.
10. Dart owt typically <10 violent: skip (canary). Match.
11. Pair remaining 9→6 / 15→10 is D-1214 integer `t*2/3` (not this SHA’s RNG).
12. hitfloor still `dropy` (gentle / no violent impact). **Named.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Hardcoded 10/100/7 are C constants.

## Verification

Journal: private canary **21**/21 (owt 10/9 violent; 100/99 gentle; dart; leather/hose; long sword violent vs gentle; remaining 1→1; 3×3; pair 9→6 / 15→10; dropz false chest/rock; dropz true rock/dart); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a ≥10 (throw/kick) or ≥100 (drop) non-flimsy object lands on hard terrain over a buried ZOMBIFY corpse. Admit that. Cadence this audit: **44**/44 including seed0383.

## Actionable C-wrongs

None for Must-fix. Timer walk is D-1214; this SHA only adds C’s owt/flimsy gate and callers.

Named omits (map, not Must-fix):

1. `container_impact_dmg` at dropz/throwit/kick (already named)
2. hitfloor `dropz(TRUE)` — JS `dropy` in `mkobj.js`
3. hideunder after tread — already named from D-1214
4. local `wake_nearby` clones

Do not Must-fix “peel RANGE_LEVEL timers.” Do not skip the owt gate on a later peel.

## Callers / RNG ledger

C callers: `dropz`, throwit `!IS_SOFT`, two `dokick` place sites. JS same four. No `rn2` here. Public fortress is not evidence a buried zombie woke — the C walk + canary is.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: drop/throw/kick now run C’s owt/flimsy impact gate into live `disturb_buried_zombies`; container_impact and hitfloor `dropz(TRUE)` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1229 `0ddfb189`.
