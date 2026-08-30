# Review 670 — 2353e6fb — dog.c update_mlstmv iter_mons skip (D-1709)

## Metadata
- Full / short hash: `2353e6fb851d820ae21471e85282d4f714a4a0b3` / `2353e6fb`
- Parent: `0c0f29fe` (D-1708). This file audits **this SHA only** (second of nine `js/` commits since review **668**). Archive **Addressed:** D-1709 `2353e6fb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 05:37:56 +0200
- D-id: **D-1709**
- Stats: `js/dog.js` +13/−4. Total `js/` insertions **9** <250. Band **150–350**.
- Claims to close: review **656** Actionable #2 (`iter_mons` skip `DEADMONSTER` / `mon_offmap`). Not `cant_go_back` FREEING. `reviews/loop-2026-08-15/` has no unpaid mlstmv Must-fix.
- JS / map: `dog.js` `update_mlstmv`; import `mon_offmap` from `monmove.js`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **656** QUALITY-RISK Actionable #2. File already stamped `**Addressed:** D-1709 `2353e6fb``.

## Intent vs deliverable

Git subject promises: dead and off-map `fmon` keep stale `mlstmv`, instead of stamping every pointer.

`node scripts/csym.mjs update_mlstmv` → `dog.c:293–298`. `--callers`: `bones.c:620`; `do.c:1642`. `set_mon_lastmove` `:286–290` (`--callers` decl `:10`; `mon_arrive` `:723` — not this peel). `iter_mons` `mon.c:4526–4538` (`--callers` include `dog.c:297`). `DEADMONSTER` `monst.h:214`. `mon_offmap` `monst.h:255`. `cant_go_back` gate `do.c:1640–1642`.

```293:298:nethack-c/upstream/src/dog.c
void
update_mlstmv(void)
{
    iter_mons(set_mon_lastmove);
}
```

```4526:4536:nethack-c/upstream/src/mon.c
void
iter_mons(void (*vfunc)(struct monst *))
{
    struct monst *mtmp, *mtmp2;

    for (mtmp = fmon; mtmp; mtmp = mtmp2) {
        mtmp2 = mtmp->nmon;
        if (DEADMONSTER(mtmp) || mon_offmap(mtmp))
            continue;
        (*vfunc)(mtmp);
```

```214:214:nethack-c/upstream/include/monst.h
#define DEADMONSTER(mon) ((mon)->mhp < 1)
```

```255:255:nethack-c/upstream/include/monst.h
#define mon_offmap(mon) ((mon)->mstate != MON_FLOOR)
```

Parent (D-1695): `for (const mtmp of game.fmon || []) { if (mtmp) mtmp.mlstmv = moves; }` — no skip. The diff **does** skip `(mhp|0)<1` and live `mon_offmap`. It **does not** add `iter_mons` / `DEADMONSTER` / `set_mon_lastmove` as named JS functions (inline at this one caller). It **does not** gate `cant_go_back`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `update_mlstmv` | LIVE | now inlines `iter_mons` skip + `set_mon_lastmove` |
| `mon_offmap` | LIVE import | `monmove.js:146`; `mstate != MON_FLOOR` |
| `DEADMONSTER` | CLONE inline | `(mhp\|0)<1`; no export. Do **not** add #1 |
| `iter_mons` | OMIT as fn | inlined skip only here; other C callers already have their own loops |
| `set_mon_lastmove` | CLONE inline | `mlstmv = game.moves`. Do **not** add a named export |
| `cant_go_back` FREEING | OMIT named | JS `do.js:1431` still always calls |

`node scripts/sym.mjs`:

```
update_mlstmv    js/dog.js:340   sync
set_mon_lastmove NOT FOUND
iter_mons        NOT FOUND
mon_offmap       js/monmove.js:146   sync
DEADMONSTER      NOT FOUND
```

Re-points: new `import { mon_offmap } from './monmove.js'` (no prior dog→monmove import). After the SHA, `--can js/dog.js js/monmove.js mon_offmap`: **ALREADY**. `monmove.js` does not import `dog.js`. Use is inside `update_mlstmv`, not a top-level read. No TDZ. Do **not** add `iter_mons` #1. Do **not** add `DEADMONSTER` #1. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Skip order.** C `iter_mons`: save `nmon`, then `DEADMONSTER || mon_offmap` → continue, else `vfunc`. `set_mon_lastmove` only writes `mlstmv = svm.moves` (does not unlink), so the `mtmp2` snapshot is unused at this call. JS `for-of` `game.fmon` with the same two predicates then `mlstmv = game.moves`. **Match `:4531–4535` + `:287–290`.** `DEADMONSTER` is `mhp < 1`, not `<= 0` as a separate test — `(mhp|0)<1` is the same integer test. `mon_offmap` is `mstate != MON_FLOOR` (`MON_FLOOR = 0x00` in `const.js`). Live import, not a second clone.

**Who is skipped.** Dead (`mhp<1`) still on `fmon` until `dmonsfree`. Off-map: `mstate != MON_FLOOR` (worm tails, swallowed, migrating flags, etc.). C does **not** skip `mx==0` here; that is light.c. JS does not sneak in `mx`. **Match.**

**Callers.** C `do.c:1642` immediately before `savelev`, **inside** `if (!cant_go_back)`, **after** `keepdogs` (followers already on `mydogs`, not this `fmon` walk). JS `do.js:1429–1431`: `keepdogs` then **unconditional** `update_mlstmv()`. Extra stamps on endgame/tutorial leave. **Named omit**, pre-existing, not introduced. C `bones.c:620` before bones `savelev`. JS `bones.js:149` the same. **Match bones caller.**

**Not `iter_mons` the function.** C has one iterator used by 11 other sites (`reset_hostility`, `m_calcdistress`, …). This SHA inlines the skip at `update_mlstmv` only. That is the Must-fix envelope. Do **not** invent a shared `iter_mons` in this peel. `do.js` already inlines `DEADMONSTER` at `reset_hostility` (`:1376`). Consistent.

No RNG at this locus.

**Callee closure.** LIVE: `mon_offmap`. CLONE: `DEADMONSTER` one-liner (matches `monst.h:214`); `set_mon_lastmove` assignment. OMIT named: `cant_go_back`. STUB: none. Combined-arm (the one `update_mlstmv` body) ships with every callee LIVE/CLONE/OMIT.

## Hallucinations / overclaim

Subject “dead and off-map fmon keep stale mlstmv, instead of stamping every pointer”: **true** for the walk. D-log “no `iter_mons` / `DEADMONSTER` clone”: **true as named functions**; the macro is inlined, which is the right call (`DEADMONSTER` NOT FOUND). Do **not** stamp “Match C `cant_go_back` skip.” Do **not** stamp “Match C `iter_mons` the shared iterator.” Do **not** add `set_mon_lastmove` as an export (`mon_arrive` `:723` is a different caller). Journal “fortress held” is not a skip-predicate proof.

Not “dispatch ported, callee stubbed.” `update_mlstmv` was already LIVE with a wrong loop; this SHA fixed the loop.

## Density

§2b: Must-fix **656** #2 alone. +9. Did not glue `cant_go_back` or cemetery stamps. Below ~40 is allowed because Must-fix.

## Verification

D-log / journal: save-oracle skip (untagged); predicate smoke (live stamped; dead/offmap skipped); focused seed0015/0700/0014 stairs + seed0013 restore + seed0105 lamp; green+strict; cohort 7/7. Public stairs **is** hit. Dead-on-`fmon` at leave **public-unhit** (dmonsfree usually already ran). Admit that. Smoke is the C-order check.

## Actionable C-wrongs

None for Must-fix. Named: `cant_go_back` skip of `update_mlstmv` (`do.c:1640–1642`); worms/bubbles/exclusions. Do **not** add `iter_mons` #1. Do **not** add `DEADMONSTER` #1. Do **not** add `set_mon_lastmove` #1. Do **not** skip on `mx==0` (wrong macro). Do **not** re-port LS_MONSTER `mx>0` (D-1708). Do **not** restore the stamp-every-pointer loop.

Verdict: **ACCEPT-WITH-DEBT**
