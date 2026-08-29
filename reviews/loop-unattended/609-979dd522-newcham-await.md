# Review 609 — 979dd522 — mon.c newcham await remaining NO_NC_FLAGS (D-1648)

## Metadata
- Full / short hash: `979dd522ad9bcfe1e561389ee4254f60b494c898` / `979dd522`
- Parent: `a7d1bf5f` (audit #2050 of D-1639–D-1647). This file audits **this SHA only** (first of nine `js/` commits since review **608**). Archive **Addressed:** D-1648 `979dd522`. Review **606** already stamped.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 12:31:55 +0200
- D-id: **D-1648**
- Stats: `js/makemon.js` +29/−10, `js/mhitm.js` +19/−10, `js/mklev.js` +3/−0, `js/trap.js` +3/−1, `js/uhitm.js` +4/−2, `js/zap.js` +5/−3. Band **150–350** (`js/` insertions **63** <250; id >454). Must-fix, not an Open peel.
- Claims to close: Must-fix review **606** Actionable #1 (QUALITY-RISK). Not `m_unleash` / `monflee` bodies. Not `monflee` clone #3. Not `possibly_unwield`. `reviews/loop-2026-08-15/` has no unpaid newcham-await Must-fix.
- JS / map: `makemon.js` `newcham`; await sites in `mhitm.js` / `uhitm.js` / `trap.js` / `zap.js`. `c-js-map/turns.md` / `data.md`.
- Prior reviews this SHA claims to close: **606** Actionable #1. File already stamped `**Addressed:** D-1648 979dd522`.

## Intent vs deliverable

Git subject promises: async `NO_NC_FLAGS` callers await unleash/Elbereth before continuing, instead of dropping the Promise after D-1645.

Pinned C `mon.c` `newcham` `:5276–5535` (`node scripts/csym.mjs newcham`). mleashed `:5386–5398`. Elbereth `:5517–5532`. `--callers newcham`: 46 refs including `makemon.c:1367`, `mhitm.c:874/:1174`, `mon.c:3754/:3804/:3825`, `uhitm.c:4992`, `trap.c:785`, `zap.c:497/:994/:2056`, plus SHOW_MSG / muse / slim / poly-trap / `sp_lev.c:2166`. Callees `m_unleash` `apply.c:725–742` (`--callers` includes `mon.c:5389`); `monflee` `monmove.c:461–530` (`mon.c:5531`).

```5386:5398:nethack-c/upstream/src/mon.c
    if (mtmp->mleashed) {
        if (!leashable(mtmp))
            m_unleash(mtmp, TRUE);
        else
            update_inventory();
    }
```

```5517:5532:nethack-c/upstream/src/mon.c
    if (svc.context.mon_moving) {
        if (!u_at(mtmp->mux, mtmp->muy))
            set_apparxy(mtmp);
        if (!mtmp->mpeaceful
            && onscary(mtmp->mux, mtmp->muy, mtmp)
            && monnear(mtmp, mtmp->mux, mtmp->muy))
            monflee(mtmp, rn1(9, 2), TRUE, TRUE);
    }
    return 1;
```

Old JS after D-1645: those arms could return a Promise; **606** listed dropped sites. The diff **does** `await newcham` at `mon_poly` / `mon_to_stone` / `vamp_stone` / `gulpmm` / `gulpum` / `animate_statue` / `revive` / `bhitm` stone-to-flesh / `stone_to_flesh_obj`, and wraps unleash/Elbereth in async IIFEs so the outer Promise settles after after_unleash. It **does not** await `makemon.c:1367` or `sp_lev.c:2166` (`load_tower1`). Named. It **does not** port `mhitm_ad_slim`, poly-trap SHOW_MSG, muse poly, or `vamp_stone` `:3825` `NC_SHOW_MSG`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `newcham` | C `:5276–5535`, **LIVE** | still **sync export** that may return `Promise` |
| `newcham_mleashed` / `newcham_elbereth` | C those arms, **CLONE** (not re-ported) | D-1645 |
| `m_unleash` | C apply.c `:725–742`, **LIVE** | **ASYNC**; not this SHA |
| `monflee` | C monmove.c `:461–530`, **LIVE** | **ASYNC**; music.js clone #2 — **do not add #3** |
| `mon_poly` | C mhitm.c `:1121–1207`, **LIVE** | await `:1174` |
| `mon_to_stone` | C mon.c `:3746–3763`, **LIVE** | await `:3754` |
| `vamp_stone` | C mon.c `:3765–3830`, **LIVE** | await `:3804`; `:3825` still flags **0** |
| `gulpmm` | C mhitm.c `:848–967`, **LIVE** | await `:874` |
| `gulpum` | C uhitm.c `:4957–5195`, **LIVE** | await `:4992` |
| `animate_statue` | C trap.c `:725–900`, **LIVE** | await `:785` |
| `revive` | C zap.c `:883–1140`, **LIVE** | await `:994` |
| `bhitm` SPE_STONE_TO_FLESH | C zap.c `:497`, **LIVE** | await |
| `stone_to_flesh_obj` | C zap.c `:1992–2112`, **LIVE** | await `:2056` `NC_VIA_WAND_OR_SPELL` |
| `makemon` cham | C makemon.c `:1367`, **OMIT named** (sync) | not mleashed; monster-turn summon Elbereth named |
| `load_tower1` | C sp_lev.c `:2166`, **OMIT named** (sync) | not mleashed / not mon_moving |
| `mhitm_ad_slim` / poly-trap / muse / `do.c` swallow | C other callers, **OMIT named** | no live JS `newcham(` there |
| `possibly_unwield` / armor / ustuck / `poly_steed` | C after SHOW_MSG, **OMIT named** | |

`node scripts/csym.mjs newcham` → `mon.c:5276-5535`. `mon_poly` → `mhitm.c:1121-1207`. `gulpmm` → `:848-967`. `mon_to_stone` → `mon.c:3746-3763`. `vamp_stone` → `:3765-3830`. `gulpum` → `uhitm.c:4957-5195`. `animate_statue` → `trap.c:725-900`. `revive` → `zap.c:883-1140`. `stone_to_flesh_obj` → `:1992-2112`. `m_unleash` → `apply.c:725-742`. `monflee` → `monmove.c:461-530`. `--callers newcham`: includes every site above. `--callers mon_poly`: `uhitm.c:3744/:3759/:3767`. `--callers gulpmm`: `mhitm.c:532`. `--callers gulpum`: `uhitm.c:5782`. `--callers animate_statue`: `trap.c:925`, `zap.c:2029`, `pray.c:2193`. `--callers vamp_stone`: `mon.c:3295`, `trap.c:3866`. `--callers m_unleash`: includes `mon.c:5389`.

RNG: none added. Elbereth still one `rn1(9,2)` inside the helper (D-1645). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (no clone deleted; await re-points the same import):

```
newcham          js/makemon.js:1486   sync
m_unleash        js/apply.js:1463   ASYNC — await required
monflee          js/monmove.js:768   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/music.js:217
leashable        js/apply.js:1500   sync
onscary          js/mon.js:323   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/music.js:205  js/teleport.js:420
monnear          js/mon.js:819   sync
set_apparxy      js/monmove.js:689   sync
update_inventory js/invent.js:3290   sync
```

`--can mhitm.js makemon.js newcham`: ALREADY. `--can uhitm.js makemon.js newcham`: ALREADY. `--can trap.js makemon.js newcham`: ALREADY. `--can zap.js makemon.js newcham`: ALREADY. `--can mklev.js makemon.js newcham`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** write `monflee` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C `m_unleash` / `monflee` are **void** and run **before** `return 1`. JS those callees are async. After this SHA, every **live async** `newcham(..., 0)` / `NO_NC_FLAGS` site that **606** listed as dropping the Promise **awaits** before the vis pline / `cham=` / christen / speed / expel. **Match C order at those sites** when the form changes.

`mon_poly` `:1174`. C `else if (newcham(mdef, 0, NO_NC_FLAGS))` then vis pline, `dmg=0`. JS already async; `await newcham`. **Match.** `--callers` are `mhitm_ad_poly` via uhitm; those already await `mon_poly`.

`mon_to_stone` `:3754`. C void; “solidifies” then `newcham` then “Now it's”. JS already async; await then the second pline. **Match.**

`vamp_stone` `:3804` NO_NC_FLAGS then `cham=` / `newsym`. JS await then those stores. **Match `:3804`.** C `:3825` is `NC_SHOW_MSG`; JS still `await newcham(..., 0)` with comment “NC_SHOW_MSG deferred”. **Not Match `:3825` flags** — named, pre-existing, not this SHA’s Must-fix.

`gulpmm` `:874` / `gulpum` `:4992`. C vampshifter revert then expel pline. JS await then the pline. **Match those two calls.**

`animate_statue` `:785`. C `(void) newcham` then christen/seemimic. JS `await` then those. **Match.** Quest-guardian doppel remap still named (C `|| MS_GUARDIAN`; JS only `PM_DOPPELGANGER && mptr !== doppel`). Pre-existing.

`revive` `:994` doppel then speed/HP. JS await then those. **Match.** `bhitm` `:497` stone→flesh golem: await in the `&&`. **Match short-circuit.** `stone_to_flesh_obj` `:2056` `NC_VIA_WAND_OR_SPELL`: await. **Match the call.** `possibly_unwield` still named inside `newcham`.

`makemon.c:1367`. C finishes `newcham` before `allow_minvent=FALSE`. JS still `if (... && newcham(mtmp, null, 0))` with no await. Birth is not `mleashed`. Elbereth needs `mon_moving`. D-log names monster-turn summon Elbereth. **Not a dropped-Promise C-wrong on the mleashed arm.** Leaving `newcham` a sync export so 134 `makemon` sites stay boolean is an analogue, not a stub.

`sp_lev.c:2166` `load_tower1`. Same: comment, no await. mklev is not `mon_moving`. **Named.**

Callee closure (this SHA’s await sites). LIVE: `newcham` (arms D-1645), `m_unleash`, `leashable`, `update_inventory`, `set_apparxy`, `onscary`, `monnear`, `monflee`. CLONE: the three `newcham_*` helpers (not re-defined here). OMIT named: slim / poly-trap / muse / swallow / SHOW_MSG `:3825` / sync birth. STUB: **none** in the awaited arms. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**. “Dispatch ported, async callee not awaited at the listed async sites” is **false after this SHA**.

## Hallucinations / overclaim

Subject async NO_NC_FLAGS callers await unleash/Elbereth: **true for the nine live async sites.** D-log “sync makemon / load_tower1 still named”: **true.** Do **not** stamp “Match C all `newcham` callers await.” Do **not** stamp “Match C `vamp_stone` `:3825` NC_SHOW_MSG.” Do **not** stamp “Match C `mhitm_ad_slim` / poly-trap / muse.” Do **not** stamp “Match C `newcham` is `async function`.” Public-unhit for leashed-pet poly.

## Density

+63: Must-fix await cluster after **606**, one `newcham` caller family. Did not re-port `m_unleash` / `monflee`. Below §2b’s Open ~80 floor; Must-fix may be that small. Did not glue convert_arg.

## Verification

Wired: await at the nine sites; IIFE still returns boolean-or-Promise. Unwired C: named omits above. Conf: no new `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for mleashed unleash and monster-turn Elbereth. Fortress does not prove a leashed pet poly awaited the TRUE-feedback pline.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): sync makemon birth / `load_tower1`; `vamp_stone` `:3825` still flags 0; poly-trap / steed POLY_TRAP `NC_SHOW_MSG`; `mhitm_ad_slim`; muse poly; `do.c` swallow `newcham`; `kill_genocided_monsters` cham; `read.c` doppel `firstchoice`; `possibly_unwield` / `mon_break_armor` / ustuck / `poly_steed`. Do **not** re-port `m_unleash` / `monflee`. Do **not** add `monflee` clone #3. Do **not** make `makemon` async in a drive-by.

Verdict: **ACCEPT-WITH-DEBT**
