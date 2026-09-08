# Review 1042 — 37cebe60 — muse use_misc MUSE_POT_GAIN_LEVEL (D-2072)

## Metadata

- SHA: `37cebe60` — `muse.c use_misc MUSE_POT_GAIN_LEVEL omitted trycall + grow_up stub never grew: pit-fiend uneasy never prompted Call, Grey-elf never became an elf-lady (queue owner use_misc) (D-2072).`
- JS diff: `js/muse.js` +11/−19 (three `pline`→`pline_mon` swaps, two added `trycall`s, `grow_up_potion` stub deleted for the live `grow_up` import).
- Docs: D-2072 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1042.

## Intent vs deliverable

Subject promises: (1) the gain-level arms use `pline_mon` + `trycall`
per C, so the step-78 `Call` prompt fires; (2) the uncursed arm calls
the live `grow_up` instead of the HP-only stub, so the Grey-elf
changes form. Diff actually adds both, plus the `mquaffmsg` vismon
`pline_mon` fix. Promise == diff.

## Inventory

- Changed: `mquaffmsg` vismon arm; `use_misc` rise / skipmsg /
  uncursed arms.
- Deleted: file-local `grow_up_potion` stub (`sym.mjs` now reports
  `NOT FOUND in js/**` — fully gone, sole caller was this arm; no
  re-point owed).
- Import: `grow_up` joins the existing `./mhitm.js` import statement
  (`mondead, mondied, monkilled` already imported there) — same
  statement, runtime call, no new module edge, no TDZ (`--can` not
  needed). `trycall` (`js/do_name.js:1624` async, awaited) /
  `ceiling` (`js/trap.js:3206` sync) / `pline_mon` were already
  imported.
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `mquaffmsg` (`muse.c:292–302`, via `csym.mjs`): vismon arm is
`pline_mon(mtmp, "%s drinks %s!", ...)` — JS now matches (was
`pline`).

C `MUSE_POT_GAIN_LEVEL` (`muse.c:2399–2440`, read directly):
rise arm (`:2412–2417`) is `pline_mon(rises up, through the
%s!)+ceiling+trycall` inside `if (vismon)`, then `m_useup` +
`migrate_to_level` + `return 2` — JS mirrors order exactly.
`skipmsg` (`:2423–2429`): `pline_mon(looks uneasy.)+trycall` in
vismon, `m_useup`, `return 2` — JS verbatim. Uncursed (`:2432–2440`):
vismon `pline_mon(seems more experienced.)`, `oseen→makeknown`,
`m_useup`, `if (!grow_up(mtmp, 0)) return 1; return 2` — JS is
`if (!(await grow_up(mtmp, null))) return 1; return 2;`, correct
async accommodation of the live D-1246 port. Callee closure: all
LIVE. Branch-by-branch confirm.

Named omits are precise: `Can_rise_up` special-stair arms (local
clone keeps its map note; both sessions take non-rise arms),
`m_useup` unlink-vs-weight drift (pre-existing, 12 call sites,
untouched), unsee-arm `Soundeffect`/deaf shape, `mon_set_minvis`
polish.

## Hallucinations / overclaim

None. «Same statement, no new module edge» verified true; «sole
caller» verified true (stub fully absent post-commit).

## Density

Net −8 lines replacing a stub with a live call plus three
message-routing fixes — one C `case` envelope, one falsifier pair.
Dense enough; the negative line count is the stub deletion, not
under-work.

## Verification

D-log Verify bullet: `verify --fn use_misc` → `1 PASS, 1 moved past`
(92125 PASS incl. Call prompt; 92173 77→obj_resists@230) + green +
strict + cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify use_misc --base 37cebe60~1` → `1 PASS, 1
moved past, 0 unchanged, 0 worse → PROGRESS`, both rows identical to
the claim. No WORSE, no vacuous check.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
