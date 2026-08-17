# Review 141 — 665bbe09 — teleport.c `rloc_to_core` telemsg (D-1180)

## Metadata
- Full / short hash: `665bbe09775a35b37a8bb5aa2567d56ab142ce80` / `665bbe09`
- Parent: `5f08f9e5` (D-1179). This file audits **this SHA only**. The fix stamped **Addressed:** D-1180 without the short hash; this review commit fills `665bbe09`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 21:28:12 +0200
- D-id: **D-1180**
- Stats: 10 files, +128 / −52 — `js/teleport.js` +47 / −16 (`rloc_post_move_msg` pline; `rloc_to_flag` same-cell return).
- Claims to close: Open queue `teleport.c` `rloc_to_core` telemsg vanishes-and-reappears (named). Not RLOC_ERR. Reviews **133–134** named vanish-msg polish after steed/`mnexto`. `reviews/loop-2026-08-15/` has no open telemsg Must-fix.
- JS / map: `teleport.js` `rloc_post_move_msg` / `rloc_to_flag`. `c-js-map/turns.md` `teleport.c`. ustuck-together You(); wand `makeknown`; `set_msg_xy`; `RLOC_ERR` still named.
- Prior reviews this SHA claims to close: D-1179 next-port; map omit from D-0885 / D-0886 / D-1173.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core telemsg so a spotted monster that teleports into sight vanishes and reappears (next/close-by/closer/farther), instead of going silent.”

Old JS `rloc_pre_move_msg` set `telemsg` when the dest was in LOS or the monster was sensed (else `"%s vanishes!"`), then `rloc_post_move_msg` **returned without a pline** on that arm. C prints `"%s vanishes and reappears%s."` with next-to / close-by / closer / farther / same-distance suffix. A spotted teleport that landed still visible was silent.

The diff **does** emit that pline with C’s ternary order and adds C’s same-cell return in `rloc_to_flag` before vanish/appear (`:1658–1659`). It does **not** port ustuck-together `You()`, wand `makeknown(WAN_TELEPORTATION)`, `set_msg_xy`, or `RLOC_ERR` `impossible()`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_post_move_msg` telemsg arm | C branch, **rewritten** | `teleport.c:1712–1719`; was empty `return` |
| `next` / `nearu` / closer / farther | C locals, **new on this arm** | `du<=2`; `du<=BOLT_LIM²`; else compare `olddu` |
| `rloc_to_flag` same-cell | C early return, **new** | `:1658–1659`; `m_at(x,y)==mtmp` |
| `rloc_pre_move_msg` | C, **untouched this SHA** | already returned `{domsg,telemsg,appearmsg,oldx,oldy}` |
| `rloc()` | C caller | already `rloc_to_with_msg` → `rloc_to_flag` (D-0885/0886) |
| `distu_xy` | C `distu`, **pre-existing** | squared Euclidean; not RNG |
| `BOLT_LIM` | C macro, **imported** | 8 |
| `Monnam` | C callee | appear/vanish names |
| ustuck-together `You()` | C first post-msg arm, **named omit** | `:1710–1711`; Open |
| wand `makeknown` | C after both plines, **named omit** | `:1730–1731` |
| `set_msg_xy` | C before plines, **named omit** | `:1708` |
| `RLOC_ERR` | C `rloc`, **named omit** | Open next |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Suffix is computed from live `distu`, not a recorded cell. Rule #2 clean.

**New RNG on this path:** none. `distu` / `couldsee` / `sensemon` / `canspotmon` are not dice. Same-cell return **prevents** a no-op from speaking.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No trace-index gates. Do not leave the telemsg arm as a silent `return`. Do not print appear **and** reappear (C `else if`). Do not skip the same-cell return (vanish+appear on a no-op). Do not pull `RLOC_ERR` into a line that said “Not RLOC_ERR.”

## C ↔ JS fidelity

### Same-cell vs `teleport.c:1658–1659`

C `rloc_to_core`:

```
if (x == mtmp->mx && y == mtmp->my && m_at(x, y) == mtmp)
    return;
```

before any vanish. JS added the same test at the top of `rloc_to_flag` (the message envelope around `rloc_to`). Direct `rloc_to(...)` without flags is the pre-existing place helper (mhurtle / some traps) and still has no message envelope — named split from D-0885. `rloc()` goes through `rloc_to_with_msg` → `rloc_to_flag`. Match the Open telemsg path.

### Pre-move `telemsg` vs `:1661–1673`

C if `oldx` (on-map): `domsg && canspotmon` → if `couldsee(dest) \|\| sensemon` then `telemsg=TRUE` else `"%s vanishes!"`; `appearmsg=FALSE`. JS `rloc_pre_move_msg` already did that (untouched). `oldx==0` migrating: no vanish, `telemsg` stays false → post-msg uses appear, not reappear. Match.

### Post-move vs `:1703–1726`

C after dest `newsym` / `set_apparxy`:

```
if (domsg && (canspotmon || appearmsg || mtmp == u.ustuck)) {
    du = distu(x,y);
    next = (du <= 2) ? " next to you" : 0;      /* next2u() */
    nearu = (du <= BOLT_LIM * BOLT_LIM) ? " close by" : 0;
    set_msg_xy(x, y);
    mstrategy &= ~STRAT_APPEARMSG;
    if (mtmp == u.ustuck && !u_at(u.ux0, u.uy0))
        You("and %s teleport together.", mon_nam(mtmp));
    else if (telemsg && (couldsee(x,y) || sensemon(mtmp)))
        pline("%s vanishes and reappears%s.", Monnam,
              next ? next : nearu ? nearu
                : ((olddu = distu(oldx,oldy)) == du) ? ""
                  : (du < olddu) ? " closer to you" : " farther away");
    else
        pline("%s %s%s%s!", appearmsg ? Amonnam : Monnam, …);
    if (current_wand && otyp == WAN_TELEPORTATION)
        makeknown(WAN_TELEPORTATION);
}
```

JS: `domsg` gate; `canspotmon \|\| appearmsg \|\| ustuck`; clear `STRAT_APPEARMSG`; compute `next` / `nearu` the same (`BOLT_LIM=8` → 64). **Skips** `set_msg_xy` (named). **Skips** ustuck-together (named; Open `rloc_to_core` ustuck-together pline). Then telemsg + `couldsee \|\| sensemon` → reappear pline with the same ternary (next beats nearu when `du<=2`; nearu beats closer/farther when `du<=64`; else `olddu==du` empty string, else closer vs farther). `return` so the appear pline does not also fire — C uses `else if`. Match the two plines.

When ustuck-together **would** fire in C, JS falls through to telemsg or appear. That is a **named sibling arm**, already queued Open, not a clone that contradicts the telemsg ternary. Do not Must-fix it onto “Not RLOC_ERR.”

`olddu` is assigned only in C’s last ternary arm; JS only computes `distu_xy(oldx,oldy)` in that else. `distu` is not RNG. Match.

Wand `makeknown` after either pline: JS `return` after reappear skips it; appear path also lacks it. Named. C always runs it if a message was delivered.

Appear path `near = next \|\| nearu \|\| ''` matches C `next ? next : nearu ? nearu : ""` (no closer/farther on the appear arm). Pre-existing; this SHA reused `next`/`nearu` instead of the old duplicated `du<=2` / bolt check. Match.

| Case | C | JS after |
|------|---|---------|
| same cell, `m_at` is self | return, no pline | **same** (`rloc_to_flag`) |
| spotted, dest not visible | `"%s vanishes!"` only | **same** (pre-move) |
| spotted, dest visible, `du<=2` | reappears ` next to you` | **same** |
| spotted, dest visible, `3<=du<=64` | ` close by` | **same** |
| spotted, dest visible, `du>64`, closer | ` closer to you` | **same** |
| spotted, dest visible, `du>64`, same dist | empty suffix | **same** |
| spotted, dest visible, `du>64`, farther | ` farther away` | **same** |
| `telemsg` false, now visible | appear/arrives (Blind) | **same** |
| Blind poly | `arrives` not `appears` | **same** (D-0928 #1128) |
| ustuck and hero moved | together You() | **named skip** (Open) |
| `RLOC_NOMSG` | `domsg` false | **same** |
| `rloc()` of steed | `tele()` D-1172 | **same** (before this envelope) |

`next2u()` in C is `du<=2` (Chebyshev would be different). Both use squared Euclidean `distu`. Do not switch this suffix to Chebyshev.

### `rloc()` vs impossible

C `rloc` after failing to find a cell may `impossible` under `RLOC_ERR`. JS still named. Not this peel.

## Hallucinations / overclaim

D-log / CURRENT / subject say a spotted monster that teleports into sight vanishes and reappears with next/close-by/closer/farther instead of going silent. **That is the hunk:** C `:1712–1719` plus same-cell `:1658–1659`. Stamping **Addressed:** D-1180 is fair for the Open **telemsg** line. Fill hash `665bbe09` in this commit. Do **not** stamp it as “Match C ustuck-together” or “Match C wand discovery” or “Match C `RLOC_ERR`.” This is **not** “Match C dispatch, callee is a stub”: the pline is the C string and suffix order; `Monnam` / `couldsee` / `sensemon` are live.

## Density

One C `else if` plus the same-cell return that prevents a no-op from using it. ~30 JS lines. Right-size §2b. `oldx`/`oldy` were already in the pre-move state. Did not pull `RLOC_ERR`. Not QUALITY-RISK.

## Verification

Journal: green+strict seed8000/0900; cohort **10**/10 (green + 1500/1800/0015/0002/0014/2200/4500/0367). Path **public-unhit** unless a spotted monster relocates to a still-visible cell. Same-cell / silent telemsg-return removal does not consume RNG; cadence **#1500** **44**/44 is the fortress check, not a spotted-rloc canary.

C read of `teleport.c:1645–1732`, `rloc` steed/wiz arms; JS SHA `rloc_post_move_msg` / `rloc_to_flag` / `rloc_pre_move_msg` return shape. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838 (100%).

## Actionable C-wrongs

None that Must-fix this next iter. The Open telemsg pline matches `:1712–1719`. Same-cell matches `:1658–1659`. Not a stub.

Named omits / do-nots (map / Open, not Must-fix):

1. ustuck-together `You("and %s teleport together")` (`:1710–1711`). Open.
2. `rloc_pos_ok` mx==0 updest/dndest. Open.
3. `RLOC_ERR` `impossible()` (`rloc`). Open next.
4. wand `makeknown(WAN_TELEPORTATION)`; `set_msg_xy`.
5. Do not silent-return on telemsg. Do not skip same-cell. Do not print appear after reappear. Do not pull `RLOC_ERR` into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a spotted on-map teleport that remains visible now prints C’s `"%s vanishes and reappears%s."` with next/close-by/closer/farther, and a same-cell `rloc_to_flag` returns before any message, while ustuck-together and `RLOC_ERR` stay named.
- Must-fix stays empty for this SHA; next port pops Open `rloc` `RLOC_ERR`. This review fills archive hash `665bbe09`. Not vanish-away, not `RLOC_ERR`.
