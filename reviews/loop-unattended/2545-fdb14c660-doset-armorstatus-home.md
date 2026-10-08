# Review 2545 — fdb14c660 — doset armorstatus home

Metadata: SHA `fdb14c660e073a686713b029e1e03525cea13be9`, D-3669,
cliff-head `botl.c` do_statusline2 (region heuristic, painter
faithful) via writer doset data home. js diff +2/−2 in `js/options.js`
(two addr rows); + focused test `scripts/armorstatus-paint.test.mjs`.

## Intent vs deliverable

Promise: Rogue-94391 @44 showed a blank armor field where C paints
`Suit`: both JS writer rows homed `armorstatus` on `iflags` (zero
readers) while all readers read `flags`. Re-home both rows to
`flags` — the D-3629 weaponstatus twin. Diff does exactly that;
nothing bundled.

## Inventory

- `DOSET_BOOL_ADDR.armorstatus` (`js/options.js:10478`) and
  `allopt` row (`:12077`): `{ obj: 'iflags' }` → `{ obj: 'flags' }`.
- C: `include/optlist.h:167–168`, `include/flag.h:20`,
  `src/botl.c:1256–1259`, `src/options.c:5336/:5349–5351`.
- No helpers/imports; no symbols deleted or re-pointed.

## C ↔ JS fidelity

- C home (all direct reads): `NHOPTB(armorstatus, …,
  &flags.armorstatus, …)` (`optlist.h:167–168` ✓),
  `boolean armorstatus` in `struct flag` (`flag.h:20` ✓), and no
  `iflags.armorstatus` anywhere upstream ✓. The old `iflags` home
  was a pure fabrication.
- C reader: `if (flags.armorstatus) armor_status(…)` else blank
  (`botl.c:1256–1259` ✓) — explains the blank field exactly.
- JS reader/writer census (grep): 5 readers, all on `flags`
  (`botl.js:1117/:1828/:3520`, `do_wear.js:704`, `do.js:552`) ✓;
  both writer rows now `flags` ✓; zero `iflags.armorstatus`
  sites remain ✓. The D-3629 twin precedent is real (same shape).
- Reassess/botl after-change paths untouched and already live —
  envelope unchanged, D-3457 omit stands, correctly Named as such.

## Hallucinations / overclaim

None — including the `js-throw` label at step 110, which the D-log
discloses as harness display shorthand. This review re-ran `show`
on the SHA's code: `kind=screen, owner=null, error=null`, RNG
4796/4796, scrM 191/193 — ownerless row, no exception, the same
verify artifact review 2538 documented. Disclosure accurate.

## Density

Cliff-phase §2b: one cliff, writer (not the painter) fixed at the
exact C home, Ledger `doset partial` kept. Two lines is the whole
function of this fix — density is in the moved session (44→110,
+102 screens). Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Re-measure on the SHA's own code (scratch worktree):
  `verify do_statusline2 --base fdb14c660~1 --reach-all` →
  `0 PASS, 1 moved past (44→110), 0 worse → PROGRESS` + smoke
  24/24 REACH-OK. Claim reproduced exactly; no REGRESSED.
- Focused test on SHA code: 1/1 green.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
