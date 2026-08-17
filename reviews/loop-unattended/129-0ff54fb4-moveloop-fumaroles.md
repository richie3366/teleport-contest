# Review 129 — 0ff54fb4 — allmain.c `moveloop` EOT fumaroles (D-1168)

## Metadata
- Full / short hash: `0ff54fb4033bbcd56e97687903314007738d44a5` / `0ff54fb4`
- Parent: `d6ba6ede` (D-1167). This file audits **this SHA only**. The fix stamped **Addressed:** D-1168 without the short hash; this review commit fills `0ff54fb4`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 17:26:28 +0200
- D-id: **D-1168**
- Stats: 16 files, +126 / −43 — `js/allmain.js` +14 / −2 (import + if/else); comments in `do.js` / `mklev.js` / `region.js` / `fountain.js`.
- Claims to close: Open queue `allmain.c` `moveloop` `fumaroles` (named). Not mklev. Review **117** named `allmain.c:376–377` so arrival was not the only burst. `reviews/loop-2026-08-15/` has no open EOT-fumaroles Must-fix.
- JS / map: `allmain.js` `moveloop_core`; callee `mklev.js` `fumaroles` (D-1156). Twin `do.js` `goto_level` already awaited (`do.c:1831–1834`). `c-js-map/debt.md` / `turns.md` / `data.md`. udemigod `intervene`, `glibr`, `do_storms`, `amulet()`, `mkot_trap_warn`, `m_everyturn` youmonst, `run_regions` `hero_inside` bit still named.
- Prior reviews this SHA claims to close: **117** named omit (moveloop caller); D-1167 next-port.

## Intent vs deliverable

Git subject promises: “Match C allmain.c moveloop so a turn on a fumaroles level re-bursts lava clouds after run_regions, instead of only doing so on arrival.”

Old JS EOT awaited `nh_timeout` / `run_regions` then (after regen/sounds/wipe stub) jumped to `multi<0` with no C `movebubbles`/`fumaroles` if/else. Arrival already called the pair (`goto_level` / D-1156 callee). A turn spent on Plane of Fire therefore never re-rolled `rn2(3)` / lava `create_gas_cloud` after clouds aged.

The diff **does** insert C’s if/else after the wipe stub and before `multi<0`: `Is_waterlevel || Is_airlevel` → `movebubbles()`; else `level.flags.fumaroles` → `await fumaroles()`. Water/air short-circuit so a stray fumaroles flag cannot fire there. It does **not** port udemigod `intervene` (`allmain.c:362–368`, between wipe and this if/else), `amulet()`, `Glib` `glibr`, `do_storms`, `mkot_trap_warn`, or `m_everyturn_effect` youmonst. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `moveloop_core` if/else | C caller, **new** | `allmain.c:370–377` |
| `fumaroles` | C callee, **imported** | `mkmaze.c:1484–1514`; D-1156 whoosh / `clear_heros_fault` |
| `movebubbles` | C callee, **imported** | `mkmaze.c`; partial (air edge + drift); water cons pickup **named** |
| `Is_waterlevel` / `Is_airlevel` | C macros, **imported** | `const.js`; `d_level` vs `water_level`/`air_level` |
| `level.flags.fumaroles` | C field, **match** | `svl.level.flags.fumaroles` |
| `goto_level` twin | C caller, **pre-existing** | `do.c:1831–1834`; already awaited |
| `fumaroles()` extra `!flags.fumaroles` return | JS callee guard, **pre-existing** | C body is **ungated** (`:1487` starts at `rn2(3)`); both live callers already gate |
| udemigod `intervene` / `amulet()` | C callers, **named omit** | between wipe and this if/else |
| `glibr` / `do_storms` / `mkot_trap_warn` | C callers, **named omit** | before wipe in C EOT |
| `m_everyturn_effect` youmonst | C caller, **named omit** | Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Lava cells inside the callee are `rn1(COLNO-4,3)` / `rn1(ROWNO-4,3)`, not traced squares. Rule #2 clean. `fastforward_pre_mklev` remains the delete-only hook in `allmain.js` (untouched this SHA).

**New RNG on this path:** EOT on a fumaroles level: callee `rn2(3)` then per-burst `rn1` coords + two `rn1(10,…)` on `LAVAPOOL` (already D-1137/D-1156). Water/air: `movebubbles` RNG (air drift) — **not** fumaroles `rn2(3)`. `!flags.fumaroles` ordinary dungeon: **no** new RNG. Path **public-unhit** on EOT lava whoosh (0373 fire **arrival** already matched without staying for this EOT arm).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, seed names in control flow, or recorded coordinates. No new `fastforward.js` burns.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not call `fumaroles` on water/air (C else). Do not skip the flag gate on ordinary levels. Do not drop `clear_heros_fault` after a player-made `set_heros_fault` (callee D-1156). Do not pull udemigod / `amulet()` / everyturn fog into this peel.

## C ↔ JS fidelity

### Site vs `allmain.c:222–388`

C once-per-turn lives in `if (!monscanmove && u.umovement < NORMAL_SPEED)` after `svm.moves++` / `run_regions` / regen / sounds / `invault` / wipe / udemigod, **before** `gm.multi < 0`, still inside the `do { hero can't move } while (u.umovement < NORMAL_SPEED)` loop.

JS (`allmain.js:798–892`): same `if (!monscanmove && umovement < NORMAL_SPEED)` block; `moves++`; `nh_timeout`; `run_regions`; … wipe stub `if (!rn2(40+ACURR(A_DEX)*3)) rnd(3)`; **then this SHA**; then `multi<0`. Match the once-per-turn slot. Not once-per-input, not once-per-hero-took-time (`hero_seq++` stays after the `while`).

C between wipe and fumaroles: `if (u.uhave.amulet) amulet();` then udemigod `intervene`/`rn1(200,50)`. JS skips both (named). On a hero **with** the Amulet, C would consume `amulet()` RNG **before** `fumaroles` `rn2(3)`; JS would roll fumaroles first. That is the named `amulet()` omit, not a miss of this if/else. Public fortress has no EOT fumaroles + amulet overlap (path unhit).

Wipe itself is still a stub: C `u_wipe_engr(rnd(3))` (`:360–361`); JS consumes `rnd(3)` and does not wipe (`allmain.js:869–872`). That stub **predates** this SHA and sits **before** the new if/else, so EOT fumaroles RNG order vs the wipe roll matches C (`rn2(40+DEX*3)` then maybe `rnd(3)` then `fumaroles` `rn2(3)`). Do not treat the engraving no-op as a C-wrong of this caller.

Earlier C EOT still missing in JS: `l_nhcore_call(NHCORE_MOVELOOP_TURN)`, `Glib` `glibr()`, `mkot_trap_warn()`, `do_storms()`. Those sit **before** wipe (`:269–353`). Inserting fumaroles after the existing wipe stub does not reorder them relative to a ported `glibr`. Named.

Once-per-hero-took-time (`hero_seq++`, `seer_turn`) stays **after** the `while (umovement < NORMAL_SPEED)` in both trees (`allmain.c:392–396` / `allmain.js:897–906`). This SHA did not leak fumaroles into that block or into once-per-input.

C `fumaroles` comment (`mkmaze.c:1481–1482`): “called from `goto_level()` when arriving **and** `moveloop_core()` when on the level.” After this SHA both sentences are true in JS. The callee loop (`nmax = rn2(3)` then fire/temp bumps, then `for (n = nmax; n; n--)` lava hits) is unchanged. Firelevel `nmax++` / `sizemin+=5` and `temperature>0` same bump already lived in D-1156. This SHA only adds the second caller.

### If/else vs `allmain.c:374–377`

C:

```
if (Is_waterlevel(&u.uz) || Is_airlevel(&u.uz))
    movebubbles();
else if (svl.level.flags.fumaroles)
    fumaroles();
```

JS (`allmain.js:878–882`): `Is_waterlevel(g.u?.uz) || Is_airlevel(g.u?.uz)` → `movebubbles()`; else if `g.level?.flags?.fumaroles` → `await fumaroles()`. Helpers take a `d_level` (`const.js:2970–2973`). Water/air **cannot** fall through to fumaroles. Match.

`movebubbles` is not a no-op: air edge glyphs + bubble drift (`mklev.js:7902+`). Named omit inside it is water cons pickup / Punished ball, not “dispatch to a stub.” `fumaroles` is the real D-1156 loop (`rn2(3)` / fire+temp bump / `LAVAPOOL` exactly — not `is_lava` — / `clear_heros_fault` / `!Deaf` Norep whoosh). **Not** “Match C dispatch, callee is a stub.”

Callee still early-returns on `!lf?.fumaroles` before `rn2(3)`. C `fumaroles()` does **not** re-check the flag (`mkmaze.c:1487`). Both live callers (`goto_level` and this EOT) already gate. Canary called this “C body ungated.” Calling the JS function without the flag would skip RNG C would consume — no such caller after this SHA. Do not Must-fix a dead extra guard onto this wire.

### Twin arrival vs EOT

`goto_level` (`do.c:1831–1834`) already had the same if/else **before** `vision_recalc`. This SHA is the moveloop twin **after** `run_regions` so aged clouds can burst again. Arrival whoosh (D-1156) stays; EOT whoosh is new. Match the claim “instead of only doing so on arrival.”

| Case | C | JS after |
|------|---|---------|
| ordinary `!fumaroles` | no call, no `rn2(3)` | **same** |
| fumaroles dungeon | `fumaroles()` after wipe | **same** |
| water/air | `movebubbles` only | **same** |
| water/air + stray fumaroles flag | still bubbles, no fumaroles | **same** |
| arrival twin | already wired | **untouched** |
| `amulet()` / `intervene` before this | runs | **named skip** |
| `multi<0` after this | runs | **same** |

## Hallucinations / overclaim

D-log / CURRENT / subject say a turn on a fumaroles level re-bursts lava clouds after `run_regions` instead of only on arrival. **That is the hunk:** EOT if/else → imported `fumaroles`. Stamping **Addressed:** D-1168 is fair for the Open **moveloop** line. Fill hash `0ff54fb4` in this commit. Do **not** stamp it as “Match C `intervene`” or “Match C water cons pickup inside `movebubbles`” or “`run_regions` now uses `hero_inside`.” This is **not** “Match C dispatch, callee is a stub”: `fumaroles` is D-1156; `movebubbles` is a real partial, not an empty function.

“After `run_regions`” is true of the once-per-turn block, not “the next statement.” Regen/sounds/wipe still sit in between, as in C.

## Density

One C if/else at the documented EOT site. ~12 JS lines. Thin vs §2b; queue said “Not mklev” (callee already shipped). Not a second hypothesis. Not QUALITY-RISK for thinness.

Review **117** shipped whoosh/`clear_heros_fault` and named this caller. Arrival twin was already live. This SHA is only the missing once-per-turn gate. Combining it with `run_regions` `hero_inside` (next Open) would mix EOT **creation** of steam with EOT **damage** membership — two C loci. Correct split.

## Verification

Journal: private canary **27**/27 (C/JS if/else; wipe then fumaroles then multi; import; water/air arm no fumaroles; goto_level twin; C body ungated; ordinary none / flag fumaroles / water+flag bubbles / air+flag bubbles; `!flag` no RNG; flag-on `rn2(3)`; callee still `clear_heros_fault`; thenable; ordinary `movebubbles` no-op on dungeon; no fs/FORCE); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015. Path public-unhit on EOT lava whoosh.

C read of `allmain.c:222–388` (once-per-turn envelope + `:370–377`), `mkmaze.c:1484–1514`, `do.c:1831–1834`; JS SHA `moveloop_core` + existing callee. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1485**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — ordinary EOT did not inject `rn2(3)`; 0373 arrival still matches without this EOT arm.

## Actionable C-wrongs

None that Must-fix this next iter. The Open EOT if/else matches `allmain.c:374–377`. Callee is the real D-1156 `fumaroles`.

Named omits / do-nots (map / Open, not Must-fix):

1. `run_regions` `hero_inside` bit (`region.c:439–441`). Open next.
2. `allmain.c` `m_everyturn_effect` youmonst. Open.
3. udemigod `intervene` / `amulet()` between wipe and this if/else.
4. `glibr` / `do_storms` / `mkot_trap_warn` earlier in EOT.
5. `movebubbles` water cons pickup / Punished ball.
6. Do not fumaroles on water/air. Do not drop the flag gate. Do not restore blaming `heros_fault` on natural steam. Do not skip `clear_heros_fault`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: EOT now runs C’s `movebubbles` / `fumaroles` if/else after the wipe stub so a fumaroles level re-bursts lava steam each turn, not only on `goto_level`.
- Must-fix stays empty for this SHA; next port pops Open `run_regions` `hero_inside` bit. This review fills archive hash `0ff54fb4`. Not mklev, not everyturn fog.
