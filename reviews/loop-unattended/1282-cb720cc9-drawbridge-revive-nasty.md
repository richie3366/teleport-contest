# Review 1282 — cb720cc9 — dbridge open/close residuals: revive_nasty port, Soundeffect order, wall_info assign, nokiller wire (D-2316)

Metadata: SHA `cb720cc9`, D-2316, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/` hunks (`js/dbridge.js` 17+/12−, `js/hack.js` 45+/2−); C `hack.c:104-137` (`csym.mjs revive_nasty` body + `--callers`), `dbridge.c:839-882` (open), `dbridge.c:774-834` (close); `sym.mjs` on revive_nasty / revive_corpse / nokiller / Soundeffect / enexto / rloc_to / goodpos / is_rider / mons / Norep / objects_at / m_at; `imports.mjs --rulecheck`; added-lines banned-pattern grep; `hidden-proxy verify open_drawbridge --base cb720cc9~1` re-run.

## Intent vs deliverable

Subject promises four residuals: port `revive_nasty`, restore all three dropped `Soundeffect` calls in C order, fix close `wall_info` OR→assign, wire `nokiller` at both tails. Diff actually delivers exactly that plus the `hack.js` import plumbing. Promise kept.

## Inventory

- `js/hack.js`: new export `revive_nasty` (+41 lines) + `teleport.js` (`enexto, goodpos, rloc_to`), `monsters.js` (`is_rider`), `do.js` (`revive_corpse`) import joins; `PM_WIZARD_OF_YENDOR` const via `monsterNames.indexOf` (file convention).
- `js/dbridge.js`: 3 `Soundeffect` calls (open gears-100, close chains-75, close smashing-75); `wall_info` plain assign; `await revive_nasty` ×3 in C order; `nokiller()` ×2; header omit line drops `revive_nasty`.

## C ↔ JS fidelity

`revive_nasty` arm-for-arm vs C `hack.c:104-137`: `objects_at` walk with `nexthere` snapshot (`otmp2` before body) ✓; `CORPSE && (is_rider(mons(corpsenm)) || corpsenm==PM_WIZARD)` predicate ✓; occupant-shove `m_at && enexto → rloc_to` ✓; `if (msg) Norep` (both callers pass null, dead) ✓; `revived = revive_corpse(otmp)` overwrite-not-accumulate (C same — last corpse wins) ✓; tail `if (revived) { m_at && !goodpos && enexto → rloc_to }` ✓. Draws no RNG itself; enclosed draws (enexto/rloc_to/revive_corpse) fire in C order. Async/await is the file's sync→async adaptation (all three callees' `sym.mjs` async flags honored: `revive_corpse js/do.js:3028 ASYNC`, `rloc_to ASYNC`, `enexto/goodpos` sync called bare) ✓.

Open vs C `:839-882`: `Soundeffect(se_gears_turning_chains_rattling,100)` before `You_hear` in the not-seen else ✓; `revive_nasty(x,y,0)` before `delallobj(x,y)` ✓; `nokiller()` tail ✓; going/coming predicate (`distu(x2,y2)<distu(x,y)` → going) matches ✓. Close vs C `:774-834`: chains-75 before hear ✓; `wall_info = W_NONDIGGABLE` plain assign (was `| W_NONDIGGABLE`, which kept stale dig/passwall bits) ✓; `OBJ_AT && !Deaf` smashing arm → `objects_at && !(Deaf||!acoustics)` then Soundeffect+hear ✓ (see below); double `revive_nasty(x,y)+(x2,y2)` after smash-hear before the `delallobj` pair ✓; `nokiller()` tail ✓; coming predicate with `(u.ux==x||u.uy==y)&&!Underwater` intact (untouched, verified present) ✓.

Callee closure: `revive_corpse` LIVE (not stub — `js/do.js:3028`, body read past the invent/where/montype/zombie/corpse_xname preamble into the location/container resolution; the staged-probe path that bails false without live game state bottoms out in this reviewed callee, and sessions are the acceptance test per the D-log). `enexto js/teleport.js:656` sync called bare, `rloc_to :751` ASYNC awaited, `goodpos :468` sync called bare — every call site honors the `sym.mjs` async flag, and both `rloc_to` awaits sit inside the same `if (mtmp && enexto(...))` short-circuit C uses, so no extra draws on the failure path. `mons :203` + `is_rider :909` sync canonical (hack.js joins the existing monsters.js import — not the `mkobj.js:859` clone flagged by `sym.mjs`); `objects_at`/`m_at` pre-existing imports (not the 4 `m_at` clones elsewhere); `Norep js/display.js:7377` ASYNC awaited under the `if (msg)` guard both callers skip with null. `Soundeffect js/sndprocs.js:36` sync no-op in this build; se ids exist (`seffects_data.js:89/:36/:155`). No STUB in a live arm. Named omits (`set_entity`/`do_entity` → D-1967 row; `moverock_core :450` caller untouched with the `// C: revive_nasty deferred` comment standing at `hack.js:516`) carry owning rows.

Checked-not-wrong: the smashing-arm `acoustics===false` addition. C `Soundeffect` already no-ops when Deaf and JS `Soundeffect` is void; the local `You_hear` clone (`js/dbridge.js:67-70`) early-returns on `Deaf||!acoustics` per its `pline.c You_hear` cite — so hoisting the gate outward is behavior-identical, not a C-wrong. `Norep(msg)` vs C `Norep("%s",msg)` is the file's single-arg convention on a dead (null-only) path.

Callers per `csym --callers`: `dbridge.c:820,821` (close pair) + `:868` (open) wired here; `hack.c:450` (`moverock_core`) explicitly left for D-1859 — named, not dropped.

New-edge `sym.mjs` output (static `do.js` edge added at this SHA; parent has no `do.js` import):

```text
revive_nasty     js/hack.js:424   ASYNC — await required
revive_corpse    js/do.js:3028   ASYNC — await required
nokiller         js/dbridge.js:726   sync
```

(`--can hack.js do.js revive_corpse` at this SHA: SAFE — hoisted fn, same SCC, call-time use; today's ALREADY is the post-ship re-read.)

## Hallucinations / overclaim

None. D-log says "no corpus divergence" and marks hidden "vacuous: 0 blocked … NOT a corpus PASS" — exactly honest. The `do.js` "sole new edge" claim re-checks today as ALREADY (parent had no `do.js` import, child adds it — the edge is new at this SHA; `--can` SAFE per message, call-time use of a hoisted fn, no TDZ read). `imports.mjs --rulecheck`: clean.

## Density

Numstat `js/dbridge.js` 17+/12−, `js/hack.js` 45+/2−: 62 insertions for a 34-line C callee + 6 residual call-site arms across the open/close pair. Above the ~40 floor; tight caller/callee cluster (callee + its two wired callers, third caller named-deferred), one envelope. OK.

## Verification

D-log: clean-tree preflight, hand probe 8/8 (deleted), `verify --fn open_drawbridge` syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44 PASS with vacuous-honest hidden note, final verify after last `js/` edit. Re-measured by this review:

```text
verify open_drawbridge: baseline cb720cc9~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — no `--base` debt (row cited 0). Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`/seed-gates/coords. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
