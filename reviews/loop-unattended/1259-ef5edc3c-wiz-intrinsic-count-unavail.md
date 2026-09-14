# Review 1259 — ef5edc3c — wiz_intrinsic count-prefix + unavailcmd

Metadata: SHA `ef5edc3c`, D-2293, queue row `wizcmds.c` wish
count-prefix + unavailcmd + make_blinded talk. js/: 2 files
(options.js menu counting; wizcmds.js arms).

Intent vs deliverable: subject promises menu count-prefix plumbing,
the wiz_intrinsic count arm, the `Unavailable command` arm, and doc
retires (talk variants already live). Diff delivers all four, nothing
else.

Inventory: changed `select_menu_pick_any` + `invert_pick_any_matching`;
changed `wiz_intrinsic` (2 arms); `toggle_menu_curr`/`menu_digit_is_gacc`
join the existing invent.js import; `process_menu_search` gains
pass-through `(counting, count)`.

## C ↔ JS fidelity

C loci: `wizcmds.c:1004–1008` (count), `:1020–1021` (make_blinded),
`:1094` (unavailcmd), `cmd.c:1965` (ecname `wizintrinsic`),
`win/tty/wintty.c` menu machine (read directly — `csym` doesn't index
`win/`, so line ranges cited from the file).

- wiz_intrinsic: `count == -1 → DEFAULT_TIMEOUT_INCR` else cast ✓;
  `amt <= 0` paranoia-skip ✓; `make_blinded(newtimeout, TRUE)` ✓;
  non-wizard `Unavailable command 'wizintrinsic'.` + ECMD_OK ✓
  (ecname confirmed at `cmd.c:1965`; hardcode matches the
  wizwhere/wizidentify house arms). ✓
- Menu machine, arm by arm: items start `count: -1` (`:2611`) ✓;
  `counting/count/resetCount` with the one-key reset at loop top
  (`:1395–1399`) ✓; digit arm — gacc-guard, accumulate, overflow-drop,
  leading-zero ignore (`:1564–1602`; overflow `continue` with state
  already clear ≡ C's reset-still-queued, traced both sides) ✓;
  ESC-during-count only stops the count, ESC-without clears all counts
  + cancels (`:1604–1615`) ✓; selector hits via `toggle_menu_curr`
  (`:1112–1151` — the pre-existing invent.js export re-verified
  branch-for-branch here, including the counting&&count==0 no-op) ✓;
  search forwards `(counting, count)` into the same toggle ✓; `#` mark
  for counted selections (`set_item_state :1182`) ✓; UNSELECT arms
  clear counts (`unset_all_on_page` body re-read: `count = -1L`) ✓;
  group-accel stamps `(counting && count > 0) ? count : -1` vs C
  `counting ? count : -1L` — provably identical (counting ⇒ count > 0
  is an invariant: only a nonzero digit sets counting, overflow clears
  both) ✓; bulk/zero-acc invert matches `invert_all_on_page`
  (deselect-clears / select-stamps-iff-positive), and JS iterates the
  full list where C does page + rest — same outcome ✓.
- Two unobservable nits (not C-wrongs): the ESC-cancel arm doesn't
  clear `count` alongside `selected` (C does) — the cancelled pick list
  is discarded both sides; the `it.count === undefined` guard in
  wiz_intrinsic is dead (the menu always stamps) but harmless.
- Callee closure: `toggle_menu_curr`/`menu_digit_is_gacc`/`process_menu_search`
  all live invent.js exports (`sym.mjs`), no clones added or removed —
  no `--can` owed. No RNG in any arm.

Hallucinations / overclaim: none. Deleted-probe 18/18 + unavail-probe
claims are behaviorally re-derived above.

Density: shared-menu change is the widest of the six SHAs, but it is
one C locus family (the wintty counting machine) + its single consumer
— §2b acceptable, and the D-log forced full-44 for the blast radius.

Verification: D-log `verify --fn wiz_intrinsic` PASS (syntax/rule2/
green/strict/cohort/full 44/44). Re-measured: `hidden-proxy verify
wiz_intrinsic --base ef5edc3c~1` → 0 blocked baseline and working —
vacuous claim confirmed. Diff grep: no banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
