# C oracle: sp_lev.c (fill_special_room)

**JS modules:** `mklev.js` (`fillSpecialRoomLikeC`, `fillAllSpecialRoomsLikeC`)  
**Phase:** P1 mklev  
**C path:** `nethack-c/upstream/src/sp_lev.c` `fill_special_room`  
**Last C read:** 2026-06-09 — vault gold + makelevel call sites

## Call order

1. **`mklev.c` `makelevel` `fill_vault`** — after `add_room(…, VAULT)` + `needfill=FILL_NORMAL`, **before** `mk_knox_portal` / `makevtele` (`mklev.c:1330`).
2. **`mklev.c` `makelevel` tail** — loop all `svr.rooms[i]` after **`fill_ordinary_room`** (`mklev.c:1416–1418`); runs on maze + regular levels.

## `fill_special_room` control flow

- Recurse **`nsubrooms`** first (subroom fill not blocked by parent `needfill`).
- Early return: **`OROOM`**, **`THEMEROOM`**, **`needfill == FILL_NONE`**.
- **`needfill == FILL_NORMAL`**:
  - **`rtype >= SHOPBASE`** → **`stock_room`** (`shknam.c`); set **`has_shop`**; return.
  - **`VAULT`** → nested loop `mkgold(rn1(abs(depth)*100, 51), x, y)` over room interior.
  - **`COURT`…`BARRACKS`** → **`fill_zoo`** (`mkroom.c`).
- Second **`switch (rtype)`** — level flags (`has_vault`, `has_zoo`, …).

## Locator sessions

| Session | Window | Stress |
|---------|--------|--------|
| `seed0016-healer-newmoon-eat-zap` | **1281–1288** | vault **`fill_special_room`** @ `do_vault` — **`mksobj`/`mkobj_erosions`** `rn2(100)` + **`next_ident`** `rnd(2)` per new gold pile |

## Open gaps

- **`fill_ordinary_room` supply chest** — **`add_to_container`** + SPBOOK bias in **`mklev.js`** (2026-06-09); see [`mkobj.c.md`](mkobj.c.md).
- **`fill_zoo`** — stub (`fillZooLikeC`); zoo/court/morgue/barracks RNG not ported.
- **`stock_room`** — stub (`stockRoomLikeC`); shop levels diverge until `shknam.c` port.
- Vault gold **`rn2(100)`** — C recorder tags `fill_special_room`; draws are **`mksobj`/`mkobj_erosions`** on new **`GOLD_PIECE`** piles (`gi.in_mklev`).

## Wrong hypotheses

- **`seed0016` ~1281** = `fill_ordinary_room` `skip_nonrogue` — false; C still in **`make_niches`/`dosdoor`** then **early vault** `fill_special_room`, not ordinary fill (~1294+).
