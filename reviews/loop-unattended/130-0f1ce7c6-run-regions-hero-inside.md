# Review 130 — 0f1ce7c6 — region.c `run_regions` hero `inside_f` bit (D-1169)

## Metadata
- Full / short hash: `0f1ce7c664b27ff6866411d9a36e41d6928c6fdf` / `0f1ce7c6`
- Parent: `ea348f44` (review **126–129** + cadence #1485). This file audits **this SHA only**. Archive row **Addressed:** D-1169 `0f1ce7c6` was filled by D-1170.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 18:03:34 +0200
- D-id: **D-1169**
- Stats: 10 files, +113 / −41 — `js/region.js` +19 / −8 (hero arm + header / danger / safety comments).
- Claims to close: Open queue `region.c` `run_regions` `hero_inside` bit (named). Not walk caller. Review **118** / **126** / **127** / **129** named `region.c:439–441`. `reviews/loop-2026-08-15/` has no open run_regions-bit Must-fix.
- JS / map: `region.js` `run_regions`; callee `inside_gas_cloud` (D-1146). `c-js-map/turns.md` `allmain.c` / `hack.c` region notes. `region_danger` / `region_safety` still geometric (named).
- Prior reviews this SHA claims to close: **118** named omit; **129** next Open; D-1168 next-port after cadence #1485.

## Intent vs deliverable

Git subject promises: “Match C region.c run_regions so end-of-turn gas inside_f uses the REG_HERO_INSIDE bit, instead of re-probing the hero cell by geometry.”

Old JS after ttl age gated hero `inside_f` on `inside_region(reg, u.ux, u.uy)`. Walk / hurtle / `goto_level` / teleds already keep `REG_HERO_INSIDE` (D-1157 / D-1165 / D-1166 / D-1130). C `run_regions` (`region.c:439–441`) uses `hero_inside()`, so a stale bit vs the cell would wrong-damage (or skip damage). Geometry hid that.

The diff **does** replace the geometry probe with `hero_inside(reg)` after the existing gas-only `inside_f` tag. Monster list, expire backward loop, and dissipation plines are untouched. It does **not** flip `region_danger` / `region_safety` (still `inside_region`; C `:1347` / `:1375` use the bit). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `run_regions` hero arm | C body, **rewritten** | `region.c:439–441` |
| `hero_inside` | C macro, **pre-existing** | `region.h:17` `player_flags & REG_HERO_INSIDE` |
| `inside_gas_cloud` | C callee, **imported** | `region.c:1091–1165`; D-1146; not a no-op |
| `INSIDE_GAS_CLOUD` tag | JS encoding | JS `1`; C callbacks index `0` (`region.c:46–47`). Tag vs table, not a second function |
| `NO_CALLBACK` | C macro, **match** | JS `-1`; C `region.c:13` |
| monster `inside_f` loop | C body, **untouched** | `:443–457`; independent of the hero bit |
| expire ttl==0 backward | C body, **untouched** | `:425–431`; D-1155 |
| `region_danger` / `region_safety` | C callers, **named omit** | still geometry |
| force-field `#if 0` callbacks | C, **named omit** | live C gas only |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none extra. Hero `inside_f` already awaited `inside_gas_cloud` (fog ttl D-0834; dam>0 D-1146). The bit vs geometry only **gates** that callee. Path **public-unhit** on stale-bit vs cell (public walks keep them aligned). Cadence fortress is not a stale-bit proof.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not restore geometric `inside_region(u.ux,u.uy)` for this arm. Do not flip `region_danger` / `region_safety` in this peel. Do not skip the monster list when the hero bit is clear. Do not pull occupation `dochugw` into this SHA.

## C ↔ JS fidelity

### Envelope vs `region.c:414–474`

C: reset `gas_cloud_diss_within` / `diss_seen`; expire ttl==0 backward (`expire_f == NO_CALLBACK || callback` → `remove_region`); then remaining regions: age `ttl>0`, `f_indx = inside_f`, hero callback, monster list; then dissipation plines (D-1155).

JS (`region.js:649–702`): same reset; same backward expire; age then gas tag then this SHA’s hero bit then monster mids. Dissipation plines unchanged. Caller `allmain.c:274` after `nh_timeout` — JS `moveloop` already awaits `run_regions` there (pre-existing). Match the once-per-turn slot.

JS `if (reg.inside_f !== INSIDE_GAS_CLOUD) continue` is the live-C equivalent of `f_indx != NO_CALLBACK` then `callbacks[f_indx]`: the only non-`#if 0` inside callback is `inside_gas_cloud` (`region.c:45–50`). Force-field enter/leave stay named. Continue still **ages** ttl first, then skips both hero and monster callbacks — C skips both when `f_indx == NO_CALLBACK` after the same age. Match.

### Hero gate vs `region.c:439–441`

C:

```
f_indx = gr.regions[i]->inside_f;
if (f_indx != NO_CALLBACK && hero_inside(gr.regions[i]))
    (void) (*callbacks[f_indx])(gr.regions[i], (genericptr_t) 0);
```

JS (`region.js:669–675`): gas tag already implies a live inside callback; `if (hero_inside(reg)) await inside_gas_cloud(reg, null)`. `hero_inside` is `(player_flags & REG_HERO_INSIDE) !== 0` (`region.js:99–101` / `region.h:17`). `REG_HERO_INSIDE` is `0x01` in both (`const.js:1165`). Match.

C does **not** `return` on `program_state.gameover` after the hero callback. JS does (`region.js:674`) — **pre-existing**, not this hunk. If EOT gas killed the hero, C would still walk remaining monster lists and dissipation; JS would not. Public-unhit on dam>0 HP (review **107**). Do not Must-fix a return this SHA did not add. Do not treat it as “the bit is wrong.”

Monster loop still runs when the hero bit is clear (`f_indx != NO_CALLBACK` is independent of `hero_inside`). JS does not `continue` after a clear bit. Match.

### Callers

C `run_regions` is once-per-turn from `allmain.c` `moveloop_core` after `nh_timeout` (`:274`). JS `allmain.js:822` already awaits it. No other live C caller (not `goto_level`; arrival uses `in_out_region` D-1166). This SHA does not add a second caller. EOT fumaroles (D-1168) sits **after** regen/sounds/wipe in the same once-per-turn block — after `run_regions` ages/damages, then maybe `create_gas_cloud` bursts. Bit damage this turn uses membership from the previous walk/hurtle/arrival; new bursts set the bit inside `make_gas_cloud` for the next EOT. Match C order. Do not run `inside_f` after fumaroles in the same peel.

`is_hero_inside_gas_cloud` (`region.c:1168–1176` / `region.js:224–229`) already reads the bit (D-1157). That helper is for envelop / size-1 create, not EOT `inside_f`. This SHA is the `run_regions` reader C `:440` names. Two bit readers, one setter family — do not collapse them.

C `inside_region` (`:63–73`) also requires `bounding_box` then rects. `hero_inside` does **not** re-check geometry. A bit set on a rect the hero has left (missed `in_out_region`) still damages in C. Old JS geometry would have skipped. That is the Open item’s whole point. After D-1157/D-1165/D-1166/D-1130 the public keepers align the bit; the remaining risk is a missed setter (named `mhurtle_step` `m_in_out_region`).

Expire (`ttl==0`) runs in a **prior** backward loop (`:425–431`). A cloud that expires this turn is removed before age/`inside_f`. JS same (`:657–665` then `:667`). Age `ttl>0` then `inside_f` on what remains. `ttl < 0` (permanent steam, D-1158 selection ttl −1) does not age and still runs `inside_f` if the bit is set. Match.

Hero callback RNG (only if the bit is set): fog `ttl>3` refresh no `rn2` when dam==0; dam>0 `inside_gas_cloud` may `rnd`/`make_blinded` (D-1146). Geometry-vs-bit only changes **whether** that callee runs, not its internal call order. No new `rn2` was inserted in front of expire or the monster list.

### Bit keepers (not this SHA)

Walk `in_out_region` (D-1157), `hurtle_step` (D-1165), `goto_level` `(void)` (D-1166), teleds `update_player_regions` (D-1130), `make_gas_cloud` dest-set. After this SHA, EOT damage reads the same bit those callers write. Geometry would still have matched on a public walk; the Open row was the stale-bit case.

### `region_danger` / `region_safety`

C `:1347` / `:1375` `if (!hero_inside) continue`. JS still `inside_region(u.ux,u.uy)` (`region.js:862` / `:883`). Named in the hunk comments. Prayer trouble vs EOT damage can disagree if the bit is stale — that is the remaining named pair, not a miss of `:439–441`.

## Hallucinations / overclaim

D-log / CURRENT / subject say EOT gas `inside_f` uses `REG_HERO_INSIDE` instead of re-probing the hero cell. **That is the hunk:** one predicate swap. Stamping **Addressed:** D-1169 is fair for the Open **bit** line. Hash `0f1ce7c6` is on the archive row (filled by D-1170). Do **not** stamp it as “Match C `region_danger`” or “Match C occupation `dochugw`.” This is **not** “Match C dispatch, callee is a stub”: `inside_gas_cloud` is D-1146 (`losehp` / `make_blinded` / `killed`); `hero_inside` is the real macro.

## Density

One predicate inside the already-ported `run_regions` envelope. ~10 JS lines. Thin vs §2b; queue said “Not walk caller.” Correct split from D-1157 (setter) vs this reader. Not QUALITY-RISK for thinness.

## Verification

Journal: private canary **26**/26 (C/JS hero_inside vs geometry; allmain `nh_timeout` then `run_regions`; danger/safety still geometric; no fs/FORCE; fog ttl bit-set/geo-miss fires, bit-clear/geo-hit does not; both/neither; NO_CALLBACK skip; monster list independent; ttl==0 expire; empty; overlap only bit-set; human dam0 no fog +5; age before inside_f; thenable); green+strict seed8000/0900; cohort **41**/41 + strict gas-adjacent sessions. Path **public-unhit** on stale-bit vs cell.

C read of `region.c:414–474` (`:439–441`), `region.h:15–22`, `region.c:1091–1165` / `:1340–1383`; JS SHA `run_regions` + existing `hero_inside` / `inside_gas_cloud`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1490**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — ordinary EOT fog ttl still matches; stale-bit vs cell is not in the public set.

| Case | C | JS after |
|------|---|---------|
| bit set, geo miss | `inside_f` fires | **same** |
| bit clear, geo hit | skip | **same** |
| both / neither | fire / skip | **same** |
| not gas / `NO_CALLBACK` | skip both callbacks | **same** (`continue` after age) |
| monster list, hero bit clear | still callbacks | **same** |
| `region_danger` | `hero_inside` | **named geometry** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open hero arm matches `region.c:439–441`. Callee is the real D-1146 function.

Named omits / do-nots (map / Open, not Must-fix):

1. `region_danger` / `region_safety` still geometry (`region.c:1347` / `:1375`). Map.
2. `mhurtle_step` `m_in_out_region` (`dothrow.c:1000`). Open.
3. `allmain.c` `m_everyturn_effect` youmonst. Open.
4. Pre-existing JS `gameover` return after hero `inside_f` (C continues). Do not treat as this bit.
5. Do not restore geometric `inside_region` for this arm. Do not skip the monster list when the bit is clear. Do not pull occupation `dochugw` into this SHA — **Addressed:** D-1170 `5a6be1fe`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: EOT gas `inside_f` now reads `REG_HERO_INSIDE` like C `:439–441` instead of re-probing `u.ux,u.uy`, while prayer `region_danger` / `region_safety` stay named geometric.
- Must-fix stays empty for this SHA; next port in this window popped Open occupation `dochugw`. **Addressed:** D-1169 `0f1ce7c6`. Not walk, not danger.
