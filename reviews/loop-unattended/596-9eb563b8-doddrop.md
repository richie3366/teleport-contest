# Review 596 — 9eb563b8 — do.c doddrop / menu_drop / worn.c bypass_objlist (D-1635)

## Metadata
- Full / short hash: `9eb563b81a89f03344fe157e79db60d33972a906` / `9eb563b8`
- Parent: `b111beb6` (D-1634). This file audits **this SHA only** (sixth of nine `js/` commits since review **590**). Archive **Addressed:** D-1635 `9eb563b8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 08:03:25 +0200
- D-id: **D-1635**
- Stats: `js/do.js` +194, `js/worn.js` +52, `js/pickup.js` +25, `js/do_wear.js` +11, `js/getline.js` +10, `js/cmd.js` +11, `js/invent.js` +3. Band **200–450** (js/ insertions **~306** >250; id >454).
- Claims to close: Open ggetobj drop after D-1634. Not takeoff/identify. Not `menu_remarm`. `reviews/loop-2026-08-15/` has no unpaid doddrop Must-fix.
- JS / map: `do.js` `doddrop` / `menu_drop` / `menudrop_split`; `worn.js` `bypass_objlist` / `nxt_unbypassed_obj`; `cmd.js` `'D'` / `#droptype`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **581** named TRADITIONAL `query_classes`; **591** named `query_category` drop flags.

## Intent vs deliverable

Git subject promises: `#droptype`/`D` uses `ggetobj("drop")` on TRADITIONAL and `menu_drop` on FULL/COMBINATION, instead of `Unknown command 'D'` after D-1634.

Pinned C `do.c` `doddrop` `:923–944` (`node scripts/csym.mjs doddrop`). `--callers doddrop`: `cmd.c:26` extern (extcmdlist / `'D'` in cmd.c, not printed as a src call by csym). `menu_drop` `:980–1107` (`--callers menu_drop`: `do.c:937`). `menudrop_split` `:963–977`. `worn.c` `bypass_objlist` `:1126–1137` / `nxt_unbypassed_obj` `:1140–1152` / `bypass_obj` `:1118–1123`. `cmd.c` `reset_occupations` `:194–200`. `pickup.c` `allow_all` `:516–520`. `invent.c` `ggetobj` already live (D-1602).

```923:944:nethack-c/upstream/src/do.c
int
doddrop(void)
{
    int result = ECMD_OK;

    if (!gi.invent) {
        You("have nothing to drop.");
        return ECMD_OK;
    }
    add_valid_menu_class(0); /* clear any classes already there */
    if (*u.ushops)
        sellobj_state(SELL_DELIBERATE);
    if (flags.menu_style != MENU_TRADITIONAL
        || (result = ggetobj("drop", drop, 0, FALSE, (unsigned *) 0)) < -1)
        result = menu_drop(result);
    if (*u.ushops)
        sellobj_state(SELL_NORMAL);
    if (result)
        reset_occupations();

    return result;
}
```

Old JS: live `d` `dodrop`/`getobj` and live `ggetobj` (D-1602); no `doddrop`, so `'D'` fell through to unknown. The diff **does** export `doddrop`, local `menu_drop`/`menudrop_split`/`reset_occupations`, Array-aware `bypass_objlist`/`nxt_unbypassed_obj`, wire `cmd.js` `'D'` and `getline.js` `#droptype`. It **does not** port ParanoidAutoAll `'A'`+`'a'`, corpse `better_not_try_to_drop_that`, sinks, Heart of Ahriman `finesse_ahriman`, `clear_bypasses`, or query_objlist INCLUDE_VENOM display. Named this commit.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doddrop` | C `:923–944`, **LIVE this SHA** | export `do.js`; `'D'` / `#droptype` |
| `menu_drop` | C `:980–1107`, **CLONE** (C `staticfn`) | `do.js:2340`; one clone; body matches C |
| `menudrop_split` | C `:963–977`, **CLONE** | `do.js:2315`; welded / cursed LOADSTONE / `splitobj` |
| `drop` | C do.c, **LIVE** | `do.js:2142` async |
| `ggetobj` | C invent.c, **LIVE** | D-1602; TRADITIONAL + COMBINATION |
| `query_category` | C pickup.c, **LIVE** | D-1630; FULL flags include CHOOSE_ALL\|JUSTPICKED\|INCLUDE_VENOM |
| `query_objlist` | C pickup.c, **LIVE** | USE_INVLET\|INVORDER_SORT\|INCLUDE_VENOM |
| `allow_all` / `allow_category` | C `:516` / `:522`, **LIVE** | pickup.js |
| `add_valid_menu_class` | C pickup.c, **LIVE** | |
| `bypass_objlist` | C `:1126–1137`, **LIVE this SHA** | export worn.js; Array invent + nobj |
| `nxt_unbypassed_obj` | C `:1140–1152`, **LIVE this SHA** | inlines `bypass_obj` |
| `bypass_obj` | C `:1118–1123`, **CLONE** in nxt | zap.js already has clone #1; this SHA does **not** add #2 |
| `reset_occupations` | C cmd.c `:194–200`, **CLONE** | `do.js:2302`; callees LIVE |
| `reset_remarm` / `reset_pick` / `reset_trapset` | C, **LIVE** | trapset latebound apply.js |
| `sellobj_state` | C shk.c, **LIVE** | dynamic import (do.js already cannot static-import shk) |
| `count_justpicked` / `find_justpicked` | C pickup.c, **LIVE** | |
| `splitobj` | C, **LIVE** | mkobj.js |
| ParanoidAutoAll `'A'`+`'a'` | **OMIT named** | query_category already rejects lone `'A'` |
| corpse `better_not_try` / sinks / Ahriman | **OMIT named** | `drop` still named |

`node scripts/csym.mjs doddrop` → `do.c:923-944`. `menu_drop` → `do.c:980-1107`. `menudrop_split` → `do.c:963-977`. `--callers menu_drop`: `do.c:937`. `bypass_objlist` → `worn.c:1126-1137`. `--callers bypass_objlist`: `do.c:1055`, `:1062`, `:1088`, `:1100` (this SHA’s walk) plus invent.c/zap.c already-live. `nxt_unbypassed_obj` → `worn.c:1140-1152`. `--callers nxt_unbypassed_obj`: `do.c:1056`, artifact.c, zap.c. `reset_occupations` → `cmd.c:194-200`. `allow_all` → `pickup.c:516-520`. `bypass_obj` → `worn.c:1118-1123`.

RNG: none in `doddrop`/`menu_drop`/`bypass_*`. `drop` callees may `rn2`; this SHA does not add a seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
doddrop          js/do.js:2437   ASYNC — await required
menu_drop        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do.js:2340
menudrop_split   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do.js:2315
bypass_objlist   js/worn.js:692   sync
nxt_unbypassed_obj js/worn.js:717   sync
bypass_obj       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/zap.js:2623
reset_occupations NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do.js:2302
drop             js/do.js:2142   ASYNC — await required
ggetobj          js/invent.js:535   ASYNC — await required
query_category   js/pickup.js:384   ASYNC — await required
query_objlist    js/pickup.js:581   ASYNC — await required
allow_all        js/pickup.js:220   sync
allow_category   js/pickup.js:302   sync
add_valid_menu_class js/pickup.js:274   sync
reset_remarm     js/do_wear.js:1377   sync
reset_pick       js/lock.js:140   sync
sellobj_state    js/shk.js:1936   sync
count_justpicked js/pickup.js:204   sync
find_justpicked  js/pickup.js:211   sync
splitobj         js/mkobj.js:332   sync
```

`bypass_obj` stays one zap.js clone; nxt inlines C `:1118–1123` (`obj->bypass=1; context.bypasses=TRUE`). Do not export a second `bypass_obj`. `menu_drop`/`menudrop_split`/`reset_occupations` are C `staticfn` / cmd.c one-body — one JS clone each, matched here.

## C ↔ JS fidelity

`doddrop` branch order matches C `:933–937`: empty invent pline+return; `add_valid_menu_class(0)`; shop `SELL_DELIBERATE`; `style != TRADITIONAL || ggetobj(...) < -1` then `menu_drop(result)`; shop `SELL_NORMAL`; `if (result) reset_occupations()`. JS `You have nothing to drop.` matches `You("have nothing to drop.")`. `ushops` truthy analogue of `*u.ushops`. Default `menu_style ?? MENU_FULL` is the JS flags default (C default is also FULL in this port). TRADITIONAL `ggetobj` result `-2`/`-3` (`'m'`) is `< -1` so menu_drop runs with `retry` set; C `if (retry) all_categories = (retry == -2)`. **Match.**

FULL `query_category` flags: `UNPAID_TYPES | ALL_TYPES | CHOOSE_ALL | BUC_BLESSED | BUC_CURSED | BUC_UNCURSED | BUC_UNKNOWN | JUSTPICKED | INCLUDE_VENOM` — same set as C `:996–998`. `!n` → `drop_done` ECMD_OK; JS empty pickList returns `nDropped ? TIME : OK` with nDropped still 0. Loop: `ALL_TYPES_SELECTED` → all_categories; `'A'` → drop_everything+autopick; `'P'` → justpicked_quan=`max(0,count)`, drop_justpicked, `add_valid_menu_class('P')`; else add class and clear drop_everything. JS `pick.a_int === 'A'` matches pickup.js `a_int: 'A'` (string, not 65). **Match C’s char compare given this query_category.**

COMBINATION: `ggetobj("drop", drop, 0, TRUE, &ggoresults)`; `-2` → all_categories; `ALL_FINISHED` → n_dropped=`i`, skip object list. JS `{ bits: 0 }` analogue of the unsigned out-param. **Match.**

Autopick: `bypass_objlist(invent, FALSE)` then `while (nxt_unbypassed_obj)` drop if everything/all/allow_category, count `ECMD_TIME`, then clear bypass again. C comment about oil explosion invalidating nobj — JS Array walk with bypass bits is the same contract. Justpicked single-stack: `menudrop_split`. Else `query_objlist` + mark all bypass TRUE, verify pointer still in invent with bypass set, `menudrop_split`, clear. **Match.**

`menudrop_split`: `cnt && cnt < quan`; welded skip split; cursed LOADSTONE `corpsenm=cnt`; else `splitobj`; `return drop(otmp)`. JS `objectNames.indexOf('LOADSTONE')` is otyp. **Match.**

`bypass_objlist`: `if (on && objchain) context.bypasses=TRUE`; walk set/clear `bypass`. JS Array invent vs C nobj — dual walk is the JSON invent shape, not a second algorithm. `nxt_unbypassed_obj` marks first unmarked via inlined `bypass_obj`. **Match.**

`reset_occupations` clone: C `:196–199` three calls. JS `reset_remarm(); reset_pick(); await import apply reset_trapset()`. Latebound is cycle, not a stub. **Match.**

Callee closure (FULL/COMBINATION/TRADITIONAL `'m'` arms). LIVE: `ggetobj`, `drop`, `query_category`, `query_objlist`, `allow_all`, `allow_category`, `add_valid_menu_class`, `bypass_objlist`, `nxt_unbypassed_obj`, `splitobj`, `sellobj_state`, `reset_remarm`, `reset_pick`, `reset_trapset`, `count_justpicked`, `find_justpicked`. CLONE: `menu_drop`, `menudrop_split`, `reset_occupations`, nxt’s `bypass_obj` inline. OMIT named: ParanoidAutoAll (query_category already rejects lone `'A'` without the yn — same as C comment `:1000–1004` when the option is off). STUB: none in a live arm. Combined-arm ships.

`node scripts/imports.mjs --can do.js worn.js bypass_objlist` → ALREADY (static). `--can do.js worn.js nxt_unbypassed_obj` would be the same edge. sellobj_state dynamic from do.js: not a TDZ claim; do.js already cannot static-import shk. Cycle SCC is not a blocker. Diff grep: no FORCE / DIAG / getRngLog / fastforward / seed names / hardcoded coords. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## Hallucinations / overclaim

Subject `'D'`/`#droptype` TRADITIONAL ggetobj + FULL/COMBINATION menu_drop instead of Unknown: **true** (`cmd.js:1981` / `:2499`). Bypass walk + `reset_occupations`: **true.** Do **not** stamp “Match C ParanoidAutoAll `'A'`+`'a'` yn.” Do **not** stamp “Match C `better_not_try_to_drop_that`.” Do **not** stamp “Match C sinks / Heart of Ahriman.” Do **not** stamp “Match C `clear_bypasses` after the command.” Do **not** stamp “Match C `menu_remarm`” (D-1630). Public `'D'` is **public-unhit** on the tourist fortress (no droptype key in seed8000/0900). Private canary is not a public screen.

## Density

+306: C `doddrop` 22 + `menu_drop` 128 + `menudrop_split` 15 + `bypass_objlist`/`nxt_unbypassed_obj` + `reset_occupations` plus `'D'`/`#droptype` wiring. §2b one drop-type family. Did not glue takeoff or identify. Above a one-`if` peel.

## Verification

Wired: empty invent; TRADITIONAL ggetobj then `'m'` retry; FULL category/autopick/justpicked/objlist; COMBINATION ALL_FINISHED; bypass mark/clear; LOADSTONE corpsenm; `reset_remarm`. Unwired C: ParanoidAutoAll yn; corpse/sink/Ahriman in `drop`. Conf: no new `rn2` in this SHA. No seed gate.

D-log private canary **8**/8; green+strict seed8000/0900; cohort **7**/7 + strict (1500/1800/0012/0004/0007/2200/0383). **Public-unhit** for `'D'`/`#droptype`. Fortress does not prove FULL `'A'` autopick.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): ParanoidAutoAll `'A'`+`'a'`; corpse `better_not_try_to_drop_that`; sinks; Heart of Ahriman `finesse_ahriman`; query_objlist INCLUDE_VENOM display; `clear_bypasses`; `select_menu_pick_any` count-prefix. Do not add `bypass_obj` export (zap.js clone #1). Do not add `menu_drop` #2. Do not re-port `menu_remarm` (D-1630) or `ggetobj` takeoff (D-1602). Do not treat default `MENU_FULL` as a seed-shaped gate.

Verdict: **ACCEPT-WITH-DEBT**
