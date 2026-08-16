# Review 54 — e0b68f1d — `dogmove` pal/target numeric `ptr.msound` (D-1093)

## Metadata
- Full / short hash: `e0b68f1df962a346089be731d414ecee229778ed` / `e0b68f1d`
- Parent: `685625fb` (review **50–53** of D-1089–D-1092; Must-fix empty; next Open was this pal/target line). JS-touching since last `reviews/loop-unattended/` file creation (`685625fb`): **this SHA**, then D-1094 / D-1095 / D-1096. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 17:44:06 +0200
- D-id: **D-1093**
- Stats: 14 files, +114 / −52 — `js/dogmove.js` +21 / −11 (`MS_LEADER=36` / `MS_GUARDIAN=38` + three comparison sites).
- Claims to close: Open queue `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (named from D-1053 review **14**). Stamped **Addressed:** D-1093 on the archive row **without** the short hash (chicken-egg). D-1094 filled `e0b68f1d`. `reviews/loop-2026-08-15/` has no open dogmove-msound Must-fix.
- JS / map: `dogmove.js` `find_friends` / `score_targ` / `dog_move` ALLOW_M balk. `c-js-map/turns.md` dog row names D-1093. `perceives` invis-tame pal, `score_targ` conf/`Is_qstart`/faith, melee `haseyes`/`mon_reflects`/`touch_petrifies` still named.
- Prior reviews this SHA claims to close: **14** leftover string clone; **40** named omit 2; **49** named omit 3; **53** named omit 1 and “next Open dogmove”.

## Intent vs deliverable

Git subject promises: “Match C dogmove.c so pets treat quest leaders and guardians by numeric msound, not the string 'MS_LEADER'.”

After D-1053, `mons().msound` is `monflag.h` numbers. Old JS compared that field to `'MS_LEADER'` / `'MS_GUARDIAN'`. Numeric 36/38 never equals those strings, so pets never palled a quest leader, never scored −5000, never balked at attacking a peaceful leader/guardian.

The diff **does** those three tests: local `MS_LEADER=36` / `MS_GUARDIAN=38`; `(pal.data?.msound | 0)` in `find_friends` else; same in `score_targ` early −5000; same in `dog_move` ALLOW_M continue. Source grep has no remaining string compares.

It does **not** add C `perceives(mtmp->data)` on invisible tame pals (`find_friends` still `if (!pal.minvis)`). Named. It does **not** wrap `score_targ` −5000 in C’s `!mconf || !rn2(3) || Is_qstart`. Named, and now **live** (see fidelity). It does **not** port faith/AT_NONE/vampshifter scoring or melee `haseyes`/`mon_reflects`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `find_friends` leader/guardian else | C body, **retouched** | `dogmove.c:726–730` |
| `score_targ` −5000 | C body, **retouched** | `dogmove.c:766–769`; JS sits **outside** C’s conf wrap |
| `dog_move` ALLOW_M balk | C body, **retouched** | `dogmove.c:1124–1127` |
| `MS_LEADER` / `MS_GUARDIAN` | **clone** of `monflag.h:51–53` | 36 / 38; same as `makemon.js` / `sounds.js` |
| `perceives` invis-tame pal | C sibling, **named omit** | still `!minvis` only |
| `score_targ` conf / `Is_qstart` / faith | C envelope, **named omit** | pre-existing partial clone; −5000 now fires always |
| melee `haseyes` / `mon_reflects` / `touch_petrifies` | C sibling, **named omit** | eye/cube continue still thinner |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** in the three tests (C has none there). `score_targ` still ends with `rnd(5)` / conf `rn2(3)` on the non-early-out path — unchanged this SHA, still not C’s wrap.

## Constitution / playbook

Grep of the `js/dogmove.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `MS_LEADER=36` is `monflag.h`, not a seed-shaped quest table. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### `find_friends` — tame pal vs quest pal

C `dogmove.c:721–731`:

```
        if (pal) {
            if (pal->mtame) {
                if (!pal->minvis || perceives(mtmp->data))
                    return 1;
            } else {
                if (pal->data->msound == MS_LEADER
                    || pal->data->msound == MS_GUARDIAN)
                    return 1;
            }
        }
```

JS `dogmove.js:710–718`: tame arm still `if (!pal.minvis) return 1` (no `perceives`). Else: `ms = pal.data?.msound | 0`; `ms === 36 || ms === 38` → return 1. The **else** matches C. Invisible tame pal still missed — pre-existing, named, not this subject. `| 0` on a stub without `msound` is 0, not a false pal. Stock Twoflower/Carnarvon/Arch Priest extract as 36; student/attendant as 38. Jackal/nemesis/shopkeeper are not. Match for the claimed else.

Loop, `m_cansee` cut, `mux/muy` “thinks you’re here” unchanged. No `rn2` in `find_friends`. C same.

JS `isok` analog is `curx < 1 || curx >= COLNO || cury < 0 || cury >= ROWNO` (`dogmove.js:706`) vs C `isok(curx, cury)`. Pre-existing; this SHA did not retouch the walk. `sgn` / `distmin` start from the **target** cell and step outward like C `694–704`. A pal standing on the target cell is **not** checked (C increments before `m_at`). Match.

### `score_targ` −5000 — live, wrong envelope

C `dogmove.c:746–769`:

```
    if (!mtmp->mconf || !rn2(3) || Is_qstart(&u.uz)) {
        … faith align1/align2 …
        if (mtarg->data->msound == MS_LEADER
            || mtarg->data->msound == MS_GUARDIAN)
            return -5000L;
```

A **confused** pet on a non-quest-start level with `rn2(3)==0` **skips** the whole block, including −5000, and may score the leader as a normal target (later `rnd(5)` fuzz).

JS `dogmove.js:727–732` returns −5000 **unconditionally** at the top, then adjacent −3000, then tame/you −3000, then `find_friends` −3000, then `rnd(5)`, then `if (mtmp.mconf && !rn2(3)) score -= 1000`. That structure is the pre-existing partial clone. This SHA only replaced the dead string test with a live numeric one **in that wrong slot**.

Call-for-call vs C for a **non-confused** pet: both return −5000 with **zero** RNG. Match. For a **confused** pet not on `Is_qstart`: C may burn `rn2(3)` in the wrap (and skip −5000); JS never burns that wrap `rn2` and always −5000. That is a remaining clone divergence. D-log named it “not this iter.” It is now **observable** because the test is no longer dead. Map / later Open, not a Must-fix onto kill_eggs: the queue line was the comparison, and the rest of `score_targ` was already not C.

Faith `isminion`/`ispriest` −5000 is still absent. Adjacent / tame / `find_friends` early-outs still skip `rnd(5)` like the old JS, which is closer to C’s early `return score` than to “always `rnd(5)`.” Not this SHA.

`best_target` still calls `score_targ` for each `find_targ` in the 3×3 ring (`dogmove.js:763–770`). C `best_target` does the same (`dogmove.c:871`). Making −5000 live means a pet looking along a ray at Twoflower now gets `bestscore=-5000` and, unless `forced`, `best_targ=null` (`!forced && bestscore < 0`). Old JS scored Twoflower like a jackal (`rnd(5)` path). That is the ranged-attk pal fix. Confused-pet forced fire at a leader remains the wrap debt.

### `dog_move` ALLOW_M balk

C `dogmove.c:1121–1128`:

```
            if ((int) mtmp2->m_lev >= balk
                || (mtmp2->mtame && mtmp->mtame && !Conflict)
                || (max_passive_dmg(mtmp2, mtmp) >= mtmp->mhp)
                || ((mtmp->mhp * 4 < mtmp->mhpmax
                     || mtmp2->data->msound == MS_GUARDIAN
                     || mtmp2->data->msound == MS_LEADER)
                    && mtmp2->mpeaceful && !Conflict)) {
                continue;
            }
```

JS `dogmove.js:872–878`: same four disjuncts; same grouping of low-HP **or** guardian **or** leader, then `mpeaceful && !Conflict`. Numeric compare. `balk` formula unchanged. No extra `rn2` here. Eye/cube `rn2(10)` after this gate is still thinner (`haseyes`/`mon_reflects` named). Match for the claimed msound conjunct.

A peaceful Arch Priest (`MS_LEADER=36`) now continues (balk) when the pet is under 25% HP **or always** (leader msound), if `!Conflict`. Old JS never took the msound arm. C always did. That is the live fix.

## Hallucinations / overclaim

“Match C dogmove.c so pets treat quest leaders and guardians by numeric msound” is **true for the three comparisons and for non-confused −5000 / pal / balk.** It is **not** true that `score_targ` as a function matches C (conf wrap, faith, `Is_qstart`), that invisible tame pals use `perceives`, or that melee eye/cube/stone gates are C.

This is **not** “Match C dispatch, callee is a stub.” There is no new callee. `msound` is the extracted field. Stamping **Addressed:** D-1093 is fair for the Open line. Hash `e0b68f1d` is on the archive row (filled by D-1094).

## Density (§2b)

One Open cluster: three sites that were the same dead string clone. ~15 executable lines. Small, but it **is** the whole remaining gap of those tests (the rest of `score_targ` / `find_friends` was already named). Not “finish `dogmove.c`.” Not a sit one-bullet peel. Sibling wrap left named on purpose.

## Verification

Journal: private canary **12**/12 (Twoflower/Carnarvon/Arch Priest 36 pal; student/attendant 38 pal; jackal/nemesis/ant/shopkeeper/little-dog not; stub/string not pal; source has no string compares); green+strict seed8000/0900; cohort **12**/12 (1800/1500/0004/0360/0367/0014/2200/0399/0106/0012/0007/0361) + strict 1800/0004/0367/0360/0014/2200/0361. Path **public-unhit** (quest pal on a ray / peaceful leader melee). Green+cohort is regression cover, not a public pal proof. Cadence **#1395** (this audit) **44**/44.

C read of `dogmove.c:694–735` / `738–769` / `1102–1128`, `monflag.h:51–53`; JS `dogmove.js:43–45` / `710–753` / `866–878`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| non-conf pet, target `msound==36` | −5000, no RNG | **same** |
| conf pet, `rn2(3)==0`, not qstart, leader | wrap skip; may target | **still −5000** (named wrap) |
| pal Twoflower on ray | return 1 | **return 1** |
| pal string `'MS_LEADER'` | never (field is int) | **never** |
| peaceful leader ALLOW_M | continue | **continue** |
| hostile jackal | no pal / no −5000 / no msound balk | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The three comparisons match `dogmove.c` numbers.

Named omits / do-nots (map / Open, not Must-fix):

1. `score_targ` −5000 must sit inside `!mconf \|\| !rn2(3) \|\| Is_qstart` like `dogmove.c:746–769`. Do not “fix” it by deleting −5000. Faith/AT_NONE/vampshifter still named with that envelope.
2. `find_friends` tame pal: `!minvis \|\| perceives(mtmp.data)` (`mondata.c` `perceives`).
3. Melee `haseyes` / `mon_reflects` / `touch_petrifies` after ALLOW_M. MS_NEMESIS mitem **Addressed:** D-1094 `46775b20`.

Do not restore string `'MS_LEADER'`. Do not import `peace_minded` into pal tests. Do not treat `ptr.msound|0` on a missing field as a pal.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: the three pal/target tests now compare `monflag.h` 36/38 like `dogmove.c`, so pets can pal and balk at quest friendlies, while `score_targ` still returns −5000 outside C’s confusion wrap.
- Must-fix stays empty for this SHA; next port after this audit still pops Open `kill_eggs`, not a dogmove wrap peel.
