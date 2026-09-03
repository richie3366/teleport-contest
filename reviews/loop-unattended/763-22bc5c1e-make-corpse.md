# Review 763 — 22bc5c1e — mon.c make_corpse special table (D-1794)

## Metadata
- Full / short hash: `22bc5c1e99e8e730b2efc7be58aa8be9890358fe` / `22bc5c1e`
- Parent: `07fb471c` (D-1793). Map-driven Open. No prior QUALITY-RISK on this locus.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 00:26:38 +0200
- D-id: **D-1794**
- Stats: `js/mhitm.js` +267/−58; `js/do_name.js` +10; `js/mkobj.js` +2/−1; trap/uhitm await. Total `js/` insertions **281** (>250 → ceiling **450**, not a padding target). Band **80–350**.
- Claims to close: Open `mon.c` `make_corpse` dragon/unicorn/worm/golem table. Not `mondied`. Not `xkilled` LEVEL_SPECIFIC.
- JS / map: `mhitm.js` `make_corpse`; `do_name.js` `free_mgivenname`; `mkobj.js` `clear_dknown` export. `c-js-map/data.md`.
- Archive **Addressed:** D-1794 `22bc5c1e`.

## Intent vs deliverable

Git subject promises: Match C `mon.c` `make_corpse` so dragon scales, unicorn horn, worm tooth and golem drops actually run, instead of always taking `default_1` after undead/pudding.

`node scripts/csym.mjs make_corpse` → `mon.c:563–941`. `--callers`: `mondied` `:3262`; `xkilled` `:3622`. `undead_to_corpse` `mon.c:416–461` (callers `:624` vampire, `:645` mummy/zombie). `KEEPTRAITS` file-local `#define` `mon.c:549–556`. `free_mgivenname` `do_name.c:50–57` (golem/pudding sites `:654–729`). `clear_dknown` `mkobj.c:833–848` (make_corpse Blind `:932`).

Parent: undead + pudding + default corpse; no special table; no bury/bypass/oname/Blind tail. The diff **does** add the table, `goto default_1` as nested `default_1()`, golem `break`s, pudding early return, and the post-switch tail; exports `free_mgivenname` / `clear_dknown`; awaits at trap/uhitm. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `make_corpse` | LIVE repaired | async for `pline_mon` / pudding / bury |
| `keeptraits` | CLONE of `KEEPTRAITS` | `unique_corpstat`=`G_UNIQ` (`mondata.h:174`); `is_reviver`=`is_rider\|\|S_TROLL` (`:170`) — **verified**, do not add `unique_corpstat` clone **#5** |
| `free_mgivenname` | LIVE new | `do_name.c:50–57` |
| `clear_dknown` | LIVE export | was local; C also `mthrowu.c:620` |
| `undead_to_corpse` | LIVE | collapsed `if (living!==mndx)` ≡ C case list |
| `mksobj_at` / `mkcorpstat` / `mkgold` / `obj_nexto` / `obj_meld` / `stackobj` / `pudding_merge_message` / `bury_an_obj` / `bypass_obj` / `oname` / `is_neuter` | LIVE | |
| cham/were before `monsndx` | OMIT named | `mondead`, not this fn |
| NH_DEVEL exhaustive `default` | OMIT named | compiled out of release |

`node scripts/sym.mjs`:

```
make_corpse      js/mhitm.js:1877   ASYNC — await required
keeptraits       NOT EXPORTED — 1 LOCAL js/mhitm.js:1861  (C is a file-local macro; not clone #2 of a shared fn)
free_mgivenname  js/do_name.js:387   sync
clear_dknown     js/mkobj.js:1716   sync
undead_to_corpse js/mon.js:588   sync
unique_corpstat  NOT EXPORTED — 4 LOCALS — do NOT write #5
is_reviver       NOT EXPORTED — zap.js:2622 only — do NOT write #2
mksobj_at / mkcorpstat / mkgold / obj_nexto / obj_meld / stackobj  js/mkobj.js  sync
bury_an_obj      js/dig.js:383   ASYNC
pudding_merge_message js/mkobj.js:2162   ASYNC
bypass_obj       js/worn.js:374   sync  (+ zap.js clone, not this SHA)
oname            js/do_name.js:1012   sync
is_neuter        js/monsters.js:729   sync
```

`--can mhitm.js do_name.js free_mgivenname`: **ALREADY**. `--can mhitm.js mkobj.js clear_dknown`: **ALREADY**. `--can trap.js/uhitm.js mhitm.js make_corpse`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Sex flags then switch (`:576–581`).** `female` → `CORPSTAT_FEMALE`; else `!is_neuter` → `MALE`. **Match.** `mndx = monsndx(mdat)` not `mnum`; JS `mdat.mndx ?? mtmp.mnum`.

**Undead (`:621–649`).** C lists vampire then mummy/zombie; both `undead_to_corpse` + `CORPSTAT_INIT` + `mkcorpstat(CORPSE, mtmp, &mons[num], …)` + `age -= TAINT_AGE+1`, then **`break` (not `goto default_1`)**. JS `if (living !== mndx)` is the same set (`mon.c:416–461`; Vlad unmapped). 3rd arg is mndx number; `mkcorpstat` accepts that. **Match**, then common tail.

**Dragon / unicorn / worm `goto default_1` (`:582–620`).** Dragon: `!rn2(mrevived?20:3)` then `GRAY_DRAGON_SCALES + mndx - PM_GRAY_DRAGON`, `spe=0`, uncursed. Unicorn: revived `rn2(2)` dust pline **or** horn (`degraded_horn` if revived). Worm: `WORM_TOOTH` `TRUE,FALSE`. Then `default_1` (corpse unless `G_NOCORPSE`; bury returns). SHIMMERING `#if 0` omitted. **Match RNG order.**

**Golems `break` (`:650–713`).** Iron `d(2,6)` chains; glass `d(2,4)` then `FIRST_GLASS_GEM+rn2(NUM_GLASS_GEMS)` (`objects.h` MARKER = `WORTHLESS_WHITE_GLASS`); clay rock `quan=rn2(20)+50` `weight`; stone statue `~CORPSTAT_INIT`; wood `d(2,4)` + C ternary `rn2` short-circuit; rope `rn2(3)` `while (num-- > 0)` (zero drops → `obj` null); leather `d(2,4)`; gold `mkgold(200-rnl(101))`; paper `rnd(4)` blank scrolls. Each `free_mgivenname` except stone. **Match.** Straw/flesh fall through to `default_1` (C NH_DEVEL list / release `default`). **Match.**

**Pudding (`:716–731`).** Glob formula, `obj_nexto`/`pudding_merge_message`/`obj_meld` loop, `free_mgivenname`, `newsym`, **return** (no Blind tail). **Match.**

**`default_1` (`:892–908`) + tail (`:912–940`).** `G_NOCORPSE` → null. Else `KEEPTRAITS` clone (isshk/mtame/`G_UNIQ`/rider-or-troll/`leader_m_id`/AD_SEDU|SSEX) then `mkcorpstat`. Bury: `bury_an_obj` + `newsym` + return. Then `if (!obj) return`; `bypasses` → `bypass_obj`; `has_mgivenname` → `oname`; `Blind && !sensemon` → `clear_dknown` (`youprop.h:103` expanded); `stackobj`; `newsym`; off-spot `newsym`. **Match.**

**Callee closure.** LIVE except `keeptraits` verified CLONE of a file-local macro. STUB: **none**. Callers trap `:1118` / mhitm mondied / uhitm xkilled all `await`.

## Hallucinations / overclaim

Subject is **true**. Do **not** stamp “Match C `mondied` / `xkilled` LEVEL_SPECIFIC.” Do **not** export `unique_corpstat` (4 clones) or a second `is_reviver`. Probe 20/20 is table coverage, not public-session dragon/golem kills. seed0030 still **PASS** at this SHA (bisect: break is D-1795).

## Density

§2b: one C function (379 lines) + the two helpers it needs exported. +281. Did **not** glue `mondied` restore. Right size.

## Verification

D-log: jackal; dragon `rn2(3)`/`rn2(20)` + scales; unicorn revived `rn2(2)`; worm; iron/clay/wood/paper/gold; stone statue; Blind dknown; named golem not christened. Green + cohort. save-oracle skip. This audit: `csym` `:563–941` vs HEAD `js/mhitm.js:1877–2092`. seed0030 **PASS** at `22bc5c1e`.

## Actionable C-wrongs

None for Must-fix. Named: cham/were before `monsndx` (`mondead`); `xkilled` LEVEL_SPECIFIC / pool (next Open, D-1796); NH_DEVEL exhaustive default. Do **not** add `unique_corpstat` clone #5. Do **not** skip `await make_corpse` (unicorn `pline_mon` / pudding / bury). Do **not** `goto default_1` on golems or undead.

Verdict: **ACCEPT-WITH-DEBT**
