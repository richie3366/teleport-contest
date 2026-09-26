# Review 1773 — 30a1b86dc — allow_category (D-2814)

- SHA: `30a1b86dc` (coverage; category filter and `#loot` menu)
- Files: `js/pickup.js` `allow_category` (`:403`), `menu_loot` (`:2760`), `loot_menu_olist` (`:2740`), `traditional_loot` (`:3840`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- No new module edge (`BUCX_TYPES` joins the existing `const.js` import; `is_unpaid` left the `shk.js` import). `--can` not required.

## Intent vs deliverable

Subject promises one `allow_category` in C order (paranoid-auto-all, coin class before the priest, `set_bknown`, unpaid-or-contents, BUC, just-picked) and one `menu_loot` (`pickup.c:3264–3394`) that calls `query_category` / `allow_category` instead of the corner-menu clones. Traditional `'m'` passes the `-2`/`-3` retry. The diff does that. `query_loot_category` and `query_putin_category` are gone.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `allow_category` | C body, sync | `pickup.c:522–592` |
| `menu_loot` | file-local (C is `staticfn`) | `pickup.c:3264–3394` |
| `loot_menu_olist` | local snapshot helper | no C symbol; see fidelity |
| `allow_all` | `pickup.js:292` | `pickup.c:516–520` |
| `query_category` | imported same file, awaited | `pickup.c:1225` |
| `set_bknown` | imported `mkobj.js:651` | `mkobj.c` |
| `count_unpaid` | imported `invent.js:1239` | contents test |
| `Has_contents` | `const.js:3197` | `obj.h:334–336` `cobj != 0` |
| `is_unpaid` | import removed | not the C shop test |

`csym --callers allow_category`: `do.c:1057` → `do.js:2877`; `invent.c:2139` `ckvalidcat` → `invent.js:1803`; `pickup.c:611` `is_worn_by_type` → `pickup.js:452`; `pickup.c:843` → `pickup.js:3632`; `pickup.c:3335` → `menu_loot` `:2809` and `:2822`. `extern.h:2433` is the declaration.

`csym --callers menu_loot`: `pickup.c:3148` and `:3203` → `menu_loot_takeout` (`:2887`) from `use_container` `:3994` and `:4041`; `:3172` → `menu_loot_putin` (`:3309`) at `:4013`; `:3258` → `traditional_loot` `:3861`.

`sym.mjs` (deleted clones and the shop re-point):

```
is_unpaid        js/shk.js:1015   sync
query_loot_category NOT FOUND
query_putin_category NOT FOUND
menu_loot        NOT EXPORTED — 1 LOCAL CLONE js/pickup.js:2760
allow_category   js/pickup.js:403   sync
set_bknown       js/mkobj.js:651   sync
count_unpaid     js/invent.js:1239   sync
Has_contents     js/const.js:3197   sync
BUCX_TYPES       js/const.js:3040   sync
```

`menu_loot` is one file-local, matching C `staticfn`. The two deleted names have no leftover clone.

## C ↔ JS fidelity

`allow_category` (`pickup.c:526–591`). No class/shop/BUC/picked filter and `!ParanoidAutoAll` returns false. `ParanoidAutoAll` is `(paranoia_bits & PARANOID_AUTOALL) != 0` (`flag.h:95` `0x1000`, `:584`). Coins with a class filter return `valid_menu_classes` membership and skip the priest. Then `Role_if(PM_CLERIC) && !bknown` → `set_bknown(obj, 1)`. `monsterNames.indexOf('PM_CLERIC')` is 337, the same as `PM_CLERIC`. Class miss rejects. Shop reject is `!unpaid && !(Has_contents && count_unpaid(cobj) > 0)`. BUC: coins use `flags.goldX` (`'X'` else `'U'`); otherwise unknown / blessed / cursed / uncursed. Picked filter requires `pickup_prev`. Otherwise true. A null object returns false (`extern.h` `NONNULLARG1`). Named.

`is_unpaid` (`shk.js:1015`) is already `unpaid || (Has_contents && count_unpaid)`. The inlined shop test matches C and matches that helper. The subject’s “skipped the contents count” describes a call that already counted contents.

`menu_loot` (`:3276–3393`). `pickup_encumbrance = 0`. Non-zero `retry` sets `all_categories` only for `-2` and skips the class menu. Otherwise only `MENU_FULL` (2, `hack.h:1420`) runs `query_category` with `ALL_TYPES|UNPAID_TYPES|BUCX_TYPES|CHOOSE_ALL|JUSTPICKED` and `PICK_ANY`. Empty pick returns `ECMD_OK`. `'A'` sets loot-everything and autopick; put-in `'P'` sets just-picked, `max(0, count)`, `add_valid_menu_class`, and clears loot-everything; `ALL_TYPES_SELECTED` (`-2`) sets all-categories; anything else adds the class and clears loot-everything. `MENU_PARTIAL` leaves `all_categories` true and falls through to `query_objlist` with `allow_all`. That is the C fall-through.

Autopick (`:3333–3340`): take-out sets `cknown` and walks `cobj` via `nobj`, calling `out_container` when loot-everything, all-categories, or `allow_category`. Put-in walks an invent-array snapshot, not `nobj`. Named. `res < 0` breaks; `n_looted` adds `res`.

One just-picked stack (`:3342–3351`): `count_justpicked == 1`, `find_justpicked`, `n_looted = 1`, `splitobj` when `0 < count < quan`, then `in_container`. A null `splitobj` keeps the parent. Named.

Else `query_objlist` (`:3360–3389`): `INVORDER_SORT|INCLUDE_VENOM`, plus `USE_INVLET` when put-in and `invlet_constant` (unset JS flag counts as on; C’s default is on), plus `JUSTPICKED` for put-in just-picked. Take-out sets `cknown`. `allow_all` when all-categories, else `allow_category`. Each pick splits, then `in_container` or `out_container`. `res <= 0` with a dead container drops the object; a split merges via `unsplitobj`; `res < 0` breaks. Return is `ECMD_TIME` (`0x01`) when anything was looted, else `ECMD_OK`. Callers OR that the way C ORs `(menu_loot(...) > 0)`.

`loot_menu_olist` copies take-out `cobj` into an array before `query_category` and `query_objlist`. `walk_obj_list` (`:345–349`) walks an array by index and ignores `BY_NEXTHERE`. JS `BUC_BLESSED` is 1 (`const.js:2209`), the same bit as `BY_NEXTHERE` (`hack.h:1243` is `0x0001`; C `BUC_BLESSED` is `0x0100`, `hack.h:1262`). A chain passed with `BUCX_TYPES` would follow `nexthere` and show only the head. The array is why “All types” is visible. `BUCX_TYPES` in JS is `(1|3|2)|4` = 7, so this call’s mask still sets all four JS BUC tests. The absolute flag values stay the pre-existing collision; this arm does not depend on a chain walk.

Traditional `'m'` (`pickup.c:3257–3258`): `query_classes` stores `-2` when everything or no class and no B/U/C/X/P filter, else `-3` (`pickup.js:3550–3552`). `traditional_loot` calls `menu_loot(menu_on_request.n, put_in)` instead of `menu_loot_*(0)`.

## Hallucinations / overclaim

The shop sentence overstates the previous helper: `is_unpaid` already included contents. The shipped test is the C one. The BUC-bit sentence is accurate, and the snapshot is what the cohort failure (`a - Scrolls` vs `a - All types`) was fixed with. Null object, `includes(0)` vs `strchr` of class 0, null `splitobj`, and the put-in invent snapshot are named in the commit and match the code.

## Density

`allow_category` is the whole C function. `menu_loot` is the caller that was a corner-menu clone; its three `use_container` sites and the `'m'` retry are wired. `query_category` itself is the existing body, not a second port.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify allow_category --base 30a1b86dc~1 --reach-all`.

```
verify allow_category: baseline 30a1b86dc~1 (scoreboard at 9dcef1d65) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke allow_category: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2814’s green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
