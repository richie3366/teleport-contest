# C oracle: mkroom.c (fill_zoo)

**JS modules:** `mklev.js` (`fillZooLikeC`, `courtmonMndxLikeC`, `squadmonMndxLikeC`, `morguemonMndxLikeC`, `antholemonMndxLikeC`, `mkZooThronemonLikeC`)  
**Phase:** P1 mklev  
**C path:** `nethack-c/upstream/src/mkroom.c` `fill_zoo`  
**Last C read:** 2026-06-09 — full `fill_zoo` + helpers

## Call order

1. **`sp_lev.c` `fill_special_room`** — `COURT`…`BARRACKS` → **`fill_zoo(sroom)`** (after subroom recurse).
2. **Per-room prep** — `COURT` throne scan / `somexyspace`; `BEEHIVE` center; `ZOO`/`LEPREHALL` set `goldlim = 500 * level_difficulty()`.
3. **Grid loop** — `makemon(…, MM_ASLEEP | MM_NOGRP)` + type switch (gold, corpses, boxes, jelly, cocknest statue+`mkobj`, anthole food).
4. **Tail** — `COURT`: `THRONE` tile + royal chest (`mksobj` gold + `add_to_container`); level flags (`has_court`, `has_zoo`, …).

## RNG hotspots

| Room | Draws |
|------|--------|
| **COURT** | `somexyspace`/`occupied`; `courtmon` `rn2(60)+rn2(3*depth)` + **`mkclass`**; `mk_zoo_thronemon` `rnd(depth)` ruler + **`makemon`** + **`mongets(MACE)`** |
| **ZOO/LEPREHALL** | per cell: `dist2`→`sq`; `rn1(i,10)` **`mkgold`**; sleeper **`makemon`** |
| **MORGUE** | `morguemon` `rn2(100)`/`rn2(depth)` + **`mkclass`**; `rn2(5/10/5)` corpse/box/grave |
| **BARRACKS** | `squadmon` `rnd(80+depth)`; `rn2(20)` chest |
| **BEEHIVE** | queen center; `rn2(3)` royal jelly |
| **COCKNEST** | `rn2(3)` statue; `rn2(5)` × **`mkobj(RANDOM_CLASS)`** in container |
| **ANTHOLE** | `ubirthday % 3 + level_difficulty` ant pick; `rn2(3)` food |

## Locator sessions

| Session | Window | Stress |
|---------|--------|--------|
| `seed0016-healer-newmoon-eat-zap` | mklev unchanged through **2492** | Healer start — no zoo on D:1; regression = canaries only |
| `seed0361-archeologist-tour` | levelgen with **`fill_zoo`** tag in trace | zoo/court levels when batch exercised on shop/zoo seeds |

## Open gaps

- **`stock_room`** — still stub (`shknam.c`).
- **`mkobj(RANDOM_CLASS)`** in cocknest — uses **`mkobjFromMklevCLikeC`** (not full invent path).
- **`mongets(MACE)`** on thronemon — **`mksobj(MACE, true)`** RNG only (no invent on mon).

## Wrong hypotheses

- **`fill_zoo`** only runs on shop levels — false; any `COURT`…`BARRACKS` with `needfill == FILL_NORMAL`.
