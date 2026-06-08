# Port self-reflection (overwrite each pass)

**Last run:** 2026-06-09 (pass 5)  
**Trigger:** ≥5 commits since pass 4 (5× P1 mklev/mkobj/u_init/trap); `seed0016` locator crossed mklev → moveloop.

## Signals (last ~5 batches)

| Signal | Reading |
|--------|---------|
| Changelog | **5× P1** — `setgemprobs`+`oinit`, vault **`fill_special_room`**, **`hole_destination`**, Healer **`ini_inv` quan**, supply-chest **`add_to_container`** — mklev fill chain largely wired; u_init Healer tail closed |
| Harness debt | **Unchanged** — no new peels; `LikeC`: monmove **1471**, `m_move_mon` **1354**, dogmove **1340** |
| Checklist | **50 partial, 3 stub, 0 done** — mklev rows advancing but no exercised-path closure flip |
| Score | **3/44 stable** — **`seed8000`**, **`seed0077`**, **`seed0102`** PASS |
| Locator | **`seed0016` ~2493** moveloop eat (was **~1281** mklev at pass 4) — **+1200 RNG** mklev/u_init progress; **`seed0900` ~2960** moveloop unchanged |

## What worked

- **P1 interleave obeyed** — no peel marathon; mklev + u_init + trap in C dependency order.
- **`seed0016` mklev chain** — vault gold → fill_ordinary supply chest → Healer invent → now moveloop eat blocker (real subsystem shift).
- **Gem `oinit`** — `setgemprobsLikeC` landed; gem total still **923** vs C **1000** (known gap).

## What drifted

- **`current.md` #1 vs reflection pass 4** — pass 4 prioritized P2 `seed0900` ~2960 first; mklev batches were correct interleave but moveloop locators stale until `seed0016` eat surfaced.
- **`fill_zoo`/`stock_room`** — stubs since vault batch; zoo/shop levels still diverge.
- Checklist **0 done** — need locator window pass + canaries before flipping rows.

## Decisions (next ~3 batches)

1. **P1 — `fill_zoo` / `stock_room`** — `fillSpecialRoomLikeC` stubs (`mklev.js`); oracle [`sp_lev.c.md`](c-oracles/sp_lev.c.md). **Not** PostSeventeenth peel.
2. **P1 — mineralize** — wire **`mkobjPickGemOtypMklevLikeC`** when gem total **923**→**1000** aligned (`mkobj.c.md`).
3. **P2 — moveloop @ `seed0016` ~2493** — eat apple / `next_ident`; then **`seed0900` ~2960** — `diag_c_rng_callers`; **not** peel.

**Defer:** PostSeventeenth peel delete until (1) or (3) lands; `seed0006` 3610+ still forbidden.

## Drop / defer

- ~~P1 u_init human-gate~~ — closed pass 4.
- ~~`seed0016` ~1281 mklev vault/ordinary~~ — crossed; new primary locator **~2493**.
- **Full `npm run score`** — defer until moveloop batch moves anchor or gem total parity.

## Oracle hygiene

- **`sp_lev.c.md`** — vault done; next row = **`fill_zoo`** / **`stock_room`** stubs.
- **`mkobj.c.md`** — supply chest **`add_to_container`** done; mineralize + gem total **923** gap remain.
- **`monmove.c.md`** — **`seed0016` ~2493** eat is new primary moveloop locator (was **`seed0900` ~2960** only).

---

**Next reflection due:** after **5** more commits **or** milestone score — whichever comes first. Template: strategy §10.
