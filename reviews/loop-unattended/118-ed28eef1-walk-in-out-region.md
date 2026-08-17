# Review 118 — ed28eef1 — hack.c walk `in_out_region` (D-1157)

## Metadata
- Full / short hash: `ed28eef1d352f408ba3209ec51201a71b90885de` / `ed28eef1`
- Parent: `a0c7791f` (review **114–117** + cadence #1470). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 13:39:55 +0200
- D-id: **D-1157**
- Stats: 12 files, +129 / −55 — `js/cmd.js` +10 (`domove` await); `js/region.js` +27 / −12 (`is_hero_inside_gas_cloud` bit); `js/teleport.js` comment.
- Claims to close: Open queue `hack.c` walk `in_out_region` (named). Not teleds. Reviews **104** / **107** / **117** named the walk caller so `REG_HERO_INSIDE` can replace geometry in the C helper. `reviews/loop-2026-08-15/` has no open walk-region Must-fix.
- JS / map: `cmd.js` `domove`; `region.js` `in_out_region` / `is_hero_inside_gas_cloud`. `c-js-map/turns.md` `hack.c` `domove`. `dothrow.c` `hurtle_step`, `do.c` `goto_level`, `run_regions` `hero_inside` bit, `m_postmove_effect` youmonst still named.
- Prior reviews this SHA claims to close: **104** named omit 3 (`hack.c:2867`); **107** named walk so the bit can replace geometry; D-1156 next-port.

## Intent vs deliverable

Git subject promises: “Match C hack.c domove in_out_region so walking into or out of a region updates REG_HERO_INSIDE instead of leaving the bit stale.”

Old JS `domove` ran `drag_ball` then occupied `newx,newy` without C `in_out_region(x,y)`. Teleok already awaited the helper (D-1119); teleds uses absolute `update_player_regions` (D-1130), not enter/leave. `is_hero_inside_gas_cloud` still scanned `inside_region` geometry because the bit was stale on steps.

The diff **does** await `in_out_region(newx, newy)` after `drag_ball` and before the second `m_at` / occupy, and flips `is_hero_inside_gas_cloud` to `hero_inside(reg) && inside_f === INSIDE_GAS_CLOUD` (`region.c:1168–1176`). It does **not** wire `dothrow.c:787` `hurtle_step`, `do.c:1981` `goto_level`, `hack.c:2877` `m_postmove_effect(&youmonst)`, or flip `run_regions` hero `inside_f` off geometry. Named. Already in Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domove` `in_out_region(newx,newy)` | C caller, **new call** | `hack.c:2866–2868` |
| `in_out_region` | C callee, **imported** | D-1143; gas `NO_CALLBACK` never rejects |
| `is_hero_inside_gas_cloud` | C callee, **rewritten** | bit, not geometry |
| `hero_inside` / `set_hero_inside` / `clear_hero_inside` | C macros, **pre-existing** | `REG_HERO_INSIDE` |
| `update_player_regions` | C sibling, **untouched** | teleds D-1130 |
| `run_regions` hero `inside_f` | C body, **named omit** | still `inside_region` geometry |
| `hurtle_step` / `goto_level` | C callers, **named omit** | already Open |
| `m_postmove_effect` youmonst | C caller, **named omit** | `hack.c:2877`; already Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none. Gas enter/leave are `NO_CALLBACK`; live `leave_msg`/`enter_msg` are NULL (`create_msg_region` `#if 0`). Path **public-unhit** on a force-field reject (vanilla never installs those callbacks). Walking through existing steam still matches because `NO_CALLBACK` never returns false.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. `newx,newy` are live `ux+dx`, not a traced cell.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not restore geometric `is_hero_inside_gas_cloud`. Do not skip `in_out_region` on a successful walk. Do not `put_bc()` on a false return (C returns before `move_bc` put-down). Do not pull hurtle / `goto_level` / youmonst `m_postmove_effect` into this peel.

## C ↔ JS fidelity

### Call site vs `hack.c:2860–2875`

C `domove_core` after `Punished` `drag_ball`, before the second `m_at` and `u.ux += u.dx`:

```
if (Punished)
    if (!drag_ball(x, y, …))
        return;
if (!in_out_region(x, y))
    return;
mtmp = m_at(x, y);
u.ux += u.dx;
u.uy += u.dy;
m_postmove_effect(&gy.youmonst);
```

`x,y` are the destination (`u.ux+u.dx` after impaired / turbulence). Attack already ran earlier (`domove_attackmon_at` `:2798`). JS `cmd.js:1794–1866`: `drag_ball` then `await in_out_region(newx, newy)` then safemon swap then `u.ux = newx`. Attack is already above (`do_attack` `:1645–1651`). Match the Open **walk** line.

False return: C leaves the hero unmoved and does not `move_bc` put-down. JS `return` without `put_bc()`. Success path still `put_bc()` after occupy (`:1912`). Match.

Swallowed: C still reaches `in_out_region` only if attack did not return. Engulfer `do_attack` almost always returns. JS swallow attacks first; the new call is after that return. Same skip. Not a new C-wrong.

### Callee is not a stub

`in_out_region` (`region.js:453–493` / `region.c:480–527`): attach_2_u skip; can_enter/leave; leave then `clear_hero_inside` + optional `pline1`; enter then `set_hero_inside` + optional `pline1`. Gas `can_enter_f`/`leave_f`/`enter_f`/`leave_f` stay `NO_CALLBACK`. This SHA does not rewrite that body. D-1143 already awaited `pline`. Walk is the missing **caller**.

### `is_hero_inside_gas_cloud` bit

C `region.c:1168–1176`:

```
for (i = 0; i < svn.n_regions; i++)
    if (hero_inside(gr.regions[i])
        && gr.regions[i]->inside_f == INSIDE_GAS_CLOUD)
        return TRUE;
return FALSE;
```

Old JS used `inside_region(reg, u.ux, u.uy)` because walk never set the bit. After this SHA, walk + teleds `update_player_regions` + `make_gas_cloud` dest-set keep the bit on the paths C uses for this helper. Flipping the helper to the bit is C, not a workaround. `run_regions` hero `inside_f` still uses geometry (`region.js:641`); C `:439–441` uses `hero_inside` — that is the Open `run_regions` `hero_inside` bit row, not this walk peel. Review **107** said do not flip **inside_f** to a stale bit; this SHA flipped only the C helper, which is the right split.

`goto_level` / hurtle still skip the callee, so the bit can stay stale on those entries. Named. Already Open. Using C’s bit on the helper is still the faithful port of `:1168`; do not restore geometry as a paper over those missing callers.

### `m_postmove_effect(&youmonst)` is not this cluster

C `:2877` after occupy, before steed mx/my. JS `cmd.js` has **no** youmonst call (monster `m_move` already calls the helper at the old cell). Open `hack.c` `m_postmove_effect` youmonst. Correct split: Hezrou/Steam at `u.ux0` is a different C family than region membership.

### Pet swap vs bit

C occupies (`u.ux += u.dx`) **then** `domove_swap_with_pet` (`:2920–2927`). A refused swap reverts `u.ux = u.ux0` **after** `in_out_region` already mutated the bit. JS mundisplaceable returns after the new call without occupying (`cmd.js:1838–1844`) and still leaves the dest bit set. Same leftover as C’s failed-swap. Success: JS moves the pet to `oldx,oldy` then occupies; C occupies then places the pet on `ux0`. Membership is the dest cell either way.

`teleok` still probes with the same helper (D-1119). A wizard `^T` that does not land is repaired by teleds `update_player_regions`. Walk does not go through `teleok`. Not this peel.

## Hallucinations / overclaim

D-log / CURRENT / subject say walking into or out of a region updates `REG_HERO_INSIDE` instead of leaving the bit stale. **That is the hunk:** one imported await + flip the C helper to the bit. Stamping **Addressed:** D-1157 is fair for the Open **walk** line. Hash `ed28eef1` is on the archive row (filled by D-1158). Do **not** stamp it as “Match C `goto_level` `in_out_region`” or “`run_regions` now uses `hero_inside`.” This is **not** “Match C dispatch, callee is a stub”: `in_out_region` is the real D-1143 function; gas `NO_CALLBACK` never rejects, which is also C.

## Density

One C call site plus the C helper that was waiting on that bit. ~15 JS lines of behavior (comments extra). Thin vs §2b “one deferred `if`,” but the queue item is exactly that wire (not hurtle, not `goto_level`). Callee already had the three-loop body. Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **28**/28 (empty; enter/leave bit; stay in/out; attach_2_u skip; gas never rejects; false return no occupy / no `put_bc`; already-in no enter; thenable); green+strict seed8000/0900; cohort **39**/39 (CURRENT shared + 0014/0383) + isolated strict 0012. Path **public-unhit** on force-field reject. Cadence **#1470** **44**/44 did not need this bit for public steam.

C read of `hack.c:2859–2877`, `region.c:480–527`, `:1168–1176`, `do.c:1981`, `dothrow.c:787`; JS SHA `domove` + rewritten helper. Hunk grepped FORCE/fs/seed. Repo `in_out_region(` now: `cmd.js` walk, `teleport.js` `teleok`. This audit’s full `sessions` (cadence **#1475**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — walk await did not desync green/cohort.

| Case | C | JS after |
|------|---|---------|
| walk into gas | set bit, never reject | **same** |
| walk out of gas | clear bit | **same** |
| stay in / stay out | no bit change | **same** |
| false can_enter | no occupy, no `move_bc` | **same** (vanilla never) |
| `is_hero_inside_gas_cloud` | `hero_inside` bit | **same** |
| `run_regions` hero inside_f | `hero_inside` bit | **named skip** (geometry) |
| hurtle / `goto_level` | `in_out_region` | **named skip** |
| youmonst `m_postmove_effect` | after occupy | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open walk call matches `hack.c:2866–2868`. The helper matches `region.c:1168–1176`.

Named omits / do-nots (map / Open, not Must-fix):

1. `dothrow.c:787` `hurtle_step` `in_out_region`. Open.
2. `do.c:1981` `goto_level` `in_out_region`. Open.
3. `run_regions` hero `inside_f` via `hero_inside` (`region.c:439–441`). Open.
4. `hack.c:2877` `m_postmove_effect(&youmonst)`. Open.
5. Do not restore geometric `is_hero_inside_gas_cloud`. Do not `put_bc` on false. Do not pull selection create into this SHA — **Addressed:** D-1158 `7cc347fc`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `domove` now awaits the real `in_out_region` after `drag_ball` so a walk updates `REG_HERO_INSIDE`, and `is_hero_inside_gas_cloud` reads that bit like C, while hurtle / `goto_level` / `run_regions` inside_f stay named.
- Must-fix stays empty for this SHA; next port popped Open `create_gas_cloud_selection`. **Addressed:** D-1158 `7cc347fc`. Not hurtle.
