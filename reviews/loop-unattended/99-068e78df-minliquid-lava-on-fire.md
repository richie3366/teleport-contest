# Review 99 — 068e78df — minliquid lava on_fire / xkilled / fire_damage_chain (D-1138)

## Metadata
- Full / short hash: `068e78df3b35110073c1b684604c679c2fff43ec` / `068e78df`
- Parent: `50136436` (D-1137). This file audits **this SHA only**. Archive row **Addressed:** D-1138 `068e78df` was filled by D-1139.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 05:45:06 +0200
- D-id: **D-1138**
- Stats: 12 files, +196 / −52 — `js/mon.js` +78 / −21 (lava envelope; delete `mondead_liquid`); `js/mondata.js` +36 (`on_fire`); `js/trap.js` +25 (`fire_damage_chain`); `js/allmain.js` +9 (`mon_moving` around `movemon`).
- Claims to close: Open queue `fountain.c` `gush` lava `fire_damage_chain` / `xkilled` (named). Not minliquid. Review **78** named omit 1 (lava still `mondead_liquid`). `reviews/loop-2026-08-15/` has no open lava-minliquid Must-fix.
- JS / map: `mon.js` `minliquid_core`; `mondata.js` `on_fire`; `trap.js` `fire_damage_chain` → `do.js` `fire_damage`; `allmain.js` `moveloop_core`. `c-js-map/data.md` fountain/trap; `turns.md` mon. Steed Flying/Levitation, `deal_with_overcrowding`, `engulfing_u` drown flush still named.
- Prior reviews this SHA claims to close: **78** named lava `on_fire`/`xkilled`/`fire_damage_chain`; **97** next after gas was this Open row.

## Intent vs deliverable

Git subject promises: “Match C minliquid_core lava so fire death uses on_fire/xkilled/mondead and survivors run fire_damage_chain, and wrap movemon with mon_moving.”

Old JS lava used `mondead_liquid` (mhp=0, mvitals, `MON_DETACH`, newsym; no `relobj`) and skipped `fire_damage_chain`. `allmain` never set `context.mon_moving` around `movemon`, so a Gehennom mumak took the hero `xkilled` arm (seed0360). C `mon.c:1010–1067` prints `on_fire` fate, then `mon_moving` → `mondead` else `xkilled(XKILL_NOMSG)`; fire-resist −1 hp + surrenders/burns-slightly; survivors `fire_damage_chain(minvent, FALSE, FALSE)` then `rloc(RLOC_MSG)`. `allmain.c:210–216` sets `mon_moving` around the `movemon` loop.

Queue label said “gush lava.” C `gush` (`fountain.c:134–160`) only `set_levltyp`s **POOL** then `minliquid`. Lava is `minliquid_core`’s other arm, hit from `movemon` when a monster stands in lava — the review **78** omit, not a substitute peel. D-log honestly says “gush still pool-only.”

The diff **does** port that lava envelope, export `on_fire` + `fire_damage_chain`, and wrap `movemon`. It does **not** port `deal_with_overcrowding`, steed Flying/Levitation, or `engulfing_u` drown flush. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `minliquid_core` lava | C body, **rewritten** | `mon.c:1010–1067` |
| `on_fire` | C callee, **new** | `mondata.c:1411–1445`; `pm()` + local `AT_HUGS=7` |
| `mondead` | C callee, **imported** | `mhitm.js` (partial; lifesave/vamp named) |
| `xkilled` | C callee, **imported** | `uhitm.js`; `XKILL_NOMSG` |
| `fire_damage_chain` | C callee, **new** | `trap.c:4550–4572` |
| `fire_damage` | C callee, **imported** | `do.js:483–564`; not a no-op |
| `mon_moving` wrap | C moveloop, **new** | `allmain.c:210–216` |
| `mondead_liquid` | C-wrong clone, **deleted** | was thinner than `mondead` |
| `deal_with_overcrowding` | C callee, **named omit** | failed `rloc` |
| steed Fly/Lev | C early return, **named omit** | `mon.c:980–981` |
| `engulfing_u` drown | C pool arm, **named omit** | not lava |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `mx/my` are live monster cells. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** survivor `fire_damage` luck `rn2(20)` / container `rn2(chance)` (C `trap.c:4507`, `:4484`) then `rloc` placement. Death arms have no new lottery (`on_fire` is a string table). `can_teleport` escape `rloc` already existed. Public gush cells had no `m_at` (review **78**); lava hit is seed0360 mumak via `movemon`.

## Constitution / playbook

Grep of the four JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; dynamic `import('./uhitm.js')` / `do.js` is cycle-breaking. Do not restore `mondead_liquid`. Do not skip the `allmain` wrap (without it every lava death is `xkilled`). Do not pull steed air or overcrowding into this SHA. Do not invent a gush-lava `set_levltyp` — C gush is pool.

## C ↔ JS fidelity

### Lava envelope

C `mon.c:1016–1066`:

```
if (!is_clinger(ptr) && !likes_lava(ptr)) {
    if (can_teleport(ptr) && !tele_restrict(mtmp)) {
        if (rloc(mtmp, RLOC_MSG)) return 0;
    }
    if (!resists_fire(mtmp)) {
        if (cansee(mx, my)) {
            dummy = &ptr->mattk[0];
            how = on_fire(ptr, dummy);
            pline_mon(..., boils/melts/crisp);
        }
        if (svc.context.mon_moving) mondead(mtmp);
        else xkilled(mtmp, XKILL_NOMSG);
    } else {
        mhp -= 1;
        if (DEADMONSTER) { surrender pline; mondead; }
        else if (cansee) burns slightly;
    }
    if (!DEADMONSTER) {
        if (m_in_air) ;
        else if (likes_lava) ;
        else {
            fire_damage_chain(minvent, FALSE, FALSE, mx, my);
            if (!rloc(RLOC_MSG)) deal_with_overcrowding;
        }
        return 0;
    }
    return 1;
}
```

JS `1163–1211`: same outer `!clinger && !likes_lava`; same teleport-away; `on_fire(ptr, ptr.mattk[0])` then boiling→`boils away`, melting→`melts away`, else `burns to a crisp` (`"already on fire"` / `"heating up"` / `"on fire"` / `"being roasted"` all map to crisp, like C `!strcmp` only special-cases boiling/melting); `mon_moving` → `mondead` else `xkilled(XKILL_NOMSG)`; resist −1 / surrender `mondead` / burns slightly; survivor `m_in_air` skip / hypothetical `likes_lava` / else `fire_damage_chain` + `rloc(RLOC_MSG)` with overcrowding named. Return 0 if `mhp>0` else 1 ≡ C `!DEADMONSTER`. Match call-for-call on the Open lava arm.

`on_fire` switch (`mondata.js:623–649`) is `monsndx` cases: flaming sphere / fire vortex / elemental / salamander; water elemental / fog / steam; ice vortex / glass golem; stone/clay/gold golem + air/earth/dust/energy; default AT_HUGS vs `"on fire"`. `AT_HUGS=7` ≡ `monattk.h:19`. `pm('FLAMING_SPHERE')` is `monsterNames.indexOf('PM_FLAMING_SPHERE')`. Dummy `mattk[0]` is what C passes, not NULL.

`inlava` still uses shared `is_lava` (DRAWBRIDGE_UP+`DB_LAVA`, D-1077) and skips flyers/floaters (`mon.c:971–972`). `resists_fire` is the pre-existing `MR_FIRE` bit helper, not a new clone. `tele_restrict` is awaited (async pline D-0816) before `rloc`; C’s `!tele_restrict` is the same short-circuit. Pool iron/gremlin/drown arms are **untouched** (D-1117). Gush occupied cells still `(void) minliquid` on the **new pool** only — lava death from gush cannot fire because `gush` never `set_levltyp`s lava.

`fire_damage` luck `rn2(20)` is `(Luck+5) > rn2(20)` (`trap.c:4507`). JS `do.js:528` same `Luck()` helper. Survivor invent burn therefore consumes core rng in C order **before** `rloc`. Empty `minvent` : C loop does not run, returns 0, still `rloc`s; JS `if (!chain) return 0` then `rloc`. Match.

C’s lava comment (`mon.c:1017–1018`) notes the hero does **not** auto-teleport from lava the way water does; only `can_teleport(ptr)` monsters try `rloc` first. JS keeps that gate (`can_teleport` + `!tele_restrict`). A mumak in Gehennom lava (seed0360) is not a teleporter, so it falls into the death/resist arms with `mon_moving` now true.

### `mondead` vs old clone

C lava comment is `mondead(mtmp); /* no corpse */` — not `mondied`. JS imports `mhitm.js` `mondead` (mhp=0, mvitals, `MON_DETACH`, `relobj_on_death`, unmap, newsym). That is **more** C than `mondead_liquid` (no `relobj`). Shared `mondead` still names lifesave / vampshifter / steam-vortex cloud / vault `grddead` / cham restore (`mon.c:3081+`). If C `mondead` lifesaves, `DEADMONSTER` is false and the survivor chain runs; JS `mondead` does not lifesave, so lava death stays dead. Named on the shared helper, not a miss of the `mon_moving` split. Pool drown still `mondied` vs `xkilled` (D-1117). Match that lava uses `mondead` not `mondied`.

### `fire_damage_chain` is not a stub

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `trap.c:4559–4571` sets `bhitpos`, snapshots `nobj`/`nexthere` before `fire_damage` may `delobj`, counts destroyed, then `You("smell smoke.")` when `num && Blind && !couldsee`. JS `4215–4231` same (`game.bhitpos`, `here ? nexthere : nobj`, `Blind() && !couldsee`). `fire_damage` (`do.js:483–564`) already has C’s `catch_lit` / container luck / `rn2(20)` / scroll/book/potion / `erode_obj(ERODE_BURN, EF_DESTROY)`. `minvent` is the nobj chain (`here=false`). Match.

### `mon_moving` wrap

C `allmain.c:210–216`: `TRUE` around the inner `movemon` loop, `FALSE` after. JS `782–793` same, plus clear-on-`gameover` return (JS-only early exit; without the clear the flag would stick — extra, not a C-wrong). Seed0360 mumak in lava now takes `mondead`, not hero `xkilled`. Match the reason the wrap exists.

## Hallucinations / overclaim

D-log / CURRENT / subject say lava death uses `on_fire`/`xkilled`/`mondead` and survivors `fire_damage_chain`, and `movemon` is wrapped with `mon_moving`. That is the hunk. They name overcrowding, steed, engulfing_u, “gush still pool-only.” Stamping **Addressed:** D-1138 is fair for review **78**’s lava omit. Hash `068e78df` is on the archive row (filled by D-1139). Do **not** stamp it as a close of gush `set_levltyp` lava or full `mondead` lifesave. Do not read “Match C xkilled” as “Match C `deal_with_overcrowding`.” Queue text said “gush lava”; C `gush` never makes lava — the port hit the real callee.

## Density

One C family: `minliquid_core` lava + the two callees it needs (`on_fire`, `fire_damage_chain`) + the moveloop flag that chooses `mondead` vs `xkilled`. ~140 JS lines. Related deferrals stay named. Not “finish mon.c.” The `allmain` wrap is the same falsifier (without it the death arm is wrong).

## Verification

Journal: private canary **42**/42 (`on_fire` phrases; goblin crisp `mondead` vs `xkilled`; water boils / glass melts; !cansee silent; fire-resist slightly/surrender; salamander skip; bat flyer skip; pool drown D-1117; chain nobj walk; Blind smoke; survivor luck `rn2(20)`); green+strict seed8000/0900; cohort **24**/24 including 0360/0014/4500/2200/0030/0004/0009/0367 + strict 8000/0900/0014/0360/4500/2200/0004/0030. Path public-unhit on gush `m_at`; lava hit seed0360 mumak via `movemon` (fortress still PASS). This audit’s full `sessions` (cadence **#1450**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `mon.c:947–1121`, `:3081–3104`, `mondata.c:1411–1445`, `trap.c:4455–4572`, `allmain.c:210–216`, `fountain.c:134–160`; JS `mon.js:1108–1211`, `mondata.js:615–649`, `trap.js:4209–4231`, `do.js:483–564`, `allmain.js:782–793`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| lava + !resist + `mon_moving` | `on_fire` + `mondead` | **same** |
| lava + !resist + !`mon_moving` | `xkilled(NOMSG)` | **same** |
| lava + resist, lives | −1 hp, slightly, chain+`rloc` | **same** |
| lava + resist, dies | surrender + `mondead` | **same** |
| `likes_lava` / clinger / flyer | skip lava body | **same** |
| `m_in_air` survivor | skip chain/`rloc` | **same** |
| overcrowding | `deal_with_overcrowding` | **named skip** |
| gush occupied | `minliquid` on **pool** | **untouched** (pool D-1117) |
| `allmain` `movemon` | `mon_moving` TRUE/FALSE | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. Lava matches `mon.c:1010–1067`; `on_fire` and `fire_damage_chain` are real callees; `mon_moving` matches `allmain.c:210–216`.

Named omits / do-nots (map / Open, not Must-fix):

1. `deal_with_overcrowding` after failed lava `rloc` (`mon.c:1061–1062`).
2. Steed `Flying \|\| Levitation` early return (`mon.c:980–981`).
3. Pool `engulfing_u` flush pline (`mon.c:1088–1093`).
4. Shared `mondead` lifesave / vampshifter / `grddead`.
5. Next Open after this SHA: `teleds` swallow `docrt` — **Addressed:** D-1139 `4071a74d`.
6. Do not restore `mondead_liquid`. Do not drop the `allmain` wrap. Do not `mondied` on lava (that leaves a corpse). Do not invent gush lava terrain.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: lava `minliquid_core` now uses C’s `on_fire` fate, `mon_moving` → `mondead` else `xkilled(XKILL_NOMSG)`, and survivor `fire_damage_chain`+`rloc`, with `movemon` wrapped so monster-turn lava is not a hero kill.
- Must-fix stays empty for this SHA; next port popped Open `teleds` swallow `docrt`. **Addressed:** D-1139 `4071a74d`. Not hideunder.
