# Satellite plan: Initialization, chargen, and removing `fastforward`

Parent: global plan **NetHack JS port roadmap** (Workstream C).

## Goals

- Replace every leaf RNG call in [js/fastforward.js](../../js/fastforward.js) with the **real** ported C equivalent so traces generalize beyond `seed8000`.
- Remove hardcoded hero state in [js/allmain.js](../../js/allmain.js) (`g._goldCount`, `g.u` stats, role strings) once [js/options.js](../../js/options.js) + `u_init` parity exists.
- Match startup **messages** and `--More--` flow to sessions.

## `fastforward.js` → C mapping (removal order)

Work **top to bottom** in startup order; after each slice, re-run a session and delete the matching replay lines.

| JS export | In-repo comment / role | Primary C references (upstream `src/`) |
|-----------|-------------------------|------------------------------------------|
| `fastforward_pre_mklev()` | `o_init` shuffles, `init_dungeon`, `init_level`, `place_level`, `u_init_misc` tail | `o_init.c`, `dungeon.c`, `mkmaze.c` / level graph, `u_init.c` |
| `l_nhcore_init()` (in [js/mklev.js](../../js/mklev.js)) | Lua-facing align shuffle | Called from [js/allmain.js](../../js/allmain.js); trace `allmain.c` / Lua bridge |
| `mklev()` | Real level gen (already partial) | `mklev.c`, `sp_lev.c`, … |
| `fastforward_fill_mineralize()` | Room fill, objects, monsters, mineralize | `mklev.c` (`fill_special` / `fill_room` / mineralize), `mkmaze.c`, `sp_lev.c` as applicable |
| `fastforward_post_mklev()` | `u_init_role`, `ini_inv`, attributes, moveloop preamble RNG | `u_init.c`, `attrib.c`, `allmain.c` |
| `fastforward_step(stepNum)` | Per-turn ambient RNG before command (monsters, context) | `allmain.c` `moveloop`, `hack.c`, `mon.c` (`do_monsters` / regen / …) — **last** to remove; requires real end-of-turn pipeline |

## Checklist

### Trace and inventory

- [ ] From `nethack-c/upstream`, list **ordered** RNG-consuming functions from process start through first `nhgetch` (use recorder log if built).
- [ ] Annotate [js/fastforward.js](../../js/fastforward.js) sections with **session index ranges** (already partially in comments) and C symbol names.

### Pre-mklev

- [ ] Port `o_init` shuffles (gems, objects) — delete lines through `u_init_misc` block in `fastforward_pre_mklev`.
- [ ] Port dungeon initialization (`init_dungeon`, `place_level`, branch graph) until `mklev` entry matches C RNG.

### Post-mklev / hero

- [ ] Chargen from `nethackrc`: name, role, race, gender, alignment, pet — [js/jsmain.js](../../js/jsmain.js) TODO for role mapping.
- [ ] Port `u_init` / `ini_inv` / attribute rolls; remove hardcoded block in `newgame()` after `fastforward_post_mklev`.
- [ ] Welcome pline: align string, gender, race adjective from real `flags` / `urace` / `urole`.

### Moveloop

- [ ] For each `moves` index, replace `fastforward_step` body with real `moveloop_core` RNG from monster moves, timeout, hunger ticks, etc.
- [ ] Delete `fastforward_step` when all steps match C without replay.

### Files to touch (expected)

- [js/allmain.js](../../js/allmain.js), [js/fastforward.js](../../js/fastforward.js), [js/options.js](../../js/options.js), [js/mklev.js](../../js/mklev.js), new modules as needed (`u_init.js`, …).

## Exit criteria

- `fastforward.js` empty or deleted; no seed-specific RNG tables in `js/`.
- `seed8000-tourist-starter` (then others) pass P RNG through chargen and early turns without fastforward.
