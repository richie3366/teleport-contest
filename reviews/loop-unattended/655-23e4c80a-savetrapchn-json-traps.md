# Review 655 — 23e4c80a — save.c savetrapchn current-level JSON traps (D-1694)

## Metadata
- Full / short hash: `23e4c80a0c6885b2f176ae9869e17c3ea12d23d8` / `23e4c80a`
- Parent: `605f0f2e` (D-1693). This file audits **this SHA only** (second of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1694 `23e4c80a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 01:38:18 +0200
- D-id: **D-1694**
- Stats: `js/save.js` +65/−7; `js/bones.js` +4/−3. Total `js/` insertions **69** <250. Band **150–350**.
- Claims to close: ledger Cluster 0 — persist current-level traps. Not other-floor `LFILE_EXISTS`. Not binary NHFILE. `reviews/loop-2026-08-15/` has no unpaid savetrapchn Must-fix.
- JS / map: `save.js` `serTraps`/`deserTraps` (later D-1696 moved to `lev_json.js`); `bones.js`. `c-js-map/harness.md` / `absent.md`.
- Prior reviews this SHA claims to close: none written; map named JSON save dropping traps.

## Intent vs deliverable

Git subject promises: JSON restore keeps level traps, instead of writing empty `game.ftrap` and wiping `map.traps`.

`node scripts/csym.mjs savetrapchn` → `save.c:919–943`. `--callers`: prototype `:29`; `savelev_core` `:544` `savetrapchn(nhfp, gf.ftrap)`. Restore `restore.c` getlev `:1149–1163` (`--callers` of the loop is getlev, not a named `resttrapchn`). `t_at` `trap.c` (JS `trap.js:976`). `maketrap` pushes `level.traps`. `trap.h:18–39` struct + `vlaunchinfo` union. `teledest` is `#define teledest launch` (`trap.h:23`).

```919:943:nethack-c/upstream/src/save.c
    while (trap) {
        boolean use_relative = (program_state.restoring != REST_GSTATE
                                && trap->dst.dnum == u.uz.dnum);
        trap2 = trap->ntrap;
        if (use_relative)
            trap->dst.dlevel -= u.uz.dlevel;
        if (update_file(nhfp))
            Sfo_trap(nhfp, trap, "trap");
        if (use_relative)
            trap->dst.dlevel += u.uz.dlevel;
        if (release_data(nhfp))
            dealloc_trap(trap);
        trap = trap2;
    }
    if (update_file(nhfp))
        Sfo_trap(nhfp, &zerotrap, "trap");
```

```1149:1163:nethack-c/upstream/src/restore.c
    gf.ftrap = 0;
    for (;;) {
        trap = newtrap();
        Sfi_trap(nhfp, trap, "trap");
        if (trap->tx != 0) {
            if (program_state.restoring != REST_GSTATE
                && trap->dst.dnum == u.uz.dnum)
                trap->dst.dlevel += u.uz.dlevel;
            trap->ntrap = gf.ftrap;
            gf.ftrap = trap;
        } else
            break;
    }
```

Parent: `ftrap: (game.ftrap || []).map((t) => ({ ...t }))` then restore `map.traps = payload.ftrap || []`. JS live list is `level.traps` (`maketrap` push / `t_at` walk); `game.ftrap` is not. The diff **does** `payload.traps` from `level.traps`, `deserTraps` into `map.traps` then `game.level = map` / `game.ftrap = map.traps`, bones `traps` key with `ftrap` fallback. It **does not** walk `ntrap`, subtract/add `u.uz.dlevel`, write a `tx==0` sentinel, or `dealloc_trap`. Named JSON analogue. It **does not** persist other ledgers (later D-1697).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `serTraps` / `serTrap` | LIVE JSON analogue of `Sfo_trap` | same-file; C `savetrapchn` has no JS name |
| `deserTraps` | LIVE JSON analogue of getlev `:1149–1163` | array order, not prepend-`ntrap` |
| `t_at` / `maketrap` | LIVE | not changed; live list `level.traps` |
| bones `{...t, ntrap: null}` | CLONE | does **not** call `serTraps`/`deserTraps` |
| `dst.dlevel` relative dance | OMIT named | JSON stores absolute |
| `zerotrap` / `dealloc_trap` / FREEING | OMIT named | binary NHFILE |
| other `LFILE_EXISTS` floors | OMIT named | later D-1697 |
| `launch_otyp` | OMIT | `trap.h` union; JS write-only `trap.js:772` / C `trap.c:3689` |

`node scripts/sym.mjs` (HEAD; this SHA exported from `save.js`; D-1696 moved them):

```
serTraps         js/lev_json.js:34   sync
deserTraps       js/lev_json.js:70   sync
serTrap          NOT EXPORTED — 1 LOCAL js/lev_json.js:43
             => Do NOT write clone #2.
savetrapchn      NOT FOUND in js/** (no export, no local function/const).
             Do not add a local clone.
t_at             js/trap.js:976   sync
             !! ALSO 1 LOCAL CLONE(S) js/steed.js:143
maketrap         js/trap.js:847   sync
```

No local clone → import re-point. Deleted the empty-`ftrap` spread in `dosave0`/`try_restore_save`. Do **not** add `savetrapchn` as a second name. Do **not** add `t_at` #3. `--can` not required (no new module edge). FORCE/DIAG/`getRngLog`/`fastforward`/seed names in control flow: none (`FORCETRAP` in `trap.js` is C `trflags`, not this diff). `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Which list.** C `savelev_core` `:544` saves `gf.ftrap`. JS `dosave0` at this SHA writes `serTraps(game.level?.traps)` because `maketrap` never fills `game.ftrap`. That is the C-faithful analogue of “save the live trap chain,” not a stub. Restore hydrates `map.traps` then `game.level = map` so `t_at` (`trap.js:976–982`) sees the same array. **Match the live JS encoding of C `gf.ftrap`.** `game.ftrap = map.traps` aliases the array; C-shaped `for (t = ftrap; t; t = t.ntrap)` still does not walk it. Pre-existing. `t_at` is the getlev-success path. **Named, not a new stub in this arm.**

**Fields.** C `Sfo_trap` the struct: `tx`/`ty`, `dst`, `launch` (`teledest` alias), bitfields, `vl` union (`launch_otyp` / `launch2` / `conjoined` / `tnote`). JS `serTrap` copies `ttyp`/`tx`/`ty`/`tseen`/`once`/`madeby_u`/`tnote`/`conjoined`/`launch`/`launch2`/`teledest`/`dst`. Skip `ntrap` (array order). `coord2` missing → `{x:-1,y:-1}`; missing `dst` → `{dnum:-1,dlevel:-1}`. `deserTraps` re-runs `serTrap` then `ntrap = null`. **Match the fields `#overview`/pit/hole/portal same-floor need.** `launch_otyp` is not in the whitelist; C and JS only **write** it in `mkroll_launch` (`trap.c:3689` / `trap.js:772`) and never read it in-tree. Named incomplete union, not a public-path miss.

**`dst.dlevel`.** C `:926–935` / restore `:1154–1157`: when not `REST_GSTATE` and `dst.dnum == u.uz.dnum`, file stores relative, memory stays absolute. JSON stores absolute and does not add on restore. After `try_restore_save`, `dst.dlevel` is the live C value. **Match in-memory, not the NHFILE encoding.** Do **not** stamp “Match C relative `Sfo_trap`.”

**Sentinel / order.** C terminator is `zerotrap` (`tx==0`); real traps have `tx>=1` (`isok`). JSON has no sentinel. C prepends (`ntrap = old head`) so load reverses save order. JS keeps array order. `t_at` is by `tx`/`ty`. **Match lookup; not match chain order.** First-of-type walkers that used `ftrap`/`ntrap` were already on `level.traps` or dual-walk (wizcmds D-0814).

**Bones.** C bones goes through `savelev` → `savetrapchn`. JS bones writes `{...t, ntrap: null}` from `level.traps || ftrap || lvl.traps` and restore `payload.traps || payload.ftrap` **without** `deserTraps`. Same live list, weaker clone (shallow copy, no `coord2`). Combined-arm: bones is a second writer. Not a STUB (it does persist traps). Not LIVE `serTraps`. **CLONE, not C-matched field-for-field.**

Callee closure (`dosave0` trap arm). LIVE: `serTraps`/`deserTraps`, `t_at`/`maketrap` (unchanged). CLONE: bones spread. OMIT named: relative dst, zerotrap, FREEING, other floors, binary NHFILE. STUB: **none** — empty `ftrap` writer is deleted. Combined-arm ships for current-level JSON. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Not “Match C binary `savetrapchn` / `Sfo_trap`.” Subject “JSON restore keeps level traps” is **true** for `level.traps` after `Sy` (private trap-same-floor 14/17 → 17/17; seed0013 99/99). D-log “`game.ftrap` is never the live list”: **true**. Do **not** stamp “Match C `dst` relative.” Do **not** stamp “Match C other-ledger traps.” Do **not** stamp “Match C `ntrap` prepend.” Do **not** add a `savetrapchn` function name. `steed.js` `t_at` clone is pre-existing.

## Density

§2b: one `savetrapchn`/getlev trap-loop cluster + bones the same key. Related. +69. Did not glue `goto_level` stash (D-1695).

## Verification

Journal: private trap-same-floor HEAD red 14/17 then **PASS** 17/17 (discover pit, `Sy`, restore, step); green+strict seed8000/0900; seed0013 99/99; seed0015/5006. Public restore **is** hit (seed0013). Pit/hole same-floor is the canary; rolling-boulder `launch_otyp` / other-floor traps **public-unhit**.

## Actionable C-wrongs

1. **Bones should share `serTraps`/`deserTraps`** — C `savelev` `:544` is one `savetrapchn` for save and bones. JS bones still `{...t}` / raw array. One port: bones write/load call the same helpers (keep `payload.ftrap` fallback).
2. Named only: `launch_otyp` whitelist; `dst` relative; `ntrap` chain alias; other ledgers; binary NHFILE; FREEING `dealloc_trap`. Do **not** add `savetrapchn` #2. Do **not** restore relative `dlevel` on absolute JSON. Do **not** re-wipe `map.traps` from empty `ftrap`. Do **not** re-port knox/drawbridge (D-1693).

Verdict: **ACCEPT-WITH-DEBT**
