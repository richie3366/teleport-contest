# Review 2506 — dabd53e13 — migrate_to_level fmon unlink before newsym

Metadata: SHA `dabd53e13` (D-3625), cliffs-head `teleport.c` mlevel_tele_trap writer,
js diff +22/−10 in `js/teleport.js` + new `scripts/migrate-takeoff-newsym.test.mjs`.
≤10-function SHA: full Method on the one touched function.

## Intent vs deliverable

Promise (subject + D-3625): in the `migrate_to_level` sync mirror of C
`relmon`, run the C `mon.c:2571–2584` fmon unlink **before** the `if (onmap)`
block (seemimic / fill_pit-core / newsym) instead of after it, because JS
`m_at` falls back to the fmon coord scan while C `m_at` is grid-only
(`rm.h:510`); the `:2586–2589` migrating_mons insert stays in C position.
Claims 3 PASS (Valkyrie-94311, quest-Archeologist-94276, trap-Knight-94121)
+ REACH-OK, no RNG change, no new imports.

Diff actually adds: no new functions, no new imports, no deleted symbols —
one moved block (the identical `indexOf`/`splice`/`impossible` unlink hunk,
now before `if (onmap)`) plus a JS-ORDER comment and doc/header comment
updates. Matches the promise exactly.

## Inventory

- `migrate_to_level` (`js/teleport.js:2862`, sync mirror of C `relmon` at the
  `dog.c:906` call site) — reorder only; unlink hunk byte-identical, moved up.
- `scripts/migrate-takeoff-newsym.test.mjs` — new node:test (full
  Valkyrie-94311 replay asserting row 6 `<` + `^`).

## C ↔ JS fidelity

C `relmon` (`nethack-c/upstream/src/mon.c:2559–2594`, via `csym.mjs relmon`):
`:2565–2566` no-fmon panic, `:2569` `mon_leaving_level(mon)`, `:2571–2584`
fmon unlink (head or scan, `:2583` absent → panic), `:2586–2589` insert into
`*monst_list`. Callers (`csym.mjs --callers relmon`): `dog.c:618/863/906`,
`mon.c:2531`, `extern.h:1791`; the ported path is `dog.c:906`
(`relmon(mtmp, &gm.migrating_mons)`).

Branch-by-branch confirm:

- No-fmon gate: JS `if (!(game.fmon || []).length) void impossible(...)`
  continues past it, mirroring C `:2565–2566` (C `panic` = fire-and-forget in
  the mirror, pre-existing convention, untouched).
- `mon_leaving_level` core (`:2696–2726` grid clear + newsym): untouched by
  this SHA; the `onmap` block still runs grid clear then `newsym(mx, my)`
  (`js/teleport.js` newsym call site verified in place).
- fmon unlink: moved verbatim before `if (onmap)`. JS-ORDER justification
  verified, not taken on trust: C `m_at` reads only `svl.level.monsters`
  (`rm.h:505–515`, grid macro — the `:510` cite is the `#if 0` branch but the
  live `#else` arm is the same grid read), so C's post-clear newsym already
  sees no monster; JS `mon.js:1734–1741` and `display.js:586–592` both fall
  back to an fmon coord scan that keeps live migrants (`mhp > 0`, mx/my
  intact, no OFFMAP). Unlink-first makes newsym observe what C observes.
- migrating_mons insert (`:2586–2589`): still after the `onmap` block, C
  position; invisible to newsym, which scans `game.fmon` only. Correct.
- Interleaving audit: between the moved unlink and its old site the only
  `fmon`/`newsym` references are the unlink itself, the newsym call, and
  comments (verified by grep of `js/teleport.js:2895–2965`) — nothing else
  reads `game.fmon` for mtmp there. The D-log's "no caller changes" holds:
  all JS callers flow through the fixed mirror.
- RNG: no `rn2`/`rnd`/`d` in `relmon` or the mirror; "no RNG change" true.

Helper classification: none added/removed. `sym.mjs` re-point check: N/A
(no symbol deleted or re-pointed; no import edge changed).

## Hallucinations / overclaim

None. The D-log does not claim C order was replicated literally — it states
the deliberate JS-ORDER deviation and why. The "live `mon.js`
mon_leaving_level/relmon keep C order" note is honest scoping (death paths
filter `mhp<=0`; no corpus session names them), not a hidden stub: those are
pre-existing whole functions, untouched. No "Match C" dispatch-over-stub.

Grep of the diff: no `FORCE`, `DIAG`, `getRngLog`, seed/step/coordinate
reads, `fastforward`, or hardcoded coordinates. Rule #2:
`node scripts/imports.mjs --rulecheck` → "Rule #2 clean" on all of scored
`js/`. No `--can` check needed (no clone kept on cycle grounds).

## Density

Cliff phase (§10.18): one cliff — the mlevel_tele_trap head's writer
(`migrate_to_level` relmon mirror), whole function touched at the one
diverging ordering point, every caller flowing through it, code + ledger +
verify in one handoff. Not an arm sold as the function: the mirror was
already whole (D-3482); this SHA fixes its ordering. `Ledger:
migrate_to_level partial` entry present. No second C file's work bundled
(the ledger `dog.c.jsonl` touch is the entry itself). No-op/busywork: no.

## Verification

Re-measured myself, one call:
`node scripts/hidden-proxy.mjs verify mlevel_tele_trap,migrate_to_level --base dabd53e13~1 --reach-all`:

- `verify mlevel_tele_trap: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Valkyrie-94311, quest-Archeologist-94276, trap-Knight-94121 all PASS)
- `smoke mlevel_tele_trap: 24 PASS, 0 regressed → REACH-OK`
- `verify migrate_to_level: no corpus session is blocked on it at dabd53e13~1`
  (expected: writer, 0 blocked — the D-log says exactly this, not a PASS claim)
- `smoke migrate_to_level: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet line for line. No REGRESSED session.
Committed test: `node --test scripts/migrate-takeoff-newsym.test.mjs` →
1 pass / 0 fail (re-ran in this audit).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
