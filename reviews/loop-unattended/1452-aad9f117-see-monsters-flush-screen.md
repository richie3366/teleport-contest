# Review 1452 — aad9f117 — see_monsters + flush_screen whole-body ports (D-2493)

Metadata: SHA `aad9f117`, `js/display.js` +38/−11 only. C `display.c:1486–1529` (`see_monsters`) + `:2207–2267` (`flush_screen`). D-log: D-2493.

## Intent vs deliverable

Promise: remove two invented JS guards C lacks; add three missing C arms (`_suppress_map_output`, reentrancy guard, HANGUP). Diff delivers exactly that, with C order preserved. Promise = deliverable.

## Inventory

- Changed: two guard deletions in `see_monsters`; `suppress_map_output()` head, `_flushing` module-level guard + set, `done_hup` early return, try/finally in `flush_screen`.
- `sym.mjs` (required): no added/removed/re-pointed symbols (pure logic edits; `suppress_map_output` pre-existing live at display.js:4748, same-module). Nothing to paste beyond that.

## C ↔ JS fidelity

`see_monsters` ≡ C `:1486–1529`:

```c
for (mon = fmon; mon; mon = mon->nmon) {
    if (DEADMONSTER(mon))
        continue;
    if ((mon->mstate & MON_STILL_ARRIVING) != 0)
        continue;
    newsym(mon->mx, mon->my);
    ...
}
/* when mounted, hero's location gets caught by monster loop */
if (!u.usteed)
    newsym(u.ux, u.uy);
```

No position guard, no ux guard — the two deleted JS guards were inventions. Defer/meverseen prologue verified present in JS (pre-existing, lines above the hunk: `if (game.defer_see_monsters) return`, steed/ustuck `meverseen = 1`). Deleted `!mon.mx` restores both `newsym` AND the Sting warn-count for mx-less monsters exactly as C's unguarded loop does; deleted `&& u?.ux` restores the unconditional unmounted newsym (`:1527–1528`).

`flush_screen` ≡ C `:2207–2238`:

```c
static int flushing = 0;
...
if (_suppress_map_output())
    return;
if (cursor_on_u == -1)
    delay_flushing = !delay_flushing;
if (delay_flushing)
    return;
if (flushing)
    return; /* if already flushing then return */
flushing = 1;
#ifdef HANGUPHANDLING
if (program_state.done_hup)
    return;
#endif
```

Current JS order (read in full): suppress → menu-overlay (pre-existing adaptation) → -1 toggle → delay-check → flushing-check → set → `done_hup` → try{bot/timebot; stale-map; build}finally{clear} — the C arms keep their relative order. `flushing` as module-level `let` ≡ C `static int`; set synchronously before the first await so reentry during `await bot()` returns early like C; `done_hup` returns with the guard held exactly as C does (`HANGUPHANDLING` verified live at `global.h:278` for UNIX — the `#ifdef` is on in the pinned configuration). try/finally clears on success paths — C has no exceptions, identical observable state. The stale-map return sits inside the try so the guard clears; the topline-only return sits before the guard set (pre-existing). Reentrancy can actually trigger: live `flush_screen(-1)` callers exist in do.js:1768/1944 (goto_level postpone/un-postpone), and the pline path calls back into flush_screen — the synchronous set is what makes the C early-return semantics hold across the JS await.

Callee closure: all LIVE/same-module; named omits (`defer_see_monsters` restore setter — flag never set in JS so the check is behaviorally identical today; Helmet_off/xkilled/timeout/potion/uhitm-call-site residuals) carry file:line cites.

## Hallucinations / overclaim

None. "Invented guards removed" verified against C (neither guard exists at `:1505–1518` / `:1527–1528`); "no new imports" true.

## Density

Small whole-row pair, one file — appropriate (both C bodies are short; the coverage rows asked for exactly these arms).

## Verification

Both functions re-run here (`--base aad9f117~1 --reach-all`):

```text
verify see_monsters: baseline aad9f117~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke see_monsters: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify flush_screen: baseline aad9f117~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke flush_screen: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated) — matches the D-log's PASS ×2 claim. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. No RNG in either arm. Guard-deletion safety: `newsym` no-ops off-map via `level.at` (pre-existing guard, unchanged), so removing `!mon.mx` cannot throw on mx-less monsters — it only restores C's warn-count and paint behavior.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
