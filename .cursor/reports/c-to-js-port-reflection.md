# Port self-reflection (overwrite each pass)

**Last run:** 2026-06-08 (pass 2)  
**Trigger:** ≥5 commits since pass 1 (5× P1 mkobj/ini_inv batches).

## Signals (last ~5 batches)

| Signal | Reading |
|--------|---------|
| Changelog | **5× P1** — `rndmonnum_adj`, STATUE/BELL, `mkobj_erosions`, `oartifact`, `trquan`/`ini_inv_adjust_obj` — **interleave rule obeyed** |
| Harness debt | **Unchanged** — no new peels; `LikeC`: monmove **1471**, `m_move_mon` **1354**, dogmove **1340** |
| Checklist | **49 partial, 0 done** — P1 slices land but rows not closed |
| Score | **2/44 → 3/44** — **`seed0102` PASS** (4485 RNG); canaries **`seed8000`**, **`seed0077`** still PASS |
| Locator | **`seed0900` ~2512 → ~2960** (+448 RNG) — fail still **moveloop**, not startup |

## What worked

- **P1 interleave** after peel batches 1–10 — lane drift fixed.
- **`oartifact`** on `struct obj` vs `artif` param — oracle wrong-hypothesis caught early.
- **`seed0102` full PASS** — ranger chargen + invent anchor stable.

## What drifted

- P1 work still **role-scoped** (`Wizard`/`Priest`/`Monk` filters) — C has **one** `ini_inv_mkobj_filter()`; unify next.
- **`gn.nocreate*`** reject arms in filter while-loop not fully wired for all roles.
- Checklist rows never flip **done** — need explicit “exercised path” criterion per batch.

## Decisions (next ~3 batches)

1. **P1 — general `ini_inv_mkobj_filter`** — one C function, `gn` nocreate + orc poison + monk scroll + spell level/restricted; locator **`seed0900`** startup + **`seed0012`** monk.
2. **P2 — moveloop @ `seed0900` ~2960** — `diag_c_rng_callers` on fail window (not peel).
3. **PostSeventeenth peel delete** — only after (1) or (2) lands; harness net −5 goal unchanged.

## Drop / defer

- ~~Peel before P1~~ — still forbidden.
- ~~Score milestone dashboard~~ — defer until batch (1) or **10** total P1 slices.
- **`seed0006` 3610+** — still forbidden until harness net −5 **and** P1 filter unified.

## Oracle hygiene

- **`c-oracles/mkobj.c.md`** — add `ini_inv_mkobj_filter` while-loop + `gn.nocreate*` as next row.
- **`monmove.c.md`** — unchanged; moveloop fail is locator for batch (2).

---

**Next reflection due:** after **5** more commits **or** milestone score — whichever comes first. Template: strategy §10.
