# Review 2497 — 9b030ea6b — Inhell hellish flag (D-3616)

SHA: `9b030ea6b` — cliffs-head summonmu writer minion.js `Inhell()`. D-3616.

## Intent vs deliverable

Promise (subject + D-3616): `Inhell()` compared `uz.dnum === GEHENNOM` (5),
which is false inside Gehennom (dnum 1) and true on Ludios; fix reads the
dungeon hellish flag, moving scen-tour-Wizard-91112 to PASS.

Diff actually adds: `js/minion.js` (+3/−3) — `Inhell()` now
`!!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)`, `GEHENNOM`
dropped from the const.js import; plus
`scripts/minion-inhell-hellish-flag.test.mjs` (3 cases). No other `js/`.

## Inventory

- `Inhell` (`js/minion.js:85`, changed) — C `dungeon.c:1941–1945` `In_hell`
  via macro `dungeon.h:140` (`#define Inhell In_hell(&u.uz)`). Status: fixed.

## C ↔ JS fidelity

C (dungeon.c:1941–1945): `return svd.dungeons[lev->dnum].flags.hellish;`
JS: `!!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)` — same table,
same field, same index. The flag is populated from `dat/dungeon.lua` through
`get_dgn_flags` (`js/dungeon.js:484`) into `game.dungeons[dngidx].flags`
(`js/dungeon.js:1008–1043`), and Gehennom's lua entry carries
`flags = { "mazelike", "hellish" }` (`dungeon.lua:93`).

The "dnum 1" claim checks out: lua top-level dungeon order is DoD (0),
Gehennom (1) — the Mines/Sokoban/Quest/Ludios/Gehennom list at `:16–46` is
DoD's *branches* table, not dungeon indices. So `GEHENNOM=5`
(`js/const.js:658`) was wrong on both ends, exactly as the D-log says.

Consumer arm (mhitu.c:965–972): `if (!rn2(Inhell ? 10 : 16)) msummon(mtmp);`
inside `is_demon(mdat)` minus balrog/amorous-demon. Single-expression
predicate, no branches to misorder, no RNG of its own — C-wrong eliminated,
no new divergence possible in this hunk.

Helper class: C callee (macro imported as a live export). `sym.mjs Inhell`
shows the export at `js/minion.js:85` plus a second export at
`js/teleport.js:2209` (pre-existing, untouched) and 2 local clones
(`js/fountain.js:972`, `js/pray.js:228`); the D-log's Named omissions carry
fountain + makemon `:1203` pick_nasty inline, consistent with the carried
D-2118 deferral. No clone created or re-pointed by this diff.

Grep: no FORCE/DIAG/seed/coordinate/fastforward in the hunk.
`imports.mjs --rulecheck` over all of scored `js/`: clean.

## Hallucinations / overclaim

None. The temp throw-probe measurement (uz dnum 1, `dungeons[1]` Gehennom
hellish=true, `Inhell()` false) is cited as reverted before verify, and the
lua order independently confirms it. The D-log does not claim the summonmu
body itself was touched (it cites D-1844 history for the were arm).

## Density

Cliff commit, one function family (the predicate + its five cited call
sites, all fixed by the one helper). Ledger: `In_hell` stays `ported`, D-3616
appended — correct; the row's `js` pointer still names only
`js/do.js:In_hell` while the fixed export is `js/minion.js:85`, minor cite
drift, not a C-wrong (no queue row: ledger text is never a row).
Own cliff head (`mhitu.c` summonmu) per its HEAD queue; writer correctly
chosen over the symptom owner.

## Verification

Re-measured: `hidden-proxy.mjs verify summonmu --base 9b030ea6b~1 --reach-all`
→ `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-tour-Wizard-91112: PASS); `reach summonmu: 24/24 → REACH-OK`. Matches
the D-log Verify bullet exactly. Unit test: 3 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
