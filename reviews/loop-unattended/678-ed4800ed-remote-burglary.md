# Review 678 — ed4800ed — shk.c remote_burglary unpaid steal-from-outside-shop (D-1717)

## Metadata
- Full / short hash: `ed4800ed54f4a8abffa1d1370b1c0a04d37700df` / `ed4800ed`
- Parent: `dc3e0943` (reviews 669–677). This file audits **this SHA only** (first of nine `js/` commits since review **677**). Archive **Addressed:** D-1717 `ed4800ed`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 07:38:07 +0200
- D-id: **D-1717**
- Stats: `js/shk.js` +237/−23; `js/pickup.js` +5/−5. Total `js/` insertions **242** <250. Band **150–350**.
- Claims to close: Open `remote_burglary` after D-1716 / review **677** named it. Not gem glass. Not `u_left_shop` leave verbalize. `reviews/loop-2026-08-15/` has no unpaid remote-steal Must-fix.
- JS / map: `shk.js` `remote_burglary` / `rob_shop` / `call_kops` / `makekops`; `pickup.js` `pick_obj`. `c-js-map/turns.md`.
- Prior: **677** named this Open; D-0447 already fake-`ushops` billed.

## Intent vs deliverable

Git subject promises: `pick_obj` runs `rob_shop`/`call_kops` instead of a deferred empty arm after D-1716.

`node scripts/csym.mjs remote_burglary` → `shk.c:664–682`. `--callers`: `pickup.c:1939` only. `rob_shop` `:685–719` (callers `:678` remote, `:622` `u_left_shop`). `call_kops` `:509–564` (`:680` FALSE, `:623` nearshop). `makekops` `:5112–5135`. `addupbill` `:495–507`. `setpaid` `:399–434`. `clear_unpaid` `:318–325`. `pick_obj` `:1896–1942`.

```664:682:nethack-c/upstream/src/shk.c
void
remote_burglary(coordxy x, coordxy y)
{
    struct monst *shkp;
    struct eshk *eshkp;

    shkp = shop_keeper(*in_rooms(x, y, SHOPBASE));
    if (!shkp || !inhishop(shkp))
        return; /* shk died, teleported, changed levels... */

    eshkp = ESHK(shkp);
    if (!eshkp->billct && !eshkp->debit) /* bill is settled */
        return;

    if (rob_shop(shkp)) {
        /*[might want to set 2nd arg based on distance from shop doorway]*/
        call_kops(shkp, FALSE);
    }
}
```

Parent: `pick_obj` billed via fake `ushops` then `if (robshop) { /* remote_burglary deferred */ }`; `addupbill` stub-0; `setpaid` zeroed counters without unpaid/billobjs walks. The diff **does** export `remote_burglary`, await it after `addinv`, and port `rob_shop` / `call_kops` / `makekops` / `addupbill` / `clear_unpaid`+`setpaid`. It **does not** call `choose_stairs` (`sx,sy` stay 0). Named. It **does not** call `rob_shop` from `u_left_shop` (boundary verbalize still returns first). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `remote_burglary` | LIVE new | `shk.c:664–682`; `pick_obj` awaits |
| `rob_shop` | LIVE new local | credit vs steal; `setpaid`; Rogue skip |
| `call_kops` | LIVE new local | alarm + guards + shk swarm |
| `makekops` | LIVE new local | `abs(depth)+rnd(5)`; G_GONE `continue` |
| `addupbill` | LIVE repaired | was stub-0 |
| `clear_unpaid` / `_obj` | LIVE new local | Array invent + nobj |
| `setpaid` | LIVE repaired | unpaid walks + billobjs free |
| `pick_obj` | LIVE repaired | was empty arm |
| `shop_keeper` / `inhishop` | LIVE | already in file |
| `hot_pursuit` | LIVE | `shk.js:1419` |
| `angry_guards` | LIVE import | `mon.js:1186` ASYNC |
| `makemon` | LIVE import | `makemon.js:2607` **sync** |
| `enexto` | LIVE import | mutates `cc` (`:649`) |
| `Soundeffect` / `se_alarm` | LIVE import | empty macro ≡ C `!SND_LIB` |
| `livelog_printf` | LIVE import | chronicle; file write named |
| `rnd` / `depth` | LIVE import | `rng.js:74` 1..n; `hacklib.js:34` |
| `adjalign` | LIVE import | `attrib.js:585` |
| `currency` | LIVE import | `invent.js` (Hallu is next SHA) |
| `Role_if` / `sgn` / `s_suffix` | CLONE local | do **not** add #22 / #16 / #8 |
| `hero_deaf` | CLONE local | sticky `u.Deaf` extra; do **not** add #2 |
| `rouse_shk` | CLONE local | wake flags LIVE; verbose pline stub |
| `choose_stairs` | OMIT named | NOT FOUND; `sx,sy=0` |
| `u_left_shop` rob_shop | OMIT named | still returns after billct |
| `dealloc_obj_free` | CLONE subset | lights/lua/`obfree` named |
| `SetVoice` | OMIT | NOT FOUND; not this arm |

`node scripts/sym.mjs`:

```
remote_burglary  js/shk.js:437   ASYNC
rob_shop         NOT EXPORTED — 1 LOCAL js/shk.js:393
call_kops        NOT EXPORTED — 1 LOCAL js/shk.js:346
makekops         NOT EXPORTED — 1 LOCAL js/shk.js:315
addupbill        NOT EXPORTED — 1 LOCAL js/shk.js:3865
clear_unpaid     NOT EXPORTED — 1 LOCAL js/shk.js:3177
clear_unpaid_obj NOT EXPORTED — 1 LOCAL js/shk.js:3168
setpaid          NOT EXPORTED — 1 LOCAL js/shk.js:3796
pick_obj         js/pickup.js:878   ASYNC
angry_guards     js/mon.js:1186   ASYNC
makemon          js/makemon.js:2607   sync
enexto           js/teleport.js:649   sync
choose_stairs    NOT FOUND
Soundeffect      js/sndprocs.js:20   sync
livelog_printf   js/pline.js:23   sync
currency         js/invent.js:1156   sync
rouse_shk        NOT EXPORTED — 1 LOCAL js/shk.js:3883
dealloc_obj_free NOT EXPORTED — 1 LOCAL js/shk.js:3223
hero_deaf        NOT EXPORTED — 1 LOCAL js/shk.js:1307
s_suffix         js/do_name.js:363   sync  (+ shk.js local — IMPORT later)
Role_if          21 LOCAL clones — do NOT write #22
```

No clone→import re-point of a previously local name (`remote_burglary` is new). New imports: `makemon`, `angry_guards`, `Soundeffect`/`se_alarm`, `livelog_printf`, `rnd`/`depth`. `--can js/pickup.js js/shk.js remote_burglary`: **ALREADY**. `--can js/shk.js js/makemon.js makemon` / `js/mon.js angry_guards` / `js/sndprocs.js Soundeffect` / `js/pline.js livelog_printf` / `js/hacklib.js depth`: **ALREADY** (this SHA added `sndprocs`/`pline`; others already imported the module). `Soundeffect`/`livelog_printf` are used **inside functions**. `sndprocs.js` does not import `shk.js` — no TDZ. Cycle is not a blocker. Do **not** add `rob_shop` #2. Do **not** add `s_suffix` #8. FORCE/DIAG/`getRngLog`/`fastforward`/seed names in the diff: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`pick_obj` (`pickup.c:1896–1942` vs `pickup.js:878–901`).** C `get_obj_location` then `costly_spot`; fake `ushops`; `addtobill`; restore; `robshop = unpaid && !strchr(u.ushops, *fakeshop)`; `addinv`; then `remote_burglary(ox,oy)`. JS uses `otmp.ox/oy` (engulfer `get_obj_location` still named). Fake-shop / `addtobill` / unpaid-outside test already D-0447. This SHA only fills the empty `if (robshop)` with `await remote_burglary(ox, oy)`. **Match `:1936–1939` for the floor path.**

**`remote_burglary`.** C `shop_keeper(*in_rooms)` → `!shkp \|\| !inhishop` return → `!billct && !debit` return → `if (rob_shop) call_kops(FALSE)`. JS `rooms.charCodeAt(0)` (empty → 0). Same gates. `call_kops(shkp, false)`. **Match `:664–682`.**

**`rob_shop` (`:685–719`).** C `rouse_shk(TRUE)` → `total = addupbill+debit` → credit cover (`Your credit…`; `total=0`) else `You escaped…`; `total -= credit` → `setpaid` → `!total` FALSE → `robbed += total` → `You stole…` → `livelog_printf(LL_ACHIEVE,… s_suffix(shkname), shtypes[shoptype-SHOPBASE].name)` → `!Role_if(PM_ROGUE)` `adjalign(-sgn(u.ualign.type))` → `hot_pursuit` TRUE. JS the same strings via `pline` (C `You`/`Your` wrappers). `PM_ROGUE` 339. `Role_if` is `urole.mnum`. `currency` LIVE import. **Match the steal/credit/align/pursuit envelope.** `rouse_shk(true)` **does** clear sleep/freeze/`mcanmove`. C `:1380–1392` also `pline("%s %s", Shknam, msleeping?"wakes up":"can move again")` when `verbosely && canspotmon`. JS `_verbosely` unused — **unnamed** message omit on a sleeping shk, not a no-op of the wake. Not “`rob_shop` is a stub.”

**`addupbill` (`:495–507`).** C `while (ct--) { total += bp->price * bp->bquan; bp++; }`. JS index walk of `bill_p \|\| bill`; `if (!e) continue` skips holes (C would not). Dense `billct` rows **Match**. Replacing stub-0 also repairs `make_angry_shk` `:1479` (`robbed += addupbill+debit+loan`) — same family.

**`setpaid` (`:399–434`).** C `clear_unpaid` invent/fobj/buried/thrown/kicked/`fmon.minvent`/`migrating_mons.minvent`; `clear_no_charge` fobj+buried; `while (billobjs) extract+dealloc_obj`; zero billct/credit/debit/loan. JS the same chains (invent Array **or** nobj; migrating Array **or** `nmon`). `dealloc_obj_free` is a shop-dummy subset (timers + `OBJ_DELETED`); full `dealloc_obj` lights/lua/`objs_deleted` is the live Open `obfree` row — **named**, not this peel’s C-wrong. **Match the unpaid-clear + counter zero.**

**`call_kops` (`:509–564`).** C `Soundeffect(se_alarm,80)` → `!Deaf` “An alarm sounds!” → `nokops` all four G_GONE → `angry_guards(!!Deaf)` **always** then `&& nokops` “no one seems to respond” return → `nokops` return → `choose_stairs(&sx,&sy,TRUE)` → nearshop: “Kops appear!” + `makekops(u.ux,u.uy)` return → else “Kops are after you!” + `isok(sx,sy)` stair swarm + shk swarm. JS `hero_deaf()` (roleplay **and** sticky `u.Deaf`; same clone as D-1716). `angry_guards` awaited. `verbose !== false` ≡ C default TRUE. **nearshop FALSE** for this caller: stair `makekops` skipped because `sx,sy` stay 0 and `isok(0,0)` is false (`x>=1`). Shk `makekops({mx,my})` **does** run. Kop PMs `monsterNames.indexOf` → 179–182. **Match the alarm/guards/shk-swarm path.** Stair swarm is OMIT named, not a stub inside `makekops`.

**`makekops` (`:5112–5135`).** C `cnt = abs(depth)+rnd(5)`; `k_cnt = {cnt, cnt/3+1, cnt/6, cnt/9}`; `if (cnt==0) break`; G_GONE `continue`; `while (cnt--) enexto(mm,mm->x,mm->y,&mons[mndx])` then `makemon(..., MM_NOMSG)`. JS `Math.trunc` for C int div; `rnd(5)` is 1..5. `enexto` writes `mm.x/y` then `makemon` uses the mutated coord — **Match C’s in-place `mm`.** `makemon` is **sync** (no dropped promise). G_GONE `continue` (not `break`) so a gone sarge still tries lieut. `cnt==0` **break** skips later ranks (C: lieutenant 0 also drops kaptain). **Match `:5112–5135`.** RNG: one `rnd(5)` then per-kop `enexto`/`goodpos`/`makemon` — same order as C.

**Callee closure (`remote_burglary`).** LIVE: `shop_keeper`, `in_rooms`, `inhishop`, `rob_shop`, `call_kops`, `makekops`, `addupbill`, `setpaid`, `clear_unpaid`, `hot_pursuit`, `angry_guards`, `makemon`, `enexto`, `Soundeffect`, `livelog_printf`, `adjalign`, `currency`, `rnd`, `depth`. CLONE: `Role_if`, `sgn`, `s_suffix`, `hero_deaf`, `rouse_shk` (wake flags). OMIT named: `choose_stairs`, `u_left_shop` verbalize+`rob_shop`. STUB in the **steal** arm: **none**. `rouse_shk` verbose pline is a message hole, not a stubbed `rob_shop`. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “`pick_obj` runs `rob_shop`/`call_kops` instead of a deferred empty arm”: **true**. D-log “named omit `choose_stairs` (`sx,sy` stay 0…)”: **true** (`isok(0,0)` is false). Do **not** stamp “Match C `choose_stairs` `:330–364`.” Do **not** stamp “Match C `u_left_shop` `:622` `rob_shop`.” Do **not** stamp “Match C `rouse_shk` verbose pline `:1385–1387`.” Do **not** stamp “Match C `dealloc_obj` lights/lua.” Journal “fortress held” is not a grappling-hook steal proof. Public shop pay still never takes this outside-shop arm.

## Density

§2b: `remote_burglary` + the callees C actually calls (`rob_shop`/`call_kops`/`makekops`/`addupbill`/`setpaid`). One cluster. +242 in 80–400. Did not glue gem glass / `arti_cost` / Hallu currency. Did **not** wire `u_left_shop` `rob_shop` (that would skip C’s pay-before-leaving `return`).

## Verification

D-log / journal: save-oracle skip (untagged `shk.c:remote_burglary`); private canary **18**/18; green+strict seed8000/0900; focused seed0383/0116; CURRENT cohort **7**/7 + strict. Public shop paths **are** hit for billing; unpaid-from-**outside** steal / kops / `rnd(5)` **public-unhit**. Admit that. Canaries are the steal-arm check.

## Actionable C-wrongs

None for Must-fix (the Open body matches C; stair swarm and door verbalize are named). Named: `choose_stairs` / stair `makekops` (`wizard.c:330–364`, `shk.c:540`); `u_left_shop` leave verbalize then `rob_shop` (`:602–623`); `rouse_shk` verbose `Shknam` wake pline (`:1385–1387`); gem glass pseudo-ID (next); `arti_cost`; Hallu currency; `costly_gold`; `obfree`/`dealloc_obj` full; `s_suffix` local vs `do_name.js`. Do **not** add `rob_shop` #2. Do **not** add `call_kops` #2. Do **not** add `Role_if` #22. Do **not** call `rob_shop` from `u_left_shop` without the boundary verbalize `return`. Do **not** restore `addupbill` stub-0. Do **not** treat `isok(0,0)` as a stair. Do **not** `await` `makemon` (it is sync). Do **not** `break` on G_GONE (C `continue`).

Verdict: **ACCEPT-WITH-DEBT**
