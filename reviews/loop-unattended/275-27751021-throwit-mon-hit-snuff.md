# Review 275 — 27751021 — dothrow.c throwit_mon_hit snuff_candle / hot_pursuit (D-1313)

## Metadata
- Full / short hash: `27751021d9f9ea964565bca4bad5ed66d849f3ce` / `27751021`
- Parent: `77606a78` (D-1312). This file audits **this SHA only**. Archive row **Addressed:** D-1313 `27751021` already has the short hash (filled by D-1314).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 22:30:36 +0200
- D-id: **D-1313**
- Stats: 11 files, +106 / −62 — `js/dothrow.js` +28 / −~8; `js/shk.js` +1 export; `js/apply.js` comments.
- Claims to close: Open `dothrow.c` throwit_mon_hit snuff_candle / hot_pursuit (named from D-1301 / D-1312). Not m_respond. `reviews/loop-2026-08-15/` has no unpaid snuff Must-fix.
- JS / map: `dothrow.js` `throwit_mon_hit`; `shk.js` `inside_shop` export; `apply.js` caller comment; `c-js-map/turns.md`. dokick `snuff_candle` named. **throwit still calls `thitmonst`.**
- Prior reviews this SHA claims to close: **263** named snuff/`hot_pursuit` inside `throwit_mon_hit` after boomhit; **273** noted throwit still calling `thitmonst`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit_mon_hit so a thrown lit candle/candelabrum is snuffed and a shopkeeper hit from outside their shop runs hot_pursuit, instead of staying lit/peaceful.”

C `throwit_mon_hit` (`dothrow.c:1482–1506`): MINVENT shk-holds return TRUE; `snuff_candle(obj)` (not `snuff_lit`); `notonhead`; `thitmonst`; re-`m_at(bhitpos)`; if surviving `isshk` and (`!inside_shop(u.ux,u.uy)` or `!strchr(in_rooms(mx,my,SHOPBASE), *u.ushops)`) then `hot_pursuit`; if obj_gone clear `thrownobj`; **always return FALSE** except the MINVENT true. Callers: `throwit` (`:1695`) after swallow/bhit/boomhit, and `zap.c` `boomhit` (`:4192`).

Old JS: `thitmonst` + clear `thrownobj`; snuff / pursuit named omit. Early MINVENT true already live. `boomhit` already called `throwit_mon_hit` (D-1301).

The diff **does** fill the helper: live `snuff_candle`, `inside_shop` export, `strchr` NUL-terminator semantics, re-`m_at`, `hot_pursuit`. It does **not** change `throwit`. HEAD `dothrow.js:2174` is still `if (await thitmonst(hitmon, obj))` with a comment that *names* `throwit_mon_hit`. The helper’s own comment claims “Callers: throwit, boomhit.” Only boomhit is true.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit_mon_hit` body | C `:1482–1506`, **filled** | snuff + pursuit |
| `snuff_candle` | C `apply.c:1472–1491`, **imported live** | D-1242; candles/candelabrum only |
| `hot_pursuit` | C `shk.c:1449–1463`, **imported live** | rile + following + `clear_no_charge` |
| `inside_shop` | C `shk.c:567–576`, **exported live** | |
| `in_rooms` | C `hack.c`, **imported live** | |
| `strchr` NUL | C `:1498–1499`, **wired** | empty `ushops` → hit terminator |
| boomhit → `throwit_mon_hit` | C `:4192`, **pre-existing** | D-1301 |
| throwit → `throwit_mon_hit` | C `:1695`, **not wired** | still `thitmonst` |
| dokick `snuff_candle` | C `dokick.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** in the helper (`snuff_candle` / `hot_pursuit` have none). `thitmonst` still burns `rnd(20)` on the boomhit path only.

## C ↔ JS fidelity

Pinned C (`dothrow.c:1482–1506` + caller `:1695`):

```
boolean
throwit_mon_hit(struct obj *obj, struct monst *mon)
{
    if (mon) {
        if (mon->isshk && obj->where == OBJ_MINVENT && obj->ocarry == mon)
            return TRUE;
        (void) snuff_candle(obj);
        gn.notonhead = (gb.bhitpos.x != mon->mx || gb.bhitpos.y != mon->my);
        obj_gone = thitmonst(mon, obj);
        mon = m_at(gb.bhitpos.x, gb.bhitpos.y);
        if (mon && mon->isshk
            && (!inside_shop(u.ux, u.uy)
                || !strchr(in_rooms(mon->mx, mon->my, SHOPBASE), *u.ushops)))
            hot_pursuit(mon);
        if (obj_gone)
            gt.thrownobj = (struct obj *) 0;
    }
    return FALSE;
}
…
    if (throwit_mon_hit(obj, mon)) {
        throwit_return(TRUE);
        return;
    }
```

Helper body matches: `snuff_candle` not `snuff_lit` (magic lamp stays lit); `strchrHit = ushop0 === '' || rooms.includes(ushop0)` is C `strchr(s, '\0')` always non-NULL; `hot_pursuit` is the real `shk.js` callee. MINVENT true is the only TRUE return.

**throwit does not call it.** Swallow and the fly loop both set `hitmon` then `thitmonst`. A thrown lit tallow that hits a monster is never snuffed. A dart that hits a shopkeeper from the street never `hot_pursuit`s. C always goes through the wrapper, including `mon == NULL` (no-op) and boomhit-already-consumed (boomhit returns NULL, throwit then no-ops the wrapper). JS boomhit still uses the wrapper then returns null, so the **boomerang** path snuffs/pursues. The subject’s “thrown candle / shopkeeper hit” is the **throwit** path.

This is “Match C `throwit_mon_hit` dispatch” while throwit’s callee is still `thitmonst`. The helper is not a stub. The **caller** is.

## Hallucinations / overclaim

Subject + D-1313 + helper comment + D-index “JS live” say a thrown lit candle is snuffed and an outside-shop shk runs `hot_pursuit`. **The helper body plus boomhit are the hunk. throwit is not.** Stamping **Addressed:** D-1313 as “Match C thrown-missile snuff/pursuit” is an overclaim. Do **not** stamp “Match C dokick snuff.” Do **not** treat cohort PASS as evidence a dart snuffed a candle.

## Density

One C function body. ~25 executable JS lines. Right size for the helper. Leaving the documented caller unwired is not a second cluster — it is the miss that makes the helper dead on the promised path.

## Branch-by-branch confirm

1. boomhit hits mon: `throwit_mon_hit` snuffs then `thitmonst` then maybe pursuit. Match `:4192`.
2. throwit fly / swallow hits mon: `thitmonst` only. **C-wrong vs `:1695`.**
3. Lit tallow via throwit: stays lit. C snuffs first (`apply.c:1477–1487`).
4. Magic lamp via the helper: `snuff_candle` false. Match (not `snuff_lit`).
5. Outside shop, helper path: `!inside_shop` → `hot_pursuit`. Match `:1497–1500`.
6. Same shop: `inside_shop` && strchr hit → no pursuit. Match.
7. Empty `ushops`: strchr terminator hit; pursuit only if `!inside_shop`. Match NUL quirk.
8. MINVENT shk-holds: return true before snuff. Match `:1487–1488`. throwit never sees that TRUE.
9. **Public-unhit** unless a session throws a lit candle or hits a shk (boomhit only).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` is an ESM cycle (`apply.js` already imports `thitmonst`), not filesystem. Plain ESM.

## Verification

Journal: private canary **16**/16 (order of the **helper**, not throwit); green+strict seed8000/0900; cohort **7**/7. Fortress PASS does not exercise thrown-candle snuff. Cadence this audit: full `sessions` at HEAD `a1d48196` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

1. `dothrow.c` `throwit` after swallow/bhit must call `throwit_mon_hit(obj, mon)` (C `:1695`), not `thitmonst` (`js/dothrow.js` ~2174). On `TRUE` (MINVENT shk catch) `throwit_return(TRUE)`. That is the one-iter fix: snuff and outside-shop `hot_pursuit` then fire on thrown missiles. Do not rewrite `snuff_candle`. Do not pull dokick snuff. Do not pull zap.js bhit.

Named omits (map, not Must-fix): dokick `snuff_candle`; thitmonst vanish pline.

Do not Must-fix “export `inside_shop`.” Do not Must-fix boomhit (already wired). Do not Must-fix `strchr` NUL (the helper already matches).

## Callers / RNG ledger

C: `throwit` and `boomhit` → `throwit_mon_hit` → `thitmonst`. JS: boomhit only. Public fortress is not evidence a thrown candle was snuffed.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: `throwit_mon_hit` now snuffs candles and can `hot_pursuit`, but `throwit` still calls `thitmonst`, so the promised thrown-missile path never enters the helper.
- Must-fix: prepend throwit→`throwit_mon_hit` (this review). Archive **Addressed:** D-1313 `27751021` already filled — the stamp overclaims; the next port still has to wire the caller.
