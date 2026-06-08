# C oracle: mkobj.c

**JS modules:** `mkobj_mklev_like_c.js`, `mklev.js`, `u_init_post_mklev.js`, role `u_init_link_*_invent.js`  
**Phase:** P1  
**C path:** `nethack-c/upstream/src/mkobj.c`  
**Last C read:** 2026-06-08 — `mksobj_init` ROCK STATUE `rndmonnum`, TOOL `BELL_OF_OPENING`

## Why P1 matters

Most mid-game RNG divergence is **object creation order** (`mkobj`, `ini_inv`, floor `fobj`) — not another `movemon` peel.

## Call order (partial)

1. `mkobj` / `mksobj` — class walk, `mksobj_init` per class, erosion `rn2(80)` gates.
2. `rndmonnum_adj(min,max)` — Plan A `rndmonst_adj`, else Plan B `rn1` + `G_UNIQ|G_NOGEN|hell` mask (`mkobj.c:395`).
3. `mksobj_init` TOOL **FIGURINE** — `rndmonnum_adj(5,10)` loop `is_human` ≤30, `blessorcurse(4)`; `corpsenm` → `mksobj` gender `spe` tail.
4. `mksobj_init` ROCK **STATUE** — `rndmonnum()` (not Plan-A-only `rndmonst`); nested `mkobj(SPBOOK_no_NOVEL)` gate.
5. `mksobj_init` TOOL **BELL_OF_OPENING** — `spe=3` only (no RNG).
6. `ini_inv` — role tables → `addinv` chain; explore mode `Wishing` before `Money`.
7. Post-mklev mineralize / gem probs — ordering with `u_init_role` tail.

## Locator sessions

| Session | Window | Stress |
|---------|--------|--------|
| `seed0900-tourist-explore-actions` | 302+, 2480+ | mklev fill, tourist invent peel |
| `seed0102-ranger-name-cancel` | startup | ranger invent, shop |

## Open gaps

- `game.invent` not fully driven by `ini_inv` + `mkobj` for all roles.
- NH5 `otyp` vs legacy floor indices in `mklev.js`.
- `makemon.js` `rndmonnum()` must stay aliased to **`rndmonnumMklevLikeC`** (medusa `mkcorpstat` rerolls).
- Other TOOL `default` otyps — `break` only (no extra RNG).

## Wrong hypotheses

- Session JSON draw list in `fastforward.js` — forbidden; use C call order.
