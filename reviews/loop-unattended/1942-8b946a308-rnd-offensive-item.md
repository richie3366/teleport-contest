# Review 1942 — 8b946a308 — rnd_offensive_item (D-2983)

- SHA: `8b946a308` (coverage; `muse.c` `rnd_offensive_item`; case 0 now calls the real helmet helpers)
- Files: `js/makemon.js` (`+51/−48`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward` in the `js/` hunk. Rule #2 on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (deleted locals and the imports that replace them):

```
rnd_offensive_item js/makemon.js:2238   sync
which_armor      js/worn.js:418   sync
             !! ALSO 2 LOCAL CLONE(S): js/sit.js:211  js/trap.js:3792
hard_helmet      js/do_wear.js:251   sync
which_armor_local NOT EXPORTED — 1 LOCAL CLONE: js/mklev.js:27388
hard_helmet_local NOT FOUND
```

`--can js/makemon.js js/do_wear.js hard_helmet` prints `ALREADY` (the new import is the static edge). `which_armor` was already imported from `worn.js`. This function does not call the `mklev.js` / `sit.js` / `trap.js` clones.

## Intent vs deliverable

Subject: case 0 used a minvent-only `which_armor_local` and a `hard_helmet_local` that treated `oc_armcat` as a helm and a hand-rolled iron–mithril range.

The diff deletes those two locals, imports `hard_helmet`, and calls `which_armor(mtmp, W_ARMH)` then `hard_helmet`. The switch returns are the same otyps as before, rewritten as one return per case.

## Inventory

| JS | Class | C |
|----|-------|---|
| `rnd_offensive_item` | live sync `makemon.js:2238` | `muse.c:2035–2081` |
| `which_armor` | imported `worn.js:418` | `worn.c:1005–1036` |
| `hard_helmet` | imported `do_wear.js:251` | `do_wear.c:567–573` |
| `attacktype` | file-local `makemon.js:2756` | `mondata.c:53–57` |
| `mon_difficulty` | imported `monsters.js:877` | `mons[monsndx(pm)].difficulty` |
| deleted `which_armor_local` / `hard_helmet_local` | clones removed from this file | subsets of the two helpers |

## C ↔ JS fidelity

RNG order matches `muse.c:2041–2045`. Animals, `AT_EXPL` (13, `monattk.h:23`), mindless, `S_GHOST`, and `S_KOP` return 0 with no `rn2`. `mlets[]` stores those symbol names, so `pm.mlet === 'S_GHOST'` is the C `pm->mlet == S_GHOST` test in this port. Then `difficulty > 7 && !rn2(35)` returns `WAN_DEATH` (the `rn2` is not called when difficulty is 7 or less). The switch argument is `rn2(9 - (difficulty < 4) + 4 * (difficulty > 6))`. Relations are 0/1 in both.

Case 0 (`muse.c:2046–2052`): `which_armor(mtmp, W_ARMH)`, then `SCR_EARTH` if `hard_helmet` or amorphous / passes walls / noncorporeal / unsolid. No `return` otherwise, so control falls into case 1 `WAN_STRIKING`. JS has no `break` in case 0. Cases 2–6 are the potions, 7 and 8 share `WAN_MAGIC_MISSILE`, 9–12 are the wands, and the trailing `return 0` is `/*NOTREACHED*/`.

`which_armor` (`worn.js:418–438`) returns `u.uarmh` for `youmonst` and otherwise the first `minvent` object whose `owornmask` has the bit. `hard_helmet` (`do_wear.js:251–253`) is `!obj || !is_helmet` then `is_metallic || is_crackable`, which is `do_wear.c:570–572`. `is_metallic` and `is_crackable` are the `mkobj.js` imports. `mon_difficulty` reads `difficulties[mndx]`, and `adj_erinys` writes `difficulties[PM_ERINYS]` (`monsters.js:295`), so the erinys update is visible. `monsndx` is `pm->pmidx`; JS passes `pm.mndx`.

File-local `attacktype` walks `mattk` for `aatyp`. C `attacktype` is `attacktype_fordmg(ptr, atyp, AD_ANY)` (`mondata.c:41–48`), which is the same `aatyp` test across `NATTK` slots. There is no exported `attacktype`. The array `mattks[mndx]` is that table.

Callers: `makemon.c:570–571` is `(int) m_lev > rn2(75)` then `mongets`. JS `makemon.js:2734` is that gate. `mplayer.c:305–307` is `rnd(3)` times `mongets`. JS `mplayer.js:316` is that loop. `extern.h:2063` is the prototype.

## Hallucinations / overclaim

The subject matches case 0 and the deleted locals in this file. "No arm omitted" matches the switch, including fallthrough and `/*NOTREACHED*/`. `which_armor_local` still exists in `mklev.js`; this function does not call it, and the subject does not say every clone in the tree is gone. `sit.js` and `trap.js` `which_armor` clones are the same leftover. Ledger is `muse.c`.

## Density

The whole 47-line C function shipped. The diff is the helper swap plus the same returns, not a second subsystem.

## Verification

```
verify rnd_offensive_item: baseline 8b946a308~1 (scoreboard at 7040c7cd0, 2026-09-27T16:53:07.296Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify rnd_offensive_item: no corpus session is blocked on it at 8b946a308~1 — a vacuous verify is NOT a corpus PASS. ...
smoke rnd_offensive_item: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2983 records green 2/2, strict ×2, cohort 7/7, full 44/44 (`makemon.js` is shared). This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
