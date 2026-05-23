# Satellite plan: Initialization, chargen, and removing `fastforward`

Parent: global plan **NetHack JS port roadmap** (Workstream C).

## Status (as of 2026-05-23)

- **Done / partial:** [`js/fastforward.js`](../../js/fastforward.js) is a **stub** — `fastforward_pre_mklev` empty; post-mklev delegates to [`js/u_init_post_mklev.js`](../../js/u_init_post_mklev.js). Real startup: [`js/o_init.js`](../../js/o_init.js), [`js/dungeon_init.js`](../../js/dungeon_init.js), [`js/role_init.js`](../../js/role_init.js), [`js/u_init_attr.js`](../../js/u_init_attr.js), etc.
- **In progress:** TTY chargen / `wintty.c` pickers; remainder of `u_init.c` ordering vs C (`ini_inv`, rogue `u_init_role` RNG — see `seed0077` in dashboard).
- **Still harnessed:** `fastforward_step` lives in **`monmove.js` / `moveloop_aux.js`** (not `fastforward.js`) — see [10-moveloop-detect-c-map.md](./10-moveloop-detect-c-map.md).

---

## Goals

- Replace every remaining **startup / post-mklev** leaf RNG call that still diverges from C (mostly in [`js/u_init_post_mklev.js`](../../js/u_init_post_mklev.js) and related `u_init` paths) so traces generalize beyond `seed8000`.
- Remove hardcoded hero state in [js/allmain.js](../../js/allmain.js) (`g._goldCount`, `g.u` stats, role strings) once [js/options.js](../../js/options.js) + `u_init` parity exists.
- Match startup **messages** and `--More--` flow to sessions.

## `fastforward.js` → C mapping (removal order)

Work **top to bottom** in startup order; after each slice, re-run a session and delete the matching replay lines.

| JS export | In-repo comment / role | Primary C references (upstream `src/`) |
|-----------|-------------------------|------------------------------------------|
| `fastforward_pre_mklev()` | `o_init` shuffles, `init_dungeon`, `init_level`, `place_level`, `u_init_misc` tail | `o_init.c`, `dungeon.c`, `mkmaze.c` / level graph, `u_init.c` |
| `l_nhcore_init()` (in [js/mklev.js](../../js/mklev.js)) | Lua-facing align shuffle | Called from [js/allmain.js](../../js/allmain.js); trace `allmain.c` / Lua bridge |
| `mklev()` | Real level gen (already partial) | `mklev.c`, `sp_lev.c`, … |
| *(removed export)* | **`fastforward_fill_mineralize`** — room fill, objects, monsters, **mineralize** now run inside **`mklev()`** / makelevel in [`js/mklev.js`](../../js/mklev.js) | `mklev.c` (`fill_special` / `fill_room` / mineralize), `mkmaze.c`, `sp_lev.c` as applicable |
| `fastforward_post_mklev()` | Delegates to **`runUInitRoleRngAfterMklevLikeC`** — `u_init_role`, attributes, tail before full **`ini_inv`** | `u_init.c`, `attrib.c`, `allmain.c` |
| `fastforward_step(stepNum)` | Per-turn ambient RNG before command (monsters, context) | `allmain.c` `moveloop`, `hack.c`, `mon.c` (`do_monsters` / regen / …) — **last** to remove; requires real end-of-turn pipeline |

## Checklist

### Trace and inventory

- [ ] From `nethack-c/upstream`, list **ordered** RNG-consuming functions from process start through first `nhgetch` (use recorder log if built).
- [ ] Annotate startup modules (not large `fastforward.js` replay tables — file is a stub) with **C symbol names** for the next porter.

### Pre-mklev

- [x] Port `o_init` shuffles (gems, objects) — **`js/o_init.js`** (shuffle_all, gem colors).
- [x] Port dungeon initialization (`init_dungeons`, `place_level`, …) — **`js/dungeon_init.js`**.
- [ ] Welcome pline: align string, gender, race adjective from real `flags` / `urace` / `urole` where sessions differ.

### Post-mklev / hero

- [ ] Port `u_init` / `ini_inv` / `mkobj` so **`game.invent`** drives RNG; shrink **`u_init_post_mklev.js`** / delete any redundant replay.
- [ ] Chargen from `nethackrc`: name, role, race, gender, alignment, pet — full **`wintty.c`** / **`role.c`** parity for sessions without identity in OPTIONS.

- [ ] For each `moves` index, replace `fastforward_step` body with real `moveloop_core` RNG from monster moves, timeout, hunger ticks, etc.
- [ ] Delete `fastforward_step` when all steps match C without replay.

### Files to touch (expected)

- [js/allmain.js](../../js/allmain.js), [js/fastforward.js](../../js/fastforward.js), [js/options.js](../../js/options.js), [js/mklev.js](../../js/mklev.js), new modules as needed (`u_init.js`, …).

## Exit criteria

- `fastforward.js` empty or deleted; no seed-specific RNG tables in `js/`. *(Startup table already gone; **per-turn** harness remains in `monmove.js` / `moveloop_aux.js`.)*
- `seed8000-tourist-starter` (then others) pass P RNG through chargen and early turns without fastforward.
