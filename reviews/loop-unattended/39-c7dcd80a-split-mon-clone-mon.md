# Review 39 — c7dcd80a — sit `split_mon` monster `clone_mon` (D-1078)

## Metadata
- Full / short hash: `c7dcd80a48791946ab1aa2036ea6277eb39b25e4` / `c7dcd80a`
- Parent: `8d852fa0` (process/cadence docs). JS-touching since last `reviews/loop-unattended/` file (`38-a9e819a4-…`, written in `f79efb4c`): this SHA, then `d7d679c1` D-1079, then `0a4a5df3` D-1080. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 13:15:11 +0200
- D-id: **D-1078**
- Stats: 12 files, +263 / −54 — `js/makemon.js` +147 / −1 (`clone_mon` + `clone_mon_occupied`); `js/sit.js` +29 / −12 (`split_mon` else). Live JS is those two, not a new helper file.
- Claims to close: Open queue `sit.c` `split_mon` monster `clone_mon` arm (JS named omit). Review **38** named omit 1. Stamped **Addressed:** D-1078 on the archive row **and** review **38** with hash `c7dcd80a` (filled by D-1079, not predicted here). `reviews/loop-2026-08-15/` has no open `clone_mon` Must-fix.
- JS / map: `makemon.js` `clone_mon`; `sit.js` `split_mon`. `c-js-map/data.md` sit row names D-1078 and still omits trap rust / `minliquid` / uhitm AD_COLD callers.
- Prior reviews this SHA claims to close: **38** named omit (`sit.c` `split_mon` monster `clone_mon`). Review **16** named the else `return null`.

## Intent vs deliverable

Git subject promises: “Match C split_mon so a non-hero gremlin clone runs clone_mon and halves both max HP.” Body: JS returned null on the monster arm; C `clone_mon` copies without inventory, splits current HP, then `split_mon` halves `mhpmax`.

The queue line was that else arm plus the C home of `clone_mon` (`makemon.c`), not trap/`minliquid`/uhitm call sites, not `cutworm`, not wizard getlin.

The diff **does** that envelope: `makemon.js` `clone_mon` is C `makemon.c:837–943` (occupancy via fmon+worm, `enexto` mutates `mm`, copy without `mextra`/`minvent`, HP half with odd staying, clear isshk/isgd/ispriest, light, christen, luck `rn2`, emin XOR or `tamedog`+edog, `set_malign`+`newsym`). Sit `split_mon` else no longer `return null`; it clamps `mhp`, calls `clone_mon(mon, 0, 0)`, halves both max HP, plines `Monnam` multiplies when `canspotmon`. Hero arm still local `cloneu`.

It does **not** wire trap rust / `minliquid` / uhitm AD_COLD to this `split_mon`. Named. It does **not** port C `place_monster` 2D grid / `impossible()`. Named. Heat reason for a non-youmonst attacker is still `"its"` (`s_suffix(mon_nam)` named). Correct exclusions.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `makemon.js` `clone_mon` | C body, **new** | `makemon.c:837–943`; C home, not a sit-only stub |
| `clone_mon_occupied` | **clone** of `MON_AT` | fmon + `worm_mon_at`; skips steed and `mhp<=0` |
| `enexto` | C callee, **imported** | `teleport.js`; mutates `cc.x/cc.y` like C `&mm` |
| `newemin` / `EMIN` / `has_emin` | C callees, **imported** | existing `makemon.js` / `const.js` |
| `christen_monst` / `shkname` / `MGIVENNAME` | C callees | mutate in place; C reassigns `m2 = christen_monst(...)` to the same pointer |
| `tamedog` | C callee, **dynamic import** | `dog.js` (cycle); after `m2.mtame=0` |
| `set_malign` / `newsym` / `emits_light` / `new_light_source` | C callees | already in `makemon.js` |
| `sit.js` `split_mon` else | C body, **retouched** | `potion.c:2899–2912`; was `return null` |
| `sit.js` `cloneu` | **clone** of `mhitu.c` | hero arm; unchanged |
| `sit.js` `split_mon` | **clone** of `potion.c` | cycle (`eat←potion`, `zap←mhitu`); now exported |
| trap / `minliquid` / uhitm `split_mon` | C other callers, **named omit** | still not this sit clone |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. `mtrack` zeros are C `mon_track_clear` (`MTSZ=4`), not recorded cells.

## Constitution / playbook

Grep of the `js/makemon.js` / `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Contest Rule #2: no Node builtins in scored code. Dynamic `import('./dog.js')` / `import('./makemon.js')` is ESM, not `fs`. Object spread `{ ...mon }` is the JS analog of C `*m2 = *mon`, then the same fields are cleared.

## C ↔ JS fidelity

### `clone_mon` — fail gates, occupancy, `enexto`

C `makemon.c:844–864`: `mhp <= 1` or `mvitals[monsndx].mvflags & G_EXTINCT` → null. `x == 0` → parent `(mx,my)`; else `(x,y)`. `!isok` → `impossible` + null. If `MON_AT` (always true for `x==0`): `enexto(&mm, …) || MON_AT` still occupied → null.

JS `makemon.js:2471–2496`: extra `!mon` → null (C would crash; JS guard). Same `mhp<=1` / `G_EXTINCT` (`data.mndx`). `(x|0)===0` sentinel matches C `coordxy x==0` (column 0 cannot be an explicit clone dest in either). `isok` fail → null without `impossible` (named). `clone_mon_occupied` then `enexto(mm, mm.x, mm.y, mon.data)` — `teleport.js:297–300` **writes** `cc.x/cc.y` (`enexto_core:274–287`). If that write were missing, `x==0` would always fail the second occupancy check. It is not missing. Match.

`clone_mon_occupied` vs C `MON_AT`: walks live `fmon` + worm segs; skips `usteed` and `mhp<=0`. C `MON_AT` is the 2D `place_monster` grid (steed usually not mapped). Analog, named: no 2D grid. Dead-monster skip matches typical `m_at`. Not a silent second lava-style clone of a different predicate.

### Copy, HP, flags, light, name — zero RNG

C `867–907`: `newmonst(); *m2=*mon`; `mextra=0`; prepend `fmon`; `next_ident`; `mx/my`; clear undetected/trapped/cloned/leash; `minvent=0`; `mhpmax` copy; `mhp = mon->mhp/2`; `mon->mhp -= m2->mhp`; clear isshk/isgd/ispriest; `mon_track_clear`; `place_monster`; light if `emits_light`; christen from `has_mgivenname(mon)` else `mon->isshk` / `shkname(mon)`.

JS `2498–2541`: `{ ...mon }` then `mextra=null`, `minvent=null`, `delete m2.edog`, four-zero `mtrack` (`const.js` `MTSZ=4` = C). `fmon.unshift`; `next_ident`; `mx/my`; `mstate=MON_FLOOR` (JS analog of `place_monster`, 2D grid named omit). Same flag clears. `Math.trunc(mhp/2)` is C toward-zero on positive HP (`mhp<=1` already returned). Odd point stays on the original. `isshk` cleared on **clone**; christen still reads **parent** `mon.isshk`. `christen_monst` mutates in place and returns the same object (`do_name.js:269–277`); dropping C’s `m2 = christen_monst(...)` is not a lost allocation. Light: JS calls `emits_light` once and reuses the value; C calls twice. Pure lookup. Match.

### Luck `rn2` — one call, same envelope

C `909–915`: only if `!mon_moving && mon->mpeaceful`. Then `if (mon->mtame) m2->mtame = rn2(max(2+u.uluck,2)) ? mon->mtame : 0;` else if peaceful `m2->mpeaceful = rn2(...) ? 1 : 0`. One `rn2`, not both.

JS `2543–2550`: `luckn = Math.max(2+(uluck|0), 2)` then the same if/else if. `rn2(luckn)` is C `rn2(max(2+uluck,2))`. `mon_moving` skip matches. No extra `d`/`rnd`/`rn1`. Match.

### Minion emin XOR vs tame `tamedog`

C `918–938`: `isminion` takes precedence over tame. `newemin`; copy `*EMIN`; `renegade = (atyp != u.ualign.type) ^ !m2->mpeaceful`. Else if `m2->mtame`: `mtame=0`; if `tamedog(m2, NULL, FALSE)` copy `*EDOG`.

JS `2552–2581`: `newemin`; copy `parentmid`/`min_align`/`renegade` when `has_emin(mon)`; then overwrite renegade with `(atyp !== ual) ^ !m2.mpeaceful` (`^` on booleans → 0/1). C `assert(has_emin(mon))` if `isminion`; JS skips the copy if parent has no emin (defaults then XOR). Named analog, not a sit-gremlin path. Tame: `mtame=0`; `await tamedog(m2, null, false)`; copy `edog` including `ogoal`. Match order. `set_malign` + `newsym` after, no extra RNG in `clone_mon` itself (`set_malign` is pure).

### `split_mon` else — clamp, clone, half max, pline

C `potion.c:2899–2912`:

```
        if (mon->mhp > mon->mhpmax)
            mon->mhp = mon->mhpmax;
        mtmp2 = (mon->mhp > 1) ? clone_mon(mon, 0, 0) : 0;
        if (mtmp2) {
            mtmp2->mhpmax = mon->mhpmax / 2;
            mon->mhpmax -= mtmp2->mhpmax;
            if (canspotmon(mon))
                pline("%s multiplies%s!", Monnam(mon), reason);
        }
```

JS `sit.js:1021–1031`: same clamp, `(mhp>1) ? clone_mon(mon,0,0) : null`, trunc-half both max, `canspotmon` + `Monnam` + `reason`. Hero arm (`mon === youmonst`) still `cloneu` + `u.mh` / `You multiply` (`potion.c:2886–2898`). `reason` for non-youmonst attacker is `"its"` not `s_suffix(mon_nam(mtmp))`. Named. `dosit` passes NULL attacker (empty reason). Match for the sit water-gremlin **hero** path; the **else** is live C for any caller of this clone.

Sit `dosit_in_water` still calls `split_mon(game.youmonst, null)` — hero only. Exporting `split_mon` does not secretly rewire `trap.js` (still “split_mon deferred”) or `mon.js` `minliquid`. Honest D-log. This is not “Match C dispatch, callee is a stub”: `clone_mon` is the C function; the else arm calls it.

Call-for-call RNG in this envelope: `clone_mon` luck `rn2` only when `!mon_moving && mpeaceful`; `split_mon` itself has none; hero `cloneu` unchanged.

### Who calls the else (and who still does not)

C `split_mon` lives in `potion.c`. Sit cannot import `potion.js` (`eat←potion`, `zap←mhitu` cycles) — the local clone is the same reason D-1055 gave. `dosit_in_water` (`sit.js:1042`) still passes `game.youmonst` → **hero** `cloneu`, not this else. That is C `sit.c` gremlin-in-water (`split_mon(&gy.youmonst, NULL)`). The else is for heat/rust/cold on a **monster** gremlin. `trap.js:2661` / `2746` still comments “split_mon deferred” (may still consume `rn2(3)`). `mon.js` `minliquid` still names gremlin `split_mon` omit. `mhitu.js:1300` still defers `split_mon(&youmonst, mtmp)` (hero, not this else). Exporting sit `split_mon` does not rewire those files. The Open line was the JS else `return null` plus C `clone_mon` so a future caller is not a no-op. Honest.

`clone_mon` `x==0` uses the parent cell then `enexto`. Sit always passes `(mon, 0, 0)`. A later trap caller that passed a preferred `(x,y)` would take the else branch of the sentinel (`mm = (x,y)`); if that cell is free, no `enexto`. C same.

`fmon.unshift` before `mx/my` assignment matches C linking then setting coordinates. Single-threaded JS will not observe a duplicate occupancy mid-function. `m2.data` is a shared `permonst` pointer (C copies the pointer in the struct assign). `minvent` nulled so objects do not clone. Worn-slot fields may still alias parent pointers after spread — C `*m2=*mon` does the same before `minvent=0`.

## Hallucinations / overclaim

“Match C split_mon so a non-hero gremlin clone runs clone_mon and halves both max HP” is **true for `makemon.js` `clone_mon` and for the sit `split_mon` else.** It is **not** true that trap rust / `minliquid` / uhitm AD_COLD now split, that C `place_monster` 2D occupancy exists, or that heat text uses `s_suffix(mon_nam)`.

Stamping the Open item **Addressed:** D-1078 `c7dcd80a` is fair for the C home + the sit else that used to return null. Hash is on the archive row (filled by `d7d679c1`).

## Density (§2b)

One Open cluster: C `potion.c` monster `split_mon` plus C `makemon.c` `clone_mon` (the callee the else needed). Review **38** named this, not `is_pool` / Punished ball. ~140 executable lines in `makemon.js` + ~15 in `sit.js`. Whole C function, not “one deferred `if`.” Two files that already sat in a cycle (`sit` cannot import `potion.js`). Related trap callers left named on purpose.

## Verification

Journal: private canary (20→10/10 current, max still 20 until `split_mon` halves both to 10/10; odd stays; `mhp<=1` / `G_EXTINCT` null; named christen; peaceful luck `rn2`; `mon_moving` skip luck; hero `cloneu` 20→10); green+strict seed8000/0900; cohort **15**/15 (8000/0900/1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009) + strict 0014/4500/0360/2200. Path **public-unhit**. Green+cohort is regression cover for `makemon`/`sit`, not a public gremlin-split proof. Cadence **#1375** (this audit) **44**/44 after this SHA and D-1079/D-1080.

C read of `makemon.c:837–943`, `potion.c:2873–2914`, `monmove.c:89–91` (`mon_track_clear`), `teleport.js` `enexto`; JS `makemon.js:2471–2597`, `sit.js:1001–1032`, `do_name.js:269–277`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal; this audit did not re-run the node harness, cadence **#1375** is the public fortress):

| Case | C | JS after |
|------|---|---------|
| `clone_mon` 20 HP / 20 max, empty xy | both 10 current; max still 20 | **same** until `split_mon` |
| then `split_mon` else | both max 10 | **both max 10** |
| odd current (e.g. 21) | original keeps 11 | **trunc** match |
| `mhp<=1` or `G_EXTINCT` | null | **null** |
| `!mon_moving && mpeaceful` | one `rn2(max(2+uluck,2))` | **one `rn2`** |
| `mon_moving` | no luck `rn2` | **skip** |
| hero `youmonst` | `cloneu` / `u.mh` | **unchanged** |

`enexto` failure (no `goodpos`) returns null without placing a ghost `fmon` entry — JS only `unshift`s after occupancy succeeds. Match.

## Actionable C-wrongs

None that Must-fix this next iter. `clone_mon` and the sit else match C at the locus this SHA claimed.

Named omits / do-nots (map / Open, not Must-fix):

1. trap rust / `minliquid` / uhitm AD_COLD `split_mon` call sites. **Addressed:** D-1095 `a86a7111`. Drown/`mhitu`/mhitm/cmd still named.
2. Heat reason `s_suffix(mon_nam(mtmp))` still `"its"`; C `place_monster` 2D grid / `impossible()`; long-worm `cutworm`.
3. Do not pull `peace_minded` `msound` / `u_entered_shop` / `is_pool` DRAWBRIDGE_UP into a clone peel.

Do not restore sit `split_mon` monster `return null`. Do not skip `clone_mon` HP half before `split_mon` max half. Do not import `monmove.js` `sticks` for unrelated sit work.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `makemon.js` `clone_mon` follows C `makemon.c` (including `enexto` mutation and one luck `rn2`), and sit `split_mon` else now calls it and halves both max HP instead of returning null.
- Must-fix stays empty for this SHA; trap/`minliquid`/uhitm callers stay named.
