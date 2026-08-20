# Review 248 — 9486280d — mhitu.c missmu pline_mon (D-1286)

## Metadata
- Full / short hash: `9486280d46242e29d29c98bee0f9f3e0435aef4b` / `9486280d`
- Parent: `965d2beb` (D-1285). This file audits **this SHA only**. Archive row **Addressed:** D-1286 lacked the short hash; this review commit fills `9486280d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 15:49:25 +0200
- D-id: **D-1286**
- Stats: 11 files, +201 / −138 — `js/mhitu.js` +19 / −4; comment `js/display.js` +6; journal rotate inflates docs.
- Claims to close: Open `mhitu.c` `missmu` `pline_mon` (named from D-1261 / review **223**). Not wildmiss. `reviews/loop-2026-08-15/` has no unpaid missmu Must-fix.
- JS / map: `mhitu.js` `missmu`; comment `display.js` `pline_mon`; `c-js-map/turns.md`. wildmiss C `set_msg_xy` then `pline`; mswings; AT_ENGL gulps/lunges named.
- Prior reviews this SHA claims to close: **223** named omit `missmu` still `pline` after `hitmsg` `pline_mon`.

## Intent vs deliverable

Git subject promises: “Match C mhitu.c missmu so monster-miss lines use pline_mon, instead of a bare pline that leaves a11y.msg_loc at 0,0.”

C `missmu` (`mhitu.c:83–99`): clear `hitmsg_mid`/`hitmsg_prev`; `!canspotmon` → `map_invisible`; seduce pretend **or** `"just "` miss when `nearmiss && flags.verbose`; **both** arms `pline_mon`; then `stop_occupation`. Callee `pline.c` `pline_mon` `:137–150` `set_msg_xy(mx,my)` then `vpline`. Callers: `mattacku` melee `:814`, AT_ENGL `:854`, AT_WEAP `:915` (`tmp == j` is nearmiss). C `wildmiss` `:206` is `set_msg_xy` then `pline` (not `pline_mon`). C `mswings` `:136` is `pline_mon`. C AT_ENGL miss-you gulps/lunges `:857–860` are `pline_mon` in those else arms, not `missmu`.

Old JS: both missmu arms `pline` (D-0301 body otherwise live).

The diff **does** both arms `pline_mon`. It does **not** switch wildmiss to `set_msg_xy`+`pline`, mswings to `pline_mon`, or AT_ENGL gulps/lunges. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `missmu` both arms | C `:93–97`, **rewired** | was `pline`; now exported |
| `pline_mon` | C `pline.c:137–150`, **imported live** | D-1215 `set_msg_xy` then `pline` |
| `map_invisible` / `stop_occupation` | C `:90–91` / `:99`, **pre-existing live** | |
| `could_seduce` | C, **imported live** | D-0887; no `mspec_used` (unlike `hitmsg`) |
| melee / ENGL / WEAP callers | C `:814/:854/:915`, **pre-existing** | JS already called `missmu` |
| `wildmiss` | C `:176–` `set_msg_xy`+`pline`, **named omit** | JS still bare `pline` |
| `mswings` | C `:136` `pline_mon`, **named omit** | JS still `pline` |
| AT_ENGL gulps/lunges | C `:857–860` `pline_mon`, **named omit** | JS still `pline` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `"just "` still `nearmiss && flags.verbose`.

## C ↔ JS fidelity

Pinned C (`mhitu.c:87–99`):

```
    gh.hitmsg_mid = 0;
    gh.hitmsg_prev = NULL;
    if (!canspotmon(mtmp))
        map_invisible(mtmp->mx, mtmp->my);
    if (could_seduce(mtmp, &gy.youmonst, mattk) && !mtmp->mcan)
        pline_mon(mtmp, "%s pretends to be friendly.", Monnam(mtmp));
    else
        pline_mon(mtmp, "%s %smisses!", Monnam(mtmp),
                  (nearmiss && flags.verbose) ? "just " : "");
    stop_occupation();
```

JS copies that order. Seduce does **not** require `!mspec_used` (C `hitmsg` does; `missmu` does not). Quiet `flags.verbose===false` omits `"just "` but still `pline_mon`s `"misses!"`. `pline_mon` is live D-1215 (youmonst→(0,0); monster→mx,my; then `vpline` snapshot+reset). Accessiblemsg Off still consume-resets. This is **not** “Match C dispatch, callee is a stub.”

Callers already exist: JS melee `else await missmu(mtmp, tmp === j, mattk)` (`:1586`); AT_ENGL miss (`:1604`); AT_WEAP miss (`:1638`). Those three C sites now get `a11y.msg_loc` at the attacker. AT_ENGL **else** gulps/lunges still `pline` — those are not `missmu`. Match the named omit.

`wildmiss` JS still skips C `:206` `set_msg_xy` then uses `pline` (and `rn2(3)` on unseen). Wrapping it as `pline_mon` would be the C-wrong D-1286 exists to avoid: C wildmiss is explicitly `set_msg_xy` + `pline`. Named later arm.

## Hallucinations / overclaim

Subject + D-1286 say miss lines use `pline_mon` so `a11y.msg_loc` is not 0,0. **Both `missmu` arms are the hunk.** Stamping **Addressed:** D-1286 is fair. Do **not** stamp “Match C wildmiss `set_msg_xy`.” Do **not** stamp “Match C `mswings` `pline_mon`.” Do **not** stamp “Match C AT_ENGL gulps/lunges `pline_mon`.” Do not wrap `msg_mon_movement` as `pline_mon`.

## Density

One C function’s remaining two `pline` calls. ~8 JS lines. Thin vs §2b 50–300, but it is the **whole remaining `missmu`**, the named Open item, not an unrelated one-line peel. Did not glue stairs `u_on_sstairs`. Acceptable fortress density.

## Branch-by-branch confirm

1. Ordinary miss, `accessiblemsg` Off: `pline_mon` consume-reset, `"The jackal misses!"`. Match.
2. Same, On: prefix from mx,my. Match `pline_mon`.
3. `nearmiss && verbose`: `"just misses!"`. Match `:96–97`.
4. Quiet: `"misses!"` without just. Match.
5. Seduce, `!mcan`: pretends to be friendly via `pline_mon`. Match `:93–94`.
6. Seduce cancelled `mcan`: falls through to miss. Match.
7. Unseen: `map_invisible` then `pline_mon`. Match `:90–91`.
8. AT_WEAP miss after `mswings`: miss line is `pline_mon`; swing line still `pline`. Named mswings.
9. AT_ENGL miss-you: `missmu` `pline_mon`; gulps/lunges still `pline`. Named.
10. wildmiss displacement: still `pline` without `set_msg_xy`. Named. Public-unhit unless `accessiblemsg` On on a miss line.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Did not wrap wildmiss as `pline_mon` (that would contradict C `:206`).

## Verification

Journal: private canary **16**/16 (C both arms; JS `pline_mon`; prefix On; Off no prefix; `"just "` verbose; quiet omits just; seduce pretend; cancelled falls through; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` On on a miss line. Cadence this audit: full `sessions` at HEAD `9486280d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85).

## Actionable C-wrongs

None for Must-fix. Both miss arms call live `pline_mon`; seduce/`just` guards match C; callers already wired.

Named omits (map, not Must-fix):

1. wildmiss `set_msg_xy` then `pline` (Open `mhitu.c` `wildmiss` `set_msg_xy` — not `pline_mon`)
   **Addressed:** D-1291 `c6fa1420`
2. mswings `pline_mon`
   **Addressed:** D-1305 `b82b15a8`
3. `mattacku` AT_ENGL gulps/lunges `pline_mon`
4. `mattacku` AT_TENT / `explmu` / AT_HUGS (pre-existing from D-1261)

Do not Must-fix “export `missmu`.” Do not Must-fix “wildmiss still `pline`.” Do not pull `u_on_sstairs` this SHA.

## Callers / RNG ledger

C: `mattacku` melee / ENGL / WEAP. JS: same three. No RNG in `missmu`. Public fortress default Off is not evidence an accessiblemsg prefix appeared on a miss.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `missmu` seduce and `"just "` miss now use live `pline_mon`; wildmiss stays `set_msg_xy`+`pline` in C and named in JS.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1286 `9486280d`.
