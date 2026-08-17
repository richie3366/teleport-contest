# Review 109 — 27274b3b — deal_with_overcrowding limbo / elemental_clog (D-1148)

## Metadata
- Full / short hash: `27274b3bff2d7ef7f4835892c23d0f3de101ce5b` / `27274b3b`
- Parent: `5c43dbc9` (D-1147). This file audits **this SHA only**. The fix stamped **Addressed:** D-1148 without the short hash; this review commit fills `27274b3b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 08:36:43 +0200
- D-id: **D-1148**
- Stats: 12 files, +351 / −48 — `js/mon.js` +254 / −8 (dispatcher + limbo/clog + clones); `js/fountain.js` +1 comment.
- Claims to close: Open queue `fountain.c` `gush` `deal_with_overcrowding` (named). Not lava xkilled. Review **99** named omit of failed-rloc overcrowding. `reviews/loop-2026-08-15/` has no open overcrowding Must-fix.
- JS / map: `mon.js` `deal_with_overcrowding` / `m_into_limbo` / `migrate_mon` / `elemental_clog`; callers `minliquid_core` + `mnexto`. `c-js-map/data.md` fountain gush; `turns.md` `mnexto`. Steed Fly/Lev, `engulfing_u`, `mnearto` overcrowding, full `mdrop_obj` worn/`extract_from_minvent` still named. **`mongone` invent is not named as skipping `mdrop_special_objs`.**
- Prior reviews this SHA claims to close: **99** named failed `rloc` overcrowding; D-1147 next-port.

## Intent vs deliverable

Git subject promises: “Match C mon.c deal_with_overcrowding so a monster that cannot rloc out of lava/pool (or mnexto next to the hero) goes into limbo or elemental_clog, instead of staying put.”

Old JS `minliquid_core` after failed survivor `rloc` and `mnexto` after failed `enexto` returned with the monster still on the cell. C `mon.c:3986–3995` `deal_with_overcrowding`: endgame → `elemental_clog`, else `m_into_limbo`. Callers: lava `:1061–1062` `rloc(RLOC_MSG)`, pool `:1104–1105` `rloc(RLOC_NOMSG)`, `mnexto` `:3966–3968`. Queue said “gush overcrowding.” C `gush` never calls this directly — it `minliquid`s an occupant (D-1117). Same callee pattern as review **99** (queue “gush lava”, port hit `minliquid_core`).

The diff **does** port the dispatcher, `m_into_limbo` (`MON_LIMBO` + `migrate_mon` current ledger `MIGR_APPROX_XY`), `migrate_mon` (`unstuck` + `mdrop_special_objs` when `mx`, then `migrate_to_level`), `elemental_clog` (besieged / victim pick / prior-plane), and the three live callers. It does **not** wire `mnearto` `:4067` / `:4081` (named). Steed Fly/Lev and `engulfing_u` stay named.

**Miss:** C `elemental_clog` `:3932–3936` is `MON_OBLITERATE; mongone(victim); rloc_to(mon, mx, my)`. C `mongone` `:3275–3282` is `unstuck`; **`mdrop_special_objs`**; `discard_minvent`; `m_detach`. JS `mongone` (`mon.js:1875–1891`) sets **`minvent = null`**, splices `fmon`, clears ustuck/usteed pointers, `mx=my=0`, `newsym`. This SHA **added** `mdrop_special_objs` and wired it only through `migrate_mon` (the clogged monster leaving). The **victim** still hits the stub `mongone`. Amulet / invocation / Rider corpse / quest arti on the victim **vanish** instead of dropping. That is a C-wrong on the claimed clog path, not a named omit of worn `extract_from_minvent`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `deal_with_overcrowding` | C callee, **new** | `mon.c:3986–3995` |
| `m_into_limbo` | C callee, **new** | `mon.c:3833–3840` |
| `migrate_mon` | C callee, **new** | `mon.c:3843–3861` |
| `elemental_clog` / `ok_to_obliterate` | C callee, **new** | `mon.c:3864–3949` |
| `migrate_to_level` | C callee, **imported** | `teleport.js:2037`; partial (worm/isshk/leash named) |
| `mdrop_special_objs` | C callee, **clone** | `steal.c:852–870`; used from `migrate_mon` only |
| `mdrop_obj_overcrowd` | C `mdrop_obj`, **clone** | skips `extract_from_minvent` / saddle shop / extrinsics — **named** |
| `obj_resists_00` | C `obj_resists(0,0)`, **clone** | invocation/Rider TRUE; else `rn2(100)` fail |
| `mongone` | C callee, **pre-existing stub** | **C-wrong on clog victim** — no `mdrop_special_objs` |
| `rloc_to` / `unstuck` / `rloco` / `You_feel` | C callees, **imported** | real |
| `ledger_no` / `is_home_elemental` / `mon_has_amulet` / `is_quest_artifact` | C callees, **local clones** | match existing JS copies |
| `mnexto` failed enexto / minliquid failed rloc | C callers, **wired** | `mon.c:3966–3968`, `:1061`, `:1104` |
| `mnearto` overcrowding | C caller, **named omit** | `mon.c:4067`, `:4081` |
| steed `#if 0` overcrowding | C dead, **not C** | `steed.c:793–804` `#else` of `#if 1` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `MIGR_APPROX_XY=1` / `MIGR_RANDOM=0` / `MON_LIMBO` / `MON_OBLITERATE` / `MON_ENDGAME_MIGR` match `const.js`. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** ordinary invent `obj_resists(0,0)` always `rn2(100)` then false; clog `You_feel("besieged.")` first time or every 200 moves with `rn2(2)`. Path **public-unhit** on gush `m_at` overcrowding and on endgame clog.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Do not restore the failed-rloc no-op. Do not kill the steed on overcrowding (`steed.c` live path is `killed`/`monkilled`, `#if 1`). Do not treat `migrate_to_level`’s named worm/isshk skips as this Must-fix. **Do** make `mongone` drop specials before discard — C `mon.c:3277–3280`; the new `mdrop_special_objs` already exists in this file.

## C ↔ JS fidelity

### Dispatcher and dungeon limbo

C `mon.c:3986–3995` / `:3833–3840` / `:3843–3861`: `In_endgame` → clog else `mstate \|= MON_LIMBO`; `migrate_mon(ledger_no(&u.uz), MIGR_APPROX_XY)`. `migrate_mon`: if `mx` then `unstuck` + `mdrop_special_objs`; always `migrate_to_level(..., NULL)`. JS matches. `ledger_no` is `dlevel + dungeons[dnum].ledger_start` (`dungeon.c:1376–1378`). `migrate_to_level` splices `fmon`, encodes dest, `mx=my=0` — monster leaves the cell. That is the Open **limbo** effect.

`obj_resists(obj,0,0)` (`zap.c:1458–1472`): Amulet / Book / Candelabrum / Bell / Rider corpse TRUE with **no** `rn2`; else `chance = rn2(100)` then `chance < (oartifact ? achance : ochance)` with both chances 0 → false. JS `obj_resists_00` uses `objectNames[obj.otyp]` string compare for the five TRUE otyps, then `is_rider(mons(obj.corpsenm))` for CORPSE, then `rn2(100); return false`. Match, including the burned `rn2(100)` on ordinary gear. Quest arti extra via `is_quest_artifact` (`oartifact == urole.questarti && questarti != 0`). Match on the **migrate_mon** drop path.

Off-map `mdrop_special_objs`: C `extract_from_minvent(..., TRUE, TRUE)` then `rloco`. JS unlink + `rloco` when `!mon.mx`. `migrate_mon` only calls `mdrop_special_objs` when `mx` nonzero (C: failed prior arrival already dropped). Match.

`migrate_to_level` (`teleport.js:2037–2076`): splice `fmon`, unshift `migrating_mons`, `MON_MIGRATING`, encode `mtrack`/`mux`/`muy`, `mx=my=0`. Named omit: `mon_leave` worm/isshk residency, leash, light sources. Enough for “leave this cell.” Not a stub of limbo.

`mdrop_obj_overcrowd` unlinks, clears `owornmask`/`mw`, `place_object`/`stackobj`. C `mdrop_obj` (`steal.c:814–845`) calls `extract_from_minvent`, optional saddle `no_charge`, `flooreffects`, then `update_mon_extrinsics`. **Named** thin clone. Worn Amulet on a **migrating** monster may skip unwear. Map debt, not the victim path.

### `elemental_clog` pick order — body matches

C `mon.c:3884–3948`: `In_endgame` only; `msgmv` static vs JS `game._elemental_clog_msgmv` (reset per game — correct for one-game JS); `!msgmv \|\| (moves-msgmv)>200` then `!msgmv \|\| rn2(2)` `You_feel("besieged.")`. Scan `fmon`: skip dead / self / `mx==0&&my==0` / amulet / `!ok_to_obliterate` (Wizard, rider, emin/epri/eshk, ustuck, usteed). Elemental: foreign → `m1`, home → `m2`. Else untame: lowest `m_lev` → `m3`, else first other → `m4`. First tame → `m5` **and break**. Victim `m1?:m2?:m3?:m4?:m5`. Then `MON_OBLITERATE; mongone; rloc_to(mon,mx,my)` else if `!Is_astralevel` `dlevel--`, `MON_ENDGAME_MIGR`, `migrate_mon(..., MIGR_RANDOM)`.

JS `elemental_clog` follows that scan and dest. `ok_to_obliterate` uses `has_emin`/`has_epri`/`has_eshk` (`mextra`). `is_home_elemental` is the makemon.c plane switch (S_ELEMENTAL + air/fire/earth/water `Is_*level`). `mon_has_amulet` walks minvent for `AMULET_OF_YENDOR` otyp (C `wizard.c`). **The pick + migrate-else arms match C.** The victim **removal** does not.

C `fmon` is an `nmon` linked list; JS `game.fmon` is an array. Scan order matches if fmon is nmon order (makemon unshift). First tame **break** means later tames never become `m5` — JS `break` in the tame else. `m3` is strictly decreasing `m_lev` (or first when `m_lev==0` because `!m_lev`). Match.

C `zm` is always NULL leftover; JS `|| null`. Astral with no victim: C does nothing (no limbo). JS same (`else if (!Is_astralevel)`). Do not send Astral overflow to `m_into_limbo` — C `deal_with_overcrowding` only calls `elemental_clog` in endgame, and clog no-ops the migrate on Astral. JS dispatcher already gated. Match.

### C-wrong: clog victim `mongone`

C `mon.c:3267–3282`:

```
mdef->mhp = 0;
if (mdef->isgd && !grddead(mdef)) return;
unstuck(mdef);
mdrop_special_objs(mdef);   /* Amulet / invocation / Rider / quest arti */
discard_minvent(mdef, FALSE);
m_detach(mdef, mdef->data, FALSE);
```

JS `mongone`:

```
mtmp.minvent = null;  /* discards specials with the rest */
/* splice fmon; ustuck/usteed = null; mx=my=0; newsym */
```

No `mhp=0`, no `unstuck()` (pointer clear only), no `mdrop_special_objs`, no `discard_minvent`. Comment even says “Drop invent silently.” D-log named “full `mdrop_obj` worn/saddle/`extract_from_minvent`” on the **clone**, not this `mongone` skip. Subject / D-log say Match C `mongone` then `rloc_to`. **Match C dispatch, callee is a stub:** `elemental_clog` is new; `mongone` on the victim contradicts `mon.c:3277–3280`.

Dungeon `m_into_limbo` is fine: that monster is the one `migrate_mon` drops specials for. Endgame **victim** is the other monster.

### Callers

C lava survivor `:1059–1062` `fire_damage_chain` then `if (!rloc(RLOC_MSG)) deal_with_overcrowding`. Pool survivor `:1103–1105` `water_damage_chain` then `rloc(RLOC_NOMSG)`. JS `:1437–1439` / `:1468–1470` match flags. `mnexto` failed `enexto`/`isok` → overcrowding then return; omits `mon_telecontrol` (named, wizard). `mnearto` othermon overcrowding **not** wired — named. C `gush` still only `minliquid` — comment-only fountain.js is honest.

## Hallucinations / overclaim

D-log / CURRENT / subject say a monster that cannot `rloc` (or `mnexto`) goes into limbo or `elemental_clog` instead of staying put. **Limbo / dispatcher / mnexto / minliquid wires are that hunk.** Stamping **Addressed:** D-1148 is fair for the Open **failed-rloc / failed-enexto leave the cell**. Fill hash `27274b3b` in this commit. Do **not** stamp it as “Match C `mongone`” or “Amulet survives clog.” Explicitly: **Match C `elemental_clog` victim `mongone`, callee is a stub** that nulls `minvent` instead of `mdrop_special_objs`.

## Density

Dispatcher + limbo + clog + the two live callers is one C family, ~230 lines — upper §2b but not a second hypothesis. Quality cost of that clone volume is this miss: `mdrop_special_objs` shipped beside `mongone` and was not called from it.

## Verification

Private canary **46**/46 (dungeon limbo; ordinary invent `rn2(100)`; Amulet drop **on migrate_mon**; foreign vs home elemental; wizard/rider/eshk skip; pet last-resort; astral stay; no-victim prior-plane; besieged first/`msgmv` 200; `mnexto` STONE fail; steed sync; lava fire-resist rloc-fail → limbo; pool drown death not limbo). That canary can pass while clog-victim Amulet still vanishes if the Amulet test hung the item on the **clogged** monster, not the victim. Green+strict seed8000/0900. Cohort **24**/24 (0014 gush + 0360 lava + 4500/2200/0030/0004/0002/0012/0006/0007/0009/0106/0108/0116/0367/0373/0383/0398/1500/1800/0060/0102/0700/0017) + strict 8000/0900/0014/0360/4500/2200/0004/0030. Path **public-unhit** on gush `m_at` overcrowding. Cadence #1460 **44**/44 does not hit limbo or clog. Fortress is not a C proof.

## Actionable C-wrongs

1. **`mongone` must `unstuck` then `mdrop_special_objs` then discard** (`mon.c:3275–3282`) before `m_detach`/fmon splice. `elemental_clog` victim currently `minvent=null`. Reuse this SHA’s `mdrop_special_objs` (off-map arm already `rloco`). Do not pull full `mdrop_obj` worn extrinsics / saddle shop in the same iter unless they fall out of `extract_from_minvent`. Queueable as one port.

Named omits / do-nots (map / Open, not Must-fix):

2. `mnearto` overcrowding (`mon.c:4067`, `:4081`).
3. Thin `mdrop_obj` `extract_from_minvent` / saddle / `update_mon_extrinsics` (`steal.c:825–845`) on the **migrate** path.
4. Steed Flying/Levitation `minliquid` gate; `engulfing_u` drown flush; `mnexto` `mon_telecontrol`.
5. `migrate_to_level` worm/isshk/leash/light (`dog.c`).
6. Do not restore the failed-rloc stay-put. Do not `#else` steed overcrowding. Do not skip `obj_resists(0,0)` `rn2(100)` on ordinary gear.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **5 / 10**
- One sentence: failed `rloc`/`enexto` now leave via real limbo/`elemental_clog` pick+`rloc_to`, but clog’s victim still hits a `mongone` that nulls inventory instead of C’s `mdrop_special_objs`.
- Must-fix prepends `mongone` `mdrop_special_objs` (this file). Next port ships that, not `invocation_message`.

**Addressed:** D-1149 `cdaccd3a`
