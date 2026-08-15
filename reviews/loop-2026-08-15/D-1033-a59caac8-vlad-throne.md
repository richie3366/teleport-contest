# Review — `a59caac8` — D-1033 Vlad `special_throne_effect`

## Metadata
- Full / short hash: `a59caac832949a04d03f9d1b8767063293ff5b81` / `a59caac8`
- Parent: `31c0489f` (D-1032 fig_transform)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 17:35
- D-id: **D-1033**
- Stats: 12 files, **+405 / −76** — `js/sit.js` **+229**, `js/exper.js` **+76**
- JS / map / cadence: `sit.js`, `exper.js` (`losexp`), `read.js` (`seffects` SPE_REMOVE_CURSE); data/debt; no cadence (#1300 still)

## Intent vs deliverable
Promise: Vlad `special_throne_effect` + `dosit` `IS_THRONE`. Ordinary 1–13 **deferred** (D-1034 the next day) — honest density for **this** SHA, unlike D-1023.

Deliverable: special switch 1–13 + `throne_sit_effect` envelope `rnd(6)>4` / `rnd(13)` / `In_V_tower` early-return + `dosit` throne after OBJ_AT. `losexp` for drain case 5.

## Inventory
| File | Role |
|------|------|
| `js/sit.js` | `special_throne_effect`, envelope `throne_sit_effect`, `dosit` IS_THRONE |
| `js/exper.js` | `losexp` permanent drain |
| `js/read.js` | `seffects` fake SPE_REMOVE_CURSE (case 10) |
| `js/apply.js` | grease_ok COIN skip comment/thin wire |

## C ↔ JS fidelity

### Envelope `throne_sit_effect` — faithful
C `sit.c:39`: `special_throne = In_V_tower`; `if (rnd(6)>4)` { `effect = rnd(13)`; wizard getlin; if special → `special_throne_effect` **return** (no puff); else ordinary }. Else comfort prince / out of place. Then `!special && !rn2(3)` puff ROOM.

JS: same `rnd(6)>4` (comment “= !rn2(3)” not simplified — **RNG is `rnd(6)`**, not `rn2(3)`, match). Wizard getlin named omit. Special **return** before vanish: match.

### `special_throne_effect` 1–13 — graph copied
C `sit.c:238–354`.

| Case | C | JS |
|------|---|-----|
| 1–4 | `makewish`; typ=ROOM; “disintegrates” | same; `throne_to_room` |
| 5 | terrible pline; `!Drain_resistance` → `losexp` then `ulevelmax--` if `> ulevel` | same |
| 6 | grease invent **except COIN**; `make_glib(rn1(101,100))` | same COIN skip (D-log grease_ok) |
| 7 | `attrcurse`; amused | same |
| 8 | `find_hell`; `dlevel = num_dunlevs-1`; amulet → disoriented else `schedule_goto` | same |
| 9 | C typo **seeems**; `msummon(NULL)` ×3 | typo **kept** (fidelity, not a fix) |
| 10 | fake SPE_REMOVE_CURSE blessed; `HConfusion=1`; `seffects`; restore | JS also sets flat `u.Confusion=1` besides `HConfusion` — C does not |
| 11 | vampire unworthy else poly | same |
| 12 | acid `rnd(16)` resist else `rnd(80)`; `exercise CON` | same |
| 13 | warp; `adjattrib(i, rn2(5)-2, -1)` for `A_MAX` | same |

**Case 10 gap:** C only touches `HConfusion`. JS forces the flat `Confusion` flag. If `seffects` reads one or the other, the “confused remove curse” scroll diverges. Check `read.js` `seffects` — real risk, not cosmetic.

`makewish` / `msummon` / `polyself` / `schedule_goto` / `losexp`: the switch is C; **the effect** is the quality of those callees (wish already Keep’d elsewhere). Public unhit.

### `dosit` IS_THRONE — wired too early in a still-gappy `dosit`
C `sit.c:398`: steed `mon_nam`; hider; `can_reach_floor`; ustuck; pool/gremlin; **OBJ_AT**; **else if trap** (`dotrap` VIASITTING); water/sink/altar/grave/stairs/ladder/lava/ice/drawbridge; **then** `IS_THRONE`.

JS `dosit`: steed message **“your steed”** ≠ C `mon_nam(usteed)`; Levitation early-return tumble (approx `!can_reach_floor`); OBJ_AT picnic; **skips trap/water/sink/…**; `IS_THRONE`.

Consequence: **trap on the throne cell** → C `dotrap` sitting, JS throne effect. Named “traps deferred” in the sit.js header — honest, but Keep D-1033 sells `dosit IS_THRONE` as if the caller were C.

OBJ_AT on throne: both sit on the object, not the throne. Match.

## Constitution / playbook
Grep: bans clean. Copied `seeems` typo = no anti-C polish. No FORCE.

## Density (§2b)
**Right size** for the iter: one `special_throne` family + the necessary `dosit`/`losexp` thread. Ordinary 1–13 **not** in this SHA.

## Documentation
D-log: ordinary 1–13 deferred — true (D-1034 follows). `dosit` trap skip undersold as “IS_THRONE after those” when JS does not have “those”.

## Verification
Green; journal “all 44/44” + `#sit` seeds 0106/0107/4500. If those seeds are not on Vlad’s throne, **special cases 1–13 are unhit**. Private node grease/Drain.

## Risks / debt
1. `dosit` skips `t_at` / terrains between object and throne.
2. Case 10 extra flat `Confusion`.
3. Callees wish/msummon/poly/goto: not re-audited here.
4. Steed message.

## Verdict
- Verdict: **ACCEPT-WITH-DEBT**
- Score: **6.5 / 10**
- One sentence: the Vlad switch is a C copy (typo included); Keep `dosit IS_THRONE` is a **shortcut** in a `#sit` that does not yet have C’s `else if (trap)`.
