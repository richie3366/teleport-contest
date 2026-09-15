# Review 1276 — 9f676bea — trap.c clear_conjoined_pits + deltrap wire; fountain delfloortrap dedup (D-2310)

Metadata: SHA `9f676bea`, D-2310, C-fidelity residuals (debt row cited 0 blocks). Method: `git show` full `js/trap.js` + `js/fountain.js` hunks; C `trap.c:6579–6601` (`clear_conjoined_pits`) + `:6530–6549` (`deltrap`) via `csym.mjs`; canonical `delfloortrap` (`js/trap.js:1372`) + `gush` guard (`js/fountain.js:677`) read; `sym.mjs delfloortrap`; `hidden-proxy verify conjoined_pits --base 9f676bea~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises: port `clear_conjoined_pits` file-local in C order, call it first from `deltrap` per C `:6535`, and delete the narrowed `fountain.js` `delfloortrap` clone in favor of the canonical export with identical reachable domain.
Diff actually changes (+24 trap.js, −19/+1 fountain.js): exactly that. Promise kept.

## Inventory

- `clear_conjoined_pits` (js/trap.js, module-private; C is `staticfn` — correctly unexported).
- `deltrap` one-line wire (js/trap.js) — `clear_conjoined_pits(trap)` first.
- `fountain.js` clone deletion + `delfloortrap` import join (no new module edge — `trap.js` already imported).

## C ↔ JS fidelity

`clear_conjoined_pits` walked against C `:6579–6601` (csym range `:6579–6601`): `trap && is_pit` gate, `N_DIRS` loop, per-bit `xdir`/`ydir` neighbour lookup, `isok` + `t_at` + `is_pit` triple gate, neighbour `DIR_180` bit clear, own-bit clear OUTSIDE the isok-if but INSIDE the bit-if. JS reproduces all of it, including the easy-to-misplace own-bit clear (JS clears `trap.conjoined` after the isok block, still inside the bit check — exactly C's nesting). `| 0` idiom is exact for bit ops. No RNG in the arm.

`deltrap` placement matches C `:6535` (`clear_conjoined_pits` first, before list removal). Sokoban `maybe_finish_sokoban` + `dealloc_trap` tail named (C `:6536–6545`; pre-existing deferrals, unchanged).

Clone-retire verified beyond the message: the deleted clone narrowed the hero case to `if (!u_at(...))` (silently skipping `reset_utrap`); the canonical export has the `u_at → reset_utrap(!TT_BURIEDBALL)` / else `mtrapped = 0` split. Reachable-domain claim holds — `gush` returns early on `u_at(x, y)` (`js/fountain.js:677`, first disjunct of the five-way guard) and calls `delfloortrap` only for the trap at that same `(x, y)` (`:685`), so the hero arm is unreachable at this call site. `sym.mjs delfloortrap`: single canonical export, sync — no remaining clone. Required sym output pasted: `delfloortrap  js/trap.js:1372  sync`.

`deltrap` remainder checked against C `:6536–6545`:

- List unlink: JS `indexOf`/`splice` replaces C's `ftrap` linked-list walk — pre-existing shape, behavior-equivalent for membership.
- Panic arm (`panic("deltrap: no preceding trap!")`) unported — untestable defensive C, correctly omitted.
- Sokoban `maybe_finish_sokoban` + `dealloc_trap` tail stays named with exact C lines, and the map (`data.md`) carries the deferral — not a silent drop.
- Probe boundaries (D-log 6/6: conjoined TRUE pre-delete, unlink, neighbour-bit cleared, non-pit keeps bits, null guards) cover the two nestings C makes easy to botch: own-bit cleared even when the neighbour lookup fails, and non-pit traps untouched. Both confirmed in the JS nesting by direct read, independent of the deleted probe.

## Hallucinations / overclaim

None. The "stale conjoined bits → later `conjoined_pits` TRUE" mechanism is the actual C consequence of the missing call, and the probe (6/6, incl. non-pit-delete-keeps-bits and null guards) discriminates the fix.

## Density

Forty-three net lines for one staticfn port + wire + clone retire in one trap envelope. OK.

## Verification

D-log: hand probe 6/6 PASS (deleted after run), `verify --fn conjoined_pits` full PASS with the hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7. Re-measured by this review:

```text
verify conjoined_pits: baseline 9f676bea~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
