# Review 1316 — b214fb72 — pickup floor-pickup body (D-2350)

Metadata: SHA `b214fb72`, D-2350, `js/pickup.js` only (+171/−64).
Method: full `js/` hunk read; C `pickup` (`pickup.c:671-910`,
gate/FOLLOW/count arms read), `n_or_more` (`:459-465`),
`all_but_uchain` (`:508-512`), `query_objlist` count phase +
suppress arms + shortcut + sort/build (full section read) via
`csym.mjs`; `sym.mjs` on `is_pool`/`is_lava` (pasted below);
`sortloot` Array-branch read (`invent.js:2012-2035`); `autopick`
nobj-walk read; added-line banned grep (0 hits); `imports.mjs
--rulecheck` (clean, this iter); `hidden-proxy verify pickup
--base b214fb72~1` re-run; D-log citation spot-checks. No symbol
deleted or re-pointed (two file-locals added, one signature
widened) → no clone→import `sym.mjs` owed beyond the
predicate pair.

## Intent vs deliverable

Subject promises four residuals: (a) autopickup pool/lava gate
via the dbridge predicates, (b) count-N `pickup(-N)` PICK_ONE
`"Pick N of what?"` with `n_or_more` + force-to-N, (c) uswallow
arm over the engulfer minvent via nobj, (d) PICK_ANY
`all_but_uchain` + AUTOSELECT_SINGLE order. Diff delivers all
four in one file, no new modules/edges (`PICK_ANY` joins the
live const import; `is_pool`/`is_lava` were already imported).
Promise kept — except the new PICK_ONE arm inherits two
PICK_ANY-only behaviors (Actionable 1).

## Inventory

- File-local `n_or_more` (`:458-465`) + `all_but_uchain`
  (`:508-512`); both C `staticfn` ⇒ file-local is the right
  idiom (D-2345 precedent). Module `val_for_n_or_more` with
  set/reset in try/finally ≡ C `gv.val_for_n_or_more` setup.
- `query_objlist_pickup` gains `{how,prompt,autoselect}`:
  count-allowed phase, `n==0` early-out, single+autoselect
  shortcut, `sortloot` over the pile Array, PICK_ONE
  letter-returns-at-once.
- `pickup()`: predicate gate, FOLLOW chain select, autopick
  `followNobj`, count-N PICK_ONE arm, PICK_ANY arm (old `ct==1`
  lone arm + per-object `min(quan,count)` correctly deleted —
  C has no menu-branch lone shortcut).
- `pickup_traditional_floor` gains `followNobj` (unreachable
  plumbing: swallowed manual routes to loot_mon via dopickup,
  swallowed autopickup takes the autopick arm — harmless).
- Named: `:1060–1062` worn-engulfer suppress (cited with the
  airtight unreachability argument), venom/objsym/invert,
  `count_unpaid`, `u.Underwater` mirror — all pre-existing.

## C ↔ JS fidelity

Gate ≡ C verbatim (`nopick || !OBJ_AT || (is_pool &&
!Underwater) || is_lava`, predicates not the macro range) ✓.
FOLLOW select ≡ C (`:741-747`: floor+BY_NEXTHERE vs
ustuck-minvent+nobj) ✓; `autopick` walks `o.nobj` under the
flag ≡ C traverse 0 ✓. Staticfns exact: `n_or_more`
(`uchain` reject + `quan >= val`; the `(quan||1)` only fires
on impossible quan-0) and `all_but_uchain` ✓. Count arm ≡ C
`:761-772` (prompt, `val=N`, PICK_ONE + `n_or_more`,
force-to-N via `pickup_object(one[0], count)`; `one.length ≤
1` by construction so first-only ≡ C's loop) ✓. PICK_ANY arm
≡ `:774-776` + shortcut `count=quan≡take-all` ✓.
`reset_justpicked`/`n_tried` on `length>0` ≡ C `n>0` in all
three arms ✓. Count-before-menu, `n==0` no-menu (floor never
SIGNAL_NOMENU), single+autoselect unseen *before* the
petrify walk — all in C order ✓. `sortloot(Array)` is safe
(native `Array.isArray` branch; `by_nexthere` rightly ignored
on a resolved chain) ✓.

```text
is_pool          js/hack.js:1411   sync
is_lava          js/hack.js:1428   sync
```

**Gap:** the menu-build FEEL_COCKATRICE abort and the
`SORTLOOT_PETRIFY` augment are ungated, but C sets both only
on the PICK_ANY arm (`traverse_how | FEEL_COCKATRICE`,
`:774-776`; the count arm at `:761-772` omits it, and the
build check is explicitly `qflags & FEEL_COCKATRICE`). JS
`sortflags` always sets PETRIFY (`pickup.js` sortflags line)
and the walk always will_feel-aborts to `look_here`. Both
sides agree wherever the code ran before (PICK_ANY manual,
D-1599); the NEW count-N arm diverges: C shows `"Pick N of
what?"` while JS look_here-aborts whenever a feelable
cockatrice corpse is ranked (allowed with quan≥N, or
augment-included with quan<N) alongside 2+ qualifying piles.
Pre-existing lines, newly load-bearing via this arm — charged
here (review-1307 pattern). Fix: gate both on `how ===
PICK_ANY`. Falsifier: count-N pickup over such a pile, C menu
vs JS abort. Nit (not queued): the second `if (key === 27)`
inside the PICK_ONE block is dead — ESC already returns three
lines above.

## Hallucinations / overclaim

None material. "AUTOSELECT_SINGLE still applies (`:761` sets
it)" verified in the C menu-branch head. "Petrify check stays
menu-build-only like C" holds for order but overstates the
gating — the count arm should skip it (Actionable 1).
"Reached by 374 corpus traces, not blocks" is presence
honestly labeled, not ownership ✓.

## Density

One file, one C function family + its two staticfns. The
`ct==1` deletion and traditional threading belong to the same
envelope. Right-sized; +171/−64 of C-faithful JS.

## Verification

D-log: `verify.mjs --fn pickup` PASS (syntax/rule2/vacuous
hidden disclosed/green/strict/cohort) + `--full` 44/44.
Re-measured:

```text
verify pickup: baseline b214fb72~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches; vacuous honestly labeled, presence-not-blocks
disclosed so no `--base` owed beyond the parent re-run above.
Added-line banned grep 0 hits (137 `+` lines, zero RNG/seed/
coord reads); `--rulecheck` clean. The count-N/swallowed arms
have no corpus or public coverage (stated, not hidden) —
full-suite green is the backstop.

## Actionable C-wrongs

1. New PICK_ONE count arm runs the PICK_ANY-only
   FEEL_COCKATRICE abort + SORTLOOT_PETRIFY augment (C gates
   both on `qflags & FEEL_COCKATRICE`, set only at
   `pickup.c:774-776`). Fix: gate `sortflags |=
   SORTLOOT_PETRIFY` and the will_feel abort on `how ===
   PICK_ANY`. One port iter; falsifier above.

Verdict: **QUALITY-RISK**
