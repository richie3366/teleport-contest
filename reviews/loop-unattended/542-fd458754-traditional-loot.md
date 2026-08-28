# Review 542 — fd458754 — pickup.c traditional_loot / invent.c askchain (D-1581)

## Metadata
- Full / short hash: `fd4587544d19247322e28a06c688f1021f283d8c` / `fd458754`
- Parent: `d7879b7c` (D-1580). This file audits **this SHA only** (sixth of nine `js/` commits since review **536**). Archive **Addressed:** D-1581 `fd458754`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 16:57:28 +0200
- D-id: **D-1581**
- Stats: `js/pickup.js` +463, `js/invent.js` +49, `js/getline.js` +57, detect/hacklib/objects. Band **200–450** (js/ insertions **563**).
- Claims to close: Open traditional_loot askchain after D-1567. Not `'r'` reversed. Not more_containers `n`. `reviews/loop-2026-08-15/` has no unpaid loot-askchain Must-fix.
- JS / map: `pickup.js` `traditional_loot`/`query_classes`/`askchain`; `invent.js` `sortloot` INVLET; `getline.js` yn `#`; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **528** named `traditional_loot` askchain.

## Intent vs deliverable

Git subject promises: MENU_TRADITIONAL loot uses `query_classes` + `askchain` yn instead of always `menu_loot`.

Pinned C `pickup.c` `traditional_loot` `:3229–3261` (`query_classes` then `askchain`; `'m'` → `menu_loot`). `query_classes` `:140–262`. Callers `use_container` `:3146` / `:3170` / `:3201`. `invent.c` `askchain` `:2376–2541`. Callees `collect_obj_classes` `:101–118`, `simple_look` `:75–98`, `allow_category` `:523` (`ckvalidcat` is a one-line wrapper `:2136–2139`), `sortloot` INVLET, `def_char_to_objclass`, `highc`, `yn_function` + `yn_number` when resp has `'#'`. `nxt_unbypassed_loot` `worn.c:1159–1174`. `clear_bypasses` at ret.

```3229:3261:nethack-c/upstream/src/pickup.c
    if (query_classes(selection, &one_by_one, &allflag, action, *objlist,
                      FALSE, &menu_on_request)) {
        if (askchain(objlist, (one_by_one ? (char *) 0 : selection), allflag,
                     actionfunc, checkfunc, 0, action))
            used = ECMD_TIME;
    } else if (menu_on_request < 0) {
        used = (menu_loot(menu_on_request, put_in) > 0);
    }
    return used;
```

```2454:2470:nethack-c/upstream/src/invent.c
            if (first) {
                if (take_out || put_in)
                    Sprintf(qpfx, "%s: ", word), *qpfx = highc(*qpfx);
                first = FALSE;
            }
            ...
            sym = yn_function(qbuf,
                              (takeoff || ident || otmp->quan < 2L)
                                ? ynaqchars : ynNaqchars,
                              'n', FALSE);
```

Old JS: D-1567 `'r'` live; TRADITIONAL loot still `menu_loot_*`.

The diff **does** live `query_classes` + `askchain` + `traditional_loot` on all three `use_container` TRADITIONAL sites, INVLET `sortloot`, yn `#`, `def_char_to_objclass` home (detect clone retired), `highc`. It **does not** port floor `query_classes` `:823`, ggetobj takeoff/identify, `clear_bypasses` global, more_containers `'n'`, mbag explosion body, `ParanoidAutoAll` / priest `set_bknown`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `traditional_loot` | C `:3229–3261`, **LIVE this SHA** | one local |
| `query_classes` | C `:140–262`, **LIVE this SHA** | loot `here=FALSE` |
| `askchain` | C `:2376–2541`, **LIVE this SHA** | in `pickup.js` (C is invent.c) |
| `collect_obj_classes` | C `:101–118`, **LIVE** | |
| `simple_look` | C `:75–98`, **LIVE this SHA** | `:` peek |
| `in_container` / `out_container` / `ck_bag` | **LIVE** | |
| `sortloot` INVLET | C askchain `:2407`, **LIVE this SHA** | invent Array or nobj |
| `def_char_to_objclass` | C `:90–99`, **LIVE this SHA** | detect clone deleted |
| `highc` | C hacklib, **LIVE this SHA** | |
| `yn_function` `#` / `yn_number` | C topl, **LIVE this SHA** | |
| `allow_category` / `ckvalidcat` | **LIVE** | wrapper ≡ allow_category |
| `nxt_unbypassed_loot` | C `worn.c:1159`, **CLONE** | stale + bypass |
| `menu_loot_*` | **LIVE** | `'m'` fallback |
| floor `query_classes` / takeoff / identify / `clear_bypasses` | **OMIT named** | |
| `display_inventory(NULL, TRUE)` on `'i'` | C `:223`, **CLONE miss** | JS PICK_NONE; result was `(void)` |

`node scripts/csym.mjs traditional_loot` → `:3229-3261`. `--callers`: use_container `:3146`/`:3170`/`:3201`. `query_classes` proto `:15`; callers `:823` (floor, named) + `:3252`. `askchain` `--callers`: invent ggetobj `:2358`; pickup `:3254`.

RNG: **none** in query/askchain control. `obj_glyph` not on this path. yn digits are counts, not `rn2`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
traditional_loot     NOT EXPORTED — 1 LOCAL js/pickup.js:2469
query_classes        NOT EXPORTED — 1 LOCAL js/pickup.js:2214
askchain             js/pickup.js:2346   ASYNC
collect_obj_classes  NOT EXPORTED — 1 LOCAL js/pickup.js:242
simple_look          NOT EXPORTED — 1 LOCAL js/pickup.js:2190
highc                js/hacklib.js:94   sync  (+ dokeylist local — do not add #3)
def_char_to_objclass js/objects.js:103   sync
yn_function          js/getline.js:862   ASYNC
sortloot             js/invent.js:320   sync
in_container         NOT EXPORTED — 1 LOCAL js/pickup.js:1769
out_container        NOT EXPORTED — 1 LOCAL js/pickup.js:1277
ck_bag               js/pickup.js:1657   sync
```

`--can pickup.js invent.js sortloot`: ALREADY. `--can invent.js pickup.js askchain`: **SAFE** (hoisted; not TDZ). askchain lives next to `traditional_loot` rather than C `invent.c` — one function, do **not** add invent.js clone #2. `--can detect.js objects.js def_char_to_objclass`: ALREADY (clone retired). `--can pickup.js hacklib.js highc`: ALREADY.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`traditional_loot`. put-in: invent, `in_container`, `ck_bag`. take-out: container `cobj`, `out_container`, encumbrance 0. `query_classes` then `askchain(olets=NULL if A)` else `'m'` `menu_loot`. used TIME if askchain cnt. **Match `:3239–3260`.** Three `use_container` TRADITIONAL sites wired. **Match `:3145–3148` / `:3169–3172` / `:3200–3203`.** COMBINATION/FULL still `menu_loot`. **Match.**

`query_classes`. Empty classes → false. One class pre-fills oclasses then still appends `m`/`u`/BUCX/`P`; `iletct>1` getlin and **ask_again zeros oclasses**. Extra ` aA` + `i`/`:`. Esc → false. `A`/`a`/`m`/`uBUCXP` / class sym / There-no. `'m'` sets demand -2/-3 and false. Empty pick → force A. **Match `:157–261`.** `here=FALSE` for loot (nobj / invent Array). Floor `here=TRUE` caller named.

`askchain` loot. `nodot` for put-in/take-out. `bycat` via `menu_class_present`. `sortloot` INVLET. bypass clear; `nxt_unbypassed_loot` skips stale/bypass. ilet a–z A–Z `#`; COIN extra. olets class filter; `ckfn`; `allow_category` ≡ `ckvalidcat`. First prompt `highc` “Take out: ” / “Put in: ”. yn `ynaq` vs `yn#aq` by `quan<2` (takeoff/ident named). `#` → `yn_number` 0 is n else split if splittable. y/a fall into n’s `dud++` when nodot. q returns cnt (ident -1 named). nextclass `++olets`. “That was all.” / “No applicable objects.” **Match the loot arms `:2393–2533`.** `clear_bypasses` global named; JS clears the walked list.

Callee closure (TRADITIONAL take-out/put-in). LIVE: `query_classes`, `askchain`, `collect_obj_classes`, `simple_look`, `add_valid_menu_class`, `allow_category`, `sortloot`, `def_char_to_objclass`, `highc`, `yn_function`, `in_container`/`out_container`/`ck_bag`, `menu_loot_*`. CLONE verified: `nxt_unbypassed_loot`. OMIT named: `clear_bypasses`, takeoff/identify, floor query, more_containers `n`, explosion body. STUB: **none** in those two loot arms. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject TRADITIONAL `query_classes`+`askchain` instead of always `menu_loot`: **true.** Do **not** stamp “Match C floor pickup `query_classes`.” Do **not** stamp “Match C ggetobj takeoff/identify `askchain`.” Do **not** stamp “Match C `clear_bypasses`.” Do **not** stamp “Match C `display_inventory(NULL, TRUE)` on `'i'`” — JS shows PICK_NONE; C want_reply is discarded `(void)` then ask_again. Do **not** stamp “Match C `ParanoidAutoAll`.” MENU_FULL still `menu_loot`: **true**, not a miss.

## Density

One C loot-style family (`traditional_loot` + the callees those arms reach). +563 JS. Large but not “finish potions.” Did not glue PREFIXCMD. §2b OK at the high end.

## Branch-by-branch confirm

1. TRADITIONAL take-out, classes, A then y: `askchain` one-by-one. **Match.**
2. getlin `a`: `everything`, auto y. **Match.**
3. One class only, no BUCX/m: no getlin, askchain that class. **Match.**
4. `'m'`: `menu_loot` fallback. **Match.**
5. Esc getlin: no askchain. **Match.**
6. `'#'` count < quan, splittable: `splitobj`. **Match.** count 0 → n. **Match.**
7. put-in `ck_bag` reject: tmp≤0, unsplit if split. **Match.**
8. FULL style: still `menu_loot`. **Match.**
9. `'i'` during query: C PICK_ONE discarded; JS PICK_NONE. **Peek then re-ask both; menu how diverges.**
10. Floor pickup query: not called. **Named.**

## Callers / RNG ledger

C `traditional_loot`: only `use_container` TRADITIONAL. JS same three sites. Floor `query_classes` and ggetobj `askchain` not wired. **No core RNG.** No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `def_char_to_objclass` one home (`objects.js`). Do not restore detect’s `DEF_OC_SYMS` clone. Do not add `askchain` in `invent.js` (#2) even though `--can` is SAFE — pickup already has the C body. Do not add `highc` #3 (`dokeylist` local remains).

## Verification

D-log private canary **16**/16 (traditional_loot/askchain; TRADITIONAL A+y take-out / )+y put-in / getlin `a` auto-yes; MENU_FULL still menu_loot; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a session sets MENU_TRADITIONAL. Default `MENU_FULL` means tourist green is not askchain proof.

## Actionable C-wrongs

None for Must-fix. Named: floor `query_classes`; ggetobj takeoff/identify; `clear_bypasses`; more_containers `'n'`; mbag explosion; `ParanoidAutoAll` / priest `bknown`; query `'i'` `display_inventory(..., TRUE)` (PICK_NONE stand-in). Do not add `askchain` #2 in `invent.js`. Do not treat FULL `menu_loot` as a C-wrong.

Verdict: **ACCEPT-WITH-DEBT**
