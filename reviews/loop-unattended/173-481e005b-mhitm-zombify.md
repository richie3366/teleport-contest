# Review 173 — 481e005b — mhitm.c `mdamagem` `gz.zombify` around `monkilled` (D-1211)

## Metadata
- Full / short hash: `481e005bc14aa55c30890b78c0dafec14ae05546` / `481e005b`
- Parent: `f1a3518a` (D-1210). This file audits **this SHA only**. Archive row **Addressed:** D-1211 `481e005b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 09:02:37 +0200
- D-id: **D-1211**
- Stats: 12 files, +125 / −53 — `js/mhitm.js` +30 / −6; comments in `timeout.js` / `uhitm.js`.
- Claims to close: Open queue `mhitm.c` `gz.zombify` at monkilled (named from D-1210 / review **164** / **172**). Not make_corpse. `reviews/loop-2026-08-15/` has no unpaid mhitm-zombify Must-fix.
- JS / map: `mhitm.js` `mdamagem_monkilled`. `c-js-map/data.md`. MINVENT/CONTAINED still named at this SHA (D-1212 next). `troll_baned` / gulpmm swap / passivemm shock still named.
- Prior reviews this SHA claims to close: **164** “mhitm monkilled zombify (live Open)”; **172** “Did not pull mhitm.”

## Intent vs deliverable

Git subject promises: “Match C mhitm.c mdamagem gz.zombify around monkilled so a zombie/lich barehand TUCH/CLAW/BITE kill queues ZOMBIFY_MON, instead of leaving the mon-vs-mon producer unset.”

D-1210 set the **hero** `xkilled` producer. C `mhitm.c:1083–1089` is the **mon-vs-mon** producer: `gz.zombify = (!mwep && zombie_maker(magr) && (AT_TUCH\|\|AT_CLAW\|\|AT_BITE) && zombie_form(mdef) != NON_PM)` then `monkilled` then FALSE.

Old JS `mdamagem` called `monkilled` twice (AD_POLY leftover HP; ordinary HP) with the flag unset. `mondied` → `make_corpse` would then take the ordinary `ROT_CORPSE` arm.

The diff **does** wrap **both** JS death sites with that formula. It does **not** pull `troll_baned` `mkcorpstat_norevive`, gulpmm `m_at` swap, or other `monkilled` callers (`mon_poly` AD_RBRE, `passivemm`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mdamagem_monkilled` | C `mdamagem` death site, **new** helper | `:1083–1089`; not a clone of another function |
| `zombie_maker` / `zombie_form` | C callees, **imported** | D-1210 / D-1202 |
| `monkilled` → `mondied` → `make_corpse` | C callees, **imported** | flag still true across the `await` |
| `mwep` | C `mdamagem` arg | `hitmm` passes `MON_WEP` only on AT_WEAP; claw starts `null` |
| `troll_baned` `gm.mkcorpstat_norevive` | C sibling, **named omit** | `:1081–1082` / `:1090` |
| gulpmm `m_at` swap | C before wrap, **named omit** | `:1075–1080` |
| `mon_poly` / `passivemm` `monkilled` | C other functions, **named omit** | `:1172`, `:1453`; no zombify in C |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `NON_PM` already imported from `const.js`.

## C ↔ JS fidelity

Pinned C (`mhitm.c:1073–1090`), after `mdef->mhp < 1`:

```
        if (m_at(mdef->mx, mdef->my) == magr) { /* gulpmm */
            remove_monster(...); place_monster(...);
        }
        if (mattk->aatyp == AT_WEAP || mattk->aatyp == AT_CLAW)
            gm.mkcorpstat_norevive = troll_baned(mdef, mwep) ? TRUE : FALSE;
        gz.zombify = (!mwep && zombie_maker(magr)
                     && (mattk->aatyp == AT_TUCH || AT_CLAW || AT_BITE)
                     && zombie_form(mdef->data) != NON_PM);
        monkilled(mdef, "", (int) mattk->adtyp);
        gz.zombify = FALSE;
        gm.mkcorpstat_norevive = FALSE;
```

Callers: C has **one** death wrap in `mdamagem`. JS `mdamagem` is still PHYS+POLY, so this SHA wraps **both** JS `monkilled` sites (`mhitm.js:1147` leftover AD_POLY HP; `:1162` ordinary HP) with `mdamagem_monkilled`. That is the C formula whenever **this** function kills, not a second producer. `hitmm` (`:1236`) starts `mwep = null`; AT_WEAP assigns `MON_WEP` then FALLTHROUGH. Anti-pattern grep of this SHA’s `js/` hunks: empty.

### Formula vs `mhitm.c:1083–1087`

C after `mdef->mhp < 1` (and after gulpmm swap / troll_baned):

```
gz.zombify = (!mwep && zombie_maker(magr)
             && (mattk->aatyp == AT_TUCH
                 || mattk->aatyp == AT_CLAW
                 || mattk->aatyp == AT_BITE)
             && zombie_form(mdef->data) != NON_PM);
monkilled(mdef, "", (int) mattk->adtyp);
gz.zombify = FALSE;
```

JS helper (`mhitm.js:1112–1118`): same four conjuncts, `await monkilled(mdef, '', mattk.adtyp | 0)`, then `false`. `zombie_form(undefined)` returns `NON_PM` (D-1202 guard) so a missing `data` does not throw. Match.

`monkilled` (`:1044–1057`) always `await mondied` on the ordinary path; `mondied` (`:1033–1036`) `make_corpse` while the flag is still true. `mkcorpstat` restart + `start_corpse_timeout` zombify arm as in review **172**. **Not a stub.** Reset after `await` is the C reset-after-`monkilled` (C is sync; JS must not clear before the corpse timer). They clear after. Match.

JS after the wrap still `grow_up(magr, mdef)` and returns `M_ATTK_DEF_DIED | AGR`. C after the wrap tests `DEADMONSTER` (lifesave), then `AD_DGST` eat, and does **not** `grow_up` at this site (`grow_up` lives in `hitmm` elsewhere). That return/grow shape is **pre-existing** partial `mdamagem`, not a fake zombify. Do not Must-fix as “finish `mdamagem`.” `troll_baned` `:1081–1082` / `:1090` is the named sibling immediately around the same `monkilled`; JS does not set `mkcorpstat_norevive`. Zombify arm already checks `!body.norevive` (D-1202), so leaving troll-bane unset is omit, not a stub of `zombie_maker`.

### Two JS death sites vs one C site

C `mdamagem` has a **single** HP-death wrap after `mhitm_adtyping` (`:1073–1088`). JS `mdamagem` is still a partial: AD_POLY runs `mhitm_ad_poly` then may subtract leftover damage (`:1132–1150`); ordinary PHYS subtracts at `:1158–1164`. C leftover AD_POLY damage that kills also hits **that same** wrap. Wrapping both JS sites is the C formula whenever **this** function calls `monkilled`, not a second producer. `mon_poly` system-shock `monkilled(..., AD_RBRE)` (`:1168–1172`) is **inside** `mhitm_ad_poly` / `mon_poly`, not this wrap — C does not set zombify there. JS D-log billed it as “passivemm/AD_RBRE shock”; the C line is `mon_poly`, not `passivemm`. Citation sloppy, **behavior matches C** (those `monkilled`s stay unwrapped).

### `mwep` / aatyp vs `mattackm`

Per-attack JS (`:1236`): `let mwep = null`. AT_WEAP sets `mwep = MON_WEP(magr)` then FALLTHROUGH into the melee roll (`:1256–1272`) and `hitmm(..., mwep)`. AT_CLAW/TUCH/BITE without AT_WEAP leave `mwep` null. C weapon attacks pass `MON_WEP`; claw/touch/bite typically pass 0. `!mwep` then still requires aatyp TUCH/CLAW/BITE, so AT_WEAP with a weapon is false on **aatyp** even if `mwep` were null. A zombie clawing while holding a weapon: JS `mwep` stays null (not AT_WEAP this slot) → `!mwep` true → zombify if maker+form. C claw slot is likewise not the weapon attack. Match for the arms this partial `mdamagem` implements.

Kick/sting/butt: aatyp not in the OR → flag false. Match.

C `passivemm` (`mhitm.c:1453`) kills **magr** with `monkilled` and does **not** set `gz.zombify`. JS `passivemm` stays unwrapped. Correct. `mon_poly` system-shock `monkilled(..., AD_RBRE)` (`:1172`) is inside `mhitm_ad_poly`, not this sandwich — C likewise has no flag there. D-log billed “passivemm/AD_RBRE shock”; citation sloppy, **behavior matches C**.

`AT_ENGL` digest death would be `aatyp` fail even if JS later ports gulpmm swap. Engulf is not TUCH/CLAW/BITE.

C `hitmm` passes `mattk` through to `mdamagem`; JS same. The helper reads `mattk.aatyp` and `mattk.adtyp` only (C uses both). It does not invent a third aatyp. `AT_TUCH` on a lich is the common “barehand” producer; AT_WEAP on a zombie with a weapon is false on aatyp even if `mwep` were somehow null.

### Named siblings that must not be “fixed” as this SHA

- `troll_baned` (`:1081–1082`) sets `mkcorpstat_norevive` around the same `monkilled`. Zombify arm already checks `!body.norevive` (D-1202). Leaving troll-bane unset is **named**, not a fake `norevive`.
- gulpmm swap (`:1075–1080`) re-places defender before death so `place_monster` is quiet. JS `mdamagem` never did that. Engulf digest is AT_ENGL, so zombify would be false anyway on aatyp.
- `passivemm` `:1453` kills **magr**; C does not set zombify. JS `passivemm` still unwrapped. Correct.

Do not enqueue “wrap every `monkilled`” as Must-fix. C only sandwiches `mdamagem` and `xkilled`. Other `monkilled` callers (`mon_poly`, `passivemm`) stay unset in C.

Review **172** already covered the hero producer; this SHA is only the mon-vs-mon sandwich.

## Hallucinations / overclaim

Subject + D-1211 say a zombie/lich barehand TUCH/CLAW/BITE **mon-vs-mon** kill queues `ZOMBIFY_MON`. **The wrap around both `mdamagem` `monkilled`s is the hunk.** Callees `monkilled` / `mondied` / `make_corpse` / `start_corpse_timeout` are live. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `troll_baned`” or “Match C gulpmm swap” or “Match C `passivemm` zombify” (C has none) or “Match C full `mhitm_adtyping` `mdamagem`.” Say so: the producer formula is C; `mdamagem` is still a PHYS+POLY subset of C’s unified damage function.

## Density

One C site family (the `gz.zombify` sandwich on `mdamagem`’s death `monkilled`). ~20 lines plus a helper. Slightly thin vs §2b after D-1210, but it is the named sibling Open row, not an unrelated peel. Did not glue MINVENT revive, `troll_baned`, or gulpmm. Playbook §2b “one deferred `if` alone” would have been worse: shipping the producer without wrapping both JS death sites would have left AD_POLY leftover kills unset.

`mdamagem` `d()` at entry is pre-existing; this SHA does not retune damage. `AT_WEAP` FALLTHROUGH into melee still uses the same `mwep` the helper sees.

## Branch-by-branch confirm

| Case | C | JS after |
|------|---|---------|
| zombie AT_CLAW, no mwep, human | flag; ZOMBIFY | **same** |
| lich AT_TUCH / AT_BITE | flag | **same** |
| AT_KICK / AT_STNG / AT_WEAP | aatyp fail | **same** |
| mwep set on this attack | `!mwep` fail | **same** |
| ghoul / cancelled magr | maker false | **same** |
| victim already zombie | form NON_PM | **same** |
| AD_POLY leftover lethal | same wrap | **same** (second JS site) |
| `mon_poly` shock `monkilled` | no flag | **same** (unwrapped) |
| hero `xkilled` | D-1210 | **unchanged** |

No extra `rn2`. Existing `d()` damage dice unchanged.

## Verification

Journal: private canary **23**/23 (maker; zombie/lich TUCH/BITE queue; kick/wielded/ghoul/cancelled/already-zombie skip); green+strict seed8000/0900; cohort **12**/12 + strict 0012/0004/1500/1800. **Public-unhit** unless public combat has zombie-vs-living melee kill. Admit that. Cadence **44**/44 does not expire a new `ZOMBIFY_MON` from this producer.

Call chain: `mattackm` → per-slot `mwep` → `hitmm` → `mdamagem` → helper → `monkilled` → `mondied` → `make_corpse` → `mkcorpstat` → `start_corpse_timeout`. Damage die is still `d(mattk.damn, mattk.damd)` at `mdamagem` entry (`mhitm.js:1123`); this SHA adds none. `NON_PM` already imported from `const.js`. `AT_TUCH`/`AT_CLAW`/`AT_BITE` are the live generated aatyps, same as other `mhitm.js` switches.

Helper is **not** a clone of `xkilled`: C’s mon-vs-mon formula uses `magr` + aatyp, not `youmonst` + `!thrownobj`/`!uwep`. Reusing the D-1210 wrap would be a C-wrong; they did not.

## Actionable C-wrongs

Named omits (map), not Must-fix:

1. `troll_baned` `mkcorpstat_norevive` around the same `monkilled` (`mhitm.c:1081–1090`).
2. gulpmm `m_at(mdef)==magr` swap before the wrap (`:1075–1080`).
3. Full `mhitm_adtyping` `mdamagem` (pre-existing partial). Do not Must-fix as “finish `mdamagem`.”

`dothrow` `thrownobj` (review **172**) is not this SHA.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon claw/touch/bite kills from a `zombie_maker` now set C’s `gz.zombify` around live `monkilled`→`make_corpse`; troll-bane and gulpmm stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1211 `481e005b`. Next port in this window popped Open MINVENT/CONTAINED. Not `rot_corpse`, not `passivemm`.
