# Review 72 — b0847b88 — `teleok` vibrating square / pit-fly (D-1111)

## Metadata
- Full / short hash: `b0847b88f54ff3d922745046019fc97c80eca2d9` / `b0847b88`
- Parent: `fd738eab` (D-1110). This file audits **this SHA only**. Archive row **Addressed:** D-1111 `b0847b88` was filled by D-1112.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 22:24:53 +0200
- D-id: **D-1111**
- Stats: 10 files, +126 / −57 — `js/teleport.js` +26 / −13 (`teleok` trapok by-value).
- Claims to close: Open queue `teleport.c` `teleok` vibrating / pit-fly (named). Not `rloc`. `reviews/loop-2026-08-15/` has no open teleok Must-fix. Not a Must-fix from reviews **62–71**; Open refill after D-1110.
- JS / map: `teleport.js` `teleok`. `c-js-map/turns.md` teleport row. `tele_jump_ok` / `in_out_region` still named (always allow).
- Prior reviews this SHA claims to close: none as Must-fix. Named Open from the teleport cluster after live `onscary`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleok so a vibrating square or a pit/hole while levitating or flying is a legal teleport destination.”

Old JS `if (!trapok) { if (trap_at(x,y)) return false; }` rejected **any** trap when the caller passed false (C `safe_teleds` / scroll / vault dest). C `teleport.c:422–436` allows a vibrating square (comment: not a real trap) and allows pits/holes when `Levitation || Flying`, then still runs `goodpos(&youmonst, 0)`.

The diff **does** that by-value `trapok` rewrite. It does **not** port `tele_jump_ok` or `in_out_region` (`teleport.c:440–443`). Named, already Open. It does **not** pull `mlevel_tele_trap` portal arms (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleok` trapok block | C body, **rewritten** | `teleport.c:420–445`; now exported |
| `trap_at` | C `t_at`, **clone** | pre-existing local (trap.js cycle) |
| `VIBRATING_SQUARE` | C enum, **imported** | `const.js` 23 ≡ `trap.h:82` |
| `is_pit` / `is_hole` | C macros, **imported** | `const.js` ≡ `trap.h:113–114` |
| `Levitation()` | C macro, **clone** | pre-existing youprop.h `(H\|\|E)&&!B` |
| `Flying()` | C macro, **clone** | pre-existing youprop.h + steed `is_flyer` (D-1085) |
| `goodpos(&youmonst, 0)` | C callee, **imported** | same file; `GP_CHECKSCARY` off |
| `tele_jump_ok` | C callee, **named omit** | always allow |
| `in_out_region` | C callee, **named omit** | always allow |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** (predicates only; callers still sample `rnd`/`rn2` as before).

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates. `VIBRATING_SQUARE` is the C trap type, not a seed-shaped coordinate. Contest Rule #2: no Node builtins. `teleok` remains sync; input still sits at `nhgetch`.

## C ↔ JS fidelity

### Trapok by-value — the claimed slot

C `teleport.c:420–445`:

```
staticfn boolean
teleok(coordxy x, coordxy y, boolean trapok)
{
    if (!trapok) {
        struct trap *trap = t_at(x, y);
        if (!trap)
            trapok = TRUE;
        else if (trap->ttyp == VIBRATING_SQUARE)
            trapok = TRUE;
        else if ((is_pit(trap->ttyp) || is_hole(trap->ttyp))
                 && (Levitation || Flying))
            trapok = TRUE;
        if (!trapok)
            return FALSE;
    }
    if (!goodpos(x, y, &gy.youmonst, 0))
        return FALSE;
    if (!tele_jump_ok(u.ux, u.uy, x, y))
        return FALSE;
    if (!in_out_region(x, y))
        return FALSE;
    return TRUE;
}
```

JS `1005–1023`:

```
if (!trapok) {
    const trap = trap_at(x, y);
    if (!trap) trapok = true;
    else if ((trap.ttyp | 0) === VIBRATING_SQUARE) trapok = true;
    else if ((is_pit(trap.ttyp) || is_hole(trap.ttyp))
        && (Levitation() || Flying())) trapok = true;
    if (!trapok) return false;
}
if (!goodpos(x, y, game.youmonst || null, 0)) return false;
return true;
```

C `trapok` is a by-value `boolean`; assigning it does not mutate the caller. JS local `trapok` is the same. Callers that pass `TRUE` (`teleok(nux,nuy,TRUE)` backup trap spot in `safe_teleds`) skip the whole block. Match.

No trap → ok. VS → ok even when grounded. PIT / SPIKED_PIT / HOLE / TRAPDOOR → ok iff Levitation or Flying. TELEP / MAGIC_PORTAL / WEB / BEAR / LANDMINE stay rejected when `trapok` is false. Match.

`is_pit` is PIT|SPIKED_PIT only. `is_hole` is HOLE|TRAPDOOR only. A vibrating square is **neither**; it takes the dedicated else-if, not the pit/fly arm. C comment: “not a real trap.” Match.

### Levitation / Flying clones (not re-ported here)

`Levitation()` is `(H||E||uprops[LEVITATION]) && !B` — sticky `u.Levitation` is ignored (D-1070). `Flying()` adds steed `is_flyer` and blocks `BFlying` (D-1085). C `youprop.h` Flying includes the steed. Worn `AMULET_OF_FLYING` writes `uprops[FLYING].extrinsic`, not `EFlying`; the clone reads the slot. Canary named H/E/uprop, sticky ignored, B* block, steed flyer. Match for this predicate.

### `goodpos` after trapok

C passes `&gy.youmonst` and flags `0` (no `GP_CHECKSCARY`, no `GP_AVOID_MONPOS`). STONE / closed door / lava-without-fly still fail `goodpos` even if trapok was flipped true. JS `game.youmonst` is the hero monst. If it were missing, `goodpos` would take the `!mtmp` object path; live `init` sets `youmonst`. Match.

`trap_at` walks `ftrap` (array or `ntrap` chain) then `level.traps`. C `t_at` walks `ftrap`. Extra `level.traps` lookup is pre-existing; VS is stored as a trap on that chain like C. Not introduced as a second VS table.

### Named tail of the same function

C still requires `tele_jump_ok(u.ux,u.uy,x,y)` (updest/dndest rectangles) and `in_out_region`. JS returns after `goodpos`. That omit predates this SHA and is already the live Open row `tele_jump_ok` / `in_out_region`. This SHA did not claim those arms. Vault ordinary dest is why the port left them always-allow (D-0373). Not a silent C-wrong of the trapok block.

## Hallucinations / overclaim

“Match C so a vibrating square or a pit/hole while levitating or flying is a legal teleport destination” is **true for the trapok rewrite, VS vs pit/hole split, youprop Lev/Fly, and the following `goodpos(&youmonst,0)`.** It is **not** true that `tele_jump_ok` or `in_out_region` now run, or that monster `rloc` uses `teleok` (it uses `rloc_pos_ok` / `goodpos`).

This is **not** “Match C dispatch, callee is a stub.” `trap_at`, `is_pit`/`is_hole`, `Levitation()`/`Flying()`, and `goodpos` are real. VS is a real `ttyp`, not a hardcoded coordinate.

Stamping **Addressed:** D-1111 is fair for the Open vibrating/pit-fly line. Hash `b0847b88` is on the archive row (filled by D-1112).

## Density (§2b)

One Open cluster: C’s one `if (!trapok)` envelope (~15 executable lines) in the function that already existed. Playbook “one deferred `if`” is the too-small column when the `if` is a stray conjunct; here it is the whole queued arm plus the youprop predicates it names. Sibling `mlevel_tele_trap` portal arms correctly left for the next SHA. Right size (small end).

## Verification

Journal: private canary **56**/56 (VS array/ntrap/level.traps; pit/hole/spiked/trapdoor; H/E/uprop Lev+Fly; sticky ignored; B* block; steed flyer; trapok TRUE backup; TELEP/portal/web reject; STONE still fails goodpos); green+strict seed8000/0900; cohort **41**/41 including 4500/0360/0367/0004 + strict 0014/4500/0360/2200/0367/0009/0004. Path **public-unhit** (no public VS / lev-pit `safe_teleds`). Cadence fortress is not a VS proof.

C read of `teleport.c:420–445` / `739–761` / `778` / `835` / `896`, `trap.h:70–82` / `113–114`, `youprop.h` Levitation/Flying; JS `teleport.js:1005–1023` / `197–216` / `726–744`, `const.js:2302–2321`. Hunk grepped FORCE/fs/seed.

| Case | C `teleok(x,y,FALSE)` | JS after |
|------|----------------------|----------|
| no trap, ROOM | then `goodpos` | **same** |
| VIBRATING_SQUARE, grounded | trapok true, then `goodpos` | **same** |
| PIT, grounded | false | **same** |
| PIT, `Levitation` | trapok true, then `goodpos` | **same** |
| HOLE, `Flying` (steed flyer) | trapok true | **same** |
| SPIKED_PIT, `BLevitation` | false | **same** |
| TELEP_TRAP | false | **same** |
| STONE + VS | `goodpos` false | **same** |
| `teleok(x,y,TRUE)` + WEB | skip trap block, then `goodpos` | **same** |
| sticky `u.Levitation` only | not Lev | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The trapok block matches `teleport.c:422–436`.

Named omits / do-nots (map / Open, not Must-fix):

1. `teleport.c` `teleok` `tele_jump_ok` / `in_out_region` (`teleport.c:440–443`). Live Open. Not vibrating/pit-fly.
2. `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP — **Addressed:** D-1112 `bb552fba` (next SHA).
3. Do not restore any-`trap_at` reject. Do not treat VS as `is_pit`. Do not use sticky `u.Levitation`/`u.Flying` here. Do not put `confdir` into `getdir` (unrelated Keep).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleok` now allows a vibrating square always and a pit/hole iff C `Levitation||Flying`, then still asks `goodpos(&youmonst,0)`, while `tele_jump_ok` / `in_out_region` stay named always-allow.
- Must-fix stays empty for this SHA; next port popped Open `mlevel_tele_trap` portal arms (D-1112).
