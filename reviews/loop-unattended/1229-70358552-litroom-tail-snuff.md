# Review 1229 — 70358552 — litroom tail + snuff_light_source (D-2263)

Metadata: SHA `70358552` (D-2263). Pops the Open row `read.c`
litroom (gremlin hits + Punished move_bc, D-2250 deferrals; no
corpus block). js/ +92/−15 across `js/light.js`, `js/read.js`,
`js/uhitm.js` (one-word export).

## Intent vs deliverable

Subject promises the litroom tail (Punished move_bc
pick-up/re-place, gremlin queue/drain, engulfer-lit plines) plus
`snuff_light_source`. Diff actually adds exactly those, the
module-level `gremlins` stack, and four new import names.
Promise matches diff.

## Inventory

New: `export function snuff_light_source(x, y)` (light.js);
module-level `let gremlins = []` (read.js); engulfer pline
block; two `move_bc` call sites; gremlin drain block. Changed:
`set_lit` both arms; one-word `export` on pre-existing
`light_hits_gremlin` (uhitm.js — behavior unchanged). New
module edges (absent at parent, confirmed via `git show
70358552~1`): read→light, read→mhitu, read→polyself,
light→objects. All four are function-body-only uses plus one
top-level `MAGIC_LAMP` const read of the generated
`objectNames` array (objects.js imports only gstate/const/
generated — no back-edge); `import('./js/read.js')` and
`import('./js/light.js')` both LOAD-OK this audit, and the
green suite holds. No symbol deleted or re-pointed.

Callee closure — all LIVE: `end_burn` (timeout.js:1573 sync —
called without await from sync code, correct), `obj_is_burning`
(same-file live), `artifact_light` (existing edge),
`move_bc` (ball.js:445 sync — signature
`(before, control, ballx, bally, chainx, chainy)` matches both
call sites), `light_hits_gremlin` (uhitm.js, already C-faithful
per D-1240), `digests`/`mbodypart`/`hates_light` (canonical
exports), `m_at`, `vision_recalc`, `rnd` (1..n, rng.js:97 —
`rnd(5)` ≡ C). No STUB in any live arm.

## C ↔ JS fidelity

- `snuff_light_source` vs `light.c:728–759` (fetched): full
  `light_base` scan, `LS_OBJECT` + coordinate match, burning
  gate, artifact `continue` (keeps scanning, as in C — not a
  return), `end_burn(obj, otyp !== MAGIC_LAMP)`, immediate
  return after (C: entry removed, `ls->next` invalid). `| 0`
  coords. C.
- `set_lit` vs `read.c:2470–2488` (fetched): light arm sets
  `lit = 1` and queues on `m_at` + gremlin test; dark arm sets
  `lit = 0` + `snuff_light_source(x, y)`. The queue predicate
  uses `hates_light`, which is documented gremlin-only
  (`monsters.js:339–341`: `ptr == &mons[PM_GREMLIN]`), so it
  is exactly C's `data == &mons[PM_GREMLIN]`. Queue is
  `unshift` (C prepend) and drain is `shift` (C pop head) —
  LIFO both sides. C.
- Engulfer plines vs `read.c:2554–2562` (fetched): `Blind →
  silent / digests → stomach-lit / whirly → shines briefly /
  else glistens`, same short-circuit order, same texts
  (`s_suffix(Monnam) + mbodypart(STOMACH) + "is lit"`). JS adds
  a null-`ustuck` guard C lacks (C dereferences; uswallow
  implies non-null) — a safe superset, and a JS throw would be
  Must-fix-grade, so the guard is correct policy. C.
- move_bc sites vs `:2559–2564` / `:2605–2612` (fetched):
  pick-up `move_bc(1, 0, …)` after the `no_op` return under
  punished + `!on` + `!Blind`; re-place `move_bc(0, 0, …)`
  inside `if (!Blind)` after `vision_recalc(2)` with no second
  `!Blind` on the inner test — all matching C structure.
  Observation (not a C-wrong): both sites test `u.uball &&
  u.uchain` where C `Punished` is `(uball != 0)` alone
  (`youprop.h:77`). The distinguishing state (uball set,
  uchain null) is one C itself cannot survive — its own
  restore arm dereferences `uchain->ox` unconditionally — so
  no observable divergence; the D-log discloses the guard as
  corrupt-state defense. (Its "(read.js:680 idiom)" citation
  is stale — no such idiom exists elsewhere in read.js — doc
  nit only.)
- Drain vs `:2615–2633` (fetched): `vision_full_recalc = 1`
  first, then `if (gremlins)` → `vision_recalc(0)` → pop-head
  `light_hits_gremlin(mon, rnd(5))` loop, outside the `!Blind`
  block as in C. C.

## Hallucinations / overclaim

None. The commit message's "/tmp probe 6/6" is expanded
honestly in the D-log (first run failed on a timerless fake
lamp, diagnosed as a probe artifact, re-run 6/6). Vacuous
verify labeled as such; full 44/44 pasted.

## Density

+92 for set_lit + snuff_light_source + two move_bc sites +
drain + engulfer arms. In-band; the D-log's density note
(≈60 lines portable C, rest cites) is accurate.

## Verification

Re-measured myself: `hidden-proxy verify litroom --base
70358552~1` → 0 blocked at baseline and working scoreboard
(vacuous, as labeled); `verify.mjs --fn litroom` at HEAD →
rule2 PASS, green 2/2, strict ×2, cohort 7/7, VERIFY: PASS.
Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
