# Review 1516 — ef8921fe — spell.c deadbook (D-2557)

## Metadata

- SHA: `ef8921fe`
- D-id: D-2557. Next index: 1516.
- Files: `js/spell.js` (+190/−5: file-local
  `deadbook_pacify_undead` + `deadbook`, `learn`
  caller fix, import/canon-const additions),
  `js/apply.js` / `js/mon.js` / `js/eat.js`
  (one-word `export` each: `mkundead`, `mdistu`,
  `sgn`).
- C locus: `nethack-c/upstream/src/spell.c:229–339`
  (`deadbook`, 111 L; `csym.mjs` range) plus
  `deadbook_pacify_undead` `:210–226` (17 L) and
  the sole caller `learn` `:385–388`.

## Intent vs deliverable

Subject promises: the whole invocation /
raise-dead / pacify body in C order with the
`learn` caller wired. Diff delivers exactly that:
both C staticfns stay file-local (`mkinvpos`
precedent), `goto raise_dead` folded into one
shared closure called from both C goto sites, and
the old wrong `learn` tail (clearing
`spbook.book`/`o_id`, which C never does here)
replaced by `await deadbook(book); return 0`.
Promise matches deliverable. RNG (`rn2(3)`,
`d(2,6)`, omen `rn2(3)`) in C positions.

## Inventory

- New: `deadbook_pacify_undead(mtmp)`,
  `deadbook(book2)` (both file-local async),
  4 canon-const ids (candelabrum, bell, master
  lich, nalfeshnee — file idiom).
- Callees, all LIVE: `makemon`/`set_malign`,
  `tamedog`, `monflee`, `mkinvokearea`,
  `unturn_dead`, `iter_mons`,
  `is_undead`/`is_vampshifter`/`mons`,
  `observe_object`, `invocation_pos`/`On_stairs`,
  `d`, `Soundeffect`/`se_faint_chime`,
  `something`, `ACH_INVK`/`NO_MINVENT`/`SPINE`,
  `You`/`Your`/`pline_The`/`pline`/`You_hear`,
  `body_part`, `Blind()` (file-local `:402`,
  pre-existing — not a new import).
- Re-point audit (`sym.mjs`, required): the three
  one-word exports add no clone — `mkundead`
  `js/apply.js:3967` ASYNC single; `mdistu`
  `js/mon.js:157` + 6 pre-existing clones
  elsewhere; `sgn` `js/eat.js:2676` + 17
  pre-existing clones elsewhere. Those clones
  predate this SHA and live in other files;
  spell.js itself defines none (syntax PASS
  confirms no shadowing). No cleanup owed here.

## C ↔ JS fidelity

`deadbook_pacify_undead` vs C `:210–226`:
undead/vampshifter + `cansee` gate ✓;
`mpeaceful = TRUE` ✓; co-aligned + `mdistu < 4`
→ tame-grow (`< 20`) / `tamedog(mtmp, null,
true)` ✓, else `monflee(mtmp, 0, false, true)` ✓.

`deadbook` vs C `:231–339`, in order:
prologue (`You` pages / `makeknown` /
`observe_object` / `known = 1`) ✓; invocation
gate `invocation_pos && !On_stairs` ✓; cursed
book unreadable with `Blind()` ternary ✓; no
bell/menorah chill + chime (`Soundeffect` sync
as in C) + Vlad-doppelganger ✓; invent scan
(candelabrum `spe == 7 && lamplit`, bell
`moves - age < 5`, cursed flags) ✓;
cursed-relic fail / full-prime success
(`mkinvokearea`, `invoked`, `ACH_INVK`,
`udemigod = 1` with the `wizdeadorgone()`
comment-port, `udg_cnt` min-gate) /
botched `something`-amiss → `raise_dead` ✓
`return` (never falls into the
non-invocation chain) ✓; cursed → `raise_dead`
(master-lich-then-nalfeshnee `!rn2(3)` short
circuit, `mpeaceful = 0` + `set_malign`,
`unturn_dead(game.youmonst)`,
`mkundead({x, y}, true, NO_MINVENT)`) ✓;
blessed → `iter_mons(pacify)` ✓; else omen
`rn2(3)` three arms ✓.

## Hallucinations / overclaim

None. "No new live-arm stubs" holds — the two
`Named: none new` notes (`display_nhwindow`
riding on `pline`, `wizdeadorgone()` as comment)
are accurate: C has no flush call here and the
function is comment-only.

## Density

One 111-line C function + 17-line helper +
caller fix, four files, ~195 insertions.
Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn deadbook` → PASS,
  honestly framed as Book-of-the-Dead path /
  0-blocked.
- Re-run here: `hidden-proxy.mjs verify deadbook
  --base ef8921fe~1 --reach-all` → 0 blocked
  both trees (vacuous, honestly reported) +
  smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits for FORCE/DIAG/
  getRngLog/fastforward.

## Actionable C-wrongs

None. Branch order, RNG positions, caller
semantics, and the import-only (no-clone)
wiring all check out against pinned C.

Verdict: **ACCEPT**
