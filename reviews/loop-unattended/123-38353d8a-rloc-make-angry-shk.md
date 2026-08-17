# Review 123 — 38353d8a — teleport.c `rloc_to` `make_angry_shk` (D-1162)

## Metadata
- Full / short hash: `38353d8ab503f86043a9758cbb7ecde5b02cfea0` / `38353d8a`
- Parent: `4dfadf3a` (D-1161). This file audits **this SHA only**. Archive row **Addressed:** D-1162 `38353d8a` was filled by D-1163.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 15:21:53 +0200
- D-id: **D-1162**
- Stats: 10 files, +138 / −44 — `js/teleport.js` +43 / −5 (`rloc_maybe_angry_shk`; `rloc_to` snap + defer; `rloc_to_flag` after appear).
- Claims to close: Open queue `teleport.c` `rloc_to` shk `make_angry_shk` (named). Not vanish-msg. Review **121** named shk-home. `reviews/loop-2026-08-15/` has no open shk-rloc Must-fix.
- JS / map: `teleport.js` `rloc_to` / `rloc_to_flag`; `shk.js` `make_angry_shk` (pre-existing). `c-js-map/turns.md` `teleport.c`. `addupbill` bill_p walk, `setpaid` unpaid walks, vanish-msg still named (bill/mintrap shipped D-1163–D-1164).
- Prior reviews this SHA claims to close: **121** named shk-home; D-1161 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a shopkeeper teleported out of their shop runs make_angry_shk, instead of staying peaceful with no hot_pursuit.”

Old JS placed then `set_apparxy` with no shopkeeper-home check. C `rloc_to_core` snapshots `resident_shk = isshk && inhishop(mtmp)` **before** same-cell return / pickup (`teleport.c:1651`), then after dest (after vanish/appear when `domsg`) `if (resident_shk && !inhishop(mtmp)) make_angry_shk(mtmp, oldx, oldy)` (`:1739–1740`). `ox`/`oy` ARGSUSED (`shk.c:1472`).

The diff **does** snapshot before pickup, call `make_angry_shk` after dest on silent `rloc_to`, and defer that call in `rloc_to_flag` until after `rloc_post_move_msg` (C order: appear then angry). JS-only `rloc_opts.defer_shk_angry` exists because JS split `rloc_to_core` into silent place + flag wrapper. Final order matches C. It does **not** port vanish-msg polish, minvent `stolen_value`, occupation, or `mintrap` (later SHAs / named).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_maybe_angry_shk` | C inline, **wrapper** | `teleport.c:1739–1740` |
| `rloc_to` `resident_shk` snap | C local, **new** | `:1651` before same-cell |
| `rloc_to` return snap / `defer_shk_angry` | JS-only split | preserves C appear-then-angry |
| `inhishop` | C callee, **imported clone** | `shk.c:1039–1048`; JS roomno match, `on_level`/`in_rooms` named |
| `make_angry_shk` | C callee, **imported** | `shk.c:1470–1488`; not a no-op |
| `hot_pursuit` / `rile_shk` | C callees, **imported** | `mpeaceful=0`, `following=1` |
| `addupbill` | C callee, **stub 0** | `shk.c:496–507`; **named** on `make_angry_shk` |
| `setpaid` | C callee, **partial** | counters only; unpaid/billobjs walks named |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none in the rloc snapshot/call. `make_angry_shk` has no `rn2`. Path **public-unhit** on a resident shk rloc out of shop.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. `oldx`/`oldy` are origin mx/my, not traced cells.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not snapshot `inhishop` after pickup (origin would already be vacated). Do not run angry before appear on `rloc_to_flag`. Do not restore peaceful resident shk after off-shop rloc. Do not pull `stolen_value` into this peel.

## C ↔ JS fidelity

### Snapshot and dest check vs `teleport.c:1651`, `:1658–1659`, `:1739–1740`

C: `resident_shk` before same-cell return. Same-cell returns without angry. After dest messages: `resident_shk && !inhishop(mtmp)` → `make_angry_shk(mtmp, oldx, oldy)`. Dest `inhishop` uses post-place mx/my.

JS: same snapshot before same-cell (`return null`). Silent `rloc_to` (C `RLOC_NOMSG`) angry after `set_apparxy`. `rloc_to_flag`: `defer_shk_angry` then appear then `rloc_maybe_angry_shk`. `if (snap)` skips angry on same-cell. Match.

`rloc()` goes through `rloc_to_with_msg` → `rloc_to_flag`, so MSG rlocs get appear-then-angry. Direct `rloc_to` (mvault_tele teledest, apply pull, clog `rloc_to`) is the C `RLOC_NOMSG` path. Match.

Stay-in-shop dest: `inhishop` still true → no call. Already-out origin: `resident_shk` false → no call. Non-shk: false. Match.

### Callee is not a stub of the **claimed** effect

C `make_angry_shk` (`shk.c:1475–1488`):

```
if (eshkp->billct || eshkp->debit || eshkp->loan || eshkp->credit) {
    eshkp->robbed += (addupbill(shkp) + eshkp->debit + eshkp->loan);
    eshkp->robbed -= eshkp->credit;
    if (eshkp->robbed < 0L) eshkp->robbed = 0L;
    setpaid(shkp);
}
pline("%s %s!", Shknam(shkp), !ANGRY(shkp) ? "gets angry" : "is furious");
hot_pursuit(shkp);
```

`make_angry_shk` (`shk.c:1470–1488` / `shk.js:914–929`):

1. If `billct \|\| debit \|\| loan \|\| credit`: `robbed += addupbill + debit + loan - credit`; clamp ≥0; `setpaid`.
2. `pline("%s %s!", Shknam, !ANGRY ? "gets angry" : "is furious")` **before** `hot_pursuit` (ANGRY ≡ `!mpeaceful`).
3. `hot_pursuit`: `rile_shk` (`mpeaceful=0`, surcharge flag), customer, `following=1`, clear floor `no_charge`.

JS does that order. The subject’s “instead of staying peaceful with no hot_pursuit” is this body: `rile_shk` clears `mpeaceful`; `following` is set. Live callers already exist (`trap.js`, `dothrow.js`, `dokick.js`). Wiring rloc is the missing **caller**, not a new stub.

### `addupbill` stub — D-log overclaim, not this Must-fix

C `addupbill` (`shk.c:496–507`) sums `bill_p[i].price * bquan`. JS `addupbill` returns **0** (`shk.js:3088–3091`, named “stub 0 until bill_p walk”). For a resident shk **with a live bill**, C folds that total into `robbed` then `setpaid`; JS folds debit/loan/credit only, then zeros `billct`. Canary “debit/loan/credit robbed fold + setpaid” does **not** exercise `bill_p`. D-log “bill fold” overclaims the bill_p portion.

This is **not** “Match C dispatch, callee is a stub”: `make_angry_shk` / `hot_pursuit` are real. `addupbill` is a **named** internal omit that **predates** this SHA and already runs from kick/throw/trap angry. Same rule as review **121** youprop clones: do not Must-fix it onto this wire. `setpaid` skipping `clear_unpaid` / `billobjs` is the same named family (`shk.c:400–434` vs JS counters-only).

### `inhishop` clone

C `:1039–1048`: `on_level(shoplevel, u.uz)` then `strchr(in_rooms(mx,my,SHOPBASE), shoproom)`. JS: `loc.roomno === eshk.shoproom`. Shared-wall `in_rooms` multi-room and off-level `on_level` are named. Pre-existing (`costly_spot` / `shk_move`). rloc is same-level. Not a new C-wrong of this SHA.

## Hallucinations / overclaim

D-log / CURRENT / subject say a shopkeeper teleported out of their shop runs `make_angry_shk` instead of staying peaceful with no `hot_pursuit`. **That is the hunk:** origin snapshot + dest `!inhishop` + imported callee. Stamping **Addressed:** D-1162 is fair for the Open **shk** line. Hash `38353d8a` is on the archive row (filled by D-1163). Do **not** stamp it as “Match C `addupbill` bill_p” or “Match C vanish-msg.” Say explicitly: the **dispatch** is real; `addupbill==0` is a named callee-internal omit the D-log’s “bill fold” over-states.

`defer_shk_angry` is JS architecture, not C. Order after `rloc_to_flag` still matches `:1703` then `:1739`.

## Density

One C call site + snapshot + flag-wrapper deferral so appear stays first. ~40 JS lines. Thin vs §2b, but the queue item is exactly that wire. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **32**/32 (leave-shop angry+following+“gets angry”; stay-shop; already-out; non-shk; same-cell; furious; debit/loan/credit robbed + `setpaid`; null; `rloc_to_flag` appear-then-angry; flag stay-shop; priest; migrating mx==0); green+strict seed8000/0900; cohort **41**/41 + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on resident shk rloc out of shop.

C read of `teleport.c:1645–1740`, `shk.c:400–434`, `:496–507`, `:1039–1048`, `:1470–1488`; JS SHA `rloc_to` / `rloc_to_flag` / existing `make_angry_shk`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1480**) **44**/44.

| Case | C | JS after |
|------|---|---------|
| snap before pickup | `isshk && inhishop` | **same** |
| same-cell | no angry | **same** |
| dest still shop | no call | **same** |
| dest off shop | `make_angry_shk` | **same** |
| `rloc_to` NOMSG | angry after dest | **same** |
| `rloc_to_flag` MSG | appear then angry | **same** |
| `hot_pursuit` | `mpeaceful=0`, follow | **same** |
| `addupbill` bill_p | sum into robbed | **named 0** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open dest call matches `teleport.c:1739–1740`. `make_angry_shk` / `hot_pursuit` are real.

Named omits / do-nots (map, not Must-fix):

1. `addupbill` bill_p walk (`shk.c:496–507`) — stub 0; D-log “bill fold” is debit/loan/credit only.
2. `setpaid` `clear_unpaid` / `billobjs` (`shk.c:405–427`).
3. `inhishop` `on_level` / `in_rooms` multi-room — pre-existing clone.
4. Do not snapshot after pickup. Do not angry before appear on `rloc_to_flag`. Do not restore peaceful off-shop resident shk.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now snapshots `inhishop` at origin and runs the real `make_angry_shk`/`hot_pursuit` when the shk is no longer in shop, after appear when flagged.
- Must-fix stays empty for this SHA; next port in this window popped Open minvent shop bill. **Addressed:** D-1162 `38353d8a`. Not `addupbill`.
