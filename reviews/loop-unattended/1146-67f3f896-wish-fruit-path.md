# Review 1146 — 67f3f896 — objnam.c wish fruit path (D-2180)

Metadata: SHA `67f3f896`, js/ +95/−~8 across `eat.js` (2
export keywords), `options.js` (+rename line + import), `readobjnam.js`
(+fruit loop, +halfeaten preparse, +oeaten bite, +spe arm). D-log
D-2180. Subject promises: C renames SLIME_MOLD to "fruit" at init;
JS matched "slime mold" in srch and drew `rn2(76)` (5 wish sessions
PASS/move).

Intent vs deliverable: promise matches diff. Actually adds: the
`obj_descr` rename analogue, the postparse3 fruit loop, the
preparse partly-eaten arm, `d.ftype` default + SLIME_MOLD
`spe=ftype`, the `:5383–5393` oeaten bite, two eat.js exports.
One C family (wish type-resolution), one falsifier.

Inventory: no new functions; two functions change visibility
(`obj_nutrition` eat.js:947 sync, `consume_oeaten` eat.js:1020
sync — `sym.mjs` confirms both exported sync; `makeplural`
objnam.js:1997 sync, joins the existing makesingular import).
No deleted symbols, no clone→import re-point, so no
dangling-import risk. New edges: readobjnam→eat (extends the
existing tin-variety edge), readobjnam→objnam.makeplural. No new
module (cycle check n/a; runtime-use claim not made here).

**C ↔ JS fidelity**: confirm, four loci read at HEAD.

- Rename: C `options.c:7329–7341` (`fruitadd(pl_fruit)` then
  `obj_descr[SLIME_MOLD].oc_name = "fruit"`). JS
  `options.js:1418` renames before the `if (game.ffruit) return`
  early-return — mirrors C's unconditional order (fruitadd-then-
  rename). Functionally proven: Knight-92105 no longer draws
  `rn2(76)` in srch and prints «2 slime molds.».
- Fruit loop: C `objnam.c:4806–4868` vs JS `readobjnam.js:1040–`.
  Prefix strip case-insensitive (`strncmpi` ↔ `toLowerCase`
  startsWith), digit branch (`atoi`/skip ↔ parseInt/slice +
  `continue` ≡ `l=0` fallthrough), fruit-name match case-
  sensitive (`strcmp` ↔ `===`), singular/plural via
  makesingular/makeplural, cnt overwrite incl. 0, fid. C
  `return 2` (goto typfnd) vs JS `break` then `if (!d.typ …)` —
  equivalent since `d.typ` is set (artifact arm skipped both
  sides). `!fp || !*fp` vs `!fp` — equivalent (empty string
  breaks either way).
- fruitbuf timing: C mungspaces then `Strcpy(d.fruitbuf, bp)`; JS
  `bp = mungspaces(bp)` (:721) before `fruitbuf: bp` (:737) —
  same order.
- ftype default: C `:3958` `current_fruit` ↔ JS
  `game.context?.current_fruit | 0`. SLIME_MOLD spe: C
  `:5137–5138` `spe = ftype` with FALLTHROUGH into arms that
  only `break` (:5145+) — JS plain assignment equivalent.
- Oeaten bite: C `:5383–5393` (`nut > 1` guard, `oeaten = nut`,
  one bite, before weight) ↔ JS identical order/guard.

RNG: the whole point — fruit match is draw-free both sides;
the stray `rn2(76)` srch draw is gone on this path.

Hallucinations / overclaim: none. `next_ident` correctly kept
as symptom owner (NOTES); writer named as the wish path. Named
defers (postparse3 Japanese/mail-retry/spinach, historic/diluted
preparse) are pre-existing gaps no corpus session reaches
through this path — map-class, correctly not Must-fix.

Density: ~95 insertions for one C function family + its init
call site — in-envelope.

Verification: D-log cites `verify.mjs --fn next_ident` → 2 PASS,
3 moved past, 4 unchanged, 0 worse. Re-measured independently:
`hidden-proxy.mjs verify next_ident --base 67f3f896~1` →
baseline 9 blocked, `2 PASS, 3 moved past (1 still next_ident at
a later step), 4 unchanged, 0 worse → PROGRESS` (Healer-92010
PASS; Knight-92105 PASS; 92238→obj_resists@166;
92130→dosearch0@179; 92224 20→next_ident@77). Exact match.
`rulecheck` clean (re-ran this iter). No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
