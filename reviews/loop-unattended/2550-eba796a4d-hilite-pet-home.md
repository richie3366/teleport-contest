# Review 2550 — eba796a4d — hilite_pet data home (D-3675)

- SHA: `eba796a4d1108b4d9fce5366358187ea183d5e6b`
- Subject: options.c optfn_boolean do_set home: full-doset hilite_pet wrote a phantom short key the paint reader never saw (Archeologist-94231 24→33, Valkyrie-94151 44→118) (D-3675)
- D-entry: D-3675. Type: cliff (writer port, 1 table row + 2 read sites).
- Diff size: `js/options.js` 3 lines; + focused test; ledger D-tag.

## Intent vs deliverable

Promise: re-home the full-doset `hilite_pet` row from phantom
`iflags.hilite_pet` to `iflags.wc_hilite_pet` (C `optlist.h:366` /
`flag.h:508`) and point both `opt_hilite_pet` do_set reads at the wc
key; 2 sessions move strictly later.

Diff actually does: exactly those 3 lines. Nothing else in `js/`.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `DOSET_BOOL_ADDR.hilite_pet` (`js/options.js:10507`) | key → `wc_hilite_pet` | `optlist.h:366` |
| `optfn_boolean` opt_hilite_pet arm (`:10781`) | read → wc key | `options.c:5307–5308` |
| `optfn_boolean_do_set` opt_hilite_pet arm (`:10924`) | read → wc key | `options.c:5307–5308` |

No symbols deleted or re-pointed. No helpers.

## C ↔ JS fidelity

All three cites verified against pinned C:

- `optlist.h:365–366`: `NHOPTB(hilite_pet, …,
  &iflags.wc_hilite_pet, …)` — the full-doset row writes through
  the wc address. The old JS key (`iflags.hilite_pet`) was a
  phantom: C has no such field.
- `flag.h:508`: `#define hilite_pet wc_hilite_pet` — C
  `iflags.hilite_pet` reads ARE the wc key. Home unification is
  not a choice; it is what C compiles.
- `options.c:5299–5310`: `case opt_hilite_pet:` with the
  `WINDOWPORT(tty)||WINDOWPORT(curses)` gate,
  `if (iflags.hilite_pet && !iflags.wc2_petattr)
  iflags.wc2_petattr = ATR_INVERSE;` (`:5307–5308`), and
  `go.opt_need_redraw = TRUE` (`:5310`). Both JS arms mirror this
  exactly, including the `windowport_tty()||windowport_curses()`
  gate and `mark_opt_need_redraw()`.

Home audit (phantom fully evicted):

- Writers: DOSET row (`:10507`), allopt twin (`:9780` via
  `opt.addr.key` = wc, `:12200`), menustring paths (`:7856` C
  `:3171`, `:7892` C `:6159`) — all wc key.
- Readers: paint `hilite_pet_opt()` (`js/display.js:409`, wc
  first), both do_set arms — all wc key.
- Residue: only the `?? game.iflags?.hilite_pet` fallback
  (disclosed dead, Named 2 — wc key is initval-defined so `??`
  never falls through), option-name strings, and the
  `wc_options[]` capability name (`:1193`, not a flags key).
- Named (3) (`:7264` `wc2_petattr = ATR_INVERSE` init making the
  default arms outcome-dead): init line confirmed; the home fix
  makes the corner C-order-correct. Disclosed, no session reaches
  it.

## Hallucinations / overclaim

None. No dispatch-vs-callee gap. No FORCE/DIAG/seed reads. Rule
#2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: D-3669 data-home class, one writer (the DOSET row),
whole (row + both do_set reads), code + ledger + verify in one
handoff. Right-sized. Sampled verdicts: all 3 sites — faithful.

## Verification

D-log claim: `score --ids` on the 20-session scen-options family:
Archeologist-94231 24→33 (`doterrain`), Valkyrie-94151 44→118
(`handler_paranoid_confirmation`); 0 regressed, 0 new-pass;
vacuous `--fn` (D-3672 precedent); REACH-OK; full 44/44.

Audit re-measure
(`verify optfn_boolean --base eba796a4d~1 --reach-all`):
0 blocked (vacuous, as D-logged) + smoke 24/24 → REACH-OK.
Committed board diff at this SHA independently confirms movement:
exactly 2 step changes (24→33 owner null→`doterrain`, 44→118
owner null→`handler_paranoid_confirmation`), both strictly later,
and zero `passed` flips in either direction. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
