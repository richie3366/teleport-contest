# Review 122 — 4dfadf3a — teleport.c `rloc_to` `update_monster_region` (D-1161)

## Metadata
- Full / short hash: `4dfadf3aa65c838fc8db4dcf027831b08488b4a6` / `4dfadf3a`
- Parent: `0a42e2bd` (review **118–121** + cadence #1475). This file audits **this SHA only**. Archive row **Addressed:** D-1161 `4dfadf3a` was filled by D-1162.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 14:51:58 +0200
- D-id: **D-1161**
- Stats: 11 files, +136 / −46 — `js/region.js` +25 / −1 (`update_monster_region`); `js/teleport.js` +11 / −3 (one call after place).
- Claims to close: Open queue `teleport.c` `rloc_to` `update_monster_region` (named). Not set_apparxy. Review **121** named omit 1 (`update_monster_region` after place, before worm tail). `reviews/loop-2026-08-15/` has no open region-membership Must-fix.
- JS / map: `region.js` `update_monster_region`; `teleport.js` `rloc_to`. `c-js-map/turns.md` `teleport.c`. mhitm displace / dbridge callers, vanish-msg, shk-home still named (shk/bill/mintrap shipped in D-1162–D-1164).
- Prior reviews this SHA claims to close: **121** named `update_monster_region` as next Open; D-1160 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a relocated monster runs update_monster_region after place, instead of leaving dest poisoncloud membership stale until a later walk.”

Old JS `rloc_to` wrote mx/my then worm tail / ustuck / unhide / dest `newsym` / `set_apparxy` with no region list update. C `rloc_to_core` (`teleport.c:1683–1688`) is `mon_track_clear`; `place_monster`; **`update_monster_region`**; then `place_worm_tail_randomly`. Walk uses `m_in_out_region` (can_enter/leave). C rloc does **not**.

The diff **does** export `update_monster_region` and call it after mx/my, before worm tail. It does **not** wire `mhitm.c:256–257` `mdisplacem` or `dbridge.c:687`. Named. Those are different callers (displace updates **after** both `place_monster`s; rloc updates **before** the worm tail).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `update_monster_region` | C callee, **new** | `region.c:598–611` |
| `rloc_to` call after place | C caller, **new call** | `teleport.c:1685` |
| `inside_region` | C callee, **pre-existing** | `region.c:63–73`; JS iterates `rects` (bbox fast-reject skipped) |
| `mon_in_region` / `add_mon_to_reg` / `remove_mon_from_reg` | C callees, **pre-existing** | `region.c:161–218`; membership by `m_id`; swap-pop remove |
| `m_in_out_region` | C sibling, **untouched** | walk dest + callbacks; rloc must not use this |
| `mdisplacem` / dbridge | C callers, **named omit** | `mhitm.c:256–257`; `dbridge.c:687` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none. Membership is geometry + `m_id` list. Path **public-unhit** on rloc into a live poisoncloud (`run_regions` inside_f still geometric for hero; monster list now dest-true).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Dest `(mx,my)` is the place result, not a traced cell.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not skip `attach_2_m` here (C does not). Do not invoke enter/leave/`can_enter` from rloc (those are `m_in_out_region`). Do not restore walk-only membership. Do not pull `mdisplacem` into this peel.

## C ↔ JS fidelity

### Order vs `teleport.c:1683–1688`

C:

```
mon_track_clear(mtmp);
place_monster(mtmp, x, y);
update_monster_region(mtmp);
if (mtmp->wormno)
    place_worm_tail_randomly(mtmp, x, y);
```

JS `teleport.js` after this SHA: track clear; mx/my; **`update_monster_region(mtmp)`**; worm tail. Match the Open **region** line. Head is on `reg.monsters` at dest **before** tail RNG.

Same-cell: C `:1658–1659` early return. JS same. No membership rewrite. Match.

### Body vs `region.c:598–611`

C (`region.c:598–611`):

```
for (i = 0; i < svn.n_regions; i++) {
    if (inside_region(gr.regions[i], mon->mx, mon->my)) {
        if (!mon_in_region(gr.regions[i], mon))
            add_mon_to_reg(gr.regions[i], mon);
    } else {
        if (mon_in_region(gr.regions[i], mon))
            remove_mon_from_reg(gr.regions[i], mon);
    }
}
```

Loop `svn.n_regions`: if `inside_region(reg, mon->mx, mon->my)` then add if absent, else remove if present. No `attach_2_m` skip. No callbacks. No RNG.

JS:

```
for (const reg of game.regions || []) {
    if (inside_region(reg, mx, my)) {
        if (!mon_in_region(reg, mon)) add_mon_to_reg(reg, mon);
    } else {
        if (mon_in_region(reg, mon)) remove_mon_from_reg(reg, mon);
    }
}
```

Branch-for-branch match. `add_mon_to_reg` already-in returns (C `impossible` for non-long-worm duplicates, then return). Silent JS return is the same membership. `remove_mon_from_reg` swap-pop matches C `:196–201`.

`inside_region`: C bbox then `nrects`. JS only `rects`. Pre-existing. Equivalent when `rects` are the source of truth (gas 1×1 cells). Not a new rloc C-wrong.

`add_mon_to_reg` skips `mon.m_id == null`. C always has `m_id`. Canary covered that guard. `makemon` assigns ids. Do not Must-fix.

### Not a stub

This is **new C**, not a dispatch onto a no-op. `run_regions` monster `inside_f` walks `reg.monsters`. Without this call, a teleported head stayed on the origin cloud list (or off the dest list) until a later `m_in_out_region` walk.

### Other C callers are not this peel

`mdisplacem` (`mhitm.c:251–257`): place both, **then** `update_monster_region` each (after the defender’s worm tail). Open `mhitm.c` `mdisplacem` `update_monster_region`. dbridge entity move (`dbridge.c:685–687`): after `place_monster`. Named. Do not treat those as misses of the rloc wire.

## Hallucinations / overclaim

D-log / CURRENT / subject say a relocated monster runs `update_monster_region` after place instead of leaving dest poisoncloud membership stale. **That is the hunk:** new function + one call between place and tail. Stamping **Addressed:** D-1161 is fair for the Open **rloc** line. Hash `4dfadf3a` is on the archive row (filled by D-1162). Do **not** stamp it as “Match C `mdisplacem`” or “walk `m_in_out_region` now skipped.” This is **not** “Match C dispatch, callee is a stub”: the body is the real C loop; add/remove/`mon_in_region` are the real list helpers.

## Density

One C function + the one rloc call site. ~25 JS lines. Thin vs §2b, but the queue item is exactly that wire (not displace, not vanish-msg). Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.” Sibling rloc tail (angry / bill / mintrap) shipped in later SHAs in this audit window.

## Verification

Journal: private canary **24**/24 (empty; enter; leave; stay in/out; two-region; attach_2_m still add; enter_f/leave_f not invoked; swap-pop; mx,my; no m_id; other mid; rloc enter/leave/same-cell/migrating/within cloud); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on rloc into a live poisoncloud.

C read of `teleport.c:1645–1688`, `region.c:63–73`, `:161–218`, `:598–611`, `mhitm.c:246–257`, `dbridge.c:682–687`; JS SHA `update_monster_region` + `rloc_to` call. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1480**) **44**/44.

| Case | C | JS after |
|------|---|---------|
| after place, before tail | `update_monster_region` | **same** |
| inside dest, not listed | `add_mon_to_reg` | **same** |
| listed, not inside | `remove_mon_from_reg` | **same** |
| `attach_2_m` | still geometry | **same** |
| enter/leave callbacks | none here | **same** |
| same-cell | no call | **same** |
| `mdisplacem` / dbridge | after their place | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open rloc call matches `teleport.c:1685` / `region.c:598–611`.

Named omits / do-nots (map / Open, not Must-fix):

1. `mhitm.c:256–257` `mdisplacem` `update_monster_region`. Open.
2. `dbridge.c:687` entity relocate.
3. `inside_region` bbox fast-reject — pre-existing; rects match C membership.
4. Do not skip `attach_2_m`. Do not run enter/leave from rloc. Do not restore walk-only membership.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now runs the real `update_monster_region` after place and before worm tail, so dest cloud membership is absolute from `(mx,my)` instead of waiting for a later walk.
- Must-fix stays empty for this SHA; next port in this window popped Open shk `make_angry_shk`. **Addressed:** D-1161 `4dfadf3a`. Not `mdisplacem`.
