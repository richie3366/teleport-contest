# Review 176 — b44c4847 — hack.c `disturb_buried_zombies` (D-1214)

## Metadata
- Full / short hash: `b44c4847e56cd90c7051b66a92a8d2f9a20752ae` / `b44c4847`
- Parent: `c85424f4` (D-1213). This file audits **this SHA only**. Archive row **Addressed:** D-1214 `b44c4847` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 10:37:21 +0200
- D-id: **D-1214**
- Stats: 14 files, +202 / −64 — `js/hack.js` +60 / −4; `js/mkobj.js` peek_timer; `js/cmd.js` tread; `js/mon.js` wake; `js/monmove.js` grounded move.
- Claims to close: Open queue `hack.c` `disturb_buried_zombies` (named from D-1202 / D-1210 / D-1211 / D-1213 / review **164**). Not zombify_mon. `reviews/loop-2026-08-15/` has no unpaid disturb Must-fix.
- JS / map: `hack.js` body + rumble + tread helper; `mkobj.js` `peek_timer`; callers `cmd.js` / `mon.js` / `monmove.js`. `c-js-map/turns.md`. `impact_disturbs_zombies` / local `wake_nearby` clones / hideunder after tread still named. Next Open at this SHA was `pline_xy`/`pline_mon`.
- Prior reviews this SHA claims to close: **164** named `disturb_buried_zombies` live Open; **174** “Not `disturb_buried_zombies`.”

## Intent vs deliverable

Git subject promises: “Match C hack.c disturb_buried_zombies so a rumble, grounded tread, wake, or grounded monster step shrinks nearby buried ZOMBIFY_MON remaining to max(1, t*2/3), instead of leaving the timer untouched.”

Old JS had no buried-list walk. Rumble, hero step, `wake_nearto_core`, and `MMOVE_MOVED` never touched `ZOMBIFY_MON`. `obj_has_timer` walked `kind===TIMER_OBJECT` and returned boolean, not absolute timeout.

C `hack.c:1798–1813` walks `buriedobjlist`: CORPSE + timed + 3×3 + `peek_timer(ZOMBIFY_MON)>0`, then `stop_timer` remaining, `start_timer(max(1, t*2/3), TIMER_OBJECT, ZOMBIFY_MON)`. Callers: rumble after `closed_door` (`:494`); tread after occupy+run-stop (`:2944–2947`); `mon.c:4398` `wake_nearto_core` tail; `monmove.c:938–939` grounded `MMOVE_MOVED`.

The diff **does** that body and those four callers, and rewrites `peek_timer` to C’s action+obj absolute timeout (`obj_has_timer` = peek≠0). It does **not** `impact_disturbs_zombies` (drop/throw owt/flimsy), local `wake_nearby` clones in trap/lock/timeout/dig, hideunder after tread, or unstuck/helpless after disturb. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `disturb_buried_zombies` | C function, **new** | `:1798–1813` |
| `hero_tread_disturb_buried_zombies` | C tread site, **new** helper | `:2944–2947`; not a second producer |
| rumble in `moverock_core` | C caller, **new** | `:494` after closed_door before trap |
| `peek_timer` | C callee, **new** (was boolean `obj_has_timer`) | `timeout.c:2324–2332` |
| `stop_timer` / `start_timer` | C callees, **imported** | remaining vs absolute |
| `wake_nearto_core` tail | C caller, **new** | `mon.c:4398` |
| grounded `MMOVE_MOVED` | C caller, **new** | `monmove.c:938–939` |
| `Levitation_st` / `Flying_st` / Stealth | C youprop.h, **imported clones** | D-1070 pattern |
| `grounded` | C callee, **imported** | `monsters.js`; clinger `has_ceiling` stub pre-existing |
| `impact_disturbs_zombies` | C sibling, **named omit** | `:1787–1794`; dothrow/dokick/do.c |
| local `wake_nearby` clones | JS partials, **named omit** | trap/lock/timeout/dig |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (`t*2/3` is integer remaining, not `rn2`). `WT_ELF=800` matches `weight.h:23`.

Grep of this SHA’s `js/` hunks: no banned gates. 3×3 is C `x±1,y±1`, not a recorded cell. `TIMER_OBJECT` / `ZOMBIFY_MON` / `WT_ELF` are C constants already in `const.js`. `hero_tread_disturb_buried_zombies` is a JS helper name for the inline C `if` at `:2944–2947`, not a second C function.

C `start_timer` returns the `when` and ignores a duplicate (same kind+action+obj). JS `start_timer` also no-ops a duplicate (`mkobj.js:829–832`). After `stop_timer` the old entry is gone, so the restart is a new insert. Match.

`buriedobjlist` is `game.level.buriedobjlist` (D-0014 `add_to_buried`). Walking `nobj` matches C `svl.level.buriedobjlist`. Empty/missing level → JS `|| null` skips the loop; C would have a level. Not a public miss.

## C ↔ JS fidelity

Pinned C (`hack.c:1798–1813`):

```
    for (otmp = svl.level.buriedobjlist; otmp; otmp = otmp->nobj) {
        if (otmp->otyp == CORPSE && otmp->timed
            && otmp->ox >= x - 1 && otmp->ox <= x + 1
            && otmp->oy >= y - 1 && otmp->oy <= y + 1
            && (t = peek_timer(ZOMBIFY_MON, obj_to_any(otmp))) > 0) {
            t = stop_timer(ZOMBIFY_MON, obj_to_any(otmp));
            (void) start_timer(max(1, (t*2/3)), TIMER_OBJECT,
                               ZOMBIFY_MON, obj_to_any(otmp));
        }
    }
```

JS (`hack.js:320–337`): same conjuncts on `game.level.buriedobjlist` `nobj` chain; `peek_timer` then reassign `t = stop_timer`; `Math.max(1, ((t*2)/3)|0)`. C `t*2/3` is `(t*2)/3` toward 0 for positive remaining. JS `|0` after `/` is the same for `t>=0`. Overdue remaining negative: both `max(1, negative)=1`. Canary due→1. Match.

### `peek_timer` vs `timeout.c:2324–2332`

C matches `func_index == type && arg pointer`, returns **absolute** `curr->timeout`, else 0. Does **not** filter `kind`. JS (`mkobj.js:797–804`) `curr.action === type && curr.obj === obj` → `timeout|0`. Old `obj_has_timer` required `TIMER_OBJECT`; new `obj_has_timer` is `peek !== 0`. That is **more** C, not a clone drift.

`stop_timer` (`mkobj.js:764–788`) still requires `kind===TIMER_OBJECT` and returns `expire - moves`. C `stop_timer` (`:2299–2317`) `remove_timer` by func+arg then remaining `timeout - moves`. For ZOMBIFY_MON corpses the kind is always OBJECT. Peek>0 then stop 0 would only happen on a non-OBJECT same action+obj, which C would still remove. Not this envelope.

`start_timer(when, …)` stores `moves + when` (`mkobj.js:834–837`). Remaining 9 → timeout moves+9; 9*2/3=6. Canary 9→6 / 8→5 / 3→2 / 2→1 / 1→1. Match C integer.

### Rumble vs `:485–494`

C after `closed_door(rx,ry)` return, **then** disturb `(sx,sy)` (boulder cell, not dest), **then** trap switch. JS (`hack.js:286–293`): closed_door return; `disturb_buried_zombies(sx,sy)`; trap/pool still deferred; `dopush`. Disturb locus and order vs dopush match the ported path. Extra dopush when C would trap after rumble is **pre-existing** moverock partial, not a fake disturb.

### Tread vs `:2934–2947`

C: `u_on_newpos`; `reset_occupations`; run-stop on door/obstructed/furniture; **then** `!Levitation && !Flying && !Stealth && cwt >= WT_ELF/2` disturb `(u.ux,u.uy)` (new cell); **then** hideunder. JS occupy already wrote `u.ux`; run-stop (`cmd.js:1976–1983`); `hero_tread_disturb_buried_zombies` (`:1985–1986`); then newsym. Hideunder named. Tread is not on early-return failed moves (it sits after occupy, after `kickedloc` clear). Swallow same-cell occupy still treads at the (possibly unchanged) cell — C also treads after `u_on_newpos` even when a pet swap bounced back; JS safemon swap is a pre-existing thinner `domove`. Do not Must-fix “finish pet swap then tread.”

`reset_occupations` at this C site is not this SHA. JS may leave an occupation until `stop_occupation` elsewhere. Tread itself does not depend on occupation. Named adjacent, not a fake `cwt` gate.

C `Stealth` (`youprop.h:210`) `(HStealth \|\| EStealth) && !BStealth` with `BStealth = uprops[STEALTH].blocked`. JS `_uprop_he_st` (flat + uprops) && !(`BStealth` \| `uprops.blocked`). Blocked stealth → Stealth false → **do** tread (canary `BStealth` still treads). H/E stealth skip. `Levitation_st` / `Flying_st` are the D-1070 youprop clones (Flying ORs steed `is_flyer`). `WT_ELF/2` = 400. Match.

C `Flying` (`youprop.h:253–255`) is `(HFlying || EFlying || (u.usteed && is_flyer(steed))) && !BFlying`. JS `Flying_st` is that clone (D-1085). A mounted flyer skips tread. `Levitation` has no steed OR. `cmd.js` importing `hero_tread_disturb_buried_zombies` is a JS split of the inline C `if`, not a second producer: there is still one `disturb_buried_zombies` body.

### Wake vs `mon.c:4375–4398`

C always `disturb_buried_zombies(x,y)` **after** the fmon sleep/wait walk, even if no monster woke. JS `wake_nearto_core` tail (`mon.js:967`). `wake_nearto` / exported `wake_nearby` go through that core. Local clones in `trap.js` / `lock.js` / `timeout.js` / `dig.js` still skip disturb — **named**, pre-existing partials of `wake_nearto_core`, not a stub of this SHA’s callee.

### Grounded `MMOVE_MOVED` vs `monmove.c:934–942`

C after `unstuck` grabber, `if (grounded(mdat)) disturb(mx,my)`, then `helpless` return, then nearby/ranged. JS inserts disturb then the existing nearby/ranged early return. Unstuck/helpless **named**. `unstuck` does not move `mx,my`, so disturb coords still match. `grounded` (`mondata.h:23–24`) is `!flyer && !floater && (!clinger || !has_ceiling(&u.uz))`. JS (`monsters.js:475–479`) is flyer/floater false; clinger always false (`has_ceiling` stub treats cling-safe). A piercer on a no-ceiling level would disturb in C and skip in JS. That stub predates this SHA; this commit **imports** `grounded`, it does not write a new clone. Named adjacent, not Must-fix for rumble/tread. Goblin treads, bat does not (canary). Match the claimed flyer/floater gate.

## Hallucinations / overclaim

Subject + D-1214 say rumble/tread/wake/grounded-step shrink remaining to `max(1,t*2/3)`. **Body + four C callers + live peek/stop/start are the hunk.** Stamping **Addressed:** D-1214 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `impact_disturbs_zombies` owt/flimsy” or “Match C every `wake_nearby` clone” or “Match C hideunder after tread” or “Match C unstuck/helpless.” Say so: 3×3 buried ZOMBIFY shrink is C; drop/throw impact and local wake clones stay named.

## Density

One C function + its four callers + the peek the gate needs. Five JS files that already called each other (`hack`/`cmd`/`mon`/`monmove`/`mkobj`). §2b cluster, not “finish timeout.c.” Impact correctly stayed out.

## Branch-by-branch confirm

1. Buried CORPSE ZOMBIFY remaining 9 in 3×3 → 6. Match.
2. Remaining 1 → `max(1,0)` wait: 1*2/3=0 → max 1. Match.
3. 3×3 skip (ox = x+2) → untouched. Match.
4. ROT_CORPSE only / non-CORPSE / untimed → skip. Match (`peek` 0 or otyp).
5. Pair 9 and 15 → 6 and 10. Match independent restarts.
6. Rumble after closed_door at boulder `(sx,sy)`. Match.
7. Tread: Lev/Fly/Stealth skip; BStealth treads; cwt 399 skip / 400 treads. Match.
8. `wake_nearto_core` tail even if no fmon. Match.
9. Grounded `MMOVE_MOVED` before nearby return; flyer skip. Match.
10. `impact_disturbs_zombies` → C drop/throw; JS named skip.

`obj.timed` on the corpse is the C `otmp->timed` count of live object timers. Peeking ZOMBIFY then stopping decrements it; start increments again. A corpse that only had ROT would fail the peek>0 gate (`action` mismatch) even if `timed>0`. Match C’s `peek_timer(ZOMBIFY_MON)` not “any timer.”

C `max` is a macro on longs. JS `Math.max(1, …)` on the truncated product. Remaining 15 → 10; 8 → 5 (`16/3=5`). Canary. No `rnd`/`rn2`/`rn1`/`d` in this function. Call-for-call RNG: **none**.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show b44c4847 -- js/` has no `FORCE`, `DIAG`, `getRngLog(`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, public seed names in control flow, or hardcoded coordinates. `px-1`/`px+1` is the C 3×3. `WT_ELF/2` is `weight.h`, not a recorded cwt from a session. Contest Rule #2: scored files stay plain ESM.

## Verification

Journal: private canary **29**/29 (shrink table + 3×3 + ROT skip + tread gates + peek/obj_has_timer + goblin/bat); green+strict seed8000/0900; cohort **6**/6 + strict 1500/1800/0012/0004/2200/0060. **Public-unhit** unless a public buried ZOMBIFY sits in a rumble/tread/wake 3×3. Admit that. This audit’s full `sessions` `__RESULTS_JSON__` at `517cb217`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.27/turn` (R² 0.873) does not prove the remaining shrink. `peek_timer` returning absolute timeout (not remaining) is the C gate; the shrink uses `stop_timer` remaining. Do not “fix” peek to subtract `moves`.

## Actionable C-wrongs

Named omits (map / later Open), not Must-fix:

1. `impact_disturbs_zombies` (`hack.c:1787–1794`) from drop/throw/kick (`do.c:832`, `dothrow.c:1831`, `dokick.c:642/:786`).
2. Local `wake_nearby` clones (trap/lock/timeout/dig) still omit the `wake_nearto_core` disturb tail.
3. Hideunder after tread (`hack.c:2949–2951`).
4. `unstuck` grabber / `helpless` return around `MMOVE_MOVED` disturb (`monmove.c:936–942`).

Do not Must-fix “dedupe peek kind with stop_timer” for ZOMBIFY corpses. Next Open at this SHA was already `pline_xy`/`pline_mon`.

C `impact_disturbs_zombies` callers (not this SHA): `do.c:832` drop, `dothrow.c:1831` throw, `dokick.c:642` and `:786` kick. Gate is `owt < (violent ? 10 : 100) || is_flimsy`. Wiring disturb without that gate from dropx would over-shrink. Named omit is the honest miss.

C `wake_nearby` is `wake_nearto_core(u.ux, u.uy, u.ulevel*20, petcall)` (`mon.c:4408–4412`). JS export `wake_nearby` already does that and now disturbs. The **local** functions named `wake_nearby` in trap/lock/timeout/dig are radius stubs that never called `mon.js`. One port iter to re-export rather than clone is later map work, not Must-fix for this rumble/tread envelope.

C `continue` inside the fmon loop (`mon.c:4388–4389`) skips pet-whistle bookkeeping, **not** the disturb after the loop. JS `wake_nearto_core` (`mon.js:952` continue, `:967` disturb) same: a sleeping unique that `continue`s still gets its cell’s buried list walked. Match. Do not “fix” disturb to only-if-someone-woke.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: buried ZOMBIFY_MON timers in the 3×3 of a rumble, grounded hero tread, `wake_nearto`, or grounded monster step now shrink to `max(1, remaining*2/3)` like C; drop/throw impact and local wake clones stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1214 `b44c4847`. Next port in this window popped Open `pline_xy`/`pline_mon`. Not `zombify_mon`, not `rot_corpse`.
