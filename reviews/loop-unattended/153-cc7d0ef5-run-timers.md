# Review 153 — cc7d0ef5 — do.c `goto_level` `run_timers` (D-1191)

## Metadata
- Full / short hash: `cc7d0ef514b5e7c4184530dfa400614a48fc2f3f` / `cc7d0ef5`
- Parent: `9a2cbc27` (D-1190). This file audits **this SHA only**. Archive row **Addressed:** D-1191 `cc7d0ef5` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:45:49 +0200
- D-id: **D-1191**
- Stats: 10 files, +112 / −47 — `js/do.js` +19 / −7 (import + `await run_timers()` after `kill_genocided_monsters`).
- Claims to close: Open queue `do.c` `goto_level` `run_timers` (named). Not `kill_genocided`. Reviews **140** / **152** named `:1818–1823`. `reviews/loop-2026-08-15/` has no unpaid `run_timers` Must-fix.
- JS / map: `do.js` `goto_level`; callee `mkobj.js` `run_timers` (D-0405 / D-1037). `c-js-map/turns.md` / `data.md`. REVIVE/ZOMBIFY, `notice_mon_off`, cmd.c wiz-level-change still named.
- Prior reviews this SHA claims to close: **152** next-line omit; D-1190 “not `run_timers`.”

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level run_timers so timers that expired while away fire after delivery.”

Old JS (after D-1190): `losedogs` + `kill_genocided_monsters` then collide. C also `run_timers()` so destination-level and delivered-object timers whose `timeout <= moves` fire before `u_collide_m` / vision / pickup. `nh_timeout` already ran the callee at EOT (too late for arrival).

The diff **does** `await run_timers()` after `kill_genocided_monsters`, before `m_at` / collide. It does **not** peel invent/migrating `RANGE_LEVEL` (`obj_is_local` is false — those stay on `timer_base`). It does **not** pull `notice_mon_off`, cmd.c `#levelchange`, or REVIVE/ZOMBIFY dispatch. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` call | C site, **new** | `do.c:1818–1823` |
| `run_timers` | C callee, **imported** | `timeout.c:2222–2241`; JS `mkobj.js:951–983` |
| ROT_CORPSE / ROT_ORGANIC / MELT_ICE / BURN / SHRINK / FIG_TRANSFORM / HATCH_EGG | C `timeout_funcs[]`, **live** | JS `action` switch |
| REVIVE_MON / ZOMBIFY_MON | C table rows, **named omit** | JS dequeues and skips |
| invent/migrating RANGE_LEVEL | C `save_timers`, **named do-not** | D-1037; `obj_is_local` false |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** only if a due timer’s action rolls (rot / hatch / burn / …). Empty or future `timer_base`: **zero** extra RNG. Path **public-unhit** unless a due timer is on the restored or delivered queue.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if moves===N run_timers”. The call is the C site after delivery. Rule #2: import from `./mkobj.js` only. Do not add a second `run_timers` after `obj_delivery(TRUE)` to chase a private timer. Frozen contracts untouched.

## C ↔ JS fidelity

### Call order vs `do.c:1815–1828`

C comment at `:1818–1822`: expire timers that went off while away; **must** be after migrating mons and objects are delivered (`losedogs` and `obj_delivery`). Then collide.

JS (`do.js:1667–1678`): `obj_delivery(false)` (already above); `losedogs`; `kill_genocided_monsters`; `await run_timers()`; then `m_at` / `u_collide_m`. **Matches `:1815–1828`.** C’s later `obj_delivery(TRUE)` (`:1978`) is **after** this `run_timers` — stairs-dest objects delivered then do not fire here. JS already has that second delivery later. Do not add a second `run_timers` after TRUE.

### Callee vs `timeout.c:2222–2241`

Pinned C (`timeout.c:2231–2240`):

```
    while (gt.timer_base && gt.timer_base->timeout <= svm.moves) {
        curr = gt.timer_base;
        gt.timer_base = curr->next;

        if (curr->kind == TIMER_OBJECT)
            (curr->arg.a_obj)->timed--;
        (*timeout_funcs[curr->func_index].f)(&curr->arg, curr->timeout);
        (void) memset((genericptr_t) curr, 0, sizeof(timer_element));
        free((genericptr_t) curr);
    }
```

JS: same while on `g._timer_base`; unlink; `TIMER_OBJECT` decrements `obj.timed`; then a switch on `curr.action`. **Not a stub.** The C table (`timeout.c:1978–1991`) is rot_organic, rot_corpse, revive_mon, zombify_mon, burn_object, hatch_egg, fig_transform, shrink_glob, melt_ice_away. JS implements every row except revive/zombify (named). Unknown `action` is a silent dequeue — same as the named omit for those two.

C `memset` + `free` is the node lifetime. JS GC after unlink is the adaptation. Do not keep a freed-timer object on `_timer_base`.

C always calls the function pointer. JS `await`s the implemented arms (rot / melt / burn / hatch / fig). Async is the established JS adaptation; it does not reorder RNG vs the next timer.

`obj->timed--` happens **before** the callback in both. A due ROT_CORPSE on a delivered corpse therefore drops `timed` then rots. Match.

| Case | C | JS after |
|------|---|---------|
| call after kill_genocided | `:1823` | **same** |
| `timeout > moves` | stop | **same** |
| TIMER_OBJECT | `timed--` then f() | **same** |
| ROT_* / BURN / HATCH / FIG / SHRINK / MELT | table f() | **same** |
| REVIVE / ZOMBIFY | `revive_mon` / `zombify_mon` | **named dequeue no-op** |
| invent/migrating RANGE_LEVEL peel | not this site | **same (do-not)** |

No RNG in `run_timers` itself. Callbacks may `rn2`/`rnd`.

C `timeout_funcs[]` index is the `func_index` stored on the timer element. JS stores `action` as the same enum (`ROT_CORPSE`, …). A restored save that used a numeric index must still map to those names — that is D-0405/D-1037 restore, not this SHA. This SHA only **calls** the queue walk at the C site.

`nh_timeout` (`allmain` EOT) already `await run_timers()` after intrinsic TIMEOUT (D-0405). Arrival is a **second** C call at `:1823` because `moves` may have jumped while the hero was away and restored/delivered objects carry due timeouts. Skipping this call leaves those timers until the next EOT — after collide / vision / pickup. That is the Open row this SHA pops.

`save_timers(RANGE_LEVEL)` on `goto_level` (D-1037) strips **local** level timers onto a side list and restores them on the dest. Invent and migrating timers have `obj_is_local` false, so they **remain** on `gt.timer_base`. This `run_timers` is how C fires those. Do not “fix” arrival by peeling them off.

| Due action | C f() | JS after this SHA |
|------------|-------|-------------------|
| rot_corpse / rot_organic | table | **live** |
| burn_object / hatch_egg / fig_transform / shrink_glob | table | **live** |
| melt_ice_away (TIMER_LEVEL) | table | **live** |
| revive_mon / zombify_mon | table | **named skip** |

## Hallucinations / overclaim

D-log / CURRENT / subject say destination + delivered timers that expired while away fire before collide. **That is the call site.** Stamping **Addressed:** D-1191 is fair for the Open row. This is **not** “Match C dispatch, callee is a stub”: the callee fires the implemented table rows. Do **not** stamp “Match C `revive_mon`” or “Match C `zombify_mon`.” The subject’s “timers … fire” is true for the live arms; a due REVIVE would be consumed without revival (pre-existing named omit of the callee, not a lie about the `goto_level` line).

Do not peel invent/migrating onto a local RANGE_LEVEL list in this call — C `obj_is_local` is false, so those timers **stay** on `timer_base` and this loop can fire them. That is the opposite of “skip invent timers.”

### Clone classification (this SHA)

- `run_timers` — C function, imported, live switch.
- No new helper. No no-op at the call site.

## Density

One C statement after D-1190. Same §2b thin-peel note as **152**: the Open row **is** that statement. They did not bundle `notice_mon_off` or REVIVE into a second theory. Right-size for a map pop of `:1823`.

Public 44 do not carry due dest timers across a `goto_level`. Cohort exact-length PASS means the new await did not fire a callback that consumes RNG on those seeds. A later private canary with a rotting delivered corpse would be the hit test — not a reason to invent a public FAIL.

## Verification

Journal: green+strict seed8000/0900; cohort **16**/16 (1500/1800/0015/0002/0014/2200/4500/0367/0009/0012/0004/0060/0102/0700/0006/0361) + strict lengths. Public-unhit unless a due timer is on the restored or delivered queue. Cadence **#1515** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) — fortress held.

Grep of `git show cc7d0ef5 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `do.c:1815–1828`, `timeout.c:1978–1991` / `:2222–2241`. JS SHA `goto_level` await + existing `run_timers`.

C frees the timer node after the callback. JS unlinks and drops the object. If a callback `start_timer`s a new due element at the head, C’s `while` sees it on the next iteration (`timer_base` is always the current head). JS same (`g._timer_base` re-read). Do not snapshot the whole list.

`goto_level` `obj_delivery(TRUE)` at C `:1978` remains after this call. A stairs-dest object delivered there that is already due would wait until EOT `nh_timeout`. That is C’s order. JS already matches. A private canary that needs TRUE-delivery rot on the same turn as arrival would be a C dump of `:1823` vs `:1978`, not a reason to double-call `run_timers`.

C `timeout_funcs` also stores a `cleanup` pointer (`cleanup_burn` for BURN_OBJECT). `run_timers` does **not** call cleanup — that is `stop_timer` / `clear_timers`. This SHA only adds the expire loop. Do not invent cleanup at `:1823`.

`moves` at arrival is the dest clock after `getlev` catchup. C compares `timeout <= svm.moves`. JS `game.moves | 0`. If JS `moves` lagged the dest, due timers would wait; if it led, they would fire early. Catchup is pre-existing `getlev_catchup_monsters` / restore — not this SHA. Cohort exact lengths say the comparison did not newly fire on the public path.

D-1037 already named that invent/migrating stay on `timer_base`. This SHA is the C caller that makes that fact observable at arrival. Do not re-open D-1037 as a FAIL peel.

## Actionable C-wrongs

None that Must-fix this next iter. The Open `goto_level` caller matches `:1823`.

Named omits / do-nots (map, not new prepends):

1. REVIVE_MON / ZOMBIFY_MON `timeout_funcs` arms (dequeue without callback).
2. `notice_mon_off` / cmd.c wiz-level-change.
3. Do not add a second `run_timers` after `obj_delivery(TRUE)`. Do not invent a RANGE_LEVEL peel for invent/migrating. Do not restore the skip of this call.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now runs the existing `run_timers` after delivery and genocide wipe, so due dest/delivered timers fire before collide.
- Must-fix stays empty for this SHA; archive hash `cc7d0ef5`. Not REVIVE, not `notice_mon_off`.
