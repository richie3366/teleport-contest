# Review 577 — 6d7584b0 — priest.c reset_hostility / do.c final_level (D-1616)

## Metadata
- Full / short hash: `6d7584b0a476d110a047c5572f3e644443a6ecd8` / `6d7584b0`
- Parent: `6a08939b` (D-1615). This file audits **this SHA only** (fifth of nine `js/` commits since review **572**). Archive **Addressed:** D-1616 `6d7584b0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 03:01:55 +0200
- D-id: **D-1616**
- Stats: `js/priest.js` +27/−3, `js/do.js` +24/−6, comment-only minion/mklev/mplayer. Band **150–350** (js/ insertions **55**).
- Claims to close: Open `reset_hostility` after D-1608. Not ACH_ASTR. Not dogmove Conflict. `reviews/loop-2026-08-15/` has no unpaid reset_hostility Must-fix.
- JS / map: `priest.js` `reset_hostility`; `do.js` `final_level`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **569** named `reset_hostility`; **557** named `final_level` reset_hostility / ACH_ASTR.

## Intent vs deliverable

Git subject promises: Astral `final_level` `iter_mons` turns misaligned minion clerics/angels hostile, instead of leaving them peaceful.

Pinned C `priest.c` `reset_hostility` `:754–768`. Caller `do.c` `final_level` `:2042–2053` via `mon.c` `iter_mons` `:4526–4538` (`DEADMONSTER` / `mon_offmap`). `--callers reset_hostility` prints only `extern.h` (function pointer into `iter_mons`). `--callers final_level`: `goto_level` `:1886` when `new && on_level(&u.uz, &astral_level)`. Callees `set_malign` / `newsym` live. Then `create_mplayers(rn1(4,3), TRUE)` (D-1596) then `gain_guardian_angel` (D-1608).

```754:768:nethack-c/upstream/src/priest.c
void
reset_hostility(struct monst *roamer)
{
    if (!roamer->isminion)
        return;
    if (roamer->data != &mons[PM_ALIGNED_CLERIC]
        && roamer->data != &mons[PM_ANGEL])
        return;

    if (EMIN(roamer)->min_align != u.ualign.type) {
        roamer->mpeaceful = roamer->mtame = 0;
        set_malign(roamer);
    }
    newsym(roamer->mx, roamer->my);
}
```

Old JS: `goto_level` Astral `madeNew` ran create_mplayers + `gain_guardian_angel` only.

The diff **does** port `reset_hostility` (mndx/mnum, not C pointer equality — `mons()` allocates), `final_level` fmon walk then the two live callees, and wires `goto_level`. It **does not** port `record_achievement(ACH_ASTR)`, ACH_ENDG, or dogmove Conflict `lose_guardian_angel`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `reset_hostility` | C `:754–768`, **LIVE this SHA** | priest.js export |
| `final_level` | C `:2042–2053`, **LIVE this SHA** | local in `do.js` (C `staticfn`) |
| `iter_mons` | C `:4526–4538`, **CLONE** inlined | skip dead / off-map; do not add #2 |
| `set_malign` | C makemon, **LIVE** | |
| `newsym` | C display, **LIVE** | |
| `EMIN` | C `mextra.h:222`, **LIVE** | `const.js` |
| `create_mplayers` | C, **LIVE** | D-1596; after the walk |
| `gain_guardian_angel` | C, **LIVE** | D-1608; awaited |
| `ACH_ASTR` | C `:1887`, **OMIT named** | |
| dogmove Conflict caller | C dogmove `:1046`, **OMIT named** | next Open at the time |

`node scripts/csym.mjs reset_hostility` → `:754-768`. `final_level` → `:2042-2053`. `iter_mons` → `:4526-4538`. `mon_offmap` → `mstate != MON_FLOOR` (`monst.h:255`). `DEADMONSTER` → `mhp < 1`.

RNG: none in `reset_hostility`. `rn1(4,3)` stays **after** the walk, as C (old JS burned it first). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
reset_hostility  js/priest.js:88   sync
final_level      NOT EXPORTED — 1 LOCAL in js/do.js:1325
set_malign       js/makemon.js:616   sync
newsym           js/display.js:3183   sync
EMIN             js/const.js:2952   sync
create_mplayers  js/mplayer.js:334   sync
gain_guardian_angel js/minion.js:457   ASYNC — await required
iter_mons        NOT FOUND in js/** (inlined; do not add a local clone)
```

`--can do.js priest.js reset_hostility`: ALREADY. `--can priest.js makemon.js set_malign`: ALREADY. `--can priest.js display.js newsym`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `reset_hostility` #2. Do **not** add `final_level` #2. Do **not** add generic `iter_mons` for this one callback.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Guards. `!isminion` return; not aligned-cleric and not angel return. JS `mndx = data?.mndx ?? mnum` vs C `&mons[PM_*]` pointer. **Match the species test** given JS `mons()` identity (same as D-1606). Extra JS `emin &&` before `min_align`: C `EMIN(roamer)->min_align` assumes minion extra exists. If emin is missing JS skips the hostile assign but still `newsym`. Live `mk_roamer` sets emin (D-1608). Not a stub.

Hostile. `min_align != u.ualign.type` → `mpeaceful = mtame = 0` then `set_malign`. **Match `:763–766`.** Coaligned minions stay peaceful/tame; still `newsym`. **Match `:767`.**

`newsym`. After the align test, even when aligned. Early returns skip it. **Match.**

`iter_mons`. Save `nmon`, skip `mhp<1` and `mstate != MON_FLOOR`, call vfunc. JS snapshot `[...fmon]` (array, callback does not unlink). **Match `:4526–4538` for this vfunc.**

`final_level` order. Walk, then `create_mplayers(rn1(4,3), true)`, then `gain_guardian_angel`. New mplayers/angel are **not** in the walk. **Match `:2045–2052`.** `goto_level`: `madeNew && Is_astralevel` vs C `new && on_level(..., astral_level)`. **Match the existing gate.** ACH_ASTR after return still named.

Callee closure (`final_level`). LIVE: `reset_hostility`, `set_malign`, `newsym`, `create_mplayers`, `gain_guardian_angel`, `rn1`. CLONE: inlined `iter_mons`. OMIT named: ACH_ASTR. STUB: none. Combined-arm may ship.

## Hallucinations / overclaim

Subject Astral first visit turns misaligned minion clerics/angels hostile: **true of `final_level`.** D-log “mndx/mnum not pointer equality”: **true.** Do **not** stamp “Match C `record_achievement(ACH_ASTR)`.” Do **not** stamp “Match C ACH_ENDG.” Do **not** stamp “Match C dogmove `:1046` `lose_guardian_angel`.” Do **not** stamp “Match C `iter_mons` as a shared export.” Public suite does not reach Astral `final_level` (same as **569**).

## Density

Caller/callee: `reset_hostility` + `final_level` + one `goto_level` site. +55 JS. Did not glue dogmove Conflict. §2b OK.

## Branch-by-branch confirm

1. Non-minion / non-cleric-angel: no newsym. **Match.**
2. Minion angel/cleric, align mismatch: hostile + `set_malign` + `newsym`. **Match.**
3. Minion coaligned: `newsym` only. **Match.**
4. Dead / off-map: skip. **Match.**
5. Then `rn1(4,3)` mplayers then angel. **Match.**
6. ACH_ASTR / dogmove. **Named.**

## Callers / RNG ledger

Wired: `goto_level` Astral `madeNew` only, as C. No RNG inside `reset_hostility`. `rn1` still only in `create_mplayers`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not compare `data` pointer identity. Do not walk fmon *after* create_mplayers. Do not `tamedog` here. Do not wrap `wildmiss` as `pline_mon`. gain_guardian_angel is D-1608. create_mplayers is D-1596.

## Verification

D-log private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Astral `final_level` (no public session is first visit to Astral). Fortress Tourist stairs do not prove `reset_hostility`. ACH_ASTR / dogmove Conflict unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `record_achievement(ACH_ASTR)` (`do.c:1887`); ACH_ENDG; dogmove Conflict `lose_guardian_angel`; shared `iter_mons` export. Do not add `reset_hostility` in `minion.js`. Do not skip `newsym` on coaligned minions.

Verdict: **ACCEPT-WITH-DEBT**
