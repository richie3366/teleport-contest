# C oracle: dogmove.c

**JS modules:** `dogmove_mon.js`, `dogmove_reach.js`, `dogmove_mon.js` (pet pick / `mfndpos`)  
**Phase:** P2  
**C path:** `nethack-c/upstream/src/dogmove.c`  
**Last C read:** 2026-06-08 — `dog_goal`, `dog_move`, twin `#search` paths

## Call order (ground truth)

1. `dog_goal` — floor scan, `rn2(8)` apport gate, invent prescan order matters.
2. `dog_move` — `mfndpos` away picks (`rn2(12)` / `chcnt` ties); `whappr` can skip away RNG.
3. Twin `#search` (ranger): pass-2 inline pet path; towel APPORT before floor `rn2(8)` on second pass (`seed0102` ~4473).
4. Post-gate rogue first `#search`: invent `obj_resists` before towel APPORT restore (`seed0077` ~3217).

## Peels to DELETE

| JS flag / band | C equivalent | Locator | Status |
|----------------|--------------|---------|--------|
| `dogMoveCommaPost*NewturnPet*` | `dog_move` after specific `movemon` pass | `seed0006` | open — fold into `dog_move` entry |
| `_rangerSearchPass2Inline*` | second `#search` `dogmove.c` loop | `seed0102` | partial |
| `_searchApportTowelXYLikeC` | towel apport pin on second search | `seed0077`, `seed0102` | partial |

## Wrong hypotheses

- Cached `appr` from earlier `dog_goal` always applies to post-newturn `mfndpos` — C can use `appr==0` for `chcnt` ties (`seed0006` `L` tail).
