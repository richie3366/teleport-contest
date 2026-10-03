# Review 2276 — 0debd1ae2 — money_cnt first-stack trio + finish_paybill impossible arm

- SHA: `0debd1ae2` (D-3320)
- Files: `js/end.js`, `js/monmove.js` (+ `scripts/moneycnt-trio-rewire.test.mjs`, docs, ledger)
- Insertions: ~17 js / ~24 deletions; rewire-to-live commit

## Intent vs deliverable

Subject promises: "`end.c`/`shk.c`/`monmove.c` money_cnt first-stack trio
(really_done + finish_paybill + set_apparxy rewires; impossible arm)". The
diff delivers exactly that: deletes the summing `money_cnt` clones in
`js/end.js` and `js/monmove.js`, extends the existing static `shk.js` edges
with the canonical import, retires the `finish_paybill` impossible-arm named
omit, and prunes the orphaned `COIN_CLASS` import from `end.js`. No
unpromised behavior change; no DIAG/FORCE/seed/coordinate in the hunks.

## Inventory

- `money_cnt` re-point (end.js:457-clone → `shk.js` import; monmove.js:743-clone → import). Deleted clones, not new functions.
- `finish_paybill` (js/end.js:1308): added `if (shkp) await impossible(...)` arm + `money_cnt` site comment.
- `really_done` / `set_apparxy`: call sites unchanged except which `money_cnt` they call (one C-cite comment each).
- `scripts/moneycnt-trio-rewire.test.mjs`: 6 subtests (first-stack incl. leading-zero-quan, Xorn-arm sites, module wiring).

## C ↔ JS fidelity

C `money_cnt` (nethack-c/upstream/src/hack.c:4513–4522): `while (otmp) {
if (oclass == COIN_CLASS) return quan; }` — first stack, not a sum; 43
call sites incl. end.c:1326, monmove.c:2203, shk.c:2748. Canonical JS
(js/shk.js:4767): first `COIN_CLASS` element's `quan`, array + nobj-chain
forms, else 0 — branch-identical to C, no RNG. The deleted clones summed
all stacks: a real C-wrong, now fixed at all three sites. `sym.mjs`
confirms one remaining local clone (js/sit.js:1084); read it: first-stack,
C-correct, only its "cycles" comment is stale (the end.js clone it names
is gone) — cosmetic, unqueued:

```
money_cnt        js/shk.js:4767   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/sit.js:1084
```

C `finish_paybill` (shk.c:2721–2755): `!isok` → `impossible` iff shkp →
force `ox=u.ux?u.ux:u.ux0`, `oy=u.ux?u.uy:u.uy0` (sic, C's own note) →
`unleash_all()` → shkp takes `money_cnt` gold → `drop_upon_death(0,0,ox,oy)`.
JS (end.js:1308–1331) walks the same order with the same `u.ux`-tests-`oy`
quirk; `impossible` is the live display.js export already imported at
end.js:14. `COIN_CLASS` survives in end.js only inside a comment (:1211),
so the import prune is safe. `really_done` :1215 and `set_apparxy` :1015
pass `game.invent` ≡ C `gi.invent`. No RNG in any touched line.

## Hallucinations / overclaim

None. D-3320 says "one real C-wrong fixed at three sites" — true (sum →
first-stack). "Whole body live" for `finish_paybill` matches the C body
read. `set_apparxy` pre-existing `accessible`/`closed_door` clones are
disclosed as untouched, not claimed.

## Density

~17 insertions is below the ~80 bar; defended rewire shape (D-3319
precedent): deletion of wrong code is the port, 3 whole functions verified
C-line-by-C-line, head's closure holds nothing more Open (sit.js clone
already first-stack). `Ledger:` really_done / finish_paybill / set_apparxy
ported. Verify lines per function present in the D-log.

## Verification

Re-measured per-function (`hidden-proxy.mjs verify
really_done,finish_paybill,set_apparxy --base 0debd1ae2~1 --reach-all`):
all three "0 session(s) blocked" (vacuous, honestly noted as such in the
D-log — queue rows cited 0 blocks) with REACH-OK: really_done smoke 24/24,
finish_paybill smoke 24/24, set_apparxy reach 70/70, 0 regressed — exactly
the D-log tail. Rule #2: `imports.mjs --rulecheck` → clean on current tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
