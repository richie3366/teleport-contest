# Review 2180 — b938e081b — mhitm_adtyping DGST/FAMN/HALU + pie umconf

SHA `b938e081b`, D-3220; 2026-10-01; uhitm.js (+~45/−~10) + mhitm.js
(export + doc) + new `scripts/damageum-adtyping.test.mjs`. Two-arm
cluster (uhitm.c): dispatch completion + missed-caller fix + 6 stale
pops. Closes no prior review.

## Metadata

- Subject: "mhitm_adtyping split-dispatch completion (damageum
  DGST/FAMN/HALU) + nohandglow melee-pie caller (D-3220)".
- Promises: AD_FAMN → shared mhitm_ad_famn (C's goto, magr voided);
  AD_DGST/AD_HALU inline `damage = 0` (SAMU precedent, shared arms
  excluded); umconf_tail helper = C `:1911–1917` verbatim; pie exit
  calls it with the `:1780` gate; ENCH named (comment-only).

## Intent vs deliverable

Kept. Both latent C-wrongs are real against pinned C and fixed in
C order; the shared-vs-inline routing decisions match C's three
contexts exactly (verified arm by arm, not trusted from prose).

## Inventory — damageum_adtyping (+3 arms)

`damageum_adtyping` (uhitm.js:2981, uhitm-context dispatch) gains
AD_FAMN/AD_DGST/AD_HALU else-if arms. `mhitm_ad_famn` gains `export`
(mhitm.js, body untouched) + AD_FAMN joins uhitm's existing mhitm.js
static import (DGST/HALU consts already local — no new edge ✓).
Deleted/re-pointed: none.

## C ↔ JS fidelity — damageum_adtyping

C `uhitm.c:4781–4832` (csym range) dispatches all three; the uhitm
(`magr == &gy.youmonst`) bodies:

- FAMN `:3784–3788`: `goto mhitm_famn` (hero can never be a FAMN
  attacker; "same as the mhitm case except for messaging"). JS
  routes to shared `mhitm_ad_famn(game.youmonst, …)`, whose body —
  read in full — is exactly C's `mhitm_famn:` label (`:3799–3804`:
  non-eater → damage 0, else damage stands) with `void magr` ✓.
  Routing = the goto target, byte-equivalent. No RNG either side ✓.
- DGST `:4499–4501`: uhitm arm is `mhm->damage = 0` only ✓ — JS
  inlines `mhm.damage = 0` ✓. Correctly NOT routed to the shared
  mhitm arm (whose `:4506–4566` Rider/Burrrrp/corpse effects are
  mon-mon-only) ✓.
- HALU `:3904–3906`: uhitm arm is `mhm->damage = 0` only ✓ — JS
  inlines ✓. Correctly NOT routed to shared (whose `:3911–3919`
  confusion gaze is mon-mon-only) ✓.
- ENCH (Named): uhitm arm `:3608–3610` is comment-only ("just do
  damage") ✓ — JS fallthrough (damage stands) is verified
  equivalent, no code owed ✓.

## Inventory + fidelity — hmon_hitmon (pie umconf caller)

New file-local `umconf_tail(mon, hand_to_hand)` = C `:1911–1917`
verbatim (`u.umconf && hand_to_hand` → nohandglow → !mconf &&
!resist(SPBOOK) → mconf=1 + appears-confused pline) ✓. Normal tail
`else if (gate) { body }` → `else { helper }` with the gate inside
— control-flow identical (if/else-if prefix untouched) ✓.

The pie fix is a genuine caller miss: C's CREAM_PIE misc_obj case
(`:1265–1317`) ends `break` (`:1316`, no doreturn — read), so via
do_hit (`:1795`) it falls through to `:1911` before the `:1923`
wakeup. JS's pie block now calls `umconf_tail` pre-wakeup with
`thrown === HMON_MELEE || (APPLIED && is_pole(uwep))` — character-
identical to both C `:1780–1782` and JS's own `hand_to_hand`
(uhitm.js:1993) ✓. Thrown pies stay no-ops (gate false) ✓; melee
pies reach nohandglow in C order ✓. is_pole pre-imported (line 53).

New test `scripts/damageum-adtyping.test.mjs`: 4/4 pass (ran).
Diff grep: 0 hits. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "42/42 dispatch in all 3 homes" for the SGLD/CURS/DCAY
remainder is a dispatch-count claim about untouched code — the
three arms touched here are verified above; the remainder stays
with its arm rows as named.

## Density

Two uhitm.c functions, one file, + test, no Must-fix bundled. Six
stale pops (doextversion pager.js:2988, sound_speak sounds.js:121,
redraw_map display.js:6983, inaccessible_equipment apply.js:2225,
yn_function_menu getline.js:1879, coord_desc display.js:7725) —
all loci exist with substantive bodies.

- Ledger: mhitm_adtyping split — ACCEPT.
- Ledger: hmon_hitmon (pie umconf caller) — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
smoke mhitm_adtyping: no RNG-tagged reach; fixed smoke spread (24 run, 11.3s): 24 PASS, 0 regressed → REACH-OK
smoke nohandglow: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

(both vacuous-with-cause at baseline, per-function lines present.)
Matches the D-log (vacuous + REACH-OK, green/strict/cohort, full
44/44). No REGRESSED session. Focused test 4/4 is the functional
evidence (no session reaches the arms).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
