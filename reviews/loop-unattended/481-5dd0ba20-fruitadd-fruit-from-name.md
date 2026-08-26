# Review 481 — 5dd0ba20 — options.c fruitadd → objnam fruit_from_name (D-1520)

## Metadata
- Full / short hash: `5dd0ba206b9baad26f3f279398a96e219f1b0aeb` / `5dd0ba20`
- Parent: `d5799f73` (D-1519). This file audits **this SHA only** (eighth of nine `js/` commits since review **473**). Archive **Addressed:** D-1520 `5dd0ba20`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 03:02:35 +0200
- D-id: **D-1520**
- Stats: 12 files, +187 / −160 — `js/options.js` +39 / −45, `js/mklev.js` +7 / −9, `js/hacklib.js` +9. Band 150–350 (js/ insertions 55).
- Claims to close: Open `options.c` fruitadd should call objnam `fruit_from_name` (named from D-1519 / D-1487). Not `fruit_from_indx`. `reviews/loop-2026-08-15/` has no unpaid fruit-walker Must-fix.
- JS / map: `options.js` `fruitadd` / `optfn_fruit_set`; `mklev.js` `fruitadd_orc`; `hacklib.js` `str_end_is`. `c-js-map/startup.md` + `turns.md`.
- Prior reviews this SHA claims to close: **448** / **472** named the exact-only options clone after live objnam `fruit_from_name` (D-1487 / D-1511).

## Intent vs deliverable

Git subject promises: named fruit is reused via objnam `fruit_from_name` prefix and singular lookup, not an exact-only walker.

Pinned C `options.c` `fruitadd` `:8169–8287`. User path (`str == svp.pl_fruit`): `makesingular` into `pl_fruit`; food-name / numeric / cursed / tin-of spinach|`name_to_mon` / empty tin / glob / `str_end_is` corpse|egg + `ismnum(name_to_mon)` → candify `"candied "` (`:8220–8239`); `*altname=0`; `fruit_from_name(*altname ? altname : str, FALSE, &highest_fruit_id)` (`:8264`) so **str still aliases candified `pl_fruit`**. Hit → `nonew`; `highest >= 127` → `return rnd(127)` without touching `current_fruit`; else `newfruit` fid `++highest`. Callee `objnam.c` `fruit_from_name` `:443–519` (D-1487): exact `strcmp`, then longest prefix (`!exact`), then `makesingular`, then prefix+singularize. Caller `optfn_fruit` `:1735–1740`: `FALSE, &fnum` and `fnum>=100` is **max fid**, not chain length. Else path (bones/orc): copy `str` → `altname`, `made_fruit=TRUE`, same walker.

Old JS: local exact-only walker in `options.js`; `rnd(127)` stubbed to `current_fruit`; tin/corpse/egg candify named.

The diff **does** delete that clone, import live `objnam.js` `fruit_from_name`, port candify + `rnd(127)`, add `hacklib.js` `str_end_is`, and point `fruitadd_orc` at the same walker. It **does not** port bones/restore `ghostfruit` (fruitadd else in options). Named. JS cannot emulate `str == pl_fruit` for a second buffer; user callers pass `game.pl_fruit`. Honest.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `fruit_from_name` | C `:443–519`, **LIVE** | objnam; clone **deleted** |
| `fruitadd` user path | C `:8184–8287`, **LIVE this SHA** | candify + walker + rnd(127) |
| `optfn_fruit_set` | C `:1729–1758`, **LIVE this SHA** | fnum is max fid |
| `fruitadd_orc` | C else `:8257–8264`, **CLONE** | same walker; mklev↔options cycle |
| `str_end_is` | C `hacklib.c:241–248`, **LIVE this SHA** | |
| `name_to_mon` / `ismnum` | C, **LIVE** | suffix-tolerant |
| `makesingular` | C objnam, **LIVE** | |
| bones `ghostfruit` else | C `:8257`, **OMIT named** | |
| `reorder_fruit` / `goodfruit` | C, **OMIT named** | next Open |

`node scripts/sym.mjs fruit_from_name fruitadd fruitadd_orc str_end_is name_to_mon ismnum makesingular`:

```
fruit_from_name  js/objnam.js:1181   sync
fruitadd         js/options.js:711   sync
fruitadd_orc     NOT EXPORTED — 1 LOCAL js/mklev.js:853
str_end_is       js/hacklib.js:87   sync
name_to_mon      js/mondata.js:373   sync
ismnum           js/const.js:2987   sync
makesingular     js/objnam.js:1390   sync
```

Deleted local `options.js` `fruit_from_name` — `sym` shows **one** live export. Do not write clone #2 of the walker. `fruitadd_orc` is the C else-path split, not a second walker.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rnd(127)` on fid overflow (was stubbed). Prefix/singular reuse **avoids** a new fruit and its later dice. **Public-unhit** unless a session sets a prefix/plural or food-like OPTIONS/doset fruit. seed4500 fruit doset is the focused hit.

## C ↔ JS fidelity

Walker. Live `objnam.js` `:1181–1227` vs C `:457–518`: exact loop updates `highest_fid` only on non-match then return; `!exact` longest prefix (`strncmp` length + space/NUL); `makesingular` exact; `!exact` truncate at first space past `k` then singularize, longest wins. **Match D-1487.** `highest_fid` is `{ fid }` (JS cannot pass `int*`). **Match the out-param contract.**

`fruitadd` user. Singular into `pl_fruit`. **Match `:8192`.** Food-class `OBJ_NAME` / glob prefix. **Match `:8198–8211`.** Numeric. **Match `:8212–8218`.** Candify or-list now includes tin-of spinach/`name_to_mon(tinRest)` and corpse/egg `str_end_is` + `ismnum(name_to_mon(nam))`. **Match `:8224–8236`.** `name_to_mon` ignores trailing `" corpse"` (C comment ettin zombie corpse). **LIVE.** `"candied "+buf` sliced to `PL_FSIZ-1` (32). **Match nmcpy `:8237–8239`.** Lookup `fruit_from_name(game.pl_fruit, false, highest)` after candify with empty altname. **Match `:8264`.** Hit sets `current_fruit`. Overflow `highest.fid >= 127` → `rnd(127)`, **no** `current_fruit` write. **Match `:8272–8273`.** Else prepend `fid = highest+1`. **Match `:8278`.**

`optfn_fruit_set`. `fruit_from_name(s, false, fnum)`; `!exists && !made_fruit` → `fruit_from_name(pl_fruit, false, null)`; `!forig && fnum.fid >= 100` silent return. **Match `:1735–1744`.** Old JS used **count**. That was the C-wrong.

`str_end_is`. Length then suffix `===`. **Match `:241–248`.** Case-sensitive. **Match.**

`fruitadd_orc`. Sanitize + `made_fruit=true` + same walker + `rnd(127)`. **Match C else `:8257–8273` for orc loot.** Bones/restore still not in options. Named.

Callee closure (user fruitadd). LIVE: `fruit_from_name`, `makesingular`, `str_end_is`, `name_to_mon`, `ismnum`, `rnd`. CLONE: `fruitadd_orc` else-path. OMIT named: ghostfruit. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject prefix/singular reuse not exact-only: **true** (clone deleted). D-log candify apple/newt/tin/egg + `rnd(127)`: **true of the canary**. seed4500 fruit doset **PASS**: **true as focused**. Stamping **Addressed:** D-1520 for **`:8264` walker + `:8228–8236` candify + `:8272` rnd** is fair. Do **not** stamp “Match C bones ghostfruit.” Do **not** stamp “Match C `reorder_fruit`.” Do **not** treat 44/44 as a prefix-fruit screen. This is **not** “dispatch ported, callee stubbed.”

## Density

One C function + its callee (already live) + the orc else split required by cycle. +55 JS. Playbook §2b. Did not glue doname fake_arti (next SHA). Acceptable.

## Branch-by-branch confirm

1. Exact fname hit: reuse fid. **Match first loop.**
2. `"slime mold pie"` prefix of `"slime mold"`. **Match `:467–475`.**
3. Plural `"Apples"` → singular `"Apple"`. **Match `:480–486`.**
4. Food name / `"apple"` / `"tin of spinach"` / `"newt corpse"` / `"newt egg"`: candify. **Match `:8220–8236`.**
5. `highest >= 127`: `rnd(127)`, current_fruit unchanged. **Match `:8272–8273`.**
6. `optfn` `fnum>=100` uses max fid. **Match `:1740`.**
7. Orc loot: same walker. **Match else.**
8. Bones ghostfruit else in options. **Named omit.**
9. **Public-unhit** except seed4500 fruit doset / OPTIONS names.

## Callers / RNG ledger

C: `optfn_fruit` / `initoptions_finish` / bones / orc. JS: doset + `init_fruit_chain` (still not `fruitadd` at init — D-1520 comment) + `fruitadd_orc`. New `rnd(127)` only on overflow.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **22**/22 (C/JS grep; prefix reuse; singular Apple; candify apple/newt/tin/egg; `rnd(127)`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict; focused seed4500 fruit doset **PASS** + strict. Prefix/plural OPTIONS still **public-unhit** except that focused fruit doset. Honest.

## Actionable C-wrongs

None at the claimed walker. Remaining **named** (map / Open): bones/restore `ghostfruit`; `reorder_fruit`; `goodfruit`; pager look `spe`. Do not Must-fix “JS should pointer-compare `str == pl_fruit`” (strings; user callers pass `pl_fruit`; else is orc clone + named bones). Do not Must-fix `init_fruit_chain` skipping `fruitadd` (C initoptions still installs fruit; calling `fruitadd` after objects exist candifies SLIME_MOLD — D-1520 comment / CURRENT).

Verdict: **ACCEPT-WITH-DEBT**
