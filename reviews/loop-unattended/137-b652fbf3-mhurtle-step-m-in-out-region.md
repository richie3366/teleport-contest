# Review 137 — b652fbf3 — dothrow.c `mhurtle_step` `m_in_out_region` (D-1176)

## Metadata
- Full / short hash: `b652fbf30119ca5648a3053ed7dafdd296e15ccd` / `b652fbf3`
- Parent: `7188da5b` (D-1175). This file audits **this SHA only**. The fix stamped **Addressed:** D-1176 without the short hash; this review commit fills `b652fbf3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 20:26:12 +0200
- D-id: **D-1176**
- Stats: 11 files, +167 / −59 — `js/dothrow.js` +11 / −4 (gate + import); `js/region.js` +65 / −16 (`m_in_out_region` three-loop + `attach_2_m=0`).
- Claims to close: Open queue `dothrow.c` `mhurtle_step` `m_in_out_region` (named). Not hurtle_step. Reviews **126–130** named `dothrow.c:1000` as the monster analog of hero `hurtle_step` `in_out_region`. `reviews/loop-2026-08-15/` has no open mhurtle-region Must-fix.
- JS / map: `dothrow.js` `mhurtle_step`; callee `region.js` `m_in_out_region`. `c-js-map/turns.md` `dothrow.c`. `place_monster` vs `rloc_to`, steed `u_on_newpos`, petrify bump, NODIAG, minliquid, dog_move `m_in_out_region` still named.
- Prior reviews this SHA claims to close: **126** / **127** / **130** named omit; D-1175 next-port.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c mhurtle_step so knocking a monster through a region runs m_in_out_region before place, instead of placing on will_hurtle alone.”

Old JS `mhurtle_step` placed on `will_hurtle` alone. C `:1000` is `will_hurtle && m_in_out_region` before `place_monster`. The JS callee was a one-loop geometric add/remove that **always returned true** (no `attach_2_m` skip, no can_enter/leave). A knock through a region therefore skipped the walk-style gate. `rloc_to` still synced lists after place (D-1161) — that is teleport, not this walk analog. Hero hurtle is D-1165 (`in_out_region`).

The diff **does** rewrite the callee to C’s three loops (skip `attach_2_m == m_id`; can_enter/leave may reject; then leave remove+leave_f; then enter add+enter_f) and wires `will_hurtle && m_in_out_region` (short-circuit: bump/stop does not rewrite lists). Default `attach_2_m = 0` in `make_gas_cloud` (C `create_region`). It **keeps** `rloc_to` as the place (steed `u_on_newpos` named). It does **not** port NODIAG / minliquid / petrify bump / `place_monster` / `goto_level` `obj_delivery`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhurtle_step` gate | C caller, **rewritten** | `dothrow.c:1000`; `&&` short-circuit |
| `m_in_out_region` | C callee, **rewritten** | `region.c:533–576`; was a always-true one-loop |
| `callback_set` / `invoke_region_cb` | JS encoding | live C gas `NO_CALLBACK`; force-field `#if 0` |
| `make_gas_cloud` `attach_2_m=0` | C default, **new** | `create_region`; skip only if `m_id==0` |
| `will_hurtle` | C predicate, **untouched** | `goodpos` IGNOREWATER\|IGNORELAVA |
| `rloc_to` place | C `place_monster`, **named omit** | extra rloc angry/bill/mintrap/region **pre-existed** |
| steed `u_on_newpos` | C arm, **named omit** | JS both branches still `rloc_to` |
| `set_apparxy` / waterwall / HURTLING mintrap | C after place, **partial** | mintrap HURTLING already; apparxy/waterwall named |
| bump petrify / hero touch | C else, **named omit** | still thin wakeup |
| `m_move` `m_in_out_region` | C sibling, **thickened** | already called the JS callee (D-0834) |
| dog_move `m_in_out_region` | C caller, **named omit** | `dogmove.c:1289` / `:1349` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` in this file is the C mintrap flag, not a DIAG gate. Dest `(x,y)` is the live hurtle cell. Rule #2 clean.

**New RNG on this path:** none for live gas (`NO_CALLBACK` never rejects; membership add/remove has no RNG). Path **public-unhit** on knock through a live force field. Cadence fortress is not a can_enter-reject proof. Walk through gas still never rejects — same as old always-true.

Grep of this SHA’s `js/` hunks: no `FORCE` (except pre-existing `FORCEBUNGLE`), `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not place when `m_in_out_region` is false. Do not run the helper when `!will_hurtle` (C `&&`). Do not skip `attach_2_m` in `update_monster_region` (C does not; rloc vs walk). Do not pull `obj_delivery` into this peel.

## C ↔ JS fidelity

### Gate vs `dothrow.c:997–1026`

C:

```
if (!isok(x, y)) return FALSE;
if (will_hurtle(mon, x, y) && m_in_out_region(mon, x, y)) {
    /* place / steed u_on_newpos / flush / delay / set_apparxy /
       waterwall / mintrap(HURTLING) */
    ...
}
/* bump m_at / hero */
```

JS (`dothrow.js:1530–1547`): `!isok` false; `will_hurtle && m_in_out_region` then `rloc_to` (both steed and not — named), `flush_screen(1)`, `nh_delay_output`, `mintrap(HURTLING)`. **`m_in_out_region` is sync** (`export function`, not `async`). A Promise would be always-truthy and would always place — it is a boolean. Match the `&&`. False falls through to the existing thin bump.

C place is `remove_monster` + `place_monster` + `newsym`. JS `rloc_to` is the pre-existing named stand-in (also runs D-1161 `update_monster_region`, shop angry, occupation, trapped `mintrap`). Extra rloc side effects **already ran** on a successful `will_hurtle` before this SHA. Adding the region gate in front does not invent them. End membership after a successful place: `m_in_out_region` enter/leave then `rloc_to` absolute sync — gas `NO_CALLBACK` agrees; enter_f would have fired once then update is a no-op if already listed. Not a double callback. Do not Must-fix `place_monster` onto a queue item that said “Not hurtle_step.”

### Callee vs `region.c:533–576`

C three loops over `gr.regions[i]`:

1. Skip `attach_2_m == mon->m_id`. If dest inside: `!mon_in_region && (f_indx=can_enter_f)!=NO_CALLBACK` then callback may return FALSE. Else if listed: same with `can_leave_f`.
2. Listed and dest not inside → `remove_mon_from_reg` then `leave_f` (return discarded).
3. Not listed and dest inside → `add_mon_to_reg` then `enter_f` (return discarded).
4. return TRUE.

JS (`region.js:554–592`): same three `for (const reg of regs)` with `(reg.attach_2_m|0)===mid` continue; `callback_set(f_indx = can_enter_f ?? NO_CALLBACK)`; `invoke_region_cb`. `NO_CALLBACK` is `-1` (`region.c:13`). Gas `make_gas_cloud` sets enter/leave/can_* to `NO_CALLBACK` — first loop never `need`, never rejects; leave/enter still add/remove. Match live C.

`invoke_region_cb`: numeric index returns true without a table call; a function value is for a canary / `#if 0` force field. Live C gas never has a non-`NO_CALLBACK` can_enter. Named force-field. Not a stub of the **membership** update the Open item named.

`attach_2_m = 0` default: C skip when attached to **this** mon. `m_id==0 && attach==0` skips (C same; canary named it). Ordinary `makemon` ids are non-zero. Old JS one-loop did **not** skip attach — that was the C-wrong this rewrite fixes for walk as well.

Walk `m_move` (`monmove.c:2039–2040`) already called this JS function. Thickening it is the same C callee, not a second subsystem. Gas walk: still never rejects; add/remove now skip `attach_2_m`. Public gas walk membership matches the old one-loop for `m_id!=0`.

Hero `in_out_region` is a different function (bits + msgs). Do not collapse them.

| Case | C | JS after |
|------|---|---------|
| `!will_hurtle` | no helper, bump | **same** (`&&`) |
| gas enter/leave/stay | lists, never reject | **same** |
| `attach_2_m == m_id` | skip that region | **same** (was missing) |
| can_enter/leave false | no list change, no place | **same** (vanilla never) |
| leave then enter (two regions) | remove+leave_f then add+enter_f | **same** |
| `!isok` | false, no helper | **same** |
| dog_move before `newdogpos` | C `:1289` | **named skip** |

C `mhurtle` drives `walk_path(mhurtle_step)`. JS `mhurtle` is a manual orthogonal/diagonal for-loop (D-1038) that awaits each `mhurtle_step`. Each cell still hits the new `&&`. NODIAG grid-bug on that loop stays named.

`in_out_region` (hero) vs `m_in_out_region` (monster): hero updates `REG_HERO_INSIDE` + msgs; monster updates `reg.monsters` + can_enter/leave. Hurtle hero is D-1165. This SHA is the monster knock. `update_monster_region` (rloc/displace) is absolute, no callbacks, no `attach_2_m` skip. Three C families. This SHA must not be stamped as skipping rloc’s updater.

## Hallucinations / overclaim

D-log / CURRENT / subject say knocking a monster through a region runs `m_in_out_region` before place instead of placing on `will_hurtle` alone. **That is the hunk:** C `:1000` `&&` plus the three-loop callee C already had. Stamping **Addressed:** D-1176 is fair for the Open **mhurtle** line. Fill hash `b652fbf3` in this commit. Do **not** stamp it as “Match C `place_monster`” or “Match C steed `u_on_newpos`” or “Match C dog_move region” or “force fields now live.” This is **not** “Match C dispatch, callee is a stub”: the body is C `:533–576`; gas `NO_CALLBACK` never rejects in C either.

`rloc_to` after a true gate is a **named** place clone, not a claim that hurtle is teleport.

## Density

One C `&&` plus the callee rewrite that `&&` requires (the old always-true loop could not reject or skip `attach_2_m`). ~70 JS lines in the callee + ~5 at the gate. Right-size §2b cluster (caller + the one function it names). Walk already imported that function — thickening it is the envelope, not “finish region.c.” Did not pull `obj_delivery`. Not QUALITY-RISK.

## Verification

Journal: private canary **53**/53 (C/JS `&&` source; gas add/stay/remove; can_enter/leave reject keeps lists; attach_2_m skip vs other m_id; leave-then-enter; `NO_CALLBACK` never rejects; null; empty; `m_id` 0==attach 0 skip; no fs/FORCE); green+strict seed8000/0900; cohort **43**/43 (CURRENT shared + 0014/0383/4500/2600 + green) + strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path **public-unhit** on knock through a live force field.

C read of `dothrow.c:991–1068`, `region.c:533–576`, `:13`, `monmove.c:2039–2040`, `dogmove.c:1289`; JS SHA `mhurtle_step` + `m_in_out_region` + `attach_2_m` default. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1495**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — gas never-reject did not desync the fortress.

## Actionable C-wrongs

None that Must-fix this next iter. The Open gate matches `dothrow.c:1000`. The callee matches `:533–576` for live gas. `m_in_out_region` is sync boolean.

Named omits / do-nots (map / Open, not Must-fix):

1. `place_monster` vs `rloc_to` (extra rloc angry/bill/occupation/region).
2. steed `u_on_newpos` / vision_recalc (`:1008–1014`).
3. `set_apparxy` / waterwall stop after place.
4. bump petrify / hero touch (`:1027–1064`).
5. NODIAG grid-bug / `minliquid` after path.
6. dog_move `m_in_out_region` before `newdogpos` (`dogmove.c:1289` / `:1349`).
7. force-field `#if 0` numeric `callbacks[]`.
8. Do not place on `will_hurtle` alone. Do not `await` the helper (Promise is truthy). Do not skip `attach_2_m` here. Do not pull `goto_level` `obj_delivery` into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `mhurtle_step` now requires C’s `will_hurtle && m_in_out_region` before place, and the callee is the real three-loop walk analog (`attach_2_m` skip, gas never rejects), while `place_monster` vs `rloc_to` stays named.
- Must-fix stays empty for this SHA; next port pops Open `do.c` `goto_level` `obj_delivery`. This review fills archive hash `b652fbf3`. Not hurtle_step petrify, not `obj_delivery`.
