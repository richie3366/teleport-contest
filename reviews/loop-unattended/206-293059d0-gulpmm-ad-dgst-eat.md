# Review 206 — 293059d0 — mhitm.c gulpmm AD_DGST eat (D-1244)

## Metadata
- Full / short hash: `293059d0b120c655fae4e07f7a38e2f083f9e4eb` / `293059d0`
- Parent: `729b03dc` (D-1243). This file audits **this SHA only**. Archive row **Addressed:** D-1244 `293059d0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 01:27:14 +0200
- D-id: **D-1244**
- Stats: 12 files, +413 / −60 — `js/mhitm.js` +243; `js/mon.js` +86; `eat.js`/`dogmove.js` exports.
- Claims to close: Open `mhitm.c` gulpmm AD_DGST eat (named from D-1231 / D-1242 / D-1243 / review **193**). Not `!goodpos`. `reviews/loop-2026-08-15/` has no unpaid digest Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_dgst` / `mdamagem_digest_eat` / `monkilled` / swallowed `corpse_chance`; `mon.js` `mon_givit`; `c-js-map/data.md`. gulpmu invent / Medusa stone / NC_SHOW_MSG / little_to_big still named.
- Prior reviews this SHA claims to close: **193** named omit AD_DGST eat.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c gulpmm AD_DGST eat so an engulf that digests another monster instant-kills without a corpse and applies cham/slime/wraith/nurse/mon_givit, instead of rolling ordinary dice and leaving a corpse.”

C `mdamagem` (`mhitm.c:1025`) still `d(damn,damd)` first, then petrify (`touch_petrifies` or AD_DGST+Medusa), then `mhitm_adtyping` → `mhitm_ad_dgst` (`uhitm.c:4506–4566` mhitm arm): rider kills magr; else Burrrrp / `wake_nearto(2*2)` / `damage=mdef->mhp` / `mlifesaver` `m_useup` / `corpse_chance(mdef,magr,TRUE)` / tame virtual corpse `dog_nutrition`. After `monkilled`, if AD_DGST (`mhitm.c:1096–1116`): cham `newcham(NULL,NC_SHOW_MSG)` / green slime / wraith `grow_up(NULL)` early return / nurse `healmon` / `mon_givit`; then `grow_up(magr,mdef)` unless wraith returned. `monkilled` (`mon.c:3398–3401`) `disintegested` → `mondead` (no corpse) for AD_DGST / `-AD_RBRE` / FIRE `completelyburns`.

Old JS: AD_DGST fell through physical dice + `mondied` (corpse + extra `corpse_chance` RNG). `grow_up` had no null-victim arm.

The diff **does** the mhitm arm, `mondead` on digest, post-death eat, `mon_givit`, swallowed boom, tame nutrition, `grow_up(null)` `rnd(8)`+`m_lev++`. It does **not** pull gulpmu invent, the petrify block, `newcham` NC_SHOW_MSG pline, or `little_to_big`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_dgst` mhitm arm | C `uhitm.c:4506–4566`, **new** | youmonst/uhitm/mhitu damage 0 |
| `mdamagem` AD_DGST | C `:1059` then `:1096–1116`, **wired** | still `d()` first like C |
| `mdamagem_digest_eat` | C `:1096–1116`, **new** | wraith early `grow_up(null)` |
| `monkilled` `disintegested` | C `:3398–3403`, **wired** | live `mondead` |
| `corpse_chance` swallowed boom | C `:3189–3230`, **wired** | youmonst stomach named |
| `mlifesaver` | C `mon.c:2827–2836`, **clone** | live `which_armor(W_AMUL)` |
| `m_useup_mm` | C `mthrowu.c:1162–1170`, **clone** | unlink; no `extract_from_minvent`/`obfree` |
| `mon_givit` / `mon_give_prop` | C `mon.c:1778–1824` / `:1726–1774`, **new** | live `corpse_intrinsic`/`should_givit` |
| `grow_up` null | C `makemon.c:2099–2106`, **clone** | `rnd(8)`; little_to_big / lev_limit 49 named |
| `newcham` | C, **imported live, thin** | `_ncflags` ignored |
| `dog_nutrition` / `mksobj`/`set_corpsenm` | C callees, **imported live** | C `mksobj(FALSE)` also `rndmonnum` then overwrite |
| `attacktype_mm` / `completelyburns_mm` | C `mondata`, **clone** | paper/straw |
| petrify / gulpmu / SetVoice | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Dynamic `eat.js`/`dogmove.js` are scored ESM.

New RNG (C order): opening `d(damn,damd)`; rider none; Burrrrp none; `corpse_chance` boom `d()` or always-TRUE/`!rn2(tmp)`; tame `mksobj` CORPSE `rndmonnum`+gender `rn2` then `set_corpsenm`; `corpse_intrinsic` `rn2(count)`; `should_givit` `rn2(chance)`; cham `newcham` select; wraith `rnd(8)`; else `grow_up` `rnd(m_lev+1)`/`rn2`. Petrify `resists_ston` **not** consumed (named skip of that block).

## C ↔ JS fidelity

Pinned C post-death (`mhitm.c:1096–1116`):

```
        if (mattk->adtyp == AD_DGST) {
            if (ismnum(mdef->cham))
                (void) newcham(magr, (struct permonst *) 0, NC_SHOW_MSG);
            else if (pd == &mons[PM_GREEN_SLIME] && !slimeproof(pa))
                (void) newcham(magr, &mons[PM_GREEN_SLIME], NC_SHOW_MSG);
            else if (pd == &mons[PM_WRAITH]) {
                (void) grow_up(magr, (struct monst *) 0);
                return (M_ATTK_DEF_DIED
                        | (!DEADMONSTER(magr) ? 0 : M_ATTK_AGR_DIED));
            } else if (pd == &mons[PM_NURSE])
                healmon(magr, magr->mhpmax, 0);
            mon_givit(magr, pd);
        }
        return (M_ATTK_DEF_DIED
                | (grow_up(magr, mdef) ? 0 : M_ATTK_AGR_DIED));
```

JS `mdamagem_digest_eat` matches that order, including wraith return so `grow_up(mdef)` does not run twice. Instant `damage = mdef.mhp` overwrites the opening dice. `monkilled(..., AD_DGST)` → `mondead`, no `make_corpse`. Match the claimed bug.

`mon_givit` rolls `corpse_intrinsic` **before** DEADMONSTER / stalker like C (`:1780–1784`). `mon_give_prop` MR_* bits + `pline_mon` match FIRE..POISON; other props return. `res_to_mr` `1<<(r-1)` matches `prop.h`.

C petrify (`:1032–1056`) still sits between dice and `mhitm_adtyping`. JS AD_DGST arm never takes it — pre-existing `mdamagem` hole, named here because digest Medusa is in that `if`. **Named omit, not a fake stone path.**

`m_useup_mm` unlinks minvent so `which_armor` will not find the amulet; JS `mondead` has no `lifesaved_monster` anyway, so digest still bypasses save. Leftover `owornmask` / no `obfree` is clone debt. C `m_useup` → `extract_from_minvent`+`obfree`. Named thin clone, not a lifesave that fires.

`grow_up(null)`: C then applies `lev_limit` 49 (50 if `ptr->mlevel>49`) and may undo `++m_lev`; JS caps at 50 and always keeps the increment. little_to_big form change named. Cap is remaining grow_up thinness, not a stub that skips `m_lev++`.

`newcham(..., NC_SHOW_MSG)` is live form-change; flags ignored so no C pline. Named.

## Hallucinations / overclaim

Subject + D-1244 say instant digest, no corpse, cham/slime/wraith/nurse/`mon_givit`. **Those arms + live `mondead`/`corpse_intrinsic`/`dog_nutrition` are the hunk.** Stamping **Addressed:** D-1244 is fair. This is **not** “Match C dispatch, callee is a stub”: death is `mondead`; nutrition is exported `dog_nutrition`; givit is a real `mon.c` port. Do **not** stamp “Match C digest-Medusa stone” or “Match C `newcham` NC_SHOW_MSG pline” or “Match C `little_to_big`.”

## Density

One C adtyp envelope: `mhitm_ad_dgst` + the `monkilled`/`corpse_chance`/`mon_givit`/`grow_up` callees that envelope actually calls. +243 in `mhitm.js` is the top of §2b because the clones are verbose, not because an unrelated subsystem landed. Two modules that already import each other. Did not glue bee_eat or AT_HUGS.

## Branch-by-branch confirm

1. Ordinary digest: `damage=mhp` → `mondead`, no corpse, dest occupy. Match.
2. Rider: magr `mondied`; lifesave → MISS `done`; else AGR_DIED. Match (JS `mondead` cannot lifesave — pre-existing).
3. Burrrrp if `verbose && !Deaf`; `wake_nearto(4)`. Match; SetVoice named.
4. Lifesaver used up before death. Match outcome.
5. Gas spore swallowed: contained boom, no `mon_explodes`; youmonst stomach named.
6. Tame `!isminion` `!G_NOCORPSE`: virtual corpse `dog_nutrition`, meating `(n+3)/4`, nutrit/2. Match; C `dealloc_obj` vs JS `obj_stop_timers` (OBJ_FREE, not placed).
7. Cham / slime `!slimeproof` / wraith `grow_up(null)` return / nurse `healmon` / `mon_givit`. Match order.
8. Opening `d()` still burns. Match C.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **29**/29 (C/JS source; lizard no corpse; slime `newcham`; wraith `m_lev++`; nurse heal; rider magr dies; contained boom; tame nutrition; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless AT_ENGL+AD_DGST magr gulps another mon. Cadence this audit: full `sessions` **44**/44.

## Actionable C-wrongs

None for Must-fix. Instant kill through live `mondead`; eat through live `mon_givit`/`dog_nutrition`. Thin clones (m_useup extract, grow_up lev_limit 49, NC_SHOW_MSG pline) are named callee omits, not a dice-and-corpse digest.

Named omits (map, not Must-fix):

1. gulpmu invent / gulpum / digest-Medusa / `touch_petrifies` stone magr
2. `newcham` NC_SHOW_MSG pline; `grow_up` little_to_big / mplayer caps / lev_limit 49
3. `m_useup` `extract_from_minvent`+`obfree`; SetVoice; youmonst stomach boom
4. Vlad/lich dust / `LEVEL_SPECIFIC_NOCORPSE` in `corpse_chance`

Do not Must-fix “skip opening `d()` on AD_DGST.” Do not wrap digest as `mondied`+corpse.

## Callers / RNG ledger

C: `mdamagem` ← `gulpmm`. JS same special-case after AD_POLY. Public fortress is not evidence a trapper digested a lizard.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_DGST now instant-kills via `mondead`, then cham/slime/wraith/nurse/`mon_givit`; Medusa stone and little_to_big stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1244 `293059d0`.
