# Review 277 — 44a786aa — dothrow.c throwit → throwit_mon_hit (D-1315)

## Metadata
- Full / short hash: `44a786aace1ffb4097ce48dd64d7aed38f731f1f` / `44a786aa`
- Parent: `e176215d` (reviews **273–276**). JS parent `a1d48196` (D-1314). This file audits **this SHA only**. Archive **Addressed:** D-1315 `44a786aa` already has the short hash (filled by D-1316).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 23:05:27 +0200
- D-id: **D-1315**
- Stats: 10 files, +96 / −34 — `js/dothrow.js` +28 / −~8; docs + review **275** stamp.
- Claims to close: Must-fix `dothrow.c` throwit → `throwit_mon_hit` (not `thitmonst`) so snuff/`hot_pursuit` fire. Source: review **275**. Not ACURRSTR. `reviews/loop-2026-08-15/` has no unpaid throwit-caller Must-fix.
- JS / map: `dothrow.js` `throwit`; helper already live (D-1313). Vanish pline / dokick snuff / urange named.
- Prior reviews this SHA claims to close: **275** QUALITY-RISK (throwit still called `thitmonst`); **273** noted the same caller miss.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so swallow/bhit hits go through throwit_mon_hit, snuffing a thrown lit candle and running hot_pursuit on a street shopkeeper.”

C `throwit` (`dothrow.c:1695–1698`) after swallow / boomhit / bhit (not the `u.dz` early return): `if (throwit_mon_hit(obj, mon)) { throwit_return(TRUE); return; }`. Helper (`:1482–1506`, D-1313): MINVENT shk-holds TRUE; else `snuff_candle`, `notonhead` from `bhitpos` vs `mon->mx,my`, `thitmonst`, re-`m_at`, maybe `hot_pursuit`, clear `thrownobj` on gone, always FALSE. Swallow (`:1574–1576`) sets `mon = u.ustuck` and `gb.bhitpos` to the engulfer **before** that call. Boomhit (`zap.c:4192`) already runs the helper and returns NULL when the missile is consumed, so throwit’s second call is `mon == NULL` (no-op).

Old JS (HEAD of **275**): fly / swallow `if (await thitmonst(hitmon, obj))` — helper comment lied. Boomhit was already wired (D-1301).

The diff **does** replace that `thitmonst` with `throwit_mon_hit`, TRUE → `throwit_return(true)`, and sync `game.bhitpos` from swallow / fly locals. It does **not** rewrite the helper, dokick snuff, vanish pline, or ACURRSTR (next SHA). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit` → `throwit_mon_hit` | C `:1695`, **wired this SHA** | swallow / bhit / boomhit; `mon` may be NULL |
| `throwit_mon_hit` body | C `:1482–1506`, **pre-existing live** | D-1313; not a stub |
| `thitmonst` from throwit | C via helper only | grep: only the helper calls it |
| swallow `bhitpos` | C `:1575–1576`, **wired** | engulfer mx,my |
| boomhit already-hit | C `:4192` then return NULL | no second hit; throwit no-ops |
| `snuff_candle` / `hot_pursuit` | C callees, **imported live** | now reachable from throwit |
| dokick `snuff_candle` | C `dokick.c`, **named omit** | |
| fly vs `zap.c` bhit | C `bhit`, **named omit** | JS loop still stands in |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** in this SHA (helper still has none; `thitmonst` `rnd(20)` now also burns on the throwit path, which is what C does).

## C ↔ JS fidelity

Pinned C (`dothrow.c:1695–1703` + swallow `:1574–1576`):

```
    mon = u.ustuck;
    gb.bhitpos.x = mon->mx;
    gb.bhitpos.y = mon->my;
    …
    if (throwit_mon_hit(obj, mon)) {
        throwit_return(TRUE); /* alert shk caught it */
        return;
    }

    if (!gt.thrownobj) {
        if (tethered_weapon)
            tmp_at(DISP_END, 0);
```

JS after the `!uswallow` boomhit/bhit block always sets `bhitpos` from the fly/swallow locals, then `await throwit_mon_hit(obj, hitmon)`. TRUE returns via `throwit_return(true)`. `!thrownobj` then `throwit_tether_end` + `throwit_return(false)` matches `:1700–1703` (C leaves `throwit_return` to a later shared epilogue on some miss paths; JS still returns false when the missile is already gone — same “handled” exit).

Swallow: `hitmon = u.ustuck`, `bhitpos` written **before** the helper so `notonhead` is false on the engulfer cell. Match `:1575–1576` / `:1491`.

Boomhit: JS still returns `null` after an in-curve helper hit (`break` like C `:4192–4193`), so throwit’s `hitmon` is null and the wrapper no-ops. That is **not** a double `thitmonst`. Bars-destroy still returns **before** `:1695`, matching C `if (!obj)` `:1684–1691`.

`u.dz` still `throwit_return(true)` without the helper. Match `:1579–1599`.

This is **not** “Match C dispatch, callee is a stub.” The helper is the D-1313 body (`snuff_candle` not `snuff_lit`; live `hot_pursuit`). Review **275**’s caller miss is the hunk this SHA ships.

## Hallucinations / overclaim

Subject + D-1315 say swallow/bhit hits go through the helper so a thrown lit candle snuffs and a street shk runs `hot_pursuit`. **The caller plus bhitpos sync are the hunk.** Stamping **Addressed:** D-1315 is fair and **closes review 275**. Do **not** stamp “Match C dokick snuff.” Do **not** stamp “Match C `zap.c` bhit.” Do **not** stamp “Match C ACURRSTR urange” (D-1316). Do **not** treat fortress PASS as a thrown-candle snuff.

## Density

One documented caller plus the two `bhitpos` writes C does before that call. ~20 executable JS lines. Did not glue urange. Right size (§2b). This is the Must-fix peel **275** required, not a new cluster.

## Branch-by-branch confirm

1. Fly hits a monster: `throwit_mon_hit` then `thitmonst`. Match `:1695` via the helper, not a direct `thitmonst`.
2. Helper TRUE (MINVENT shk): `throwit_return(true)`. Match `:1696–1697`.
3. Lit tallow via throwit: `snuff_candle` before `thitmonst`. Match `:1490` (now reachable).
4. Magic lamp: `snuff_candle` false. Match (not `snuff_lit`).
5. Street shk: `hot_pursuit`. Match `:1497–1500`.
6. Swallow: `bhitpos` = engulfer, then helper. Match `:1574–1576` + `:1695`.
7. Boomhit consumed: boomhit already ran the helper; throwit `mon==NULL`. Match.
8. `u.dz` / ceiling / floor: no helper. Match `:1579–1599`.
9. **Public-unhit** unless a session throws a lit candle or hits a shk with a missile.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` was already on the helper. Plain ESM. `throwit` no longer comments “throwit_mon_hit” while calling `thitmonst`.

## Verification

Journal: private canary **10**/10; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless thrown-candle / street-shk. Cadence this audit: full `sessions` at HEAD `ccdc8670` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. `throwit` after swallow/bhit/boomhit calls live `throwit_mon_hit` (C `:1695`); TRUE is MINVENT shk catch; boomhit does not double-hit; swallow `bhitpos` is set.

Named omits (map, not Must-fix):

1. `dokick.c` `snuff_candle`
2. `thitmonst` vanish pline
3. `zap.c` bhit `THROWN_TETHERED_WEAPON` / `isqrt` (fly still stands in)

Do not Must-fix “export `inside_shop`.” Do not Must-fix boomhit (pre-wired). Do not Must-fix `strchr` NUL. Next Open after this SHA was ACURRSTR urange (now D-1316).

## Callers / RNG ledger

C: `throwit` and `boomhit` → `throwit_mon_hit` → `thitmonst`. JS: same after this SHA. Public fortress is not evidence a thrown candle was snuffed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: throwit now enters the live snuff/`hot_pursuit` helper after swallow and the fly loop; dokick snuff and zap bhit stay named.
- Must-fix stays empty for this SHA; review **275**’s caller item is **Addressed:** D-1315 `44a786aa`.
