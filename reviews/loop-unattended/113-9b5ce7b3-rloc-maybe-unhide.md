# Review 113 — 9b5ce7b3 — rloc_to maybe_unhide_at dest (D-1152)

## Metadata
- Full / short hash: `9b5ce7b30a86ac94fff44988d04cf42ba9b1c4e9` / `9b5ce7b3`
- Parent: `14354c02` (loop crash-keep; JS parent is `6bdf4d49` D-1151). This file audits **this SHA only**. The fix stamped **Addressed:** D-1152 without the short hash; this review commit fills `9b5ce7b3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 10:36:36 +0200
- D-id: **D-1152**
- Stats: 11 files, +143 / −73 — `js/teleport.js` +10 / −3 (dynamic import + await); `js/monmove.js` +5 / −1 (export).
- Claims to close: Open queue `teleport.c` `rloc_to` `maybe_unhide_at` (named). Not vanish-msg. Review **84** named omit after ustuck. `reviews/loop-2026-08-15/` has no open unhide Must-fix.
- JS / map: `teleport.js` `rloc_to`; `monmove.js` `maybe_unhide_at` (already used by `m_move`). `c-js-map/turns.md` teleport. vanish-msg, `set_apparxy`, `update_monster_region`, shk-home, shop bill, trapped `mintrap`, hero youmonst arm, other C callers (invent/hack `movobj`/dig/ball/…) still named.
- Prior reviews this SHA claims to close: **84** named `maybe_unhide_at`; D-1151 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a relocated hider or eel is maybe_unhide_at the dest cell before newsym, instead of staying mundetected on bare floor.”

Old JS `rloc_to` after ustuck ran `newsym(x,y)` with a comment that `maybe_unhide_at` was named omit. C `teleport.c:1700–1701` is `maybe_unhide_at(x, y); newsym(x, y);` after the ustuck swallow/`!m_next2u` split (`:1690–1697`), before `set_apparxy` (`:1702`). `maybe_unhide_at` already lived in `monmove.js` for `m_move` after `place_monster` (`monmove.c:2060`).

The diff **does** export that helper and dynamic-import it from `rloc_to` (monmove already imports `rloc` from teleport — cycle). Order: ustuck, then unhide, then dest `newsym`. It does **not** port vanish-msg / `set_apparxy` / `update_monster_region`. Named. It does **not** add the youmonst / `u.uundetected` arm inside `maybe_unhide_at`. Named. It does **not** wire hack `movobj`, invent drop, dig, ball, timeout, mkobj, dokick callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_to` dest unhide | C body, **new call** | `teleport.c:1700` after ustuck, before `newsym` |
| `maybe_unhide_at` | C callee, **exported** | `mon.c:4698–4719`; already used by `m_move` |
| `hideunder` | C callee, **imported** | same file; unhide = call when cover gone so `mundetected` clears |
| `hides_under` | C predicate, **imported** | `monsters.js` |
| `can_hide_under_obj` | C callee, **local** | `monmove.c:2121–2148`; coins ≥10; non-pit trap blocks |
| `objects_at` | C `level.objects[][]`, **imported** | floor pile head |
| `is_pool` | C callee, **imported** | D-1090 DRAWBRIDGE_UP+`DB_MOAT` |
| `m_at` | C callee, **imported** | fmon scan; DEADMONSTER skip |
| youmonst / `u_at` arm | C branch, **named omit** | `mon.c:4706–4709` |
| `set_apparxy` | C next line, **named omit** | `teleport.c:1702` |
| other C callers | C, **named omit** | invent/hack/dig/ball/timeout/mkobj/dokick/zap/trap/muse/explode |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dynamic `import('./monmove.js')` is ESM cycle-breaking, not `fs`. Dest `(x,y)` is the live `rloc_to` argument, not a recorded cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in `maybe_unhide_at`. `hideunder` may `You_see` when `canseemon` **before** the mundetected mutation (usually false while hidden). `place_worm_tail_randomly` RNG is D-1123, not this SHA. Path **public-unhit** on hidden-hider rloc.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Do not hardcode a hider dest. Do not skip `can_hide_under_obj`’s `<10` coin rule. Do not restore the dest `newsym` without unhide. Making the await is not a new `nhgetch` boundary. Do not pull vanish-msg into this peel (would consume extra `rn2`/pline on public rloc).

## C ↔ JS fidelity

### `rloc_to_core` order

C `teleport.c:1683–1702`:

```
place_monster(mtmp, x, y);
update_monster_region(mtmp);          /* named */
if (mtmp->wormno) place_worm_tail_randomly(...);
if (u.ustuck == mtmp) {
    if (u.uswallow) { u_on_newpos; check_special_room; docrt; }
    else if (!m_next2u(mtmp)) unstuck(mtmp);
}
maybe_unhide_at(x, y);
newsym(x, y);
set_apparxy(mtmp);                    /* named */
```

JS `teleport.js:680–714`: set `mx`/`my` (fmon occupancy stand-in for `place_monster`); worm tail; ustuck split (D-1123); **then** `await maybe_unhide_at(x,y)`; `newsym(x,y)`. `update_monster_region` / `set_apparxy` still named. Same-cell early return (`x==mx && y==my && m_at==mtmp`) still skips the whole body including unhide — C `:1658–1659` same. Match on the Open **line**.

Pickup still zeros `mx`/`my` before `remove_worm`/`newsym(old)` because JS `m_at` scans fmon. Place writes dest coords **before** unhide, so `m_at(x,y)` finds the relocated monster. C occupancy is the grid; after `place_monster`, `m_at` finds them too.

### `maybe_unhide_at` monster arm

C `mon.c:4698–4719`:

```
if ((mtmp = m_at(x, y)) != 0) {
    undetected = mtmp->mundetected;
    trapped = mtmp->mtrapped;
} else if (u_at(x, y)) {
    mtmp = &gy.youmonst;
    undetected = u.uundetected;
    trapped = u.utrap;
} else {
    return;
}
if (undetected
    && ((hides_under(mtmp->data)
         && (!OBJ_AT(x, y) || trapped
             || !can_hide_under_obj(svl.level.objects[x][y])))
        || (mtmp->data->mlet == S_EEL && !is_pool(x, y))))
    (void) hideunder(mtmp);
```

JS (`monmove.js:987–997`): `m_at`; if none **return** (skips youmonst — named); if `!mundetected` return (≡ `if (undetected && …)` for monsters); `trapped = !!mtrapped`; `floorObj = objects_at` ≡ `OBJ_AT` / `level.objects[x][y]` pile head; same hides_under / trapped / `can_hide_under_obj` / `S_EEL && !is_pool` disjunction; `await hideunder`.

`can_hide_under_obj`: `where==OBJ_FLOOR`; non-pit `t_at` false; coin pile `quan` sum ≥10 else false. `NO_HIDING_UNDER_STATUES` off in C. Match. `is_pool` is the D-1090 helper (DRAWBRIDGE_UP+`DB_MOAT`), not a POOL-only typ test.

### Unhide mechanism is `hideunder`, not a boolean poke

C does not `mundetected=0` in `maybe_unhide_at`. It calls `hideunder`, which on a bare / trapped / unhideable pile leaves `undetected==FALSE` and writes `mtmp->mundetected`. JS hideunder same: cover-gone → `undetected` stays false → `mundetected=0`. Eel on dry land: `S_EEL && !is_pool` true → hideunder eel arm requires `is_pool` → fails → clears. Eel rloc into a pool: outer `!is_pool` false → hideunder **not** called → stays hidden under water. Match.

JS hideunder `if (!mtmp?.mx) return false` is a migrating-monster guard. `rloc_to` has already written dest `mx` (legal cells are `x>=1`). Not a dest-unhide skip.

`hideunder` `You_see` only when `seeit && seenmon && seenobj` **and** hiding succeeded. Unhide (undetected false) does not print that line. `canseemon` is taken **before** the mundetected write, so a still-hidden hider usually has `seeit==0`. Then `rloc_to` `newsym` shows the revealed glyph. C same (`hideunder` may `newsym` on change, then `rloc_to` `newsym` again).

### youmonst arm — named, not this Open miss

C `rloc_to_core` places a **monster**, then `maybe_unhide_at` at that cell. `m_at` hits the monster first; the `u_at` else is for other callers (cover object left the hero’s cell). Wiring rloc_to does not require the hero arm. Other JS callers (hack `movobj`, invent, dig, ball) still comment-defer the whole helper. Named.

## Hallucinations / overclaim

D-log / CURRENT / subject say a relocated hider or eel is `maybe_unhide_at` at dest before `newsym` instead of staying `mundetected` on bare floor. **That is the hunk:** export + one call after ustuck. Stamping **Addressed:** D-1152 is fair for the Open **rloc_to line**. Fill hash `9b5ce7b3` in this commit. Do **not** stamp it as “Match C `set_apparxy`” or “hero unhide on pickup.” This is **not** “Match C dispatch, callee is a stub”: `maybe_unhide_at` is the real `m_move` helper; `hideunder` / `can_hide_under_obj` / `is_pool` are real or matching clones.

## Density

One C call site + export of an existing helper. ~15 JS lines. Thin vs §2b “one deferred `if`,” but the queue item is exactly that wire (not vanish-msg, not youmonst). Callee already had the monster-arm body. Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **22**/22 (bare dest unhide; cover stays; visible no-op; non-hider; same-cell; trapped; `<10` vs `≥10` coins; eel dry/pool; empty cell; null; track clear); green+strict seed8000/0900; cohort **25**/25 (0012 vault + 0360/4500/0373/0367 + 2200/0014/0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/0361/0108/0002/5002/2600/0006) + strict 0012/0360/4500/0014/2200/0004/0002/0009/0367/0373/0030. Path **public-unhit** on hidden-hider rloc. Cadence #1460 **44**/44 does not relocate a mundetected hider onto bare floor.

C read of `teleport.c:1645–1702`, `mon.c:4698–4719`, `:4726–4798`, `monmove.c:2060`, `:2121–2148`; JS SHA `rloc_to` + exported helper. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| hider rloc onto bare floor | hideunder clears mundetected, then newsym | **same** |
| hider rloc onto hideable pile | maybe_unhide_at does not call hideunder | **same** |
| eel onto dry | unhide | **same** |
| eel onto pool | stay mundetected | **same** |
| same-cell rloc | early return, no unhide | **same** |
| hero `uundetected` at cell, no mon | youmonst arm | **named skip** |
| `set_apparxy` after newsym | yes | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open dest call matches `teleport.c:1700–1701` / `mon.c:4698–4719` monster arm.

Named omits / do-nots (map / Open, not Must-fix):

1. youmonst / `u.uundetected` / `u.utrap` arm (`mon.c:4706–4709`).
2. `set_apparxy` / `update_monster_region` / vanish-msg (`teleport.c:1685, 1702–1714`).
3. Other C callers: `hack.c:829` `movobj`, invent drop, dig, ball, timeout, mkobj, dokick, zap, trap, muse, explode.
4. `hideunder` pet `cursed_object_at` / cockatrice corpse skip (pre-existing named on that function).
5. Do not restore dest `newsym` without unhide. Do not skip `<10` coins. Do not invent a youmonst rloc through `rloc_to` (hero uses `teleds`).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now awaits the real `maybe_unhide_at` after ustuck and before dest `newsym`, so a hider or eel that lands without cover clears `mundetected` the same way `m_move` already did.
- Must-fix stays empty for this SHA; next port pops Open `vault_tele` `tele()` fallback. This review fills archive hash `9b5ce7b3`. Not vanish-msg.
