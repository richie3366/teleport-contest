# Review 295 — b82375a7 — dothrow.c throwit land snuff_candle (D-1333)

## Metadata
- Full / short hash: `b82375a791a0844e86515d85c8457d8f31353b1e` / `b82375a7`
- Parent: `e430e099` (D-1332). This file audits **this SHA only**. Archive **Addressed:** D-1333 lacked the short hash; this review commit fills `b82375a7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 03:28:47 +0200
- D-id: **D-1333**
- Stats: 11 files, +98 / −35 — `js/dothrow.js` +11; `js/apply.js` / `js/dokick.js` comments.
- Claims to close: Open `dothrow.c` throwit land `snuff_candle` (C `:1818`; named from D-1325 / review **287**). Not mthrowu. `reviews/loop-2026-08-15/` has no unpaid throwit-land-snuff Must-fix.
- JS / map: `dothrow.js` `throwit` land; callee `apply.js` `snuff_candle` (pre-existing D-1242 / D-1313 / D-1325); `c-js-map/turns.md`. mthrowu `:942` / `killer_xname` / pick-snatch still named.
- Prior reviews this SHA claims to close: **287** named throwit land after dokick extract-snuff; **275** / **277** named land as distinct from `throwit_mon_hit`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit land so a missed lit candle or candelabrum actually snuffs before place, instead of skipping snuff_candle at :1818.”

C `throwit` land (`dothrow.c:1804–1824`) after splash/flooreffects:

```
        if (flooreffects(obj, gb.bhitpos.x, gb.bhitpos.y, "fall")) {
            throwit_return(TRUE);
            return;
        }
        obj_no_longer_held(obj);
        if (mon && mon->isshk && is_pick(obj)) {
            … mpickobj(mon, obj); throwit_return(TRUE); return;
        }
        (void) snuff_candle(obj);
        if (!mon && ship_object(obj, gb.bhitpos.x, gb.bhitpos.y, FALSE)) {
            throwit_return(TRUE);
            return;
        }
        … place_object …
```

Callee `apply.c` `snuff_candle` (`:1472–1491`): `Is_candle || otyp==CANDELABRUM_OF_INVOCATION` and `lamplit` → location pline → `end_burn(otmp, TRUE)`. Lamps / POT_OIL are `snuff_lit`, **not** this function. `throwit_mon_hit` already snuffs when `mon != NULL` (D-1313); a complete miss never enters that helper. mthrowu notcaught (`mthrowu.c:942`) is a different land (snuff **before** `ship_object`/`flooreffects`).

Old JS: flooreffects then `ship_object` then `place_object` with no land snuff. Hit-path snuff already live.

The diff **does** dynamic-import `snuff_candle` between flooreffects and `ship_object`. It does **not** switch to `snuff_lit`. It does **not** port mthrowu `:942`, shk pick-snatch, or `obj_no_longer_held`. Named. `apply.js` / `dokick.js` hunks are comments only.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit` land call | C `:1818`, **wired** | after flooreffects, before ship |
| `snuff_candle` | C `apply.c:1472–1491`, **imported live** | candles / candelabrum only |
| `end_burn(..., true)` | C, **inside callee** | not this SHA |
| `snuff_lit` | C `apply.c:1497`, **not used** | correct; lamps stay lit |
| `throwit_mon_hit` snuff | C when `mon`, **pre-existing** | miss-land never hits it |
| pick-snatch `isshk && is_pick` | C `:1809–1816`, **named omit** | between flooreffects and snuff |
| `obj_no_longer_held` | C `:1808`, **named omit** | |
| `ship_object` | C `:1819` `!mon &&`, **pre-existing** | JS still always ships |
| mthrowu notcaught snuff | C `mthrowu.c:942`, **named omit** | next Open |
| `killer_xname` | C kickobjnam, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.** `snuff_candle` does not roll. After a miss, `where` is typically `OBJ_FREE` so the callee’s `!Blind` pline gate matches C (`OBJ_MINVENT ? cansee : !Blind`). Blind still snuffs (`end_burn` is not gated).

## C ↔ JS fidelity

Call order on the JS land path is splash → flooreffects (return if gone) → `snuff_candle` → `ship_object` → `place_object`. C is flooreffects → `obj_no_longer_held` → pick-snatch (may return, **no snuff**) → `snuff_candle` → `!mon && ship_object` → place. Given pick-snatch and `obj_no_longer_held` named, the snuff sits where C puts it relative to flooreffects and ship. That is the queued `:1818` site.

Callee is the same function `throwit_mon_hit` / `really_kick_object` already await: `Is_candle || CANDELABRUM`, `lamplit`, `end_burn(TRUE)`, return false otherwise. A thrown oil lamp stays lit. A thrown lit tallow / wax / candelabrum snuffs before `place_object`. Unlit candles no-op. Hit-path still snuffs inside `throwit_mon_hit` when `mon`; a second land snuff after a surviving hit is a C double-call too (`throwit_mon_hit` then `:1818` if the object was not consumed) and is a no-op once unlit.

This is **not** “Match C `snuff_lit` on throw land.” The subject’s candle/candelabrum claim is the live callee. Hallucination check for “Match C dispatch, callee is a stub” is clean.

Pre-existing `ship_object` without C’s `!mon &&` is **not** introduced here. Do not Must-fix it as this SHA’s land snuff. Snuff still runs when `hitmon` is set (C `:1818` is not gated on `!mon`). Match that part.

`apply.js` comment now lists this caller; `throwit_mon_hit` comment says land `:1818` is not that helper. Accurate. mthrowu `:942` stays named (snuff **before** flooreffects there — do not “fix” throwit by copying that order).

## Hallucinations / overclaim

Subject + D-1333 say a missed lit candle or candelabrum actually snuffs before place instead of skipping `:1818`. **The one call between flooreffects and ship_object is the hunk.** Stamping **Addressed:** D-1333 is fair. Do **not** stamp “Match C mthrowu `:942`.” Do **not** stamp “Match C `snuff_lit` / `splash_lit`.” Do **not** stamp “Match C shk pick-snatch.” Do **not** treat fortress PASS as a thrown-candle extinguish pline.

## Density

One C call site on an already-live callee. ~8 executable JS lines. Same shape as review **287** (dokick extract-snuff) and **294** (kickdmg special_dmgval). Queued Open row, not an unrelated peel. Did not glue mthrowu or `killer_xname`. Acceptable size (§2b small-but-queued).

## Branch-by-branch confirm

1. Miss-land lit candle / candelabrum: flooreffects, snuff (`end_burn`), ship, place. Match `:1804–1824` minus named pick-snatch / `obj_no_longer_held`.
2. Unlit candle: `snuff_candle` returns false; still places. Match.
3. Oil / magic lamp / lantern: callee returns false; stays lit. Match (`snuff_candle` not `snuff_lit`).
4. Dart / gold: still calls; no-op. Match C always-call.
5. Blind: snuff happens; pline skipped. Match `:1483`.
6. Hit-path `throwit_mon_hit`: still snuffs when `mon` (D-1313); miss never enters it. Match the D-log claim.
7. mthrowu `:942`. Still omitted. Named. Different order (snuff before flooreffects).
8. **Public-unhit** unless a session throws a lit candle that misses.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` is an ESM cycle (dothrow↔apply via `thitmonst`), not filesystem. Plain ESM.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on miss-land candles. Cadence this audit: full `sessions` at HEAD `b82375a7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence a candle snuffed on a miss.

## Actionable C-wrongs

None for Must-fix. Flooreffects → `snuff_candle` → ship/place matches C `:1818` given named pick-snatch. Callee is live.

Named omits (map, not Must-fix):

1. mthrowu `snuff_candle` (`mthrowu.c:942` notcaught land) — next Open
2. shk pick-snatch (`dothrow.c:1809–1816`)
3. `obj_no_longer_held` (`:1808`)
4. `killer_xname` (kickobjnam)

Do not Must-fix “use `snuff_lit` on throw land” (C does not). Do not Must-fix pre-existing `ship_object` without `!mon`. Do not Must-fix `obj_sheds_light` vision recalc.

## Callers / RNG ledger

C: throwit miss-land → `snuff_candle` at `:1818`. JS: same site. Public fortress is not evidence `end_burn` ran on a thrown candle.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a missed lit candle/candelabrum now snuffs before place; mthrowu `:942` stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1333 `b82375a7`.
