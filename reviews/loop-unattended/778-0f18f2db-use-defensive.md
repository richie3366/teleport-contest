# Review 778 — 0f18f2db — muse.c use_defensive mreadmsg / reveal_trap / mon_escape / consume (D-1809)

## Metadata
- Full / short hash: `0f18f2db4ce9f949a1efc647fda140c92b405bc3` / `0f18f2db`
- Parent: `f18f1523` (D-1808 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 06:14:07 +0200
- D-id: **D-1809**
- Stats: `js/muse.js` +590/−35; monsters +8; monmove comment. `js/` insertions **599** (>250 → ceiling **450**). Band **80–350**.
- Claims to close: Open `muse.c` `use_defensive` remaining: mreadmsg / reveal_trap / mon_escape / mon_consume_unstone. Not use_offensive.
- JS / map: `muse.js` find+use remaining arms + file-local C `staticfn`s; `locomotion` / `resists_acid` imports. `c-js-map/turns.md`. Archive **Addressed:** D-1809 `0f18f2db`.

## Intent vs deliverable

Git subject promises: Match C `muse.c` `use_defensive` so `mreadmsg` / `reveal_trap` / `mon_escape` / `mon_consume_unstone` actually run, instead of healing-only with default return 2.

`node scripts/csym.mjs use_defensive` → `muse.c:795–1219`. `mreadmsg` `:236–290`. `reveal_trap` `:753–767`. `mon_escape` `:779–789`. `mon_consume_unstone` `:2905–2981`. `m_tele` `:383–413`. `find_defensive` `:439+`. `flash_mon` `mon.c:6066–6079`. `newsym_rn2` `display.h:209` ≡ `rn2_on_display_rng`.

Parent: healing potions + `default: return 2`. The diff **does** port lizard / stairs / trapdoor / tele-trap / tele+create **scrolls** and those four helpers. Horn / bugle / wand arms stay out of **both** `find_defensive` and `use_defensive`. Subject is delivered for the named helpers; it is **not** a full `use_defensive` switch.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `use_defensive` / `find_defensive` | LIVE repaired | scroll/stairs/trap/lizard/heal |
| `mreadmsg` / `reveal_trap` / `mon_escape` / `m_tele` / `mon_consume_unstone` / `mcould_eat_tin` | LIVE local | C `staticfn` in muse.c |
| `mon_has_special` | LIVE local | C `wizard.c:116` |
| `flash_mon` | CLONE | C `mon.c` export; body matches; default `mon_to_glyph` rng ≡ `newsym_rn2` |
| `locomotion` / `resists_acid` | LIVE import | not new clones |
| unicorn horn / bugle / WAN_DIG/TELE/CREATE/UNDEAD | OMIT named | skipped in find **and** use |
| Knox `m_next2m` tryescape | OMIT named | |
| `munstone` other consume caller | OMIT named | |
| `use_offensive` `mreadmsg` | OMIT named | |

`node scripts/sym.mjs` (clone → import / new):

```
use_defensive    js/muse.js:1945   ASYNC
find_defensive   js/muse.js:1509   sync
mreadmsg         NOT EXPORTED — 1 LOCAL muse.js:1273 (C staticfn)
reveal_trap      NOT EXPORTED — 1 LOCAL muse.js:1311
mon_escape       NOT EXPORTED — 1 LOCAL muse.js:1338
m_tele           NOT EXPORTED — 1 LOCAL muse.js:1351
mon_consume_unstone NOT EXPORTED — 1 LOCAL muse.js:1390
flash_mon        NOT EXPORTED — 1 LOCAL muse.js:1260 (C lives in mon.c; do NOT add #2)
locomotion       js/monmove.js:1018   sync
resists_acid     js/monsters.js:681   sync  + explode/mhitm/zap clones — do NOT add #5
```

`--can muse.js monmove.js locomotion` / `monsters.js resists_acid`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**`find_defensive`.** Animal/mindless / dist>25 / swallow: match. Unicorn-horn-before-lizard **OMIT named**. Confused lizard corpse then tin `mcould_eat_tin && rn2(3)`: match. Blind `m_use_healing`. HP fraction then peaceful heal-only. Stairs/ladder/sstairs + hole/teletrap walk (grid-bug diag, boulder, `onscary`, `Can_fall_thru`): match. `nohands` early return. Invent: SCR_TELE, pots, SCR_CREATE; `!rn2(3)` keep. **Does not** set WAN_* / BUGLE / HORN — so use cannot see those codes. Named: later scroll vs C’s wand.

**Shipped `use_defensive` arms.** `m_flee` fleetim. SCR_TELE: split/extract/`mreadmsg`/`m_tele` or cursed `random_teleport_level`/`migrate_to_level`/`trycall`/`obfree`. SCR_CREATE: `rn2(73)`/`rnd(4)`/`+12` conf, `enexto`/`makemon`. Trapdoor/teletrap: `reveal_trap` SCORR→CORR + `unblock_point` + worm_move. Upstairs/sstairs ledger 1 → `mon_escape` (`mon_has_special` / last wizard stay). Lizard → `mon_consume_unstone(..., FALSE, FALSE)`. Heal pots unchanged. **Match those arms.** `case 0` → 0. `default` returns 2 (C `impossible` then 0) — dead if find stays honest.

**Helpers.** `mreadmsg`: unseen+Deaf return before `observe_object`; then label / `You_hear` / `flash_mon` / conf mispronounce. **Match.** `m_tele`: `tele_restrict` / amulet|W-tower `!rn2(3)` / `how`→`rloc` else trap `mintrap(FORCETRAP)`. **Match.** Consume: vis eat line, acid `rnd(15)`, lizard clears conf/stun, tame nutrit, `movement -= NORMAL_SPEED`. **Match.**

**Callee closure.** Every shipped arm’s C callees are LIVE or a verified `flash_mon` CLONE. Wand/horn/bugle are **not** live arms (find never selects them). Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Do **not** stamp “Match C unicorn horn / bugle / wand digging-tele-create-undead.” Do **not** stamp “Match C `munstone`.” Do **not** add a second `mreadmsg` or a fourth `resists_acid`. Public combat may hit heal/flee stairs; lizard/`mreadmsg` unseen is **public-unhit**.

## Density

§2b: remaining `use_defensive` + `find_defensive` arms those helpers need. +599. Did **not** glue `use_offensive`. Right size for the Open row.

## Verification

D-log: save-oracle skip; helper probe; green + cohort 7/7. This audit: `csym` `:795–1219` / `:236–290` / `:753–767` / `:779–789` / `:2905–2981` vs HEAD `js/muse.js:1273–1457` and `:1945–2171`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: horn; bugle; wand dig/tele/create/undead; Knox `m_next2m`; `munstone`; `use_offensive` `mreadmsg`; `flash_mon` belongs in `mon.js`; `resists_acid` clones.

Verdict: **ACCEPT-WITH-DEBT**
