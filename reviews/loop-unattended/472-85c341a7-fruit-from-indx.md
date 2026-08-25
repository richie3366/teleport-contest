# Review 472 — 85c341a7 — objnam.c fruit_from_indx + xname SLIME_MOLD (D-1511)

## Metadata
- Full / short hash: `85c341a786b82088c2c87a6992744fe0809a36b6` / `85c341a7`
- Parent: `57d22857` (D-1510). This file audits **this SHA only** (eighth of nine `js/` commits since review **464**). Archive **Addressed:** D-1511 `85c341a7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 01:11:13 +0200
- D-id: **D-1511**
- Stats: 13 files, +284 / −139 — `js/objnam.js` +42 / −4, `js/options.js` +22, `js/jsmain.js` +5 / −1, `js/mkobj.js` +1. Band 150–350 (~70 JS ins).
- Claims to close: Open `objnam.c` `fruit_from_indx` (named from D-1487 / review **448**). Not `the()`. `reviews/loop-2026-08-15/` has no unpaid fruit-index Must-fix.
- JS / map: `objnam.js` `fruit_from_indx` / `pretty_base`; `options.js` `init_fruit_chain`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **448** named `fruit_from_indx` after `the()`.

## Intent vs deliverable

Git subject promises: a slime mold is named from the fruit chain at `obj.spe` instead of always printing `slime mold`.

Pinned C `objnam.c` `fruit_from_indx` `:431–439`: walk `gf.ffruit` by `fid`, first match, else NULL. Caller `xname_flags` FOOD SLIME_MOLD `:747–774`: `fruit_from_indx(obj->spe)`; miss → `impossible` + `"fruit"`; else `fname`; if `pluralize`, `makesingular` then `makeplural` then `pluralize=FALSE`. `minimal_xname` `:1074–1075` copies `spe` onto `zeroobj`. `initoptions_finish` `:7329` `fruitadd(pl_fruit, NULL)` **before** `init_objects` (comment `:7281`), so default `"slime mold"` is not candified; then `obj_descr[SLIME_MOLD].oc_name = "fruit"`. Bones `goodfruit(-id)` `:42–47` is a second caller.

Old JS: `pretty_base` used `objectNameStrs`. `the()` already had `fruit_from_name` (D-1487). Chain was empty.

The diff **does** export `fruit_from_indx`, wire FOOD SLIME_MOLD in `pretty_base`, apply the singular→plural ick in `xname`/`doname`, and install fid 1 via `init_fruit_chain` (not JS `fruitadd`, which would candify after objects exist). It **does not** call objnam `fruit_from_name` from options `fruitadd`. Named. It **does not** port `doname_base` fake_arti, `reorder_fruit`, bones `goodfruit`, pager look `spe`, or `obj_descr` `"fruit"`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `fruit_from_indx` | C `:431–439`, **LIVE this SHA** | |
| `pretty_base` SLIME_MOLD | C `:747–757`, **LIVE this SHA** | miss → `"fruit"` |
| xname/doname quan ick | C `:758–771`, **LIVE this SHA** | `pluralize=FALSE` analogue |
| `makesingular` / `makeplural` | C objnam.c, **LIVE** | imported in options |
| `init_fruit_chain` | C `:7329` first fruit, **CLONE** | skips candify (C before `init_objects`) |
| `fruitadd` | C `:8170`, **CLONE pre-existing** | still exact-only walker |
| options `fruit_from_name` | C `:443`, **CLONE** | `sym` 1 local vs objnam export |
| `goodfruit` / `reorder_fruit` / fake_arti | C bones/objnam, **OMIT named** | |
| `impossible("Bad fruit")` | C `:751`, **OMIT named** | sync xname |

`node scripts/sym.mjs fruit_from_indx fruit_from_name init_fruit_chain fruitadd pretty_base xname doname simpleonames makesingular makeplural sanitize_name`:

```
fruit_from_indx  js/objnam.js:1161   sync
fruit_from_name  js/objnam.js:1176   sync
             !! ALSO 1 LOCAL CLONE in js/options.js:701
init_fruit_chain js/options.js:804   sync
fruitadd         NOT EXPORTED — 1 local js/options.js:721
pretty_base      NOT EXPORTED — 1 local js/objnam.js:440
xname            js/objnam.js:738   sync
doname           js/objnam.js:1952   sync
simpleonames     js/objnam.js:1840   sync
makesingular     js/objnam.js:1384   sync
makeplural       js/objnam.js:1492   sync
sanitize_name    NOT EXPORTED — 1 local js/options.js:687
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Fortress still prints default `"slime mold"`.

## C ↔ JS fidelity

Lookup. `for (f = ffruit; f; f = nextf) if (fid == indx) break; return f`. JS `| 0` then the same walk; `return f || null`. **Match `:435–438`.** First match, not last. Empty chain → null.

xname FOOD. `fruit_from_indx(obj.spe)`; `!f` → `"fruit"` (no `impossible`). Else `fname`. **Match `:747–757` minus the pline.** No `dknown`/`oc_name_known` gate in C; JS none. **Match.**

Plural ick. C only when `pluralize` (quan ≠ 1 at xname); then `makesingular`+`makeplural` and `pluralize=FALSE` so `doname_base` does not ick again. JS `pretty_base` returns singular `fname`; `xname` and `doname` each ick when `quan !== 1` because both start at `pretty_base`, not at `xname`. **Match the C ick, not a double-plural.** `simpleonames` stays singular (C `bareobj.quan = 1` + copy `spe`). **Match `:1068–1075`.**

`killer_xname` `"deadly slime mold"` + `plur` was already live (`:1985–1990`). Unchanged. **Match.**

Chain install. C `initoptions_finish` fruitadd after `rcfile`, **before** `init_objects` (`:7281`), so the FOOD_CLASS candify loop does not see `bases[]` and default `"slime mold"` is not `"candied slime mold"`. JS objects **are** live in the constructor, so calling `fruitadd` would candify. `init_fruit_chain` hardcodes fid 1 / `current_fruit` 1 / `fname` from `pl_fruit || flags.fruit || "slime mold"`. That is the empty-chain `newfruit` path (`fid = ++highest` with highest 0). **Verified CLONE of `:7329` first fruit, not a stub of `fruit_from_indx`.** `parseNethackrc` unknown `fruit:` lands in `flags.fruit` (C opt_initial only `nmcpy`s `pl_fruit`; fruitadd is finish). **Match that order.**

Callee closure (xname SLIME_MOLD arm). LIVE: `fruit_from_indx`, `makesingular`, `makeplural`. CLONE: `init_fruit_chain`. OMIT named: `impossible`, fake_arti, `goodfruit`, `reorder_fruit`, pager `spe`, `obj_descr` `"fruit"`. STUB: none. **Arm may ship.**

options `fruitadd` still uses the exact-only local `fruit_from_name` (`sym` clone). C uses objnam’s prefix/singular walker. **Named Open, not this SHA’s lie.**

## Hallucinations / overclaim

Subject slime mold named from `spe`: **true** once the chain has that `fid` (default 1). **False until named** for bones `goodfruit(-id)` flipping fid, pager fakeobj `spe = current_fruit`, doname fruit-as-artifact `"the"`, and wishing via `oc_name = "fruit"`. Stamping **Addressed:** D-1511 for **`:431–439` + `:747–774` + first-fruit chain** is fair. Do **not** stamp “Match C `fruitadd` walker.” Do **not** stamp “Match C `goodfruit`.” Do **not** treat fortress PASS as a `#name` fruit. `init_fruit_chain` is **not** “dispatch ported, callee stubbed.”

## Density

The lookup plus the one caller that needed it (FOOD SLIME_MOLD) plus the chain the lookup is dead without. ~70 JS. Playbook §2b (C itself is ~40 lines). Did not glue `doinvoke`. Acceptable. Did not import objnam `fruit_from_name` into `fruitadd` (separate Open).

## Branch-by-branch confirm

1. Default fid 1 `"slime mold"`: `xname`/`doname` that string. **Match.**
2. `spe` → fname `"Apple"`: **Match `:747–757`.**
3. Missing fid: `"fruit"`. **Match `:750–752` minus `impossible`.**
4. `quan>1` `"Apples"` ick: **Match `:758–771`.**
5. `simpleonames` singular with live `spe`: **Match `:1074–1077`.**
6. `killer_xname` still `"deadly slime mold"`: **Match `:1985–1990`.**
7. `the()` Apple unchanged (D-1487).
8. `goodfruit(-id)` absent. Named.
9. fake_arti absent. Named.
10. **Public-unhit** for a custom fruit; seed0060 default slime mold invent is the focused hit.

## Callers / RNG ledger

C: `xname_flags`; `goodfruit`. JS: `pretty_base` only. No `rn2` in the lookup. `fruitadd` overflow `rnd(127)` still deferred.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. `init_fruit_chain` is in-process state, not a VFS read.

## Verification

D-log: private canary **16**/16 (grep, Rule #2, default slime mold, Apple `spe`, missing `"fruit"`, quan ick, `simpleonames` singular, `killer_xname` deadly, `the()` Apple); green+strict seed8000/0900; focused seed0060 slime-mold invent; cohort **7**/7 + strict. Fortress still default `"slime mold"`. Cohort is not a `#name` fruit session.

## Actionable C-wrongs

None that belong on Must-fix. The cited lookup and FOOD arm match C; chain install is a verified first-fruit clone.

Remaining named (map / Open): options `fruitadd` → objnam `fruit_from_name`; doname fake_arti; `reorder_fruit`; bones `goodfruit`; pager look `spe`; `obj_descr[SLIME_MOLD]="fruit"` / readobjnam wish; save/restore fruitchn. Do not Must-fix “should have called `fruitadd` from `jsmain`” (that **would** candify after objects exist). Do not Must-fix “`impossible` pline in sync `xname`.”

Verdict: **ACCEPT-WITH-DEBT**
