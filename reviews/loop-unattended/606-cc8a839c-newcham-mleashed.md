# Review 606 — cc8a839c — mon.c newcham mleashed m_unleash + Elbereth monflee (D-1645)

## Metadata
- Full / short hash: `cc8a839cca26a32db4dc228bda5574e1670671f2` / `cc8a839c`
- Parent: `d48909a2` (D-1644). This file audits **this SHA only** (seventh of nine `js/` commits since review **599**). Archive **Addressed:** D-1645 `cc8a839c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 11:24:04 +0200
- D-id: **D-1645**
- Stats: `js/makemon.js` +118/−53. Band **150–350** (js/ insertions **118** <250; id >454).
- Claims to close: Open newcham mleashed after D-1609/D-1637. Not `m_unleash` body (D-1609). Not `restore_cham` (D-1637). Not keepdogs/`grow_up`. `reviews/loop-2026-08-15/` has no unpaid mleashed Must-fix.
- JS / map: `makemon.js` `newcham` / `newcham_mleashed` / `newcham_elbereth`. `c-js-map/turns.md` / `data.md`.
- Prior reviews this SHA claims to close: map named mleashed + Elbereth after D-1586 SHOW_MSG.

## Intent vs deliverable

Git subject promises: a leashed pet whose new form cannot keep a leash is `m_unleash`'d (TRUE) else perm_invent refreshes, and monster-turn Elbereth may `monflee`, instead of omitting those arms after D-1609/D-1637.

Pinned C `mon.c` `newcham` `:5276–5535` (`node scripts/csym.mjs newcham`). mleashed `:5386–5398`. Elbereth `:5517–5532`. `--callers newcham`: `makemon.c:1367`, `mhitm.c:874/:1100/:1174`, `mon.c` several, `trap.c:785/:2519/:3155`, `zap.c:305/:497/:994/:2056`, `uhitm.c:3542/:3585/:4992`, `monmove.c:2388`, `muse.c`, `read.c:3354`, `sp_lev.c:2166`. Callees `apply.c` `m_unleash` `:725–742` (`--callers` includes `mon.c:5389`); `leashable` `:760–766` (`mon.c:5388`); `invent.c` `update_inventory`; `monmove.c` `set_apparxy` / `monflee` `:461–530` (`mon.c:5531` `rn1(9,2)`); `mon.c` `onscary` / `monnear`.

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
            monflee(mtmp, rn1(9, 2), TRUE, TRUE); /* 2..10 turns */
    }
```

Old JS: named omit after `set_mon_data`; SHOW_MSG already Promise-capable (D-1586). The diff **does** `newcham_mleashed` / `newcham_elbereth` / hoist `newcham_post_set_mon_data`. It **does not** port `possibly_unwield` / `mon_break_armor` / `mselftouch` / boulder `flooreffects` / `poly_steed` / ustuck expels. Named. It **does** make NO_NC_FLAGS return a Promise when unleash or Elbereth flee runs.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `newcham` | C `:5276–5535`, **LIVE** (arms this SHA) | `makemon.js:1477` still **sync export** that may return `Promise` |
| `newcham_mleashed` | C `:5386–5398`, **CLONE** (caller helper) | not a second `m_unleash` |
| `newcham_elbereth` | C `:5517–5532`, **CLONE** (caller helper) | |
| `newcham_after_unleash` / `newcham_post_set_mon_data` | C remainder after set_mon_data, **CLONE** | light/invis/worm/newsym/vamp/gear |
| `m_unleash` | C apply.c `:725–742`, **LIVE** | D-1609; **ASYNC** |
| `leashable` | C apply.c `:760–766`, **LIVE** | |
| `update_inventory` | C invent.c, **LIVE** | leashed-and-still-leashable arm |
| `set_apparxy` | C monmove.c, **LIVE** | |
| `onscary` / `monnear` | C mon.c, **LIVE** | `onscary` still cloned in music.js/teleport.js — **do not add #4** |
| `monflee` | C monmove.c `:461–530`, **LIVE** | **ASYNC**; music.js still has clone #2 — **do not add #3** |
| `u_at` | C you.h, **LIVE this SHA** | import const.js |
| `possibly_unwield` / `mon_break_armor` / `mselftouch` | C after SHOW_MSG, **OMIT named** | |
| `poly_steed` / boulder `flooreffects` / ustuck | C before Elbereth, **OMIT named** | |

`node scripts/csym.mjs newcham` → `mon.c:5276-5535`. `m_unleash` → `apply.c:725-742`. `leashable` → `apply.c:760-766`. `monflee` → `monmove.c:461-530`. `--callers newcham`: 46 refs. `--callers m_unleash`: `mon.c:5389` among 17. `--callers leashable`: `mon.c:5388`. `--callers monflee`: `mon.c:5531`.

RNG: Elbereth arm **one** `rn1(9,2)` (`rng.js` `rn2(x)+y` → 2..10). `initworm(rn2(5))` already in post_set (not new). `monflee` body may `rn2(10)` / `rn2(25)` when flee messages fire — LIVE callee, not this SHA. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
newcham          js/makemon.js:1477   sync
m_unleash        js/apply.js:1462   ASYNC — await required
monflee          js/monmove.js:768   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/music.js:217
leashable        js/apply.js:1499   sync
onscary          js/mon.js:323   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/music.js:205  js/teleport.js:420
monnear          js/mon.js:819   sync
set_apparxy      js/monmove.js:689   sync
```

`--can makemon.js apply.js m_unleash`: ALREADY. `--can makemon.js invent.js update_inventory`: ALREADY. `--can makemon.js monmove.js monflee`: ALREADY. `--can makemon.js mon.js onscary`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** write `m_unleash` #2 or `monflee` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

mleashed. After `set_mon_data`: if `mleashed` and `!leashable` → `m_unleash(mtmp, true)`; else `update_inventory()`. `leashable` is long-worm / unsolid / (nolimbs && !head). **Match `:5386–5398`.** C `m_unleash` is **void** and runs **before** light/invis/worm/SHOW_MSG. JS: if `m_unleash` returns a Promise, `newcham` **returns that Promise** and defers `newcham_after_unleash` (light…SHOW_MSG…Elbereth) with `.then`. When the caller **awaits**, order **Match C**. When the caller ignores the return (`makemon.js:2856` `if (newcham(mtmp, null, 0))`, `mhitm.js:447/:1859/:2880`, `trap.js:331`, `zap.js:2992/:3879`, `uhitm.js:2037`, `mklev.js:5268`), the Promise is a microtask: `set_mon_data` has already run, unleash/light/Elbereth have **not**. C never returns 1 until those finish. That is a **C-wrong**, not a named omit.

Leashable-and-still-leashed: `update_inventory()` then `unleash_p === null` so after_unleash runs synchronously. **Match C else.**

Elbereth. C after poly_steed (JS **OMIT named** poly_steed, so Elbereth is next after gear/SHOW_MSG). `context.mon_moving`; `!u_at(mux,muy)` → `set_apparxy`; hostile `onscary && monnear` → `monflee(..., rn1(9,2), true, true)`. JS helper **Match `:5517–5532`** including RNG arity. `newcham_elbereth` returns the `monflee` Promise; `after_msg` awaits it. Same caller-await hole as unleash: a monster-turn poly from a **sync** `newcham(..., 0)` site (trap/zap/mhitm) can drop the flee Promise.

SHOW_MSG / boolean. D-log: “NO_NC_FLAGS stays boolean unless unleash/SHOW_MSG/flee.” **True as written** — and that is the hole: makemon birth `newcham(..., 0)` is not leashed, so it stays boolean; a **later** leashed-pet poly through those same sync sites does not. `if (newcham())` is Promise-truthy when the form **did** change (Promise only after `set_mon_data`), so truthiness matches C `return 1`; **order** does not.

Vampire cham / `check_gear_next_turn` still run **before** awaiting SHOW_MSG (pre-existing D-1586; C does cham after the pline). Named analogue, not this SHA’s new miss.

Callee closure (mleashed / Elbereth arms). LIVE: `m_unleash`, `leashable`, `update_inventory`, `set_apparxy`, `onscary`, `monnear`, `monflee`, `u_at`, `rn1`. CLONE: the three `newcham_*` helpers (matched to the C blocks). OMIT named: unwield/armor/mselftouch/boulder/poly_steed/ustuck. STUB: **none** in those two arms — callees are live, not TODO. Combined-arm ships **as dispatch**. “Dispatch ported, callee stubbed” is **false**. “Dispatch ported, async callee not awaited at C’s void call sites” is **true**.

## Hallucinations / overclaim

Subject mleashed unleash TRUE / `update_inventory` + Elbereth `monflee`: **true in the helpers.** D-log “sync makemon `if (newcham())` stays boolean”: **true for un-leashed birth**; **false** as a claim that NO_NC_FLAGS **cannot** return a Promise. Do **not** stamp “Match C `newcham` is always boolean for NO_NC_FLAGS after this SHA.” Do **not** stamp “Match C `possibly_unwield` / `poly_steed`.” Do **not** stamp “Match C all `newcham` callers await.” Canary **23**/23 is source/leashable, not a leashed-pet poly session. Public-unhit.

## Density

+118: C mleashed 13 + Elbereth 16 + hoist of post-set already in `newcham`. §2b one `newcham` caller cluster after D-1609/D-1637. Did not re-port `m_unleash` body or `restore_cham`. Above a one-`if` peel.

## Verification

Wired: mleashed branch; `rn1(9,2)` on Elbereth; helpers import live callees. Unwired C: async wait at sync call sites; named omits above. Conf: one `rn1` on the flee arm. No seed gate.

D-log canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for leashed-pet poly and monster-turn Elbereth flee. Fortress does not prove the Promise is awaited.

## Actionable C-wrongs

1. Await `newcham` at remaining sync `newcham(..., 0)` / `NO_NC_FLAGS` sites that can hit mleashed `m_unleash` or Elbereth `monflee` (`makemon.js:2856`, `mhitm.js`, `trap.js`, `zap.js`, `uhitm.js`, `mklev.js`), or keep those arms from returning a Promise until every C `void newcham` analogue awaits. C `mon.c` `:5386–5398` / `:5517–5532` finishes before `return 1`. Do **not** re-port `m_unleash` / `monflee` bodies. Do **not** add `monflee` clone #3.

Verdict: **QUALITY-RISK**

**Addressed:** D-1648
