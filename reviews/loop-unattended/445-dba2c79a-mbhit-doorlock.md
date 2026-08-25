# Review 445 — dba2c79a — muse.c mbhit doorlock WAN_STRIKING (D-1484)

## Metadata
- Full / short hash: `dba2c79a7979641064e79157380c0309c8955f4e` / `dba2c79a`
- Parent: `49826707` (D-1483). This file audits **this SHA only** (ninth of nine `js/` commits since review **436**). Archive **Addressed:** D-1484 was missing the short hash; this review commit fills `dba2c79a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 16:12:26 +0200
- D-id: **D-1484**
- Stats: 11 files, +125 / −35 — `js/muse.js` +47 / −6; `js/lock.js` +2 comments; `js/zap.js` +3 comments.
- Claims to close: Open `muse.c` `mbhit` doorlock (named from D-1482 / review **443**). Not hero `bhit`. `reviews/loop-2026-08-15/` has no unpaid `mbhit` Must-fix.
- JS / map: `muse.js` `mbhit`; callee `lock.js` `doorlock` already live (D-1462/D-1475/D-1482). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **443** named `mbhit` after hero STRIKING `bhit`; **436** named STRIKING doorlock (hero path).

## Intent vs deliverable

Git subject promises: “Match C muse.c mbhit so a monster striking-wand beam that hits a door uses doorlock instead of stopping on the locked or closed mask.”

C `mbhit` `:1776–1809`: WAN_STRIKING && `ltyp != DRAWBRIDGE_UP` && `find_drawbridge` → `destroy_drawbridge`; **else if** `IS_DOOR || SDOOR` switch OPENING/LOCKING/STRIKING: `doorlock` then `gz.zap_oseen` `makeknown(otyp)` (not hero `learnwand` / `!Deaf`); shop `D_BROKEN` `add_damage(..., 0L)` (not `SHOP_DOOR_COST` / `pay_for_damage`). Then the existing stop: `!ZAP_POS(ltyp)` or door still `D_LOCKED|D_CLOSED` using **post-doorlock** mask. Callee `lock.c` `doorlock` already smash/explode (D-1482). Callers `use_offensive` STRIKING `:1880–1884` (also TELE/UNDEAD reuse `mbhit`).

Old JS: `mbhit` hit hero/mon then stopped on locked/closed without `doorlock`. Comment said doorlock deferred.

The diff **does** wire the switch, `makeknown`, shop `add_damage(0)`, and keep `find_drawbridge` as an else-if **gate** with an empty body. It **does not** call `destroy_drawbridge`. Named. It **does not** add `fhito_loc` or `map_invisible`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mbhit` doorlock switch | C `:1785–1802`, **wired this SHA** | |
| `doorlock` | C `lock.c`, **imported live** | not a clone this SHA |
| `makeknown` | C `invent.c`, **imported live** | `zap_oseen` only |
| `add_damage(..., 0)` | C `shk.c`, **imported live** | not `SHOP_DOOR_COST` |
| `in_rooms` / `SHOPBASE` | C, **imported live** | |
| `find_drawbridge` | C `dbridge.c` `:180–204`, **imported live** | body `destroy_drawbridge` named |
| `fhito_loc` | C `:1772`, **named omit** | |
| `map_invisible` on unseen `m_at` | C `:1767–1768`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the new `mbhit` lines (`doorlock` smash has no dice; explode `mb_trapped` `rnd(15)` only with `m_at` on a trapped door — that clone is D-1482 named debt). Public fortress does not have a monster zap striking at a door.

## C ↔ JS fidelity

Pinned C (hero `bhit` uses `learnwand`/`SHOP_DOOR_COST`; this caller does **not**):

```1785:1800:nethack-c/upstream/src/muse.c
        } else if (IS_DOOR(ltyp) || ltyp == SDOOR) {
            switch (otyp) {
            /* note: monsters don't use opening or locking magic
               at present, but keep these as placeholders */
            case WAN_OPENING:
            case WAN_LOCKING:
            case WAN_STRIKING:
                if (doorlock(obj, gb.bhitpos.x, gb.bhitpos.y)) {
                    if (gz.zap_oseen)
                        makeknown(otyp);
                    /* if a shop door gets broken, add it to
                       the shk's fix list (no cost to player) */
                    if (levl[gb.bhitpos.x][gb.bhitpos.y].doormask == D_BROKEN
                        && *in_rooms(gb.bhitpos.x, gb.bhitpos.y, SHOPBASE))
                        add_damage(gb.bhitpos.x, gb.bhitpos.y, 0L);
```

JS now: after hero/mon hits, `find_drawbridge` gate then `else if (IS_DOOR || SDOOR)` OPENING/LOCKING/STRIKING `doorlock`. **Callee is not a stub.** Hallucination check: “Match C `doorlock`” while **D-1482 already ported smash/explode** is **not** a dispatch-stub lie. This SHA is the **monster caller**.

`makeknown(otyp)` iff `game._zap_oseen`. `use_offensive` STRIKING sets `_zap_oseen = canseemon(mtmp)` before `mbhit` (`:601`, C `:1880`). No `learnwand`. No `WAN_STRIKING && !Deaf`. Match `:1793–1794`. Minvis caster: oseen false, smash without makeknown. Canary claimed that.

Shop: `(loc.doormask|0)===D_BROKEN && in_rooms(..., SHOPBASE)` → `add_damage(x,y,0)`. `loc` is the same cell object `doorlock` mutates, so the check is post-smash like C `levl[x][y].doormask`. Explode is `D_NODOOR`, not billed. No `pay_for_damage`. Match `:1797–1799`. Hero `bhit` still uses `SHOP_DOOR_COST` + pay (D-1482). Unchanged.

Stop after doorlock uses stale `ltyp` and **current** `doormask`. After smash `D_BROKEN`, `LOCKED|CLOSED` is clear so the beam can continue if `ZAP_POS(DOOR)`. After explode `D_NODOOR`, same. Still locked/closed (open-door no-op): stop. Match `:1804–1809`.

SDOOR STRIKING: `doorlock` appear-then-smash (D-1482). Match. OPENING/LOCKING placeholders kept even though monsters do not use those wands today. Match `:1787–1788`. STONE / non-door: skip switch. Match.

`find_drawbridge`: C then `destroy_drawbridge`. JS empty body still **skips** the else-if, so a true find neither destroys nor `doorlock`s. Ordinary locked doors are not `IS_DRAWBRIDGE` / drawbridge-wall (`dbridge.c` `:180–204` matches JS). Named omit is the **destroy body**, not a false-positive gate on a shop door.

## Hallucinations / overclaim

Subject says a monster striking-wand beam that hits a door uses `doorlock` instead of stopping on the locked/closed mask. **True** for WAN_STRIKING on `IS_DOOR`/`SDOOR` when `find_drawbridge` is false: smash/explode, oseen `makeknown`, shop `add_damage(0)`, then the C stop. **False until named** for `destroy_drawbridge`, `fhito_loc`, `map_invisible`. Stamping **Addressed:** D-1484 for **the `mbhit` caller** is fair. Do **not** stamp “Match C drawbridge destroy.” Do **not** treat fortress PASS as a monster door smash. Do **not** claim hero `!Deaf` learnwand moved into `mbhit` (it did not).

## Density

One caller plus live `doorlock`. ~40 lines. Playbook §2b. Did not glue `fhito_loc`. Acceptable.

## Branch-by-branch confirm

1. Monster WAN_STRIKING + locked door, oseen: crash, `D_BROKEN`, `makeknown(WAN_STRIKING)`. Match `:1792–1794` / `:1234–1250`.
2. Minvis caster: smash, skip `makeknown`. Match `zap_oseen` false.
3. Trapped locked, no mon: `D_NODOOR` explode, no shop `D_BROKEN` bill. Match.
4. Open/broken: `doorlock` `res=false`, no makeknown. Match `:1251–1252`.
5. SDOOR: appear then smash. Match D-1482 / `:1117–1126`.
6. OPENING placeholder would unlock if a mon ever zapped it. Match `:1789–1791`.
7. Shop smash: `add_damage(0)` only. Hero `bhit` still `SHOP_DOOR_COST`. Match.
8. STONE / wall: no `doorlock`. Match.
9. Drawbridge find-true: skip `doorlock`; destroy named. Match else-if.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `add_damage(..., 0)` is C `0L`, not a recorded cost.

## Verification

Journal: private canary **12**/12 (C/JS grep; locked smash+oseen makeknown; trapped explode; open no-op; SDOOR appear+smash; STONE skip; minvis skip makeknown; OPENING placeholder; hero `bhit` still learnwand/`SHOP_DOOR_COST`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Canary did not claim `destroy_drawbridge`. This audit cadence: full `sessions` at HEAD.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The `mbhit` switch matches `:1785–1802`; `doorlock` is a C callee.

Named omits (map / Open, not Must-fix):

1. `destroy_drawbridge` when `find_drawbridge` is true (`:1782–1784`)
2. `fhito_loc` (`:1772`)
3. `map_invisible` on unseen `m_at` (`:1767–1768`)
4. `mb_trapped` `mondied` / `mon_learns_traps` (D-1482)
5. `zap_updown` default — Must-fix from review **437**

Do not Must-fix “`mbhit` should `learnwand` / `!Deaf`” (C `makeknown` + `zap_oseen`). Do not Must-fix “shop door should `SHOP_DOOR_COST` / `pay_for_damage`” (C `0L`, no pay). Do not Must-fix “OPENING placeholder should be omitted” (C keeps it).

## Callers / RNG ledger

C callers: `use_offensive` STRIKING (range `rn1(8,6)` already); defensive TELE/UNDEAD reuse `mbhit` but not this otyp. New dice: none in the new lines. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
