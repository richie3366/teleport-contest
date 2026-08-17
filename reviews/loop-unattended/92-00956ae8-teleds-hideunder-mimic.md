# Review 92 — 00956ae8 — teleds hideunder / mimic m_ap_type (D-1131)

## Metadata
- Full / short hash: `00956ae8487f0032bffe1ca56405ea8d06fc761c` / `00956ae8`
- Parent: `6dd7a794` (D-1130). This file audits **this SHA only**. Archive row **Addressed:** D-1131 `00956ae8` was filled by D-1132.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 03:49:25 +0200
- D-id: **D-1131**
- Stats: 11 files, +144 / −67 — `js/mon.js` +30 / −12 (`hideunder` youmonst + `is_pool`/`is_lava`/`couldsee`); `js/teleport.js` +26 / −11 (call after utrap clear).
- Claims to close: Open queue `teleport.c` `teleds` `hideunder` / mimic (named). Not swallow `docrt`. Review **82** named omit 4; D-1130 next-port. `reviews/loop-2026-08-15/` has no open hideunder Must-fix.
- JS / map: `teleport.js` `teleds`; `mon.js` `hideunder`. `c-js-map/turns.md` teleport + mon. `can_hide_under_obj`, cockatrice, You_see, `set_ustuck`, swallow `docrt` still named.
- Prior reviews this SHA claims to close: **82** named hideunder/mimic; **91** named next Open.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so landing re-runs hideunder(&youmonst) and a failed hide on S_MIMIC clears m_ap_type to M_AP_NOTHING, instead of leaving disguise or stale u.uundetected from the origin.”

Old JS `teleds` commented `set_ustuck / hideunder / swallow docrt deferred` after clearing utrap. C `teleport.c:487–496` `reset_utrap(FALSE)`, `set_ustuck(NULL)`, save `ux0/uy0`, then `hideunder(&youmonst)` **at the origin** (before `u_on_newpos`). Failed hide + `mlet == S_MIMIC` assigns `m_ap_type = M_AP_NOTHING` — not `seemimic`. `mon.c` `hideunder` (`:4726–4801`) already existed for monsters; the youmonst path (`u.uundetected` + `newsym` when the flag changes) was skipped, and eel/concealer used typ macros + `cansee` instead of `is_pool`/`is_lava`/`couldsee`.

The diff **does** the teleds call (after the utrap clone, before `drag_ball`), the mimic `M_AP_NOTHING` arm, youmonst `u.uundetected`+`newsym`, and the eel/concealer predicate swap. It does **not** pull `set_ustuck`, swallow `docrt`, `can_hide_under_obj`, cockatrice corpse skip, pet `cursed_object_at`, or You_see. Named. It does **not** pull buried-ball (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` hideunder + mimic | C body, **new** | `teleport.c:493–496` |
| `hideunder` | C callee, **rewritten** | `mon.c:4726–4801`; was monster-only newsym |
| youmonst `u.uundetected` | C arm, **new** | `is_u` writes hero flag + shared `newsym` |
| eel `is_pool` + `couldsee` | C predicate, **rewritten** | was POOL/MOAT/WATER + `cansee` |
| concealer `!is_pool && !is_lava` | C predicate, **rewritten** | ≡ `!is_pool_or_lava` (`dbridge.c:77–83`) |
| `M_AP_NOTHING` | C assign, **new** | not `seemimic` |
| `can_hide_under_obj` | C predicate, **named omit** | any pile object hides |
| cockatrice corpse walk | C loop, **named omit** | `mon.c:4767–4772` |
| You_see / pet cursed | C arms, **named omit** | youmonst You hide is C `#if 0` |
| `set_ustuck` / swallow `docrt` | C arms, **named omit** | live Open swallow |
| eel `Underwater` | C macro, **clone** | still sticky `u.Underwater` not `u.uinwater` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. `WT_TOOMUCH_DIAGONAL` in the import line is the existing mon.js constant, not a DIAG gate.

**New RNG on this path:** none in `hideunder` (no `rn2`). Mimic arm is a store. `seemimic` RNG is **not** invoked — that is the C assign.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Origin `u.ux`/`u.uy` before `u_on_newpos` is the live cell, not a session coordinate. Contest Rule #2: dynamic `import('./mon.js')` is cycle-breaking. Do not call `seemimic` on the failed-hide mimic arm. Do not pull swallow `docrt` into this SHA. Do not restore typ macros for eel/concealer.

## C ↔ JS fidelity

### Caller order

C `teleport.c:487–496`:

```
reset_utrap(FALSE);
was_swallowed = u.uswallow;
set_ustuck((struct monst *) 0);
u.ux0 = u.ux; u.uy0 = u.uy;
if (!hideunder(&gy.youmonst) && gy.youmonst.data->mlet == S_MIMIC)
    gy.youmonst.m_ap_type = M_AP_NOTHING;
```

JS `1230–1244`: save `ux0/uy0`; `u.utrap=0; u.utraptype=0` (pre-existing `reset_utrap(FALSE)` clone, messages deferred — C `reset_utrap` with `msg==FALSE` is `set_utrap(0,0)` only, `trap.c:1045–1057`); **no** `set_ustuck` (named); `hideunder(game.youmonst)`; failed + `mlet === 'S_MIMIC'` → `m_ap_type = M_AP_NOTHING`. Hide runs **before** `drag_ball` / `u_on_newpos`, so it sees the origin, matching C. `mlet` string `'S_MIMIC'` is this port’s table (same as `hide_monst` / restrap). Match on the Open line minus named `set_ustuck`.

`reset_utrap` before hide matters: `hideunder` refuses when `u.utrap` or a non-pit `t_at`. Clearing first lets a pit-trapped hero hide if C would. JS clone matches C `msg==FALSE`.

### `hideunder` youmonst + eel / concealer

C `mon.c:4733–4801`: `is_u` uses `u.ux/u.uy`; ustuck skip; utrap or non-pit trap skip; eel `is_pool && !Is_waterlevel && (!Underwater || !couldsee)`; concealer `hides_under && objects[x][y] && can_hide_under_obj && (!mtame || !cursed_object_at) && !is_pool_or_lava` then cockatrice walk; youmonst writes `u.uundetected`; **both** is_u and monster `newsym` when the flag changes.

JS `1781–1816`: same `is_u` coords; same ustuck / utrap / non-pit skips; eel `is_pool` + `!Is_waterlevel` + `couldsee` (D-1090 drawbridge-under); concealer `objects_at && !is_pool && !is_lava` (≡ `is_pool_or_lava`); youmonst `u.uundetected`; shared `newsym` when flag changes. `is_pool`/`is_lava` are the D-1090/D-1077 helpers, not POOL/LAVAPOOL macros. Match on the Open youmonst + predicate swap.

Named skips in the concealer arm: `can_hide_under_obj` (any object hides), cockatrice corpse walk (hero without Stone_resistance can hide under a cockatrice-only pile), pet `cursed_object_at`. D-log named them. You_see is monster-only in live C; youmonst feedback is `#if 0`.

`objects_at(x,y)` is this port’s pile head (C `svl.level.objects[x][y]`). A truthy pile plus not pool/lava sets `undetected` without walking `nexthere` for cockatrice — the named skip. Pit `t_at` does **not** block hide (`is_pit` is the C exception); a TELEP or rust trap does. JS `t && !is_pit(t.ttyp)` matches `mon.c:4738–4741`. `Is_waterlevel(u.uz)` uses the same dungeon helper hide_monst already called.

### Callers of `hideunder`

C: `teleds` (youmonst); `hide_monst` / eel `m_move` / makemon concealer (monsters). This SHA adds the youmonst caller only. `monmove.js` still has a parallel local for postmov (header comment). That local is **not** this helper; do not treat D-1131 as a close of postmov hide. `hide_monst` already imported `hideunder` and now gets youmonst `newsym` + `is_pool` for free — monster eel/concealer on level-return also stop using typ macros. That is in-envelope for the helper rewrite, not a second cluster.

Guard: C always calls `hideunder(&youmonst)` with no extra `if`; JS same (early `if (!mtmp?.data) return false` if `youmonst` is missing — C youmonst always has `data`).

### Underwater clone (C-wrong, not the Open line)

C `youprop.h:279`: `#define Underwater (u.uinwater)`. D-1056 already QUALITY-RISK’d dosit for sticky `u.Underwater`. This SHA rewrote the eel arm and **commented** `(!Underwater || !couldsee)` but still evaluates `u.Underwater`. That field is unset; `!(u.Underwater)` is always true, so the `couldsee` conjunct never gates. A youmonst eel with `u.uinwater` set who `couldsee` their cell would hide in JS and not in C.

That is a **clone that diverges**, in an arm this SHA touched. It is **not** a miss of the Open hideunder **call** or the mimic `M_AP_NOTHING` store. Same class as review **86** Blind youprop in `dowatersnakes`: remaining youprop clone, poly-eel + underwater teleds **public-unhit**. Do not Must-fix it ahead of `tele()` / teledest. Map / later Open, not this next iter.

### Callees are not stubs

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `hideunder` returns the boolean C uses. Failed mimic drops `m_ap_type` only. youmonst `newsym` now fires. `is_pool`/`is_lava`/`couldsee` are real.

`set_ustuck` is the named omit. For `hideunder(&youmonst)`, C’s `mtmp == u.ustuck` is youmonst vs the engulfer — they are never equal — so skipping `set_ustuck` does **not** change the youmonst hide predicate. Swallow `docrt` (`teleport.c:498–504`) is a different arm (live Open).

## Hallucinations / overclaim

D-log / CURRENT / subject say landing re-runs `hideunder(&youmonst)` and a failed S_MIMIC hide clears `m_ap_type`, instead of leaving disguise or stale `u.uundetected`. That is the hunk: the call at origin after utrap clear, `M_AP_NOTHING`, youmonst flag+newsym, `is_pool`/`is_lava`/`couldsee`. They name `can_hide_under_obj`, cockatrice, You_see, swallow `docrt`. Stamping **Addressed:** D-1131 is fair for the Open **call + mimic assign**. Hash `00956ae8` is on the archive row (filled by D-1132). Do **not** stamp it as a close of `can_hide_under_obj` or swallow `docrt`. Do **not** read the eel comment as a close of Underwater youprop.

## Density

One C call site plus the youmonst / predicate envelope that call made load-bearing. Not “finish mon.c hiding.” Buried-ball left named. ~30+26 JS. Right size (§2b).

## Verification

Journal: private canary **47**/47 (human/garter/python/mimic/eel; pit vs non-pit; lava/pool/drawbridge; waterlevel; Underwater couldsee; origin-vs-dest cover; reset_utrap-before-hide; mimic keeps mappearance; swallow flag left; source order); green+strict seed8000/0900; cohort **22**/22 including 0012 vault + 0004 scroll + 0007 snake + 0009 swim + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on poly-hider / mimic teleds. This audit’s full `sessions` (cadence **#1440**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:487–496`, `mon.c:4726–4801`, `dbridge.c:77–83`, `youprop.h:279`; JS `teleport.js:1230–1244`, `mon.js:1781–1816`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| human, no object | `hideunder` false; no mimic assign | **same** |
| concealer + object, not pool/lava | `u.uundetected`; newsym if changed | **same** minus named obj filter |
| failed hide + S_MIMIC | `m_ap_type = M_AP_NOTHING` | **same** (not seemimic) |
| eel + pool + !waterlevel | hide unless Underwater&&couldsee | **couldsee** wired; Underwater still sticky |
| hide at dest | C uses origin `u.ux` | **same** (before `u_on_newpos`) |
| swallow `docrt` | if was_swallowed | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call + mimic assign match `teleport.c:493–496`. youmonst `newsym` matches `mon.c:4799–4800`.

Remaining C-wrong (map / later Open, not Must-fix):

1. `hideunder` eel `Underwater` must be C `youprop.h:279` `u.uinwater`, not sticky `u.Underwater`. This SHA rewrote the arm and left the dead field. Do not steal the next cluster from `tele()` / teledest for a public-unhit poly-eel.

Named omits / do-nots (map / Open, not Must-fix):

2. `can_hide_under_obj` / cockatrice walk / pet `cursed_object_at` (`mon.c:4756–4772`).
3. `teleds` `set_ustuck` / swallow `docrt` (`teleport.c:488–504`). Live Open swallow.
4. `teleds` `buried_ball_to_punishment` — **Addressed:** D-1132 `a8d04dd2` (next SHA).
5. Do not restore the hideunder skip. Do not `seemimic` on failed hide. Do not restore POOL/LAVAPOOL typ macros. Do not pull vault_guard into this SHA.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: `teleds` now calls real `hideunder(&youmonst)` at the origin after utrap clear and drops a failed mimic disguise to `M_AP_NOTHING`, with youmonst `newsym` and `is_pool`/`is_lava`/`couldsee`, while the rewritten eel arm still reads sticky `u.Underwater` and `can_hide_under_obj` stays named.
- Must-fix stays empty for this SHA; next port popped Open `teleds` `buried_ball_to_punishment`. **Addressed:** D-1132 `a8d04dd2`. Not Punished `unplacebc`.
