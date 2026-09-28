# Review 1981 — 5affd05cd — mtele_trap flip / any_light_source arm (D-3021)

Metadata: SHA `5affd05cd` (D-3021). Must-fix single from the
1972–1980 audit rescore (scen-tour-Samurai-91113 PASS→FAIL, step 54,
kind=screen, owner mtele_trap). Scored diff: `js/light.js` (+10) +
`js/mon.js` (+3 + import). Subject promises the flip's writer is not
mtele_trap but the movemon `:1332–1333` any_light_source arm.

## Intent vs deliverable

Promise: owner misattribution — mtele_trap examined and cleared, the
missing post-loop vision arm ported. Diff actually adds exactly that:
new `any_light_source` plus the one arm in `movemon`, plus
`scripts/movemon-light-recalc.test.mjs`. Promise kept.

## Inventory

- `any_light_source` (js/light.js:491, exported sync): whole C body.
- `movemon` (js/mon.js:3817, async): one added arm + import; body
  otherwise untouched.
- `mtele_trap` (js/teleport.js:1362): unchanged, examined only.

## C ↔ JS fidelity

### any_light_source — verdict: exact-C, ACCEPT

C (`light.c:718–722`, csym range):

```c
boolean
any_light_source(void)
{
    return (boolean) (gl.light_base != (light_source *) 0);
}
```

JS `!!((game.light_base || []).length)`. Whole 5-line body, no
callee, no RNG. Array-emptiness is the faithful analogue of the
NULL list head in the JS list model; `|| []` covers undefined.
Sole C caller is `mon.c:1332` (csym `--callers`: exactly 1
reference) → wired `js/mon.js:3824`. Confirm.

### movemon post-loop — verdict: branch order exact, ACCEPT

C `mon.c:1325–1350` order: `:1330` iter_mons_safe →
`:1332–1333` `if (any_light_source()) vision_full_recalc = 1` →
`:1335–1338` bypass/split clears → `:1340` dmonsfree. JS
(`js/mon.js:3817–3838`):

```js
await iter_mons_safe(movemon_singlemon);   // C :1330
if (any_light_source()) game.vision_full_recalc = 1;  // C :1332-1333
if (game.context?.bypasses) clear_bypasses();  // C :1335-1338
clear_splitobjs();
await dmonsfree();  // C :1340
```

Order exact; no RNG touched. Confirm.

### Callee closure — verdict: ACCEPT

Required `sym.mjs` output:

```text
any_light_source js/light.js:491   sync
```

Single definition, no clone. Import edge mon.js→light.js
pre-exists (`imports.mjs --can`: "ALREADY: mon.js already
statically imports light.js. No new edge needed."). Rule #2 scan
clean ("Rule #2 clean: no bare/node specifiers or fs calls in
js/."). No STUB/CLONE/OMIT in a live arm. Diff grep: no FORCE,
DIAG, seed, coordinate, or fastforward tokens.

## Hallucinations / overclaim

None. D-log labels the movemon/any_light_source verifies as
"hidden note (0 blocked, expected)" rather than corpus PASS, and
pins PROGRESS on the mtele_trap session that actually flipped.
The Monnam-timing named omission for mtele_trap is out of this
flip's causal chain (toplines identical both sides) — a
legitimate named omit, stays in the map.

## Density

Must-fix ships alone per §2b — small size is correct here, not
waste. One 5-line function whole plus one arm restore.

## Verification

Re-measured (`hidden-proxy.mjs verify
mtele_trap,movemon,any_light_source --base 5affd05cd~1
--reach-all`):

```text
verify mtele_trap: 1 PASS (scen-tour-Samurai-91113 PASS), 0 worse → PROGRESS
smoke mtele_trap: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
smoke movemon: 24 PASS, 0 regressed → REACH-OK
smoke any_light_source: 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the D-log Verify bullet line for line.

## Actionable C-wrongs

None.

Ledger: `mtele_trap`/`any_light_source`/`movemon` ported,
REACH-OK ×3, one PROGRESS session.
Verify lines: hidden PROGRESS (mtele_trap) + vacuous notes ×2
(honest) + smoke ×3.

Verdict: **ACCEPT**
