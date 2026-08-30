# Review 659 — e32e222d — save.c savegamestate JSON worn / RANGE_GLOBAL (D-1698)

## Metadata
- Full / short hash: `e32e222d4cd012c4e12645bd0f2b61e0ab94b54c` / `e32e222d`
- Parent: `c0395a16` (D-1697). This file audits **this SHA only** (sixth of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1698 `e32e222d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 02:19:29 +0200
- D-id: **D-1698**
- Stats: `js/save.js` +225/−29; `js/lev_json.js` +182/−1; `js/artifact.js` +14/−2; `js/eat.js` +5/−1; `js/apply.js` +4; `js/mon.js` +1; `js/mkobj.js` +1/−1. Total `js/` insertions **432** >250. Band **200–450**.
- Claims to close: Cluster 4 RANGE_GLOBAL + worn. Not getlev place (D-1699). `reviews/loop-2026-08-15/` has no unpaid savegamestate Must-fix.
- JS / map: `save.js` `restWornFromInvent` / `serContext`; `lev_json.js` `relinkGlobalTimersLights`. `c-js-map/harness.md`.
- Prior reviews: **657** named RANGE_GLOBAL; **656** light `mx>0` still open.

## Intent vs deliverable

Git subject promises: JSON save drops `worn`/`iflags` and relinks RANGE_GLOBAL timers against invent and migrating, instead of invlet slots and bare `o_id` pack lamps.

`node scripts/csym.mjs savegamestate` → `save.c:264–333`. `restgamestate` `restore.c:521–736`. `restore_timers(RANGE_GLOBAL)` `:654–655` **before** invent; `setworn` `:687–699`; `relink_timers(FALSE)` / `relink_light_sources(FALSE)` `:725–726`. `find_oid` `shk.c:2776–2804`. `restore_artifacts` `artifact.c:132–146` (`hack_artifacts` after artiexist/artidisco). C **does not** save `iflags` (perm_invent moved off `flags`).

```687:699:nethack-c/upstream/src/restore.c
    for (otmp = gi.invent; otmp; otmp = otmp->nobj)
        if (otmp->owornmask)
            setworn(otmp, otmp->owornmask);
    otmp = uwep;
    uwep = 0;
    setuwep(otmp);
    if (!uwep || uwep->otyp == PICK_AXE || uwep->otyp == GRAPPLING_HOOK)
        gu.unweapon = TRUE;
```

```654:672:nethack-c/upstream/src/restore.c
    restore_timers(nhfp, RANGE_GLOBAL, 0L);
    restore_light_sources(nhfp);
    gi.invent = restobjchn(nhfp, FALSE);
    ...
    gm.migrating_objs = restobjchn(nhfp, FALSE);
    gm.migrating_mons = restmonchn(nhfp);
```

Parent: `worn: serWorn` invlet table; merged `payload.iflags`; no `timer_global`. The diff **does** drop those keys; `owornmask` + `restWornFromInvent` (`setworn` then `setuwep` / swap / quiver); stamp victual/polearm ids; `timer_global`/`lights_global`/`timer_id`; migrating; fruit; `quest_status`; `restore_artifacts` (`artidisco` + `hack_artifacts`); `relinkGlobalTimersLights` vs invent + migrating, never `billobjs`. Missing keys = old save. Named: uid/nhuuid/urealtime/wreserve/killers/oracles/`save_bc`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `restWornFromInvent` | LIVE analogue of `:687–699` | JS `setworn` skips W_WEP; `setuwep` matches C reset |
| `setworn` / `setuwep` | LIVE | imported |
| `snapshotGlobalTimers`/`Lights` | LIVE analogue of `:297–298` | Lights LS_MONSTER still timeout.c `mon_is_local` |
| `relinkGlobalTimersLights` | LIVE analogue of `:725–726` | `findOidInRoots` invent/migrating; never billobjs |
| `restore_artifacts` | LIVE subset | artidisco + `hack_artifacts`; artiexist already on payload |
| `serWorn` / `findByInvlet` | deleted | do **not** restore invlet worn |
| uid / `save_bc` / oracles | OMIT named | |
| getlev place | OMIT named | D-1699 |

`node scripts/sym.mjs`:

```
restore_artifacts js/artifact.js:327   sync
setworn          js/do_wear.js:442   sync
setuwep          js/wield.js:245   sync
relinkGlobalTimersLights js/lev_json.js:599   sync
snapshotGlobalTimers js/lev_json.js:536   sync
snapshotGlobalLights js/lev_json.js:545   sync
restWornFromInvent NOT EXPORTED — 1 LOCAL js/save.js:330
findOidInRoots   js/lev_json.js:497   sync
```

Deleted `serWorn`/`findByInvlet`. `--can js/save.js js/do_wear.js setworn` / `js/artifact.js restore_artifacts`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**iflags / worn.** C never writes `iflags`; `Sfo_you` does not store a parallel invlet table — restore walks `owornmask`. JS drop is **Match C**, not a named omit. `serHero` skips `WORN_SLOTS`. **Match.**

**setworn / setuwep.** C `:687–699` after invent. JS the same order after `deserInventArray`. C `setworn` fills `uwep`; then `uwep=0`; `setuwep` recomputes `unweapon`; pick-axe/grapple force `unweapon`. JS `setworn` does not place W_WEP — collects mask then `setuwep` after nulling. **Match the C reset**, not JS `setworn`’s W_WEP hole. Swap/quiver via `setuswapwep`/`setuqwep` because JS `setworn` skips those too. C loop `setworn` would set them. **Match via the wield helpers.**

**RANGE_GLOBAL timers/lights.** C `:297–298` `save_timers`/`save_light_sources(RANGE_GLOBAL)` (non-local). Restore `:654–655` **before** invent (ids, `needs_fixup`); relink `:725` **after** invent+migrating. JS snapshot `!timer_is_local` / `!light_is_local`; deser lists; invent; `relinkGlobalTimersLights`; install. TIMER_MONSTER throw ≡ C panic. **Match order and invent/migrating roots.** `find_oid` also searches fobj/buried/fmon; RANGE_GLOBAL objects are not there. **Match for pack lamps.** Never `billobjs`. **Match C omission.**

**LS_MONSTER.** `snapshotGlobalLights` uses the same `light_is_local` as D-1695 (`timeout.c` migrating/mydogs), not `light.c:373` `mx>0`. Already Must-fix **656**. Do not enqueue a new family.

**artifacts.** C `:132–146` Sfi artiexist + artidisco then `hack_artifacts`. JS artiexist already JSON; this SHA copies `artidisco` then LIVE `hack_artifacts`. **Match the unsaved specials.** Full `Sfi_arti_info` named if artiexist bits were incomplete before.

**context ids.** C comment `:648–651`: victual/tin/spellbook/polearm recovered via o_id/m_id. JS stamps on save (`eat.js`/`apply.js`) and `rebindContextIds`. **Match.**

Callee closure (savegamestate arm). LIVE: `setworn`, `setuwep`, `relinkGlobalTimersLights`, `restore_artifacts`, `snapshotGlobal*`, fruit helpers. CLONE: `light_is_local` (656). OMIT named: uid/nhuuid/urealtime/`save_bc`/oracles/killers; getlev place. STUB: **none** — invlet worn **deleted**. Combined-arm ships. Not “callee stubbed.”

## Hallucinations / overclaim

Subject “drops worn/iflags and relinks RANGE_GLOBAL … instead of invlet slots and bare o_id pack lamps”: **true** for seed0105-class pack lamps after `Sy`. D-log “iflags stay from nethackrc”: **true** (C). Do **not** stamp “Match C `save_bc`.” Do **not** stamp “Match C `getuid`.” Do **not** stamp “Match C light.c `mx>0`.” Do **not** restore `serWorn`. Do **not** merge `payload.iflags`. Ledger dog 25/26 is still Cluster 5.

## savegamestate field order

C `save.c:264–333`: `save_timers(RANGE_GLOBAL)` → `save_light_sources(RANGE_GLOBAL)` → `saveobjchn(invent)` → `saveobjchn(migrating_objs)` → `savemonchn(migrating_mons)` → fruit → `save_killers` → `save_oracles` → `save_artifacts` → `save_waterlevel` / `save_bc` → you/ustuck ids. JS `timer_global` / `lights_global` then invent arrays, migrating, fruit, `quest_status`, `artidisco`. Killers/oracles/`save_bc`/uid/nhuuid/urealtime named. **Match the live subset.** Missing keys on old saves skip relink/worn helpers — C has no “old save”; JS fallback is a port compatibility, not a C branch.

**`restore_timers(RANGE_GLOBAL)` before invent.** C writes timeout nodes with `needs_fixup` object ids, then reads invent, then `relink_timers` swaps id→pointer. JS deser the timeout array first (still numeric ids), hydrate invent, then `relinkGlobalTimersLights`. **Match `:654–655` then `:725`.** Installing the lists onto `game.timer_base` **after** relink **Match** C having them on the global chain before play resumes.

**Fruit / `ffruit`.** C `savefruitchn` / `restfruitchn`. JS already had JSON fruit; this SHA keeps it on the gamestate blob. **Match** if the parent already serialized the chain; this peel does not re-invent `fruitadd`.

**`unweapon`.** C after `setuwep`: pick-axe / grappling hook force `unweapon`. JS `setuwep` already had that. **Match** if `restWornFromInvent` calls `setuwep` with the collected W_WEP object. A bare `owornmask` without going through `setuwep` would skip `unweapon` — this SHA’s helper does call it.

**Migrating mons.** C `restmonchn` migrating then later getlev `mon_arrive`. This SHA persist+hydrate migrating arrays. Place/envelope is D-1699. **Match savegamestate, not getlev.**

C `savegamestate` (`save.c:296–307`):

```296:307:nethack-c/upstream/src/save.c
    save_timers(nhfp, RANGE_GLOBAL);
    save_light_sources(nhfp, RANGE_GLOBAL);
    saveobjchn(nhfp, &gi.invent);
    save_bc(nhfp);
    saveobjchn(nhfp, &gm.migrating_objs);
    savemonchn(nhfp, gm.migrating_mons);
```

JS omits `save_bc` (named). Timers/lights **before** invent **Match**. `save_bc` between invent and migrating is the ball/chain unusual-state path — not pack lamps.

## Density

§2b: one `savegamestate`/`restgamestate` envelope (worn + RANGE_GLOBAL + context ids + artifacts). Related. +432. Did not glue getlev place.

**`timer_id`.** C timeout nodes have stable ids for save. JS stamps `timer_id` on snapshot so relink can match. **Match needs_fixup.** Duplicate ids would panic C; JS throw on miss **Match** the panic, not silent drop.

**`hack_artifacts`.** C re-derives `artiexist` side effects (sppexist, etc.) after loading bits. JS `restore_artifacts` calls LIVE `hack_artifacts`. **Match `:132–146`.** Do **not** skip `artidisco` (this SHA copies it).

**`setnotworn` / ball.** C `save_bc` ball/chain. Named. `owornmask` W_BALL on invent still goes through `setworn`. **Match worn loop, not save_bc.**

**RNG.** Relink/worn/artifacts have no `rn2`. `hack_artifacts` may. Pre-existing. This SHA does not add RNG. **Match.**

## Verification

D-log: green+strict seed8000/0900; seed0013 99/99; seed0105 lamp; stairs 0015/0700/0014; trap-same-floor 17/17; cohort 1500/1800/0012/0004/0007/2200/0383. Public restore **is** hit. Pack-lamp relink is seed0105. `save_bc` **public-unhit**.

## Actionable C-wrongs

None new for Must-fix. Same family as **656**: `snapshotGlobalLights` LS_MONSTER `mx>0`. Named: uid/nhuuid/urealtime/wreserve/killers/oracles/`save_bc`; `reset_oattached_mids`; getlev place (D-1699); leftover `ledger_no` clones. Do **not** add `restWornFromInvent` #2. Do **not** add `find_oid` walking `billobjs`. Do **not** re-port other ledgers (D-1697). Do **not** restore invlet `worn`.

Verdict: **ACCEPT-WITH-DEBT**
