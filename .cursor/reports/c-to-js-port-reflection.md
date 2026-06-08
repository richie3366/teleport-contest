# Port self-reflection (overwrite each pass)

**Last run:** 2026-06-08 (pass 4)  
**Trigger:** ≥5 commits since pass 3 (5× P1 u_init human-gate + linker batches); milestone score fold-in.

## Signals (last ~5 batches)

| Signal | Reading |
|--------|---------|
| Changelog | **5× P1 u_init** — Rog/Sam/Kni/Mon/Arc/Ran/Tou/Cav all-race dispatch; PM_ORC `Xtra_food` + PM_ELF `Instrument[]` invent tails; Priest/Hea/Bar/Val linker all-race — **P1 u_init slice largely closed** |
| Harness debt | **Unchanged** — no new peels; `LikeC`: monmove **1471**, `m_move_mon` **1354**, dogmove **1340** |
| Checklist | **50 partial, 3 stub, 0 done** — u_init rows still not flipped (no exercised-path closure criterion) |
| Score | **3/44 stable** — **`seed8000`**, **`seed0077`**, **`seed0102`** PASS; full score 2026-06-08 |
| Locator | **`seed0900` ~2960** moveloop (unchanged); **`seed0016` ~1281** mklev mineralize; **`seed0060` ~1036** moveloop |

## What worked

- **Human-gate debt cleared** — `u_init_post_mklev.js` has no `humanIdx`; all roles dispatch race-independent like C.
- **Race invent tails wired** — orc `Xtra_food`, elf `Instrument[]` prepend after role pack.
- **Linker gates role-only** — `isHuman*ChargenLikeC` names are legacy; checks are `urole.abbr` only (e.g. Rog, Wiz).

## What drifted

- **P1-only marathon** — 10+ consecutive u_init batches since peel interleave; moveloop/mklev locators unchanged.
- **`isHuman*ChargenLikeC` naming** — misleading; rename to `is*ChargenLikeC` when touching linkers (low priority).
- Checklist **0 done** — need per-batch exercised locator + canaries before flipping rows.

## Decisions (next ~3 batches)

1. **P2 — moveloop @ `seed0900` ~2960** — `diag_c_rng_callers` on fail window; **not** peel. Oracle: `monmove.c.md`.
2. **P1 — mklev `mfndpos` / mineralize @ `seed0016` ~1281** — `rn2(100)` floor fill. Oracle: `mkobj.c.md`.
3. **P2 — `dog_goal` @ `seed0077` ~3205** — C `dogmove.c`, not `PendingLikeC` peel.

**Defer:** PostSeventeenth peel delete until (1) or (2) lands; `seed0006` 3610+ still forbidden.

## Drop / defer

- ~~Human gates Rog…Cav~~ — done pass 4 window.
- ~~PM_ORC/ELF race tails~~ — done.
- **Score milestone dashboard** — defer until moveloop or mklev batch moves a locator.

## Oracle hygiene

- **`mkobj.c.md`** — mark u_init human-gate debt **closed**; next row = mklev mineralize ~1281.
- **`monmove.c.md`** — `seed0900` ~2960 is primary locator for batch (1).

---

**Next reflection due:** after **5** more commits **or** milestone score — whichever comes first. Template: strategy §10.
