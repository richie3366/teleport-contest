# Review 267 — b82b15a8 — mhitu.c mswings pline_mon (D-1305)

## Metadata
- Full / short hash: `b82b15a8476586acbcc26d000fec095dc627ebf6` / `b82b15a8`
- Parent: `909ef3dc` (D-1304). This file audits **this SHA only**. Archive row **Addressed:** D-1305 `b82b15a8` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 20:25:17 +0200
- D-id: **D-1305**
- Stats: 13 files, +205 / −142 — `js/mhitu.js` +26 / −~12; `js/display.js` comment; journal rotate.
- Claims to close: Open `mhitu.c` mswings `pline_mon` (named from D-1291 / reviews **248** / **253**). Not wildmiss. `reviews/loop-2026-08-15/` has no unpaid mswings Must-fix.
- JS / map: `mhitu.js` `mswings`; comment `display.js` `pline_mon`; `c-js-map/turns.md`. AT_ENGL gulps/lunges / AT_TENT / Snickersnee bash named.
- Prior reviews this SHA claims to close: **248** named `mswings` still `pline`; **253** named it again after wildmiss `set_msg_xy` then `pline` (explicitly not a `pline_mon` wrap).

## Intent vs deliverable

Git subject promises: “Match C mhitu.c mswings so a verbose visible weapon swing uses pline_mon, instead of a bare pline that leaves a11y.msg_loc at 0,0.”

C `mswings` (`mhitu.c:128–141`): `if (flags.verbose && !Blind && mon_visible(mtmp))` then `pline_mon(mtmp, "%s %s %s%s %s.", Monnam, mswings_verb, quan>1 ? "one of " : "", mhis, xname)`. Callee `pline.c` `pline_mon` (`:137–150`): youmonst → `(0,0)` else `(mx,my)` then `vpline`. Caller `mattacku` AT_WEAP foundyou (`:900–911`): `hitval` then `mswings` then `rnd(20+i)` hit/miss. Verb helper `mswings_verb` (`:104–126`) already live (D-0286; mixed-pierce `rn2(2)`).

Old JS: same format string via bare `pline`, so accessiblemsg could not prefix the attacker cell.

The diff **does** the one `pline` → `pline_mon(mtmp, …)` and comment updates. It does **not** wrap `wildmiss` (D-1291 `set_msg_xy` then `pline`). It does **not** add AT_ENGL gulps/lunges, AT_TENT, or `!is_art(Snickersnee)` on the caller’s bash predicate. Named. `display.js` is a caller-list comment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mswings` | C `:128–141`, **wired** | export added; body already existed |
| `pline_mon` | C `pline.c:137–150`, **imported live** | D-1215; not a stub |
| `mswings_verb` | C `:104–126`, **pre-existing** | D-0286 |
| `Monnam` / `mhis` / `xname` | C, **imported live** | format unchanged |
| `mon_visible` | C, **imported live** | gate unchanged |
| AT_WEAP caller | C `:900–911`, **pre-existing** | this SHA does not touch `hitval` |
| Snickersnee bash | C `:903–906` `!is_art`, **named omit** | JS `is_pole && m_next2u` |
| AT_ENGL gulps/lunges | C `:857–860` `pline_mon`, **named omit** | still `pline` |
| `wildmiss` | C `set_msg_xy`+`pline`, **must not wrap** | D-1291 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in this hunk. `mswings_verb`’s `rn2(2)` is pre-existing and still evaluates in the template **before** `pline_mon` (C arg order: `Monnam`, then `mswings_verb`, then `pline_mon` body `set_msg_xy`). Match clang left-to-right.

## C ↔ JS fidelity

Pinned C (`mhitu.c:135–140`):

```
    if (flags.verbose && !Blind && mon_visible(mtmp)) {
        pline_mon(mtmp, "%s %s %s%s %s.", Monnam(mtmp),
                  mswings_verb(otemp, bash),
                  (otemp->quan > 1L) ? "one of " : "",
                  mhis(mtmp), xname(otemp));
    }
```

JS gate: `verbose !== false` (C default On), `!(u.Blind \|\| u.ublind)`, `mon_visible(mtmp)`. Format: `` `${Monnam} ${verb} ` + `${quan>1 ? 'one of ' : ''}` + `${mhis} ${xname}.` ``. C `"%s %s %s%s %s."` puts a space after the verb, concatenates `"one of "` with `mhis` when quan>1, else `""`+`mhis`. JS `"The orc swings his club."` / `"The orc swings one of his daggers."` match. Period is in the last chunk.

`pline_mon` (`display.js:3910–3916`) is the real callee: `set_msg_xy(mx,my)` then `pline`. youmonst → (0,0). Attackers are never youmonst here. Accessiblemsg prefix uses that loc (D-1207). This is **not** “Match C mswings dispatch, callee is a stub.”

Do **not** stamp “Match C Snickersnee bash exemption.” Caller still `bash = is_pole && m_next2u` without `!is_art` (named since D-0286). Do **not** stamp “Match C `hitval(mon_currwep, &youmonst)`” — JS still passes `null` (pre-existing, not this hunk). Do **not** wrap `wildmiss` or `msg_mon_movement`.

## Hallucinations / overclaim

Subject + D-1305 say a verbose visible swing uses `pline_mon` so `a11y.msg_loc` is the attacker. **The one call substitution is the hunk.** Stamping **Addressed:** D-1305 is fair. Do **not** stamp “Match C AT_ENGL gulps/lunges.” Do **not** stamp “Match C AT_TENT / `explmu` / AT_HUGS.” Do **not** stamp “Match C `Some_Monnam` impossible.” Verb/quan/`mhis` were D-0286, not this SHA.

## Density

One C function whose remaining debt was the `pline_mon` wrap. ~8 executable JS lines. §2b “one deferred if” is the waste bin; here the function **is** that if. Sibling AT_ENGL gulps are a different `mattacku` case, correctly not glued. Thin but one locus. Right size for the named remainder.

## Branch-by-branch confirm

1. verbose, !Blind, `mon_visible`, club: `pline_mon`, `"swings"`. Match `:135–140` + verb.
2. spear / pierce-only: `"thrusts"`. Match `mswings_verb`.
3. mixed pierce: `rn2(2)` thrust vs swing **before** `set_msg_xy`. Match arg eval.
4. whip / wet towel: `"lashes"`. Match.
5. pole + `m_next2u`: `"bashes with"` (Snickersnee still not exempt). Named caller omit.
6. quan>1: `"one of "` + `mhis`. Match `%s%s`.
7. female: `her`. Match `mhis`.
8. quiet / Blind / `minvis` / `mundetected`: silent. Match the gate.
9. accessiblemsg On: prefix from `(mx,my)`. Match `pline_mon`. Off: no prefix. Match default.
10. `wildmiss` still `set_msg_xy` then `pline`. Match D-1291. **Public-unhit** unless `accessiblemsg` On on a swing line.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not wrap wildmiss. Plain ESM.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `accessiblemsg` On on a swing line. Cadence this audit: full `sessions` at HEAD `49dab44b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Gate, format, `pline_mon` callee, and RNG-before-`set_msg_xy` match C `:128–141` / `pline.c:137–150`.

Named omits (map, not Must-fix):

1. `mattacku` AT_ENGL gulps/lunges `pline_mon`
2. AT_TENT melee / `explmu` / AT_HUGS
3. `!is_art(Snickersnee)` bash exemption
4. `mswingsm`; `Some_Monnam` impossible

Do not Must-fix “export `mswings`.” Do not Must-fix pre-existing `hitval(..., null)`. Do not wrap `wildmiss` or `msg_mon_movement`. Next Open after this SHA was `eat_brains` (now D-1306).

## Callers / RNG ledger

C: `mattacku` AT_WEAP foundyou when `MON_WEP`. JS: same. This SHA adds **no** `rn2`. Public fortress default Off is not evidence an accessiblemsg prefix appeared on a swing.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: verbose visible weapon swings now call live `pline_mon` so `a11y.msg_loc` is the attacker; AT_ENGL gulps and Snickersnee stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1305 `b82b15a8` already filled by the next port commit.
