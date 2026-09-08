# Review 1088 — 10ea68f1 — done_in_by killer-arise + arise pline + death summary + outentry escape

Metadata: SHA `10ea68f1`, D-2122, 5 js/ files (~99 insertions).
No prior review claims this SHA.

Intent vs deliverable: the subject promises four ports — the
`done_in_by` `:326–340` killer-arise chain, the `really_done`
`:1351–1361` arise pline, the `:1521–1541` death-location summary, and
the `outentry` escape arm — plus race mummy/zombie columns and a
`single_level_branch` export flip. The diff delivers all of it, in
`js/end.js` + `js/roles.js` + `js/u_init.js` + `js/teleport.js` +
`js/topten.js`. Nothing else rides along.

Inventory: two extended functions (`done_in_by`, `show_death_rip…`
summary), one extended block (arise pline in `really_done`), one
extended arm (`outentry` escape), 5 race-table rows extended, one
export flip (`single_level_branch`). Zero deleted symbols.

**C ↔ JS fidelity**:

- Killer-arise (`end.c:326–340`, read in full): wraith → mummy
  (+race gate) → `zombie_maker` (+race gate) → vampire (+human) →
  ghoul, then the genod reset — JS keeps the exact order and gates.
  `mptr` is `mtmp->data` at this point (mimicker reset at `:253`,
  confirmed) → JS `mdat = mtmp?.data` ✓. `mptr == &mons[PM_GHOUL]`
  → mndx equality; JS `(mdat.mndx ?? mtmp?.mnum) === PM_GHOUL` is the
  honest JS-shape equivalent (`data` objects don't always carry
  `mndx`) ✓. `Race_if(PM_HUMAN)` = `urace.mnum==PM_HUMAN` → JS
  `(game.urace?.mnum|0) === PM_HUMAN` ✓. Genod reset
  (`mvitals[arise].mvflags & G_GENOD` → NON_PM) ✓ via live `mvitals`.
  `zombie_maker` LIVE (`mon.js:663`, sync) ✓; `Race_if` via carried
  `game.urace` (whole-struct copy, `u_init.js` hunk) ✓.
- Race columns: C struct fields `mummynum`/`zombienum` (`you.h:267`).
  JS `pm('PM_<RACE>_MUMMY/ZOMBIE')` via the existing `pm()` helper;
  all names exist in `monsters_data.js` ✓. Values are the C table's
  race-corresponding forms (human→HUMAN_MUMMY etc.).
- Arise pline (`:1351–1361`): `ismnum && !done_stopprint` gate ✓
  (`ismnum` const.js:3198, newly imported); slime/non-slime verb
  split ✓; `an(pmname(arise, Ugender()))` with live `an` (objnam,
  pre-imported), `pmname`/`Ugender` (do_name, sync) ✓; placed after
  score/before bones ✓. `display_nhwindow(MSG,FALSE)` → existing
  `flush_topl_more` — the file's established flush, and both blocked
  sessions moved past the `--More--` frame, so behaviorally confirmed.
- Summary (`:1522–1541`): beyond-confines arm (dnum==0 && dlevel<=0,
  "passed away" iff dlevel<0) ✓; astral override ✓; suffix skipped
  `In_endgame || single_level_branch` ✓; quest → `dunlev`, else
  `depth` — and `dunlev` is literally `return lev->dlevel`
  (`dungeon.c:1324–1328`), so inlining as `dlevel` is exact, not a
  shortcut ✓.
- `outentry` escape (`topten.c:973–980`): `strncmp(" (",death+7,2)`
  → `death.slice(7,9)===' ('`, tail `death+9` → `slice(9)` ✓;
  paren fixup (`'\0'` on astral else `' '`) → slice/space splice via
  `game.astral_level.dnum` ✓, same `indexOf(')')` first-paren
  semantics as C's `strchr` ✓.

Required `sym.mjs` output (export flip; nothing deleted):

```text
single_level_branch js/teleport.js:2120   sync
```

(`Is_knox`-only body, unchanged.) All other import extensions
(`zombie_maker`, `pmname`, `Ugender`, `Is_astralevel`, `In_endgame`,
`In_quest`, `ismnum`, `LOW_PM`, PM_* locals) are live exports;
`--can`-style cycle risk is nil (const/data hoisted consts, same-SCC
function imports, call-time use).

Hallucinations / overclaim: none. The retired-omission list
(`outentry` paren, `In_endgame`/quest-depth, killer-arise) matches the
hunks; the still-deferred list (astral text, choked/poisoned/crushed/
petrified, G_UNIQ/ghost/mimicker/…) is named in map + header.

Density: ~99 insertions over 4 C loci + table columns — one death-
disclosure family, coherent per §2b.

Verification: D-log claims `verify really_done` → 2 PASS + 2 moved
past, green/strict/cohort, plus separate full 44/44. Re-measured:
`hidden-proxy.mjs verify really_done --base 10ea68f1~1` →
`2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(Barbarian-92208 + tour-Wizard-92103 PASS; death-Wizard-92120 →
next_ident@57; genesis-Knight-92068 → next_ident@96). Exact match,
non-vacuous. No FORCE/DIAG/seed/coordinate reads in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
