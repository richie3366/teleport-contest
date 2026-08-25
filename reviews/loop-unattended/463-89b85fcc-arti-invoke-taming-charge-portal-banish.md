# Review 463 — 89b85fcc — artifact.c TAMING / CHARGE / PORTAL / BANISH (D-1502)

## Metadata
- Full / short hash: `89b85fcca00232663a42d9d22da4b75751491b36` / `89b85fcc`
- Parent: `83b29455` (D-1501). This file audits **this SHA only** (ninth of ten `js/` commits since review **454**). Archive **Addressed:** D-1502 `89b85fcc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 23:16:53 +0200
- D-id: **D-1502**
- Stats: 14 files, +689 / −100 — `js/artifact.js` +189; `js/read.js` +377; `js/dog.js` +7; `js/dungeon.js` +9; `js/mon.js` export; `js/zap.js` recharge re-point. **588 JS insertions** (band **200–450**).
- Claims to close: Open `artifact.c` TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH (named from D-1488 / review **449**). Not Palantir artilist. `reviews/loop-2026-08-15/` has no unpaid invoke-special Must-fix after **449**’s two items (D-1494 / D-1495).
- JS / map: `artifact.js` four helpers + switch; `read.js` `seffect_taming` / `charge_ok` / `recharge`; `dog.js` MANFOOD; dungeon/mon exports. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **449** named those four specials as no-cost `nothing_happens`.

## Intent vs deliverable

Git subject promises: `#invoke` TAMING, CHARGE_OBJ, CREATE_PORTAL, and BANISH run the C specials (taming scroll, recharge, dungeon portal, Demonbane migrate) instead of printing Nothing happens.

Pinned C `artifact.c` `:2150–2172`: if `inv_prop > LAST_PROP`, **always** `arti_invoke_cost` then the full switch. Helpers `invoke_taming` `:1768–1777` (`zeroobj` + `otyp=SCR_TAMING` + `seffects`); `invoke_charge_obj` `:1847–1864` (`getobj("charge", charge_ok, GETOBJ_PROMPT|GETOBJ_ALLOWCNT)` + `recharge`); `invoke_create_portal` `:1866–1931` (dungeon menu + `goto_level`); `invoke_banish` `:1962–2019` (`find_hell`, `migrate_mon` / `u_teleport_mon`). Callees `read.c` `seffects` `:2236–2238` / `seffect_taming` `:1679–1719` / `maybe_tame` `:1043–1063` / `charge_ok` `:689–724` / `recharge` `:729–1008`; `dog.c` `tamedog` `:1143–1281` (scroll nulls `obj` at `:1150–1154`; `obj && dogfood >= MANFOOD` at `:1247`); `mon.c` `migrate_mon`; `dungeon.c` `dunlevs_in_dungeon` `:1332` / `ledger_no` `:1376` / `find_hell` `:1949`. Palantir `artilist.h:237` is `#if 0`; the switch arm is still live. Generated `artifacts_data.js` has no Palantir. Live arts: Express Card `inv_prop` 73 = `CHARGE_OBJ`; Eye of the Aethiopica 75 = `CREATE_PORTAL`; Demonbane 78 = `BANISH`.

Old JS (D-1488): a `live` whitelist skipped those four `inv_prop` values so `rnz` never ran and the helpers did not exist.

The diff **does** drop that whitelist (cost then switch like C), add the four helpers, port `seffect_taming`/`maybe_tame`/`charge_ok`/`recharge` (wand/ring/tool), null-safe MANFOOD so zeroobj does not `place_object`/`dog_eat`, export `migrate_mon`/`resist`/`dunlevs_in_dungeon`/`ledger_no`, and re-point zap AD_ELEC ring through full `recharge`. It **does not** add Palantir to artilist. Named. It **does not** put `SCR_TAMING` on `doread`’s allow list (reading the real scroll still “not implemented”). Named as a different caller. It **does not** port `GETOBJ_ALLOWCNT` count prefix. Named. It **does not** add `tamedog` `is_covetous` / `is_demon` vs hero. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `arti_invoke` four cases | C `:2155–2167`, **LIVE this SHA** | cost always; no `live` skip |
| `invoke_taming` | C `:1768–1777`, **LIVE** | `{ otyp: SCR_TAMING }` ≡ C zeroobj+otyp |
| `seffects` / `seffect_taming` / `maybe_tame` | C `read.c`, **LIVE this SHA** | |
| `resist` | C `zap.c`, **LIVE export** | was local; `tell` still void |
| `tamedog` MANFOOD | C `:1247`, **LIVE this SHA** | scroll-null already existed |
| `invoke_charge_obj` | C `:1847–1864`, **LIVE** | |
| `getobj_charge` | C invent getobj PROMPT\|ALLOWCNT, **CLONE minus count** | named |
| `charge_ok` / `recharge` | C `:689–1008`, **LIVE** | wand/ring/tool + default loss |
| `wand_explode` / `stripspe` / `p_glow1–3` | C, **LIVE** local read.js | `p_glow2(...,true)` ≡ `p_glow3` |
| `invoke_create_portal` | C `:1866–1931`, **LIVE** | |
| `select_menu_pick_one` | C `select_menu` PICK_ONE, **LIVE** | |
| `next_to_u` / `goto_level` | C `apply.c` / `do.c`, **LIVE** | |
| `In_endgame` / `In_quest` | C `dungeon.h`, **LIVE** `const.js` | |
| `invoke_banish` | C `:1962–2019`, **LIVE** | |
| `is_demon` / `is_dprince` / `is_dlord` | C `mondata.c`, **LIVE** | |
| `couldsee` | C `vision.c`, **LIVE** | |
| `find_hell` / `dunlevs_in_dungeon` / `ledger_no` | C `dungeon.c`, **LIVE export** | |
| `migrate_mon` | C `mon.c`, **LIVE export** | → `migrate_to_level` |
| `u_teleport_mon` | C `teleport.c`, **LIVE** | |
| `Inhell` | C `In_hell` hellish flag, **CLONE** `dnum===GEHENNOM` | |
| Palantir artilist | C `#if 0`, **OMIT named** | |
| `GETOBJ_ALLOWCNT` | C invent.c, **OMIT named** | |
| `tamedog` covetous / demon-vs-hero | C `:1245–1246`, **OMIT named** | |
| `doread` SCR_TAMING | C `doread`→`seffects`, **OMIT** (gate still excludes) | different caller |
| `blessed_scroll` tameness bump | C `:1227–1230`, **OMIT named** (pre-existing) | |

`node scripts/sym.mjs` (new helpers + re-pointed `migrate_mon` / `resist` / dungeon exports / `recharge_elec_ring`):

```
invoke_taming / invoke_charge_obj / invoke_create_portal / invoke_banish
                 NOT EXPORTED — 1 LOCAL each in js/artifact.js
seffects         js/read.js:1273   ASYNC
seffect_taming   NOT EXPORTED — 1 LOCAL js/read.js:904
maybe_tame       NOT EXPORTED — 1 LOCAL js/read.js:884
charge_ok        js/read.js:668   sync
recharge         js/read.js:692   ASYNC
tamedog          js/dog.js:345   ASYNC
migrate_mon      js/mon.js:1355   ASYNC   (was local; this SHA exports)
resist           js/zap.js:1725   ASYNC   (was local; this SHA exports)
             !! ALSO 3 LOCAL CLONES — IMPORT the export
dunlevs_in_dungeon js/dungeon.js:572  (+ 4 local clones)
ledger_no        js/dungeon.js:575   (+ 8 local clones)
find_hell        js/dungeon.js:565   sync
next_to_u        js/apply.js:1519   ASYNC
goto_level       js/do.js:1316   ASYNC
u_teleport_mon   js/teleport.js:1783   ASYNC
Inhell           js/minion.js:71   sync  (+ 3 local clones)
recharge_elec_ring NOT EXPORTED — 1 LOCAL js/zap.js:1537 (now calls recharge)
dogfood          js/dogmove.js:118   sync
setmangry        js/mon.js:950   sync
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG (public-unhit `#invoke`):** TAMING `resist` `rn2(100+alev-dlev)` (zeroobj `oclass==0` → alev=`ulevel`, matching C ILLOBJ); CHARGE wand `rn2(343)` explode / `rn1`/`rnd` fill, ring `rnd(3)`/`rnd(2)`/`rn2(7)`, tool `rnd`/`rn1`/`d(2,4)`; PORTAL none in the helper (menu); BANISH `rn2(chance)` / `rn2(dunlevs)` / Inhell `u_teleport_mon`. Cost `rnz(100)` now **does** run for these four (D-1488 skipped it). Zap AD_ELEC ring now consumes the **full** `recharge(...,0)` stream instead of the old local subset — **shared** with `maybe_destroy_item`, not a seed gate.

## C ↔ JS fidelity

Switch / cost. C `:2150–2152` cost then every special. JS deleted the `live` whitelist. **Match.** Default `impossible` still absent (pre-existing).

**TAMING.** C `:1772–1775` `pseudo = zeroobj; pseudo.otyp = SCR_TAMING; seffects(&pseudo)`. JS `{ otyp: SCR_TAMING }` — no cursed/blessed, no oextra, **oclass stays 0**. That **matches C** (zeroobj `oclass` is `ILLOBJ_CLASS`). Do not “fix” it to `SCROLL_CLASS`; that would change `resist` alev from `ulevel` to 9 and would null `obj` in `tamedog`.

`seffects` exercises `oc_magic` then `case SCR_TAMING: seffect_taming`. **LIVE.** `seffect_taming` swallow → one `maybe_tame(ustuck)`; else `bd = Confusion?5:1` 3×3 / 11×11, `m_at` plus steed at (0,0). JS `!!(u.HConfusion)` is C `Confusion` (`youprop.h:84` H only). **Match `:1685–1718`.** Messages: nothing interesting happens/seems; neighborhood is/seems (un)friendlier; `known` if `vis_results>0`. **Match.** `maybe_tame`: cursed `setmangry`; else `!resist(oclass,0,NOTELL) || isshk` then `tamedog(...,false)`. **Callees LIVE.** `resist` ignores `tell` (no `shieldeff`); NOTELL wants that.

`tamedog` `:1150` already nulls SCROLL/SPBOOK. Zeroobj is **not** that class, so `obj` stays the pseudo. C `:1247` `obj && dogfood >= MANFOOD` → APPORT (4) ≥ MANFOOD (3) → return false **after** peaceful. JS this SHA adds that conjunct so the later `if (obj) place_object/dog_eat` does not swallow a fake scroll. **Match C’s skip-eat / skip-tame for zeroobj.** Peaceful still happens earlier (`:1174`). Neighborhood “friendlier” is the Palantir-shaped result C actually gets from zeroobj, not full `mtame`.

Named: `is_covetous` / `is_demon && !hero-demon` still missing, so JS **can** `mtame` those when C would stop after peaceful. `doread` still rejects `SCR_TAMING` before `seffects` — reading a real scroll is not this special.

**CHARGE_OBJ.** Cancel `getobj` → `age=0` `ECMD_CANCEL`. **Match `:1855–1857`.** `b_effect = blessed && (oart.role == Role_switch || NON_PM)`. JS `Role_switch()` is `urole.mnum`. **Match `:1859–1861`.** `recharge(otmp, b_effect?1:cursed?-1:0)` then `update_inventory`. **Match.**

`charge_ok`: wand SUGGEST; charged known ring SUGGEST; weptool EXCLUDE; lantern/oil/(unIDed magic lamp) SUGGEST; charged tool SUGGEST vs DOWNPLAY; else EXCLUDE_SELECTABLE. **Match `:689–723`.** `otyp_is_charged` uses `oc_charged` plus a name list where the generated table omits the bit — same pattern as doname, not a silent always-false.

`recharge` wand: uncancel `spe==-1`; explode `n>0 && (WISHING || n³>rn2(343))` then `wand_explode(rnd(lim))`; else `recharged++`; cursed `stripspe`; else `n = lim==1?1:rn1(5,lim-4)` then uncursed `rnd(n)`; spe max(n, spe+1); wishing spe>3 explode; glow `p_glow3`/`p_glow2`/`p_glow1`. JS `p_glow2(obj,NH_BLUE,true)` is C `:682–684` “feebly”. **Match call-for-call including `rn2(7*7*7)`.** Ring: `s` blessed `rnd(3)` / cursed `-rnd(2)` / 0 → `1`; explode `spe>rn2(7) || spe<=-5`; else spin, `costly_alteration` on negative, Ring_off/on, `alter_cost` if s>0 unpaid. **Match `:801–832`.** Tool: `recharged<7` increment; Bell / marker-kit-camera / oil-lantern / crystal ball / horn-bag-grease / magic instruments; default feeling of loss. **Match the switch through `:995`.** MAGIC_LAMP is charge_ok-suggestable when unidentified and then **loss** (C has no MAGIC_LAMP case). **Match.**

`getobj_charge` is a local invent subset: SUGGEST letters, compactify if >5, `?*` pickinv, no canned key, **no count prefix**. C `GETOBJ_ALLOWCNT` can split a stack before recharge. **Named omit**, not a stub recharge.

**CREATE_PORTAL.** Walk `n_dgns`, skip `!dunlev_ureached` and `tutorial_dnum`. Menu title; if `num_ok>1` PICK_ONE else `last_ok_dungeon`. Cancel → `nothing_special` **ECMD_TIME** (cost kept). **Match `:1878–1905`.** Level: `dnum=i`; if `depth_start >= depth(uz)` then `entry_lev` else `dunlev_ureached`. **Match `:1914–1918`.** Block: amulet / `In_endgame(uz)` / `In_endgame(newlev)` / same `dnum` / `!next_to_u` → disoriented; else sighted shimmering sphere / blind weightless then `goto_level(...,false,false,false)`. **Callees LIVE.** `next_to_u` is leash+steed-amulet (`apply.c:919`), not a stub. **Match `:1920–1928`.** JS header rows on the pick list are extra tty chrome; identifiers are still `i+1`.

**BANISH.** Snapshot `fmon`. Skip dead / `!isok`. Keep `is_demon` or `mlet==S_IMP` (`'S_IMP'` in this port). `couldsee`. Skip `msound==MS_NEMESIS` (37). Chance 1 +10 quest-unkilled-nemesis +2 prince +1 lord. Clear sleep/tame/peace. `chance<=1 || !rn2(chance)`: if `!Inhell` vanish + `dest.dlevel=rn2(dunlevs_in_dungeon(dest))` + `migrate_mon(..., ledger_no(dest), MIGR_RANDOM)`; else `u_teleport_mon(mtmp,false)`. **Match `:1971–2000` including `rn2(num_dunlevs)` which can be 0.** `Inhell` is `dnum===GEHENNOM` (5), not C `dungeons[dnum].flags.hellish`. If this port’s Gehennom dnum is 5, the branch agrees; it is a clone, not a stub migrate. Plines Most/Some/The demon(s) disappear + `vtense`. **Match `:2006–2017`.** No vanish → no pline. **Match.**

Zap `recharge_elec_ring` now `recharge(obj,0)`. C `maybe_destroy_item` AD_ELEC ring calls that same `recharge`. **This SHA removes a local subset that could desync from invoke CHARGE.** Related callee, not a second hypothesis.

Callee closure (four arms). LIVE: listed above. CLONE matched: `getobj_charge` minus ALLOWCNT; `Inhell` dnum; `p_glow3` via feeble `p_glow2`. OMIT named: Palantir, ALLOWCNT, covetous/demon-vs-hero, doread SCR_TAMING, blessed tameness bump, `resist` shieldeff. STUB: **none** in a live arm. **Arms may ship.** This is **not** “dispatch ported, callee stubbed.” Review **449**’s UNTRAP stub is a different arm (already D-1495).

## Hallucinations / overclaim

Subject four specials instead of Nothing happens: **true**, and they **pay cost**. D-log “zeroobj pseudo → APPORT” / MANFOOD so invoke does not `dog_eat`: **true**, and that is also why C invoke TAMING usually **peaceifies rather than tames**. Stamping **Addressed:** D-1502 for **the four switch arms + live recharge/taming callees** is fair. Do **not** stamp “Match C Palantir as a generated artifact.” Do **not** stamp “Match C `#read` scroll of taming.” Do **not** stamp “Match C `tamedog` covetous/demon.” Do **not** stamp “Match C getobj count prefix.” Do **not** treat fortress PASS as `#invoke` Eye/Card/Demonbane. Public sessions never wield those.

D-log “taming scroll” as the special is **seffects(SCR_TAMING)**, not `doread`. Honest if you keep the doread gate named.

## Density

Four remaining specials of one C switch plus the `read.c` callees CHARGE and TAMING require, plus the migrate/ledger exports BANISH requires, plus zap’s ring path that already called a recharge subset. ~588 JS lines. Playbook §2b “whole practical switch” is the right envelope; consecutive Open rows of the same `arti_invoke` switch. Did not glue minetn-6. Large but one family. Acceptable. Must-fix was empty so gluing the four named omits of **one function** is allowed.

## Branch-by-branch confirm

1. Any of the four `inv_prop`, not tired: `arti_invoke_cost` `rnz` then the helper. **Match `:2150`. This SHA’s cost fix vs D-1488 skip.**
2. TAMING, adjacent jackal, zeroobj: resist with alev=`ulevel`; on fail, peaceful, typically **not** `mtame` (APPORT≥MANFOOD). No floor pseudo. **Match C zeroobj.**
3. TAMING, covetous: C stop after peaceful; JS may `mtame`. **Named omit.**
4. Real `#read` SCR_TAMING: JS doread still “not implemented.” **Named; not this caller.**
5. CHARGE_OBJ cancel getobj: refund `age=0`. **Match `:1855–1857`.**
6. CHARGE_OBJ uncursed wand, `recharged==0`: fill `rn1`/`rnd`, glow, keep cost. **Match `:737–793`.**
7. CHARGE_OBJ wand `recharged>=1` and `n³>rn2(343)`: `wand_explode`. **Match `:760–764`.**
8. CHARGE_OBJ blessed Card matching role: `recharge(...,1)`. **Match `:1859–1861`.**
9. CHARGE_OBJ count prefix `2a`: C can split; JS charges the whole stack. **Named ALLOWCNT.**
10. CREATE_PORTAL one reached dungeon: no menu, that dest. **Match `:1904–1905`.**
11. CREATE_PORTAL menu cancel: `nothing_special`, TIME, cost kept. **Match `:1897–1900`.**
12. CREATE_PORTAL carrying Amulet: disoriented, no `goto_level`. **Match `:1920–1922`.**
13. CREATE_PORTAL OK: shimmer/`goto_level`. **Match. Callee live.**
14. BANISH, not Inhell, visible demon, chance 1: always migrate `rn2(dunlevs)` + `ledger_no` + `MIGR_RANDOM`. **Match `:1992–1997`.**
15. BANISH Inhell: `u_teleport_mon(...,false)`. **Match `:1998–1999`** *if* `Inhell()` agrees with `flags.hellish`.
16. BANISH nemesis `MS_NEMESIS`: skip. **Match `:1981–1982`.**
17. BANISH `!couldsee`: skip. **Match `:1979`.**
18. AD_ELEC ring destroy: full `recharge(obj,0)` not the old local explode/spin. **Match C `maybe_destroy_item`.**
19. **Public-unhit** for the three generated arts; Palantir cannot generate.

## Callers / RNG ledger

C: `doinvoke` → `arti_invoke`. JS same. Extra: zap AD_ELEC ring now shares `recharge`. Dice as above. Public fortress does not `#invoke` these.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic imports break cycles (artifact→read→dog→zap). No fs. No FORCE. `MS_NEMESIS=37` is `monflag.h:52`, not a seed. `GEHENNOM=5` is this port’s dungeon index, not a recorded coordinate.

## Verification

D-log: private canary **13**/13; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Eye/Card/Demonbane/`#read` taming. Cohort is shared-startup (and zap ring if a session shocks a ring). The canary does **not** claim Palantir generation or doread SCR_TAMING.

## Actionable C-wrongs

None that belong on Must-fix. Review **449** named these four as omits; this SHA shipped them with LIVE callees. Remaining named (map / Open, already queued or listed):

1. `GETOBJ_ALLOWCNT` count prefix on charge getobj (`invent.c`).
2. Palantir `artilist.h` `#if 0` (do not generate it to “test TAMING”).
3. `tamedog` `is_covetous` / `is_demon` vs hero (`dog.c:1245–1246`).
4. `doread` allow-list `SCR_TAMING` (separate caller; `seffects` already dispatches).
5. `tamedog` blessed-scroll tameness bump (`:1227`).
6. `Inhell` hellish flag vs `GEHENNOM` dnum (`dungeon.c:1942`).
7. `resist` `shieldeff` when `tell` is not NOTELL (not this site).
8. `dunlevs_in_dungeon` / `ledger_no` local clones — import the new exports (do not write #5/#9).

Do not Must-fix “zeroobj should set `oclass=SCROLL_CLASS`” (C does not). Do not Must-fix “TAMING should fully tame” (C zeroobj usually only peaceifies). Do not Must-fix “`p_glow3` missing” (feeble `p_glow2` matches). Do not Must-fix “should have waited to split recharge from BANISH.”

Verdict: **ACCEPT-WITH-DEBT**
