# C oracle: mkobj.c

**JS modules:** `mkobj_mklev_like_c.js`, `mklev.js`, `u_init_post_mklev.js`, role `u_init_link_*_invent.js`  
**Phase:** P1  
**C path:** `nethack-c/upstream/src/mkobj.c`  
**Last C read:** 2026-06-08 — `u_init.c` **`u_init_role`** PM_HEALER/CLERIC/BARBARIAN/VALKYRIE — same **`ini_inv`** all races; Priest/Healer filter **`iniInvMkobjFilterCtxForRoleLikeC`** (`raceOrc`).

## Why P1 matters

Most mid-game RNG divergence is **object creation order** (`mkobj`, `ini_inv`, floor `fobj`) — not another `movemon` peel.

## Call order (partial)

1. `mkobj` / `mksobj` — class walk, `mksobj_init` per class, erosion `rn2(80)` gates.
2. `may_generate_eroded` — `struct obj *otmp`: `moves<=1 && !in_mklev`; `oerodeproof`; **WORM_TOOTH** (42) / **UNICORN_HORN** (261); **`oartifact`** (set in `mksobj_init` when `artif && !rn2(20|40)` before `mkobj_erosions`).
3. `mkobj_erosions` — `!rn2(100)` → oerodeproof only, still **`rn2(1000)`** grease; else erosion loops + grease.
4. `rndmonnum_adj(min,max)` — Plan A `rndmonst_adj`, else Plan B `rn1` + `G_UNIQ|G_NOGEN|hell` mask (`mkobj.c:395`).
5. `mksobj_init` TOOL **FIGURINE** — `rndmonnum_adj(5,10)` loop `is_human` ≤30, `blessorcurse(4)`; `corpsenm` → `mksobj` gender `spe` tail.
6. `mksobj_init` ROCK **STATUE** — `rndmonnum()` (not Plan-A-only `rndmonst`); nested `mkobj(SPBOOK_no_NOVEL)` gate.
7. `mksobj_init` TOOL **BELL_OF_OPENING** — `spe=3` only (no RNG).
8. `ini_inv` — role tables → `addinv` chain; explore mode `Wishing` before `Money`.
9. `ini_inv_mkobj_filter` — `mkobj(oclass,FALSE)` + while reject (`WAN_WISHING`, `gn.nocreate*`, useless pots/scrolls, orc `RIN_POISON_RESISTANCE`, monk `SCR_ENCHANT_WEAPON`, wizard `SPE_FORCE_BOLT`, spell level/restricted, `SPE_NOVEL`); pancake fallback `trycnt>1000`; **`FOOD_CLASS`** uses `mkobjOtypFoodClassIniInvLikeC` + `mksobjInitFoodClassIniInvAfterOtypLikeC`.
10. `ini_inv_obj_substitution` — after filter/fixed `mksobj`, `gu.urace.mnum != PM_HUMAN` → `inv_subs[]` otyp swap (UNDEF food included); Val/Ran/Kni linkers substitute fixed weapons/armor/food.
11. `u_init_race` PM_ELF — `Role_if(PM_CLERIC) || Role_if(PM_WIZARD)` → `ROLL_FROM(trotyp)` `rn2(6)` then `ini_inv(Instrument[])` (`trquan`×2 + `next_ident`; no `mksobj_init` for non-magic tools); `knows_object` elven gear = no RNG.
12. `u_init_race` PM_ORC — `!Role_if(PM_WIZARD)` → `ini_inv(Xtra_food)` (UNDEF FOOD `trquan` 2..2, filter + subst); runs after `u_init_role` in `u_init_inventory_attrs`.
13. `trquan` / `ini_inv_adjust_obj` — `WEAPON_CLASS`/`TOOL_CLASS`: `obj->quan = trquan(trop)` (second draw per row); FOOD trobj row count from first `trquan` only (`Knight` apple/carrot `10+rn2(1)`); Ranger cram `4+rn2(1)` objects each `!rn2(6)` stack quan.
14. Post-mklev mineralize / gem probs — ordering with `u_init_role` tail.

## Locator sessions

| Session | Window | Stress |
|---------|--------|--------|
| `seed0900-tourist-explore-actions` | 302+, 2480+ | mklev fill, tourist invent peel |
| `seed0102-ranger-name-cancel` | startup | ranger invent, shop |

## Open gaps

- **`ini_inv_mkobj_filter`** — **unified** (`iniInvMkobjFilterLikeC` + `iniInvMkobjFilterCtxForRoleLikeC`); monk scroll / healer wand / tourist food on general path.
- **`u_init_race`** — PM_ORC **`Xtra_food`** + PM_ELF **`Instrument[]`** invent prepend wired (`applyOrcXtraFoodInventTailLikeC` / **`applyElfInstrumentInventTailLikeC`**); dwarf/gnome `knows_object` tails still no-RNG stubs.
- **Non-human `u_init_role`** — **closed 2026-06-08 pass 4**: all roles dispatch in `u_init_post_mklev.js` (no `humanIdx`); subs in **`ini_inv_obj_substitution`** + **`u_init_race`** tails. Linker gates **role-only** (`is*ChargenLikeC`; legacy `isHuman*` names = role abbr only).
- Elf **Pri/Wiz** — Priest pack linker all-race (`isPriestChargenLikeC`); Wizard role-only; **`applyElfInstrumentInventTailLikeC`** prepends after role pack. Hea/Bar/Val linkers all-race; Bar **`iniInvSubstOtypForChargenLikeC`** on ring mail + short sword (pack 1).
- `game.invent` not fully driven by `ini_inv` + `mkobj` for all roles (Knight linker now accepts 10–11 apple/carrot stacks).
- NH5 `otyp` vs legacy floor indices in `mklev.js`.
- `makemon.js` `rndmonnum()` must stay aliased to **`rndmonnumMklevLikeC`** (medusa `mkcorpstat` rerolls).
- Other TOOL `default` otyps — `break` only (no extra RNG).

## Wrong hypotheses

- Session JSON draw list in `fastforward.js` — forbidden; use C call order.
- **`artif` boolean alone for erosion skip** — breaks **`seed8000` ~1420**; use **`otmp.oartifact`** after `mk_artifact` gate (fixed 2026-06-08).
