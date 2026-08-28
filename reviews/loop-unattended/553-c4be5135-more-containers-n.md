# Review 553 — c4be5135 — pickup.c in_or_out_menu more_containers n (D-1592)

## Metadata
- Full / short hash: `c4be51351d6d81f0250ed5b6ed699917d6dea905` / `c4be5135`
- Parent: `92bbf63b` (D-1591). This file audits **this SHA only** (eighth of nine `js/` commits since review **545**). Archive **Addressed:** D-1592 `c4be5135`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 20:49:24 +0200
- D-id: **D-1592**
- Stats: `js/pickup.js` +226/−94. Band **150–350** (js/ insertions **226**).
- Claims to close: Open more_containers `'n'` after D-1567/D-1581. Not ggetobj takeoff. Not mbag explosion. `reviews/loop-2026-08-15/` has no unpaid loot-Next Must-fix.
- JS / map: `pickup.js` `in_or_out_menu` / `use_container` / `do_loot_cont` / `container_at` / `loot_which_containers_menu` / `loot_floor_containers` / `doloot`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **528** / **542** named more_containers `'n'`.

## Intent vs deliverable

Git subject promises: `#loot` Next is the default on remaining selected containers instead of always Quit.

Pinned C `pickup.c` `in_or_out_menu` `:3397–3477` (`csym` misses the split signature; `--callers` proto `:47`, call `:3091`; body follows `menu_loot`). `use_container` `:2971–3226` (`abort_looting=FALSE` `:2984`; `'q'` `:3128`; `'n'`/`'q'` `containerdone` `:3129–3130`). `do_loot_cont` `:2087–2162` third arg `cindex < ccount` `:2161`. `container_at` `:2023–2038`. `doloot_core` `:2217–2273` (`num_conts>1` PICK_ANY then `do_loot_cont(&cobj, i, n)`). `able_to_loot` `:2041–`. TRADITIONAL yn default `:3114` `more_containers ? 'n' : 'q'`.

```3453:3476:nethack-c/upstream/src/pickup.c
    if (more_containers) {
        any.a_int = 7; /* 'n' */
        add_menu(..., "loot next container", MENU_ITEMFLAGS_SELECTED);
    }
    any.a_int = 8; /* 'q' */
    ...
             more_containers ? MENU_ITEMFLAGS_NONE : MENU_ITEMFLAGS_SELECTED);
    ...
    return (n == 0 && more_containers) ? 'n' : 'q';
```

```2159:2161:nethack-c/upstream/src/pickup.c
    return use_container(cobjp, FALSE, (boolean) (cindex < ccount));
```

Old JS: `in_or_out_menu` 5 args; `'q'` always `*`; `?`/`n` both returned used without abort distinction; `do_loot_cont(cobj)` only; `doloot` first floor container only.

The diff **does** live the `'n'` row + Space default, `'q'` vs `'n'` abort, `cindex<ccount`, `container_at`, multi PICK_ANY, `able_to_loot` gate, TRADITIONAL yn `'n'` default. It **does not** port Confusion `reverse_loot`, `iflags.menu_requested` skip-to-lootmon, grave, saddle, cockatrice, AUTOUNLOCK_FORCE, PICK_ANY `@`/pages/>26, lootmon after empty multi-pick fallthrough polish, chest trap, mbag explosion body, ggetobj takeoff/identify. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `in_or_out_menu` `'n'` | C `:3453–3476`, **LIVE this SHA** | 1 local |
| `use_container` abort/`n` | C `:2984` / `:3128–3130`, **LIVE** | |
| `use_container_traditional_prompt` `'n'` | C `:3104` / `:3114`, **LIVE** | |
| `do_loot_cont` cindex/ccount | C `:2161`, **LIVE this SHA** | 1 local |
| `container_at` | C `:2023–2038`, **LIVE this SHA** | 1 local |
| `loot_which_containers_menu` | C `:2237–2270` inline, **LIVE** | not a C name |
| `loot_floor_containers` | C lootcont, **LIVE** | |
| `doloot` | C `:2192+`, **LIVE** | |
| `able_to_loot` | C `:2041`, **LIVE** | 1 local |
| `explain_container_prompt` skip ` n ` | C, **LIVE** | pre-existing |
| PICK_ANY `@` / pages / >26 | **OMIT named** | |
| `menu_requested` skip lootcont | C `:2213–2214`, **OMIT named** | |
| Confusion `reverse_loot` | **OMIT named** | |
| chest trap / BoT / mbag explode | **OMIT named** | |
| ggetobj takeoff/identify | **OMIT named** | |

`node scripts/csym.mjs do_loot_cont` → `:2087-2162`. `--callers`: `:2262` multi, `:2279` single. `container_at` → `:2023-2038`. `in_or_out_menu` `--callers`: `:3091`. `use_container` callers: apply held; `do_loot_cont` `:2161`.

RNG: **none** in the Next/PICK_ANY arms. Confusion `rn2` named. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
in_or_out_menu   NOT EXPORTED — 1 LOCAL js/pickup.js:1308
use_container    js/pickup.js:2528   ASYNC — await required
do_loot_cont     NOT EXPORTED — 1 LOCAL js/pickup.js:2698
container_at     NOT EXPORTED — 1 LOCAL js/pickup.js:2738
loot_which_containers_menu NOT EXPORTED — 1 LOCAL js/pickup.js:2754
loot_floor_containers NOT EXPORTED — 1 LOCAL js/pickup.js:2799
doloot           js/pickup.js:2840   ASYNC — await required
able_to_loot     NOT EXPORTED — 1 LOCAL js/pickup.js:2935
traditional_loot NOT EXPORTED — 1 LOCAL js/pickup.js:2485
explain_container_prompt NOT EXPORTED — 1 LOCAL js/pickup.js:1217
use_container_traditional_prompt NOT EXPORTED — 1 LOCAL js/pickup.js:1247
abort_looting    NOT FOUND (flag on game, not a function)
```

`--can pickup.js invent.js paint_corner_nhw_menu`: ALREADY. Do **not** add `in_or_out_menu` #2. Do **not** add `container_at` in `invent.js`. Do **not** add `do_loot_cont` in `apply.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. (The diff grep hit AUTOUNLOCK_FORCE only in a **comment**.)

## C ↔ JS fidelity

FULL/PARTIAL menu. `'n'` row only if `more_containers`; `*` on Next, `-` on Quit; else `*` on Quit. **Match `:3453–3463`.** Space/Return → `'n'` if more else `'q'`. **Match `:3476` n==0 path** (JS cannot toggle the `*` off; n==0-after-deselect named). ESC → `'q'`. **Match n<0.** Letter returns lootchars even under lootabc display. **Match `:3474`.**

TRADITIONAL/COMBINATION. `n` in pbuf iff more; yn default `'n'`/`'q'`. **Match `:3104` / `:3114`.** Help still skips ` n ` unless more. **Match.**

`'q'` vs `'n'`. `'q'` sets `abort_looting`; both skip loot_out/in and go containerdone. **Match `:3128–3130`.** Next container is not aborted. **That is the C delta vs parent** (parent treated `'n'` like `'q'`).

`use_container` entry `abort_looting=FALSE`. **Match `:2984`.** Checked in the doloot loop **after** return, so a `'q'` still stops the remaining boxes. **Match `:2262–2265`.**

`do_loot_cont`. Unlocked → `use_container(..., false, cindex < ccount)`. **Match `:2161`.** Last of N and the single-container walk pass `1,1` → more false. **Match `:2279`.** Locked autounlock parent unchanged; AUTOUNLOCK_FORCE named.

`container_at`. Walk `nexthere`, count `Is_container`, stop at first if `!countem`. **Match `:2023–2038`.**

num_conts>1. PICK_ANY `doname` rows, `do_loot_cont(list[i-1], i, n)`. ESC n=-1 still `c='y'` (skip lootmon / nothing-here). **Match `:2259–2272` (`if (n != 0) c = 'y'`).** n==0 → not `'y'`. **Match.** Auto `a`..`z` for first 26. **Match tty auto selector.** `@` invert / pages / >26 named.

num_conts==1. Walk first container `1,1`. **Match.** `able_to_loot` before either arm. **Match `:2220–2221`.**

Directional underfoot + container → lootcont again. **Match `:2302–2303`.** Adjacent container “have to be at”. **Match.** `menu_requested` goto lootmon **before** lootcont still named (JS still runs lootcont first).

Callee closure (multi `#loot` Next). LIVE: `in_or_out_menu`, `use_container`, `do_loot_cont`, `container_at`, `able_to_loot`, `doname`, `thesimpleoname`, `yn_function`, `traditional_loot` / `menu_loot_*`, `explain_container_prompt`. OMIT named: `@` invert, pages, >26, skip-lootcont, reverse_loot, FORCE, chest/BoT. STUB: **none** on the Next arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject Next default on remaining selected containers instead of always Quit: **true** for FULL (contest default) and TRADITIONAL yn. D-log `abort_looting` `'q'` vs `'n'`: **true.** Do **not** stamp “Match C `iflags.menu_requested` skip lootcont.” Do **not** stamp “Match C PICK_ANY `@` / MENU_SEARCH / >26.” Do **not** stamp “Match C Confusion `reverse_loot`.” Do **not** stamp “Match C chest_trap / BAG_OF_TRICKS / mbag explode.” Do **not** stamp “Match C loot_mon saddle.” Apply-from-invent still `more_containers=false` (C apply last). Public suite has no multi-box `#loot`.

## Density

One `pickup.c` Next envelope: menu row + abort split + the `doloot` multi picker that passes `cindex<ccount`. +226 JS. Did not glue ggetobj takeoff. §2b OK.

## Branch-by-branch confirm

1. One floor box: no `'n'` row; Space → `'q'`. **Match.**
2. N selected, i<N: `'n'` `*`; Space skips loot and continues. **Match.**
3. N selected, i==N: no `'n'`; Space `'q'`. **Match.**
4. `'q'` stops remaining boxes. **Match abort.**
5. ESC on “Loot which”: c=`'y'`, no lootmon. **Match n!=0.**
6. Empty pick n==0: not `'y'`. **Match.**
7. TRADITIONAL default `'n'` when more. **Match.**
8. `menu_requested` skip lootcont / `@` / reverse_loot / chest. **Named.**

## Callers / RNG ledger

C `#loot` `doloot_core`; apply held never passes more. Extra `able_to_loot` plines are C. No new RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Keep `in_or_out_menu` / `container_at` in `pickup.js` (C home). Do not add `do_loot_cont` in `apply.js`. Do not add `abort_looting` as a fake function. Do not treat comment `AUTOUNLOCK_FORCE` as a production gate.

## Verification

D-log private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** (multi floor containers + `#loot` Next). Single-box `#loot` if present still has more=false. PICK_ANY `@` unhit. `menu_requested` skip unhit.

## Actionable C-wrongs

None for Must-fix. Named: ggetobj takeoff/identify; floor `query_classes`; mbag explosion body; chest trap; BoT teeth; Confusion `reverse_loot`; `iflags.menu_requested` skip-to-lootmon; grave; saddle; cockatrice; AUTOUNLOCK_FORCE; lootcont→lootmon after empty multi-pick polish; PICK_ANY `@` invert / pages / >26; n==0 toggle-off default; n>1 `pick_list[1]`. Do not add `in_or_out_menu` #2. Do not restore `'n'`==`'q'` abort.

Verdict: **ACCEPT-WITH-DEBT**
