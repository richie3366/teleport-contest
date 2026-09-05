# Review 814 — e3ccc72b — mhitu.c summonmu were / were_summon (D-1844)

## Metadata
- Full / short hash: `e3ccc72b0d28a116f28ba30fd046221fcdbd30bd` / `e3ccc72b`
- Parent: `70d84800` (D-1843). Map-driven Open: 2 corpus were `summonmu` RNG vs melee `rnd(20)`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 05:14:15 +0200
- D-id: **D-1844**
- Stats: `js/mhitu.js` +67/−9; `js/were.js` +70/−8; `js/sounds.js` +2/−1. `js/` insertions **139** ≤250. Band **80–350**.
- Claims to close: Open were arm after demon return. Not leftover WIN_STATUS.
- JS / map: `summonmu` were / `were_summon` / `growl_sound` export. `c-js-map/turns.md`. Archive **Addressed:** D-1844 `e3ccc72b`.

## Intent vs deliverable

Git subject promises: JS `summonmu` returned after the demon arm, so were `rn2(5)`/`rn2(30)` never ran and melee `rnd(20)` stole the slot.

`node scripts/csym.mjs summonmu` → `mhitu.c:955–1030`. `--callers`: `mhitu.c:733`. `were_summon` `were.c:141–189` (`mhitu.c:996`; `polyself.c:1636` yours). `new_were` `:95–138`.

Parent demon arm LIVE, were omitted. The diff **does** port the were arm and `were_summon`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `summonmu` were | LIVE repaired | after demon `return` |
| `were_summon` | LIVE new | `were.c:141–189` |
| `new_were` | LIVE | already; howl/armor named |
| `growl_sound` | LIVE export | was local `sounds.js` |
| `Protection_from_shape_changers` | LIVE export | 3 pre-existing clones remain |
| `msummon` is_lminion/angel | OMIT named | demon arm otherwise live |
| howl `You_hear`/`wake_nearto` / `mon_break_armor` | OMIT named | |

`node scripts/sym.mjs` (growl local → export; Protection export):

```
summonmu         NOT EXPORTED — 1 LOCAL mhitu.js:2313
were_summon      js/were.js:180   ASYNC — await required
new_were         js/were.js:137   sync
growl_sound      js/sounds.js:636   sync
Protection_from_shape_changers js/were.js:53   sync
             ALSO 3 LOCAL CLONE(S): display.js:956 monmove.js:667 wizard.js:173
tamedog          js/dog.js:529   ASYNC — await required
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**`summonmu` (`:966–1029`).** Demon: `!rn2(Inhell?10:16)` `msummon` then `return`. Were: human `!Protection && !rn2(5-(night()*2))` else `Protection || !rn2(30)` then `new_were`; `mdat = mtmp->data`; `!rn2(10)` helpers. JS `night()?1:0` ≡ C `night()`. **Match those RNG sites.**

**Seen vs unseen plines (`:993–1026`).** youseeit: `"%s summons help!"` then `were_summon(..., FALSE, ...)`; help+unseen → hemmed; no help → `"But none comes."`. Unseen: `!Deaf` growl `Something`/`makeplural(growl_sound)` then hemmed / `upstart(an/makeplural)` + `" from nowhere"`. JS same; `growl_sound` LIVE. **Match.**

**`were_summon` (`:155–188`).** Protection && !yours → 0 (no `rnd`). `for (i = rnd(5); i > 0; i--)`. Rat `rn2(3)?SEWER:rn2(3)?GIANT:RABID`. Jackal `rn2(7)?JACKAL:rn2(3)?COYOTE:FOX`. Wolf `rn2(5)?WOLF:rn2(2)?WARG:WINTER_WOLF`. `makemon(..., u.ux,u.uy,NO_MM_FLAGS)`; `canseemon` → visible++; `yours && mtmp` → `tamedog(mtmp,NULL,FALSE)`. JS `ptr.mndx` is C `monsndx` (`mons()` stamps `mndx`). Nested ternaries keep short-circuit RNG. **Match call-for-call.**

**Callee closure.** Were arm only (demon already live). `new_were` / `were_summon` / `growl_sound` / `tamedog` LIVE. Named OMITs only. No STUB in the were arm.

## Hallucinations / overclaim

Do **not** stamp `msummon` lminion/angel, howl, or `mon_break_armor`. Knight PASS; Priest same-step `dog_invent` is a later owner, not `summonmu` PASS.

## Density

§2b: were arm + its `were_summon` callee. +139. Did **not** glue `getpos`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify summonmu --base e3ccc72b~1` → `2 session(s) blocked`. Summary: **`1 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS`** (`tour-Knight-70007-d3-6-10-11-12` PASS; `tour-Priest-70006-d3-6-10-11-12` → `dog_invent` step 45 was 45). Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map. Pre-existing `Protection_from_shape_changers` clones in display/monmove/wizard are clone-drift debt, not this SHA.

Verdict: **ACCEPT-WITH-DEBT**
