# Review 74 — c67f09d1 — `dipsink` + dodip sink yn (D-1113)

## Metadata
- Full / short hash: `c67f09d193e56b9b6b4f98b6095f6ea946db7cbf` / `c67f09d1`
- Parent: `723ac2b9` (review **70–73**). This file audits **this SHA only**. Archive row **Addressed:** D-1113 `c67f09d1` was filled by D-1114 (chicken-egg on the fix SHA).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 23:05:41 +0200
- D-id: **D-1113**
- Stats: 11 files, +326 / −56 — `js/fountain.js` +231 / −12 (`dipsink`, local `polymorph_sink`, Blind/Deaf/Inhell, `dipsink_set_levltyp`); `js/potion.js` +25 / −3 (dodip sink yn).
- Claims to close: Open queue `fountain.c` `dipsink` (named). Not wash_hands. Review **69** named omit 1; review **73** said next port pops this. `reviews/loop-2026-08-15/` has no open dipsink Must-fix.
- JS / map: `fountain.js` `dipsink` / `polymorph_sink`. `potion.js` `dodip`. `c-js-map/data.md` fountain row. Pool dip / `drink_ok_extra` / full `set_levltyp` still named.
- Prior reviews this SHA claims to close: **69** item 1 (`dipsink` hands/`uarmg` → `wash_hands(); return`).

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipsink so #dip on a sink runs the lottery, wash, and potion pour instead of cancelling.”

Old JS `dodip` treated `at_sink || at_pool` as `ECMD_CANCEL`. C `potion.c:2325–2334` asks yn then `dipsink`: `!rn2(25/15)` `breaksink`, hands/`uarmg` `wash_hands`, non-potion tap+`water_damage`, potion pour + otyp switch (`polymorph_sink`, oil/acid/lev/detect, `potionbreathe`, `trycall`/`useup`).

The diff **does** that function and wires the sink yn like the fountain arm. It does **not** port pool dip (`potion.c:2335–2361`) or `drink_ok_extra++` then potion getobj after `'n'`. Named. It does **not** pull dipfountain uncurse 17–20 / case 29 (next SHAs).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dodip` sink yn | C caller, **new** | `potion.c:2325–2334` |
| `dipsink` | C body, **new** | `fountain.c:716–801` |
| lottery `breaksink` | C callee, **imported** | same file; drinksink D-0434 |
| `wash_hands` | C callee, **imported** | D-1108 |
| `fingers_or_gloves` / `wash_Glib` | C helper, **local** | D-1108 clones |
| `water_damage` | C callee, **imported** | pre-existing |
| `polymorph_sink` | C callee, **clone** | `do.c:404–455`; local (do.js cycle) |
| `dipsink_set_levltyp` | C `set_levltyp`, **analog** | nfountains/nsinks only; ice/CAN_OVERWRITE named |
| `sink_backs_up` | C callee, **imported** | same file; pre-existing |
| `potionbreathe` | C callee, **imported** | `potion.js`; trycall-when-`!kn` named |
| `trycall` | C callee, **imported** | `do_name.js` |
| `useup` | C callee, **imported** | `eat.js` |
| `make_grave` | C callee, **imported** | `engrave.js` |
| `Blind` / `Deaf` / `Inhell` | C macros, **clones** | see fidelity |
| `Align2amask` / `AM_NONE` | C macro, **imported** | `const.js` ≡ `align.h:50–53` |
| `an` / `the` / `xname` | C callee, **imported** | `objnam.js` |
| pool dip / `drink_ok_extra` | C caller, **named omit** | `potion.c:2334–2361` / `:2365–2371` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Dynamic `import('./potion.js')` is an in-process ESM cycle break, not filesystem. **New RNG:** lottery `rn2(25)` or `rn2(15)` (looted `S_LRING` chooses the bound first, then `rn2` — clang LTR matches); poly `rn2(4)` then altar `rn2(3)-1` and maybe Inhell `rn2(3)`; `breaksink` / `wash_hands` / `water_damage` / `potionbreathe` / `make_grave` epitaph keep their own calls.

## Constitution / playbook

Grep of the `js/fountain.js` + `js/potion.js` hunks: no trace-index gates. Contest Rule #2: no Node builtins. Input still at `nhgetch` / `yn_function`. `wash_hands` already awaited.

## C ↔ JS fidelity

### dodip sink envelope

C `potion.c:2310–2334`: `!menu_requested`; `!can_reach_floor(FALSE)` skips floor prompts; else fountain else **sink** else pool. Sink: yn `"Dip … into the sink?"`; `'y'` → `pickup_prev=0` (unless hands) + `dipsink` + `ECMD_TIME`; `'n'` → `++drink_ok_extra` and fall through to potion getobj.

JS `potion.js:1095–1116`: Levitation stands in for `can_reach_floor` (named). Sink yn + `pickup_prev` + `dipsink` + `ECMD_TIME` match. `'n'` still **cancels** (`Never mind` later). Named `drink_ok_extra`, not a hole inside `dipsink`. Pool still cancels. Named.

### dipsink lottery / hands / tap

C `fountain.c:716–737`:

```
not_looted_yet = (looted & S_LRING) == 0
is_hands = obj == &hands_obj || (uarmg && obj == uarmg)
if (!rn2(not_looted_yet ? 25 : 15)) {
    breaksink(...);
    if (Glib && is_hands) Your("%s are still slippery.", fingers_or_gloves(TRUE));
    return;
} else if (is_hands) { wash_hands(); return; }
else if (obj->oclass != POTION_CLASS) {
    You("hold %s under the tap.", the(xname(obj)));
    if (water_damage(obj, 0, TRUE) == ER_NOTHING) pline1(nothing_seems_to_happen);
    return;
}
```

JS `1098–1123`: same `S_LRING` bound, same `is_hands` identity (worn gloves only), same `!rn2` then `breaksink`, `wash_Glib()` ≡ C `Glib` (uprops intrinsic / leftover flats — D-1108), same wash return, same tap+`ER_NOTHING`. Match. `wash_hands` is the real D-1108 function, not a stub.

### potion pour + otyp switch

C `739–800`: `"one of "` iff `quan > 1`; then switch. JS `1125–1183`: same string and switch order.

| otyp | C | JS after |
|------|---|---------|
| `POT_POLYMORPH` | `polymorph_sink`; `try_call` | **same** |
| `POT_OIL` | oily film + `try_call` if `!Blind`; else nothing | **same** |
| `POT_ACID` | `try_call`; `!Blind` drain; else `!Deaf` `You_hear`; else nothing and clear `try_call` | **same** |
| `POT_LEVITATION` | `sink_backs_up`; `try_call` | **same** (imported) |
| `POT_OBJECT_DETECTION` | sense ring if `!(looted & S_LRING)` else FALLTHRU | **same** |
| gain level/energy, monster detect, fruit juice, **water** | nothing | **same** (`POT_WATER` is imported, not an unbound `case`) |
| default | vapor; `potionbreathe` if `!breathless \|\| haseyes` | **same**; dynamic import |

Then `if (try_call && obj->dknown) trycall(obj); useup(obj);`. JS same order. Default does **not** set `try_call` (C `potionbreathe` does its own `makeknown`/`trycall`; JS `potionbreathe` still defers trycall when `!kn` — named, pre-existing, not this switch).

This is **not** “Match C dispatch, callee is a stub.” `breaksink`, `wash_hands`, `sink_backs_up`, `trycall`, `useup`, `potionbreathe` are real. `polymorph_sink` is a local clone of `do.c:404–455`.

### polymorph_sink

C `do.c:410–454`: abort if typ ≠ `SINK`; `sinklooted = looted != 0`; `flags = 0` (C `looted` **is** `flags` — `rm.h:218`); `rn2(4)`: fountain (`set_levltyp` FOUNTAIN, `blessedftn=0`, maybe `SET_FOUNTAIN_LOOTED`) / throne (`T_LOOTED`) / altar (`algn = rn2(3)-1`; `Inhell && rn2(3)` → `AM_NONE` else `Align2amask`) / ROOM then `make_grave(..., NULL)` and if GRAVE use `S_grave`. Message even if Blind: `an(defsyms[sym].explanation)` or vanish. `newsym`.

JS `1048–1089`: zeros **both** `flags` and `looted` (the C single-field analog). `rn2(4)` arms match. PCHAR explanations are `"fountain"` / `"throne"` (`defsym.h` PCHAR2 extra `"opulent throne"` is **not** used — C `defsyms[sym].explanation` is the first string) / `"altar"` / `"floor of a room"` / `"grave"`. `an(expl)` matches `an(defsyms[…].explanation)`. `make_grave` is the real `engrave.js` function (`engrave.c:1687–1702` gate ROOM/GRAVE + `!t_at`; epitaph pad 60 ≡ C `MD_PAD_RUMORS`). C `make_grave` goes through `set_levltyp(GRAVE)`; JS sets `typ` directly — pre-existing analog, not a no-op. If a trap blocks the grave, both leave ROOM and print vanish.

`dipsink_set_levltyp`: incremental `nfountains`/`nsinks` when fountain/sink-ness changes. C `set_levltyp` also ice timers / `CAN_OVERWRITE` / full `count_level_features`. Named. Sink→fountain/throne/altar/room does not need ice; counts are the part this peel needs. Same analog D-1107 used for Excalibur `ROOM`.

`Inhell()`: C `dungeon.c:1942–1945` is `dungeons[lev->dnum].flags.hellish`. JS `dnum === GEHENNOM` (const 5). Other JS (`teleport.js`, `do.js`, `trap.js`) already use the hellish flag. On this port’s dungeon table Gehennom is dnum 5 **and** hellish, so the altar `rn2(3)` AM_NONE arm fires in Gehennom. The predicate is still the weaker proxy. Named clone, not a dead default arm.

`Blind()` ORs `uroleplay.blind` before `(H\|\|E)&&!B`. C `youprop.h:103` is only `(H\|\|E)&&!B` (`uroleplay.blind` lives in `HBlinded`). Diverges only with `BBlinded` (Eyes). Repo-wide clone (invent.js same). Not this switch’s dispatch.

`Deaf()` extra `u.Deaf` vs C `H\|\|E\|\|uroleplay.deaf`. Leftover flat. Acid hear-arm.

## Hallucinations / overclaim

“Match C so #dip on a sink runs the lottery, wash, and potion pour instead of cancelling” is **true for the yn `'y'` path, the 25/15 lottery, hands wash, tap, and the potion otyp switch including water/poly/oil/acid/lev/detect/vapor.** It is **not** true that `'n'` continues to potion getobj, that pool dip runs, or that `set_levltyp` ice/CAN_OVERWRITE shipped.

This is **not** “Match C dispatch, callee is a stub.” Stamping **Addressed:** D-1113 is fair for the Open `dipsink` line. Hash `c67f09d1` is on the archive row (filled by D-1114).

## Density (§2b)

One Open cluster: C `dipsink` + the dodip sink yn that is the only caller + the `polymorph_sink` callee that switch names. ~230 fountain + 25 potion. Upper band, one family. Did not pull pool dip / uncurse 17–20 / case 29 / `gush` `minliquid` (queue said not wash_hands, and those are other functions).

## Verification

Journal: private canary **60**/60 (lottery 25/15; Glib still-slippery; hands/uarmg wash; non-potion tap; quan one-of; oil/acid Blind/Deaf; lev `sink_backs_up`; detect S_LRING; poly four dest + hell AM_NONE; BBlinded; default vapor); green+strict seed8000/0900; cohort **17**/17 including 0014/0360/4500/0030 + strict 0014/0360/4500/2200/0004/0030/0009/0367. Path **public-unhit**. Cadence fortress is not a sink-dip proof.

C read of `fountain.c:716–801`, `do.c:404–455`, `potion.c:2267–2371`, `youprop.h:103/125`, `dungeon.c:1942–1945`, `align.h:50–53`, `defsym.h:112–134`, `rm.h:218`, `engrave.c:1687–1702`; JS `fountain.js:988–1184`, `potion.js:1056–1126` / `1142–1224`, `engrave.js:163–174`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| #dip sink `'y'` | `dipsink` | **same** |
| unlooted lottery `!rn2(25)` | `breaksink` | **same** |
| looted lottery `!rn2(15)` | `breaksink` | **same** |
| Glib hands after break | still-slippery | **same** |
| hands / worn `uarmg` | `wash_hands`; return | **same** |
| non-potion | tap + `water_damage` | **same** |
| poly `rn2(4)` four dest | fountain/throne/altar/grave-or-vanish | **same** |
| water potion | nothing | **same** |
| default vapor | `potionbreathe` if breath/eyes | **same** (trycall-`!kn` named) |
| #dip sink `'n'` | potion getobj | **still named cancel** |
| pool dip | `wash_hands` / `water_damage` | **still named** |

## Actionable C-wrongs

None that Must-fix this next iter. The body matches `fountain.c:716–801` and the dodip `'y'` arm matches `:2325–2332`.

Named omits / do-nots (map / Open, not Must-fix):

1. potion.c pool/moat dip hands/gloves (`potion.c:2347–2350`). Already Open.
2. `drink_ok_extra++` then potion getobj after sink `'n'` (`potion.c:2334` / `:2365–2371`).
3. Full `set_levltyp` ice/`CAN_OVERWRITE`/`count_level_features`. Analog is fountain/sink counts.
4. `potionbreathe` trycall when `dknown && !kn` (`potion.c:1219–1222` JS comment).
5. `Inhell` via dungeon `hellish` flag, not `dnum === GEHENNOM` (`dungeon.c:1942–1945`). Proxy matches Gehennom here.
6. Do not restore sink `ECMD_CANCEL`. Do not skip `wash_hands` on hands/`uarmg`. Do not drop `POT_WATER` from the nothing group. Do not pull uncurse 17–20 / case 29 / `gush` `minliquid` into this SHA — those are later Open rows (**Addressed:** D-1114 `e30a51f2`, D-1115 `79438232`, live Open gush).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: #dip on a sink now asks yn and runs C’s lottery/`wash_hands`/tap/potion switch (including real `polymorph_sink` and `potionbreathe`) instead of cancelling, while pool dip and `'n'`→potion getobj stay named.
- Must-fix stays empty for this SHA; next port popped Open `dipfountain` uncurse 17–20 (**Addressed:** D-1114 `e30a51f2`).
