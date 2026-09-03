# Review 758 — 3cb13f27 — dog.c keepdogs fmon snapshot walk (D-1789)

## Metadata
- Full / short hash: `3cb13f27c966035f5743d3274dd3ec62f006d8d9` / `3cb13f27`
- Parent: `09159ed0` (D-1788). Claims to close review **752** QUALITY-RISK (`22730962` D-1783 leash/stay_behind live, `for-of` alias + `fmon=stay` deleted skipped monsters).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 22:44:03 +0200
- D-id: **D-1789**
- Stats: `js/dog.js` +28/−17. Total `js/` insertions **28** ≤250. Band **80–350**. Must-fix, one walk.
- Claims to close: Must-fix **752** — do not `for-of` live `fmon` while `migrate_to_level` splices it. Not `mon_leave`. Not `losedogs`.
- JS / map: `dog.js` `keepdogs`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1789 `3cb13f27`.

## Intent vs deliverable

Git subject promises: Match C `dog.c` `keepdogs` so the `fmon` walk survives its own splices, instead of a `for-of` over the live array plus a survivors rebuild that deleted skipped monsters.

`node scripts/csym.mjs keepdogs` → `dog.c:788–884`. `--callers`: `do.c:1624` `keepdogs(FALSE)`; `end.c:1298` `keepdogs(TRUE)`. `relmon` `mon.c:2559–2594`. `migrate_to_level` `dog.c:886–932`. `keep_mon_accessible` `:766–785`.

```788:794:nethack-c/upstream/src/dog.c
    for (mtmp = fmon; mtmp; mtmp = mtmp2) {
        mtmp2 = mtmp->nmon;
        if (DEADMONSTER(mtmp))
            continue;
```

Parent D-1783: `const list = game.fmon || []` (alias), `stay.push` everyone who did not depart, `game.fmon = stay`. `migrate_to_level` splices that same array (`js/teleport.js:2711–2713`). The diff **does** snapshot `[...(game.fmon || [])]`, splice the follower into `mydogs` in place, drop the rebuild, and leave ordinary/dead/`pets_only` rejects on live `fmon`. It **does not** port `relmon` / `mon_leaving_level` / `mon_leave`. Subject is delivered for the iterator C-wrong.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `keepdogs` walk | LIVE repaired | snapshot ≡ `mtmp2 = nmon` |
| follower unlink | CLONE of `relmon` unlink+prepend | splice + `mydogs.unshift`; **no** `mon_leaving_level` |
| `keep_mon_accessible` | LIVE local | C `staticfn` |
| `migrate_to_level` | LIVE | still splices live `fmon` (safe now) |
| `mintrap` / `m_unleash` / `mdrop_special_objs` | LIVE | unchanged this SHA |
| `relmon` / `mon_leave` / `mon_leaving_level` | OMIT named | NOT FOUND |
| `losedogs` `migrating_mons = stay` | OMIT named | different C function; `js/dog.js:1052` |

`node scripts/sym.mjs` (no clone→import; walk only):

```
keepdogs         js/dog.js:417   ASYNC — await required
keep_mon_accessible NOT EXPORTED — 1 LOCAL js/dog.js:374
migrate_to_level js/teleport.js:2706   sync
relmon           NOT FOUND
mon_leave        NOT FOUND
mon_leaving_level NOT FOUND
losedogs         js/dog.js:1032   ASYNC — await required
mintrap          js/trap.js:4493   ASYNC — await required
m_unleash        js/apply.js:1427   ASYNC — await required
```

`--can dog.js teleport.js migrate_to_level`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow in **JS**: **none** (seed names are in the commit message only). Rule #2 **clean**.

## C ↔ JS fidelity

**Iterator — match the defect.** C reads `nmon` **before** the body because `relmon` unlinks `mtmp` (`:863` follower; `:906` via migrate). JS has no `nmon`; `[...fmon]` is the walk order, live `game.fmon` is the list callees mutate. `for-of` on the copy cannot skip the monster that slides into a spliced slot. Dropping `fmon = stay` also keeps a callee-appended monster (C prepends past the cursor — not visited, not deleted). **Match the Must-fix.** Falsifier `[wizard, B, C]` → `fmon=[B,C]` not `[C]`.

**Dead / `pets_only` reject / stay_behind `continue`.** C `continue` leaves those on `fmon`. Parent `stay.push` then rebuild was equivalent **until** a splice skipped a sibling; the skip made `stay` incomplete. Now `continue` leaves them on the live array. **Match C.**

**Follower arm vs `relmon`.** C `:861–868`: `mon_leave` then `relmon(mtmp, &gm.mydogs)` (take off map, unlink `fmon`, **prepend** `mydogs`) then `mx=my=0`, `wormno`, `mlstmv`. JS: splice + `unshift` + `mx=my=0` + `mlstmv`. LIFO prepend **matches**. `mon_leave` / `mon_leaving_level` (`remove_monster` / `seemimic` / `fill_pit` / `newsym`) **named omit** — clone is unlink+prepend only, not a silent stub inside a claimed-complete arm.

**Accessible arm.** C `migrate_to_level` → `relmon(&migrating_mons)`. JS migrate still `indexOf`+`splice` + `migrating_mons.unshift`. Keepdogs no longer iterates that array. **Match the walk.** `mon_leave` inside migrate still named.

**Ordinary leftover.** C’s last `else if (mleashed)` slack; else fall off the loop **on fmon**. JS the same; comment is accurate. **Match.**

**Callee closure (this SHA).** LIVE: `mintrap`, `mdrop_special_objs`, `m_unleash`, `migrate_to_level`, `keep_mon_accessible`. OMIT named: `relmon`, `mon_leave`, `mon_leaving_level`, `losedogs` rebuild. STUB **in the walk**: **none**. `keepdogs` itself has no `rn2`.

## Hallucinations / overclaim

Subject “walk survives its own splices, instead of … survivors rebuild that deleted skipped monsters” is **true**. Do **not** stamp “Match C `relmon`.” Do **not** stamp “Match C `mon_leave`.” Do **not** stamp “`losedogs` no longer rebuilds `migrating_mons`.” Fortress 44/44 could not see the Wizard-not-last path; the falsifier probe could. Public-unhit for that shape; parity `[pet,B,C]` identical either way.

## Density

§2b Must-fix: one iterator family. +28. Did **not** glue `mon_leave` / `losedogs`. Allowed.

## Verification

D-log: falsifier `[wizard,B,C]`; parity pet path; green+strict per session; cohort 7/7; full `sessions` 44/44. save-oracle `dog.c:keepdogs` untagged skip. Rule #2 clean. This audit: `csym` `:788–884` / `relmon:2559–2594` vs HEAD `js/dog.js:428–512` and `js/teleport.js:2711–2713`.

## Actionable C-wrongs

None for Must-fix. Named: `relmon` `:2559` / `mon_leaving_level` `:2694`; `mon_leave` `:725`; `losedogs` `migrating_mons = stay` (`js/dog.js:1052`). Do **not** restore `game.fmon = stay`. Do **not** `for-of` live `fmon` here. Do **not** snap and slack the same pet.

Verdict: **ACCEPT-WITH-DEBT**
