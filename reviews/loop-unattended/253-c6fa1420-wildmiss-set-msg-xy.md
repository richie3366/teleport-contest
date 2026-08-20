# Review 253 — c6fa1420 — mhitu.c wildmiss set_msg_xy then pline (D-1291)

## Metadata
- Full / short hash: `c6fa142072b5f3569755ec6c694e0cd9309ac2bb` / `c6fa1420`
- Parent: `8392595f` (reviews **249–252**). JS parent `67c863ad` (D-1290). This file audits **this SHA only**. Archive row **Addressed:** D-1291 `c6fa1420` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 17:12:39 +0200
- D-id: **D-1291**
- Stats: 11 files, +106 / −51 — `js/mhitu.js` +36 / −~21; comment `js/display.js`. Also stamped review **248** named omit **Addressed:** D-1291 (hash filled next SHA).
- Claims to close: Open `mhitu.c` wildmiss `set_msg_xy` then `pline` (named from D-1286 / reviews **248** / **252**). Not `pline_mon`. Not missmu. `reviews/loop-2026-08-15/` has no unpaid wildmiss Must-fix.
- JS / map: `mhitu.js` `wildmiss`; comment `display.js` `set_msg_xy` / `pline_mon`; `c-js-map/turns.md`. Some_Monnam impossible; mswings; AT_ENGL gulps/lunges named.
- Prior reviews this SHA claims to close: **248** / **252** named omit JS still bare `pline`; **252** forbade wrapping as `pline_mon` because C `:206` is `set_msg_xy` then `pline`.

## Intent vs deliverable

Git subject promises: “Match C mhitu.c wildmiss so a miss at the wrong spot sets a11y.msg_loc via set_msg_xy then pline, instead of a bare pline that leaves it at 0,0.”

C `wildmiss` (`mhitu.c:176–261`): compute `unotseen` / `unotthere` / `usubmerged`; if none, `impossible` + `Some_Monnam` then return; `!flags.verbose` return; `!cansee(mx,my)` return; seduce `compat`; `Monnam`; **then** `set_msg_xy(mx,my)` `:206`; unseen verb ternary `:208–213` (`AT_BITE` snaps / `AT_KICK` kicks / `AT_STNG|AT_BUTT|nolimbs` lunges / else swings) then `pline` arms; else Displaced `pline`; else Underwater `pline`. Callee `pline.c` `set_msg_xy` `:93–97` + `pline` `:103–110` → `vpline` consumes loc. Callers: `mattacku` melee `:816`, AT_WEAP `:920` (`!foundyou`). C `missmu` is already `pline_mon` (D-1286). C `mswings` `:136` is `pline_mon`. C AT_ENGL miss-you `:857–860` are `pline_mon` in those else arms.

Old JS: Displaced/Invis/Underwater arms live (D-0816) but no `set_msg_xy`; nolimbs used `"swings"` fallback. Review **252** told the next port to ship this, not a `pline_mon` wrap.

The diff **does** one `set_msg_xy(mtmp.mx, mtmp.my)` after `Monnam` then the existing `pline` arms, plus `nolimbs` → `"lunges"`. It does **not** call `pline_mon`. It does **not** port `Some_Monnam` `impossible`, `mswings`, or AT_ENGL gulps/lunges. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_msg_xy` before arms | C `:206`, **wired** | after verbose/cansee returns |
| `pline` arms | C `:215–256`, **pre-existing** | not `pline_mon` |
| `nolimbs` lunges | C `:210–213`, **wired** | imported live `monsters.js` |
| `set_msg_xy` | C `pline.c:93–97`, **imported live** | D-1207 consume in `vpline` |
| melee / WEAP callers | C `:816/:920`, **pre-existing** | JS `:1594/:1647` |
| `Some_Monnam` impossible | C `:186–190`, **named omit** | still silent return |
| `mswings` | C `:136` `pline_mon`, **named omit** | JS still `pline` |
| AT_ENGL gulps/lunges | C `:857–860`, **named omit** | JS still `pline` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (`rn2(3)` on unseen was already live). Exporting `wildmiss` is visibility only.

## C ↔ JS fidelity

Pinned C (`mhitu.c:195–213`):

```
    if (!flags.verbose)
        return;
    if (!cansee(mtmp->mx, mtmp->my))
        return;
    compat = ((mattk->adtyp == AD_SEDU || mattk->adtyp == AD_SSEX)
              ? could_seduce(mtmp, &gy.youmonst, mattk) : 0);
    Monst_name = Monnam(mtmp);

    set_msg_xy(mtmp->mx, mtmp->my);
    if (unotseen) {
        const char *swings = (mattk->aatyp == AT_BITE) ? "snaps"
                             : (mattk->aatyp == AT_KICK) ? "kicks"
                               : (mattk->aatyp == AT_STNG
                                  || mattk->aatyp == AT_BUTT
                                  || nolimbs(mtmp->data)) ? "lunges"
                                 : "swings";
```

JS copies that order: `verbose === false` / `!cansee` return **before** `set_msg_xy`, so a quiet or off-screen miss does not stamp loc. `compat` / `Monnam` then one `set_msg_xy` then the three arms. `nolimbs` is in the same ternary as STNG/BUTT. `nolimbs` is the live `mflags1 & M1_NOLIMBS` helper, not a fog-cloud hardcode.

This is **not** “Match C dispatch, callee is a stub.” `set_msg_xy` writes `a11y.msg_loc`; `pline` → `vpline_consume_msg_loc` (D-1207). Wrapping as `pline_mon` would have been the C-wrong **252** forbade: C wildmiss is explicitly `set_msg_xy` + `pline`, not `pline_mon`.

`IS_WATERWALL(typ)` on `mux,muy` for `"empty water"` is pre-existing analog of `is_waterwall`; this SHA did not retouch that arm except the shared loc stamp.

## Hallucinations / overclaim

Subject + D-1291 say a miss at the wrong spot sets `a11y.msg_loc` via `set_msg_xy` then `pline`. **The one call + nolimbs are the hunk.** Stamping **Addressed:** D-1291 is fair. Do **not** stamp “Match C `Some_Monnam` impossible.” Do **not** stamp “Match C `mswings` `pline_mon`.” Do **not** stamp “Match C AT_ENGL gulps/lunges.” Do **not** stamp “Match C AT_TENT melee wildmiss” (JS melee cases still omit `AT_TENT`). Did **not** wrap as `pline_mon`.

## Density

Remaining wildmiss a11y envelope named from D-1286, plus the sibling `nolimbs` verb in the same ternary. ~20 JS lines. Did not glue mswings. Right size.

## Branch-by-branch confirm

1. Displaced, verbose, cansee: `set_msg_xy(mx,my)` then strikes/smiles `pline`. Match `:236–247`.
2. `accessiblemsg` Off: loc still set then consumed; no `coord_desc` prefix. Match D-1207 default Off.
3. Invis + perceives + Displaced: `"invisible "` on the displaced line. Match comment at `:244–247`.
4. `verbose === false` / `!cansee`: no loc stamp, no line. Match `:195–199`.
5. Unseen bite: `"snaps wildly"`. Fog/`nolimbs`: `"lunges"`. Kick: `"kicks"`. Else `"swings"`. Match `:208–213`.
6. Underwater: water-reflection / reach-towards. Match `:249–256`.
7. No reason bits: still silent (Some_Monnam named). Match skip of `:186–190`.
8. Melee / AT_WEAP `!foundyou` still call `wildmiss`. Match `:816/:920`.
9. AT_ENGL gulps/lunges and `mswings` still `pline`. Named. Public-unhit unless `accessiblemsg` On on a wildmiss line.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Did not wrap wildmiss as `pline_mon`.

## Verification

Journal: private canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` On on a wildmiss line. Cadence this audit: full `sessions` at HEAD `c37bd683` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Loc stamp after early returns, `pline` not `pline_mon`, and `nolimbs` verb match C `:195–256`.

Named omits (map, not Must-fix):

1. `Some_Monnam` `impossible` when no reason bits
2. `mswings` `pline_mon`
   **Addressed:** D-1305
3. `mattacku` AT_ENGL gulps/lunges `pline_mon`
4. `mattacku` AT_TENT melee `wildmiss` (JS switch still omits `AT_TENT`)

Do not Must-fix “export `wildmiss`.” Do not Must-fix “`IS_WATERWALL` analog.” Do not wrap this as `pline_mon`. Do not pull throwit slip this SHA.

## Callers / RNG ledger

C: `mattacku` melee / AT_WEAP `!foundyou`. JS same. Unseen `rn2(3)` was already live; this SHA adds no positional RNG. Public fortress is not evidence `accessiblemsg` prefixed a displaced miss.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wildmiss now stamps `a11y.msg_loc` then `pline` like C `:206`, including `nolimbs` lunges; it was not wrapped as `pline_mon`.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1291 `c6fa1420`.
