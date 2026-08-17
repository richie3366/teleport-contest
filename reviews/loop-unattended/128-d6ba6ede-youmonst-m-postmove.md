# Review 128 — d6ba6ede — hack.c youmonst `m_postmove_effect` (D-1167)

## Metadata
- Full / short hash: `d6ba6ede2e7391135d04eb60938f9788d1395d21` / `d6ba6ede`
- Parent: `0cb3acbe` (D-1166). This file audits **this SHA only**. Archive row **Addressed:** D-1167 `d6ba6ede` was filled by D-1168.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 16:48:42 +0200
- D-id: **D-1167**
- Stats: 12 files, +142 / −54 — `js/cmd.js` +8 (import + await after occupy); `js/monmove.js` +26 / −10 (helper `is_u` / `ux0` / await cloud); comments in `region.js`.
- Claims to close: Open queue `hack.c` `m_postmove_effect` youmonst (named). Not `in_out_region`. Review **118** named `hack.c:2877` as a different family than region membership. `reviews/loop-2026-08-15/` has no open Hezrou-trail Must-fix.
- JS / map: `cmd.js` `domove`; `monmove.js` `m_postmove_effect`. `c-js-map/turns.md` `hack.c` `domove`. `allmain.c` `m_everyturn_effect` youmonst (fog at `u.ux`), mundisplaceable-refuse trail, moveloop fumaroles still named.
- Prior reviews this SHA claims to close: **118** named omit (`hack.c:2877`); D-1166 next-port.

## Intent vs deliverable

Git subject promises: “Match C hack.c m_postmove_effect so a polyed Hezrou/Steam walk leaves a size-1 trail at u.ux0, instead of skipping the youmonst caller.”

Old JS `domove` occupied `newx,newy` with no C `m_postmove_effect(&youmonst)`. The helper always used `mtmp.mx/my`. Monster `m_move` already called it **before** `place_monster` (D-0623 / `monmove.c:2047`) so a Hezrou’s trail sat on the old cell. A polyed hero has no reliable `mx/my` (sentinel); even if set, C uses `u.ux0` **after** occupy so the cloud is **behind**, not under the new cell (comment `monmove.c:667–670`: hero after location change to avoid envelop spam).

The diff **does** `await m_postmove_effect(game.youmonst)` after `u.ux=newx` and before steed `mx/my`, and rewrites the helper: `mtmp === youmonst` → `(u.ux0,u.uy0)` else `(mx,my)`; `data.mndx` then `mnum`; await `create_gas_cloud`. Hezrou `1×8`; Steam `!mcan` `1×0`. Human form no-op. It does **not** wire `allmain.c` `m_everyturn_effect(&youmonst)` (fog at **current** `u.ux`, every turn, not a walk trail) or restructure mundisplaceable refuse (C tentative occupy then revert). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domove` `m_postmove_effect(&youmonst)` | C caller, **new call** | `hack.c:2874–2878` after occupy, before steed |
| `m_postmove_effect` | C callee, **rewritten** | `monmove.c:672–683`; not a no-op |
| `is_u ? u.ux0 : mx` | C body, **new** | `:674–676` |
| `mtmp->data == &mons[PM_HEZROU]` | C test, **mndx clone** | JS `data.mndx`; `mons()` returns a fresh object (`monsters.js:197–201`) so pointer identity cannot be C’s `&mons[]` |
| Steam `!mcan` `1×0` | C arm, **match** | `:681–682` |
| `create_gas_cloud` | C callee, **imported** | D-1124/D-1137; size-1 skips expand RNG, still rolls ttl |
| monster `m_move` call | C caller, **now awaited** | still **before** place; coords still `mx/my` |
| `m_everyturn_effect` youmonst | C caller, **named omit** | fog at `u.ux`; Open |
| mundisplaceable refuse trail | C occupy-then-revert, **named omit** | JS returns before occupy — no trail on refuse |
| `exercise_steed` | C after steed mx, **named omit** | pre-existing |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. `ux0` is the live previous cell from `domove` start (`cmd.js:1576–1577`), not a traced coordinate. Rule #2 clean.

**New RNG on this path:** polyed Hezrou/Steam walk: size-1 `create_gas_cloud` ttl (`rn1(3,4)` in the creator; no BFS expand). Human form: **no** RNG. Path **public-unhit** on polyed Hezrou/Steam walk.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not plant the trail at `u.ux` (that is `m_everyturn` fog). Do not use youmonst `mx/my` for the hero. Do not skip `!mcan` on Steam. Do not pull `m_everyturn_effect` youmonst into this peel.

## C ↔ JS fidelity

### Call site vs `hack.c:2873–2884`

C:

```
u.ux += u.dx;
u.uy += u.dy;
m_postmove_effect(&gy.youmonst);
if (u.usteed) {
    u.usteed->mx = u.ux;
    u.usteed->my = u.uy;
    exercise_steed();
}
```

JS (`cmd.js:1866–1874`): `u.ux = newx; u.uy = newy;` then `await m_postmove_effect(game.youmonst)` then steed `mx/my`. `newx` is the dest already used for `in_out_region` (D-1157); equivalent to `+= dx` on a successful step. `u.ux0`/`u.uy0` were snapshotted at `domove` start (`:1576–1577`) and are **not** updated at occupy, so the helper sees the old cell. Match.

`youmonst` is the stable `game.youmonst` object (`u_init` / `set_uasmon`). C `&gy.youmonst`. Identity `===` is the JS stand-in for that pointer.

### Helper vs `monmove.c:672–683`

C:

```
boolean is_u = (mtmp == &gy.youmonst);
coordxy x = is_u ? u.ux0 : mtmp->mx, y = is_u ? u.uy0 : mtmp->my;
if (mtmp->data == &mons[PM_HEZROU])
    create_gas_cloud(x, y, 1, 8);
else if (mtmp->data == &mons[PM_STEAM_VORTEX] && !mtmp->mcan)
    create_gas_cloud(x, y, 1, 0);
```

JS (`monmove.js:1097–1109`): same `is_u` / coord split; `mnum = data?.mndx ?? mnum`; Hezrou then Steam `!mcan`; `await create_gas_cloud`. `set_uasmon` (`polyself.js:443–450`) points `youmonst.data` at `mons(umonnum)` which **includes** `mndx`. Polyed Hezrou therefore hits `PM_HEZROU` via `data.mndx`, not a stale role `mnum`. Preferring `data.mndx` over `mnum` is closer to C’s `mtmp->data` than the old helper (`mnum ?? data.mndx`). The `?? mnum` fallback is a clone; C has no fallback (null `data` would crash). `set_mon_data` keeps `data` populated on live youmonst / `fmon`. Not a Must-fix: the claimed poly path uses `data.mndx`.

Size-1 clouds: no expand RNG; ttl still rolled. Damage 8 is poison stench; 0 is harmless vapor. Trail cell is **origin**, so after a one-step walk the hero is **not** inside their own new cloud (`inside_region` at dest). C’s “prevent spam enveloped” comment (`monmove.c:667–668`). Match.

`make_gas_cloud` `set_heros_fault` when `!in_mklev && !mon_moving` (`region.c:1187–1188`). A **hero** Hezrou trail is the hero’s fault (player-made stench). A **monster** Hezrou during `movemon` (`context.mon_moving`) is not. JS `create_gas_cloud` already has that gate; this SHA does not add a fumaroles-style `clear_heros_fault` (C `m_postmove_effect` does not clear). Match. Do not “fix” blame on the hero trail.

`m_everyturn_effect` for Fog Cloud (`monmove.js:1078–1087`) still uses `mx/my` and does **not** await `create_gas_cloud`. Pre-existing; the Open youmonst everyturn row is that caller, not a miss of this helper rewrite. Fog is `PM_FOG_CLOUD` + `!closed_door && !visible_region_at`, not Hezrou/Steam.

Monster `m_move` still calls the helper **before** `mx=nix` (`monmove.js:1669–1672` / C `:2047–2052`), so `is_u` is false and coords stay old `mx/my`. Awaiting `create_gas_cloud` is the JS More boundary, not a C order change vs place.

CLIPPING / blocked-after-occupy: C comments “tentatively move the hero plus steed; leave CLIPPING til later” (`hack.c:2873`). A later abort can revert `u.ux`. JS `domove` is still thinner (no full CLIPPING revert). Successful unblocked steps — the Open item — match. Do not Must-fix CLIPPING onto this trail wire.

### Not this function

`m_everyturn_effect` (`monmove.c` fog cloud at **current** cell when `!closed_door && !visible_region_at`, every visit). Open `allmain.c` youmonst caller. Different C family (fog vs Hezrou/Steam; `u.ux` vs `u.ux0`; every turn vs walk). This SHA must not be stamped as that wire.

Mundisplaceable refuse: C occupies (and would trail) then reverts `u.ux=u.ux0`. JS returns before occupy (`cmd.js:1838–1846`) — no trail. D-log names it. Pre-existing occupy-order debt, not the successful-step claim.

| Case | C | JS after |
|------|---|---------|
| human walk | no cloud, no RNG | **same** |
| Hezrou poly walk | size-1 dmg 8 at `ux0` | **same** |
| Steam poly, `!mcan` | size-1 dmg 0 at `ux0` | **same** |
| Steam `mcan` | no cloud | **same** |
| monster Hezrou | cloud at old `mx/my` before place | **same** |
| fog poly | not this fn | **same** (Open everyturn) |
| mundisplaceable refuse | occupy, trail, revert | **named skip** (no occupy) |

## Hallucinations / overclaim

D-log / CURRENT / subject say a polyed Hezrou/Steam walk leaves a size-1 trail at `u.ux0` instead of skipping the youmonst caller. **That is the hunk:** occupy → imported/rewritten helper → steed. Stamping **Addressed:** D-1167 is fair for the Open **youmonst** line. Hash `d6ba6ede` is on the archive row (filled by D-1168). Do **not** stamp it as “Match C `m_everyturn_effect` youmonst” or “Match C mundisplaceable refuse trail.” This is **not** “Match C dispatch, callee is a stub”: `create_gas_cloud` is the real D-1137 function; the helper body is C `:672–683`, not a no-op.

`data.mndx` vs `&mons[PM_*]` is the established JS clone (`mons()` is not a stable pointer). Not a hallucination of “Match C pointer compare.”

## Density

One C call plus the helper’s `is_u` coord split that the youmonst caller requires. ~20 JS lines. Right-size §2b cluster (caller + the one callee field the hero path needs). Did not pull everyturn fog. Not QUALITY-RISK.

Review **118** already split this from walk `in_out_region`: membership vs stench/vapor. Wiring the youmonst caller without the `ux0` split would have been a C-wrong (cloud under dest / unset `mx`). Shipping both in one SHA is the envelope, not two hypotheses.

## Verification

Journal: private canary **30**/30 (src occupy/postmove/steed + helper `is_u` ux0; C same; import; null; human no cloud/RNG; fog not this fn; Hezrou ux0 not ux/not mx; damage 8; trail not inside / no envelop; Steam ux0 damage 0; `mcan`; monster mx/my; data vs stale mnum; same-cell immune; thenable; `mon_moving`); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015. Path **public-unhit** on polyed Hezrou/Steam walk.

C read of `hack.c:2873–2884`, `monmove.c:667–683`, `:2047–2052`, `allmain.c` everyturn (not this SHA); JS SHA `domove` + helper + `set_uasmon` `mndx`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1485**) **44**/44 — human-form no-op did not inject ttl RNG.

## Actionable C-wrongs

None that Must-fix this next iter. The Open youmonst call matches `hack.c:2877`. Trail coords match `:674–676`. Callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. `allmain.c` `m_everyturn_effect` youmonst (fog at `u.ux`). Open.
2. mundisplaceable-refuse trail (C occupies then reverts).
3. `exercise_steed` after steed `mx/my`.
4. Do not plant Hezrou/Steam at `u.ux`. Do not restore `mnum`-first over `data.mndx`. Do not skip Steam `!mcan`. Do not pull moveloop fumaroles into this SHA — **Addressed:** D-1168 `0ff54fb4`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `domove` now runs the real `m_postmove_effect(&youmonst)` after occupy so a polyed Hezrou/Steam leaves a size-1 cloud at `u.ux0`, not under the dest and not via youmonst `mx`.
- Must-fix stays empty for this SHA; next port in this window popped Open moveloop fumaroles. Not everyturn fog.
