# Review 673 — 00f70d3d — objects.h BITS oc_merge extract (D-1712)

## Metadata
- Full / short hash: `00f70d3d39dcfec5d9bf564eea8fb35eeb17cd12` / `00f70d3d`
- Parent: `f187612b` (D-1711). This file audits **this SHA only** (fifth of nine `js/` commits since review **668**). Archive **Addressed:** D-1712 `00f70d3d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:15:18 +0200
- D-id: **D-1712**
- Stats: `js/mkobj.js` +9/−16; `js/read.js` +2/−10; `js/readobjnam.js` +21/−7; `js/mklev.js` +10/−3; `js/generated/objects_data.js` +4/−1. Total scored `js/` insertions **45** <250. Band **150–350**. Extractor is `scripts/` (not scored).
- Claims to close: Open `oc_merge` extract (table bit, not WEAPON/FOOD class heuristic). Not `oc_charged` (D-1690). Not `is_multigen`. `reviews/loop-2026-08-15/` has no unpaid merge-bit Must-fix.
- JS / map: extractor `merge` column; `oc_merge_of`; `clear_dknown`; wish quan; `create_object`. `c-js-map/data.md`.
- Prior: none written; D-1690 charged extract left `oc_merge` as a class list plus `BOOMERANG return false`.

## Intent vs deliverable

Git subject promises: stacking, wish quan, lua `create_object`, and `clear_dknown` use the table bit, instead of a WEAPON/FOOD class heuristic.

`node scripts/csym.mjs clear_dknown` → `mkobj.c:833–848` (`--callers` `:856`; `mon.c:932`; `mthrowu.c:620`). `mergable` `invent.c:4378–4499` (`:4388` `!objects[obj->otyp].oc_merge`). `objclass.h:52` `Bitfield(oc_merge,1)`. Wish `objnam.c:5071–5083`. `create_object` `sp_lev.c:2298–2301`. Quiver `read.c:1531–1536`. `worn.c:323`; `zap.c` poly fuse; `mplayer.c:268` already called `oc_merge_of`.

```840:843:nethack-c/upstream/src/mkobj.c
    if ((obj->otyp >= ELVEN_SHIELD && obj->otyp <= ORCISH_SHIELD)
        || obj->otyp == SHIELD_OF_REFLECTION
        || objects[obj->otyp].oc_merge)
        obj->dknown = 0;
```

```5071:5083:nethack-c/upstream/src/objnam.c
    } else if (d.cnt > 0) {
        if (objects[d.typ].oc_merge
            && (wizard
                || d.cnt < rnd(6)
                || (d.cnt <= 7 && Is_candle(d.otmp))
                || (d.cnt <= 20
                    && (d.typ == ROCK || d.typ == FLINT || is_missile(d.otmp)
                        || (d.oclass == WEAPON_CLASS && is_ammo(d.otmp))))))
            d.otmp->quan = (long) d.cnt;
    }
```

```2298:2301:nethack-c/upstream/src/sp_lev.c
    if (o->quan > 0 && objects[otmp->otyp].oc_merge) {
        otmp->quan = o->quan;
        otmp->owt = weight(otmp);
    }
```

Parent: extractor dumped the C field but **dropped it from rows**; `oc_merge_of` class list + `BOULDER/STATUE/BOOMERANG` false; `read.js` local `oc_merge` **defaulted true**; `clear_dknown` skipped the merge arm; wish quan wizard-only; `create_object` ignored quan. The diff **does** dump `merge` as `r[21]` → `oc_merge`; table reader only; retire the read.js clone; `clear_dknown` OR; non-wizard wish `rnd(6)` / candle / rock-flint-missile-ammo; `create_object` quan when mergeable. It **does not** port `lspo_object` non-merge quan-repeat. Named. It **does not** port glob `gsize` (`objnam.c:5058–5070`). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `oc_merge` table field | LIVE extract | `objects_data.js` `r[21]`; Rule #2 embed |
| `oc_merge_of` | LIVE repaired | `!!objects[otyp].oc_merge`; no class heuristic |
| `mergable` | LIVE | already used `oc_merge_of`; now sees real bits |
| `clear_dknown` | LIVE local | merge arm added. Do **not** add export #2 |
| `read.js` `oc_merge` | deleted clone | defaulted **true** (C-wrong). Re-point → `oc_merge_of` |
| wish quan arm | LIVE | C `:5071–5083`; glob still named |
| `create_object` quan | LIVE | C `:2298–2301` |
| `Is_candle` / `is_missile` / `is_ammo` | LIVE import | wish extras. Do **not** add `is_ammo` #2 (`u_init.js` still clones) |
| `worn` / `zap` / `mplayer` | LIVE already | pick up the table with no extra patch |
| `lspo_object` non-merge repeat | OMIT named | |
| `is_multigen` / `is_poisonable` | OMIT named | |

`node scripts/sym.mjs`:

```
oc_merge_of      js/mkobj.js:1920   sync
oc_merge         NOT FOUND   (read.js local deleted — do not revive)
mergable         js/mkobj.js:1928   sync
clear_dknown     NOT EXPORTED — 1 LOCAL js/mkobj.js:1716
Is_candle        js/timeout.js:513   sync
is_ammo          js/wield.js:126   sync  (+ u_init.js clone — IMPORT)
is_missile       js/wield.js:142   sync  (+ u_init.js clone — IMPORT)
```

Re-points: `read.js` dropped local `oc_merge`, imports `oc_merge_of`. `mklev.js` imports `oc_merge_of`. `readobjnam.js` adds `Is_candle` / `is_ammo` / `is_missile`. `--can js/read.js js/mkobj.js oc_merge_of`; `js/mklev.js js/mkobj.js oc_merge_of`; `js/readobjnam.js js/timeout.js Is_candle`; `js/wield.js is_ammo`: **ALREADY**. No new TDZ. Do **not** add `oc_merge` #2 in `read.js`. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean** (extractor is not scored `js/`; table is `js/generated/`).

## C ↔ JS fidelity

**Table bit.** Extracted `oc_merge` vs C BITS mrg, sampled against `objects.h` WEAPON kn/mg: LONG_SWORD merge **0** (`1, 0, 0, 50…`); DAGGER **1**; BOOMERANG **1** (`1, 1, 0, 15…`); TALLOW_CANDLE **1**; WAN_LIGHT **0**; SPE_LIGHT **0**; ARROW **1**; BOW **0**; GOLD_PIECE **1**; BOULDER/STATUE **0**. Parent heuristic: all WEAPON_CLASS true → **swords stacked**; `BOOMERANG return false` → **C-wrong vs mg=1**. This SHA matches the bit. `oc_merge_of` is `!!row.oc_merge` with no class fallback. Missing row → false (non-merge), not the old WEAPON true.

**`mergable`.** C `:4388` `!objects[].oc_merge` → FALSE. JS already used `oc_merge_of`. **Match the gate**; other `mergable` arms unchanged.

**`clear_dknown`.** C ORs `objects[].oc_merge` into the dknown=0 test after shield-range. JS now `|| oc_merge_of(otyp)`. Pudding still forces 1 after. **Match `:840–847`.** Mergeable food/ammo start unidentified like C.

**Wish quan.** C `else if (d.cnt > 0)` after glob sets `d.cnt=0`. Inner: `oc_merge && (wizard \|\| cnt < rnd(6) \|\| candle<=7 \|\| cnt<=20 && (ROCK\|FLINT\|is_missile\|WEAPON&&is_ammo))`. JS the same `||` order: wizard short-circuits **before** `rnd(6)`; non-wizard **always** burns `rnd(6)` even if the candle arm would succeed. **Match RNG.** Glob `rn1(5,2)` override **named**. JS also sets `owt=weight` here; C `:5083` sets only `quan` (create_object does both). Extra JS weight is not a scored fork.

**`create_object`.** C `:2298–2301` quan only when mergeable. JS the same. Non-merge `quan>1` lua still one object — `lspo_object` repeat named. `tut1_object_quan` still sets quan without the bit; comment now says that is **not** the C gate. Honest.

**Quiver / worn / zap / mplayer.** `read.c:1535` `!objects[].oc_merge` clears wornmask. JS was a clone that **defaulted true** (non-merge quiver weapons kept wornmask). Now `oc_merge_of`. **Match.** `worn.js:294` / zap fuse / mplayer stacks already imported the helper.

**Callee closure.** LIVE: table field, `oc_merge_of`, `Is_candle`, `is_missile`, `is_ammo`, `wizardMode`, `rnd`. CLONE: none added. STUB: none. OMIT named: glob gsize; lspo non-merge repeat; `is_multigen`. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “use the table bit instead of a WEAPON/FOOD class heuristic”: **true** for `oc_merge_of` and the four cited callers. D-log canary LONG_SWORD 0 / DAGGER 1 / TALLOW_CANDLE 1 / WAN_LIGHT 0 / BOOMERANG 1: **matches the generated rows**. Do **not** stamp “Match C `lspo_object` quan-repeat.” Do **not** stamp “Match C glob `gsize`.” Do **not** stamp “Match C `is_multigen`.” Do **not** restore `BOOMERANG return false`. Journal “fortress held” is not a sword-stack proof.

## Density

§2b: one `oc_merge` extract cluster (table + reader + the C sites that only needed the bit). Related wish/create_object/clear_dknown/quiver. +45 scored JS. Did not glue `observe_object` / `is_multigen`.

## Verification

D-log / journal: save-oracle skip (untagged `objects.h:oc_merge`); canary five BITS; green+strict; focused seed1150/0014/0101; cohort 7/7. Public stacking **is** hit (food/gold). LONG_SWORD non-merge and boomerang merge **public-unhit**. Admit that. Canary is the BITS check.

## Actionable C-wrongs

None for Must-fix. Named: `lspo_object` non-merge quan repeat; glob wish `gsize` (`objnam.c:5058–5070`); `is_multigen` / `is_poisonable`; `observe_object` FIRST_OBJECT (next SHA). Do **not** add `oc_merge` #2 in `read.js`. Do **not** restore the class heuristic or `BOOMERANG return false`. Do **not** treat `tut1_object_quan` as C `create_object`. Do **not** add `is_ammo` #2. Do **not** dump `oc_merge` via `fs` in scored `js/`.

Verdict: **ACCEPT-WITH-DEBT**
