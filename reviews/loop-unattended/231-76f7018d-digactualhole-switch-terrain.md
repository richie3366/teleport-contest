# Review 231 — 76f7018d — dig.c digactualhole switch_terrain (D-1269)

## Metadata
- Full / short hash: `76f7018d64a89eb5765f15c52f771362de175a43` / `76f7018d`
- Parent: `26fb4aa0` (D-1268). This file audits **this SHA only**. Archive row **Addressed:** D-1269 `76f7018d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 10:54:09 +0200
- D-id: **D-1269**
- Stats: 12 files, +135 / −61 — `js/dig.js` +16 / −8; comments `js/hack.js` / `js/pickup.js`.
- Claims to close: Open `dig.c` `digactualhole` `switch_terrain` (named from D-1129 / reviews **221**/**230**). Not dissolve_bars. `reviews/loop-2026-08-15/` has no unpaid digactualhole Must-fix.
- JS / map: `dig.js` `digactualhole`; live `switch_terrain`; `c-js-map/turns.md` + `debt.md`. `maketrap` PIT/HOLE `set_levltyp` / dothrow hurtle / `u_on_rndspot` / objnam wish named.
- Prior reviews this SHA claims to close: **221** named omit `digactualhole` after `dissolve_bars`.

## Intent vs deliverable

Git subject promises: “Match C dig.c digactualhole so creating a PIT or HOLE runs switch_terrain then re-reads Lev/Fly, instead of leaving FROMOUTSIDE stale so the hero falls while C would float.”

C `digactualhole` (`dig.c:651` `wont_fall = Levitation || Flying`; PIT `:729–735` after `wake_nearby` **unconditional** `switch_terrain` then `if (Levitation || Flying) wont_fall = TRUE`; HOLE `:754–759` **only `at_u`** then the same re-read). Macros are `youprop.h` `(H\|\|E)&&!B`. C `maketrap` PIT/HOLE already `set_levltyp` STONE/SCORR→CORR (`trap.c:553–554`) so encased-rock unblock sees non-`blocklev` before this call.

Old JS: `// switch_terrain deferred` then sticky `u.Levitation || u.Flying`.

The diff **does** await live `switch_terrain` at both C sites and re-read local `Levitation()`/`Flying()`. It does **not** port `maketrap` `set_levltyp`. Named: STONE stay `blocklev` until that morph.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| PIT `switch_terrain` | C `:731–735`, **wired** | after `wake_nearby`, not `at_u` |
| HOLE `switch_terrain` | C `:754–759`, **wired** | `at_u` only |
| Lev/Fly re-read | C youprop, **local clone** | `dig.js` helpers |
| `switch_terrain` | C `hack.c:3178`, **imported live** | |
| initial `wont_fall` | C `:651`, **wired** | was sticky `u.*` |
| `maketrap` `set_levltyp` | C `trap.c:546–558`, **named omit** | |
| `buried_ball_to_punishment` | C `:655–656`, **named omit** | |
| dothrow hurtle / `u_on_rndspot` / wish | **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in the two awaits. PIT `set_utrap(rn1(4,2))` is pre-existing on `!wont_fall`.

## C ↔ JS fidelity

Pinned C PIT (`dig.c:729–735`) and HOLE (`:754–759`):

```
        if (madeby_u)
            wake_nearby(FALSE);
        switch_terrain();
        if (Levitation || Flying)
            wont_fall = TRUE;
        if (at_u) { ... }

    } else { /* HOLE */
        if (at_u) {
            switch_terrain();
            if (Levitation || Flying)
                wont_fall = TRUE;
```

JS: PIT after `wake_nearby` awaits then `if (Levitation() || Flying()) wont_fall = true` even for an adjacent pit. HOLE awaits only inside `atHero`. Match call sites. This is **not** “Match C dispatch, callee is a stub”: leftover `FROMOUTSIDE` on already-CORR/ROOM clears, then the re-read can set `wont_fall`.

`Levitation()` / `Flying()` in `dig.js`:

```
    if (u.Levitation) return true;
    return !!(((u.HLevitation | 0) || (u.ELevitation | 0))
        && !(u.BLevitation | 0));
```

C has **no** sticky `u.Levitation` field; the macro is only `(H\|\|E)&&!B`. D-log says “youprop helpers (H\|\|E)&&!B.” The second line is that. The first line is the D-1070 extra-true short-circuit (`hack.js` `Levitation_st` does **not** do this). Extra-true cannot cause the claimed “falls while C floats” after B is cleared; it can float while C would fall if sticky stayed true while B was set. Grep shows scored JS never assigns `u.Levitation =`, so the short-circuit is idle unless some overlay sets the flag. Not a Must-fix clone that skips the B test on the leftover-FROMOUTSIDE path. Do not stamp it as a full youprop port.

`maketrap`: JS `trap.js` `maketrap` still does not `set_levltyp` STONE/SCORR→CORR / wall→DOOR. C comment on `switch_terrain` here is “digging down while encased in solid rock which is blocking levitation.” Without the morph, JS `switch_terrain` still sees `IS_OBSTRUCTED` and **sets** `FROMOUTSIDE` (STONE stay `blocklev`). Named. The leftover-bits path on ROOM/CORR pits is what this SHA actually unblocks.

## Hallucinations / overclaim

Subject + D-1269 say PIT/HOLE runs `switch_terrain` then re-reads Lev/Fly instead of falling while C floats. **The two awaits + re-read are the hunk** for leftover bits on non-`blocklev` terrain. Stamping **Addressed:** D-1269 is fair for those sites. Do **not** stamp “Match C `maketrap` PIT/HOLE `set_levltyp`” or “Match C encased-in-STONE unblock.” Do not stamp “Match C dothrow `hurtle_step` / `u_on_rndspot`.” Do not claim the `dig.js` helpers are identical to `Levitation_st`.

## Density

One C function’s two `switch_terrain` sites plus the re-read C puts next to them. ~15 JS lines. Right size. Did not glue hero `test_move` bars.

## Branch-by-branch confirm

1. PIT after `wake_nearby`, not `at_u`: still `switch_terrain`. Match.
2. PIT `at_u`, leftover B, dest already CORR/ROOM: clear B, re-read floats, skip `set_utrap`. Match the claimed leftover.
3. PIT `at_u`, not Lev/Fly: `wont_fall` false, `rn1` trap. Match.
4. HOLE `at_u`: await + re-read before leash/`goto_level`. Match.
5. HOLE not `at_u`: no `switch_terrain`. Match.
6. Initial `wont_fall` uses the helpers, not sticky `u.*` only. Match intent.
7. STONE cell, no `set_levltyp`: still `blocklev`. Named skip. Match the omit.
8. `buried_ball` / hurtle / `u_on_rndspot` / wish: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Hero `u_at(x,y)` is C’s pit coords, not a recorded screen cell. Plain ESM.

## Verification

Journal: private canary **16**/16 (C PIT after wake / HOLE `at_u` only; JS await + helper re-read; leftover BLev/BFly clear; HLev `float_up` + no `set_utrap`; PIT adjacent still runs; HOLE not-at_u skip; STONE stays `blocklev`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session digs a pit/hole with leftover Lev/Fly `FROMOUTSIDE`. Cadence this audit: full `sessions` at HEAD `a4aa34d3` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `switch_terrain`. STONE-stay-blocklev is the named `maketrap` omit, not a comment that skips the await. Idle sticky short-circuit is not the leftover-FROMOUTSIDE miss.

Named omits (map, not Must-fix):

1. `trap.c` `maketrap` PIT/HOLE `set_levltyp` (STONE/SCORR→CORR; wall/SDOOR→ROOM/CORR/DOOR)
2. dothrow `hurtle_step`; `dungeon.c` `u_on_rndspot`; objnam wish
3. `buried_ball_to_punishment`; `dig.js` sticky `u.Levitation` OR vs `Levitation_st`

Do not Must-fix “JS `madeby_u` compares `youmonst` not `BY_YOU`.” Do not pull hero `test_move` this SHA.

## Callers / RNG ledger

C: wand-break / occupation `dighole` / monster dig. JS those. RNG only pre-existing PIT `rn1` when still falling. Public fortress is not evidence a levitating hero dug a pit.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: PIT (unconditional) and HOLE (`at_u`) now await `switch_terrain` and re-read Lev/Fly; `maketrap` STONE morph stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1269 `76f7018d`.
