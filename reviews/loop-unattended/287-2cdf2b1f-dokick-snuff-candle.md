# Review 287 — 2cdf2b1f — dokick.c really_kick_object snuff_candle (D-1325)

## Metadata
- Full / short hash: `2cdf2b1feb533d3d17822aad8ff761196cd28044` / `2cdf2b1f`
- Parent: `1d5b0b66` (D-1324). This file audits **this SHA only**. Archive **Addressed:** D-1325 lacked the short hash; this review commit fills `2cdf2b1f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 01:14:03 +0200
- D-id: **D-1325**
- Stats: 11 files, +91 / −30 — `js/dokick.js` +9 / −2; `js/apply.js` comments; `js/dothrow.js` comment.
- Claims to close: Open `dokick.c` snuff_candle (named from D-1242 / review **275**). Not throwit_mon_hit. `reviews/loop-2026-08-15/` has no unpaid kick-snuff Must-fix.
- JS / map: `dokick.js` `really_kick_object`; `apply.js` `snuff_candle` (pre-existing); `c-js-map/turns.md`. throwit land `:1818` / mthrowu `:942` / `killer_xname` still named.
- Prior reviews this SHA claims to close: **275** named dokick `snuff_candle` after throwit_mon_hit filled the helper; **277** named it again after the throwit caller.

## Intent vs deliverable

Git subject promises: “Match C dokick.c really_kick_object so kicking a lit candle or candelabrum snuffs it before flight, instead of leaving the flame burning.”

C `really_kick_object` (`dokick.c:733–736`) after the slide pline:

```
    obj_extract_self(gk.kickedobj);
    (void) snuff_candle(gk.kickedobj);
    newsym(x, y);
    mon = bhit(u.dx, u.dy, range, KICKED_WEAPON, …, &gk.kickedobj);
```

Callee `apply.c` `snuff_candle` (`:1472–1491`): `Is_candle || otyp==CANDELABRUM_OF_INVOCATION` and `lamplit` → location pline → `end_burn(otmp, TRUE)`. Lamps / POT_OIL are `snuff_lit`, **not** this function. Caller `kick_object` `:500`. Gold/dart/lamp kicks still call `snuff_candle`; non-candles return FALSE. Throwit land (`dothrow.c:1818`) and mthrowu notcaught (`mthrowu.c:942`) are other call sites.

Old JS: `obj_extract_self` then `newsym` then `bhit`; `// snuff_candle deferred`. `snuff_candle` already live in `apply.js` (D-1242 / D-1313).

The diff **does** dynamic-import `snuff_candle` and `await` it between extract and `newsym`. It does **not** switch to `snuff_lit`. It does **not** port throwit land / mthrowu snuff. Named. `apply.js` / `dothrow.js` hunks are comments only.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `really_kick_object` call | C `:734`, **wired** | after extract, before newsym / bhit |
| `snuff_candle` | C `apply.c:1472–1491`, **imported live** | candles / candelabrum only |
| `end_burn(..., true)` | C, **inside callee** | not this SHA |
| `snuff_lit` | C `apply.c:1497`, **not used** | correct; lamps stay lit |
| `obj_extract_self` / `newsym` / `bhit(KICKED)` | C `:733–736`, **pre-existing** | order now matches |
| throwit land snuff | C `dothrow.c:1818`, **named omit** | after snatch-pick |
| mthrowu notcaught snuff | C `mthrowu.c:942`, **named omit** | |
| `killer_xname` | C kickobjnam, **named omit** | xname stand-in |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.** After extract, `where` is `OBJ_FREE` so the callee’s `!Blind` pline gate matches C (`OBJ_MINVENT ? cansee : !Blind`).

## C ↔ JS fidelity

Call order is extract → `snuff_candle` → `newsym` → `bhit(KICKED_WEAPON)`. That is C `:733–736` call-for-call. The callee is the same function `throwit_mon_hit` already awaits (D-1313), not a kick-only clone: `Is_candle || CANDELABRUM`, `lamplit`, `end_burn(TRUE)`, return false otherwise. A kicked oil lamp stays lit. A kicked lit tallow candle / candelabrum snuffs before `bhit` paints FLASH. Unlit candles no-op. Blind still snuffs (C pline gated, `end_burn` not).

This is **not** “Match C `snuff_lit` on kick.” The subject’s candle/candelabrum claim is the live callee. Hallucination check for “Match C dispatch, callee is a stub” is clean.

`apply.js` comment now lists this caller; `throwit_mon_hit` comment says dokick snuff is not that helper. Accurate.

## Hallucinations / overclaim

Subject + D-1325 say kicking a lit candle or candelabrum snuffs it before flight instead of leaving the flame burning. **The one call between extract and newsym is the hunk.** Stamping **Addressed:** D-1325 is fair. Do **not** stamp “Match C throwit land `snuff_candle`.” Do **not** stamp “Match C mthrowu `:942`.” Do **not** stamp “Match C `snuff_lit` / `splash_lit`.” Do **not** treat fortress PASS as a kicked-candle extinguish pline.

## Density

One C call site on an already-live callee. ~6 executable JS lines. Playbook §2b flags a lone deferred `if` as small; this is the queued Open row (wire the named call), not an unrelated peel. Did not glue `killer_xname` or throwit land. Acceptable size.

## Branch-by-branch confirm

1. Lit candle / candelabrum: extract, snuff (`end_burn`), newsym, `bhit`. Match `:733–736` + `apply.c:1476–1488`.
2. Unlit candle: `snuff_candle` returns false; still flies. Match.
3. Oil / magic lamp / lantern: callee returns false; stays lit. Match (`snuff_candle` not `snuff_lit`).
4. Gold / dart: still calls; no-op. Match C always-call.
5. Blind: snuff happens; pline skipped. Match `:1483`.
6. throwit land `:1818` / mthrowu `:942`. Still omitted. Named.
7. **Public-unhit** unless a session kicks a lit candle.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` is an ESM cycle (dokick↔apply via dothrow `thitmonst`), not filesystem. Plain ESM.

## Verification

Journal: private canary **13**/13; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on kicked candles. Cadence this audit: full `sessions` at HEAD `2cdf2b1f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence a candle snuffed on a kick.

## Actionable C-wrongs

None for Must-fix. Extract → `snuff_candle` → newsym → `bhit` matches C `:733–736`. The callee is live `apply.js`, not a no-op.

Named omits (map, not Must-fix):

1. throwit land `snuff_candle` (`dothrow.c:1818`)
2. mthrowu notcaught `snuff_candle` (`mthrowu.c:942`)
3. `killer_xname` polish (kickobjnam still `xname`)
4. `apply.c` `splash_lit`

Do not Must-fix “export `snuff_candle`” (already exported). Do not Must-fix gold kicks calling it. Do not Must-fix explmu (next Open).

## Callers / RNG ledger

C: kick object → `really_kick_object` → `snuff_candle` → `bhit(KICKED_WEAPON)`. JS: same. No RNG in the new call. Public fortress is not evidence the flame pline fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a kicked lit candle or candelabrum is now snuffed after extract and before `bhit`; throwit land / mthrowu snuff stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1325 `2cdf2b1f`.
