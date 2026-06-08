# C oracle: mkobj.c

**JS modules:** `mkobj_mklev_like_c.js`, `mklev.js`, `u_init_post_mklev.js`, role `u_init_link_*_invent.js`  
**Phase:** P1  
**C path:** `nethack-c/upstream/src/mkobj.c`  
**Last C read:** 2026-06-08 — `may_generate_eroded` + `mkobj_erosions` grease on oerodeproof path

## Why P1 matters

Most mid-game RNG divergence is **object creation order** (`mkobj`, `ini_inv`, floor `fobj`) — not another `movemon` peel.

## Call order (partial)

1. `mkobj` / `mksobj` — class walk, `mksobj_init` per class, erosion `rn2(80)` gates.
2. `may_generate_eroded` — skip when `moves<=1 && !in_mklev`; **WORM_TOOTH** (42) / **UNICORN_HORN** (261); `oartifact` (defer until `otmp.oartifact` wired).
3. `mkobj_erosions` — `!rn2(100)` → oerodeproof only, still **`rn2(1000)`** grease; else erosion loops + grease.
4. `rndmonnum_adj(min,max)` — Plan A `rndmonst_adj`, else Plan B `rn1` + `G_UNIQ|G_NOGEN|hell` mask (`mkobj.c:395`).
5. `mksobj_init` TOOL **FIGURINE** — `rndmonnum_adj(5,10)` loop `is_human` ≤30, `blessorcurse(4)`; `corpsenm` → `mksobj` gender `spe` tail.
6. `mksobj_init` ROCK **STATUE** — `rndmonnum()` (not Plan-A-only `rndmonst`); nested `mkobj(SPBOOK_no_NOVEL)` gate.
7. `mksobj_init` TOOL **BELL_OF_OPENING** — `spe=3` only (no RNG).
8. `ini_inv` — role tables → `addinv` chain; explore mode `Wishing` before `Money`.
9. Post-mklev mineralize / gem probs — ordering with `u_init_role` tail.

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
- **`artif` param on `mksobjTailConsumeRngLikeC`** — breaks **`seed8000` ~1420**; need **`otmp.oartifact`** state, not ctor flag alone.
