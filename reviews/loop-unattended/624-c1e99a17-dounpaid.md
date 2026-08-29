# Review 624 — c1e99a17 — invent.c dounpaid Iu listing (D-1663)

## Metadata
- Full / short hash: `c1e99a17ad740b4b85614d4de9e7b449b7d6acb0` / `c1e99a17`
- Parent: `101d9d0b` (D-1662). This file audits **this SHA only** (seventh of nine `js/` commits since review **617**). Archive **Addressed:** D-1663 `c1e99a17`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 15:51:39 +0200
- D-id: **D-1663**
- Stats: `js/invent.js` +237/−4, `js/mkobj.js` +22/−1, `js/objnam.js` +30/−6, `js/shk.js` +1/−6. `js/` **290** insertions. Band **200–450**.
- Claims to close: Open `invent.c` `dounpaid` after D-1655 (review **616** named the omit). Not `dotypeinv`. Not `doinvbill`.
- JS / map: `invent.js` `dounpaid` / `find_unpaid` / `currency`; `mkobj.js` `unknwn_contnr_contents`; `objnam.js` `xprname` cost. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **616** named `dounpaid` / Iu/Ix cost. `reviews/loop-2026-08-15/` has no unpaid `dounpaid` Must-fix.

## Intent vs deliverable

Git subject promises: `Iu` lists unpaid invent with `xprname` cost (one-item `pline` or NHW_MENU Total), instead of omitting the listing after D-1655.

Pinned C `dounpaid` `:3653–3789` (`node scripts/csym.mjs dounpaid`). `--callers dounpaid`: prototype `:33`; **one** live site `dotypeinv` `:3953`. `find_unpaid` `:3020–3041`. `unknwn_contnr_contents` `mkobj.c:682–695`. `xprname` `invent.c:2895–2954` (csym body miss — `extern.h`; cite file). `currency` `:1545–1554`. `carried` `obj.h:332` `#define carried(o) ((o)->where == OBJ_INVENT)`.

```3670:3683:nethack-c/upstream/src/invent.c
    if (count == 1 && !xtracount) {
        otmp = find_unpaid(gi.invent, &marker);
        contnr = unknwn_contnr_contents(otmp);
    }
    if  (otmp && !contnr) {
        cost = unpaid_cost(otmp, COST_NOCONTENTS);
        iflags.suppress_price++;
        pline1(xprname(otmp, distant_name(otmp, doname),
                       carried(otmp) ? otmp->invlet : CONTAINED_SYM,
                       TRUE, cost, 0L));
        iflags.suppress_price--;
        return;
    }
```

Old JS: no `dounpaid` / `find_unpaid` / `unknwn_contnr_contents`; `xprname` omitted the cost column; `shk.js` had a local `currency` clone. The diff **does** export `dounpaid`, local `find_unpaid` marker dance, live `unknwn_contnr_contents`, `xprname` 6th `cost` / `*` column, C-home `currency` (shk import). It **does not** port `dotypeinv` `:3951–3957`, `doinvbill`, `tally_BUCX`, Hallu `ROLL_FROM(currencies[])`, or cmd.c `'I'`. **`dounpaid` has zero JS callers.** `cmd.js` `key_to_cmd` has `'i'` → `ddoinv` and no `'I'`. Subject “Iu lists” is the **callee**, not the command.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dounpaid` | C `:3653–3789`, **LIVE this SHA** | **ASYNC**; **no caller** |
| `find_unpaid` | C `:3020–3041`, **LIVE this SHA** | local static equivalent |
| `find_unpaid_node` | **CLONE** of one C while-node | Array vs `nobj` wrapper |
| `unknwn_contnr_contents` | C `mkobj.c:682–695`, **LIVE this SHA** | extra null `parent` break |
| `xprname` cost/`*` | C `:2928–2938`, **LIVE this SHA** | JS arg order historical |
| `currency` | C `:1545–1554`, **LIVE this SHA** | Hallu `ROLL_FROM` **OMIT named** |
| `unpaid_cost` | C shk, **LIVE** | `COST_CONTENTS` named |
| `distant_name` / `doname` | **LIVE** | |
| `s_suffix` | C do_name, **LIVE** | do not add clone #8 |
| `let_to_name` / `reassign` / `invlet_constant` | **LIVE** | D-1655 |
| `show_nhw_menu_text` | C `display_nhwindow` NHW_MENU FALSE | **CLONE** analogue; dynamic import |
| `carried` | C `obj.h:332`, **CLONE diverged** | JS `.includes` not `where` |
| `dotypeinv` `'u'` | C `:3951–3953`, **OMIT named** | no JS `dotypeinv`; no `'I'` |
| `doinvbill` / `tally_BUCX` | **OMIT named** | |
| Hallu `currencies[]` | C `:1549`, **OMIT named** | |
| `contained_cost` | C unpaid_cost, **OMIT named** | |

`node scripts/csym.mjs dounpaid` → `:3653-3789`. `find_unpaid` → `:3020-3041`. `unknwn_contnr_contents` → `:682-695`. `currency` → `:1545-1554`. `--callers dounpaid`: `:3953` only. `xprname` csym: no definition (split signature); body `invent.c:2895–2954`.

RNG: none in `dounpaid` / `find_unpaid` / `unknwn`. Hallu `ROLL_FROM` is the named omit in `currency`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
dounpaid         js/invent.js:1134   ASYNC — await required
find_unpaid      NOT EXPORTED — 1 LOCAL js/invent.js:1055
             => Do NOT write clone #2.
unknwn_contnr_contents js/mkobj.js:2352   sync
xprname          js/objnam.js:2547   sync
currency         js/invent.js:1042   sync
unpaid_cost      js/shk.js:600   sync
distant_name     js/objnam.js:795   sync
s_suffix         js/do_name.js:383   sync
             !! ALSO 7 LOCAL CLONE(S) — do NOT add #8
show_nhw_menu_text js/pager.js:408   ASYNC — await required
let_to_name      js/invent.js:1691   sync
reassign         js/invent.js:5713   sync
invlet_constant  js/invent.js:5702   sync
COST_NOCONTENTS  js/const.js:1523   sync   export const
```

`--can invent.js shk.js unpaid_cost`: ALREADY. `--can invent.js mkobj.js unknwn_contnr_contents`: ALREADY. `--can invent.js objnam.js distant_name`: ALREADY. `--can invent.js do_name.js s_suffix`: ALREADY. `--can shk.js invent.js currency`: ALREADY (clone → import). `--can invent.js pager.js show_nhw_menu_text`: IN-SCC, `show_nhw_menu_text` hoisted, VERDICT SAFE. Dynamic import is not a TDZ dodge for a cycle-forced clone — do **not** stamp that. Do **not** add `find_unpaid` export/`#2`. Do **not** add `s_suffix` #8.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**One-item.** C `count==1 && !xtracount` → `find_unpaid` + `unknwn_contnr_contents`; `otmp && !contnr` → `unpaid_cost(COST_NOCONTENTS)`, `suppress_price++`, `pline1(xprname(..., carried?invlet:CONTAINED_SYM, TRUE, cost, 0L))`, `--`, return. JS same order. `COST_NOCONTENTS` is `0` (`hack.h:308` / `const.js:1523`). **Letter:** C `carried(otmp)` is `where == OBJ_INVENT`. JS `(walk_invent_nobj(game.invent)||[]).includes(otmp)`. Nested unpaid in a paid bag: not in the invent array and `where!==OBJ_INVENT` → both `CONTAINED_SYM`. Top-level unpaid with `where` unset but still in the array: JS uses `invlet`, C would use `CONTAINED_SYM`. **C-wrong** (clone of `carried`, not a named omit).

**Menu path.** C always `create_nhwindow(NHW_MENU)` once past the one-item return; `totcost=0`; `num_so_far=0`; `if (!flags.invlet_constant) reassign()`. Then:

```3691:3711:nethack-c/upstream/src/invent.c
    do {
        classcount = 0;
        for (otmp = gi.invent; otmp; otmp = otmp->nobj) {
            ilet = otmp->invlet;
            if (otmp->unpaid) {
                if (!flags.sortpack || otmp->oclass == *invlet) {
                    if (flags.sortpack && !classcount) {
                        putstr(win, 0, let_to_name(*invlet, TRUE, FALSE));
                        classcount++;
                    }
                    totcost += cost = unpaid_cost(otmp, COST_NOCONTENTS);
                    iflags.suppress_price++;
                    putstr(win, 0, xprname(otmp, distant_name(otmp, doname),
                                           ilet, TRUE, cost, 0L));
                    iflags.suppress_price--;
                    num_so_far++;
                }
            }
        }
    } while (flags.sortpack && (*++invlet));
```

`invlet` starts at `flags.inv_order`. `!sortpack`: the `do` runs **once** (`while` is false); inner `!sortpack || oclass==*invlet` is always true — unsorted unpaid walk. `sortpack`: one pass per `inv_order` byte until `'\0'`. JS `sortpack_on()` treats missing `flags.sortpack` as On (`optlist` default). `inv_order_classes()` uses string `charCodeAt` / array / `DEF_INV_ORDER`. `for (oclass of classes)` + unpaid `oclass` filter is the C `do-while *++invlet` unrolled. Unsorted `else` is the single `do`. Class header `let_to_name(oclass, true, false)` matches `TRUE, FALSE`. `emit_unpaid` is the totcost / suppress / `xprname` / `num_so_far++` block. **Match that loop.**

**Contained unpaid (`count > num_so_far`).** C `let_to_name(CONTAINED_SYM)` if `sortpack`; then every invent `Has_contents` box: `marker=0`; `while (find_unpaid(cobj,&marker))` adds `unpaid_cost(marker, COST_NOCONTENTS)` to `totcost` and `contcost`; if `cknown`, putstr that object with `CONTAINED_SYM`; after the while, if `!cknown`, one `xprname(NULL, "%s contents", CONTAINED_SYM, TRUE, contcost, 0L)` via `s_suffix(xname(box))`. JS uses `found` (the return) not `marker.obj` — same pointer. `cknown` vs aggregate row: **Match.** Empty `cobj` unpaid: while never runs, `contcost` 0, `!cknown` still emits a 0-cost contents line in both.

**Total + floor extras.** C `count>0`: blank putstr then `xprname(NULL,"Total:",'*',FALSE,totcost,0L)`. JS `dounpaid_xpr(null,'*',false,totcost,'Total:')`. `xtracount>0`: `floorverb` is/are; `where` buried==0 / floor==0 / else three strings copied. `!count`: C `You("aren't carrying any unpaid items but there %s %d %s.", …)`; JS one `pline` with the same words. `count`: extra blank + `"(There %s %d more unpaid object%s %s.)"` with `plur(xtracount)`. JS `xtracount===1?'':'s'`. Then C `if (count>0) display_nhwindow(win,FALSE); destroy_nhwindow`. JS `show_nhw_menu_text(lines)` only when `count>0` (dynamic `pager.js`). `!count && xtracount`: C allocates a window it never shows; JS skips the menu. **Visible text matches.** `display_nhwindow(..., FALSE)` is not PICK_ONE; `show_nhw_menu_text` is the existing NHW_MENU putstr analogue (D-0929 overlay), not a new invent window type.

**`find_unpaid`.** C: unpaid + `*last_found` skip-until-match then clear, else `return (*last_found=list)` **before** `Has_contents`; then recurse `cobj`; then `nobj`. JS `find_unpaid_node` is that node. Array invent iterates elements instead of `nobj` (JS invent is an array). Marker `{obj}` is `struct obj **`. First call with `{obj:null}` returns the first unpaid and sets the marker. Next call skips until that pointer, clears, continues — that is how the contained `while` lists every nested unpaid. **Match the dance.** If `cobj` is an array (some JS containers), the Array branch of `find_unpaid` walks it; if `cobj` is an `nobj` chain, the `while cur.nobj` branch walks it. C is only `nobj`. Not a gameplay fork when mkobj uses `nobj` for contents.

**`unknwn_contnr_contents`.** C walks `where==OBJ_CONTAINED`, records outermost `!cknown` parent. JS same + `if (!parent) break` (C would NPE). `if (!obj) return null` (C would NPE). One-item path only calls this after `find_unpaid`; `count==1` implies a hit. Defensive; not a gameplay fork.

**`unpaid_cost(COST_NOCONTENTS)`.** Every C totcost line uses `COST_NOCONTENTS` (`hack.h:308` = 0). JS imports that constant. shk `unpaid_cost` still names `contained_cost` when `COST_CONTENTS && Has_contents`. Iu never passes `COST_CONTENTS`. **Match this caller.** Bill miss → 0 (C `impossible` named in shk).

**`xprname` cost.** C `:2928–2938`: `cost!=0 || let=='*'`; Iu `dot && use_invlet` then `let=obj->invlet`; suffix `"%c%6ld %.50s"` with `menu_tab_sep?'\t':' '` **and `%6ld` in both**; `!tab` `"%c - %-45.*s%s"` bump `txtlen` to 45. JS `costCol`; same Iu overwrite; pad name to 45; cap `256-1-(4+suffix)`. **Tab path:** JS `\t${costn} ${curr}` **drops `%6ld`**. **C-wrong.** Ordinary (no cost) path now applies `use_invlet` only in the else — that **fixes** review **616**’s “always overwrite” vs C (cost arm only when `dot && use_invlet`). JS parameter order stays `(obj, let, dot, quan, txt, cost)` vs C `(obj, txt, let, dot, cost, quan)`. `dounpaid_xpr` maps it. Existing 5-arg callers get `cost=0`. **`xprname` inlines zorkmid** and does **not** call `currency()` — C does. Hallu named; also means a later `ROLL_FROM` on `currency` would miss Iu/Ix.

**`currency`.** C Hallu `ROLL_FROM` else `"zorkmid"` then `makeplural` if `amount!=1`. JS always zorkmid + `makeplural`. Named. Shk local clone retired (C-home). Old shk used `'zorkmids'` without `makeplural`.

Callee closure (listing body). LIVE: `find_unpaid`, `unknwn_contnr_contents`, `unpaid_cost`, `xprname`, `distant_name`, `doname`, `s_suffix`, `xname`, `let_to_name`, `reassign`, `invlet_constant`, `pline`. CLONE: `show_nhw_menu_text` for NHW_MENU FALSE; `find_unpaid_node` / Array walk; **diverged** `includes` vs `carried`. OMIT named: `dotypeinv`, `'I'`, `doinvbill`, Hallu table, `contained_cost`. STUB: **none** inside `dounpaid` itself. Combined-arm ships **as a library**. The **Iu command** is still an Open row. Not “dispatch ported, callee stubbed” — the inverse: **callee live, dispatch omitted** (named, overclaimed in the subject).

## Hallucinations / overclaim

Subject / D-log “Iu lists unpaid invent”: **false as a command.** There is no JS `dotypeinv` and no `'I'` in `key_to_cmd`. `dounpaid` is an unused export. D-log “Caller `dotypeinv` named” is honest; the **git subject is not**. D-log “C-home `currency`”: **true** for shk; **false** that `xprname` uses it. Do **not** stamp “Match C `dotypeinv` / `Iu`.” Do **not** stamp “Match C `doinvbill` Ix.” Do **not** stamp “Match C Hallu `currency`.” Do **not** stamp “Match C `carried`.” Do **not** stamp “Match C `menu_tab_sep` `%6ld`.” Private canary does not make Iu public-hit.

## Density

+290: `dounpaid` ~130 + `find_unpaid` + `currency` + `unknwn` + `xprname` cost + shk re-point. §2b one Iu-listing family. Did not glue `dotypeinv`. Above a one-`if` peel.

## Verification

Wired in this SHA: listing helper, cost column, outermost `!cknown`, shk `currency` import. Unwired C: `dotypeinv` `:3953`; cmd `'I'`; `doinvbill`; Hallu table. Conf: no `rn2` in `dounpaid`. No seed gate. Journal: private canary + green+strict seed8000/0900 + cohort **7**/7. **Iu is public-unhit** (no caller). Fortress 44/44 does not exercise this function.

## Actionable C-wrongs

1. One-item letter: use `otmp.where === OBJ_INVENT` (`obj.h:332` `carried`), not `invent.includes(otmp)`. Do not port `dotypeinv` in the same iter unless that is the Open row.
2. `xprname` `menu_tab_sep` suffix must stay `"%c%6ld %.50s"` (`invent.c:2932`) — tab **plus** width-6 cost. Call `currency(cost)` from `xprname` (C `:2933`) instead of inlining zorkmid.

Named (map, not Must-fix): `dotypeinv` `'u'` / cmd `'I'`; `doinvbill`; Hallu `ROLL_FROM(currencies[])`; `contained_cost`; `tally_BUCX`. Do **not** add `find_unpaid` #2. Do **not** add `s_suffix` #8. Do **not** re-port `invlet_constant` (D-1655). Do not wrap `show_nhw_menu_text` as `create_nhwindow` and call that a second port.

Verdict: **ACCEPT-WITH-DEBT**
