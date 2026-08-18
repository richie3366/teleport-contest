# Review 189 — 1da251ee — monmove.c remaining `pline_mon` (D-1227)

## Metadata
- Full / short hash: `1da251ee9464b7f511357b64e96f42ec5b1503af` / `1da251ee`
- Parent: `6a80c3f9` (docs/scripts check-hot-docs; JS parent `7998cb1e` D-1226). This file audits **this SHA only**. Archive row **Addressed:** D-1227 `1da251ee` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 20:53:46 +0200
- D-id: **D-1227**
- Stats: 11 files, +260 / −192 — `js/monmove.js` +51 / −25; `js/display.js` comments. Journal rotate noise, not JS.
- Claims to close: Open remaining `pline.c` `pline_mon` callers (named from D-1215 / review **177**). Not `msg_mon_movement`. `reviews/loop-2026-08-15/` has no unpaid pline_mon Must-fix.
- JS / map: `monmove.js` monflee / itsstuck / maybe_spin_web / postmov door. `c-js-map/turns.md`. uhitm/worn/trap / mind_blast / iron bars still named.
- Prior reviews this SHA claims to close: **177** remaining already-ported monmove sites.

## Intent vs deliverable

Git subject promises: “Match C monmove.c remaining pline_mon callers so flee/web/door/itsstuck messages store a11y.msg_loc at the monster cell, instead of printing through bare pline.”

After D-1215, `pline_mon` existed; these already-ported C sites still used `pline`, so `msg_loc` stayed 0,0. C `You_see` / `You_hear` door arms must **not** go through `pline_mon`.

The diff **does** switch those four families to `pline_mon`, uses `Adjmonnam(…, "immobile")` on flinch, `upstart(y_monnam)` / `"something"` on web, `upstart(y_monnam)` + fog/`S_LIGHT` flows on amorphous squeeze, and keeps You_see/You_hear as `pline`. It does **not** pull `msg_mon_movement`, flees_light `rn2(10)`, mind_blast, bee_eat, iron bars, or `mon_yells`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `pline_mon` | C callee `pline.c:137–150`, **already live** | youmonst → (0,0); else mx,my |
| `monflee` flinch / flee | C `:493–517`, **wired** | immobile `Adjmonnam`; else `Monnam` turns to flee |
| `itsstuck` | C `:1056`, **wired** | |
| `maybe_spin_web` | C `:1282–1286`, **wired** | always `pline_mon` + `upstart(mbuf)` |
| postmov door spotted | C `:1567/:1585/:1609`, **wired** | unlock/open/smash `Monnam` |
| amorphous squeeze | C `:1551–1553`, **wired** | `YMonnam` ≡ `upstart(y_monnam)` |
| `upstart` | C `hack.h` highc first, **clone** | |
| `Adjmonnam` | C callee `do_name.c`, **imported** | |
| You_see / You_hear door | C, **stay pline** | must not store loc |
| flees_light / Unaware | C `:495–515`, **named omit** | would add `rn2(10)` |
| mind_blast / iron bars / `mon_yells` | C other `pline_mon`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (flees_light `rn2(10)` still skipped).

## C ↔ JS fidelity

Pinned C flinch / flee (`monmove.c:492–517`), shortened:

```
            if (!mtmp->mcanmove || !mtmp->data->mmove)
                pline_mon(mtmp, "%s seems to flinch.", Adjmonnam(mtmp, "immobile"));
            else if (flees_light(mtmp)) { … rn2(10) / verbalize / Unaware … }
            else
                pline_mon(mtmp, "%s turns to flee.", Monnam(mtmp));
```

JS (`monmove.js:750–755`): same canseemon + not furniture/object mimic gate (pre-existing). Immobile → `Adjmonnam` + `pline_mon`. Else **skips** flees_light and prints “turns to flee” via `pline_mon`. That is the **named** flees_light omit (avoids `rn2(10)`), not a fake `pline_mon`. A light-fleeing monster still gets the wrong **string** (and no extra RNG). Map, not Must-fix.

Web (`:1282–1286`): `mbuf = canspotmon ? y_monnam : something`; `pline_mon("%s spins a web.", upstart(mbuf))`. Old JS used `Monnam` / `"Something spins"` as `pline`. New JS `upstart(y_monnam)` / `'something'` + `pline_mon`. `something` → “Something”. Match C, including unseen (C still `pline_mon` so loc is mx,my).

Door squeeze (`:1551–1553`): `YMonnam` + `(ptr == &mons[PM_FOG_CLOUD] || ptr->mlet == S_LIGHT) ? "flows" : "oozes"`. JS `upstart(y_monnam)` + `ptr.mndx === PM_FOG_CLOUD` (`monsterNames` has `PM_FOG_CLOUD`) or `mlet === 'S_LIGHT'`. `YMonnam` is `extern.h` `char *YMonnam` ≡ `upstart(y_monnam)`. Match. Spotted unlock/open/smash use `Monnam` not YMonnam (C). JS same.

Pinned C web (`:1279–1287`) and `itsstuck` (`:1054–1058`):

```
            if (cansee(mtmp->mx, mtmp->my)) {
                Strcpy(mbuf, canspotmon(mtmp) ? y_monnam(mtmp) : something);
                pline_mon(mtmp, "%s spins a web.", upstart(mbuf));
                trap->tseen = 1;
            }
    if (sticks(gy.youmonst.data) && mtmp == u.ustuck && !u.uswallow) {
        pline_mon(mtmp, "%s cannot escape from you!", Monnam(mtmp));
```

JS web: `upstart(canspotmon ? y_monnam : 'something')` + `pline_mon` + `tseen=1`. Shop `add_damage` still named. `itsstuck` uses imported `sticks` + `pline_mon`. Match. `d(4,4)` `mspec_used` pre-existing (C same).

Pinned C spotted unlock (`:1564–1573`): `Soundeffect(se_door_unlock_and_open, 50)` then verbose canspotmon → `pline_mon`; else if canseeit → `You_see`; else if !Deaf → `You_hear`. JS still skips the contest-empty Soundeffect (named; D-1222 only wired se_scratching). Spotted arm is now `pline_mon`; You_see/You_hear stay `pline`. Loc 0,0 on see/hear. Open/smash arms the same three-way split (`:1583–1590` / `:1607–1614`). `flags.verbose` is JS `verbose` already on this door block.

`itsstuck` (`:1055–1057`): `pline_mon("%s cannot escape from you!", Monnam)`. JS same. `sticks` already imported.

**Callee is live `pline_mon` → `set_msg_xy(mx,my)` → `pline`.** Not “Match C dispatch, writer is a stub.”

## Hallucinations / overclaim

Subject + D-1227 say flee/web/door/itsstuck store loc at the monster cell. **Those four families are the hunk.** Do **not** stamp “Match C every remaining `pline_mon`” (uhitm / worn / trap / mind_blast / iron bars still named) or “Match C flees_light.” Stamping **Addressed:** D-1227 is fair for the queued row (“remaining” already-ported monmove sites, not the whole tree).

`msg_mon_movement` was still named **on this SHA** (D-1228 next).

## Density

One C writer family already in `monmove.js`. ~51 lines. Sibling door You_see/You_hear kept as pline (same envelope). Right size. Did not glue `msg_mon_movement`.

## Branch-by-branch confirm

1. Immobile flee, canseemon: `Adjmonnam` flinch via `pline_mon`. Match.
2. Mobile flee, not flees_light: “turns to flee” via `pline_mon`. Match.
3. flees_light: JS still “turns to flee” (named; C may `rn2(10)` / verbalize / Unaware).
4. Mimic furniture/object: no fleemsg (C `M_AP_*`). Match.
5. Web, cansee + canspotmon: `upstart(y_monnam)` + `pline_mon`. Match.
6. Web, cansee + !canspotmon: “Something spins a web.” via `pline_mon` (loc still mx,my). Match.
7. Web !cansee: no pline (C). Match.
8. Amorphous fog: “flows”; other blob: “oozes”; `pline_mon`. Match.
9. Spotted unlock/open/smash: `Monnam` + `pline_mon`. Match.
10. Unseen door, canseeit: “You see …” via `pline` not `pline_mon`. Match.
11. Deaf skip hear. Pre-existing. Match C `!Deaf`.
12. `itsstuck` grabber: `pline_mon`. Match.
13. `mb_trapped` KABOOM already D-1215. Untouched. Match.
14. Pickup `Monnam` pline in `m_search_items` still `pline` (C may `pline_mon`). Named remaining.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Skipping flees_light **avoids** a new `rn2(10)` — correct for a named omit, not a FORCE.

## Verification

Journal: private canary **33**/33; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` is On (default Off) **and** one of these messages prints. Admit that. Cadence this audit: **44**/44.

## Actionable C-wrongs

None for Must-fix. Writer is live.

Named omits (map, not Must-fix):

1. flees_light `rn2(10)` / Unaware / verbalize (`:495–515`)
2. `uhitm.c` remaining `pline_mon` — already Open
3. `monmove.c` `mind_blast` — already Open
4. iron bars / bee_eat / `mon_yells`
5. door `Soundeffect` (contest-empty elsewhere; not this row)

Do not Must-fix “wrap You_see as pline_mon.” Do not wrap `msg_mon_movement` as `pline_mon` (D-1228).

## Callers / RNG ledger

C `pline_mon` at these sites only. No new `rn2`. `d(4,4)` web `mspec_used` pre-existing. Public fortress is not evidence loc is prefixed — default accessiblemsg Off.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: already-ported monmove flee/web/door/itsstuck now use live `pline_mon`; You_see/You_hear stay pline; flees_light and other files stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1227 `1da251ee`.
