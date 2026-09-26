# Review 1782 — 8a86cd50e — rndmonst_adj (D-2823)

- SHA: `8a86cd50e` (coverage; `makemon.c` `rndmonst_adj`)
- Files: `js/makemon.js` only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `rndmonst_adj` in C order: gone species leave the reservoir before `rn2`, a weight outside 0..127 calls `impossible` then stores 0, `align_shift` calls `Is_special`, and the rogue test is `isupper(monsym)`. The diff does that in `rndmonst_adj`, `uncommon`, `align_shift`, and `monsym_isupper`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `rndmonst_adj` | exported sync `makemon.js:602` | `makemon.c:1658–1732` |
| `uncommon` | one local (C `staticfn`) `:468` | `:1592–1603` |
| `align_shift` | one local `:492` | `:1610–1637` |
| `monsym_isupper` | local stand-in for `isupper(monsym(ptr))` `:1251` | `mondata.h:267` plus `isupper` |
| `Is_special` | imported `dungeon.js:2167` | `dungeon.c:1447–1457` |
| `monsym` | imported `display.js:520` | `def_monsyms[(int)ptr->mlet].sym` |
| `montooweak` / `montoostrong` / `monmin_difficulty` / `monmax_difficulty` | imported `monsters.js` | `monst.h` macros; `difficulty` is `difficulties[]` |
| `temperature_shift` / `wrong_elem_type` / `qt_montype` | existing locals | `:1640–1648` and the quest / elemental filters |
| `impossible` | imported async, not awaited | dead for this data (below) |

Callers: `dog.c:130` → `dog.js:213`; `makemon.c:1654` → `rndmonst` `:659`; `mkobj.c:402` → `rndmonnum_adj` `:663`. `uncommon` and `align_shift` have no other C callers.

`sym.mjs`:

```
rndmonst_adj     js/makemon.js:602   sync
uncommon         NOT EXPORTED — 1 local js/makemon.js:468
align_shift      NOT EXPORTED — 1 local js/makemon.js:492
monsym_isupper   NOT EXPORTED — 1 local js/makemon.js:1251
Is_special       js/dungeon.js:2167   sync
                 also locals js/end.js:583 and js/quest.js:52
monsym           js/display.js:520   sync
```

`imports.mjs --can makemon.js dungeon.js Is_special`: already a static import. The `end.js` / `quest.js` `Is_special` locals are not new in this SHA.

## C ↔ JS fidelity

Quest gate: `u.uz.dnum == quest_dnum && rn2(7) && qt_montype()`. `In_quest` (`const.js:3227`) is that `dnum` test. A null return falls through. `rn2(7)` still runs only when the quest test is true, same short-circuit.

Then `level_difficulty`, `monmin_difficulty` (`levdif/6`), `monmax_difficulty` (`(levdif+u.ulevel)/2`), `Is_rogue_level`, `In_endgame && !Is_astralevel`. The loop is `LOW_PM .. SPECIAL_PM-1`. Order inside: too weak/strong, rogue `isupper(monsym)`, elemental, `uncommon`, `Inhell && G_NOHELL`. Weight is `(geno & G_FREQ) + align_shift + temperature_shift` (`G_FREQ` is `0x0007`). Outside 0..127: `impossible` then 0. `weight > 0` then `totalweight += weight` and `rn2(totalweight) < weight` replaces the pick. Final `NON_PM` or `uncommon` returns null. `debugpline1` is empty unless `DEBUG`.

`uncommon`: `G_NOGEN|G_UNIQ`, then `mvitals.mvflags & G_GONE` (`G_GENOD|G_EXTINCT`, `monflag.h:211`, `const.js:749`), then hell returns `maligntyp > A_NEUTRAL` (0), else `(geno & G_HELL) != 0`. Hell is `dungeons[dnum].flags.hellish`. A missing `mvitals` slot reads as 0.

`align_shift`: static `oldmoves` starts at 0. On `moves` change, `Is_special` walks `sp_levchn` with `on_level` (`dungeon.js:1269`, `dungeon.c:1438`). A level change that does not bump `moves` keeps the previous special. Switch: default and `AM_NONE` → 0; lawful `(mal+20)/(2*ALIGNWEIGHT)`; neutral `(20-abs(mal))/ALIGNWEIGHT`; chaotic `-(mal-20)/(2*ALIGNWEIGHT)`. `ALIGNWEIGHT` is 4. `Math.trunc` matches C toward-zero division. `AM_*` matches `align.h:29–32`.

`monsym` is `MLET_CH[mlet]`. A–Z are `S_ANGEL`..`S_ZOMBIE`. `charCode` 65..90 is `isupper` on those symbols. The old `mlet` switch listed that same set.

`G_FREQ` max is 7. The only `maligntyp` values that push weight outside 0..127 are Wizard of Yendor (`-128`) and Nalzok (`-127`). Both have `G_UNIQ`, so `uncommon` returns before the weight arm. The `impossible` call does not run on this data.

## Hallucinations / overclaim

The subject names the null `mons[mndx]` return in `uncommon` (C would dereference), `ulevel ?? 1` inside `monmax_difficulty`, the unawaited `impossible`, and Plan B `Inhell` as `dnum === 1` in `rndmonnum_adj` (`makemon.js:668`), which this SHA does not change. Those match the code. The Wizard/Nalzok claim matches `maligntyps` and `genos`.

## Density

The whole `rndmonst_adj` body, its two static callees, and the three C callers. Not an arm-only port.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify rndmonst_adj --base 8a86cd50e~1 --reach-all`.

```
verify rndmonst_adj: baseline 8a86cd50e~1 (scoreboard at 3c5dbb972) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rndmonst_adj: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2823's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None. Plan B's `dnum === 1` hell test stays in `rndmonnum_adj`, which this commit did not port.

Verdict: **ACCEPT**
