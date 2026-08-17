# Review 107 — fe5cefad — inside_gas_cloud damage (D-1146)

## Metadata
- Full / short hash: `fe5cefadd6b87f13e9ed0b3ba5fc8ef356d464de` / `fe5cefad`
- Parent: `623bc861` (D-1145). This file audits **this SHA only**. Archive row **Addressed:** D-1146 `fe5cefad` was filled by D-1147.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 08:05:40 +0200
- D-id: **D-1146**
- Stats: 13 files, +336 / −76 — `js/region.js` +239 / −23; `js/allmain.js` `await run_regions()`; `js/fountain.js` comments.
- Claims to close: Open queue `region.c` `inside_gas_cloud` damage (named). Not enveloped pline. Review **98** named omit of dam>0; review **85** size-1 register. `reviews/loop-2026-08-15/` has no open gas-HP Must-fix.
- JS / map: `region.js` `inside_gas_cloud` / local `m_poisongas_ok` / `run_regions`; `allmain.js` after `nh_timeout`. `c-js-map/turns.md` allmain `run_regions`; `data.md` fountain drinksink 13. Expire dissipation, fumaroles whoosh, `create_gas_cloud_selection`, mfndpos’s thinner `mon.js` `m_poisongas_ok`, Resists_Elem worn/artifact still named.
- Prior reviews this SHA claims to close: **98** named dam>0 no-op; D-1145 next-port.

## Intent vs deliverable

Git subject promises: “Match C region.c inside_gas_cloud so a damaging cloud applies hero/mon HP, cough/blind, and m_poisongas_ok, instead of no-oping when arg>=1.”

Old JS refreshed fog TTL (`ttl<20` + PM_FOG_CLOUD +5) then `return false` when `arg>=1`. C `region.c:1091–1165` after that TTL bump: `dam<1` return; hero (`p2==NULL`) `m_poisongas_ok(&youmonst)==OK` skip, else `!Blind` sting + `make_blinded(1,FALSE)`, then `!Poison_resistance` lung-burn / `Maybe_Half_Phys(rnd(dam)+5)` / towel half / `losehp` / `monstunseesu` else cough / `monstseesu`; monster: `!=OK` cough/`wake_nearto`/`setmangry`/blind, `resists_poison` skip HP else `mhp -= rnd(dam)+5` then `killed` vs `monkilled`. `run_regions` `:448–455` drops the mid when the callback returns TRUE. Size-1 `create_gas_cloud` `:1233–1236` also treats `m_poisongas_ok==OK` as already-inside (suppress envelop).

The diff **does** port those arms, a local full `m_poisongas_ok`, await `run_regions` from `allmain`, and the size-1 gate. It does **not** flip hero inside_f to the `hero_inside` bit (walk `in_out_region` still named — geometry is the compensating probe). It does **not** port expire dissipation plines, fumaroles whoosh, or mfndpos’s subset. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `inside_gas_cloud` | C callee, **rewritten** | `region.c:1091–1165`; now async |
| `run_regions` inside_f | C body, **awaited** | `region.c:439–456`; ttl==0 expire still prior analog |
| `m_poisongas_ok` | C callee, **local clone** | `mon.c:330–357`; region.js only |
| `mon.js` `m_poisongas_ok` | C callee, **named thinner** | mfndpos still OK/BAD only |
| `make_blinded` / `losehp` / `wake_nearto` / `setmangry` / `killed` / `monkilled` / `monstseesu` / `monstunseesu` | C callees, **imported** | real |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported** | `hack.h:1236–1237`; H\|\|E |
| `Half_gas_damage` | C youprop, **clone** | towel `ublindf` spe>0 |
| `Blind` / `Poison_resistance` / `Breathless` | C youprop, **clones** | H\|\|E (+ uprops OR on poison) |
| `immune_poisongas` / `is_silent` / `attacktype_fordmg` / `resists_poison` | C callees, **clones** | resists_poison = mresists\|mextrinsics\|mintrinsics; worn/artifact **named** |
| `heros_fault` | C macro, **clone** | `REG_NOT_HEROS` clear |
| size-1 envelop gate | C probe, **rewritten** | `region.c:1233–1236` |
| expire dissipation / fumaroles | C, **named omit** | ttl==0 still prior thick-cloud halve |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `AT_BREA=12` / `AD_DRST=7` / `AD_RBRE=242` / `MS_SILENT=0` match `monattk.h` / `monflag.h`. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** hero/mon `rnd(dam)+5` (`rng.js` `rnd` = 1..n like C). Towel half is arithmetic. `wake_nearto(..., 2)` is C’s literal 2 (dist2 < 2), not `2*2`. Size-1 drinksink still skips BFS shuffle. Path **public-unhit** on dam>0 HP (fog ttl still matches).

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. Dynamic `import('./do.js')` / `mon.js` / `uhitm.js` / `mhitm.js` / `end.js` is cycle-breaking, not a filesystem. Do not restore the dam>0 no-op. Do not flip hero inside_f to the bit until walk `in_out_region` sets it. Do not replace mfndpos’s subset in this SHA (would change avoid-gas RNG). Do not rewrite `Poison_resistance` to H\|\|E-only and drop uprops (confer may write uprops).

## C ↔ JS fidelity

### Fog TTL then dam gate

C `region.c:1103–1108`: `umon = mtmp ? mtmp : &youmonst`; `ttl<20 && umon && umon->data == &mons[PM_FOG_CLOUD]` then `ttl += 5`; `dam<1` return FALSE. JS uses `umon.mnum ?? umon.data.mndx` vs `PM_FOG_CLOUD`. `polyself.js` writes `youmonst.mnum = mndx` on poly, so current form wins. Match for fog-poly and monster fog.

### Hero arm (`!mtmp`)

C `:1110–1133`:

```
if (m_poisongas_ok(&gy.youmonst) == M_POISONGAS_OK) return FALSE;
if (!Blind) { Your("%s sting.", makeplural(body_part(EYE))); make_blinded(1L, FALSE); }
if (!Poison_resistance) {
    pline("%s is burning your %s!", Something, makeplural(body_part(LUNG)));
    You("cough and spit blood!");
    wake_nearto(u.ux, u.uy, 2);
    dam = Maybe_Half_Phys(rnd(dam) + 5);
    if (Half_gas_damage) dam = (dam + 1) / 2;
    losehp(dam, "gas cloud", KILLED_BY_AN);
    monstunseesu(M_SEEN_POISON);
} else {
    You("cough!"); wake_nearto(...); monstseesu(M_SEEN_POISON);
}
return FALSE;
```

JS matches that order. `Something` is `c_common_strings.c_Something` → `"Something"`. `Maybe_Half_Phys` is the `hack.h` macro (not `maybe_wail`). JS `losehp` sets `_needs_maybe_wail` when HP is low; `finish_maybe_wail` is C `losehp`’s internal `maybe_wail` split, then `monstunseesu` — same as C returning from `losehp` then the caller. Fatal `_losehp_needs_done` skips `monstunseesu` (C `done()` is noreturn). `Half_gas_damage`: `ublindf && otyp==TOWEL && spe>0`. `Underwater` in `m_poisongas_ok` is `u.uinwater` (`youprop.h:279`). Match.

MINOR (poison res) still stings/blinds then coughs — C: OK is the only skip; MINOR is not OK. Match.

### Monster arm

C `:1134–1162`: `!=OK` then `!is_silent` → cansee or `distu<8` cough + `wake_nearto(...,2)`; `heros_fault` → `setmangry(TRUE)`; `haseyes && mcansee` → `mblinded=1`, `mcansee=0`; `resists_poison` return FALSE; else `mhp -= rnd(dam)+5`; DEADMONSTER → `heros_fault ? killed : monkilled(..., AD_DRST)`; still dead → return TRUE. JS same, including drop-from-`reg.monsters` when TRUE (`run_regions` swap-with-last). `killed` / `monkilled` are real `uhitm.js` / `mhitm.js` (monkilled still names worm_known / disintegrate). Not a stub of the HP arm.

### `m_poisongas_ok` clone vs C `mon.c:330–357`

| Test | C | JS region.js |
|------|---|--------------|
| nonliving / vampshifter / breathless / Hezrou\|Vrock | OK | **same** (`mndx` vs `&mons[]`) |
| S_EEL or waterlevel **and** `is_pool` | OK | **same** (`mlet === 'S_EEL'`) |
| AT_BREA AD_DRST or AD_RBRE | OK | **same** `attacktype_fordmg` first mattk |
| you: uinvulnerable / Breathless / Underwater | OK | **same** `uinwater` |
| you Poison_resistance / mon `resists_poison` | MINOR | **same** then BAD |

`resists_poison` clone is `data.mresists | mextrinsics | mintrinsics` (`MR_POISON`). C `Resists_Elem` (`mondata.c:129–178`) for monsters uses `mon_resistancebits` (same three fields) **then** wielded artifact `defends(damgtype, o)` **then** worn/carried. **Named** in the D-log. A monster whose only poison res is a worn item takes HP in JS and coughs-only in C. Clone subset, documented — not a silent contradict of the Open **inside_f** line. Hero `Poison_resistance` in this file ORs H||E||flag||`uprops[POISON_RES]` intrinsic/extrinsic. C youprop is `HPoison_resistance || EPoison_resistance`. Extra uprops OR is the confer-writes-uprops pattern (D-1089); do not restore H||E-only.

`immune_poisongas`: C `mondata.h:16–17` pointer `== &mons[PM_HEZROU] || == &mons[PM_VROCK]`. JS `mndx`. `mons()` allocs — mndx is the stable id. `is_silent`: `msound == MS_SILENT` (0). `attacktype_fordmg`: first `mattk` with `aatyp` and `adtyp` (JS allows `dtyp===-1` unused here). Extracted `mattk[]` (D-0130) uses C numbers. `AT_BREA=12`, `AD_DRST=7`, `AD_RBRE=242` match `monattk.h`.

`mon.js` mfndpos copy still returns OK or 0 and skips vamp/eel/breath/MINOR. Named. Do not merge in this SHA (would change avoid-gas `mfndpos` RNG on public paths).

### `run_regions` hero probe

C `:434–457`: age `ttl>0` then `--`; `f_indx = inside_f`; if `f_indx != NO_CALLBACK && hero_inside(reg)` call with NULL; then for each mid `find_mid(..., FM_FMON)`, drop if `!mtmp || DEADMONSTER || callback(...)`. JS: only `inside_f === INSIDE_GAS_CLOUD` (other callback indices are NO_CALLBACK on vanilla gas). Hero: `inside_region(ux,uy)` not `hero_inside` bit. Geometry vs bit is the D-1130/D-1143 named walk gap: JS walks do not set `REG_HERO_INSIDE`. Using the bit would **under**-damage. Compensating probe, named. `gameover` early return after hero/mon is JS async `done` — C does not return from `losehp`.

JS `find_mid` in `region.js` is FM_FMON-only (fmon by `m_id`). C `find_mid(..., FM_FMON)` is the same restriction at this call. Match.

ttl==0 end-of-life: C calls `expire_f` (`EXPIRE_GAS_CLOUD`) and removes if the callback returns TRUE. JS still inlines thick-cloud `arg>=5` → half arg, `ttl=2`, else `remove_region`. Pre-existing analog. Dissipation plines (`gas_cloud_diss_within` / `gas_cloud_diss_seen`) are the Open `expire_gas_cloud` row. This SHA only awaited the inside_f loop. Correct split.

`allmain.js` `await run_regions()` after `nh_timeout` matches C `allmain.c` moveloop order (`nh_timeout` then `run_regions`). Previously sync `run_regions()` would drop pline/`make_blinded` awaits. Not a second cluster.

### Size-1 envelop gate

C `:1233–1236`: `!mon_moving && u_at && cloudsize==1 && (!damage \|\| (damage && m_poisongas_ok==OK))` → `inside_cloud=TRUE` (skip You). JS `!(damage) \|\| m_poisongas_ok==OK`. Equivalent when damage≠0. Breathless poly on a size-1 poison cloud now suppresses envelop like C (D-1137 named this miss).

## Hallucinations / overclaim

D-log / CURRENT / subject say a damaging cloud applies hero/mon HP, cough/blind, and `m_poisongas_ok`, instead of no-oping when `arg>=1`. That is the hunk. They **name** expire dissipation, fumaroles, mfndpos subset, Resists_Elem worn. Stamping **Addressed:** D-1146 is fair for the Open **inside_f dam>0 + size-1 gate**. Hash `fe5cefad` is on the archive row (filled by D-1147). Do **not** stamp it as “walk uses the bit” or “mfndpos now has MINOR.” This is **not** “Match C dispatch, callee is a stub”: `losehp` / `make_blinded` / `killed` / `monkilled` are real; `m_poisongas_ok` is a local port of the C function, not a no-op.

## Density

`inside_gas_cloud` + its `m_poisongas_ok` + `run_regions` await + size-1 gate is one C family. Right size (§2b). Clones are callees of that envelope, not a second hypothesis. Expire dissipation stays a sibling Open row — correct split.

## Verification

Private canary **76**/76 (C/JS source order: hero OK skip, eyes/`make_blinded`, Half_Phys+towel, losehp, resist cough, mon cough/distu/setmangry/blind/HP/killed|monkilled, fog umon, `m_poisongas_ok` arms, size-1 gate, await `run_regions`). Green+strict seed8000/0900. Cohort **20**/20 (0002 drinksink + 0014 fountain + 0361/0383 fog ttl + 0006/0007/0106/0108/0360/2200/0004/0009/0030/0012/0116/1500/1800/0060/0102/0700) + strict 8000/0900/0002/0014/0006/0361/0383/0360/0030/2200/0108/0004/0007/0012. Path **public-unhit** on dam>0 HP (fog ttl still matches). Cadence #1460 **44**/44 does not hit HP. Drinksink case 13 still creates size-1 `arg=4` (D-1124); damage waits for `run_regions` next turn like C.

## Actionable C-wrongs

None that Must-fix this next iter. The Open dam>0 arms match `region.c:1110–1162` call-for-call. Worn `Resists_Elem` is named map debt on the clone, not a stub of `inside_gas_cloud`.

Named omits / do-nots (map / Open, not Must-fix):

1. `expire_gas_cloud` dissipation plines (`region.c:460+` / expire_f). Open `expire_gas_cloud`.
2. fumaroles `clear_heros_fault` / Norep whoosh. Open `mklev.c` `fumaroles`.
3. mfndpos `m_poisongas_ok` vamp/eel/breath/MINOR (`mon.c:330–357` in `mon.js`). Open.
4. `Resists_Elem` artifact/worn grants (`mondata.c:173–178`).
5. Walk `in_out_region` so `hero_inside` bit can replace geometry.
6. Do not restore the dam>0 no-op. Do not flip hero inside_f to the stale bit. Do not pull expire plines into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: damaging gas now runs C’s hero sting/half-phys/towel/`losehp` and mon cough/angry/blind/`rnd+5`/`killed`\|`monkilled` through a local `m_poisongas_ok`, with size-1 envelop gated the same way, while expire plines and mfndpos’s thinner copy stay named.
- Must-fix stays empty for this SHA; next port popped Open `rndcolor`. **Addressed:** D-1147 `5c43dbc9`. Not expire dissipation.
