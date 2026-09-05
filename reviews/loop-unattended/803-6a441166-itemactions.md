# Review 803 — 6a441166 — iactions.c itemactions Engrave / simpleonames / apply (D-1833)

## Metadata
- Full / short hash: `6a441166dadab6f060a36ce54ad73f85432e725e` / `6a441166`
- Parent: `690100e3` (D-1832). Map-driven Open: 14 corpus blocks on the item-action menu.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 01:00:29 +0200
- D-id: **D-1833**
- Stats: `js/iactions.js` +167/−29. `js/` insertions **167** ≤250. Band **80–350**.
- Claims to close: Open Engrave vs Write, stack `simpleonames`, apply catalogue. Not `do_statusline1`.
- JS / map: `itemactions` apply/E/read; local `simpleonames`. `c-js-map/turns.md`. Archive **Addressed:** D-1833 `6a441166`.

## Intent vs deliverable

Git subject promises: blades said “Write” (C “Engrave” for `is_blade` / wand / `oc_tough`); stacks “fortune cookie” unpluralized; apply catalogue thin.

`node scripts/csym.mjs itemactions` → `iactions.c:277–714`. `--callers`: `invent.c:2998,4025`. Apply `:309–400`. E `:430–445`. `item_naming_classification` `:45–82`. `item_reading_classification` `:85–124`. `simpleonames` `objnam.c:2427–2442`. `is_blade` `obj.h:213–216`. `is_wet_towel` `obj.h:256`. `surface` `dungeon.c:1749–1788`.

The diff **does** those menu strings. `surface` stays “floor” (named). `objnam.js` `simpleonames` still unpluralized (named; this file’s local clone is the live one).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| apply `if-else` `:309–400` | LIVE | otyp order incl. candles `carrying` |
| E Engrave vs Write | LIVE | inlined `is_blade` macro |
| `item_reading_classification` | LIVE | cookie/shirt/apron/hawaiian + `SCR_MAIL` |
| local `simpleonames` | CLONE | `makeplural` when `quan != 1` — matches C here |
| `objnam.js` `simpleonames` | OMIT named | still no `makeplural` |
| `surface` terrain nouns | OMIT named | ROOM → “floor” |
| W `armor_simple_name` / `cantwield` `'w'` | OMIT named | |
| `carrying` | LIVE callee | dynamic `hack.js` import |

`node scripts/sym.mjs`:

```
simpleonames     js/objnam.js:2214   sync
             !! ALSO 2 LOCAL CLONE(S): iactions.js:364  pickup.js:112
item_naming_classification  NOT EXPORTED — 1 LOCAL iactions.js:374
item_reading_classification NOT EXPORTED — 1 LOCAL iactions.js:400
is_blade         js/objects.js:144   sync  (+ dothrow/lock clones; this SHA inlines)
carrying         js/hack.js:2490   sync
body_part        js/polyself.js:352   sync
makeplural       js/objnam.js:1760   sync
is_wet_towel     js/weapon.js:1376   sync
```

No clone→import of `objnam.js` `simpleonames` (would have been the diverging export). FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Apply (`:309–400`).** Coin → pie → whip → hook → known bag-of-tricks → container → grease → lock tools → tinning kit → leash → saddle → whistles → leaf → stethoscope → mirror → bells → candelabrum → candles (`carrying(CANDELABRUM)` `spe<7` attach vs light) → lamps → known oil → other potion as `IA_DIP_OBJ` `'a'` → camera → towel → crystal ball → marker → figurine → unihorn → known horn of plenty → `WOODEN_FLUTE`..`DRUM_OF_EARTHQUAKE` → traps → pick/mattock → wand break. **Match that order and those strings.** `carrying` is the exported C callee.

**E (`:430–445`).** Towel wipe / marker graffiti / weapon|wand|gem|ring. Verb: `is_blade` (`WEAPON_CLASS && P_DAGGER..P_SABER`) or wand or (`GEM|RING` && `oc_tough`) → Engrave else Write. **Match the predicate.** `surface(u.ux,u.uy)` named as always “floor”.

**`simpleonames` (`:2427–2442`).** Local clone `singular(xname)` then `makeplural` if `quan != 1`. Naming “this stack of …” now pluralizes. **Match C at this site.** Export in `objnam.js` still diverges (named).

**Read (`:91–124`).** Cookie / T-shirt / apron / Hawaiian before scroll; `SCR_MAIL` skips “to activate its magic”. **Match.**

**Wield.** `is_wet_towel` ≡ `TOWEL && spe>0` (`obj.h:256`). `body_part(HAND|FINGER)`. **Match those strings.** `cantwield` skip named.

**Callee closure.** One function’s remaining menu arms. Apply/E/read LIVE. `carrying` LIVE. Local `simpleonames` verified CLONE. Named OMITs only. No STUB in a shipped apply arm.

## Hallucinations / overclaim

Do **not** stamp `dungeon.c` `surface`, `armor_simple_name`, `cantwield`, or `objnam.js` `simpleonames`. The two `do_statusline1` re-attrs (Tourist food-rations, Wizard bell) are leftover WIN_STATUS Open, not this peel.

## Density

§2b: remaining `itemactions` string/catalogue envelope. +167. Did **not** glue `getobj`. Right size.

## Verification

This audit, `js/` at `6a441166`: `node scripts/hidden-proxy.mjs verify itemactions --base 6a441166~1` → `14 session(s) blocked`. Summary: **`12 PASS, 2 moved past (2 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS`**. Matches the D-log. Queue row cited 14 blocks — not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
