# Review 157 — 143f9a46 — teleport.c `rloc_to_core` wand `makeknown` (D-1195)

## Metadata
- Full / short hash: `143f9a465a1795b9bee5b6c8e80fc2bf05b96cb8` / `143f9a46`
- Parent: `c4c57ac1` (D-1194). This file audits **this SHA only**. Archive row **Addressed:** D-1195 `143f9a46` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 01:25:58 +0200
- D-id: **D-1195**
- Stats: 10 files, +117 / −48 — `js/teleport.js` +26 / −12.
- Claims to close: Open queue `teleport.c` `rloc_to_core` wand `makeknown` (named from D-1183 / D-1180 / review **144**). Not ustuck-together. `reviews/loop-2026-08-15/` has no unpaid wand-discovery Must-fix.
- JS / map: `teleport.js` `rloc_post_move_msg`; callee `invent.js` `makeknown` → `discover_object` / `exercise(A_WIS)`. `c-js-map/turns.md`. `set_msg_xy` still named on this SHA (D-1196 next). Spell / mechanic / artifact #invoke leave `current_wand` Null.
- Prior reviews this SHA claims to close: **144** “not `makeknown`”; **141** telemsg named discovery omit.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a delivered relocate message discovers a zapped wand of teleportation.”

Old JS `rloc_post_move_msg` printed together / telemsg / appear then returned. C, **inside** the dest-msg gate after those plines, discovers the wand:

```
        /* wand discovery only happens if a messaage is delivered (bug?);
           if spell or q.mechanic attack or artifact #invoke for banish
           then current_wand will be Null */
        if (gc.current_wand && gc.current_wand->otyp == WAN_TELEPORTATION)
            makeknown(WAN_TELEPORTATION);
```

The diff **does** add that `if` after the dest plines, using `game.current_wand` and `objectNames` `WAN_TELEPORTATION`. It does **not** pull `set_msg_xy` (still a comment-omit on this SHA). It does **not** discover SPE_TELEPORT_AWAY or artifact invoke. Named by C’s Null `current_wand` comment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| dest-msg `makeknown` | C site, **new** | `teleport.c:1727–1731` |
| `makeknown` | C macro, **imported** | `hack.h:1530` → `discover_object(..., TRUE, TRUE, TRUE)` |
| `discover_object` | C callee, **imported** | `invent.js:1191–1223` |
| `exercise(A_WIS, TRUE)` | C callee, **imported** | `attrib.c:489–518`; `rn2(19) > ACURR` |
| `game.current_wand` | C `gc.current_wand`, **imported** | `zap.js` `dozap` `:3789–3791` around `weffects` |
| `WAN_TELEPORTATION` | C otyp, **indexOf name** | not a hardcoded seed otyp |
| `set_msg_xy` | C sibling, **named omit this SHA** | D-1196 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** `exercise` `rn2(19)` **only** when the type was unknown (`!oc_name_known`) and `credit_hero` (makeknown’s fourth TRUE). Already-known wand: `discover_object` returns before exercise — **zero** extra RNG. Silent / `RLOC_NOMSG` / unspotted / same-cell / `in_mklev` never reach the `if`. Public-unhit unless a teleport wand is zapped and a dest relocate message is seen while the type is still unknown.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Gate vs `teleport.c:1703–1732`

C dest-msg:

```
    if (domsg && (canspotmon(mtmp) || appearmsg || mtmp == u.ustuck)) {
        int du = distu(x, y), olddu;
        const char *next = (du <= 2) ? " next to you" : 0,
                   *nearu = (du <= BOLT_LIM * BOLT_LIM) ? " close by" : 0;
        set_msg_xy(x, y);          /* still omit this SHA */
        mtmp->mstrategy &= ~STRAT_APPEARMSG;
        if (ustuck && !u_at(ux0,uy0)) You("and %s teleport together.", …);
        else if (telemsg && (couldsee || sensemon)) pline(vanishes and reappears…);
        else pline(appears/arrives…);
        if (gc.current_wand && gc.current_wand->otyp == WAN_TELEPORTATION)
            makeknown(WAN_TELEPORTATION);
    }
```

JS `rloc_post_move_msg` (`teleport.js:1071–1118`): `if (!domsg) return`; then `if (!(canspotmon || appearmsg || ustuck)) return`; then du/next/nearu; (this SHA still skips `set_msg_xy`); strategy clear; the three pline arms; **then** the wand `if`. **Makeknown sits after any delivered dest pline, inside the same gate.** Vanish-only (`rloc_pre_move_msg` sets `appearmsg=false` when spotted at origin) that cannot spot at dest and is not ustuck **returns before** makeknown — C dest-msg `if` fails the same way. `RLOC_NOMSG` / `in_mklev` set `domsg` false in `rloc_pre_move_msg`. Same-cell `rloc_to_flag` returns before pre/post msg (`:1658–1659` / JS `:1128–1130`).

`rloc_to_flag` always `await rloc_post_move_msg` after place (unless same-cell). C does dest-msg in `rloc_to_core` after place. Split JS envelope still funnels discovery through the dest-msg function. Not a second makeknown on vanish-only.

`rloc_pre_move_msg` (`teleport.js:1043–1060`) copies C `:1661–1672`: if `domsg && oldx && canspotmon`, then `couldsee(dest)||sensemon` sets `telemsg` else `pline("%s vanishes!", Monnam)`; **then `appearmsg = false`**. Dest-msg therefore cannot take the “suddenly appears” arm after a spotted teleport-away. makeknown still runs if dest-msg’s remaining condition holds (canspot at dest, leftover appearmsg, or ustuck). C same: vanish-at-origin does not by itself skip discovery.

Resident shk angry is **after** dest-msg + makeknown in C (`:1739–1740`). JS `rloc_to_flag` runs `rloc_post_move_msg` (includes makeknown) then `rloc_maybe_angry_shk`. Order matches. Do not move makeknown after angry.

### `current_wand` vs `zap.c` `dozap`

C `dozap` sets `gc.current_wand = obj` around `weffects`, then Null. JS (`zap.js:3789–3791`) `game.current_wand = obj; await weffects(obj); game.current_wand = null`. Monster `rloc` during `weffects` therefore sees the wand. Spell / q.mechanic / `#invoke` never set it — Null skip. JS compares `otyp === WAN_TELEPORTATION` then `makeknown(WAN_TELEPORTATION)` the **constant**, not `current_wand.otyp` as a different index. Matches C using the otyp macro twice.

WAN_LIGHT / other otyp: condition false, no makeknown, no `rn2(19)`. Canary claimed that.

### `makeknown` vs `hack.h:1530` / `invent.c` `discover_object` / `attrib.c:499–509`

`#define makeknown(x) discover_object((x), TRUE, TRUE, TRUE)`. JS `makeknown` → `discover_object(otyp, true, true, true)`. Newly naming: `oc_name_known = 1` then `exercise(A_WIS, true)`. `exercise` skips INT/CHA; poly skips non-WIS; then `AEXE += (rn2(19) > ACURR(i))` when `|AEXE| < 50`. JS (`attrib.js:167–182`) **same `rn2(19)`**. Already known: `need` false, return, **no rn2**. **Callee is live, not a stub.** C `exercise` also `encumber_msg` for STR/CON after WIS path — not taken here.

Disco list / `oc_encountered` / Samurai Japanese name: pre-existing `discover_object` body, not introduced this SHA. Fourth TRUE is `credit_hero`; third is `mark_as_encountered`. Both set. `discover_object` walks `game.disco` from `bases[oc_class]` looking for a free or matching slot; that walk is **not** RNG. Only `exercise` rolls, and only when `mark_as_known && !oc_name_known`.

`apply.js` / `music.js` also assign `game.current_wand` around some effects. Those are C `gc.current_wand` siblings. If a broken wand or instrument were somehow otyp `WAN_TELEPORTATION` during `rloc`, JS would discover — same pointer test as C. Not a seed gate.

| Case | C | JS after |
|------|---|---------|
| dest msg + WAN_TELEPORTATION unknown | makeknown + rn2(19) | **same** |
| dest msg + already known | makeknown no exercise rng | **same** (`!need`) |
| dest msg + Null wand | skip | **same** |
| dest msg + WAN_LIGHT | skip | **same** |
| SPE_TELEPORT_AWAY / invoke | Null wand | **same** |
| RLOC_NOMSG / in_mklev / same-cell | no dest msg | **same** |
| vanish-only unspotted dest | no dest msg | **same** |
| ustuck-together / telemsg / appear | discover after pline | **same** |
| `set_msg_xy` before plines | `:1708` | **omit this SHA** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if otyp===WAN_TELEPORTATION && seed2200”. Discovery is the C dest-msg `if` plus live `makeknown`. Rule #2: no fs. Do not set `oc_name_known` without `exercise` when credit_hero is TRUE and the type was unknown. Frozen `isaac64.js` untouched; `rn2(19)` goes through `rng.js`.

## Hallucinations / overclaim

D-log / CURRENT / subject say a delivered relocate message discovers a zapped teleport wand. **That `if` after the dest pline is the hunk.** Stamping **Addressed:** D-1195 is fair. This is **not** “Match C dispatch, callee is a stub”: `makeknown` → `discover_object` → `exercise` `rn2(19)` is the C credit path. Do **not** stamp “Match C `set_msg_xy`” on this SHA (D-1196). Do **not** stamp “Match C spell teleport discovery.”

`otyp === WAN_TELEPORTATION` is the object-class index, not a seed-shaped constant. `objectNames.indexOf` is how this port names otyps everywhere.

### Clone classification (this SHA)

- dest-msg `makeknown` — C site, new.
- `makeknown` / `discover_object` / `exercise` — C callees imported, live.
- `WAN_TELEPORTATION` — generated otyp index, not a clone.
- No new helper clone. No no-op.

`dozap` Nulls `current_wand` after `weffects` returns. A monster that `rloc`s **during** `weffects` still sees the wand; a later `rloc` from a timeout does not. C same. `learnwand` / `makeknown` from other zap arms are separate sites; this SHA only adds the `rloc_to_core` dest-msg one.

## Density

One `if` after the dest-msg plines. Thin versus §2b’s 50–300 line target. It is the entire queued Open row (one C site, one JS function). Did not glue `set_msg_xy` (next Open). After fortress PASS the playbook prefers denser clusters; the live queue still says do not combine items. Acceptable one-row peel; this audit amortizes the read-in cost of 1193–1196. RNG check is call-for-call: dest-msg delivered + unknown wand is exactly one `rn2(19)` via `exercise`, never `rnd`/`rn1`.

## Verification

Journal: private canary **27**/27 (C/JS order; new known `rn2(19)`; already-known no exercise; Null / WAN_LIGHT / SPE_TELEPORT_AWAY skip; silent `rloc_to` / RLOC_NOMSG / unspotted / same-cell / `in_mklev` skip; appearmsg + ustuck-together still discover; otyp not pointer; no fs/FORCE); green+strict seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/2200/0014. Path public-unhit unless a teleport wand is zapped and a dest message is seen while unknown. Cadence **#1520** **44**/44 does not prove discovery.

Grep of `git show 143f9a46 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `teleport.c:1658–1732`, `hack.h:1530`, `attrib.c:489–518`, `zap.c` `dozap` current_wand wrap. JS SHA `teleport.js` `rloc_post_move_msg`; existing `invent.js` / `attrib.js` / `zap.js`.

`makeknown` does not `pline` the wand name; discovery is silent until the next xname. C same. Screen match on public sessions therefore cannot prove this `if`. The canary’s `rn2(19)` vs skip is the falsifier. Public-unhit is admitted, not hidden by green. Cohort 14 is rloc/teleport-adjacent, not a combat substitute.

## Actionable C-wrongs

None. Claimed discovery matches `:1727–1731` with a live `makeknown`.

Named omits / do-nots:

1. `set_msg_xy` (next Open this window — D-1196). `accessiblemsg` consume.
2. Do not `makeknown` on vanish-only or Null wand. Do not discover SPE_TELEPORT_AWAY here. Do not revert D-1195. Do not hardcode a seed’s wand `dknown`. Do not put `makeknown` before the dest pline (C comment: only if a message is delivered). Do not `makeknown(current_wand.otyp)` via a different index than `WAN_TELEPORTATION`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: dest-msg `rloc_post_move_msg` now calls C’s `makeknown(WAN_TELEPORTATION)` after together/telemsg/appear when `current_wand` is that wand; `discover_object`/`exercise` `rn2(19)` is live, and silent/Null/other-otyp paths skip.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1195 `143f9a46`. Next port in this window popped Open `set_msg_xy`. Not Override, not consume.
