# Review 1716 — 41ea307c3 — status hilite chooser + field menu (D-2757)

- SHA: `41ea307c3` (`botl.c` status hilite up/down chooser and the field menu, D-2757)
- Files: `js/botl.js` (+365), `js/options.js` (+22)
- D-log: D-2757; queue rows: Open ×3 (choose_updownboth, remove, menu), 0 corpus blocks
- Banned grep on diff: 0 hits

## Intent vs deliverable

Subject promises the up/down chooser and the field menu. Diff delivers six
C bodies in C order — `status_hilite_menu_choose_updownboth`
(`:3810–3887`), `status_hilite_remove` (`:4305–4354`),
`status_hilite_menu_fld` (`:4356–4453`), `status_hilites_viewall`
(`:4455–4474`), `reset_status_hilites` (`:2320–2331`), `status_hilite_menu`
(`:4498–4578`) — plus the doset "status highlight rules" row wired to the
live menu. Promise kept; the extras are same-file rows + callee closure.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `status_hilite_menu_choose_updownboth` (export) | C, PICK_ONE | `botl.c:3810–3887` |
| `status_hilite_remove` (export) | C | `botl.c:4305–4354` |
| `status_hilite_menu_fld` (local — C staticfn ✓) | C, PICK_ANY | `botl.c:4356–4453` |
| `status_hilites_viewall` (local — C staticfn ✓) | C, NHW_TEXT | `botl.c:4455–4474` |
| `reset_status_hilites` (export) | C | `botl.c:2320–2331` |
| `status_hilite_menu` (export) | C, PICK_ONE loop | `botl.c:4498–4578` |
| `blstatFldName` / `hiliteMenuRows` | no-C helpers | table read / menu shape |

`sym.mjs`: all callees live (`wc2_supported`, `select_menu_pick_one/any`,
`show_text_pages`, gather/done, `ensureCondHilites` pre-existing local,
`countfield` same-file local). `status_hilite_str` is the pre-existing
module `let` store. No deleted symbols.

## C ↔ JS fidelity

Walked all six bodies against pinned C. Chooser: LT/LE/EQ/GE/GT row order,
all four BL_AC ternaries, `if (str)` pointer test (`""` counts),
`a_int = 10 + V`, cancel → NO_LTEQGT — exact. Remove: condition-bit loop
(CLR_MAX + 6 attr rows, no unlink) vs identity unlink + row-1 mirror +
hilite_rule/time clear — exact. Reset: hilite_delta gate, both rows,
`gu.update_all`, `disp.botlx` — exact, plus `flags.botlx` (the store this
port's `bot()` reads; cond_menu precedent, documented). Fld: early
`!count` takes the add-FALSE return (named omit), separator, X/−1
(unconditional only because count>0 is proven at that point — C's `if
(count)` gate is vacuous here), Z/−2 suppressed for score, mode-bit
delete loop `idx > 0 && remove`, `while(add)` arm documented-absent —
exact. Viewall: prefix + `BUFSZ − sizeof − 1` precision arithmetic
matches; NHW_TEXT-always-waits → `show_text_pages` is precedent folding.
Menu: gather/countall, View-all+blank, per-field `fld+1` / `%-18s` /
`(N defined)`, score skip (SCORE_ON_BOTL off, `config.h:627` verified),
destroy→countall→done order, fuzzer one-try, `hilite_delta = 3`,
return TRUE — exact. `blstatFldName(fld)` ≡ C's `initblstats[i].fldname`:
BL enum is dense from 0 and the 27-row JS table is in enum order
(MAXBLSTATS=27, no overrun). STATUS_HILITES is `#define`d
(`config.h:616`). doset row matches `options.c:8464–8471` incl. the
`wc2_supported` gate around the named `preference_update` omit. No RNG.

Callee closure per arm: every callee is LIVE except `status_hilite_menu_add`
(`:3889–4302`, named omit with all four sites + the FALSE-return behavior
stated) and `preference_update`/`optfn`/`count_status_hilites` (named).
No STUB in a live arm.

## Hallucinations / overclaim

None. The D-log states the FALSE-return behavior at each omitted-add site
rather than claiming a complete menu, and the "separate load" probe
(hitpoints + condition removals) is disclosed as extra-menu testing.

## Density

~387 insertions for six same-file bodies + one doset row: dense but one
family, callee-closed. Right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify status_hilite_menu_choose_updownboth
--base 41ea307c3~1 --reach-all` → 0 blocked, smoke 24/24 REACH-OK.
Matches the bullet (rows cited 0 blocks; vacuous note stated).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
