# Review 202 — d8f28958 — uhitm.c remaining already-ported `pline_mon` (D-1240)

## Metadata
- Full / short hash: `d8f289582e0052bff9eae697bfcccea329b6ef12` / `d8f28958`
- Parent: `51a337e7` (D-1239). This file audits **this SHA only**. Archive row **Addressed:** D-1240 `d8f28958` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 00:06:32 +0200
- D-id: **D-1240**
- Stats: 11 files, +121 / −43 — `js/uhitm.js` +11 / −4; `js/mhitu.js` +17 / −5; comment `js/display.js`.
- Claims to close: Open `uhitm.c` remaining `pline_mon` (named from D-1227 / D-1239 / review **189**). Not troll_baned. `reviews/loop-2026-08-15/` has no unpaid pline_mon Must-fix.
- JS / map: `uhitm.js` `light_hits_gremlin`; `mhitu.js` `mhitm_ad_legs_u` / `mhitm_ad_sedu`; `c-js-map/turns.md`. Unported `mhitm_ad_*` / mhitu `hitmsg` still named.
- Prior reviews this SHA claims to close: **189** named remaining uhitm/worn/trap `pline_mon` (this SHA takes the already-ported uhitm subset only).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c remaining already-ported pline_mon so gremlin light, xan nuzzle, and sedu brag store a11y.msg_loc at the monster cell, instead of printing through bare pline.”

C sites that already had JS bodies using `pline`:

- `light_hits_gremlin` (`uhitm.c:6425–6434`): cry `pline_mon` if `!Deaf && mdistu<=90`; else recoil `pline_mon` if `canseemon`.
- `mhitm_ad_legs` nuzzle (`:4454–4455`): `pline_mon` when `magr->mcan`. Reach/prick/scratch stay `pline` (`:4451`, `:4461–4473`).
- `mhitm_ad_sedu` brag (`:4647–4651`): `pline_mon` when defender is you and you seduce. Charm-fail stays `pline` (`:4659–4662`).

Callee `pline_mon` (`pline.c:137–150`) sets loc then `vpline` — live since D-1215 (`set_msg_xy(mx,my)` then `pline`).

Old JS: those three messages used `pline`, so `a11y.msg_loc` stayed 0,0 and `accessiblemsg` On could not prefix.

The diff **does** wrap those three. It does **not** wrap flash awaken/blind/illuminate, legs reach/prick, sedu charm-fail, unported `mhitm_ad_*`, or mhitu `hitmsg`. Named. `flash_hits_mon` comment now says awaken stays `pline` like C (`:6370+`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `light_hits_gremlin` cry/recoil | C `:6429` / `:6433`, **wired** | was `pline` |
| `mhitm_ad_legs_u` nuzzle | C `:4454`, **wired** | mhitu arm only |
| `mhitm_ad_sedu` brag | C `:4647`, **wired** | mhitu arm only |
| `pline_mon` | C `:137–150`, **imported live** | not a stub |
| flash awaken/blind | C `flash_hits_mon`, **stays `pline`** | C uses `pline` |
| legs reach/prick | C `:4451` / `:4461+`, **stays `pline`** | |
| sedu charm-fail | C `:4659`, **stays `pline`** | |
| `Adjmonnam(..., "plain")` | C charm-fail, **named omit** | pre-existing `Monnam` |
| unported `mhitm_ad_*` / `hitmsg` | **named omit** | rust/fire/hugs/heal/wrap/… |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** Deaf / `mdistu<=90` / `canseemon` gates unchanged.

## C ↔ JS fidelity

Pinned C gremlin (`uhitm.c:6427–6434`):

```
    if (!Deaf && mdistu(mon) <= 90) {
        pline_mon(mon, "%s %s!", Monnam(mon),
                  (dmg > mon->mhp / 2) ? "wails in agony"
                                       : "cries out in pain");
    } else if (canseemon(mon)) {
        pline_mon(mon, "%s recoils from the light!", Monnam(mon));
    }
```

JS: same `!Deaf && dist<=90` vs `canseemon` else-if; half is `((mhp)/2)|0` before subtracting dmg (C compares to `mhp` **before** `mhp -= dmg` below). Match. Then `wake_nearto(30)` and death `monkilled`/`killed` unchanged.

Nuzzle: C `pline_mon(magr, "%s nuzzles against your %s %s!", Monnam(magr), sidestr, leg)` only on `mcan` after the reach-fail arm. JS same; reach still `pline` with `Monst_name` (C `pline` with `Monst_name`). Match.

Brag: C `pline_mon(magr, "%s %s.", Monnam(magr), Deaf ? "says something..." : minvent ? "brags..." : "makes some remarks...")`. JS `pline_mon(mtmp, ...)`. Charm-fail still `pline`. Deaf test is the pre-existing `u.Deaf || u.HDeaf` clone (C `Deaf` is `H\|\|E`); not introduced here; not a Must-fix of the wrap.

**Callee `pline_mon` is live:** `set_msg_xy(mtmp.mx, mtmp.my)` then `pline`. `accessiblemsg` On prefixes from that loc (D-1207). Default Off: screens unchanged. This is the whole claimed effect.

## Hallucinations / overclaim

Subject + D-1240 say those three already-ported sites store loc. **Three `pline`→`pline_mon` wraps + live callee are the hunk.** Stamping **Addressed:** D-1240 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C every remaining `pline_mon`” (unported `mhitm_ad_*` / `hitmsg` / worn / trap still named) or “Match C `Adjmonnam` charm-fail.”

Queue “remaining `pline_mon`” meant the already-ported uhitm sites, not the whole tree — same reading as review **189** for monmove.

## Density

Three sibling already-ported sites that C already wrote with `pline_mon`. Right size for a remaining-writer cluster. Did not invent new combat arms.

§2b “too small”: not a single deferred `if` — three C call sites in one writer family.

## Branch-by-branch confirm

1. Gremlin `!Deaf && dist<=90`: cry via `pline_mon`. Match.
2. Else `canseemon`: recoil via `pline_mon`. Match.
3. Deaf + `!canseemon`: silent (C). Unchanged.
4. Xan `mcan`: nuzzle `pline_mon`. Match.
5. Xan reach / boot prick: still `pline`. Match C.
6. Nymph vs seducer: brag `pline_mon` then `rloc`. Match.
7. Cancelled seducer charm-fail: still `pline`. Match.
8. `flash_hits_mon` sleep awaken: still `pline`. Match C.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **21**/21 (C vs JS writers; runtime cry/recoil prefix; sleeping awaken unprefixed; Off no prefix; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` is On (default Off). Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. Writer swap through live `pline_mon`. Sites C still writes with `pline` were not wrapped.

Named omits (map, not Must-fix):

1. Unported uhitm `mhitm_ad_*` `pline_mon` (rust/fire/hugs/heal/wrap/…)
2. mhitu `hitmsg` / `missmu`
3. mgc “avoids harm”; animal sedu flee
4. worn/trap `pline_mon`

Do not wrap `msg_mon_movement` as `pline_mon` (D-1228). Do not wrap flash awaken.

## Callers / RNG ledger

C: `flash_hits_mon` → `light_hits_gremlin`; mhitu legs/sedu. JS same. No new RNG. Public fortress is not evidence `accessiblemsg` On fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: gremlin cry/recoil, xan nuzzle, and sedu brag now go through live `pline_mon`; C’s remaining `pline` sites and unported `mhitm_ad_*` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1240 `d8f28958`.
