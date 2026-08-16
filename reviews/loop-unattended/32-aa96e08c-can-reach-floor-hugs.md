# Review 32 — aa96e08c — `can_reach_floor` ustuck `AT_HUGS` + `!sticks` (D-1071)

## Metadata
- Full / short hash: `aa96e08c01ac4ad516c805d44a25fc543bff249f` / `aa96e08c`
- Parent: `9d3545c9` (D-1070 ACCEPT this review iter; Must-fix empty; popped Open hugs-before-lap). JS-touching since last `reviews/loop-unattended/` file (`30-872d1d93-…`): `9d3545c9` (review **31**) and **this SHA**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 10:19:36 +0200
- D-id: **D-1071**
- Stats: 13 files, +167 / −64 — `js/engrave.js` +59 / −3 (header + `AT_*`/`AD_*` + local `attacktype`/`dmgtype`/`sticks` + hugs arm folded into the existing FALSE `if`); `js/sit.js` +10 / −4 (**comments only** — sit-on-air path is D-1069). Live JS is the helper hugs conjunct, not a sit.js rewrite.
- Claims to close: Open queue `engrave.c` `can_reach_floor` ustuck `AT_HUGS` + `!sticks` (inserted by D-1070 so lap would not steal hugged heroes). Stamped **Addressed:** D-1071 on the archive row **without** the short hash (chicken-egg). This review commit fills `aa96e08c`. Also fills review 30’s named-omit “helper hugs **Addressed:** D-1071”.
- JS / map: `engrave.js` `can_reach_floor`; sit.js header/deferred list. `c-js-map/turns.md` names D-1071 and still omits `ceiling_hider` / `MZ_HUGE` / pit teeter. `c-js-map/data.md` still names dosit ustuck lap.
- Prior reviews this SHA claims to close: **30** named omit “hugs before lap” (not a numbered Must-fix). Review **31** ACCEPT of D-1070 left that Open line. `reviews/loop-2026-08-15/` has no open hugs Must-fix.

## Intent vs deliverable

Git subject promises: “Match C can_reach_floor so a hugged hero cannot reach the floor and sitting on air can fire.” Body is empty beyond Co-authored-by. D-log: helper skipped C `u.ustuck && !sticks(youmonst.data) && attacktype(ustuck->data, AT_HUGS)`. A hugged hero still reached the floor, so `#sit` sat (and a later ustuck lap would fire). C returns FALSE then sit-on-air. Giant eel `AD_WRAP` without `AT_HUGS` still reaches; python has `AT_HUGS` so it does not. Hero forms that `sticks` still reach when grabbed.

Review 30 said the air string was **unreachable from `dosit`** until hugs (or another live FALSE besides swallow/Levitation) existed, and that the next Open must not ship lap first. D-1070 inserted that Open line. The queue line was the helper hugs arm only — not `ceiling_hider` / `MZ_HUGE` / dosit lap.

The diff **does** ship that arm in C `||` order with swallow and Levitation, plus local `sticks`/`attacktype`/`dmgtype` (comment: avoid `engrave←monmove` cycle because `monmove.js` already imports `wipe_engr_at`). Sit.js only retouches comments: deferred list moves hugs to “already D-1071” and keeps lap named.

It does **not** port dosit lap (`sit.c:422–429`). Named, and excluded. It does **not** port `ceiling_hider` / `MZ_HUGE` / pit teeter. Named. It does **not** export `sticks` or touch `monmove.js`. Cycle reason is real.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `can_reach_floor` hugs conjunct | C callee arm, new | `engrave.c:192–197`; same FALSE `if` as swallow/Levitation |
| `sticks` | **clone** of `mondata.c:654–658` | local; STCK \|\| (WRAP && !ENGL) \|\| HUGS |
| `attacktype` | **clone** of `mondata.c:53–57` | local; any `mattk` slot with `aatyp` (`AD_ANY`) |
| `dmgtype` | **clone** of `mondata.c:712–714` | local; any `mattk` slot with `adtyp` (`AT_ANY`) |
| `AT_HUGS`/`AT_ENGL`/`AD_STCK`/`AD_WRAP` | **clone** of `monattk.h` | 7 / 11 / 19 / 28 — C values, not `monmove.js`’s 6/7 |
| `Levitation()` | clone, **not this SHA** | D-1070 `(H\|\|E)&&!B` |
| `dosit` air arm | C call site, **not this SHA** | `sit.c:419–420`; becomes reachable |
| `monmove.js` `sticks` | imported C callee, **not used** | pre-existing; **wrong** AT numbers — do not import for lap |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/engrave.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. Constants are `monattk.h`, not a seed-shaped hug table. Generated `mattks` use those same numbers (owlbear `aatyp` 7, eel `aatyp` 5 + `adtyp` 28, trapper `aatyp` 11, killer bee `aatyp` 6 = `AT_STNG`). Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Helper FALSE `if` — C `||` order, no RNG

C `engrave.c:191–199`:

```
    if (u.uswallow
        || (u.ustuck && !sticks(gy.youmonst.data)
            && attacktype(u.ustuck->data, AT_HUGS))
        || (Levitation && !(Is_airlevel(&u.uz) || Is_waterlevel(&u.uz))))
        return FALSE;
```

JS `engrave.js:281–285`:

```
    if (u.uswallow
        || (u.ustuck && !sticks(game.youmonst?.data)
            && attacktype(u.ustuck.data, AT_HUGS))
        || (Levitation() && !(Is_airlevel(u.uz) || Is_waterlevel(u.uz)))) {
        return false;
    }
```

Short-circuit matches C: swallow skips sticks/attacktype/Levitation; hugged skips Levitation. `u.ustuck` is the monster object (`mhitu.js` `set_ustuck`; `makemon.js` sets `mtmp.data`). `attacktype(u.ustuck.data, AT_HUGS)` is C `ustuck->data`. `sticks` is on **hero** `youmonst.data`, not the grabber. `u_init.js` / `set_uasmon` point `youmonst.data` at `mons[umonnum]`. Missing `youmonst.data` makes local `sticks` false — same as an unpoly’d human (`AT_WEAP`, no STCK/WRAP/HUGS). No `rn2`/`rnd`/`rn1`/`d` in this `if`.

C’s comment at `engrave.c:193–196` is the design: hugs pin the hero’s arms rather than lift them off the floor; the hero can still melee the grabber. Returning FALSE here is still what C does. JS does not invent a “lifted” geometry.

`NATTK` is 6 (`mhitm.js`; C `mon.h`). Generated `mattks[mndx]` is always six slots including trailing `{aatyp:0}`. Looping `slots.length` is the C `for (a = &mattk[0]; a < &mattk[NATTK]; a++)` bound. Extra slots would be a table bug, not this clone. `attacktype` does not skip `AT_BOOM` — C `attacktype_fordmg` does not either (`noattacks` does). Unused for `AT_HUGS`/`AT_ENGL`.

Remaining arms unchanged this SHA: unskilled `P_RIDING` (`skills.h:95` `P_BASIC=2`; dead from `dosit`); `ceiling_hider` named; `u.Flying` sticky early-true; `MZ_HUGE` named; `check_pit` teeter named. With `dosit`’s `FALSE`, Flying vs fallthrough both TRUE — **no live `dosit` gap**.

### `sticks` / `attacktype` / `dmgtype` — clones match C, not `monmove.js`

C `mondata.c:42–57` / `700–714` / `654–658`:

```
attacktype_fordmg: for a in mattk[0..NATTK): aatyp==atyp && (dtyp==AD_ANY || adtyp==dtyp)
attacktype(ptr, atyp) = attacktype_fordmg(ptr, atyp, AD_ANY) ? TRUE : FALSE
dmgtype(ptr, dtyp)    = dmgtype_fromattack(ptr, dtyp, AT_ANY) ? TRUE : FALSE
sticks(ptr) = dmgtype(AD_STCK)
           || (dmgtype(AD_WRAP) && !attacktype(AT_ENGL))
           || attacktype(AT_HUGS)
```

`NATTK` is 6. Generated `mattks` are length 6 (including `NO_ATTK` zeros). JS loops `slots.length` — same bound. `attacktype` / `dmgtype` match the `AD_ANY` / `AT_ANY` wildcards. `sticks` short-circuit order is C’s. Constants: `monattk.h:19–21` / `61` / `70` — `AT_HUGS=7`, `AT_ENGL=11`, `AD_STCK=19`, `AD_WRAP=28`. Same as `mhitm.js`’s table. Eat.js already uses this loop shape for cycle reasons. These are **C callees cloned locally**, not no-ops.

`monmove.js:1315–1328` `sticks` is a **different** clone: `aa === 6 /* AT_HUGS */` and `aa === 7 /* AT_ENGL */`. C `AT_STNG` is 6 and `AT_HUGS` is 7. That function treats a python’s hug slot as engl, so `sticks(python)` is **false** while C is true. This SHA correctly did **not** import it. Do not “simplify” the lap port by importing it.

### Generated `mattk` — hugs vs wrap vs engl, call-for-call with C `monsters.h`

| Grabber / hero form | `attacktype(..., AT_HUGS)` | `sticks(hero)` | C helper | JS helper |
|---------------------|----------------------------|----------------|----------|-----------|
| owlbear vs human | true (`aatyp` 7) | false | FALSE | **FALSE** |
| python vs human | true (two `aatyp` 7) | false | FALSE | **FALSE** |
| kraken / rope golem / ape | true | false | FALSE | **FALSE** |
| giant/electric eel vs human | false (`AT_TUCH`+`AD_WRAP`) | false | not this arm | **reach** |
| trapper / lurker (`AT_ENGL`+`AD_WRAP`) not swallowed | false | false | not this arm | **reach** |
| python/owlbear **hero** grabbed | maybe | **true** (`AT_HUGS`) | arm off (`!sticks`) | **reach** |
| swallow | (short-circuit) | — | FALSE | **FALSE** (D-1069) |
| dungeon `ELevitation` | — | — | FALSE | **FALSE** (D-1070) |

Eel WRAP still reaches the floor. C then hits `sit.c:422–429`:

```
    } else if (u.ustuck && !sticks(gy.youmonst.data)) {
        if (humanoid(u.ustuck->data))
            pline("%s won't offer %s lap.", Monnam(u.ustuck), mhis(u.ustuck));
        else
            pline("%s has no lap.", Monnam(u.ustuck));
        return ECMD_OK;
```

JS still falls through to pool/OBJ_AT (named Open). Trapper engl-without-swallow is the same shape: helper TRUE (`AT_ENGL`+`AD_WRAP` is not `AT_HUGS`; `sticks(trapper)` is false because WRAP&&!ENGL fails), lap would fire, still named. Hero-sticks reaching is C: python/owlbear poly has `AT_HUGS`, so `!sticks` is false and the hugs arm does not fire even if `ustuck` also hugs.

`sticks` on a **trapper** / **lurker** (hero form) is false: `dmgtype(WRAP)` is true **and** `attacktype(ENGL)` is true, so the WRAP arm is off, and there is no `AT_HUGS`. C the same. Do not treat engl-wrap as hugs.

### Sit-on-air is the existing `else`, now live

C `sit.c:414–421`: `!can_reach_floor(FALSE)` → swallow / `Levitation` / else air, `ECMD_OK`. JS `sit.js:1035–1043` already had that envelope (D-1069). Hugs + not swallowed + not `Levitation()` takes the else: `"You are sitting on air."` Hugs **and** H/E levitation still tumbles (`else if (Levitation)` is the macro, independent of *why* the helper was false). Swallow still wins first. No `newsym`. No sit.js control-flow change this SHA — correct: the call site was already C.

## Hallucinations / overclaim

“Match C can_reach_floor so a hugged hero cannot reach the floor and sitting on air can fire” is **true for the helper hugs conjunct and for `dosit`’s existing else**. It is **not** true that `can_reach_floor` is complete C (`ceiling_hider` / `MZ_HUGE` / pit still named), or that dosit lap now matches C. D-log “eel WRAP still reaches” is true **of the helper**; eel `#sit` still sits on the floor until lap ships. Map row D-1071 names the local `sticks` clone — fair, not a stub callee.

This is **not** “Match C dispatch, callee is a stub.” `attacktype`/`dmgtype`/`sticks` are clones of the real `mondata.c` bodies with C `monattk.h` numbers. Classify: **clones that match C**, not clones that diverge (those would be C-wrongs). `monmove.js` `sticks` diverges — unused here.

Stamping the Open item **Addressed:** D-1071 is fair for the hugs arm. Fill hash `aa96e08c` in this commit (archive row + review 30 named omit).

## Density (§2b)

One Open cluster: C `engrave.c:192–197` plus the `sticks`/`attacktype` callees that arm needs. Review 30 asked for hugs before lap, not another one-line sit peel and not “finish `mondata.c`.” ~40 lines of local clones + one conjunct. Sit.js comments only. Right size. Not ceiling_hider/MZ_HUGE in the same commit (unrelated FALSE/TRUE arms).

## Verification

Journal: private node owlbear/python hug → false; eel/trapper reach; poly sticks reach; swallow/ELevitation still false. green+strict PASS; cohort **14**/14 (8000/0900/1500/1800/0060/0102/0700/0106/0107/0101/0116/2200/4500/0009). Path **public-unhit**. Green+cohort is regression cover, not a public owlbear hug `#sit`. Cadence **#1355** **44**/44 — fortress, not hug-sit proof.

C read of `engrave.c:187–214`, `sit.c:414–429`, `mondata.c:42–57`/`654–658`/`700–714`, `monattk.h:11–21`/`61`/`70`, `skills.h:95`; JS `engrave.js:232–299`, `sit.js:1031–1046`, `monmove.js:1315–1328`, `mhitu.js:670–678`, `makemon.js` `mtmp.data`, generated owlbear/python/eel/trapper/bee `mattk`; hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None from this SHA. The hugs arm and the local clones match C.

Named omits / do-nots (map / Open, not Must-fix):

1. **dosit ustuck lap** (`sit.c:422–429`) is the live Open line. Helper hugs is in: a python/owlbear grab now airs, not laps. Eel WRAP still reaches and still needs `Monnam` / `mhis`. When shipping lap, use **this** `sticks` (C `monattk.h` 7/11/19/28) or re-port `mondata.c` — do **not** `import { sticks } from './monmove.js'` (`AT_HUGS` commented as 6, `AT_ENGL` as 7; `sticks(python)` is false vs C true). Do not pull swallow combat. Do not pull `ceiling_hider` / `MZ_HUGE` / pit teeter this next iter. **Addressed:** D-1072 `55906000`
2. Helper `ceiling_hider` / `MZ_HUGE` / `uteetering` / `uescaped_shaft`; `Flying` sticky vs `youprop.h` (not live at `dosit`+`FALSE`). **Addressed:** D-1082 `453e759c` / D-1083 `e6167027` (Flying still QUALITY-RISK vs `uprops[FLYING]`, review **43**).

Do not skip helper hugs / treat eel WRAP as hugs. Do not restore Levitation-only `dosit`. Do not add `newsym` at the hider clear. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the hugs conjunct is C `engrave.c:192–197` with C-numbered local `sticks`/`attacktype`, so a hugged hero now hits sit-on-air instead of the floor, and eel WRAP still reaches as C does.
- Must-fix stays empty; next port pops Open `dosit` ustuck lap.
