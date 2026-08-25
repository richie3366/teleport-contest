# Review 456 — 4722df06 — trap.c untrap door force + has_magic_key (D-1495)

## Metadata
- Full / short hash: `4722df067aaddca7337a3c3df648cfe9c7153a76` / `4722df06`
- Parent: `27a1f4b6` (D-1494). This file audits **this SHA only** (second of ten `js/` commits since review **454**). Archive **Addressed:** D-1495 `4722df06` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 19:36:18 +0200
- D-id: **D-1495**
- Stats: 12 files, +213 / −54 — `js/trap.js` +83 / −18; `js/artifact.js` +42 / −2.
- Claims to close: Must-fix review **449** item 2 (`invoke_untrap` vs stub `untrap` always 0). Not floor `disarm_*`. `reviews/loop-2026-08-15/` has no unpaid untrap Must-fix.
- JS / map: `trap.js` `untrap`; `artifact.js` `is_magic_key` / `has_magic_key`. `c-js-map/turns.md` + `data.md`.
- Prior reviews this SHA claims to close: **449** QUALITY-RISK item 2 (dispatch to a stub that ignored `force`).

## Intent vs deliverable

Git subject promises: Master Key invoke can keep cost when a door is found or disarmed instead of always refunding a stub that ignored `force`.

Pinned C `trap.c` `untrap` `:5848–6096`. `force` is true for `#invoke`; else `has_magic_key(&youmonst)` sets it (`:5865–5868`). Usual case `getdir` (`:5870–5875`). Door envelope `:6045–6095`: non-door + `!trap_skipped` → “no traps there”; exact `D_NODOOR`/`D_ISOPEN`/`D_BROKEN` return 0; find `D_TRAPPED && (force || (!confused && rn2(MAXULEV-ulevel+11)<10)) || (!force && confused && !rn2(3))`; `ynq("Disarm it?")`; fail `!force && (confused || Fumbling || rnd(75+level_difficulty()/2)>ch)` then `b_trapped` + `unblock_point`; else clear `D_TRAPPED` + `more_experienced(8,0)` + `newexplevel`. Untrapped door still `return 1` (“find no traps”). Caller `artifact.c` `invoke_untrap` `:1838–1845` refunds `age=0` only when `untrap` is false. Helpers `is_magic_key` `:2774–2786`, `has_magic_key` `:2789–2803`.

Old JS: `void force`; door arm `return 0`. Invoke always refunded.

The diff **does** wire `has_magic_key`→`force`, the door switch, trapped find/disarm with `force` skipping `rn2`/`rnd`, and export the two Key helpers. It **does not** port floor `disarm_*`, `untrap_box`, box `ynq`, `can't reach` pline, or mimic stumble. Named. It **does not** re-point `lock.js`’s `is_magic_key` stub (`return false`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `untrap` door find/disarm | C `:6051–6095`, **LIVE this SHA** | force skips luck RNG |
| `has_magic_key` → force | C `:5865–5868`, **LIVE** | |
| `is_magic_key` / `has_magic_key` | C `:2774–2803`, **LIVE export** | |
| `invoke_untrap` | C `:1838–1845`, **already LIVE** | refund only if 0 |
| `getdir` | C, **LIVE** `lock.js` | |
| `yn_function` | C `ynq` `hack.h:1330`, **LIVE** | C def `'q'`; JS `'n'` — both `!= 'y'` |
| `exercise` / `Fumbling` | C, **LIVE** `attrib.js` | |
| `b_trapped` | C, **LIVE** same file | |
| `more_experienced` / `newexplevel` | C, **LIVE** `exper.js` | |
| `add_damage` / `in_rooms` | C, **LIVE** | |
| `recalc_block_point` | **CLONE** of C `unblock_point` | `unblock_point` **NOT FOUND** in `js/` |
| `can_reach_floor` | C, **LIVE** | used only to skip |
| `Confusion` | C `youprop.h:84`, **CLONE this SHA** | `HConfusion` only |
| `Hallucination` | C `:120`, **CLONE trap.js sticky** | not `display.js` export |
| `Role_if` | C, **CLONE** `urole.mnum` | |
| `Blind` | C, **CLONE** sticky `u.Blind` | NODOOR feel/see |
| floor `disarm_*` / `help_monster_out` | C `:5965–5990`, **OMIT named** | JS `return 0` |
| `untrap_box` | C `:5878–5880`, **OMIT named** | JS container `return 1` no-op |
| `lock.js` `is_magic_key` | C `lock.c`, **STUB** `return false` | pre-existing; not re-pointed |

`node scripts/sym.mjs` (this SHA’s new exports + callees; `void force` deleted):

```
untrap           js/trap.js:5056   ASYNC
invoke_untrap    NOT EXPORTED — 1 LOCAL js/artifact.js:1140
is_magic_key     js/artifact.js:1561   sync
             !! ALSO 1 LOCAL CLONE js/lock.js:201 — IMPORT the export
has_magic_key    js/artifact.js:1577   sync
Confusion        NOT EXPORTED — 5 LOCAL CLONES (trap.js:3789 …)
Hallucination    js/display.js:290   sync  (+ do_name.js)
             !! ALSO 8 LOCAL CLONES — IMPORT the C-locus one
can_reach_floor  js/engrave.js:337   sync
b_trapped        js/trap.js:2597   ASYNC
Fumbling         js/attrib.js:778   sync
yn_function      js/getline.js:776   ASYNC
Role_if          NOT EXPORTED — 21 LOCAL CLONES
exercise         js/attrib.js:167   sync
more_experienced js/exper.js:246   sync
newexplevel      js/exper.js:269   ASYNC
recalc_block_point js/vision.js:196   sync
unblock_point    NOT FOUND in js/**
add_damage       js/shk.js:758   sync
in_rooms         js/hack.js:1132   sync
getdir           js/lock.js:331   ASYNC
dountrap         js/trap.js:5156   ASYNC
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG (non-force only):** find `rn2(MAXULEV - ulevel + 11)`; confused `!rn2(3)`; fail `rnd(75 + trunc(level_difficulty()/2))`. Invoke `force==true` consumes **none** of those. Public fortress does not `#invoke` the Key.

## C ↔ JS fidelity

Force. C `:5867–5868` `if (!force && has_magic_key(&youmonst)) force = TRUE`. JS same import. Invoke passes `true`, so the walk is redundant there and **does** apply to `#untrap` / `dountrap`. **Match.**

Getdir / autounlock / container. C `:5870–5885`. JS getdir cancel → 0. Container → `return 1` **without** `untrap_box`. Named. `rx` set → `autounlock_door`. **Match structure;** box body omitted. JS `lock.js` does not yet call `untrap` (C `lock.c:480` / `:611`).

Floor. C `:5904–6028` `can_reach_floor` then `disarm_*` / boxes / mimic. JS: if seen `ttmp` and can reach, **`return 0`**; if cannot reach, `trap_skipped=true` with **no** “can't reach” pline. Named. Invoke at a seen landmine therefore **still refunds** (`untrap` false). Door-adjacent invoke with no floor trap never hits this.

Door mask. C `:6045–6061` `!IS_DOOR` then exact `D_NODOOR`/`ISOPEN`/`BROKEN`. JS same; `D_LOCKED|D_TRAPPED` falls through. **Match.** `Blind()` for feel/see uses trap.js sticky `u.Blind` (pre-existing clone). Display-only.

Find. C `:6063–6065` vs JS `(trapped && (force || (!confused && rn2(...) < 10))) || (!force && confused && !rn2(3))`. **Match, call-for-call**, including force short-circuit (no `rn2`). Untrapped + force → “find no traps on the door.” `return 1`. **This is the keep-cost path review 449 required.**

Disarm. C `ynq` (`hack.h:1330` def `'q'`). JS `yn_function(..., 'ynq', 'n')`. At this site both `!= 'y'` → `return 1` (keep cost, no disarm). **Match for invoke.** `ch = 15 + (Rogue ? ulevel*3 : ulevel)`; `exercise(A_DEX)`. Fail: `!force && (confused || Fumbling || rnd(...) > ch)` then `b_trapped('door', FINGER)`, `D_NODOOR`, vision, shop `add_damage(x,y,0)`. Success: `mask & ~D_TRAPPED`, `more_experienced(8,0)`, `newexplevel`. **Match `:6070–6091`.** Force never rolls fail `rnd`. **Match.**

`unblock_point`. C `vision.c:899` updates one cell. JS `recalc_block_point` voids coords and `vision_reset()`. Coarser, same “door is open to LOS” intent. Not a mask/RNG contradiction.

`is_magic_key`. C: art check; hero `Role_if(PM_ROGUE)` vs `mon->data == &mons[PM_ROGUE]`; rogue `!cursed`; else `blessed`. JS same with `mndx === PM_ROGUE`. C `mon==NULL` means **non-rogue** (comment `:2775`). JS `!mon` → `isHero` → `Role_if`. `has_magic_key` always substitutes `youmonst` first, so the live caller matches. Do not pass `null` into the export the way C’s comment allows.

`has_magic_key`. C `nxtobj` by Master Key `otyp`. JS walks all invent/`nobj` and filters `is_magic_key`. Same hits. Hero uses `game.invent[]` not a C linked `gi.invent`. Match for carried Key.

`confused`. C `:5860` `Confusion || Hallucination`. JS `Confusion()` is `!!HConfusion` (**match** `:84`). `Hallucination()` in **this file** is sticky `u.Hallucination` **or** H without a full resist check (`display.js:290` is the D-1493 C macro). Under Hallu-resist with sticky set, non-force `#untrap` extra-takes the `!rn2(3)` find and the confused fail. **Force invoke does not read it.** Pre-existing trap.js clone; this SHA newly feeds it into a live door arm.

Callee closure (UNTRAP / door). LIVE: `untrap` door, `getdir`, `yn_function`, `exercise`, `Fumbling`, `b_trapped`, `more_experienced`, `newexplevel`, `add_damage`, `in_rooms`, `has_magic_key`. CLONE: `Role_if`, `Confusion`, `Blind`, `recalc_block_point`. OMIT named: floor `disarm_*`, `untrap_box`, reach pline, mimic. STUB: `lock.js` `is_magic_key` still `return false` (not on the invoke path). **Door arm may ship.** Floor return-0 is an omit, not a silent success stub.

## Hallucinations / overclaim

Subject keep-cost on door find/disarm: **true**. D-log “force skips find `rn2` and fail `rnd`”: **true**. Stamping **Addressed:** D-1495 for **door + Key force** is fair. Do **not** stamp “Match C floor `disarm_landmine`.” Do **not** stamp “Match C `untrap_box`.” Do **not** stamp “Match C `lock.c` `is_magic_key`.” Do **not** treat fortress PASS as Master Key `#invoke`. This is **not** “dispatch ported, callee stubbed” for **doors**. It **is** still a named no-op for floor traps (invoke there still refunds).

## Density

Must-fix one item: the door success path that can return true. +125 `js/` insertions. Floor/box left named. Playbook §2b. Did not glue TAMING. Acceptable.

## Branch-by-branch confirm

1. Invoke, getdir cancel: `untrap` 0 → `age=0` `ECMD_CANCEL`. **Match `:1840–1842`.**
2. Invoke, direction at `D_LOCKED|D_TRAPPED`, answer `y`: no find `rn2`, no fail `rnd`, “disarm it!”, keep `age`, `ECMD_TIME`. **Match. This SHA’s fix.**
3. Invoke, same door, answer `n`/`q`/ESC: `return 1`, keep cost, trap remains. **Match `:6068–6069`.**
4. Invoke, closed door **not** `D_TRAPPED`: “find no traps”, `return 1`, keep cost. **Match `:6092–6094`.**
5. Invoke, `D_ISOPEN` / `D_BROKEN` / `D_NODOOR`: `return 0`, refund. **Match `:6052–6060`.**
6. `#untrap` carrying blessed (or rogue noncursed) Key: `force=true`, same luck-skip. **Match `:5865–5868`.**
7. `#untrap` no Key, not confused, trapped door: `rn2(MAXULEV-ulevel+11)<10` to find. **Match `:6063–6064`.**
8. `#untrap` no Key, fail `rnd > ch`: `b_trapped`, `D_NODOOR`. **Match `:6073–6082`.**
9. Seen floor trap + `can_reach_floor`: JS `return 0` (refund invoke). C `disarm_*`. **Named omit.**
10. Container `untrap(..., otmp)`: JS `return 1` without `untrap_box`. **Named.** C `lock.c` autounlock not wired in JS.
11. **Public-unhit.**

## Callers / RNG ledger

C: `invoke_untrap` / `dountrap` / `lock.c` autounlock. JS: invoke + `dountrap` only. Dice as above; invoke consumes none.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE/DIAG. `MAXULEV - ulevel + 11` is C’s find expression, not a seed index.

## Verification

D-log: private canary **15**/15 (C grep; bless/curse Key; invoke trapped door + `y` `ECMD_TIME` keep age; decline still TIME; getdir cancel refund; untrapped door return 1 no `rn2`; empty floor named 0; `#untrap` with Key force; Rule #2). That canary **does** hit the keep-cost door. It does **not** claim floor disarm or `lock.js` magic pick. Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.**

## Actionable C-wrongs

None that belong on Must-fix. The cited stub (`void force`; door `return 0`) is gone. Remaining named (map / Open): floor `disarm_*` / `cnv_trap_obj` / squeaky / pit `help_monster_out`; `untrap_box`; reach pline; mimic; `lock.js` `is_magic_key` still `return false` — import `artifact.js` (do not write clone #3). Clone debt (not this peel): trap.js `Hallucination` sticky vs D-1493 `display.js` (non-force confused only); `unblock_point` missing (vision_reset stand-in); C `is_magic_key(NULL)` non-rogue vs JS `!mon` hero.

Do not Must-fix “ynq default `'q'` vs JS `'n'`” at this `!= 'y'` site. Do not Must-fix “invoke should have waited for floor disarm.” Do not Must-fix “two `is_magic_key` exports.”

Verdict: **ACCEPT-WITH-DEBT**
