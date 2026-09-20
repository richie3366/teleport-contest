# Review 1596 — 74da96a1 — monmove.c onscary whole-body port (D-2637)

**Metadata:** SHA `74da96a1`, `monmove.c` `onscary`, D-2637
(+ `questpgr.c` convert_line stale park).
JS: `js/mon.js` (restart), `js/engrave.js` (+sengr_at),
`js/monmove.js` (+Displaced export, dochugw wire),
`js/music.js` (clone→import), `js/teleport.js` (+Inhell export),
`js/hack.js` (monster_nearby wire), `js/were.js` (new_were tail).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: live-export restart of `onscary` in C order wiping
five named omissions (own-shop/temple fall-through, lawful-minion +
unique resist, fuzzy-exact Elbereth, hell exclusion), canonical
`sengr_at` export, 3 caller wires (monster_nearby/dochugw/new_were),
music clone→live rewire, convert_line stale park. Diff delivers all
of it, plus the in-commit fix of the first-handoff `dochugw` bare-`u`
throw (`game.u.ux`). Promise matches deliverable.

## Inventory

- `onscary` (`js/mon.js:363`, sync) — restarted, C order, per-arm cites.
- `sengr_at` (`js/engrave.js:141`, sync) — new canonical export.
- `Displaced` (`js/monmove.js:657`, sync) — `function` → `export`.
- `Inhell` (`js/teleport.js:2241`, sync) — `function` → `export`.
- music.js local `onscary` clone — deleted → live import (clone→import).
- Caller wires: hack.js `monster_nearby`, monmove.js `dochugw`,
  were.js `new_were` tail.
- `setmangry` comment updated (omissions → full body). No behavior.
- Required `sym.mjs` re-point output (deleted music clone):
  `onscary js/mon.js:363 sync` + `ALSO 1 LOCAL CLONE(S):
  js/teleport.js:428` — the music clone is gone; only the named
  D-1110 teleport clone remains.

## C ↔ JS fidelity

C locus `monmove.c:240–303` (64 L, via `csym.mjs onscary`; callers:
23 refs). Arm-by-arm confirm, no RNG in C body or JS (`rn2`/`rnd`/
`rn1`/`d` — none; the only RNG nearby is were.c's `rn1(9,2)`, below):

- `:247` auditory/magical split — exact.
- `:252–255` iswiz / is_lminion / ANGEL / rider — exact (JS
  `(ptr?.mndx ?? mtmp?.mnum) === PM_ANGEL` is the standard
  pointer→index adaptation; `is_lminion` live teleport.js:366).
- `:260–263` magical S_HUMAN + unique_corpstat — exact
  (own-module `unique_corpstat`, mon.js:2949; old code had S_HUMAN
  but no unique arm).
- `:267–271` shk/priest own-shop/temple — exact AND the fix: old
  code fell through on commented-out guards, new code returns FALSE
  via live `inhishop` (shk.js:744) / `inhistemple` (priest.js:109).
- `:273–274` auditory TRUE — exact.
- `:277–279` altar vampire/vampshifter — exact (`is_vampshifter`
  live mon.js import, :39).
- `:283–285` scare scroll — exact (`sobj_at` pre-existing).
- `:297–303` strict Elbereth + hero/image/guardobjects + shk/gd/
  blind/peaceful/minotaur/hell/endgame exclusions — exact via
  canonical `sengr_at`, live `Displaced()`, `objects_at` for
  `vobj_at` (display.js:1458 precedent), new `Inhell()` hellish-flag
  shape = C `In_hell` (old code never excluded hell).
- `sengr_at` vs C `engrave.c:250–261`: HEADSTONE skip, `engr_time
  <= moves`, strict = case-insensitive equality (C `strcmpi`),
  else substring (C `strstri`) — exact.

Callee closure: is_lminion / Inhell / inhistemple / inhishop /
Displaced / unique_corpstat / is_vampshifter / sobj_at / u_at /
objects_at / In_endgame — all LIVE. No stubs in live arms.
Caller closure (every C call site): dogmove.c:1160 ✓ dogmove.js:1220
(pre-existing); hack.c:4123 ✓ wired here; mon.c:2278/4270/5529 ✓
mon.js:3202/1414 + makemon.js:1713 (pre-existing); monmove.c:234 ✓
wired here; monmove.c:1390 ✓ monmove.js:503 (pre-existing); muse.c
×4 ✓ muse.js (pre-existing); music.c:58 ✓ rewired here;
teleport.c:168/2056 → teleport.js locals (named D-1110, verified
CLONEs below); were.c:135 ✓ wired here; monmove.c:559 distfleeck
→ named omit with its own residual rows. No unwired caller left
unnamed.
`new_were` tail vs C `were.c:95–138` (44 L, read here): C order is
mon_break_armor `:129` → possibly_unwield → mon_moving/hostile/
onscary(mux,muy)/monnear → monflee(rn1(9,2),TRUE,TRUE) `:133–137`;
JS `scared_tail` runs post-unwield (promise-aware chain) with
`rn1(9, 2)` live from rng.js — exact.
Kept clones verified, not assumed: teleport.js:428 local `onscary`
and :175 local `sengr_at` are arm-for-arm identical to the new
canonical exports (all new gates present, same order) — CLONE,
faithful. `--can teleport.js engrave.js sengr_at` → SAFE (hoisted
fn decls), so the D-1110 "cycle" label is conservative rather than
TDZ-forced; consolidation is hygiene, not fidelity — no row.

## Hallucinations / overclaim

D-log's "First handoff used bare `u.ux` … fixed, re-ran once" is
visible in the shipped diff (`game.u.ux` at monmove.js:2598) and
consistent with the final state — no throw remains. "All
`imports.mjs --can` SAFE/ALREADY" — the one I re-ran (teleport →
engrave sengr_at) returns SAFE. No dispatch-vs-stub overclaim:
every callee in the ported arms is imported live.

## Density

64-line C function + 12-line sengr_at + 3 caller wires + music
rewire across 7 modules; convert_line stale park is the sanctioned
same-iteration companion. Right-sized (one function family).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`
  in control flow.
- Re-measured: `hidden-proxy.mjs verify onscary --base
  74da96a1~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's Verify bullet.

## Actionable C-wrongs

None. Full arm closure, full caller closure, kept clones verified
faithful.

Verdict: **ACCEPT**
