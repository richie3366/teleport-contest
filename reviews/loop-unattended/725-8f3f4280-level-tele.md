# Review 725 — 8f3f4280 — teleport.c level_tele heaven u_left_shop / escape (D-1764)

## Metadata
- Full / short hash: `8f3f4280241a3f589a3c77f5a9eecb2175c5f59e` / `8f3f4280`
- Parent: `70493bec` (D-1763). This file audits **this SHA only** (seventh of nine `js/` commits since review **718**). Archive **Addressed:** D-1764 `8f3f4280`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 05:32:45 +0200
- D-id: **D-1764**
- Stats: `js/teleport.js` +87/−; `js/do.js` +14/−2; `js/end.js` +2/−1. Total `js/` insertions **89** <250. Band **150–350**.
- Claims to close: Open heaven `u_left_shop` after D-1763 / review **694** (named `teleport.c:1329`). Not `lev_by_name`. `reviews/loop-2026-08-15/` has no unpaid heaven Must-fix.
- JS / map: `teleport.js` `level_tele`; `do.js` `goto_level`; `end.js` disclose const. `c-js-map`.
- Prior: **694** named heaven `u_left_shop(u.ushops0, TRUE)`.

## Intent vs deliverable

Git subject promises: `teleport.c` `level_tele` so heaven `u_left_shop` then Cloud 9 / fly-or-plummet / `done(DIED)` / escape dlevel 0 and `goto_level` `done(ESCAPED)` instead of shudder-stub after D-1763.

`node scripts/csym.mjs level_tele` → `teleport.c:1164–1441`. `--callers level_tele`: artifact LEV_TELE; `read.c:2022`; `teleport.c:1559`; `wizcmds.c:402`. Heaven envelope `:1321–1385`. Buried ball `:1301–1302`. `u_left_shop` caller `:1329`. `goto_level` `do.c:1517–1519`. `ledger_no` `dungeon.c:1374–1379`. `Flying` `youprop.h:253–255`. `Levitation` `:240`. `uhis` `you.h:316`. `buried_ball_to_punishment` `dig.c:1934–1955`. `debug_fuzzer` `:1323–1324`.

```1325:1384:nethack-c/upstream/src/teleport.c
    if (newlev < 0 && !force_dest) {
        if (*u.ushops0) {
            gi.in_mklev = TRUE;
            u_left_shop(u.ushops0, TRUE);
            *u.ushops0 = *u.ushops = '\0';
            gi.in_mklev = FALSE;
        }
        if (newlev <= -10) { /* heaven */ ... }
        else if (newlev == -9) { /* Cloud 9 */ display_nhwindow(WIN_MESSAGE, FALSE); }
        else You("are now high above the clouds...");
        if (svk.killer.name[0]) ;
        else if (Levitation) escape_by_flying = "float gently...";
        else if (Flying) escape_by_flying = "fly down...";
        else { plummet; killer fell to uhis() death; }
    }
    if (svk.killer.name[0]) { u.uz heaven/surface; done(DIED); escape surface; }
    if (escape_by_flying) { You("%s."); newlevel = {0,0}; }
```

Parent: `newlev < 0` shudder-return; `goto_level` silent `ledger<=0`; no buried-ball in `level_tele`. The diff **does** the heaven envelope, `u_left_shop` under `in_mklev`, Cloud 9 `flush_topl_more`, fly/lev/plummet, `done(DIED)` then survive surface, `schedule_goto` `{0,0}`, `goto_level` after tutorial `done(ESCAPED)`, buried ball before `next_to_u`. It **does not** port `lev_by_name` / Nowhere yn / Quest·mines·sanctum clamp / invoked gate / `debug_fuzzer` retry. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `level_tele` heaven `:1321–1385` | LIVE repaired | replaces shudder stub |
| `u_left_shop` | LIVE import | shk.js; D-1733 body |
| `buried_ball_to_punishment` | LIVE import | dig.js |
| `goto_level` ledger `:1517–1519` | LIVE repaired | `done(ESCAPED)` after tutorial |
| `done` | LIVE import | end.js; hoisted SAFE |
| `Flying` / `Levitation` | CLONE local | teleport.js youprop |
| `uhis` | LIVE import | roles.js |
| `SetVoice` / `voice_deity` | LIVE | contest empty |
| `flush_topl_more` | LIVE | Cloud 9 ≡ `display_nhwindow(WIN_MESSAGE,FALSE)` |
| `lev_by_name` / Nowhere / clamps | OMIT named | |
| `debug_fuzzer` | OMIT named | |

`node scripts/sym.mjs`:

```
level_tele       js/teleport.js:2197   ASYNC
u_left_shop      js/shk.js:287   ASYNC
buried_ball_to_punishment js/dig.js:516   ASYNC
goto_level       js/do.js:1386   ASYNC
done             js/end.js:1295   ASYNC
Flying           NOT EXPORTED — 8 LOCAL  teleport.js:236  => Do NOT write #9
Levitation       NOT EXPORTED — 9 LOCAL  teleport.js:224  => Do NOT write #10
uhis             js/roles.js:647   sync
flush_topl_more  js/display.js:5409   ASYNC
```

`--can teleport.js shk.js u_left_shop` / `do.js end.js done`: **SAFE** (hoisted). Dynamic import avoids TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Buried ball (`:1301–1302`).** Before `next_to_u`. JS the same. LIVE. **Match.**

**Heaven gate (`:1325`).** `newlev < 0 && !force_dest`. `debug_fuzzer` retry named. **Match the shipped gate.**

**`u_left_shop` (`:1326–1333`).** `*ushops0` → `in_mklev` TRUE, `u_left_shop(ushops0, TRUE)`, clear shops, `in_mklev` FALSE. JS `(u.ushops0||'')[0]` then the same. LIVE callee (D-1733). **Match.**

**Dest messages (`:1334–1345`).** `<= -10` heaven + SetVoice + verbalize + killer “went to heaven prematurely”; `== -9` Cloud 9 + `display_nhwindow(WIN_MESSAGE,FALSE)`; else clouds. JS `flush_topl_more` for the window wait. **Match.**

**Fly vs plummet (`:1347–1360`).** Killer pending skip; else Levitation float; else Flying fly; else plummet + `uhis()` death. JS locals match `youprop.h` (Flying includes steed `is_flyer`). LIVE `uhis`. **Match.**

**`done(DIED)` (`:1363–1375`).** Save `u.uz`; set main dungeon heaven `-10` or surface `0`; `done(DIED)`; life-save → surface string; restore `u.uz`. JS `gameover` return (C noreturn on real death). **Match the survive arm.**

**Escape (`:1378–1384`).** `You("%s.")`; `newlevel={0,0}` then `schedule_goto`. JS the same then existing `schedule_goto`. `force_dest` skips find_hell (C empty arm). **Match.**

**`goto_level` (`:1517–1519`).** After tutorial; `ledger_no<=0` → `done(ESCAPED)`. Parent returned before tutorial. JS now after tutorial; dynamic `done`. `DISCLOSE_PROMPT_DEFAULT_NO` so disclose char missing does not throw — JS glue for the live ESCAPED arm, not a C rewrite. **Match C order.**

**RNG.** Heaven envelope burns none (`u_left_shop` unpaid may). seed0006 still **PASS** at this SHA. **Match.**

**Callee closure.** LIVE: `u_left_shop`, `buried_ball_to_punishment`, `done`, `schedule_goto`, `SetVoice`, `verbalize`, `uhis`, `flush_topl_more`. CLONE verified: Flying/Levitation. OMIT named: `lev_by_name`; Nowhere; clamps; `debug_fuzzer`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “heaven `u_left_shop` then Cloud 9/fly/plummet/`done(DIED)`/dlevel 0 and `goto_level` ESCAPED”: **true**. Do **not** stamp “Match C `lev_by_name` / Nowhere yn / branch clamp.” Do **not** stamp “Match C `debug_fuzzer`.” Journal “fortress held” is not a public heaven screen; cohort included seed0373 `^V`. Admit heaven **public-unhit**. Cadence FAILs start at D-1765, not here.

## Density

§2b: one C envelope (`level_tele` heaven) + the `goto_level` ESCAPED callee it needs. +89. Did **not** glue `lev_by_name`. `u_left_shop` body is D-1733.

## Verification

D-log: save-oracle skip (untagged `teleport.c:level_tele`); node canary (ushops0 Cloud 9 Levitation; Flying `-3`; wizard `-10` survive; `goto_level` dlevel 0 → ESCAPED); green+strict seed8000/0900; CURRENT cohort **7**/7 + seed0373 + strict. Rule #2 clean. Heaven **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (heaven envelope and ESCAPED ledger match C; remaining named). Named: `lev_by_name`; Nowhere yn; Quest·mines·sanctum clamp; invoked gate; `debug_fuzzer`. Do **not** restore shudder-stub. Do **not** `goto_level` silent-return on ledger 0. Do **not** add Flying #9. Do **not** re-port D-1733 `u_left_shop`.

Verdict: **ACCEPT-WITH-DEBT**
