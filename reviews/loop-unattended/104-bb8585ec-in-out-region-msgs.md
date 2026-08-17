# Review 104 — bb8585ec — in_out_region enter_msg / leave_msg (D-1143)

## Metadata
- Full / short hash: `bb8585ecfad55892e07bc3bb708c60cc0eb7792b` / `bb8585ec`
- Parent: `52194cc9` (D-1142). This file audits **this SHA only**. Archive row **Addressed:** D-1143 `bb8585ec` was filled by D-1144.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 07:00:03 +0200
- D-id: **D-1143**
- Stats: 11 files, +133 / −56 — `js/region.js` +17 / −6 (async `pline` after clear/set); `js/teleport.js` +23 / −23 (`teleok` async + await at four callers).
- Claims to close: Open queue `region.c` `in_out_region` enter_msg / leave_msg (named). Not `update_player_regions`. Review **91** named enter/leave; **80** named msgs. `reviews/loop-2026-08-15/` has no open enter_msg Must-fix.
- JS / map: `region.js` `in_out_region`; `teleport.js` `teleok` / `safe_teleds` / `scrolltele` / `tele_to_rnd_pet` / `vault_tele`. `c-js-map/turns.md` region + teleport. `create_msg_region` `#if 0`, force-field callbacks, `hack.c:2867` / `dothrow.c` / `do.c` callers, geometric gas bit still named.
- Prior reviews this SHA claims to close: **91** named omit of msgs; **80** named `enter_msg`; D-1142 next-port.

## Intent vs deliverable

Git subject promises: “Match C region.c in_out_region so a non-NULL leave_msg/enter_msg runs pline1 after clear/set_hero_inside (teleok awaits), instead of skipping those messages.”

Old JS `in_out_region` updated `REG_HERO_INSIDE` and ran can_enter/leave then enter/leave callbacks, but skipped C `pline1(leave_msg)` / `pline1(enter_msg)`. C `region.c:502–523`: on leave, `clear_hero_inside` then `if (leave_msg != 0) pline1(leave_msg)` then `leave_f`; on enter, `set_hero_inside` then `pline1(enter_msg)` then `enter_f`. `hack.h:1026` `pline1(cstr)` is `pline("%s", cstr)`. Live gas never sets those pointers (`create_msg_region` `region.c:954–973` is `#if 0`).

The diff **does** await `pline` after clear/set when the field is non-null, and makes `teleok` async so `--More--` can nest like C. All `teleport.js` `teleok` sites await (`safe_teleds` 40× + candy backup, `scrolltele` getpos, `tele_to_rnd_pet`, `vault_tele`). Grep of `js/`: no other `teleok(` callers. It does **not** compile in `create_msg_region`. Named. `teleds` still uses `update_player_regions` (D-1130), not this callee, to rewrite bits after discarded probes.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `in_out_region` leave/enter `pline1` | C body, **new** | `region.c:505–506, 519–520` |
| `in_out_region` async | JS analog of C `pline` | `--More--` at nhgetch |
| `teleok` async | C callee, **awaited** | `teleport.c:442`; all JS callers in-module |
| `pline` | C `pline1`, **imported** | string, not printf `%s` twice |
| can_enter / leave_f / enter_f | C body, **untouched** | still after the new plines |
| `create_msg_region` | C `#if 0`, **named omit** | live gas NULL msgs |
| `hack.c` / `dothrow.c` / `do.c` | C callers, **named omit** | walk / hurtle / `goto_level` |
| `update_player_regions` | C sibling, **untouched** | `teleds` dest bits (D-1130) |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the plines. Gas still NULL. Discarded `teleok(TRUE)` probes would print if a restored region had msgs (C does too). Path **public-unhit** (`create_msg_region` compiled out).

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: `await pline` is the existing display boundary, not a second gameplay `nhgetch`. Do not leave a sync `teleok` caller holding a Promise (always truthy). Do not flip geometric `is_hero_inside_gas_cloud` in this SHA. Do not treat `teleds` as using `in_out_region` (it uses `update_player_regions`).

## C ↔ JS fidelity

### leave then enter order

C `region.c:498–526`:

```
if (hero_inside && !inside_region(reg, x, y)) {
    clear_hero_inside(reg);
    if (leave_msg != 0) pline1(leave_msg);
    if (leave_f != NO_CALLBACK) callbacks[leave_f](...);
}
if (!hero_inside && inside_region(reg, x, y)) {
    set_hero_inside(reg);
    if (enter_msg != 0) pline1(enter_msg);
    if (enter_f != NO_CALLBACK) callbacks[enter_f](...);
}
```

JS `region.js:284–305`: same two loops, `attach_2_u` continue, `leave_msg != null` then `await pline`, then `leave_f`; enter analog. Empty string is non-NULL in C and non-null in JS (both would pline). `undefined` is skipped (`!= null`). Match the Open **msgs**.

First loop (can_enter/leave reject) is unchanged: reject **before** any clear/set/msg. Gas `NO_CALLBACK` never rejects. Match.

### `pline1` vs `pline`

C `pline1` uses `"%s"` so a message containing `%` is literal. JS `display.js` `pline(msg)` prints the string; it is not a printf. Match for region strings.

### `teleok` async

C `teleok` is a boolean that calls `in_out_region` last (`teleport.c:438–444`). JS was already calling it (D-1119); this SHA `await`s it. Callers:

- `safe_teleds`: 40× `rnd(COLNO-1)`/`rn2(ROWNO)` then candy; first trap backup `teleok(..., true)` — all awaited.
- `scrolltele` controlled getpos.
- `tele_to_rnd_pet` 3×3.
- `vault_tele` `somexyspace`.

`tele()` → `scrolltele(null)` already async. No `js/` file other than `teleport.js` calls `teleok`. A missed `if (teleok(...))` would treat a Promise as true and teleport onto a rejected cell — that bug is **not** in this tree.

Walk `hack.c:2867`, `hurtle_step` `dothrow.c:787`, `goto_level` `do.c:1981` still do not call JS `in_out_region`. Named.

### Side effect on discarded probes

C `teleok` mutates `REG_HERO_INSIDE` (and would pline) even for candidates `safe_teleds` then discards. JS same after this SHA. `teleds` then `update_player_regions` rewrites bits from the dest cell (D-1130). Do not Must-fix that as a new miss — it is C.

JS leave/enter (HEAD `region.js:284–304`):

```
if (hero_inside(reg) && !inside_region(reg, x, y)) {
    clear_hero_inside(reg);
    if (reg.leave_msg != null) await pline(reg.leave_msg);
    /* leave_f */
}
if (!hero_inside(reg) && inside_region(reg, x, y)) {
    set_hero_inside(reg);
    if (reg.enter_msg != null) await pline(reg.enter_msg);
    /* enter_f */
}
```

`callback_set` / `invoke_region_cb` after the pline matches C’s `f_indx != NO_CALLBACK` then `callbacks[f_indx]`. Gas `enter_f`/`leave_f` stay `NO_CALLBACK`. `m_in_out_region` (`region.js:333`) is unchanged and still has no msgs — C monster analog also has no hero `pline1`.

`safe_teleds` 40× `teleok(FALSE)` then candy: each await can nest `--More--` if a restored save ever had msgs. Public gas clouds never set them. `scrolltele` wizard/Teleport_control getpos is the other public-ish probe; still NULL msgs.

Header comment in `region.js` previously listed enter/leave pline as deferred; this SHA rewrote that to `#if 0` `create_msg_region` never sets the strings in live C. Honest.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Making `teleok` async without awaiting would be a C-wrong (Promise truthy); every in-tree call awaits.

## Hallucinations / overclaim

D-log / CURRENT / subject say a non-NULL leave_msg/enter_msg runs `pline1` after clear/set, `teleok` awaits, instead of skipping those messages. That is the hunk. They **name** `#if 0` `create_msg_region` so live gas never sets the strings. Stamping **Addressed:** D-1143 is fair for the Open **pline sites**. Hash `bb8585ec` is on the archive row (filled by D-1144). Do **not** stamp it as “gas now prints enter/leave” or “walking runs `in_out_region`.” This is **not** “Match C dispatch, callee is a stub”: `pline` is real; the pointers are NULL in vanilla, which is also C.

## Density

Two `pline1` sites in one C function, plus the async conversion of `teleok` and its in-module callers so `--More--` can nest. Small (~40 JS lines) but one family — not a second hypothesis, not “finish region.c.” Playbook §2b “too small” is waste, not a C-wrong.

## Verification

Journal: private canary **40**/40 (empty; leave/enter pline+bit; stay in/out silent; NULL no pline; attach_2_u skip; can_enter reject before msg; leave_f/enter_f after pline; leave-then-enter concat; already-in no enter; thenable); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0367 Pri ^T + 0004 scroll + 0009 swim + 0360/0373/4500/2200 + strict 0012/0367/0004/0360/4500/2200/0030/0009/0002. Path **public-unhit**. This audit’s full `sessions` (cadence **#1455**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression (`teleok` await did not desync `safe_teleds` / scrolltele).

C read of `region.c:479–527`, `hack.h:1026`, `teleport.c:420–445`; JS `region.js:258–307`, `teleport.js:1151–1178` + await sites. Hunk grepped FORCE/fs/seed. Repo grep `\bteleok(` only `teleport.js`.

| Case | C | JS after |
|------|---|---------|
| non-NULL leave then enter | pline1 after clear/set | **same** |
| NULL msgs | skip pline | **same** |
| can_enter reject | no msg | **same** |
| live gas | NULL (`#if 0`) | **same** |
| walk / hurtle / goto_level | `in_out_region` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open `pline1` sites match `region.c:505–506, 519–520`. `teleok` callers in JS all await.

Named omits / do-nots (map / Open, not Must-fix):

1. `create_msg_region` (`region.c:954–973` `#if 0`).
2. Force-field enter/leave callbacks (also `#if 0` in live C).
3. `hack.c:2867` / `dothrow.c:787` / `do.c:1981` `in_out_region` callers.
4. Geometric `is_hero_inside_gas_cloud` vs `hero_inside` bit (D-1130 leftover).
5. Do not restore sync `teleok`. Do not skip `update_player_regions` in `teleds`. Do not pull djinni into this SHA — **Addressed:** D-1144 `1c1f7ccb`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `in_out_region` now `pline`s non-NULL leave/enter messages after clear/set and `teleok` awaits that, matching C, while vanilla gas still has NULL strings and walk/hurtle/`goto_level` still skip the callee.
- Must-fix stays empty for this SHA; next port popped Open `djinni_from_bottle` `mongrantswish`. **Addressed:** D-1144 `1c1f7ccb`. Not bottle chance RNG.
