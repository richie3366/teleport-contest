# C oracle: trap.c (mklev subset)

**JS modules:** `trap.js` (`holeDestinationLikeC`, `dngBottomLikeC`), `mklev.js` (`maketrap`)  
**Phase:** P1 mklev  
**C path:** `nethack-c/upstream/src/trap.c` `hole_destination`, `maketrap`  
**Last C read:** 2026-06-09 — HOLE/TRAPDOOR `dst` during `fill_ordinary_room` `mktrap`

## Call order

1. **`mklev.c` `mktrap`** — `traptype_rnd` → `somexyspace` → **`maketrap`**.
2. **`maketrap` `switch`** — **`HOLE`/`TRAPDOOR`/`PIT`/…** case: if **`is_hole(typ)`** → **`hole_destination(&ttmp->dst)`** before shop damage / terrain tweak.
3. **`hole_destination`** — `dst.dnum = u.uz.dnum`; `dst.dlevel = dunlev(&u.uz)`; while `dst.dlevel < dng_bottom(&u.uz)`: increment, **`rn2(4)`** break.
4. **`mklev.c` `mktrap` tail** — shallow levels: **`rnd(4)`** victim gate → **`mktrap_victim`**.

## Locator sessions

| Session | Window | Stress |
|---------|--------|--------|
| `seed0016-healer-newmoon-eat-zap` | **1341** | first room **`mktrap`** hole — **`hole_destination`** `rn2(4)` before **`rnd(4)`** victim gate |

## Open gaps

- **`maketrap` full** — squeaky board, rolling boulder, statue trap, tele trap, terrain on pit/hole not ported.
- **`clamp_hole_destination`** — used at fall time (`fall_through`), not mklev `maketrap`.
- Supply-chest **`add_to_container`** still stub in **`fill_ordinary_room`** (RNG may match without container wiring until extra-class `mkobj` paths diverge).

## Wrong hypotheses

- **`seed0016` ~1341** = supply-chest **`rnd(4)`** vs **`rn2(4)`** — false; C caller **`hole_destination(trap.c:450)`** during **`mktrap`**, not **`mkobj`**.
