# Review 1139 — d23fde89 — steed.c put_saddle_on_mon: local clone → mpickobj import (D-2173)

Metadata: SHA `d23fde89`, js/ +4/−9 in `steed.js` (+1 import).
D-log D-2173. Subject promises: local `pick_saddle` linked minvent
without where/ocarry, hanging `relobj_on_death` on the first
saddled-mon death (2 js-throw sessions move to later owners).

Intent vs deliverable: promise matches diff. Actually adds:
deletion of the 6-line local `pick_saddle` clone, one call swap to
imported `mpickobj`, an expanded C comment. A Must-fix throw fix —
diagnosis was the deliverable, not lines.

Inventory: one deleted symbol: `pick_saddle`. Required `sym.mjs`
output:

```text
pick_saddle      NOT FOUND in js/** (no export, no local function/const).
mpickobj         js/makemon.js:1714   sync
```

Clone fully removed, zero remaining references (diff is the only
call site). Imported callee is LIVE (exported, C-referenced
`steal.c mpickobj`).

**C ↔ JS fidelity**: confirm, two loci.

(a) Call site. C `steed.c:142–163` (`put_saddle_on_mon`): guard,
mksobj arm, `if (mpickobj(mtmp, saddle))
panic("merged saddle?")`, then `misc_worn_check |= W_SADDLE`,
`owornmask`, `leashmon`, `update_mon_extrinsics`. JS body now runs
the identical sequence through `leashmon`; merged-true returns
early instead of C's `panic` — unreachable both sides (saddles
never merge), and skipping the worn marking on a merged-true is
strictly safer than marking. Named omissions kept in the D-log
and map: `update_mon_extrinsics`, the `impossible()` orphaned-
saddle arm, `which_armor`→`which_armor_saddle` (pre-existing).
No stub in a live arm.

(b) Callee. C `mpickobj` = `carry_obj_effects` + `add_to_minv`
(sets where/ocarry — exactly what the clone omitted, hanging
`obj_extract_self`'s MINVENT arm and spinning `while
(mtmp.minvent)`). JS `makemon.js:1714` carries the `steal.c`
C-ref; `carry_obj_effects` is figurine-only and `add_to_minv`
draws no RNG on a fresh/extracted saddle, so zero RNG shifting
by construction — matches the D-log claim; no RNG in this arm
either side.

Cycle-forcing check: `imports.mjs --can steed.js makemon.js
mpickobj` → `ALREADY: steed.js already statically imports
makemon.js. No new edge needed.` The old "avoid cycle" comment
was stale justification for the clone — a genuine clone-removal,
not cycle-forced. `rulecheck` clean globally.

Hallucinations / overclaim: none. The hang chain is measured,
not inferred (prefix replay n=98 ok / n=99 spin, toLowerCase
tripwire naming the SADDLE with `where=1` floor default and null
ocarry, reproduction at pre-existing commit). The D-log
explicitly declines a PASS claim for `verify put_saddle_on_mon`
(structurally vacuous for throw rows — owner null) and uses
`score --ids` instead. Honest.

Density: ~15-line diff on a Must-fix single call — §2b allows
Must-fix alone at any size.

Verification: re-measured on the working tree via the committed
scoreboard rows after a fresh rescore: Knight-92182 `error:
null`, now `obj_resists@zap.c:1469` step 95 (RNG 3067/6974, scr
98/177 — exact D-log match); Knight-92034 `error: null`, now
fully PASS (193/193 — better than the D-log's
mhitm_mgc_atk_negated@175, moved by a later arm port). Both
throws gone, 0 worse. Green/cohort claims (2/2, 7/7) consistent
with the fortress still 44/44 at HEAD. No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
