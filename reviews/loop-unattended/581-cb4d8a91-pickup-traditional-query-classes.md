# Review 581 — cb4d8a91 — pickup.c floor TRADITIONAL query_classes (D-1620)

## Metadata
- Full / short hash: `cb4d8a91ceb2910dea7793db0e6c067fe9eadfdb` / `cb4d8a91`
- Parent: `597fd9ba` (D-1619). This file audits **this SHA only** (ninth of nine `js/` commits since review **572**). Archive **Addressed:** D-1620 (fill `%h` `cb4d8a91` in this audit commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 04:01:35 +0200
- D-id: **D-1620**
- Stats: `js/pickup.js` +186/−83. Band **150–350** (js/ insertions **186**).
- Claims to close: Open floor `query_classes` after D-1581. Not `traditional_loot`. Not `menu_remarm`. `reviews/loop-2026-08-15/` has no unpaid floor-query_classes Must-fix.
- JS / map: `pickup.js` `pickup` / `pickup_traditional_floor` / `query_classes`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **542** named floor `query_classes` `:823`.

## Intent vs deliverable

Git subject promises: `MENU_TRADITIONAL` floor piles with two or more objects use `query_classes` then yn/`pickup_object`, instead of always opening Full `query_objlist`.

Pinned C `pickup.c` `pickup` `:671–910` (`node scripts/csym.mjs pickup`). Traditional else `:793–891`. Floor caller `query_classes` `:823` (`--callers query_classes`; staticfn so `csym.mjs query_classes` prints **no definition** — body is `:140–262`). `invent.c` `count_unpaid` `:3525–3538`. `hack.h` `ynaq` / `ynNaq` default `'y'`. `--callers pickup`: `hack.c:3891` `pickup(-count)`; autopick `allmain`/`hack`/`do`/`dig`/`trap`. Loot caller `:3252` is D-1581.

```819:836:nethack-c/upstream/src/pickup.c
        } else if (ct >= 2) {
            int via_menu = 0;

            There("are %s objects here.", (ct <= 10) ? "several" : "many");
            if (!query_classes(oclasses, &selective, &all_of_a_type,
                               "pick up", *objchain_p,
                               (traverse_how & BY_NEXTHERE) ? TRUE : FALSE,
                               &via_menu)) {
                if (!via_menu)
                    goto pickupdone;
                if (selective)
                    traverse_how |= INVORDER_SORT;
                n = query_objlist("Pick up what?", objchain_p, traverse_how,
                                  &pick_list, PICK_ANY,
                                  (via_menu == -2) ? allow_all
                                                   : allow_category);
                goto menu_pickup;
            }
        }
```

Old JS (D-1581): container `traditional_loot` + `askchain` live; floor `,` always `query_objlist_pickup`. `query_classes` `'u'` used a local `unpaid_in_list` (nexthere/array walk).

The diff **does** `pickup_traditional_floor` when `menu_style===MENU_TRADITIONAL && !menu_requested` after the shared `ct===1` fast path; There several/many; `query_classes(..., here=true, via_menu)`; ESC → 0; `'m'` `query_objlist_pickup` with `extraAllow` null ≡ `allow_all` else `allow_category`; yn `ynaqchars`/`ynNaqchars` default `'y'`; `'a'`/`'#'`/`q`/`n`; `count_unpaid` for `'u'`; `try`/`finally` pickupdone. It **does not** port hideunder / `newsym_force`, engulfer minvent traditional (`traverse_how=0`), `safe_qbuf`, or strip `FEEL_COCKATRICE` from the `'m'` `query_objlist` (C traditional `'m'` has no `FEEL` flag; Full path `:775` does). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `pickup` | C `:671–910`, **LIVE** | traditional branch this SHA |
| `pickup_traditional_floor` | C traditional else `:793–891`, **LIVE this SHA** | local; do not export #2 |
| `query_classes` | C `:140–262` staticfn, **LIVE** | `'u'` now `count_unpaid`; loot D-1581 |
| `count_unpaid` | C invent `:3525–3538`, **LIVE** | invent.js nobj + cobj; import |
| `unpaid_in_list` | deleted clone | `sym.mjs` NOT FOUND |
| `query_objlist_pickup` | C `query_objlist` clone, **LIVE** | `'m'` extraAllow |
| `allow_category` / `menu_class_present` / `add_valid_menu_class` | C, **LIVE** | |
| `pickup_object` | C, **LIVE** | async, awaited |
| `yn_function` | C cmd `:5471`, **LIVE** | 3-arg; default `'y'` |
| `allow_all` | C, **CLONE** | JS `extraAllow=null` |
| hideunder / `newsym_force` | C `:894–900`, **OMIT named** | |
| engulfer minvent traditional | C `:744–747`, **OMIT named** | JS still `objects_at` |
| `safe_qbuf` | C `:852–853`, **OMIT named** | JS `Pick up ${doname}?` |
| `'m'` `FEEL_COCKATRICE` | C Full `:775` only, **OMIT named** | clone always PETRIFY |
| `'m'` `INVORDER_SORT` if selective | C `:829–830`, **OMIT named** | JS uses existing sortpack |

`node scripts/csym.mjs pickup` → `:671-910`. `count_unpaid` → `:3525-3538`. `--callers count_unpaid` includes `pickup.c:178` (`'u'` ilet).

RNG: none in traditional `pickup` / `query_classes`. `yn_function` fuzzer `rn2` is C-only. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
pickup           js/pickup.js:932   ASYNC — await required
pickup_traditional_floor NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:2354
             => Do NOT write clone #2.
query_classes    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:2246
             => Do NOT write clone #2.
count_unpaid     js/invent.js:478   sync
unpaid_in_list   NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
query_objlist_pickup NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:806
             => Do NOT write clone #2.
allow_category   js/pickup.js:289   sync
pickup_object    js/pickup.js:723   ASYNC — await required
yn_function      js/getline.js:1081   ASYNC — await required
```

`--can pickup.js invent.js count_unpaid`: `ALREADY: pickup.js already statically imports invent.js. No new edge needed.` Function-body re-point (`unpaid_in_list` → `count_unpaid`). Do **not** stamp “cycle-forced clone.” Do **not** add `pickup_traditional_floor` #2. Do **not** restore `unpaid_in_list`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Gate. C `flags.menu_style != MENU_TRADITIONAL || iflags.menu_requested` → menu; else traditional. JS `style === MENU_TRADITIONAL && !menu_requested` then traditional else `query_objlist_pickup`. Default `?? MENU_FULL`. **Match `:759` inverted.** Autopick still skips traditional. **Match `:754–757`.**

`add_valid_menu_class(0)` before the split; pickupdone zeros encumbrance + class. JS moved the reset before work; `try`/`finally` matches `:906–908` including early return. **Match `:740` / `:906–908`.**

`ct`. C `FOLLOW` nexthere on the floor chain. JS nexthere count. There `ct<=10` several else many. **Match `:805–822`.**

`query_classes` here. Floor `BY_NEXTHERE` → `TRUE`. JS `here=true`. **Match `:825`.** `menu_on_demand.n=0` at start. **Match `:159–160`.** ilet `'u'` iff `count_unpaid(objs)`. **Match `:178–179`.** C `count_unpaid` walks **nobj** (and nested `cobj`), not nexthere — so a floor pile head still walks the level `nobj` chain. JS `invent.js:488` `otmp.nobj` is that callee, not a pile walker. **Match `:3525–3538` including the nobj-from-floor-head quirk.** Deleting `unpaid_in_list` is Match C, not a regression vs C.

`'m'`. C `*menu_on_demand` `-2` if `(everything || !oclassct) && !filtered` else `-3`; return FALSE. JS `:2330–2333` same. `!via_menu` → pickupdone. JS `!via_menu.n` return 0 (finally still pickupdone). `-2` extraAllow null; else `allow_category`. **Match `:827–835` allow_all vs allow_category.** JS then inlines menu_pickup (`reset_justpicked`, `pickup_object`, `n_tried = pickList.length`) instead of `goto`. Return `n_tried>0`. **Match `:779–789` / `:909` for the `'m'` arm.** C `pick_list[i].count`; JS `pickup_object(obj, 0)` — same count-0 convention as this file’s Full path, not a new stub.

yn loop. `bycat` is B/U/C/X only (not `'u'`/`'P'`). **Match `:838–839`.** Filter `allow_category` vs oclass `includes`. **Match `:843–846`.** `!all_of_a_type` → ynaq if `quan<2` else ynNaq, default `'y'` (`hack.h:1331–1334`). **Match `:854`.** `'q'` break; `'n'` continue; `'a'` all + selective collapse to this oclass; `'#'` `yn_number` 0 → skip else clamp quan; default y. **Match `:855–876`.** `lcount==-1` → full quan; first pick `reset_justpicked`; `pickup_object` `<0` break. **Match `:879–888`.**

`ct===1`. C handles `ct==1 && count` inside traditional; `ct==1 && !count` falls into the all_of_a_type for-loop (no prompt). JS hoists **all** `ct===1` before the traditional/Full split (`lcount = count? min(quan,count) : 0`). Result: pick the lone object without `query_classes`. **Match the observable.** Inner `pickup_traditional_floor` `ct===1 && count` is dead for floor because the outer gate already returned — not a second C path.

iletct==1. `query_classes` zeros `*everything` then returns one class without getlin, so traditional yn-asks that class. JS `everything: false` after the one-class shortcut. **Match `:157–168` + `:849`.**

Callee closure (traditional floor arm). LIVE: `query_classes`, `collect_obj_classes`, `getlin`, `yn_function`, `pickup_object`, `count_unpaid`, `allow_category`, `menu_class_present`, `add_valid_menu_class`, `reset_justpicked`, `doname`. CLONE: `query_objlist_pickup` (existing `query_objlist`); `allow_all` ≡ null extraAllow. OMIT named: hideunder, `newsym_force`, engulfer traditional, `safe_qbuf`, `'m'` FEEL / selective `INVORDER_SORT`. STUB: none. The arm may ship. Not “dispatch ported, callee stubbed.”

`cmd.c` `yn_function` 4th `addcmdq` TRUE (`:5471–5543`). JS `yn_function` is three args. Pre-existing getline omit, not introduced as a floor-only stub.

## Hallucinations / overclaim

Subject TRADITIONAL 2+ floor objects use `query_classes` then yn/`pickup_object` instead of always Full `query_objlist`: **true when `menu_style` is TRADITIONAL and `!menu_requested`.** D-log `count_unpaid` nobj for `'u'`: **true.** Do **not** stamp “Match C hideunder / `newsym_force` (`:894–900`).” Do **not** stamp “Match C swallowed `ustuck->minvent` traditional (`:744–747`).” Do **not** stamp “Match C `safe_qbuf` (`:852–853`).” Do **not** stamp “Match C traditional `'m'` `query_objlist` without `FEEL_COCKATRICE`.” Do **not** stamp “Match C `traditional_loot` / `askchain`” (D-1581). Do **not** stamp “Match C Full `query_objlist` `FEEL_COCKATRICE` + `n_or_more` count-N.” Default JS/C menu is FULL — fortress `,` does not exercise this arm.

## Density

+186 in one `pickup.js` envelope: C traditional else + the `'u'` ilet callee already required by `query_classes`. §2b one locus family. Not glued to loot `askchain` or `take_off`. Not a one-bullet peel.

## Branch-by-branch confirm

1. Autopick / Full `query_objlist_pickup` / `ct===1`. **Unchanged in spirit; ct===1 hoisted.**
2. TRADITIONAL && !menu_requested && ct>=2: There + `query_classes`. **Match this SHA.**
3. ESC / `via_menu==0`. pickupdone. **Match.**
4. `'m'` -2 allow_all / -3 `allow_category` then pickup loop. **Match allow; FEEL/INVORDER named.**
5. yn q/n/a/#/y + bycat BUCX. **Match.**
6. `'u'` ilet `count_unpaid` nobj. **Match this SHA.**
7. hideunder / engulfer / `safe_qbuf`. **Named.**

## Callers / RNG ledger

Wired: `dopickup` → `pickup(-count)`; autopick `pickup(1)` still menu_pickup. Conf: no `rn2`/`rnd` in this envelope. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore `unpaid_in_list`. Do not default TRADITIONAL to “prove” the arm on public traces. Do not import `fs`. Do not add `query_classes` #2.

## Verification

D-log private canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless nethackrc sets `MENU_TRADITIONAL` (JS `?? MENU_FULL`; contest `,` uses Full `query_objlist`). Fortress PASS does not prove There/getlin/yn/`'m'`/-2 vs -3. hideunder unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): hideunder + `newsym_force` after pickup (`pickup.c:894–900`); engulfer minvent traditional (`:744–747`); `safe_qbuf` (`:852–853`); traditional `'m'` without `FEEL_COCKATRICE` and selective `INVORDER_SORT` (`:829–834` vs Full `:775`). Do not glue those into `traditional_loot`. Do not add `pickup_traditional_floor` #2. Do not re-port `query_classes` for loot.

Verdict: **ACCEPT-WITH-DEBT**
