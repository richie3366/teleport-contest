# Review 779 — 5009dae1 — muse.c use_offensive remaining wand / horn / SCR_EARTH (D-1810)

## Metadata
- Full / short hash: `5009dae12586fc0495eaa5204152a59659562afb` / `5009dae1`
- Parent: `0f18f2db` (D-1809 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 06:35:00 +0200
- D-id: **D-1810**
- Stats: `js/muse.js` +578/−108; zap +7; const +6. `js/` insertions **592** (>250 → ceiling **450**). Band **80–350**.
- Claims to close: Open `muse.c` `use_offensive` remaining wand / horn / scroll. Not use_defensive.
- JS / map: `muse.js` find+use remaining arms; `zap.js` `buzz` / `unturn_*` exports. `c-js-map/turns.md`. Archive **Addressed:** D-1810 `5009dae1`.

## Intent vs deliverable

Git subject promises: Match C `muse.c` `use_offensive` so remaining wand, horn, and scroll cases actually run, instead of striking-plus-potion-plus-camera with default return 0.

`node scripts/csym.mjs use_offensive` → `muse.c:1823–2032`. `find_offensive` `:1420+`. `mplayhorn` `:194–233`. `buzz_force_miss` `:1814–1818`. `mbhitm` `:1596+`. `drop_boulder_on_player` `read.c:2293–2338`. `buzz` `zap.c:4764` ≡ `dobuzz(..., TRUE, FALSE, FALSE)`.

Parent: striking `mbhit` + potion throw + camera; ray `nomore`s omitted. The diff **does** select and fire death/sleep/fire/cold/lightning/missile, fire/frost horns, tele/undead `mbhit`, and SCR_EARTH. Subject is delivered for those arms.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `use_offensive` / `find_offensive` | LIVE repaired | |
| `buzz` | LIVE new export | `dobuzz(..., true, false, false)` |
| `buzz_force_miss` | LIVE local | C `staticfn`; last dobuzz arg TRUE |
| `mplayhorn` | LIVE local | C `staticfn`; Soundeffect named |
| `mbhit` / `mbhitm` | LIVE repaired | tele/undead; vs-mon striking dice-only named |
| `drop_boulder_on_player` / `_monster` | CLONE | C `read.c`; body matched here |
| `unturn_you` / `unturn_dead` | LIVE | zap.js export |
| `m_use_undead_turning` | LIVE local | invent corpse only |
| `bhito` / `fhito_loc` / `destroy_drawbridge` | OMIT named | |
| floor-corpse `linedup_callback` | OMIT named | |
| MUSE_SCR_FIRE | OMIT named | `#if 0` |
| SetVoice camera / steed earth | OMIT named | |

`node scripts/sym.mjs` (clone → import / new):

```
use_offensive    js/muse.js:899   ASYNC
find_offensive   js/muse.js:570   sync
buzz             js/zap.js:2244   ASYNC
buzz_force_miss  NOT EXPORTED — 1 LOCAL muse.js:500 (C staticfn)
mplayhorn        NOT EXPORTED — 1 LOCAL muse.js:1057
drop_boulder_on_player NOT EXPORTED — 1 LOCAL muse.js:1093 (C read.c; do NOT add #2)
unturn_you       js/zap.js:3140   ASYNC
unturn_dead      js/zap.js:3078   ASYNC
mbhit            NOT EXPORTED — 1 LOCAL muse.js:825
```

`--can muse.js zap.js buzz` / `unturn_you`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**`find_offensive`.** Peaceful/animal/mindless/nohands/swallow/`lined_up` gates. `reflection_skip = m_seenres(REFL) \|\| monnear` — JS `m_seenres` is **boolean** (do not `!== 0`). Then C `nomore` order: death, sleep (`multi>=0`), fire, fire horn `can_blow`, cold, frost horn, lightning, missile; undead if `carrying(CORPSE)`; striking; tele if !TC and (onscary / chokepoint+friends / objpile / stairs); pots; SCR_EARTH dist≤2 helmet/conf/phasing `!rn2(10)`; camera `!rn2(6)`. **Match the live selection.** Floor-corpse ray **named**.

**Ray / horn (`:1841–1876`).** `buzzfn = mwandexp ? buzz : buzz_force_miss`. `mzapwand`/`mplayhorn`, `BZ_M_WAND(BZ_OFS_WAN)` range 2 vs 6, horns `BZ_OFS_AD(AD_COLD|AD_FIRE)` + `rn1(6,6)`, then `mwandexp=TRUE`, dead→1. **Match.** `buzz_force_miss` → `dobuzz(..., true, false, true)`.

**Tele/undead/striking (`:1877–1890`).** `mbhit(..., rn1(8,6), mbhitm, bhito, otmp)`. JS `mbhit` walks hero/`m_at` + doorlock; **no** `bhito` object hits (**OMIT named**). `mbhitm` hero tele → `tele()`; undead → `unturn_you` / `unturn_dead`+`resist`. Vs-mon striking still burns `rnd`/`d` without `resist` (**named** in this file). Striking sets `mwandexp`. **Match the shipped beam vs you.**

**SCR_EARTH (`:1891–1937`).** `mreadmsg`, ceiling rumble, `m_useup` first, 3×3 `drop_boulder_on_monster` (not blessed self, not cursed others, not hero tile), adjacent uncursed `drop_boulder_on_player`. Steed **named**. Boulder: `mksobj` ROCK/`rn1(5,2)` vs BOULDER, `dmgval`, hard helmet cap 2, `flooreffects` then place. **Match the player path.**

**Callee closure.** Ray/horn: `buzz`/`dobuzz`/`mplayhorn` LIVE. Earth: drop_boulder CLONE verified vs `read.c:2293`. Tele/undead: `unturn_*` LIVE; `bhito` **OMIT named**. No silent stub in a live arm that find can select.

## Hallucinations / overclaim

Do **not** stamp “Match C `bhito` / `fhito_loc` / `destroy_drawbridge`.” Do **not** stamp “Match C `linedup_callback` floor corpse.” Do **not** stamp “Match C `MUSE_SCR_FIRE`” (`#if 0`). Do **not** add a second `drop_boulder_on_player` in `read.js` without deleting this clone. Public combat may hit striking; ray wands / earth are **public-unhit**.

## Density

§2b: remaining `use_offensive` + `find_offensive` selection those arms need. +592. Did **not** glue `use_misc`. Right size.

## Verification

D-log: save-oracle skip; find_offensive probe; green + cohort 7/7. This audit: `csym` `:1823–2032` / `:194–233` / `:1814–1818` vs HEAD `js/muse.js:570–714` and `:899–1008`; `buzz` vs `zap.c:4764`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: `bhito`/`fhito_loc`; `destroy_drawbridge`; floor-corpse undead; WAN_CANCELLATION `mbhitm`; vs-mon striking `resists_magm`; SCR_FIRE `#if 0`; steed earth; SetVoice camera; sanctuary/AD_HEAL.

Verdict: **ACCEPT-WITH-DEBT**
