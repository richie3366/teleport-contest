# Review 111 — 505df513 — domove walk invocation_message (D-1150)

## Metadata
- Full / short hash: `505df5134c4e9bd08120ed74bc6bf78b7a0bd32f` / `505df513`
- Parent: `cdaccd3a` (D-1149). This file audits **this SHA only**. Archive row **Addressed:** D-1150 `505df513` was filled by D-1151.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 09:23:04 +0200
- D-id: **D-1150**
- Stats: 13 files, +120 / −50 — `js/cmd.js` +10 / −1 (import + gated await); `js/hack.js` / `js/teleport.js` comments only.
- Claims to close: Open queue `hack.c` `domove` `invocation_message` (named). Not teleds. Review **102** named omit 1 / live Open after D-1141. `reviews/loop-2026-08-15/` has no open walk-invocation Must-fix.
- JS / map: `cmd.js` `domove`; callee `hack.js` `invocation_message` (D-1141). `c-js-map/turns.md` hack `domove`. `mkmaze.c` `inv_pos` / VIBRATING_SQUARE, apply.js `invocation_pos` clone, shared `dungeon.c` `Invocation_lev` export still named.
- Prior reviews this SHA claims to close: **102** named walk `hack.c:2973`; **109** next-port after Must-fix (D-1149 shipped first).

## Intent vs deliverable

Git subject promises: “Match C hack.c domove so a successful step onto the Invocation square (not a stair) runs invocation_message after vision_recalc(1), instead of skipping the walk caller.”

Old JS `domove` after a successful step ran `newsym(old)`, `vision_recalc(1)`, extra dest `newsym`, then Punished `put_bc` / `spoteffects`. Comment in `hack.js` named `hack.c:2973` deferred. C `hack.c:2964–2973` gates `newsym(ux0,uy0); vision_recalc(1); invocation_message();` on `u.ux0 != u.ux || u.uy0 != u.uy`. `teleds` already awaited the callee after `spoteffects` (D-1141).

The diff **does** import `invocation_message` from `hack.js` and `await` it after `vision_recalc(1)` when `ux0!=ux||uy0!=uy`. Body unchanged. It does **not** place `svi.inv_pos` (`mkmaze.c`). Named. Unset `inv_pos` still returns false (not treated as `(0,0)`). Extra dest `newsym` stays (pre-existing display, not this peel).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domove` walk call | C body, **new call** | `hack.c:2973` after `vision_recalc(1)` |
| `invocation_message` | C callee, **imported** | D-1141; `hack.c:3064–3085` |
| `invocation_pos` | C callee, **imported** | D-1141; `hack.c:982–986` |
| `On_stairs` / `carrying` / `Invocation_lev` | C callees, **clones in callee** | unchanged this SHA |
| `nomul` / `You_feel` | C callees, **imported** | real |
| `mkmaze.c` `inv_pos` | C placement, **named omit** | live Open |
| apply.js `invocation_pos_apply` | C clone, **named remaining** | prefers `game.inv_pos` first |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `ux0`/`uy0` are live hero cells set at `cmd.js:1574–1575`, not recorded squares. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the walk call. Callee has no `rn2`. Public suite never stands on Invocation_lev, so no extra pline. Path **public-unhit**.

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. Do not treat unset `inv_pos` as `(0,0)`. Do not pull `mkmaze.c` placement or `classify_terrain` into a one-call peel. Do not restore the missing walk call. Extra dest `newsym` is display-only; do not invent a “sparse boundary frame” to hide it.

## C ↔ JS fidelity

### Walk call site and gate

C `hack.c:2964–2973`:

```
if (u.ux0 != u.ux || u.uy0 != u.uy) {
    gd.domove_succeeded |= (gd.domove_attempting & (DOMOVE_RUSH | DOMOVE_WALK));
    u.umoved = TRUE;
    newsym(u.ux0, u.uy0);
    vision_recalc(1);
    invocation_message();
}
```

JS already recorded `domove_succeeded` and will set `u.umoved=true` after this block (pre-existing order vs C’s umoved-inside-the-if). This SHA adds:

```
newsym(oldx, oldy);
vision_recalc(1);
newsym(newx, newy);          /* extra dest — pre-existing */
if (u.ux0 !== u.ux || u.uy0 !== u.uy) {
    await invocation_message();
}
```

JS `u.ux0`/`u.uy0` are snapshotted at the start of `domove` before place (`cmd.js:1574–1575`), matching C’s `ux0` at move start. Same-cell occupy (swallow onto `ustuck` with `dx=dy=0` so `ux` may equal `ux0`) skips the clue — C skips **newsym + vision + invocation** together; JS still always paints then gates **only** the clue. The always-on `newsym`/`vision_recalc` is pre-existing, not this peel. The Open **call** is gated on the C predicate.

Swallow path: `u_on_newpos(ustuck)` then this block. If the hero was already on the engulfer cell, `ux0==ux` → skip. Invocation_lev inside a gulp is public-unhit.

Failed moves return before this block (`carrying_too_much`, `impaired_movement`, blocked). Match C: only a successful step reaches `:2964`.

### Callee (unchanged; not a stub)

C `hack.c:3067–3084`: `invocation_pos(u.ux,u.uy) && !On_stairs` else return; `carrying(CANDELABRUM_OF_INVOCATION)` **before** `nomul(0)`; steed `y_monnam` / Levitation\|\|Flying `"beneath you"` / `makeplural(body_part(FOOT))`; `You_feel("a strange vibration %s.", buf)`; `u.uevent.uvibrated=1`; lit `spe==7` candelabrum Blind throb vs glow.

JS `hack.js:1721–1744` is that body (D-1141). De Morgan early-return ≡ C’s `if (pos && !On_stairs)`. Walk after `vision_recalc(1)` vs teleds after `spoteffects` is C’s two call sites (`:2973` vs `teleport.c:569`). This SHA wires the walk site only.

`invocation_pos`: `Invocation_lev && x==inv_pos.x && y==inv_pos.y`. JS missing `ip` → false. C unset coords are `(0,0)`, not a legal hero cell. Equivalent on-map. Do not “fix” that to match column 0.

`On_stairs`: `stairway_at != NULL` (ladders included). JS walks `game.stairs`. Same occupancy as `mklev.js` `stairway_at`.

Without `mkmaze.c` `inv_pos` placement, the walk call is live JS that no-ops on public seeds (no Invocation_lev / no `inv_pos`). That is the named Open row, not a stub callee.

Order vs `spoteffects`: C invocation is **before** `if (u.umoved) spoteffects(TRUE)` (`:2979–2980`). JS await is before `u.umoved=true; spoteffects(true)`. Match relative to pickup. `teleds` still calls the same function **after** `spoteffects` (C `teleport.c:568–569`). Two sites, two orders — both C.

## Hallucinations / overclaim

D-log / CURRENT / subject say a successful step onto the Invocation square (not a stair) runs `invocation_message` after `vision_recalc(1)`. **That is the hunk:** one imported callee, gated like C `:2964`. Stamping **Addressed:** D-1150 is fair for the Open **walk call**. Hash `505df513` is on the archive row (filled by D-1151). Do **not** stamp it as “Match C `inv_pos` placement” or “walk now throbs on public seeds.” This is **not** “Match C dispatch, callee is a stub”: `invocation_message` is the real D-1141 function; `You_feel` / `nomul` / `carrying` are real or matching clones. Unset `inv_pos` makes the call a C-faithful no-op, which is also C when `inv_pos` is unplaced.

## Density

One C call site. Callee already existed. ~10 JS lines. Playbook §2b “one deferred `if`” waste vs queue “do not combine items”: this **is** the Open row (walk, not teleds, not `inv_pos`). Amortized. Not a second hypothesis. Not QUALITY-RISK for thinness when the queue forbids gluing `mkmaze.c` into the same iter.

## Verification

Journal: private canary **19**/19 (walk onto inv_pos feet + `nomul` run stop; off-square silent; On_stairs skip; not Invocation_lev; unset inv_pos; (0,0) not other cells; Lev/Fly/blocked-Lev buf; steed; spe==7 lit glow; spe!=7 / unlit skip glow; Blind throb; walk away silent; direct callee; STONE blocked no clue; diagonal); green+strict seed8000/0900; cohort **23**/23 (0012 vault + 0004 pony + 0002/0006/0007/0009/0014/0017/0030/0060/0102/0106/0108/0116/0360/0367/0373/0383/0700/1500/1800/2200/4500) + isolated strict 0014/0012/0360/4500/2200/0030/0004/0002/0006/0367. Path **public-unhit** on Invocation_lev. Cadence #1460 **44**/44 does not stand on the square.

C read of `hack.c:2964–2973`, `:982–986`, `:3064–3085`; JS SHA `cmd.js` gate + D-1141 body. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| step onto inv_pos, not stair | nomul, You_feel, uvibrated | **same** |
| On_stairs on that cell | skip | **same** |
| same-cell swallow occupy | skip clue | **same** (newsym/vision still always — pre-existing) |
| no inv_pos / not hell last | skip | **same** |
| `mkmaze.c` places `inv_pos` | yes | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open walk call matches `hack.c:2973`.

Named omits / do-nots (map / Open, not Must-fix):

1. `mkmaze.c` `inv_pos` / VIBRATING_SQUARE placement. Live Open.
2. Shared `dungeon.c` `Invocation_lev` export; apply.js `invocation_pos_apply`.
3. `Blind_im` `uroleplay.blind` short-circuit vs C `!BBlinded` (named on D-1141).
4. Gate `newsym(old)`/`vision_recalc(1)` on `ux0!=ux` like C (pre-existing always-on paint).
5. Do not restore the missing walk call. Do not treat unset `inv_pos` as `(0,0)`. Do not pull `classify_terrain` into this SHA — **Addressed:** D-1151 `6bdf4d49`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `domove` now awaits real `invocation_message` after `vision_recalc(1)` when the hero actually stepped, with the D-1141 body (Invocation_lev / On_stairs / carrying / vibration) unchanged and `inv_pos` placement still named.
- Must-fix stays empty for this SHA; next port popped Open `classify_terrain`. **Addressed:** D-1151 `6bdf4d49`. Not `inv_pos`.
