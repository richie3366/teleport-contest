# Review 150 — c58efd08 — teleport.c `domagicportal` tutorial ATSTAIRS (D-1188)

## Metadata
- Full / short hash: `c58efd086ce75b0dd140a2d358fb649c38f5dfd8` / `c58efd08`
- Parent: `77ead396` (D-1187). This file audits **this SHA only**. Archive row **Addressed:** D-1188 lacked the short hash; this review commit fills `c58efd08`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:19:01 +0200
- D-id: **D-1188**
- Stats: 13 files, +222 / −61 — `js/teleport.js` +73 (`domagicportal`); `js/trap.js` +34 (`trapeffect_magic_portal` + `dotrap` `!undestroyable_trap`); `js/mklev.js` +7 (portal `dst`); `js/do.js` +4 (`uz0` reset).
- Claims to close: Must-fix human canary seed8243 `"You activated a magic portal!"` / tutorial ATSTAIRS `"Resuming regular play."` (after D-1187 yn). Review **146** / D-1187 next-port. `reviews/loop-2026-08-15/` has no unpaid `domagicportal` Must-fix.
- JS / map: `teleport.js` `domagicportal`; `trap.js` selector; `mklev.js` `mktrap_seen_victim`; `do.js` `goto_level`. `c-js-map/turns.md` `teleport.c`. `level_tele_trap` / `UTOTYPE_RMPORTAL` still named. Leftover canary miss @117 `Unknown command '^C'`.
- Prior reviews this SHA claims to close: D-1187 next-port activate.

## Intent vs deliverable

Git subject promises: “Match C teleport.c domagicportal so a hero step onto a magic portal prints You activated a magic portal! and leaving the tutorial uses ATSTAIRS plus Resuming regular play.”

Old JS: `trapeffect_level_telep` no-op’d the hero arm for both LEVEL_TELEP and MAGIC_PORTAL; seen-escape rolled `rn2(5)` on portals (C `undestroyable_trap` skips that die); `goto_level` never reset `uz0` after arrival so a later same-level step looked like a landing (`!on_level(uz,uz0)` no-op); tut-1 `mktrap` left `dst` at unset/`{-1,-1}`.

The diff **does** add `domagicportal`, wire `trapeffect_magic_portal` (hero `feeltrap`+`domagicportal`; monster still `trapeffect_level_telep`), skip `rn2(5)` on `undestroyable_trap`, copy `ucamefrom` into portal `dst`, and `assign_level(&u.uz0, &u.uz)` at C `:1967`. It does **not** pull hero `level_tele_trap` or `UTOTYPE_RMPORTAL` `deltrap`. It does **not** pull rhack `visctrl`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domagicportal` | C callee, **new** | `teleport.c:1444–1488` |
| `trapeffect_magic_portal` | C callee, **new** | `trap.c:2710–2722` |
| `feeltrap` | C callee, **imported** | `trap.js:1784–1788` — `tseen` + `newsym` |
| `next_to_u` | C callee, **imported** | `apply.js:1517–1524` — leashes + steed AoY |
| `buried_ball_to_punishment` | C callee, **imported** | `dig.js` via dynamic import |
| `make_stunned` | C callee, **imported** | `potion.js:532–554`; talk=FALSE |
| `schedule_goto` | C callee, **imported** | `do.js:1866–1874` — sets `UTOTYPE_DEFERRED` |
| `In_tutorial` / `In_endgame` / `on_level` | C, **imported** | `dungeon.js` |
| `undestroyable_trap` | C macro, **pre-existing** | `trap.h:116–117` MAGIC_PORTAL \|\| VIBRATING_SQUARE |
| `mktrap` dst | C, **new** | `mklev.c:2108–2110` `ucamefrom` |
| `goto_level` uz0 reset | C, **new** | `do.c:1967` (start-of-function copy at `:1674` already existed) |
| `level_tele_trap` | C, **named omit** | hero LEVEL_TELEP still Finished |
| `UTOTYPE_RMPORTAL` | C, **named omit** | `deferred_goto` comment |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./dig.js')` / `apply.js` / `potion.js` / `do.js` are ESM, not Node `fs`. Rule #2 clean.

**New RNG on this path:** none in `domagicportal` itself. Seen-escape **stops** consuming `rn2(5)` on MAGIC_PORTAL (C same — the die is inside `!undestroyable_trap`). Path was private-canary-hit; **public-unhit** unless a session steps a hero portal.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### `trapeffect_magic_portal` vs `trap.c:2710–2722`

C: youmonst → `feeltrap(trap); domagicportal(trap);` else `return trapeffect_level_telep(...)`; then `Trap_Effect_Finished`.

JS (`trap.js:3034–3041`): same split; selector `MAGIC_PORTAL` now calls this instead of sharing LEVEL_TELEP (`:4183–4186`). Hero LEVEL_TELEP still named-Finished. Match this ttyp.

`feeltrap` is not a stub: `tseen=true; newsym(tx,ty)`.

### `domagicportal` vs `teleport.c:1444–1488` (branch order)

C order: buried-ball punish; `!next_to_u` → `You1(shudder_for_moment)` return; `!on_level(&u.uz,&u.uz0)` return; `You("activated a magic portal!")`; endgame && !amulet → `You_feel("dizzy…")` return; `target_level = ttmp->dst`; tutorial-leave → `UTOTYPE_ATSTAIRS` + `"Resuming regular play."`; else `UTOTYPE_PORTAL` + stunmsg from `!Stunned` + `make_stunned((HStun&TIMEOUT)+3, FALSE)`; `schedule_goto(&target_level, totype, stunmsg, NULL)`.

JS walks that list. `You1(shudder_for_moment)` is `"You shudder for a moment."` (`decl.c:44` + `You1`). JS that string. `You("activated a magic portal!")` → JS full pline. Match.

`on_level(uz,uz0)`: same-turn landing from another portal no-ops. Requires the **end** `uz0` reset so a later step is `on_level` true and can fire. This SHA adds that reset. Match the D-log landing story.

Endgame: C `!u.uhave.amulet`. JS `!(uhave?.amulet || u.uhave_amulet)`. Extra sticky OR can skip the dizzy-return if only the sticky is set. Tutorial canary is not endgame. Not Must-fix.

Tutorial: `In_tutorial(u.uz) && !In_tutorial(target_level)` → ATSTAIRS + `"Resuming regular play."` and **no** `make_stunned`. `In_tutorial` is `dnum == tutorial_dnum` (`dungeon.js:580–584`). Match `:1476–1480`.

Else: C `stunmsg = !Stunned ? "You feel slightly dizzy." : "You feel dizzier."` with `Stunned ≡ HStun`. JS `!(u.HStun|0)` — **correct** (unlike D-1187’s sticky `Stunned_prop`). `make_stunned(((HStun)&TIMEOUT)+3, false)` imported from `potion.js` — probe/TIMEOUT write, talk=FALSE skips stagger pline. Not a stub.

`schedule_goto` is live: `utotype |= UTOTYPE_DEFERRED`, copy `utolev`, stash pre/post msgs. `allmain` already calls `deferred_goto` after `rhack` (C `:538–539`). ATSTAIRS `0x01` / PORTAL `0x04` / DEFERRED `0x20` match `const.js`. Pre_msg is the stunmsg / “Resuming regular play.” printed **before** `goto_level` (`do.js:1892`). Match C `deferred_goto`.

`next_to_u` (`apply.c` / `apply.js:1517–1524`) walks `fmon` leashes via `mleashed_next2u` and rejects a steed carrying the Amulet. Tutorial canary has no leash/steed — the call still runs and returns true. Not a stub. `buried_ball_to_punishment` only if `utraptype==TT_BURIEDBALL` (canary: no).

`make_stunned` talk=FALSE: C `potion.c` still writes `(HStun & ~TIMEOUT) | itimeout(xtime)`. JS `potion.js:552–553` does that and mirrors `u.Stunned = u.HStun`. Tutorial leave **skips** this call (C `:1476–1480`). Non-tutorial portals would add 3 TIMEOUT and print the pre_msg after the schedule, not inside `make_stunned`.

| Case | C | JS after |
|------|---|---------|
| hero MAGIC_PORTAL | feeltrap + `domagicportal` | **same** |
| monster MAGIC_PORTAL | `trapeffect_level_telep` | **same** |
| `!next_to_u` | shudder return | **same** |
| `uz != uz0` (just landed) | silent return | **same** (now that uz0 resets) |
| tutorial → main | ATSTAIRS + Resuming… | **same** |
| other portal | PORTAL + stun + `make_stunned` | **same** |
| endgame no amulet | dizzy return | **same** (+ sticky OR) |
| seen-escape `rn2(5)` on portal | skipped (`undestroyable`) | **same** |
| hero LEVEL_TELEP | `level_tele_trap` | **named skip** |

### `dotrap` escape vs `trap.c:3035`

C: `already_seen && !Fumbling && !undestroyable_trap(ttype) && ttype != ANTI_MAGIC && !forcebungle && !rn2(5)`.

JS was `!u.Fumbling && ttype !== ANTI_MAGIC` (sticky Fumbling, pre-existing). This SHA adds `!undestroyable_trap(ttype)`. Macro already `MAGIC_PORTAL \|\| VIBRATING_SQUARE` (`trap.js:627–628` / `trap.h:116–117`). Portal no longer burns `rn2(5)` or “You escape … magic portal.” Match the new conjunct. Do not “fix” sticky `u.Fumbling` on this line in a portal peel.

### `mktrap` dst vs `mklev.c:2108–2110`

C after SEEN: `if (kind == MAGIC_PORTAL && (u.ucamefrom.dnum || u.ucamefrom.dlevel)) assign_level(&t->dst, &u.ucamefrom);`

JS in `mktrap_seen_victim` after SEEN: same predicate, `{dnum,dlevel}` copy. Tutorial portal dest is the came-from main-dungeon stairs level. Canary ATSTAIRS arrival implies `dst` was live. `assign_level` vs two-field copy is the same `d_level` payload.

### `goto_level` uz0 vs `do.c:1674` and `:1967`

C copies `uz → uz0` **before** assigning the new `uz` (`:1674`) so arrival code can see the previous level, then **resets** `uz0 = uz` at `:1967` after tourist XP / before `print_level_annotation`. JS already had the start copy (`do.js:1434`). This SHA adds the end reset after the Tourist `more_experienced` block (`:1774–1776`), before annotation — C order. Match. Not a portal-only hack: every `goto_level` now matches C’s reset (cohort was the full public 44).

## Hallucinations / overclaim

D-log / CURRENT / subject say hero MAGIC_PORTAL prints activate then tutorial ATSTAIRS + “Resuming regular play.” **That is the hunk.** Stamping **Addressed:** D-1188 is fair; fill hash `c58efd08` in this commit. This is **not** “Match C dispatch, callee is a stub”: `feeltrap`, `next_to_u`, `make_stunned`, `schedule_goto`, `In_tutorial` are imported real functions. Do **not** stamp “Match C `level_tele_trap`” or “Match C `UTOTYPE_RMPORTAL`” or “Match C rhack `visctrl`.”

Canary leftover @117 `Unknown command '^C'` is C `cmd.c:3834` `visctrl(key)` vs JS ``Unknown command '${ch}'`` (raw ETX). `dokeylist.js` `visctrl` already exists. Already Must-fix. Not this SHA.

### Clone classification (this SHA)

- `domagicportal` — C function, new.
- `trapeffect_magic_portal` — C function, new.
- `feeltrap` / `next_to_u` / `make_stunned` / `schedule_goto` / `In_tutorial` — C callees imported, live.
- `undestroyable_trap` — C macro, pre-existing, now used at the C site.
- `mktrap` dst / `uz0` reset — C branches, new.
- No no-op helper added. No `Amonnam_apply` stand-in.

## Density

One C function plus the four envelope sites the canary proved were required (selector, escape die, dst, uz0). One semantic cluster (hero portal leave-tutorial). Four JS modules that already call each other. Right-size §2b; not “finish teleport.” Did not pull `visctrl`. Not QUALITY-RISK.

`deferred_goto` (`do.js:1880–1908`) already delivered `dfr_pre_msg` then `goto_level(dest, ATSTAIRS, FALLING, PORTAL)`. Tutorial leave sets only ATSTAIRS (not PORTAL), so arrival uses stairs placement (`do.c` `at_stairs`) rather than portal-spot search. C `:1478–1479` comment: “returning to normal play => arrive on level 1 stairs.” Canary 108→128 includes that arrival. `UTOTYPE_RMPORTAL` would `deltrap` the source portal after the goto — named; tutorial leave does not need it for the activate/ATSTAIRS screens.

`target_level` is `ttmp.dst` (`:1474`). If `mktrap` never wrote `ucamefrom`, C leaves `dst` at `maketrap`’s zero/`-1` and `schedule_goto` would aim at a bogus ledger. JS same. Tutorial `ucamefrom` is set when entering tut-1; this SHA’s `mktrap_seen_victim` copy is what makes ATSTAIRS land on Dlvl 1 instead of `{0,0}`. Do not hardcode a recorded dest level in `domagicportal`.

## Verification

Journal: private canary Scr **108→128**/129 RNG **2570→2768**/2768 (leftover @117 `^C`); green+strict seed8000/0900; cohort **44**/44 + strict 1500/0700/0009/0361/0015/0012/2200. Cadence **#1510** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87) on this SHA — fortress held after the shared `uz0` reset.

Grep of `git show c58efd08 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `teleport.c:1444–1488`, `trap.c:2710–2722` / `:3035`, `trap.h:116–117`, `mklev.c:2108–2110`, `do.c:1674` / `:1967`, `decl.c:44`. JS SHA `domagicportal` / `trapeffect_magic_portal` / `dotrap` escape / `mktrap_seen_victim` / `goto_level` uz0.

## Actionable C-wrongs

None that Must-fix this next iter. The Open/Must-fix activate + ATSTAIRS path matches `:1444–1488`. Callees are live.

Named omits / do-nots (map / already-queued Must-fix, not new prepends):

1. Hero `level_tele_trap` (LEVEL_TELEP still Finished).
2. `UTOTYPE_RMPORTAL` `deltrap` in `deferred_goto`.
3. Endgame `uhave.amulet` only (drop sticky `uhave_amulet` if it ever lies).
4. Do not revert D-1188 uz0 reset. Do not skip `undestroyable_trap` on the escape die. Next port is Must-fix `cmd.c` rhack `Unknown command '%s'` via `visctrl(key)` so Ctrl-C is `^C`. `dokeylist.js` `visctrl` already exists. Not `maybe_smudge_engr`. Not `kill_genocided`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a hero MAGIC_PORTAL now runs C’s `feeltrap`+`domagicportal` (activate pline; tutorial leave ATSTAIRS + “Resuming regular play.”; else PORTAL + `make_stunned`), with dst from `ucamefrom` and `uz0` reset so later steps are not treated as landings.
- Must-fix stays the already-queued `visctrl` `^C` line. Fill **Addressed:** D-1188 `c58efd08`. Not `maybe_smudge`, not `kill_genocided`.
