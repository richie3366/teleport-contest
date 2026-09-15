# Review 1326 — 2c1456a0 — bhitpile head: hidingunder + statue pre-activate (D-2360)

Metadata: SHA `2c1456a0`, `js/zap.js` only (+48/−5). No new modules;
`STATUE_TRAP` joins the existing `const.js` edge, `activate_statue_trap`
the existing `trap.js` edge, `maybe_unhide_at` the existing `monmove.js`
edge. D-log: D-2360, debt-named row, 0 sessions blocked on
`break_statue`/`bhitpile`.

## Intent vs deliverable

Subject promises three latent C-wrongs in otherwise-live `bhitpile`
(C `zap.c:2428–2500`): striking/force-bolt STATUE_TRAP pre-amble with
unconditional `learnwand`; `hidingunder`/`first` init + in-walk up/down
skips from the previously-unused `zz` (renamed `_zz` → `zz`);
`maybe_unhide_at` tail. Diff adds exactly that; `break_statue`,
`activate_statue_trap` (D-0997), and the three C call sites re-verified
unchanged. Matches the promise.

## Inventory

- `bhitpile` head + walk + tail (rework, one function). No new helpers,
  no clones, no stubs. Tails (`create_polymon`, `recreate_pile`,
  `fill_pit`) stay named omits with own rows — disclosed.

## C ↔ JS fidelity

Vs C `:2436–2500` (body re-read above): `hidingunder = zz!=0 &&
uundetected && hides_under(youmonst.data)` ✓ (bitwise `|0` idiom both
sides); `first = TRUE` ✓; STRIKING/FORCE_BOLT arm captures `topofpile`,
awaits `activate_statue_trap(t, tx, ty, TRUE)`, `learnwand(obj)` only on
success, `first = FALSE` when the pile head pointer changed ✓ with the C
rationale comment carried over. Walk: manual `otmp = next_obj` +
`continue` in both skip arms and the where-mismatch arm is exactly C's
`for (...; otmp = next_obj)` increment under `continue` — verified in
the current file (`js/zap.js:5473–5491`), including the `!first && zz<0`
skip-rest shape. Tail `if (hidingunder) maybe_unhide_at(tx,ty)` ✓.
Branch-by-branch confirm.

Deaf/learnwand consequence (a) claimed in the D-log follows from C
`:2277–2278` gating vs the pre-amble's unconditional `learnwand` —
consistent with the ported structure; the discriminating probe (patched
tree 4/4, stashed tree fails exactly the learnwand check) is quoted.
Consequences (b)/(c) follow from the `first`/skip mechanics ported
above. Plausible and C-cited; not independently re-run here.

Callee closure: `activate_statue_trap` (`js/trap.js:486` ASYNC,
awaited), `maybe_unhide_at` (`js/monmove.js:1277` ASYNC, awaited),
`learnwand` (`js/zap.js:2451` sync, file-local) — all LIVE, no stub in
a live arm. `sym.mjs` outputs pasted per Method. Confirm.

Nit (not a C-wrong): JS `wand?.otyp` is null-safe where C derefs `obj`
unconditionally; no behavior delta on any C-reachable path (callers
always pass a wand/fake spellbook).

## Hallucinations / overclaim

None. D-log marks the verify vacuous explicitly and discloses that no
public/corpus session reaches the arm.

## Density

~48 insertions, one function head — right-sized per §2b (small but the
C locus is that small; pre-amble + skips + tail are one envelope).

## Verification

- Added-line grep: only benign identifier matches (`SPE_FORCE_BOLT`
  contains "FORCE" as a substring — a C enum name, not a FORCE shim;
  no DIAG/seed/RNG-log/coordinate gates).
- Re-measured: `verify bhitpile --base 2c1456a0~1` → `0 session(s)
  blocked (0 at baseline, 0 working)` — vacuous as disclosed; row cited
  0 blocks. Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn bhitpile` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
