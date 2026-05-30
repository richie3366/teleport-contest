# NetHack C→JS — **function checklist**

**Purpose:** Track **C symbols** and call graphs as they move from missing → faithful JS. Use with the [**batch port workflow**](c-to-js-port-batch-workflow.md): pick a **batch** (rows in one C file / one chain), port, fast-verify, commit, **`npm run score` at milestones**.

**Do not duplicate** the narrative in [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) — that file explains *why* gaps matter; this file is the *checklist* agents update row-by-row.

**Ground truth:** `nethack-c/upstream/src/*.c` (NetHack 5.0.0 tag). **Status** reflects contest `js/` today; refresh when you close a batch.

---

## Status legend

| Status | Meaning |
|--------|---------|
| **missing** | No meaningful JS; or only a distant stub |
| **stub** | JS exists but wrong semantics / harness replay / fixed outputs |
| **partial** | Real C port started; known RNG or branch gaps remain |
| **done** | Faithful enough for current milestone; no known wrong RNG on exercised paths |

**Notes column:** JS module(s), blocker, or “verify with `diag_rng_window` session X @ N”.

---

## How to maintain

1. When starting a batch, set rows to **partial** if needed.
2. When the batch is committed, set to **done** or leave **partial** with a short note.
3. Add rows when you discover an unlisted C entry point (keep grouped by **C file**).
4. Optional: `rg '^staticfn|^struct obj \*|^[a-z].*\(' nethack-c/upstream/src/foo.c` to enumerate more symbols in a file.

---

## Milestone map (batch targets)

Align batches with [`c-to-js-port-remaining.md`](c-to-js-port-remaining.md) §5:

| # | Milestone | Primary C files (checklist sections below) |
|---|-----------|---------------------------------------------|
| 1 | Startup / shrink replay | `u_init.c`, `o_init.c`, `dungeon.c`, `u_init_post_mklev` bridge |
| 2 | `invent` + `mkobj` + `ini_inv` | `mkobj.c`, `invent.c`, `u_init.c` |
| 3 | Monster turn | `monmove.c`, `mon.c`, `dog.c` |
| 4 | Moveloop tail | `allmain.c` |
| 5 | Commands | `cmd.c`, `do.c`, … |
| 6 | Combat | `uhitm.c`, `mhitu.c`, `weapon.c` |
| 7 | Branches / Lua | `sp_lev.c`, `nhlua.c`, `dungeon.c` |
| 8 | Save / display hardening | `save.c`, `botl.c`, … |

---

## `mkobj.c` (milestone 2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `mkobj` / `mksobj` / `mksobj_init` | `mkobj_mklev_like_c.js`, `mklev.js` | partial | Class pick, init tails; erosion/poison gates improving |
| `may_generate_eroded` / `mkobj_erosions` | `mkobj_mklev_like_c.js` | partial | C `is_flammable`/`is_rottable`/… + gated `rn2(80)`; chest `tknown` order; **1425+** mklev |
| `mkobj` oclass prob walk | `mkobj_mklev_like_c.js`, `mkobj_mklev_oc_prob_data.js` | partial | **AMULET**/**COIN** full walks; other classes use row tables |
| `mkcorpstat` | `mklev.js` | partial | CORPSE init + ptr override; verify rndmonnum when pm fixed |
| `mkobj_aleave` / shop specials | — | missing | |
| `mk_artifact` / `mk_ego` | stubs in init | stub | |
| Container / `mkbox` contents | `mkobj_mklev_like_c.js` | partial | `mkboxCntsMklevLikeC` |

---

## `mklev.c` (milestone 1–2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `mklev` / `makelevel` | `mklev.js` | partial | |
| `fill_ordinary_room` | `mklev.js` | partial | |
| `mktrap` / `traptype_rnd` | `mklev.js` | partial | |
| `mktrap_victim` | `mklev.js` | partial | possession loop, corpse; RNG fork ~2358 on `seed0900` |
| `mkgrave` / `mkfount` | `mklev.js` | partial | `level_difficulty` for grave gold |
| `mineralize` / `setgemprobs` | `mklev.js` | partial | |

---

## `u_init.c` / chargen (milestone 1–2)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `u_init` / role identity | `chargen*.js`, `u_init_*.js` | partial | |
| `ini_inv` | `ini_inv_stub.js`, role packs | stub | Real invent graph + ordering |
| `u_init_role` RNG tail | `u_init_role_rng.js`, `u_init_post_mklev.js` | partial | |
| `wintty.c` pickers | `chargen_tty.js` | partial | `seed0077` PASS; others partial |

---

## `monmove.c` / `dog.c` (milestone 3)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `movemon` / `dochug` | `monmove.js`, `fmon_iter.js` | partial | Harness `stepNum` on canary paths |
| `m_move` / `mfndpos` | `m_move_mon.js`, `mfndpos.js` | partial | |
| `distfleeck` | `distfleeck_mon.js` | partial | |
| `m_throw` | — | missing | |
| `dogmove` | `dogmove_mon.js` | partial | Capital `K` slices |

---

## `allmain.c` (milestone 4)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `moveloop` / post-hero `movemon` | `moveloop_aux.js` | stub | Condition-shaped replay vs C tail |
| `dosounds` / exercise hooks | `moveloop_aux.js` | stub | |

---

## `dungeon.c` / specials (milestone 7)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `init_dungeons` | `dungeon_init.js` | partial | |
| `place_level` / `sp_levchn` | `sp_levchn.js` | stub | |
| `load_lua` / `lspo_*` | `nhl_lua.js`, `des_api.js` | partial | See `nhl-port-notes.md` |

---

## `cmd.c` / `do.c` (milestone 5)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| Movement / `domove` | `cmd.js`, `domove_hero.js` | partial | |
| `#` extcmd subset | `extcmd.js` | partial | |
| General `do` / apply / read / … | scattered | missing | |

---

## Combat (milestone 6)

| C symbol / area | JS module | Status | Notes |
|-----------------|-----------|--------|-------|
| `uhitm` / `mhitu` | `attack.js` | stub | `1+rn2(4)` placeholder |
| `find_ac` / to-hit | `display.js`, … | partial | Botl on some sessions |

---

## Adding more rows

For each upstream `src/*.c` not listed above:

1. Add a `## \`file.c\`` section.
2. List **entry points** (`staticfn` that matter for RNG, or exported functions).
3. Link the best existing `js/*.js` file or mark **missing**.

Prefer **call-graph batches** (caller + callees) over alphabetical single functions.

---

## Related

- [Batch workflow](c-to-js-port-batch-workflow.md)
- [Current handoff](c-to-js-port-current.md)
- [Gap inventory](c-to-js-port-remaining.md)
