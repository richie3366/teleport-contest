# Review 166 — dbd3a08b — eat.c `eatspecial` SCR_MAIL + wield.c `uwepgone` light (D-1204)

## Metadata
- Full / short hash: `dbd3a08b425f606f6e34ab8283dec9a576319955` / `dbd3a08b`
- Parent: `a16884ab` (D-1203). This file audits **this SHA only**. Archive row **Addressed:** D-1204 lacked the short hash; this review commit fills `dbd3a08b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 06:18:53 +0200
- D-id: **D-1204**
- Stats: 14 files, +160 / −69 — `js/eat.js` +31/−13; `js/wield.js` +43/−7; `js/steal.js` / `js/trap.js` await-only.
- Claims to close: Open queue `eat.c` `eatspecial` (named from D-0946 / D-0956). Not `doeat_nonfood`. `reviews/loop-2026-08-15/` has no unpaid MAIL/`uwepgone` Must-fix.
- JS / map: `eat.js` PAPER arm; `wield.js` `uwepgone` / gone trio; `eat.js` `o_unleash`. `c-js-map/debt.md` + `turns.md` eat/wield. lesshungry choke/fullwarn, `setuwep` begin_burn still named.
- Prior reviews this SHA claims to close: Open after D-1203; D-0946 map named MAIL ifdef + `artifact_light` in `uwepgone`.

## Intent vs deliverable

Git subject promises: “Match C eat.c eatspecial so MAIL_STRUCTURES SCR_MAIL prints junk-mail and uwepgone snuffs artifact_light, instead of Needs salt / silent unwield.”

Old JS PAPER arm jumped to scare/YUM/salt. `uwepgone` only `setuwep(null)`. Gone trio / `o_unleash` skipped `update_inventory`. C `eat.c:2432–2447` `#ifdef MAIL_STRUCTURES` tests `SCR_MAIL` **before** scare/YUM/salt; `wield.c:873–885` `artifact_light && lamplit` → `end_burn` + `Tobjnam(..., "stop")` shine if `!Blind`, then `setworn(0, W_WEP)`, `unweapon`, `update_inventory`. `uswapwepgone` / `uqwepgone` / `apply.c:711–722` `o_unleash` also `update_inventory`.

The diff **does** the MAIL pline, async `uwepgone` snuff+shine before `setuwep(null)`, and inventory on the gone trio + `o_unleash`. It awaits `uwepgone` from `eatspecial` / `remove_worn_item` / `selftouch` (the only three JS callers). It does **not** pull lesshungry choke/fullwarn occupation polish or `setuwep`’s own Sunsword `begin_burn` / ready_weapon shine. Named.

Contest objects table includes `SCR_MAIL` at index 364 (D-0848 MAIL_STRUCTURES). The `SCR_MAIL >= 0` guard is a missing-otyp safety, not a second ifdef.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| PAPER `SCR_MAIL` pline | C site, **new** | `eat.c:2432–2436` MAIL_STRUCTURES |
| scare / YUM / salt | C, **pre-existing** | order after mail |
| `uwepgone` light snuff | C site, **new** | `wield.c:876–880` |
| `update_inventory` gone trio + unleash | C site, **new** | `:883` / `:892` / `:901` / `apply.c:721` |
| `artifact_light` / `end_burn` | C callees, **imported** | `timeout.js` (Sunsword + worn gold DSM) |
| `Tobjnam` | **clone** of `objnam.c:2290–2298` | `The(xname)` + `vtense`/`verb`; quan=1 ≡ C `otense` |
| `Blind_w` | **clone** of `youprop.h:103` Blind | extra sticky `u.Blind \|\| u.ublind` (D-0716 warned) |
| `setuwep(null)` vs `setworn(0, W_WEP)` | JS slot helper | JS `setuwep` Sunsword snuff still named-deferred, so no double pline |
| lesshungry choke / `setuwep` begin_burn | C siblings, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Dynamic `import('./timeout.js')` from `wield.js` avoids the `timeout.js → trap.js → wield.js` cycle.

**RNG:** none on the new MAIL / snuff / inventory paths. `end_burn` for artifacts forces `timer_attached = false` like C magic-lamp/arti (no `stop_timer` die).

Grep of this SHA’s `js/` hunks: no banned gates. `steal.js` / `trap.js` only add `await` on existing `uwepgone` calls.

## C ↔ JS fidelity

### PAPER vs `eat.c:2432–2448`

C:

```
    if (objects[otmp->otyp].oc_material == PAPER) {
#ifdef MAIL_STRUCTURES
        if (otmp->otyp == SCR_MAIL)
            pline("This junk mail is less than satisfying.");
        else
#endif
        if (otmp->otyp == SCR_SCARE_MONSTER)
            pline("Yuck%c", otmp->blessed ? '!' : '.');
        else if (otmp->oclass == SCROLL_CLASS && objdescr_is(otmp, "YUM YUM"))
            pline("Yum%c", ...);
        else
            pline("Needs salt...");
    }
```

JS (`eat.js:2484–2496`): `SCR_MAIL >= 0 && otyp === SCR_MAIL` then scare / YUM / salt. **Order matches the MAIL_STRUCTURES build.** Without MAIL, C would skip the mail test; this contest **has** `SCR_MAIL`. `doeat_nonfood` is not this SHA (named).

Coin / potion / accessory / leash / trident / flint / gone-trio / unpunish / useup stay the pre-existing `eatspecial` envelope. `uwepgone` is now `await`ed so the shine `--More--` can run before `useup`. C `uwepgone` is sync but `pline` can still more; JS await is the input-boundary equivalent, not an extra turn.

### `uwepgone` vs `wield.c:873–885`

C:

```
    if (uwep) {
        if (artifact_light(uwep) && uwep->lamplit) {
            end_burn(uwep, FALSE);
            if (!Blind)
                pline("%s shining.", Tobjnam(uwep, "stop"));
        }
        setworn((struct obj *) 0, W_WEP);
        gu.unweapon = TRUE;
        update_inventory();
    }
```

JS (`wield.js:296–312`): snapshot `uwep`, `artifact_light && lamplit` → `end_burn(uwep, false)` → `!Blind_w()` → `` `${Tobjnam(uwep, 'stop')} shining.` `` → `setuwep(null)` → `gu.unweapon = true` → `update_inventory()`.

`artifact_light` (`timeout.js:459–467`) is Sunsword `is_art` or worn gold DSM/scales — C `artifact.c`. A gold DSM is not `uwep`; the live path is Sunsword. `end_burn(..., false)` deletes the light source and clears `lamplit` (arti forces timer-less). **Snuff order matches.**

C uses `setworn(0, W_WEP)` not `setuwep(0)`. C `setuwep` **also** snuffs Sunsword (`wield.c:115–118`); `uwepgone` avoids that by calling `setworn`, so there is one pline. JS `setuwep` still has “Ogresmasher/Sunsword light deferred,” so snuff lives only in `uwepgone` — **one pline**, same as C `uwepgone`. `setuwep(null)` still clears `W_WEP`, artifact intrinsic off, `unweapon`. Extra vs C `setworn`: none that still exist in JS `setuwep`. Named omit is `setuwep`’s **wield** shine/`begin_burn` when putting Sunsword **on**, not this destroy path.

`uswapwepgone` / `uqwepgone`: C `update_inventory` after `setworn` clear. JS same. No arti-light on those slots in C.

`o_unleash`: C loop `fmon` by `m_id == leashmon`, clear `mleashed`, `leashmon=0`, `update_inventory`. JS already had the loop; this SHA adds `update_inventory()`. Match.

### `Tobjnam` vs `objnam.c:2290–2298` / `otense:2531–2541`

C `Tobjnam` = `The(xname)` + space + `otense(otmp, verb)`. `otense`: if `!is_plural` then `vtense(NULL, verb)` else raw verb. JS `Tobjnam`: `The(xname)` + (`quan !== 1` ? verb : `vtense(null, verb)`). For a wielded Sunsword `quan==1`, `vtense(null, 'stop')` → `"stops"` (`objnam.js:1126–1134` null subj is singular +s). Result `"The sunsword stops shining."` like C `pline("%s shining.", ...)`. **Match on this path.** `is_plural` is richer than `quan !== 1` (pairs of boots); not a wielded Sunsword. Clone, not a C-wrong for D-1204’s shine.

### `Blind_w` vs `youprop.h:103`

C `#define Blind ((HBlinded || EBlinded) && !BBlinded)`. JS:

```
    if (u.Blind || u.ublind) return true;
    return !!(((u.HBlinded | 0) || (u.EBlinded | 0)) && !(u.BBlinded | 0));
```

The H/E/`BBlinded` arm **matches** C. The leading `u.Blind || u.ublind` is sticky-field extra. D-0716: do not trust sticky `u.Blind` for wipe/`make_blinded`. `invent.js` `Blind()` (`:123–128`) is the better clone: `(HBlinded \|\| EBlinded) && !BBlinded` plus `uroleplay.blind`, **without** sticky `u.Blind`. `Blind_w` copied the `do_wear.js` sticky shape instead. If sticky `u.Blind` is true after props cleared, JS **suppresses** the shine pline and C would print it. Clone that can diverge — map debt on an unhit destroy-Sunsword path, not a stub of `end_burn`. Canary claimed Blind+sighted snuff; that tests the helper, not FROMFORM sticky.

| Case | C | JS after |
|------|---|---------|
| eat mail | junk-mail pline | **same** |
| eat scare/YUM/salt | after mail | **same** |
| last lit Sunsword destroy | snuff + shine if `!Blind` | **same call**; Blind clone extra sticky |
| gone trio inventory | `update_inventory` | **same** |
| `o_unleash` inventory | `:721` | **same** |
| `setuwep` wield shine | not this function | **named** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped mail. Rule #2: no `fs`; `SCR_MAIL` from `objectNames` (generated). Frozen untouched. Do not import Node mail. Public-unhit unless a metallivore eats mail or the last lit Sunsword is destroyed.

## Hallucinations / overclaim

D-log / CURRENT / subject say junk-mail instead of salt, and `uwepgone` snuffs `artifact_light`. **Those two sites plus gone-trio/`o_unleash` inventory are the hunk.** Stamping **Addressed:** D-1204 is fair; fill hash `dbd3a08b` in this commit. This is **not** “Match C dispatch, callee is a stub”: `artifact_light` / `end_burn` / `update_inventory` / `pline` are live. Do **not** stamp “Match C `setuwep` Sunsword `begin_burn`” or “Match C lesshungry choke” or “Match C `youprop.h` Blind without sticky fields.” Say so: MAIL + snuff are C; `Blind_w` extra sticky is clone debt; `Tobjnam` is a local clone that matches `quan==1`.

### Clone classification (this SHA)

- MAIL arm / `uwepgone` snuff / inventory — C sites, new.
- `artifact_light` / `end_burn` / `update_inventory` — C callees, imported.
- `Tobjnam` — clone of `objnam.c`; faithful for quan=1.
- `Blind_w` — clone of `Blind` plus sticky fields (can diverge; not Must-fix this iter).
- No no-op.

## Density

One `eatspecial` PAPER hole plus the `uwepgone` callee that PAPER/destroy needs, plus the C `update_inventory` on the gone trio/`o_unleash` that the same destroy envelope uses. ~75 lines. Right-size §2b. Did not pull `doeat_nonfood` or `setuwep` begin_burn.

## Verification

Journal: canary **17**/17 (PAPER order; Sunsword `artifact_light`; Blind+sighted snuff); green+strict seed8000/0900; cohort **16**/16 + strict lengths (1500/1800/0014/0006/0361/0108/0116/0004/0012/0360/4500/2200/0002/0007/0398/0373). Public-unhit unless a metallivore eats mail or last lit Sunsword is destroyed. This audit’s full `sessions` `__RESULTS_JSON__` at `dbd3a08b`: **44**/44, Scr **11405**/11405, RNG **792838**/792838 (100%), speed `32+0.27/turn` (R² 0.868). Fortress does not eat `SCR_MAIL` or snuff Sunsword.

Grep of `git show dbd3a08b -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/seed names/hardcoded coordinates.

C read of `eat.c:2414–2486`, `wield.c:100–135` / `:873–903`, `apply.c:711–722`, `objnam.c:2290–2298` / `:2531–2541`, `youprop.h:92–103`. JS SHA `eat.js` PAPER/`o_unleash`; `wield.js` `uwepgone`/`Tobjnam`/`Blind_w`; await sites.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` unconscious).

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. `uwepgone` Blind must be youprop.h `Blind` `((HBlinded \|\| EBlinded) && !BBlinded)` without sticky `u.Blind`/`u.ublind` (D-0716). Same peel can drop `Blind_w` and use the shared prop helper other files already grew.
2. Prefer imported `Tobjnam`/`otense` (`is_plural`) over a third local clone if shine is ever used on `quan!=1`.

Named omits / do-nots:

3. lesshungry choke/fullwarn (`eat.c:2418–2421` occupation). `setuwep` Sunsword `begin_burn` / ready_weapon shine (`wield.c:115–118`). float_down→spoteffects sink beyond `Ring_gone`.
4. Do not skip D-1204. Do not restore silent `uwepgone`. Do not `readFileSync` mail. Do not FORCE junk-mail from a seed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7.5 / 10**
- One sentence: metallivore mail prints C’s junk-mail line and destroying the last lit Sunsword snuffs `artifact_light` before unwield; sticky `Blind_w` and `setuwep` vs `setworn` stay named clone debt, not Must-fix.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1204 `dbd3a08b`. Next port is already Open `scrolltele` unconscious. Not `doeat_nonfood`, not `begin_burn`.
