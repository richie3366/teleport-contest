# Review 245 — 5b4788e1 — dothrow.c throwit swallowit (D-1283)

## Metadata
- Full / short hash: `5b4788e1e9fea312f41afb7ed82a80ffe79b1d64` / `5b4788e1`
- Parent: `ad42d04e` (reviews **241–244**). JS parent `7d61ee8b` (D-1282). This file audits **this SHA only**. Archive row **Addressed:** D-1283 `5b4788e1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 15:17:10 +0200
- D-id: **D-1283**
- Stats: 10 files, +168 / −44 — `js/dothrow.js` +99 / −~20; `js/makemon.js` +3.
- Claims to close: Open `dothrow.c` throwit swallowit (named from D-1274 / review **244**). Not returning_missile. `reviews/loop-2026-08-15/` has no unpaid swallowit Must-fix.
- JS / map: `dothrow.js` `swallowit` / `throwit` / `throwit_returning_missile`; `makemon.js` `mpickobj` thrownobj clear; `c-js-map/turns.md`. slip / stamina / steed / boomhit / throw_gold swallow / thitmonst vanish named.
- Prior reviews this SHA claims to close: **244** named omit `u.uswallow` before `u.dz`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit swallowit so a throw while swallowed is ingested by the engulfer instead of flying, hitting the ceiling, or landing.”

C `swallowit` (`dothrow.c:1468–1475`): `obj != uball` → `mpickobj(u.ustuck, obj)` (steal.c clears `gt.thrownobj`) then `throwit_return(FALSE)`; else `throwit_return(TRUE)`. Caller `throwit` `:1569–1578` **before** `u.dz` / boomhit / `bhit`: ball/chain to `u.ux,u.uy`; `mon = u.ustuck`; `bhitpos` = mon; tethered `tmp_at` (named). After `throwit_mon_hit`: `:1704–1706` `uswallow && !returning_missile` → swallowit. Fail-catch `:1751–1754` and fail-to-return `:1772–1775` swallowit, not dropy/land.

Old JS: named omit after D-1282; swallowed `t`+`<` ran `toss_up` / flew.

The diff **does** live `swallowit`, skip `u.dz`/bhit while swallowed, `thitmonst(ustuck)` then `mpickobj`, AutoReturn fail-paths swallow, and `mpickobj` thrownobj/kickedobj clear. It does **not** port slip `rn2(7)`, stamina, steed `rn2(6)`, boomhit body, throw_gold swallow (`:2671–2679`), or thitmonst vanish pline. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `swallowit` | C `:1468–1475`, **new** | |
| throwit `uswallow` before `u.dz` | C `:1569–1578`, **wired** | |
| post-hit swallow | C `:1704–1706`, **wired** | |
| fail-catch / fail-to-return swallow | C `:1751` / `:1772`, **wired** | inside `throwit_returning_missile` |
| `mpickobj` thrownobj clear | C `steal.c:635–638`, **wired** | live `add_to_minv` |
| `throwit_return` | C `:1460–1465`, **pre-existing** | |
| `thitmonst` | C `throwit_mon_hit`, **imported live** | snuff/hot_pursuit named |
| tethered `tmp_at` | C `:1577–1578`, **named omit** | display RNG |
| throw_gold swallow | C `:2671–2679`, **named omit** | different function |
| slip / stamina / steed / boomhit | C before swallow, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** on the swallow path (AutoReturn `rn2(100)` already D-1282).

## C ↔ JS fidelity

Pinned C swallowit (`dothrow.c:1468–1475`):

```
    if (obj != uball) {
        (void) mpickobj(u.ustuck, obj); /* clears 'gt.thrownobj' */
        throwit_return(FALSE);
    } else
        throwit_return(TRUE);
```

JS same split; extra `stuck && obj` guard (C would deref null `ustuck`). `mpickobj` is **live** `makemon.js` (carry_obj_effects + add_to_minv) plus this SHA’s thrownobj clear. This is **not** “Match C dispatch, callee is a stub.”

Throwit order: C `if (u.uswallow) { … } else if (u.dz) { toss_up / hitfloor; return; } else if (BOOMERANG) … else bhit`. JS `if (uswallow) { … } else if (u.dz) { … return; }` then `if (!uswallow) { boomhit-skip + bhit }`. Swallowed never `toss_up`. Match the claimed before-dz gate.

Then `thitmonst(ustuck)`. If consumed: clear thrownobj, `throwit_return(false)`, return — C `obj_gone` then `!gt.thrownobj` skip. If still held and `!returning_missile`: swallowit. AutoReturn fail-catch / `!rn2(100)` fail-to-return: swallowit inside `throwit_returning_missile` (C `:1751` / `:1772`). Match.

Uball swallow: C `uball->ox = uchain->ox = u.ux` (both hero). JS sets ball to **old** `chain.ox` then chain to hero. Diverges on the exception path that does **not** `mpickobj`. Not the ingest hunk. Do not Must-fix.

## Hallucinations / overclaim

Subject + D-1283 say a swallowed throw is ingested instead of flying / ceiling / landing. **`uswallow` before `u.dz` + `swallowit`/`mpickobj` + fail-path swallow are the hunk.** Stamping **Addressed:** D-1283 is fair. Do **not** stamp “Match C throw_gold swallow entrails.” Do **not** stamp “Match C slip / stamina / steed / boomhit.” Do **not** stamp “Match C `throwit_mon_hit` snuff_candle / hot_pursuit.” Do not stamp “Match C uball ox=uy both hero.”

## Density

One swallow envelope: helper + before-dz gate + post-hit + AutoReturn fail arms + steal.c tracker. ~99 JS lines. Did not glue meatobj. Right size.

## Branch-by-branch confirm

1. Swallowed dart, not AutoReturn: skip `u.dz`; `thitmonst(ustuck)`; `mpickobj`; no land. Match `:1569` + `:1704`.
2. Swallowed `t`+`<`: no `toss_up`. Match before-dz.
3. Swallowed ring: minvent, thrownobj cleared. Match steal.c.
4. Swallowed uball: skip `mpickobj`; `throwit_return(true)`. Match else arm. ox/oy analog named above.
5. Swallowed wielded aklys, catch `rn2(100)`: return to hand (D-1282), no swallowit. Match.
6. Same, fail-catch: swallowit, not dropy. Match `:1751`.
7. Same, `!rn2(100)` fail-to-return: swallowit, not land. Match `:1772`.
8. Not swallowed: `u.dz` / bhit unchanged. Match else.
9. throw_gold / slip / boomhit: still skipped. Named.
10. Public Tourist not engulfed. Public-unhit unless a session throws while `u.uswallow`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./makemon.js')` is relative ESM. Plain ESM.

## Verification

Journal: private canary **13**/13 (C swallowit/before-dz/fail paths; JS live; swallowed ring minvent not toss_up; dart not distant land; aklys return-or-swallow; uball skip mpickobj; thrownobj clear; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws while swallowed. Cadence this audit: full `sessions` at HEAD `9486280d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85).

## Actionable C-wrongs

None for Must-fix. Ingest uses live `mpickobj`; before-dz order matches C; AutoReturn fail arms swallow instead of dropy/land.

Named omits (map, not Must-fix):

1. throw_gold swallow entrails / `add_to_minv`
2. slip `rn2(7)`; stamina drop; steed potion `rn2(6)`; boomhit
3. tethered `tmp_at`; thitmonst vanish pline; `throwit_mon_hit` snuff / hot_pursuit
4. swallowed uball ox/oy both `u.ux,u.uy` (JS uses prior chain coords)

Do not Must-fix “uball ox=old chain.” Do not Must-fix “extra `if (uswallow) swallowit` after returning_missile returns false” (dead after `:1704` / in-function fail swallow). Do not pull meatobj this SHA.

## Callers / RNG ledger

C: `throwit` only. JS: same. No new positional RNG. Public fortress is not evidence a swallowed dart went into `ustuck` minvent.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: swallowed throws now skip `u.dz`/bhit and go to live `mpickobj(ustuck)`; slip / throw_gold swallow stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1283 `5b4788e1`.
