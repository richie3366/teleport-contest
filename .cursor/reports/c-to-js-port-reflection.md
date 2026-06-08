# Port self-reflection (overwrite each pass)

**Last run:** 2026-06-08 (pass 3)  
**Trigger:** ≥5 commits since pass 2 (5× P1 u_init filter/race/role batches).

## Signals (last ~5 batches)

| Signal | Reading |
|--------|---------|
| Changelog | **5× P1 u_init** — unified `ini_inv_mkobj_filter`, `ini_inv_obj_substitution`, PM_ORC `Xtra_food`, PM_ELF `Instrument[]`, Pri/Bar/Val/Hea all-race dispatch — **interleave rule still obeyed** |
| Harness debt | **Unchanged** — no new peels; `LikeC`: monmove **1471**, `m_move_mon` **1354**, dogmove **1340** |
| Checklist | **50 partial, 3 stub, 0 done** — P1 slices land; rows not closed (no “exercised path” criterion yet) |
| Score | **3/44 stable** — **`seed8000`**, **`seed0077`**, **`seed0102`** PASS; full score run 2026-06-08 |
| Locator | **`seed0900` ~2512 → ~2960** (+448 RNG) — fail still **moveloop**, not startup; P1 work not blocking moveloop yet |

## What worked

- **`ini_inv_mkobj_filter` unified** — pass 2 “role-scoped filter” debt closed in batch 1 of this window.
- **Race tails wired** — PM_ORC `Xtra_food`, PM_ELF `Instrument[]`, Val/Ran/Kni subst linkers; C order preserved.
- **Pri/Bar/Val/Hea all-race** — human gate removed; same pattern as Wiz/Hea/Pri from prior slices.

## What drifted

- **8 roles still human-gated** in `u_init_post_mklev.js`: Rog/Sam/Kni/Mon/Arc/Ran/Tou/Cav — C `u_init_role` has **no** human-only `ini_inv` (subs only in `ini_inv_obj_substitution`).
- **Linker `isHuman*ChargenLikeC`** gates may block non-human invent wiring even after RNG dispatch opens.
- Checklist **0 done** — need per-batch “exercised locator + canaries” before flipping rows.

## Decisions (next ~3 batches)

1. **P1 — drop human gates Rog/Sam/Kni/Mon/Arc/Ran/Tou/Cav** — one batch per role group or all eight; locator **`seed0060`** orc Rogue, **`seed0700`** samurai.
2. **P2 — moveloop @ `seed0900` ~2960** — `diag_c_rng_callers` on fail window (not peel).
3. **PostSeventeenth peel delete** — only after (1) or (2); harness net −5 goal unchanged.

## Drop / defer

- ~~Unified filter~~ — done pass 3 window.
- ~~Score milestone dashboard~~ — defer until batch (1) lands or **15** total P1 slices.
- **`seed0006` 3610+** — still forbidden until harness net −5 **and** human gates cleared.

## Oracle hygiene

- **`c-oracles/mkobj.c.md`** — mark filter unified; human-gate list is next row.
- **`monmove.c.md`** — moveloop @ ~2960 is locator for batch (2).

---

**Next reflection due:** after **5** more commits **or** milestone score — whichever comes first. Template: strategy §10.
