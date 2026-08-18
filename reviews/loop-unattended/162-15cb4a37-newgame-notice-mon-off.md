# Review 162 — 15cb4a37 — allmain.c `newgame` `notice_mon_off` (D-1200)

## Metadata
- Full / short hash: `15cb4a37788fad40fe39ca892149e6773bc96392` / `15cb4a37`
- Parent: `4dc76022` (D-1199). This file audits **this SHA only**. Archive row **Addressed:** D-1200 lacked the short hash; this review commit fills `15cb4a37`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 05:13:48 +0200
- D-id: **D-1200**
- Stats: 13 files, +150 / −59 — `js/allmain.js` +19 / −1; `js/do.js` / `js/hack.js` / `js/teleport.js` comments only.
- Claims to close: Open queue `allmain.c` `newgame` `notice_mon_off` (named from D-1142 / D-1192 / D-1194 / review **156**). Not wizkit. `reviews/loop-2026-08-15/` has no unpaid newgame wrap Must-fix.
- JS / map: `allmain.js` `newgame`; callees `hack.js` `notice_mon_off` / `notice_mon_on` / `notice_all_mons` (D-1142). `c-js-map/turns.md`. `dolookaround`, `reset_glyphmap(gm_newgame)`, vision.c `:856`, mapping / wizcmds / save, `init_artifacts`, `spot_monsters` wiring still named.
- Prior reviews this SHA claims to close: **156** “newgame wrap named omit”; **154** named the wrap beside wizkit FALSE.

## Intent vs deliverable

Git subject promises: “Match C allmain.c newgame so notice_mon_off wraps welcome and catch-up notice_all_mons(TRUE) runs after Hello, instead of noticing monsters during init.”

Old JS `newgame` ran `mklev` / `docrt` / wizkit / legacy / `welcome(true)` with no a11y block, then unixmain wd_message / `moveloop_preamble`. C `allmain.c:771` `notice_mon_off()` first after locals so welcome (and `docrt`’s vision recalc) do not fire `notice_all_mons` mid-init; `:844–848` `notice_mon_on()` then `dolookaround` if `glyph_updates` else `notice_all_mons(TRUE)`.

The diff **does** call existing `notice_mon_off` at `newgame` entry and `notice_mon_on` + `await notice_all_mons(true)` after `welcome(true)` when `!glyph_updates`. The `glyph_updates` then-arm is an empty named omit of `dolookaround` (no fake lookaround). It does **not** pull `reset_glyphmap`, vision.c’s caller, mapping / wizcmds / save, `init_artifacts`, or optlist `spot_monsters`. Named. Default `mon_notices` Off so public catch-up is a no-op.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `newgame` off at entry | C site, **new** | `allmain.c:771` |
| `newgame` on + catch-up after welcome | C site, **new** | `allmain.c:844–848` |
| `notice_mon_off` / `notice_mon_on` | C macros, **imported** | `flag.h:233–237`; JS D-1142 |
| `notice_all_mons(TRUE)` | C callee, **imported** | `hack.c:1744–1783`; JS D-1142 |
| `dolookaround` | C then-arm, **named omit** | empty `if (glyph_updates)` |
| `reset_glyphmap(gm_newgame)` | C sibling, **named omit** | `allmain.c:797` |
| vision.c `notice_all_mons` | C caller, **named omit** | suppressor purpose of off |
| `init_artifacts` | C `newgame` sibling, **named omit** | next Open |
| `spot_monsters` → `a11y.mon_notices` | C option, **named omit** | default Off |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. No new RNG: `notice_all_mons` does not roll; `notice_mon` plines only when the option is On.

Grep of this SHA’s `js/` hunks: no banned gates. `do.js` / `hack.js` / `teleport.js` are comment-only (“newgame wrap is D-1200”).

## C ↔ JS fidelity

### Off at entry vs `allmain.c:771`

C first statement after `int i;`:

```
    /* make sure welcome messages are given before noticing monsters */
    notice_mon_off();
```

JS (`allmain.js:558–564`): `const g = game;` then `notice_mon_off();` before `g.moves = 0` / ident / `init_objects` / `mklev` / `docrt` / wizkit / legacy / welcome. **First a11y act matches `:771`.** JS `newgame` has extra work C does not (reset_erinys, a second `docrt` after wear). Off still covers that extra window — earlier, not a skip. C `disp.botlx = TRUE` immediately after off is not this SHA.

Macros (`flag.h:233–236`): increment / decrement `a11y.mon_notices_blocked` with `impossible` + clamp at 0. JS (`hack.js:1741–1756`) same increment / decrement / clamp; diagnostic pline named. Nested off (teleds / `goto_level` D-1194) still nests. A brand-new game starts blocked at 0 then ++ to 1. Extra `notice_mon_on` while already zero clamps; C `impossible` is named.

### Catch-up vs `allmain.c:843–848`

C:

```
    welcome(TRUE);
    notice_mon_on(); /* now we can notice monsters */
    if (a11y.glyph_updates)
        (void) dolookaround();
    else
        notice_all_mons(TRUE);
    return;
```

JS (`allmain.js:685–695`): `await welcome(true);` then `notice_mon_on();` then `if (g.a11y?.glyph_updates) { /* dolookaround named */ } else { await notice_all_mons(true); }`. **Order matches the non-glyph path.** `a11y_state()` defaults `glyph_updates: false`, `mon_notices: false` — C optlist defaults. Public then-arm is dead; else-arm returns immediately in the callee because `!mon_notices`. That is C’s own early-out, not a fake catch-up.

Empty then-arm: when `glyph_updates` is On, C looks around and does **not** call `notice_all_mons`. JS does nothing extra (still `notice_mon_on`). Closer than calling catch-up in both arms. The omit is `dolookaround` itself, named. Do not invent a lookaround stub that burns display RNG.

unixmain `wd_message` / `moveloop_preamble` / tutorial stay **after** catch-up like C’s `return` then those unixmain callers. Do not hoist preamble inside the off window.

### Callee vs `hack.c:1744–1783`

Not a stub. D-1142 / review **156** already walked it: if `a11y.mon_notices && !mon_notices_blocked`, count `canspotmon`, `reset` clears `mspotted` on unspotted even when `cnt==0`, else qsort `distu` and `notice_mon`. Default Off → immediate return. **Same as D-1194’s goto_level catch-up.** Wrapping `docrt` that does not yet call `notice_all_mons` from `vision_recalc` makes **off** currently redundant as a suppressor. **On + catch-up** is still the C pair and will fire when the option is On. Honest in D-1200; not “Match C vision.c”.

JS `newgame` `docrt` (and the extra post-wear `docrt`) sit between off and on, with welcome last before on — C wants welcome (and init redraw) quiet. Off therefore covers Hello / legacy pager / bot. `goto_level` / `teleds` wraps are independent nested counters (D-1194 / D-1142).

| Case | C | JS after |
|------|---|---------|
| off first in `newgame` | `:771` | **same** |
| on after `welcome(TRUE)` | `:844` | **same** |
| `!glyph_updates` | `notice_all_mons(TRUE)` | **same call** |
| `glyph_updates` | `dolookaround` | **named empty** |
| `mon_notices` Off | callee return | **same** |
| vision_recalc notices during `docrt` | blocked by off | **no such caller** (named) |
| `init_artifacts` | `allmain.c:792` | **named omit** (next Open) |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if Tourist notice_on”. The wrap is the C sites around welcome. Rule #2: imports from `./hack.js` only. Do not add a second `vision_recalc` after `docrt` so notices have something to suppress. Frozen contracts untouched. Default Off is C’s optlist default, not a fortress cheat. Do not pull `init_artifacts` into this wrap SHA.

## Hallucinations / overclaim

D-log / CURRENT / subject say `notice_mon_off` wraps welcome and catch-up `notice_all_mons(TRUE)` runs after Hello. **Those two call sites are the hunk.** Stamping **Addressed:** D-1200 is fair; fill hash `15cb4a37` in this commit. This is **not** “Match C dispatch, callee is a stub”: `notice_all_mons` / `notice_mon` are the D-1142 bodies. Do **not** stamp “Match C `dolookaround`” or “Match C `reset_glyphmap`” or “Match C `vision_recalc` `notice_all_mons`” or “Match C `init_artifacts`” or “Match C `spot_monsters` On.” Say so: wrapping a redraw that does not yet call notices makes **off** currently redundant; **on + catch-up** is still the C pair.

Default-off public catch-up is a no-op in **both** trees. Fortress PASS does not prove the wrap. D-1192 wizkit FALSE stays **inside** the off window (C `:826–829` before welcome) — this SHA does not move it.

### Clone classification (this SHA)

- `newgame` off/on/catch-up — C sites, new.
- `notice_mon_off` / `on` — C macros, imported.
- `notice_all_mons` — C callee imported, live (D-1142).
- No new clone. Empty `glyph_updates` arm is a named omit, not a fake `dolookaround`.

## Density

One C pair: off at entry + on/catch-up after welcome. ~19 lines of `allmain.js`. Thin versus §2b, but it is the whole queued Open row and the whole `newgame` envelope for this family (twin of D-1194). Did not pull glyphmap / vision.c / `init_artifacts`. Queue forbids gluing artifacts onto this SHA. Acceptable one-row peel; waste would be splitting off and on across two iters. Cohort **14** plus every session’s `newgame` (green + this audit’s full `sessions`).

## Verification

Journal: private canary **38**/38 (C/JS source order; off before ident/moves; welcome then on then glyph_updates then `notice_all_mons`; one off; wizard before legacy; no `init_artifacts`/`reset_glyphmap`/fs; nested block; extra on clamp; blocked wrap skips fmon walk; catch-up after on; default Off no-op); green+strict seed8000/0900; cohort **14**/14 + strict 8000/0900/1500/1800/0012/0360/4500/2200/0014/0004/0700/0006/0108/0116. Public-unhit on `spot_monsters`. This audit’s full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) still does not turn the option on.

Grep of `git show 15cb4a37 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `allmain.c:765–849`, `flag.h:229–237`, `hack.c:1744–1783`. JS SHA `allmain.js` wrap; existing `hack.js` callees.

`welcome(true)` stays **before** on like C. Do not catch-up before Hello. Do not call `notice_all_mons(false)` here (C is TRUE so unspotted `mspotted` clears). Wizkit FALSE (D-1192) stays before legacy, still inside off.

Twin of D-1194: `goto_level` offs around `docrt` and catch-up after uz0. `newgame` offs around the whole init including `docrt`/`welcome` and catch-up after Hello. Both use the same D-1142 callees and the same default-Off early-out. Nested `goto_level` later in the same process (tutorial / stairs) ++/-- the same counter; starting `newgame` off must be paired with exactly one on before `moveloop_preamble` or the first `goto_level` off would leave blocked at 2. JS pairs them. C returns from `newgame` with blocked back at 0.

`init_objects` / `init_dungeons` / `mklev` / `makedog` / `u_init_inventory_attrs` sit **inside** off like C `:783–824`. `init_artifacts` is C `:792` still missing — next Open, not this wrap. Do not call artifacts from the catch-up `if` to “make the wrap do something.”

JS `welcome` itself is the C `welcome(TRUE)` Hello pline (role/race/align). Catch-up after that string is the point of off: “You see a foo” must not interleave Hello. With default Off there is no see/notice anyway. When `spot_monsters` is later wired On, this order is what keeps Hello clean. `com_pager_legacy` is also inside off (C `flags.legacy` `:831–833` before welcome). Match.

`ident = 2` / mvitals / `init_dungeons` remain under off. `notice_mon` hiders still do not “spot” (D-1142). Catch-up with nobody visible still clears stale `mspotted` when reset is TRUE. Do not call `notice_all_mons(false)` to “skip work” on a new game.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `init_artifacts`). Claimed wrap matches `:771` + `:844–848` else-arm.

C-wrong / debt remaining (map / later peel, not new Must-fix prepends):

1. `vision_recalc` should call `notice_all_mons(TRUE)` like C `vision.c` so the off wrap actually suppresses mid-init notices. Until then off is structurally correct and behaviorally idle. Same debt as D-1194.
2. `a11y.glyph_updates` → `dolookaround()` (`allmain.c:845–846`).
3. `reset_glyphmap(gm_newgame)` (`allmain.c:797`). Wire optlist `spot_monsters` onto `a11y.mon_notices` (default stay Off).

Named omits / do-nots:

4. `init_artifacts` (next Open). `seffect_magic_mapping` / wizcmds / save off/on. `monmove.c` `postmov` `notice_mon`.
5. Do not revert D-1200. Do not FORCE notices for a public seed. Do not pull `reset_glyphmap` into a display shim. Do not skip welcome-then-on. Do not call `notice_all_mons` in the `glyph_updates` arm (C does not).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `newgame` now brackets welcome with C’s `notice_mon_off` / `notice_mon_on` + `notice_all_mons(TRUE)` after Hello; callees are live, default Off makes public catch-up a no-op, and JS `vision_recalc` still omits the caller off is meant to block.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1200 `15cb4a37`. Next port is already Open `artifact.c` `init_artifacts`. Not wizkit, not `dolookaround`.
